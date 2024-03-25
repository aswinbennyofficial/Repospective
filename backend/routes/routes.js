const express = require('express');
const router = express.Router();

// Define your API routes
router.get('/api/example', (req, res) => {
  res.send('This is an example API route');
});

module.exports = router;