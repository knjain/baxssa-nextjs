"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";

function page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  //zod implementation
  const form =
    useForm <
    z.infer <
    typeof signUpSchema >
    {
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    };
  return <div>page</div>;
}

export default page;
