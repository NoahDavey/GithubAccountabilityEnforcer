import axios from 'axios';
import CConsole from './CConsole';
import sendTelegramMessage from './sendTelegramMessage';

require('dotenv').config();

const BASE_URL = process.env.GITHUB_API_URL;

async function request(path: string, requestData: any | undefined) {
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

async function getUserRepos(chatId: string, githubUser = 'NoahDavey') {
  const userRepos = await request(`users/${githubUser}/repos`, undefined);

  const requestData = {
    chat_id: chatId,
    text: `What repository of GithubUser ${githubUser} would you like to subscribe to?`,
    reply_to_message_id: true,
    reply_markup: {
      keyboard: userRepos.data.map((repo: any) => [repo.name]), // [['repo1'], ['repo2]]
      one_time_keyboard: true,
      // hide_keyboard: true
    },
  };

  await axios.post(
    `${process.env.TELEGRAM_API_URL}/bot${process.env.TELEGRAM_BOT_AUTH_TOKEN}/sendMessage`,
    requestData,
    { headers: { 'content-type': 'application/json' } },
  );

  console.log('<<<<<<<<<<<<<< Got result');
}

// Function used to create webhook for a given user & repo
async function setRepoWebhook(githubUser: string, repoName: string) {
  const requestData = { config: { url: process.env.GITHUB_WEBHOOK_IP } };
  try {
    const result = await request(`repos/${githubUser}/${repoName}/hooks`, requestData);
    sendTelegramMessage(`Webhook has been set for: ${githubUser} on ${repoName}`);
    return result;
  } catch (error) {
    sendTelegramMessage('Failed to set webhook');
    CConsole.error('Failed setting webhook');
    throw new Error('Failed to set Webhook');
  }
}

// async function getRepoHooks(githubUser, repoName) {
//             // // Get repositories hooks
//         // const hooks = await axios.get(repo.hooks_url, {
//         //     headers: { 'Authorization': `Token ${process.env.GITHUB_ACCESS_TOKEN}` }
//         // })
//         // console.log(hooks.data);
// }

export {
  getUserRepos,
  setRepoWebhook,
};
