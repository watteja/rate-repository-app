import { View, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import Constants from "expo-constants";

import { GET_CURRENT_USER } from "../graphql/queries";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_CURRENT_USER); // query is re-executed when resetStore in AppBarTab is called

  return (
    <View style={styles.container}>
      {data?.me ? (
        <ScrollView horizontal>
          <AppBarTab text="Repositories" />
          <AppBarTab text="Create a review" />
          <AppBarTab text="My reviews" />
          <AppBarTab text="Sign out" />
        </ScrollView>
      ) : (
        <ScrollView horizontal>
          <AppBarTab text="Repositories" />
          <AppBarTab text="Sign in" />
          <AppBarTab text="Sign up" />
        </ScrollView>
      )}
    </View>
  );
};

export default AppBar;
