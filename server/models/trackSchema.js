module.exports = (sequelize, Sequelize) => {
    const trackSchema = sequelize.define("trackSchema", {
        lokalID : {
            type : Sequelize.STRING
        },
        coordinates: {
            type : Sequelize.JSON
        },
        MIDL_STENGT: {
            type : Sequelize.BOOLEAN
        },
        KOMMENTAR : {
            type : Sequelize.STRING
        }
    });
    return trackSchema;
}