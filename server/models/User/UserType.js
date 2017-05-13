import Sequelize from "sequelize";
import dibitDB from "../../utils/database";
import {attributeFields} from "graphql-sequelize";
import {GraphQLObjectType} from "graphql";

let Model = dibitDB.define('userType', {
    userTypeName: Sequelize.STRING,
});

let Type = new GraphQLObjectType({
    name: 'UserType',
    description: "User type used to determine user's permissions and display additional options in frontend",
    fields: attributeFields(Model)
});

module.exports = {
    Model,
    Type
};
