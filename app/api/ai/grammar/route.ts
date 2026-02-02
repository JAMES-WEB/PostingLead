import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    // Mock Grammar Check
    // In a real app, this would call OpenAI or Grammarly API
    const corrected = text
      .replace(/teh/g, 'the')
      .replace(/recieve/g, 'receive')
      .replace(/\s+/g, ' ')
      .trim();

    const suggestions = [];
    if (text !== corrected) {
      suggestions.push('Fixed common typos and spacing.');
    }

    return NextResponse.json({ corrected, suggestions });
  } catch (error) {
    return NextResponse.json({ error: 'AI processing failed' }, { status: 500 });
  }
}
