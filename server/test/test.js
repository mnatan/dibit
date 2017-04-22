import {expect} from "chai";
import {describe, it} from "mocha";
import request from "supertest";

import dibsdb from "../database";
import app from "../server";

import * as Network from "../models/Network";
import * as Place from "../models/Place";
import * as Table from "../models/Table";


describe('gql schema', () => {
    const qry = ``;
    it('should respond', async () => {
        let res = await request(app)
            .post('/api/v1')
            .send({query: qry});
    });
});

describe('populate db', () => {
    it('doit', (done) => {
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
            done();
        });
    });
});