import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import graphqlHTTP from "express-graphql";
import {schema} from "./utils/schema";
import * as logger from "../dist/logging";
import {configurePassport, authenticateUser} from "./utils/auth";


const app = express();

app.use(morgan('combined', {"stream": logger.stream}));
app.set('port', process.env.PORT || 3000);
app.use('/static', express.static('public'));

let passport = configurePassport();
app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api/v1', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.post("/login", authenticateUser);

app.get("/secret", passport.authenticate('jwt', {session: false}),
    function (req, res) {
        res.json({message: "Success!"});
    });

app.listen(app.get('port'));

logger.info('Initialized');

export default app;
