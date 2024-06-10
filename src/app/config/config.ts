import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

interface DBConfig {
    host: string;
    user: string;
    password: string;
    database: string;
    port?: number;
}

interface Config {
    DB_DETAILS: DBConfig;
}

const config: Config = {
    DB_DETAILS: {
        host: process.env.MYSQL_DB_HOSTNAME || 'localhost', // Default to localhost if not set
        user: process.env.MYSQL_DB_USERNAME || 'root', // Default to root if not set
        password: process.env.MYSQL_DB_PASSWORD || 'password', // Default to password if not set
        database: process.env.MYSQL_DB_SCHEMA || 'your_database_name', // Default to your_database_name if not set
        port: 3306, // Default MySQL port
    },
};

export default config;
