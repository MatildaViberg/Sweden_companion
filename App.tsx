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

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Apply theme class to html element
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

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
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
    );
  }

  // Default to onboarding
  return <Onboarding onComplete={handleOnboardingComplete} />;
};

export default App;