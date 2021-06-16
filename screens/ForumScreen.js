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
import {listForums} from '../src/graphql/queries'

import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "./DetailScreen";
import PostScreen from "./PostScreen";
import CommentScreen from "./CommentScreen";



function ForumScreen({ navigation , route}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => {
          navigation.navigate('Create New Post');
        }}>
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

  useEffect(() => {
    fetchPosts()
  })

  // Fetching the items from Todo Table's database
  async function fetchPosts() {
    try {
      const forumData = await API.graphql(graphqlOperation(listForums))
      const posts = forumData.data.listForums.items
      setPosts(posts)
    } catch (err) {console.log('error fetching todos')}
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("View Forum Post", { ...item });
        }}
      >
        <View
          style={styles.flatList}>
          <Text
            style={styles.diaryTitle}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text numberOfLines={2}>
            {item.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }



  return (
    <View style={styles.container}>
      {/* <Button onPress={addColor} title="Add Color" /> */}
      <FlatList
        style={{ width: "90%"}}
        data={posts}
        renderItem={renderItem}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function ForumStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Forums" component={ForumScreen} />
      <Stack.Screen name="View Forum Post" component={DetailScreen} />
      <Stack.Screen name="Create New Post" component={PostScreen} />
      <Stack.Screen name="Comment" component={CommentScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  diaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  }
});
