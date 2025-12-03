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

    // Use environment variable or fallback to provided key
    const bhindiApiKey = process.env.BHINDI_API_KEY || 'AIzaSyAHpP_6M_ZQ7M7x5IDCMxt2382zISSmYfE';
    
    if (!bhindiApiKey) {
      return NextResponse.json(
        { 
          answer: `I received your query: "${query}"\n\nTo enable full AI-powered search capabilities, please add your BHINDI_API_KEY to the environment variables.\n\nOnce configured, I'll be able to:\n- Search the web in real-time\n- Provide comprehensive answers with sources\n- Reason through complex queries\n- Cite reliable sources`,
          sources: []
        },
        { status: 200 }
      );
    }

    // Make request to Bhindi API with Perplexity agent
    const response = await fetch('https://api.bhindi.io/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bhindiApiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: query
          }
        ],
        agents: ['perplexity'], // Use Perplexity agent
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Bhindi API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      answer: data.response || data.content || data.message || 'No response received',
      sources: data.sources || [],
    });

  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process search query',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
