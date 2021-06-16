import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import AddScreen from "./AddScreen";
import NotesScreen from "./NotesScreen";
import ViewEntry from "./ViewEntry";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="My Diaries" component={NotesScreen} />
      <Stack.Screen name="Add Diary Entry" component={AddScreen} />
      <Stack.Screen name="View Diary Entry" component={ViewEntry} />
    </Stack.Navigator>
  );
}


