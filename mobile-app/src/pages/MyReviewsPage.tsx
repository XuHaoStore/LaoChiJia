import { mockReviews, mockRecommendations } from '../data/mockData';
import { RatingStars } from '../components/RatingStars';

interface MyReviewsPageProps {
  onBack: () => void;
  onRecommendationClick: (id: string) => void;
}

export function MyReviewsPage({ onBack, onRecommendationClick }: MyReviewsPageProps) {
  const myReviews = mockReviews;

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
          <h1 className="text-lg font-bold text-gray-800">我的评论</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <section className="px-4 py-4">
        <div className="space-y-4">
          {myReviews.length > 0 ? (
            myReviews.map((review) => {
              const recommendation = mockRecommendations.find(r => r.id === review.recommendationId);
              return (
                <div 
                  key={review.id}
                  className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
                  onClick={() => onRecommendationClick(review.recommendationId)}
                >
                  {recommendation && (
                    <div className="flex gap-3 mb-3">
                      <img 
                        src={recommendation.imageUrl} 
                        alt={recommendation.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 line-clamp-1">{recommendation.title}</h3>
                        <p className="text-sm text-gray-500">{recommendation.shopName}</p>
                      </div>
                    </div>
                  )}
                  <RatingStars rating={review.rating} size="sm" />
                  <p className="text-gray-700 mt-2 leading-relaxed">{review.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">{review.createdAt}</span>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <span>👍</span>
                        <span className="text-sm">{review.helpfulCount}</span>
                      </button>
                      <button className="text-gray-500 hover:text-red-500 transition-colors">删除</button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-gray-500 text-center">暂无评论记录</p>
              <p className="text-gray-400 text-sm mt-2">看完推荐后写下你的评价吧</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}