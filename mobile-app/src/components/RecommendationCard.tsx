import { Recommendation } from '../types';
import { RatingStars } from './RatingStars';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onClick?: () => void;
}

export function RecommendationCard({ recommendation, onClick }: RecommendationCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden card-shadow card-shadow-hover cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={recommendation.imageUrl} 
          alt={recommendation.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <RatingStars rating={recommendation.rating} size="sm" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{recommendation.title}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{recommendation.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={recommendation.author.avatar} 
              alt={recommendation.author.nickname}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">{recommendation.author.nickname}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{recommendation.reviewCount}评论</span>
            <span>{recommendation.favoriteCount}收藏</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {recommendation.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
