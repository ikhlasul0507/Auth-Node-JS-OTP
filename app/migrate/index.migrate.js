
const db = require("../models");
const { ROLES, MENU_DEFAULT } = require("../util/properties.util");
const Role = db.role;
const Menu = db.menu;
const MenuItem = db.menu_item;

executeMigrateData = async () => {
    await db.sequelize.sync({ force: true }).then(() => {
        console.log('Drop and Resync Db');
        addDefaultValueRole();
        addDefaultValueMenu();
        addDefaultValueMenuItem();
    });
    db.sequelize.sync();
}

addDefaultValueRole =  () => {
    for (let index = 0; index < ROLES.length; index++) {
        const element = ROLES[index];
        Role.create({
            id: index + 1,
            name: element,
        });
    }
}

addDefaultValueMenu =  () => {
    for (let index = 0; index < MENU_DEFAULT.length; index++) {
        const element = MENU_DEFAULT[index];
        Menu.create({
            id: index + 1,
            name: element,
            label: '-'
        });
    }
}

addDefaultValueMenuItem = async () => {
    MenuItem.create({
        id: 1,
        name: "Add User",
        url: '/add-users',
        menuId: 1
    });
    MenuItem.create({
        id: 2,
        name: "List User",
        url: '/list-users',
        menuId: 1
    });
    MenuItem.create({
        id: 3,
        name: "List Profile",
        url: '/list-profile',
        menuId: 2
    });
}

const exportData = {
    executeMigrateData
}

module.exports = exportData;