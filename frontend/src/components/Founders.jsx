import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { X } from 'lucide-react';

export default function Founders() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeName, setActiveName] = useState('');
  const foundersList = [
    {
      name: 'Yelanadu Ramaiah Lakshmisha ',
      initial: 'Y',
      image: '/assets/lakshmish.jpg', // Place file in public/assets/lakshmish.jpg
      role: 'Founder President',
      description: "Yelanadu Ramaiah Lakshmisha is the Founder President of Keerthana Creative Foundation Trust and a seasoned agri-business professional with over 25 years of experience in agricultural supply chains, contract farming, procurement, and agribusiness management. His work has taken him across Europe, the United States, Russia, Germany, Sri Lanka, Thailand, Vietnam, Malaysia, Benin, and several other countries. A passionate supporter of arts and culture, he has been actively involved in theatre since his college days and represented his institution at a National-Level Drama Competition. He is a Past President of JCI Tumkur Metro Chapter, currently serves as Secretary of the Agri Committee of the Indian Gherkin Exporters Association (IGEA), and is dedicated to promoting culture, education, wellness, and community service through Keerthana Creative Foundation Trust.",
      slideDir: 30
    },
    {
      name: 'Nagarathna K.J',
      initial: 'N',
      image: '/assets/nagarathna.jpg', // Place file in public/assets/nagarathna.jpg
      role: 'Secretary & Yoga Instructor',
      description: "A dedicated yoga practitioner and teacher specialising in traditional yoga, prenatal yoga, and Garbha Samskara. She promotes holistic well-being through ancient practices and has helped many expectant mothers achieve healthy and positive birth experiences.",
      slideDir: 30
    },
    {
      name: 'Keerthana Y.L',
      initial: 'K',
      image: '/assets/keerthana.png', // Pointing to the uploaded PNG image
      role: 'Trustee , Dance Instructor & Counsellor',
      description: "A seasoned psychologist with a Master’s degree in Clinical Psychology and certified training in psychotherapy and counselling. Alongside her work in mental wellness, she is a television actress and serial artist with a passion for the performing arts. She also leads dance classes across multiple styles, blending creativity with compassionate mental health support.",
      slideDir: 30
    },
  ];

  return (
    <section id="founders" className="py-24 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal y={20}>
            <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">Our Leadership</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">Meet the Founders</h2>
            <p className="text-text-secondary font-light leading-relaxed">
              The passionate individuals behind KCFT's mission and vision.
            </p>
          </ScrollReveal>
        </div>

        {/* Founders Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {foundersList.map((founder, idx) => {
            // If it is the third item, make it span 2 columns on tablet md size, and center it
            const gridClass = idx === 2
              ? "md:col-span-2 md:max-w-[450px] md:mx-auto lg:col-span-1 lg:max-w-none w-full"
              : "w-full";

            return (
              <ScrollReveal
                key={founder.name}
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
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-all p-2 rounded-full hover:bg-white/10 cursor-pointer"
            onClick={() => setActivePhoto(null)}
          >
            <X size={28} />
          </button>

          {/* Zoom Card */}
          <div
            className="relative max-w-sm sm:max-w-md w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10 p-2 bg-neutral-900/40 flex items-center justify-center animate-in zoom-in-95 duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()} // Prevent close on clicking the image itself
          >
            <img
              src={activePhoto}
              alt={activeName}
              className="w-full h-full object-cover rounded-2xl"
            />
            {/* Title Caption overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2.5 rounded-2xl text-left border border-white/5">
              <h4 className="font-display font-semibold text-white text-base">{activeName}</h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
