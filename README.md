# Sweden Companion: Your Student Guide 🇸🇪

A warm, supportive, and helpful web application designed for international students moving to Sweden. This app acts as a digital guide, helping users navigate the complexities of moving to a new country with features like checklist generation, cultural tips, and an AI-powered assistant.

## Features

- **Personalized Onboarding**: Tailors advice based on your origin country, age, and arrival date.
- **Dynamic Checklists**: Generates "Focus Areas" (e.g., Banking, Migration, Housing) with actionable tasks.
- **AI Assistant**: A chat interface powered by Google Gemini to answer questions about life in Sweden.
- **Smart Widgets**:
  - **Phrase of the Day**: Learn simple Swedish phrases with phonetics.
  - **Weather Tips**: Get clothing recommendations based on the current season.
  - **Holiday Tracker**: See upcoming Swedish cultural holidays.
- **Topic Guides**: Detailed visual guides on specific topics with reliable sources.

## Tech Stack

- **Frontend**: React (with Hooks), TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A Google Gemini API Key.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sweden-companion.git
   cd sweden-companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## Deployment

### Vercel (Recommended)

1. Push this code to a GitHub repository.
2. Import the project into Vercel.
3. Add your `API_KEY` in the Vercel Project Settings > Environment Variables.
4. Deploy!

### Google Cloud Run

1. Build the container:
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT-ID/sweden-companion
   ```
2. Deploy the service:
   ```bash
   gcloud run deploy sweden-companion --image gcr.io/PROJECT-ID/sweden-companion --platform managed
   ```

## License

MIT
