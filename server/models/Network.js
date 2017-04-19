import Sequelize from "sequelize";
import dibitDB from "../database";
import {attributeFields} from "graphql-sequelize";
import {GraphQLObjectType} from "graphql";

let Model = dibitDB.define('network', {
    name: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    description: Sequelize.TEXT,
});

let Type = new GraphQLObjectType({
    name: 'Network',
    description: 'represents network for multitenant pattern',
    fields: attributeFields(Model)
});

module.exports = {
    Model,
    Type
};
