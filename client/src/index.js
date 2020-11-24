import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import {
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloClient,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
