import Sequelize from "sequelize";
import * as config from "./config.json";

let sequelize = new Sequelize(
    config.dibit_db.database,
    config.dibit_db.user,
    config.dibit_db.password,
    {
        host: config.dibit_db.host,
        port: config.dibit_db.port,
        dialect: 'postgres'
    }
);

export default sequelize;
