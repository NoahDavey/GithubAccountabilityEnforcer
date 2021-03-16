import axios from 'axios';

require('dotenv').config();

const myChat = '1333717959'; // The chat_id which telegram has given me & GithubAccountabilityBot
const { TELEGRAM_API_URL, TELEGRAM_BOT_AUTH_TOKEN } = process.env;

async function sendTelegramMessage(message: string) {
  console.log('...About to send Telegram Message ');

  const requestData = {
    chat_id: myChat,
    text: message,
  };

  try {
    await axios.post(
      `${TELEGRAM_API_URL}/bot${TELEGRAM_BOT_AUTH_TOKEN}/sendMessage`,
      requestData,
      { headers: { 'content-type': 'application/json' } },
    );

    console.log('...Successfully send message via telegram');
  } catch (error) {
    console.log('There was an error sending Telegram message:');
    console.log(error);
  }
}

export default sendTelegramMessage;
