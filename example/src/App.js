import * as React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Switch } from '../../src';
export default function App() {
  const [value1, setValue1] = React.useState(false);
  const [value2, setValue2] = React.useState(false);
  const [value3, setValue3] = React.useState(false);
  const [value4, setValue4] = React.useState(false);
  const [value5, setValue5] = React.useState(false);
  return React.createElement(
    GestureHandlerRootView,
    { style: { flex: 1 } },
    React.createElement(
      View,
      { style: styles.container },
      React.createElement(Switch, {
        value: value1,
        onValueChange: (val) => setValue1(val),
        enableDrag: true,
        trackWidth: 95,
        trackHeight: 45,
        circleSize: 40,
        circleOffset: -3,
        circleSlide: true,
      }),
      React.createElement(Switch, {
        value: value2,
        onValueChange: (val) => setValue2(val),
        enableDrag: true,
        trackWidth: 95,
        trackHeight: 45,
        circleSize: 40,
        circleOffset: -3,
        activeText: 'On',
        inactiveText: 'Off',
      }),
      React.createElement(Switch, {
        value: value3,
        onValueChange: (val) => setValue3(val),
        enableDrag: true,
        trackWidth: 95,
        trackHeight: 45,
        circleSize: 40,
        circleOffset: -3,
        circleActiveColor: 'white',
        trackActiveColor: '#42adff',
        trackStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
        },
      }),
      React.createElement(Switch, {
        value: value4,
        onValueChange: (val) => setValue4(val),
        enableDrag: true,
        trackWidth: 50,
        trackHeight: 20,
        circleSize: 25,
        circleOffset: 3,
        circleActiveColor: 'white',
        trackActiveColor: '#42adff',
        animationDuration: 1,
        circleStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
        },
      }),
      React.createElement(Switch, {
        value: value5,
        onValueChange: (val) => setValue5(val),
        enableDrag: true,
        trackWidth: 50,
        trackHeight: 20,
        circleSize: 25,
        circleOffset: 3,
        circleActiveColor: 'white',
        trackActiveColor: '#42adff',
        animationDuration: 200,
        circleStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
        },
      })
    )
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
