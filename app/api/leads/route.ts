import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const lead = await db.addLead({ name, email, phone });

    // Simulate Automation (Email/WhatsApp)
    console.log(`[Automation] Sending Welcome Email to ${email}`);
    console.log(`[Automation] Sending WhatsApp to ${phone || 'No Phone'}`);

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
