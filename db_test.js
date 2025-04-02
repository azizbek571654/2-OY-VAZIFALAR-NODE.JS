import pkg from 'pg';
const { Client } = pkg;

// PostgreSQL ma'lumotlar bazasiga ulanish testini tekshirish
async function testConnection() {
    // PostgreSQL ulanishi uchun sozlamalar
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'mydatabase',
        password: '1234',
        port: 5432,
    });

    try {
        // Ma'lumotlar bazasiga ulanish
        await client.connect();
        console.log('PostgreSQL ma\'lumotlar bazasiga muvaffaqiyatli ulandi');
        
        // Test so'rov yuborish
        const result = await client.query('SELECT NOW() AS current_time');
        console.log('Ma\'lumotlar bazasi vaqti:', result.rows[0].current_time);
        
        // Foydalanuvchilar jadvalini tekshirish
        const usersTable = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public'
                AND table_name = 'users'
            );
        `);
        
        if (usersTable.rows[0].exists) {
            console.log('Foydalanuvchilar jadvali mavjud');
            
            // Foydalanuvchilar sonini tekshirish
            const userCount = await client.query('SELECT COUNT(*) FROM users');
            console.log(`Foydalanuvchilar soni: ${userCount.rows[0].count}`);
            
            // Barcha foydalanuvchilarni olish
            const users = await client.query('SELECT * FROM users');
            console.log('Foydalanuvchilar ro\'yxati:');
            console.table(users.rows);
        } else {
            console.log('Foydalanuvchilar jadvali mavjud emas');
        }
        
        // Ulanishni yopish
        await client.end();
        console.log('Ma\'lumotlar bazasi bilan ulanish yopildi');
        
    } catch (err) {
        console.error('PostgreSQL ma\'lumotlar bazasiga ulanishda xatolik:', err);
        console.error('Xatolik kodi:', err.code);
        console.error('To\'liq xatolik:', err.stack);
    }
}

// Test funksiyasini ishga tushirish
testConnection();