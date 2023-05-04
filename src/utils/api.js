const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.API_TOKEN}`
    },
});

module.exports = axiosInstance;