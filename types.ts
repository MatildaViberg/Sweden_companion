
export interface TaskItem {
  id: string;
  category: string;
  text: string;
  isCompleted: boolean;
}

export interface UserProfile {
  username: string;
  originCountry: string;
  inSweden: boolean;
  arrivalDate: string; // YYYY-MM-DD
  stayDuration: string;
  age: number;
  focusCategories: string[]; // The broad categories selected
  activeTasks: TaskItem[]; // The specific checklist items
  preferredLanguage: string;
  isOnboarded: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum WeatherSeason {
  WINTER = 'Winter',
  SPRING = 'Spring',
  SUMMER = 'Summer',
  AUTUMN = 'Autumn',
}

export interface SwedishHoliday {
  date: string; // MM-DD
  name: string;
  description: string;
}

export interface DailyPhrase {
  phrase: string;
  pronunciation: string;
  phonetic: string;
  meaning: string;
}

export interface GuideData {
  intro: string;
  steps: { title: string; desc: string }[];
  checklist: string[];
  proTip: string;
  sources: string[];
}
