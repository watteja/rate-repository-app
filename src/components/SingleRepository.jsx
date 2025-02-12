import { FlatList, View } from "react-native";
import { useParams } from "react-router-native";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";

import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import theme from "../theme";

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <RepositoryItem repository={repository} singleRepository />
    </View>
  );
};

const reviewStyles = {
  reviewContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.listItemBackground,
    padding: 15,
  },
  reviewRating: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewTextContainer: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 15,
    flexShrink: 1,
  },
  reviewText: {
    marginBottom: 10,
  },
};

const ReviewItem = ({ review }) => {
  return (
    <View style={reviewStyles.reviewContainer}>
      <View style={reviewStyles.reviewRating}>
        <Text color="primary" fontWeight="bold" fontSize="subheading">
          {review.rating}
        </Text>
      </View>
      <View style={reviewStyles.reviewTextContainer}>
        <Text fontWeight="bold" fontSize={"subheading"}>
          {review.user.username}
        </Text>
        <Text color="textSecondary" style={reviewStyles.reviewText}>
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
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
      ListHeaderComponent={() => (
        <RepositoryInfo repository={data.repository} />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  ) : null;
};

export default SingleRepository;
