import * as React from "react";
import { Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import NotesStack from "./NotesStack";
import AddScreen from "./AddScreen";


function EventsScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
      }}
    >
      <Text>Feeling Board?</Text>
      <Button
        title="Keep a Diary Here!"
        onPress={() => navigation.navigate("Notes Stack")}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function EventsStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Personal Diary" component={EventsScreen} />
      <Stack.Screen name="Notes Stack" component={NotesStack} />
      <Stack.Screen name="Add Screen" component={AddScreen} />
    </Stack.Navigator>
  );
}


