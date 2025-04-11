
import express from 'express';
import { orderItemController } from '../controller/index.js';
import { validators } from '../middleware/index.js';

const {
  createOrderItem,
  getOrderItemsByOrderId,
  getOrderItemByIds,
  updateOrderItem,
  deleteOrderItem,
  getAllOrderItems
} = orderItemController;

const {
  createOrderItemValidation,
  updateOrderItemValidation,
  validateRequest
} = validators;

const router = express.Router();
router.get('/', getAllOrderItems);
router.get('/order/:order_id', getOrderItemsByOrderId);
router.post('/', createOrderItemValidation, validateRequest, createOrderItem);
router.get('/:order_id/:product_id', getOrderItemByIds);
router.put('/:order_id/:product_id', updateOrderItemValidation, validateRequest, updateOrderItem);
router.delete('/:order_id/:product_id', deleteOrderItem);

export default router;