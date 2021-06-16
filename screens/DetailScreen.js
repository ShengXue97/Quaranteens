import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";


export default function DetailsScreen({ route }) {
  const { id, title, content } = route.params;
  function upvote() {
    route.params.upvote += 1;
  }

  function comment(text) {
    route.params.comments = [...route.params.comments, text];
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>

      {/* <Text>{comments}</Text> */}

      <TouchableOpacity onPress={() => upvote}>
        <MaterialIcons
          name="where-to-vote"
          size={30}
          color="black"
          style={{
            color: "#f55",
            textAlign: 'center'
          }}
        />
        <Text>Upvotes</Text>
      </TouchableOpacity>

      <Text style={styles.comment}>Comment below:</Text>

      <TextInput style={styles.textInput} />

  
      <TouchableOpacity  onPress={() => comment}>
        <EvilIcons
          name="comment"
          size={30}
          color="black"
          style={{
            color: "#f55",
            marginTop: 10,
            textAlign: 'center'
          }}
        />
        <Text>Submit Comments</Text>
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
  comment: {
    justifyContent: "left",
    margin: 20,
  },
});
