const express = require('express');
//  Create a express router object
const router = express.Router();

const { getForks } = require('./../controllers/forks');


// Define your API routes
router.get('/', (req, res) => {
  res.send('V1 apis are working');
});


// get list of forks
router.get('/forks/:username/:repo', async (req, res) => {
  
  const { username, repo } = req.params;
  const { limit = 100, sort = 'stargazers' } = req.query;
  // watchers

  try {
    // Call the getForks function with async/await
    const forks = await getForks(username, repo, sort);

    if (forks) {
      // Send the fetched fork data as JSON response (assuming successful)
      res.json(forks);
    } else {
      // Handle case where getForks returns null due to errors
      res.status(500).json({ error: 'Failed to fetch forks' }); // Or a more specific error message
    }
  } catch (error) {
    // Handle any errors during the request or in getForks
    console.error('Error fetching forks:', error.message);
    res.status(500).json({ error: 'Internal server error' }); // Or a more specific error message
  }
});


// Export the router object
module.exports = router;