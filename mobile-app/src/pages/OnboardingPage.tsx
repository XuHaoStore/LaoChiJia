import { useState } from 'react';
import { Button } from '../components/Button';
import { FLAVOR_PREFERENCES } from '../types';

interface OnboardingPageProps {
  onComplete: () => void;
}

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [step, setStep] = useState(1);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  const toggleFlavor = (flavorId: string) => {
    setSelectedFlavors(prev => 
      prev.includes(flavorId) 
        ? prev.filter(id => id !== flavorId)
        : [...prev, flavorId]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const steps = [
    {
      title: '欢迎加入老吃家',
      description: '这里是资深吃货的聚集地，分享美食，发现美味',
      image: '🍔',
    },
    {
      title: '选择你的口味偏好',
      description: '告诉我们你喜欢什么味道，为你推荐更精准的美食',
      image: '🍽️',
    },
    {
      title: '开始美食之旅',
      description: '发布推荐、分享评价，成为真正的美食达人',
      image: '🌟',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <div className="text-6xl mb-4">{steps[step - 1].image}</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{steps[step - 1].title}</h1>
            <p className="text-gray-500">{steps[step - 1].description}</p>
          </div>

          {step === 2 && (
            <div className="grid grid-cols-3 gap-3 mb-8 animate-slide-up">
              {FLAVOR_PREFERENCES.map((flavor) => (
                <button
                  key={flavor.id}
                  onClick={() => toggleFlavor(flavor.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 ${
                    selectedFlavors.includes(flavor.id)
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 scale-105'
                      : 'bg-white border-2 border-gray-100 hover:border-primary-200'
                  }`}
                >
                  <span className="text-2xl">{flavor.icon}</span>
                  <span className="text-sm font-medium">{flavor.name}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  s === step 
                    ? 'bg-primary-500 w-6' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button onClick={handleNext} className="w-full">
            {step === 3 ? '开始探索' : '下一步'}
          </Button>
        </div>
      </div>
    </div>
  );
}