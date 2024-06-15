import React, { type Dispatch, type SetStateAction } from 'react';
import {
  StyleSheet,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  value: boolean;
  disabled?: boolean;
  trackWidth?: number;
  trackHeight?: number;
  thumbSize?: number;
  activeText?: string;
  inactiveText?: string;
  animationDuration?: number;
  trackActiveColor?: string;
  trackInactiveColor?: string;
  circleActiveColor?: string;
  circleInactiveColor?: string;
  circleOffset?: number;
  textStyle?: StyleProp<TextStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  enableDrag?: boolean;
  onValueChange: (value: boolean) => void | Dispatch<SetStateAction<boolean>>;
  renderCircleChild?: React.JSX.Element | React.ReactNode;
};

export const Switch = ({
  value,
  disabled = false,
  thumbSize = 40,
  trackHeight = 45,
  trackWidth = 95,
  activeText,
  inactiveText,
  trackActiveColor = '#3dcc63',
  trackInactiveColor = '#bdbdbd',
  circleActiveColor = 'white',
  circleInactiveColor = 'white',
  circleOffset = -2,
  animationDuration = 700,
  textStyle,
  trackStyle,
  enableDrag = false,
  onValueChange = () => {},
  renderCircleChild,
}: Props) => {
  const translateOffset = trackWidth - thumbSize + circleOffset;
  const translateX = useSharedValue(value ? translateOffset : -circleOffset);

  const animatedThumbStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [-circleOffset, translateOffset],
      [circleInactiveColor, circleActiveColor]
    );

    const width = interpolate(
      translateX.value,
      [-circleOffset, translateOffset / 4, translateOffset],
      [thumbSize, trackWidth / 1.5, thumbSize],
      'clamp'
    );

    const scaleY = interpolate(
      translateX.value,
      [-circleOffset, translateOffset / 4, translateOffset],
      [1, 0.9, 1],
      'clamp'
    );

    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
      width,
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
    const _translateX = interpolate(
      translateX.value,
      [-circleOffset, translateOffset],
      [0, trackWidth / 2 - circleOffset - thumbSize / 2],
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
      transform: [
        {
          translateX: _translateX,
        },
      ],
    };
  });

  const animatedInactiveText = useAnimatedStyle(() => {
    if (!inactiveText) return {};
    const _translateX = interpolate(
      translateX.value,
      [-circleOffset, translateOffset],
      [trackWidth / 2 - circleOffset, translateOffset],
      'clamp'
    );

    const _opacity = interpolate(
      translateX.value,
      [-circleOffset, translateOffset],
      [1, 0],
      'clamp'
    );

    return {
      opacity: _opacity,
      transform: [
        {
          translateX: _translateX,
        },
      ],
    };
  });

  const onPressHandler = () => {
    if (disabled) {
      return;
    }

    const animateToValue = value ? -circleOffset : translateOffset;

    translateX.value =
      animationDuration > 0
        ? withTiming(animateToValue, {
            duration: animationDuration,
          })
        : animateToValue;
    onValueChange(!value);
  };

  const tap = Gesture.Tap()
    .onStart(() => {
      runOnJS(onPressHandler)();
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

  return (
    <GestureDetector gesture={composedGestures}>
      <Animated.View
        style={[
          styles.track,
          {
            backgroundColor: value ? trackActiveColor : trackInactiveColor,
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight,
          },
          trackStyle,
          animatedTrackStyle,
        ]}
      >
        {activeText && (
          <Animated.Text
            style={[styles.positionAbsolute, animatedActiveText, textStyle]}
          >
            {activeText}
          </Animated.Text>
        )}
        {inactiveText && (
          <Animated.Text
            style={[styles.positionAbsolute, animatedInactiveText, textStyle]}
          >
            {inactiveText}
          </Animated.Text>
        )}
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize,
            },
            animatedThumbStyle,
          ]}
        >
          {renderCircleChild && renderCircleChild}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
  },
  thumb: {
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
