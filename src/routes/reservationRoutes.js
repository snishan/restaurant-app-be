import express from 'express';
import {
  createReservation,
  updateReservation,
  deleteReservation,
  getReservations
} from '../controllers/reservationController.js';

const router = express.Router();

router.post('/', createReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);
router.get('/', getReservations);

export default router;