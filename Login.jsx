import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to authenticate');
        }
        setLoading(false);
    };

    const handleGoogleAuth = async () => {
        setError('');
        setLoading(true);
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to sign in with Google');
        }
        setLoading(false);
    };

    // Card flip variants
    const flipVariants = {
        front: { rotateY: 0, transition: { duration: 0.8, type: 'spring', bounce: 0.3 } },
        back: { rotateY: 180, transition: { duration: 0.8, type: 'spring', bounce: 0.3 } }
    };

    // Shared Form Content to avoid repetition
    const AuthForm = ({ isSignup }) => (
        <div className="flex flex-col h-full justify-center">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 mb-2">
                    {isSignup ? 'Join LuminaFit' : 'Welcome Back'}
                </h2>
                <p className="text-gray-500 text-sm">
                    {isSignup ? 'Step into the future of digital fashion' : 'Access your virtual wardrobe'}
                </p>
            </div>

            {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 text-red-500 p-3 rounded-xl mb-6 text-sm text-center border border-red-100">
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="email"
                        required
                        className="w-full px-5 py-4 bg-white/40 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 smooth-transition backdrop-blur-sm text-gray-800 placeholder-gray-400 font-medium"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        required
                        className="w-full px-5 py-4 bg-white/40 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 smooth-transition backdrop-blur-sm text-gray-800 placeholder-gray-400 font-medium"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="pt-2">
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-secondary hover:bg-black text-white font-semibold py-4 rounded-2xl smooth-transition flex items-center justify-center gap-2 shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {isSignup ? <UserPlus size={20} /> : <LogIn size={20} />}
                        {isSignup ? 'Create Account' : 'Sign In'}
                    </button>
                </div>
            </form>

            <div className="mt-8 relative flex items-center justify-center">
                <div className="border-t border-gray-200 w-full absolute"></div>
                <span className="bg-[#fcfcfd] px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest relative z-10">or continue with</span>
            </div>

            <button
                disabled={loading}
                onClick={handleGoogleAuth}
                className="mt-8 w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-medium py-4 rounded-2xl smooth-transition flex items-center justify-center gap-3 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
            </button>

            <p className="mt-8 text-center text-sm text-gray-500">
                {isSignup ? "Already have an account? " : "Don't have an account? "}
                <button
                    type="button"
                    onClick={() => {
                        setError('');
                        setIsLogin(!isLogin);
                    }}
                    className="text-primary hover:text-purple-600 font-semibold smooth-transition hover:underline underline-offset-4"
                >
                    {isSignup ? 'Sign in' : 'Create one'}
                </button>
            </p>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#fafafa]">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none"></div>

            <div className="w-full max-w-[420px] h-[650px] relative perspective-1000">

                <motion.div
                    className="w-full h-full relative preserve-3d"
                    animate={isLogin ? "front" : "back"}
                    variants={flipVariants}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front of Card: SIGN IN */}
                    <div
                        className="absolute inset-0 w-full h-full backface-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <div className="h-full w-full glass-panel p-10 bg-white/70 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 backdrop-blur-2xl rounded-[2.5rem]">
                            <AuthForm isSignup={false} />
                        </div>
                    </div>

                    {/* Back of Card: SIGN UP */}
                    <div
                        className="absolute inset-0 w-full h-full backface-hidden"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        <div className="h-full w-full glass-panel p-10 bg-white/70 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 backdrop-blur-2xl rounded-[2.5rem]">
                            <AuthForm isSignup={true} />
                        </div>
                    </div>

                </motion.div>

            </div>
        </div>
    );
};

export default Login;
