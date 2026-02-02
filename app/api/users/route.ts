import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const users = await User.find({
      clerkId: { $ne: userId },
    }).sort({ firstName: 1, email: 1 });

    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    const usersWithStatus = users.map(user => {
      const lastActive = user.lastActive || user.updatedAt;
      const isOnline = lastActive && new Date(lastActive) > fiveMinutesAgo;
      
      return {
        id: user._id.toString(),
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        profileImage: user.profileImage || '',
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
        isOnline,
        lastActive: lastActive?.toISOString(),
      };
    });

    return NextResponse.json({
      users: usersWithStatus,
      success: true
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
