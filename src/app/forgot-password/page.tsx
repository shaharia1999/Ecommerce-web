'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/src/utils/Auth/api';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const forgotPasswordMutation = useMutation({
    mutationFn: async () => {
      return apiFetch<{ message: string }>('auth/forgot-password', {
        method: 'POST',
        json: { email },
      });
    },
    onSuccess: (data) => {
      setStatus({ type: 'success', message: data.message || 'Reset link sent! Check your email.' });
    },
    onError: (error: Error) => {
      setStatus({ type: 'error', message: error.message });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    forgotPasswordMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Forgot Password</h2>
        {status && (
          <div className={`p-3 mb-4 text-center rounded-md ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {status.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={forgotPasswordMutation.isPending}
            className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors duration-200 shadow-md"
          >
            {forgotPasswordMutation.isPending ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
