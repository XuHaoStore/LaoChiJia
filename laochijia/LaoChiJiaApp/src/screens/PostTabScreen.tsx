import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../components/Text';
import { Colors } from '../constants';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';

export default function PostTabScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text variant="h2">发布推荐</Text>
      <Text variant="body" color="secondary" style={styles.subtitle}>
        分享你发现的美食
      </Text>
      <Button
        title="立即发布"
        onPress={() => navigation.navigate('PostRecommendation' as never)}
        style={styles.button}
      />
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
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    minWidth: 200,
  },
});
