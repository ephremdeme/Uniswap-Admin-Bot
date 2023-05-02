const { Telegraf } = require('telegraf');
const { BOT_TOKEN } = process.env;
const authController = require('./controllers/authController');
const infoController = require('./controllers/infoController');
const { handlePoolRemoveNotification, handlePoolRemovedNotification, handleTokenExchangeNotification, handleTokenExchangedNotification, handleErrorNotification } = require('./controllers/notificationController');

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Welcome to Uniswap Admin Bot, ${ctx.from.username}! \nType /help to see available commands`));
bot.command('login', authController.handleLogin);
bot.command('logout', authController.handleLogout);
bot.command('help', infoController.handleHelp);
bot.command('positions', infoController.handlePositions);
bot.hears('poolRemove', (ctx) => {
  const { poolInfo, tokens, amount } = ctx.update.poolRemove;
  const message = `Liquidity pool ${poolInfo} is about to be removed. Tokens: ${tokens}. Amount: ${amount}.`;
  ctx.reply(message);
});
bot.hears('poolRemoved', (ctx) => {
  const { transactionInfo, tokens, amount } = ctx.update.poolRemoved;
  const message = `Liquidity pool has been removed. Tokens: ${tokens}. Amount: ${amount}. Transaction Info: ${transactionInfo}.`;
  ctx.reply(message);
});
bot.hears('tokenExchange', (ctx) => {
  const { tokens } = ctx.update.tokenExchange;
  const message = `Tokens ${tokens} are about to be exchanged to configured positions.`;
  ctx.reply(message);
});
bot.hears('tokenExchanged', (ctx) => {
  const { transactionInfo, tokens, amount } = ctx.update.tokenExchanged;
  const message = `Tokens ${tokens} have been exchanged to configured positions. Amount: ${amount}. Transaction Info: ${transactionInfo}.`;
  ctx.reply(message);
});
bot.on('error', (ctx, err) => {
  const message = `There was an error processing your request: ${err.message}`;
  ctx.reply(message);
  console.error(err);
});
bot.on('poolRemove', handlePoolRemoveNotification);
bot.on('poolRemoved', handlePoolRemovedNotification);
bot.on('tokenExchange', handleTokenExchangeNotification);
bot.on('tokenExchanged', handleTokenExchangedNotification);
bot.on('error', handleErrorNotification);

module.exports = bot;
