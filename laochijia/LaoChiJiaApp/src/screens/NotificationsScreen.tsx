import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../constants';
import Text from '../components/Text';

const notificationCategories = [
  { id: 'all', name: '全部', count: 12 },
  { id: 'like', name: '点赞', count: 5 },
  { id: 'review', name: '评论', count: 3 },
  { id: 'follow', name: '关注', count: 4 },
];

const notifications = [
  {
    id: '1',
    type: 'like',
    icon: '❤️',
    title: '美食爱好者 赞了你的推荐',
    content: '"老北京炸酱面"',
    time: '5分钟前',
    read: false,
  },
  {
    id: '2',
    type: 'review',
    icon: '💬',
    title: '火锅达人 评论了你的推荐',
    content: '"确实很好吃！下次还来"',
    time: '12分钟前',
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    icon: '👥',
    title: '美食猎人 关注了你',
    content: '快来看看他的推荐',
    time: '28分钟前',
    read: true,
  },
  {
    id: '4',
    type: 'like',
    icon: '❤️',
    title: '吃货小王 赞了你的评价',
    content: '"川味麻辣火锅"',
    time: '1小时前',
    read: true,
  },
  {
    id: '5',
    type: 'review',
    icon: '💬',
    title: '挑剔食客 评论了你的推荐',
    content: '"味道一般，价格偏贵"',
    time: '2小时前',
    read: true,
  },
  {
    id: '6',
    type: 'system',
    icon: '🔔',
    title: '系统通知',
    content: '你的推荐"深夜烧烤摊"已通过审核',
    time: '3小时前',
    read: true,
  },
];

export default function NotificationsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notifList, setNotifList] = useState(notifications);

  const filteredNotifications = selectedCategory === 'all' 
    ? notifList 
    : notifList.filter(n => n.type === selectedCategory);

  const markAllAsRead = () => {
    setNotifList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" weight="semibold">消息通知</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text variant="caption" color="inverse">全部已读</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {notificationCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.categorySelected,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text variant="caption" color={selectedCategory === category.id ? 'inverse' : 'secondary'}>
                {category.name}
              </Text>
              {category.count > 0 && (
                <View style={styles.categoryBadge}>
                  <Text variant="small" color="inverse">{category.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.notificationsList}>
          {filteredNotifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Text variant="h1">📭</Text>
              <Text variant="body" color="secondary">暂无通知</Text>
            </View>
          ) : (
            filteredNotifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.notificationUnread,
                ]}
                onPress={() => markAsRead(notification.id)}
              >
                <View style={styles.notificationIcon}>
                  <Text>{notification.icon}</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text variant="body" weight="medium">{notification.title}</Text>
                  <Text variant="caption" color="tertiary">{notification.content}</Text>
                </View>
                <View style={styles.notificationTime}>
                  <Text variant="small" color="tertiary">{notification.time}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  categoriesScroll: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
  },
  categorySelected: {
    backgroundColor: Colors.primary,
  },
  categoryBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xs,
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  notificationUnread: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTime: {
    alignItems: 'flex-end',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
});
