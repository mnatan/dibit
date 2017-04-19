import Sequelize from "sequelize";
import dibitDB from "../database";
import {GraphQLObjectType} from "graphql";
import {attributeFields} from "graphql-sequelize";
import Place from "./Place";

let Model = dibitDB.define('table', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
});

let Type = new GraphQLObjectType({
    name: 'Table',
    description: 'TODO',
    fields: attributeFields(Model)
});

module.exports = {
    Model,
    Type
};
