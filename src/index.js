// Asosiy ilova fayli - expressni sozlash va API routelarni ulash
import express from 'express';
import { connectDB } from './db/index.js';
import { productRoutes, customerRoutes, orderRoutes } from './routes/index.js';

// Express ilovasini yaratish
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware funksiyalarni sozlash
app.use(express.json()); // JSON so'rovlarini qabul qilish

// API route'larni sozlash
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

// Asosiy "Salom dunyo" route'i
app.get('/', (req, res) => {
  res.json({ message: 'Buyurtmalar boshqarish tizimi API ga xush kelibsiz!' });
});

// Ma'lumotlar bazasiga ulanish va serverni ishga tushirish
const startServer = async () => {
  try {
    // Ma'lumotlar bazasiga ulanish
    await connectDB();
    
    // Serverning tinglovchi portini sozlash
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server http://localhost:${PORT} portda ishlayapti`);
    });
  } catch (error) {
    console.error('Server ishga tushirilmadi:', error.message);
    process.exit(1);
  }
};

// Serverni ishga tushirish
startServer();