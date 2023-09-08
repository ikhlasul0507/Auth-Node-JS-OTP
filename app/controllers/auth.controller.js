const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const { TOKEN_EXPIRED, ALGORITHM, TOKEN_REFRESH_EXPIRED } = require("../util/properties.util");
const { getUserByUsername, insertUser, updateUserVerifyActive } = require("../services/user.service");
const { getTokenByIdUser, insertToken, deleteToken } = require("../services/token.service");
const { passwordIsValid } = require("../util/validateBodyRequest/util.valid");
const t = require('../config/i18n.config');
const { statusSuccess, statusFailed, statusAutorize } = require("../middleware/responStatus");
const { getAllRoleNames } = require("../services/role.service");
const { getAllMenuNames } = require("../services/menu.service");
const { menu_item } = require("../models");
const { insertOtp, getOtpByEmail, updateSendOtpByEmail } = require("../services/otp.service");
const { sendEmailOTP } = require("../middleware/mailConfigure");
const { checkExpiredOTP } = require("../util/configure.util");

exports.signup = async (req, res) => {
    let check = false;
    const user = await insertUser(req, res);
    if (user) {
        if (req.body.roles) {
            const roles = await getAllRoleNames(req);
            user.setRoles(roles);
            check = true
        } else {
            user.setRoles([1]);
            check = true
        }
        if (req.body.menus) {
            const menus = await getAllMenuNames(req);
            user.setMenus(menus);
            check = true;
        } else {
            user.setMenus([1]);
            check = true
        }
        const otpDB = await insertOtp(user, res);
        if (otpDB) {
            const info = await sendEmailOTP(otpDB.otp, user.email);
            check = true
            return res.status(200).send(info);
        }
        if (check) {
            return statusSuccess(t.__('REGIS_SUCCESS'), { id: user.id, otp: otpDB.otp }, res);
        } else {
            return statusFailed(t.__('GET_FAILED'), {}, res)
        }
    }
};

exports.signin = async (req, res) => {
    let user = await getUserByUsername(req, res);
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }
    if (!user.isActive) {
        return res.status(404).send({ message: "User must be verify." });
    }
    let checkLoginUser = await getTokenByIdUser(user.id);
    if (checkLoginUser) {
        const data = {
            message: "User is currently logged in.",
            token: checkLoginUser.token
        }
        return statusAutorize(t.__('AUTORIZE'), data, res)
    }
    if (!passwordIsValid(req.body.password, user.password)) {
        const data = {
            accessToken: null,
            message: "Invalid Password!"
        }
        return statusAutorize(t.__('AUTORIZE'), data, res)
    }
    const token = jwt.sign({ id: user.id, username: user.username },
        config.secret,
        {
            algorithm: ALGORITHM,
            allowInsecureKeySizes: true,
            expiresIn: TOKEN_EXPIRED, // 24 hours
        });
    const refreshToken = jwt.sign({ id: user.id }, config.refreshTokenSecret, { expiresIn: TOKEN_REFRESH_EXPIRED })

    var authorities = [];
    var menu = [];
    await user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
            authorities.push(roles[i].name.toUpperCase());
        }
    });
    await user.getMenus().then(menus => {
        for (let i = 0; i < menus.length; i++) {
            menu_item.findAll({
                where: {
                    menuId: menus[i].id
                }
            }).then(data => {
                let menuName = menus[i].name.toUpperCase()
                const send = {
                    [menuName]: data
                }
                menu.push(send);
            });
        }
    });
    if (token) {
        const accessAuth = await insertToken(user, token, res);
        let data = {
            id: user.id,
            username: user.username,
            email: user.email,
            handphone: user.handphone,
            roles: authorities,
            menu: menu,
            access: accessAuth,
            refreshToken: {
                refreshToken,
                TOKEN_REFRESH_EXPIRED
            }
        }
        statusSuccess(t.__('GET_SUCCESS'), data, res);
    }
};

exports.verifyOtp = async (req, res) => {
    const otpDB = await getOtpByEmail(req.body);
    if (!otpDB) {
        return res.status(404).send({ message: "OTP Not found." });
    }
    const checkOTP = checkExpiredOTP(otpDB);
    if (checkOTP) {
        return res.status(404).send({ message: "OTP Expired, please new request." });
    }
    const activatedUser = await updateUserVerifyActive(otpDB.user.email);
    if (!activatedUser) {
        return res.status(404).send({ message: "Failed activated user" });
    }
    return res.status(200).send({ msg: "Success activated user" });

};

exports.verifySendOtp = async (req, res) => {
    const otpDB = await getSendOtpByEmail(req.body);
    if (!otpDB) {
        return res.status(404).send({ message: "OTP Not found." });
    }
    const updatedOTP = await updateSendOtpByEmail(otpDB.id, res);
    if (updatedOTP) {
        const info = await sendEmailOTP(updatedOTP.otp, updatedOTP.user.email);
        return res.status(200).send(info);
    }

}

exports.logout = async (req, res) => {
    let user = await getUserByUsername(req, res);
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }
    if (!passwordIsValid(req.body.password, user.password)) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }
    let token = req.headers["x-access-token"];
    if (!token) {
        return statusProvide(t.__('NO_TOKEN'), {}, res)
    }
    const count = deleteToken(user, token);
    if (count) {
        return statusSuccess(t.__('You have been Logged Out !'), {}, res);
    } else {
        res.status(400).send({
            message: 'Error !'
        });
    }
};

