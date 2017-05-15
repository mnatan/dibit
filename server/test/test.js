import {describe, it} from "mocha";
import {expect} from "chai";
// import request from "supertest";

import dibsdb from "../utils/database";
// import app from "../server";

import * as auth from '../utils/auth';

import * as Network from "../models/Network";
import * as Place from "../models/Place";
import * as Table from "../models/Table";
import * as User from "../models/User";

async function populate_db() {
    await dibsdb
        .sync({force: true})
        .then(Network.test)
        .then(User.test)
        .then(Place.test)
        .then(Table.test)
}

let transaction = null;

before(async () => {
    await populate_db()
});

// beforeEach(async () => {
//     transaction = await dibsdb.transaction();
// });
//
// afterEach(async () => {
//     transaction.rollback();
// });

describe('authorisation', () => {
    it('succesful user creation and login', async () => {
        let user = await auth.createUser({
            username: 'kszczur',
            firstName: 'Krzysztof',
            lastName: 'Sczur',
            dateOfBirth: '1994-09-26',
        }, 'testpass1');
        expect(user.firstName).to.be.equal('Krzysztof');
        let token = await auth.generateToken('kszczur', 'testpass1');
        expect(token).to.have.length.above(15);
        let username = await auth.verifyToken(token);
        expect(username).to.be.equal('kszczur');
    });
});

// describe('gql schema', () => {
//     it('should respond', async () => {
//         await request(app)
//             .post('/api/v1')
//             .send({
//                 query: `
// {
//   places {
//     id
//     tables {
//       id
//       name
//     }
//   }
// }`
//             })
//             .expect(res => {
//                 expect(res.body).to.have.property("data");
//                 expect(res.body).to.not.have.property("errors");
//                 expect(res.body.data).to.have.property("places");
//                 expect(res.body.data.places).to.have.length.above(0);
//                 expect(res.body.data.places[0]).to.have.property("id");
//                 expect(res.body.data.places[0]).to.have.property("tables");
//                 expect(res.body.data.places[0].tables).to.have.length.above(0);
//             });
//     });
// });
