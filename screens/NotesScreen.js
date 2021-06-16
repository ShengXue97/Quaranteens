import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {API, graphqlOperation} from 'aws-amplify'
import {listTodos} from '../src/graphql/queries'
import { ListItem, Avatar } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';

export default function NotesScreen({navigation, route}) {
  const [todos, setTodos] = useState([])

  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => {
          navigation.navigate('Add Diary Entry');
        }}>
          <Ionicons
            name="ios-create-outline"
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
    fetchTodos()
  })

  // Fetching the items from Todo Table's database
  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) {console.log('error fetching todos')}
  }


  // The function to render each row in our FlatList
  function renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("View Diary Entry", {item})}
      >
        <LinearGradient
          // Button Linear Gradient
          colors={['#91f016', '#85cf25', '#73ad26']}
          style={styles.button}>
          <Image
            style= {{width: 30, height: 30,}}
            source={require('../assets/to-do-list.png')}
          />
          <View>
            <Text styles = {styles.diaryTitle}>{item.name}</Text>
            <Text styles = {styles.diaryDescription}>{item.description}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.background}
      />
      
      <FlatList
        data={todos}
        renderItem={renderItem}
        style={{width: '100%'}}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  diaryTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  diaryDescription: {
    fontSize: 15,
    color: 'white',
    paddingBottom: 10,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  button: {
    margin: 15,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
});
