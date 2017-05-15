import jwt from "jsonwebtoken";
import * as logger from "./logging";
import * as _ from "lodash";
import * as bcrypt from "bcrypt";

import User from "../models/User/model";

let jwtOptions = {
    secret: 'superSecretKey' // TODO
};

module.exports = {
    createUser: async function (userObject, unsafePassword) {
        userObject.passwordHash = await bcrypt.hash(unsafePassword, 13);
        let user = User.build(userObject);
        await user.save();
        return user;
    },
    generateToken: async function (username, unsafePassword) {
        let user = await User.findOne({where: {username: username}});
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
    authorizeUser: async function (permList) {
        throw new Error("Not implemented");
    }
};