import { expect, test, beforeAll, beforeEach } from 'bun:test';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

const apiUrl = process.env.API_URL ?? 'http://127.0.0.1:6473/query';
let client;

beforeAll(() => {
    client = new ApolloClient({
        uri: apiUrl,
        headers: {
            'mock-persistence': 'true',
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

beforeEach(() => {
    const resetClient = new ApolloClient({
        uri: apiUrl,
        headers: {
            'mock-persistence': 'true',
            'clear-persistence': 'true',
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
    return resetClient.query({
        query: gql`
            query {
                users { __typename }
            }
        `,
    });
});

test('when there are no users return empty array', async () => {
    const res = await client.query({
        query: gql`
            query {
                users {
                    name
                }
            }
        `,
    });
    expect(res.data)
        .toBeDefined();
    expect(res.data.users)
        .toBeArrayOfSize(0);
});

test('a user can be created', async () => {
    const mutRes = await client.mutate({
        mutation: gql`
            mutation($user: UserInput!) {
                newUser(user: $user) {
                    ...on User {
                        name
                    }
                }
            }
        `,
        variables: {
            user: {
                name: 'Boromir',
            },
        },
    });
    
    expect(mutRes.data)
        .toBeDefined();
    expect(mutRes.data.newUser.name)
        .toBe('Boromir');
    
    const res = await client.query({
        query: gql`
            query {
                users {
                    name
                }
            }
        `,
    });
    expect(res.data)
        .toBeDefined();
    expect(res.data.users)
        .toBeArrayOfSize(1);
    expect(res.data.users[0].name)
        .toBe('Boromir');
});

test('a user must have a non-empty name', async () => {
    const res = await client.mutate({
        mutation: gql`
            mutation($user: UserInput!) {
                newUser(user: $user) {
                    ...on User {
                        name
                    }
                    ...on ValidationError {
                        field
                        rule
                    }
                }
            }
        `,
        variables: {
            user: {
                name: '',
            },
        },
    });
    expect(res.data)
        .toBeDefined();
    expect(res.data.newUser.name)
        .toBeUndefined();
    expect(res.data.newUser.field)
        .toBe('name');
    expect(res.data.newUser.rule)
        .toBe('notEmpty');
});
