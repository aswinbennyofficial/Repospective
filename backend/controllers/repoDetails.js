const axios = require('axios');

async function getRepoDetails(username, repo, GITHUB_TOKEN) {
    const headers = {
        Authorization: `Bearer ${GITHUB_TOKEN}`
    };

    try {
        // Make a GET request to the GitHub API using Axios to fetch basic repo details
        const basicResponse = await axios.get(`https://api.github.com/repos/${username}/${repo}`, { headers });

        // Check the response status code
        if (basicResponse.status === 200) {
            // Extract the basic repo details from the response (assuming it's JSON)
            const repoDetails = {
                full_name: basicResponse.data.full_name,
                description: basicResponse.data.description,
                url: basicResponse.data.html_url,
                archived: basicResponse.data.archived,
                watchers: basicResponse.data.watchers,
                forks: basicResponse.data.forks,
                stars: basicResponse.data.stargazers_count,
                size: basicResponse.data.size,
                open_issues: basicResponse.data.open_issues_count,
                network_count: basicResponse.data.network_count,
                subscribers_count: basicResponse.data.subscribers_count,
                created_at: basicResponse.data.created_at,
                updated_at: basicResponse.data.updated_at,
                pushed_at: basicResponse.data.pushed_at,
                language: basicResponse.data.language
            };

            return repoDetails;
        } else {
            console.error(`Error fetching repo details: Status code ${basicResponse.status}`);
            return null;
        }
    } catch (error) {
        // Handle errors during the requests
        console.error('Error fetching repo details:', error.message);
        return null;
    }
}

async function getGraphActivity(username, repo, GITHUB_TOKEN){
    const headers = {
        Authorization: `Bearer ${GITHUB_TOKEN}`
    };

    // Make separate GET requests to the GitHub API using Axios to fetch different types of statistics
    const statsEndpoints = ['commit_activity', 'contributors', 'participation'];
    const statsPromises = statsEndpoints.map(async (endpoint) => {
        const statsResponse = await axios.get(`https://api.github.com/repos/${username}/${repo}/stats/${endpoint}`, { headers });
        return { [endpoint]: statsResponse.data };
    });

    // Wait for all promises to resolve
    const statsData = await Promise.all(statsPromises);

    // Combine the stats data into an object
    const graphData = {};
    statsData.forEach((stats) => {
        const key = Object.keys(stats)[0];
        graphData[key] = stats[key];
    });

    return graphData;
}

module.exports = {
    getRepoDetails,
    getGraphActivity
};
