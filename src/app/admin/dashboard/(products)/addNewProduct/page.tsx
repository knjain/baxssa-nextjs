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
import { BACKEND_API_URL } from "@/constants/constants";

type NewProductSchema = z.infer<typeof newProductSchema>;

const NewProdcutPage = () => {
  const [formData, setFormData] = useState<NewProductSchema>({
    productName: "",
    productCode: "",
    type: "",
    subType: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<NewProductSchema>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const user: User = session?.user as User;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
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
    e.preventDefault();
    if (!validate()) return;

    if (!imageFile) {
      toast({
        title: "Image required",
        description: "Please upload an Image",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("productName", formData.productName);
      formDataToSubmit.append("productCode", formData.productCode);
      formDataToSubmit.append("type", formData.type);
      formDataToSubmit.append("subType", formData.subType);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("createdBy", user.fullName || "");
      if (imageFile) {
        formDataToSubmit.append("file", imageFile);
      }

      const response = await axios.post(
        `http://3.108.57.17:5000/api/v1/products/createNewProduct`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.data?.affectedRows == 1) {
        toast({
          title: "Success",
          description: "Product Created successfully",
        });
        router.replace("/admin/dashboard/products");
      }
    } catch (error) {
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
    <div className="flex justify-center items-center py-6">
      <div className="w-full max-w-md py-5 px-8 space-y-8 bg-slate-500-300 rounded-lg shadow-xl">
        <h1 className="text-xl text-center">Create New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label>Product Name</label>
              <Input
                name="productName"
                placeholder="Product Name"
                value={formData.productName}
                onChange={handleChange}
              />
              {errors.productName && (
                <p className="text-red-500">{errors.productName}</p>
              )}
            </div>
            <div>
              <label>Product Code</label>
              <Input
                name="productCode"
                placeholder="Product Code"
                value={formData.productCode}
                onChange={handleChange}
              />
              {errors.productCode && (
                <p className="text-red-500">{errors.productCode}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label>Product Type</label>
              <Input
                name="type"
                placeholder="Type"
                value={formData.type}
                onChange={handleChange}
              />
              {errors.type && <p className="text-red-500">{errors.type}</p>}
            </div>
            <div>
              <label>Product Sub-Type</label>
              <Input
                name="subType"
                placeholder="Sub Type"
                value={formData.subType}
                onChange={handleChange}
              />
              {errors.subType && (
                <p className="text-red-500">{errors.subType}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label>Description</label>
              <Input
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label>Product Image</label>
              <Input
                type="file"
                onChange={handleFileChange}
                className="bg-gray-200 rounded-xl shadow-lg hover:cursor-pointer border border-gray-500"
              />
            </div>
          </div>
          <Button type="submit">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create New Product"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewProdcutPage;
