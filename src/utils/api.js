const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: `${process.env.API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.API_TOKEN}`
    },
});

module.exports = axiosInstance;