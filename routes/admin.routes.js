const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const articleController = require('../controllers/article.controller');

// Create a new article
router.post('/article',
    // authMiddleware,
    upload.array('attachments',10) , 
    articleController.createArticle);

// Get paginated list of articles
router.get('/',
    authMiddleware, 
    articleController.getArticles);

// Get article by ID
router.get('/:id',
    authMiddleware, 
    articleController.getArticleById);

// Update article by ID
router.put('/:id',
    authMiddleware,
    upload.array('attachments', 10) 
    ,articleController.updateArticle);

// Delete article by ID
router.delete('/:id',
    authMiddleware, 
    articleController.deleteArticle);

module.exports = router;