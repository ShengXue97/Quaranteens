import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('notes.db');
const SAMPLE_NOTES = [
  { title: 'Walk the cat', id: '0', done: false },
  { title: 'Water the cat', id: '1', done: false },
  { title: 'Buy the milk', id: '2', done: false },
  { title: 'Water the milk', id: '3', done: false },
];

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);

  function refreshNotes() {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM notes',
        null,
        (txObj, { rows: { _array } }) => setNotes(_array),
        (txObj, error) => console.log('Error ', error)
      );
    });
  }

  // Create the DB on first run
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS notes
        (id INTEGER PRIMARY KEY,
          title TEXT,
          done INT);
      `);
      },
      null,
      refreshNotes
    );
  }, []);

  // Adds the + button in the top right
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
          <Entypo
            style={{ marginRight: 10 }}
            name="new-message"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  });

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
        <TouchableOpacity onPress={addNote}>
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
      headerLeft: () => (
        <Button
          onPress={() => {
            navigation.navigate('Login');
          }}
          title="Login"
        />
      ),
    });
  });

  function addNote() {
    navigation.navigate('Add Screen');
  }

  // This deletes an individual note
  function deleteNote(id) {
    console.log('Deleting ' + id);
    // To delete that item, we filter out the item we don't want
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
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
        <Text>{item.title}</Text>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        style={{ width: '100%' }}
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
