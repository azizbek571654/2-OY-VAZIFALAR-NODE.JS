# Buyurtmalar Boshqarish Tizimi API

Bu repository buyurtmalar boshqarish tizimini tashkil qiluvchi RESTful API hisoblanadi. API Node.js, Express.js va PostgreSQL texnologiyalaridan foydalanib yaratilgan.

## 🏢 Loyiha tuzilmasi

```
├── src/
│   ├── controller/      # API so'rovlarini qayta ishlash funksiyalari
│   ├── db/              # Ma'lumotlar bazasiga ulanish va so'rovlar
│   ├── middleware/      # So'rovlarni validatsiya qilish va middleware
│   ├── routes/          # API yo'llari (routes)
│   └── index.js         # Barcha modullarni birlashtiradigan asosiy fayl
├── .env                 # Muhit o'zgaruvchilari
├── server.js            # Server ishga tushirish fayli
└── package.json         # Loyiha ma'lumotlari va bog'liqliklar
```

## 🚀 O'rnatish

1. Repository klonlash:
```bash
git clone <repository-url>
cd order-management-api
```

2. Kerakli package'larni o'rnatish:
```bash
npm install
```

3. `.env` faylini sozlash:
```
PORT=8000
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=24h

# PostgreSQL connection
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
PGUSER=username
PGHOST=localhost
PGPASSWORD=password
PGDATABASE=database_name
PGPORT=5432
```

4. Ma'lumotlar bazasini tayyorlash:
   - PostgreSQL o'rnatilganligiga ishonch hosil qiling
   - `.env` faylidagi ma'lumotlar to'g'riligini tekshiring
   - Ma'lumotlar bazasi uchun jadvallar avtomatik ravishda yaratiladi

5. Serverni ishga tushirish:
```bash
npm start
# yoki
node server.js
```

## 📡 API endpointlari

### 📦 Mahsulotlar

- **GET /api/products** - Barcha mahsulotlarni olish
- **GET /api/products/:id** - ID bo'yicha mahsulotni olish
- **POST /api/products** - Yangi mahsulot yaratish
- **PUT /api/products/:id** - Mahsulotni yangilash
- **DELETE /api/products/:id** - Mahsulotni o'chirish

### 👨‍👩‍👧‍👦 Mijozlar

- **GET /api/customers** - Barcha mijozlarni olish
- **GET /api/customers/:id** - ID bo'yicha mijozni olish
- **GET /api/customers/:id/orders** - Mijozning barcha buyurtmalarini olish
- **POST /api/customers** - Yangi mijoz yaratish
- **PUT /api/customers/:id** - Mijozni yangilash
- **DELETE /api/customers/:id** - Mijozni o'chirish

### 🛒 Buyurtmalar

- **GET /api/orders** - Barcha buyurtmalarni olish
- **GET /api/orders/:id** - ID bo'yicha buyurtmani olish
- **POST /api/orders** - Yangi buyurtma yaratish
- **PUT /api/orders/:id** - Buyurtma statusini yangilash
- **DELETE /api/orders/:id** - Buyurtmani o'chirish

## ⚠️ Tez-tez uchraydigan xatoliklar va ularni bartaraf etish

### 🔌 Ma'lumotlar bazasiga ulanish muammolari

- **Xatolik**: "Ma'lumotlar bazasiga ulanishda xatolik"
- **Yechim**: 
  - `.env` fayli to'g'ri sozlanganini tekshiring
  - PostgreSQL server ishga tushganini tekshiring
  - Foydalanuvchi nomi va parol to'g'riligini tekshiring
  - SSL sozlamalari to'g'riligini tekshiring, `ssl: { rejectUnauthorized: false }` sozlamasini qo'shish kerak bo'lishi mumkin

### 🔗 Foreign key constraint xatoliklari

- **Xatolik**: "violates foreign key constraint"
- **Yechim**: 
  - Bog'langan ma'lumotlar mavjudligini tekshiring
  - Transaksiya ishlatib, bog'liq ma'lumotlarni to'g'ri tartibda o'chirish
  - "ON DELETE SET NULL" yoki "ON DELETE CASCADE" qo'shish orqali ma'lumotlar bazasi cheklovlarini o'zgartirish

### 🆔 UUID formatidagi xatoliklar

- **Xatolik**: "invalid input syntax for type uuid"
- **Yechim**:
  - So'rovlar uchun UUID formatidagi qiymatlar to'g'ri formatda ekanligini tekshiring
  - Mijoz, mahsulot va buyurtma ID larini UUID formatida yuborishni ta'minlang

### ✅ Validatsiya xatoliklari

- **Xatolik**: "Validatsiya xatoligi"
- **Yechim**:
  - So'rovning to'g'ri formatda ekanligini tekshiring
  - Barcha majburiy maydonlar to'ldirilganini tekshiring
  - Mijozlarda `first_name`, `last_name` va `email` to'g'ri formatda
  - Mahsulotlarda `name`, `price` va `stock` to'g'ri formatda
  - Buyurtmalarda `customer_id`, `items` va har bir item uchun `product_id` va `quantity` to'g'ri formatda ekanligini tekshiring

### 🔄 Buyurtma statusini yangilashdagi xatoliklar

- **Xatolik**: "Cannot PUT /api/orders/:id"
- **Yechim**:
  - URL manzil to'g'ri formatda ekanligini tekshiring: `/api/orders/:id` yoki `/api/orders/:id/status`
  - HTTP metodi to'g'ri ekanligini tekshiring: `PUT` yoki `PATCH`
  - Body JSON formatida va `status` maydonini o'z ichiga olganini tekshiring
  - Status qiymati quyidagilardan biri ekanligini tekshiring: `pending`, `confirmed`, `shipped`, `delivered`, `canceled`

### 📊 Ma'lumotlar bazasi jadvallari nomlanishi

Mahalliy ma'lumotlar bazasi jadvallari nomi va ustunlari bilan bog'liq muammolar uchun quyidagilarni tekshiring:
- Products jadvalida `quantity` o'rniga `stock` ishlatilishi
- Customers jadvalida `name` o'rniga `first_name` va `last_name` ishlatilishi
- Orders jadvalida `total_amount` o'rniga `total_price` ishlatilishi

### 🔄 API serverni qayta ishga tushirish

Agar server ishlamay qolsa:
```bash
# Barcha o'zgarishlarni saqlang
# So'ng serverni qayta ishga tushiring
node server.js
```

Agar buyurtma statusini yangilashdagi PUT so'rovlari ishlamasa:
1. `src/routes/orderRoutes.js` faylini ochib, quyidagi o'zgarishni qiling:
   ```javascript
   // Bu qatorni:
   router.put('/:id/status', updateOrderStatusValidation, validateRequest, updateOrderStatus);
   
   // Shunday o'zgartiring:
   router.put('/:id', updateOrderStatusValidation, validateRequest, updateOrderStatus);
   ```
2. Serverni qayta ishga tushiring.

## 🧪 Foydali so'rovlar

### Mahsulot yaratish
```json
POST /api/products
{
  "name": "Yangi mahsulot",
  "description": "Mahsulot tavsifi",
  "price": 100000,
  "stock": 25
}
```

### Mijoz yaratish
```json
POST /api/customers
{
  "first_name": "Ali",
  "last_name": "Valiyev",
  "email": "ali@example.com",
  "phone_number": "+998901234567"
}
```

### Buyurtma yaratish
```json
POST /api/orders
{
  "customer_id": "550e8400-e29b-41d4-a716-446655440000",
  "shipping_address": "Toshkent sh., Chilonzor tumani, 14-mavze",
  "items": [
    {
      "product_id": "550e8400-e29b-41d4-a716-446655440111",
      "quantity": 3
    },
    {
      "product_id": "550e8400-e29b-41d4-a716-446655440222",
      "quantity": 1
    }
  ]
}
```

### Buyurtma statusini yangilash
```json
PUT /api/orders/550e8400-e29b-41d4-a716-446655440333
{
  "status": "confirmed"
}
```

## ⚠️ Muhim eslatmalar

1. **Barcha ID lar UUID formatida bo'lishi kerak**
2. **Mahsulotlarni o'chirishda**, ularga bog'liq buyurtma elementlari mavjud bo'lsa, kerakli ehtiyot choralarini ko'ring
3. **Mijozni o'chirishda**, unga bog'liq buyurtmalar ham o'chiriladi (CASCADE)
4. **Mahsulot miqdori** (stock) buyurtma yaratilganda avtomatik kamayadi, buyurtma o'chirilganda esa avtomatik ortadi
5. **`.env` faylidagi ma'lumotlar** hech qachon git repositoryga yuklanmasligi kerak
6. **Deploy qilishdan oldin**, barcha taraqqiyot (development) sozlamalarini o'zgartirib, production sozlamalarini qo'llang

## 🛠️ Foydalanilgan texnologiyalar

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Ma'lumotlar bazasi
- **express-validator** - Validatsiya
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Muhit o'zgaruvchilari
- **helmet** - Xavfsizlik middleware'i
- **uuid** - UUID yaratish uchun

## 📝 Litsenziya

MIT