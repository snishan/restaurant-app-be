import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import customerRoutes from '../routes/customerRoutes.js';
import reservationRoutes from '../routes/reservationRoutes.js';
import menuRoutes from '../routes/menuRoutes.js';

const createApp = () => {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api/customers', customerRoutes);
  app.use('/api/reservations', reservationRoutes);
  app.use('/api/menu', menuRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.get("/", (req, res) => {
    res.json({ message: 'Hello BE 1' });
  });

  return app;
};

export default createApp;