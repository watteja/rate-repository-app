import { StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";

import useAuthStorage from "../hooks/useAuthStorage";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const AppBarTab = ({ text }) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const destination = text === "Sign in" ? "/signin" : "/";

  const handleOnPress = async () => {
    if (text === "Sign out") {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
    }
    navigate(destination);
  };

  return (
    <Pressable style={styles.container} onPress={handleOnPress}>
      <Text color="appBarHeading" fontWeight="bold" fontSize="subheading">
        {text}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
