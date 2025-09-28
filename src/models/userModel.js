// src/models/userModel.js
import pool from '../config/db.js';

export const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users'); // <-- tu tabla
  return result.rows;
};
