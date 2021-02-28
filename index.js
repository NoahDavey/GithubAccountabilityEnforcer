require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { sendTelegramMessage } = require('./sendTelegramMessage')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('Hello world');
    res.send('Hello world')
})

app.post('/github', (req, res) => {
    console.log('Received paylod from Github ------------------------------');
    const payload = JSON.parse(req.body.payload)

    let message = "My log for today:\n"
    for (const commit of payload.commits) {
      message += `-Added commit: ${commit.message}\n`
      message += `-Commit URL: ${commit.url}\n`
      message += '\n'
    }
    sendTelegramMessage(message)

    res.status(200).send()
})

app.listen(port, () => {
    console.log('App is now listening on port ', port);
})

