'use client';

import { useState } from 'react';
import UsersList from './UsersList';
import ChatWindow from './ChatWindow';

interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  profileImage: string;
  fullName: string;
  isOnline: boolean;
  lastActive?: string;
}

interface Chat {
  id: string;
  name?: string;
  participantIds: string[];
  createdBy: string;
  isGroup: boolean;
  lastMessage?: string;
  lastMessageAt?: string;
  participants: Array<{
    clerkId: string;
    firstName?: string;
    lastName?: string;
    email: string;
    profileImage?: string;
  }>;
}

export default function ChatContainer() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [loadingChat, setLoadingChat] = useState(false);

  const handleUserSelect = async (user: User) => {
    setSelectedUser(user);
    setLoadingChat(true);

    try {
      // Create or get existing chat
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantIds: [user.clerkId],
          isGroup: false,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.chat) {
        setChatId(data.chat.id);
      } else {
        console.error('Failed to get/create chat');
      }
    } catch (error) {
      console.error('Error getting/creating chat:', error);
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Users Sidebar - Instagram style */}
      <aside className="w-80 border-r border-zinc-200 bg-white">
        <UsersList
          selectedUserId={selectedUser?.clerkId}
          onUserSelect={handleUserSelect}
        />
      </aside>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {selectedUser && chatId ? (
          <ChatWindow chatId={chatId} otherUser={selectedUser} />
        ) : loadingChat ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-zinc-600">Loading chat...</div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-zinc-50">
            <div className="text-center">
              <div className="mb-4 text-6xl">💬</div>
              <h2 className="mb-2 text-2xl font-semibold text-black">
                Select a conversation
              </h2>
              <p className="text-zinc-600">
                Choose someone from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
