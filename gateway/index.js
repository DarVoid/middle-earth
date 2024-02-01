import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

const mordor_PORT =  process.env.MORDOR_PORT
const snack_bro_PORT =  process.env.SNACK_BRO_PORT

const server = new ApolloServer({
    gateway: new ApolloGateway({

        supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
                { name: 'mordor', url: `http://localhost:${mordor_PORT}/` },
                { name: 'snackBro', url: `http://localhost:${snack_bro_PORT}/query` },
                // ...additional subgraphs...
            ],
        }),
    }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
});
console.log(`🚀  Server ready at ${url}`);
