import React, { useState } from 'react';
import { Phone, Mail, Globe, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you for reaching out! We will get in touch with you soon.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again later.'
        });
      }
    } catch (err) {
      console.error('Contact Form Submit Error:', err);
      setStatus({
        type: 'error',
        message: 'Could not connect to the server. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-bg-secondary border-t border-border-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal y={20}>
            <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">
              {t.contact.subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
              {t.contact.title}
            </h2>
            <p className="text-text-secondary font-light leading-relaxed">
              {t.contact.description}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <ScrollReveal y={25} delay={0.1}>
              <div className="bg-card-bg border border-border-primary rounded-3xl p-8 sm:p-10 shadow-lg mb-8">
                <h3 className="text-2xl font-display font-bold text-text-primary mb-6">
                  {t.contact.title}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-pink/10 rounded-2xl text-brand-pink shrink-0">
                      <Globe size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">Address</span>
                      <p className="text-text-primary font-medium text-sm sm:text-base mt-0.5">{t.contact.infoAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-pink/10 rounded-2xl text-brand-pink shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">Phone</span>
                      <a href="tel:+919448326038" className="text-text-primary font-medium text-sm sm:text-base mt-0.5 hover:text-brand-pink transition-colors block">
                        {t.contact.infoPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-pink/10 rounded-2xl text-brand-pink shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">Email</span>
                      <a href="mailto:kcft.tumakuru@gmail.com" className="text-text-primary font-medium text-sm sm:text-base mt-0.5 hover:text-brand-pink transition-colors block">
                        {t.contact.infoEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <ScrollReveal y={25} delay={0.2}>
              <div className="bg-card-bg border border-border-primary rounded-3xl p-8 sm:p-10 shadow-lg">
                
                {status.type && (
                  <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
                    status.type === 'success' 
                      ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                      : 'bg-red-500/10 text-red-600 border border-red-500/20'
                  }`}>
                    {status.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                    <span>{status.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                        {t.contact.labelName} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-input-bg border border-border-primary focus:border-brand-pink rounded-xl px-4 py-3 text-sm text-text-primary outline-none transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                        {t.contact.labelEmail} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-input-bg border border-border-primary focus:border-brand-pink rounded-xl px-4 py-3 text-sm text-text-primary outline-none transition-colors"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      {t.contact.labelSubject}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-input-bg border border-border-primary focus:border-brand-pink rounded-xl px-4 py-3 text-sm text-text-primary outline-none transition-colors"
                      placeholder="Inquiry subject"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      {t.contact.labelMessage} *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-input-bg border border-border-primary focus:border-brand-pink rounded-xl px-4 py-3 text-sm text-text-primary outline-none transition-colors resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-pink hover:bg-brand-magenta text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-brand-pink/25 cursor-pointer disabled:opacity-50"
                  >
                    <Send size={18} />
                    <span>{isSubmitting ? t.contact.btnSending : t.contact.btnSubmit}</span>
                  </button>
                </form>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
