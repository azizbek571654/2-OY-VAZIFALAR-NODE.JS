import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.json());

const FILE_PATH = 'books.json';

// JSON fayldan ma'lumotlarni o‘qish
const readBooks = () => {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

// JSON faylga yozish
const writeBooks = (books) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(books, null, 2));
};

// Barcha kitoblarni olish
app.get('/books', (req, res) => {
    res.json(readBooks());
});

// ID bo‘yicha kitobni olish
app.get('/books/:id', (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Kitob topilmadi' });
    res.json(book);
});

// Yangi kitob qo‘shish (faqat unikal ID lar yaratish)
app.post('/books', (req, res) => {
    const books = readBooks();
    const newBook = { id: String(Date.now()), ...req.body };

    // Yangi kitobni listga qo‘shish
    books.push(newBook);
    writeBooks(books);

    res.status(201).json(newBook);
});

// Kitobni yangilash (faqat mavjud ID larni o‘zgartirish)
app.put('/books/:id', (req, res) => {
    const books = readBooks();
    const bookIndex = books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) return res.status(404).json({ message: 'Kitob topilmadi' });

    // ID ni o‘zgartirmay, faqat boshqa ma'lumotlarni yangilash
    books[bookIndex] = { ...books[bookIndex], ...req.body, id: books[bookIndex].id };

    writeBooks(books);
    res.json(books[bookIndex]);
});

// Kitobni o‘chirish
app.delete('/books/:id', (req, res) => {
    let books = readBooks();
    const bookExists = books.some(b => b.id === req.params.id);

    if (!bookExists) return res.status(404).json({ message: 'Kitob topilmadi' });

    books = books.filter(b => b.id !== req.params.id);
    writeBooks(books);

    res.json({ message: 'Kitob o‘chirildi' });
});

// Asosiy sahifa
app.get('/', (req, res) => {
    res.send('Server ishlayapti!');
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlamoqda...`);
});
