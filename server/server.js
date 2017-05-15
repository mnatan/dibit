import path from "path";
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import graphqlHTTP from "express-graphql";
import {schema} from "./utils/schema";
import * as logger from "./utils/logging";

const app = express();

app.use(morgan('combined', {"stream": logger.stream}));
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/static', express.static('public'));
app.use('/api/v1', graphqlHTTP({schema: schema, graphiql: true}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../frontend/index.html'));
});

app.listen(app.get('port'));

logger.info('Initialized');

export default app;
