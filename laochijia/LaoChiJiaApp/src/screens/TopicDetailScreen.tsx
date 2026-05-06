import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../components/Text';
import { Colors } from '../constants';

export default function TopicDetailScreen() {
  return (
    <View style={styles.container}>
      <Text variant="h2">话题详情</Text>
      <Text variant="body" color="secondary">
        这里将显示话题详情
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
