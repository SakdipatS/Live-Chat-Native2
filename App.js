import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "./components/Header";
import ChatStart from "./components/ChatStart";
import ChatBox from "./components/ChatBox";
import { Provider, useSelector } from "react-redux";
import store from "./store/Store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { SocketProvider } from "./components/SocketContext";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
    >
      <Provider store={store}>
        <SafeAreaView
          style={{
            flex: 0,
          }}
        />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#22282a",
          }}
        >
          <SocketProvider>
            <NavigationContainer>
              <Header />
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={ChatStart}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ChatBox"
                  component={ChatBox}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SocketProvider>
        </SafeAreaView>
      </Provider>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#171B1C",
  },
});

// https://reactnative.dev/docs/layout-props
