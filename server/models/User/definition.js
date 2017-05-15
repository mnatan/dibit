import Sequelize from "sequelize";
import dibitDB from "../../utils/database";

module.exports = dibitDB.define('user', {
    // System data
    username: {type: Sequelize.STRING, primaryKey: true, unique: true, allowNull: false},
    passwordHash: {type: Sequelize.STRING, allowNull: false},
    currentToken: Sequelize.STRING,
    tokenEol: Sequelize.DATE,

    active: {type: Sequelize.BOOLEAN, default: true},

    // Personal info
    firstName: {type: Sequelize.STRING, allowNull: false},
    lastName: {type: Sequelize.STRING, allowNull: false},
    dateOfBirth: {type: Sequelize.DATEONLY, allowNull: false},
});
