import React from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Contribution() {
  const { t, lang } = useLanguage();

  const impactCards = [
    { icon: '/assets/dance-logo.jpg', count: '30+', label: lang === 'kn' ? 'ನೃತ್ಯ ವಿದ್ಯಾರ್ಥಿಗಳು' : 'Dance Students' },
    { icon: '/assets/yoga-logo-new.jpg', count: '20+', label: lang === 'kn' ? 'ಯೋಗ ಸಾಧಕರು' : 'Yoga Members' },
    { icon: '/assets/mothers-logo.jpg', count: '20+', label: lang === 'kn' ? 'ಗರ್ಭಿಣಿಯರ ಸೇವೆಯ ಸಾರ್ಥಕತೆ' : 'Happy Mothers' },
    { icon: '📿', count: '30+', label: lang === 'kn' ? 'ಶ್ಲೋಕ ವಿದ್ಯಾರ್ಥಿಗಳು' : 'Shloka Children' }
  ];

  return (
    <section id="contribution" className="py-24 bg-bg-secondary border-y border-border-primary relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal y={20}>
            <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">
              {t.contribution.subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
              {t.contribution.title}
            </h2>
            <p className="text-text-secondary font-light leading-relaxed">
              {t.contribution.description}
            </p>
          </ScrollReveal>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Text Summary */}
          <div className="lg:col-span-7 text-left space-y-6 text-text-secondary font-light leading-relaxed">
            <ScrollReveal y={25} delay={0.1}>
              <h3 className="text-2xl font-display font-semibold text-text-primary mb-4">
                {lang === 'kn' ? 'ವರ್ಷಗಳ ಸಾರ್ಥಕ ಸೇವೆ ಮತ್ತು ಕಲಾ ಪೋಷಣೆ' : 'Years of Enriching Lives & Nurturing Talents'}
              </h3>
            </ScrollReveal>
            <ScrollReveal y={25} delay={0.2}>
              <p>{t.about.p1}</p>
            </ScrollReveal>
            <ScrollReveal y={25} delay={0.3}>
              <p>{t.about.p2}</p>
            </ScrollReveal>
          </div>

          {/* Right Column: Grid of Impact Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {impactCards.map((card, idx) => (
              <ScrollReveal key={idx} y={20} delay={0.2 + idx * 0.1}>
                <div className="group relative flex items-center gap-4 p-4 bg-card-bg border border-border-primary rounded-2xl hover:border-brand-pink/30 hover:shadow-lg transition-all duration-500 h-32 text-left">
                  {card.icon.startsWith('/') ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-brand-pink/15 shadow-sm shrink-0 bg-white flex items-center justify-center">
                      <img
                        src={card.icon}
                        alt={card.label}
                        className="w-full h-full object-cover scale-[1.3]"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-white/5 border border-border-primary flex items-center justify-center shrink-0">
                      <span className="text-2xl filter drop-shadow-md">{card.icon}</span>
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="text-2xl font-display font-bold text-text-primary tracking-tight group-hover:text-brand-pink transition-colors duration-300">
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
