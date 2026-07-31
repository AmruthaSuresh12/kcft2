import React, { useState } from 'react';
import { Phone, Mail, Globe, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    type: null, // 'success' | 'error' | null
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
    <section id="contact" className="py-24 bg-bg-secondary border-t border-border-primary relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal y={20}>
            <span className="text-brand-pink text-xs font-semibold tracking-widest uppercase mb-3 block">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">Contact Us</h2>
            <p className="text-text-secondary font-light leading-relaxed">
              Get in touch to learn more about our programs or to enrol.
            </p>
          </ScrollReveal>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Contact Details (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-start text-left space-y-8">

            {/* Phone numbers */}
            <ScrollReveal y={20} delay={0.1}>
              <div className="flex items-start gap-4">
                <div className="bg-card-bg border border-border-primary p-3 rounded-2xl text-brand-pink shadow-md">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold font-display mb-2">Phone</h4>
                  <div className="space-y-1.5 text-text-secondary text-sm font-light">
                    <p><a href="tel:9900247138" className="hover:text-brand-pink transition-colors">9900247138</a></p>
                    <p><a href="tel:9900250138" className="hover:text-brand-pink transition-colors">9900250138</a></p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Email Address */}
            <ScrollReveal y={20} delay={0.2}>
              <div className="flex items-start gap-4">
                <div className="bg-card-bg border border-border-primary p-3 rounded-2xl text-brand-pink shadow-md">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold font-display mb-2">Email</h4>
                  <p className="text-text-secondary text-sm font-light">
                    <a href="mailto:Kcft.tumakuru@gmail.com" className="hover:text-brand-pink transition-colors">
                      Kcft.tumakuru@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Counselling link */}
            <ScrollReveal y={20} delay={0.3}>
              <div className="flex items-start gap-4">
                <div className="bg-card-bg border border-border-primary p-3 rounded-2xl text-brand-pink shadow-md">
                  <Globe size={22} />
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold font-display mb-2">Counselling Appointments</h4>
                  <p className="text-text-secondary text-sm font-light">
                    <a
                      href="https://www.talkitoutwithyl.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-pink transition-colors underline decoration-brand-pink/50 underline-offset-4"
                    >
                      www.talkitoutwithyl.com
                    </a>
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Form (Right) */}
          <div className="lg:col-span-7">
            <ScrollReveal y={30} delay={0.15}>
              <div className="bg-card-bg border border-border-primary rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">

                {status.type && (
                  <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 border ${status.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-300'
                    }`}>
                    {status.type === 'success'
                      ? <CheckCircle size={20} className="shrink-0 mt-0.5" />
                      : <AlertTriangle size={20} className="shrink-0 mt-0.5" />}
                    <span className="text-sm font-light leading-relaxed">{status.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  {/* Row for Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs text-text-muted font-medium tracking-wide uppercase">Your Name</label>
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
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs text-text-muted font-medium tracking-wide uppercase">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="bg-input-bg border border-border-primary rounded-xl px-4 py-3 text-text-primary text-sm placeholder-neutral-500 focus:outline-none focus:border-brand-pink focus:bg-card-hover transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-xs text-text-muted font-medium tracking-wide uppercase">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="bg-input-bg border border-border-primary rounded-xl px-4 py-3 text-text-primary text-sm placeholder-neutral-500 focus:outline-none focus:border-brand-pink focus:bg-card-hover transition-all duration-200"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs text-text-muted font-medium tracking-wide uppercase">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your interest..."
                      required
                      rows={5}
                      className="bg-input-bg border border-border-primary rounded-xl px-4 py-3 text-text-primary text-sm placeholder-neutral-500 focus:outline-none focus:border-brand-pink focus:bg-card-hover transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-pink hover:bg-transparent text-white hover:text-brand-pink font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 border border-brand-pink transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-brand-pink/20 cursor-pointer"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    <Send size={16} />
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
