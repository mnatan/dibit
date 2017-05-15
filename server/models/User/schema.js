import {attributeFields} from "graphql-sequelize";
import {GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import PlaceType from "../Place/schema";
import Place from "../Place/model"
import User from "./model"
import NetworkType from "../Network/schema"
import Network from "../Network/model"

module.exports = new GraphQLObjectType({
    name: 'User',
    description: 'Represents any human user regardless of the account type',
    fields: {
        ...attributeFields(User),
        places: {
            type: new GraphQLList(PlaceType),
            resolve: user => Place
                .findAll({where: {userUsername: user.username}})
                .then(place => place.map(x => x.get()))
        },
        network: {
            type: NetworkType,
            resolve: user => Network
                .findOne({where: {name: user.username}})
                .then(place => place.map(x => x.get()))
        }
    }
});

