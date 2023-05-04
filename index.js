require('dotenv').config({
    path: `.env`,
});
const server = require('./src/server/server');
const connectDb = require('./src/config/db');
const { initUserIdsCache } = require('./src/utils/cacheUser');
const bot = require('./src/bot/bot');


(async () => {
    await bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/telegram-webhook`)

    await connectDb();
    await initUserIdsCache();
    server.startServer()
})()
