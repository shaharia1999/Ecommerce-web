'use client';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SetCookies, SetCookiesId } from '@/src/utils/Cookies/Set-Cookies';
import { AuthResponse, UserCredentials } from '@/src/utils/type';
import { apiFetch } from '@/src/utils/Auth/api';
interface RegisterCredentials extends UserCredentials {

}

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const router = useRouter();

    // Login Mutation
    const loginMutation = useMutation<AuthResponse, Error, UserCredentials>({
        mutationFn: async (credentials) => {
            console.log('Attempting login for:', credentials.email); // Debug log
            return apiFetch<AuthResponse>('auth/login', {
                method: 'POST',
                json: credentials as unknown as Record<string, unknown>,
            });
        },
        onSuccess: async (data) => {
            console.log('Login success data:', data); // Debug log
            if (data.token) {
                await SetCookies(data.token);
                if (data.userId) {
                    await SetCookiesId(data.userId);
                }
                setStatusMessage({ type: 'success', text: 'Login successful! Redirecting...' });
                // Delay redirect slightly to show message
                setTimeout(() => {
                    router.push('/user/dashboard');
                }, 1500);
            } else {
                // This else block indicates backend returned 200 OK but no token
                setStatusMessage({ type: 'error', text: 'Login successful, but no token received. Please check backend.' });
            }
        },
        onError: (err) => {
            console.error('Login error:', err); // Debug log
            setStatusMessage({ type: 'error', text: `Login failed: ${err.message}` });
        },
    });

    // Register Mutation
    const registerMutation = useMutation<AuthResponse, Error, RegisterCredentials>({
        mutationFn: async (credentials) => {
            console.log('Attempting registration for:', credentials.email); // Debug log
            // Assuming your register endpoint is 'auth/register' and expects email, password
            return apiFetch<AuthResponse>('auth/register', {
                method: 'POST',
                json: credentials as unknown as Record<string, unknown>,
            });
        },
        onSuccess: async (data) => { // Added async here
            console.log('Registration success data:', data); // Debug log
            if (data.token) {
                await SetCookies(data.token); // Re-enabled: Store token after successful registration
                if (data.userId) {
                    await SetCookiesId(data.userId);
                }// Re-enabled: Store token after successful registration
                setStatusMessage({ type: 'success', text: 'Registration successful! You are now logged in. Redirecting...' }); // Clearer message
                // Delay redirect slightly to show message, then redirect
                setTimeout(() => {
                      router.push('/user/dashboard'); 
                }, 1500);
            } else {
                // Fallback for success without token (shouldn't happen if backend logs in after register)
                setStatusMessage({ type: 'success', text: 'Registration successful, but no token received. Please log in manually.' });
                setIsLogin(true); // Switch to login mode if no token is returned
            }
        },
        onError: (err) => {
            console.error('Registration error:', err); // Debug log
            setStatusMessage({ type: 'error', text: `Registration failed: ${err.message}` });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage(null); // Clear previous messages on new submission
        if (isLogin) {
            loginMutation.mutate({ email, password });
        } else {
            registerMutation.mutate({ email, password });
        }
    };

    const isPending = loginMutation.isPending || registerMutation.isPending;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-orange-400 mb-8">
                    {isLogin ? 'User Login' : 'User Register'}
                </h2>

                {/* Status Message Display */}
                {statusMessage && (
                    <div className={`p-3 mb-4 rounded-md text-center ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {statusMessage.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Optional: Username/Name field for registration */}


                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors duration-200 shadow-md"
                        disabled={isPending}
                    >
                        {isLogin ? (isPending ? 'Logging In...' : 'Login') : (isPending ? 'Registering...' : 'Register')}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    <Link href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
                </p>

                {/* Toggle between Login and Register */}
                <p className="mt-3 text-center text-gray-600">
                    {isLogin ? (
                        <>
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(false);
                                    setEmail(''); // Clear fields on switch
                                    setPassword('');
                                    setStatusMessage(null); // Clear messages on switch
                                    // setUsername('');
                                }}
                                className="text-blue-600 hover:underline focus:outline-none"
                            >
                                Register
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(true);
                                    setEmail(''); // Clear fields on switch
                                    setPassword('');
                                    setStatusMessage(null); // Clear messages on switch
                                    // setUsername('');
                                }}
                                className="text-blue-600 hover:underline focus:outline-none"
                            >
                                Login
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
