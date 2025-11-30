import React, { useState } from 'react';
import { UserProfile, TaskItem } from '../types';
import { DailyPhraseWidget, WeatherWidget, HolidayWidget } from './InfoWidgets';
import ChatInterface from './ChatInterface';
import { generateNewTasks } from '../services/geminiService';
import { Settings, BookOpen, Star, ChevronRight, UserPen, CheckSquare, Square, Plus, Loader, AlertTriangle, X, MessageCircle, Moon, Sun } from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile;
  onEdit: () => void;
  onTopicClick: (topic: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, onEdit, onTopicClick, isDarkMode, toggleTheme }) => {
  const [tasks, setTasks] = useState<TaskItem[]>(userProfile.activeTasks || []);
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null);
  const [replacingTaskId, setReplacingTaskId] = useState<string | null>(null);
  const [confirmingTask, setConfirmingTask] = useState<TaskItem | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Triggered when user clicks a checkbox
  const initiateTaskCompletion = (task: TaskItem) => {
    if (task.isCompleted) return; // Already completed
    setConfirmingTask(task);
  };

  const confirmCompletion = async () => {
    if (!confirmingTask) return;
    
    const taskToComplete = confirmingTask;
    setConfirmingTask(null); // Close modal
    setReplacingTaskId(taskToComplete.id); // Show spinner on the row

    try {
      // 1. Generate a single new task
      const currentTaskTexts = tasks.filter(t => t.category === taskToComplete.category).map(t => t.text);
      const newTexts = await generateNewTasks(taskToComplete.category, currentTaskTexts, userProfile, 1);
      
      // 2. Create the new task object
      let newTasksToAdd: TaskItem[] = [];
      if (newTexts.length > 0) {
        newTasksToAdd = [{
          id: Date.now().toString() + Math.random().toString(),
          category: taskToComplete.category,
          text: newTexts[0],
          isCompleted: false
        }];
      }

      // 3. Remove the old task and add the new one
      const updatedTasks = tasks.filter(t => t.id !== taskToComplete.id).concat(newTasksToAdd);
      
      setTasks(updatedTasks);
      
      // Persist
      const updatedProfile = { ...userProfile, activeTasks: updatedTasks };
      localStorage.setItem('studyVikingUser', JSON.stringify(updatedProfile));
    } catch (e) {
      console.error("Failed to replace task", e);
    } finally {
      setReplacingTaskId(null);
    }
  };

  const handleGenerateMore = async (category: string) => {
    setLoadingCategory(category);
    const categoryTasks = tasks.filter(t => t.category === category).map(t => t.text);
    const newTexts = await generateNewTasks(category, categoryTasks, userProfile, 3);
    
    const newTasks: TaskItem[] = newTexts.map(text => ({
      id: Date.now().toString() + Math.random().toString(),
      category: category,
      text: text,
      isCompleted: false
    }));

    const updatedTasks = [...tasks, ...newTasks];
    setTasks(updatedTasks);
    
    // Persist
    const updatedProfile = { ...userProfile, activeTasks: updatedTasks };
    localStorage.setItem('studyVikingUser', JSON.stringify(updatedProfile));
    
    setLoadingCategory(null);
  };

  return (
    <div className="min-h-screen bg-sweden-sky dark:bg-gray-900 pb-12 relative transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm p-6 sticky top-0 z-10 transition-colors">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome, {userProfile.username}! 👋</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Everything international students need, organized in one place</p>
          </div>
          <div className="text-right flex items-center gap-3">
             <button 
                onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
             >
                <UserPen size={16} />
                <span className="hidden sm:inline">Edit Profile</span>
             </button>
             <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-yellow-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                aria-label="Toggle Dark Mode"
             >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DailyPhraseWidget />
          <WeatherWidget userProfile={userProfile} />
          <HolidayWidget />
        </div>
        
        {/* Topic Cards (Things the user wants to know about) */}
        <section>
           <div className="flex items-center gap-2 mb-4">
              
           </div>
           
           {userProfile.focusCategories && userProfile.focusCategories.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {userProfile.focusCategories.map((category) => (
                 <div key={category} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col transition-colors">
                    <div className="bg-sweden-blue/5 dark:bg-gray-700/50 p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">{category}</h3>
                        <span className="text-xs font-semibold bg-white dark:bg-gray-600 text-sweden-blue dark:text-blue-200 px-2 py-1 rounded-md border border-blue-100 dark:border-gray-500">
                            {tasks.filter(t => t.category === category && !t.isCompleted).length} tasks
                        </span>
                    </div>
                    <div className="p-2">
                        {tasks.filter(t => t.category === category).map((task) => (
                            <div key={task.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg group transition relative">
                                {replacingTaskId === task.id ? (
                                  <div className="flex items-center gap-3 w-full animate-pulse">
                                    <div className="w-5 h-5 rounded bg-gray-200 dark:bg-gray-600"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                                  </div>
                                ) : (
                                  <>
                                    <button 
                                        onClick={() => initiateTaskCompletion(task)}
                                        className="mt-0.5 text-gray-400 hover:text-sweden-blue transition-colors"
                                    >
                                        <Square size={20} />
                                    </button>
                                    <button 
                                        onClick={() => onTopicClick(task.text)}
                                        className="text-left text-sm font-medium flex-1 text-gray-700 dark:text-gray-300 hover:text-sweden-blue dark:hover:text-white"
                                    >
                                        {task.text}
                                    </button>
                                    <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-sweden-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </>
                                )}
                            </div>
                        ))}
                        
                        <div className="p-2 mt-1">
                            <button 
                                onClick={() => handleGenerateMore(category)}
                                disabled={loadingCategory === category}
                                className="w-full py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-sweden-blue dark:hover:text-blue-300 transition flex items-center justify-center gap-2"
                            >
                                {loadingCategory === category ? (
                                    <Loader className="animate-spin" size={14} />
                                ) : (
                                    <Plus size={14} />
                                )}
                                Generate more tasks
                            </button>
                        </div>
                    </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors">
               <p className="text-gray-500 dark:text-gray-400">You didn't select any specific categories during setup.</p>
               <button onClick={onEdit} className="text-sweden-blue font-bold mt-2 hover:underline">
                 Select focus area in your profile
               </button>
             </div>
           )}
        </section>

      </main>

      {/* Confirmation Modal */}
      {confirmingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmingTask(null)}></div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 max-w-sm w-full relative z-10 animate-fade-in-up transition-colors">
             <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CheckSquare className="text-green-600 dark:text-green-400" size={24} />
             </div>
             <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">Complete this task?</h3>
             <p className="text-center text-gray-600 dark:text-gray-300 mb-6 px-2">
               Have you finished <strong>"{confirmingTask.text}"</strong>? <br/>
               I will remove it and give you a new step.
             </p>
             <div className="flex gap-3">
                <button 
                  onClick={() => setConfirmingTask(null)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-600 font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmCompletion}
                  className="flex-1 py-3 rounded-xl bg-sweden-blue text-white font-bold shadow-md hover:bg-blue-700 transition"
                >
                  Yes, it's done!
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Floating Action Button for Chat */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-sweden-blue hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 flex items-center gap-2 font-bold"
          >
            <MessageCircle size={24} />
            <span className="hidden md:inline pr-2">Ask Assistant</span>
          </button>
        )}
      </div>

      {/* Chat Overlay Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none p-4">
          <div className="absolute inset-0 bg-black/20 pointer-events-auto" onClick={() => setIsChatOpen(false)}></div>
          <div className="bg-white dark:bg-gray-800 w-full max-w-md h-[80vh] sm:h-[600px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col pointer-events-auto relative overflow-hidden animate-fade-in-up transition-colors">
             <div className="bg-sweden-blue p-4 flex justify-between items-center text-white">
                <span className="font-bold flex items-center gap-2">
                   <MessageCircle size={20} />
                   Chat Assistant
                </span>
                <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
                   <X size={20} />
                </button>
             </div>
             <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
                <ChatInterface 
                  placeholder="Ask me anything..." 
                  onClose={() => setIsChatOpen(false)} 
                />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;