const User = require('../models/user');
const logger = require('../../utils/logger');

async function handleLogin(ctx) {
  const { id: telegramId } = ctx.from;
  try {
    const user = await User.findOneAndUpdate({ telegramId }, { telegramId }, { upsert: true, new: true });
    logger.info(`User ${user._id} logged in with Telegram ID ${telegramId}`);
    ctx.reply('You have successfully logged in!');
  } catch (err) {
    logger.error(`Error logging in user with Telegram ID ${telegramId}: ${err.message}`);
    ctx.reply('There was an error logging you in. Please try again later.');
  }
}

async function handleLogout(ctx) {
  const { id: telegramId } = ctx.from;
  try {
    const user = await User.findOneAndDelete({ telegramId });
    if (user) {
      logger.info(`User ${user._id} logged out with Telegram ID ${telegramId}`);
      ctx.reply('You have successfully logged out!');
    } else {
      logger.warn(`User not found when trying to log out with Telegram ID ${telegramId}`);
      ctx.reply('You are not currently logged in.');
    }
  } catch (err) {
    logger.error(`Error logging out user with Telegram ID ${telegramId}: ${err.message}`);
    ctx.reply('There was an error logging you out. Please try again later.');
  }
}

module.exports = {
  handleLogin,
  handleLogout,
};
