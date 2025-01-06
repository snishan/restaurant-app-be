import MenuItem from '../models/MenuItem.js';
import { getPagination } from '../utils/pagination.js';

export const createMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMenuItems = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { skip, pageLimit } = getPagination(page, limit);

    const menuItems = await MenuItem.find()
      .skip(skip)
      .limit(pageLimit)
      .sort('name');

    const total = await MenuItem.countDocuments();

    res.json({
      data: menuItems,
      total,
      page: parseInt(page) || 1,
      pages: Math.ceil(total / pageLimit)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};