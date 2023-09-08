const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const { ROLES, MENU_DEFAULT } = require("../util/properties.util.js");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.petugas = require("../models/petugas.model.js")(sequelize, Sequelize);
db.auth_token = require("../models/auth_token.model.js")(sequelize, Sequelize);
db.menu = require("../models/menu.model.js")(sequelize, Sequelize);
db.menu_item = require("../models/menu_item.js")(sequelize, Sequelize);
db.auth_otp = require("../models/auth_otp.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
    through: "user_roles"
});
db.user.belongsToMany(db.role, {
    through: "user_roles"
});

db.menu.belongsToMany(db.user, {
    through: "user_menus"
});
db.user.belongsToMany(db.menu, {
    through: "user_menus"
});
// db.auth_token.belongsToMany(db.user, {
//     through: "auth_token"
// });

// db.user.belongsToMany(db.auth_token, {
//     through: "auth_token"
// });

// db.user.hasMany(db.auth_token, {
//     foreignKey: 'id_users',
// });
db.auth_token.belongsTo(db.user);
db.menu_item.belongsTo(db.menu);
db.auth_otp.belongsTo(db.user);

db.ROLES = ROLES
db.MENU_DEFAULT = MENU_DEFAULT
module.exports = db;