// Validatsiya middleware funksiyalari - so'rovlarni tekshirish uchun
import { body, validationResult, param } from 'express-validator';

// Validatsiya natijalarini tekshirish
export const validateRequest = (req, res, next) => {
  // Validatsiya xatolarini olish
  const errors = validationResult(req);
  
  // Agar xatoliklar bo'lsa
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validatsiya xatoligi',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  // Xatolik bo'lmasa, keyingi middleware ga o'tkazish
  next();
};

// Mahsulot yaratish uchun validatsiya
export const createProductValidation = [
  // Mahsulot nomi - majburiy, kamida 2 ta belgi
  body('name')
    .notEmpty().withMessage('Mahsulot nomi kiritilishi shart')
    .isLength({ min: 2 }).withMessage('Mahsulot nomi kamida 2 ta belgidan iborat bo\'lishi kerak'),
  
  // Tavsif - ixtiyoriy
  body('description')
    .optional(),
  
  // Narx - majburiy, musbat son
  body('price')
    .notEmpty().withMessage('Mahsulot narxi kiritilishi shart')
    .isFloat({ min: 0 }).withMessage('Mahsulot narxi musbat son bo\'lishi kerak'),
  
  // Miqdor - majburiy, musbat butun son (0 ham mumkin)
  body('stock')
    .notEmpty().withMessage('Mahsulot miqdori kiritilishi shart')
    .isInt({ min: 0 }).withMessage('Mahsulot miqdori musbat butun son bo\'lishi kerak'),
    
  // Kategoriya - ixtiyoriy
  body('category')
    .optional(),
    
  // Status - ixtiyoriy, faqat belgilangan qiymatlar
  body('status')
    .optional()
    .isIn(['available', 'out of stock', 'discontinued'])
    .withMessage('Noto\'g\'ri status. Mumkin bo\'lgan qiymatlar: available, out of stock, discontinued'),
    
  // Rasm URL - ixtiyoriy, massiv
  body('image_urls')
    .optional()
    .isArray().withMessage('Rasm URLlari massiv formatida bo\'lishi kerak')
];

// Mahsulotni yangilash uchun validatsiya - create bilan bir xil
export const updateProductValidation = [
  // Mahsulot nomi - majburiy, kamida 2 ta belgi
  body('name')
    .notEmpty().withMessage('Mahsulot nomi kiritilishi shart')
    .isLength({ min: 2 }).withMessage('Mahsulot nomi kamida 2 ta belgidan iborat bo\'lishi kerak'),
  
  // Tavsif - ixtiyoriy
  body('description')
    .optional(),
  
  // Narx - majburiy, musbat son
  body('price')
    .notEmpty().withMessage('Mahsulot narxi kiritilishi shart')
    .isFloat({ min: 0 }).withMessage('Mahsulot narxi musbat son bo\'lishi kerak'),
  
  // Miqdor - majburiy, musbat butun son (0 ham mumkin)
  body('stock')
    .notEmpty().withMessage('Mahsulot miqdori kiritilishi shart')
    .isInt({ min: 0 }).withMessage('Mahsulot miqdori musbat butun son bo\'lishi kerak'),
    
  // Kategoriya - ixtiyoriy
  body('category')
    .optional(),
    
  // Status - ixtiyoriy, faqat belgilangan qiymatlar
  body('status')
    .optional()
    .isIn(['available', 'out of stock', 'discontinued'])
    .withMessage('Noto\'g\'ri status. Mumkin bo\'lgan qiymatlar: available, out of stock, discontinued'),
    
  // Rasm URL - ixtiyoriy, massiv
  body('image_urls')
    .optional()
    .isArray().withMessage('Rasm URLlari massiv formatida bo\'lishi kerak')
];

// Mijoz yaratish uchun validatsiya
export const createCustomerValidation = [
  // Mijoz ismi - majburiy, kamida 2 ta belgi
  body('first_name')
    .notEmpty().withMessage('Mijoz ismi kiritilishi shart')
    .isLength({ min: 2 }).withMessage('Mijoz ismi kamida 2 ta belgidan iborat bo\'lishi kerak'),
  
  // Mijoz familiyasi - majburiy, kamida 2 ta belgi
  body('last_name')
    .notEmpty().withMessage('Mijoz familiyasi kiritilishi shart')
    .isLength({ min: 2 }).withMessage('Mijoz familiyasi kamida 2 ta belgidan iborat bo\'lishi kerak'),
  
  // Email - majburiy, email formatida
  body('email')
    .notEmpty().withMessage('Email manzil kiritilishi shart')
    .isEmail().withMessage('Noto\'g\'ri email manzil formati'),
  
  // Telefon - ixtiyoriy, minimal 5 ta belgi
  body('phone_number')
    .optional()
    .isLength({ min: 5 }).withMessage('Telefon raqami kamida 5 ta belgidan iborat bo\'lishi kerak'),
  
  // Manzil - ixtiyoriy
  body('address')
    .optional()
];

// Mijozni yangilash uchun validatsiya
export const updateCustomerValidation = [
  // Mijoz ismi - majburiy, kamida 2 ta belgi
  body('first_name')
    .notEmpty().withMessage('Mijoz ismi kiritilishi shart')
    .isLength({ min: 2 }).withMessage('Mijoz ismi kamida 2 ta belgidan iborat bo\'lishi kerak'),
  
  // Mijoz familiyasi - majburiy, kamida 2 ta belgi
  body('last_name')
    .notEmpty().withMessage('Mijoz familiyasi kiritilishi shart')
    .isLength({ min: 2 }).withMessage('Mijoz familiyasi kamida 2 ta belgidan iborat bo\'lishi kerak'),
  
  // Email - majburiy, email formatida
  body('email')
    .notEmpty().withMessage('Email manzil kiritilishi shart')
    .isEmail().withMessage('Noto\'g\'ri email manzil formati'),
  
  // Telefon - ixtiyoriy, minimal 5 ta belgi
  body('phone_number')
    .optional()
    .isLength({ min: 5 }).withMessage('Telefon raqami kamida 5 ta belgidan iborat bo\'lishi kerak'),
  
  // Manzil - ixtiyoriy
  body('address')
    .optional()
];

// Mijozni o'chirish uchun validatsiya
export const deleteCustomerValidation = [
  // URL parametridan ID ni tekshirish
  param('id')
    .isUUID().withMessage('Noto\'g\'ri ID formati. UUID formatida bo\'lishi kerak')
];

// Buyurtma yaratish uchun validatsiya
export const createOrderValidation = [
  // Mijoz ID - majburiy, UUID formatida
  body('customer_id')
    .notEmpty().withMessage('Mijoz ID kiritilishi shart')
    .isUUID().withMessage('Mijoz ID UUID formatida bo\'lishi kerak'),
  
  // Yetkazib berish manzili - majburiy
  body('shipping_address')
    .notEmpty().withMessage('Yetkazib berish manzili kiritilishi shart'),
  
  // Buyurtma elementlari - majburiy, kamida 1 ta element
  body('items')
    .notEmpty().withMessage('Buyurtma elementlari kiritilishi shart')
    .isArray({ min: 1 }).withMessage('Buyurtma kamida 1 ta elementdan iborat bo\'lishi kerak'),
  
  // Har bir buyurtma elementi uchun validatsiya
  body('items.*.product_id')
    .notEmpty().withMessage('Mahsulot ID kiritilishi shart')
    .isUUID().withMessage('Mahsulot ID UUID formatida bo\'lishi kerak'),
  
  body('items.*.quantity')
    .notEmpty().withMessage('Mahsulot miqdori kiritilishi shart')
    .isInt({ min: 1 }).withMessage('Mahsulot miqdori kamida 1 bo\'lishi kerak')
];

// Buyurtma statusini yangilash uchun validatsiya
export const updateOrderStatusValidation = [
  // Status - majburiy, quyidagi variantlardan biri bo'lishi kerak
  body('status')
    .notEmpty().withMessage('Buyurtma statusi kiritilishi shart')
    .isIn(['pending', 'confirmed', 'shipped', 'delivered', 'canceled'])
    .withMessage('Noto\'g\'ri buyurtma statusi. Mumkin bo\'lgan variantlar: pending, confirmed, shipped, delivered, canceled')
];

// Buyurtmani o'chirish uchun validatsiya
export const deleteOrderValidation = [
  // URL parametridan ID ni tekshirish
  param('id')
    .isUUID().withMessage('Noto\'g\'ri ID formati. UUID formatida bo\'lishi kerak')
];