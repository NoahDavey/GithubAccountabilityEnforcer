import axios from 'axios';

require('dotenv').config();

const { TELEGRAM_API_URL, TELEGRAM_BOT_AUTH_TOKEN } = process.env;

async function main() {
  console.log('About to make request >>>>>>>>>>>>>>>>');

  try {
    const response = await axios.post(`${TELEGRAM_API_URL}/bot${TELEGRAM_BOT_AUTH_TOKEN}/getUpdates`, { offset: 596289258 });
    console.log('Results: ');
    // console.log(JSON.stringify(response.data.result, 2, 2));
    console.log('Messages -----------');

    for (const message of response.data.result) {
      console.log('UpdateID', message.update_id);
      console.log('MessageID: ', message.message.message_id);
      console.log('ChatID: ', message.message.chat.id);
      console.log('Text: ', message.message.text);
      console.log('---');
    }
    console.log('--------------------');
  } catch (error) {
    console.log(error);
  }

  console.log('<<<<<<<<<<<<<< Got result');
}

main();
