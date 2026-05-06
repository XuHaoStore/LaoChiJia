import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Colors, Spacing, BorderRadius, RatingTexts } from '../constants';
import Text from '../components/Text';
import Button from '../components/Button';

type RouteProps = RouteProp<RootStackParamList, 'PostReview'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  route: RouteProps;
  navigation: NavigationProp;
}

export default function PostReviewScreen({ route, navigation }: Props) {
  const { recommendationId } = route.params;
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [hasBeenThere, setHasBeenThere] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('提示', '请选择评分');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    Alert.alert('成功', '评价发表成功！');
    navigation.goBack();
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" weight="semibold">发表评价</Text>
        <Text variant="body" color="secondary">分享你的真实体验</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text variant="h3" weight="semibold">评分</Text>
          <Text variant="caption" color="secondary" style={styles.sectionHint}>
            选择你对这家店的评分
          </Text>
          
          <View style={styles.ratingContainer}>
            <View style={styles.starsRow}>
              {Array.from({ length: 5 }).map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.starButton}
                  onPress={() => setRating(index + 1)}
                >
                  <Text style={[styles.star, rating > index && styles.starActive]}>
                    ⭐
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text variant="body" weight="semibold" style={styles.ratingText}>
              {rating > 0 ? RatingTexts[rating as keyof typeof RatingTexts] : '请选择评分'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="h3" weight="semibold">是否到店品尝</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleOption, hasBeenThere && styles.toggleSelected]}
              onPress={() => setHasBeenThere(true)}
            >
              <Text variant="body" color={hasBeenThere ? 'inverse' : 'secondary'}>
                ✅ 已到店
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleOption, !hasBeenThere && styles.toggleSelected]}
              onPress={() => setHasBeenThere(false)}
            >
              <Text variant="body" color={!hasBeenThere ? 'inverse' : 'secondary'}>
                ❌ 未到店
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="h3" weight="semibold">评价内容</Text>
          <Text variant="caption" color="secondary" style={styles.sectionHint}>
            分享你的真实感受，帮助其他吃货做参考
          </Text>
          <View style={styles.textareaContainer}>
            <Text
              style={{
                fontSize: 16,
                color: content ? Colors.text.primary : Colors.text.tertiary,
              }}
              editable
              multiline
              numberOfLines={8}
              placeholder="请描述你的用餐体验..."
              placeholderTextColor={Colors.text.tertiary}
              value={content}
              onChangeText={setContent}
            />
          </View>
          <Text variant="caption" color="tertiary" style={styles.charCount}>
            {content.length}/300
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="h3" weight="semibold">评价说明</Text>
          <View style={styles.infoBox}>
            <Text variant="caption" color="secondary">
              • 一星评价将被标记为差评，可申请复议
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text variant="caption" color="secondary">
              • 真实到店评价更有参考价值
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text variant="caption" color="secondary">
              • 恶意评价将被扣除吃货分
            </Text>
          </View>
        </View>

        <Button
          title="发表评价"
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.xl,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHint: {
    marginBottom: Spacing.md,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  starButton: {
    padding: Spacing.sm,
  },
  star: {
    fontSize: 48,
    opacity: 0.3,
  },
  starActive: {
    opacity: 1,
  },
  ratingText: {
    color: Colors.primary,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  toggleOption: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  toggleSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  textareaContainer: {
    minHeight: 160,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
  },
  charCount: {
    textAlign: 'right',
    marginTop: Spacing.sm,
  },
  infoBox: {
    paddingVertical: Spacing.sm,
  },
  submitButton: {
    marginTop: Spacing.lg,
  },
});
