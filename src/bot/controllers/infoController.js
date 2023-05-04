const logger = require('../../utils/logger');

async function handleHelp(ctx) {
  const helpMessage = 'This bot helps you manage your Uniswap positions.\n\n' +
                      'Here are the available commands:\n' +
                      '/positions - Get information about your Uniswap positions\n' +
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
      // Send the user's positions to the chat
      // You can replace this with your own implementation
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

module.exports = {
  handleHelp,
  handlePositions,
};
