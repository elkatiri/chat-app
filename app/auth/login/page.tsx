"use client";
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
export default function PremiumLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      console.log("Login failed:", res.error);
    } else {
      console.log("Login success");
      window.location.href = "/chat"; // or dashboard
    }
  };


  return (
    <div className="min-h-screen bg-linear-to-r from-gray-900 to-gray-800 flex items-center justify-center p-4 font-sans">
      {/* Login Card */}
      <div className="w-full max-w-md">
        {/* Logo with fade-in animation */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-yellow-500 to-yellow-400 rounded-full mb-4 shadow-lg">
            <svg 
              className="w-8 h-8 text-gray-900" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-gray-800 shadow-2xl rounded-xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input with Floating Label */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                className="peer w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-transparent transition-all duration-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                placeholder="Email"
                required
              />
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all duration-300 pointer-events-none
                  ${email || focusedField === 'email' 
                    ? '-top-2.5 text-xs bg-gray-800 px-2 text-yellow-400' 
                    : 'top-3 text-base text-gray-400'
                  }`}
              >
                Email Address
              </label>
            </div>

            {/* Password Input with Floating Label */}
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                className="peer w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-transparent transition-all duration-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                placeholder="Password"
                required
              />
              <label
                htmlFor="password"
                className={`absolute left-4 transition-all duration-300 pointer-events-none
                  ${password || focusedField === 'password' 
                    ? '-top-2.5 text-xs bg-gray-800 px-2 text-yellow-400' 
                    : 'top-3 text-base text-gray-400'
                  }`}
              >
                Password
              </label>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-0 transition-all duration-300"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-linear-to-r from-yellow-500 to-yellow-400 text-gray-900 font-semibold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-800 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border-2 border-gray-700 rounded-lg text-gray-300 hover:bg-gray-900 hover:border-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border-2 border-gray-700 rounded-lg text-gray-300 hover:bg-gray-900 hover:border-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link 
                    href="/auth/register" 
                    className="text-yellow-400 font-semibold hover:underline transition-all"
                >
                    Create Account
                </Link>
                </div>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 Your Company. All rights reserved.</p>
        </div>
      </div>

      {/* Custom CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}