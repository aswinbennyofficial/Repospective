const axios = require('axios');

async function getRepoDetails(username, repo, GITHUB_TOKEN) {
    const headers = {
        Authorization: `Bearer ${GITHUB_TOKEN}`
    };

    try{
        // Make a GET request to the GitHub API using Axios
        const response = await axios.get(`https://api.github.com/repos/${username}/${repo}`, { headers });

        // Check the response status code
        if (response.status === 200) {
            // Extract the repo details from the response (assuming it's JSON)
            const repoDetails = {
                full_name: response.data.full_name,
                description: response.data.description,
                url: response.data.html_url,
                archived: response.data.archived,
                watchers: response.data.watchers,
                forks: response.data.forks,
                stars: response.data.stargazers_count,
                size: response.data.size,
                open_issues: response.data.open_issues_count,
                network_count: response.data.network_count,
                subscribers_count: response.data.subscribers_count,
                created_at: response.data.created_at,
                updated_at: response.data.updated_at,
                pushed_at: response.data.pushed_at,
                language: response.data.language

            };

            return repoDetails;
        }else{
            console.error(`Error fetching repo details: Status code ${response.status}`);
            return null; 
        }
    } catch (error) {
        // Handle errors during the request
        console.error('Error fetching repo details:', error.message);
        return null; 
    }

}

module.exports = {
    getRepoDetails
};