const { getTokenByIdUserDao, insertTokenDao, deleteTokenDao } = require("../dao/token.dao")

getTokenByIdUser = async (userId) => {
    const result = await getTokenByIdUserDao(userId)
    return result;
}


insertToken = async (user, token, res) => {
    const result = await insertTokenDao(user, token, res)
    return result;
}

deleteToken = async (user, token) => {
    const result = await deleteTokenDao(user, token)
    return result;
}

module.exports = {
    getTokenByIdUser,
    insertToken,
    deleteToken
}