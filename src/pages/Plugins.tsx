import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ProductCard, SectionHeader } from '../components/Shared';

export const Plugins = () => {
  const location = useLocation();
  const isFreeOnly = new URLSearchParams(location.search).get('free') === 'true';
  
  const plugins = PRODUCTS.filter(p => 
    p.type === 'plugin' && (!isFreeOnly || p.free)
  );

  return (
    <div className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          title={isFreeOnly ? "FREE PLUGINS" : "SMART PLUGINS"} 
          subtitle={isFreeOnly ? "Zero Cost, High Quality" : "Intelligent Audio Tools"} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {plugins.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
