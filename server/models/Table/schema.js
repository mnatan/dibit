import {GraphQLObjectType} from "graphql";
import {attributeFields} from "graphql-sequelize";
import model from "./model"

module.exports = new GraphQLObjectType({
    name: 'TablePopulate',
    description: 'TODO',
    fields: attributeFields(model)
});
