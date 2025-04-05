import pool from '../db/db.js';

export const getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Product"');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};