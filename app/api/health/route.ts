import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Vibely API is healthy',
    timestamp: new Date().toISOString()
  });
}
