import React, { useState } from 'react';
import Layout from '../components/Layout';

const mockReviews = [
  { id: '1', recommendation: '老北京炸酱面', user: '美食爱好者', rating: 5, content: '确实很好吃！面很劲道，酱也很香。', is_negative: false, is_reconsidered: false, created_at: '2024-01-15' },
  { id: '2', recommendation: '川味麻辣火锅', user: '火锅控', rating: 5, content: '超级正宗！麻辣鲜香，牛肉很嫩。', is_negative: false, is_reconsidered: false, created_at: '2024-01-14' },
  { id: '3', recommendation: '老北京炸酱面', user: '挑剔食客', rating: 1, content: '感觉一般般，没有想象中那么好吃。', is_negative: true, is_reconsidered: false, created_at: '2024-01-13' },
  { id: '4', recommendation: '日式料理屋', user: '寿司控', rating: 4, content: '刺身新鲜，寿司味道正宗。', is_negative: false, is_reconsidered: false, created_at: '2024-01-12' },
  { id: '5', recommendation: '粤式早茶店', user: '茶餐厅', rating: 1, content: '价格太贵，味道一般。', is_negative: true, is_reconsidered: true, created_at: '2024-01-11' },
];

export default function Reviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [filterType, setFilterType] = useState('all');

  const filteredReviews = reviews.filter(review => {
    if (filterType === 'all') return true;
    if (filterType === 'negative') return review.is_negative && !review.is_reconsidered;
    if (filterType === 'reconsidered') return review.is_reconsidered;
    if (filterType === 'positive') return !review.is_negative;
    return true;
  });

  const handleReconsider = (id: string) => {
    setReviews(prev => prev.map(review =>
      review.id === id ? { ...review, is_reconsidered: !review.is_reconsidered } : review
    ));
  };

  return (
    <Layout title="评论管理">
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterType === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          全部 ({reviews.length})
        </button>
        <button
          onClick={() => setFilterType('positive')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterType === 'positive' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          好评 ({reviews.filter(r => !r.is_negative).length})
        </button>
        <button
          onClick={() => setFilterType('negative')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterType === 'negative' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          差评 ({reviews.filter(r => r.is_negative && !r.is_reconsidered).length})
        </button>
        <button
          onClick={() => setFilterType('reconsidered')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterType === 'reconsidered' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          已复议 ({reviews.filter(r => r.is_reconsidered).length})
        </button>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className={`bg-white rounded-xl p-6 shadow-sm ${review.is_negative && !review.is_reconsidered ? 'border-l-4 border-red-500' : review.is_reconsidered ? 'border-l-4 border-blue-500' : 'border-l-4 border-green-500'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span>👤</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{review.user}</p>
                  <p className="text-sm text-gray-500">{review.created_at}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} className={`text-lg ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">推荐: <span className="font-medium">{review.recommendation}</span></p>
              <p className="text-gray-800">{review.content}</p>
            </div>
            <div className="mt-4 flex gap-3">
              {review.is_negative && !review.is_reconsidered && (
                <button
                  onClick={() => handleReconsider(review.id)}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  标记复议
                </button>
              )}
              {review.is_reconsidered && (
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                  已复议
                </span>
              )}
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">上一页</button>
        <span className="px-4 py-2 bg-gray-200 rounded-lg font-medium">1</span>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">下一页</button>
      </div>
    </Layout>
  );
}
