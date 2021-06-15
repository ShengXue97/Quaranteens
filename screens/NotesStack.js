import * as React from "react";
import { Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import AddScreen from "./AddScreen";
import NotesScreen from "./NotesScreen";

const InnerStack = createStackNavigator();
function NotesStack({ navigation }) {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Notes"
        component={NotesScreen}
      />
    </InnerStack.Navigator>
  );
}

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Notes Stack" component={NotesStack} />
      <Stack.Screen name="Add Screen" component={AddScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}


