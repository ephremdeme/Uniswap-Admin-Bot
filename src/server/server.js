const express = require('express');
const { handleWebhook } = require('./controllers/webhookController');
const logger = require('../utils/logger');


function startServer() {
    const port = process.env.PORT || 3000;

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(handleErrors);

    app.post('/uniswap-webhook', handleWebhook);

    app.listen(port, () => {
        logger.info(`Server listening on port ${port}`);
    });
}

function handleErrors(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[${statusCode}] ${message}`);
    res.status(statusCode).json({ error: message });
}

module.exports = { startServer };

