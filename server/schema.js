import {getSchema} from "graphql-sequelize-crud";
import {resolver} from "graphql-sequelize";
import {GraphQLList, GraphQLObjectType, GraphQLSchema} from "graphql";
import Place from "./models/Place";

exports.schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            places: {
                type: new GraphQLList(Place.Type),
                resolve: resolver(Place.Model)
            }
        }
    })
});
