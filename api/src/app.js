import express from 'express';
import cors from 'cors';
import representativeRoutes from './routes/representative.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/representatives', representativeRoutes);

app.get('/', (req, res) => {
  res.send('CivicConnect API');
});

export default app;
