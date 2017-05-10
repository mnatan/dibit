import path from "path";
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import graphqlHTTP from "express-graphql";
import {schema} from "./utils/schema";
import * as logger from "./utils/logging";
import {configurePassport, authenticateUser} from "./utils/auth";


const app = express();

app.use(morgan('combined', {"stream": logger.stream}));
app.set('port', process.env.PORT || 3000);

let passport = configurePassport();
app.use(passport.initialize());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/static', express.static('public'));

app.use('/api/v1', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}),
    graphqlHTTP({
        schema: schema,
        graphiql: true
    }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../frontend/index.html'));
});


app.post("/login", authenticateUser);
app.get("/login", function (req, res) {
    res.json({message: 'you are not logged in'})
});

app.get("/secret", passport.authenticate('jwt', {session: false}),
    function (req, res) {
        res.json({message: "Success!"});
    });

app.listen(app.get('port'));

logger.info('Initialized');

export default app;
