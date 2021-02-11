import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from './Themed';

export const Slider: React.FC = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="lightbulb-on" size={28} />
      <View style={styles.sliderContainer}>
        <View style={styles.slider} />
        <View style={styles.sliderHandle} />
      </View>
      <MaterialCommunityIcons name="lightbulb-on-outline" size={28} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    width: '60%',
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    height: 8,
    width: '90%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  sliderHandle: {
    position: 'absolute',
    height: 25,
    width: 25,
    borderRadius: 12.5,
    borderColor: 'black',
    borderWidth: 2
  },
  title: {
    fontSize: 22,
    fontWeight: '500'
  }
});
