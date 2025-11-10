"use server";
import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { State } from "./definitions";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  customerId: z.string({
    invalid_type_error: "Please select a customer!",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0!" }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
});


export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedData = FormSchema.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  if(validatedData.error){
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Missing fields. Failed to update invoice!"
    }
  }
  const {customerId, amount, status} = validatedData.data;
  const amountInCents = Math.round(Number(amount) * 100);

  try {
    await sql`
  UPDATE invoices
  SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
  WHERE id = ${id}
  `;
  } catch (error) {
    console.log(error);
    return {
      hriday: "database error: failed to create data!",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function createData(prevState: State ,formData: FormData) {
  const validatedData = FormSchema.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"), 
  });

  if(validatedData.error){
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create invoice!'
    }
  }
  const {customerId, amount, status} = validatedData.data;
  const amountCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];
  try {
    await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountCents}, ${status}, ${date});
  `;
  } catch (error) {
    console.log(error);
    return {
      hriday: "database error: failed to insert data!",
    };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
}

export async function authenticate(prevState: string | undefined, formData: FormData){
          try{
            await signIn('credentials', formData);
          }
          catch(error){
            if(error instanceof AuthError){
              switch(error.type){
                case 'CredentialsSignin':
                  return 'Invalid credentials';
                default:
                  return 'Something went wrong.'
              }
            }
            throw error;
          }
}

export async function logout(){
  await signOut({redirectTo: '/'});
}


