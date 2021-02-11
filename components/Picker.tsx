import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { diameter } from './ColorPicker';

import { View } from './Themed';

export const Picker: React.FC = ({ h, s, v }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = `hsl(${h.value * diameter / 2},${s.value * diameter / 2}%,${v.value * 100}%)`;
    return {
      backgroundColor
    };
  });

  

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.picker} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1.2,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 4},
    shadowOpacity: .2,
  },
  picker: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'transparent'
  },
});
