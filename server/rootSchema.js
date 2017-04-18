import fs from "fs";
import path from "path";
import {makeExecutableSchema} from "graphql-tools";

const schema_file = [fs.readFileSync(path.join(__dirname) + '/root.graphqls', 'utf8')];

exports.schema = makeExecutableSchema({
    typeDefs: [schema_file],
    resolvers: {
        DibitRoot: {
            test(){
               return 1
            }
        }
    }
});
