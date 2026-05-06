import { mockTopics, mockRecommendations } from '../data/mockData';
import { RecommendationCard } from '../components/RecommendationCard';
import { Button } from '../components/Button';

interface TopicDetailPageProps {
  topicId: string;
  onBack: () => void;
  onRecommendationClick: (id: string) => void;
}

export function TopicDetailPage({ topicId, onBack, onRecommendationClick }: TopicDetailPageProps) {
  const topic = mockTopics.find(t => t.id === topicId);
  const topicRecommendations = mockRecommendations.filter(r => 
    r.tags.some(tag => tag.includes(topic?.name || '')) || Math.random() > 0.5
  ).slice(0, 3);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">话题不存在</p>
      </div>
    );
  }

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
          <h1 className="text-lg font-bold text-gray-800">话题详情</h1>
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            🔗
          </button>
        </div>
      </header>

      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
            {topic.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{topic.name}</h2>
            <p className="text-white/80 text-sm mt-1">{topic.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-4">
          <div className="text-center">
            <p className="text-xl font-bold">{topic.postCount}</p>
            <p className="text-xs text-white/70">帖子</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{topic.followerCount}</p>
            <p className="text-xs text-white/70">关注者</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <Button className="flex-1 bg-white text-primary-600 hover:bg-gray-100">
            立即关注
          </Button>
          <Button variant="secondary" className="flex-1 border-white text-white hover:bg-white/20">
            🔔 通知
          </Button>
        </div>
      </div>

      <section className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">相关推荐</h3>
          <button className="text-sm text-primary-600">查看更多</button>
        </div>
        <div className="space-y-4">
          {topicRecommendations.map((rec) => (
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