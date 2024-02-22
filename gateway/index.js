import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';

const mordor_PORT =  process.env.MORDOR_PORT ?? 4000;
const isengard_PORT =  process.env.ISENGARD_PORT ?? 8000;

class PersistenceMockDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        request.http.headers.set("mock-persistence", context.persistence ? 'true' : 'false');
        request.http.headers.set("clear-persistence", context.clearPersistence ? 'true' : 'false');
    }
}

const server = new ApolloServer({
    gateway: new ApolloGateway({

        supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
                { name: 'mordor', url: `http://localhost:${mordor_PORT}/query` },
                { name: 'isengard', url: `http://localhost:${isengard_PORT}/query` },
                // ...additional subgraphs...
            ],
        }),

        buildService({ name, url }) {
            return new PersistenceMockDataSource({ url });
        },
    }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 6473, path: '/query' },
    context: async ({ req, res }) => {
        return {
            persistence: req.headers['mock-persistence']?.toLowerCase() == 'true',
            clearPersistence: req.headers['clear-persistence']?.toLowerCase() == 'true',
        };
    },
});
console.log(`🚀 Server ready at ${url}`);
