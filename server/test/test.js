import dibsdb from "../database";
import * as Network from "../models/Network";
import * as Place from "../models/Place";
import * as Table from "../models/Table";

export default function test() {
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
    });
}
