import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from './Themed';

export const ColorCircle: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <MaterialCommunityIcons name="arrow-left" size={28} />
        <Text style={styles.title}>New Color</Text>
      </View>
      <View style={styles.rowContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 22,
    fontWeight: '500'
  }
});
