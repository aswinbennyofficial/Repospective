

function getForks(username, repo){
    url=`https://api.github.com/repos/${username}/${repo}/forks`;
    console.log(url);
    return url;   
}




module.exports = 
{
    getForks
}