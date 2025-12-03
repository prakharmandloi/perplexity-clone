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

    // Use OpenAI API key from environment
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      return NextResponse.json(
        { 
          answer: `I received your query: "${query}"\n\nTo enable full AI-powered search capabilities, please add your OPENAI_API_KEY to the environment variables in Vercel.\n\nOnce configured, I'll be able to:\n- Provide intelligent answers using GPT-4\n- Search and reason through complex queries\n- Give comprehensive responses with context\n- Cite relevant information`,
          sources: []
        },
        { status: 200 }
      );
    }

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant similar to Perplexity AI. Provide comprehensive, well-researched answers with relevant context. Format your responses in markdown for better readability.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // Extract the generated text from OpenAI response
    const generatedText = data.choices?.[0]?.message?.content || 'No response generated';
    
    return NextResponse.json({
      answer: generatedText,
      sources: ['Powered by OpenAI GPT-4'],
    });

  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { 
        answer: `I encountered an error processing your request.\n\n**Error:** ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease make sure:\n- Your OpenAI API key is valid\n- You have sufficient credits in your OpenAI account\n- The API key has the necessary permissions`,
        sources: []
      },
      { status: 200 }
    );
  }
}
