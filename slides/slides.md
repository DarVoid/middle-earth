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

# A bit about REST

<div>

  ```
  GET /api/v1/characters/5cd99d4bde30eff6ebccfc15

  {
    "data": {
      "_id": "5cd99d4bde30eff6ebccfc15",
      "height": 1.06,
      "race": "Hobbit",
      "gender": "Male",
      "birth": "22 September, TA 2968",
      "spouse": "",
      "death": "Unknown (Last sighting: September 29, 3021) (SR 1421)",
      "realm": "",
      "hair": "Brown",
      "name": "Frodo Baggins",
      "avatar": "https://cards.scryfall.io/large/front/d/e/de1c0399-9db8-4901-b72e-0010eb9b92b0.jpg"
    },
  }
  ```
  </div>

---

# A bit about REST

<div>

  ```
  // POST /api/v1/characters?race=hobbits&gender=male

  // Request
  {
    "birth": "22 September, TA 2968",
    "hair": "Brown",
    "name": "Frodo Baggins",
  }

  // Response
  // 201 Created

  {
    "data": {
      "_id": "5cd99d4bde30eff6ebccfc15",
      "race": "Hobbit",
      "gender": "Male",
      "birth": "22 September, TA 2968",
      "hair": "Brown",
      "name": "Frodo Baggins",
    },
  }
  ```
  </div>

<!--
Deixar a ressalva.
We know this isn't good practice.

- Query parameters
- Path parameters
- body (json/formdata/blob)

There are too many ways to do the same thing
-->

---

# A bit about REST

<div>

  ```
  // GET /api/v1/characters/5cd99d4bde30eff6ebccfc15/friends

  // Response
  {
    "data": [
      "520d3da9-f423-4dc7-8942-5463d14a1210",
      "b86e3bd5-b27a-496e-8444-96c52c717035",
      "99df0821-41f8-4e62-bec9-5cad93d97884"
    ],
  }

  // GET /api/v1/characters/520d3da9-f423-4dc7-8942-5463d14a1210  (times the number of friends)

  // Response
  {
    "data": {
      "_id": "520d3da9-f423-4dc7-8942-5463d14a1210",
      "race": "Maiar",
      "gender": "Male",
      "birth": "Before the the Shaping of Arda",
      "hair": "Grey, later white",
      "name": "Gandalf",
      "avatar": "https://cards.scryfall.io/large/front/c/c/cc9cfcc7-be64-4871-8d52-851e43fe3305.jpg"
    },
  }
  ```
  </div>

<!--
- Common REST pattern
- N + 1
- Extra load on endpoints
- Most of data may not even be needed
-->

---

# History

A bit about GraphQL

<div class="flex items-center gap-2">
  <svg class="w-18 h-18" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
  </svg>
  <h3>Created by Facebook in 2012</h3>
</div>

<div class="mt-8 flex items-center gap-2">
  <svg class="w-16 h-16" xmlns="http://www.w3.org/2000/svg" height="64" width="64" viewBox="0 0 29.999 30" fill="#e10098"><path d="M4.08 22.864l-1.1-.636L15.248.98l1.1.636z"/><path d="M2.727 20.53h24.538v1.272H2.727z"/><path d="M15.486 28.332L3.213 21.246l.636-1.1 12.273 7.086zm10.662-18.47L13.874 2.777l.636-1.1 12.273 7.086z"/><path d="M3.852 9.858l-.636-1.1L15.5 1.67l.636 1.1z"/><path d="M25.922 22.864l-12.27-21.25 1.1-.636 12.27 21.25zM3.7 7.914h1.272v14.172H3.7zm21.328 0H26.3v14.172h-1.272z"/><path d="M15.27 27.793l-.555-.962 10.675-6.163.555.962z"/><path d="M27.985 22.5a2.68 2.68 0 0 1-3.654.981 2.68 2.68 0 0 1-.981-3.654 2.68 2.68 0 0 1 3.654-.981c1.287.743 1.724 2.375.98 3.654M6.642 10.174a2.68 2.68 0 0 1-3.654.981A2.68 2.68 0 0 1 2.007 7.5a2.68 2.68 0 0 1 3.654-.981 2.68 2.68 0 0 1 .981 3.654M2.015 22.5a2.68 2.68 0 0 1 .981-3.654 2.68 2.68 0 0 1 3.654.981 2.68 2.68 0 0 1-.981 3.654c-1.287.735-2.92.3-3.654-.98m21.343-12.326a2.68 2.68 0 0 1 .981-3.654 2.68 2.68 0 0 1 3.654.981 2.68 2.68 0 0 1-.981 3.654 2.68 2.68 0 0 1-3.654-.981M15 30a2.674 2.674 0 1 1 2.674-2.673A2.68 2.68 0 0 1 15 30m0-24.652a2.67 2.67 0 0 1-2.674-2.674 2.67 2.67 0 1 1 5.347 0A2.67 2.67 0 0 1 15 5.347"/></svg>
  <h3>Made Open-Source in 2015</h3>
</div>

<div class="mt-8 flex items-center gap-2">
  <svg class="w-24 bg-gray-100 rounded-lg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" id="katman_1" x="0" y="0" style="enable-background:new 0 0 800 600" version="1.0" viewBox="0 0 800 600"><style>.st0{fill:#18385f}</style><path d="M325.2 194.4h37.2v3.8h-16.3v43.1h-4.4v-43.1h-16.3v-3.8h-.2zM366.8 194.4h4.4v20.3h27.9v-20.3h4.4v46.9h-4.4v-22.8h-27.9v22.8h-4.4v-46.9zM413.1 194.4h32.3v3.8h-27.9v16.9h26.2v3.8h-26.2v18.4h28.3v3.8h-32.6v-46.7zM325.2 357.5H355v3.8h-25.2v16.9h22.4v3.8h-22.4v22.4h-4.4v-46.9h-.2zM380.1 356.5c14.6 0 22 11.6 22 24.5s-7.4 24.5-22 24.5c-14.8 0-22-11.6-22-24.5s7.4-24.5 22-24.5zm0 45c12.3 0 17.7-10.4 17.7-20.7s-5.3-20.7-17.7-20.7c-12.3 0-17.7 10.4-17.7 20.7 0 10.5 5.4 20.7 17.7 20.7zM408.7 357.5h4.4v29c0 10.8 5.1 15 13.7 15 8.7 0 13.9-4.2 13.9-15v-29h4.6v30c0 9.7-5.1 17.8-18.2 17.8-12.9 0-18.2-8.2-18.2-17.8l-.2-30zM454.1 357.5h4.9l27.3 39.7h.2v-39.7h4.6v46.9h-4.9l-27.3-39.7h-.2v39.7h-4.6v-46.9zM500.2 357.5h16.1c14.2.4 21.4 8 21.4 23.3 0 15.6-7.4 23.2-21.4 23.3h-16.1v-46.6zm4.6 43.1h9.5c13.5 0 19.4-5.5 19.4-19.6s-5.9-19.6-19.4-19.6h-9.5v39.2zM558.9 357.5h4.9l18.4 46.9h-4.7l-5.7-14.6h-21.3l-5.7 14.6h-4.7l18.8-46.9zm-7 28.4h18.4l-9.1-23.9-9.3 23.9zM577.1 357.5h37.2v3.8H598v43.1h-4.6v-43.1h-16.3v-3.8zM618.9 357.5h4.6v46.9h-4.6v-46.9zM652.7 356.5c14.6 0 22 11.6 22 24.5s-7.4 24.5-22 24.5c-14.8 0-22-11.6-22-24.5s7.3-24.5 22-24.5zm0 45c12.3 0 17.7-10.4 17.7-20.7s-5.3-20.7-17.7-20.7c-12.3 0-17.7 10.4-17.7 20.7.2 10.5 5.3 20.7 17.7 20.7zM681.7 357.5h4.9l27.3 39.7h.2v-39.7h4.6v46.9h-4.9l-27.3-39.7h-.2v39.7h-4.6v-46.9zM325.2 255.2H351v62.3h37v21.4h-62.8v-83.7zM405.1 255.2H431v83.7h-25.8v-83.7zM450.1 255.2h26.4L501 300h.2v-44.8h24.5v83.7h-25.1l-25.8-45.6h-.2V339h-24.5v-83.8zM621.1 306.6c0 23.3-12.3 34.4-38.2 34.4s-38.3-11-38.3-34.4v-51.4h25.8v45.7c0 8.5-.2 19.2 12.5 19.2 12.1 0 12.1-10.8 12.1-19.2v-45.7h26v51.4h.1zM662.1 294.5l-27.5-39.3H665l12.7 22.8 12.5-22.8h28.7l-27 39.5 29.6 44.4h-31.1L676.2 314l-14.8 25.1h-29.6l30.3-44.6z" class="st0"/><path d="M120.2 362.2v-84.3H78.1v126.5h126.4v-42.2z" style="fill:#1698d6"/><path d="M288.8 193.7H78.1v63.2h42.1V236h126.5v126.2h-21.1v42.2h63.2z" class="st0"/></svg>
  <h3>Hosted by Linux Foundation</h3>
</div>

<div class="mt-8 flex items-center gap-2">
  <div class="bg-gray-700 px-5 pt-3 pb-4 rounded-lg text-4xl tracking-wider font-bold">{ }</div>
  <h3>Became a SDL (Schema Definition Language) in 2018</h3>
  <a href="https://github.com/graphql/graphql-spec/pull/90/files">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
  </a>
</div>

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
  - Schema Stitching (?)
  - Federation (?)
  - Subscriptions (?)

  </div>

</div>

<!--
- Example-driven workshop
-->

---

  <div class="flex items-start">

  <div class="flex-1">

  # Pros
  - No overfetching (less network overhead)
  - Frontend & Backend share contract
  - Reusability (more versatile queries that share fields)
  - Tooling
    - Playground is pretty nice
    - Automatic documentation
    - Community
  </div>

  <div class="flex-1">
  
  # Cons
  - It's not REST (not "standard")
  - Chatty microsservices (when wrapping existing API)
  - Caching difficulties
  - Collisions (federation)
  </div>

  <div class="flex-1">

  # Up to you
  - Error handling left up to implementation
  </div>
  
  </div>

<!--
- Community:
  - Conferência GraphQL -> GraphQL Summit
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

  <div class="flex-1">

  ```gql
  type Query {
    post(id: ID!): Post
    posts: [Post!]!
  }

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
  # Client
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
  // Response
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
  # Client
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
  // Response
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
    deletePost(id: ID!): ID!
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
  # Client
  mutation {
    deletePost(id: "42")
  }
  ```

  </div>

  <div class="flex-1">

  ```json
  // Response
  {
    "data": {
      "deletePost": "42"
    }
  }
  ```

  </div>

</div>

<hr class="border-gray-800" />

<div class="mt-4 flex gap-8">

  <div class="flex-1">

  ```gql
  # Client
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
  // Response
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

# Variables

<div class="flex items-center mt-4 gap-4">
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

  ```gql
  input PostInput {
    body: String!
    image: String
  }
  ```
</div>
</div>

<div class="flex items-center mt-4 gap-4">
<div class="mt-4">

  ```gql
  mutation CreateNewPost($postInput: PostInput) {
    newPost(input: $postInput) {
      id
    }
  }
  ```
</div>
<div class="mt-4">

  ```json
  // Variables
  {
    "postInput": {
      "body": "They're taking the Hobbits to Isengard",
      "image": "https://i.scdn.co/image/ab67706c00..."
    }
  }
  ```
</div>
</div>

---

# Error Handling
Left to implementation

<div class="mt-6 flex items-start gap-4">

<div class="flex-1">

  ```gql
  # Schema
  type User {
    name: String!
    email: String!
  }

  type ErrorNotFound {
    id: ID!
  }

  union UserResult = User | ErrorNotFound

  type Query {
    user(id: ID!): UserResult
  }
  ```
</div>
<div class="flex-1">

  ```gql
  # Client
  query {
    user(id: "42") {
      ... on User {
        name
        email
      }
      ... on ErrorNotFound {
        id
      }
    }
  }
  ```
</div>
</div>

<p class="pt-8 text-sm text-gray-600 flex items-center gap-1">
  There are other ways of handling errors, depending on client implementation
  <a href="https://www.apollographql.com/docs/apollo-server/data/errors/">
    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
  </a>
</p>

<!--
  If there's a will there's a way!  
-->
---

# Fragments
Lil' bits of reusability

<div class="mt-6 flex items-start gap-4">

<div class="flex-1">

  ```gql
  # Schema
  type User {
    name: String!
    email: String!
    password: String! # Terrible idea
    phone: String
    address: String
  }
  ```
</div>
<div class="flex-1">

  ```gql
  # Client
  fragment LoginFields on User {
    email
    password
  }

  fragment ContactInfo on User {
    email
    phone
    address
  }

  query {
    user(id: "42") {
      name
      ...ContactInfo
    }
  }
  ```
</div>
<div class="flex-1">

  ```json
  // Response
  {
    "data": {
      "user": {
        "name": "Frodo Baggins",
        "email": "frodo@shire.me",
        "phone": "123456789",
        "address": "8 Bag-End, Shire"
      }
    }
  }
  ```
</div>
</div>

---

# Query Resolvers

<div class="mt-6 flex items-start gap-4">

<div class="flex-1">

  ```gql
  # Schema
  type Query {
    users: [User!]!
    user(id: ID!): User
  }
  ```
</div>
<div class="flex-1">

  ```rust
  // Backend
  const resolvers = {
    Query: {

      users() {
        return users;
      },

      user(parent, args) {
        return users.find((user) => user.id === args.id);
      },

    },
  };
  ```
</div>
</div>

---

# Mutation Resolvers

<div class="mt-6 flex items-start gap-4">

<div class="flex-1">

  ```gql
  # Schema
  type Mutation {
    deletePost(id: ID!): ID!
    newPost(input: PostInput!): Post
  }

  input PostInput {
    body: String!
    image: String
  }
  ```
</div>
<div class="flex-1">

  ```rust
  // Backend
  const resolvers = {
    Mutation: {

      deletePost(parent, args) {
        posts.splice(posts.findIndex((post) => post.id == args.id), 1);
        return args.id;
      },

      newPost(parent, args) {
        const post = {
          id: posts.length,
          body: args.input.body,
          image: args.input.image,
        };
        posts.push(post);
        return post;
      },

    },
  };
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
- [GraphQL Security Considerations](https://inigo.io/blog/graphql_injection_attacks)
- [Error Handling](https://www.youtube.com/watch?v=RDNTP66oY2o)
