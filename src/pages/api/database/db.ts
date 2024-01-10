import { Pool } from 'pg';


  const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: 'postgres',// Name of database container
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT) || 5432, // Default PostgreSQL port
  });

export default pool;