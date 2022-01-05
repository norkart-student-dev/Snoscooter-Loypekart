module.exports = (sequelize, Sequelize) => {
  const poiSchema = sequelize.define("poiSchema", {
    name: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    komnr: {
      type: Sequelize.INTEGER
    },
    info: {
      type: Sequelize.STRING(10000)
    },
    location: {
      type: Sequelize.JSON
    }
  });

  return poiSchema;
};