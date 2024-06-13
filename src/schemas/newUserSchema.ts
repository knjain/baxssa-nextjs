import { z } from "zod";

export const newUserSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 characters long" }),
    fullName: z.string().min(1, { message: "Full name is required" }),
    phoneNumber: z
      .string()
      .regex(/^[0-9]+$/, { message: "Phone number should contain only digits" })
      .min(10, { message: "Phone number should be at least 10 digits long" })
      .max(15, { message: "Phone number should be at most 15 digits long" }),
  });