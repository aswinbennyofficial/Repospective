const express = require('express');
//  Create a express router object
const router = express.Router();
const { getForks } = require('./../controllers/forks');
const { getRepoDetails } = require('./../controllers/repoDetails');
const {getGraphActivity} = require('./../controllers/repoDetails');
const {generateGitHubActionsConfig} = require('./../controllers/ga-configGenerator');

const dotenv = require('dotenv');
dotenv.config();

// Load api token from .env file
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Define your API routes
router.get('/', (req, res) => {
  res.send('V1 apis are working');
});


// get list of forks
router.get('/forks/:username/:repo', async (req, res) => {

  
  const { username, repo } = req.params;
  const { limit = 100, sort = 'stargazers' } = req.query;
  // newest, oldest, stargazers, watchers are other fields

  try {
    // Call the getForks function with async/await
    const forks = await getForks(username, repo, sort, GITHUB_TOKEN,limit);

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



// Fetch repo details
router.get('/repo/:username/:repo', async (req, res) => {
  const { username, repo } = req.params;

  try {
    const repoDetails = await getRepoDetails(username, repo, GITHUB_TOKEN);

    if (repoDetails) {
      res.json(repoDetails);
    } else {
      res.status(500).json({ error: 'Failed to fetch repo details' });
    }
  } catch (error) {
    console.error('Error fetching repo details:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch repo details
router.get('/repo/:username/:repo/graph', async (req, res) => {
  const { username, repo } = req.params;

  try {
    const repoDetails = await getGraphActivity(username, repo, GITHUB_TOKEN);

    if (repoDetails) {
      res.json(repoDetails);
    } else {
      res.status(500).json({ error: 'Failed to fetch repo details' });
    }
  } catch (error) {
    console.error('Error fetching repo details:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Middleware to parse JSON bodies
router.use(express.json());




// Route to create github actions configuration
router.post('/ga-config', (req, res) => {

  const {branchName, language, requireTests, registryType, username, imageName} = req.body;
  const config = generateGitHubActionsConfig(branchName, language, requireTests, registryType, username, imageName);
  // Send as json response where the response will have keyt called config
  const response = {
    "config":config
  };
  res.json(response);
});


// Export the router object
module.exports = router;