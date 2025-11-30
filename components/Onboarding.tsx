
import React, { useState } from 'react';
import { UserProfile, TaskItem } from '../types';
import { EXAMPLE_USERNAMES, COUNTRIES, INITIAL_FOCUS_CATEGORIES } from '../constants';
import { generateNewTasks } from '../services/geminiService';
import { ArrowRight, Check, Plane, Calendar, Clock, User, Globe, BookOpen, ChevronLeft, Plus, Loader, X } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
  initialData?: UserProfile;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, initialData }) => {
  // If editing, start at step 1 (Username) instead of Welcome
  const [step, setStep] = useState(initialData ? 1 : 0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  
  // Randomly pick 3 usernames on mount
  const [suggestedNames] = useState(() => {
    const shuffled = [...EXAMPLE_USERNAMES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  });

  const [formData, setFormData] = useState<Partial<UserProfile>>(initialData || {
    focusCategories: [], // Changed from topics to focusCategories
    activeTasks: [],
    inSweden: false,
    preferredLanguage: 'English'
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => Math.max(0, prev - 1));
  
  const updateField = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'focusCategories', item: string) => {
    const current = formData[field] || [];
    if (current.includes(item)) {
      updateField(field, current.filter(i => i !== item));
    } else {
      updateField(field, [...current, item]);
    }
  };

  const addCustomCategory = () => {
    if (customCategory.trim()) {
      const newCat = customCategory.trim();
      // Add to selection
      const current = formData.focusCategories || [];
      if (!current.includes(newCat)) {
         updateField('focusCategories', [...current, newCat]);
      }
      setCustomCategory('');
    }
  };

  const finishOnboarding = async () => {
    if (formData.username && formData.originCountry) {
      setIsFinishing(true);
      
      // Generate initial tasks based on selected categories
      const selectedCategories = formData.focusCategories || [];
      const initialTasks: TaskItem[] = [];
      const tempProfile = { ...formData } as UserProfile; // Cast for API context

      // We map through categories to get their tasks. 
      // If it's a standard category, use constant data.
      // If it's a custom category, ask AI to generate tasks.
      const taskPromises = selectedCategories.map(async (cat) => {
         if (INITIAL_FOCUS_CATEGORIES[cat]) {
             return INITIAL_FOCUS_CATEGORIES[cat].map(text => ({
                id: Date.now().toString() + Math.random().toString(),
                category: cat,
                text,
                isCompleted: false
             }));
         } else {
             // Custom category: Generate with AI
             try {
                const generatedTexts = await generateNewTasks(cat, [], tempProfile, 3);
                if (generatedTexts.length === 0) {
                     return [{
                        id: Date.now().toString() + Math.random().toString(),
                        category: cat,
                        text: `Explore requirements for ${cat}`,
                        isCompleted: false
                     }];
                }
                return generatedTexts.map(text => ({
                    id: Date.now().toString() + Math.random().toString(),
                    category: cat,
                    text,
                    isCompleted: false
                }));
             } catch (e) {
                 console.error(`Failed to generate tasks for ${cat}`, e);
                 return [{
                    id: Date.now().toString() + Math.random().toString(),
                    category: cat,
                    text: `Research ${cat} online`,
                    isCompleted: false
                 }];
             }
         }
      });

      const results = await Promise.all(taskPromises);
      results.forEach(tasks => initialTasks.push(...tasks));

      onComplete({
        ...formData,
        activeTasks: initialTasks,
        isOnboarded: true
      } as UserProfile);
    }
  };

  const renderButtons = (isValid: boolean, isLastStep: boolean = false) => (
    <div className="flex gap-3 mt-6">
      {step > 0 && (
        <button 
          onClick={handleBack}
          disabled={isFinishing}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition"
        >
          <ChevronLeft size={20} /> Back
        </button>
      )}
      <button 
        onClick={isLastStep ? finishOnboarding : handleNext}
        disabled={!isValid || isFinishing}
        className="flex-[2] bg-sweden-blue disabled:bg-gray-300 text-white font-bold py-3 rounded-xl shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
      >
        {isFinishing ? (
           <>
             <Loader className="animate-spin" size={20} /> Setting up...
           </>
        ) : (
           isLastStep ? (initialData ? "Save Changes" : "Finish Setup") : "Next"
        )}
      </button>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-sweden-blue mb-2">Welcome!</h1>
            <p className="text-gray-600 text-lg">
              Hello! I’m your friendly guide. <br/>
              Let’s get to know you so I can help you better.
            </p>
            <button 
              onClick={handleNext}
              className="bg-sweden-blue hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2 mx-auto"
            >
              Start <ArrowRight size={20} />
            </button>
          </div>
        );

      case 1: // Username
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <User className="text-sweden-blue" /> What should I call you?
            </h2>
            <input 
              type="text" 
              placeholder="Your Name"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-sweden-blue focus:outline-none text-lg"
              value={formData.username || ''}
              onChange={(e) => updateField('username', e.target.value)}
            />
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Or pick one of these:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedNames.map(name => (
                  <button 
                    key={name}
                    onClick={() => updateField('username', name)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${formData.username === name ? 'bg-sweden-blue text-white border-sweden-blue' : 'bg-white text-gray-600 border-gray-300 hover:border-sweden-blue'}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            {renderButtons(!!formData.username)}
          </div>
        );

      case 2: // Origin
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Globe className="text-sweden-blue" /> Where are you from?
            </h2>
            <select 
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-sweden-blue focus:outline-none text-lg bg-white"
              value={formData.originCountry || ''}
              onChange={(e) => updateField('originCountry', e.target.value)}
            >
              <option value="" disabled>Select your country</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {renderButtons(!!formData.originCountry)}
          </div>
        );

      case 3: // In Sweden?
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Plane className="text-sweden-blue" /> Are you already in Sweden?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => updateField('inSweden', true)}
                className={`p-6 rounded-xl border-2 transition flex flex-col items-center gap-2 ${formData.inSweden ? 'border-sweden-blue bg-sweden-sky text-sweden-blue' : 'border-gray-200 hover:border-blue-200'}`}
              >
                <Check size={32} className={formData.inSweden ? 'opacity-100' : 'opacity-0'} />
                <span className="font-bold">Yes</span>
              </button>
              <button 
                onClick={() => updateField('inSweden', false)}
                className={`p-6 rounded-xl border-2 transition flex flex-col items-center gap-2 ${formData.inSweden === false ? 'border-sweden-blue bg-sweden-sky text-sweden-blue' : 'border-gray-200 hover:border-blue-200'}`}
              >
                <Check size={32} className={formData.inSweden === false ? 'opacity-100' : 'opacity-0'} />
                <span className="font-bold">No</span>
              </button>
            </div>
            {renderButtons(formData.inSweden !== undefined)}
          </div>
        );
      
      case 4: // Arrival Date
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="text-sweden-blue" /> When will you arrive?
            </h2>
            <p className="text-gray-500 text-sm">If you are already here, select your arrival date or today.</p>
            <input 
              type="date" 
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-sweden-blue focus:outline-none text-lg"
              value={formData.arrivalDate || ''}
              onChange={(e) => updateField('arrivalDate', e.target.value)}
            />
            {renderButtons(!!formData.arrivalDate)}
          </div>
        );

      case 5: // Stay Duration
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Clock className="text-sweden-blue" /> How long is your stay?
            </h2>
            <select 
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-sweden-blue focus:outline-none text-lg bg-white"
              value={formData.stayDuration || ''}
              onChange={(e) => updateField('stayDuration', e.target.value)}
            >
              <option value="" disabled>Select duration</option>
              <option value="Less than 3 months">Less than 3 months</option>
              <option value="One semester (6 months)">One semester (6 months)</option>
              <option value="One year">One year</option>
              <option value="Two years or more">Two years or more</option>
              <option value="Permanent">Permanent</option>
            </select>
            {renderButtons(!!formData.stayDuration)}
          </div>
        );

        case 6: // Age
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <User className="text-sweden-blue" /> How old are you?
            </h2>
            <input 
              type="number" 
              placeholder="Age"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-sweden-blue focus:outline-none text-lg"
              value={formData.age || ''}
              onChange={(e) => updateField('age', parseInt(e.target.value))}
            />
            {renderButtons(!!formData.age)}
          </div>
        );

        case 7: // Language
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Globe className="text-sweden-blue" /> Preferred language?
            </h2>
            <p className="text-gray-500 text-sm">I'll do my best to communicate in this language.</p>
             <select 
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-sweden-blue focus:outline-none text-lg bg-white"
              value={formData.preferredLanguage || 'English'}
              onChange={(e) => updateField('preferredLanguage', e.target.value)}
            >
              <option value="English">English</option>
              <option value="Swedish">Swedish (Svenska)</option>
              <option value="Chinese">Chinese (中文)</option>
              <option value="Spanish">Spanish (Español)</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Arabic">Arabic (العربية)</option>
            </select>
            {renderButtons(true)}
          </div>
        );

        case 8: // Topics of Interest (Categories)
        const allCategories = Array.from(new Set([
          ...Object.keys(INITIAL_FOCUS_CATEGORIES),
          ...(formData.focusCategories || [])
        ]));

        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="text-sweden-blue" /> What do you need to sort out?
            </h2>
             <p className="text-gray-500 text-sm">Select the categories you want to focus on or add your own.</p>
            
            <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2">
              {allCategories.map(category => {
                 const isChecked = formData.focusCategories?.includes(category);
                 const isCustom = !INITIAL_FOCUS_CATEGORIES[category];
                 return (
                  <button
                    key={category}
                    onClick={() => toggleArrayItem('focusCategories', category)}
                    className={`p-4 rounded-xl text-left font-medium border-2 transition flex items-center justify-between group ${isChecked ? 'bg-sweden-sky border-sweden-blue text-sweden-blue' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  >
                     <div className="flex items-center gap-3">
                         <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-sweden-blue border-sweden-blue' : 'bg-white border-gray-300'}`}>
                            {isChecked && <Check size={16} className="text-white" />}
                         </div>
                        <span>{category}</span>
                     </div>
                     {isCustom && (
                         <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Custom</span>
                     )}
                  </button>
                );
              })}
            </div>

            {/* Custom Category Input */}
            <div className="flex gap-2">
                <input 
                  type="text" 
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Add custom topic (e.g. Ice Hockey)"
                  className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-sweden-blue focus:outline-none"
                  onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          e.preventDefault();
                          addCustomCategory();
                      }
                  }}
                />
                <button 
                  onClick={addCustomCategory}
                  disabled={!customCategory.trim()}
                  className="bg-sweden-blue text-white p-3 rounded-xl disabled:opacity-50 hover:bg-blue-700 transition"
                >
                  <Plus size={24} />
                </button>
            </div>

            {renderButtons(true, true)}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-sweden-sky flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 flex flex-col animate-fade-in-up">
        <div>
          {/* Progress Bar */}
          {step > 0 && (
            <div className="w-full bg-gray-100 h-2 rounded-full mb-8">
              <div 
                className="bg-sweden-yellow h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(step / 8) * 100}%` }}
              ></div>
            </div>
          )}
          {renderStep()}
        </div>
        
        {step > 0 && (
            <div className="mt-6 text-center text-xs text-gray-400">
                Step {step} of 8
            </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
