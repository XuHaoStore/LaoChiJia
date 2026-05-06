import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User } from '../types';

interface AuthContextType {
  session: Session | null;
  user: SupabaseUser | null;
  userProfile: User | null;
  loading: boolean;
  signIn: (phone: string, password: string) => Promise<void>;
  signUp: (phone: string, password: string, nickname: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查当前会话
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('获取用户信息失败:', error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('获取用户信息异常:', error);
    }
  };

  const signIn = async (phone: string, password: string) => {
    // 注意：这是简化版本，实际项目中可能需要使用短信验证码登录
    const { error } = await supabase.auth.signInWithPassword({
      email: `${phone}@example.com`, // 临时方案，正式项目需要配置短信服务
      password,
    });

    if (error) throw error;
  };

  const signUp = async (phone: string, password: string, nickname: string) => {
    const { data: { user: newUser }, error: signUpError } = await supabase.auth.signUp({
      email: `${phone}@example.com`,
      password,
    });

    if (signUpError) throw signUpError;

    if (newUser) {
      // 创建用户记录
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: newUser.id,
          phone,
          nickname,
          foodie_points: 100,
          status: 'active',
        });

      if (profileError) throw profileError;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userProfile,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
