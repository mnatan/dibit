import Sequelize from "sequelize";
import dibitDB from "../../utils/database";

module.exports = dibitDB.define('place', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
});
