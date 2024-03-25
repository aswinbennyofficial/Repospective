const express = require('express');
//  Create a express router object
const router = express.Router();

const { getForks } = require('./../controllers/forks');


// Define your API routes
router.get('/', (req, res) => {
  res.send('V1 apis are working');
});

// Define the route handler for /api/v1/forks/:username/:repo
router.get('/forks/:username/:repo', (req, res) => {
  const { username, repo } = req.params;
  const result = getForks(username, repo);
  res.send(result);
  
});


// Export the router object
module.exports = router;