import Sequelize from "sequelize";
import dibitDB from "../utils/database";
import {GraphQLObjectType} from "graphql";
import {attributeFields} from "graphql-sequelize";

let Model = dibitDB.define('table', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
});

let Type = new GraphQLObjectType({
    name: 'Table',
    description: 'TODO',
    fields: attributeFields(Model)
});

module.exports = {
    Model,
    Type,
    test: places => Promise.all(
        places.map(pl =>
            [1, 2, 3, 4].map(no => {
                Model.create({
                    name: `test table ${pl.id}, ${no}`,
                    placeId: pl.id
                })
            })))
};
