const { handlePoolRemoveNotification, handlePoolRemovedNotification, handleTokenExchangeNotification, handleTokenExchangedNotification, handleErrorNotification } = require('../../bot/controllers/notificationController');
const logger = require('../../utils/logger');

function handleWebhook(req, res) {
  const { event } = req.body;
  logger.info(`Uniswap webhook called ${JSON.stringify(req.body)}`);
  switch (event) {
    case 'poolRemove':
      handlePoolRemoveNotification(req.body);
      break;
    case 'poolRemoved':
      handlePoolRemovedNotification(req.body);
      break;
    case 'tokenExchange':
      handleTokenExchangeNotification(req.body);
      break;
    case 'tokenExchanged':
      handleTokenExchangedNotification(req.body);
      break;
    case 'error':
      handleErrorNotification(req.body);
      break;
    default:
      console.warn(`Unknown event type: ${event}`);
  }
  res.sendStatus(200);
}

module.exports = { handleWebhook };
