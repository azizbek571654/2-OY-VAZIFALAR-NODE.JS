# Foydalanuvchilar boshqaruv tizimi

Bu dastur oddiy web-forma orqali foydalanuvchilar ma'lumotlarini to'plash va PostgreSQL ma'lumotlar bazasida saqlash uchun yaratilgan.

## Tizim haqida

Ushbu dastur quyidagi texnologiyalardan foydalanadi:
- Frontend: HTML, CSS, JavaScript (Vanilla JS)
- Backend: Node.js, Express.js
- Ma'lumotlar bazasi: PostgreSQL

## O'rnatish va ishga tushirish

1. Loyiha fayllarini yuklab oling yoki klonlang
2. PostgreSQL ma'lumotlar bazasini yarating
3. Loyiha papkasiga o'ting va sozlamalarni o'rnating:

```bash
# Ma'lumotlar bazasini yaratish
psql -U postgres
CREATE DATABASE mydatabase;
\c mydatabase
\i setup_db.sql

# Kerakli paketlarni o'rnatish
npm install

# Dasturni ishga tushirish
npm run dev
```

## Ma'lumotlar bazasi sxemasi

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
```

## API dokumentatsiyasi

- `GET /api/users` - Barcha foydalanuvchilar ro'yxatini olish
- `POST /api/users` - Yangi foydalanuvchi qo'shish

## Eslatma
Bu dastur mahalliy kompyuterda ishlatish uchun yaratilgan, uni o'z kompyuteringizda to'g'ridan-to'g'ri ishlatish uchun ma'lumotlar bazasi konfiguratsiyasini o'zgartirish kerak.