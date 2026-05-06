import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius } from '../constants';
import { useAuth } from '../context/AuthContext';
import Text from '../components/Text';
import Button from '../components/Button';

const mockRecommendations = [
  { id: '1', shopName: '老北京炸酱面', rating: 4.9, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200' },
  { id: '2', shopName: '川味麻辣火锅', rating: 5.0, image: 'https://images.unsplash.com/photo-1571091718764-561597891ab4?w=200' },
  { id: '3', shopName: '深夜烧烤摊', rating: 4.7, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200' },
];

const mockStats = [
  { label: '推荐', value: '12', icon: '📝' },
  { label: '评价', value: '28', icon: '⭐' },
  { label: '粉丝', value: '156', icon: '👥' },
  { label: '关注', value: '45', icon: '❤️' },
];

const menuItems = [
  { icon: '⭐', label: '我的收藏', action: 'favorites' },
  { icon: '📊', label: '吃货分记录', action: 'points' },
  { icon: '🔔', label: '消息通知', action: 'notifications' },
  { icon: '⚙️', label: '设置', action: 'settings' },
];

export default function MyProfileScreen() {
  const navigation = useNavigation();
  const { userProfile, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleMenuPress = (action: string) => {
    switch (action) {
      case 'favorites':
        navigation.navigate('Favorites' as never);
        break;
      case 'notifications':
        navigation.navigate('Notifications' as never);
        break;
      case 'settings':
        navigation.navigate('Settings' as never);
        break;
      case 'points':
        // 可以跳转到吃货分记录页面
        break;
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text variant="h1">👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text variant="h2" weight="bold">
              {userProfile?.nickname || '用户昵称'}
            </Text>
            <View style={styles.pointsBadge}>
              <Text>🍜</Text>
              <Text variant="caption" color="inverse">
                吃货分: {userProfile?.foodie_points || 100}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          {mockStats.map((stat, index) => (
            <TouchableOpacity key={index} style={styles.statItem}>
              <Text variant="h3" weight="bold">{stat.value}</Text>
              <Text variant="caption" color="secondary">{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="semibold">我的推荐</Text>
            <TouchableOpacity>
              <Text variant="caption" color="primary">查看全部</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationsScroll}>
            {mockRecommendations.map((item) => (
              <TouchableOpacity key={item.id} style={styles.recommendationItem}>
                <View style={styles.recommendationImageContainer}>
                  <Text variant="h1">🍜</Text>
                </View>
                <Text variant="caption" weight="medium" style={styles.recommendationName}>
                  {item.shopName}
                </Text>
                <View style={styles.recommendationRating}>
                  <Text>⭐</Text>
                  <Text variant="small">{item.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="semibold">快捷菜单</Text>
          </View>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.action)}
              >
                <Text variant="h2">{item.icon}</Text>
                <Text variant="caption">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="semibold">吃货分规则</Text>
          </View>
          <View style={styles.rulesContainer}>
            <View style={styles.ruleItem}>
              <Text>📝</Text>
              <View style={styles.ruleContent}>
                <Text variant="body" weight="medium">发布推荐</Text>
                <Text variant="caption" color="tertiary">消耗 10 吃货分</Text>
              </View>
              <Text variant="body" color="error">-10</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text>⭐</Text>
              <View style={styles.ruleContent}>
                <Text variant="body" weight="medium">优质推荐</Text>
                <Text variant="caption" color="tertiary">获得 20 吃货分</Text>
              </View>
              <Text variant="body" color="success">+20</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text>💬</Text>
              <View style={styles.ruleContent}>
                <Text variant="body" weight="medium">发表评价</Text>
                <Text variant="caption" color="tertiary">获得 5 吃货分</Text>
              </View>
              <Text variant="body" color="success">+5</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text>❌</Text>
              <View style={styles.ruleContent}>
                <Text variant="body" weight="medium">恶意评价</Text>
                <Text variant="caption" color="tertiary">扣除 50 吃货分</Text>
              </View>
              <Text variant="body" color="error">-50</Text>
            </View>
          </View>
        </View>

        <Button
          title="退出登录"
          variant="outline"
          onPress={handleSignOut}
          loading={loading}
          style={styles.signOutButton}
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.warning,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
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
  recommendationsScroll: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  recommendationItem: {
    width: 120,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  recommendationImageContainer: {
    height: 100,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationName: {
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  recommendationRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.sm,
    paddingTop: Spacing.xs,
  },
  menuGrid: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  menuItem: {
    flex: 1,
    minWidth: 80,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rulesContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  ruleItem:lastChild: {
    borderBottomWidth: 0,
  },
  ruleContent: {
    flex: 1,
  },
  signOutButton: {
    marginTop: Spacing.lg,
  },
});
