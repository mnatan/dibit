import {describe, it} from "mocha";
import {expect} from "chai";
import request from "supertest";

import dibsdb from "../database";
import app from "../server";

import * as Network from "../models/Network";
import * as Place from "../models/Place";
import * as Table from "../models/Table";

async function populate_db() {
    await dibsdb.sync({force: true})
        .then(Network.test)
        .then(Place.test)
        .then(Table.test)
}

beforeEach(async () => {
    await populate_db()
});

describe('gql schema', () => {
    const qry = `{
  places {
    id
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
                    "tables": [
                        {
                            "id": 1,
                            "name": "test table 1, 1"
                        },
                        {
                            "id": 2,
                            "name": "test table 1, 2"
                        },
                        {
                            "id": 3,
                            "name": "test table 1, 3"
                        },
                        {
                            "id": 4,
                            "name": "test table 1, 4"
                        }
                    ]
                },
                {
                    "id": 2,
                    "tables": [
                        {
                            "id": 5,
                            "name": "test table 2, 1"
                        },
                        {
                            "id": 6,
                            "name": "test table 2, 2"
                        },
                        {
                            "id": 7,
                            "name": "test table 2, 3"
                        },
                        {
                            "id": 8,
                            "name": "test table 2, 4"
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
