import { useState } from 'react';
import { mockTopics, mockRecommendations } from '../data/mockData';
import { RecommendationCard } from '../components/RecommendationCard';

interface DiscoverPageProps {
  onRecommendationClick: (id: string) => void;
  onTopicClick: (id: string) => void;
}

export function DiscoverPage({ onRecommendationClick, onTopicClick }: DiscoverPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: '全部' },
    { id: 'chinese', label: '中餐' },
    { id: 'western', label: '西餐' },
    { id: 'japanese', label: '日料' },
    { id: 'korean', label: '韩餐' },
    { id: 'dessert', label: '甜点' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="搜索美食、店铺、用户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          <button className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
            <span>🎲</span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      <section className="px-4 py-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">热门话题</h2>
        <div className="grid grid-cols-2 gap-3">
          {mockTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onTopicClick(topic.id)}
              className="bg-white rounded-2xl p-4 text-left shadow-sm border border-gray-50 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{topic.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{topic.name}</h3>
                  <p className="text-xs text-gray-500">{topic.postCount}篇帖子</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">{topic.description}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">为你推荐</h2>
        <div className="space-y-4">
          {mockRecommendations.slice(0, 3).map((rec) => (
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