
checkExpiredOTP = (otpDB) => {
    let check = false;
    const currentDate = new Date().toJSON().slice(0, 10) + 'T';
    const checkExpiredTimeDB = new Date(currentDate + otpDB.timeCount).getTime() + otpDB.expired * 1000;
    const currentTimeNow = new Date().getTime();
    if (currentTimeNow > checkExpiredTimeDB) {
        check = true;
    }
    return check;
}

module.exports = {
    checkExpiredOTP
}