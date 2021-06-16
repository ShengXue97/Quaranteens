import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { API, graphqlOperation } from "aws-amplify";
import { updateForum } from "../src/graphql/mutations";

export default function DetailsScreen({ route }) {
  const initialState = { ...route.params };
  const [formState, setFormState] = useState(initialState);

  // To update the formData for sending to database
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function updatePost() {
    try {
      const post = { ...formState };
      setFormState(initialState);
      await API.graphql(graphqlOperation(updateForum, { input: post }));
      //navigation.navigate("Forums", { post });
    } catch (err) {
      console.log("error creating post:", err);
    }
  }

  
  function renderItem({ item }) {
    return (
      <TouchableOpacity>
        <View
          style={styles.flatList}>
          <Text
            style={styles.comments}
            numberOfLines={2}
          >
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  

  let val = '';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{initialState.title}</Text>
      <Text style={styles.content}>{initialState.content}</Text>

      {/* <Text>{comments}</Text> */}

      <TouchableOpacity
        onPress={() => {
          setInput("votes", formState.votes + 1);
          updatePost(); 
        }}
      >
        <MaterialIcons
          name="where-to-vote"
          size={30}
          color="black"
          style={{
            color: "#f55",
            textAlign: "center",
          }}
        />
        <Text>Upvote</Text>
      </TouchableOpacity>
      
      
      <Text>{formState.votes != 0 ? formState.votes : null}</Text>


      <Text style={styles.comments}>Past comments:</Text>

      <FlatList
        style={{ width: "30%", textAlign: 'left', fontSize: 15}}
        data={formState.comments ? formState.comments : ["No comments"]}
        renderItem={renderItem}
      />
      <Text style={{ textAlign: "left", margin: 20 }}>Comment below:</Text>

      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          val = text;
        }}
      />

      <TouchableOpacity onPress={() => {
        setInput("comments", formState.comments.concat([val]));
        updatePost();}}>
        <EvilIcons
          name="comment"
          size={30}
          color="black"
          style={{
            color: "#f55",
            marginTop: 10,
            textAlign: "center",
          }}
        />
        <Text style={{marginBottom:10}}>Submit Comments</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 20,
    paddingBottom: 20,
  },
  content: {
    width: "60%",
    height: "30%",
    borderColor: "grey",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "40%",
    padding: 10,
    marginTop: 20,
    height: 50,
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
  comments: {
    margin: 20,
    marginBottom: 20,
    fontSize: 20,
  },
  flatList: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
});
