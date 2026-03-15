import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/Shared';

export const About = () => {
  return (
    <div className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-2xl overflow-hidden border border-border"
          >
            <img
              src="https://picsum.photos/seed/studio/1000/1000"
              alt="Studio"
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent" />
          </motion.div>

          <div>
            <SectionHeader
              title="AUDIO TOOLS FOR CREATORS"
              subtitle="Our Philosophy"
            />
            <p className="text-muted text-lg font-light leading-relaxed mb-8">
              HedioAudio is built on the idea that music production should be faster, easier, and more fun. We create smart plugins that eliminate the technical hurdles of production.
            </p>
            <p className="text-muted text-lg font-light leading-relaxed mb-12">
              Our beats collection focuses on high-quality piano ballads and pop instrumentals, providing the perfect foundation for your next radio-ready hit.
            </p>
            <div className="grid grid-cols-2 gap-8 py-12 border-t border-white/10">
              <div>
                <h4 className="font-mono text-xs tracking-widest text-white mb-4 uppercase">Founded</h4>
                <p className="text-2xl font-display font-bold">2026</p>
              </div>
              <div>
                <h4 className="font-mono text-xs tracking-widest text-white mb-4 uppercase">Mission</h4>
                <p className="text-2xl font-display font-bold">Speed & Quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
