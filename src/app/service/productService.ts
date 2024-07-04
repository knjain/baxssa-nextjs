import connectionPool from "../config/db";
import { RowDataPacket } from "mysql2";

interface Product {
  productId: number;
  productName: string;
  productCode: string;
  productImageUrl: string;
  description: string;
  type: string;
  subType: string;
}
const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const [rows] = await connectionPool.query<RowDataPacket[]>(
        "SELECT * FROM products"
      );
      
      // const filteredData = rows.map((user: any) => ({
      //   userId: user.userId,
      //   fullName: user.fullName,
      //   email: user.email,
      //   phoneNumber: user.phoneNumber,
      // }));

      //console.log("FROM SERVICE", rows);
      return rows as Product[];
    } catch (error) {
      console.log("Error in getAllUsers:", error);
      throw error;
    }
  },
};

export default productService;
