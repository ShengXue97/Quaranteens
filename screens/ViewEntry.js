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
      <View style={styles.flatList}>
        <Text
          style={styles.diaryTitle}
          numberOfLines={1}
        >
          {item.name}
        </Text>
          <Text
            style={{fontFamily: 'Campuri Book'}}
            numberOfLines={20}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a8a9b0',
    padding: 10,
  },
  flatList: {
    padding: 20,
    height: '100%',
    backgroundColor: '#fff1eb',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  diaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  }
});
