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
  FavoritesPage,
  MyReviewsPage,
  AchievementsPage,
  SettingsPage,
  TopicDetailPage,
  EditProfilePage,
} from './pages';
import { mockUser } from './data/mockData';

type AppScreen = 
  | 'onboarding'
  | 'login'
  | 'register'
  | 'main'
  | 'post'
  | 'recommendation-detail'
  | 'favorites'
  | 'my-reviews'
  | 'achievements'
  | 'settings'
  | 'topic-detail'
  | 'edit-profile';

function App() {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedId, setSelectedId] = useState<string>('');
  const [currentUser, setCurrentUser] = useState(mockUser);

  const handleOnboardingComplete = () => {
    setScreen('login');
  };

  const handleLogin = () => {
    setCurrentUser({ ...currentUser, foodScore: currentUser.foodScore });
    setScreen('main');
  };

  const handleRegister = () => {
    setCurrentUser({ ...currentUser, foodScore: 100 });
    setScreen('main');
  };

  const handleLogout = () => {
    setCurrentUser(mockUser);
    setScreen('login');
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
    setSelectedId(id);
    setScreen('recommendation-detail');
  };

  const handleTopicClick = (id: string) => {
    setSelectedId(id);
    setScreen('topic-detail');
  };

  const handleFavoritesClick = () => {
    setScreen('favorites');
  };

  const handleMyReviewsClick = () => {
    setScreen('my-reviews');
  };

  const handleAchievementsClick = () => {
    setScreen('achievements');
  };

  const handleSettingsClick = () => {
    setScreen('settings');
  };

  const handleEditProfile = () => {
    setScreen('edit-profile');
  };

  const handlePostCancel = () => {
    setScreen('main');
  };

  const handlePostSubmit = () => {
    setCurrentUser(prev => ({
      ...prev,
      foodScore: Math.max(0, prev.foodScore - 10)
    }));
    alert('推荐发布成功！消耗10吃货分');
    setScreen('main');
  };

  const handleBack = () => {
    setScreen('main');
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
                onTopicClick={handleTopicClick}
              />
            )}
            {activeTab === 'notifications' && (
              <NotificationsPage onNotificationClick={() => {}} />
            )}
            {activeTab === 'profile' && (
              <ProfilePage 
                onRecommendationClick={handleRecommendationClick}
                onEditProfile={handleEditProfile}
                onFavoritesClick={handleFavoritesClick}
                onMyReviewsClick={handleMyReviewsClick}
                onAchievementsClick={handleAchievementsClick}
                onSettingsClick={handleSettingsClick}
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
            recommendationId={selectedId}
            onBack={handleBack}
          />
        );
      
      case 'favorites':
        return (
          <FavoritesPage 
            onBack={handleBack}
            onRecommendationClick={handleRecommendationClick}
          />
        );
      
      case 'my-reviews':
        return (
          <MyReviewsPage 
            onBack={handleBack}
            onRecommendationClick={handleRecommendationClick}
          />
        );
      
      case 'achievements':
        return (
          <AchievementsPage onBack={handleBack} />
        );
      
      case 'settings':
        return (
          <SettingsPage 
            onBack={handleBack}
            onLogout={handleLogout}
          />
        );
      
      case 'topic-detail':
        return (
          <TopicDetailPage 
            topicId={selectedId}
            onBack={handleBack}
            onRecommendationClick={handleRecommendationClick}
          />
        );
      
      case 'edit-profile':
        return (
          <EditProfilePage 
            onBack={handleBack}
            onSave={() => {
              alert('资料保存成功！');
              setScreen('main');
            }}
          />
        );
      
      default:
        return <HomePage onRecommendationClick={handleRecommendationClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      {renderScreen()}
    </div>
  );
}

export default App;