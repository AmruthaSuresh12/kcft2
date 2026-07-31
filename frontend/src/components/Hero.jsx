import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      } 
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-radial from-bg-secondary via-bg-primary to-bg-primary">
      {/* Decorative gradient blur */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-pink/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[45%] bg-brand-magenta/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Hero Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col justify-center text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-card-bg border border-border-primary px-4 py-1.5 rounded-full text-brand-pink text-xs font-semibold tracking-wider uppercase w-fit mb-6 shadow-sm shadow-black/10"
          >
            <Sparkles size={14} className="animate-pulse" />
            Where Creativity Meets Culture
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-[1.1] mb-6"
          >
            Nurturing <span className="bg-gradient-to-r from-brand-pink via-brand-coral to-brand-peach bg-clip-text text-transparent">Art, Culture</span> & Holistic Growth
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-text-secondary text-lg sm:text-xl font-light leading-relaxed mb-8 max-w-xl"
          >
            Welcome to KCFT – a vibrant cultural community where individuals of all ages come together to explore dance, yoga, theatre, and the transformative power of the arts.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4"
          >
            <a 
              href="#courses" 
              className="group bg-brand-pink text-white font-semibold px-8 py-3.5 rounded-full flex items-center gap-2 hover:bg-transparent hover:text-brand-pink border border-brand-pink transition-all duration-300 shadow-lg shadow-brand-pink/25"
            >
              Explore Courses
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#about" 
              className="text-text-primary font-semibold px-8 py-3.5 rounded-full border border-border-primary hover:border-border-hover hover:bg-card-hover transition-all duration-300"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>

        {/* Hero Image - Prominent KCFT Logo */}
        <motion.div 
          className="lg:col-span-5 relative flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {/* Main Image Container with Animated Pink Pulse Outline */}
          <motion.div 
            className="relative w-full max-w-[450px] aspect-square rounded-3xl overflow-hidden shadow-2xl p-2 bg-card-bg backdrop-blur-sm"
            style={{ borderStyle: 'solid', borderWidth: '3px' }}
            animate={{ 
              borderColor: ["rgba(242, 121, 143, 0.2)", "rgba(242, 121, 143, 1)", "rgba(242, 121, 143, 0.2)"],
              boxShadow: [
                "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0px rgba(242, 121, 143, 0)",
                "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 25px 5px rgba(242, 121, 143, 0.6)",
                "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0px rgba(242, 121, 143, 0)"
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <img 
              src="/assets/logo.png" 
              alt="KCFT Logo" 
              className="w-full h-full object-cover rounded-2xl" 
            />
          </motion.div>

          {/* Stat Overlay 1 (Top Left) */}
          <motion.div 
            className="absolute -top-6 -left-6 bg-bg-secondary/90 backdrop-blur-md border border-border-primary px-5 py-3 rounded-2xl shadow-xl flex flex-col pointer-events-none"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-2xl font-bold font-display text-text-primary">15+</span>
            <span className="text-xs text-text-muted font-light">Years of Legacy</span>
          </motion.div>

          {/* Stat Overlay 2 (Bottom Right) */}
          <motion.div 
            className="absolute -bottom-6 -right-6 bg-bg-secondary/90 backdrop-blur-md border border-border-primary px-5 py-3 rounded-2xl shadow-xl flex flex-col pointer-events-none"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <span className="text-2xl font-bold font-display text-text-primary">200+</span>
            <span className="text-xs text-text-muted font-light">Happy Students</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
