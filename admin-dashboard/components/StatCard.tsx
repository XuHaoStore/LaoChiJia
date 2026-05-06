import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'orange' | 'blue' | 'green' | 'purple';
  trend?: string;
  trendType?: 'up' | 'down';
}

const colorMap = {
  orange: 'from-orange-400 to-orange-600',
  blue: 'from-blue-400 to-blue-600',
  green: 'from-green-400 to-green-600',
  purple: 'from-purple-400 to-purple-600',
};

export default function StatCard({ title, value, icon, color, trend, trendType }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm card-hover transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trendType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trendType === 'up' ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}
