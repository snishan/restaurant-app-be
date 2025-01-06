import Customer from '../models/Customer.js';
import { getPagination } from '../utils/pagination.js';

export const createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { skip, pageLimit } = getPagination(page, limit);

    const customers = await Customer.find()
      .skip(skip)
      .limit(pageLimit);

    const total = await Customer.countDocuments();

    res.json({
      data: customers,
      total,
      page: parseInt(page) || 1,
      pages: Math.ceil(total / pageLimit)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCustomerDropdown = async (req, res) => {
  try {
    const customers = await Customer.find({ status: true })
      .select('_id name')
      .sort('name');
    res.json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};