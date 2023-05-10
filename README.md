# Uniswap-Admin-Bot
A bot that can be used to manage Uniswap V2 Pairs and Liquidity

## Installation
1. Clone the repository
```bash
git clone https://github.com/ephremdeme/Uniswap-Admin-Bot.git
```
2. Install dependencies
```bash
cd Uniswap-Admin-Bot
npm install
```
3. Create a .env file and add the following
```bash
BOT_TOKEN = YOUR_BOT_TOKEN
PORT = 3000
WEBHOOK_URL = YOUR_WEBHOOK_URL # The domain name of your server
API_URL = YOUR_API_URL # The url of the uniswap-admin-api
MONGO_DB_URI = YOUR_MONGO_DB_URL
API_TOKEN = YOUR_API_TOKEN # The token used to access the admin API server
ALLOWED_USERS = COMMA_SEPARATED_USERNAMES # The telegram user name of the users allowed to use the bot
```
4. Start the bot
```bash
npm start
```
## Usage

### Commands
- /start - Start the bot
- /help - Show help
- /wallets - Show available wallets
