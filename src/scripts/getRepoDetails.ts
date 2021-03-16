import axios from 'axios';

require('dotenv').config();

const { BASE_URL, REPO_NAME, GITHUB_USER } = process.env;

async function request(path: string) {
  return axios.get(`${BASE_URL}/${path}`, {
    headers: { Authorization: `Token ${process.env.GITHUB_ACCESS_TOKEN}` },
  });
}

async function getRepoDetails() {
  const result = await request(`repos/${GITHUB_USER}/${REPO_NAME}`);
  return result.data;
}

async function getRepoCommits() {
  const result = await request(`repos/${GITHUB_USER}/${REPO_NAME}/commits`);
  return result.data;
}

async function main() {
  console.log('About to make request >>>>>>>>>>>>>>>>');

  // const commits = await getRepoCommits()

  // for (const commit of commits) {
  //     console.log(commit.commit.message);
  // }

  // const result = await request('users/NoahDavey/repos')
  // // console.log(result.data);

  // for(let repo of result.data) {
  //     console.log('Repository: ' + repo.name);
  //     console.log('Hook URL: ' + repo.hooks_url);

  //     // // Get repositories hooks
  //     // const hooks = await axios.get(repo.hooks_url, {
  //     //     headers: { 'Authorization': `Token ${process.env.GITHUB_ACCESS_TOKEN}` }
  //     // })
  //     // console.log(hooks.data);
  // }

  // Create webhook
  const result = await axios.post(
    'https://api.github.com/repos/NoahDavey/Exercism/hooks',
    {
      config: {
        url: 'https://1b8ec7699160.ngrok.io/testwebhook',
      },
    },
    {
      headers: { Authorization: `Token ${process.env.GITHUB_ACCESS_TOKEN}` },
    },
  );

  console.log(result);

  console.log('<<<<<<<<<<<<<< Got result');
}

main();
