const gql = require("graphql-tag");

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String
    }

    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }

    type Mutation {
        # Auth
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!

        #Post
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
    }
`;