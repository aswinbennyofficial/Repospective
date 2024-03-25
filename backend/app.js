const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not specified in .env
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Import routes
const routes = require('./routes/routes.js');

// Use the routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
