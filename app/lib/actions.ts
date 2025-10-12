"use server";
import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.string(),
});

async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = FormSchema.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountCents = amount * 100;

  await sql`
  UPDATE invoices
  SET customer_id = ${customerId}, amount = ${amountCents}, status = ${status}
  WHERE id = ${id}
  `;

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

async function createData(formData: FormData) {
  const { customerId, amount, status } = FormSchema.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];
  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountCents}, ${status}, ${date});
  `;
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
}

export { createData as default, updateInvoice, deleteInvoice };
