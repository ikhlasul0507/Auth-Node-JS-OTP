module.exports = (sequelize, Sequelize) => {
    const AuthToken = sequelize.define("otp", {
        otp: {
            type: Sequelize.STRING
        },
        expired: {
            type: Sequelize.INTEGER
        },
        timeCount: {
            type: Sequelize.TIME
        }
    });

    return AuthToken;
};