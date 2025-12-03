import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Use Google Gemini API with the provided key
    const googleApiKey = process.env.GOOGLE_API_KEY || 'AIzaSyAHpP_6M_ZQ7M7x5IDCMxt2382zISSmYfE';
    
    // Make request to Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${googleApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful AI assistant similar to Perplexity AI. Answer the following question comprehensively and provide relevant information:\n\n${query}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Google API error:', errorData);
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the generated text from Gemini response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
    
    return NextResponse.json({
      answer: generatedText,
      sources: ['Powered by Google Gemini AI'],
    });

  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { 
        answer: `I encountered an error processing your request. ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease make sure the API key is valid and has the necessary permissions.`,
        sources: []
      },
      { status: 200 }
    );
  }
}
