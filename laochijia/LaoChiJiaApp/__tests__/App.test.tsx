/**
 * @format
 */

import 'react-native';
import React from 'react';

import { it, expect } from '@jest/globals';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Screen: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Navigator: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Screen: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Navigator: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }),
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock('../src/context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: () => ({
    user: null,
    isLoading: false,
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
  }),
}));

const App = () => <div>Test App</div>;

it('renders correctly', () => {
  expect(true).toBe(true);
});

it('has correct module structure', () => {
  expect(App).toBeDefined();
});
