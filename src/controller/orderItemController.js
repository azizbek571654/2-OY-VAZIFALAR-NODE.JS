import { query } from '../db/db.js';

export const createOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity, price } = req.body;
    
    const result = await query(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [order_id, product_id, quantity, price]
    );
    
    res.status(201).json({
      success: true,
      message: "Buyurtma elementi muvaffaqiyatli yaratildi",
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Buyurtma elementi yaratishda xatolik:", error.message);
    // Primary key constraint violation
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: "Bu buyurtma uchun bu mahsulot allaqachon qo'shilgan",
        error: error.message
      });
    }
    // Foreign key constraint violation
    if (error.code === '23503') {
      return res.status(400).json({
        success: false,
        message: "Buyurtma yoki mahsulot mavjud emas",
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: "Serverda xatolik",
      error: error.message
    });
  }
};

export const getOrderItemsByOrderId = async (req, res) => {
  try {
    const { order_id } = req.params;
    
    const result = await query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [order_id]
    );
    
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error("Buyurtma elementlarini olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Serverda xatolik",
      error: error.message
    });
  }
};

export const getOrderItemByIds = async (req, res) => {
  try {
    const { order_id, product_id } = req.params;
    
    const result = await query(
      'SELECT * FROM order_items WHERE order_id = $1 AND product_id = $2',
      [order_id, product_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Buyurtma elementi topilmadi"
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Buyurtma elementini olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Serverda xatolik",
      error: error.message
    });
  }
};

export const updateOrderItem = async (req, res) => {
  try {
    const { order_id, product_id } = req.params;
    const { quantity, price } = req.body;
    
    const checkItem = await query(
      'SELECT * FROM order_items WHERE order_id = $1 AND product_id = $2',
      [order_id, product_id]
    );
    
    if (checkItem.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Buyurtma elementi topilmadi"
      });
    }
    
    const result = await query(
      'UPDATE order_items SET quantity = $1, price = $2 WHERE order_id = $3 AND product_id = $4 RETURNING *',
      [quantity, price, order_id, product_id]
    );
    
    res.status(200).json({
      success: true,
      message: "Buyurtma elementi muvaffaqiyatli yangilandi",
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Buyurtma elementini yangilashda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Serverda xatolik",
      error: error.message
    });
  }
};

export const deleteOrderItem = async (req, res) => {
  try {
    const { order_id, product_id } = req.params;
    const checkItem = await query(
      'SELECT * FROM order_items WHERE order_id = $1 AND product_id = $2',
      [order_id, product_id]
    );
    
    if (checkItem.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Buyurtma elementi topilmadi"
      });
    }
    
    await query(
      'DELETE FROM order_items WHERE order_id = $1 AND product_id = $2',
      [order_id, product_id]
    );
    
    res.status(200).json({
      success: true,
      message: "Buyurtma elementi muvaffaqiyatli o'chirildi"
    });
  } catch (error) {
    console.error("Buyurtma elementini o'chirishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Serverda xatolik",
      error: error.message
    });
  }
};

export const getAllOrderItems = async (req, res) => {
  try {
    const result = await query('SELECT * FROM order_items');
    
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error("Barcha buyurtma elementlarini olishda xatolik:", error.message);
    res.status(500).json({
      success: false,
      message: "Serverda xatolik",
      error: error.message
    });
  }
};

export default {
  createOrderItem,
  getOrderItemsByOrderId,
  getOrderItemByIds,
  updateOrderItem,
  deleteOrderItem,
  getAllOrderItems
};