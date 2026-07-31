import React from 'react';
import ScrollReveal from './ScrollReveal';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const features = [
    'Online & Offline',
    'All Age Groups',
    'Personalised Sessions',
    'Certified Trainers'
  ];

  return (
    <section id="about" className="py-24 bg-bg-primary border-t border-border-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Side - Image */}
          <div className="lg:col-span-5">
            <ScrollReveal y={30} duration={0.8}>
              <motion.div
                className="relative rounded-3xl p-2 bg-card-bg shadow-2xl"
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
                  ease: "easeInOut",
                  delay: 0.7 // Stagger slightly from the Hero image animation
                }}
              >
                <img
                  src="/assets/dance-performance.png"
                  alt="KCFT Dance Performance"
                  className="w-full h-auto object-cover rounded-2xl filter brightness-95"
                />
                {/* Decorative background shape */}
                <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-brand-pink/20 rounded-full blur-2xl pointer-events-none" />
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Right Side - Content */}
          <div className="lg:col-span-7 text-left flex flex-col justify-center">
            <ScrollReveal y={25} delay={0.1}>
              <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-6">About KCFT</h2>
            </ScrollReveal>

            <ScrollReveal y={25} delay={0.2}>
              <p className="text-xl font-light text-brand-coral/90 italic border-l-2 border-brand-pink pl-4 py-1 mb-6 leading-relaxed">
                "Where creativity and culture converge to inspire, educate, and celebrate the arts."
              </p>
            </ScrollReveal>

            <ScrollReveal y={25} delay={0.3}>
              <div className="space-y-4 text-text-secondary text-base font-light leading-relaxed mb-8">
                <p>
                  At KCFT, we are dedicated to fostering a vibrant cultural community where individuals of all ages and backgrounds can come together to explore the realms of dance, yoga, Garbha Samskara, tabla, and theatre.
                </p>
                <p>
                  Our foundation is rooted in a deep passion for the arts and a commitment to preserving and promoting our cultural heritage. We offer a wide range of programs and initiatives designed to ignite your creative spirit and nurture your artistic talents.
                </p>
              </div>
            </ScrollReveal>

            {/* Checkmark Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <ScrollReveal key={feature} y={15} delay={0.4 + idx * 0.08}>
                  <div className="flex items-center gap-3 bg-card-bg border border-border-primary px-4 py-3 rounded-xl hover:bg-card-hover transition-colors duration-200">
                    <CheckCircle2 size={18} className="text-brand-pink shrink-0" />
                    <span className="text-sm font-medium text-text-primary">{feature}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
