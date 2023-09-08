const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const t = require('../config/i18n.config');
const { statusProvide, statusAutorize } = require("./responStatus.js");
const User = db.user;
const AuthToken = db.auth_token;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return statusProvide(t.__('NO_TOKEN'), {}, res)
    }
    AuthToken.findOne({
        where: {
            token: token,
        }
    }).then(tokendb => {
        if (tokendb) {
            jwt.verify(token,
                config.secret,
                (err, decoded) => {
                    if (err) {
                        return statusAutorize(t.__('AUTORIZE'), {}, res)
                    }
                    req.userId = decoded.id;
                    next();
                });
        } else {
            return statusAutorize(t.__('AUTORIZE'), {}, res)
        }
    });

};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator Role!"
            });
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;