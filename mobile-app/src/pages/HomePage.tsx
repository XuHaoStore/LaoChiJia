import { useState } from 'react';
import { RecommendationCard } from '../components/RecommendationCard';
import { mockRecommendations, mockTopics, mockUser } from '../data/mockData';

interface HomePageProps {
  onRecommendationClick: (id: string) => void;
}

export function HomePage({ onRecommendationClick }: HomePageProps) {
  const [activeTab, setActiveTab] = useState('recommendations');

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      <header className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">老吃家</h1>
              <p className="text-sm text-gray-500">发现美食，分享美味</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <span>🔍</span>
              </button>
              <button className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center relative">
                <span>🔔</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">今日吃货分</p>
                <p className="text-2xl font-bold">{mockUser.foodScore}分</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">🏆</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {mockTopics.map((topic) => (
            <button
              key={topic.id}
              className="flex flex-col items-center gap-1 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-50 min-w-[80px] hover:shadow-md transition-shadow"
            >
              <span className="text-2xl">{topic.icon}</span>
              <span className="text-sm font-medium text-gray-700">{topic.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              推荐
            </button>
            <button
              onClick={() => setActiveTab('hot')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'hot'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              热门
            </button>
            <button
              onClick={() => setActiveTab('latest')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'latest'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              最新
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {mockRecommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              onClick={() => onRecommendationClick(rec.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}