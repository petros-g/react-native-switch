import React, { type Dispatch, type SetStateAction } from 'react';
import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
type Props = {
  value: boolean;
  disabled?: boolean;
  trackWidth?: number;
  trackHeight?: number;
  circleSize?: number;
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
  circleSlide?: boolean;
  circleStyle?: StyleProp<ViewStyle>;
  onValueChange: (value: boolean) => void | Dispatch<SetStateAction<boolean>>;
  renderCircleChild?: React.JSX.Element | React.ReactNode;
};
export declare const Switch: ({
  value,
  disabled,
  circleSize,
  trackHeight,
  trackWidth,
  activeText,
  inactiveText,
  trackActiveColor,
  trackInactiveColor,
  circleActiveColor,
  circleInactiveColor,
  circleOffset,
  animationDuration,
  textStyle,
  trackStyle,
  enableDrag,
  circleSlide,
  circleStyle,
  onValueChange,
  renderCircleChild,
}: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=Switch.d.ts.map
