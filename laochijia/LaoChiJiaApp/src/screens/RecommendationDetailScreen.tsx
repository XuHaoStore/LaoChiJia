import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Share } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Recommendation, Review } from '../types';
import { Colors, Spacing, BorderRadius, RatingTexts } from '../constants';
import Text from '../components/Text';
import Button from '../components/Button';

type RouteProps = RouteProp<RootStackParamList, 'RecommendationDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  route: RouteProps;
  navigation: NavigationProp;
}

const mockRecommendation: Recommendation = {
  id: '1',
  user_id: 'user1',
  shop_name: '老北京炸酱面',
  address: '朝阳区三里屯太古里北区N3-28号',
  price_range: 35,
  content: '这家炸酱面真的绝了！面条劲道，酱料浓郁，配上黄瓜丝和豆芽，一口下去满满的幸福感。老板是地道老北京人，特别热情。推荐大家一定要来尝尝！',
  images: [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
  ],
  tags: ['北京美食', '面食', '老字号'],
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
};

const mockReviews: Review[] = [
  {
    id: 'r1',
    recommendation_id: '1',
    user_id: 'user10',
    rating: 5,
    content: '确实很好吃！面很劲道，酱也很香，我一个人吃了两大碗！👍',
    has_been_there: true,
    is_negative: false,
    is_reconsidered: false,
    like_count: 23,
    created_at: '2024-01-15T18:30:00',
    updated_at: '2024-01-15T18:30:00',
    user: { id: 'user10', nickname: '美食爱好者', foodie_points: 420, status: 'active', created_at: '2024-01-02T00:00:00', updated_at: '2024-01-15T00:00:00' },
  },
  {
    id: 'r2',
    recommendation_id: '1',
    user_id: 'user11',
    rating: 4,
    content: '味道还不错，就是排队太久了，建议早点来。',
    has_been_there: true,
    is_negative: false,
    is_reconsidered: false,
    like_count: 15,
    created_at: '2024-01-15T16:00:00',
    updated_at: '2024-01-15T16:00:00',
    user: { id: 'user11', nickname: '探店达人', foodie_points: 890, status: 'active', created_at: '2023-12-15T00:00:00', updated_at: '2024-01-15T00:00:00' },
  },
  {
    id: 'r3',
    recommendation_id: '1',
    user_id: 'user12',
    rating: 1,
    content: '感觉一般般，没有想象中那么好吃，价格也不便宜。',
    has_been_there: true,
    is_negative: true,
    is_reconsidered: false,
    like_count: 8,
    created_at: '2024-01-14T20:00:00',
    updated_at: '2024-01-14T20:00:00',
    user: { id: 'user12', nickname: '挑剔食客', foodie_points: 150, status: 'active', created_at: '2024-01-10T00:00:00', updated_at: '2024-01-14T00:00:00' },
  },
  {
    id: 'r4',
    recommendation_id: '1',
    user_id: 'user13',
    rating: 5,
    content: '跟着推荐来的，果然没让我失望！老板人很好，还送了小菜。',
    has_been_there: true,
    is_negative: false,
    is_reconsidered: false,
    like_count: 31,
    created_at: '2024-01-14T14:30:00',
    updated_at: '2024-01-14T14:30:00',
    user: { id: 'user13', nickname: '老吃家', foodie_points: 1200, status: 'active', created_at: '2023-11-01T00:00:00', updated_at: '2024-01-14T00:00:00' },
  },
];

export default function RecommendationDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setRecommendation(mockRecommendation);
    setReviews(mockReviews);
    setLikeCount(mockRecommendation.like_count);
    setFavoriteCount(mockRecommendation.favorite_count);
    setLoading(false);
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleFavorite = () => {
    setFavorited(!favorited);
    setFavoriteCount(prev => favorited ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `快来看看老吃家推荐的「${recommendation?.shop_name}」！`,
        url: 'https://laochijia.com/recommendation/' + id,
      });
    } catch (error) {
      console.error('分享失败:', error);
    }
  };

  const handleWriteReview = () => {
    navigation.navigate('PostReview', { recommendationId: id });
  };

  if (loading || !recommendation) {
    return (
      <View style={styles.loadingContainer}>
        <Text variant="body" color="secondary">加载中...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: recommendation.images?.[0] }}
          style={styles.mainImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text>📤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="h2" weight="bold">{recommendation.shop_name}</Text>
          <View style={styles.ratingRow}>
            <View style={styles.stars}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Text key={index} style={styles.star}>
                  {index < Math.floor(recommendation.avg_rating) ? '★' : '☆'}
                </Text>
              ))}
            </View>
            <Text variant="body" weight="semibold" style={styles.ratingText}>
              {recommendation.avg_rating}
            </Text>
            <Text variant="caption" color="secondary">
              {RatingTexts[recommendation.avg_rating as keyof typeof RatingTexts]}
            </Text>
            <Text variant="caption" color="tertiary">({recommendation.rating_count}条评价)</Text>
          </View>
        </View>

        <View style={styles.tagsContainer}>
          {recommendation.tags?.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text variant="small" color="primary">{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text>📍</Text>
            <Text variant="caption" color="secondary">{recommendation.address}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text>💰</Text>
            <Text variant="caption" color="secondary">人均 ¥{recommendation.price_range}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text variant="h3" weight="semibold">推荐理由</Text>
          <Text variant="body" color="secondary" style={styles.description}>
            {recommendation.content}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="semibold">用户评价</Text>
            <Text variant="caption" color="tertiary">共 {reviews.length} 条</Text>
          </View>

          {reviews.map((review) => (
            <View key={review.id} style={[styles.reviewCard, review.is_negative && styles.negativeReview]}>
              <View style={styles.reviewHeader}>
                <View style={styles.avatar}>
                  <Text variant="body">👤</Text>
                </View>
                <View style={styles.reviewUserInfo}>
                  <Text variant="body" weight="medium">{review.user?.nickname}</Text>
                  <Text variant="caption" color="tertiary">
                    {review.has_been_there ? '已到店' : '未到店'} · {review.created_at.split('T')[0]}
                  </Text>
                </View>
                <View style={styles.reviewRating}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Text key={index} style={styles.reviewStar}>
                      {index < review.rating ? '★' : '☆'}
                    </Text>
                  ))}
                  <Text variant="caption" color="secondary" style={styles.reviewRatingText}>
                    {RatingTexts[review.rating as keyof typeof RatingTexts]}
                  </Text>
                </View>
              </View>
              <Text variant="body" color="secondary" style={styles.reviewContent}>
                {review.content}
              </Text>
              <View style={styles.reviewActions}>
                <TouchableOpacity style={styles.reviewAction}>
                  <Text>👍</Text>
                  <Text variant="caption" color="tertiary">{review.like_count}</Text>
                </TouchableOpacity>
                {review.is_negative && (
                  <TouchableOpacity style={styles.reviewAction}>
                    <Text>🔄</Text>
                    <Text variant="caption" color="primary">复议</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Text style={[styles.actionIcon, liked && styles.actionIconActive]}>❤️</Text>
            <Text variant="caption" color="secondary">{likeCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleFavorite}>
            <Text style={[styles.actionIcon, favorited && styles.actionIconActive]}>⭐</Text>
            <Text variant="caption" color="secondary">{favoriteCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text variant="caption" color="secondary">{reviews.length}</Text>
          </TouchableOpacity>
        </View>
        <Button title="发表评价" onPress={handleWriteReview} />
      </View>
    </ScrollView>
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
  imageContainer: {
    position: 'relative',
    height: 280,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  shareButton: {
    position: 'absolute',
    right: Spacing.md,
    bottom: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  header: {
    marginBottom: Spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 20,
    color: Colors.warning,
  },
  ratingText: {
    color: Colors.warning,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  tag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.primary + '15',
    borderRadius: BorderRadius.full,
  },
  infoRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  description: {
    lineHeight: 24,
  },
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  negativeReview: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  reviewStar: {
    fontSize: 14,
    color: Colors.warning,
  },
  reviewRatingText: {
    fontSize: 12,
  },
  reviewContent: {
    lineHeight: 22,
    marginBottom: Spacing.sm,
  },
  reviewActions: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  reviewAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  bottomBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  actionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionIconActive: {
    color: Colors.primary,
  },
});
