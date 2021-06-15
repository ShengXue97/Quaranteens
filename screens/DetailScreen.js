import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function DetailsScreen({ item }) {
    const content = item.content
    return (
        <View>
        <Text >{content}</Text>
        </View>
    );
}
