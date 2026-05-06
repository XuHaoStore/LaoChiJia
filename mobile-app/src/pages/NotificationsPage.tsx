import { useState } from 'react';
import { mockNotifications } from '../data/mockData';

interface NotificationsPageProps {
  onNotificationClick: (id: string) => void;
}

export function NotificationsPage({ onNotificationClick }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return '❤️';
      case 'comment': return '💬';
      case 'follow': return '👤';
      case 'system': return '📢';
      default: return '🔔';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">通知</h1>
          <button 
            onClick={markAllAsRead}
            className="text-sm text-primary-600 font-medium"
          >
            全部已读
          </button>
        </div>
      </header>

      <section className="px-4 py-4">
        <div className="space-y-3">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => {
                markAsRead(notification.id);
                onNotificationClick(notification.id);
              }}
              className={`w-full bg-white rounded-xl p-4 flex items-center gap-4 transition-all ${
                notification.read ? 'opacity-70' : 'shadow-sm border-l-4 border-primary-500'
              }`}
            >
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                <span className="text-xl">{getIcon(notification.type)}</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-800">{notification.content}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.createdAt}</p>
              </div>
              {!notification.read && (
                <span className="w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}