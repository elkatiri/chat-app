'use client';

import { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  content: string;
  chatId: string;
  userId: string;
  readBy: string[];
  createdAt: string;
  user: {
    clerkId: string;
    firstName?: string;
    lastName?: string;
    email: string;
    profileImage?: string;
  } | null;
}

interface ChatWindowProps {
  chatId: string;
  otherUser: {
    clerkId: string;
    fullName: string;
    email: string;
    firstName?: string;
    profileImage?: string;
    isOnline: boolean;
  };
}

export default function ChatWindow({ chatId, otherUser }: ChatWindowProps) {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages?chatId=${chatId}&limit=50`);
      const data = await response.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending || !socket) return;

    const content = newMessage.trim();
    setNewMessage('');
    setSending(true);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          chatId,
        }),
      });

      const data = await response.json();
      if (data.success && data.message) {
        // Add message to local state immediately
        setMessages((prev) => [...prev, data.message]);
        scrollToBottom();
        
        // Emit socket event to notify other users
        socket.emit('new-message', {
          chatId,
          message: data.message,
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setNewMessage(content);
    } finally {
      setSending(false);
    }
  };

  // Initialize Socket.io connection
  useEffect(() => {
    if (!chatId) return;

    // Create socket connection
    const newSocket = io({
      path: '/api/socket',
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      // Join the chat room
      newSocket.emit('join-chat', chatId);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Listen for new messages from other users
    newSocket.on('message-received', (message: Message) => {
      setMessages((prev) => {
        // Avoid duplicates
        if (prev.some((m) => m.id === message.id)) {
          return prev;
        }
        return [...prev, message];
      });
      scrollToBottom();
    });

    setSocket(newSocket);

    // Initial fetch of messages
    fetchMessages();

    // Cleanup on unmount or chatId change
    return () => {
      newSocket.emit('leave-chat', chatId);
      newSocket.disconnect();
    };
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-zinc-600">Loading messages...</div>
      </div>
    );
  }

  const currentUserId = user?.id;

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Chat Header - Instagram style */}
      <div className="border-b border-zinc-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            {otherUser.profileImage ? (
              <img
                src={otherUser.profileImage}
                alt={otherUser.fullName}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-orange-400 text-sm font-semibold text-white">
                {otherUser.firstName?.[0] || otherUser.email[0].toUpperCase()}
              </div>
            )}
            {otherUser.isOnline && (
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-black">
              {otherUser.fullName}
            </h3>
            <p className="text-xs text-zinc-500">
              {otherUser.isOnline ? 'Active now' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-zinc-50 p-4">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <p className="text-zinc-500">No messages yet. Start the conversation!</p>
              </div>
            </div>
          ) : (
            messages.map((message) => {
              const isOwnMessage = message.userId === currentUserId;
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {message.user?.profileImage ? (
                      <img
                        src={message.user.profileImage}
                        alt={message.user.firstName || 'User'}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-orange-400 text-xs font-semibold text-white">
                        {message.user?.firstName?.[0] || message.user?.email[0].toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        isOwnMessage
                          ? 'bg-black text-white'
                          : 'bg-white text-black border border-zinc-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500 px-1">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input - Instagram style */}
      <div className="border-t border-zinc-200 bg-white p-4">
        <form onSubmit={sendMessage} className="mx-auto max-w-2xl">
          <div className="flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 focus-within:border-black focus-within:bg-white">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || sending}
              className="rounded-full bg-black px-4 py-1.5 text-sm font-semibold text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
