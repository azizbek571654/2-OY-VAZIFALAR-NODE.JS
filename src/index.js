import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import { connectDB, query } from './db/db.js';
import * as productController from './controller/productController.js';
import * as customerController from './controller/customerController.js';
import * as orderController from './controller/orderController.js';
import * as shipmentController from './controller/shipmentController.js';
import * as userController from './controller/usersController.js';
import * as orderItemController from './controller/orderItemController.js';

import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import shipmentRoutes from './routes/shipmentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderItemRoutes from './routes/orderItemRoutes.js';

import * as validators from './middleware/validators.js';

export { 
  express,
  cors,
  dotenv,
  helmet,
  connectDB, 
  query, 
  userController,
  userRoutes,
  productController, 
  customerController, 
  orderController,
  shipmentController,
  validators,
  productRoutes,
  customerRoutes,
  orderRoutes,
  shipmentRoutes,
  orderItemController,
  orderItemRoutes
};