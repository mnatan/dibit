import morgan from "morgan";
import express from "express";
import graphqlHTTP from "express-graphql";
import {schema} from "./schema";
import * as logger from "../dist/logging";


const app = express();

app.use(morgan('combined', {"stream": logger.stream}));
app.set('port', process.env.PORT || 3000);
app.use('/static', express.static('public'));

app.use('/api/v1', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(app.get('port'));

logger.info('Initialized');

export default app;
