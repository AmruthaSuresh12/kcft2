import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronRight, Play, Award, Users, HeartHandshake } from 'lucide-react';

const heroSlides = [
  {
    id: 'dance',
    domain: 'Dance',
    badge: 'Bharatanatyam & Classical Folk',
    title: 'Expressing Heritage Through',
    highlight: 'Rhythm & Grace',
    description: 'Immerse in ancient storytelling and classical dance. Developing discipline, stamina, and artistic expression for all age groups.',
    image: '/assets/dance-performance.png',
    accentColor: 'from-pink-500 to-rose-600',
    glowColor: 'rgba(242, 121, 143, 0.35)',
    tag: 'Cultural Arts'
  },
  {
    id: 'yoga',
    domain: 'Yoga',
    badge: 'Mind, Body & Soul Balance',
    title: 'Transforming Lives With',
    highlight: 'Holistic Yoga',
    description: 'Experience traditional Hatha, Pranayama, and meditative practices to rejuvenate health, restore mental clarity, and achieve inner harmony.',
    image: '/assets/yoga-class.png',
    accentColor: 'from-amber-500 to-rose-500',
    glowColor: 'rgba(242, 162, 155, 0.35)',
    tag: 'Wellness & Health'
  },
  {
    id: 'theatre',
    domain: 'Theatre',
    badge: 'Stage & Performance Acting',
    title: 'Unlocking Confidence On',
    highlight: 'The Live Stage',
    description: 'Empowering children and youth through drama, voice modulation, and expressive storytelling under experienced theatre mentors.',
    image: '/assets/theatre-camp.png',
    accentColor: 'from-rose-500 to-purple-600',
    glowColor: 'rgba(190, 24, 93, 0.35)',
    tag: 'Dramatic Arts'
  },
  {
    id: 'garbha',
    domain: 'Garbha Samskara',
    badge: 'Prenatal Care & Motherhood',
    title: 'Nurturing New Life With',
    highlight: 'Sacred Samskara',
    description: 'Specialized prenatal yoga, Garbha Samskara chanting, and emotional wellness programs for expectant mothers and healthy births.',
    image: '/assets/prenatal-yoga.png',
    accentColor: 'from-pink-400 to-amber-500',
    glowColor: 'rgba(242, 148, 148, 0.35)',
    tag: 'Maternal Care'
  },
  {
    id: 'shloka',
    domain: 'Shloka Class',
    badge: 'Ancient Wisdom for Kids',
    title: 'Building Values Through',
    highlight: 'Sacred Shlokas',
    description: 'Enhancing memory, focus, and vocal clarity in young minds through traditional Sanskrit chanting and moral values.',
    image: '/assets/shloka-class.png',
    accentColor: 'from-red-600 to-rose-700',
    glowColor: 'rgba(89, 5, 36, 0.45)',
    tag: 'Heritage & Values'
  }
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const slide = heroSlides[activeSlide];

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center overflow-hidden bg-bg-primary"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* ── Dynamic Ambient Glassmorphism Orbs ── */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[55%] h-[55%] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 opacity-60"
        style={{ background: slide.glowColor }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full blur-[120px] pointer-events-none transition-all duration-1000 opacity-50"
        style={{ background: 'rgba(242, 121, 143, 0.25)' }}
      />
      <div className="absolute top-[30%] right-[20%] w-[25%] h-[25%] bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ── Left Content Panel ── */}
          <div className="lg:col-span-7 flex flex-col text-left justify-center">
            
            {/* Domain Switcher Pills Bar */}
            <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-card-bg/60 backdrop-blur-xl border border-border-primary/80 rounded-2xl w-fit shadow-lg shadow-black/20">
              {heroSlides.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    activeSlide === idx
                      ? 'bg-gradient-to-r from-brand-pink to-brand-magenta text-white shadow-md shadow-brand-pink/30 scale-105'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  {item.domain}
                </button>
              ))}
            </div>

            {/* Dynamic Glassmorphic Content Card */}
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-pink/20 to-brand-magenta/10 border border-brand-pink/30 px-4 py-1.5 rounded-full text-brand-pink text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm backdrop-blur-md">
                    <Sparkles size={14} className="animate-pulse text-brand-pink" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Dynamic Heading */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-[1.12] mb-6">
                    {slide.title}{' '}
                    <span className={`bg-gradient-to-r ${slide.accentColor} bg-clip-text text-transparent block sm:inline`}>
                      {slide.highlight}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-text-secondary text-lg sm:text-xl font-light leading-relaxed mb-8 max-w-xl">
                    {slide.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <a 
                href="#courses" 
                className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-brand-pink to-brand-magenta text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-brand-pink/30 hover:shadow-brand-pink/50 hover:scale-[1.02] transition-all duration-300 border border-white/20"
              >
                <span>Explore Classes & Programs</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5" />
              </a>

              <a 
                href="#about" 
                className="px-7 py-4 rounded-full font-semibold text-text-primary bg-card-bg/80 backdrop-blur-md border border-border-primary hover:border-brand-pink/40 hover:bg-card-hover transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                Learn Our Story
              </a>
            </div>

            {/* Slide Progress Indicators */}
            <div className="flex items-center gap-3 mt-10">
              <span className="text-xs font-mono font-bold text-brand-pink">
                0{activeSlide + 1}
              </span>
              <div className="flex gap-2 items-center flex-1 max-w-[200px]">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className="h-1.5 rounded-full transition-all duration-500 cursor-pointer flex-1"
                    style={{
                      backgroundColor: activeSlide === idx ? '#F2798F' : 'rgba(255, 255, 255, 0.15)',
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-text-muted">
                0{heroSlides.length}
              </span>
            </div>

          </div>

          {/* ── Right Dynamic Glassmorphism Showcase Card ── */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Outer Glassmorphic Halo Ring */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-brand-pink/20 via-transparent to-brand-magenta/20 blur-2xl pointer-events-none scale-105" />

            {/* Main Glassmorphic Showcase Panel */}
            <div className="relative w-full max-w-[460px] rounded-[32px] p-3 bg-gradient-to-b from-white/15 via-white/5 to-black/40 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/60 overflow-hidden">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[4/5] rounded-[24px] overflow-hidden"
                >
                  {/* Slide Image */}
                  <img 
                    src={slide.image} 
                    alt={slide.domain} 
                    className="w-full h-full object-cover filter brightness-[0.92] transition-transform duration-700 hover:scale-105" 
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Top Glass Badge */}
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-pink animate-ping" />
                    <span className="text-xs font-semibold text-white tracking-wide uppercase">{slide.tag}</span>
                  </div>

                  {/* Top Right Logo Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 p-1.5 flex items-center justify-center shadow-lg">
                    <img src="/assets/logo.png" alt="KCFT" className="w-full h-full object-contain rounded-full" />
                  </div>

                  {/* Bottom Glass Caption Panel */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xl border border-white/15 p-4 rounded-2xl text-left shadow-2xl">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-brand-pink block mb-1">
                      {slide.domain} Program
                    </span>
                    <h4 className="font-display font-bold text-white text-lg leading-tight mb-1">
                      Keerthana Creative Foundation
                    </h4>
                    <p className="text-xs text-white/70 font-light line-clamp-1">
                      {slide.badge}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* ── Floating Glass Floating Stat Badges ── */}
            
            {/* Top Left Floating Stat */}
            <motion.div 
              className="absolute -top-4 -left-4 bg-black/60 backdrop-blur-xl border border-white/20 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 pointer-events-none"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-pink to-brand-magenta flex items-center justify-center text-white shadow-md">
                <Award size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base font-bold font-display text-white leading-none">25+ Yrs</span>
                <span className="text-[10px] text-white/70 font-light mt-0.5">Founder Experience</span>
              </div>
            </motion.div>

            {/* Bottom Right Floating Stat */}
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-black/60 backdrop-blur-xl border border-white/20 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 pointer-events-none"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md">
                <Users size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base font-bold font-display text-white leading-none">500+</span>
                <span className="text-[10px] text-white/70 font-light mt-0.5">Students Taught</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
