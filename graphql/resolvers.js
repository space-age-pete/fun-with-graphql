const { Racer } = require("../models");
const games = [{ name: "F-Zero" }, { name: "F-Zero X" }, { name: "F-Zero GX" }];

module.exports = {
  Query: {
    racers: async () => await Racer.find({}),
    games: (_, { name }) =>
      games.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      ),
  },
  Mutation: {
    registerRacer: async (_, body) => {
      const dbRacer = await Racer.create(body);
      console.log(dbRacer);
      return dbRacer;

      //needs error handling
    },
    winRace: async (_, { id }) => {
      const dbRacer = await Racer.findById(id);
      dbRacer.wins++;
      dbRacer.save();
      return dbRacer;

      //possible to do this with findByIdAndUpdate() ?
    },
    killRacer: async (_, { id }) => {
      const dbRacer = await Racer.findByIdAndDelete(id);
      console.log(dbRacer);
      //has access to racer and id
      return "A racer has died because of you";
    },
  },
};
