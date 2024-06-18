import * as React from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Switch } from '../../src';

export default function App() {
  const [value, setValue] = React.useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Switch
          value={value}
          onValueChange={(val) => setValue(val)}
          enableDrag
          trackWidth={95}
          trackHeight={45}
          circleSize={40}
          circleOffset={-3}
          circleSlide={false}
          trackActiveColor="#42adff"
        />
        <Switch
          value={value}
          onValueChange={(val) => setValue(val)}
          enableDrag
          trackWidth={95}
          trackHeight={45}
          circleSize={40}
          circleOffset={-3}
          circleSlide={true}
          trackActiveColor="#42adff"
        />

        <Switch
          value={value}
          onValueChange={(val) => setValue(val)}
          enableDrag
          trackWidth={95}
          trackHeight={45}
          circleSize={40}
          circleOffset={-3}
          activeText="On"
          inactiveText="Off"
        />

        <Switch
          value={value}
          onValueChange={(val) => setValue(val)}
          enableDrag
          trackWidth={95}
          trackHeight={45}
          circleSize={40}
          circleOffset={-3}
          circleActiveColor="white"
          trackActiveColor="#42adff"
          trackStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
          }}
        />

        <Switch
          value={value}
          onValueChange={(val) => setValue(val)}
          enableDrag
          trackWidth={50}
          trackHeight={20}
          circleSize={25}
          circleOffset={3}
          circleActiveColor="white"
          trackActiveColor="#42adff"
          animationDuration={1}
          circleStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
          }}
        />

        <Switch
          value={value}
          onValueChange={(val) => setValue(val)}
          enableDrag
          trackWidth={50}
          trackHeight={20}
          circleSize={25}
          circleOffset={3}
          circleActiveColor="white"
          trackActiveColor="#42adff"
          animationDuration={200}
          circleStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
          }}
        />
      </View>
    </GestureHandlerRootView>
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
