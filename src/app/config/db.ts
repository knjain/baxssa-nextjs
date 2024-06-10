import mysql from 'mysql2/promise';
import config from './config';

const connectionPool = mysql.createPool(config.DB_DETAILS);

export default connectionPool;
