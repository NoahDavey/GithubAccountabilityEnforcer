require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { sendTelegramMessage } = require('./sendTelegramMessage')
const { CConsole } = require('./CConsole')
const { setRepoWebhook, getUserRepos } = require('./github')

const app = express()
const port = process.env.PORT || 5000

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

let waitingForCommandReply = false
app.post('/telegram', (req, res) => {
    const payload = req.body 
    console.log('Recieved payload from telegram: ');
    console.log(payload);

    // const name = payload.message.chat.username
    const chatId = payload.message.chat.id
    const [entity] = payload.message.entities || [undefined]
    const text = payload.message.text
    if(entity?.type === 'bot_command') {
        console.log('Recieved bot command: ', text); 
        if(text === '/subscribe_to_repo') {
            getUserRepos(chatId)
                .catch(e => console.log(e))
                waitingForCommandReply = true
        }
    } else {
        if(waitingForCommandReply) {
            CConsole.success('Received response from user from bot\'s question ')
            setRepoWebhook('NoahDavey', text)
            waitingForCommandReply = false
        }
    }

    res.status(200).send()
})

app.post('/testwebhook', (req, res) => {
    console.log('Request was made to test webhook!');
    console.log(req.body);

    res.status(200).send()
})

app.listen(port, () => {
    console.log('App is now listening on port ', port);
})

