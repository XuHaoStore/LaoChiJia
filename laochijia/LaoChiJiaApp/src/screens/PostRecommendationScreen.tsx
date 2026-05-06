import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius, CuisineTypes } from '../constants';
import { useAuth } from '../context/AuthContext';
import Text from '../components/Text';
import Button from '../components/Button';
import Input from '../components/Input';

const tagOptions = [
  '🌶️ 麻辣', '🥘 火锅', '🍜 面食', '🍗 炸鸡',
  '🍣 日料', '🥩 牛排', '🍕 披萨', '🍰 甜点',
  '🥗 轻食', '🍱 便当', '🔥 烧烤', '🍲 川菜',
];

export default function PostRecommendationScreen() {
  const navigation = useNavigation();
  const { userProfile } = useAuth();
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [cuisineType, setCuisineType] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!shopName || !content) {
      Alert.alert('提示', '请填写店铺名称和推荐理由');
      return;
    }

    if (userProfile && userProfile.foodie_points < 10) {
      Alert.alert('提示', '吃货分不足，无法发布推荐');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    Alert.alert('成功', '推荐发布成功！消耗 10 吃货分');
    navigation.goBack();
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" weight="semibold">发布推荐</Text>
        <Text variant="body" color="secondary">分享你发现的美食</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text variant="h3" weight="semibold">店铺信息</Text>
          <Input
            label="店铺名称"
            placeholder="请输入店铺名称"
            value={shopName}
            onChangeText={setShopName}
          />
          <Input
            label="店铺地址"
            placeholder="请输入店铺地址"
            value={address}
            onChangeText={setAddress}
          />
          <Input
            label="人均价格"
            placeholder="请输入人均价格（元）"
            value={priceRange}
            onChangeText={setPriceRange}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text variant="h3" weight="semibold">口味标签</Text>
          <Text variant="caption" color="secondary" style={styles.sectionHint}>
            选择适合的口味标签（可多选）
          </Text>
          <View style={styles.tagsContainer}>
            {tagOptions.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  selectedTags.includes(tag) && styles.tagSelected,
                ]}
                onPress={() => toggleTag(tag)}
              >
                <Text
                  variant="small"
                  color={selectedTags.includes(tag) ? 'inverse' : 'primary'}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="h3" weight="semibold">菜系分类</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cuisineContainer}>
            {CuisineTypes.map((cuisine) => (
              <TouchableOpacity
                key={cuisine}
                style={[
                  styles.cuisineTag,
                  cuisineType === cuisine && styles.cuisineTagSelected,
                ]}
                onPress={() => setCuisineType(cuisine)}
              >
                <Text
                  variant="small"
                  color={cuisineType === cuisine ? 'primary' : 'secondary'}
                >
                  {cuisine}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text variant="h3" weight="semibold">上传图片</Text>
          <Text variant="caption" color="secondary" style={styles.sectionHint}>
            添加美食图片（可选）
          </Text>
          <View style={styles.imagesContainer}>
            {images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
            ))}
            <TouchableOpacity style={styles.addImageButton}>
              <Text variant="h2">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="h3" weight="semibold">推荐理由</Text>
          <Text variant="caption" color="secondary" style={styles.sectionHint}>
            分享你的真实体验，帮助更多吃货发现美食
          </Text>
          <View style={styles.textareaContainer}>
            <Text
              style={{
                fontSize: 16,
                color: content ? Colors.text.primary : Colors.text.tertiary,
              }}
              editable
              multiline
              numberOfLines={6}
              placeholder="请详细描述你的推荐理由..."
              placeholderTextColor={Colors.text.tertiary}
              value={content}
              onChangeText={setContent}
            />
          </View>
          <Text variant="caption" color="tertiary" style={styles.charCount}>
            {content.length}/500
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.pointsWarning}>
            <Text>⚠️</Text>
            <Text variant="caption" color="warning">
              发布推荐将消耗 10 吃货分，当前剩余 {userProfile?.foodie_points || 0} 分
            </Text>
          </View>
        </View>

        <Button
          title="发布推荐"
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
    marginBottom: Spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  tag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  cuisineContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  cuisineTag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cuisineTagSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.md,
    resizeMode: 'cover',
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textareaContainer: {
    minHeight: 120,
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
  pointsWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: Colors.warning + '15',
    borderRadius: BorderRadius.md,
  },
  submitButton: {
    marginTop: Spacing.lg,
  },
});
