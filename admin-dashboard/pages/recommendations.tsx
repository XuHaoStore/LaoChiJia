import React, { useState } from 'react';
import Layout from '../components/Layout';

const mockRecommendations = [
  { id: '1', shop_name: '老北京炸酱面', author: '吃货小王', rating: 4.9, status: 'approved', views: 2567, likes: 356, created_at: '2024-01-15' },
  { id: '2', shop_name: '川味麻辣火锅', author: '美食达人', rating: 5.0, status: 'approved', views: 4521, likes: 678, created_at: '2024-01-14' },
  { id: '3', shop_name: '深夜烧烤摊', author: '夜猫子', rating: 4.7, status: 'pending', views: 1890, likes: 234, created_at: '2024-01-13' },
  { id: '4', shop_name: '日式料理屋', author: '寿司控', rating: 4.8, status: 'approved', views: 3120, likes: 445, created_at: '2024-01-12' },
  { id: '5', shop_name: '粤式早茶店', author: '茶餐厅', rating: 4.6, status: 'rejected', views: 1980, likes: 278, created_at: '2024-01-11' },
];

const statusMap = {
  approved: { label: '已发布', class: 'status-approved' },
  pending: { label: '待审核', class: 'status-pending' },
  rejected: { label: '已拒绝', class: 'status-rejected' },
};

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesStatus = filterStatus === 'all' || rec.status === filterStatus;
    const matchesSearch = rec.shop_name.includes(searchQuery) || rec.author.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    setRecommendations(prev => prev.map(rec =>
      rec.id === id ? { ...rec, status: newStatus as 'approved' | 'pending' | 'rejected' } : rec
    ));
  };

  return (
    <Layout title="内容管理">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="搜索店铺名称或作者"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterStatus === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            全部
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterStatus === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            待审核
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterStatus === 'approved' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            已发布
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterStatus === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            已拒绝
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.map((rec) => (
          <div key={rec.id} className="bg-white rounded-xl p-6 shadow-sm card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <span className="text-2xl">🍜</span>
              </div>
              <span className={`status-badge ${statusMap[rec.status as keyof typeof statusMap].class}`}>
                {statusMap[rec.status as keyof typeof statusMap].label}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{rec.shop_name}</h3>
            <p className="text-sm text-gray-500 mb-4">作者: {rec.author}</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span className="font-medium">{rec.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>👁️</span>
                <span className="text-sm text-gray-500">{rec.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>❤️</span>
                <span className="text-sm text-gray-500">{rec.likes}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {rec.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusChange(rec.id, 'approved')}
                    className="flex-1 btn-primary text-sm"
                  >
                    通过
                  </button>
                  <button
                    onClick={() => handleStatusChange(rec.id, 'rejected')}
                    className="flex-1 btn-secondary text-sm"
                  >
                    拒绝
                  </button>
                </>
              )}
              {rec.status !== 'pending' && (
                <>
                  <button className="flex-1 btn-outline text-sm">查看详情</button>
                  <button className="flex-1 btn-secondary text-sm">删除</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">上一页</button>
        <span className="px-4 py-2 bg-gray-200 rounded-lg font-medium">1</span>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">下一页</button>
      </div>
    </Layout>
  );
}
