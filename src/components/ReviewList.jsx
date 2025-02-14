import { FlatList, View } from "react-native";
import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER } from "../graphql/queries";
import ReviewItem from "./ReviewItem";

const MyReviews = () => {
  const { data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  return data ? (
    <FlatList
      data={data.me.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  ) : null;
};

export default MyReviews;
