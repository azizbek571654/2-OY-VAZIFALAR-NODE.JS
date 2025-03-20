import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.json());

const FILE_PATH = 'books.json';

const readBooks = () => {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

const writeBooks = (books) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(books, null, 2));
};

app.get('/books', (req, res) => {
    res.json(readBooks());
});

app.get('/books/:id', (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Kitob topilmadi' });
    res.json(book);
});

app.post('/books', (req, res) => {
    const books = readBooks();
    const newBook = { id: String(Date.now()), ...req.body };

    books.push(newBook);
    writeBooks(books);

    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const books = readBooks();
    const bookIndex = books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) return res.status(404).json({ message: 'Kitob topilmadi' });

    books[bookIndex] = { ...books[bookIndex], ...req.body, id: books[bookIndex].id };

    writeBooks(books);
    res.json(books[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
    let books = readBooks();
    const bookExists = books.some(b => b.id === req.params.id);

    if (!bookExists) return res.status(404).json({ message: 'Kitob topilmadi' });

    books = books.filter(b => b.id !== req.params.id);
    writeBooks(books);

    res.json({ message: 'Kitob o‘chirildi' });
});

app.get('/', (req, res) => {
    res.send('Server ishlayapti!');
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlamoqda...`);
});
