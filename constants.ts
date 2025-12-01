
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

export const SWEDISH_CITIES = [
  { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
  { name: "Gothenburg", lat: 57.7089, lng: 11.9746 },
  { name: "Malmö", lat: 55.6045, lng: 13.0038 },
  { name: "Uppsala", lat: 59.8586, lng: 17.6389 },
  { name: "Lund", lat: 55.7047, lng: 13.1910 },
  { name: "Linköping", lat: 58.4109, lng: 15.6214 },
  { name: "Umeå", lat: 63.8258, lng: 20.2630 },
  { name: "Örebro", lat: 59.2753, lng: 15.2134 },
  { name: "Västerås", lat: 59.6099, lng: 16.5448 },
  { name: "Helsingborg", lat: 56.0465, lng: 12.6945 },
  { name: "Norrköping", lat: 58.5877, lng: 16.1924 },
  { name: "Jönköping", lat: 57.7826, lng: 14.1618 },
  { name: "Gävle", lat: 60.6749, lng: 17.1413 },
  { name: "Borås", lat: 57.7210, lng: 12.9401 },
  { name: "Eskilstuna", lat: 59.3665, lng: 16.5077 },
  { name: "Halmstad", lat: 56.6745, lng: 12.8578 },
  { name: "Växjö", lat: 56.8777, lng: 14.8091 },
  { name: "Karlstad", lat: 59.4022, lng: 13.5115 },
  { name: "Sundsvall", lat: 62.3908, lng: 17.3069 },
  { name: "Luleå", lat: 65.5848, lng: 22.1567 },
  { name: "Trollhättan", lat: 58.2835, lng: 12.2858 },
  { name: "Östersund", lat: 63.1792, lng: 14.6357 },
  { name: "Borlänge", lat: 60.4842, lng: 15.4339 },
  { name: "Falun", lat: 60.6032, lng: 15.6290 },
  { name: "Skövde", lat: 58.3898, lng: 13.8461 },
  { name: "Kiruna", lat: 67.8557, lng: 20.2253 },
  { name: "Visby", lat: 57.6348, lng: 18.2948 }
].sort((a, b) => a.name.localeCompare(b.name));

// Key: Category Name, Value: Default 3 tasks
export const INITIAL_FOCUS_CATEGORIES: Record<string, string[]> = {
  "Legal & Migration": [
    "Apply for a Residence Permit",
    "Register with the tax agency",
    "Get a local ID Card"
  ],
  "Housing & Utilities": [
    "Sign up for student housing queues",
    "Understand your rental contract",
    "Set up home insurance"
  ],
  "Banking & Finance": [
    "Open a local Bank Account",
    "Set up digital ID (BankID)",
    "Understand mobile payments (Swish)"
  ],
  "Transport & Travel": [
    "Get a public transport card",
    "Register a bike or learn traffic rules",
    "Download essential travel apps"
  ],
  "Student Life": [
    "Get a Student Union Card",
    "Find course literature cheaply",
    "Understand the grading system"
  ],
  "Health & Safety": [
    "Register at a health center",
    "Find the nearest pharmacy",
    "Save emergency numbers"
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
