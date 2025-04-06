// server.js
// Bu asosiy kirish fayli - ilovani ishga tushirish uchun

// src/index.js dan barcha kerakli funksiyalarni import qilish
import { 
  express, 
  cors, 
  dotenv, 
  helmet,
  connectDB,
  productRoutes,
  customerRoutes,
  orderRoutes
} from './src/index.js';

// .env faylidan ma'lumotlarni olish
dotenv.config();

// Express ilovasini yaratish
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware funksiyalarni sozlash
app.use(cors());
app.use(helmet());
app.use(express.json()); // JSON so'rovlarini qabul qilish

// API route'larni sozlash
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

// Asosiy "Salom dunyo" route'i
app.get('/', (req, res) => {
  res.json({ message: 'Buyurtmalar boshqarish tizimi API ga xush kelibsiz!' });
});

// Ma'lumotlar bazasiga ulanish va serverni ishga tushirish funksiyasi
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