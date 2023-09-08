const db = require("../models");
const role = db.role;
const Op = db.Sequelize.Op;

getAllRoleNamesDao = async (req, res) => {
    try {
        const data = await role.findAll({
            where: {
                name: {
                    [Op.or]: req.body.roles
                }
            }
        });
        return data;
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
module.exports = {
    getAllRoleNamesDao
}