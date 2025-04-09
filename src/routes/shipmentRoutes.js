import express from 'express';
import { shipmentController } from '../controller/index.js';
import { validators } from '../middleware/index.js';

const {
  getAllShipments,
  getShipmentById,
  getShipmentsByOrderId,
  createShipment,
  updateShipment,
  deleteShipment
} = shipmentController;

const {
  createShipmentValidation,
  updateShipmentValidation,
  validateRequest
} = validators;

const router = express.Router();
router.get('/', getAllShipments);
router.get('/order/:orderId', getShipmentsByOrderId);
router.get('/:id', getShipmentById);
router.post('/', createShipmentValidation, validateRequest, createShipment);
router.put('/:id', updateShipmentValidation, validateRequest, updateShipment);
router.delete('/:id', deleteShipment);


export default router;