import pkg from 'pg';
const { Client } = pkg;
async function testConnection() {

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'mydatabase',
        password: '1234',
        port: 5432,
    });

    try {
 
        await client.connect();
        console.log('PostgreSQL ma\'lumotlar bazasiga muvaffaqiyatli ulandi');
        
        const result = await client.query('SELECT NOW() AS current_time');
        console.log('Ma\'lumotlar bazasi vaqti:', result.rows[0].current_time);
        
        const usersTable = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public'
                AND table_name = 'users'
            );
        `);
        
        if (usersTable.rows[0].exists) {
            console.log('Foydalanuvchilar jadvali mavjud');
            
            const userCount = await client.query('SELECT COUNT(*) FROM users');
            console.log(`Foydalanuvchilar soni: ${userCount.rows[0].count}`);
            
            const users = await client.query('SELECT * FROM users');
            console.log('Foydalanuvchilar ro\'yxati:');
            console.table(users.rows);
        } else {
            console.log('Foydalanuvchilar jadvali mavjud emas');
        }
        
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
