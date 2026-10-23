import express from 'express';
import { placeOrder, getMyOrders, getOrders, updateOrderToDelivered } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/place', protect, placeOrder);
router.get('/myorders', protect, getMyOrders);

// Naye Admin Routes
router.get('/', protect, admin, getOrders);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default router;