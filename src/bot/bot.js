const { Telegraf, Markup } = require('telegraf');
const { BOT_TOKEN, ALLOWED_USERS  } = process.env;
const authController = require('./controllers/authController');
const infoController = require('./controllers/infoController');
const User = require('./models/user');
const logger = require('../utils/logger');
const { cacheUserId } = require('../utils/cacheUser');

const bot = new Telegraf(BOT_TOKEN);
const keyboard = Markup.inlineKeyboard([
  Markup.button.url('🛠 Update Position', `${process.env.API_URL}/liquidity`),
  Markup.button.callback('📚 Help', '/help'),
  Markup.button.callback('💰 Wallets', '/wallets'),
]);

bot.use(async (ctx, next) => {
  const { username } = ctx.from;
  if (ALLOWED_USERS.split(',').includes(username)) {
    await next();
  } else {
    logger.warn(`Unauthorized access from user @${username}`);
    ctx.reply('🚫 You are not authorized to use this bot. Contact Admin.');
  }
});

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

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
bot.command('wallets', infoController.handleWallets);

bot.on('callback_query', (ctx) => {
  const { data } = ctx.update.callback_query;
  const command = data.split('-')[0];
  switch (command) {
    case '/help':
      infoController.handleHelp(ctx);
      break;
    case '/positions':
      infoController.handlePositions(ctx);
      break;
    case '/wallets':
      infoController.handleWallets(ctx);
      break;
    case '/remove':
      infoController.handleRemoveLiquidity(ctx);
      break;
    case '/swap':
      infoController.handleRemoveLiquidityAndSwap(ctx);
      break;
    default:
      console.warn(`Unknown callback query data: ${data}`);
  }
});

module.exports = bot;
