import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const Repository = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  return data ? (
    <RepositoryItem repository={data.repository} singleRepoView />
  ) : null;
};

export default Repository;
