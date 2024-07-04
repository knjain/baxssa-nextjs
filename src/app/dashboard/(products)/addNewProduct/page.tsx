"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Apiresponse } from "@/app/types/ApiResponse";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { newProductSchema } from "@/schemas/newProductSchema";

type NewProductSchema = z.infer<typeof newProductSchema>;

const newProdcutPage = () => {
  const [formData, setFormData] = useState<NewProductSchema>({
    productName: "",
    productCode: "",
    type: "",
    subType: "",
    description: "",
  });
  const [errors, setErrors] = useState<Partial<NewProductSchema>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const user: User = session?.user as User; // If you don't want to do this assertion, directly use session?.user.productCode wherever required.

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const result = newProductSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<NewProductSchema> = {};
      for (const issue of result.error.issues) {
        newErrors[issue.path[0] as keyof NewProductSchema] = issue.message;
      }
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    console.log(formData);
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const requestData = { ...formData, createdBy: user.fullName };
      const response = await axios.post("/api/users", requestData);
      console.log(response);
      if (response?.data?.data?.affectedRows == 1) {
        toast({
          title: "Success",
          description: "Product Created successfully",
        });
        router.replace("/dashboard/users");
      }
    } catch (error) {
      console.log("Error in creating new User", error);
      const AxiosError = error as AxiosError<Apiresponse>;
      const errorMessage =
        AxiosError?.response?.data?.message || "An error occurred";
      toast({
        title: "New Product creation failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center max-h-screen py-6">
      <div className="w-full max-w-md py-5 px-8 space-y-8 bg-blue-300 rounded-lg shadow-lg">
        <h1 className="text-xl text-center">Create New User</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label>productName</label>
            <Input
              name="productName"
              placeholder="productName"
              value={formData.productName}
              onChange={handleChange}
            />
            {errors.productName && (
              <p className="text-red-500">{errors.productName}</p>
            )}
          </div>
          <div>
            <label>Full Name</label>
            <Input
              name="productCode"
              placeholder="Full Name"
              value={formData.productCode}
              onChange={handleChange}
            />
            {errors.productCode && (
              <p className="text-red-500">{errors.productCode}</p>
            )}
          </div>
          <div>
            <label>Phone Number</label>
            <Input
              name="type"
              placeholder="10 Digit Phone Number"
              value={formData.type}
              onChange={handleChange}
            />
            {errors.type && <p className="text-red-500">{errors.type}</p>}
          </div>
          <div>
            <label>subType</label>
            <Input
              name="subType"
              type="subType"
              placeholder="subType"
              value={formData.subType}
              onChange={handleChange}
            />
            {errors.subType && <p className="text-red-500">{errors.subType}</p>}
          </div>
          <div>
            <label>Description</label>
            <Input
              name="description"
              type="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>
          <Button type="submit">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create User"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default newProdcutPage;
