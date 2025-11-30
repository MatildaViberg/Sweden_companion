import React, { useState } from 'react';
import { UserProfile } from '../types';
import { COUNTRIES, TOPICS_LIST } from '../constants';
import { Save, ArrowLeft, UserPen, Plus, X, Check } from 'lucide-react';

interface EditProfileProps {
  initialData: UserProfile;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<UserProfile>(initialData);
  const [customCategory, setCustomCategory] = useState('');

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
      const current = formData.focusCategories || [];
      if (!current.includes(newCat)) {
         updateField('focusCategories', [...current, newCat]);
      }
      setCustomCategory('');
    }
  };

  const handleSave = () => {
    if (formData.username && formData.originCountry) {
      onSave(formData);
    }
  };

  // Combine default topics with any custom ones the user already has
  const allCategories = Array.from(new Set([
    ...TOPICS_LIST,
    ...(formData.focusCategories || [])
  ]));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Page Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10 transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button 
                onClick={onCancel}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition text-gray-600 dark:text-gray-300"
              >
                <ArrowLeft size={24} />
             </button>
             <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <UserPen className="text-sweden-blue dark:text-blue-400" size={24} />
                Edit Profile
             </h1>
          </div>
          <button 
            onClick={handleSave}
            className="bg-sweden-blue text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-sm"
          >
            <Save size={18} /> Save
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-12 pb-24">
        
        {/* Section: Basic Info */}
        <section className="space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-700 pb-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Basic Information</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">How I should address you and where you are from.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Username</label>
              <input 
                type="text" 
                value={formData.username}
                onChange={(e) => updateField('username', e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:border-sweden-blue rounded-xl transition outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Origin Country</label>
              <select 
                value={formData.originCountry}
                onChange={(e) => updateField('originCountry', e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:border-sweden-blue rounded-xl transition outline-none"
              >
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Age</label>
              <input 
                type="number" 
                value={formData.age}
                onChange={(e) => updateField('age', parseInt(e.target.value))}
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:border-sweden-blue rounded-xl transition outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Preferred Language</label>
              <select 
                value={formData.preferredLanguage}
                onChange={(e) => updateField('preferredLanguage', e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:border-sweden-blue rounded-xl transition outline-none"
              >
                <option value="English">English</option>
                <option value="Swedish">Swedish</option>
                <option value="Chinese">Chinese</option>
                <option value="Spanish">Spanish</option>
                <option value="Hindi">Hindi</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>
          </div>
        </section>

        {/* Section: Stay Details */}
        <section className="space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-700 pb-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Stay Details</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Helps me give you better weather and travel advice.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Are you in Sweden?</label>
              <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                <button 
                  onClick={() => updateField('inSweden', true)}
                  className={`flex-1 py-3 rounded-lg font-bold transition ${formData.inSweden ? 'bg-white dark:bg-gray-600 text-sweden-blue dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  Yes
                </button>
                <button 
                  onClick={() => updateField('inSweden', false)}
                  className={`flex-1 py-3 rounded-lg font-bold transition ${!formData.inSweden ? 'bg-white dark:bg-gray-600 text-sweden-blue dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Arrival Date</label>
              <input 
                type="date" 
                value={formData.arrivalDate}
                onChange={(e) => updateField('arrivalDate', e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:border-sweden-blue rounded-xl transition outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Duration of Stay</label>
              <select 
                value={formData.stayDuration}
                onChange={(e) => updateField('stayDuration', e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:border-sweden-blue rounded-xl transition outline-none"
              >
                <option value="Less than 3 months">Less than 3 months</option>
                <option value="One semester (6 months)">One semester (6 months)</option>
                <option value="One year">One year</option>
                <option value="Two years or more">Two years or more</option>
                <option value="Permanent">Permanent</option>
              </select>
            </div>
          </div>
        </section>

        {/* Section: Interests */}
        <section className="space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-700 pb-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Interests & Topics</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Customize what I should help you with.</p>
          </div>
          
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Your Focus Areas</label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allCategories.map(topic => {
                const isSelected = formData.focusCategories?.includes(topic);
                const isCustom = !TOPICS_LIST.includes(topic);

                return (
                  <button
                    key={topic}
                    onClick={() => toggleArrayItem('focusCategories', topic)}
                    className={`p-4 rounded-xl text-left border-2 transition flex items-center justify-between group ${isSelected ? 'bg-sweden-sky dark:bg-blue-900/30 border-sweden-blue dark:border-blue-400 text-sweden-blue dark:text-blue-300' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-100 dark:hover:border-gray-600'}`}
                  >
                    <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-sweden-blue dark:bg-blue-500 border-sweden-blue dark:border-blue-500' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'}`}>
                           {isSelected && <Check size={14} className="text-white" />}
                        </div>
                        <span className="font-medium">{topic}</span>
                    </div>
                    {isCustom && (
                         <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">Custom</span>
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
                  className="flex-1 p-3 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:border-sweden-blue focus:outline-none"
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
          </div>
        </section>

      </main>
    </div>
  );
};

export default EditProfile;