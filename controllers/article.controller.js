const articleService = require('../services/article.service');

// Create new article
exports.createArticle = async (req, res) => {

  try {
    const files = req.files || [];
    const article = await articleService.createArticle(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

// Get paginated articles
exports.getArticles = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  try {
    const articles = await articleService.getArticles(parseInt(limit), parseInt(page));
    res.status(200).json(articles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get single article by ID
exports.getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await articleService.getArticleById(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update article by ID
exports.updateArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const files = req.files || [];
    const existingArticle = await articleService.getArticleById(id);
    if (!existingArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    const updated = await articleService.updateArticle(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete article by ID
exports.deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    await articleService.deleteArticle(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
