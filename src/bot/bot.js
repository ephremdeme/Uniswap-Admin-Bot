const { Telegraf, Markup } = require('telegraf');
const { BOT_TOKEN } = process.env;
const authController = require('./controllers/authController');
const infoController = require('./controllers/infoController');
const User = require('./models/user');
const logger = require('../utils/logger');
const { cacheUserId } = require('../utils/cacheUser');

const bot = new Telegraf(BOT_TOKEN);
const keyboard = Markup.inlineKeyboard([
  Markup.button.url('🛠 Update Position', 'https://uniswap-admin.vercel.app/liquidity'),
  Markup.button.callback('📚 Help', '/help'),
  Markup.button.callback('💰 Wallets', '/wallets'),
]);


bot.start(async (ctx) => {
  ctx.reply(`Hello @${ctx.from.username}, Welcome to Uniswap Admin Bot!`, keyboard);

  await User.updateOne({ telegramId: ctx.from.id }, { telegramId: ctx.from.id, ...ctx.from }, { upsert: true }).catch((err) => {
    logger.error(`Error saving user with Telegram ID ${ctx.from.id}: ${err.message}`);
  });
  cacheUserId(ctx.from.id);
  logger.info(`User ${ctx.from.id} logged in`);

});

bot.command('login', authController.handleLogin);
bot.command('help', infoController.handleHelp);
bot.command('positions', infoController.handlePositions);
bot.command('wallets', infoController.handleWallets);
bot.command('swap', infoController.handleSwap);

bot.on('callback_query', (ctx) => {
  const { data } = ctx.update.callback_query;
  const command = data.split('/')[1];
  switch (command) {
    case 'help':
      infoController.handleHelp(ctx);
      break;
    case 'positions':
      infoController.handlePositions(ctx);
      break;
    case 'wallets':
      infoController.handleWallets(ctx);
      break;
    case 'swap':
      infoController.handleSwap(ctx);
      break;
    default:
      console.warn(`Unknown callback query data: ${data}`);
  }
});

module.exports = bot;
