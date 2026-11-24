import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, X, Sparkles } from 'lucide-react';

const UploadZone = ({ onGenerate, isGenerating }) => {
    const [personImage, setPersonImage] = useState(null);
    const [garmentImage, setGarmentImage] = useState(null);

    const handleUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            if (type === 'person') setPersonImage(url);
            if (type === 'garment') setGarmentImage(url);
        }
    };

    const UploadBox = ({ title, type, image, onUpload, onClear }) => (
        <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 ml-1">{title}</h3>
            <div className="relative group">
                {image ? (
                    <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 bg-gray-50">
                        <img src={image} alt={title} className="w-full h-full object-cover" />
                        <button
                            onClick={onClear}
                            className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white smooth-transition"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full aspect-[3/4] glass-panel border-2 border-dashed border-gray-300 hover:border-primary/50 hover:bg-primary/5 cursor-pointer smooth-transition group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                            <div className="p-4 bg-gray-100 rounded-full group-hover:bg-white group-hover:scale-110 smooth-transition mb-4">
                                <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-primary smooth-transition" />
                            </div>
                            <p className="mb-2 text-sm text-gray-600 font-medium"><span className="text-primary">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-400">PNG, JPG or WEBP (Max 5MB)</p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => onUpload(e, type)}
                        />
                    </label>
                )}
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-6 sm:p-8"
        >
            <div className="flex flex-col sm:flex-row gap-6">
                <UploadBox
                    title="Your Photo"
                    type="person"
                    image={personImage}
                    onUpload={handleUpload}
                    onClear={() => setPersonImage(null)}
                />
                <UploadBox
                    title="Garment"
                    type="garment"
                    image={garmentImage}
                    onUpload={handleUpload}
                    onClear={() => setGarmentImage(null)}
                />
            </div>

            <button
                onClick={() => onGenerate(personImage, garmentImage)}
                className={`w-full mt-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 smooth-transition shadow-lg ${personImage && garmentImage && !isGenerating
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/25 cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-transparent'
                    }`}
                disabled={!personImage || !garmentImage || isGenerating}
            >
                <Sparkles size={18} className={isGenerating ? "animate-spin" : ""} />
                {isGenerating ? "Processing AI Try-On..." : "Generate Try-On"}
            </button>
        </motion.div>
    );
};

export default UploadZone;
