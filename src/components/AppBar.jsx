import { View, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import Constants from "expo-constants";

import { ME } from "../graphql/queries";
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
  const { data } = useQuery(ME); // query is re-executed when resetStore in AppBarTab is called

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" />
        {data?.me ? (
          <>
            <AppBarTab text="Sign out" />
          </>
        ) : (
          <>
            <AppBarTab text="Sign in" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
