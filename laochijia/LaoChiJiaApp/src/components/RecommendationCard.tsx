import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from './Text';
import { Colors, Spacing, BorderRadius, Shadows } from '../constants';
import { Recommendation } from '../types';

interface Props {
  recommendation: Recommendation;
  onPress: () => void;
}

export default function RecommendationCard({ recommendation, onPress }: Props) {
  const { shop_name, images, tags, avg_rating, rating_count, like_count, view_count, user } = recommendation;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: images?.[0] || 'https://via.placeholder.com/300x200' }}
          style={styles.image}
          resizeMode="cover"
        />
        {tags?.[0] && (
          <View style={styles.tag}>
            <Text variant="small" color="inverse" weight="medium">
              {tags[0]}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text variant="h3" weight="semibold" style={styles.title}>
          {shop_name}
        </Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Text key={index} style={styles.star}>
                {index < Math.floor(avg_rating) ? '★' : '☆'}
              </Text>
            ))}
          </View>
          <Text variant="caption" color="secondary">
            {avg_rating} ({rating_count})
          </Text>
        </View>
        
        {user && (
          <View style={styles.author}>
            <View style={styles.avatar}>
              <Text variant="body">👤</Text>
            </View>
            <Text variant="caption" color="secondary">
              {user.nickname}
            </Text>
          </View>
        )}
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text variant="caption" color="tertiary">
              {like_count} 赞
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="caption" color="tertiary">
              {view_count} 浏览
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.md,
    marginBottom: Spacing.md,
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tag: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
  },
  content: {
    padding: Spacing.md,
  },
  title: {
    marginBottom: Spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    color: Colors.warning,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
