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
            <button className="w-full py-3 bg-white text-black font-bold rounded-full text-[10px] tracking-widest uppercase hover:scale-[1.02] transition-all">
              {product.type === 'beat' ? 'View Licenses' : 'Add to Cart'}
            </button>
          </Link>
          <Link to={`/product/${product.id}`} className="w-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-[150ms]">
            <button className="w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full text-[10px] tracking-widest uppercase hover:bg-white/20 transition-colors">
              {product.type === 'beat' ? 'Listen' : 'Learn More'}
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
            {product.type}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-lg tracking-tight uppercase">
            {product.name}
          </h3>
          <span className="font-mono text-[10px] text-muted tracking-widest">${product.price}</span>
        </div>
        <p className="text-muted text-xs leading-relaxed flex-grow">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
};

export const SectionHeader = ({ title, subtitle, id }: { title: string, subtitle: string, id?: string }) => (
  <div id={id} className="mb-16">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-4"
    >
      <div className="w-12 h-px bg-white/20" />
      <span className="text-xs font-mono tracking-[0.3em] text-muted uppercase">{subtitle}</span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl md:text-7xl font-display font-bold tracking-tighter"
    >
      {title}
    </motion.h2>
  </div>
);

export const MovingGraphic = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Blob 1 - Magenta */}
      <motion.div
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '10%', '-10%'],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-0 w-[100vw] h-[100vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 0, 255, 0.4) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Blob 2 - Cyan */}
      <motion.div
        animate={{
          x: ['20%', '-20%', '20%'],
          y: ['10%', '-10%', '10%'],
          scale: [1.5, 1, 1.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-[90vw] h-[90vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Blob 3 - Yellow/Green */}
      <motion.div
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['20%', '-20%', '20%'],
          scale: [1, 1.8, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-0 left-[10%] w-[80vw] h-[80vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 0, 0.2) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Fade to black at top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  );
};
