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

const SAMPLE_NOTES = [
  { title: 'Walk the cat', id: '0', done: false },
  { title: 'Water the cat', id: '1', done: false },
  { title: 'Buy the milk', id: '2', done: false },
  { title: 'Water the milk', id: '3', done: false },
];

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState(SAMPLE_NOTES);

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
