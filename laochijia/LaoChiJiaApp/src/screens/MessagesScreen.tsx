import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../components/Text';
import { Colors } from '../constants';

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Text variant="h2">消息</Text>
      <Text variant="body" color="secondary">
        这里将显示消息通知
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
