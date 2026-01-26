'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Lock, Mail, User, ShieldCheck, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

// Define keys for the larger registration object
type RegisterFieldKey = 'fullName' | 'email' | 'password' | 'confirmPassword';

const RegisterPage = () => {
  const [focused, setFocused] = useState<Record<RegisterFieldKey, boolean>>({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [values, setValues] = useState<Record<RegisterFieldKey, string>>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (field: RegisterFieldKey) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: RegisterFieldKey) => {
    if (values[field] === '') {
      setFocused((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: RegisterFieldKey) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (values.password !== values.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Registration failed");
    return;
  }

  // 🔥 Auto login
  await signIn("credentials", {
    email: values.email,
    password: values.password,
    callbackUrl: "/dashboard",
  });
};



  // Helper to render the floating label input fields
  const renderInput = (
    field: RegisterFieldKey, 
    label: string, 
    type: string, 
    Icon: React.ElementType,
    showToggle: boolean = false
  ) => (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <Icon className={`w-5 h-5 transition-colors duration-300 ${focused[field] ? 'text-yellow-400' : 'text-gray-500'}`} />
      </div>
      <input
        type={showToggle && showPassword ? 'text' : type}
        value={values[field]}
        className="block w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        placeholder={label}
        onFocus={() => handleFocus(field)}
        onBlur={() => handleBlur(field)}
        onChange={(e) => handleChange(e, field)}
      />
      <label
        className={`absolute left-10 transition-all duration-300 pointer-events-none ${
          focused[field] || values[field] 
          ? '-top-2.5 text-xs text-yellow-400 bg-gray-900 px-1' 
          : 'top-3 text-gray-500'
        }`}
      >
        {label}
      </label>
      {showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-yellow-400 transition-colors z-10"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-tr from-gray-900 to-gray-700 font-sans p-4">
      {/* Registration Card */}
      <div className="w-full max-w-lg bg-gray-900/60 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-xl p-8 space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700">
          <div className="w-14 h-14 bg-linear-to-br from-yellow-500 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20 mb-4">
            <CheckCircle2 className="text-gray-900 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-100 tracking-tight">Create Account</h2>
          <p className="text-gray-400 mt-2 text-sm text-center">Join our premium community and start your journey.</p>
        </div>

        <form className="grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
          {renderInput('fullName', 'Full Name', 'text', User)}
          {renderInput('email', 'Email Address', 'email', Mail)}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderInput('password', 'Password', 'password', Lock, true)}
            {renderInput('confirmPassword', 'Confirm Password', 'password', Lock, true)}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-linear-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg shadow-lg shadow-yellow-500/10 transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:shadow-yellow-500/30"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-800"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-900 px-2 text-gray-500">Or continue with</span></div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <a href="/auth/login" className="text-yellow-400 font-semibold hover:underline transition-all">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;