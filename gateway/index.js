import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

const mordor_PORT =  process.env.MORDOR_PORT ?? 4000;
const isengard_PORT =  process.env.ISENGARD_PORT ?? 8000;

const server = new ApolloServer({
    gateway: new ApolloGateway({

        supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
                { name: 'mordor', url: `http://localhost:${mordor_PORT}/query` },
                { name: 'isengard', url: `http://localhost:${isengard_PORT}/query` },
                // ...additional subgraphs...
            ],
        }),
    }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 6473, path: '/query' },
});
console.log(`🚀 Server ready at ${url}`);
