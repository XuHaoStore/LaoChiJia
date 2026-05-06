import React, { useState } from 'react';
import Link from 'next/link';

const menuItems = [
  { id: 'dashboard', label: '数据概览', icon: '📊', href: '/' },
  { id: 'users', label: '用户管理', icon: '👥', href: '/users' },
  { id: 'recommendations', label: '内容管理', icon: '📝', href: '/recommendations' },
  { id: 'reviews', label: '评论管理', icon: '💬', href: '/reviews' },
  { id: 'topics', label: '话题管理', icon: '🏷️', href: '/topics' },
  { id: 'settings', label: '系统设置', icon: '⚙️', href: '/settings' },
  { id: 'audit', label: '内容审核', icon: '✅', href: '/audit' },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <aside className="sidebar w-64 flex flex-col text-white">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
            <span className="text-xl">🍜</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">老吃家</h1>
            <p className="text-xs text-gray-400">管理后台</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={() => setActiveItem(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeItem === item.id
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <span>👤</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">管理员</p>
            <p className="text-xs text-gray-400">admin@laochijia.com</p>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <span>🚪</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
