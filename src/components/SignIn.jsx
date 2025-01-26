import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    textAlign: "center",
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text
          color="appBarHeading"
          fontWeight="bold"
          fontSize="subheading"
          style={styles.button}
        >
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
