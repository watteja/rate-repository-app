import { FlatList, View } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";

import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../graphql/queries";
import ReviewItem from "./ReviewItem";

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <RepositoryItem repository={repository} singleRepository />
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
  });

  return data ? (
    <FlatList
      data={data.repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={<RepositoryInfo repository={data.repository} />}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  ) : null;
};

export default SingleRepository;
