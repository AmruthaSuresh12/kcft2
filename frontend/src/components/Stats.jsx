import React, { useEffect, useState, useRef } from 'react';
import { useInView, animate } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

function StatCounter({ to, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (val) => setCount(Math.floor(val)),
    });

    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold font-display text-text-primary tracking-tight">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useLanguage();

  const statsList = [
    { label: t.stats.stat2Label, to: 200, suffix: '+' },
    { label: t.stats.stat4Label, to: 50, suffix: '+' },
    { label: t.stats.stat3Label, to: 5, suffix: '+' },
    { label: t.stats.stat1Label, to: 15, suffix: '+' }
  ];

  return (
    <section id="stats" className="py-16 bg-bg-secondary border-y border-border-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/5 to-brand-magenta/5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsList.map((stat, idx) => (
            <ScrollReveal key={idx} y={20} delay={idx * 0.1}>
              <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-card-bg border border-border-primary shadow-md hover:border-border-hover transition-all duration-300">
                <StatCounter to={stat.to} suffix={stat.suffix} />
                <span className="text-text-muted text-xs sm:text-sm font-light mt-2 tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
