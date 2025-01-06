import express from 'express';
import {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItems
} from '../controllers/menuController.js';

const router = express.Router();

router.post('/', createMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);
router.get('/', getMenuItems);

export default router;