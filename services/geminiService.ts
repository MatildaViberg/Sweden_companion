
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { UserProfile, ChatMessage } from '../types';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction persona
const SYSTEM_INSTRUCTION = `
You are a friendly, clear, and helpful assistant designed for international students moving to Sweden.
Your tone should be: Warm, Simple, Supportive, Culturally sensitive, and Easy to understand for non-native English speakers.
Your purpose is to help users with practical daily life questions about moving to or living in Sweden.

Rules for Responses:
1. Speak in plain English unless the user chooses another language.
2. DO NOT use Swedish greetings (like "Hej") or words in your text unless specifically asked to translate or explain them. The user interface handles the "Phrase of the Day" separately.
3. Always keep instructions simple for new international students.
4. Be extremely concise and precise. Keep answers short and actionable.
5. Do NOT use asterisks (*) for formatting. Do not use bold text or markdown lists with *. Use dashes (-) for lists if needed.
6. Avoid long paragraphs—use short sentences.
7. When asked ambiguous questions, ask for clarification politely.
8. Never provide legal or medical advice; instead, redirect to official sources.
9. If the user asks about the user's specific details (like "when do I arrive?"), use the provided context.
10. Refer to yourself only as "your guide" or "guide". Do not use "Swedish study guide" or "Guide to Sweden".
11. SPECIAL RULE FOR VISAS/PERMITS: If the user asks about applying for a study visa or residence permit, you MUST base your answer EXCLUSIVELY on information from the Swedish Migration Agency (Migrationsverket). You must strictly recommend they visit this specific URL: https://www.migrationsverket.se/en/you-want-to-apply/study/higher-education.html#svid10_2cd2e409193b84c506a277ba

Context:
You are a supportive guide.
You are knowledgeable about Swedish culture, housing, weather, student life, and practical daily tasks.
You are friendly and welcoming to people from all cultures.
Focus on reducing anxiety for newcomers.
`;

let chatSession: Chat | null = null;

const getUserContextString = (userProfile: UserProfile) => `
    User Context:
    Name: ${userProfile.username}
    Origin: ${userProfile.originCountry}
    City in Sweden: ${userProfile.city || 'Not specified'}
    Already in Sweden: ${userProfile.inSweden ? 'Yes' : 'No'}
    Arrival Date: ${userProfile.arrivalDate}
    Stay Duration: ${userProfile.stayDuration}
    Age: ${userProfile.age}
    Focus Categories: ${userProfile.focusCategories ? userProfile.focusCategories.join(', ') : 'None specified'}
    Preferred Language: ${userProfile.preferredLanguage}
`;

export const initializeChat = (userProfile: UserProfile) => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION + getUserContextString(userProfile),
      temperature: 0.7, 
    },
  });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    throw new Error("Chat session not initialized");
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({
      message: message,
    });
    
    return response.text || "I'm sorry, I couldn't understand that perfectly. Could you try asking in a different way?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble connecting to my brain right now. Please try again in a moment! ☕";
  }
};

export const generateTopicGuide = async (topic: string, userProfile: UserProfile): Promise<string> => {
  try {
    const prompt = `
      Create a visual, structured guide about "${topic}" for a student from ${userProfile.originCountry} moving to Sweden.
      
      Return ONLY valid JSON. Do not include markdown formatting like \`\`\`json.
      
      The JSON structure must be:
      {
        "intro": "One concise sentence summarizing the topic.",
        "steps": [
          { "title": "Short Step Title", "desc": "One sentence actionable instruction." }
        ],
        "checklist": [ "Short item 1", "Short item 2" ],
        "proTip": "One cultural secret or money-saving tip.",
        "sources": [ "Name of Official Agency (URL)", "Name of website (URL)" ]
      }

      Requirements:
      - Concise, precise English.
      - No Swedish words.
      - No asterisks.
      - "steps" should describe the process (3-5 steps).
      - "checklist" should be 3-4 essential items.
      - "sources" should be real, authoritative Swedish sources (e.g., Skatteverket, Migrationsverket, 1177).
      - tailored to a stay of ${userProfile.stayDuration}.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json' 
      }
    });

    return response.text || "{}";
  } catch (error) {
    console.error("Guide Generation Error:", error);
    return JSON.stringify({
      intro: "Unable to load guide content.",
      steps: [],
      checklist: [],
      proTip: "Please try again later.",
      sources: []
    });
  }
};

export const generateNewTasks = async (category: string, currentTasks: string[], userProfile: UserProfile, count: number = 3): Promise<string[]> => {
  try {
    const prompt = `
      The user is an international student in Sweden.
      Category: "${category}".
      Current tasks they have: ${currentTasks.join(", ")}.
      
      Generate ${count} NEW, DIFFERENT, actionable checklist tasks for this category that an international student should know or do.
      
      Return ONLY valid JSON:
      {
        "tasks": ["Task 1", "Task 2"]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json' 
      }
    });
    
    const text = response.text || "{}";
    const parsed = JSON.parse(text);
    return parsed.tasks || [];

  } catch (error) {
    console.error("Task Generation Error:", error);
    return [];
  }
};
