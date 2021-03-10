require('dotenv').config()
const axios = require('axios')
const BASE_URL = process.env.BASE_URL
const GITHUB_USER = process.env.GITHUB_USER

async function request(path) {
    return axios.get(`${BASE_URL}/${path}`, {
        headers: { 'Authorization': `Token ${process.env.GITHUB_ACCESS_TOKEN}` }
    })
}

async function getUserRepos() {
    console.log('About to make request >>>>>>>>>>>>>>>>');
    
    const result = await request('users/NoahDavey/repos')
    // console.log(result.data);

    for(let repo of result.data) {
        console.log('Repository: ' + repo.name);
        console.log('Hook URL: ' + repo.hooks_url);
        

        // // Get repositories hooks
        // const hooks = await axios.get(repo.hooks_url, {
        //     headers: { 'Authorization': `Token ${process.env.GITHUB_ACCESS_TOKEN}` }
        // })
        // console.log(hooks.data);
    }

    // // Create webhook
    // const result = await axios.post(
    //     'https://api.github.com/repos/NoahDavey/Exercism/hooks', 
    //     {
    //         config: {
    //             url: 'https://1b8ec7699160.ngrok.io/testwebhook'                
    //         }
    //     },
    //     {
    //         headers: { 'Authorization': `Token ${process.env.GITHUB_ACCESS_TOKEN}` }
    //     }
    // )

    // console.log(result);


    console.log('<<<<<<<<<<<<<< Got result');
}

module.exports = {
    getUserRepos
}