import { query } from '../db/index.js';

export const getAllShipments = async (req, res) => {
  try {
    const { status, order_id } = req.query;

    let queryText = 'SELECT * FROM shipments';
    const queryParams = [];

    if (status || order_id) {
      queryText += ' WHERE';
      
      if (status) {
        queryText += ' status = $1';
        queryParams.push(status);
      }
      
      if (order_id) {
        if (queryParams.length) {
          queryText += ' AND';
        }
        queryText += ` order_id = $${queryParams.length + 1}`;
        queryParams.push(order_id);
      }
    }

    queryText += ' ORDER BY created_at DESC';
    
    const result = await query(queryText, queryParams)

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Jonatmalarni olishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

export const getShipmentById = async (req, res) => {
  try {
    const id = req.params.id;
  
    const result = await query('SELECT * FROM shipments WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan jo'natma topilmadi`
      });
    }

    const shipment = result.rows[0];
    
    const orderResult = await query(`
      SELECT o.*, c.first_name, c.last_name, c.email 
      FROM orders o 
      JOIN customers c ON o.customer_id = c.id 
      WHERE o.id = $1
    `, [shipment.order_id]);
    
    const shipmentWithDetails = {
      ...shipment,
      order: orderResult.rows[0] || null
    };
    
    res.status(200).json({
      success: true,
      data: shipmentWithDetails
    });
  } catch (error) {
    console.error('Jonatmani olishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

export const getShipmentsByOrderId = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    
    const orderCheck = await query('SELECT * FROM orders WHERE id = $1', [orderId]);
    
    if (orderCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${orderId} bo'lgan buyurtma topilmadi`
      });
    }
    
    const result = await query(
      'SELECT * FROM shipments WHERE order_id = $1 ORDER BY created_at DESC',
      [orderId]
    );
    
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Buyurtma jonatmalarini olishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

export const createShipment = async (req, res) => {
  try {
    const {
      order_id,
      status = 'pending',
      tracking_number,
      estimated_delivery
    } = req.body;
    
    const orderCheck = await query('SELECT * FROM orders WHERE id = $1', [order_id]);
    
    if (orderCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${order_id} bo'lgan buyurtma topilmadi`
      });
    }
    
    const result = await query(
      `INSERT INTO shipments 
       (order_id, status, tracking_number, estimated_delivery) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [order_id, status, tracking_number, estimated_delivery]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Jonatma muvaffaqiyatli yaratildi'
    });
  } catch (error) {
    console.error('Jonatma yaratishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

export const updateShipment = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      status,
      tracking_number,
      estimated_delivery
    } = req.body;
    
    const checkResult = await query('SELECT * FROM shipments WHERE id = $1', [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan jo'natma topilmadi`
      });
    }
    
    let updateQuery = 'UPDATE shipments SET';
    const queryParams = [];
    let paramCounter = 1;
    
    if (status) {
      updateQuery += ` status = $${paramCounter},`;
      queryParams.push(status);
      paramCounter++;
    }
    
    if (tracking_number) {
      updateQuery += ` tracking_number = $${paramCounter},`;
      queryParams.push(tracking_number);
      paramCounter++;
    }
    
    if (estimated_delivery) {
      updateQuery += ` estimated_delivery = $${paramCounter},`;
      queryParams.push(estimated_delivery);
      paramCounter++;
    }
    
    updateQuery += ` updated_at = CURRENT_TIMESTAMP`;
    
    updateQuery += ` WHERE id = $${paramCounter} RETURNING *`;
    queryParams.push(id);
    
    const result = await query(updateQuery, queryParams);
    
    res.status(200).json({
      success: true,
      data: result.rows[0],
      message: 'Jonatma muvaffaqiyatli yangilandi'
    });
  } catch (error) {
    console.error('Jonatmani yangilashda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

export const deleteShipment = async (req, res) => {
  try {
    const id = req.params.id;
    
    const checkResult = await query('SELECT * FROM shipments WHERE id = $1', [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `ID: ${id} bo'lgan jo'natma topilmadi`
      });
    }
    
    await query('DELETE FROM shipments WHERE id = $1', [id]);
    res.status(200).json({
      success: true,
      message: 'Jo\'natma muvaffaqiyatli o\'chirildi'
    });
  } catch (error) {
    console.error('Jo\'natmani o\'chirishda xatolik:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server xatoligi',
      error: error.message
    });
  }
};

export default {
  getAllShipments,
  getShipmentById,
  getShipmentsByOrderId,
  createShipment,
  updateShipment,
  deleteShipment
};