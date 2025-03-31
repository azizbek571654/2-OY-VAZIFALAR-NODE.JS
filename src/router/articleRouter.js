import express from 'express';
import { getAllArticles, getArticleById, addArticle, updateArticle, deleteArticle } from '../controller/articleController.js';

const router = express.Router();

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', addArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;
