import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import arrowDown from "../assets/arrow-down.png";
import { useDispatch } from "react-redux";
import { addRegister } from "../store/Reducer";
import { useSocket } from "./SocketContext";

export default function ChatStart({ navigation }) {
  
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    subject: "",
  });
  
  const dispatch = useDispatch();
  const socket = useSocket();

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (name, value) => {
    if (
      name === "phoneNumber" &&
      9 <= value.length <= 10 &&
      !/^[0-9]{0,10}$/.test(value)
    ) {
      // Do not update the state if the phone number length is not valid
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.phoneNumber || !formData.subject) {
      // setErrorMessage("Please fill in all required fields.");
      return;
    }
    if (
      !(formData.phoneNumber.length >= 9 && formData.phoneNumber.length <= 10)
    ) {
      // Display an error message or handle the case where the phone number length is not valid
      return;
    }
    console.log("Form Submitted:", formData);
    dispatch(addRegister(formData));

    // try {
    //   const newUser = await addUser(formData);
    //   console.log('User added successfully:', newUser);
    // } catch (error) {
    //   console.log("Error adding user", error)
    // }

    const socketData = {
        id: socket.id,
      };
    navigation.navigate("ChatBox", {socketData});
  };

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Topup or Deposit");
  const data = ["Topup", "Deposit"];
  
  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    toggleSelect();
    handleChange("subject", item);
  };

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  return (
    // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height' } style={styles.box}>
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <View style={styles.box}>
        <View style={styles.inner}>
          <Text style={styles.text}>
            Please enter your name and telephone number.
            {"\n"}
            For your convenience and speed with our service
          </Text>
          <View style={styles.innerForm}>
            <View style={styles.form}>
              <Text style={styles.formText}>Name *</Text>
              <TextInput
                name="username"
                required={true}
                value={formData.username}
                onChangeText={(text) => handleChange("username", text)}
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.formText}>Phone Number *</Text>
              <TextInput
                name="phoneNumber"
                value={formData.phoneNumber}
                required={true}
                onChangeText={(text) => handleChange("phoneNumber", text)}
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="numeric"
                maxLength={10}
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.formText}>Subject *</Text>
              <View
                style={{
                  position: "relative",
                }}
              >
                <TouchableOpacity
                  onPress={toggleSelect}
                  style={styles.dropdown}
                >
                  <Text style={styles.dropdownInput}>{selectedItem}</Text>
                  <Image source={arrowDown} style={styles.down} />
                </TouchableOpacity>

                {isOpen && (
                  <View style={styles.dropdownItem}>
                    {data.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleItemPress(item)}
                        style={styles.dropdownList}
                      >
                        <Text style={styles.dropdownInput}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.submit}>
          <TouchableOpacity onPress={handleSubmit}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={["#FFC700", "#FF691F"]}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                alignItems: "center",
                borderRadius: 60,
              }}
            >
              <Text style={{ color: "#ffffff" }}>START CHAT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 40,
    backgroundColor: "#22282a",
  },
  inner: {
    justifyContent: "center",
    width: "100%",
  },
  text: {
    fontSize: 12,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: 500,
    marginBottom: 20,
  },
  form: {
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    marginVertical: 10,
  },
  formText: {
    fontSize: 14,
    color: "#ffffff",
    marginTop: 15,
    marginBottom: 5,
    textAlign: "left",
  },
  innerForm: {
    backgroundColor: "transparent",
  },
  input: {
    backgroundColor: "#293032",
    borderRadius: 8,
    borderWidth: 1,
    height: 42,
    width: "100%",
    borderColor: "#32393c",
    color: "#ffffff",
    fontSize: 16,
    paddingLeft: 10,
  },
  submit: {
    marginVertical: 50,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#293032",
    borderColor: "#32393C",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    height: 42,
  },
  dropdownList: {
    color: "#ffffff",
    padding: 8,
    borderWidth: 1,
    borderColor: "#32393C",
    height: 42,
  },
  dropdownItem: {
    backgroundColor: "#293032",
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 99,
  },
  dropdownInput: {
    color: "white",
    fontSize: 16,
  },
  down: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
    backgroundColor: "#293032", // Change text color to white
  },
  label: {
    position: "absolute", // Change background color to #293032
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: "white",
    backgroundColor: "#293032", // Change text color to white
  },
});
