// src/index.js
// Asosiy ilova fayli - ishga tushirilganda server.js ga eksport qilinadigan funksiyalar

// Kerakli package'larni import qilish
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

// Ma'lumotlar bazasi va kontrollerlarni import qilish
import { connectDB, query } from './db/db.js';
import * as productController from './controller/productController.js';
import * as customerController from './controller/customerController.js';
import * as orderController from './controller/orderController.js';

// Route'larni import qilish
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Middleware'larni import qilish
import * as validators from './middleware/validators.js';

// Barcha kerakli obyektlarni eksport qilish
export { 
  express,
  cors,
  dotenv,
  helmet,
  connectDB, 
  query, 
  productController, 
  customerController, 
  orderController,
  validators,
  productRoutes,
  customerRoutes,
  orderRoutes
};