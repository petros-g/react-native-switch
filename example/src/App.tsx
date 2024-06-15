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
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
