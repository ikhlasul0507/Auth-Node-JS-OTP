const db = require("../models");
const { getUser } = require("../services/user.service");
const t = require('../config/i18n.config');
const { statusSuccess } = require("../middleware/responStatus");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.getAllUser = async (req, res) => {
    const data = await getUser(req, res)
    statusSuccess(t.__('GET_SUCCESS'), data, res)
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};