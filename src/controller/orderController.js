import pool from '../db/db.js';

export const getOrders = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Order"');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
