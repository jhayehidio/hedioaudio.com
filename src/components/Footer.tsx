import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-black border-t border-border pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter uppercase">HedioAudio</span>
          </div>
          <p className="text-muted max-w-sm mb-8 font-light leading-relaxed">
            Premium tools and beats for the modern creator.
          </p>
          <div className="flex gap-4">
            {['INSTAGRAM', 'YOUTUBE'].map(social => (
              <a key={social} href="#" className="text-[10px] font-mono tracking-widest text-muted hover:text-white transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest text-white mb-8 uppercase">Navigation</h4>
          <ul className="space-y-4">
            {[
              { name: 'Home', path: '/' },
              { name: 'Plugins', path: '/plugins' },
              { name: 'Beats', path: '/beats' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map(item => (
              <li key={item.name}>
                <Link to={item.path} className="text-sm text-muted hover:text-white transition-colors font-light">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest text-white mb-8 uppercase">Newsletter</h4>
          <p className="text-sm text-muted mb-6 font-light">Get updates on new releases and exclusive deals.</p>
          <div className="flex border-b border-border pb-2 group focus-within:border-white transition-colors">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="bg-transparent border-none outline-none text-xs font-mono w-full placeholder:text-muted/50"
            />
            <button className="text-muted hover:text-white transition-colors">
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-[10px] font-mono text-muted/40 uppercase tracking-widest">© 2026 HedioAudio. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] font-mono text-muted/40 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</a>
          <a href="#" className="text-[10px] font-mono text-muted/40 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);
