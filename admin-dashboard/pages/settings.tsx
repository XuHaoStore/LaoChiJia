import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function Settings() {
  const [settings, setSettings] = useState({
    initial_points: 100,
    post_cost: 10,
    review_cost: 5,
    quality_reward: 20,
    malicious_penalty: 50,
    rating_1: '拉完了',
    rating_2: 'NPC',
    rating_3: '人上人',
    rating_4: '顶级',
    rating_5: '夯爆了',
  });

  const handleSave = () => {
    alert('设置已保存！');
  };

  return (
    <Layout title="系统设置">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">基本参数设置</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">新用户初始吃货分</label>
              <input
                type="number"
                value={settings.initial_points}
                onChange={(e) => setSettings(prev => ({ ...prev, initial_points: parseInt(e.target.value) || 0 }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">发布推荐消耗分数</label>
              <input
                type="number"
                value={settings.post_cost}
                onChange={(e) => setSettings(prev => ({ ...prev, post_cost: parseInt(e.target.value) || 0 }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">发表评价消耗分数</label>
              <input
                type="number"
                value={settings.review_cost}
                onChange={(e) => setSettings(prev => ({ ...prev, review_cost: parseInt(e.target.value) || 0 }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">优质推荐奖励分数</label>
              <input
                type="number"
                value={settings.quality_reward}
                onChange={(e) => setSettings(prev => ({ ...prev, quality_reward: parseInt(e.target.value) || 0 }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">恶意评价扣除分数</label>
              <input
                type="number"
                value={settings.malicious_penalty}
                onChange={(e) => setSettings(prev => ({ ...prev, malicious_penalty: parseInt(e.target.value) || 0 }))}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">评分文案配置</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12">
                <span className="text-2xl">★☆☆☆☆</span>
              </div>
              <input
                type="text"
                value={settings.rating_1}
                onChange={(e) => setSettings(prev => ({ ...prev, rating_1: e.target.value }))}
                className="flex-1 input-field"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12">
                <span className="text-2xl">★★☆☆☆</span>
              </div>
              <input
                type="text"
                value={settings.rating_2}
                onChange={(e) => setSettings(prev => ({ ...prev, rating_2: e.target.value }))}
                className="flex-1 input-field"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12">
                <span className="text-2xl">★★★☆☆</span>
              </div>
              <input
                type="text"
                value={settings.rating_3}
                onChange={(e) => setSettings(prev => ({ ...prev, rating_3: e.target.value }))}
                className="flex-1 input-field"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12">
                <span className="text-2xl">★★★★☆</span>
              </div>
              <input
                type="text"
                value={settings.rating_4}
                onChange={(e) => setSettings(prev => ({ ...prev, rating_4: e.target.value }))}
                className="flex-1 input-field"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12">
                <span className="text-2xl">★★★★★</span>
              </div>
              <input
                type="text"
                value={settings.rating_5}
                onChange={(e) => setSettings(prev => ({ ...prev, rating_5: e.target.value }))}
                className="flex-1 input-field"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button className="btn-secondary">重置</button>
        <button onClick={handleSave} className="btn-primary">保存设置</button>
      </div>
    </Layout>
  );
}
