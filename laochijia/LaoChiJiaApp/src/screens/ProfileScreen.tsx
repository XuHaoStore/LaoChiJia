import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../components/Text';
import { Colors } from '../constants';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text variant="h2">用户资料</Text>
      <Text variant="body" color="secondary">
        这里将显示用户资料
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});
