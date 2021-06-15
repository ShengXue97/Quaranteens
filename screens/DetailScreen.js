import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function DetailsScreen({ route }) {
  const { id, content } = route.params;
  function upvote() {
    route.params.upvote += 1;
  }

  function downvote() {
    route.params.downvote += 1;
  }

  function submitcomment(text) {
    route.params.comments = [...route.params.comments, text];
  }

  return (
    <View style={styles.container}>
      <Text>{id}</Text>
      <Text>{content}</Text>
      {/* <Text >{comments}</Text>
        <Text >{upvotes}</Text>
        <Text >{downvotes}</Text> */}

      <TouchableOpacity onPress={() => upvote}>
        <Text>Upvote</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => downvote}>
        <Text>Downvote</Text>
      </TouchableOpacity>

      <TextInput style={styles.textInput} />
      <TouchableOpacity onPress={() => submitcomment}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
});
