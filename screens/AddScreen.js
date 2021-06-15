import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button
} from "react-native";

// AWS imports 
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from '../src/graphql/mutations'
import { listTodos } from '../src/graphql/queries'

const initialState = { name: '', description: '' }

export default function AddScreen({ navigation }) {
  const [text, setText] = useState("");

  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  // To update the formData for sending to database
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  // Create an entry in the ToDo table
  async function addTodo() {
    try {
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
      navigation.goBack()
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <Text style={{ fontSize: 24 }}>Title of Diary Entry</Text>
      <TextInput
        onChangeText={val => setInput('name', val)}
        style={styles.textInput}
        value={formState.name}
      />
      <Text style={{ fontSize: 24 }}>Description</Text>
      <TextInput
        onChangeText={val => setInput('description', val)}
        style={styles.textInput}
        multiline={true}
        numberOfLines={4}
        placeholder="Share about your day!"
        value={formState.description}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={addTodo}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={navigation.goBack}
        >
          <Text style={styles.buttonText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  buttonText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
