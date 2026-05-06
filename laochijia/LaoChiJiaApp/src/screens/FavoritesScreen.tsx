import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius } from '../constants';
import Text from '../components/Text';

const favorites = [
  {
    id: '1',
    shopName: '老北京炸酱面',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300',
    rating: 4.9,
    tags: ['北京美食', '面食'],
  },
  {
    id: '2',
    shopName: '川味麻辣火锅',
    image: 'https://images.unsplash.com/photo-1571091718764-561597891ab4?w=300',
    rating: 5.0,
    tags: ['火锅', '川菜'],
  },
  {
    id: '3',
    shopName: '日式料理屋',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
    rating: 4.8,
    tags: ['日料', '刺身'],
  },
  {
    id: '4',
    shopName: '粤式早茶店',
    image: 'https://images.unsplash.com/photo-1547592166-23ac551ab8d8?w=300',
    rating: 4.6,
    tags: ['粤菜', '早茶'],
  },
];

export default function FavoritesScreen() {
  const navigation = useNavigation();

  const handleItemPress = (id: string) => {
    navigation.navigate('RecommendationDetail' as never, { id });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" weight="semibold">我的收藏</Text>
        <Text variant="body" color="secondary">收藏你喜欢的推荐</Text>
      </View>

      <View style={styles.content}>
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Text variant="h1">⭐</Text>
            <Text variant="body" color="secondary">还没有收藏任何推荐</Text>
            <Text variant="caption" color="tertiary">去发现页看看有什么好吃的吧</Text>
          </View>
        ) : (
          <View style={styles.favoritesGrid}>
            {favorites.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.favoriteItem}
                onPress={() => handleItemPress(item.id)}
              >
                <View style={styles.favoriteImageContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.favoriteImage}
                    resizeMode="cover"
                  />
                  <View style={styles.favoriteRating}>
                    <Text>⭐</Text>
                    <Text variant="small" color="inverse">{item.rating}</Text>
                  </View>
                </View>
                <Text variant="body" weight="medium" style={styles.favoriteName}>
                  {item.shopName}
                </Text>
                <View style={styles.favoriteTags}>
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <Text key={index} variant="small" color="tertiary">
                      {tag}
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  favoritesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  favoriteItem: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  favoriteImageContainer: {
    position: 'relative',
    height: 120,
  },
  favoriteImage: {
    width: '100%',
    height: '100%',
  },
  favoriteRating: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: BorderRadius.full,
  },
  favoriteName: {
    padding: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  favoriteTags: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
});
