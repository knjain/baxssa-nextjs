import { NextRequest, NextResponse } from "next/server";
import adminService from "../../service/adminService";

import { getToken } from "next-auth/jwt";

import securePassword from "@/lib/bcrypt";

export async function GET(req: NextRequest) {
  try {
    const response = await adminService.getAllUsers();

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { email, password, fullName, phoneNumber,createdBy } = body;
 
    const hashedPassword = await securePassword(password);
    const response = await adminService.createNewUser({
      email,
      hashedPassword,
      fullName,
      phoneNumber,
      createdBy
    });

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error in createNewUser:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// export async function getAllUsers(req: NextRequest) {
//     try {
//         const response = await adminService.getAllUsers();
//         return NextResponse.json({ data: response });
//     } catch (error) {
//         console.error("Error in getAllUsers:", error);
//         return NextResponse.json(
//             { message: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }
