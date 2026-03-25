import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Cpu, Disc, ChevronDown } from 'lucide-react';
import { Product } from '../constants';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-700 flex flex-col"
    >
      <div className="aspect-square overflow-hidden relative">
        <motion.img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 gap-3">
          <Link to={`/product/${product.id}`} className="w-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-[50ms]">
            <button className="w-full py-3 font-bold rounded-full text-[10px] tracking-widest uppercase transition-all bg-white text-black hover:scale-[1.02]">
              {product.type === 'beat' ? 'View Licenses' : 'Learn More'}
            </button>
          </Link>
        </div>

        {product.type === 'beat' && product.audioPreview && (
          <div className="absolute top-4 right-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </motion.button>
            <audio
              ref={audioRef}
              src={product.audioPreview}
              onEnded={() => setIsPlaying(false)}
            />
          </div>
        )}

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-mono tracking-[0.2em] uppercase text-white/70">
            {product.category || product.type}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-lg tracking-tight uppercase">
            {product.name}
          </h3>
          <span className="font-mono text-[10px] text-muted tracking-widest">
            {product.type === 'beat' ? '$25' : `$${product.price}`}
          </span>
        </div>
        <p className="text-muted text-xs leading-relaxed flex-grow">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
};

export const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="space-y-2">
    <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter uppercase">{title}</h2>
    <p className="text-xs font-mono tracking-[0.4em] text-muted uppercase">{subtitle}</p>
  </div>
);

