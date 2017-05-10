import * as _ from "lodash";
import Sequelize from "sequelize";
import dibitDB from "../utils/database";
import Table from "./Table";
import {GraphQLList, GraphQLObjectType} from "graphql";
import {attributeFields} from "graphql-sequelize";

let Model = dibitDB.define('place', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
});
Table.Model.belongsTo(Model, {allowNull: false});

let Type = new GraphQLObjectType({
    name: 'Place',
    description: 'Represents physical place, eg. restaurant, bar, pitch field, etc',
    fields: {
        ...attributeFields(Model),
        tables: {
            type: new GraphQLList(Table.Type),
            resolve: place => Table.Model
                .findAll({where: {placeId: place.id}})
                .then(tbl => tbl.map(tb => tb.get()))
        }
    }
});

module.exports = {
    Model,
    Type,
    test: networks => Promise.all(
        networks.map(nt => Promise.all(
            [1, 2].map(no =>
                Model.create({
                    name: `test place ${no}`,
                    description: 'place for test purposes',
                    networkName: nt.name
                })
            )))).then(_.flatten)
};
