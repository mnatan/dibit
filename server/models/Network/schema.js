import {attributeFields} from "graphql-sequelize";
import {GraphQLObjectType} from "graphql";
import Network from "./model";

module.exports = new GraphQLObjectType({
    name: 'NetworkPopulate',
    description: 'represents network for multitenant pattern',
    fields: attributeFields(Network)
});
