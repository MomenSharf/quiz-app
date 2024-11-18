'use server';
import axios from 'axios';


export async function compareSentences(sentence1: string, sentence2?: string) {
  if (!sentence2) return; // Ensure both sentences are provided

  try {
    // Make the POST request using Axios
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
      {
        contents: [
          {
            parts: [
              { text: `Compare the following two sentences: "${sentence1}" and "${sentence2}". Please explain how they are similar or different.` },
              { text: sentence1 },
              { text: sentence2 }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, // API key from environment variables
        },
      }
    );

    return response.data; // Return the data received from the API

  } catch (error) {
    console.error('Error comparing sentences:', error);

    // Handle Axios specific errors
    if (axios.isAxiosError(error)) {
      console.error('Axios error response:', error.response?.data);
    }

    throw new Error('Failed to compare sentences');
  }
}
