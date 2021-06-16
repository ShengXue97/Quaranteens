import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Divider,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {API, graphqlOperation} from 'aws-amplify'
import {listTodos} from '../src/graphql/queries'
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
        <View style={{
          borderRadius: 10,
          marginTop: 10,
          padding: 10,
          backgroundColor: '#fff1eb',
        }}>
          <Text style={styles.diaryTitle}>{item.name}</Text>
          <Text style={styles.diaryDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          padding: 10,
        }}>
          <Text style={styles.diaryTitle}>Note down your feelings during quarantine</Text>
      </View>
    
      <FlatList
        data={todos}
        renderItem={renderItem}
        style={{padding: '5%'}}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a8a9b0',
  },
  diaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#585b7a',
    textAlign: 'center',
  },
  diaryDescription: {
    fontFamily: 'Campuri Book',
    paddingBottom: 10,
    color: '#585b7a',
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
