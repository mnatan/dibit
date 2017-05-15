import {attributeFields} from "graphql-sequelize";
import {GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import User from "./model"
import Network from "../Network/model"

module.exports = new GraphQLObjectType({
    name: 'User',
    description: 'Represents any human user regardless of the account type',
    fields: () => {
        const NetworkType = require("../Network/schema");
        const PlaceType = require("../Place/schema");
        return {
            ...attributeFields(User),
            places: {
                type: new GraphQLList(PlaceType),
                resolve: user => user
                    .getPlaces()
            },
            network: {
                type: NetworkType,
                resolve: user => Network
                    .findOne({where: {name: user.networkName}})
            }
        }
    }
});
