const {ApolloServer} = require('apollo-server');
const gql = require("graphql-tag");
const mongoose = require('mongoose');
require('dotenv').config();

const Post = require('./models/Post');
const User = require('./models/User');

const typeDefs  = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Query{
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        async getPosts () {
            try {
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
    .connect(process.env.MONGO, {useNewUrlParser: true})
    .then(() => {
        console.log(`MongoDB Atlas connected`);
        return server.listen({port: 5000})
    })
    .then(res => {
        console.log(`Server running on ${res.url}`);
    })