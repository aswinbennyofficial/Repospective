const express = require('express');
//  Create a express router object
const router = express.Router();
// Import router object from routes.js
const routesV1 = require('./api_v1.js');

// Define your API routes
router.get('/healthcheck', (req, res) => {
  res.send('I am OK');
});

// Version v1 of the API
router.use('/api/v1', routesV1);




// Export the router object
module.exports = router;