import {describe, it} from "mocha";
import {expect} from "chai";
// import request from "supertest";

import dibsdb from "../utils/database";
// import app from "../server";

import auth from '../utils/auth';

import NetworkPopulate from "../models/Network/test";
import UserPopulate from "../models/User/test";
import PlacePopulate from "../models/Place/test";
import TablePopulate from "../models/Table/test";

async function populate_db() {
    await dibsdb
        .sync({force: true})
        .then(NetworkPopulate)
        .then(UserPopulate)
        .then(PlacePopulate)
        .then(TablePopulate)
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
