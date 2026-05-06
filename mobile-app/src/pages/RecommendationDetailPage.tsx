import { useState } from 'react';
import { mockRecommendations, mockReviews, mockUser } from '../data/mockData';
import { RatingStars } from '../components/RatingStars';
import { Button } from '../components/Button';
import { TextArea } from '../components/TextArea';

interface RecommendationDetailPageProps {
  recommendationId: string;
  onBack: () => void;
}

export function RecommendationDetailPage({ recommendationId, onBack }: RecommendationDetailPageProps) {
  const recommendation = mockRecommendations.find(r => r.id === recommendationId);
  const reviews = mockReviews.filter(r => r.recommendationId === recommendationId);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">推荐内容不存在</p>
      </div>
    );
  }

  const handleSubmitReview = () => {
    if (!reviewContent || reviewRating === 0) {
      alert('请填写完整评价信息');
      return;
    }
    alert('评价发布成功！');
    setReviewContent('');
    setReviewRating(0);
  };

  const getPriceText = (level: number) => {
    switch (level) {
      case 1: return '人均50以下';
      case 2: return '人均50-100';
      case 3: return '人均100-200';
      case 4: return '人均200-500';
      case 5: return '人均500以上';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              ⚙️
            </button>
          </div>
        </div>
      </header>

      <div className="pt-16">
        <div className="relative aspect-[4/3]">
          <img 
            src={recommendation.imageUrl} 
            alt={recommendation.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">{recommendation.title}</h1>
                <p className="text-sm opacity-80">{recommendation.shopName}</p>
              </div>
              <div className="bg-white/20 rounded-full px-3 py-1">
                <RatingStars rating={recommendation.rating} size="sm" />
              </div>
            </div>
          </div>
        </div>

        <section className="px-4 py-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={recommendation.author.avatar} 
                alt={recommendation.author.nickname}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-800">{recommendation.author.nickname}</p>
                <p className="text-xs text-gray-500">{recommendation.author.level}</p>
              </div>
              <div className="ml-auto">
                <Button variant="secondary" size="sm">
                  + 关注
                </Button>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{recommendation.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {recommendation.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-4">店铺信息</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">🏪</span>
                <div>
                  <p className="text-sm text-gray-500">店铺名称</p>
                  <p className="font-medium text-gray-800">{recommendation.shopName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="text-sm text-gray-500">地址</p>
                  <p className="font-medium text-gray-800">{recommendation.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">💰</span>
                <div>
                  <p className="text-sm text-gray-500">人均消费</p>
                  <p className="font-medium text-gray-800">{getPriceText(recommendation.priceLevel)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">评论 ({recommendation.reviewCount})</h2>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={mockUser.avatar} 
                alt={mockUser.nickname}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <TextArea
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="分享你的用餐体验..."
                  rows={2}
                  className="border-none p-0 rounded-none focus:ring-0"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">评分</p>
                <RatingStars 
                  rating={reviewRating} 
                  interactive 
                  onChange={setReviewRating}
                  size="md"
                />
              </div>
              <Button onClick={handleSubmitReview} size="sm">
                发布评论
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={review.author.avatar} 
                    alt={review.author.nickname}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{review.author.nickname}</p>
                    <p className="text-xs text-gray-500">{review.createdAt}</p>
                  </div>
                  {review.disputed && (
                    <span className="ml-auto px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full">
                      争议
                    </span>
                  )}
                </div>
                <RatingStars rating={review.rating} size="sm" showLabel />
                <p className="text-gray-700 mt-2">{review.content}</p>
                <div className="flex items-center gap-4 mt-3">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600 transition-colors">
                    <span>👍</span>
                    <span className="text-sm">{review.helpfulCount}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600 transition-colors">
                    <span>💬</span>
                    <span className="text-sm">回复</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3">
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500'
          }`}
        >
          <span className="text-xl">{isFavorite ? '❤️' : '🤍'}</span>
        </button>
        <button className="flex-1 bg-gray-100 rounded-full py-3 px-4 flex items-center gap-2">
          <span>💬</span>
          <span className="text-gray-600">写下你的评论...</span>
        </button>
        <Button className="px-6">
          去打卡
        </Button>
      </div>
    </div>
  );
}