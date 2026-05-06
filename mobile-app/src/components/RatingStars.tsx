import { useState } from 'react';
import { RATING_LABELS } from '../types';

interface RatingStarsProps {
  rating?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function RatingStars({ 
  rating = 0, 
  interactive = false, 
  onChange, 
  showLabel = false,
  size = 'md'
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = interactive ? (hoverRating || rating) : rating;
  
  const starSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${starSizes[size]} transition-transform duration-200 ${
            interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={star <= displayRating ? '#FF6B35' : '#E5E7EB'}
            className={star <= displayRating ? 'drop-shadow-[0_1px_2px_rgba(255,107,53,0.3)]' : ''}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
      {showLabel && displayRating > 0 && (
        <span className="ml-2 text-sm font-medium text-primary-600">
          {RATING_LABELS[displayRating - 1]}
        </span>
      )}
    </div>
  );
}
