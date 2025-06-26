const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 7000;
const articleRoutes = require('./routes/article.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
// Middleware setup
app.use(cors());              // Enable Cross-Origin Resource Sharing
app.use(helmet());            // Secure HTTP headers
app.use(bodyParser.json());   // Parse JSON bodies (body-parser)
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());      // Parse JSON bodies (Express built-in)
app.use('/uploads', express.static('uploads'));

// Routes setup
app.use('/api/article', articleRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});