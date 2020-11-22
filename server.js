const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

let racers = [
  {
    name: "Captain Falcon",
    car: "Blue Falcon",
    wins: 2,
    id: 1,
  },
  {
    name: "Blood Falcon",
    car: "Blood Hawk",
    wins: 1,
    id: 2,
  },
];

const games = [{ name: "F-Zero" }, { name: "F-Zero X" }, { name: "F-Zero GX" }];

const typeDefs = gql`
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

const resolvers = {
  Query: {
    racers: () => racers,
    games: (_, { name }) =>
      games.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      ),
  },

  Mutation: {
    registerRacer: (_, body) => {
      body.id = racers.length + 1;
      body.wins = 0;
      racers.push(body);
      return body;
    },
    winRace: (_, { id }) => {
      let index = racers.findIndex((racer) => racer.id == id);

      // let index = racers.findIndex((racer) => racer.id === +id);
      //kind of whack that ID starts as a number, then turns into a string
      //then I gotta turn it back into a number?
      //learn more about ID! stuff I guess

      console.log(racers);
      racers[index].wins++;
      return racers[index];

      //include no-match case later
    },
    killRacer: (_, { id }) => {
      racers = racers.filter((racer) => racer.id != id);
      return "A racer has died because of you";
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect("mongodb://localhost:27017/fzero", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => server.listen({ port: 5000 }))
  .then((res) => console.log(res.url))
  .catch((err) => console.log(err));

//notes:

//I don't totally get the ! before types deal
//like when it's need vs not

//how to stop optional fields from returning null
