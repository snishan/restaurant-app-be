import express from 'express';
import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
  getCustomerDropdown
} from '../controllers/customerController.js';

const router = express.Router();

router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
router.get('/', getCustomers);
router.get('/dropdown', getCustomerDropdown);

export default router;