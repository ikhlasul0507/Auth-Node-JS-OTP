const { getUserDao, getUserByUsernameDao, insertUserDao, updateUserVerifyActiveDao } = require("../dao/user.dao");

getUser = async (req, res) => {
    const result = await getUserDao(req, res)
    return result;
}

getUserByUsername = async (req, res) => {
    const result = await getUserByUsernameDao(req, res)
    return result;
}

insertUser = async (req, res) => {
    const result = await insertUserDao(req, res)
    return result;
}

updateUserVerifyActive = async (email) => {
    const result = await updateUserVerifyActiveDao(email)
    return result;
}

const exportData = {
    getUser,
    getUserByUsername,
    insertUser,
    updateUserVerifyActive
};
module.exports = exportData;