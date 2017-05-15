import {GraphQLList, GraphQLObjectType} from "graphql";
import {attributeFields} from "graphql-sequelize";
import Table from "../Table/model";
import Place from "./model";

module.exports = new GraphQLObjectType({
    name: 'PlacePopulate',
    description: 'Represents physical place, eg. restaurant, bar, pitch field, etc',
    fields: () => {
        const TableType = require("../Table/schema");
        const UserType = require("../User/schema");
        return {
            ...attributeFields(Place),
            tables: {
                type: new GraphQLList(TableType),
                resolve: place => Table
                    .findAll({where: {placeId: place.id}})
            },
            owners: {
                type: new GraphQLList(UserType),
                resolve: place => place
                    .getOwners()
            }
        }
    }
});