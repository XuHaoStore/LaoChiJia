import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Colors, Spacing } from '../constants';
import { useAuth } from '../context/AuthContext';
import Text from '../components/Text';
import Button from '../components/Button';
import Input from '../components/Input';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { signUp } = useAuth();
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    phone?: string;
    nickname?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    
    if (!phone) {
      newErrors.phone = '请输入手机号';
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      newErrors.phone = '请输入正确的手机号';
    }

    if (!nickname) {
      newErrors.nickname = '请输入昵称';
    } else if (nickname.length < 2) {
      newErrors.nickname = '昵称至少 2 个字符';
    }

    if (!password) {
      newErrors.password = '请输入密码';
    } else if (password.length < 6) {
      newErrors.password = '密码至少 6 位';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await signUp(phone, password, nickname);
      navigation.replace('Main');
    } catch (error) {
      console.error('注册失败:', error);
      setErrors({ phone: '手机号已注册' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="h1">创建账号</Text>
          <Text variant="body" color="secondary" style={styles.subtitle}>
            加入老吃家，开启美食之旅
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="手机号"
            placeholder="请输入手机号"
            value={phone}
            onChangeText={setPhone}
            error={errors.phone}
            keyboardType="phone-pad"
            maxLength={11}
          />
          <Input
            label="昵称"
            placeholder="请输入昵称"
            value={nickname}
            onChangeText={setNickname}
            error={errors.nickname}
          />
          <Input
            label="密码"
            placeholder="请输入密码（至少 6 位）"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry
          />
          <Input
            label="确认密码"
            placeholder="请再次输入密码"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={errors.confirmPassword}
            secureTextEntry
          />

          <View style={styles.agreementContainer}>
            <TouchableOpacity style={styles.checkbox}>
              <Text>✓</Text>
            </TouchableOpacity>
            <Text variant="caption" color="secondary">
              我已阅读并同意
            </Text>
            <TouchableOpacity>
              <Text variant="caption" color="primary">
                用户协议
              </Text>
            </TouchableOpacity>
            <Text variant="caption" color="secondary">
              和
            </Text>
            <TouchableOpacity>
              <Text variant="caption" color="primary">
                隐私政策
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            title="注册"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />
        </View>

        <View style={styles.footer}>
          <Text variant="body" color="secondary">
            已有账号？{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text variant="body" color="primary" weight="semibold">
              立即登录
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  header: {
    marginBottom: Spacing.xl,
  },
  subtitle: {
    marginTop: Spacing.sm,
  },
  form: {
    marginBottom: Spacing.xl,
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: Spacing.lg,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 4,
    marginRight: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    marginTop: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
