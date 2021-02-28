require('dotenv').config()
const axios = require('axios')

const TELEGRAM_API_URL = process.env.TELEGRAM_API_URL 
const TELEGRAM_BOT_AUTH_TOKEN = process.env.TELEGRAM_BOT_AUTH_TOKEN
const myChat = '1333717959' // The chat_id which telegram has given me & GithubAccountabilityBot


async function sendTelegramMessage(message) {
    console.log('...About to send Telegram Message ');
    
    const requestData = {
        chat_id: myChat,
        text: message
    }

    const result = await axios.post(
        `${TELEGRAM_API_URL}/bot${TELEGRAM_BOT_AUTH_TOKEN}/sendMessage`,
        requestData,
        { headers: {'content-type': 'application/json'} }
        )

    console.log('...Successfully send message via telegram');
}

module.exports = {
    sendTelegramMessage
}