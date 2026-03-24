import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Cpu, Volume2, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ProductCard, SectionHeader } from '../components/Shared';

const Hero = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
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
            Intelligent audio tools to speed up your workflow. <br className="hidden md:block" />
            Radio-ready beats for your next hit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 mb-4">
            <Link
              to="/plugins"
              className="px-10 py-4 bg-white text-black rounded-full font-bold text-xs tracking-widest hover:scale-105 transition-all"
            >
              EXPLORE PLUGINS
            </Link>
            <Link
              to="/beats"
              className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-xs tracking-widest hover:bg-white/10 transition-all"
            >
              CHECK BEATS
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
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => {
    // 1. Sort by type (Plugins first)
    if (a.type !== b.type) {
      return a.type === 'plugin' ? -1 : 1;
    }

    // 2. Both are Plugins: Sort by Price (Descending)
    if (a.type === 'plugin') {
      return b.price - a.price;
    }

    // 3. Both are Beats: Sort by Date Uploaded (Descending)
    const dateA = new Date(a.createdAt || 0).getTime();
    const bDateB = new Date(b.createdAt || 0).getTime();
    return bDateB - dateA;
  });

  return (
    <div className="pt-24">
      <Hero />

      {/* Shop Section Preview */}
      <section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-12 mb-16 pt-24 border-t border-white/5">
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
    </div>
  );
};
