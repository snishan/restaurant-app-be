import Reservation from '../models/Reservation.js';
// import reservation from '../models/reservation.js';
import { getPagination } from '../utils/pagination.js';

export const createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    const { page, limit, customerName, date } = req.query;
    const { skip, pageLimit } = getPagination(page, limit);

    const query = {};
    if (customerName) {
      query['customer.name'] = new RegExp(customerName, 'i');
    }
    if (date) {
      query.date = new Date(date);
    }

    const reservations = await Reservation.find(query)
      .populate('customerId', 'name')
      .skip(skip)
      .limit(pageLimit)
      .sort('-date');

    const total = await Reservation.countDocuments(query);

    res.json({
      data: reservations,
      total,
      page: parseInt(page) || 1,
      pages: Math.ceil(total / pageLimit)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};