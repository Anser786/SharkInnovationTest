import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "../MyContext";
import Car from "./Car";

const Home = () => {
  const { logout, cars, storeCars, getCars } = useContext(Auth);
  const { navigate } = useNavigation();

  const onDelete = async (index) => {
    let newArr = cars;
    newArr.splice(index, 1);
    await storeCars(newArr);
    await getCars();
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigate("Car")}
          style={{
            height: 40,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={{ alignSelf: "flex-end", marginRight: 10 }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "red",
              fontWeight: "bold",
              paddingBottom: 5,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {cars.length > 0 ? (
        <ScrollView
          style={{ marginHorizontal: 10, marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {cars?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  height: 80,
                  borderRadius: 10,
                  backgroundColor: "grey",
                  marginTop: 10,
                  padding: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    elevation: 5,
                  }}
                >
                  <Text style={{ fontSize: 11 }}>Name: {item.name}</Text>
                  <Text style={{ fontSize: 11 }}>Color: {item.color}</Text>
                  <Text style={{ fontSize: 11 }}>Maker: {item.make}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    elevation: 5,
                    marginTop: 5,
                  }}
                >
                  <Text style={{ fontSize: 11 }}>Model: {item.model}</Text>
                  <Text style={{ fontSize: 11 }}>
                    Reg No.: {item.registrationNumber}
                  </Text>
                  <Text style={{ fontSize: 11 }}>
                    Category: {item.category}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigate("Car", { item, index })}
                  >
                    <Text
                      style={{
                        color: "blue",
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDelete(index)}>
                    <Text
                      style={{ color: "red", fontSize: 14, fontWeight: "bold" }}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 20 }}>
          No cars found!
        </Text>
      )}
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

export default Home;
