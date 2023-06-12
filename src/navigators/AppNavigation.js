import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../src/screens/Login";
import SignUp from "../screens/SignUp";
import { Auth } from "../MyContext";
import Home from "../screens/Home";
import Car from "../screens/Car";

const RootNavigator = () => {
  const RootStack = createNativeStackNavigator();
  const AuthStack = createNativeStackNavigator();
  const { user } = useContext(Auth);

  const AuthNavigator = () => {
    return (
      <AuthStack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}
        headerMode="none"
      >
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={Login}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="SignUpScreen"
          component={SignUp}
        />
      </AuthStack.Navigator>
    );
  };

  const HomeStack = () => {
    return (
      <AuthStack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}
        headerMode="none"
      >
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={Home}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Car"
          component={Car}
        />
      </AuthStack.Navigator>
    );
  };

  if (user == null) return null;

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
      headerMode="none"
    >
      {user ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeStack}
        />
      ) : (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="AuthNavigator"
          component={AuthNavigator}
        />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
