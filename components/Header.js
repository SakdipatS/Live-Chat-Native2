import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import logo from "../assets/livechat.png";
import arrowDown from "../assets/arrow-down.png"

export default function Header() {
  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={["#FFC700", "#FF691F"]}
      style={styles.header}
    >
      <View style={styles.nav}>
        <Image source={logo} style={styles.img} />
        <View style={styles.head}>
          <Text style={styles.headtext}>LiveChat</Text>
          <Text style={styles.text}>You are chatting with CS862</Text>
        </View>
      </View>
      <Image source={arrowDown} style={styles.down} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingLeft:5,
    height: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  headtext: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 600,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: 400,
  },
  img: {
    width: 41,
    height: 45,
    marginTop: 9,
    marginLeft: 15,
  },
  nav: {
    flexDirection: "row",
  },
  head: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  down: {
    width: 24,
    height: 24,
    marginRight: 15
  }
});
