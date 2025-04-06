// Buyurtmalar uchun route fayli - URL yo'llarini belgilaydi
import express from 'express';
import { orderController } from '../controller/index.js';
import { validators } from '../middleware/index.js';

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
} = orderController;

const {
  createOrderValidation,
  updateOrderStatusValidation,
  validateRequest
} = validators;

// Express router yaratish
const router = express.Router();

// GET /api/orders - Barcha buyurtmalarni olish
router.get('/', getAllOrders);

// GET /api/orders/:id - ID bo'yicha buyurtmani olish
router.get('/:id', getOrderById);

// POST /api/orders - Yangi buyurtma yaratish (validatsiya bilan)
router.post('/', createOrderValidation, validateRequest, createOrder);

// PATCH /api/orders/:id/status - Buyurtma statusini yangilash (validatsiya bilan)
router.put('/:id/status', updateOrderStatusValidation, validateRequest, updateOrderStatus);

// DELETE /api/orders/:id - Buyurtmani o'chirish
router.delete('/:id', deleteOrder);

export default router;