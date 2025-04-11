export const callGeminiAPI = async (message: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // For Vite apps
  if (!apiKey) {
    console.error('Gemini API key is missing');
    return 'MemoBot cannot respond right now';
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are MemoBot a helpful medical assistant. Respond to: ${message}. Be clear under 30 words no punctuation like commas asterisks or quotes.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry I cannot answer that';
    const clean = raw
      .replace(/[*_,.;:!?]/g, '') // remove punctuation
      .replace(/\s+/g, ' ')
      .trim();

    return clean;
  } catch (error) {
    console.error('Error calling Gemini:', error);
    return 'MemoBot cannot respond right now';
  }
};
