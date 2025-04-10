// Mijozlar uchun route fayli - URL yo'llarini belgilaydi
import express from 'express';
import { customerController } from '../controller/index.js';
import { validators } from '../middleware/index.js';

const {
  getAllCustomers,
  getCustomerById,
  getCustomerOrders,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = customerController;

const {
  createCustomerValidation,
  updateCustomerValidation,
  validateRequest
} = validators;

// Express router yaratish
const router = express.Router();

// GET /api/customers - Barcha mijozlarni olish
router.get('/', getAllCustomers);

// GET /api/customers/:id - ID bo'yicha mijozni olish
router.get('/:id', getCustomerById);

// GET /api/customers/:id/orders - Mijozning buyurtmalarini olish
router.get('/:id/orders', getCustomerOrders);

// POST /api/customers - Yangi mijoz yaratish (validatsiya bilan)
router.post('/', createCustomerValidation, validateRequest, createCustomer);

// PUT /api/customers/:id - Mavjud mijozni yangilash (validatsiya bilan)
router.put('/:id', updateCustomerValidation, validateRequest, updateCustomer);

// DELETE /api/customers/:id - Mijozni o'chirish
router.delete('/:id', deleteCustomer);

export default router;