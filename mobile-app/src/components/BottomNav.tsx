interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', icon: '🏠', label: '首页' },
  { id: 'discover', icon: '🔍', label: '发现' },
  { id: 'post', icon: '✏️', label: '发布' },
  { id: 'notifications', icon: '🔔', label: '通知' },
  { id: 'profile', icon: '👤', label: '我的' },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2 safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
              activeTab === tab.id 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
