import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection }) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { orderBy, orderDirection },
  });
  const [repositories, setRepositories] = useState();

  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);

  return { repositories, loading, error };
};

export default useRepositories;
