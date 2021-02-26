require('dotenv').config()
const axios = require('axios')
// const TELEGRAM_WEBHOOK_IP = process.env.TELEGRAM_WEBHOOK_IP 
const TELEGRAM_WEBHOOK_IP = " " 

async function main() {
    console.log('About to make request >>>>>>>>>>>>>>>>');

    const TELEGRAM_API = 'https://api.telegram.org'
    // try {
    //     await axios.post(`${TELEGRAM_API}/bot${process.env.TELEGRAM_BOT_AUTH_TOKEN}/setWebhook`, 
    //             {url: `${TELEGRAM_WEBHOOK_IP}/telegram` },
    //             { headers: {'content-type': 'application/json'}})
    // } catch (error) {
    //     console.log('---------------FAILED');
    //     console.log(error);
    // }

    try {
        await axios.post(`${TELEGRAM_API}/bot${process.env.TELEGRAM_BOT_AUTH_TOKEN}/deleteWebhook`)    
    } catch (error) {
        console.log(error);
    }
            
    console.log('<<<<<<<<<<<<<< Got result');
}

main()