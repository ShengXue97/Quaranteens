import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotesStack from "./screens/NotesStack";
import ContactsScreen from "./screens/ContactsScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { withAuthenticator } from 'aws-amplify-react-native'

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            //Set the icon based on which route it is (name of the tab)
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "My Diaries") {
              iconName = "book";
            } else if (route.name === "Forum") {
              return <MaterialCommunityIcons name={"forum"} size={size} color={color} />
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >

        <Tab.Screen name="My Diaries" component={NotesStack} />
        <Tab.Screen name="Forum" component={ContactsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default withAuthenticator(App)