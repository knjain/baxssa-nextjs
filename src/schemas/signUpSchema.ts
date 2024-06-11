import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password should be atleast 6 characters." }),
});
