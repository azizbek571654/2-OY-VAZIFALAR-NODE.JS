import { articles } from '../libs/db.js';
import Article from '../entities/article.js';

// Barcha maqolalarni olish
export const getAllArticles = (req, res) => res.json(articles);

// ID bo'yicha maqolani olish
export const getArticleById = (req, res) => {
    const article = articles.find(a => a.id === req.params.id);
    article ? res.json(article) : res.status(404).send('Not found');
};

// Yangi maqola qo'shish
export const addArticle = (req, res) => {
    const { title, content, date } = req.body;
    const newArticle = new Article(title, content, date);
    articles.push(newArticle);
    res.status(201).json(newArticle);
};

// Maqolani yangilash
export const updateArticle = (req, res) => {
    const article = articles.find(a => a.id === req.params.id);
    if (article) {
        Object.assign(article, req.body);
        res.json(article);
    } else {
        res.status(404).send('Not found');
    }
};

// Maqolani o'chirish
export const deleteArticle = (req, res) => {
    const index = articles.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
        articles.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Not found');
    }
};