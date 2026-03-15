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
              <div className="space-y-32">
                {/* 1. Header Area: Tagline, About, Price, Download */}
                <div className="space-y-12">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight leading-tight">{product.fullDetails.tagline}</h2>
                    <p className="text-xl text-muted leading-relaxed max-w-3xl">{product.fullDetails.about}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 py-10 border-y border-white/5">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-muted uppercase tracking-[0.2em] block">Current Version</span>
                      <span className="text-4xl font-display font-bold tracking-tight">FREE</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="px-12 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                      <ShoppingBag size={20} />
                      DOWNLOAD NOW
                    </button>
                  </div>
                </div>

                {/* 2. Core Value & Key Features Section (Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-12">
                    <div className="space-y-4">
                      <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase">The Logic</h3>
                      <p className="text-lg text-muted leading-relaxed">{product.fullDetails.coreValue}</p>
                    </div>

                    <div className="space-y-8">
                      <h3 className="text-xs font-mono tracking-[0.3em] text-muted uppercase">Key Capabilities</h3>
                      <div className="grid grid-cols-1 gap-8">
                        {product.fullDetails.features.slice(0, 4).map((f) => (
                          <div key={f.title} className="flex gap-4">
                            <div className="w-1 h-1 rounded-full bg-white/20 mt-2 shrink-0" />
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-white/90">{f.title}</h4>
                              <p className="text-xs text-muted/70 leading-relaxed">{f.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="sticky top-32">
                    <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-3xl p-1">
                      <video
                        src="/videos/NoisyPlayer Core Value.mp4"
                        controls
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover rounded-[22px]"
                      />
                    </div>
                    <div className="mt-6 flex items-center justify-between px-2">
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Core Value Demo</span>
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">0:12</span>
                    </div>
                  </div>
                </div>

                {/* 3. How It Works (Staggered Layout) */}
                <div className="space-y-40">
                  <div className="text-center space-y-4">
                    <h3 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight">Match any reference in 3 steps.</h3>
                    <p className="text-muted font-mono text-xs tracking-widest uppercase">Intelligent Workflow Integration</p>
                  </div>

                  {/* Step 1: Text Left, Video Right */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-6">
                      <span className="text-xs font-mono font-bold text-white/20 uppercase tracking-[0.5em]">Step 01</span>
                      <h3 className="text-3xl font-display font-bold uppercase">{product.fullDetails.steps[0].title}</h3>
                      <p className="text-lg text-muted leading-relaxed">{product.fullDetails.steps[0].desc}</p>
                    </div>
                    <div className="aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] shadow-2xl">
                      <video
                        src="/videos/NoisyPlayer How It Works.mp4"
                        controls
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Step 2: Video Left, Text Right */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] shadow-2xl lg:order-1 order-2">
                      <video
                        src="/videos/NoisyPlayer How It Works.mp4"
                        controls
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-6 lg:order-2 order-1">
                      <span className="text-xs font-mono font-bold text-white/20 uppercase tracking-[0.5em]">Step 02</span>
                      <h3 className="text-3xl font-display font-bold uppercase">{product.fullDetails.steps[1].title}</h3>
                      <p className="text-lg text-muted leading-relaxed">{product.fullDetails.steps[1].desc}</p>
                    </div>
                  </div>

                  {/* Step 3: Text Left, Video Right */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-6">
                      <span className="text-xs font-mono font-bold text-white/20 uppercase tracking-[0.5em]">Step 03</span>
                      <h3 className="text-3xl font-display font-bold uppercase">{product.fullDetails.steps[2].title}</h3>
                      <p className="text-lg text-muted leading-relaxed">{product.fullDetails.steps[2].desc}</p>
                    </div>
                    <div className="aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] shadow-2xl">
                      <video
                        src="/videos/NoisyPlayer How It Works.mp4"
                        controls
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Technical Specifications (Below How It Works) */}
                <div className="space-y-16 py-32 border-t border-white/5">
                  <div className="space-y-12">
                    <h3 className="text-xs font-mono tracking-[0.3em] text-muted uppercase text-center">Technical Specifications</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.04] transition-colors">
                        <span className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">Format Compatibility</span>
                        <span className="text-lg text-white/90 font-display font-bold uppercase">{product.fullDetails.specs.format}</span>
                        <p className="text-xs text-muted mt-2">Compatible with major DAWs like Ableton, FL Studio, Logic Pro, and Reaper.</p>
                      </div>
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.04] transition-colors">
                        <span className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">File Support</span>
                        <span className="text-lg text-white/90 font-display font-bold uppercase">{product.fullDetails.specs.fileSupport}</span>
                        <p className="text-xs text-muted mt-2">Supports high-fidelity lossless formats for accurate frequency analysis.</p>
                      </div>
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.04] transition-colors">
                        <span className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">Optimized Workflow</span>
                        <span className="text-lg text-white/90 font-display font-bold uppercase">Universal Match</span>
                        <p className="text-xs text-muted mt-2">{product.fullDetails.specs.workflow}</p>
                      </div>
                    </div>
                  </div>

                  {/* 5. Final Download Button (Bottom) */}
                  <div className="flex flex-col items-center gap-8 py-20 px-8 bg-gradient-to-b from-white/[0.02] to-transparent rounded-3xl border border-white/5">
                    <div className="text-center space-y-4">
                      <h3 className="text-3xl font-display font-bold uppercase tracking-tight">Experience surgical precision.</h3>
                      <p className="text-muted font-mono text-[10px] uppercase tracking-[0.4em]">Zero Latency • Instant Analysis • Free Forever</p>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="px-16 py-7 bg-white text-black rounded-full font-bold text-xl hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all flex items-center gap-4 group"
                    >
                      <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
                      DOWNLOAD NOISYPLAYER
                    </button>
                    <span className="text-[10px] font-mono text-white/20 uppercase">v1.0.0 Stable Build</span>
                  </div>
                </div>
              </div>
            )}

            {/* Default Checkout Section for other products */}
            {product.id !== 'noisyplayer' && (
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
            )}

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
