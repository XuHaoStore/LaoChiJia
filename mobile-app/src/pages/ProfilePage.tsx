import { mockUser, mockRecommendations, mockReviews } from '../data/mockData';
import { RatingStars } from '../components/RatingStars';

interface ProfilePageProps {
  onRecommendationClick: (id: string) => void;
  onEditProfile: () => void;
  onFavoritesClick: () => void;
  onMyReviewsClick: () => void;
  onAchievementsClick: () => void;
  onSettingsClick: () => void;
}

export function ProfilePage({ 
  onRecommendationClick, 
  onEditProfile,
  onFavoritesClick,
  onMyReviewsClick,
  onAchievementsClick,
  onSettingsClick,
}: ProfilePageProps) {
  const userRecommendations = mockRecommendations.filter(r => r.author.id === mockUser.id);

  const menuItems = [
    { icon: '📋', label: '我的收藏', count: 12, onClick: onFavoritesClick },
    { icon: '💬', label: '我的评论', count: 28, onClick: onMyReviewsClick },
    { icon: '🏆', label: '我的成就', count: 5, onClick: onAchievementsClick },
    { icon: '⚙️', label: '设置', count: 0, onClick: onSettingsClick },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 pt-12 pb-20 px-4">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={mockUser.avatar} 
              alt={mockUser.nickname}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div className="text-white">
              <h1 className="text-xl font-bold">{mockUser.nickname}</h1>
              <p className="text-sm opacity-80">{mockUser.level}</p>
            </div>
          </div>
          <button 
            onClick={onEditProfile}
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
          >
            编辑资料
          </button>
        </div>

        <div className="flex justify-around mt-6 bg-white/10 backdrop-blur-sm rounded-2xl py-4">
          <div className="text-center text-white">
            <p className="text-2xl font-bold">{userRecommendations.length}</p>
            <p className="text-xs opacity-80">推荐</p>
          </div>
          <div className="text-center text-white">
            <p className="text-2xl font-bold">{mockReviews.length}</p>
            <p className="text-xs opacity-80">评论</p>
          </div>
          <div className="text-center text-white">
            <p className="text-2xl font-bold">156</p>
            <p className="text-xs opacity-80">粉丝</p>
          </div>
          <div className="text-center text-white">
            <p className="text-2xl font-bold">89</p>
            <p className="text-xs opacity-80">关注</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl mx-4 -mt-10 shadow-lg p-4 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">吃货分</h2>
          <span className="text-primary-600 font-bold text-lg">{mockUser.foodScore}分</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((mockUser.foodScore / 500) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {mockUser.foodScore >= 300 ? '恭喜已达到顶级吃货！' : `距离下一等级还需 ${Math.max(0, 300 - mockUser.foodScore)} 分`}
        </p>
      </div>

      <section className="px-4 py-4">
        <div className="grid grid-cols-4 gap-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-gray-50 hover:shadow-md transition-all active:scale-95"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              {item.count > 0 && (
                <span className="text-xs text-primary-600 font-medium">{item.count}</span>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">我的推荐</h2>
          <button className="text-sm text-primary-600">查看全部</button>
        </div>
        <div className="space-y-4">
          {userRecommendations.length > 0 ? (
            userRecommendations.map((rec) => (
              <div 
                key={rec.id}
                onClick={() => onRecommendationClick(rec.id)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className="flex gap-4">
                  <img 
                    src={rec.imageUrl} 
                    alt={rec.title}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 line-clamp-2">{rec.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <RatingStars rating={rec.rating} size="sm" />
                      <span className="text-sm text-gray-500">{rec.reviewCount}评论</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {rec.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl">
              <div className="text-5xl mb-3">🍽️</div>
              <p className="text-gray-500">还没有发布过推荐</p>
              <p className="text-gray-400 text-sm mt-1">快去分享你的美食体验吧</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}