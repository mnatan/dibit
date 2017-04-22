import {describe, it} from "mocha";
import {expect} from "chai";
import request from "supertest";

import dibsdb from "../database";
import app from "../server";

import * as Network from "../models/Network";
import * as Place from "../models/Place";
import * as Table from "../models/Table";

async function populate_db() {
    await dibsdb.sync({force: true}).then(() => {
        return Network.Model
            .findOrCreate({where: {name: 'test'}, defaults: {description: 'for test purposes'}})
            .spread(function (nt, created) {
                return nt
            })
    }).then(nt => {
        return Place.Model.create({
            name: 'test place',
            description: 'for test purposes',
            network: nt.name
        });
    }).then(pl => {
        return Table.Model.create({name: 'test table', placeId: pl.id});
    }).then(tb => {
        return tb
    });
}

beforeEach(async () => {
    await populate_db()
});

describe('gql schema', () => {
    const qry = `{
                  places {
                    id
                    place_name
                    network
                    tables {
                      id
                      name
                    }
                  }
                }`;

    let expected = {
        "data": {
            "places": [
                {
                    "id": 1,
                    "place_name": null,
                    "network": "test",
                    "tables": [
                        {
                            "id": 1,
                            "name": "test table"
                        }
                    ]
                }
            ]
        }
    };
    it('should respond', async () => {
        await request(app)
            .post('/api/v1')
            .send({query: qry})
            .expect(res => {
                expect(res.body).to.be.deep.equal(expected, "blad!")
            });
    });
});
