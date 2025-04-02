import express from 'express';
import pkg from 'pg';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const { Client } = pkg;

const app = express();
const port = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(join(__dirname, 'public')));

const client = new Client({
    user: 'postgres', 
    host: 'localhost',
    database: 'mydatabase',
    password: '1234',
    port: 5432,
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('PostgreSQL ma\'lumotlar bazasiga muvaffaqiyatli ulandi');
        const result = await client.query('SELECT NOW() AS current_time');
        console.log('Ma\'lumotlar bazasi vaqti:', result.rows[0].current_time);
        return true;
    } catch (err) {
        console.error('PostgreSQL ma\'lumotlar bazasiga ulanishda xatolik:', err);
        console.error('Xatolik kodi:', err.code);
        console.error('To\'liq xatolik:', err.stack);
        return false;
    }
}

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.get('/api/users', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error('Ma\'lumotlarni olishda xatolik:', err);
        res.status(500).json({ 
            error: 'Serverda xatolik yuz berdi', 
            details: err.message,
            code: err.code || 'UNKNOWN'
        });
    }
});

app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Ism va elektron pochta kiritilishi shart' 
        });
    }

    try {
        const result = await client.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Foydalanuvchi qo\'shishda xatolik:', err);

        if (err.code === '23505') {
            return res.status(400).json({ 
                error: 'Bu elektron pochta allaqachon ro\'yxatdan o\'tgan' 
            });
        }
        
        res.status(500).json({ 
            error: 'Serverda xatolik yuz berdi', 
            details: err.message 
        });
    }
});

const startServer = async () => {
    const dbConnected = await connectToDatabase();
    
    app.listen(port, () => {
        console.log(`Server http://localhost:${port} portida ishlamoqda`);
        
        if (!dbConnected) {
            console.warn('⚠️ DIQQAT: Ma\'lumotlar bazasiga ulanib bo\'lmadi! Dastur ma\'lumotlarsiz ishlaydi.');
        }
    });
};

startServer();
