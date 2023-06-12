import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "../MyContext";
const Car = ({ route }) => {
  const { item, index } = route.params || {};
  const { goBack } = useNavigation();
  const [name, setName] = useState(item ? item?.name : "");
  const [color, setColor] = useState(item ? item?.color : "");
  const [model, setModel] = useState(item ? item?.model : "");
  const [make, setMaker] = useState(item ? item?.make : "");
  const [registrationNumber, setRegistrationNumber] = useState(
    item ? item?.registrationNumber : ""
  );
  const { cars, storeCars, getCars } = useContext(Auth);
  //drowdown states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item ? item?.category : "");
  const [items, setItems] = useState([
    { label: "SUV", value: "SUV" },
    { label: "Sedan", value: "Sedan" },
    { label: "Crossover", value: "Crossover" },
    { label: "Coupe", value: "Coupe" },
  ]);

  const onCreateCar = async () => {
    if (name && color && model && make && registrationNumber && value) {
      if (item) {
        let temArr = cars;
        temArr[index] = {
          name,
          color,
          model,
          make,
          registrationNumber,
          category: value,
        };
        await storeCars(temArr);
        await getCars();
      } else
        await storeCars([
          ...cars,
          {
            name,
            color,
            model,
            make,
            registrationNumber,
            category: value,
          },
        ]);
      await getCars();
      goBack();
    } else {
      Alert.alert("Please fill all fields!");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <Text style={{ alignSelf: "center", marginTop: 50, fontSize: 20 }}>
          Create Car
        </Text>

        <View style={{ marginLeft: 20, marginTop: 30 }}>
          <Text>Name</Text>
          <TextInput style={styles.input} onChangeText={setName} value={name} />
        </View>
        <View style={{ marginTop: 10, marginHorizontal: 13 }}>
          <Text style={{ marginBottom: 5 }}>Select bike </Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
          <Text>Color</Text>
          <TextInput
            style={styles.input}
            onChangeText={setColor}
            value={color}
          />
        </View>

        <View style={{ marginLeft: 20, marginTop: 10 }}>
          <Text>Model</Text>
          <TextInput
            style={styles.input}
            onChangeText={setModel}
            value={model}
          />
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
          <Text>Maker</Text>
          <TextInput
            style={styles.input}
            onChangeText={setMaker}
            value={make}
          />
        </View>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
          <Text>Registeration Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={setRegistrationNumber}
            value={registrationNumber}
          />
        </View>
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
          <DropDownPicker
            containerProps={{
              height: open === true ? 220 : null,
              backgroundColor: "#fff",
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            listMode="SCROLLVIEW"
          />
        </View>

        <View style={{ marginHorizontal: 13, marginTop: 15, marginBottom: 20 }}>
          <Button title="Save" onPress={onCreateCar} zIn />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: "95%",
    marginTop: 10,
  },
});

export default Car;
