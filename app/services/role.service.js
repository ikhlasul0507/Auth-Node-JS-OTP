const { getAllRoleNamesDao } = require("../dao/role.dao");

getAllRoleNames = async (req, res) => {
    const result = await getAllRoleNamesDao(req, res)
    return result;
}

module.exports = {
    getAllRoleNames
}