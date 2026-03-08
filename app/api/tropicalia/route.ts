import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const apiKey = process.env.TROPICALIA_API_KEY;
    const projectId = process.env.TROPICALIA_PROJECT_ID;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing TROPICALIA_API_KEY environment variable' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.tropicalia.dev/v1/projects/${projectId}/search`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          retrieval_strategy: 'hybrid',
          expand_query: false,
          generate_answer: true,
          limit: 50,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Tropicalia API Error:', response.status, errorData);
      return NextResponse.json(
        { error: `Error from Tropicalia API: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    // Assuming the answer is located at data.answer (needs verification from actual response, but typical for "generate_answer: true" patterns)
    // We send back the whole data object just in case we need to parse it differently on the client.
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying to Tropicalia:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
