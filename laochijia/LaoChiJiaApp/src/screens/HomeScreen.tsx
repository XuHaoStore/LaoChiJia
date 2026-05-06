import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Recommendation } from '../types';
import { Colors, Spacing } from '../constants';
import Text from '../components/Text';
import RecommendationCard from '../components/RecommendationCard';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    user_id: 'user1',
    shop_name: '老北京炸酱面',
    address: '朝阳区三里屯',
    content: '这家炸酱面真的绝了！面条劲道，酱料浓郁，配上黄瓜丝和豆芽，一口下去满满的幸福感。推荐给大家！',
    images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'],
    tags: ['北京美食', '面食'],
    cuisine_type: '京菜',
    avg_rating: 4.9,
    rating_count: 128,
    like_count: 356,
    favorite_count: 89,
    view_count: 2567,
    status: 'approved',
    is_hot: true,
    created_at: '2024-01-15T10:30:00',
    updated_at: '2024-01-15T10:30:00',
    user: {
      id: 'user1',
      nickname: '吃货小王',
      foodie_points: 580,
      status: 'active',
      created_at: '2024-01-01T00:00:00',
      updated_at: '2024-01-15T00:00:00',
    },
  },
  {
    id: '2',
    user_id: 'user2',
    shop_name: '川味麻辣火锅',
    address: '三里屯太古里',
    content: '超级正宗的四川火锅！麻辣鲜香，牛肉很嫩，毛肚新鲜。一定要点他们家的秘制蘸料！',
    images: ['https://images.unsplash.com/photo-1571091718764-561597891ab4?w=400'],
    tags: ['火锅', '川菜'],
    cuisine_type: '川菜',
    avg_rating: 5.0,
    rating_count: 256,
    like_count: 678,
    favorite_count: 156,
    view_count: 4521,
    status: 'approved',
    is_hot: true,
    created_at: '2024-01-14T18:45:00',
    updated_at: '2024-01-14T18:45:00',
    user: {
      id: 'user2',
      nickname: '火锅达人',
      foodie_points: 1200,
      status: 'active',
      created_at: '2023-12-01T00:00:00',
      updated_at: '2024-01-14T00:00:00',
    },
  },
  {
    id: '3',
    user_id: 'user3',
    shop_name: '深夜烧烤摊',
    address: '望京SOHO',
    content: '深夜饿了就来这家！烤串味道很棒，特别是烤鸡翅和烤茄子，配上啤酒简直完美！',
    images: ['https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400'],
    tags: ['烧烤', '夜宵'],
    cuisine_type: '烧烤',
    avg_rating: 4.7,
    rating_count: 89,
    like_count: 234,
    favorite_count: 67,
    view_count: 1890,
    status: 'approved',
    is_hot: false,
    created_at: '2024-01-13T22:00:00',
    updated_at: '2024-01-13T22:00:00',
    user: {
      id: 'user3',
      nickname: '夜猫子',
      foodie_points: 320,
      status: 'active',
      created_at: '2024-01-05T00:00:00',
      updated_at: '2024-01-13T00:00:00',
    },
  },
  {
    id: '4',
    user_id: 'user4',
    shop_name: '日式料理屋',
    address: '国贸中心',
    content: '环境很温馨的日料店，刺身新鲜，寿司味道正宗。推荐他们家的三文鱼刺身和鳗鱼饭！',
    images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'],
    tags: ['日料', '刺身'],
    cuisine_type: '日料',
    avg_rating: 4.8,
    rating_count: 167,
    like_count: 445,
    favorite_count: 123,
    view_count: 3120,
    status: 'approved',
    is_hot: true,
    created_at: '2024-01-12T12:30:00',
    updated_at: '2024-01-12T12:30:00',
    user: {
      id: 'user4',
      nickname: '寿司控',
      foodie_points: 890,
      status: 'active',
      created_at: '2023-11-15T00:00:00',
      updated_at: '2024-01-12T00:00:00',
    },
  },
  {
    id: '5',
    user_id: 'user5',
    shop_name: '粤式早茶店',
    address: '珠江新城',
    content: '正宗的广东早茶！虾饺、烧卖、叉烧包都很好吃，周末早上来喝早茶很惬意。',
    images: ['https://images.unsplash.com/photo-1547592166-23ac551ab8d8?w=400'],
    tags: ['粤菜', '早茶'],
    cuisine_type: '粤菜',
    avg_rating: 4.6,
    rating_count: 98,
    like_count: 278,
    favorite_count: 78,
    view_count: 1980,
    status: 'approved',
    is_hot: false,
    created_at: '2024-01-11T09:00:00',
    updated_at: '2024-01-11T09:00:00',
    user: {
      id: 'user5',
      nickname: '茶餐厅',
      foodie_points: 450,
      status: 'active',
      created_at: '2024-01-02T00:00:00',
      updated_at: '2024-01-11T00:00:00',
    },
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRecommendations(mockRecommendations);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRecommendations();
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    // 模拟加载更多
    setPage(prev => prev + 1);
  };

  const handleCardPress = (id: string) => {
    navigation.navigate('RecommendationDetail', { id });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text variant="body" color="secondary">加载中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" weight="semibold">老吃家</Text>
        <Text variant="body" color="secondary">发现身边的美食</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      >
        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="semibold">🔥 热门推荐</Text>
          </View>

          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onPress={() => handleCardPress(recommendation.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: Spacing.xl,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  scrollView: {
    flex: 1,
    marginTop: -Spacing.xl,
    paddingTop: Spacing.xl,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  sectionHeader: {
    marginBottom: Spacing.md,
  },
});
