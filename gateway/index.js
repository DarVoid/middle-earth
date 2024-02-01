import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

const mordor_PORT =  process.env.MORDOR_PORT
const isengard_PORT =  process.env.ISENGARD_PORT

const server = new ApolloServer({
    gateway: new ApolloGateway({

        supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
                { name: 'mordor', url: `http://localhost:${mordor_PORT}/` },
                { name: 'isengard', url: `http://localhost:${isengard_PORT}/` },
                // ...additional subgraphs...
            ],
        }),
    }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
});
console.log(`🚀 Server ready at ${url}`);
