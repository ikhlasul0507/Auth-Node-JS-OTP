const { insertOtpDao, getOtpByEmailDao, getSendOtpByEmailDao, updateSendOtpByEmailDao } = require("../dao/otp.dao");

insertOtp = async (user, res) => {
    const result = await insertOtpDao(user, res)
    return result;
}

getOtpByEmail = async (otp) => {
    const result = await getOtpByEmailDao(otp)
    return result;
}

getSendOtpByEmail = async (otp) => {
    const result = await getSendOtpByEmailDao(otp)
    return result;
}

updateSendOtpByEmail = async (otp, res) => {
    const result = await updateSendOtpByEmailDao(otp)
    return result;
}
module.exports = {
    insertOtp,
    getOtpByEmail,
    getSendOtpByEmail,
    updateSendOtpByEmail
}