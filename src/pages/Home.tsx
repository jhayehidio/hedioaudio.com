import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Cpu, Volume2, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ProductCard, SectionHeader } from '../components/Shared';

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-bg">
        <video
          src="/videos/BoundaryEQ How It Works.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50 blur-[2px]"
        />

        {/* Softer Blending Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)] opacity-80" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          <h1 className="text-6xl md:text-[110px] font-display font-bold leading-[0.85] tracking-tighter mb-8 uppercase">
            Mix Smarter. <br />
            Create Faster.
          </h1>
          <p className="max-w-2xl mx-auto text-white/80 text-xl font-light leading-relaxed">
            Intelligent audio tools designed to speed up your workflow and unlock professional results instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 mb-4">
            <Link
              to="/plugins"
              className="px-12 py-5 bg-white text-black rounded-full font-bold text-sm tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              EXPLORE PLUGINS
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = PRODUCTS.filter(p => {
    const isPlugin = p.type === 'plugin';
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return isPlugin && matchesSearch;
  }).sort((a, b) => b.price - a.price);

  return (
    <div className="pt-20">
      {/* Shop Section Preview - Now at Top */}
      <section className="pb-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-12 mb-16 pt-8 border-t border-white/5">
          {searchQuery && (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 border-b border-white/5">
              <div className="text-[10px] font-mono text-white/60 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">
                Searching: <span className="text-white ml-2">{searchQuery}</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center text-[10px] font-mono text-muted/40 uppercase tracking-[0.3em]">
            <span>{searchQuery ? `Results for "${searchQuery}"` : 'Browse Collection'}</span>
            <span>{filteredProducts.length} items found</span>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
            <p className="text-muted font-mono text-sm uppercase tracking-widest">No products found for this search.</p>
          </div>
        )}
      </section>

      {/* Hero Section - Now below Collection */}
      <Hero />
    </div>
  );
};
