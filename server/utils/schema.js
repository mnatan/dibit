import {getSchema} from "graphql-sequelize-crud";
import {resolver} from "graphql-sequelize";
import {GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull} from "graphql";
import User from "../models/User";
import * as auth from "./auth";

exports.schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            users: {
                type: new GraphQLList(User.Type),
                args: {
                    username: {type: GraphQLString}
                },
                resolve: resolver(User.Model)
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
            login: {
                type: GraphQLString,
                description: 'Used to authenticate the user',
                args: {
                    username: {type: new GraphQLNonNull(GraphQLString)},
                    password: {type: new GraphQLNonNull(GraphQLString)},
                },
                resolve: (obj, args, ctx) => auth.generateToken(args.username, args.password),
            },
            register: {
                type: User.Type,
                description: 'Used to authenticate the user',
                args: {
                    username: {type: new GraphQLNonNull(GraphQLString)},
                    password: {type: new GraphQLNonNull(GraphQLString)},
                    firstName: {type: new GraphQLNonNull(GraphQLString)},
                    lastName: {type: new GraphQLNonNull(GraphQLString)},
                    dateOfBirth: {type: new GraphQLNonNull(GraphQLString), description: "format: 'YYYY-MM-DD'"},
                },
                resolve: (obj, args, ctx) => auth.createUser(args, args.password),
            }
        }
    })
});
