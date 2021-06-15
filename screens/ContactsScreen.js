import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DetailScreen from "./DetailScreen";
import PostScreen from "./PostScreen";

const EXAMPLE_POST = [{
  id: 'Meee1',
  //'date': '2021.6.15',
  content: 'Hi there',
  comments: ['Great!','Hello'],
  upvote: 3,
  downvote: 0,
},{
  id: 'Meee2',
  //'date': '2021.6.15',
  content: 'Hi there',
  comments: ['Great!','Hello'],
  upvote: 3,
  downvote: 0,
},{
  id: 'Meee3',
  //'date': '2021.6.15',
  content: 'Hi there',
  comments: ['Great!','Hello'],
  upvote: 3,
  downvote: 0,
  } ]

function ForumScreen({ navigation , route}) {
  const [posts, setPosts] = useState(EXAMPLE_POST);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addPost} title="New" />,
    });
  });


  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Details", { ...item });
        }}
      >
        <Text> {item.content}</Text>
      </TouchableOpacity>
    );
  }


  function addPost() {
    navigation.navigate("Posts", {route});
  }

 // Responds to coming back from the add screen
 useEffect(() => {
  if (route.params?.text) {
    const newPost = {
      title: route.params.text,
      id: Math.floor(Math.random() * 256),
      comment:[],
      upvote: 0,
      downvote: 0,
    };
    setPosts([...posts, newPost]);
  }
}, [route.params?.text]);

  return (
    <View style={styles.container}>
      {/* <Button onPress={addColor} title="Add Color" /> */}
      <FlatList
        style={{ width: "100%" }}
        data={posts}
        renderItem={renderItem}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function ContactsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Forums" component={ForumScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="Posts" component={PostScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
  },
});