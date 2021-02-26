require('dotenv').config()
const axios = require('axios')

async function main() {
    console.log('About to make request >>>>>>>>>>>>>>>>');

    const TELEGRAM_API = 'https://api.telegram.org'
    try {
        const result = await axios.post(`${TELEGRAM_API}/bot${process.env.TELEGRAM_BOT_AUTH_TOKEN}/getUpdates`)  
        console.log('Results: ');
        console.log(result.data);  
        console.log('Messages -----------');
        
        for (const message of result.data.result) {
            console.log(message.message.text);
        }
        console.log('--------------------');
    } catch (error) {
        console.log(error);
    }

    console.log('<<<<<<<<<<<<<< Got result');
}

main()