import React from 'react';
import { SectionHeader } from '../components/Shared';

export const Contact = () => {
  return (
    <div className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <div className="mb-6">
              <SectionHeader
                title="GET IN TOUCH"
                subtitle="Support & Inquiries"
              />
            </div>
            <p className="text-muted text-lg font-light leading-relaxed mb-12 max-w-md">
              Have questions about our plugins or need a custom license for a beat? Reach out and we'll get back to you within 24 hours.
            </p>
            <div className="space-y-8">
              <div>
                <h4 className="font-mono text-xs tracking-widest text-white mb-2 uppercase">Email</h4>
                <p className="text-xl font-display font-bold">support@hedioaudio.com</p>
              </div>
              <div>
                <h4 className="font-mono text-xs tracking-widest text-white mb-2 uppercase">Location</h4>
                <p className="text-xl font-display font-bold">Remote / Worldwide</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-12 rounded-2xl border border-border">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-muted uppercase">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-border py-2 outline-none focus:border-white transition-colors text-sm" placeholder="YOUR NAME" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-muted uppercase">Email</label>
                  <input type="email" className="w-full bg-transparent border-b border-border py-2 outline-none focus:border-white transition-colors text-sm" placeholder="YOUR EMAIL" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-muted uppercase">Subject</label>
                <input type="text" className="w-full bg-transparent border-b border-border py-2 outline-none focus:border-white transition-colors text-sm" placeholder="HOW CAN WE HELP?" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-muted uppercase">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-border py-2 outline-none focus:border-white transition-colors text-sm resize-none" placeholder="YOUR MESSAGE"></textarea>
              </div>
              <button className="w-full py-4 bg-white text-black font-bold rounded-full hover:scale-[1.02] transition-transform">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
