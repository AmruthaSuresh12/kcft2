import React from 'react';
import ScrollReveal from './ScrollReveal';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Courses({ onEnquireClick }) {
  const { t } = useLanguage();

  const coursesList = [
    {
      title: t.courses.yoga.title,
      image: '/assets/yoga-5.jpg',
      tag: t.courses.modeOnline,
      description: t.courses.yoga.desc,
      details: ['🧘 All Ages', '👥 Group & Personal', '🌐 Online Available'],
      actionText: t.courses.enquireBtn,
      actionLink: '#contact',
      external: false
    },
    {
      title: t.courses.garbha.title,
      image: '/assets/prenatal-yoga.png',
      tag: 'Prenatal Care',
      description: t.courses.garbha.desc,
      details: ['🤰 Expectant Mothers', '💆 Stress Relief', '💪 Flexibility'],
      actionText: t.courses.enquireBtn,
      actionLink: '#contact',
      external: false
    },
    {
      title: t.courses.dance.title,
      image: '/assets/dance-performance.png',
      tag: 'Popular',
      description: t.courses.dance.desc,
      details: ['💃 Multiple Styles', '🎵 Kids & Adults', '🌐 Online Available'],
      actionText: t.courses.enquireBtn,
      actionLink: '#contact',
      external: false
    },
    {
      title: t.courses.shloka.title,
      image: '/assets/shloka-class.png',
      tag: 'For Kids',
      description: t.courses.shloka.desc,
      details: ['📿 Ancient Verses', '👧 Kids Only', '🙏 Spiritual Growth'],
      actionText: t.courses.enquireBtn,
      actionLink: '#contact',
      external: false
    },
    {
      title: t.courses.counselling.title,
      image: '/assets/counselling-keerthana.png',
      tag: 'Mental Wellness',
      description: t.courses.counselling.desc,
      details: ['🧠 Clinical Psychology', '💬 1-on-1 Sessions', '🌐 Online & Offline'],
      actionText: t.courses.enquireBtn,
      actionLink: 'https://www.talkitoutwithyl.com',
      external: true
    },
    {
      title: t.courses.theatre.title,
      image: '/assets/theatre-acting.jpg',
      tag: 'Since 2009',
      description: t.courses.theatre.desc,
      details: ['🎭 7+ Productions', '🌟 Young Talents', '🎬 Stage Craft'],
      actionText: t.courses.enquireBtn,
      actionLink: '#contact',
      external: false
    }
  ];

  return (
    <section id="courses" className="py-24 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal y={20}>
            <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">
              {t.courses.subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
              {t.courses.title}
            </h2>
            <p className="text-text-secondary font-light leading-relaxed">
              {t.courses.description}
            </p>
          </ScrollReveal>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesList.map((course, idx) => (
            <ScrollReveal key={course.title} y={30} delay={idx * 0.1}>
              <div className="h-full bg-card-bg border border-border-primary hover:border-brand-pink/30 rounded-3xl overflow-hidden text-left flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-brand-pink/5 hover:-translate-y-1">
                
                {/* Image & Tag */}
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-secondary">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover filter brightness-95 transition-transform duration-500 hover:scale-105" 
                  />
                  <span className="absolute top-4 left-4 bg-brand-pink/90 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {course.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-primary mb-3">
                      {course.title}
                    </h3>
                    <p className="text-text-secondary text-sm font-light leading-relaxed mb-6">
                      {course.description}
                    </p>
                  </div>

                  {/* Bullet points & Action CTA */}
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6 border-t border-border-primary pt-4">
                      {course.details.map((detail, dIdx) => (
                        <span 
                          key={dIdx} 
                          className="bg-bg-secondary text-text-muted text-xs font-medium px-2.5 py-1 rounded-lg border border-border-primary"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>

                    {course.external ? (
                      <a
                        href={course.actionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-brand-pink text-white text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-magenta transition-colors duration-200"
                      >
                        {course.actionText}
                        <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <button
                        onClick={() => onEnquireClick(course.title)}
                        className="w-full bg-card-bg border border-border-primary hover:border-brand-pink/40 hover:bg-brand-pink hover:text-white text-text-primary text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-200 cursor-pointer"
                      >
                        {course.actionText}
                      </button>
                    )}
                  </div>

                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
