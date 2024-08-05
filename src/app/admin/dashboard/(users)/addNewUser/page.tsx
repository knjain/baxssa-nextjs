// "use client";
// import React, { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, FormProvider } from "react-hook-form";
// import { z } from "zod";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { newUserSchema } from "@/schemas/newUserSchema";
// import axios, { AxiosError } from "axios";
// import { useToast } from "@/components/ui/use-toast";
// import { Apiresponse } from "@/app/types/ApiResponse";
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { User } from "next-auth";
// function Page() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const router = useRouter();
//   const { data: session } = useSession();
//   const user: User = session?.user as User; //if you dont want to do this assertion, directly use session?.user.fullName wherever required.
//   // zod implementation
//   const formMethods = useForm<z.infer<typeof newUserSchema>>({
//     resolver: zodResolver(newUserSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       fullName: "",
//       phoneNumber: "",
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof newUserSchema>) => {
//     console.log("something")
//     console.log(data);
//     setIsSubmitting(true);
//     try {
//       const requestData = { ...data, createdBy: user.fullName };
//       const response = await axios.post("/api/users", requestData);

//       if (response?.data?.success) {
//         toast({
//           title: "Success",
//           description: response.data.message,
//         });
//         router.replace("/admin/dashboard/users");
//       }
//     } catch (error) {
//       console.log("Error in creating new User", error);
//       const AxiosError = error as AxiosError<Apiresponse>;
//       let errorMessage = AxiosError?.response?.data?.message;
//       toast({
//         title: "New User creation failed",
//         description: errorMessage,
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center max-h-screen py-6">
//       <div className="w-full max-w-md py-5 px-8 space-y-8 bg-blue-300 rounded-lg shadow-lg">
//         <h1 className="text-xl text-center">Create New User</h1>
//         <FormProvider {...formMethods}>
//           <form
//             onSubmit={formMethods.handleSubmit(onSubmit)}
//             className="space-y-6"
//           >
//             <FormField
//               control={formMethods.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Email" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={formMethods.control}
//               name="fullName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Full Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Full Name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={formMethods.control}
//               name="phoneNumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone Number</FormLabel>
//                   <FormControl>
//                     <Input placeholder="10 Digit Phone Number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={formMethods.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit">
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 "Create User"
//               )}
//             </Button>
//           </form>
//         </FormProvider>
//         {/* <p>
//           Already a member?
//           <Link href="/admin/sign-in" className="text-blue-600 hover:text-blue-800">
//             Sign in
//           </Link>
//         </p> */}
//       </div>
//     </div>
//   );
// }

// export default Page;

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
import { newUserSchema } from "@/schemas/newUserSchema";

type NewUserSchema = z.infer<typeof newUserSchema>;

function Page() {
  const [formData, setFormData] = useState<NewUserSchema>({
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<NewUserSchema>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const user: User = session?.user as User; // If you don't want to do this assertion, directly use session?.user.fullName wherever required.

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const result = newUserSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<NewUserSchema> = {};
      for (const issue of result.error.issues) {
        newErrors[issue.path[0] as keyof NewUserSchema] = issue.message;
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
      //console.log(response);
      if (response?.data?.data?.affectedRows == 1) {
        toast({
          title: "Success",
          description: "User Created successfully",
        });
        router.replace("/admin/dashboard/users");
      }
    } catch (error) {
      console.log("Error in creating new User", error);
      const AxiosError = error as AxiosError<Apiresponse>;
      const errorMessage =
        AxiosError?.response?.data?.message || "An error occurred";
      toast({
        title: "New User creation failed",
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
            <label>Email</label>
            <Input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label>Full Name</label>
            <Input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label>Phone Number</label>
            <Input
              name="phoneNumber"
              placeholder="10 Digit Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <label>Password</label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
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
}

export default Page;
