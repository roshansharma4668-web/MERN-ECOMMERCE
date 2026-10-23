import express from 'express';
import { getProducts, getProductById, createProduct, deleteProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, admin, createProduct); 
router.get('/:id', getProductById);
router.delete('/:id', protect, admin, deleteProduct); // Naya Delete Route

export default router;