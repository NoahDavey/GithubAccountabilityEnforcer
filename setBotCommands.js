require('dotenv').config()
const axios = require('axios')

const TELEGRAM_API_URL = process.env.TELEGRAM_API_URL 
const TELEGRAM_BOT_AUTH_TOKEN = process.env.TELEGRAM_BOT_AUTH_TOKEN


async function setBotCommands() {
    console.log('...About to set bot commands ');
    
    const botCommands = [
        {command: 'subscribe_to_repo', description: 'Given a github user, subscribe to webhook updates from one of their repos'}
    ]

    try {
        const result = await axios.post(
            `${TELEGRAM_API_URL}/bot${TELEGRAM_BOT_AUTH_TOKEN}/setMyCommands`,
            { commands: botCommands },
            { headers: {'content-type': 'application/json'} }
        )
        
        console.log('...Successfully added command to bot');
    } catch (error) {
        console.log('There was an error adding the command:');
        console.log(error);
    }
}

setBotCommands()

// module.exports = {
//     setBotCommands
// }