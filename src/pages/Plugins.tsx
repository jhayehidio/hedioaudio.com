import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCard, SectionHeader } from '../components/Shared';

export const Plugins = () => {
  const location = useLocation();
  const isFreeOnly = new URLSearchParams(location.search).get('free') === 'true';
  const [searchQuery, setSearchQuery] = useState('');

  const plugins = PRODUCTS.filter(p =>
    p.type === 'plugin' &&
    (!isFreeOnly || p.free) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionHeader
            title={isFreeOnly ? "FREE PLUGINS" : "SMART PLUGINS"}
            subtitle={isFreeOnly ? "Zero Cost, High Quality" : "Intelligent Audio Tools"}
          />

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-64 focus-within:border-white/30 transition-all mb-4">
            <Search size={14} className="text-muted" />
            <input
              type="text"
              placeholder="Search plugins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-white text-[10px] w-full placeholder:text-muted/50 font-mono tracking-tight"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X size={12} className="text-muted hover:text-white" />
              </button>
            )}
          </div>
        </div>

        {plugins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
              {plugins.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
            <p className="text-muted font-mono text-xs uppercase tracking-widest">No plugins found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
