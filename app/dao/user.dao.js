const db = require("../models");
const { selectDataQuery } = require("./util.dao");
const user = db.user;
const sequelize = db.sequelize;
var bcrypt = require("bcryptjs");

getUserDao = async (req, res) => {
    let query = "SELECT * FROM users ";
    const data = await sequelize.query(selectDataQuery(query, req), {
        model: user,
        mapToModel: true // pass true here if you have any mapped fields
    });
    return data;
};

getUserByUsernameDao = async (req, res) => {
    const data = await user.findOne({
        where: {
            username: req.body.username
        }
    })
    return data;
}

insertUserDao = async (req, res) => {
    let data = {
        username: req.body.username,
        email: req.body.email,
        handphone: req.body.handphone,
        password: bcrypt.hashSync(req.body.password, 8)
    }
    try {
        const result = await user.create(data)
        return result
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

updateUserVerifyActiveDao = async (email) => {
    let data = {
        isActive: true
    }
    try {
        const result = await user.update(data, {
            where: {
                email: email,
            }
        })
        return result
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
module.exports = {
    getUserDao,
    getUserByUsernameDao,
    insertUserDao,
    updateUserVerifyActiveDao
};