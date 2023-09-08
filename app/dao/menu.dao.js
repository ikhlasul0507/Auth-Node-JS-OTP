const db = require("../models");
const menu = db.menu;
const Op = db.Sequelize.Op;

getAllMenuNamesDao = async (req, res) => {
    try {
        const data = await menu.findAll({
            where: {
                name: {
                    [Op.or]: req.body.menus
                }
            }
        });
        return data;
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
module.exports = {
    getAllMenuNamesDao
}