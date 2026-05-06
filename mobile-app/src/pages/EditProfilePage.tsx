import { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { mockUser } from '../data/mockData';
import { FLAVOR_PREFERENCES } from '../types';

interface EditProfilePageProps {
  onBack: () => void;
  onSave: () => void;
}

export function EditProfilePage({ onBack, onSave }: EditProfilePageProps) {
  const [nickname, setNickname] = useState(mockUser.nickname);
  const [bio, setBio] = useState(mockUser.bio);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  const toggleFlavor = (flavorId: string) => {
    setSelectedFlavors(prev => 
      prev.includes(flavorId) 
        ? prev.filter(id => id !== flavorId)
        : [...prev, flavorId]
    );
  };

  const handleSave = () => {
    if (!nickname) {
      alert('请输入昵称');
      return;
    }
    onSave();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={onBack}
            className="text-gray-500 font-medium"
          >
            取消
          </button>
          <h1 className="text-lg font-bold text-gray-800">编辑资料</h1>
          <Button onClick={handleSave} size="sm">
            保存
          </Button>
        </div>
      </header>

      <section className="px-4 py-6 space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img 
              src={mockUser.avatar} 
              alt={mockUser.nickname}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm">
              📷
            </button>
          </div>
          <p className="text-sm text-primary-600 mt-2">点击更换头像</p>
        </div>

        <Input
          label="昵称"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="请输入昵称"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            个人简介
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="介绍一下自己吧..."
            rows={3}
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-gray-100 focus:border-primary-400 focus:outline-none transition-all resize-none"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{bio.length}/100</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            口味偏好
          </label>
          <div className="grid grid-cols-3 gap-2">
            {FLAVOR_PREFERENCES.map((flavor) => (
              <button
                key={flavor.id}
                onClick={() => toggleFlavor(flavor.id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  selectedFlavors.includes(flavor.id)
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white border-2 border-gray-100 hover:border-primary-200'
                }`}
              >
                <span className="text-xl">{flavor.icon}</span>
                <span className="text-xs font-medium">{flavor.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-medium text-gray-800">其他信息</h3>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">注册时间</span>
            <span className="text-gray-400">{mockUser.createdAt}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">吃货等级</span>
            <span className="text-primary-600 font-medium">{mockUser.level}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">吃货分</span>
            <span className="text-primary-600 font-medium">{mockUser.foodScore}分</span>
          </div>
        </div>
      </section>
    </div>
  );
}