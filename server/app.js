import express from 'express';
import mongoose from 'mongoose';
import { ServerApiVersion } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración CORS para permitir React
const corsOptions = {
  origin: 'http://localhost:5173/', // Reemplaza con tu URL de React
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection with latest driver settings
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
    console.log('MongoDB conectado exitosamente');
  } catch (err) {
    console.error('Error de conexión a MongoDB:', err.message);
    process.exit(1);
  }
};

connectDB();

// Manejo de cierre de servidor
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB desconectado');
  process.exit(0);
});

// Usar rutas
import usuariosRoutes from './routes/usuarios.js';
import peliculasRoutes from './routes/peliculas.js';
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/peliculas', peliculasRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
