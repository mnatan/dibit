import express from "express";
import graphqlHTTP from "express-graphql";
import {schema} from "./schema";


const app = express();

app.set('port', process.env.PORT || 3000);
app.use('/static', express.static('public'));

app.use('/api/v1', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(app.get('port'));

console.log('Initialized'); // TODO morgan

export default app;
