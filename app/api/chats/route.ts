import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Chat from '@/lib/models/Chat';
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
    
    const chats = await Chat.find({
      participantIds: userId,
    })
    .sort({ lastMessageAt: -1, updatedAt: -1 })
    .limit(50);

    const chatsWithDetails = await Promise.all(
      chats.map(async (chat) => {
        const otherParticipantIds = chat.participantIds.filter(id => id !== userId);
        const participants = await User.find({
          clerkId: { $in: otherParticipantIds }
        });

        let chatName = chat.name;
        if (!chat.isGroup && participants.length === 1) {
          const otherUser = participants[0];
          chatName = `${otherUser.firstName || ''} ${otherUser.lastName || ''}`.trim() || otherUser.email;
        }

        return {
          id: chat._id.toString(),
          name: chatName,
          participantIds: chat.participantIds,
          createdBy: chat.createdBy,
          isGroup: chat.isGroup,
          lastMessage: chat.lastMessage,
          lastMessageAt: chat.lastMessageAt,
          createdAt: chat.createdAt,
          updatedAt: chat.updatedAt,
          participants: participants.map(p => ({
            clerkId: p.clerkId,
            firstName: p.firstName,
            lastName: p.lastName,
            email: p.email,
            profileImage: p.profileImage,
          })),
        };
      })
    );

    return NextResponse.json({
      chats: chatsWithDetails,
      success: true
    });
  } catch (error) {
    console.error('Error fetching chats:', error);
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
    const { participantIds, name, isGroup } = body;

    if (!participantIds || !Array.isArray(participantIds) || participantIds.length === 0) {
      return NextResponse.json(
        { error: 'At least one participant is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const participants = [...new Set([userId, ...participantIds])];

    // Check if direct chat already exists (non-group with same participants)
    if (!isGroup && participants.length === 2) {
      const existingChat = await Chat.findOne({
        participantIds: { $all: participants, $size: 2 },
        isGroup: false,
      });

      if (existingChat) {
        return NextResponse.json({
          chat: {
            id: existingChat._id.toString(),
            name: existingChat.name,
            participantIds: existingChat.participantIds,
            createdBy: existingChat.createdBy,
            isGroup: existingChat.isGroup,
            createdAt: existingChat.createdAt,
            updatedAt: existingChat.updatedAt,
          },
          success: true
        });
      }
    }

    const newChat = await Chat.create({
      name: name || (isGroup ? 'Group Chat' : undefined),
      participantIds: participants,
      createdBy: userId,
      isGroup: isGroup || false,
    });

    return NextResponse.json({
      chat: {
        id: newChat._id.toString(),
        name: newChat.name,
        participantIds: newChat.participantIds,
        createdBy: newChat.createdBy,
        isGroup: newChat.isGroup,
        createdAt: newChat.createdAt,
        updatedAt: newChat.updatedAt,
      },
      success: true
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating chat:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
