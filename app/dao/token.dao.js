const db = require("../models");
const { TOKEN_EXPIRED } = require("../util/properties.util");
const token = db.auth_token;

getTokenByIdUserDao = async (userId) => {
    const data = await token.findOne({
        where: {
            userId: userId
        }
    })
    return data;
}

insertTokenDao = async (user, tokenJWT, res) => {
    let data = {
        userId: user.id,
        token: tokenJWT,
        expired: TOKEN_EXPIRED,
    }
    try {
        const result = await token.create(data)
        return result
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

deleteTokenDao = (user, tokenJWT) => {
    try {
        const count = token.destroy({ where: { token: tokenJWT, userId: user.id } });
        return count;
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getTokenByIdUserDao,
    insertTokenDao,
    deleteTokenDao
};