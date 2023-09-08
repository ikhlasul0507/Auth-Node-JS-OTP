const db = require("../models");
const { statusFailed } = require("./responStatus");
const ROLES = db.ROLES;
const MENU_DEFAULT = db.MENU_DEFAULT;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            username: req.body.username,
            isActive: true
        }
    }).then(user => {
        if (user) {
            statusFailed("Failed! Username is already in use!", {}, res)
            return;
        }

        // Email
        User.findOne({
            where: {
                email: req.body.email,
                isActive: true
            }
        }).then(user => {
            if (user) {
                statusFailed("Failed! Email is already in use!", {}, res)
                return;
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

checkMenusExisted = (req, res, next) => {
    if (req.body.menus) {
        for (let i = 0; i < req.body.menus.length; i++) {
            if (!MENU_DEFAULT.includes(req.body.menus[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.menus[i]
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
    checkMenusExisted
};

module.exports = verifySignUp;