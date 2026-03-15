import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronRight, Waves, Cpu, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ProductCard, SectionHeader, MovingGraphic } from '../components/Shared';

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <MovingGraphic />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          style={{ opacity }}
        >
          <h1 className="text-6xl md:text-[110px] font-display font-bold leading-[0.85] tracking-tighter mb-8 uppercase">
            Mix Smarter. <br />
            Create Faster.
          </h1>
          <p className="max-w-2xl mx-auto text-white/80 text-xl font-light leading-relaxed">
            Intelligent audio tools to speed up your workflow. <br className="hidden md:block" />
            Radio-ready beats for your next hit.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export const Home = () => {
  const [filter, setFilter] = useState<'all' | 'plugin' | 'beat'>('plugin');
  const filteredProducts = PRODUCTS.filter(p => filter === 'all' || p.type === filter);

  return (
    <div className="pt-24">
      <Hero />

      {/* Shop Section Preview */}
      <section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="flex gap-4">
            {['plugin', 'beat', 'all'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-6 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all ${
                  filter === f 
                    ? 'bg-white text-black' 
                    : 'border border-white/10 text-muted hover:border-white/30'
                }`}
              >
                {f === 'all' ? 'ALL' : f + 'S'}
              </button>
            ))}
          </div>
          
          <div className="text-[10px] font-mono text-muted/40 uppercase tracking-widest">
            {filteredProducts.length} items available
          </div>
        </div>

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
      </section>
    </div>
  );
};
