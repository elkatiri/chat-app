import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 bg-clip-text text-transparent">
              Vibely
            </span>
          </h1>
          <p className="mt-2 text-sm text-zinc-600">Join Vibely and start chatting with friends worldwide!</p>
        </div>
        <SignUp 
          afterSignUpUrl="/chat"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-2xl border-0",
            }
          }}
        />
      </div>
    </div>
  );
}
