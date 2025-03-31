import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import articleRouter from './src/router/articleRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(join(__dirname, 'public')));

// API yo'naltirgichlarini ulash
app.use('/api/articles', articleRouter);

app.use((req, res, next) => {
    const start = Date.now();
    next();
    const end = Date.now();
    console.log(`Request took ${end - start} ms`);
});

// Asosiy sahifani yuborish
app.get('/', (req, res, next) => {
    try {
        const homePagePath = path.join(__dirname, 'public', 'index.html');
        res.sendFile(homePagePath);
    } catch (error) {
        next(error);
    }
});

// Admin sahifasini yuborish
app.get('/admin', (req, res, next) => {
    try {
        const profilePagePath = path.join(__dirname, 'public', 'admin.html');
        res.sendFile(profilePagePath);
    } catch (error) {
        next(error);
    }
});

// Maqola qo'shish sahifasini yuborish
app.get('/add', (req, res, next) => {
    try {
        const addPagePath = path.join(__dirname, 'public', 'add.html');
        res.sendFile(addPagePath);
    } catch (error) {
        next(error);
    }
});

// Maqola tahrirlash sahifasini yuborish
app.get('/edit', (req, res, next) => {
    try {
        const editPagePath = path.join(__dirname, 'public', 'edit.html');
        res.sendFile(editPagePath);
    } catch (error) {
        next(error);
    }
});

// Xatoliklarni qayta ishlash
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Xatolik yuz berdi: ' + err.message);
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});