
import { GoogleGenAI, Type } from "@google/genai";
import { Suggestion, PartyTheme, ThemeDetails } from "../types";

export const getPartySuggestions = async (
  theme: PartyTheme, 
  userQuery: string = ""
): Promise<Suggestion[]> => {
  const defaultSuggestions: Suggestion[] = [
    { category: 'attire', title: 'Kebaya Encim', content: 'Gunakan kebaya warna cerah dengan kain batik untuk tampilan klasik Peranakan.' },
    { category: 'gift', title: 'Vintage Tea Set', content: 'Set cangkir keramik motif bunga akan sangat berkesan untuk kado tea party.' },
    { category: 'message', title: 'Ucapan Cantik', content: 'Selamat ulang tahun ke-27! Semoga harimu penuh kebahagiaan dan teh hangat.' }
  ];

  const apiKey = process.env.API_KEY;
  if (!apiKey) return defaultSuggestions;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Berikan 3 saran kreatif untuk pesta ulang tahun. Tema: ${theme}. User bertanya: ${userQuery}. Gunakan Bahasa Indonesia yang sopan dan estetik. Kembalikan dalam format JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              title: { type: Type.STRING },
              content: { type: Type.STRING }
            },
            required: ["category", "title", "content"]
          }
        }
      }
    });
    
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.warn("Gemini API Error - using defaults:", error);
    return defaultSuggestions;
  }
};

export const getThemeDescription = async (theme: PartyTheme): Promise<ThemeDetails> => {
  const fallback = { 
    description: "Perayaan penuh kehangatan tradisi Peranakan.", 
    vibe: "Elegant, nostalgic, and joyful.", 
    dressCode: "Kebaya, Batik, or Ethnic Chic." 
  };

  const apiKey = process.env.API_KEY;
  if (!apiKey) return fallback;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Jelaskan secara mendalam tema pesta ulang tahun ke-27 ini dalam Bahasa Indonesia: ${theme}. Berikan deskripsi estetik, vibe pesta, dan aturan dressCode. Kembalikan dalam format JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            vibe: { type: Type.STRING },
            dressCode: { type: Type.STRING }
          },
          required: ["description", "vibe", "dressCode"]
        }
      }
    });
    
    return JSON.parse(response.text || JSON.stringify(fallback));
  } catch (error) {
    console.warn("Gemini API Theme Error - using fallback:", error);
    return fallback;
  }
};
