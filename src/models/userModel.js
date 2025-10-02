import pool from '../config/db.js';

// Crear usuario
export const createUser = async (correo, contrasena) => {
  const result = await pool.query(
    `INSERT INTO usuarios (correo, contrasena) 
     VALUES ($1, $2) RETURNING id, correo, creado_en`,
    [correo, contrasena]
  );
  return result.rows[0];
};

// Buscar usuario por correo
export const getUserByEmail = async (correo) => {
  const result = await pool.query(
    `SELECT * FROM usuarios WHERE correo = $1`,
    [correo]
  );
  return result.rows[0];
};
