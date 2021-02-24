require('dotenv').config()
const axios = require('axios')
const BASE_URL = process.env.BASE_URL
const REPO_NAME = process.env.REPO_NAME
const GITHUB_USER = process.env.GITHUB_USER

async function request(path) {
    return axios.get(`${BASE_URL}/${path}`, {
        headers: { 'Authorization': `Token ${process.env.GITHUB_ACCESS_TOKEN}` }
    })
}


async function getRepoDetails() {
    const result = await request(`repos/${GITHUB_USER}/${REPO_NAME}`)
    return result.data
}

async function getRepoCommits() {
    const result = await request(`repos/${GITHUB_USER}/${REPO_NAME}/commits`)
    return result.data
}

async function main() {
    console.log('About to make request >>>>>>>>>>>>>>>>');
    
    const commits = await getRepoCommits()

    for (const commit of commits) {
        console.log(commit.commit.message);
    }

    console.log('<<<<<<<<<<<<<< Got result');
}

main()