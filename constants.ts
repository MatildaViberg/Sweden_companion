
import { DailyPhrase, SwedishHoliday } from './types';

export const EXAMPLE_USERNAMES = [
  "StudyViking", "NewInSweden", "NordicExplorer", "FikaFan", "SveaStudent",
  "AuroraChaser", "LagomLife", "StockholmSoul", "ScandiScholar", "VikingVoyager",
  "SnowyOwl", "BalticBreeze", "MooseTracker", "MidnightSun", "ArchipelagoAdventurer",
  "MetroRider", "BikeCommuter", "ForestWalker", "LakeLover", "BunEater",
  "NorthStar", "IceBreaker", "GothenburgGuest", "MalmoMover", "UppsalaUser"
];

export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "East Timor (Timor-Leste)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe",
  "Other"
];

// Key: Category Name, Value: Default 3 tasks
export const INITIAL_FOCUS_CATEGORIES: Record<string, string[]> = {
  "Legal & Migration": [
    "Apply for a Residence Permit (Uppehållstillstånd)",
    "Register with Skatteverket (Personnummer)",
    "Get a Swedish ID Card (ID-kort)"
  ],
  "Housing & Utilities": [
    "Sign up for student housing queues (Bostadskö)",
    "Understand your rental contract",
    "Set up home insurance (Hemförsäkring)"
  ],
  "Banking & Finance": [
    "Open a Swedish Bank Account",
    "Get a BankID (Digital ID)",
    "Understand Swish (Mobile payments)"
  ],
  "Transport & Travel": [
    "Get a public transport card (SL/Västtrafik/Skånetrafiken)",
    "Register a bike or learn traffic rules",
    "Download essential travel apps"
  ],
  "Student Life": [
    "Get a Student Union Card (Mecenat/Studentkortet)",
    "Find course literature cheaply",
    "Understand the Swedish grading system"
  ],
  "Health & Safety": [
    "Register at a health center (Vårdcentral)",
    "Find the nearest pharmacy (Apotek)",
    "Save emergency numbers (112 vs 1177)"
  ]
};

export const TOPICS_LIST = Object.keys(INITIAL_FOCUS_CATEGORIES);

export const SWEDISH_HOLIDAYS: SwedishHoliday[] = [
  { date: '01-01', name: 'New Year\'s Day', description: 'Start of the new year, often quiet in Sweden as people recover from the night before.' },
  { date: '01-06', name: 'Epiphany (Trettondedag jul)', description: 'A public holiday marking the end of the Christmas season.' },
  { date: '04-30', name: 'Walpurgis Night (Valborg)', description: 'Welcoming spring with large bonfires and choir singing.' },
  { date: '06-06', name: 'National Day of Sweden', description: 'Celebrated with flags and ceremonies, though a newer holiday tradition.' },
  { date: '06-21', name: 'Midsummer Eve', description: 'A major Swedish celebration with dancing around a maypole, herring, and strawberries.' }, // Note: Date varies, fixed for simplicity example
  { date: '06-22', name: 'Midsummer Day', description: 'Resting day after the celebrations.' },
  { date: '12-13', name: 'Lucia', description: 'Festival of Light featuring saffron buns and candle-lit processions.' },
  { date: '12-24', name: 'Christmas Eve (Julafton)', description: 'The main day Swedes celebrate Christmas with Donald Duck on TV and gifts.' },
  { date: '12-25', name: 'Christmas Day', description: 'A quiet family day.' },
  { date: '12-31', name: 'New Year\'s Eve', description: 'Celebrated with friends, dinner, and fireworks.' }
];

export const DAILY_PHRASES: DailyPhrase[] = [
  { phrase: "Fika", pronunciation: "fee-kah", phonetic: "/ˈfiːˌka/", meaning: "A Swedish coffee break with pastries, often shared with friends." },
  { phrase: "Lagom", pronunciation: "lah-gom", phonetic: "/ˈlɑːˌɡɔm/", meaning: "Not too much, not too little. Just the right amount." },
  { phrase: "Hej", pronunciation: "hey", phonetic: "/hɛj/", meaning: "Hello. Friendly and works in almost every situation." },
  { phrase: "Tack", pronunciation: "tack", phonetic: "/tak/", meaning: "Thank you. You will say this a lot!" },
  { phrase: "Ursäkta", pronunciation: "ur-shek-ta", phonetic: "/ˈʉːˌʂɛkːta/", meaning: "Excuse me. Useful when asking for help or bumping into someone." },
  { phrase: "Skål", pronunciation: "skohl", phonetic: "/skoːl/", meaning: "Cheers! Used when toasting with drinks." },
  { phrase: "Välkommen", pronunciation: "vel-kom-men", phonetic: "/ˈvɛːlˌkɔmːɛn/", meaning: "Welcome." },
  { phrase: "Trevligt att träffas", pronunciation: "trev-ligt at tre-fas", phonetic: "/ˈtreːvˌlɪt at ˈtrɛfːas/", meaning: "Nice to meet you." },
  { phrase: "Var ligger...", pronunciation: "var lig-ger", phonetic: "/vɑːr ˈlɪɡːɛr/", meaning: "Where is...? (Used for asking directions)" },
  { phrase: "En kanelbulle, tack", pronunciation: "en ka-nel-bul-le tack", phonetic: "/ɛn kaˈneːlˌbɵlːɛ tak/", meaning: "A cinnamon bun, please." },
  { phrase: "Jag förstår inte", pronunciation: "yag fur-shtor in-te", phonetic: "/jɑːɡ fœˈʂʈoːr ˈɪnˌtɛ/", meaning: "I don't understand." },
  { phrase: "Pratar du engelska?", pronunciation: "prah-tar du eng-el-ska", phonetic: "/ˈprɑːˌtar dʉː ˈɛŋːɛlˌska/", meaning: "Do you speak English?" },
  { phrase: "Vad kostar det?", pronunciation: "vad kos-tar de", phonetic: "/vɑːd ˈkɔsˌtar deː/", meaning: "How much does it cost?" },
  { phrase: "Tunnelbana", pronunciation: "tun-nel-bah-na", phonetic: "/ˈtɵnːɛlˌbɑːna/", meaning: "Subway or Metro." },
  { phrase: "Systembolaget", pronunciation: "sis-tem-bo-lah-get", phonetic: "/sʏˈsteːmbʊˌlɑːɡɛt/", meaning: "The government-owned alcohol store." },
  { phrase: "Svenska kronor", pronunciation: "sven-ska kro-nor", phonetic: "/ˈsvɛnˌska ˈkroːˌnʊr/", meaning: "Swedish crowns (the currency)." },
  { phrase: "Hur mår du?", pronunciation: "hur mor du", phonetic: "/hʉːr moːr dʉː/", meaning: "How are you?" },
  { phrase: "Bra, tack", pronunciation: "brah tack", phonetic: "/brɑː tak/", meaning: "Good, thanks." }
];
