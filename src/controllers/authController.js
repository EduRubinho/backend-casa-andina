// src/controllers/authController.js
import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../models/userModel.js';

export const register = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }

    // verificar si ya existe
    const userExist = await pool.query(
      'SELECT * FROM usuarios WHERE correo = $1',
      [correo]
    );

    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    // insertar usuario
    const newUser = await pool.query(
      'INSERT INTO usuarios (correo, contrasena) VALUES ($1, $2) RETURNING id, correo, creado_en',
      [correo, hashedPassword]
    );

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      usuario: newUser.rows[0]
    });
  } catch (err) {
    console.error('❌ Error en register:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Validación básica
    if (!correo || !contrasena) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    // Buscar usuario
    const user = await getUserByEmail(correo);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comparar contraseña
    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, correo: user.correo },
      process.env.JWT_SECRET || 'secreto123',
      { expiresIn: '1h' }
    );

    res.json({ 
      message: 'Login exitoso', 
      token,
      usuario: {
        id: user.id,
        correo: user.correo
      }
    });
  } catch (error) {
    console.error('❌ Error en login:', error.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
