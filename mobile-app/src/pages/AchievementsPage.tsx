import { useState } from 'react';

interface AchievementsPageProps {
  onBack: () => void;
}

const achievements = [
  { 
    id: '1', 
    name: '初出茅庐', 
    icon: '🌱', 
    description: '发布第一条推荐',
    progress: 1,
    target: 1,
    completed: true,
    reward: '+10吃货分'
  },
  { 
    id: '2', 
    name: '评论达人', 
    icon: '💬', 
    description: '发表10条评论',
    progress: 5,
    target: 10,
    completed: false,
    reward: '+20吃货分'
  },
  { 
    id: '3', 
    name: '收藏家', 
    icon: '📚', 
    description: '收藏5个推荐',
    progress: 2,
    target: 5,
    completed: false,
    reward: '+15吃货分'
  },
  { 
    id: '4', 
    name: '资深吃货', 
    icon: '🏆', 
    description: '获得100吃货分',
    progress: 85,
    target: 100,
    completed: false,
    reward: '+50吃货分'
  },
  { 
    id: '5', 
    name: '火眼金睛', 
    icon: '👁️', 
    description: '发现并标记3个争议评价',
    progress: 0,
    target: 3,
    completed: false,
    reward: '+30吃货分'
  },
  { 
    id: '6', 
    name: '社交达人', 
    icon: '🤝', 
    description: '关注10个用户',
    progress: 8,
    target: 10,
    completed: false,
    reward: '+25吃货分'
  },
];

export function AchievementsPage({ onBack }: AchievementsPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'completed'>('all');

  const filteredAchievements = activeTab === 'completed' 
    ? achievements.filter(a => a.completed)
    : achievements;

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
          <h1 className="text-lg font-bold text-gray-800">我的成就</h1>
          <div className="w-10"></div>
        </div>
        <div className="flex gap-4 px-4 pb-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            全部 ({achievements.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'completed'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            已完成 ({achievements.filter(a => a.completed).length})
          </button>
        </div>
      </header>

      <section className="px-4 py-4">
        <div className="space-y-4">
          {filteredAchievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`bg-white rounded-2xl p-4 shadow-sm ${
                achievement.completed ? 'border-2 border-primary-200' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${
                  achievement.completed ? 'bg-primary-50' : 'bg-gray-50'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800">{achievement.name}</h3>
                    {achievement.completed && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">已完成</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>进度</span>
                      <span>{achievement.progress}/{achievement.target}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          achievement.completed ? 'bg-primary-500' : 'bg-primary-300'
                        }`}
                        style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-primary-600 font-medium">{achievement.reward}</span>
                    {!achievement.completed && (
                      <span className="text-xs text-gray-400">
                        还需 {achievement.target - achievement.progress}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}