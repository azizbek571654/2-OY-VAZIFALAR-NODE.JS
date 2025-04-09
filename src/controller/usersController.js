import { query } from '../db/index.js';

export const getAllUsers = async (req, res) => {
    try {
        const result = await query('SELECT * FROM users');
        res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        console.error(`Userlarni olishda xatolik:`, error.message);
        res.status(500).json({ 
            success: false,
            message: 'Server xatoligi',
            error: error.message
        });
    }
};
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `ID: ${id} bo'lgan foydalanuvchi topilmadi`,
                error: 'Foydalanuvchi topilmadi' 
            });
        }
        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error(`Foydalanuvchini olishda xatolik:`, error.message);
        res.status(500).json({
            success: false,
            message: `Server xatoligi`,
            error: error.message
        });
    }        
};
export const createUser = async (req, res) => {
    try {
        const { username, email, password, role, status } = req.body;
        const result = await query(
            'INSERT INTO users (username, email, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
            [username, email, password, role, status || 'active']
        );
        res.status(201).json({
            success: true,
            data: result.rows[0],
            message: 'Foydalanuvchi muvaffaqiyatli yaratildi'
        });
    } catch (error) {
        console.error(`Foydalanuvchi yaratishda xatolik:`, error.message);
        // Duplicate key xatosi
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: 'Bu foydalanuvchi nomi yoki email allaqachon mavjud',
                error: error.message
            });
        }
        // Check constraint xatosi
        if (error.code === '23514') {
            return res.status(400).json({
                success: false,
                message: 'Noto\'g\'ri rol yoki status qiymati',
                error: error.message
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Serverda xatolik',
            error: error.message
        });
    }        
};                      
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email, role, status } = req.body;
        const checkUser = await query('SELECT * FROM users WHERE id = $1', [id]);
        if (checkUser.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Foydalanuvchi topilmadi',
                message: `ID: ${id} bo'lgan foydalanuvchi topilmadi`
            });
        }
        let updateQuery = 'UPDATE users SET updated_at = CURRENT_TIMESTAMP';
        const queryParams = [];
        let paramCount = 1;
        if (username) {
            updateQuery += `, username = $${paramCount}`;
            queryParams.push(username);
            paramCount++;
        }
        if (email) {
            updateQuery += `, email = $${paramCount}`;
            queryParams.push(email);
            paramCount++;
        }
        if (role) {
            updateQuery += `, role = $${paramCount}`;
            queryParams.push(role);
            paramCount++;
        }
        if (status) {
            updateQuery += `, status = $${paramCount}`;
            queryParams.push(status);
            paramCount++;
        }
        updateQuery += ` WHERE id = $${paramCount} RETURNING *`;
        queryParams.push(id);
        const result = await query(updateQuery, queryParams);
        res.status(200).json({
            success: true,
            message: 'Foydalanuvchi ma\'lumotlari muvaffaqiyatli yangilandi',
            data: result.rows[0]
        });
    } catch (error) {
        console.error(`Foydalanuvchi yangilashda xatolik:`, error.message);
        // Duplicate key xatosi
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: 'Bu foydalanuvchi nomi yoki email allaqachon mavjud',
                error: error.message
            });
        }
        // Check constraint xatosi
        if (error.code === '23514') {
            return res.status(400).json({
                success: false,
                message: 'Noto\'g\'ri rol yoki status qiymati',
                error: error.message
            });
        }     
        res.status(500).json({ 
            success: false,
            message: 'Serverda xatolik',
            error: error.message
        });
    }        
}; 
export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { current_password, new_password } = req.body;
        const checkUser = await query('SELECT * FROM users WHERE id = $1', [id]);
        if (checkUser.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Foydalanuvchi topilmadi',
                message: `ID: ${id} bo'lgan foydalanuvchi topilmadi`
            });
        }
        if (checkUser.rows[0].password !== current_password) {
            return res.status(400).json({
                success: false, 
                error: 'Noto\'g\'ri parol',
                message: 'Joriy parol noto\'g\'ri'
            });
        }
        const result = await query(
            'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *', 
            [new_password, id]
        );
        const userData = result.rows[0];
        delete userData.password;
        res.status(200).json({
            success: true,
            message: 'Foydalanuvchi paroli muvaffaqiyatli yangilandi',
            data: userData
        });
    } catch (error) {
        console.error(`Foydalanuvchi parolni yangilashda xatolik:`, error.message);
        res.status(500).json({ 
            success: false,
            message: 'Serverda xatolik',
            error: error.message
        });
    }        
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const checkUser = await query('SELECT * FROM users WHERE id = $1', [id]);
        if (checkUser.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Foydalanuvchi topilmadi',
                message: `ID: ${id} bo'lgan foydalanuvchi topilmadi`
            });
        }
        const result = await query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        res.status(200).json({
            success: true,
            message: 'Foydalanuvchi muvaffaqiyatli o\'chirildi',
            data: result.rows[0]
        });
    } catch (error) {
        console.error(`Foydalanuvchini o'chirishda xatolik:`, error.message);
        res.status(500).json({ 
            success: false,
            message: 'Serverda xatolik', 
            error: error.message
        });
    }        
};  

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                data: result.rows[0]
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Foydalanuvchi topilmadi'
            });
        }
    } catch (error) {
        console.error(`Foydalanuvchini email bo'yicha olishda xatolik:`, error.message);
        res.status(500).json({
            success: false,
            message: 'Server xatoligi',
            error: error.message
        });
    }
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    updatePassword,
    getUserByEmail,
    deleteUser
};