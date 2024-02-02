import { expect, test } from 'bun:test';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

const client = new ApolloClient({
    uri: 'http://127.0.0.1:5000', // TODO: change to use env variable
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});

test('get post with title', async () => {
    const query = gql`
        query {
            post {
                title
            }
        }
    `;
    const res = await client.query({ query });
    expect(res)
        .toBeObject()
        .toHaveProperty('data.post.title');
    expect(res.data.post.title)
        .toBeString();
});
