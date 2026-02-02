'use client';

import { useEffect, useState } from 'react';

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

interface UsersListProps {
  selectedUserId?: string;
  onUserSelect: (user: User) => void;
}

export default function UsersList({ selectedUserId, onUserSelect }: UsersListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateActivity = async () => {
    try {
      await fetch('/api/users/activity', { method: 'POST' });
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchUsers();
    updateActivity();

    const activityInterval = setInterval(updateActivity, 2 * 60 * 1000);
    const usersInterval = setInterval(fetchUsers, 10 * 1000);

    return () => {
      clearInterval(activityInterval);
      clearInterval(usersInterval);
    };
  }, []);

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-zinc-600">Loading users...</div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-zinc-600">No other users found</div>
      </div>
    );
  }

  const onlineUsers = users.filter(user => user.isOnline);
  const offlineUsers = users.filter(user => !user.isOnline);

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="sticky top-0 border-b border-zinc-200 bg-white px-4 py-3">
        <h2 className="text-lg font-semibold text-black">
          Messages
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {onlineUsers.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Online
            </h3>
            <div className="space-y-1">
              {onlineUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => onUserSelect(user)}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                    selectedUserId === user.clerkId
                      ? 'bg-zinc-100'
                      : 'hover:bg-zinc-50'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.fullName}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-orange-400 text-sm font-semibold text-white">
                        {user.firstName?.[0] || user.email[0].toUpperCase()}
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-black truncate">
                      {user.fullName}
                    </div>
                    <div className="text-xs text-zinc-500 truncate">
                      {user.username || user.email}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {offlineUsers.length > 0 && (
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Offline
            </h3>
            <div className="space-y-1">
              {offlineUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => onUserSelect(user)}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors opacity-70 ${
                    selectedUserId === user.clerkId
                      ? 'bg-zinc-100 opacity-100'
                      : 'hover:bg-zinc-50'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.fullName}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-zinc-400 to-zinc-500 text-sm font-semibold text-white">
                        {user.firstName?.[0] || user.email[0].toUpperCase()}
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-zinc-400"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-black truncate">
                      {user.fullName}
                    </div>
                    <div className="text-xs text-zinc-500 truncate">
                      {user.username || user.email}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
