import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, RefreshCw } from 'lucide-react';

const ResultViewer = ({ isGenerating = false, resultImage = null }) => {
    const [loadingText, setLoadingText] = useState('Analyzing body segments...');

    // Fun simulated loading text states
    useEffect(() => {
        if (!isGenerating) return;

        const messages = [
            'Extracting garment features...',
            'Warping the garment to fit...',
            'Adjusting lighting and shadows...',
            'Applying high-resolution details...',
            'Finalizing your fresh look...'
        ];

        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % messages.length;
            setLoadingText(messages[index]);
        }, 1500);

        return () => clearInterval(interval);
    }, [isGenerating]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 sm:p-8 h-full flex flex-col justify-center"
        >
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-3xl overflow-hidden bg-gray-50 border-2 border-gray-100 flex items-center justify-center">

                {/* Placeholder State (No Generation Yet) */}
                {!isGenerating && !resultImage && (
                    <div className="text-center p-8 opacity-50">
                        <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-4 animate-pulse"></div>
                        <div className="w-32 h-4 mx-auto bg-gray-200 rounded-full mb-3 animate-pulse"></div>
                        <div className="w-24 h-3 mx-auto bg-gray-200 rounded-full animate-pulse"></div>
                        <p className="mt-6 text-sm italic font-medium">Result will appear here</p>
                    </div>
                )}

                {/* Loading / Generating State */}
                {isGenerating && !resultImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10 transition-opacity duration-500">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-primary rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                        </div>
                        <p className="mt-6 font-medium text-gray-700 animate-pulse text-sm tracking-wide">
                            {loadingText}
                        </p>
                    </div>
                )}

                {/* Result Image Overlay Trick */}
                {resultImage && (
                    <motion.img
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        src={resultImage}
                        alt="Virtual Try-On Result"
                        className="w-full h-full object-cover rounded-3xl"
                    />
                )}
            </div>

            {resultImage && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex justify-center gap-4"
                >
                    <button className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 smooth-transition tooltip-trigger">
                        <RefreshCw size={20} />
                    </button>
                    <button className="flex items-center justify-center flex-1 max-w-[160px] bg-secondary hover:bg-black text-white rounded-full font-medium gap-2 smooth-transition shadow-lg shadow-secondary/20">
                        <Download size={18} />
                        Save Look
                    </button>
                    <button className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 smooth-transition">
                        <Share2 size={20} />
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ResultViewer;
