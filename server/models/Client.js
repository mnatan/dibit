import Sequelize from "sequelize";
import sequelize from "../database_connection";

let Client = sequelize.define('client', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    deadline: Sequelize.DATE
});
export default Client;
