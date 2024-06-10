
import connectionPool from '../config/db'; // Adjust the path to your connection pool setup

const adminService = {
  getAllUsers: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err:any, connection:any) => {
        if (err) {
          console.log("Error in creating connection in getAllUsers service", err);
          reject(err);
          return;
        }

        try {
          const getUsersQuery = `SELECT * FROM users`;

          connection.query(getUsersQuery, (err:any, results:any) => {
            if (err) {
              console.log("Error in query in getAllUsers:", err);
              reject(err);
            } else {
              resolve(results);
            }
          });
        } catch (error) {
          console.log("Error in getAllUsers:", error);
          reject(error);
        } finally {
          console.log("Connection is released for getAllUsers");
          connection.release();
        }
      });
    });
  },
};

export default adminService;
