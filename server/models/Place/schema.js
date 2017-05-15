import {GraphQLList, GraphQLObjectType} from "graphql";
import {attributeFields} from "graphql-sequelize";
import TableType from "../Table/schema";
import Place from "./model";

module.exports = new GraphQLObjectType({
    name: 'PlacePopulate',
    description: 'Represents physical place, eg. restaurant, bar, pitch field, etc',
    fields: {
        ...attributeFields(Place),
        tables: {
            type: new GraphQLList(TableType),
            resolve: place => Table.Model
                .findAll({where: {placeId: place.id}})
                .then(tbl => tbl.map(tb => tb.get()))
        }
    }
});
