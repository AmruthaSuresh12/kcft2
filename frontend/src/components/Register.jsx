import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, BookOpen, Send, X, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Register({ isModal = false, selectedCourse = '', onClose = null }) {
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
    type: null, // 'success' | 'error' | null
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

  // Set the selected course if passed via props
  useEffect(() => {
    if (selectedCourse) {
      setFormData(prev => ({ ...prev, course: selectedCourse }));
    }
  }, [selectedCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Allow only numbers, spaces, dashes, or parentheses
      const cleanVal = value.replace(/[^0-9\s()-]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleanVal }));
      
      // Validate phone number
      const digitsOnly = cleanVal.replace(/\D/g, '');
      if (digitsOnly.length === 0) {
        setPhoneError('Phone number is required');
      } else if (digitsOnly.length !== 10) {
        setPhoneError('Must be exactly 10 digits');
      } else if (!/^[6-9]\d{9}$/.test(digitsOnly)) {
        setPhoneError('Must be a valid 10-digit mobile number');
      } else {
        setPhoneError('');
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleWhatsAppRedirect = () => {
    const trustNumber = "919900247138"; // Trust WhatsApp number
    const cleanPhone = formData.phone.replace(/\D/g, '');
    const messageText = `Hi KCFT! I just submitted my registration form for the ${formData.course} program.

Details:
- Name: ${formData.name}
- Phone entered: ${cleanPhone}
- Preferred Mode: ${formData.mode}

Please share the batch details and schedule!`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappURL = `https://wa.me/${trustNumber}?text=${encodedText}`;
    window.open(whatsappURL, '_blank');
    
    // Close modal if in modal mode
    if (isModal && onClose) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final phone check
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length !== 10 || !/^[6-9]\d{9}$/.test(digitsOnly)) {
      setPhoneError('Please enter a valid 10-digit mobile number before registering');
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
          phone: digitsOnly // Send cleaned 10-digit number to server
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Registration submitted successfully!'
        });
        setShowWhatsAppPrompt(true);
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Registration failed. Please try again.'
        });
      }
    } catch (err) {
      console.error('Registration Error:', err);
      setStatus({
        type: 'error',
        message: 'Could not connect to the server. Please check your internet and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {/* Row: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs text-text-muted font-medium tracking-wide uppercase flex items-center gap-1.5">
            <User size={13} className="text-brand-pink" /> Full Name <span className="text-brand-pink">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name" 
            required
            className="bg-input-bg border border-border-primary rounded-xl px-4 py-3 text-text-primary text-sm placeholder-neutral-500 focus:outline-none focus:border-brand-pink focus:bg-card-hover transition-all duration-200"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs text-text-muted font-medium tracking-wide uppercase flex items-center gap-1.5">
            <Mail size={13} className="text-brand-pink" /> Email Address <span className="text-brand-pink">*</span>
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com" 
            required
            className="bg-input-bg border border-border-primary rounded-xl px-4 py-3 text-text-primary text-sm placeholder-neutral-500 focus:outline-none focus:border-brand-pink focus:bg-card-hover transition-all duration-200"
          />
        </div>
      </div>

      {/* Row: Phone & Age */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs text-text-muted font-medium tracking-wide uppercase flex items-center gap-1.5">
            <Phone size={13} className="text-brand-pink" /> Phone Number <span className="text-brand-pink">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-sm text-text-muted select-none">+91</span>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              placeholder="98765 43210" 
              required
              className={`w-full bg-input-bg border rounded-xl pl-12 pr-4 py-3 text-text-primary text-sm placeholder-neutral-500 focus:outline-none focus:bg-card-hover transition-all duration-200 ${
                phoneError ? 'border-rose-500/50 focus:border-rose-500' : 'border-border-primary focus:border-brand-pink'
              }`}
            />
          </div>
          {phoneError ? (
            <span className="text-xs text-rose-400 flex items-center gap-1 mt-0.5">
              <AlertTriangle size={11} /> {phoneError}
            </span>
          ) : (
            <span className="text-[10px] text-text-muted">Will be verified next. Double-check for typos.</span>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="age" className="text-xs text-text-muted font-medium tracking-wide uppercase flex items-center gap-1.5">
            <Calendar size={13} className="text-brand-pink" /> Age of Student
          </label>
          <input 
            type="number" 
            id="age" 
            name="age" 
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g., 8" 
            min="1"
            max="120"
            className="bg-input-bg border border-border-primary rounded-xl px-4 py-3 text-text-primary text-sm placeholder-neutral-500 focus:outline-none focus:border-brand-pink focus:bg-card-hover transition-all duration-200"
          />
        </div>
      </div>

      {/* Row: Course Selection & Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="course" className="text-xs text-text-muted font-medium tracking-wide uppercase flex items-center gap-1.5">
            <BookOpen size={13} className="text-brand-pink" /> Select Course <span className="text-brand-pink">*</span>
          </label>
          <select 
            id="course" 
            name="course" 
            value={formData.course}
            onChange={handleChange}
            required
            className="bg-input-bg border border-border-primary rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-brand-pink focus:bg-card-hover transition-all duration-200 cursor-pointer appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23F2798F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`, backgroundPosition: 'right 16px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
          >
            <option value="" disabled className="bg-bg-secondary text-neutral-500">Choose a program...</option>
            {courses.map(c => (
              <option key={c} value={c} className="bg-bg-secondary text-text-primary">{c}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="mode" className="text-xs text-text-muted font-medium tracking-wide uppercase flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-brand-pink" /> Preferred Mode <span className="text-brand-pink">*</span>
          </label>
          <select 
            id="mode" 
            name="mode" 
            value={formData.mode}
            onChange={handleChange}
            required
            className="bg-input-bg border border-border-primary rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-brand-pink focus:bg-card-hover transition-all duration-200 cursor-pointer appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23F2798F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`, backgroundPosition: 'right 16px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
          >
            <option value="" disabled className="bg-bg-secondary text-neutral-500">Choose mode...</option>
            <option value="Online" className="bg-bg-secondary text-text-primary">Online</option>
            <option value="Offline" className="bg-bg-secondary text-text-primary">Offline</option>
            <option value="Both" className="bg-bg-secondary text-text-primary">Both</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs text-text-muted font-medium tracking-wide uppercase">Any Message or Questions</label>
        <textarea 
          id="message" 
          name="message" 
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your goals, prior experience, or any questions you have..." 
          rows={3}
          className="bg-input-bg border border-border-primary rounded-xl px-4 py-3 text-text-primary text-sm placeholder-neutral-500 focus:outline-none focus:border-brand-pink focus:bg-card-hover transition-all duration-200 resize-none"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isSubmitting || !!phoneError}
        className="w-full bg-brand-pink hover:bg-transparent text-white hover:text-brand-pink font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 border border-brand-pink transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-brand-pink/20 cursor-pointer mt-2"
      >
        {isSubmitting ? 'Registering...' : 'Register Now'}
        <Send size={16} />
      </button>
    </form>
  );

  const successPrompt = (
    <div className="text-center py-6 space-y-6">
      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
        <CheckCircle size={32} />
      </div>
      <div>
        <h3 className="text-2xl font-display font-bold text-text-primary mb-2">Registration Received!</h3>
        <p className="text-text-secondary font-light text-sm leading-relaxed max-w-sm mx-auto">
          We have emailed your details to our team. For instant slot confirmation and batch details, please message us directly on WhatsApp.
        </p>
      </div>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <button 
          onClick={handleWhatsAppRedirect}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all"
        >
          💬 Confirm via WhatsApp
        </button>
        <button 
          onClick={() => {
            setShowWhatsAppPrompt(false);
            setStatus({ type: null, message: '' });
            setFormData({ name: '', email: '', phone: '', age: '', course: selectedCourse || '', mode: '', message: '' });
            if (isModal && onClose) onClose();
          }}
          className="w-full bg-white/5 border border-border-primary hover:bg-white/10 text-text-secondary font-medium py-2.5 px-6 rounded-xl cursor-pointer transition-all text-sm"
        >
          Close / I will wait
        </button>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-bg-secondary border border-border-primary max-w-lg w-full rounded-3xl p-5 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
          
          {/* Close Button */}
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
                <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-1 block">Course Registration</span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-text-primary">Enquire about Program</h3>
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

  // Stand-alone homepage section
  return (
    <section id="register" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute top-[30%] left-[-15%] w-[400px] h-[400px] bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[300px] bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <ScrollReveal y={20}>
            <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">Join Us</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">Register for a Program</h2>
            <p className="text-text-secondary font-light leading-relaxed">
              Fill out the form below and we will get back to you with batch details and schedule.
            </p>
          </ScrollReveal>
        </div>

        {/* Form container */}
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
