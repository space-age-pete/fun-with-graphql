const { gql } = require("apollo-server");

module.exports = gql`
  type Racer {
    id: ID!
    name: String!
    car: String!
    wins: Int!
  }

  type Game {
    name: String!
  }

  type Query {
    racers: [Racer]
    games(name: String): [Game]
  }

  type Mutation {
    registerRacer(name: String!, car: String!): Racer!
    winRace(id: ID!): Racer!
    killRacer(id: ID!): String!
  }
`;
