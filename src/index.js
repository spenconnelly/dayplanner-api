const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { connect } = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Async function to start server
const startServer =  async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  // Wait for MongoDB connection
  await connect('mongodb://localhost:27017/plannerdb', {useNewUrlParser: true});

  app.listen({ port: 4000 }, () => {
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

// Start Server
startServer();
