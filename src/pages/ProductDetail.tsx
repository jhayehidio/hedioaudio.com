import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ShoppingBag, Play, Pause, ChevronLeft, Cpu, Disc, Waves } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <div className="pt-32 text-center">Product not found</div>;

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-12 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-mono tracking-widest uppercase">Back to Collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square rounded-2xl overflow-hidden border border-white/5"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono tracking-widest uppercase text-muted">
                {product.type}
              </span>
              {product.category && (
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono tracking-widest uppercase text-muted">
                  {product.category}
                </span>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase mb-6 leading-none">
              {product.name}
            </h1>

            <p className="text-xl text-muted font-light leading-relaxed mb-12">
              {product.description}
            </p>

            <div className="flex flex-col gap-8 mb-12">
              <div className="flex items-center justify-between py-6 border-y border-white/5">
                <span className="text-3xl font-display font-bold">${product.price}</span>
                <button
                  onClick={() => {
                    if (product.polarCheckoutUrl) {
                      window.location.href = product.polarCheckoutUrl;
                    } else {
                      alert("Checkout logic coming soon with Polar.sh integration!");
                    }
                  }}
                  className="px-12 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-3"
                >
                  <ShoppingBag size={20} />
                  {product.free ? 'DOWNLOAD NOW' : 'ADD TO CART'}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                  <Cpu size={20} className="mx-auto mb-2 text-muted" />
                  <span className="block text-[10px] font-mono text-muted uppercase tracking-widest">Low CPU</span>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                  <Disc size={20} className="mx-auto mb-2 text-muted" />
                  <span className="block text-[10px] font-mono text-muted uppercase tracking-widest">VST/AU/AAX</span>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                  <Waves size={20} className="mx-auto mb-2 text-muted" />
                  <span className="block text-[10px] font-mono text-muted uppercase tracking-widest">Zero Latency</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-mono tracking-[0.3em] text-muted uppercase">Key Features</h3>
              <ul className="space-y-4">
                {[
                  "Intelligent algorithm designed by industry experts",
                  "Intuitive interface for rapid results",
                  "Lifetime updates and dedicated support",
                  "Royalty-free usage for all commercial projects"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
