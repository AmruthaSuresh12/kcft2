import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const triggerTranslate = (targetLang) => {
    const tryTranslate = (attempts = 0) => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = targetLang;
        select.dispatchEvent(new Event('change'));
        setLang(targetLang === 'en' ? 'en' : 'kn');
      } else if (attempts < 10) {
        setTimeout(() => tryTranslate(attempts + 1), 300);
      }
    };
    tryTranslate();
  };

  const toggleLang = () => {
    triggerTranslate(lang === 'en' ? 'kn' : 'en');
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Founders', href: '#founders' },
  ];

  const scrolledBg = theme === 'dark'
    ? 'bg-gradient-to-r from-[#590524]/95 via-[#3d0318]/95 to-[#590524]/95 backdrop-blur-md border-b border-brand-pink/20 shadow-lg shadow-brand-pink/10'
    : 'bg-[#fffaf9]/95 backdrop-blur-md border-b border-brand-pink/30 shadow-lg shadow-brand-pink/5';

  const drawerBg = theme === 'dark' ? '#0a0a0a' : '#fffaf9';
  const drawerTextColor = theme === 'dark' ? '#ffffff' : '#2d0a1b';
  const drawerBorderItem = theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(89,5,36,0.08)';

  // Render drawer directly into document.body to avoid nav z-index stacking context
  const mobileDrawer = createPortal(
    <>
      {/* Dark backdrop — clicking it closes the drawer */}
      <div
        onClick={() => setIsMenuOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.55)',
          zIndex: 99998,
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '280px',
          backgroundColor: drawerBg,
          borderLeft: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(242,121,143,0.25)',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          padding: '80px 24px 32px 24px',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.18)',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: drawerTextColor,
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={24} />
        </button>

        {/* Nav links */}
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            style={{
              color: drawerTextColor,
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              padding: '14px 0',
              borderBottom: drawerBorderItem,
              display: 'block',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#F2798F'}
            onMouseLeave={e => e.currentTarget.style.color = drawerTextColor}
          >
            {link.name}
          </a>
        ))}

        {/* Contact button */}
        <a
          href="#contact"
          onClick={() => setIsMenuOpen(false)}
          style={{
            marginTop: '24px',
            backgroundColor: '#F2798F',
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: '600',
            padding: '12px 0',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: '15px',
            display: 'block',
          }}
        >
          Contact Us
        </a>
      </div>
    </>,
    document.body
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? `${scrolledBg} py-3` : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/assets/logo.png"
              alt="KCFT Logo"
              className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col text-left">
              <span className={`font-display font-bold text-lg leading-tight tracking-wider transition-colors ${
                isScrolled && theme === 'dark' ? 'text-white' : 'text-text-primary'
              }`}>KCFT</span>
              <span className="text-[10px] text-brand-pink font-light tracking-widest uppercase">Keerthana Creative Foundation Trust</span>
            </div>
          </a>

          {/* Desktop Links & Actions */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-pink after:transition-all hover:after:w-full ${
                  isScrolled && theme === 'dark'
                    ? 'text-white/90 hover:text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={toggleLang}
              title={lang === 'en' ? 'Switch to Kannada' : 'Switch to English'}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-white/5 border border-border-primary hover:bg-brand-pink/10 hover:border-brand-pink/40 transition-all focus:outline-none cursor-pointer"
              aria-label="Toggle Language"
            >
              <Languages size={14} className="text-brand-pink" />
              <span className={`transition-all ${isScrolled && theme === 'dark' ? 'text-white' : 'text-text-primary'}`}>
                {lang === 'en' ? 'ಕನ್ನಡ' : 'EN'}
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="text-text-secondary hover:text-text-primary p-2.5 rounded-xl bg-white/5 border border-border-primary hover:bg-white/10 transition-all focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-brand-magenta" />}
            </button>

            <a
              href="#contact"
              className="bg-brand-pink text-white text-sm font-semibold px-5 py-2 rounded-full border border-brand-pink hover:bg-transparent hover:text-brand-pink transition-all duration-300 shadow-md shadow-brand-pink/20"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLang}
              className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-white/5 border border-border-primary hover:bg-brand-pink/10 transition-all focus:outline-none cursor-pointer text-text-primary"
              aria-label="Toggle Language"
            >
              {lang === 'en' ? 'ಕನ್ನಡ' : 'EN'}
            </button>

            <button
              onClick={toggleTheme}
              className="text-text-secondary hover:text-text-primary p-2 rounded-xl bg-white/5 border border-border-primary transition-all focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-brand-magenta" />}
            </button>

            <button
              className="text-text-primary hover:text-brand-pink transition-colors focus:outline-none cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer — rendered via React portal directly into document.body */}
      {mobileDrawer}
    </>
  );
}
