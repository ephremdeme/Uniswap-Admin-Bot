const logger = require('../../utils/logger');

async function handlePoolRemoveNotification(poolInfo, tokens, amount, chatId) {
  const message = `⚠️ Pool removal imminent!\n\n${poolInfo}\n\nTokens: ${tokens}\nAmount: ${amount}`;
  try {
    await bot.telegram.sendMessage(chatId, message);
    logger.info(`Pool removal notification sent to chat ID ${chatId}`);
  } catch (err) {
    logger.error(`Error sending pool removal notification to chat ID ${chatId}: ${err.message}`);
  }
}

async function handlePoolRemovedNotification(txInfo, tokens, amount, chatId) {
  const message = `✅ Pool removed!\n\n${txInfo}\n\nTokens: ${tokens}\nAmount: ${amount}`;
  try {
    await bot.telegram.sendMessage(chatId, message);
    logger.info(`Pool removed notification sent to chat ID ${chatId}`);
  } catch (err) {
    logger.error(`Error sending pool removed notification to chat ID ${chatId}: ${err.message}`);
  }
}

async function handleTokenExchangeNotification(tokens, positions, chatId) {
  const message = `⚠️ Token exchange imminent!\n\nTokens: ${tokens}\nPositions: ${positions}`;
  try {
    await bot.telegram.sendMessage(chatId, message);
    logger.info(`Token exchange notification sent to chat ID ${chatId}`);
  } catch (err) {
    logger.error(`Error sending token exchange notification to chat ID ${chatId}: ${err.message}`);
  }
}

async function handleTokenExchangedNotification(txInfo, tokens, amount, chatId) {
  const message = `✅ Token exchange completed!\n\n${txInfo}\n\nTokens: ${tokens}\nAmount: ${amount}`;
  try {
    await bot.telegram.sendMessage(chatId, message);
    logger.info(`Token exchanged notification sent to chat ID ${chatId}`);
  } catch (err) {
    logger.error(`Error sending token exchanged notification to chat ID ${chatId}: ${err.message}`);
  }
}

async function handleErrorNotification(errorMessage, chatId) {
  const message = `❌ Error occurred during transaction:\n\n${errorMessage}`;
  try {
    await bot.telegram.sendMessage(chatId, message);
    logger.info(`Error notification sent to chat ID ${chatId}`);
  } catch (err) {
    logger.error(`Error sending error notification to chat ID ${chatId}: ${err.message}`);
  }
}

module.exports = {
  handlePoolRemoveNotification,
  handlePoolRemovedNotification,
  handleTokenExchangeNotification,
  handleTokenExchangedNotification,
  handleErrorNotification,
};
