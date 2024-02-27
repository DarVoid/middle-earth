import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import { promises } from 'fs';
import { handlePersistenceHeaders } from './persistence/HandlePersistenceHeaders';

import { Query as PostQuery, Mutations as PostMutation, Post  } from './resolvers/post';
import { Query as UserQuery, Mutations as UserMutation } from './resolvers/user';
import { Query as AuthQuery, Mutations as AuthMutation } from './resolvers/auth';

const typeDefs = gql(await promises.readFile('schema.gql', 'utf8'));

const resolvers = {
    Query: {
        ...PostQuery,
        ...UserQuery,
        ...AuthQuery,
    },
    Post,
    Mutation: {
        ...PostMutation,
        ...UserMutation,
        ...AuthMutation,
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
    context: handlePersistenceHeaders,
    listen: { port: 4000, path: '/query' },
});

console.log(`🚀 Server ready at: ${url}`);
