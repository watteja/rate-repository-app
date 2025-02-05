import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://172.24.55.96:4000/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
