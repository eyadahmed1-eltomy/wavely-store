import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import gsap from 'gsap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    gsap.fromTo(
      '.page-header',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.contact-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.2, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.form-container',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: 'power2.out' }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    gsap.fromTo(
      '.submit-btn',
      { scale: 1 },
      { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }
    );
  };

  return (
    <div className='min-h-screen bg-surface-offwhite fade-in'>
      <Navbar />

      {/* Page Header */}
      <div className='page-header bg-white shadow-md border-b-2 border-primary-blue/20'>
        <div className='max-w-6xl mx-auto px-6 py-8'>
          <h2 className='text-4xl font-bold text-text-primary-charcoal flex items-center gap-3'>
            <span className='w-1 h-10 bg-primary-blue rounded-full'></span>
            Contact Us
          </h2>
          <p className='text-text-secondary-slate mt-3 text-lg'>Get in touch with our support team</p>
        </div>
      </div>

      {/* Contact Content */}
      <div className='max-w-6xl mx-auto px-6 py-16'>
        {/* Contact Info Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {/* Email Card */}
          <div className='contact-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 smooth-hover'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-14 h-14 bg-primary-blue/10 rounded-full flex items-center justify-center'>
                <Mail size={28} className='text-primary-blue' />
              </div>
              <h3 className='text-2xl font-bold text-text-primary-charcoal'>Email</h3>
            </div>
            <p className='text-text-secondary-slate text-lg mb-2'>support@wavely.com</p>
            <p className='text-text-secondary-slate'>We'll respond within 24 hours</p>
          </div>

          {/* Phone Card */}
          <div className='contact-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 smooth-hover'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-14 h-14 bg-primary-blue/10 rounded-full flex items-center justify-center'>
                <Phone size={28} className='text-primary-blue' />
              </div>
              <h3 className='text-2xl font-bold text-text-primary-charcoal'>Phone</h3>
            </div>
            <p className='text-text-secondary-slate text-lg mb-2'>+1 (555) 123-4567</p>
            <p className='text-text-secondary-slate'>Mon-Fri 9AM-6PM EST</p>
          </div>

          {/* Address Card */}
          <div className='contact-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 smooth-hover'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-14 h-14 bg-primary-blue/10 rounded-full flex items-center justify-center'>
                <MapPin size={28} className='text-primary-blue' />
              </div>
              <h3 className='text-2xl font-bold text-text-primary-charcoal'>Address</h3>
            </div>
            <p className='text-text-secondary-slate text-lg mb-2'>123 Wave Street</p>
            <p className='text-text-secondary-slate'>San Francisco, CA 94105</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className='form-container bg-white rounded-2xl shadow-lg p-10 md:p-12'>
          <h3 className='text-3xl font-bold text-text-primary-charcoal mb-8'>Send us a Message</h3>
          
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Name Input */}
              <div>
                <label className='block text-lg font-semibold text-text-primary-charcoal mb-3'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your name'
                  className='w-full px-5 py-3 border-2 border-surface-neutral-grey rounded-xl focus:outline-none focus:border-primary-blue transition-colors'
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className='block text-lg font-semibold text-text-primary-charcoal mb-3'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Your email'
                  className='w-full px-5 py-3 border-2 border-surface-neutral-grey rounded-xl focus:outline-none focus:border-primary-blue transition-colors'
                  required
                />
              </div>
            </div>

            {/* Subject Input */}
            <div>
              <label className='block text-lg font-semibold text-text-primary-charcoal mb-3'>Subject</label>
              <input
                type='text'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                placeholder='Message subject'
                className='w-full px-5 py-3 border-2 border-surface-neutral-grey rounded-xl focus:outline-none focus:border-primary-blue transition-colors'
                required
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label className='block text-lg font-semibold text-text-primary-charcoal mb-3'>Message</label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                placeholder='Your message here...'
                rows='6'
                className='w-full px-5 py-3 border-2 border-surface-neutral-grey rounded-xl focus:outline-none focus:border-primary-blue transition-colors resize-none'
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='submit-btn w-full md:w-auto px-10 py-4 bg-primary-blue text-white font-bold rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300 smooth-hover text-lg'
            >
              <Send size={22} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact