import { z } from "zod";

export const newProductSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  productCode: z.string().min(1, { message: "Product code is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  subType: z.string().min(1, { message: "Subtype is required" }),
});
