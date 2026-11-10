import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Calls the Gemini 2.5 Flash Image model to edit/generate an image based on a source image and a prompt.
 */
export const generateHeadshot = async (
  imageBase64: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  // Check if API key exists
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here' || apiKey === '') {
    throw new Error('❌ No Gemini API key found! Please add your API key to the .env file.');
  }

  // Initialize the client with the API key from the environment
  const ai = new GoogleGenAI({ apiKey });

  console.log('🚀 Using Gemini API to generate headshot...');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        // Crucial: Request an IMAGE response modality
        responseModalities: [Modality.IMAGE],
      },
    });

    console.log('✅ Gemini API response received successfully!');

    // Extract the generated image bytes
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          console.log('✅ Image data extracted successfully!');
          return part.inlineData.data;
        }
      }
    }

    throw new Error("No image data found in the response.");
  } catch (error: any) {
    console.error("❌ Gemini API Error:", error);

    // Handle quota exceeded errors with helpful message
    if (error?.message?.includes('429') || error?.message?.includes('quota')) {
      throw new Error(
        'Your API quota has been exceeded. Please try:\n1. Wait 24 hours for quota reset\n2. Create a new Google account and get a new API key\n3. Create a new project at https://aistudio.google.com/apikey'
      );
    }

    // Handle invalid API key
    if (error?.message?.includes('API_KEY_INVALID') || error?.message?.includes('API key')) {
      throw new Error('Invalid API key. Please check your .env file and make sure the key is correct.');
    }

    // Handle other errors
    throw new Error(error?.message || 'Failed to generate image. Please try again.');
  }
};
