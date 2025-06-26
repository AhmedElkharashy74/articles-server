const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');

// Get paginated list of articles
router.get('/', articleController.getArticles);

// Get article by ID
router.get('/:id', articleController.getArticleById);

module.exports = router;