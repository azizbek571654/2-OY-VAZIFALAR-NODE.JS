// Buyurtmalar bo'limi kontrollerlar - API so'rovlarni qayta ishlash funksiyalari
import { query } from '../db/index.js';

// Barcha buyurtmalarni olish
export const getAllOrders = async (req, res) => {
  try {
    // Buyurtmalar jadvalidan barcha buyurtmalarni olish
    // Ma'lumotlar bazasida total_amount o'rniga total_price ustuni mavjud
    const result = await query(`
      SELECT 
        o.id, o.total_price, o.status, o.shipping_address, o.created_at,
        c.id as customer_id, c.first_name, c.last_name, c.email
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      ORDER BY o.created_at DESC
    `);
    
    // Natijani qaytarish
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Buyurtmalarni olishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

// ID bo'yicha buyurtmani olish
export const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Buyurtmani va mijoz ma'lumotlarini olish
    const orderResult = await query(`
      SELECT 
        o.id, o.total_price, o.status, o.shipping_address, o.created_at,
        c.id as customer_id, c.first_name, c.last_name, c.email
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.id = $1
    `, [id]);
    
    // Agar buyurtma topilmasa
    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan buyurtma topilmadi`
      });
    }
    
    // Buyurtma elementlarini olish
    const itemsResult = await query(`
      SELECT 
        oi.order_id, oi.product_id, oi.quantity, oi.price,
        p.name as product_name, p.description as product_description
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `, [id]);
    
    // Ma'lumotlarni birlashtirib qaytarish
    const order = {
      ...orderResult.rows[0],
      items: itemsResult.rows
    };
    
    // Natijani qaytarish
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Buyurtmani olishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

// Yangi buyurtma yaratish
export const createOrder = async (req, res) => {
  try {
    // So'rovdan ma'lumotlarni olish
    const { customer_id, items, shipping_address } = req.body;
    
    // Mijozni tekshirish
    const customerCheck = await query('SELECT * FROM customers WHERE id = $1', [customer_id]);
    if (customerCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${customer_id} bo'lgan mijoz topilmadi`
      });
    }
    
    // Mahsulotlar mavjudligini va miqdorini tekshirish
    for (const item of items) {
      const productCheck = await query(
        'SELECT * FROM products WHERE id = $1',
        [item.product_id]
      );
      
      if (productCheck.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `ID: ${item.product_id} bo'lgan mahsulot topilmadi`
        });
      }
      
      const product = productCheck.rows[0];
      
      // Producs jadvalida quantity emas stock ustuni mavjud
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Mahsulot "${product.name}" uchun yetarli miqdor yo'q. Mavjud: ${product.stock}, So'ralgan: ${item.quantity}`
        });
      }
    }
    
    // Umumiy summani hisoblash
    let total_price = 0;
    const itemsWithPrice = [];
    
    for (const item of items) {
      const productResult = await query('SELECT price FROM products WHERE id = $1', [item.product_id]);
      const product = productResult.rows[0];
      const itemTotal = product.price * item.quantity;
      
      total_price += itemTotal;
      itemsWithPrice.push({
        ...item,
        price: product.price
      });
    }
    
    // Transaksiya boshlanishi
    await query('BEGIN');
    
    try {
      // Buyurtmani yaratish (total_amount emas total_price ustuni ishlatiladi)
      const orderResult = await query(
        'INSERT INTO orders (customer_id, total_price, shipping_address) VALUES ($1, $2, $3) RETURNING *',
        [customer_id, total_price, shipping_address]
      );
      
      const newOrder = orderResult.rows[0];
      
      // Buyurtma elementlarini yaratish
      for (const item of itemsWithPrice) {
        await query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
          [newOrder.id, item.product_id, item.quantity, item.price]
        );
        
        // Mahsulot miqdorini kamaytirish (quantity emas stock ustuni ishlatiladi)
        await query(
          'UPDATE products SET stock = stock - $1 WHERE id = $2',
          [item.quantity, item.product_id]
        );
      }
      
      // Transaksiyani yakunlash
      await query('COMMIT');

      // Buyurtma elementlari bilan birga to'liq buyurtmani olish
      const orderDetailsResult = await query(`
        SELECT 
          o.id, o.total_price, o.status, o.shipping_address, o.created_at,
          c.id as customer_id, c.first_name, c.last_name, c.email
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        WHERE o.id = $1
      `, [newOrder.id]);
      
      // Buyurtma elementlarini olish
      const itemsResult = await query(`
        SELECT 
          oi.order_id, oi.product_id, oi.quantity, oi.price,
          p.name as product_name
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = $1
      `, [newOrder.id]);
      
      // Ma'lumotlarni birlashtirib qaytarish
      const order = {
        ...orderDetailsResult.rows[0],
        items: itemsResult.rows
      };
      
      // Natijani qaytarish
      res.status(201).json({
        success: true,
        data: order,
        message: 'Buyurtma muvaffaqiyatli yaratildi'
      });
      
    } catch (error) {
      // Xatolik bo'lsa transaksiyani bekor qilish
      await query('ROLLBACK');
      throw error;
    }
    
  } catch (error) {
    console.error('Buyurtma yaratishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

// Buyurtma statusini yangilash
export const updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    
    // Buyurtmani tekshirish
    const orderCheck = await query('SELECT * FROM orders WHERE id = $1', [id]);
    
    // Agar buyurtma topilmasa
    if (orderCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan buyurtma topilmadi`
      });
    }
    
    // Buyurtma statusini yangilash
    const result = await query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    // Natijani qaytarish
    res.status(200).json({
      success: true,
      data: result.rows[0],
      message: 'Buyurtma statusi muvaffaqiyatli yangilandi'
    });
  } catch (error) {
    console.error('Buyurtma statusini yangilashda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

// Buyurtmani o'chirish
export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Buyurtmani tekshirish
    const orderCheck = await query('SELECT * FROM orders WHERE id = $1', [id]);
    
    // Agar buyurtma topilmasa
    if (orderCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan buyurtma topilmadi`
      });
    }
    
    // Transaksiya boshlanishi
    await query('BEGIN');
    
    try {
      // Buyurtma elementlarini olish (o'chirishdan oldin mahsulot miqdorini qaytarish uchun)
      const orderItems = await query('SELECT * FROM order_items WHERE order_id = $1', [id]);
      
      // Mahsulot miqdorlarini qaytarish (quantity emas stock ustuni ishlatiladi)
      for (const item of orderItems.rows) {
        await query(
          'UPDATE products SET stock = stock + $1 WHERE id = $2',
          [item.quantity, item.product_id]
        );
      }
      
      // Buyurtmani o'chirish (buyurtma elementlari CASCADE orqali o'chiriladi)
      await query('DELETE FROM orders WHERE id = $1', [id]);
      
      // Transaksiyani yakunlash
      await query('COMMIT');
      
      // Natijani qaytarish
      res.status(200).json({
        success: true,
        message: 'Buyurtma muvaffaqiyatli o\'chirildi'
      });
      
    } catch (error) {
      // Xatolik bo'lsa transaksiyani bekor qilish
      await query('ROLLBACK');
      throw error;
    }
    
  } catch (error) {
    console.error('Buyurtmani o\'chirishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

// Mijozning barcha buyurtmalarini olish
export const getCustomerOrders = async (req, res) => {
  try {
    const customerId = req.params.id;
    
    // Avval mijoz mavjudligini tekshirish
    const customerCheck = await query('SELECT * FROM customers WHERE id = $1', [customerId]);
    
    // Agar mijoz topilmasa
    if (customerCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${customerId} bo'lgan mijoz topilmadi`
      });
    }
    
    // Mijozning barcha buyurtmalarini olish
    const orders = await query(`
      SELECT 
        o.id, o.total_price, o.status, o.shipping_address, o.created_at, o.updated_at
      FROM orders o
      WHERE o.customer_id = $1
      ORDER BY o.created_at DESC
    `, [customerId]);
    
    // Har bir buyurtma uchun elementlarni olish
    const ordersWithItems = await Promise.all(orders.rows.map(async (order) => {
      const items = await query(`
        SELECT 
          oi.product_id, oi.quantity, oi.price,
          p.name as product_name, p.description as product_description,
          p.status as product_status
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = $1
      `, [order.id]);
      
      // Buyurtmaga elementlarni qo'shish
      return {
        ...order,
        items: items.rows
      };
    }));
    
    // Natijani qaytarish
    res.status(200).json({
      success: true,
      count: ordersWithItems.length,
      data: ordersWithItems
    });
  } catch (error) {
    console.error('Mijozning buyurtmalarini olishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};