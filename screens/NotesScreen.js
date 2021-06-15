import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import { API, graphqlOperation } from 'aws-amplify'
import { listTodos } from '../src/graphql/queries'

export default function NotesScreen({ navigation, route }) {
  const [todos, setTodos] = useState([])

  // Responds to coming back from the add screen
  useEffect(() => {
    if (route.params?.todoText) {
      const newNote = {
        title: route.params.todoText,
        id: notes.length.toString(),
        done: false,
      };
      setNotes([...notes, newNote]);
      db.transaction(
        (tx) => {
          tx.executeSql('INSERT INTO notes (done, title) VALUES (0, ?)', [
            route.params.todoText,
          ]);
        },
        null,
        refreshNotes
      );
    }
  }, [route.params?.todoText]);
  
  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => {
          navigation.navigate('Add Screen');
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
  });

  useEffect(() => {
    fetchTodos()
  }, [])

  // Fetching the items from Todo Table's database
  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }


  // The function to render each row in our FlatList
  function renderItem({item}) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>{item.name}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
    flex: 1,
    backgroundColor: '#ffc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
