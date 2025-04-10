import { query } from '../db/index.js';

export const getAllCustomers = async (req, res) => {
  try {
    const result = await query('SELECT * FROM customers ORDER BY created_at DESC');
    
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Mijozlarni olishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    
    const result = await query('SELECT * FROM customers WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan mijoz topilmadi`
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Mijozni olishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

export const getCustomerOrders = async (req, res) => {
  try {
    const id = req.params.id;
    
    const customerResult = await query('SELECT * FROM customers WHERE id = $1', [id]);
    
    if (customerResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan mijoz topilmadi`
      });
    }
    
    const orderResult = await query(`
      SELECT 
        o.id, o.customer_id, o.total_price, o.status, o.shipping_address, 
        o.created_at, o.updated_at,
        (
          SELECT json_agg(
            json_build_object(
              'order_id', oi.order_id,
              'product_id', oi.product_id,
              'quantity', oi.quantity,
              'price', oi.price,
              'product', (
                SELECT json_build_object('id', p.id, 'name', p.name) 
                FROM products p 
                WHERE p.id = oi.product_id
              )
            )
          )
          FROM order_items oi
          WHERE oi.order_id = o.id
        ) as items
      FROM orders o
      WHERE o.customer_id = $1
      ORDER BY o.created_at DESC
    `, [id]);
    
    res.status(200).json({
      success: true,
      count: orderResult.rows.length,
      data: orderResult.rows
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

export const createCustomer = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, address } = req.body;
    
    const checkEmail = await query('SELECT * FROM customers WHERE email = $1', [email]);
    if (checkEmail.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: `${email} elektron pochta manzili bilan mijoz allaqachon mavjud`
      });
    }
    
    const result = await query(
      'INSERT INTO customers (first_name, last_name, email, phone_number, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, last_name, email, phone_number, address]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Mijoz muvaffaqiyatli yaratildi'
    });
  } catch (error) {
    console.error('Mijoz yaratishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const { first_name, last_name, email, phone_number, address } = req.body;
    
    const checkResult = await query('SELECT * FROM customers WHERE id = $1', [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan mijoz topilmadi`
      });
    }
    
    if (email !== checkResult.rows[0].email) {
      const checkEmail = await query('SELECT * FROM customers WHERE email = $1 AND id != $2', [email, id]);
      if (checkEmail.rows.length > 0) {
        return res.status(400).json({
          success: false,
          message: `${email} elektron pochta manzili bilan boshqa mijoz allaqachon mavjud`
        });
      }
    }
    
    const result = await query(
      'UPDATE customers SET first_name = $1, last_name = $2, email = $3, phone_number = $4, address = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [first_name, last_name, email, phone_number, address, id]
    );
    
    res.status(200).json({
      success: true,
      data: result.rows[0],
      message: 'Mijoz muvaffaqiyatli yangilandi'
    });
  } catch (error) {
    console.error('Mijozni yangilashda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};;

export const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    
    const customerCheck = await query('SELECT * FROM customers WHERE id = $1', [id]);
    
    if (customerCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan mijoz topilmadi`
      });
    }
    
    await query('BEGIN');
    
    try {
      let deletedOrderItemsCount = 0;
      
      const ordersResult = await query('SELECT id FROM orders WHERE customer_id = $1', [id]);
      
      for (const order of ordersResult.rows) {
        const deleteItemsResult = await query('DELETE FROM order_items WHERE order_id = $1', [order.id]);
        deletedOrderItemsCount += deleteItemsResult.rowCount;
      }
      
      const deleteOrdersResult = await query('DELETE FROM orders WHERE customer_id = $1', [id]);
      const deletedOrdersCount = deleteOrdersResult.rowCount;
      
      await query('DELETE FROM customers WHERE id = $1', [id]);
      
      await query('COMMIT');
      
      let message = 'Mijoz muvaffaqiyatli o\'chirildi';
      if (deletedOrdersCount > 0 || deletedOrderItemsCount > 0) {
        message += `. ${deletedOrdersCount} ta buyurtma va ${deletedOrderItemsCount} ta buyurtma elementi ham o'chirildi.`;
      }
      
      res.status(200).json({
        success: true,
        message: message
      });
    } catch (error) {
      await query('ROLLBACK');
      throw error;
    }
    
  } catch (error) {
    console.error('Mijozni o\'chirishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};