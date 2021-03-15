require('dotenv').config();
const axios = require('axios');
const { CConsole } = require('./CConsole');
const { sendTelegramMessage } = require('./sendTelegramMessage');

const BASE_URL = process.env.GITHUB_API_URL;

async function request(path, requestData) {
  CConsole.info(`About to make request to the GithubAPI path: ${path}`);
  const headerData = { headers: { Authorization: `Token ${process.env.GITHUB_ACCESS_TOKEN}` } };
  try {
    if (requestData) {
      return await axios.post(`${BASE_URL}/${path}`, requestData, headerData);
    }
    return await axios.get(`${BASE_URL}/${path}`, headerData);
  } catch (error) {
    CConsole.errorBg('REQUEST ERROR...');
    console.log(error);
    CConsole.errorBg('...END REQUEST ERROR');
    throw error;
  }
}

async function getUserRepos(chatId, githubUser = 'NoahDavey') {
  const userRepos = await request(`users/${githubUser}/repos`);

  const requestData = {
    chat_id: chatId,
    text: `What repository of GithubUser ${githubUser} would you like to subscribe to?`,
    reply_to_message_id: true,
    reply_markup: {
      keyboard: userRepos.data.map((repo) => [repo.name]), // [['repo1'], ['repo2]]
      one_time_keyboard: true,
      // hide_keyboard: true
    },
  };

  const result = axios.post(
    `${process.env.TELEGRAM_API_URL}/bot${process.env.TELEGRAM_BOT_AUTH_TOKEN}/sendMessage`,
    requestData,
    { headers: { 'content-type': 'application/json' } },
  );

  console.log('<<<<<<<<<<<<<< Got result');
}

// Function used to create webhook for a given user & repo
async function setRepoWebhook(githubUser, repoName) {
  const requestData = { config: { url: process.env.GITHUB_WEBHOOK_IP } };
  try {
    const result = await request(`repos/${githubUser}/${repoName}/hooks`, requestData);
    sendTelegramMessage(`Webhook has been set for: ${githubUser} on ${repoName}`);
    return result;
  } catch (error) {
    sendTelegramMessage('Failed to set webhook');
    CConsole.error('Failed setting webhook');
  }
}

// async function getRepoHooks(githubUser, repoName) {
//             // // Get repositories hooks
//         // const hooks = await axios.get(repo.hooks_url, {
//         //     headers: { 'Authorization': `Token ${process.env.GITHUB_ACCESS_TOKEN}` }
//         // })
//         // console.log(hooks.data);
// }

module.exports = {
  getUserRepos,
  setRepoWebhook,
};
