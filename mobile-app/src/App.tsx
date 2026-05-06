import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import {
  OnboardingPage,
  LoginPage,
  RegisterPage,
  HomePage,
  DiscoverPage,
  NotificationsPage,
  ProfilePage,
  PostPage,
  RecommendationDetailPage,
} from './pages';

type AppScreen = 
  | 'onboarding'
  | 'login'
  | 'register'
  | 'main'
  | 'post'
  | 'recommendation-detail';

function App() {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRecommendationId, setSelectedRecommendationId] = useState<string>('');

  const handleOnboardingComplete = () => {
    setScreen('login');
  };

  const handleLogin = () => {
    setScreen('main');
  };

  const handleRegister = () => {
    setScreen('main');
  };

  const handleNavigateToRegister = () => {
    setScreen('register');
  };

  const handleNavigateToLogin = () => {
    setScreen('login');
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'post') {
      setScreen('post');
    } else {
      setActiveTab(tab);
    }
  };

  const handleRecommendationClick = (id: string) => {
    setSelectedRecommendationId(id);
    setScreen('recommendation-detail');
  };

  const handlePostCancel = () => {
    setScreen('main');
  };

  const handlePostSubmit = () => {
    alert('推荐发布成功！');
    setScreen('main');
  };

  const handleBackToMain = () => {
    setScreen('main');
  };

  const handleEditProfile = () => {
    alert('编辑资料功能开发中');
  };

  const handleNotificationClick = () => {
    // 处理通知点击
  };

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <OnboardingPage onComplete={handleOnboardingComplete} />;
      case 'login':
        return (
          <LoginPage 
            onLogin={handleLogin} 
            onNavigateToRegister={handleNavigateToRegister} 
          />
        );
      case 'register':
        return (
          <RegisterPage 
            onRegister={handleRegister} 
            onNavigateToLogin={handleNavigateToLogin} 
          />
        );
      case 'main':
        return (
          <>
            {activeTab === 'home' && (
              <HomePage onRecommendationClick={handleRecommendationClick} />
            )}
            {activeTab === 'discover' && (
              <DiscoverPage 
                onRecommendationClick={handleRecommendationClick}
                onTopicClick={() => {}}
              />
            )}
            {activeTab === 'notifications' && (
              <NotificationsPage onNotificationClick={handleNotificationClick} />
            )}
            {activeTab === 'profile' && (
              <ProfilePage 
                onRecommendationClick={handleRecommendationClick}
                onEditProfile={handleEditProfile}
              />
            )}
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          </>
        );
      case 'post':
        return (
          <PostPage 
            onCancel={handlePostCancel} 
            onSubmit={handlePostSubmit} 
          />
        );
      case 'recommendation-detail':
        return (
          <RecommendationDetailPage 
            recommendationId={selectedRecommendationId}
            onBack={handleBackToMain}
          />
        );
      default:
        return <HomePage onRecommendationClick={handleRecommendationClick} />;
    }
  };

  return <div className="min-h-screen bg-orange-50">{renderScreen()}</div>;
}

export default App;