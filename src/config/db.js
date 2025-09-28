// src/config/db.js
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // viene de .env
  ssl: { rejectUnauthorized: false }          // importante para Neon
});

export default pool;
