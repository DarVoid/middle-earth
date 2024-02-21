import { expect, test, beforeAll } from 'bun:test';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

const apiUrl = process.env.API_URL ?? 'http://127.0.0.1:6473/query';
let client;

beforeAll(() => {
    client = new ApolloClient({
        uri: apiUrl,
        headers: {
            MockPersistance: true,
        },
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
});

test('get posts with body', async () => {
    const query = gql`
        query {
            posts {
                body
            }
        }
    `;
    const res = await client.query({ query });
    expect(res.data)
        .toBeDefined();
    expect(res.data.posts)
        .toBeArrayOfSize(2);
    expect(res.data.posts[0].body)
        .toBeString();
    expect(res.data.posts[1].body)
        .toBeString();
});
