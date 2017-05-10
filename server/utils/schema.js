import {getSchema} from "graphql-sequelize-crud";
import {resolver} from "graphql-sequelize";
import {GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import Place from "../models/Place";
import {generateToken} from "./auth";

exports.schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            places: {
                type: new GraphQLList(Place.Type),
                resolve: resolver(Place.Model)
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
            generateToken: {
                type: GraphQLString,
                description: 'Used to authenticate the user',
                resolve: generateToken
            }
        }
    })
});
