export interface User {
  id: string;
  nickname: string;
  avatar: string;
  foodScore: number;
  level: string;
  bio: string;
  createdAt: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  shopName: string;
  address: string;
  rating: number;
  priceLevel: number;
  tags: string[];
  author: User;
  reviewCount: number;
  favoriteCount: number;
  createdAt: string;
}

export interface Review {
  id: string;
  recommendationId: string;
  author: User;
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
  helpfulCount: number;
  disputed: boolean;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  description: string;
  postCount: number;
  followerCount: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'system';
  content: string;
  relatedId: string;
  read: boolean;
  createdAt: string;
}

export const RATING_LABELS = [
  '拉完了',
  'NPC',
  '人上人',
  '顶级',
  '夯爆了',
];

export const FLAVOR_PREFERENCES = [
  { id: 'sweet', name: '甜味', icon: '🍬' },
  { id: 'spicy', name: '辣味', icon: '🌶️' },
  { id: 'sour', name: '酸味', icon: '🍋' },
  { id: 'salty', name: '咸味', icon: '🧂' },
  { id: 'bitter', name: '苦味', icon: '🍫' },
  { id: 'umami', name: '鲜味', icon: '🍤' },
];
