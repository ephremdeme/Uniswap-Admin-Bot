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
  const { data } = ctx.update.callback_query;
  try {
    // Query the database to get the user's positions
    const user = await User.findOne({ telegramId });
    if (!user) {
      logger.warn(`User not found when trying to get positions with Telegram ID ${telegramId}`);
      ctx.reply('You need to log in first using the /login command.');
    } else {
      
      const positionsMessage = 'Loading your Uniswap positions:\n\n';
      ctx.reply(positionsMessage);
      const positions = await axiosInstance.get(data.split('-')[1]).then(res => res.data)
      positions.forEach(position => {
        let positionMessage = `${position.token0.symbol}/${position.token1.symbol} - ${position.balance0} ${position.token0.symbol} - ${position.balance1} ${position.token1.symbol}\n`;
        if(position.deposit0 && position.deposit1)
          positionMessage += `Deposit: ${position.deposit0} ${position.token0.symbol} - ${position.deposit1} ${position.token1.symbol}\n`;

        positionMessage += `Current price: ${position.currentPrice}\n`;
        ctx.reply(positionMessage, Markup.inlineKeyboard([
          Markup.button.callback( 
            '❌ Remove',
            `/remove-${data.split('-')[1]}/${position.id}`,
          ),
        ]));
      });
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

      const wallets = await axiosInstance.get('/accounts').then(res => res.data)
      // send a button for each wallet
      const keyboard = Markup.inlineKeyboard(wallets.map(wallet => Markup.button.callback(wallet.name, `/positions-/uniswap/${wallet._id}/positions`)));
      ctx.reply('Your wallets:', keyboard);
      logger.info(`Positions sent to user ${telegramId}`);
    }
  } catch (err) {
    logger.error(`Error getting wallets for user with Telegram ID ${telegramId}: ${err.message}`);
    ctx.reply('There was an error getting your wallets. Please try again later.');
  }
}

async function handleRemoveLiquidity(ctx) {
  const { id: telegramId } = ctx.from;
  try {
    // Query the database to get the user's positions
    const user = await User.findOne({ telegramId });
    if (!user) {
      logger.warn(`User not found when trying to get wallets with Telegram ID ${telegramId}`);
      ctx.reply('You need to log in first using the /login command.');
    } else {
      const { data } = ctx.update.callback_query;
      console.log(data.split('-')[1]);
      const response = await axiosInstance.delete(data.split('-')[1]).then(res => res.data)
      ctx.reply(`✅ Position removed. Transaction hash: ${response.transactionHash}`);
      logger.info(`Positions sent to user ${telegramId}`);
    }
  } catch (err) {
    logger.error(`Error getting wallets for user with Telegram ID ${telegramId}: ${err.message}`);
    ctx.reply('There was an error getting your wallets. Please try again later.');
  }
}
module.exports = {
  handleHelp,
  handlePositions,
  handleWallets,
  handleRemoveLiquidity
};
