import express from "express";
import bodyParser from "body-parser";
import {graphiqlExpress, graphqlExpress} from "graphql-server-express";

import Client from "./models/Client";
import {schema} from "./rootSchema";

Client
    .sync()
    .then(() => {
        Client
            .build({
                title: 'test',
                description: 'test',
                deadline: new Date()
            })
            .save()
            .then(client => {
                console.log(client)
            });
    });

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