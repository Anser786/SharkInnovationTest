import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Auth } from "../MyContext";
import { useNavigation } from "@react-navigation/native";
const SignUp = () => {
  const { storeUsers, users, storeUser, getUsers } = useContext(Auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { navigate } = useNavigation()
  const onSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Please fil all fields");
      return;
    }
    if (confirmPassword != password) {
      Alert.alert("Password does not match");
      return;
    }

    await storeUsers([...users, { email, password }]);
    await storeUser(true);
    getUsers();
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="SignUp" onPress={onSignUp} />
      <TouchableOpacity
        style={{ marginTop: 30 }}
        onPress={() => navigate("LoginScreen")}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
});

export default SignUp;
