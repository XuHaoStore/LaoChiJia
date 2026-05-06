import { mockRecommendations } from '../data/mockData';
import { RecommendationCard } from '../components/RecommendationCard';

interface FavoritesPageProps {
  onBack: () => void;
  onRecommendationClick: (id: string) => void;
}

export function FavoritesPage({ onBack, onRecommendationClick }: FavoritesPageProps) {
  const favoriteRecommendations = mockRecommendations.filter(r => r.id === '1' || r.id === '2');

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
          <h1 className="text-lg font-bold text-gray-800">我的收藏</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <section className="px-4 py-4">
        <div className="space-y-4">
          {favoriteRecommendations.length > 0 ? (
            favoriteRecommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                onClick={() => onRecommendationClick(rec.id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-6xl mb-4">💫</div>
              <p className="text-gray-500 text-center">暂无收藏内容</p>
              <p className="text-gray-400 text-sm mt-2">去发现页看看有什么好吃的吧</p>
              <button 
                onClick={onBack}
                className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-full text-sm font-medium"
              >
                去发现
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}