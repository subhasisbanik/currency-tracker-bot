const TelegramBot = require('node-telegram-bot-api');
const config = require('config');
const axios = require('axios');
const winston = require('winston');

const token = process.env.TELEGRAM_BOT_TOKEN;
const wiseAccessToken = process.env.WISE_ACCESS_TOKEN;

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/app.log' }),
    new winston.transports.Console()
  ]
});

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

let user_data_dict = {};
bot.sendMessage(chat_id=config.get("Application.envConfig.telegram_bot.chat_id_self"), text='Hey I am up and running!')

bot.onText(/Hello/, (msg, match) => {
  const chatId = msg.chat.id;
  logger.info('Sending welcome message to sender..');
  bot.sendMessage(chatId, 'Welcome to Currency Tracker. Please set your desired target rate with the command /targetrate <> to start tracking EUR to INR rates');
});

bot.onText(/\/targetrate (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  user_data_dict[chatId] = match[1];
  logger.info('Target rate set by sender..');
  let targetRateMsg = "Target rate of " + user_data_dict[chatId] + " set by you"
  bot.sendMessage(chatId, targetRateMsg);
});

async function processSendMessage() {
  for (var key in user_data_dict) {
    let targetRate = user_data_dict[key];
    let user = key;
    if (null != targetRate) {
      logger.info("Target Rate set");
      let exchangeRateVal = await fetchExchangeRate();
      if (exchangeRateVal >= targetRate) {
        logger.info('Target rate met. Invoking message...')
        bot.sendMessage(user, `The latest rate is : ${exchangeRateVal}`);
      }
    }
  }
}


async function fetchExchangeRate() {
  try {
    //TODO: change this to adopt to multiple pairs of currency rates for every user

    let wiseUrl = config.get('Application.envConfig.wise.url');
    const response = await axios.get(wiseUrl, {
      headers: { Authorization: `Bearer ${wiseAccessToken}` }
    });
    const exchangeRateObj = response.data;

    if (null != exchangeRateObj) {
      let exchangeRate = exchangeRateObj[0].rate;

      logger.info('EUR to INR exchange rate:' + exchangeRate);
      return exchangeRate;
    } else {
      logger.error('Failed to find exchange rate on the page.');
      return null;
    }
  } catch (error) {
    logger.error('Error fetching exchange rate:', error);
    return null;
  }
}

// Set up a recurring job to fetch exchange rates every minute
const interval = setInterval(() => {
  logger.info('Currency Tracker Bot started....');
  (async () => {
    await processSendMessage();
  })();
}, config.get('Application.envConfig.set_timeout'));