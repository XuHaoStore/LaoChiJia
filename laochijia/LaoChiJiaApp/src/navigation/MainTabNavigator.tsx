import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { MainTabParamList } from '../types';
import { Colors } from '../constants';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import PostTabScreen from '../screens/PostTabScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MyProfileScreen from '../screens/MyProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({ name, focused, color, size }: { name: string; focused: boolean; color: string; size: number }) {
  const icons: Record<string, string> = {
    Home: focused ? '🏠' : '🏡',
    Discover: focused ? '🔍' : '📱',
    Post: focused ? '➕' : '✏️',
    Messages: focused ? '💬' : '📨',
    MyProfile: focused ? '👤' : '🧑',
  };

  return (
    <View style={styles.iconContainer}>
      <Text style={{ fontSize: size, color }}>{icons[name] || '🏠'}</Text>
    </View>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.tertiary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: (props) => <TabIcon name="Home" {...props} />,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarLabel: '发现',
          tabBarIcon: (props) => <TabIcon name="Discover" {...props} />,
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostTabScreen}
        options={{
          tabBarLabel: '发布',
          tabBarIcon: (props) => <TabIcon name="Post" {...props} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: '消息',
          tabBarIcon: (props) => <TabIcon name="Messages" {...props} />,
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: (props) => <TabIcon name="MyProfile" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
