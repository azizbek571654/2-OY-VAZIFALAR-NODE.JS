// Mahsulotlar uchun route fayli - URL yo'llarini belgilaydi
import express from 'express';
import { productController } from '../controller/index.js';
import { validators } from '../middleware/index.js';

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = productController;

const {
  createProductValidation,
  updateProductValidation,
  validateRequest
} = validators;

// Express router yaratish
const router = express.Router();

// GET /api/products - Barcha mahsulotlarni olish
router.get('/', getAllProducts);

// GET /api/products/:id - ID bo'yicha mahsulotni olish
router.get('/:id', getProductById);

// POST /api/products - Yangi mahsulot yaratish (validatsiya bilan)
router.post('/', createProductValidation, validateRequest, createProduct);

// PUT /api/products/:id - Mavjud mahsulotni yangilash (validatsiya bilan)
router.put('/:id', updateProductValidation, validateRequest, updateProduct);

// DELETE /api/products/:id - Mahsulotni o'chirish
router.delete('/:id', deleteProduct);

export default router;