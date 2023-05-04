const { getUserIds } = require('../../utils/cacheUser');
const logger = require('../../utils/logger');
const bot = require('../bot');

async function sendMessageToAllUsers(message) {
  const usersId = getUserIds();
  const users = Array.from(usersId);
  await Promise.all(users.map(async (user) => {
    try {
      await bot.telegram.sendMessage(user, message);
    } catch (err) {
      logger.error(`Error sending notification to user ${user}: ${err.message}`);
    }
  }));

  logger.info(`Sent notification to ${users.length} users`);
}

async function handlePoolRemoveNotification(ctx) {
  const { poolInfo, tokens, amount } = ctx
  const message = `⚠️ Pool removal imminent!\n\n${poolInfo}\n\nTokens: ${tokens}\nAmount: ${amount}`;
  try {
    await sendMessageToAllUsers(message);
    logger.info(`Pool removal notification sent to All Users `);
  } catch (err) {
    logger.error(`Error sending pool removal notification to All Users : ${err.message}`);
  }
}

async function handlePoolRemovedNotification(ctx) {
  const { txInfo, tokens, amount } = ctx
  const message = `✅ Pool removed!\n\n${txInfo}\n\nTokens: ${tokens}\nAmount: ${amount}`;
  try {
    await sendMessageToAllUsers(message);
    logger.info(`Pool removed notification sent to All Users`);
  } catch (err) {
    logger.error(`Error sending pool removed notification: ${err.message}`);
  }
}

async function handleTokenExchangeNotification(ctx) {
  const { tokens, positions } = ctx
  const message = `⚠️ Token exchange imminent!\n\nTokens: ${tokens}\nPositions: ${positions}`;
  try {
    await sendMessageToAllUsers(message);
    logger.info(`Token exchange notification sent to All Users`);
  } catch (err) {
    logger.error(`Error sending token exchange notification: ${err.message}`);
  }
}

async function handleTokenExchangedNotification(ctx) {
  const { txInfo, tokens, amount } = ctx
  const message = `✅ Token exchange completed!\n\n${txInfo}\n\nTokens: ${tokens}\nAmount: ${amount}`;
  try {
    await sendMessageToAllUsers(message);
    logger.info(`Token exchanged notification sent to All Users`);
  } catch (err) {
    logger.error(`Error sending token exchanged notification: ${err.message}`);
  }
}

async function handleErrorNotification(ctx) {
  const { errorMessage } = ctx
  const message = `❌ Error occurred during transaction:\n\n${errorMessage}`;
  try {
    await sendMessageToAllUsers(message);
    logger.info(`Error notification sent to All Users`);
  } catch (err) {
    logger.error(`Error sending error notification: ${err.message}`);
  }
}

module.exports = {
  handlePoolRemoveNotification,
  handlePoolRemovedNotification,
  handleTokenExchangeNotification,
  handleTokenExchangedNotification,
  handleErrorNotification,
};
