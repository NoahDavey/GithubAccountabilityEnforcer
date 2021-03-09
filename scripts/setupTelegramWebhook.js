require('dotenv').config()
const axios = require('axios')
const TELEGRAM_WEBHOOK_IP = process.env.TELEGRAM_WEBHOOK_IP 
const TELEGRAM_API_URL = process.env.TELEGRAM_API_URL

async function deleteWebhook() {
    try {
        await axios.post(`${TELEGRAM_API_URL}/bot${process.env.TELEGRAM_BOT_AUTH_TOKEN}/deleteWebhook`)    
    } catch (error) {
        console.log(error);
    }
}

async function main() {
    console.log('About to make request to telegram >>>>>>>>>>>>>>>>');

    try {
        await axios.post(`${TELEGRAM_API_URL}/bot${process.env.TELEGRAM_BOT_AUTH_TOKEN}/setWebhook`, 
                {url: TELEGRAM_WEBHOOK_IP },
                { headers: {'content-type': 'application/json'}})
    } catch (error) {
        console.log('Failed to set telegram webhook with error: ')
        console.log(error);
    }

    console.log('<<<<<<<<<<<<<< Got Response');
}

main()