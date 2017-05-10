import Sequelize from "sequelize";
import dibitDB from "../utils/database";
import {attributeFields} from "graphql-sequelize";
import {GraphQLObjectType} from "graphql";
import Place from "./Place";

let Model = dibitDB.define('network', {
    name: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    description: Sequelize.TEXT,
});
Place.Model.belongsTo(Model, {allowNull: false});

let Type = new GraphQLObjectType({
    name: 'Network',
    description: 'represents network for multitenant pattern',
    fields: attributeFields(Model)
});

module.exports = {
    Model,
    Type,
    test: () => Promise.all([
        Model.findOrCreate({
            where: {name: `test`},
            defaults: {description: 'for test purposes'}
        }).spread((nt, cre) => nt)
    ])
};
