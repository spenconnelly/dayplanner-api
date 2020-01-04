const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Date

  type Event {
    id: ID!
    creator: Profile
    name: String
    date: Date
    description: String
  }

  type Profile {
    id: ID!
    email: String
    events: [Event]
    createdDate: Date
  }

  type Query {
    profiles: [Profile]
    events: [Event]
    profile(id: ID!): Profile
    profileByEmail(email: String!): Profile
    event(id: ID!): Event
  }

  type Mutation {
    createProfile(email: String!): Profile
    createEvent(creator: ID!, name: String!, date: Date!, description: String): Event
  }
`;
