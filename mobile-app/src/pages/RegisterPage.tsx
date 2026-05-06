import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { FLAVOR_PREFERENCES } from '../types';

interface RegisterPageProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin }: RegisterPageProps) {
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [errors, setErrors] = useState({ nickname: '', phone: '', password: '', confirmPassword: '' });

  const toggleFlavor = (flavorId: string) => {
    setSelectedFlavors(prev => 
      prev.includes(flavorId) 
        ? prev.filter(id => id !== flavorId)
        : [...prev, flavorId]
    );
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { nickname: '', phone: '', password: '', confirmPassword: '' };

    if (!nickname) {
      newErrors.nickname = '请输入昵称';
      isValid = false;
    } else if (nickname.length < 2) {
      newErrors.nickname = '昵称至少2个字符';
      isValid = false;
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onRegister();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🍜</div>
            <h1 className="text-2xl font-bold text-gray-800">老吃家</h1>
            <p className="text-gray-500 mt-2">发现美食，分享美味</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-200/50 max-h-[70vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">注册</h2>
            
            <div className="space-y-4">
              <Input
                label="昵称"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                error={errors.nickname}
                placeholder="请输入昵称"
              />
              
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
              
              <Input
                label="确认密码"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                placeholder="请再次输入密码"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  口味偏好（选填）
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {FLAVOR_PREFERENCES.map((flavor) => (
                    <button
                      key={flavor.id}
                      onClick={() => toggleFlavor(flavor.id)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
                        selectedFlavors.includes(flavor.id)
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-50 border border-gray-200 hover:border-primary-200'
                      }`}
                    >
                      <span className="text-lg">{flavor.icon}</span>
                      <span className="text-xs">{flavor.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full mt-6">
              注册
            </Button>
          </div>

          <p className="text-center text-gray-500 mt-6">
            已有账号？
            <button 
              onClick={onNavigateToLogin}
              className="text-primary-600 font-medium ml-1 hover:text-primary-700"
            >
              立即登录
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}