import {getSchema} from "graphql-sequelize-crud";
import {resolver} from "graphql-sequelize";
import {GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import User from "../models/User/User";
import {generateToken} from "./auth";

exports.schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            users: {
                type: new GraphQLList(User.Type),
                args: {
                    username: {
                        name: 'username', type: GraphQLString
                    }
                },
                resolve: resolver(User.Model)
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
            generateToken: {
                type: GraphQLString,
                description: 'Used to authenticate the user',
                resolve: generateToken,
                deprecationReason: 'Unused, auth via http'
            }
        }
    })
});
