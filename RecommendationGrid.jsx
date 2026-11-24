import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import mockProducts from '../../utils/mock-db.json';

const RecommendationGrid = () => {
    // Simple staggered animation for cards
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    const getPlatformColor = (platform) => {
        switch (platform.toLowerCase()) {
            case 'amazon': return 'bg-amber-100 text-amber-800';
            case 'flipkart': return 'bg-blue-100 text-blue-800';
            case 'myntra': return 'bg-pink-100 text-pink-800';
            case 'ajio': return 'bg-teal-100 text-teal-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {mockProducts.map((product) => (
                <motion.div
                    key={product.id}
                    variants={item}
                    className="group relative rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl smooth-transition overflow-hidden flex flex-col"
                >
                    {/* Image Container with hover zoom */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                        <img
                            src={product.image_url}
                            alt={product.product_name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 smooth-transition duration-500"
                        />
                        {/* Try-on overlay button */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center">
                            <button className="bg-white/90 backdrop-blur-md text-gray-900 font-medium px-6 py-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 smooth-transition">
                                Try on this item
                            </button>
                        </div>
                        {/* Platform Badge */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${getPlatformColor(product.source_platform)} backdrop-blur-md bg-opacity-90`}>
                            {product.source_platform}
                        </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                        <span className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-1">{product.brand}</span>
                        <h3 className="font-semibold text-gray-800 leading-tight mb-4 flex-1">{product.product_name}</h3>

                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                            <a
                                href={product.affiliate_link}
                                className="flex items-center gap-2 text-sm font-medium bg-gray-50 hover:bg-black hover:text-white px-4 py-2 rounded-xl smooth-transition"
                            >
                                Buy Now
                                <ArrowUpRight strokeWidth={2.5} size={16} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default RecommendationGrid;
