import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/chat");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/20 to-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="text-3xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 bg-clip-text text-transparent">
            Vibely
          </span>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="container mx-auto px-6 pb-12">
        <div className="grid min-h-[calc(100vh-140px)] items-center gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* Left Section - Hero Content */}
          <div className="flex flex-col justify-center space-y-10 pt-8 lg:pt-0">
            <div className="space-y-8">
              <h1 className="text-5xl font-black leading-[1.08] tracking-tight text-zinc-900 sm:text-6xl lg:text-[4.5rem]">
                Chat with{" "}
                <span className="inline-block bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 bg-clip-text text-transparent">
                  friends worldwide
                </span>{" "}
                in real-time
              </h1>
              
              <p className="max-w-lg text-lg leading-relaxed text-zinc-600 sm:text-xl">
                Connect with friends from every corner of the world. Share moments, 
                send messages, and stay close no matter the distance.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/sign-up"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-pink-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/35"
              >
                <span className="relative z-10">Get started</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-600 via-orange-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Link>
              
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-full border-2 border-zinc-200 bg-white px-10 py-4 text-base font-semibold text-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-pink-400 hover:text-pink-500 hover:shadow-md"
              >
                Log in
              </Link>
            </div>

            {/* Social Proof with Globe Context */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                <div className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-rose-400 ring-2 ring-pink-100"></div>
                <div className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-orange-400 to-amber-400 ring-2 ring-orange-100"></div>
                <div className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-violet-400 ring-2 ring-purple-100"></div>
                <div className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-cyan-400 ring-2 ring-blue-100"></div>
              </div>
              <div className="text-sm text-zinc-600">
                <span className="font-semibold text-zinc-900">Friends from 50+ countries</span> chatting now
              </div>
            </div>
          </div>

          {/* Right Section - Visual Cards (Desktop) */}
          <div className="relative hidden h-[700px] lg:block">
            <div className="absolute inset-0">
              
              {/* Chat Card 1 - From Tokyo */}
              <div className="absolute left-0 top-4 z-30 w-80 animate-float-slow">
                <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-100 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gradient-to-br from-pink-400 to-orange-400 ring-2 ring-pink-100">
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">YM</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-zinc-900">Yuki Matsuda</div>
                      <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <span>🇯🇵 Tokyo</span>
                        <span>•</span>
                        <span>2 min ago</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message bubble */}
                  <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 p-4 shadow-sm">
                    <p className="text-sm leading-relaxed text-zinc-800">Good morning everyone! 🌸 Starting my day with matcha!</p>
                  </div>
                  
                  {/* Reactions */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1">
                      <span className="text-base">❤️</span>
                      <span className="text-xs font-medium text-zinc-600">12</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1">
                      <span className="text-base">🍵</span>
                      <span className="text-xs font-medium text-zinc-600">8</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Card 2 - From Paris (NEW) */}
              <div className="absolute left-12 top-72 z-20 w-72 animate-float-medium" style={{ animationDelay: '0.5s' }}>
                <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-100 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 ring-2 ring-blue-100">
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">MC</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-zinc-900">Marie Claire</div>
                      <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <span>🇫🇷 Paris</span>
                        <span>•</span>
                        <span>8 min ago</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message bubble */}
                  <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 shadow-sm">
                    <p className="text-sm leading-relaxed text-zinc-800">Just visited the Louvre! Art is amazing 🎨✨</p>
                  </div>
                  
                  {/* Reactions */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1">
                      <span className="text-base">🎨</span>
                      <span className="text-xs font-medium text-zinc-600">22</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-cyan-50 px-3 py-1">
                      <span className="text-base">😍</span>
                      <span className="text-xs font-medium text-zinc-600">19</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Card 3 - From Brazil with Image */}
              <div className="absolute left-1/2 top-20 z-40 w-72 -translate-x-1/2 animate-float-fast" style={{ animationDelay: '1s' }}>
                <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-2xl shadow-zinc-900/15 ring-1 ring-zinc-100 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gradient-to-br from-purple-400 to-pink-400 ring-2 ring-purple-100">
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">LS</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-zinc-900">Lucas Silva</div>
                      <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <span>🇧🇷 São Paulo</span>
                        <span>•</span>
                        <span>just now</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Story Image */}
                  <div className="mb-3 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-200 via-orange-200 to-pink-200 shadow-lg">
                    <div className="flex h-44 items-center justify-center">
                      <div className="text-center">
                        <div className="mb-2 text-5xl">🏖️</div>
                        <div className="text-sm font-semibold text-amber-800">Beach day in Rio! 🌴</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Reactions */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1">
                      <span className="text-base">😍</span>
                      <span className="text-xs font-medium text-zinc-600">24</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1">
                      <span className="text-base">☀️</span>
                      <span className="text-xs font-medium text-zinc-600">18</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Card 4 - From New York (NEW) */}
              <div className="absolute right-8 top-56 z-20 w-80 animate-float-slow" style={{ animationDelay: '1.5s' }}>
                <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-100 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gradient-to-br from-green-400 to-emerald-400 ring-2 ring-green-100">
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">AJ</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-zinc-900">Alex Johnson</div>
                      <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <span>🇺🇸 New York</span>
                        <span>•</span>
                        <span>3 min ago</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message bubble */}
                  <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 shadow-sm">
                    <p className="text-sm leading-relaxed text-zinc-800">Central Park is beautiful this time of year! 🍂🗽</p>
                  </div>
                  
                  {/* Reactions */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1">
                      <span className="text-base">🍂</span>
                      <span className="text-xs font-medium text-zinc-600">14</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1">
                      <span className="text-base">❤️</span>
                      <span className="text-xs font-medium text-zinc-600">10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Card 5 - From London */}
              <div className="absolute bottom-12 right-4 z-30 w-80 animate-float-medium" style={{ animationDelay: '2s' }}>
                <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-100 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gradient-to-br from-orange-400 to-red-400 ring-2 ring-orange-100">
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">EP</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-zinc-900">Emma Parker</div>
                      <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <span>🇬🇧 London</span>
                        <span>•</span>
                        <span>5 min ago</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message bubble */}
                  <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 p-4 shadow-sm">
                    <p className="text-sm leading-relaxed text-zinc-800">Anyone want to join a virtual movie night tonight? 🎬🍿</p>
                  </div>
                  
                  {/* Reactions */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1">
                      <span className="text-base">👍</span>
                      <span className="text-xs font-medium text-zinc-600">16</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1">
                      <span className="text-base">🎉</span>
                      <span className="text-xs font-medium text-zinc-600">11</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Globe & Connection Icons */}
              <div className="absolute right-20 top-2 z-10 animate-bounce-slow">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-rose-100 text-3xl shadow-lg ring-2 ring-white">
                  🌍
                </div>
              </div>
              <div className="absolute left-2 bottom-20 z-10 animate-bounce-medium">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 text-2xl shadow-lg ring-2 ring-white">
                  💬
                </div>
              </div>
              <div className="absolute bottom-2 right-32 z-10 animate-bounce-fast">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100 text-2xl shadow-lg ring-2 ring-white">
                  ✨
                </div>
              </div>
              <div className="absolute left-1/2 bottom-48 z-10 -translate-x-1/2 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 text-xl shadow-lg ring-2 ring-white">
                  ⚡
                </div>
              </div>

            </div>
          </div>

          {/* Mobile Visual - Enhanced single card */}
          <div className="relative h-[550px] lg:hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-sm animate-float-slow">
                <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-2xl shadow-zinc-900/15 ring-1 ring-zinc-100">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full bg-gradient-to-br from-pink-400 to-orange-400 ring-2 ring-pink-100">
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">🌍</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-base font-bold text-zinc-900">Global Friends</div>
                      <div className="text-sm text-zinc-500">🇯🇵 🇧🇷 🇬🇧 🇺🇸 🇫🇷 +45 more</div>
                    </div>
                  </div>
                  
                  <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 via-orange-50 to-purple-50 p-6 shadow-sm">
                    <div className="mb-3 text-4xl">💬</div>
                    <p className="text-base leading-relaxed text-zinc-800">
                      Connect with friends from every corner of the world
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-pink-50 px-4 py-2">
                      <span className="text-xl">❤️</span>
                      <span className="text-sm font-medium text-zinc-600">2.4k</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-orange-50 px-4 py-2">
                      <span className="text-xl">🌍</span>
                      <span className="text-sm font-medium text-zinc-600">50+</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-purple-50 px-4 py-2">
                      <span className="text-xl">💬</span>
                      <span className="text-sm font-medium text-zinc-600">Live</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating mobile decorations */}
              <div className="absolute right-4 top-16 animate-bounce-slow">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-rose-100 text-2xl shadow-lg">
                  ✨
                </div>
              </div>
              <div className="absolute bottom-16 left-4 animate-bounce-medium">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100 text-xl shadow-lg">
                  💫
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}