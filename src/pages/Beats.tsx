import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ProductCard, SectionHeader } from '../components/Shared';

export const Beats = () => {
  const beats = PRODUCTS.filter(p => p.type === 'beat');

  return (
    <div className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionHeader 
            title="PREMIUM BEATS" 
            subtitle="Radio-Ready Instrumentals" 
          />
          <div className="text-[10px] font-mono text-muted/60 text-right max-w-[300px] leading-tight mb-4">
            BEATS ARE FREE FOR NON-PROFIT USE WITH CREDIT (PROD. HEDIO). 
            FOR COMMERCIAL USE, PLEASE PURCHASE A LEASE.
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {beats.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
