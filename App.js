import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { useColorScheme } from "react-native-appearance";

import { Root, Home } from "./screens";

export default function App() {
  let colorScheme = useColorScheme();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="root"
            component={Root}
            options={{ headerTransparent: "true", title: "", headerLeft: null }}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              headerTransparent: "true",
              title: "",
              headerLeft: null,
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
    </>
  );
}
