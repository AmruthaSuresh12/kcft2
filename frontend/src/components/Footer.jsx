import React from 'react';
import { Instagram, Youtube, Mail, ChevronUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-bg-primary border-t border-border-primary py-12 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* Logo / Trust Title */}
        <div className="flex flex-col items-center mb-8">
          <span className="font-display font-bold text-text-primary text-2xl tracking-wider">KCFT</span>
          <span className="text-[10px] text-brand-pink font-light tracking-widest uppercase mt-1">Keerthana Creative Foundation Trust</span>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8">
          <a href="#home" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Home</a>
          <a href="#about" className="text-text-secondary hover:text-text-primary text-sm transition-colors">About</a>
          <a href="#courses" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Courses</a>
          <a href="#gallery" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Gallery</a>
          <a href="#testimonials" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Testimonials</a>
          <a href="#contact" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-5 mb-8">
          <a 
            href="https://www.instagram.com/kcf_trust?igsh=MWhvZDRkbGNvZG90" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-xl bg-card-bg hover:bg-brand-pink text-text-secondary hover:text-white border border-border-primary hover:border-brand-pink flex items-center justify-center transition-all duration-300"
          >
            <Instagram size={18} />
          </a>
          <a 
            href="https://youtube.com/@kcftrust?si=W7EOj5TFynVO0mUn" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-10 h-10 rounded-xl bg-card-bg hover:bg-brand-pink text-text-secondary hover:text-white border border-border-primary hover:border-brand-pink flex items-center justify-center transition-all duration-300"
          >
            <Youtube size={18} />
          </a>
          <a 
            href="mailto:Kcft.tumakuru@gmail.com" 
            aria-label="Email"
            className="w-10 h-10 rounded-xl bg-card-bg hover:bg-brand-pink text-text-secondary hover:text-white border border-border-primary hover:border-brand-pink flex items-center justify-center transition-all duration-300"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Divider line */}
        <div className="w-full max-w-md border-t border-border-primary my-4" />

        {/* Copyright & Scroll Top Button */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between text-text-muted text-xs mt-4 gap-4">
          <span className="font-light text-center sm:text-left">
            &copy; {new Date().getFullYear()} Keerthana Creative Foundation Trust. All rights reserved.
          </span>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 text-text-secondary hover:text-brand-pink transition-colors font-medium cursor-pointer"
            aria-label="Scroll to top"
          >
            Back to Top
            <ChevronUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Designer Credit at the absolute bottom */}
        <div className="w-full flex justify-center sm:justify-end text-text-secondary text-[11px] font-normal mt-4 pt-4 border-t border-border-primary/30">
          <div className="flex flex-col items-center sm:items-end">
            <span>designed by <strong className="text-text-primary font-semibold">Amrutha S</strong></span>
            <a 
              href="mailto:amruthasuresh.kote@gmail.com" 
              className="hover:text-brand-pink text-text-secondary hover:underline transition-all text-[10px]"
            >
              amruthasuresh.kote@gmail.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
