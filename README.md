

# A simple yet fast react native switch

A customizable and animated switch component for React Native. Easily integrate beautiful switches in your app with smooth animations and extensive customization options.

## Installation

To be able to run this screen you need to run the following:

```bash
npm install @petros-g/react-native-switch react-native-gesture-handler react-native-reanimated
```

or

```bash
yarn add @petros-g/react-native-switch react-native-gesture-handler react-native-reanimated
```


## Basic Usage

```bash
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Switch from 'react-native-animated-switch';

const App = () => {
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <View>
      <Switch
          value={switchValue}
          onValueChange={setSwitchValue}
          enableDrag
          trackWidth={50}
          trackHeight={20}
          circleSize={25}
          circleOffset={3}
          circleActiveColor="white"
          trackActiveColor="#42adff"
          animationDuration={200}
        />
      <Text>The switch is {switchValue ? "On" : "Off"}</Text>
    </View>
  );
};

export default App;
```


## Props

| Prop Name            | Type                                                    | Default     | Description                                                                 |
|----------------------|---------------------------------------------------------|-------------|-----------------------------------------------------------------------------|
| `value`              | `boolean`                                               | `false`     | Current state of the switch (on/off).                                       |
| `disabled`           | `boolean`                                               | `false`     | If true, the switch will be unclickable.                                    |
| `trackWidth`         | `number`                                                | `95`        | Width of the track.                                                         |
| `trackHeight`        | `number`                                                | `45`        | Height of the track.                                                        |
| `circleSize`         | `number`                                                | `40`        | Diameter of the circle.                                                     |
| `activeText`         | `string`                                                | `none`        | Text displayed when the switch is active.                                   |
| `inactiveText`       | `string`                                                | `none`        | Text displayed when the switch is inactive.                                 |
| `animationDuration`  | `number`                                                | `600`       | Duration of the switch animation in milliseconds. If 0 animations are disabled.                           |
| `trackActiveColor`   | `string`                                                | `'#3dcc63'` | Background color of the track when the switch is active.                    |
| `trackInactiveColor` | `string`                                                | `'#bdbdbd'` | Background color of the track when the switch is inactive.                  |
| `circleActiveColor`  | `string`                                                | `white`     | Color of the circle when the switch is active.                              |
| `circleInactiveColor`| `string`                                                | `white`     | Color of the circle when the switch is inactive.                            |
| `circleOffset`       | `number`                                                | `0`         | Offset position of the circle.                                              |
| `textStyle`          | `textStyle`                                  | `none` | Custom style for the active/inactive text.                                  |
| `trackStyle`         | `ViewStyle`                                  | `none` | Custom style for the track.                                                 |
| `enableDrag`         | `boolean`                                               | `false`     | If true, enables dragging the switch instead of tapping.                    |
| `circleSlide`        | `boolean`                                               | `false`     | If true, enables sliding animation for the circle.                          |
| `circleStyle`        | `ViewStyle`                                  | `none` | Custom style for the circle.                                                |
| `onValueChange`      | `function` | `none`  | Callback function called when the switch value changes.                     |
| `renderCircleChild`  | `React.JSX.Element \| React.ReactNode`                  | `none` | Custom content to render inside the circle.                                 |
