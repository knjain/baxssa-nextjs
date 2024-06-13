"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  userId: Number;
  email: string;
  fullName: string;
  phoneNumber: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Contact Number",
  },
];
