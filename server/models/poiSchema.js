module.exports = (sequelize, Sequelize) => {
    const poiSchema = sequelize.define("poiSchema", {
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      }
    });
  
    return poiSchema;
  };