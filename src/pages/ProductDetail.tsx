import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PRODUCTS, License } from '../constants';
import { ShoppingBag, Play, Pause, ChevronLeft, Cpu, Disc, Waves, CheckCircle2 } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(
    product?.licenses ? product.licenses[0] : null
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <div className="pt-32 text-center">Product not found</div>;

  const currentPrice = selectedLicense ? selectedLicense.price : product.price;
  const isFree = selectedLicense ? selectedLicense.price === 0 : product.free;

  const handleCheckout = () => {
    // Priority: 1. License-specific URL, 2. Product-level URL
    const url = (selectedLicense && selectedLicense.checkoutUrl) ? selectedLicense.checkoutUrl : product.polarCheckoutUrl;

    if (url) {
      window.location.href = url;
    } else {
      alert("Checkout link not set for this product yet.");
    }
  };

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-12 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-mono tracking-widest uppercase">Back to Collection</span>
        </Link>

        {/* Product Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {product.youtubeId && (
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/5">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${product.youtubeId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )}
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

            {/* License List for Beats */}
            {product.type === 'beat' && product.licenses && (
              <div className="mb-12 space-y-4">
                <h3 className="text-xs font-mono tracking-[0.3em] text-muted uppercase mb-4">Licenses</h3>
                <div className="space-y-3">
                  {product.licenses.map((license) => (
                    <div
                      key={license.name}
                      className="w-full p-6 rounded-xl border border-white/5 bg-white/[0.02] text-left flex items-start gap-4 transition-colors hover:border-white/10"
                    >
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold uppercase tracking-tight text-white/90">{license.name}</span>
                          <span className="font-display font-bold text-xl text-white">${license.price}</span>
                        </div>
                        <div className="text-[10px] font-mono mb-3 text-white/40 uppercase tracking-widest">{license.features}</div>
                        <p className="text-xs text-muted/70 leading-relaxed font-light">{license.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NoisyPlayer Custom Content */}
            {product.id === 'noisyplayer' && product.fullDetails && (
              <div className="space-y-16 mb-16">
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold uppercase tracking-tight">{product.fullDetails.tagline}</h2>
                  <p className="text-muted leading-relaxed">{product.fullDetails.about}</p>
                </div>

                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
                  <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase">The Core Value</h3>
                  <p className="text-sm text-muted leading-relaxed">{product.fullDetails.coreValue}</p>
                </div>

                <div className="space-y-8">
                  <h3 className="text-xs font-mono tracking-[0.3em] text-muted uppercase">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {product.fullDetails.features.map((f) => (
                      <div key={f.title} className="space-y-2">
                        <h4 className="text-sm font-bold text-white/90">{f.title}</h4>
                        <p className="text-xs text-muted/70 leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-xs font-mono tracking-[0.3em] text-muted uppercase">Technical Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                      <span className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Format</span>
                      <span className="text-xs text-white/80">{product.fullDetails.specs.format}</span>
                    </div>
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                      <span className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Support</span>
                      <span className="text-xs text-white/80">{product.fullDetails.specs.fileSupport}</span>
                    </div>
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                      <span className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Workflow</span>
                      <span className="text-xs text-white/80">{product.fullDetails.specs.workflow}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-xs font-mono tracking-[0.3em] text-muted uppercase text-center mb-12">How It Works</h3>
                  <div className="grid grid-cols-1 gap-12">
                    {product.fullDetails.steps.map((step, i) => (
                      <div key={step.title} className="flex gap-8 items-start">
                        <span className="text-4xl font-display font-bold text-white/10">{i + 1}</span>
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold text-white/90">{step.title}</h4>
                          <p className="text-sm text-muted/70 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-8 mb-12">
              <div className="flex items-center justify-between py-6 border-y border-white/5">
                <span className="text-3xl font-display font-bold tracking-tight">
                  {isFree ? 'FREE' : `$${currentPrice}`}
                </span>
                <button
                  onClick={handleCheckout}
                  className="px-12 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-3"
                >
                  <ShoppingBag size={20} />
                  {isFree ? 'DOWNLOAD NOW' : 'ADD TO CART'}
                </button>
              </div>
            </div>

            {product.type === 'beat' && (
              <div className="space-y-8 bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
                <div className="space-y-2">
                  <h3 className="text-xs font-mono tracking-[0.3em] text-muted uppercase">License Terms</h3>
                  <p className="text-sm text-muted/80 leading-relaxed italic">
                    All purchases include a perpetual non-exclusive license and official license agreement.
                    The beat remains owned by <span className="text-white">hedio</span>, but you have full creative rights within your chosen tier.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Credit", value: "Produced by hedio" },
                    { label: "Delivery", value: "Instant download after purchase" },
                    { label: "Usage", value: "Commercial rights included" },
                    { label: "Validity", value: "License valid worldwide" }
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{item.label}</span>
                      <span className="text-sm text-white/90">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
