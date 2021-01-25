const gql = require("graphql-tag");

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
    }

    type Comment {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Like {
        id: ID!
        userId: String!
        username: String!
        createdAt: String!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
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

        #Comment
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!

        likePost(postId: ID!): Post!
    }
`;