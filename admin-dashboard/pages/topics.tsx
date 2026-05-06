import React, { useState } from 'react';
import Layout from '../components/Layout';

const mockTopics = [
  { id: '1', name: '#北京美食', description: '老北京人都爱吃的地道美食', views: 102000, posts: 156, is_active: true },
  { id: '2', name: '#周末聚餐', description: '周末去哪吃？推荐合集', views: 85000, posts: 89, is_active: true },
  { id: '3', name: '#深夜食堂', description: '深夜美食推荐', views: 63000, posts: 67, is_active: true },
  { id: '4', name: '#减脂餐', description: '健康美味两不误', views: 48000, posts: 45, is_active: true },
  { id: '5', name: '#探店日记', description: '记录每一次美食探索', views: 32000, posts: 32, is_active: false },
];

export default function Topics() {
  const [topics, setTopics] = useState(mockTopics);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleToggleStatus = (id: string) => {
    setTopics(prev => prev.map(topic =>
      topic.id === id ? { ...topic, is_active: !topic.is_active } : topic
    ));
  };

  return (
    <Layout title="话题管理">
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-500">
          管理平台热门话题，设置话题状态
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          创建话题
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div key={topic.id} className="bg-white rounded-xl p-6 shadow-sm card-hover">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-800">{topic.name}</h3>
              <span className={`status-badge ${topic.is_active ? 'status-active' : 'status-banned'}`}>
                {topic.is_active ? '活跃' : '已禁用'}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">{topic.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <div>
                <p className="text-lg font-bold text-gray-800">{(topic.views / 1000).toFixed(1)}k</p>
                <p className="text-xs text-gray-500">浏览量</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">{topic.posts}</p>
                <p className="text-xs text-gray-500">文章数</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 btn-outline text-sm">编辑</button>
              <button
                onClick={() => handleToggleStatus(topic.id)}
                className={`flex-1 text-sm py-2 rounded-lg font-medium transition-colors ${topic.is_active ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
              >
                {topic.is_active ? '禁用' : '启用'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">创建新话题</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="话题名称（带#号）"
                className="input-field"
              />
              <textarea
                placeholder="话题描述"
                rows={3}
                className="input-field"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 btn-secondary"
                >
                  取消
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 btn-primary"
                >
                  创建
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
