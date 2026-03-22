"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from '@/components/ui/Toast';
import FormField from '@/components/ui/FormField';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast('Please enter your email and password', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast(data.error || 'Login failed', 'error');
        return;
      }

      login(data.customer);
      toast('Welcome back!');
      router.push('/account');
    } catch {
      toast('Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FFEBEE] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎈</span>
          </div>
          <h1 className="text-2xl font-bold text-[#191919]">Welcome Back</h1>
          <p className="text-sm text-[#666] mt-1">Sign in to your BalloonsMall account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
          <FormField
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="your@email.com"
            required
          />

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Password<span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-[#666]">
            Don&apos;t have an account?{' '}
            <Link href="/account/register" className="text-[#E53935] font-semibold hover:underline">
              Create Account
            </Link>
          </p>
          <Link href="/shop" className="text-sm text-[#999] hover:text-[#666] mt-2 inline-block">
            Continue shopping as guest
          </Link>
        </div>
      </div>
    </div>
  );
}
