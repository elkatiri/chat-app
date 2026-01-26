import { connectToDatabase } from "@/app/lib/mongodb";


export async function GET() {
  try {
    await connectToDatabase();
    return new Response("✅ Database connection successful!");
  } catch (err) {
    return new Response("❌ Database connection failed: " + err, { status: 500 });
  }
}
