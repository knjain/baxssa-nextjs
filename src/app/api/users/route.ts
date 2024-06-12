import { NextRequest, NextResponse } from "next/server";
import adminService from "../../service/adminService";

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
  