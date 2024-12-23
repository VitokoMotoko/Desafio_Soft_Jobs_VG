import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import loggerMiddleware from './middlewares/loggerMiddleware.js'; 

const app = express();

// Usar el middleware para registrar consultas
app.use(loggerMiddleware);

// Configuracion del CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(userRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});