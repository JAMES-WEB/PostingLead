import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    // Mock Image Generation
    // Returning a placeholder image based on the prompt keywords
    const keyword = prompt.split(' ')[0] || 'business';
    const imageUrl = `https://placehold.co/600x400?text=${encodeURIComponent(keyword)}`;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Image generation failed' }, { status: 500 });
  }
}
