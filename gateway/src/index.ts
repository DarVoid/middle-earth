import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

const wrapper_PORT =  process.env.WRAPPER_PORT
const snack_bro_PORT =  process.env.SNACK_BRO_PORT

const server = new ApolloServer({
    gateway: new ApolloGateway({

        supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
                { name: 'wrapped-api', url: `http://localhost:${wrapper_PORT}/query` },
                { name: 'snack-bro', url: `http://localhost:${snack_bro_PORT}/query` },
                // ...additional subgraphs...
            ],
        }),
    }),
});

const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);