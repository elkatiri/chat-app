import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Message from '@/lib/models/Message';
import Chat from '@/lib/models/Chat';
import User from '@/lib/models/User';
import { getSocketIO } from '@/lib/socket';

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('chatId');

    if (!chatId) {
      return NextResponse.json(
        { error: 'chatId query parameter is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    if (!chat.participantIds.includes(userId)) {
      return NextResponse.json(
        { error: 'Unauthorized to access this chat' },
        { status: 403 }
      );
    }

    const limit = parseInt(searchParams.get('limit') || '50');
    const before = searchParams.get('before');

    let query: any = { chatId };
    if (before) {
      query.createdAt = { $lt: new Date(before) };
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    const messagesWithUsers = await Promise.all(
      messages.reverse().map(async (msg) => {
        const user = await User.findOne({ clerkId: msg.userId });
        return {
          id: msg._id.toString(),
          content: msg.content,
          chatId: msg.chatId.toString(),
          userId: msg.userId,
          readBy: msg.readBy,
          createdAt: msg.createdAt,
          updatedAt: msg.updatedAt,
          user: user ? {
            clerkId: user.clerkId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileImage: user.profileImage,
          } : null,
        };
      })
    );

    return NextResponse.json({
      messages: messagesWithUsers,
      success: true
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { content, chatId } = body;

    if (!content || !chatId) {
      return NextResponse.json(
        { error: 'Content and chatId are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    if (!chat.participantIds.includes(userId)) {
      return NextResponse.json(
        { error: 'Unauthorized to send messages to this chat' },
        { status: 403 }
      );
    }

    const newMessage = await Message.create({
      content,
      chatId,
      userId,
      readBy: [userId],
    });

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: content,
      lastMessageAt: new Date(),
      updatedAt: new Date(),
    });

    const user = await User.findOne({ clerkId: userId });

    const messageData = {
      id: newMessage._id.toString(),
      content: newMessage.content,
      chatId: newMessage.chatId.toString(),
      userId: newMessage.userId,
      readBy: newMessage.readBy,
      createdAt: newMessage.createdAt,
      updatedAt: newMessage.updatedAt,
      user: user ? {
        clerkId: user.clerkId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
      } : null,
    };

    // Emit socket event for real-time updates
    const io = getSocketIO();
    if (io) {
      io.to(`chat:${chatId}`).emit('message-received', messageData);
    }

    return NextResponse.json({
      message: messageData,
      success: true
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
