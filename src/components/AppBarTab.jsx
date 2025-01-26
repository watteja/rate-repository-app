import { StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const AppBarTab = ({ text }) => {
  const destination = text === "Repositories" ? "/" : "/signin";
  return (
    <Pressable style={styles.container}>
      <Link to={destination}>
        <Text color="appBarHeading" fontWeight="bold" fontSize="subheading">
          {text}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
