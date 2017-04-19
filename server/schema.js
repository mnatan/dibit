import dibsdb from "./database";
import {getSchema} from "graphql-sequelize-crud";
import {resolver} from "graphql-sequelize";
import {GraphQLList, GraphQLObjectType, GraphQLSchema} from "graphql";
import Network from "./models/Network";
import Place from "./models/Place";
import Table from "./models/Table";

dibsdb.sync({force: true}).then(() => {
    return Network.Model
        .findOrCreate({where: {name: 'test'}, defaults: {description: 'for test purposes'}})
        .spread(function (nt, created) {
            return nt
        })
}).then(nt => {
    console.log(nt);
    return Place.Model.create({
        name: 'test place',
        description: 'for test purposes',
        network: nt.name
    });
}).then(pl => {
    console.log(pl);
    return Table.Model.create({name: 'test table', placeId: pl.id});
}).then(tb => {
    console.log(tb);
})
;

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
