import { User, Recommendation, Review, Topic, Notification } from '../types';

export const mockUser: User = {
  id: '1',
  nickname: '美食达人小王',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=123',
  foodScore: 256,
  level: '资深吃货',
  bio: '吃遍大街小巷，寻找隐藏美味',
  createdAt: '2024-01-15',
};

export const mockUsers: User[] = [
  { id: '1', nickname: '美食达人小王', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=123', foodScore: 256, level: '资深吃货', bio: '吃遍大街小巷', createdAt: '2024-01-15' },
  { id: '2', nickname: '探店小能手', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=456', foodScore: 189, level: '中级吃货', bio: '发现美食是我的爱好', createdAt: '2024-03-20' },
  { id: '3', nickname: '味蕾探险家', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=789', foodScore: 342, level: '顶级吃货', bio: '追求极致美味', createdAt: '2023-11-10' },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: '这家川菜馆的水煮鱼绝了！',
    description: '终于找到一家正宗的川菜馆，水煮鱼麻辣鲜香，鱼肉鲜嫩，配上米饭能吃三碗！',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    shopName: '川渝人家',
    address: '朝阳区三里屯SOHO A座1层',
    rating: 5,
    priceLevel: 2,
    tags: ['川菜', '水煮鱼', '必吃'],
    author: mockUsers[0],
    reviewCount: 45,
    favoriteCount: 128,
    createdAt: '2024-05-06',
  },
  {
    id: '2',
    title: '隐藏在胡同里的老北京炸酱面',
    description: '老北京胡同里的宝藏面馆，炸酱是秘制的，面条劲道，配上黄瓜丝和豆芽，太香了！',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac551ab983?w=400',
    shopName: '胡同面馆',
    address: '东城区南锣鼓巷8号',
    rating: 4,
    priceLevel: 1,
    tags: ['北京菜', '炸酱面', '老字号'],
    author: mockUsers[1],
    reviewCount: 32,
    favoriteCount: 89,
    createdAt: '2024-05-05',
  },
  {
    id: '3',
    title: '米其林三星主厨开的日料店',
    description: '环境优雅，食材新鲜，寿司入口即化，刺身拼盘非常新鲜，值得一试！',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
    shopName: '鮨·青木',
    address: '西城区金融街购物中心B1层',
    rating: 5,
    priceLevel: 4,
    tags: ['日料', '寿司', '米其林'],
    author: mockUsers[2],
    reviewCount: 67,
    favoriteCount: 156,
    createdAt: '2024-05-04',
  },
  {
    id: '4',
    title: '深夜食堂：最好吃的烤串',
    description: '深夜饿了来这里准没错，烤羊腰、烤鸡翅、烤茄子，配上冰啤酒，完美！',
    imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400',
    shopName: '深夜烤串',
    address: '海淀区五道口夜市',
    rating: 4,
    priceLevel: 1,
    tags: ['烧烤', '夜宵', '必吃'],
    author: mockUsers[0],
    reviewCount: 89,
    favoriteCount: 234,
    createdAt: '2024-05-03',
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    recommendationId: '1',
    author: mockUsers[1],
    rating: 5,
    content: '确实很好吃！水煮鱼麻辣鲜香，鱼肉很嫩，下次还来！',
    images: [],
    createdAt: '2024-05-06',
    helpfulCount: 23,
    disputed: false,
  },
  {
    id: '2',
    recommendationId: '1',
    author: mockUsers[2],
    rating: 2,
    content: '味道一般，价格偏贵，不值得推荐',
    images: [],
    createdAt: '2024-05-06',
    helpfulCount: 5,
    disputed: true,
  },
  {
    id: '3',
    recommendationId: '2',
    author: mockUsers[0],
    rating: 5,
    content: '老北京味道，太正宗了！',
    images: [],
    createdAt: '2024-05-05',
    helpfulCount: 18,
    disputed: false,
  },
];

export const mockTopics: Topic[] = [
  { id: '1', name: '北京美食', icon: '🏮', description: '探索北京的美味', postCount: 1234, followerCount: 5678 },
  { id: '2', name: '川菜', icon: '🌶️', description: '麻辣鲜香的川菜', postCount: 890, followerCount: 3456 },
  { id: '3', name: '日料', icon: '🍣', description: '精致的日式料理', postCount: 678, followerCount: 2345 },
  { id: '4', name: '烧烤', icon: '🔥', description: '炭火上的美味', postCount: 543, followerCount: 1890 },
  { id: '5', name: '甜点', icon: '🍰', description: '甜蜜的诱惑', postCount: 456, followerCount: 2109 },
];

export const mockNotifications: Notification[] = [
  { id: '1', type: 'like', content: '美食达人小王 点赞了你的推荐', relatedId: '1', read: false, createdAt: '2024-05-06 10:30' },
  { id: '2', type: 'comment', content: '探店小能手 评论了你的推荐', relatedId: '2', read: false, createdAt: '2024-05-06 09:15' },
  { id: '3', type: 'follow', content: '味蕾探险家 关注了你', relatedId: '3', read: true, createdAt: '2024-05-05 18:45' },
  { id: '4', type: 'system', content: '你的推荐获得了优质推荐奖励 +20吃货分', relatedId: '4', read: true, createdAt: '2024-05-05 12:00' },
];
