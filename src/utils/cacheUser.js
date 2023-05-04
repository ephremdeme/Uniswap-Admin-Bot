const User = require("../bot/models/user");
const logger = require("./logger");

const usersSet = new Set();
const cacheUserId = (user) => {
    usersSet.add(user);
}
    ;
const getUserIds = () => {
    return usersSet.values();
}
    ;
const removeUserId = (id) => {
    usersSet.delete(id);
}

const initUserIdsCache = async () => {
    const users = await User.find({}, { telegramId: 1, _id: 0 }).catch((err) => {
        logger.error(`Error getting users from DB: ${err.message}`);
        throw err;
    });
    logger.info(`Caching ${users.length} users`);
    users.forEach((user) => {
        cacheUserId(user.telegramId);
    });
}



module.exports = {
    cacheUserId,
    getUserIds,
    removeUserId,
    initUserIdsCache
}