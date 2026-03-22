"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from '@/components/ui/Toast';
import FormField from '@/components/ui/FormField';
import PhoneInput from '@/components/ui/PhoneInput';

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !email || !password) {
      toast('Please fill in all required fields', 'error');
      return;
    }

    if (password.length < 6) {
      toast('Password must be at least 6 characters', 'error');
      return;
    }

    if (password !== confirmPassword) {
      toast('Passwords do not match', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phone: phone ? `${countryCode}${phone}` : '',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast(data.error || 'Registration failed', 'error');
        return;
      }

      login(data.customer);
      toast('Account created successfully!');
      router.push('/account');
    } catch {
      toast('Registration failed. Please try again.', 'error');
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
          <h1 className="text-2xl font-bold text-[#191919]">Create Account</h1>
          <p className="text-sm text-[#666] mt-1">Join BalloonsMall for a better shopping experience</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="First Name"
              value={firstName}
              onChange={setFirstName}
              placeholder="Sarah"
              required
            />
            <FormField
              label="Last Name"
              value={lastName}
              onChange={setLastName}
              placeholder="Al Maktoum"
            />
          </div>

          <FormField
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="your@email.com"
            required
          />

          <PhoneInput
            countryCode={countryCode}
            phone={phone}
            onCountryCodeChange={setCountryCode}
            onPhoneChange={setPhone}
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
              placeholder="Min. 6 characters"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Confirm Password<span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-[#666]">
            Already have an account?{' '}
            <Link href="/account/login" className="text-[#E53935] font-semibold hover:underline">
              Sign In
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
