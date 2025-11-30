
import React, { useState, useEffect } from 'react';
import { UserProfile, GuideData } from '../types';
import ChatInterface from './ChatInterface';
import { generateTopicGuide } from '../services/geminiService';
import { ArrowLeft, CheckCircle2, Lightbulb, ListOrdered, MessageCircle, X, ExternalLink, Search } from 'lucide-react';

interface TopicDetailProps {
  topic: string;
  userProfile: UserProfile;
  onBack: () => void;
}

const TopicDetail: React.FC<TopicDetailProps> = ({ topic, userProfile, onBack }) => {
  const [data, setData] = useState<GuideData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const jsonString = await generateTopicGuide(topic, userProfile);
      try {
        const parsed = JSON.parse(jsonString);
        setData(parsed);
      } catch (e) {
        console.error("Failed to parse guide JSON", e);
        // Fallback for error
        setData({
          intro: "We couldn't load the visual guide right now.",
          steps: [],
          checklist: [],
          proTip: "Try asking the chat assistant instead.",
          sources: []
        });
      }
      setLoading(false);
    };

    fetchContent();
  }, [topic, userProfile]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header Image/Banner Area */}
      <div className="bg-sweden-blue text-white pt-8 pb-16 px-4 md:px-8 relative overflow-hidden">
       
        
        <div className="max-w-4xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-100 hover:text-white transition font-medium mb-6"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{topic}</h1>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            {loading ? "Loading your guide..." : data?.intro}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-8 relative z-20 space-y-8">
        
        {loading ? (
           <div className="bg-white rounded-3xl p-8 shadow-sm animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-32 bg-gray-100 rounded-xl"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-100 rounded-xl"></div>
           </div>
        ) : (
          <>
            {/* Steps Timeline / Cards */}
            {data?.steps && data.steps.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                
                {/* Key Steps Container with Header Inside */}
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="md:col-span-2 flex items-center gap-3">
                    <div className="bg-sweden-sky p-2 rounded-xl text-sweden-blue">
                        <ListOrdered size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Key Steps</h2>
                  </div>

                  {data.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                       <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sweden-yellow text-gray-900 font-bold flex items-center justify-center text-lg shadow-sm">
                         {idx + 1}
                       </div>
                       <div>
                          <h3 className="font-bold text-lg text-gray-800 mb-2">{step.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {/* Checklist */}
              {data?.checklist && data.checklist.length > 0 && (
                <section className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-4 text-green-600">
                    <CheckCircle2 />
                    <h2 className="text-lg font-bold text-gray-800">Quick Checklist</h2>
                  </div>
                  <div className="space-y-3">
                    {data.checklist.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                         <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600">
                           <CheckCircle2 size={14} />
                         </div>
                         <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Pro Tip Card */}
              {data?.proTip && (
                <section className="bg-sweden-yellow/10 rounded-2xl p-6 border border-sweden-yellow/20 md:col-span-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3 text-yellow-700">
                    <Lightbulb className="fill-current" />
                    <h2 className="font-bold uppercase tracking-wider text-xs">Pro Tip</h2>
                  </div>
                  <p className="text-gray-800 font-medium italic">
                    "{data.proTip}"
                  </p>
                </section>
              )}
            </div>

            {/* Sources Section */}
            {data?.sources && data.sources.length > 0 && (
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-2 text-gray-600">
                        <Search size={20} />
                        <h2 className="text-lg font-bold">Recommended Sources</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">You can look up these websites for more official information:</p>
                    <ul className="space-y-2">
                        {data.sources.map((source, idx) => (
                            <li key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-800 font-medium">
                                <span className="w-1.5 h-1.5 bg-sweden-blue rounded-full flex-shrink-0"></span>
                                {source}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
          </>
        )}
      </div>

      {/* Floating Action Button for Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-sweden-blue hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 flex items-center gap-2 font-bold"
          >
            <MessageCircle size={24} />
            <span className="pr-2">Ask Assistant</span>
          </button>
        )}
      </div>

      {/* Chat Overlay Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none p-4">
          <div className="absolute inset-0 bg-black/20 pointer-events-auto" onClick={() => setIsChatOpen(false)}></div>
          <div className="bg-white w-full max-w-md h-[80vh] sm:h-[600px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col pointer-events-auto relative overflow-hidden">
             <div className="bg-sweden-blue p-4 flex justify-between items-center text-white">
                <span className="font-bold flex items-center gap-2">
                   <MessageCircle size={20} />
                   Chat about {topic}
                </span>
                <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
                   <X size={20} />
                </button>
             </div>
             <div className="flex-1 overflow-hidden">
                <ChatInterface 
                  placeholder="Ask a specific question..." 
                  onClose={() => setIsChatOpen(false)} 
                />
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TopicDetail;
    