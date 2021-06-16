import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ViewEntry({route}) {
  const {item} = route.params;
  return (
    <View style={styles.container}>
      <View styles={styles.flatList}>
      <Text
        style={styles.diaryTitle}
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text numberOfLines={20}>
        {item.description}
      </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc',
    padding: 10,
  },
  flatList: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  diaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  }
});
