import React from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';

const mockStats = [
  { title: '总用户数', value: '12,580', icon: '👥', color: 'orange' as const, trend: '+12%', trendType: 'up' as const },
  { title: '今日推荐', value: '156', icon: '📝', color: 'blue' as const, trend: '+8%', trendType: 'up' as const },
  { title: '总评价数', value: '89,456', icon: '⭐', color: 'green' as const, trend: '+15%', trendType: 'up' as const },
  { title: '活跃用户', value: '3,240', icon: '🔥', color: 'purple' as const, trend: '+5%', trendType: 'up' as const },
];

const weeklyData = [
  { day: '周一', users: 200, recommendations: 35 },
  { day: '周二', users: 250, recommendations: 42 },
  { day: '周三', users: 180, recommendations: 38 },
  { day: '周四', users: 320, recommendations: 55 },
  { day: '周五', users: 450, recommendations: 78 },
  { day: '周六', users: 680, recommendations: 120 },
  { day: '周日', users: 520, recommendations: 95 },
];

const flavorDistribution = [
  { name: '麻辣', percentage: 35, color: 'bg-red-500' },
  { name: '清淡', percentage: 25, color: 'bg-green-500' },
  { name: '火锅', percentage: 20, color: 'bg-orange-500' },
  { name: '日料', percentage: 12, color: 'bg-blue-500' },
  { name: '其他', percentage: 8, color: 'bg-gray-500' },
];

const recentActivities = [
  { id: 1, type: 'register', user: '吃货小王', time: '2分钟前', action: '注册了账号' },
  { id: 2, type: 'post', user: '美食达人', time: '5分钟前', action: '发布了推荐「老北京炸酱面」' },
  { id: 3, type: 'review', user: '火锅控', time: '8分钟前', action: '发表了评价「川味麻辣火锅」' },
  { id: 4, type: 'points', user: '老吃家', time: '12分钟前', action: '获得了20吃货分奖励' },
  { id: 5, type: 'register', user: '新用户', time: '15分钟前', action: '注册了账号' },
];

export default function Dashboard() {
  const maxUsers = Math.max(...weeklyData.map(d => d.users));
  const maxRecommendations = Math.max(...weeklyData.map(d => d.recommendations));

  return (
    <Layout title="数据概览">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">用户增长趋势</h3>
          <div className="space-y-4">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="w-12 text-sm text-gray-600">{data.day}</span>
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">新增用户</span>
                      <span className="text-xs font-medium">{data.users}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                        style={{ width: `${(data.users / maxUsers) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">新增推荐</span>
                      <span className="text-xs font-medium">{data.recommendations}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all"
                        style={{ width: `${(data.recommendations / maxRecommendations) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">口味分布统计</h3>
          <div className="space-y-4">
            {flavorDistribution.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">最新动态</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <span>
                  {activity.type === 'register' && '👤'}
                  {activity.type === 'post' && '📝'}
                  {activity.type === 'review' && '⭐'}
                  {activity.type === 'points' && '🏆'}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium text-gray-800">{activity.user}</span>
                  <span className="text-gray-500"> {activity.action}</span>
                </p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
