import * as React from 'react';
import { Dimensions, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// @ts-ignore
import { Surface } from "gl-react-expo";
// @ts-ignore
import { GLSL, Node, Shaders } from "gl-react";
import Animated, { Extrapolate, interpolate, cond, eq, divide, modulo, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useValue, withSpring, useCode, set, pow, sqrt } from 'react-native-reanimated';

import { View } from './Themed';
import { Picker } from './Picker';
import { PanGestureHandler } from 'react-native-gesture-handler';
import HSVtoRGB from '../util/hsv_to_rgb';

const shaders = Shaders.create({
  hue: {
    frag: GLSL`
#define PI  3.141592653589793
#define TAU 6.283185307179586
precision highp float;
varying vec2 uv;
uniform float size;
// https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl
vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
// All components are in the range [0…1], including hue.
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float quadraticIn(float t) {
  return t * t;
}
void main() {
  float mag = distance(uv, vec2(0.5));
  vec2 pos = vec2(0.5) - uv;
  float a = atan(pos.y, pos.x);
  float progress = a * 0.5 / PI + 0.5;
  gl_FragColor = mag < 0.5 ? vec4(hsv2rgb(vec3(progress, quadraticIn(mag * 2.5), 1.0)), 1.0) : vec4(0.0, 0.0, 0.0, 1.0);
}
`,
  },
});

type Props = {
  h: Animated.SharedValue<number>,
  s: Animated.SharedValue<number>,
  v: Animated.SharedValue<number>
}

const { width } = Dimensions.get("window")
export const DIAMETER = width * .8;
export const RADIUS = DIAMETER / 2;

export const ColorPicker: React.FC<Props> = ({h, s, v}) => {
  // picker animated values
  const translation = {
    x: useSharedValue(0),
    y: useSharedValue(0)
  }

  const theta = useSharedValue(0)

  // converted hsv color
  const color = 'rgba(255,255,255,1)'
  const rgb = {r: 255, g: 255, b: 255}


  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translation.x.value;
      ctx.startY = translation.y.value;
    },
    onActive: (event, ctx) => {      
      const vecX = ctx.startX + event.translationX;
      const vecY = ctx.startY + event.translationY;

      const distance = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2))
      const theta = Math.atan2(vecY, vecX);
  
      // use coeffecient to limit x,y within circle
      if (distance > RADIUS) {
        const k = RADIUS / distance;

        h.value = (theta % 2 * Math.PI) / (2 * Math.PI)
        s.value = distance / RADIUS;

        translation.x.value = vecX * k
        translation.y.value = vecY  * k
      } else {
        h.value = (theta % 2 * Math.PI) / (2 * Math.PI)
        s.value = distance / RADIUS;

        translation.x.value = vecX
        translation.y.value = vecY 
      }
    },
  });
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translation.x.value
        }, 
        {
          translateY: translation.y.value
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Node shader={shaders.hue} />
      </Surface>
      <PanGestureHandler onGestureEvent={gestureHandler} hitSlop={{left: 60, right: 60, top: 60, bottom: 60}} >
        <Animated.View style={[styles.pickerContainer, animatedStyle]}>
          <Picker {...{h, s,v}} />
        </Animated.View>
      </PanGestureHandler>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    position: 'absolute'
  },
  surface: {
    backgroundColor: 'white',
    width: DIAMETER, 
    height: DIAMETER, 
    borderRadius: RADIUS
  },
});
