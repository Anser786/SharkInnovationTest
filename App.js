import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import RootNavigator from "./src/navigators/AppNavigation";
import { Auth } from "./src/MyContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getUser();
    getUsers();
    getCars();
  }, []);

  const getUser = async () => {
    const userData = await SecureStore.getItemAsync("user");
    if (userData) {
      let pasreData = JSON.parse(userData);
      setUser(pasreData);
    } else setUser("");
  };

  const storeUser = async (data) => {
    try {
      await SecureStore.setItemAsync("user", JSON.stringify(data));
      setUser(data);
    } catch (error) {}
  };

  const storeUsers = async (data) => {
    try {
      await SecureStore.setItemAsync("users", JSON.stringify(data));
    } catch (error) {}
  };

  const getUsers = async () => {
    const userData = await SecureStore.getItemAsync("users");
    if (userData) {
      let pasreData = JSON.parse(userData);
      setUsers(pasreData);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.setItemAsync("user", "");
      setUser(false);
    } catch (error) {
      //console.log(error);
    }
  };

  //cars
  const getCars = async () => {
    const userData = await SecureStore.getItemAsync("cars");
    if (userData) {
      let pasreData = JSON.parse(userData);
      setCars(pasreData);
    }
  };

  const storeCars = async (data) => {
    try {
      await SecureStore.setItemAsync("cars", JSON.stringify(data));
    } catch (error) {}
  };

  return (
    <Auth.Provider
      value={{
        user,
        users,
        storeUser,
        logout,
        storeUsers,
        getUsers,
        cars,
        storeCars,
        getCars,
      }}
    >
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Auth.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
