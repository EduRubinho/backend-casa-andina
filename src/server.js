import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('✅ Backend Casa Andina funcionando. Usa /api/users para obtener datos.');
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

