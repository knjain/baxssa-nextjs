import connectionPool from "../config/db";
import { RowDataPacket } from "mysql2";

interface User {
  userId: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
}

interface CreateUserParams {
  fullName: string;
  email: string;
  phoneNumber: string;
  hashedPassword: string;
  createdBy?: string;
}

interface CreateUserResult {
  // Define the structure of the result based on your database response
  insertId: number;
  affectedRows: number;
}

const adminService = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      const [rows] = await connectionPool.query<RowDataPacket[]>(
        "SELECT userId, fullName, email, phoneNumber FROM users"
      );
      const filteredData = rows.map((user: any) => ({
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }));

      return filteredData;
    } catch (error) {
      console.log("Error in getAllUsers:", error);
      throw error;
    }
  },

  createNewUser: async ({
    email,
    hashedPassword,
    fullName,
    phoneNumber,
    createdBy,
  }: CreateUserParams): Promise<CreateUserResult> => {
    try {
      const createUserQuery = `
        INSERT INTO users (fullName, email, createdBy, phoneNumber, password, registeredOn)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [results] = await connectionPool.execute(createUserQuery, [
        fullName,
        email,
        createdBy,
        phoneNumber,
        hashedPassword,
        new Date(),
      ]);
      console.log([results] )
      return results as CreateUserResult;
    } catch (error) {
      console.error("Error in createNewUser:", error);
      throw error;
    }
  },
};

export default adminService;

// getUserById: async (userId: number) => {
//   try {
//     const connection = await connectionPool.getConnection();
//     const [rows] = await connection.execute('SELECT * FROM users WHERE userId = ?', [userId]);
//     connection.release();
//     return rows;
//   } catch (error) {
//     console.error('Error in getUserById:', error);
//     throw error;
//   }
// },

// updateUser: async (userId: number, fullName: string, email: string) => {
//   let connection;
//   try {
//     connection = await connectionPool.getConnection();
//     await connection.beginTransaction();

//     const updateQuery = 'UPDATE users SET fullName = ?, email = ? WHERE userId = ?';
//     await connection.execute(updateQuery, [fullName, email, userId]);

//     await connection.commit();
//     connection.release();
//     return { message: 'User updated successfully' };
//   } catch (error) {
//     if (connection) {
//       await connection.rollback();
//       connection.release();
//     }
//     console.error('Error in updateUser:', error);
//     throw error;
//   }
// },
