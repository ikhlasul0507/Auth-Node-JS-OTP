module.exports = (sequelize, Sequelize) => {
  const MenuItem = sequelize.define("menu_items", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    }
  });

  return MenuItem;
};