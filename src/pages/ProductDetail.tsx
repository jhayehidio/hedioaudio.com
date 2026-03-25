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
    const url = (selectedLicense && selectedLicense.checkoutUrl) ? selectedLicense.checkoutUrl : product.lemonSqueezyUrl;

    if (url) {
      if ((window as any).LemonSqueezy) {
        (window as any).LemonSqueezy.Url.Open(url);
      } else {
        window.open(url, '_blank');
      }
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

        {/* Product Detail Layout */}
        <div className="space-y-32">
          {/* Section 1: Main Info & Primary Media */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-square rounded-2xl overflow-hidden border border-white/5 bg-black lg:sticky lg:top-32"
            >
              {product.type === 'plugin' ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full">
                  {product.youtubeId ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${product.youtubeId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-12"
            >
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono tracking-widest uppercase text-muted">
                  {product.type}
                </span>
                {product.category && (
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono tracking-widest uppercase text-muted">
                    {product.category}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase leading-none">
                  {product.name}
                </h1>
                {product.fullDetails?.tagline && (
                  <h2 className="text-2xl font-display font-bold uppercase tracking-tight text-white/90 leading-tight">
                    {product.fullDetails.tagline}
                  </h2>
                )}
                <p className="text-xl text-muted leading-relaxed max-w-3xl">
                  {product.description || product.fullDetails?.about}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 py-10 border-y border-white/5">
                <div className="space-y-1">
                  <span className="text-4xl font-display font-bold tracking-tight">
                    {isFree ? 'FREE' : `$${currentPrice}`}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="px-12 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] lemonsqueezy-button"
                >
                  <ShoppingBag size={20} />
                  {isFree ? 'DOWNLOAD NOW' : 'BUY / DOWNLOAD'}
                </button>
              </div>


            </motion.div>
          </div>

          {/* Detailed Content Sections (Plugins primarily) */}
          {product.type === 'plugin' && product.fullDetails && (
            <div className="space-y-32">
              {/* Section 2: Core Value with Video/Image */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-black lg:sticky lg:top-32 order-1">
                  <video
                    src={`/videos/${product.name} Core Value.mp4`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>

                <div className="space-y-16 order-2">
                  <div className="space-y-6">
                    <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase">Core Value</h3>
                    <p className="text-2xl font-display font-bold tracking-tight leading-relaxed">
                      {product.fullDetails.coreValue}
                    </p>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-xs font-mono tracking-[0.3em] text-muted uppercase">Key Features</h3>
                    <div className="grid grid-cols-1 gap-8">
                      {product.fullDetails.features.map((f) => (
                        <div key={f.title} className="flex gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-white/90 tracking-wide">{f.title}</h4>
                            <p className="text-sm text-muted/70 leading-relaxed font-light">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Workflow with Video */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-black lg:sticky lg:top-32 order-1">
                  <video
                    src={`/videos/${product.name} How It Works.mp4`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>

                <div className="space-y-16 order-2">
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase">Workflow</h3>
                    <h2 className="text-4xl font-display font-bold tracking-tight">
                      {product.fullDetails.workflowTitle || 'Match any reference in 3 steps.'}
                    </h2>
                  </div>

                  <div className="space-y-12">
                    {product.fullDetails.steps.map((step, i) => (
                      <div key={step.title} className="flex gap-8 items-start">
                        <span className="text-4xl font-display font-bold text-white/10">{i + 1}</span>
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold text-white/90 tracking-tight">{step.title}</h4>
                          <p className="text-sm text-muted/70 leading-relaxed font-light">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technical Specs moved here for Plugins */}
                  {product.fullDetails.specs && (
                    <div className="space-y-8 pt-16 border-t border-white/5">
                      <h3 className="text-xs font-mono tracking-[0.3em] text-muted uppercase">Technical Specifications</h3>
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl space-y-8">
                        <div className="space-y-2">
                          <span className="block text-[10px] font-mono text-white/30 uppercase tracking-widest">Format Compatibility</span>
                          <span className="text-lg text-white/90 font-display font-bold">{product.fullDetails.specs.format}</span>
                          <p className="text-xs text-muted">{product.fullDetails.specs.formatDesc || 'Compatible with Windows DAWs.'}</p>
                        </div>
                        <div className="space-y-2 pt-8 border-t border-white/5">
                          <span className="block text-[10px] font-mono text-white/30 uppercase tracking-widest">
                            {product.id === 'boundary-eq' ? 'Protocol Support' : 'File Support'}
                          </span>
                          <span className="text-lg text-white/90 font-display font-bold">{product.fullDetails.specs.fileSupport}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Technical Specifications & License Terms Footer */}
          <div className="space-y-4 border-t border-white/5 pt-12">
            {/* Final CTA Area - Now Identical across all products */}
            <div className="flex flex-col items-center gap-6 pt-10 pb-2 px-8 bg-gradient-to-b from-white/[0.02] to-transparent rounded-3xl border border-white/5">
              <div className="text-center space-y-3">
                <h3 className="text-3xl font-display font-bold uppercase tracking-tight">
                  {product.fullDetails?.footerTagline || 'Your matching helper.'}
                </h3>
                <p className="text-muted font-mono text-[10px] uppercase tracking-[0.4em]">
                  {product.fullDetails?.footerSubtext || 'Zero Latency • Instant Analysis • Free Forever'}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="px-16 py-7 bg-white text-black rounded-full font-bold text-xl hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all flex items-center gap-4 group lemonsqueezy-button"
              >
                <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
                {isFree ? 'DOWNLOAD NOW' : 'BUY / DOWNLOAD'}
              </button>
              <span className="text-[10px] font-mono text-white/20 uppercase pb-6">
                Official Licensed Release
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
