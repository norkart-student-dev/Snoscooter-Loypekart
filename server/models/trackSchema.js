module.exports = (sequelize, Sequelize) => {
    const trackSchema = sequelize.define("trackSchema", {
        LOKAL_ID : {
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
        },
        SPLITTED : {
            type : Sequelize.BOOLEAN,
            defaultValue : false
        }
    });
    return trackSchema;
}