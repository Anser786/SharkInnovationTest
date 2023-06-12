import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  ToastAndroid,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "../MyContext";
import * as SecureStore from "expo-secure-store";

const Login = () => {
  const { storeUser, users } = useContext(Auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate } = useNavigation();

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please fil all fields");
      return;
    }
    let isUser = users.find(
      (user) => user.email == email && user.password == password
    );
    if (isUser) {
      storeUser(true);
    } else Alert.alert("Email or Password Wrong");
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
      <Button title="Login" onPress={onLogin} />

      <TouchableOpacity
        style={{ marginTop: 30 }}
        onPress={() => navigate("SignUpScreen")}
      >
        <Text>SingUp</Text>
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

export default Login;
