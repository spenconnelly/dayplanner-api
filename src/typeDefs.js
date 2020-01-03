const { gql } = require('apollo-server-express');

module.exports = gql`

  scalar Date

  type Profile {
    id: ID!
    email: String!
    createdDate: Date
  }

  type Event {
    name: String!
    description: String
    date: Date!
  }

  type Query {
    profiles: [Profile!]!
  }

  type Mutation {
    createProfile(email: String!): Profile!
  }
`;
