import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-bg/80 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-full animate-pulse" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter">HEDIO AUDIO</span>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-12">
          <div className="relative group">
            <button className="text-xs font-mono tracking-widest text-muted hover:text-white transition-colors flex items-center gap-1">
              PRODUCTS <ChevronDown size={12} />
            </button>
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-bg border border-border p-4 rounded-xl min-w-[200px] backdrop-blur-xl shadow-2xl">
                <Link to="/plugins" className="block text-[10px] font-mono tracking-widest text-muted hover:text-white py-2 transition-colors">PLUGINS</Link>
                <Link to="/beats" className="block text-[10px] font-mono tracking-widest text-muted hover:text-white py-2 transition-colors">BEATS</Link>
              </div>
            </div>
          </div>
          {[
            { name: 'FREE', path: '/plugins?free=true' },
            { name: 'ABOUT', path: '/about' },
            { name: 'CONTACT', path: '/contact' }
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={item.path}
                className={`text-xs font-mono tracking-widest transition-colors ${
                  location.pathname === item.path ? 'text-white' : 'text-muted hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2"
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
          </motion.button>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-mono text-muted tracking-widest">PRODUCTS</span>
                <Link to="/plugins" className="text-sm font-mono tracking-widest text-white pl-4">PLUGINS</Link>
                <Link to="/beats" className="text-sm font-mono tracking-widest text-white pl-4">BEATS</Link>
              </div>
              {[
                { name: 'FREE', path: '/plugins?free=true' },
                { name: 'ABOUT', path: '/about' },
                { name: 'CONTACT', path: '/contact' }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`text-sm font-mono tracking-widest ${location.pathname === item.path ? 'text-white' : 'text-muted'}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
