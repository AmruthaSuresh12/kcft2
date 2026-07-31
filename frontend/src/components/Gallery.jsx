import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Images, Play, Loader2, ImageOff } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// ─── Domain Data ─────────────────────────────────────────────────────────────
// `photos` = fallback shown only if Cloudinary fetch fails.
// All live media is fetched from Cloudinary folder: kcft/<id>/
const domains = [
  {
    id: 'dance',
    cloudinaryFolder: 'Dance',        // exact Cloudinary folder name
    title: 'Dance',
    subtitle: 'Bharatanatyam & Folk',
    cover: '/assets/dance-performance.png',
    color: '#F2798F',
    fallbackPhotos: ['/assets/dance-performance.png'],
  },
  {
    id: 'yoga',
    cloudinaryFolder: 'Yoga',
    title: 'Yoga',
    subtitle: 'Mind, Body & Soul',
    cover: '/assets/yoga-1.jpg',
    color: '#F2A29B',
    fallbackPhotos: ['/assets/yoga-1.jpg', '/assets/yoga-2.jpg', '/assets/yoga-3.jpg', '/assets/yoga-4.jpg', '/assets/yoga-5.jpg'],
  },
  {
    id: 'theatre',
    cloudinaryFolder: 'Theatre',
    title: 'Theatre',
    subtitle: 'Young Talents on Stage',
    cover: '/assets/theatre-hq.jpg',
    color: '#F2A29B',
    fallbackPhotos: [
      '/assets/theatre-t3.jpg',
      '/assets/theatre-acting.jpg',
      '/assets/theatre-t4.jpg',
      '/assets/theatre-t2.jpg',
      '/assets/theatre-t1.jpg',
    ],
  },
  {
    id: 'garbha',
    cloudinaryFolder: 'Garbha Samskara',
    title: 'Garbha Samskara',
    subtitle: 'Nurturing Motherhood',
    cover: '/assets/prenatal-yoga.png',
    color: '#F29494',
    fallbackPhotos: ['/assets/prenatal-yoga.png', '/assets/garbha-1.png', '/assets/garbha-2.png'],
  },
  {
    id: 'shloka',
    cloudinaryFolder: 'Shloka Class',
    title: 'Shloka',
    subtitle: 'Ancient Wisdom for Kids',
    cover: '/assets/shloka-class.png',
    color: '#590524',
    fallbackPhotos: ['/assets/shloka-class.png'],
  },
];

// ─── Video Slide ──────────────────────────────────────────────────────────────
function VideoSlide({ src, isActive }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Pause when slide changes away
  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [isActive]);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#000' }}>
      <video
        ref={videoRef}
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isActive ? 'brightness(1)' : 'brightness(0.45)' }}
        controls={playing}
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />
      {/* Play overlay — shown when not playing and active */}
      {!playing && isActive && (
        <button
          onClick={handlePlay}
          style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.35)', border: 'none', cursor: 'pointer',
          }}
        >
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'rgba(242,121,143,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(242,121,143,0.6)',
          }}>
            <Play size={24} color="#fff" fill="#fff" />
          </div>
        </button>
      )}
      {/* Video badge */}
      <div style={{
        position: 'absolute', top: '8px', left: '8px',
        background: 'rgba(0,0,0,0.6)', borderRadius: '6px', padding: '3px 8px',
        fontSize: '10px', fontWeight: 700, color: '#fff', letterSpacing: '1px',
        display: 'flex', alignItems: 'center', gap: '4px',
      }}>
        <Play size={9} fill="#F2798F" color="#F2798F" /> VIDEO
      </div>
    </div>
  );
}

// ─── 3D Carousel inside the Popup ────────────────────────────────────────────
function Carousel3D({ media }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef(null);
  const count = media.length;
  const radius = 300;

  const next = useCallback(() => setCurrent((p) => (p + 1) % count), [count]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + count) % count), [count]);

  useEffect(() => {
    setCurrent(0); // reset when media changes
  }, [media]);

  useEffect(() => {
    if (hovered) return;
    timerRef.current = setInterval(next, 2800);
    return () => clearInterval(timerRef.current);
  }, [hovered, next]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: '380px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Stage */}
      <div style={{ width: '100%', height: '100%', position: 'relative', perspective: '1100px' }}>
        {/* Spinner */}
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: `rotateY(${-current * (360 / count)}deg)`,
          }}
        >
          {media.map((item, idx) => {
            const angle = (360 / count) * idx;
            const isActive = idx === current;
            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: '240px', height: '300px',
                  marginLeft: '-120px', marginTop: '-150px',
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                  transition: 'all 0.5s ease',
                }}
              >
                <div
                  style={{
                    width: '100%', height: '100%',
                    borderRadius: '16px', overflow: 'hidden',
                    border: isActive ? '2px solid #F2798F' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: isActive
                      ? '0 0 32px rgba(242,121,143,0.45), 0 16px 48px rgba(0,0,0,0.6)'
                      : '0 8px 30px rgba(0,0,0,0.5)',
                    transform: isActive ? 'scale(1.06)' : 'scale(0.9)',
                    transition: 'all 0.5s ease',
                  }}
                >
                  {item.type === 'video' ? (
                    <VideoSlide src={item.url} isActive={isActive} />
                  ) : (
                    <img
                      src={item.url}
                      alt={`Photo ${idx + 1}`}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: isActive ? 'brightness(1)' : 'brightness(0.5)',
                        transition: 'filter 0.5s ease',
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-2 z-20 w-9 h-9 rounded-full bg-brand-maroon/80 hover:bg-brand-pink text-white flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer border border-brand-pink/30"
        aria-label="Previous"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 z-20 w-9 h-9 rounded-full bg-brand-maroon/80 hover:bg-brand-pink text-white flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer border border-brand-pink/30"
        aria-label="Next"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
        {media.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            title={item.type === 'video' ? 'Video' : 'Photo'}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? 'bg-brand-pink w-5 h-2' : 'bg-white/20 w-2 h-2 hover:bg-brand-pink/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ domain, onOpen }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 14, y: dx * 14 });
    setSheen({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSheen({ x: 50, y: 50 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.04,1.04,1.04)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
        transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
        transformStyle: 'preserve-3d',
        borderRadius: '18px',
        height: '320px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.5), 0 0 30px ${domain.color}33` : '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Cover Image */}
      <img
        src={domain.cover}
        alt={domain.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: hovered ? 'brightness(0.5)' : 'brightness(0.72)', transition: 'filter 0.4s ease' }}
      />

      {/* Dark gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 55%, transparent 75%)' }} />

      {/* Mouse-follow sheen */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255,255,255,0.08) 0%, transparent 65%)`,
          borderRadius: '18px',
        }} />
      )}

      {/* Top color accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${domain.color}, ${domain.color}88)`,
        borderRadius: '18px 18px 0 0',
      }} />

      {/* Content */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px', transform: 'translateZ(20px)' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: domain.color, marginBottom: '4px' }}>
          {domain.subtitle}
        </span>
        <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '18px', lineHeight: 1.2, marginBottom: '14px', fontFamily: 'inherit' }}>
          {domain.title}
        </h3>

        <button
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
          style={{
            alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '11px', fontWeight: 600, color: '#fff',
            background: hovered ? domain.color : 'rgba(255,255,255,0.1)',
            border: `1px solid ${hovered ? domain.color : 'rgba(255,255,255,0.2)'}`,
            padding: '7px 16px', borderRadius: '99px', transition: 'all 0.3s ease',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            cursor: 'pointer',
          }}
        >
          <Images size={12} />
          View Gallery
        </button>
      </div>
    </div>
  );
}

// ─── "Coming Soon" Empty State ────────────────────────────────────────────────
function EmptyState({ color }) {
  return (
    <div style={{
      height: '340px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '16px',
    }}>
      <div style={{
        width: '72px', height: '72px', borderRadius: '50%',
        background: `${color}18`, border: `1px dashed ${color}55`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ImageOff size={28} color={color} opacity={0.7} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>Photos Coming Soon 📸</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', lineHeight: 1.6 }}>
          Our team is preparing beautiful moments.<br />Check back soon!
        </p>
      </div>
    </div>
  );
}

// ─── Main Gallery Component ───────────────────────────────────────────────────
export default function Gallery() {
  const [openDomain, setOpenDomain] = useState(null);
  const [media, setMedia] = useState([]);        // media for currently open domain
  const [loadState, setLoadState] = useState('idle'); // 'idle' | 'loading' | 'done' | 'error'

  // Fetch from Cloudinary via Netlify function whenever a domain popup opens
  useEffect(() => {
    if (!openDomain) return;

    setMedia([]);
    setLoadState('loading');

    fetch(`/api/gallery-media?category=${encodeURIComponent(openDomain.cloudinaryFolder)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.media.length > 0) {
          setMedia(data.media);
        } else {
          // Nothing uploaded yet — show coming soon (empty state)
          setMedia([]);
        }
        setLoadState('done');
      })
      .catch(() => {
        // On network error — fall back to local placeholder photos
        setMedia(openDomain.fallbackPhotos.map(url => ({ url, type: 'image' })));
        setLoadState('error');
      });
  }, [openDomain]);

  return (
    <section id="gallery" className="py-24 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal y={20}>
            <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">
              Visual Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
              Our Gallery
            </h2>
            <p className="text-text-secondary font-light leading-relaxed">
              Explore moments from our vibrant cultural domains — click any card to dive in.
            </p>
          </ScrollReveal>
        </div>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {domains.map((domain, idx) => (
            <ScrollReveal key={domain.id} y={30} delay={idx * 0.1}>
              <TiltCard domain={domain} onOpen={() => setOpenDomain(domain)} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ── Premium Popup / Modal ── */}
      <AnimatePresence>
        {openDomain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(5,5,5,0.88)' }}
            onClick={() => setOpenDomain(null)}
          >
            {/* Blurred backdrop blob */}
            <div style={{
              position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
              width: '600px', height: '300px', borderRadius: '50%',
              background: openDomain.color, opacity: 0.07, filter: 'blur(90px)', pointerEvents: 'none',
            }} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              style={{
                width: '100%', maxWidth: '700px',
                background: 'rgba(18,12,14,0.82)',
                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '28px',
                border: `1px solid ${openDomain.color}33`,
                boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${openDomain.color}22, inset 0 1px 0 rgba(255,255,255,0.06)`,
                overflow: 'hidden', position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cinematic header */}
              <div style={{ position: 'relative', height: '110px', overflow: 'hidden' }}>
                <img
                  src={openDomain.cover} alt={openDomain.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${openDomain.color}55 0%, transparent 60%, rgba(0,0,0,0.6) 100%)` }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50px', background: 'linear-gradient(to top, rgba(18,12,14,0.82), transparent)' }} />

                <div style={{ position: 'absolute', bottom: '14px', left: '24px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', color: openDomain.color, display: 'block', marginBottom: '2px' }}>
                    {openDomain.subtitle}
                  </span>
                  <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '22px', margin: 0, lineHeight: 1.1 }}>
                    {openDomain.title}<span style={{ color: openDomain.color }}> Gallery</span>
                  </h3>
                </div>

                <button
                  onClick={() => setOpenDomain(null)}
                  style={{
                    position: 'absolute', top: '14px', right: '14px',
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = openDomain.color}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body — loading / empty / carousel */}
              <div style={{ padding: '8px 16px 16px', minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {loadState === 'loading' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <Loader2 size={32} color={openDomain.color} style={{ animation: 'spin 1s linear infinite' }} />
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Loading gallery…</p>
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                  </div>
                )}

                {loadState === 'done' && media.length === 0 && (
                  <EmptyState color={openDomain.color} />
                )}

                {(loadState === 'done' || loadState === 'error') && media.length > 0 && (
                  <div style={{ width: '100%' }}>
                    <Carousel3D media={media} />
                  </div>
                )}
              </div>

              {/* Footer */}
              {media.length > 0 && (
                <div style={{ padding: '12px 24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {media.map((item, i) => (
                    <div key={i} style={{
                      width: item.type === 'video' ? '10px' : '6px',
                      height: '6px', borderRadius: item.type === 'video' ? '3px' : '50%',
                      background: openDomain.color, opacity: 0.4 + i * 0.1,
                    }} />
                  ))}
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginLeft: '6px' }}>
                    {media.filter(m => m.type === 'image').length} photos
                    {media.filter(m => m.type === 'video').length > 0 && `, ${media.filter(m => m.type === 'video').length} video${media.filter(m => m.type === 'video').length > 1 ? 's' : ''}`}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
