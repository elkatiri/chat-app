import { connectToDatabase } from "@/app/lib/mongodb";
import Conversation from "@/app/models/Conversation";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  try {
    await connectToDatabase();
    const conversations = await Conversation.find();
    return NextResponse.json(conversations);
  } catch (err:any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newConv = await Conversation.create(data);
    return NextResponse.json(newConv);
  } catch (err:any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
