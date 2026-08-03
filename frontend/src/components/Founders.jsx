import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Founders() {
  const { t, lang } = useLanguage();
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeName, setActiveName] = useState('');

  const foundersList = [
    {
      name: lang === 'kn' ? 'ಎಲಚಗೆರೆ ರಾಮಯ್ಯ ಲಕ್ಷ್ಮೀಶ' : 'Yelanadu Ramaiah Lakshmisha',
      initial: 'Y',
      image: '/assets/lakshmish.jpg',
      role: lang === 'kn' ? 'ಸಂಸ್ಥಾಪಕ ಅಧ್ಯಕ್ಷರು' : 'Founder President',
      description: lang === 'kn' 
        ? "ಎಲಚಗೆರೆ ರಾಮಯ್ಯ ಲಕ್ಷ್ಮೀಶ ಅವರು ಕೀರ್ತನಾ ಕ್ರಿಯೇಟಿವ್ ಫೌಂಡೇಶನ್ ಟ್ರಸ್ಟ್‌ನ ಸಂಸ್ಥಾಪಕ ಅಧ್ಯಕ್ಷರಾಗಿದ್ದು, ಕೃಷಿ ಉದ್ಯಮ, ಗುತ್ತಿಗೆ ಕೃಷಿ ಮತ್ತು ಪೂರೈಕೆ ಸರಪಳಿ ನಿರ್ವಹಣೆಯಲ್ಲಿ 25 ಕ್ಕೂ ಹೆಚ್ಚು ವರ್ಷಗಳ ಅನುಭವ ಹೊಂದಿದ್ದಾರೆ. ಕಲೆ, ಸಂಸ್ಕೃತಿ ಹಾಗೂ ರಂಗಭೂಮಿ ಕ್ಷೇತ್ರದಲ್ಲಿ ಅಪಾರ ಆಸಕ್ತಿ ಹೊಂದಿದ್ದು, ಕಾಲೇಜು ದಿನಗಳಿಂದಲೂ ರಾಷ್ಟ್ರಮಟ್ಟದ ನಾಟಕ ಸ್ಪರ್ಧೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿದ್ದಾರೆ. ಕೃಷಿ, ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ ಮತ್ತು ಸಮಾಜ ಸೇವೆಯನ್ನು ಪೋಷಿಸುವಲ್ಲಿ KCFT ಮೂಲಕ ನಿರತರಾಗಿದ್ದಾರೆ."
        : "Yelanadu Ramaiah Lakshmisha is the Founder President of Keerthana Creative Foundation Trust and a seasoned agri-business professional with over 25 years of experience. A passionate supporter of arts and culture, he has been actively involved in theatre since his college days and represented his institution at a National-Level Drama Competition. He is dedicated to promoting culture, education, wellness, and community service through KCFT.",
      slideDir: 30
    },
    {
      name: lang === 'kn' ? 'ನಾಗರತ್ನ ಕೆ.ಜೆ' : 'Nagarathna K.J',
      initial: 'N',
      image: '/assets/nagarathna.jpg',
      role: lang === 'kn' ? 'ಕಾರ್ಯದರ್ಶಿ ಮತ್ತು ಯೋಗ ಮಾರ್ಗದರ್ಶಕರು' : 'Secretary & Yoga Instructor',
      description: lang === 'kn'
        ? "ಸಾಂಪ್ರದಾಯಿಕ ಯೋಗ, ಪ್ರಸವಪೂರ್ವ ಯೋಗ ಮತ್ತು ಗರ್ಭ ಸಂಸ್ಕಾರ ಕ್ಷೇತ್ರದಲ್ಲಿ ನುರಿತ ಯೋಗ ಶಿಕ್ಷಕರು. ಗರ್ಭಿಣಿಯರಿಗೆ ದೈಹಿಕ ಮತ್ತು ಮಾನಸಿಕ ಕ್ಷೇಮವನ್ನು ನೀಡುವ ಮೂಲಕ ಅನೇಕ ತಾಯಂದಿರಿಗೆ ಸುಲಭ ಹಾಗೂ ಸಕಾರಾತ್ಮಕ ಪ್ರಸವ ಅನುಭವವನ್ನು ನೀಡಲು ಶ್ರಮಿಸುತ್ತಿದ್ದಾರೆ."
        : "A dedicated yoga practitioner and teacher specialising in traditional yoga, prenatal yoga, and Garbha Samskara. She promotes holistic well-being through ancient practices and has helped many expectant mothers achieve healthy and positive birth experiences.",
      slideDir: 30
    },
    {
      name: lang === 'kn' ? 'ಕೀರ್ತನಾ ವೈ.ಎಲ್' : 'Keerthana Y.L',
      initial: 'K',
      image: '/assets/keerthana.png',
      role: lang === 'kn' ? 'ಧರ್ಮದರ್ಶಿಗಳು, ನೃತ್ಯ ಮಾರ್ಗದರ್ಶಕರು ಮತ್ತು ಆಪ್ತಸಮಾಲೋಚಕರು' : 'Trustee, Dance Instructor & Counsellor',
      description: lang === 'kn'
        ? "ಕ್ಲಿನಿಕಲ್ ಮನೋವಿಜ್ಞಾನದಲ್ಲಿ ಸ್ನಾತಕೋತ್ತರ ಪದವಿ (M.A. Clinical Psychology) ಪಡೆದಿರುವ ಕೀರ್ತನಾ ವೈ.ಎಲ್ ಅವರು ನುರಿತ ಮನೋವಿಜ್ಞಾನಿ ಮತ್ತು ಅಭಿನೇತ್ರಿಯಾಗಿದ್ದಾರೆ. ನೃತ್ಯ ಶಿಕ್ಷಕಿಯಾಗಿ ವಿವಿಧ ಶೈಲಿಯ ನೃತ್ಯ ತರಬೇತಿ ನೀಡುತ್ತಾ, ಮಾನಸಿಕ ಆರೋಗ್ಯ ಮತ್ತು ಕಲಾತ್ಮಕ ಸೃಜನಶೀಲತೆಯನ್ನು ಒಟ್ಟಿಗೆ ಪೋಷಿಸುತ್ತಿದ್ದಾರೆ."
        : "A seasoned psychologist with a Master’s degree in Clinical Psychology and certified training in psychotherapy and counselling. Alongside her work in mental wellness, she is a television actress and serial artist with a passion for the performing arts. She leads dance classes and blends creativity with mental health support.",
      slideDir: 30
    },
  ];

  return (
    <section id="founders" className="py-24 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal y={20}>
            <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">
              {t.founders.subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
              {t.founders.title}
            </h2>
            <p className="text-text-secondary font-light leading-relaxed">
              {t.founders.description}
            </p>
          </ScrollReveal>
        </div>

        {/* Founders Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {foundersList.map((founder, idx) => {
            const gridClass = idx === 2
              ? "md:col-span-2 md:max-w-[450px] md:mx-auto lg:col-span-1 lg:max-w-none w-full"
              : "w-full";

            return (
              <ScrollReveal
                key={idx}
                y={25}
                delay={idx * 0.15}
                className={gridClass}
              >
                <div className="h-full bg-card-bg border border-border-primary hover:border-brand-pink/20 rounded-3xl p-8 sm:p-10 text-left flex flex-col items-start transition-all duration-300">

                  {/* Photo Avatar with Initial Fallback */}
                  <div
                    onClick={() => {
                      if (founder.image) {
                        setActivePhoto(founder.image);
                        setActiveName(founder.name);
                      }
                    }}
                    className={`relative w-18 h-18 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-pink to-brand-magenta text-white font-display font-bold text-2xl flex items-center justify-center shadow-lg shadow-brand-pink/15 mb-6 border border-border-primary shrink-0 transition-all duration-300 ${founder.image ? 'cursor-zoom-in hover:scale-105 hover:shadow-brand-pink/30 hover:border-brand-pink/40' : ''
                      }`}
                  >
                    {founder.image && (
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallbackSpan = e.target.nextSibling;
                          if (fallbackSpan) fallbackSpan.style.display = 'flex';
                        }}
                      />
                    )}
                    <span
                      className="font-display font-bold text-2xl text-white uppercase"
                      style={{ display: founder.image ? 'none' : 'flex' }}
                    >
                      {founder.initial}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
                    {founder.name}
                  </h3>

                  <span className="text-xs text-brand-coral font-medium tracking-wide uppercase mb-6 block">
                    {founder.role}
                  </span>

                  <p className="text-text-secondary text-sm sm:text-base font-light leading-relaxed">
                    {founder.description}
                  </p>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>

      {/* Lightbox / DP Modal Popup */}
      {activePhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-all p-2 rounded-full hover:bg-white/10 cursor-pointer"
            onClick={() => setActivePhoto(null)}
          >
            <X size={28} />
          </button>

          <div
            className="relative max-w-sm sm:max-w-md w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10 p-2 bg-neutral-900/40 flex items-center justify-center animate-in zoom-in-95 duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto}
              alt={activeName}
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2.5 rounded-2xl text-left border border-white/5">
              <h4 className="font-display font-semibold text-white text-base">{activeName}</h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
