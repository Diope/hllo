require('dotenv').config();
const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req}) //Can access request body in context so add protected routes
});

mongoose
    .connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(`MongoDB Atlas connected`);
        return server.listen({port: 5000})
    })
    .then(res => {
        console.log(`Server running on ${res.url}`);
    })