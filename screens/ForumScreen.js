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

import {Ionicons} from '@expo/vector-icons';

import {API, graphqlOperation} from 'aws-amplify'
import {listTodos} from '../src/graphql/queries'

import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "./DetailScreen";
import PostScreen from "./PostScreen";
import CommentScreen from "./CommentScreen";


const EXAMPLE_POST = [{
  user_id: 'Meee1',
  title: 'Random text',
  content: 'Hi thereeeeeeeeeee',
  comments: ['Great!','Helluuu'],
  votes: 3,
},{
  user_id: 'Meee2',
  title: 'Random text',
  content: 'Helloooo',
  comments: ['Great!','Helluuu'],
  votes: 3,
},{
  user_id: 'Meee3',
  title: 'Random text',
  content: 'Yessssshahahah',
  comments: ['Great!','Helluuu'],
  votes: 3,
  }]

function ForumScreen({ navigation , route}) {
  const [posts, setPosts] = useState(EXAMPLE_POST);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addPost}>
          <Ionicons
            name="add-circle-outline"
            size={30}
            color="black"
            style={{
              color: '#f55',
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Info", { ...item });
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
        style={{ width: "100%"}}
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
      <Stack.Screen name="Info" component={DetailScreen} />
      <Stack.Screen name="Posts" component={PostScreen} />
      <Stack.Screen name="Comment" component={CommentScreen} />
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