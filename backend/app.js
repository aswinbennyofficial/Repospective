const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
// Import router object from routes.js
const routes = require('./routes/routes.js');

// Load environment variables from .env file
dotenv.config();

// Create an express app
const app = express();


// Fetch the PORT and GITHUB_TOKEN from the environment
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not specified in .env
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;



// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));



// Load the routes by using the routes object as middleware for api
app.use('/', routes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
