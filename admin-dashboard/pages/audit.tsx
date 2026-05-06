import React, { useState } from 'react';
import Layout from '../components/Layout';

const mockPendingItems = [
  { id: '1', type: 'recommendation', title: '老北京炸酱面', author: '吃货小王', created_at: '2024-01-15 10:30' },
  { id: '2', type: 'recommendation', title: '深夜烧烤摊', author: '夜猫子', created_at: '2024-01-13 22:00' },
  { id: '3', type: 'review', title: '差评: 粤式早茶店', author: '茶餐厅', created_at: '2024-01-11 09:00' },
];

const todayStats = {
  pending: 3,
  approved: 12,
  rejected: 2,
  efficiency: '95%',
};

export default function Audit() {
  const [pendingItems, setPendingItems] = useState(mockPendingItems);

  const handleApprove = (id: string) => {
    setPendingItems(prev => prev.filter(item => item.id !== id));
  };

  const handleReject = (id: string) => {
    setPendingItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Layout title="内容审核">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">待审核</p>
              <p className="text-2xl font-bold text-yellow-600">{todayStats.pending}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <span className="text-xl">⏳</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">今日通过</p>
              <p className="text-2xl font-bold text-green-600">{todayStats.approved}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <span className="text-xl">✅</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">今日拒绝</p>
              <p className="text-2xl font-bold text-red-600">{todayStats.rejected}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <span className="text-xl">❌</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">审核效率</p>
              <p className="text-2xl font-bold text-blue-600">{todayStats.efficiency}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">待审核内容</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {pendingItems.map((item) => (
            <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.type === 'recommendation' ? 'bg-orange-100' : 'bg-red-100'}`}>
                    <span>{item.type === 'recommendation' ? '📝' : '⭐'}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">作者: {item.author} · {item.created_at}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    通过
                  </button>
                  <button
                    onClick={() => handleReject(item.id)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                  >
                    拒绝
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {pendingItems.length === 0 && (
          <div className="px-6 py-12 text-center">
            <span className="text-4xl block mb-4">🎉</span>
            <p className="text-gray-500">暂无待审核内容</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
