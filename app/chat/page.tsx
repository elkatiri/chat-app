"use client"; // <-- must be at top for client-side hooks

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut, MessageSquare, UserCircle } from "lucide-react";

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300">
        Loading chat...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 border-r border-gray-700 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center text-gray-900">
            <MessageSquare />
          </div>
          <h1 className="text-xl font-bold">Premium Chat</h1>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl mb-6">
          <UserCircle className="w-10 h-10 text-yellow-400" />
          <div>
            <p className="font-semibold">{session?.user?.name}</p>
            <p className="text-xs text-gray-400">{session?.user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="mt-auto flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 transition"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-gray-700 px-6 flex items-center justify-between bg-gray-900">
          <h2 className="text-lg font-semibold">
            Welcome, {session?.user?.name} 👋
          </h2>
        </header>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="max-w-md bg-gray-800 p-4 rounded-xl">
            <p className="text-sm text-gray-300">
              👋 Hello <span className="text-yellow-400">{session?.user?.name}</span>, your chat system is ready.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 bg-gray-900">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
            />
            <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:scale-105 transition">
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
