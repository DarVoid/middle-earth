# GraphQL Ins & Outs

**Talk/Workshop by Jorge Duque & Toby Selway**

*CTW Summit - 29/02/2024*

---

## Requirements
See [REQUIREMENTS.md](REQUIREMENTS.md).

## Getting Started

```
docker-compose up
```

## High-level Overview

```mermaid
graph TD;
    M(<b>Mordor</b><br/>Posts Backend) --> G;
    I(<b>Isengard</b><br/>Auth Backend) --> G;
    G(((<b>Gateway</b><br/>Federation))) --> S(<b>Shire</b><br/>Frontend);
```

## Project Structure

```c
├── gateway
├── isengard
├── mordor
│   ├── resolvers
│   │   └── post.js // Post resolver
│   ├── index.js
│   └── schema.gql // GraphQL schema
├── shire
├── test // Test suite to run against API
└── docker-compose.yaml
```

## Applications

### 👥 Isengard
**Authentication backend**

Written in Golang, this application provides a very simple GraphQL API that allows
querying for users and some kind of half-assed login.


### 🌿 Shire
**Our beautiful frontend**

Written in Nuxt (Vue.js) and styled with Tailwind CSS, this is where we query our gateway
and display our data for our user to see.

We've set it up with a few reasonable queries, but once you've finished feel free
to play around and build upon this any way you like.


### ⛏️ Mordor
**Some other backend**

This is where you come in fellow adventurer.

Your job is to implement what remains of this application in order to complete the product.


### 🔶 Gateway
**Apollo Federation Gateway**

A simple federation gateway implemented in JS with ApolloServer.

This aggregates data from Isengard and Mordor and provides it under a single GraphQL API
so that Shire can query it from one place.


### 📜 Test
**A test suite for sanity**

You didn't think we'd let you rawdog your way to Mordor, did you?
