// src/controllers/userController.js
import { getAllUsers } from '../models/userModel.js';

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);  // devolvemos la lista en JSON
  } catch (error) {
    console.error('Error en la base de datos:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};
