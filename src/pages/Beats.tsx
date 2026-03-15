import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ProductCard, SectionHeader } from '../components/Shared';

export const Beats = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const beats = PRODUCTS.filter(p =>
    p.type === 'beat' &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionHeader
            title="PREMIUM BEATS"
            subtitle="Radio-Ready Instrumentals"
          />
          <div className="flex flex-col gap-6 items-end">
            <div className="text-[10px] font-mono text-muted/60 text-right max-w-[300px] leading-tight">
              BEATS ARE FREE FOR NON-PROFIT USE WITH CREDIT (PROD. HEDIO).
              FOR COMMERCIAL USE, PLEASE PURCHASE A LEASE.
            </div>

            {searchQuery && (
              <div className="text-[10px] font-mono text-white/60 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">
                Searching Beats: <span className="text-white ml-2">{searchQuery}</span>
              </div>
            )}
          </div>
        </div>

        {beats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
              {beats.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
            <p className="text-muted font-mono text-xs uppercase tracking-widest">No beats found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
