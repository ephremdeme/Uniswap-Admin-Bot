require('dotenv').config();
const server = require('./src/server/server');
const bot = require('./src/bot/bot');

server.startServer();
bot.launch();
