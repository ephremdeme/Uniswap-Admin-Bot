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

async function handlePoolRemoveNotification({ data }) {
  const { token0, token1, price, id } = data
  const message = `⚠️ Pool removal imminent!\n\nPosition Id: ${id}\nTokens: ${token0.symbol} - ${token1.symbol}\nBalance: ${token0.balance} - ${token1.balance}\nPrice: ${price}`;
  try {
    await sendMessageToAllUsers(message);
    logger.info(`Pool removal notification sent to All Users `);
  } catch (err) {
    logger.error(`Error sending pool removal notification to All Users : ${err.message}`);
  }
}

async function handlePoolRemovedNotification({ data }) {
  const { txId, token0, token1, price, id } = data

  const message = `✅ Pool removed! \n\nPosition Id: ${id}\nTx Id: ${txId}\n\nTokens: ${token0.symbol} - ${token1.symbol}\nWithdrawn: ${token0.balance} - ${token1.balance}\nPrice: ${price}`;
  try {
    await sendMessageToAllUsers(message);
    logger.info(`Pool removed notification sent to All Users`);
  } catch (err) {
    logger.error(`Error sending pool removed notification: ${err.message}`);
  }
}

async function handleTokenExchangeNotification({ data }) {
  const { token0, token1 } = data
  const message = `⚠️ Token exchange imminent!\n\nTokens: ${token0.symbol} - ${token1.symbol} \nAmount: ${token0.amount} - ${token1.amount}`;
  try {
    await sendMessageToAllUsers(message);
    logger.info(`Token exchange notification sent to All Users`);
  } catch (err) {
    logger.error(`Error sending token exchange notification: ${err.message}`);
  }
}

async function handleTokenExchangedNotification({ data }) {
  const { tx, token0, token1 } = data
  const message = `✅ Token exchange completed! \n\n Tx Id: ${tx}\n\nTokens: ${token0.symbol} - ${token1.symbol} \nAmount: ${token0.amount} - ${token1.amount}`;
  try {
    await sendMessageToAllUsers(message);
    logger.info(`Token exchanged notification sent to All Users`);
  } catch (err) {
    logger.error(`Error sending token exchanged notification: ${err.message}`);
  }
}

async function handleMintLiquidityNotification({ data }) {
  const { token0, token1, fee } = data
  const message = `⚠️ Mint liquidation imminent!\n\nTokens: ${token0.symbol} - ${token1.symbol} \nAmount: ${token0.balance} - ${token1.balance} \nFee: ${fee}%`;
  try {
    await sendMessageToAllUsers(message);
    logger.info(`Mint liquidation notification sent to All Users`);
  } catch (err) {
    logger.error(`Error sending mint liquidation notification: ${err.message}`);
  }

}

async function handleMintedLiquidityNotification({ data }) {
  const { txId, token0, token1, fee } = data
  const message = `✅ Mint liquidation completed! \n\n Tx Id: ${txId}\n\nTokens: ${token0.symbol} - ${token1.symbol} \nAmount: ${token0.balance} - ${token1.balance} \nFee: ${fee}%`;
  try {

    await sendMessageToAllUsers(message);
    logger.info(`Mint liquidation notification sent to All Users`);
  } catch (err) {
    logger.error(`Error sending mint liquidation notification: ${err.message}`);
  }
}

async function handleErrorNotification({ data }) {
  const { method, reason, message: errorMessage, token0, token1, postion } = data
  let message = `❌ Error occurred during ${method}!\n\n`
  if (reason)
    message += `Reason: ${reason}\n`;
  if (errorMessage)
    message += `Message: ${errorMessage}\n`;
  if (postion)
    message += `Position Id: ${postion}\n`;
  if (token0 && token1)
    message += `Tokens: ${token0.symbol} - ${token1.symbol}`;

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
  handleMintLiquidityNotification,
  handleMintedLiquidityNotification,
  handleErrorNotification,
};
