// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI as string;

// let cached = (global as any).mongoose || { conn: null, promise: null };

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }
import mongoose from "mongoose";

let isConnected = false;
const connectToDatabase = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
export default connectToDatabase;