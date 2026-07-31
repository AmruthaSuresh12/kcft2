import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);

  const testimonialsList = [
    {
      text: "I am glad to share my experience of dance classes. I am thankful to Keerthana ma'am for taking wonderful classes with relaxation techniques. It helped me a lot to improve my mental health and physical activity. Thank you for making me confident.",
      author: "Dance Student",
      program: "Dance Classes"
    },
    {
      text: "I have attended prenatal yoga classes, these yoga classes have helped me a lot for normal delivery. The yoga teacher is very friendly and accommodative. Theory classes were also very informative. Forever thankful to Nagarathna madam.",
      author: "Happy Mother",
      program: "Yoga & Garbha Samskara"
    },
    {
      text: "Keerthana is an amazing person. She teaches according to your style and makes you feel so comfortable. She is flexible with time, even a non-dancer enjoys the lesson. She puts a personal touch which allows the participant to give more effort.",
      author: "Adult Learner",
      program: "Personalised Dance Class"
    },
    {
      text: "I am Shweth N, based out in UK. I enrolled for the KCFT dance class in mid 2023 and still continuing. Keerthana ma'am has been very instrumental and supportive throughout my dancing journey. My husband and close friends appreciate my dancing skills which I have learnt from KCFT. I highly recommend KCFT!",
      author: "Shweth N",
      program: "Dance Student, UK"
    },
    {
      text: "These Garbha Samskara classes help in child growth and brain development during pregnancy. After birth, my boy was very active and his response was good. The gentle exercises and focus on breathing contributed to a positive mindset.",
      author: "Happy Parent",
      program: "Garbha Samskara"
    }
  ];

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setActiveIndex((prevIndex) =>
          prevIndex === testimonialsList.length - 1 ? 0 : prevIndex + 1
        ),
      6000
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-bg-secondary border-y border-border-primary relative overflow-hidden">
      <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] bg-brand-pink/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <ScrollReveal y={20}>
            <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">Kind Words</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">What Our Students Say</h2>
            <p className="text-text-secondary font-light max-w-xl mx-auto">
              Hear from the people whose lives have been enriched through KCFT.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials Slider */}
        <ScrollReveal y={35} delay={0.15}>
          <div className="relative bg-card-bg border border-border-primary rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-sm">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-brand-pink/10">
              <Quote size={80} strokeWidth={1} />
            </div>

            {/* Slider window */}
            <div className="overflow-hidden relative min-h-[160px] sm:min-h-[140px] flex items-center">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${activeIndex * 100}%)`, width: `${testimonialsList.length * 100}%` }}
              >
                {testimonialsList.map((item, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 text-left px-2 select-none">
                    {/* Stars */}
                    <div className="text-brand-coral text-sm mb-4">★★★★★</div>
                    
                    {/* Text */}
                    <p className="text-text-primary text-base sm:text-lg font-light leading-relaxed mb-6">
                      "{item.text}"
                    </p>

                    {/* Author details */}
                    <div>
                      <h4 className="text-text-primary font-semibold font-display">{item.author}</h4>
                      <span className="text-xs text-brand-pink font-light tracking-wide uppercase">{item.program}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between mt-8 border-t border-border-primary pt-6">
              
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {testimonialsList.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeIndex ? 'bg-brand-pink w-6' : 'bg-border-primary hover:bg-border-hover'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-3">
                <button 
                  onClick={handlePrev}
                  className="bg-input-bg hover:bg-brand-pink text-text-primary hover:text-white border border-border-primary hover:border-brand-pink p-2.5 rounded-full transition-all duration-300 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={16} />
                </button>
                <button 
                  onClick={handleNext}
                  className="bg-input-bg hover:bg-brand-pink text-text-primary hover:text-white border border-border-primary hover:border-brand-pink p-2.5 rounded-full transition-all duration-300 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
