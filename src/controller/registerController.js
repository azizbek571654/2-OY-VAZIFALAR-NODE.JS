import { query } from '../db/index.js';

const register = async (req, res) => {
    const { email, password } = req.body;   

    try {
        const result = await query('INSERT INTO users (email, username, password, confirmPassword, role, ) VALUES ($1, $2) RETURNING *', [email, password]);
        res.status(201).json({
            success: true,
            data: result.rows[0],
            message: 'Foydalanuvchi muvaffaqiyatli yaratildi'
        });
    } catch (error) {
        console.error(`Foydalanuvchi yaratishda xatolik:`, error.message);
        res.status(500).json({
            success: false,
            message: 'Serverda xatolik',
            error: error.message
        });
    }
};
            