import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import { promises } from 'fs';

import { Query as PostQuery } from './resolvers/post';

const typeDefs = gql(await promises.readFile('schema.gql', 'utf8'));

const resolvers = {
    Query: {
        ...PostQuery,
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
