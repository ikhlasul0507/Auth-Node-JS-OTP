const { auth_otp, user } = require("../models");
const otpGenerator = require('otp-generator');
const { OTP_EXPIRED } = require("../util/properties.util");

insertOtpDao = async (user, res) => {
    const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const d = new Date();
    let text = d.toLocaleTimeString();
    let data = {
        userId: user.id,
        otp: OTP,
        timeCount: text,
        expired: OTP_EXPIRED,
    }
    try {
        const result = await auth_otp.create(data)
        return result
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

getOtpByEmailDao = async (req) => {
    const data = await auth_otp.findOne({
        where: {
            otp: req.otp,
        },
        include: {
            model: user,
            where: {
                email: req.email
            }
        }
    })
    return data;
}

getSendOtpByEmailDao = async (req) => {
    const data = await auth_otp.findOne({
        include: {
            model: user,
            where: {
                email: req.email
            }
        }
    })
    return data;
}

updateSendOtpByEmailDao = async (id, res) => {
    const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const d = new Date();
    let text = d.toLocaleTimeString();
    let data = {
        otp: OTP,
        timeCount: text,
    }
    try {
        const result = await auth_otp.update(data, {
            where: {
                id: id,
            },
            returning: true,
            plain: true
        })
        if (result) {
            const getResult = await auth_otp.findOne({
                where: {
                    id: id,
                },
                include: {
                    model: user
                }
            });
            return getResult
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

deleteOtpDao = (otp, res) => {
    try {
        const count = auth_otp.destroy({ where: { otp: otp } });
        return count;
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    insertOtpDao,
    getOtpByEmailDao,
    getSendOtpByEmailDao,
    updateSendOtpByEmailDao,
    deleteOtpDao
}