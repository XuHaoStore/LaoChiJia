import { useState } from 'react';
import { Button } from '../components/Button';

interface SettingsPageProps {
  onBack: () => void;
  onLogout: () => void;
}

type SettingItem = {
  icon: string;
  label: string;
  value?: string;
  type?: 'toggle';
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
};

export function SettingsPage({ onBack, onLogout }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingsGroups: { title: string; items: SettingItem[] }[] = [
    {
      title: '账号设置',
      items: [
        { icon: '👤', label: '编辑资料', value: '' },
        { icon: '🔒', label: '修改密码', value: '' },
        { icon: '📱', label: '绑定手机', value: '138****8000' },
      ]
    },
    {
      title: '偏好设置',
      items: [
        { 
          icon: '🔔', 
          label: '消息通知', 
          type: 'toggle',
          toggleValue: notifications,
          onToggleChange: setNotifications
        },
        { 
          icon: '🔊', 
          label: '音效', 
          type: 'toggle',
          toggleValue: soundEffects,
          onToggleChange: setSoundEffects
        },
        { 
          icon: '🌙', 
          label: '深色模式', 
          type: 'toggle',
          toggleValue: darkMode,
          onToggleChange: setDarkMode
        },
      ]
    },
    {
      title: '隐私与安全',
      items: [
        { icon: '🔐', label: '隐私设置', value: '' },
        { icon: '🛡️', label: '账号安全', value: '' },
        { icon: '📋', label: '授权管理', value: '' },
      ]
    },
    {
      title: '其他',
      items: [
        { icon: '📖', label: '用户协议', value: '' },
        { icon: '🔒', label: '隐私政策', value: '' },
        { icon: 'ℹ️', label: '关于我们', value: 'v1.0.0' },
        { icon: '🧹', label: '清理缓存', value: '12.5MB' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg"
          >
            ←
          </button>
          <h1 className="text-lg font-bold text-gray-800">设置</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <section className="px-4 py-4 space-y-4">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-500">{group.title}</h3>
            </div>
            {group.items.map((item, itemIndex) => (
              <div 
                key={itemIndex}
                className={`px-4 py-4 flex items-center justify-between ${
                  itemIndex !== group.items.length - 1 ? 'border-b border-gray-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-gray-800">{item.label}</span>
                </div>
                {item.type === 'toggle' ? (
                  <button
                    onClick={() => item.onToggleChange?.(!item.toggleValue)}
                    className={`w-12 h-7 rounded-full transition-all relative ${
                      item.toggleValue ? 'bg-primary-500' : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${
                        item.toggleValue ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    {item.value && (
                      <span className="text-gray-400 text-sm">{item.value}</span>
                    )}
                    <span className="text-gray-300">›</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full border-red-300 text-red-500 hover:bg-red-50"
            onClick={onLogout}
          >
            退出登录
          </Button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          老吃家 v1.0.0 © 2024 保留所有权利
        </p>
      </section>
    </div>
  );
}