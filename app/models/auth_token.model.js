module.exports = (sequelize, Sequelize) => {
    const AuthToken = sequelize.define("token", {
        token: {
            type: Sequelize.STRING
        },
        expired: {
            type: Sequelize.INTEGER
        }
    });

    return AuthToken;
};