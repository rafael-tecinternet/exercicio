import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, StatusBar } from "react-native";
import Fotos from "./screen/Fotos";
import Home from "./screen/Home";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#5451a6",
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            component={Home}
            name="Home"
            options={{ headerShown: false }}
          />
          <Stack.Screen component={Fotos} name="Fotos" />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

const estilos = StyleSheet.create({});
