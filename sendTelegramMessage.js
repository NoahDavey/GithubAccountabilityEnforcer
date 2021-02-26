require('dotenv').config()
const axios = require('axios')

async function main() {
    console.log('About to make request >>>>>>>>>>>>>>>>');
    
    const TELEGRAM_API = 'https://api.telegram.org'
    
    const requestData = {
        chat_id: '1333717959',
        text: 'Testing'
    }
    const result = await axios.post(
        `${TELEGRAM_API}/bot${process.env.TELEGRAM_BOT_AUTH_TOKEN}/sendMessage`,
        requestData,
        { headers: {'content-type': 'application/json'} }
        )
    console.log(result.data);

    console.log('<<<<<<<<<<<<<< Got result');
}

main()
