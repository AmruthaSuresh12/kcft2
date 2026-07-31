import React from 'react';
import ScrollReveal from './ScrollReveal';
import { ArrowUpRight } from 'lucide-react';

export default function Courses({ onEnquireClick }) {
  const coursesList = [
    {
      title: 'Specialised Yoga Class',
      image: '/assets/yoga-5.jpg',
      tag: 'Online & Offline',
      description: 'Nurture your mind, body, and soul with comprehensive yoga classes. Join group sessions or opt for personalised instruction suitable for all ages.',
      details: ['🧘 All Ages', '👥 Group & Personal', '🌐 Online Available'],
      actionText: 'Enquire Now',
      actionLink: '#contact',
      external: false
    },
    {
      title: 'Garbha Samskara',
      image: '/assets/prenatal-yoga.png',
      tag: 'Prenatal Care',
      description: 'Gentle yoga practices specifically designed for pregnant women to promote physical health, relaxation, and preparation for childbirth.',
      details: ['🤰 Expectant Mothers', '💆 Stress Relief', '💪 Flexibility'],
      actionText: 'Enquire Now',
      actionLink: '#contact',
      external: false
    },
    {
      title: 'Personalised Dance Class',
      image: '/assets/dance-performance.png',
      tag: 'Popular',
      description: 'Experience the joy of movement with diverse dance styles — Bollywood, semiclassical, hip-hop, waacking, and filmy. Tailored for kids and adults.',
      details: ['💃 Multiple Styles', '🎵 Kids & Adults', '🌐 Online Available'],
      actionText: 'Enquire Now',
      actionLink: '#contact',
      external: false
    },
    {
      title: 'Shloka Class',
      image: '/assets/shloka-class.png',
      tag: 'For Kids',
      description: 'Traditional Indian chanting and recitation classes focusing on teaching ancient verses, hymns, and spiritual texts. Available online and offline for kids.',
      details: ['📿 Ancient Verses', '👧 Kids Only', '🙏 Spiritual Growth'],
      actionText: 'Enquire Now',
      actionLink: '#contact',
      external: false
    },
    {
      title: 'Counselling Session',
      image: '/assets/counselling-keerthana.png',
      tag: 'Mental Wellness',
      description: 'Personalised one-on-one therapy sessions by Keerthana YL, M.A. Clinical Psychology. Dance therapy and counselling for individuals aged 12 to 40.',
      details: ['🧠 Clinical Psychology', '💬 1-on-1 Sessions', '🌐 Online & Offline'],
      actionText: 'Book Appointment',
      actionLink: 'https://www.talkitoutwithyl.com',
      external: true
    },
    {
      title: 'Theatre Summer Camp',
      image: '/assets/theatre-acting.jpg',
      tag: 'Since 2009',
      description: 'Our esteemed theatre camp has curated 7 impactful dramas including "Aggi Kathe," "Nakal Rajakumari," and "Nidra Nagari." A platform for young talents to shine!',
      details: ['🎭 7+ Productions', '🌟 Young Talents', '🎬 Stage Craft'],
      actionText: 'Enquire Now',
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
            <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">Our Programs</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">What We Offer</h2>
            <p className="text-text-secondary font-light leading-relaxed">
              A diverse range of artistic and cultural experiences for people of all ages and backgrounds.
            </p>
          </ScrollReveal>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesList.map((course, idx) => (
            <ScrollReveal key={course.title} y={30} delay={(idx % 3) * 0.1}>
              <div className="group h-full flex flex-col bg-card-bg border border-border-primary hover:border-brand-pink/30 hover:shadow-xl hover:shadow-brand-pink/[0.02] rounded-3xl overflow-hidden transition-all duration-300">
                
                {/* Course Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 left-4 bg-brand-pink text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {course.tag}
                  </span>
                </div>

                {/* Course Body */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="text-xl font-display font-semibold text-text-primary mb-3 group-hover:text-brand-pink transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm font-light leading-relaxed mb-6 flex-grow">
                    {course.description}
                  </p>

                  {/* Details Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.details.map((detail) => (
                      <span 
                        key={detail} 
                        className="text-xs text-text-primary bg-input-bg border border-border-primary px-2.5 py-1 rounded-lg"
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
                      className="w-full text-center bg-input-bg hover:bg-brand-pink text-text-primary hover:text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 border border-border-primary hover:border-brand-pink transition-all duration-300 cursor-pointer"
                    >
                      {course.actionText}
                      <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <button 
                      onClick={() => onEnquireClick && onEnquireClick(course.title)}
                      className="w-full text-center bg-input-bg hover:bg-brand-pink text-text-primary hover:text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 border border-border-primary hover:border-brand-pink transition-all duration-300 cursor-pointer"
                    >
                      {course.actionText}
                      <ArrowUpRight size={16} />
                    </button>
                  )}
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
