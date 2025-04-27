import express from 'express';
import primeRoutes from './src/routes/prime.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', primeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
