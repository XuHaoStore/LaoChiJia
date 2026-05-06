import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../constants';
import { useAuth } from '../context/AuthContext';
import Text from '../components/Text';
import Button from '../components/Button';

const settingGroups = [
  {
    title: '账号设置',
    items: [
      { id: 'profile', icon: '👤', label: '编辑资料', description: '修改昵称、头像等' },
      { id: 'password', icon: '🔒', label: '修改密码', description: '更改登录密码' },
      { id: 'phone', icon: '📱', label: '绑定手机', description: '绑定手机号' },
    ],
  },
  {
    title: '通知设置',
    items: [
      { id: 'push', icon: '🔔', label: '推送通知', description: '接收消息推送', type: 'switch', default: true },
      { id: 'like', icon: '❤️', label: '点赞通知', description: '有人赞了我的内容', type: 'switch', default: true },
      { id: 'comment', icon: '💬', label: '评论通知', description: '有人评论了我的内容', type: 'switch', default: true },
      { id: 'follow', icon: '👥', label: '关注通知', description: '有人关注了我', type: 'switch', default: true },
    ],
  },
  {
    title: '通用设置',
    items: [
      { id: 'language', icon: '🌐', label: '语言', description: '简体中文' },
      { id: 'theme', icon: '🎨', label: '主题', description: '默认主题' },
    ],
  },
];

const aboutItems = [
  { id: 'help', icon: '❓', label: '帮助中心', description: '常见问题解答' },
  { id: 'feedback', icon: '💡', label: '意见反馈', description: '帮助我们改进' },
  { id: 'privacy', icon: '🔐', label: '隐私政策', description: '查看隐私条款' },
  { id: 'terms', icon: '📄', label: '用户协议', description: '查看用户协议' },
];

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const [switches, setSwitches] = useState({
    push: true,
    like: true,
    comment: true,
    follow: true,
  });

  const toggleSwitch = (id: string) => {
    setSwitches(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSignOut = async () => {
    Alert.alert(
      '确认退出',
      '确定要退出登录吗？',
      [
        { text: '取消', style: 'cancel' },
        { text: '确定', onPress: async () => await signOut() },
      ]
    );
  };

  const handleSettingPress = (id: string) => {
    Alert.alert('提示', `即将跳转到${id}设置页面`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" weight="semibold">设置</Text>
        <Text variant="body" color="secondary">管理你的账号和偏好</Text>
      </View>

      <View style={styles.content}>
        {settingGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingGroup}>
            <Text variant="caption" color="tertiary" style={styles.groupTitle}>
              {group.title}
            </Text>
            {group.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.settingItem}
                onPress={() => item.type !== 'switch' && handleSettingPress(item.id)}
              >
                <View style={styles.settingIcon}>
                  <Text>{item.icon}</Text>
                </View>
                <View style={styles.settingContent}>
                  <Text variant="body" weight="medium">{item.label}</Text>
                  <Text variant="caption" color="tertiary">{item.description}</Text>
                </View>
                {item.type === 'switch' ? (
                  <Switch
                    value={switches[item.id as keyof typeof switches]}
                    onValueChange={() => toggleSwitch(item.id)}
                    trackColor={{ false: Colors.border, true: Colors.primary }}
                    thumbColor={Colors.text.inverse}
                  />
                ) : (
                  <Text variant="body" color="tertiary">›</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.settingGroup}>
          <Text variant="caption" color="tertiary" style={styles.groupTitle}>
            关于
          </Text>
          {aboutItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.settingItem}
              onPress={() => handleSettingPress(item.id)}
            >
              <View style={styles.settingIcon}>
                <Text>{item.icon}</Text>
              </View>
              <View style={styles.settingContent}>
                <Text variant="body" weight="medium">{item.label}</Text>
                <Text variant="caption" color="tertiary">{item.description}</Text>
              </View>
              <Text variant="body" color="tertiary">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.versionInfo}>
          <Text variant="caption" color="tertiary">老吃家 v1.0.0</Text>
          <Text variant="caption" color="tertiary">© 2024 老吃家团队</Text>
        </View>

        <Button
          title="退出登录"
          variant="outline"
          onPress={handleSignOut}
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
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  settingGroup: {
    marginBottom: Spacing.xl,
  },
  groupTitle: {
    marginBottom: Spacing.sm,
    paddingLeft: Spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: {
    flex: 1,
  },
  versionInfo: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  signOutButton: {
    marginTop: Spacing.lg,
  },
});
