const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Date

  type Event {
    id: ID!
    creator: Profile!
    participants: [Profile]
    name: String!
    date: Date!
    description: String
  }

  type Profile {
    id: ID!
    email: String!
    events: [Event]
    createdDate: Date!
  }

  type Query {
    profiles: [Profile]
    events: [Event]
    profile(id: ID!): Profile
    profileByEmail(email: String!): Profile
    event(id: ID!): Event
  }

  type Mutation {
    findOrCreateProfile(email: String!): Profile
    createEvent(creator: ID!, name: String!, date: Date!, description: String): Event
    addEventParticipant(eventId: ID!, profileId: ID!): Event
  }
`;
