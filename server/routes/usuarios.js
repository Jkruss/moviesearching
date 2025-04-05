import express from 'express';
const router = express.Router();
import Usuario from '../models/Usuario.js';

// GET todos los usuarios
router.get('/', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// POST crear usuario
router.post('/', async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  const guardado = await nuevoUsuario.save();
  res.json(guardado);
});

export default router;
