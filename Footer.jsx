import React from 'react';
import { Sparkles, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-24 border-t border-gray-200/50 bg-white/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="flex items-center gap-2 opacity-80">
                        <Sparkles size={18} className="text-primary" />
                        <span className="font-bold tracking-tight">Lumina<span className="text-primary">Fit</span></span>
                    </div>
                    <p className="text-sm text-gray-500 text-center md:text-left">
                        Elevating your digital wardrobe with AI precision.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="p-2 text-gray-400 hover:text-primary hover:bg-white rounded-full smooth-transition">
                        <Twitter size={18} />
                    </a>
                    <a href="#" className="p-2 text-gray-400 hover:text-primary hover:bg-white rounded-full smooth-transition">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="p-2 text-gray-400 hover:text-primary hover:bg-white rounded-full smooth-transition">
                        <Github size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
