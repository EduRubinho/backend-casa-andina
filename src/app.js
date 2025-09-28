import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.get('/api/hola', (req, res) => {
  res.json({ msg: 'Hola desde el backend' });
});


export default app;
