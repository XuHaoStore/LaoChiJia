import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { TextArea } from '../components/TextArea';
import { RatingStars } from '../components/RatingStars';
import { mockUser } from '../data/mockData';

interface PostPageProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export function PostPage({ onCancel, onSubmit }: PostPageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [rating, setRating] = useState(0);
  const [priceLevel, setPriceLevel] = useState(2);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const availableTags = [
    '川菜', '粤菜', '湘菜', '鲁菜', '东北菜', '江浙菜',
    '日料', '韩餐', '西餐', '东南亚', '火锅', '烧烤',
    '甜点', '小吃', '早餐', '夜宵', '必吃', '老字号',
    '米其林', '网红店', '隐藏美食', '性价比高'
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (!title || !description || !shopName || !address || rating === 0) {
      alert('请填写完整信息');
      return;
    }
    onSubmit();
  };

  const addImage = () => {
    const randomImage = `https://picsum.photos/400/300?random=${Date.now()}`;
    setImages([...images, randomImage]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={onCancel}
            className="text-gray-500 font-medium"
          >
            取消
          </button>
          <h1 className="text-lg font-bold text-gray-800">发布推荐</h1>
          <Button onClick={handleSubmit} size="sm">
            发布
          </Button>
        </div>
        <div className="flex items-center gap-3 mt-4 px-1">
          <img 
            src={mockUser.avatar} 
            alt={mockUser.nickname}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-800">{mockUser.nickname}</p>
            <p className="text-xs text-gray-500">消耗10吃货分</p>
          </div>
        </div>
      </header>

      <section className="px-4 py-4 space-y-4">
        <Input
          label="标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="给你的推荐起个吸引人的标题"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            评分 <span className="text-gray-400">(点击星星评分)</span>
          </label>
          <div className="bg-white rounded-2xl p-4 border-2 border-gray-100">
            <RatingStars 
              rating={rating} 
              interactive 
              onChange={setRating}
              showLabel
              size="lg"
            />
          </div>
        </div>

        <TextArea
          label="推荐理由"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="详细描述一下这家店的特色、必点菜、口感等..."
          rows={4}
        />

        <Input
          label="店铺名称"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="请输入店铺名称"
        />

        <Input
          label="店铺地址"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="请输入店铺详细地址"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            人均消费
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setPriceLevel(level)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                  priceLevel === level
                    ? 'bg-primary-500 text-white'
                    : 'bg-white border-2 border-gray-100 text-gray-600 hover:border-primary-200'
                }`}
              >
                {'💰'.repeat(level)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择标签 <span className="text-gray-400">(可选)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            上传图片 <span className="text-gray-400">(可选)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img src={image} alt={`图片${index + 1}`} className="w-full h-full object-cover" />
                <button 
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white text-xs"
                >
                  ×
                </button>
              </div>
            ))}
            {images.length < 9 && (
              <button
                onClick={addImage}
                className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-primary-400 transition-colors"
              >
                <span className="text-2xl">📷</span>
                <span className="text-xs text-gray-400 mt-1">添加图片</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}