// require('dotenv').config()
// const axios = require('axios')
// const BASE_URL = process.env.BASE_URL
// const REPO_NAME = process.env.REPO_NAME
// const GITHUB_USER = process.env.GITHUB_USER

// async function request(path) {
//     return axios.get(`${BASE_URL}/${path}`, {
//         headers: { 'Authorization': `Token ${process.env.GITHUB_ACCESS_TOKEN}` }
//     })
// }


// async function getRepoDetails() {
//     const result = await request(`repos/${GITHUB_USER}/${REPO_NAME}`)
//     return result.data
// }

// async function getRepoCommits() {
//     const result = await request(`repos/${GITHUB_USER}/${REPO_NAME}/commits`)
//     return result.data
// }

// async function main() {
//     console.log('About to make request >>>>>>>>>>>>>>>>');
    
//     const commits = await getRepoCommits()

//     for (const commit of commits) {
//         console.log(commit.commit.message);
//     }

//     console.log('<<<<<<<<<<<<<< Got result');
// }

// main()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('Hello world');
    res.send('Hello world')
})

app.post('/webhook', (req, res) => {
    console.log('Webhook Endpoint has been hit------------');
    console.log('Payload:');
    const payload = JSON.parse(req.body.payload)
    console.log(payload);
    res.status(200).send()
})

app.listen(port, () => {
    console.log('App is now listening on port ', port);
})