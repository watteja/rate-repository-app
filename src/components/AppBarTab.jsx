import { StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Text
      color="appBarHeading"
      fontWeight="bold"
      fontSize="heading"
      style={styles.container}
    >
      {text}
    </Text>
  );
};

export default AppBarTab;
