import jwt from "jsonwebtoken";
import * as passportJWT from "passport-jwt";
import * as logger from "./logging";
import * as _ from "lodash";
import * as bcrypt from "bcrypt";

import User from "../models/User";

const users = [
    {
        id: 1,
        name: 'mnatan',
        password: 'test'
    },
    {
        id: 2,
        name: 'admin',
        password: 'password'
    }
];

let jwtOptions = {
    secret: 'superSecretKey' // TODO
};

module.exports = {
    createUser: async function (userObject, unsafePassword) {
        userObject.passwordHash = await bcrypt.hash(unsafePassword, 13);
        let user = User.Model.build(userObject);
        await user.save();
        return user;
    },
    generateToken: async function (username, unsafePassword) {
        let user = await User.Model.findOne({where: {username: username}});
        if (user === null) throw new Error(`No such user: ${username}`);
        let passwordOk = await bcrypt.compare(unsafePassword, user.passwordHash);
        if (!passwordOk) throw new Error("Wrong password");

        let token = await jwt.sign(
            {data: user.username},
            jwtOptions.secret,
            {expiresIn: '72h'}
        );
        user.currentToken = token;
        await user.save();
        return token;
    },
    verifyToken: async function (token) {
        try {
            let info = await jwt.verify(token, jwtOptions.secret);
            return info.data
        } catch (e) {
            return false
        }
    },
    authorizeUser: async function () {
        throw new Error("Not implemented");
    }
};