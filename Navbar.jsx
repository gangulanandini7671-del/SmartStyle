import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { currentUser, logout } = useAuth();

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 w-full z-50 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto glass-panel px-6 py-3 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="bg-primary/10 p-2 rounded-xl text-primary group-hover:bg-primary group-hover:text-white smooth-transition">
                        <Sparkles size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Lumina<span className="text-primary">Fit</span></span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/studio" className="text-sm font-medium text-primary hover:text-purple-600 smooth-transition flex items-center gap-1">
                        <Sparkles size={14} /> AI Studio
                    </Link>
                    <Link to="/" className="text-sm font-medium hover:text-primary smooth-transition">Try-On</Link>
                    <Link to="/find-matches" className="text-sm font-medium hover:text-primary smooth-transition">Find Matches</Link>

                    <div className="h-6 w-px bg-gray-200"></div>

                    {currentUser ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white/50 px-3 py-1.5 rounded-full border border-gray-100">
                                {currentUser.photoURL ? (
                                    <img src={currentUser.photoURL} alt="User" className="w-6 h-6 rounded-full" />
                                ) : (
                                    <User size={16} />
                                )}
                                <span className="max-w-[100px] truncate">{currentUser.displayName || currentUser.email}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="text-gray-400 hover:text-red-500 smooth-transition p-2 rounded-full hover:bg-red-50"
                                title="Log out"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-primary hover:bg-primary/90 text-white font-medium px-5 py-2 rounded-full text-sm smooth-transition shadow-lg shadow-primary/25">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
