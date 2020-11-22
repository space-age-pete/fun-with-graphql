const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const { typeDefs, resolvers } = require("./graphql");

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
