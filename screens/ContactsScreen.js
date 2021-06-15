import * as React from "react";
import { Text, View } from "react-native";

export default function ContactsScreen() {
  return ( // Flat-list may help
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightpink",
      }}
    >
      <Text>Contacts!</Text>
    </View>
  );
}
