import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ProductCard, SectionHeader } from '../components/Shared';

export const Plugins = () => {
  const location = useLocation();
  const isFreeOnly = new URLSearchParams(location.search).get('free') === 'true';
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

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

          {searchQuery && (
            <div className="text-[10px] font-mono text-white/60 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-4">
              Searching Plugins: <span className="text-white ml-2">{searchQuery}</span>
            </div>
          )}
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
