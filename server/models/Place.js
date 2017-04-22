import Sequelize from "sequelize";
import dibitDB from "../database";
import Network from "./Network";
import Table from "./Table";
import {GraphQLList, GraphQLObjectType} from "graphql";
import {attributeFields, resolver} from "graphql-sequelize";

let Model = dibitDB.define('place', {
    place_name: Sequelize.STRING,
    description: Sequelize.TEXT,
});
Model.belongsTo(Network.Model, {
    as: 'name',
    foreignKey: 'network',
    allowNull: false
});
Model.hasMany(Table.Model, {as: "tables"});

let Type = new GraphQLObjectType({
    name: 'Place',
    description: 'Represents physical place, eg. restaurant, bar, pitch field, etc',
    fields: {
        ...attributeFields(Model),
        tables: {
            type: new GraphQLList(Table.Type),
            resolve: resolver(Table.Model)
        }
    }
});

module.exports = {
    Model,
    Type,
    test: network => Model.create({
        name: 'test place',
        description: 'for test purposes',
        network: network.name
    })
};
