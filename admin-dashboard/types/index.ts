export interface User {
  id: string;
  phone?: string;
  nickname?: string;
  avatar_url?: string;
  foodie_points: number;
  preference_tags?: string[];
  status: 'active' | 'banned';
  created_at: string;
  updated_at: string;
}

export interface Recommendation {
  id: string;
  user_id: string;
  shop_name: string;
  address?: string;
  price_range?: number;
  content: string;
  images?: string[];
  tags?: string[];
  cuisine_type?: string;
  avg_rating: number;
  rating_count: number;
  like_count: number;
  favorite_count: number;
  view_count: number;
  status: 'pending' | 'approved' | 'rejected';
  is_hot: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Review {
  id: string;
  recommendation_id: string;
  user_id: string;
  rating: number;
  content?: string;
  has_been_there: boolean;
  is_negative: boolean;
  is_reconsidered: boolean;
  parent_review_id?: string;
  like_count: number;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Topic {
  id: string;
  name: string;
  description?: string;
  cover_image?: string;
  view_count: number;
  post_count: number;
  is_active: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'like' | 'review' | 'follow' | 'system';
  title?: string;
  content?: string;
  related_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface PointsHistory {
  id: string;
  user_id: string;
  action: string;
  points_change: number;
  reason?: string;
  related_id?: string;
  created_at: string;
}
