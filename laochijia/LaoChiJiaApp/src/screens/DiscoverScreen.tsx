import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius } from '../constants';
import Text from '../components/Text';

const categories = [
  { id: '1', name: '全部', icon: '🏠' },
  { id: '2', name: '川菜', icon: '🌶️' },
  { id: '3', name: '粤菜', icon: '🍲' },
  { id: '4', name: '日料', icon: '🍣' },
  { id: '5', name: '火锅', icon: '🥘' },
  { id: '6', name: '烧烤', icon: '🔥' },
  { id: '7', name: '甜点', icon: '🍰' },
  { id: '8', name: '西餐', icon: '🥩' },
];

const trendingTopics = [
  { id: '1', name: '#北京美食', description: '老北京人都爱吃的地道美食', views: '10.2万', posts: 156 },
  { id: '2', name: '#周末聚餐', description: '周末去哪吃？推荐合集', views: '8.5万', posts: 89 },
  { id: '3', name: '#深夜食堂', description: '深夜美食推荐', views: '6.3万', posts: 67 },
  { id: '4', name: '#减脂餐', description: '健康美味两不误', views: '4.8万', posts: 45 },
  { id: '5', name: '#探店日记', description: '记录每一次美食探索', views: '3.2万', posts: 32 },
];

const nearbyRecommendations = [
  { id: '1', name: '老北京炸酱面', distance: '1.2km', rating: 4.9, type: '京菜' },
  { id: '2', name: '川味麻辣火锅', distance: '0.8km', rating: 5.0, type: '川菜' },
  { id: '3', name: '深夜烧烤摊', distance: '1.5km', rating: 4.7, type: '烧烤' },
];

const hotRecommendations = [
  { id: '1', name: '米其林三星餐厅', image: '🍝', author: '美食家小王', likes: 567 },
  { id: '2', name: '网红奶茶店', image: '🧋', author: '奶茶控', likes: 432 },
  { id: '3', name: '老字号早餐铺', image: '🥢', author: '早餐达人', likes: 321 },
];

export default function DiscoverScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTopicPress = (id: string) => {
    navigation.navigate('TopicDetail' as never, { id });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" weight="semibold">发现</Text>
        <Text variant="body" color="secondary">探索更多美食</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="搜索美食、店铺或话题"
            placeholderTextColor={Colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="semibold">分类浏览</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.id && styles.categorySelected,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text>{category.icon}</Text>
                <Text variant="caption" color={selectedCategory === category.id ? 'inverse' : 'secondary'}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="semibold">🔥 热门话题</Text>
            <TouchableOpacity>
              <Text variant="caption" color="primary">查看全部</Text>
            </TouchableOpacity>
          </View>
          {trendingTopics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              onPress={() => handleTopicPress(topic.id)}
            >
              <View style={styles.topicContent}>
                <Text variant="body" weight="medium">{topic.name}</Text>
                <Text variant="caption" color="tertiary">{topic.description}</Text>
              </View>
              <View style={styles.topicStats}>
                <Text variant="small" color="tertiary">{topic.views}浏览</Text>
                <Text variant="small" color="primary">{topic.posts}篇</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="semibold">📍 附近推荐</Text>
            <Text variant="caption" color="secondary">1.2km内</Text>
          </View>
          {nearbyRecommendations.map((item) => (
            <TouchableOpacity key={item.id} style={styles.nearbyItem}>
              <View style={styles.nearbyIcon}>
                <Text variant="h2">🍜</Text>
              </View>
              <View style={styles.nearbyInfo}>
                <Text variant="body" weight="medium">{item.name}</Text>
                <View style={styles.nearbyMeta}>
                  <Text variant="small" color="secondary">{item.type}</Text>
                  <Text>·</Text>
                  <Text variant="small" color="secondary">{item.distance}</Text>
                </View>
              </View>
              <View style={styles.nearbyRating}>
                <Text>⭐</Text>
                <Text variant="caption">{item.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="semibold">💖 大家在看</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hotScroll}>
            {hotRecommendations.map((item) => (
              <TouchableOpacity key={item.id} style={styles.hotItem}>
                <View style={styles.hotImage}>
                  <Text variant="h1">{item.image}</Text>
                </View>
                <Text variant="caption" weight="medium">{item.name}</Text>
                <View style={styles.hotAuthor}>
                  <Text variant="small" color="tertiary">{item.author}</Text>
                  <Text>·</Text>
                  <Text variant="small" color="primary">{item.likes}赞</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
  searchContainer: {
    marginBottom: Spacing.lg,
  },
  searchInput: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    fontSize: 16,
    color: Colors.text.primary,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  categoriesScroll: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  categoryItem: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
  },
  categorySelected: {
    backgroundColor: Colors.primary,
  },
  topicCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  topicContent: {
    flex: 1,
  },
  topicStats: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  nearbyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  nearbyIcon: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearbyInfo: {
    flex: 1,
  },
  nearbyMeta: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  nearbyRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  hotScroll: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  hotItem: {
    width: 140,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  hotImage: {
    height: 120,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotAuthor: {
    flexDirection: 'row',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.sm,
    paddingTop: Spacing.xs,
  },
});
