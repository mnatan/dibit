import fs from "fs";
import path from "path";
import {makeExecutableSchema} from "graphql-tools";

const schema_file = fs.readFileSync(path.join(__dirname) + '/root.graphqls', 'utf8');

exports.schema = makeExecutableSchema({
    typeDefs: schema_file,
    resolvers: {
        Query: {
            posts() {
                return [
                    { id:1 },
                    { id:2 },
                    { id:3 },
                ];
            },
        },
        Mutation: {
            upvotePost(_, {postId}) {
                const post = find(posts, {id: postId});
                if (!post) {
                    throw new Error(`Couldn't find post with id ${postId}`);
                }
                post.votes += 1;
                return post;
            },
        },
        Author: {
            posts(author) {
                return filter(posts, {authorId: author.id});
            },
        },
        Post: {
            author(post) {
                return find(authors, {id: post.authorId});
            },
        },
    }
});
