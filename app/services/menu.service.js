const { getAllMenuNamesDao } = require("../dao/menu.dao");

getAllMenuNames = async (req, res) => {
    const result = await getAllMenuNamesDao(req, res)
    return result;
}

module.exports = {
    getAllMenuNames
}