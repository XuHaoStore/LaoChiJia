import React, { useState } from 'react';
import Layout from '../components/Layout';

const mockUsers = [
  { id: '1', nickname: '吃货小王', phone: '138****1234', points: 580, status: 'active', recommendations: 12, reviews: 28, created_at: '2024-01-01' },
  { id: '2', nickname: '美食达人', phone: '139****5678', points: 1200, status: 'active', recommendations: 25, reviews: 45, created_at: '2023-12-15' },
  { id: '3', nickname: '火锅控', phone: '137****9012', points: 890, status: 'active', recommendations: 18, reviews: 32, created_at: '2024-01-05' },
  { id: '4', nickname: '挑剔食客', phone: '136****3456', points: 150, status: 'active', recommendations: 3, reviews: 15, created_at: '2024-01-10' },
  { id: '5', nickname: '老吃家', phone: '135****7890', points: 2000, status: 'active', recommendations: 45, reviews: 89, created_at: '2023-11-01' },
  { id: '6', nickname: '新用户', phone: '134****2345', points: 100, status: 'pending', recommendations: 0, reviews: 0, created_at: '2024-01-15' },
];

const statusMap = {
  active: { label: '正常', class: 'status-active' },
  pending: { label: '待激活', class: 'status-pending' },
  banned: { label: '已禁用', class: 'status-banned' },
};

export default function Users() {
  const [users, setUsers] = useState(mockUsers);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesSearch = user.nickname.includes(searchQuery) || user.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleToggleStatus = (id: string) => {
    setUsers(prev => prev.map(user =>
      user.id === id ? { ...user, status: user.status === 'active' ? 'banned' : 'active' } : user
    ));
  };

  return (
    <Layout title="用户管理">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="搜索用户昵称或手机号"
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
            onClick={() => setFilterStatus('active')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterStatus === 'active' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            正常
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterStatus === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            待激活
          </button>
          <button
            onClick={() => setFilterStatus('banned')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterStatus === 'banned' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            已禁用
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户信息</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">吃货分</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">推荐数</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">评价数</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">注册时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="table-row">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span>👤</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.nickname}</p>
                      <p className="text-sm text-gray-500">{user.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    {user.points}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-800">{user.recommendations}</td>
                <td className="px-6 py-4 text-gray-800">{user.reviews}</td>
                <td className="px-6 py-4">
                  <span className={`status-badge ${statusMap[user.status as keyof typeof statusMap].class}`}>
                    {statusMap[user.status as keyof typeof statusMap].label}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{user.created_at}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">编辑</button>
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`text-sm font-medium ${user.status === 'active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
                    >
                      {user.status === 'active' ? '禁用' : '启用'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
          <span className="text-sm text-gray-500">共 {filteredUsers.length} 条记录</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded">上一页</button>
            <span className="px-3 py-1 text-sm font-medium bg-gray-200 rounded">1</span>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded">下一页</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
