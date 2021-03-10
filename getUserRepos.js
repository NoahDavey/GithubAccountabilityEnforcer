require('dotenv').config()
const axios = require('axios')
const BASE_URL = process.env.BASE_URL

async function request(path) {
    return axios.get(`${BASE_URL}/${path}`, {
        headers: { 'Authorization': `Token ${process.env.GITHUB_ACCESS_TOKEN}` }
    })
}

async function getUserRepos(chatId, githubUser = 'NoahDavey') {
    console.log('About to make request >>>>>>>>>>>>>>>>');
    
    const userRepos = await request(`users/${githubUser}/repos`)
    // console.log(userRepos.data);

    // for(let repo of userRepos.data) {
    //     console.log('Repository: ' + repo.name);
    //     console.log('Hook URL: ' + repo.hooks_url);
        
    //     // // Get repositories hooks
    //     // const hooks = await axios.get(repo.hooks_url, {
    //     //     headers: { 'Authorization': `Token ${process.env.GITHUB_ACCESS_TOKEN}` }
    //     // })
    //     // console.log(hooks.data);
    // }
    const requestData = {
        chat_id: chatId,
        text: `What repository of GithubUser ${githubUser} would you like to subscribe to?`,
        reply_to_message_id: true,
        reply_markup: {
            keyboard: userRepos.data.map(repo => [repo.name]), // [['repo1'], ['repo2]]
            one_time_keyboard: true
            // hide_keyboard: true
        }
    }

    const result = axios.post(
        `${process.env.TELEGRAM_API_URL}/bot${process.env.TELEGRAM_BOT_AUTH_TOKEN}/sendMessage`,
        requestData,
        { headers: {'content-type': 'application/json'} }
    )

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