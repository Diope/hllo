const {ApolloServer} = require('apollo-server');
const gql = require("graphql-tag");
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs  = gql`
    type Query{
        testQuery: String!
    }
`

const resolvers = {
    Query: {
        testQuery: () => 'Test'
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