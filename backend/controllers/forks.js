


const axios = require('axios');

  

async function getForks(username, repo, sort, GITHUB_TOKEN) {

    const headers = {
        Authorization: `Bearer ${GITHUB_TOKEN}`
    };

  try {
    // Make a GET request to the GitHub API using Axios
    const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/forks?sort=${sort}&per_page=100`, { headers });

    // Check the response status code 
    if (response.status === 200) {
      // Extract the fork data from the response (assuming it's JSON)
      const forks = response.data.map(fork => ({
        full_name: fork.full_name,
        description: fork.description,
        created_at: fork.created_at,
        updated_at: fork.updated_at,
        pushed_at: fork.pushed_at,
        url: fork.html_url, 
        archived: fork.archived,
        watchers: fork.watchers,
        forks: fork.forks,
        stars: fork.stargazers_count
      }));

      return forks;
    } else {
      console.error(`Error fetching forks: Status code ${response.status}`);
      return null; // Or handle the error differently
    }
  } catch (error) {
    // Handle errors during the request
    console.error('Error fetching forks:', error.message);
    return null; // Or handle the error differently
  }
}

module.exports = {
  getForks
};


