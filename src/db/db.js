// Ma'lumotlar bazasiga ulanish va so'rovlarni yuborish uchun asosiy fayl
import pg from 'pg';
import dotenv from 'dotenv';

// .env faylidan ma'lumotlarni olish
dotenv.config();

// Pool - bir nechta ma'lumotlar bazasi ulanishlarini boshqarish uchun
const pool = new pg.Pool({
  // Ma'lumotlar bazasi parametrlarini .env faylidan olish
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
});

// Ma'lumotlar bazasiga ulanish va jadvalllarni yaratish funksiyasi
export const connectDB = async () => {
  try {
    // Ma'lumotlar bazasiga ulanishni tekshirish
    await pool.query('SELECT NOW()');
    console.log('Ma\'lumotlar bazasiga muvaffaqiyatli ulandi');
    
    // Ma'lumotlar bazasida kerakli jadvallarni yaratish
    await createTables();
    console.log('Ma\'lumotlar bazasi jadvallari yaratildi');
    
    return true;
  } catch (error) {
    console.error('Ma\'lumotlar bazasiga ulanishda xatolik:', error.message);
    throw error;
  }
};

// Ma'lumotlar bazasi jadvallarini yaratish funksiyasi
const createTables = async () => {
  try {
    // Jadvallarni yaratishni to'g'ri tartibda bajaring
    // Birinchi jadvallarni yaratish
    
    // Mahsulotlar jadvali - Foreign key yo'q
// Mahsulotlar jadvali
await pool.query(`
  CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL,
    category VARCHAR(100),
    status VARCHAR(20) CHECK (status IN ('available','out of stock','discontinued')) DEFAULT 'available',
    image_urls TEXT[], 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);
    
    // Mijozlar jadvali - Foreign key yo'q
    await pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Buyurtmalar jadvali - customers jadvaliga bog'liq
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Buyurtma elementlari jadvali - orders va products jadvallariga bog'liq
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Keyin foreign key cheklamalarini qo'shing
    await pool.query(`
      ALTER TABLE orders 
      ADD CONSTRAINT fk_orders_customer 
      FOREIGN KEY (customer_id) 
      REFERENCES customers(id) 
      ON DELETE CASCADE
    `).catch(err => {
      if (!err.message.includes('already exists')) {
        throw err;
      }
    });
    
    await pool.query(`
      ALTER TABLE order_items 
      ADD CONSTRAINT fk_order_items_order 
      FOREIGN KEY (order_id) 
      REFERENCES orders(id) 
      ON DELETE CASCADE
    `).catch(err => {
      if (!err.message.includes('already exists')) {
        throw err;
      }
    });
    
    await pool.query(`
      ALTER TABLE order_items 
      ADD CONSTRAINT fk_order_items_product 
      FOREIGN KEY (product_id) 
      REFERENCES products(id) 
      ON DELETE SET NULL
    `).catch(err => {
      if (!err.message.includes('already exists')) {
        throw err;
      }
    });
    
  } catch (error) {
    console.error('Jadvallarni yaratishda xatolik:', error.message);
    throw error;
  }
};

// Ma'lumotlar bazasiga so'rov yuborish uchun funksiya
export const query = (text, params) => pool.query(text, params);

// Pool va query funksiyalarini eksport qilish
export default {
  query,
  pool,
};