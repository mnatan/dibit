import Sequelize from "sequelize";
import dibitDB from "../../utils/database";

module.exports = dibitDB.define('table', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
});
