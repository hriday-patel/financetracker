import z from "zod"

export const credentialSchema = z.object({
  email: z.string({
    invalid_type_error: "Please enter email!"
  }).email(),
  password: z.string({
    invalid_type_error: "Please enter a password!"
  }).min(6)
})