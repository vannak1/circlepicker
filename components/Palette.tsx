import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import Layout from '../constants/Layout';

import { View } from './Themed';

export const Palette: React.FC = () => {
  const colors = [`rgb(255, 0, 0)`, `rgb(255,255,0)`, `rgb(255,127,80)`, 	`rgb(0,191,255)`, `rgb(123,104,238)`]

  return (
    <View style={styles.container}>

      <View style={styles.colorsContainer}>
        <View style={[styles.circle, {backgroundColor: colors[0]}]} />
        <View style={[styles.circle, {backgroundColor: colors[1]}]} />
        <View style={[styles.circle, {backgroundColor: colors[2]}]} />
        <View style={[styles.circle, {backgroundColor: colors[3]}]} />
        <View style={[styles.circle, {backgroundColor: colors[4]}]} />
      </View>

      <View style={[styles.background, {backgroundColor: colors[0], opacity: .2}]} />
    </View>
  );
}

const backgroundDiameter = Layout.window.width * 3;
const diameter = Layout.window.width * .12;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 16,
    height: diameter * 3
  },
  colorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 10,
    height: backgroundDiameter,
    width: backgroundDiameter,
    borderRadius: backgroundDiameter / 2
  },
  circle: {
    height: diameter,
    width: diameter,
    borderRadius: diameter / 2
  }
});
