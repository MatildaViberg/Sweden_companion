import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';
import TopicDetail from './components/TopicDetail';
import { UserProfile } from './types';
import { initializeChat } from './services/geminiService';

type ViewState = 'onboarding' | 'dashboard' | 'edit-profile' | 'topic-detail';

const App: React.FC = () => {
  // Lazy initialization to prevent flash of Onboarding content
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('studyVikingUser');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [view, setView] = useState<ViewState>(() => {
    // If we have a user in storage, start at dashboard immediately
    return localStorage.getItem('studyVikingUser') ? 'dashboard' : 'onboarding';
  });

  const [currentTopic, setCurrentTopic] = useState<string>('');

  useEffect(() => {
    // Initialize chat session if user is already logged in on mount
    if (userProfile) {
      initializeChat(userProfile);
    }
  }, []); // Run once on mount

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('studyVikingUser', JSON.stringify(profile));
    initializeChat(profile);
    setView('dashboard');
  };

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('studyVikingUser', JSON.stringify(profile));
    initializeChat(profile); // Re-initialize chat with new context
    setView('dashboard');
  };

  const handleTopicClick = (topic: string) => {
    setCurrentTopic(topic);
    setView('topic-detail');
  };

  // Render Logic
  if (view === 'edit-profile' && userProfile) {
    return (
      <EditProfile 
        initialData={userProfile} 
        onSave={handleSaveProfile} 
        onCancel={() => setView('dashboard')} 
      />
    );
  }

  if (view === 'topic-detail' && userProfile && currentTopic) {
    return (
      <TopicDetail 
        topic={currentTopic} 
        userProfile={userProfile} 
        onBack={() => setView('dashboard')} 
      />
    );
  }

  if (view === 'dashboard' && userProfile) {
    return (
      <Dashboard 
        userProfile={userProfile} 
        onEdit={() => setView('edit-profile')} 
        onTopicClick={handleTopicClick}
      />
    );
  }

  // Default to onboarding
  return <Onboarding onComplete={handleOnboardingComplete} />;
};

export default App;