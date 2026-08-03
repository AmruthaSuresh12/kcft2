import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

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

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.courses, href: '#courses' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.reviews, href: '#testimonials' },
    { name: t.nav.founders, href: '#founders' },
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
          padding: '24px',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.4)',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/assets/logo.png" alt="KCFT Logo" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
            <span style={{ fontWeight: 700, fontSize: '15px', color: drawerTextColor, fontFamily: 'serif' }}>KCFT</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              color: drawerTextColor,
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '50%',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 500,
                color: drawerTextColor,
                textDecoration: 'none',
                borderBottom: drawerBorderItem,
                display: 'block',
              }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Drawer Action Controls */}
        <div style={{ paddingTop: '20px', borderTop: drawerBorderItem, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Language Switcher in Drawer */}
          <button
            onClick={toggleLanguage}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              width: '100%', padding: '10px', borderRadius: '12px',
              border: '1px solid rgba(242,121,143,0.3)',
              backgroundColor: 'rgba(242,121,143,0.08)',
              color: '#F2798F', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            <Languages size={15} />
            <span>{t.nav.switchLang}</span>
          </button>

          {/* Theme Switcher in Drawer */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              width: '100%', padding: '10px', borderRadius: '12px',
              border: drawerBorderItem,
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              color: drawerTextColor, fontSize: '13px', fontWeight: 500, cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? <Sun size={15} color="#F2798F" /> : <Moon size={15} color="#590524" />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: 'block', textAlign: 'center',
              width: '100%', padding: '12px', borderRadius: '99px',
              backgroundColor: '#F2798F', color: '#ffffff',
              fontWeight: 600, fontSize: '14px', textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(242,121,143,0.3)',
            }}
          >
            {t.nav.contact}
          </a>
        </div>
      </div>
    </>,
    document.body
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? scrolledBg : 'bg-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-pink/10 border border-brand-pink/20 p-1 transition-all duration-300 group-hover:scale-105 group-hover:border-brand-pink">
            <img
              src="/assets/logo.png"
              alt="KCFT Logo"
              className="w-full h-full object-cover rounded-full logo-blend"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-xl leading-none text-text-primary tracking-tight">
              KCFT
            </span>
            <span className="text-[10px] text-brand-pink font-medium tracking-wider uppercase mt-1">
              Keerthana Creative Foundation
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-brand-pink transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Native Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer border border-brand-pink/30 bg-brand-pink/10 text-brand-pink hover:bg-brand-pink hover:text-white"
            title="Switch Language / ಭಾಷೆ ಬದಲಾಯಿಸಿ"
          >
            <Languages size={14} />
            <span>{t.nav.switchLang}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border-primary text-text-secondary hover:text-text-primary hover:border-border-hover transition-all duration-200 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} className="text-brand-pink" /> : <Moon size={18} />}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="bg-brand-pink text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-transparent hover:text-brand-pink border border-brand-pink transition-all duration-300 shadow-md shadow-brand-pink/20"
          >
            {t.nav.contact}
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border border-brand-pink/30 bg-brand-pink/10 text-brand-pink"
          >
            <Languages size={13} />
            <span>{t.nav.switchLang}</span>
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl text-text-primary hover:bg-card-hover transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            <Menu size={24} />
          </button>
        </div>

      </div>

      {/* Render Mobile Drawer */}
      {mobileDrawer}
    </header>
  );
}
