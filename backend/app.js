const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Create an express app
const app = express();
// Define the port
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not specified in .env
// Define the GitHub token
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Import router object from routes.js
const routes = require('./routes/routes.js');
const routesV1 = require('./routes/api_v1.js');

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Use the routes as middleware for api
app.use('/', routes);
app.use('/api/v1', routesV1);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
