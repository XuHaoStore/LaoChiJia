/**
 * 老吃家 - 美食推荐社区
 * https://github.com/your-repo-url
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FAFAFA"
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});

export default App;
