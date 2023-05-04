const { default: axios } = require('axios');
const logger = require('../../utils/logger');
const User = require('../models/user');
const { Markup } = require('telegraf');
const axiosInstance = require('../../utils/api');

async function handleHelp(ctx) {
  const helpMessage = 'This bot helps you manage your Uniswap positions.\n\n' +
    'Here are the available commands:\n' +
    '/wallets - Get information about your Uniswap wallets\n' +
    '/help - Get help with using the bot';

  ctx.reply(helpMessage);
  logger.info(`Help message sent to user ${ctx.from.id}`);
}

async function handlePositions(ctx) {
  const { id: telegramId } = ctx.from;
  try {
    // Query the database to get the user's positions
    const user = await User.findOne({ telegramId });
    if (!user) {
      logger.warn(`User not found when trying to get positions with Telegram ID ${telegramId}`);
      ctx.reply('You need to log in first using the /login command.');
    } else {
      const positionsMessage = 'Your Uniswap positions:\n\n' +
        'ETH/USDT - Liquidity: 10 ETH, 10000 USDT\n' +
        'UNI/USDT - Liquidity: 100 UNI, 5000 USDT\n';
      ctx.reply(positionsMessage);
      logger.info(`Positions sent to user ${telegramId}`);
    }
  } catch (err) {
    logger.error(`Error getting positions for user with Telegram ID ${telegramId}: ${err.message}`);
    ctx.reply('There was an error getting your positions. Please try again later.');
  }
}

async function handleWallets(ctx) {
  const { id: telegramId } = ctx.from;
  try {
    // Query the database to get the user's positions
    const user = await User.findOne({ telegramId });
    if (!user) {
      logger.warn(`User not found when trying to get wallets with Telegram ID ${telegramId}`);
      ctx.reply('You need to log in first using the /login command.');
    } else {

      const wallets = await axiosInstance.get(process.env.API_URL + '/accounts').then(res => res.data)
      // send a button for each wallet
      const keyboard = Markup.inlineKeyboard(wallets.map(wallet => Markup.button.callback(wallet.name, `/positions/${wallet._id}`)));
      ctx.reply('Your wallets:', keyboard);
      logger.info(`Positions sent to user ${telegramId}`);
    }
  } catch (err) {
    logger.error(`Error getting wallets for user with Telegram ID ${telegramId}: ${err.message}`);
    ctx.reply('There was an error getting your wallets. Please try again later.');
  }
}

async function handleSwap(ctx) {
  const { id: telegramId } = ctx.from;
  try {
    // 
  } catch (err) {
    logger.error(`Error getting wallets for user with Telegram ID ${telegramId}: ${err.message}`);
    ctx.reply('There was an error getting your wallets. Please try again later.');
  }
}
module.exports = {
  handleHelp,
  handlePositions,
  handleWallets,
};
