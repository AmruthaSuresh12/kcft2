import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Contribution() {
  const impactCards = [
    { icon: '/assets/dance-logo.jpg', count: '30+', label: 'Dance Students' },
    { icon: '/assets/yoga-logo-new.jpg', count: '20+', label: 'Yoga Members' },
    { icon: '/assets/mothers-logo.jpg', count: '20+', label: 'Happy Mothers' },
    { icon: '📿', count: '30', label: 'Shloka Children' }
  ];

  return (
    <section id="contribution" className="py-24 bg-bg-secondary border-y border-border-primary relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal y={20}>
            <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">Our Impact</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">Our Contribution</h2>
            <p className="text-text-secondary font-light leading-relaxed">
              Making a meaningful impact through arts, culture, and holistic well-being.
            </p>
          </ScrollReveal>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Text Summary */}
          <div className="lg:col-span-7 text-left space-y-6 text-text-secondary font-light leading-relaxed">
            <ScrollReveal y={25} delay={0.1}>
              <h3 className="text-2xl font-display font-semibold text-text-primary mb-4">
                Years of Enriching Lives & Nurturing Talents
              </h3>
            </ScrollReveal>
            <ScrollReveal y={25} delay={0.2}>
              <p>
                For the past four years, our online dance classes have delighted both children and adults, offering personalised one-on-one sessions and group classes that have earned accolades from over 20-30 satisfied clients.
              </p>
            </ScrollReveal>
            <ScrollReveal y={25} delay={0.3}>
              <p>
                Our yoga classes, available both online and offline, have seen nearly 20 members benefitting from traditional practices promoting holistic well-being. Proudly serving expectant mothers for two years, our Garbha Samskara classes have garnered praise from almost 20 happy clients.
              </p>
            </ScrollReveal>
            <ScrollReveal y={25} delay={0.4}>
              <p>
                Our Shloka classes engage 30 enthusiastic children in learning ancient verses and hymns, fostering spiritual and cultural enrichment. Our theatre summer camp, established since 2009, has curated seven impactful dramas including recent hits like "Aggi Kathe," "Nakal
                Rajakumari," and "Nidra Nagari, offering a platform for young talents to shine.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Grid of Impact Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {impactCards.map((card, idx) => (
              <ScrollReveal key={card.label} y={20} delay={0.2 + idx * 0.1}>
                <div className="group relative flex items-center gap-5 p-5 bg-card-bg border border-border-primary rounded-2xl hover:border-brand-pink/30 hover:shadow-lg transition-all duration-500 h-32 text-left">
                  {/* Logo Image (Solid and zoomed to crop white margin) */}
                  {card.icon.startsWith('/') ? (
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-brand-pink/15 shadow-sm shrink-0 bg-white flex items-center justify-center">
                      <img
                        src={card.icon}
                        alt={card.label}
                        className="w-full h-full object-cover scale-[1.3]"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-20 h-20 rounded-xl bg-white/5 border border-border-primary flex items-center justify-center shrink-0"
                    >
                      <span className="text-3xl filter drop-shadow-md">{card.icon}</span>
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="flex flex-col">
                    <span className="text-3xl font-display font-bold text-text-primary tracking-tight group-hover:text-brand-pink transition-colors duration-300">
                      {card.count}
                    </span>
                    <span className="text-text-secondary text-xs font-semibold mt-1 tracking-wide group-hover:text-text-primary transition-colors duration-300">
                      {card.label}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
