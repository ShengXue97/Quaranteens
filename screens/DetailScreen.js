import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { updateForum } from "../src/graphql/mutations";

const getCurrentDate=()=>{

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
}

const currentDate = getCurrentDate();

export default function DetailsScreen({ route }) {
  const initialState = { ...route.params };
  const [formState, setFormState] = useState(initialState);
  const [texts, setTexts] = useState([]);
  const [text, setText] = useState('');
  const [voted, setVoted] = useState(false);

  // To update the formData for sending to database
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }


  async function updateComment() {
    try {
      const post = {
        ...formState,
        comment: [...formState.comments, 
        {
          userID,
          content: texts[-1],
        }]
      };
      await API.graphql(graphqlOperation(updateForum, { input: post }));

    } catch (err) {
      console.log("error creating post:", err);
    }
  }

  async function upvotePost() {
    try {
      setFormState({
        ...formState,
        votes: formState.votes + 1,
      });
      const post = [...formState]
      await API.graphql(graphqlOperation(updateForum, { input: post }));
      setInput("votes", formState.votes + 1);
    } catch (err) {
      console.log("error upvoting post:", err);
    }
  }

  function renderItem({ item }) {
    return (
      <View style={styles.flatList}>
        <Text style={styles.comments} numberOfLines={2}>
          {item}
        </Text>
        <Text style={styles.commentDate} numberOfLines={1}>
          {currentDate}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{formState.title}</Text>
      <Text style={styles.content}>{formState.content}</Text>
      <TouchableOpacity
        onPress={() => {
          if (!voted) {
            setVoted(true);
            upvotePost();
          } else {
            alert("You have voted.");
          }
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

      <Text>{formState.votes}</Text>

      <Text style={styles.comments}>Comments:</Text>

      <FlatList
        style={{ textAlign: "left", fontSize: 15 }}
        data={texts}
        renderItem={renderItem}
      />
      <Text style={{ textAlign: "left", margin: 10 }}>Comment below:</Text>

      <TextInput
        style={styles.textInput}
        onChangeText={(newtext) => {
          setText(newtext);
        }}
      />

      <TouchableOpacity
        onPress={() => {
          setTexts([...texts,text])
          updateComment();
        }}
      >
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
        <Text style={{ marginBottom: 10 }}>Submit Comment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 20,
    paddingBottom: 20,
    width: "90%",
  },
  content: {
    width: "90%",
    height: "30%",
    padding: 10,
    borderColor: "grey",
    borderRadius: 10,
    borderWidth: 2,
    fontFamily: 'Campuri Book',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
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
    marginBottom: 10,
    fontSize: 20,
  },
  flatList: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  commentDate: {
    fontSize: 10,
    color: "grey",
    paddingBottom: 10,
  },
});
