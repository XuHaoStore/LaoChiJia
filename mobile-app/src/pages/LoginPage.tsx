import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

interface LoginPageProps {
  onLogin: () => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ phone: '', password: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { phone: '', password: '' };

    if (!phone) {
      newErrors.phone = '请输入手机号';
      isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      newErrors.phone = '请输入正确的手机号';
      isValid = false;
    }

    if (!password) {
      newErrors.password = '请输入密码';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = '密码至少6位';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🍜</div>
            <h1 className="text-2xl font-bold text-gray-800">老吃家</h1>
            <p className="text-gray-500 mt-2">发现美食，分享美味</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-200/50">
            <h2 className="text-xl font-bold text-gray-800 mb-6">登录</h2>
            
            <div className="space-y-4">
              <Input
                label="手机号"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                placeholder="请输入手机号"
              />
              
              <Input
                label="密码"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                placeholder="请输入密码"
              />
            </div>

            <div className="flex justify-end mt-2">
              <button className="text-sm text-primary-600 hover:text-primary-700">
                忘记密码？
              </button>
            </div>

            <Button onClick={handleSubmit} className="w-full mt-6">
              登录
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">其他登录方式</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="flex justify-center gap-6 mt-6">
            <button className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors">
              <span className="text-2xl">💚</span>
            </button>
            <button className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
              <span className="text-2xl">💙</span>
            </button>
          </div>

          <p className="text-center text-gray-500 mt-6">
            还没有账号？
            <button 
              onClick={onNavigateToRegister}
              className="text-primary-600 font-medium ml-1 hover:text-primary-700"
            >
              立即注册
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}