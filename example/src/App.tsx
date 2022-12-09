import * as React from 'react';
import * as DriveKitCore from "@react-native-drivekit/core";
import * as DriveKitTripAnalysis from "@react-native-drivekit/trip-analysis";

import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    DriveKitCore.setApiKey('SOMETHING')
    const getIsTripRunning = async () => {
      const isTripRunning = await DriveKitTripAnalysis.isTripRunning();
      console.warn('Is Trip running = ', isTripRunning)
    }

    getIsTripRunning()
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
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
