import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'my_project',
    password: process.env.DB_PASSWORD || '1234',
    port: process.env.DB_PORT || 5432
});


pool.connect()
    .then(() => {console.log('Connected to database')})
    .catch((error) => {console.error('Error connecting to database', error)})

export default pool;
