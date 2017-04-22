import Sequelize from "sequelize";
import dibitDB from "../database";
import {GraphQLObjectType} from "graphql";
import {attributeFields} from "graphql-sequelize";

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
    Type,
    test: place => Model.create({
        name: 'test table',
        placeId: place.id
    })
};
