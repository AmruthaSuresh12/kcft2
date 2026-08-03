import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, BookOpen, Send, X, CheckCircle, AlertTriangle, ShieldCheck, CreditCard, MessageSquare } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Register({ isModal = false, selectedCourse = '', onClose = null }) {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    course: '',
    mode: '',
    message: ''
  });

  const [status, setStatus] = useState({
    type: null,
    message: ''
  });

  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(false);

  const courses = [
    'Specialised Yoga Class',
    'Garbha Samskara',
    'Personalised Dance Class',
    'Shloka Class',
    'Counselling Session',
    'Theatre Summer Camp'
  ];

  useEffect(() => {
    if (selectedCourse) {
      setFormData(prev => ({ ...prev, course: selectedCourse }));
    }
  }, [selectedCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const cleanVal = value.replace(/[^0-9\s()-]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleanVal }));
      
      const digitsOnly = cleanVal.replace(/\D/g, '');
      if (digitsOnly.length === 0) {
        setPhoneError(lang === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ' : 'Phone number is required');
      } else if (digitsOnly.length !== 10) {
        setPhoneError(lang === 'kn' ? '10 ಅಂಕೆಗಳಿರಬೇಕು' : 'Must be exactly 10 digits');
      } else if (!/^[6-9]\d{9}$/.test(digitsOnly)) {
        setPhoneError(lang === 'kn' ? 'ಸಾಮಾನ್ಯ 10 ಅಂಕೆಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ' : 'Must be a valid 10-digit mobile number');
      } else {
        setPhoneError('');
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleWhatsAppRedirect = () => {
    const trustNumber = "919448326038";
    const cleanPhone = formData.phone.replace(/\D/g, '');
    
    const messageText = lang === 'kn' 
      ? `🙏 ನಮಸ್ಕಾರ KCFT ತಂಡಕ್ಕೆ,

ನಾನು ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಕೋರ್ಸ್ ನೋಂದಣಿಯನ್ನು ಸಲ್ಲಿಸಿದ್ದೇನೆ:

👤 ಹೆಸರು: ${formData.name}
📱 ಫೋನ್: ${cleanPhone}
📧 ಇಮೇಲ್: ${formData.email || 'ಲಭ್ಯವಿಲ್ಲ'}
🎓 ಆಯ್ಕೆಮಾಡಿದ ಕೋರ್ಸ್: ${formData.course}
📍 ಮೋಡ್: ${formData.mode || 'ಲಭ್ಯವಿಲ್ಲ'}

💳 ಕೋರ್ಸ್ ಶುಲ್ಕದ UPI / ಬ್ಯಾಂಕ್ ಪಾವತಿ ವಿವರಗಳು ಮತ್ತು ಬ್ಯಾಚ್ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಕಳುಹಿಸಿಕೊಡಿ. ಧನ್ಯವಾದಗಳು.`
      : `🙏 Namaste KCFT Team,

I have submitted my course registration on the website:

👤 Name: ${formData.name}
📱 Phone: ${cleanPhone}
📧 Email: ${formData.email || 'N/A'}
🎓 Course: ${formData.course}
📍 Mode: ${formData.mode || 'N/A'}

💳 Kindly share the UPI / Bank Payment details and batch schedule to complete my enrollment! Thank you.`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappURL = `https://wa.me/${trustNumber}?text=${encodedText}`;
    window.open(whatsappURL, '_blank');
    
    if (isModal && onClose) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length !== 10 || !/^[6-9]\d{9}$/.test(digitsOnly)) {
      setPhoneError(lang === 'kn' ? 'ಸಾಮಾನ್ಯ 10 ಅಂಕೆಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ' : 'Please enter a valid 10-digit mobile number before registering');
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          phone: digitsOnly
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: lang === 'kn' ? 'ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ!' : 'Registration submitted successfully!'
        });
        setShowWhatsAppPrompt(true);
      } else {
        setStatus({
          type: 'error',
          message: data.message || (lang === 'kn' ? 'ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ ವಿಫಲವಾಗಿದೆ.' : 'Registration failed. Please try again.')
        });
      }
    } catch (err) {
      console.error('Registration Error:', err);
      setStatus({
        type: 'error',
        message: lang === 'kn' ? 'ಸರ್ವರ್ ಸಂಪರ್ಕ ಸಾಧಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ.' : 'Could not connect to the server. Please check your internet and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {/* Row: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            {lang === 'kn' ? 'ಪೂರ್ಣ ಹೆಸರು *' : 'Full Name *'}
          </label>
          <div className="relative">
            <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-input-bg border border-border-primary focus:border-brand-pink rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary outline-none transition-colors"
              placeholder={lang === 'kn' ? 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು' : 'e.g. Ananya Sharma'}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            {lang === 'kn' ? 'ಇಮೇಲ್ ವಿಳಾಸ *' : 'Email Address *'}
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-input-bg border border-border-primary focus:border-brand-pink rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary outline-none transition-colors"
              placeholder="name@example.com"
            />
          </div>
        </div>
      </div>

      {/* Row: Phone & Age */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            {lang === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (10 ಅಂಕೆಗಳು) *' : 'Phone Number (10 digits) *'}
          </label>
          <div className="relative">
            <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="tel"
              name="phone"
              required
              maxLength={14}
              value={formData.phone}
              onChange={handleChange}
              className={`w-full bg-input-bg border rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary outline-none transition-colors ${
                phoneError ? 'border-rose-500 focus:border-rose-500' : 'border-border-primary focus:border-brand-pink'
              }`}
              placeholder="9876543210"
            />
          </div>
          {phoneError && (
            <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
              <AlertTriangle size={13} className="shrink-0" />
              <span>{phoneError}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            {lang === 'kn' ? 'ವಯಸ್ಸು' : 'Age of Student'}
          </label>
          <div className="relative">
            <Calendar size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="number"
              name="age"
              min="3"
              max="99"
              value={formData.age}
              onChange={handleChange}
              className="w-full bg-input-bg border border-border-primary focus:border-brand-pink rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary outline-none transition-colors"
              placeholder="e.g. 12"
            />
          </div>
        </div>
      </div>

      {/* Row: Course Selection & Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            {lang === 'kn' ? 'ತರಬೇತಿ ಕೋರ್ಸ್ *' : 'Select Program *'}
          </label>
          <div className="relative">
            <BookOpen size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <select
              name="course"
              required
              value={formData.course}
              onChange={handleChange}
              className="w-full bg-input-bg border border-border-primary focus:border-brand-pink rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled>{lang === 'kn' ? 'ಕೋರ್ಸ್ ಆಯ್ಕೆಮಾಡಿ' : 'Choose a program...'}</option>
              {courses.map(c => (
                <option key={c} value={c} className="bg-bg-primary text-text-primary">{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            {lang === 'kn' ? 'ಕಲಿಕೆಯ ಮೋಡ್ *' : 'Preferred Mode *'}
          </label>
          <select
            name="mode"
            required
            value={formData.mode}
            onChange={handleChange}
            className="w-full bg-input-bg border border-border-primary focus:border-brand-pink rounded-xl px-4 py-3 text-sm text-text-primary outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled>{lang === 'kn' ? 'ಮೋಡ್ ಆಯ್ಕೆಮಾಡಿ' : 'Choose mode...'}</option>
            <option value="Offline" className="bg-bg-primary text-text-primary">Offline (Tumakuru Studio)</option>
            <option value="Online" className="bg-bg-primary text-text-primary">Online (Live Interactive)</option>
          </select>
        </div>
      </div>

      {/* Additional Message */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
          {lang === 'kn' ? 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ / ಪ್ರಶ್ನೆಗಳು' : 'Questions or Specific Requirements'}
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-input-bg border border-border-primary focus:border-brand-pink rounded-xl px-4 py-3 text-sm text-text-primary outline-none transition-colors resize-none"
          placeholder={lang === 'kn' ? 'ನಿಮ್ಮ ಸಂದೇಶ ಇಲ್ಲಿದೆ...' : 'Any previous experience or preferred timings?'}
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isSubmitting || !!phoneError}
        className="w-full bg-brand-pink hover:bg-transparent text-white hover:text-brand-pink font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 border border-brand-pink transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-brand-pink/20 cursor-pointer mt-2"
      >
        {isSubmitting ? (lang === 'kn' ? 'ನೋಂದಾಯಿಸಲಾಗುತ್ತಿದೆ...' : 'Registering...') : (lang === 'kn' ? 'ನೋಂದಣಿ ಪೂರ್ಣಗೊಳಿಸಿ' : 'Register Now')}
        <Send size={16} />
      </button>
    </form>
  );

  const successPrompt = (
    <div className="text-center py-4 space-y-5">
      <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
        <CheckCircle size={30} />
      </div>

      <div>
        <h3 className="text-2xl font-display font-bold text-text-primary mb-1">
          {lang === 'kn' ? 'ನೋಂದಣಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ!' : 'Registration Received!'}
        </h3>
        <p className="text-text-secondary font-light text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
          {lang === 'kn' 
            ? 'ನಿಮ್ಮ ವಿವರಗಳನ್ನು ತಂಡಕ್ಕೆ ಕಳುಹಿಸಲಾಗಿದೆ. ತರಬೇತಿ ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ಪಾವತಿ ವಿವರಗಳಿಗೆ WhatsApp ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ.'
            : 'We have received your details. Request payment & batch details instantly on WhatsApp below.'}
        </p>
      </div>

      {/* Payment Details Guidance Card */}
      <div className="bg-card-bg/80 border border-emerald-500/30 p-4 rounded-2xl text-left text-xs space-y-2 shadow-inner">
        <div className="flex items-center gap-2 font-semibold text-emerald-400">
          <CreditCard size={16} />
          <span>{lang === 'kn' ? 'ಪಾವತಿ ವಿವರಗಳ ಜ್ಞಾಪನೆ' : 'Payment Details & Slot Confirmation'}</span>
        </div>
        <p className="text-text-secondary font-light leading-relaxed">
          {lang === 'kn'
            ? 'GPay, PhonePe, Paytm ಅಥವಾ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ ವಿವರಗಳನ್ನು WhatsApp ಚಾಟ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.'
            : 'Official UPI (GPay/PhonePe) & Bank details will be shared directly on WhatsApp upon verification.'}
        </p>
      </div>

      <div className="flex flex-col gap-2.5 max-w-xs mx-auto">
        <button 
          onClick={handleWhatsAppRedirect}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all text-sm"
        >
          <MessageSquare size={16} />
          <span>{lang === 'kn' ? 'WhatsApp ನಲ್ಲಿ ಪಾವತಿ ವಿವರ ಕೋರಿ' : 'Request Payment & Slot via WhatsApp'}</span>
        </button>
        
        <button 
          onClick={() => {
            setShowWhatsAppPrompt(false);
            setStatus({ type: null, message: '' });
            setFormData({ name: '', email: '', phone: '', age: '', course: selectedCourse || '', mode: '', message: '' });
            if (isModal && onClose) onClose();
          }}
          className="w-full bg-white/5 border border-border-primary hover:bg-white/10 text-text-secondary font-medium py-2 px-6 rounded-xl cursor-pointer transition-all text-xs"
        >
          {lang === 'kn' ? 'ಮುಚ್ಚಿ' : 'Close / I will wait'}
        </button>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-bg-secondary border border-border-primary max-w-lg w-full rounded-3xl p-5 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary p-1.5 rounded-full hover:bg-white/5 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {showWhatsAppPrompt ? (
            successPrompt
          ) : (
            <>
              <div className="mb-6 text-left">
                <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-1 block">
                  {lang === 'kn' ? 'ತರಬೇತಿ ನೋಂದಣಿ' : 'Course Registration'}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
                  {lang === 'kn' ? 'ತರಗತಿ ವಿಚಾರಣೆ & ನೋಂದಣಿ' : 'Enquire about Program'}
                </h3>
              </div>

              {status.type === 'error' && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-2 text-left">
                  <AlertTriangle size={18} className="shrink-0 mt-0.5 text-rose-400" />
                  <span>{status.message}</span>
                </div>
              )}

              {formFields}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <section id="register" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute top-[30%] left-[-15%] w-[400px] h-[400px] bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[300px] bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <ScrollReveal y={20}>
            <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">
              {lang === 'kn' ? 'ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ' : 'Join Us'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
              {lang === 'kn' ? 'ತರಬೇತಿ ಕೋರ್ಸ್‌ಗೆ ನೋಂದಾಯಿಸಿ' : 'Register for a Program'}
            </h2>
            <p className="text-text-secondary font-light leading-relaxed">
              {lang === 'kn' 
                ? 'ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ. ನಾವು ಬ್ಯಾಚ್ ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ಪಾವತಿ ಮಾಹಿತಿಯೊಂದಿಗೆ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.'
                : 'Fill out the form below and we will get back to you with batch details and schedule.'}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal y={30} delay={0.15}>
          <div className="bg-card-bg border border-border-primary rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
            {showWhatsAppPrompt ? (
              successPrompt
            ) : (
              <>
                {status.type === 'error' && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-2.5 text-left">
                    <AlertTriangle size={20} className="shrink-0 mt-0.5 text-rose-400" />
                    <span>{status.message}</span>
                  </div>
                )}
                {formFields}
              </>
            )}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
