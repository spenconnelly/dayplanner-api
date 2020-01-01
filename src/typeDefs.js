const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    hello: String!
  }

  type Profile {
    id: ID!
    email: String!
  }

  type Mutation {
    createProfile(email: String!): Profile!
  }
`;
