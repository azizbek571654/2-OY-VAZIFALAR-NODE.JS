// Mahsulotlar bo'limi kontrollerlar - API so'rovlarini qayta ishlash funksiyalari
import { query } from '../db/index.js';

// Barcha mahsulotlarni olish
export const getAllProducts = async (req, res) => {
  try {
    // Mahsulotlar jadvalidan barcha mahsulotlarni olish
    const result = await query('SELECT * FROM products ORDER BY created_at DESC');
    
    // Natijani qaytarish
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Mahsulotlarni olishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

// ID bo'yicha mahsulotni olish
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    
    // ID bo'yicha mahsulotni qidirish
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    
    // Agar mahsulot topilmasa
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan mahsulot topilmadi`
      });
    }
    
    // Mahsulotni qaytarish
    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Mahsulotni olishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

// Yangi mahsulot yaratish
export const createProduct = async (req, res) => {
  try {
    // So'rovdan ma'lumotlarni olish
    const { name, description, price, stock, category, status, image_urls } = req.body;
    
    // Yangi mahsulotni qo'shish
    const result = await query(
      'INSERT INTO products (name, description, price, stock, category, status, image_urls) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, description, price, stock, category || null, status || 'available', image_urls || null]
    );
    
    // Natijani qaytarish
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Mahsulot muvaffaqiyatli yaratildi'
    });
  } catch (error) {
    console.error('Mahsulot yaratishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

// Mahsulotni yangilash funksiyasi
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // So'rovdan yangilangan ma'lumotlarni olish
    const { name, description, price, stock, category, status, image_urls } = req.body;
    
    // Avval mahsulot mavjudligini tekshirish
    const checkResult = await query('SELECT * FROM products WHERE id = $1', [id]);
    
    // Agar mahsulot topilmasa
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan mahsulot topilmadi`
      });
    }
    
    // Mahsulotni yangilash
    const result = await query(
      `UPDATE products 
       SET name = $1, description = $2, price = $3, stock = $4, 
       category = $5, status = $6, image_urls = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [name, description, price, stock, category || null, status || 'available', image_urls || null, id]
    );
    
    // Natijani qaytarish
    res.status(200).json({
      success: true,
      data: result.rows[0],
      message: 'Mahsulot muvaffaqiyatli yangilandi'
    });
  } catch (error) {
    console.error('Mahsulotni yangilashda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

// Mahsulotni o'chirish - buyurtma elementlarini ham o'chirish orqali
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Avval mahsulot mavjudligini tekshirish
    const checkResult = await query('SELECT * FROM products WHERE id = $1', [id]);
    
    // Agar mahsulot topilmasa
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan mahsulot topilmadi`
      });
    }
    
    // Transaksiya boshlanishi
    await query('BEGIN');
    
    try {
      // Avval tegishli buyurtma elementlarini o'chirish
      const deleteItemsResult = await query('DELETE FROM order_items WHERE product_id = $1', [id]);
      const deletedItemsCount = deleteItemsResult.rowCount;
      
      // Keyin mahsulotni o'chirish
      await query('DELETE FROM products WHERE id = $1', [id]);
      
      // Transaksiyani yakunlash
      await query('COMMIT');
      
      // Natijani qaytarish
      let message = 'Mahsulot muvaffaqiyatli o\'chirildi';
      if (deletedItemsCount > 0) {
        message += `. ${deletedItemsCount} ta bog'liq buyurtma elementi ham o'chirildi.`;
      }
      
      res.status(200).json({
        success: true,
        message: message
      });
    } catch (error) {
      // Xatolik bo'lsa transaksiyani bekor qilish
      await query('ROLLBACK');
      throw error;
    }
    
  } catch (error) {
    console.error('Mahsulotni o\'chirishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};