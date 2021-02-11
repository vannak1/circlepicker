import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { ColorPicker } from '../components/ColorPicker';
import { Header } from '../components/Header';
import { View } from '../components/Themed';
import { Palette } from '../components/Palette';
import { Slider } from '../components/Slider';


export const ColorPickerScreen: React.FC = () => {
  const {top, bottom} = useSafeAreaInsets();  
  // hsv animated values
  const h = useSharedValue(0);
  const s = useSharedValue(0);
  const v = useSharedValue(1);

  //convert hsv to hsl for reanimated 2
  // const hL = useDerivedValue(() => h);
  // const l = useDerivedValue(() => v.value * (1 - (s.value / 2)));
  // const sL = useDerivedValue(() => {
  //     return l.value === 0 || l.value === 1 ? 0 : v.value - l.value / Math.min(l.value, 1-l.value)
  // });

  // converted hsv color
  // const backgroundColor = `hsl(${h},${s}%,${v}%)`;

  return (
    <View style={[styles.container, {paddingTop: top, paddingBottom: bottom}]}>
      <Header />
      <View style={styles.bodyContainer}>
        <ColorPicker {...{h, s, v}}/>
      </View>
      <Slider />
      <Palette />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  surface: {
    backgroundColor: 'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
