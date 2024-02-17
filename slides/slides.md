---
highlighter: shiki
lineNumbers: true
title: GraphQL Ins & Outs
mdc: true
transition: fade
background: img/cover_bg.png
fonts:
  sans: 'sans-serif'
---

<div class="flex items-center gap-3">
  <img src="img/logo.svg" class="w-16 h-16 mb-3" />
  <h1>GraphQL Ins & Outs</h1>
</div>

<p class="text-left">
  A Talk/Workshop by Jorge Duque & Toby Selway
</p>

---

# History

A bit about GraphQL

- Who created
- Alternative to REST

---

# Our Quest

Let us begin our adventure

<div class="flex">

  <div class="w-1/3">

  - Schema
    - Scalar types
    - Non-scalar types
    - Lists
    - Nullable
    - Enums
    - Input types
    - Unions
      - Error handling
      - ...

  </div>

  <div class="w-1/3">

  - Queries
  - Mutations
  - Resolvers
  - Schema Stitching
  - Federation
  - Subscriptions (?)

  </div>

  <div class="w-1/3">

  - Pros & Cons

  </div>

</div>

  <!--
  # Pros
  - No overfetching (less network overhead)
    - Client requests exactly what it needs
  - Frontend & Backend share contract
    - Foster independency across stack
  - Reusability (more versatile queries that share fields)
  - Tooling
    - Playground is pretty nice
    - Automatic documentation
    - Community

  # Cons
  - It's not REST (not "standard")
    - Learning curve
  - Chatty microsservices (when wrapping existing API)
  - Caching difficulties
    - There are a few solutions
  - Collisions (federation)
  
  # Up to you
  - Error handling left up to implementation
    - Is this a pro or con?
  -->

---

# Schema

<div class="flex gap-8">

  <div class="flex-1">

  ```gql
  type Post {
    id: ID!
    body: String!
    image: String
    likes: Int!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    disabled: Boolean!
    roles: [Role!]!
  }
  ```

  </div>

  <div class="flex-1">

  ```gql
  type Role {
    title: String!
    permissions: [Permission!]!
  }

  enum Permission {
    CREATE_POSTS
    VIEW_POSTS
    EDIT_POSTS
    DELETE_POSTS
  }
  ```

  </div>

</div>

---

# Query

<div class="flex gap-8 mb-4">

  <div class="flex-1">

  ```gql
  # Schema
  type Query {
    post(id: ID!): Post
    posts: [Post!]!
  }
  ```
  </div>

  <div class="flex-1">

  ```gql
  query {
    post(id: "42") {
      id
      body
      image
      likes
    }
  }
  ```

  </div>

  <div class="flex-1">

  ```json
  {
    "data": {
      "post": {
        "id": "42",
        "body": "Lorem ipsum",
        "image": null,
        "likes": 96
      }
    }
  }
  ```

  </div>

</div>

<hr class="border-gray-800" />

<div class="mt-4 flex gap-8">

  <div class="flex-1">
  </div>

  <div class="flex-1">

  ```gql
  query {
    posts {
      id
      likes
    }
  }
  ```

  </div>

  <div class="flex-1">

  ```json
  {
    "data": {
      "posts": [
        { "id": "41", "likes": 73 },
        { "id": "42", "likes": 96 },
        { "id": "43", "likes": 19 }
      ]
    }
  }
  ```

  </div>

</div>

---

# Mutation

<div class="flex gap-8 mb-4">

  <div class="flex-1">

  ```gql
  # Schema
  type Mutation {
    deletePost(id: ID!)
    newPost(input: PostInput!): Post
  }

  input PostInput {
    body: String!
    image: String
  }
  ```
  </div>

  <div class="flex-1">

  ```gql
  mutation {
    deletePost(id: "42")
  }
  ```

  </div>

  <div class="flex-1">

  ```json
  // 200 OK
  ```

  </div>

</div>

<hr class="border-gray-800" />

<div class="mt-4 flex gap-8">

  <div class="flex-1">

  ```gql
  mutation {
    newPost(input: {
      body: "They're taking the Hobbits to Isengard"
      image: "https://i.scdn.co/image/ab67706c0000da84f0ce261134f6e62f71fe03ec"
    }) {
      id
    }
  }
  ```

  </div>

  <div class="flex-1">

  ```json
  {
    "data": {
      "post": {
        "id": "44"
      }
    }
  }
  ```

  </div>

</div>

---

# Further resources
Where to go next?
 
- [GraphQL](https://graphql.org/)
- [Apollo](https://www.apollographql.com/)
- [Apollo Federation](https://www.apollographql.com/docs/federation)
- [Mesh](https://the-guild.dev/graphql/mesh)
- [Roadmap.sh for GraphQL](https://roadmap.sh/graphql)
- [GitHub GraphQL API Explorer](https://docs.github.com/en/graphql/overview/explorer)
