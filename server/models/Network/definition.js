import Sequelize from "sequelize";
import dibitDB from "../../utils/database";

module.exports = dibitDB.define('network', {
    name: {type: Sequelize.STRING, primaryKey: true, unique: true, allowNull: false,},
    description: Sequelize.TEXT,
});