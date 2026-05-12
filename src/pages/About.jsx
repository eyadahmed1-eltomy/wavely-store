import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import gsap from 'gsap';

const About = () => {
  useEffect(() => {
    gsap.fromTo(
      '.page-header',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.content-block',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, delay: 0.2, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className='min-h-screen bg-surface-offwhite fade-in'>
      <Navbar />

      {/* Page Header */}
      <div className='page-header bg-white shadow-md border-b-2 border-primary-blue/20'>
        <div className='max-w-6xl mx-auto px-6 py-8'>
          <h2 className='text-4xl font-bold text-text-primary-charcoal flex items-center gap-3'>
            <span className='w-1 h-10 bg-primary-blue rounded-full'></span>
            About Wavely
          </h2>
          <p className='text-text-secondary-slate mt-3 text-lg'>Learn about our mission and values</p>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-6xl mx-auto px-6 py-16'>
        <div className='content-block bg-white rounded-2xl shadow-lg p-10 mb-10'>
          <h3 className='text-3xl font-bold text-text-primary-charcoal mb-6'>Welcome to Wavely</h3>
          <p className='text-lg text-text-secondary-slate leading-relaxed'>
            Welcome to Wavely, your ultimate destination for premium dropshipped products and exceptional customer service.
            We are committed to bringing you the finest selection of products with seamless shopping experiences.
          </p>
        </div>

        <div className='content-block bg-white rounded-2xl shadow-lg p-10 mb-10'>
          <h3 className='text-3xl font-bold text-text-primary-charcoal mb-6'>Our Mission</h3>
          <p className='text-lg text-text-secondary-slate leading-relaxed'>
            We believe in connecting people through quality products and seamless shopping experiences.
            Our mission is to make premium products accessible to everyone through innovative e-commerce solutions
            and dedicated customer support.
          </p>
        </div>

        <div className='content-block bg-white rounded-2xl shadow-lg p-10'>
          <h3 className='text-3xl font-bold text-text-primary-charcoal mb-6'>Why Choose Wavely</h3>
          <ul className='space-y-4'>
            {[
              'Premium product selection carefully curated for quality',
              'Fast and reliable shipping with tracking',
              'Responsive 24/7 customer support',
              'Secure payment and data protection',
              'Modern, intuitive shopping interface'
            ].map((item, idx) => (
              <li key={idx} className='flex items-start gap-4 text-lg text-text-secondary-slate'>
                <span className='text-primary-blue font-bold text-2xl mt-0.5'>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
