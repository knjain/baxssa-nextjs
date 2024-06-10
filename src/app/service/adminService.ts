// import connectionPool from '../config/db'; // Adjust the path to your connection pool setup

// const adminService = {
//   getAllUsers: async () => {
//     return new Promise((resolve, reject) => {
//       connectionPool.getConnection((err, connection) => {
//         if (err) {
//           console.log("Error in creating connection in getAllUsers service", err);
//           reject(err);
//           return;
//         }

//         try {
//           const getUsersQuery = `SELECT * FROM users`;

//           connection.query(getUsersQuery, (err, results) => {
//             if (err) {
//               console.log("Error in query in getAllUsers:", err);
//               reject(err);
//             } else {
//               resolve(results);
//             }
//           });
//         } catch (error) {
//           console.log("Error in getAllUsers:", error);
//           reject(error);
//         } finally {
//           console.log("Connection is released for getAllUsers");
//           connection.release();
//         }
//       });
//     });
//   },
// };

// export default adminService;
import connectionPool from "../config/db";

const adminService = {
  getAllUsers: async () => {
    try {
      const [rows] = await connectionPool.query("SELECT * FROM users");
      return rows;
    } catch (error) {
      console.log("Error in getAllUsers:", error);
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