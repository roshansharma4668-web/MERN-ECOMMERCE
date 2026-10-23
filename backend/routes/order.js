import express from 'express';
import { 
  placeOrder, 
  getMyOrders, 
  getOrders, 
  updateOrderToDelivered, 
  deleteOrder 
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User Routes
router.post('/place', protect, placeOrder);
router.get('/myorders', protect, getMyOrders);

// Admin Routes
router.get('/', protect, admin, getOrders);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);
router.delete('/:id', protect, admin, deleteOrder); 

export default router;