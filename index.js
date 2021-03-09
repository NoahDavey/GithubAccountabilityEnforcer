require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { sendTelegramMessage } = require('./sendTelegramMessage')
const axios = require('axios')

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


app.post('/telegram', (req, res) => {
    console.log('Recieved message from telegram');
    console.log(req.body);

    const payload = req.body 
    const chatId = payload.message.chat.id
    const name = payload.message.chat.username
    console.log('Text', payload.message.text);
    console.log('--UpdateID: ', payload.update_id);

    const requestData = {
        chat_id: chatId,
        text: 'Hi There testing keyboard',
        reply_to_message_id: true,
        reply_markup: {
            keyboard: [['Test 1'], ['Test 2'], ['Test 3']],
            one_time_keyboard: true
        }
    }

    const result = axios.post(
        `${process.env.TELEGRAM_API_URL}/bot${process.env.TELEGRAM_BOT_AUTH_TOKEN}/sendMessage`,
        requestData,
        { headers: {'content-type': 'application/json'} }
    )


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

