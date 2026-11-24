import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import UploadZone from '../components/vton/UploadZone';
import ResultViewer from '../components/vton/ResultViewer';
import RecommendationGrid from '../components/vton/RecommendationGrid';
import { generateVTON } from '../services/vton';

const Home = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [resultImage, setResultImage] = useState(null);

    const handleGenerateMock = async (personUrl, garmentUrl) => {
        setIsGenerating(true);
        setResultImage(null); // Clear previous

        try {
            // Call the real RapidAPI VTON service
            const resultBase64Url = await generateVTON(personUrl, garmentUrl);
            setResultImage(resultBase64Url);

        } catch (error) {
            console.error("Failed to generate VTON:", error);
            alert("VTON Generation Failed. Please check console for API errors or try again.");
            setResultImage(null);
        } finally {
            setIsGenerating(false);
        }
    };
    return (
        <div className="relative overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-gray-200/50 backdrop-blur-md mb-8">
                            <Sparkles className="text-primary w-4 h-4" />
                            <span className="text-sm font-medium text-gray-700">Next-Gen Virtual Fitting Room</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-secondary leading-tight mb-6">
                            Style Reimagined <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                                In Real-Time.
                            </span>
                        </h1>

                        <p className="text-lg text-gray-500 mb-10 max-w-xl leading-relaxed">
                            Experience the future of fashion. Upload your photo, select a garment, and let our AI seamlessly render the perfect fit in seconds.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => document.getElementById('try-on-section').scrollIntoView({ behavior: 'smooth' })}
                                className="bg-secondary hover:bg-black text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 smooth-transition shadow-xl shadow-secondary/20 group"
                            >
                                Try It Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 smooth-transition" />
                            </button>
                            <button
                                onClick={() => document.getElementById('recommendations-section').scrollIntoView({ behavior: 'smooth' })}
                                className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 smooth-transition"
                            >
                                Explore Styles
                            </button>
                        </div>
                    </motion.div>

                    {/* Abstract Hero Visual - Can be replaced by Spline 3D later */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="relative h-[500px] w-full hidden lg:block"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-400/20 rounded-[3rem] blur-3xl"></div>
                        <div className="absolute inset-4 glass-panel border border-white/40 shadow-2xl flex items-center justify-center overflow-hidden">
                            <div className="absolute top-10 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
                            <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
                            <div className="absolute -bottom-8 right-20 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
                            <h2 className="text-4xl font-bold text-gray-300/50 rotate-[-15deg] select-none">3D Interactive Zone</h2>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Try-On Section */}
            <section id="try-on-section" className="py-20 px-6 bg-white/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">The Fitting Room</h2>
                        <p className="text-gray-500">Upload a full-body picture along with the garment you'd like to try on. Our VTON engine handles the rest.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <UploadZone onGenerate={handleGenerateMock} isGenerating={isGenerating} />
                        <ResultViewer isGenerating={isGenerating} resultImage={resultImage} />
                    </div>
                </div>
            </section>

            {/* Recommendations Section */}
            <section id="recommendations-section" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Curated For You</h2>
                            <p className="text-gray-500 max-w-xl">Based on your style preferences and previous try-ons, here are some fresh picks.</p>
                        </div>
                        <button className="hidden sm:flex text-primary font-medium items-center gap-1 hover:gap-2 smooth-transition">
                            View All <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <RecommendationGrid />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
