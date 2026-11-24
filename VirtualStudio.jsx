import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Sparkles, Upload, Scan, Layers, Camera, Wand2, Info, Star, Shirt, Eye, ShoppingCart, ExternalLink } from 'lucide-react';

// We'll keep these as pre-set options, but add an upload button as well.
const MOCK_TOPS = [
    {
        id: 't1',
        name: 'Oversized Graphic Tee',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: { color: 'Black/White', pattern: 'Graphic Print', texture: 'Cotton', fit: 'Oversized', style: 'Streetwear' }
    },
    {
        id: 't2',
        name: 'Ribbed Knit Crop Top',
        image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: { color: 'Beige', pattern: 'Solid', texture: 'Ribbed Knit', fit: 'Cropped', style: 'Casual' }
    },
    {
        id: 't3',
        name: 'Silk Button-up Blouse',
        image: 'https://images.unsplash.com/photo-1598522325915-d72b528b8e01?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: { color: 'Emerald Green', pattern: 'Solid', texture: 'Silk', fit: 'Slim/Tailored', style: 'Formal/Chic' }
    },
];

// Helper to generate dynamic mock features for uploaded tops
const analyzeUploadedTop = (file) => {
    return {
        id: `uploaded-${Date.now()}`,
        name: file.name.split('.')[0] || 'Uploaded Top',
        image: URL.createObjectURL(file),
        features: {
            color: ['Navy Blue', 'Maroon', 'White', 'Charcoal'][Math.floor(Math.random() * 4)],
            pattern: 'To be determined',
            texture: 'Fabric mix',
            fit: 'Standard Fit',
            style: 'Versatile'
        }
    };
};

const MOCK_BOTTOMS_FOR_T1 = [
    {
        id: 'b1', name: 'Cargo Parachute Pants',
        originalImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        renderedImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        score: 9.8,
        reason: 'Voluminous silhouette matches the top perfectly. Excellent color harmony.',
        tags: ['Streetwear', 'Analogous Match', 'High Contrast Alignment'],
        retailer: 'Myntra', price: '₹1,499', rating: '4.5', link: 'https://myntra.com/',
        footwear: { name: 'Chunky Sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=200&q=80' },
        accessory: { name: 'Crossbody Utility Bag', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=200&q=80' }
    },
    {
        id: 'b2', name: 'Distressed Wide-Leg Jeans',
        originalImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        renderedImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        score: 8.9,
        reason: 'Classic denim texture creates a relaxed, effortless everyday look.',
        tags: ['Casual', 'Texture Contrast', 'Relaxed Fit'],
        retailer: 'Flipkart', price: '₹999', rating: '4.2', link: 'https://flipkart.com/',
        footwear: { name: 'Platform Converse', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=200&q=80' },
        accessory: { name: 'Silver Chain Necklace', image: 'https://images.unsplash.com/photo-1599643478514-4a820c56a8f1?auto=format&fit=crop&w=200&q=80' }
    },
    {
        id: 'b3', name: 'High-Waisted Tailored Trousers',
        originalImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        renderedImage: 'https://images.unsplash.com/photo-1485230833920-4bf699318bdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        score: 8.2,
        reason: 'Elevates the casual top offering a modern high-low styling dynamic.',
        tags: ['Smart Casual', 'Monochrome Match', 'High-Low Mix'],
        retailer: 'Ajio', price: '₹1,899', rating: '4.7', link: 'https://ajio.com/',
        footwear: { name: 'Leather Loafers', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=200&q=80' },
        accessory: { name: 'Classic Leather Belt', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=200&q=80' }
    },
    {
        id: 'b4', name: 'Pleated Mini Skirt',
        originalImage: 'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        renderedImage: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        score: 7.6,
        reason: 'Adds a preppy feminine element that contrasts the original top.',
        tags: ['Trendy', 'Silhouette Balance', 'Grunge/Preppy'],
        retailer: 'Amazon', price: '₹699', rating: '4.0', link: 'https://amazon.in/',
        footwear: { name: 'Combat Boots', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=200&q=80' },
        accessory: { name: 'Sheer Tights', image: 'https://images.unsplash.com/photo-1582418701970-134988f041de?auto=format&fit=crop&w=200&q=80' }
    },
    {
        id: 'b5', name: 'Athleisure Joggers',
        originalImage: 'https://images.unsplash.com/photo-1580906853149-a82f6e52cbb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        renderedImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        score: 7.1,
        reason: 'Maximizes comfort while maintaining the streetwear DNA.',
        tags: ['Sporty', 'Neutral Palette', 'Ultra-Casual'],
        retailer: 'Meesho', price: '₹350', rating: '3.8', link: 'https://meesho.com/',
        footwear: { name: 'Running Tech Sneakers', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=200&q=80' },
        accessory: { name: 'Baseball Cap', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=200&q=80' }
    },
];

const VirtualStudio = () => {
    // UI Flow Steps:
    // 1: Select Top
    // 2: View 5 Bottom Recommendations & Upload Body
    // 3: Generating (Loading Steps)
    // 4: View 5 Rendered Outputs
    const [step, setStep] = useState(1);

    const [selectedTop, setSelectedTop] = useState(null);
    const [isAnalyzingTop, setIsAnalyzingTop] = useState(false);

    const [personImage, setPersonImage] = useState(null);
    const [generationPhase, setGenerationPhase] = useState('');

    const [activeResultIndex, setActiveResultIndex] = useState(0);

    const handleTopSelect = (top) => {
        setSelectedTop(top);
        setIsAnalyzingTop(true);
        setTimeout(() => {
            setIsAnalyzingTop(false);
            setStep(2);
        }, 2000);
    };

    const handleTopUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const analyzedTop = analyzeUploadedTop(file);
            handleTopSelect(analyzedTop);
        }
    };

    const handlePersonUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPersonImage(URL.createObjectURL(file));
        }
    };

    // Triggered after Top is chosen and Person is uploaded
    const handleGenerateAll = () => {
        if (!personImage) return alert("Please upload a full body image first.");

        setStep(3); // Enter generation screen

        setTimeout(() => setGenerationPhase('1/4: Analyzing Human Pose & Keypoints...'), 1000);
        setTimeout(() => setGenerationPhase('2/4: Segmenting Upper & Lower Garments...'), 3500);
        setTimeout(() => setGenerationPhase('3/4: Estimating Body Proportions & Lighting Map...'), 6000);
        setTimeout(() => setGenerationPhase('4/4: Batched Generative Inpainting for 5 Outfits...'), 8500);

        setTimeout(() => {
            setStep(4); // Show Results
        }, 12000);
    };

    const activeResult = MOCK_BOTTOMS_FOR_T1[activeResultIndex];

    return (
        <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-purple-500/30 font-sans">
            {/* Dark Mode Premium Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-screen"></div>
            </div>

            <Navbar />

            <main className="relative z-10 pt-32 pb-24 px-6 max-w-[90rem] mx-auto flex flex-col min-h-[calc(100vh-80px)]">

                {/* Header Sequence */}
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-white to-gray-500">
                        Virtual Try-On Engine
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {step === 1 && "Select a top to analyze its visual features and build your outfit."}
                        {step === 2 && "Our AI found 5 perfect matches. Upload your photo to try them all."}
                        {step === 3 && "Running high-fidelity neural rendering pipeline..."}
                        {step === 4 && "Your 5 AI-styled outfits are ready."}
                    </p>
                </div>

                {/* --- STEP 1: SELECT TOP --- */}
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
                            className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl"
                        >
                            <div className="flex items-center gap-3 mb-8 text-xl font-bold">
                                <Scan className="text-purple-400 w-6 h-6" />
                                <span>Step 1: Choose a Top to Analyze</span>
                            </div>

                            <div className="grid md:grid-cols-4 gap-8">
                                {/* Upload Box */}
                                <div
                                    className="relative group cursor-pointer rounded-3xl overflow-hidden bg-purple-900/10 border-2 border-dashed border-purple-500/30 hover:bg-purple-900/20 hover:border-purple-500 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center min-h-[300px]"
                                    onClick={() => document.getElementById('topUpload').click()}
                                >
                                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-translate-y-2 transition-transform">
                                        <Upload className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">Upload Your Top</h3>
                                    <p className="text-sm text-gray-400">Upload a picture of a top from your gallery to view e-commerce matches.</p>
                                    <input type="file" id="topUpload" accept="image/*" className="hidden" onChange={handleTopUpload} />
                                </div>

                                {MOCK_TOPS.map(top => (
                                    <div
                                        key={top.id}
                                        onClick={() => !isAnalyzingTop && handleTopSelect(top)}
                                        className={`relative group cursor-pointer rounded-3xl overflow-hidden bg-black/50 border hover:-translate-y-2 ${selectedTop?.id === top.id ? 'border-purple-500 shadow-[0_0_40px_rgba(147,51,234,0.4)]' : 'border-white/10'} transition-all duration-500 min-h-[300px]`}
                                    >
                                        <div className="absolute inset-0 overflow-hidden">
                                            <img src={top.image} alt={top.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6">
                                            <h3 className="font-bold text-xl mb-1">{top.name}</h3>
                                            <p className="text-sm text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                                <Sparkles className="w-4 h-4" /> Analyze Features
                                            </p>
                                        </div>

                                        {/* Analyzing Overlay */}
                                        {isAnalyzingTop && selectedTop?.id === top.id && (
                                            <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center z-10 transition-all">
                                                <div className="relative w-24 h-24 mb-6">
                                                    <div className="absolute inset-0 border-t-4 border-purple-500 rounded-full animate-spin"></div>
                                                    <div className="absolute inset-2 border-r-4 border-blue-500 rounded-full animate-spin direction-reverse"></div>
                                                    <Eye className="absolute inset-0 m-auto text-purple-400 w-8 h-8 animate-pulse" />
                                                </div>
                                                <p className="font-mono text-sm text-purple-300 font-bold tracking-widest uppercase">Extracting Features</p>
                                                <div className="mt-4 grid grid-cols-2 gap-2 max-w-[80%]">
                                                    <div className="bg-white/10 h-1.5 rounded-full overflow-hidden"><div className="bg-purple-500 h-full w-[80%] animate-pulse"></div></div>
                                                    <div className="bg-white/10 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-500 h-full w-[60%] animate-pulse delay-100"></div></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- STEP 2: SHOW 5 RECOMMENDATIONS + UPLOAD PERSON --- */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
                            className="space-y-8"
                        >
                            {/* Top Analysis Header block */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px]"></div>

                                <img src={selectedTop.image} className="w-32 h-32 rounded-2xl object-cover border border-white/20 shadow-2xl z-10" alt="Top" />

                                <div className="flex-1 z-10">
                                    <p className="text-sm text-purple-400 font-bold mb-1 uppercase tracking-widest text-center md:text-left">Target Garment Analyzed</p>
                                    <h2 className="text-3xl font-bold mb-4 text-center md:text-left">{selectedTop.name}</h2>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                        {Object.entries(selectedTop.features).map(([key, value]) => (
                                            <div key={key} className="bg-black/50 border border-white/5 rounded-xl px-4 py-2 flex flex-col items-center md:items-start">
                                                <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{key}</span>
                                                <span className="text-sm font-semibold text-gray-200">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="z-10">
                                    <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-white underline underline-offset-4 decoration-white/30 transition-all">
                                        Change Top
                                    </button>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-8">
                                {/* Left Column: 5 Recommendations */}
                                <div className="lg:col-span-8 bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                        <h3 className="text-2xl font-bold flex items-center gap-2"><Layers className="text-blue-400" /> Compatible Bottoms <span className="bg-white/10 text-xs px-2 py-1 rounded-md ml-2 text-gray-300">5 Found</span></h3>
                                        <span className="text-xs font-mono text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full">Vector Similarity Search</span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {MOCK_BOTTOMS_FOR_T1.map((b, i) => (
                                            <div key={b.id} className="relative group rounded-2xl overflow-hidden bg-black">
                                                <div className="absolute top-2 left-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded z-10 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                                    <ShoppingCart className="w-3 h-3 text-purple-400" /> {b.retailer}
                                                </div>
                                                <div className="absolute top-2 right-2 bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded z-10 backdrop-blur-md flex items-center gap-1 border border-green-500/30">
                                                    <Star className="w-3 h-3 fill-green-400" /> {b.rating}
                                                </div>
                                                <div className="aspect-[4/5] overflow-hidden">
                                                    <img src={b.originalImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" alt={b.name} />
                                                </div>
                                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pb-3">
                                                    <h4 className="font-bold text-sm leading-tight text-gray-200 mb-1">{b.name}</h4>
                                                    <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                                                        <span className="text-white">{b.price}</span>
                                                        <span>{b.retailer}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Column: Body Upload & Trigger Generation */}
                                <div className="lg:col-span-4 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 rounded-[2rem] p-8 backdrop-blur-xl flex flex-col shadow-[0_0_50px_rgba(147,51,234,0.1)]">
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2"><Camera className="text-purple-400" /> Try Them All</h3>
                                        <p className="text-sm text-purple-200/70">Upload your photo. Our AI will automatically generate 5 high-res Virtual Try-On results.</p>
                                    </div>

                                    {!personImage ? (
                                        <div
                                            onClick={() => document.getElementById('personUpload').click()}
                                            className="flex-1 min-h-[250px] border-2 border-dashed border-purple-500/40 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-purple-500/10 transition-all group"
                                        >
                                            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:-translate-y-2 group-hover:scale-110 transition-all">
                                                <Upload className="items-center text-purple-400 w-8 h-8" />
                                            </div>
                                            <span className="font-bold text-lg text-purple-100">Upload Photo</span>
                                            <input type="file" id="personUpload" accept="image/*" className="hidden" onChange={handlePersonUpload} />
                                        </div>
                                    ) : (
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden border-2 border-purple-500/50 shadow-2xl">
                                                <img src={personImage} className="w-full h-full object-cover" alt="User" />
                                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">Target Body</div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setPersonImage(null); }}
                                                    className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-2 backdrop-blur transition-all shadow-lg"
                                                >
                                                    ✕
                                                </button>
                                            </div>

                                            <button
                                                onClick={handleGenerateAll}
                                                className="mt-6 w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black text-lg flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(147,51,234,0.4)] transform hover:scale-105 transition-all"
                                            >
                                                <Wand2 className="w-6 h-6" /> Generate 5 Try-Ons
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* --- STEP 3: GENERATING PIPELINE (Loading) --- */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
                            className="bg-black/40 border border-white/10 rounded-[3rem] py-20 px-8 backdrop-blur-2xl text-center max-w-4xl mx-auto w-full relative overflow-hidden"
                        >
                            {/* Scanning effect background */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(147,51,234,0.05)_50%,transparent_100%)] bg-[length:100%_4px] border-b border-purple-500/30 animate-[scan_4s_ease-in-out_infinite]"></div>

                            <div className="relative z-10">
                                <h2 className="text-4xl font-black mb-12 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                    Executing Virtual Try-On Pipeline
                                </h2>

                                <div className="flex justify-center mb-12 relative h-40">
                                    <div className="absolute w-full max-w-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-0.5 bg-white/5"></div>
                                    <div className="relative flex justify-between w-full max-w-lg">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex flex-col items-center">
                                                <div className={`w-16 h-16 rounded-2xl bg-black border-2 flex items-center justify-center ${i <= 3 ? 'border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(147,51,234,0.3)]' : 'border-white/10 text-white/20'} z-10 transition-all duration-1000`}>
                                                    {i === 1 && <span className="font-bold">Pose</span>}
                                                    {i === 2 && <span className="font-bold">Seg</span>}
                                                    {i === 3 && <span className="font-bold">Gen</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl max-w-xl mx-auto backdrop-blur-md">
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin flex-shrink-0"></div>
                                        <div className="font-mono">
                                            <p className="text-xs text-blue-400 mb-1">SYSTEM STATUS</p>
                                            <p className="font-bold text-lg text-gray-200">{generationPhase}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 h-2 w-full bg-black rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full animate-[progress_12s_ease-in-out_forwards] bg-[length:200%_100%]"></div>
                                    </div>
                                    <p className="mt-4 text-[10px] text-gray-500 text-center font-mono uppercase tracking-widest">Running on TensorRT + SDXL Cluster</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* --- STEP 4: OUTPUT MULTIPLE RENDERED IMAGES --- */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {/* Top Summary Bar */}
                            <div className="flex justify-between items-center bg-white/[0.02] border border-white/10 px-8 py-4 rounded-full backdrop-blur-md">
                                <h3 className="font-bold"><Sparkles className="inline w-5 h-5 text-purple-400 mr-2" /> Output: 5 Complete Outfits Generated</h3>
                                <button className="text-sm font-bold bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200" onClick={() => setStep(1)}>Start Over</button>
                            </div>

                            {/* Main Display: Detailed Carousel/Grid */}
                            <div className="grid lg:grid-cols-12 gap-8 items-start">

                                {/* Left Side: Rendered Image Display */}
                                <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 p-4 rounded-[2rem] relative shadow-2xl backdrop-blur-xl">
                                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-black">
                                        <img src={activeResult.renderedImage} alt={activeResult.name} className="w-full h-full object-cover" />
                                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur border border-white/20 px-3 py-1.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2">
                                            <Shirt className="w-4 h-4 text-purple-400" /> Result #{activeResultIndex + 1}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Insights & Selector */}
                                <div className="lg:col-span-7 space-y-6">

                                    {/* Carousel Thumbnails */}
                                    <div>
                                        <h4 className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-4">View Results</h4>
                                        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                                            {MOCK_BOTTOMS_FOR_T1.map((b, i) => (
                                                <div
                                                    key={b.id}
                                                    onClick={() => setActiveResultIndex(i)}
                                                    className={`relative w-24 aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 transition-all border-2 ${activeResultIndex === i ? 'border-purple-500 scale-105 shadow-[0_0_20px_rgba(147,51,234,0.4)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                                >
                                                    <img src={b.renderedImage} alt="Thumb" className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[10px] text-center font-bold py-1">#{i + 1}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Data Panel for Active Result */}
                                    <motion.div
                                        key={activeResult.id}
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                        className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl"
                                    >
                                        <div className="flex items-start justify-between mb-6">
                                            <div>
                                                <h3 className="text-3xl font-black mb-2">{activeResult.name}</h3>
                                                <div className="flex gap-2">
                                                    {activeResult.tags.map(tag => (
                                                        <span key={tag} className="text-[10px] bg-white/10 border border-white/5 px-2 py-1 rounded-md text-gray-300 uppercase font-bold tracking-wider">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                {/* Left Box: Price/Retailer */}
                                                <a
                                                    href={activeResult.link}
                                                    target="_blank" rel="noreferrer"
                                                    className="bg-black/50 border border-blue-500/30 hover:border-blue-500/80 hover:bg-black/80 rounded-2xl p-4 flex flex-col items-center min-w-[100px] transition-all group/buy"
                                                >
                                                    <span className="text-[10px] text-blue-400 uppercase font-bold tracking-widest mb-1 flex items-center gap-1">
                                                        Buy at {activeResult.retailer} <ExternalLink className="w-3 h-3 group-hover/buy:translate-x-1 group-hover/buy:-translate-y-1 transition-transform" />
                                                    </span>
                                                    <span className="text-3xl font-black text-white">{activeResult.price}</span>
                                                </a>

                                                {/* Right Box: Score */}
                                                <div className="bg-black/50 border border-green-500/30 rounded-2xl p-4 flex flex-col items-center min-w-[100px]">
                                                    <span className="text-[10px] text-green-400 uppercase font-bold tracking-widest mb-1">Score ({activeResult.rating}★)</span>
                                                    <span className="text-3xl font-black text-white">{activeResult.score}<span className="text-base text-gray-500">/10</span></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <h4 className="flex items-center gap-2 font-bold mb-3 text-purple-400"><Info className="w-5 h-5" /> Why This Works</h4>
                                            <p className="text-gray-300 leading-relaxed text-sm p-5 bg-black/40 border border-white/5 rounded-2xl">
                                                {activeResult.reason} This generation maintained your body bounds while adjusting the fabric drape realistically.
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4 border-t border-white/10 pt-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10">
                                                    <img src={activeResult.footwear.image} className="w-full h-full object-cover" alt="Shoe" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Recommended Footwear</p>
                                                    <p className="font-bold text-sm text-gray-100">{activeResult.footwear.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10">
                                                    <img src={activeResult.accessory.image} className="w-full h-full object-cover" alt="Accessory" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Recommended Accessory</p>
                                                    <p className="font-bold text-sm text-gray-100">{activeResult.accessory.name}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-white/10">
                                            <button className="w-full py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">
                                                Save Look #{activeResultIndex + 1} to Wardrobe
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};

export default VirtualStudio;
