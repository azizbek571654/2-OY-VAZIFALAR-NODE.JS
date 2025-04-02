-- PostgreSQL ma'lumotlar bazasini yaratish va sozlash
-- Mazkur skript mahalliy kompyuterda ma'lumotlar bazasini yaratadi

-- Foydalanuvchilar jadvali
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Test foydalanuvchilar
INSERT INTO users (name, email) VALUES
    ('Alisher Navoiy', 'alisher@example.com'),
    ('Abu Rayxon Beruniy', 'beruniy@example.com'),
    ('Mirzo Ulug''bek', 'ulugbek@example.com')
ON CONFLICT (email) DO NOTHING;

-- Natijani tekshirish
SELECT * FROM users;