const express = require('express');
//  Create a express router object
const router = express.Router();

// Define your API routes
router.get('/hi', (req, res) => {
  res.send('I am OK');
});



// Export the router object
module.exports = router;