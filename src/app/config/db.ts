// import { createPool, Pool } from 'mysql2';
// import config from './config';

// // Define the structure of the config object
// // interface DBConfig {
// //   host: string;
// //   user: string;
// //   password: string;
// //   database: string;
// //   port?: number;
// // }

// const dbDetails: DBConfig = config.DB_DETAILS;

// // Create a connection pool
// const connectionPool: Pool = createPool(dbDetails);

// connectionPool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return;
//     }
//     console.log('Connected to the database');
//     connection.release(); // Release the connection back to the pool
//   });
  
// export default connectionPool;

import mysql from 'mysql2/promise';
import config from './config';

const connectionPool = mysql.createPool(config.DB_DETAILS);

export default connectionPool;
