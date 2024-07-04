import { NextRequest, NextResponse } from "next/server";
import productService from "../../service/productService";

import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const response = await productService.getAllProducts();

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
