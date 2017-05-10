import jwt from "jsonwebtoken";
import passport from "passport";
import * as passportJWT from "passport-jwt";
import * as logger from "./logging";
import * as _ from "lodash";

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
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader(),
    secretOrKey: 'superSecretKey' // TODO
};

module.exports = {
    configurePassport: function () {
        let strategy = new passportJWT.Strategy(
            jwtOptions,
            function (jwt_payload, next) {
                logger.info('passport jwt - payload recived', jwt_payload);
                // usually this would be a database call:
                let user = users[_.findIndex(users, {id: jwt_payload.id})];
                if (user) {
                    next(null, user);
                } else {
                    next(null, false);
                }
            }
        );

        passport.use(strategy);

        return passport
    },
    authenticateUser: function (req, res) { // FIXME
        const name = req.body.user;
        const password = req.body.password;

        // usually this would be a database call:
        const user = _.find(users, {name: name});
        if (!user) {
            res.status(401).json({message: "no such user found"});
        }

        if (user.password === req.body.password) {
            // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
            const payload = {id: user.id};
            const token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({message: "ok", token: token});
        } else {
            res.status(401).json({message: "passwords did not match"});
        }
    }
};