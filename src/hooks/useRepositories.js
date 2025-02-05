import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });
  const [repositories, setRepositories] = useState();

  useEffect(() => {
    if (data) {
      console.log("fetched repository data", data);
      setRepositories(data.repositories);
    } else {
      console.log("no repository data fetched");
    }
  }, [data]);

  return { repositories, loading, error };
};

export default useRepositories;
