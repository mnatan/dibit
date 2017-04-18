import express from "express";
import bodyParser from "body-parser";
import {graphiqlExpress, graphqlExpress} from "graphql-server-express";

import {schema} from "./rootSchema";


const app = express();
app.set('port', process.env.PORT || 3000);

app.use('/static', express.static('public'));

app.use(bodyParser.json());
app.use('/api/v1', graphqlExpress((req) => {
    return {
        schema: schema,
        context: {
            request: req,
        },
    };
}));
app.use('/api/graphiql', graphiqlExpress({endpointURL: 'v1'}));

app.listen(app.get('port'));