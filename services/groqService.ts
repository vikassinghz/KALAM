import Groq from 'groq-sdk';

export const generateContent = async (prompt: string, expectJson: boolean = false): Promise<string> => {
  try {
    const groq = new Groq({
      apiKey: import.meta.env.VITE_GROQ_API_KEY,
      dangerouslyAllowBrowser: true // Enable browser usage
    });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: expectJson 
            ? `${prompt}\nRespond only with a JSON object that has 'subject' and 'body' fields.`
            : prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      stop: null,
      stream: false,
    });

    const response = chatCompletion.choices[0]?.message?.content || '';

    if (expectJson) {
      try {
        // Ensure the response is valid JSON
        JSON.parse(response);
      } catch (e) {
        throw new Error('Failed to generate valid JSON response');
      }
    }

    return response;
  } catch (error) {
    console.error("Error generating content with GROQ:", error);
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }
    return "An unknown error occurred while generating content with GROQ.";
  }
};
