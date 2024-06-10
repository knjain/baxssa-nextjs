import { NextApiRequest, NextApiResponse } from "next";
import adminService from "../../service/adminService"; // Adjust the path to your adminService

import { NextRequest, NextResponse } from 'next/server';
import connectionPool from '../../config/db'; // Adjust the path as necessary

export async function GET(req: NextRequest) {
    try {
        const [rows] = await connectionPool.query('SELECT * FROM users');
        return NextResponse.json({ data: rows, });
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
