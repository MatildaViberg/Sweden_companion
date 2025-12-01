
import React, { useMemo, useState, useEffect } from 'react';
import { UserProfile, WeatherSeason } from '../types';
import { DAILY_PHRASES, SWEDISH_HOLIDAYS, SWEDISH_CITIES } from '../constants';
import { CloudRain, Sun, Snowflake, Wind, Coffee, CalendarHeart, RefreshCw, Thermometer } from 'lucide-react';

interface WidgetProps {
  userProfile: UserProfile;
}

export const DailyPhraseWidget: React.FC = () => {
  // Initial state based on date, but allow updates
  const [phraseIndex, setPhraseIndex] = useState(() => {
    const today = new Date().getDate();
    return today % DAILY_PHRASES.length;
  });

  const phrase = DAILY_PHRASES[phraseIndex];

  const handleNewPhrase = () => {
    // Generate a random index that is different from the current one
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * DAILY_PHRASES.length);
    } while (newIndex === phraseIndex && DAILY_PHRASES.length > 1);
    
    setPhraseIndex(newIndex);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border-l-4 border-sweden-yellow transition-colors relative group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <Coffee className="text-sweden-blue dark:text-blue-300" size={20} />
          <h3 className="font-bold text-gray-700 dark:text-gray-200">Phrase of the Day</h3>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-baseline gap-2 flex-wrap">
            <p className="text-2xl font-bold text-sweden-blue dark:text-blue-300">{phrase.phrase}</p>
            <span className="text-sm text-gray-400 font-mono tracking-wide">{phrase.phonetic}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">"{phrase.pronunciation}"</p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{phrase.meaning}</p>
      </div>

      <button 
        onClick={handleNewPhrase}
        className="mt-4 w-full py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-sm font-bold rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition flex items-center justify-center gap-2"
      >
        <RefreshCw size={14} /> New phrase
      </button>
    </div>
  );
};

export const WeatherWidget: React.FC<WidgetProps> = ({ userProfile }) => {
  const [temp, setTemp] = useState<number | null>(null);
  
  // Fetch real temperature from Open-Meteo
  useEffect(() => {
    const fetchWeather = async () => {
      if (!userProfile.city) return;
      
      const cityData = SWEDISH_CITIES.find(c => c.name === userProfile.city);
      if (cityData) {
        try {
          const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityData.lat}&longitude=${cityData.lng}&current_weather=true`);
          const data = await response.json();
          if (data.current_weather) {
            setTemp(data.current_weather.temperature);
          }
        } catch (e) {
          console.error("Failed to fetch weather", e);
        }
      }
    };
    
    fetchWeather();
  }, [userProfile.city]);

  const weatherInfo = useMemo(() => {
    const month = new Date().getMonth() + 1; // 1-12
    let season: WeatherSeason = WeatherSeason.WINTER;
    let icon = <Snowflake className="text-blue-300" size={32} />;
    let clothing = "Warm coat, hat, gloves, scarf.";
    let tip = "Reflectors are important in the dark!";

    if (month >= 3 && month <= 5) {
      season = WeatherSeason.SPRING;
      icon = <CloudRain className="text-blue-400" size={32} />;
      clothing = "Light jacket, umbrella, layers.";
      tip = "The weather changes fast. Be prepared for rain.";
    } else if (month >= 6 && month <= 8) {
      season = WeatherSeason.SUMMER;
      icon = <Sun className="text-yellow-400" size={32} />;
      clothing = "T-shirt, light sweater for evenings.";
      tip = "Long days! Enjoy the midnight sun.";
    } else if (month >= 9 && month <= 11) {
      season = WeatherSeason.AUTUMN;
      icon = <Wind className="text-gray-400" size={32} />;
      clothing = "Waterproof jacket, boots.";
      tip = "It gets windy and dark. Stay cozy.";
    }

    // Override if not in Sweden
    const locationText = userProfile.city ? `Weather in ${userProfile.city}` : (userProfile.inSweden ? "Current Season" : "Expected in Sweden");

    return { season, icon, clothing, tip, locationText };
  }, [userProfile.inSweden, userProfile.city]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border-l-4 border-sweden-blue transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-gray-700 dark:text-gray-200">{weatherInfo.locationText}</h3>
          <div className="flex items-center gap-2 mt-1">
             {temp !== null && (
                 <span className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    {temp}°C
                 </span>
             )}
             <span className="text-sm text-gray-500 dark:text-gray-400">{weatherInfo.season}</span>
          </div>
        </div>
        {weatherInfo.icon}
      </div>
      <div className="mt-3 space-y-2">
        <p className="text-sm dark:text-gray-300"><strong>Wear:</strong> {weatherInfo.clothing}</p>
        <p className="text-sm bg-sweden-sky dark:bg-blue-900/30 text-sweden-blue dark:text-blue-200 p-2 rounded-lg">
           💡 {weatherInfo.tip}
        </p>
      </div>
    </div>
  );
};

export const HolidayWidget: React.FC = () => {
  const { todayHoliday, nextHoliday } = useMemo(() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayString = `${month}-${day}`;

    const holiday = SWEDISH_HOLIDAYS.find(h => h.date === todayString);
    
    // Find next holiday
    let next = SWEDISH_HOLIDAYS.find(h => h.date > todayString);
    // Wrap around to next year if none found this year
    if (!next && SWEDISH_HOLIDAYS.length > 0) {
      next = SWEDISH_HOLIDAYS[0];
    }

    return { todayHoliday: holiday, nextHoliday: next };
  }, []);

  const formatDate = (dateStr: string) => {
    const [m, d] = dateStr.split('-');
    const date = new Date(2024, parseInt(m) - 1, parseInt(d));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border-l-4 border-red-400 transition-colors">
       <div className="flex items-center gap-2 mb-2">
        <CalendarHeart className="text-red-500" size={20} />
        <h3 className="font-bold text-gray-700 dark:text-gray-200">
            {todayHoliday ? "Today's Holiday" : "Upcoming Holiday"}
        </h3>
      </div>
      {todayHoliday ? (
        <div>
           <p className="text-xl font-bold text-red-500">{todayHoliday.name}</p>
           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{todayHoliday.description}</p>
        </div>
      ) : nextHoliday ? (
        <div>
           <div className="flex justify-between items-baseline mb-1">
             <p className="font-bold text-gray-800 dark:text-gray-100">{nextHoliday.name}</p>
             <span className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md whitespace-nowrap">
                {formatDate(nextHoliday.date)}
             </span>
           </div>
           <p className="text-sm text-gray-600 dark:text-gray-400">{nextHoliday.description}</p>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No holidays found.</p>
      )}
    </div>
  );
};
