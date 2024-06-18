import React from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
export const Switch = ({
  value,
  disabled = false,
  circleSize = 40,
  trackHeight = 45,
  trackWidth = 95,
  activeText,
  inactiveText,
  trackActiveColor = '#3dcc63',
  trackInactiveColor = '#bdbdbd',
  circleActiveColor = 'white',
  circleInactiveColor = 'white',
  circleOffset = 0,
  animationDuration = 600,
  textStyle,
  trackStyle,
  enableDrag = false,
  circleSlide = false,
  circleStyle,
  onValueChange = () => {},
  renderCircleChild,
}) => {
  const translateOffset = trackWidth - circleSize + circleOffset;
  const translateX = useSharedValue(value ? translateOffset : -circleOffset);
  const animatedCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [-circleOffset, translateOffset],
      [circleInactiveColor, circleActiveColor]
    );
    const width = interpolate(
      translateX.value,
      [-circleOffset, translateOffset / 4, translateOffset],
      [circleSize, trackWidth / 1.5, circleSize],
      'clamp'
    );
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
      ...(circleSlide ? { width } : {}),
      backgroundColor,
    };
  });
  const animatedTrackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [-circleOffset, translateOffset],
      [trackInactiveColor, trackActiveColor]
    );
    return {
      backgroundColor,
    };
  });
  const animatedActiveText = useAnimatedStyle(() => {
    if (!activeText) return {};
    const left = interpolate(
      translateX.value,
      [-circleOffset, translateOffset],
      [0, 10],
      'clamp'
    );
    const _opacity = interpolate(
      translateX.value,
      [-circleOffset, translateOffset],
      [0, 1],
      'clamp'
    );
    return {
      opacity: _opacity,
      left,
    };
  });
  const animatedInactiveText = useAnimatedStyle(() => {
    if (!inactiveText) return {};
    const right = interpolate(
      translateX.value,
      [-circleOffset, trackWidth],
      [10, 0],
      'clamp'
    );
    const _opacity = interpolate(
      translateX.value,
      [-circleOffset, circleSlide ? translateOffset / 2 : translateOffset],
      [1, 0],
      'clamp'
    );
    return {
      opacity: _opacity,
      right,
    };
  });
  const tap = Gesture.Tap()
    .onStart(() => {
      const animateToValue = value ? -circleOffset : translateOffset;
      translateX.value =
        animationDuration > 0
          ? withTiming(animateToValue, {
              duration: animationDuration,
            })
          : animateToValue;
      runOnJS(onValueChange)(!value);
    })
    .enabled(!disabled);
  const pan = Gesture.Pan()
    .minDistance(0)
    .onUpdate((event) => {
      translateX.value = Math.min(
        Math.max(
          event.translationX + (value ? translateOffset : -circleOffset),
          -circleOffset
        ),
        translateOffset
      );
    })
    .onEnd(() => {
      if (translateX.value > translateOffset / 2) {
        translateX.value = withTiming(translateOffset, {
          duration: animationDuration,
        });
        runOnJS(onValueChange)(true);
      } else {
        translateX.value = withTiming(-circleOffset, {
          duration: animationDuration,
        });
        runOnJS(onValueChange)(false);
      }
    })
    .enabled(enableDrag);
  const composedGestures = Gesture.Race(tap, pan);
  return React.createElement(
    GestureDetector,
    { gesture: composedGestures },
    React.createElement(
      Animated.View,
      {
        style: [
          styles.track,
          {
            backgroundColor: value ? trackActiveColor : trackInactiveColor,
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight,
          },
          trackStyle,
          animatedTrackStyle,
        ],
      },
      activeText &&
        React.createElement(
          Animated.Text,
          { style: [styles.positionAbsolute, animatedActiveText, textStyle] },
          activeText
        ),
      inactiveText &&
        React.createElement(
          Animated.Text,
          { style: [styles.positionAbsolute, animatedInactiveText, textStyle] },
          inactiveText
        ),
      React.createElement(
        Animated.View,
        {
          style: [
            styles.circle,
            {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize,
            },
            circleStyle,
            animatedCircleStyle,
          ],
        },
        renderCircleChild && renderCircleChild
      )
    )
  );
};
const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
  },
  circle: {
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    borderRadius: 25,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionAbsolute: {
    position: 'absolute',
  },
});
