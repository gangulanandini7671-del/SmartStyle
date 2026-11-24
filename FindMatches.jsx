import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Upload, Sparkles, Image as ImageIcon, ExternalLink, RefreshCw } from 'lucide-react';

const FindMatches = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [matches, setMatches] = useState([]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setPreviewUrl(URL.createObjectURL(droppedFile));
        }
    };

    const handleSearch = () => {
        if (!file) return;

        setIsSearching(true);
        setMatches([]);

        // Simulate API call and search latency
        setTimeout(() => {
            setIsSearching(false);
            setMatches([
                {
                    id: 1,
                    brand: 'ASOS',
                    name: 'Floral Print Midi Dress',
                    price: '$45.00',
                    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    link: 'https://www.asos.com/'
                },
                {
                    id: 2,
                    brand: 'Zara',
                    name: 'Satin Slip Dress',
                    price: '$59.90',
                    image: 'https://images.unsplash.com/photo-1515347619362-e6e76cfb99db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    link: 'https://www.zara.com/'
                },
                {
                    id: 3,
                    brand: 'Myntra',
                    name: 'A-Line Cotton Dress',
                    price: '₹1,299',
                    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    link: 'https://www.myntra.com/'
                },
                {
                    id: 4,
                    brand: 'H&M',
                    name: 'Rib-knit Bodycon Dress',
                    price: '$24.99',
                    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    link: 'https://www2.hm.com/'
                }
            ]);
        }, 3000);
    };

    return (
        <div className="relative min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-secondary mb-4">
                        Find Matching Outfits
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Upload a garment you love, and we'll scour top fashion platforms to find identical or similar pieces with links to buy.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column - Upload Area */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4">Your Garment</h2>
                            
                            {!previewUrl ? (
                                <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group"
                                    onClick={() => document.getElementById('garmentInput').click()}
                                >
                                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="text-primary w-8 h-8" />
                                    </div>
                                    <h3 className="font-semibold text-gray-700 mb-1">Click or drag to upload</h3>
                                    <p className="text-sm text-gray-500 mb-4">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                    
                                    <input
                                        type="file"
                                        id="garmentInput"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <button className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                                        Browse Files
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                     <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-100 border border-gray-200">
                                         <img src={previewUrl} alt="Uploaded garment" className="w-full h-full object-cover" />
                                         <button 
                                            onClick={() => { setFile(null); setPreviewUrl(''); setMatches([]); }}
                                            className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-red-500 transition-colors"
                                         >
                                            <RefreshCw className="w-4 h-4" />
                                         </button>
                                     </div>
                                </div>
                            )}

                            <button
                                onClick={handleSearch}
                                disabled={!file || isSearching}
                                className={`w-full mt-6 py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all ${
                                    !file 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : isSearching
                                        ? 'bg-primary/80 text-white cursor-wait'
                                        : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                                }`}
                            >
                                {isSearching ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                        Searching platforms...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Find Matches
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Results Area */}
                    <div className="lg:col-span-8">
                        {isSearching ? (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                                <div className="relative w-20 h-20">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                                    <div className="absolute inset-2 bg-primary rounded-full flex items-center justify-center z-10">
                                        <Sparkles className="text-white w-8 h-8 animate-pulse" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Analyzing Your Garment</h3>
                                    <p className="text-gray-500">Scanning thousands of stores for matches...</p>
                                </div>
                            </div>
                        ) : matches.length > 0 ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                     <h2 className="text-2xl font-bold flex items-center gap-2">
                                        Top Matches <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">{matches.length} found</span>
                                     </h2>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    {matches.map((match, index) => (
                                        <motion.div
                                            key={match.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col"
                                        >
                                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                                <img 
                                                    src={match.image} 
                                                    alt={match.name} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                                                    {match.brand}
                                                </div>
                                            </div>
                                            <div className="p-5 flex-1 flex flex-col">
                                                <h3 className="font-bold text-lg text-gray-800 mb-1">{match.name}</h3>
                                                <p className="text-primary font-bold text-xl mb-4">{match.price}</p>
                                                
                                                <div className="mt-auto">
                                                    <a 
                                                        href={match.link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-full flex items-center justify-center gap-2 transition-colors text-sm font-medium"
                                                    >
                                                        Buy Now <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full min-h-[400px] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-white/50">
                                <ImageIcon className="w-16 h-16 text-gray-300 mb-4" />
                                <h3 className="text-xl font-medium text-gray-600 mb-2">Awaiting Image</h3>
                                <p className="text-gray-400 max-w-sm">
                                    Upload a piece of clothing on the left to see identical and similar items from across the web.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FindMatches;
