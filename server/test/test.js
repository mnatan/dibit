import {describe, it} from "mocha";
import {expect} from "chai";
import request from "supertest";

import dibsdb from "../database";
import app from "../server";

import * as Network from "../models/Network";
import * as Place from "../models/Place";
import * as Table from "../models/Table";

async function populate_db() {
    await dibsdb
        .sync({force: true})
        .then(Network.test)
        .then(Place.test)
        .then(Table.test)
}

beforeEach(async () => {
    await populate_db()
});

describe('gql schema', () => {
    it('should respond', async () => {
        await request(app)
            .post('/api/v1')
            .send({
                query: `{
  places {
    id
    tables {
      id
      name
    }
  }
}`
            })
            .expect(res => {
                expect(res.body).to.have.property("data");
                expect(res.body).to.not.have.property("errors");
                expect(res.body.data).to.have.property("places");
                expect(res.body.data.places).to.have.length.above(0);
                expect(res.body.data.places[0]).to.have.property("id");
                expect(res.body.data.places[0]).to.have.property("tables");
                expect(res.body.data.places[0].tables).to.have.length.above(0);
            });
    });
});
