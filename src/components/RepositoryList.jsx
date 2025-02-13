import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

// These should be enums, but alas I'm not using TypeScript
const OrderBy = {
  CREATED_AT: "CREATED_AT",
  RATING_AVERAGE: "RATING_AVERAGE",
};

const OrderDir = {
  ASC: "ASC",
  DESC: "DESC",
};

const OrderPrinciple = {
  latest: {
    orderBy: OrderBy.CREATED_AT,
    orderDirection: OrderDir.DESC,
  },
  highest: {
    orderBy: OrderBy.RATING_AVERAGE,
    orderDirection: OrderDir.DESC,
  },
  lowest: {
    orderBy: OrderBy.RATING_AVERAGE,
    orderDirection: OrderDir.ASC,
  },
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ onPick }) => {
  const [pickerValue, setPickerValue] = useState("latest");
  return (
    <Picker
      selectedValue={pickerValue}
      onValueChange={(itemValue) => {
        onPick(itemValue);
        setPickerValue(itemValue);
      }}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

export const RepositoryListContainer = ({ repositories, onPick }) => {
  const navigate = useNavigate();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      ListHeaderComponent={<RepositoryListHeader onPick={onPick} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [orderPrinciple, setOrderPrinciple] = useState(OrderPrinciple.latest);
  const { repositories } = useRepositories(orderPrinciple);

  const handlePick = (value) => {
    setOrderPrinciple(OrderPrinciple[value]);
  };

  // extracted "pure" component for easier testing, as advised by the materials
  return (
    <RepositoryListContainer repositories={repositories} onPick={handlePick} />
  );
};

export default RepositoryList;
