import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { promises } from 'fs';

import { Query as PostQuery } from './resolvers/post';

const typeDefs = await promises.readFile('schema.gql', 'utf8');

const resolvers = {
    Query: {
        ...PostQuery,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
