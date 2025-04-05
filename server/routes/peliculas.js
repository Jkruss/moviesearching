import express from 'express';
const router = express.Router();
import Pelicula from '../models/Pelicula.js';

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.json(peliculas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Buscar películas
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const peliculas = await Pelicula.find({
      title: { $regex: query, $options: 'i' }
    });
    res.json(peliculas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear nueva película
router.post('/', async (req, res) => {
  const pelicula = new Pelicula({
    id: req.body.id,
    title: req.body.title,
    year: req.body.year,
    image: req.body.image
  });

  try {
    const nuevaPelicula = await pelicula.save();
    res.status(201).json(nuevaPelicula);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
