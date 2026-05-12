import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import gsap from 'gsap';

const Login = () => {
  const [loginpage, setLoginpage] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Animate the card on mount
    gsap.fromTo(
      '.login-card',
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    // Animate form elements
    gsap.fromTo(
      '.form-input',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
    );
  }, [loginpage]);

  const handleTabSwitch = (isLogin) => {
    // Animate tab content change
    gsap.fromTo(
      '.form-container',
      { opacity: 1, x: 0 },
      { 
        opacity: 0, 
        x: isLogin ? -30 : 30, 
        duration: 0.3, 
        ease: 'power2.in',
        onComplete: () => setLoginpage(isLogin)
      }
    );

    setTimeout(() => {
      gsap.fromTo(
        '.form-container',
        { opacity: 0, x: isLogin ? 30 : -30 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
      );
    }, 300);
  };

  return (
    <div className='relative min-h-screen bg-linear-to-br from-primary-blue/5 via-surface-offwhite to-primary-light/5 overflow-hidden flex items-center justify-center p-4'>
      {/* Animated Background Gradient Circles */}
      <div className='absolute -top-40 -right-40 w-80 h-80 bg-primary-blue/10 rounded-full blur-3xl animate-pulse'></div>
      <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-primary-light/10 rounded-full blur-3xl animate-pulse'></div>

      {/* Decorative Wavy Background */}
      <div className='absolute inset-0 opacity-10 pointer-events-none'>
        <svg className='w-full h-full' viewBox='0 0 1440 800' preserveAspectRatio='none'>
          <defs>
            <pattern id='waves' x='0' y='0' width='120' height='120' patternUnits='userSpaceOnUse'>
              <path d='M0,60 Q30,30 60,60 T120,60' stroke='#4489E3' strokeWidth='1' fill='none' />
              <path d='M0,70 Q30,40 60,70 T120,70' stroke='#4489E3' strokeWidth='1' fill='none' />
              <path d='M0,80 Q30,50 60,80 T120,80' stroke='#4489E3' strokeWidth='1' fill='none' />
            </pattern>
          </defs>
          <rect width='1440' height='800' fill='url(#waves)' />
        </svg>
      </div>

      {/* Main Card Container */}
      <div className='login-card relative z-10 bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md'>
        
        {/* Wavely Logo */}
        <div className='flex justify-center mb-10'>
          <img src='/colored_text_logo.png' alt='Wavely' className='h-12 hover:scale-110 transition-transform duration-300' />
        </div>

        {/* Tab Buttons */}
        <div className='flex gap-4 md:gap-8 mb-10 border-b-2 border-surface-neutral-grey justify-center relative'>
          <button
            type='button'
            onClick={() => handleTabSwitch(true)}
            className={`pb-4 font-bold text-lg transition-all relative whitespace-nowrap ${
              loginpage
                ? 'text-primary-blue'
                : 'text-text-tertiary-muted hover:text-text-secondary-slate'
            }`}
          >
            Client Login
            {loginpage && (
              <div className='absolute bottom-0 left-0 right-0 h-1.5 bg-primary-blue rounded-t'></div>
            )}
          </button>
          <button
            type='button'
            onClick={() => handleTabSwitch(false)}
            className={`pb-4 font-bold text-lg transition-all relative whitespace-nowrap ${
              !loginpage
                ? 'text-primary-blue'
                : 'text-text-tertiary-muted hover:text-text-secondary-slate'
            }`}
          >
            Create Account
            {!loginpage && (
              <div className='absolute bottom-0 left-0 right-0 h-1.5 bg-primary-blue rounded-t'></div>
            )}
          </button>
        </div>

        {/* Form Content */}
        <form className='form-container flex flex-col gap-6'>
          {loginpage ? (
            <>
              {/* Login Form */}
              {/* Email Input */}
              <div className='form-input relative'>
                <label className='block text-sm font-semibold text-text-primary-charcoal mb-2'>Email Address</label>
                <div className='absolute left-4 top-12 text-text-secondary-slate'>
                  <Mail size={20} />
                </div>
                <input
                  required
                  type='email'
                  placeholder='Enter your email'
                  className='w-full pl-12 pr-4 py-3 bg-surface-offwhite border-2 border-surface-neutral-grey rounded-xl focus:outline-none focus:border-primary-blue focus:shadow-lg focus:shadow-primary-blue/30 placeholder-text-tertiary-muted transition-all duration-300 smooth-hover'
                />
              </div>

              {/* Password Input */}
              <div className='form-input relative'>
                <label className='block text-sm font-semibold text-text-primary-charcoal mb-2'>Password</label>
                <div className='absolute left-4 top-12 text-text-secondary-slate'>
                  <Lock size={20} />
                </div>
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  className='w-full pl-12 pr-12 py-3 bg-surface-offwhite border-2 border-surface-neutral-grey rounded-xl focus:outline-none focus:border-primary-blue focus:shadow-lg focus:shadow-primary-blue/30 placeholder-text-tertiary-muted transition-all duration-300 smooth-hover'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-12 text-text-secondary-slate hover:text-primary-blue transition-colors duration-300'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className='form-input text-right'>
                <a href='#' className='text-primary-blue text-sm font-medium hover:text-primary-light transition-colors duration-300'>
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type='submit'
                className='form-input w-full py-3.5 bg-primary-blue text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary-blue/40 hover:scale-105 transition-all duration-300 smooth-hover text-lg'
              >
                Login to Wavely
              </button>

              {/* Sign Up Link */}
              <div className='form-input text-center text-text-secondary-slate'>
                New to Wavely?{' '}
                <button 
                  type='button'
                  onClick={() => handleTabSwitch(false)}
                  className='text-primary-blue font-bold hover:text-primary-light transition-colors duration-300'
                >
                  Sign Up as a New Client
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Register Form */}
              {/* Name Input */}
              <div className='form-input'>
                <label className='block text-sm font-semibold text-text-primary-charcoal mb-2'>Full Name</label>
                <input
                  type='text'
                  placeholder='Enter your full name'
                  required
                  className='w-full px-4 py-3 bg-surface-offwhite border-2 border-surface-neutral-grey rounded-xl focus:outline-none focus:border-primary-blue focus:shadow-lg focus:shadow-primary-blue/30 placeholder-text-tertiary-muted transition-all duration-300 smooth-hover'
                />
              </div>

              {/* Email Input */}
              <div className='form-input relative'>
                <label className='block text-sm font-semibold text-text-primary-charcoal mb-2'>Email Address</label>
                <div className='absolute left-4 top-12 text-text-secondary-slate'>
                  <Mail size={20} />
                </div>
                <input
                  type='email'
                  placeholder='Enter your email'
                  required
                  className='w-full pl-12 pr-4 py-3 bg-surface-offwhite border-2 border-surface-neutral-grey rounded-xl focus:outline-none focus:border-primary-blue focus:shadow-lg focus:shadow-primary-blue/30 placeholder-text-tertiary-muted transition-all duration-300 smooth-hover'
                />
              </div>

              {/* Password Input */}
              <div className='form-input relative'>
                <label className='block text-sm font-semibold text-text-primary-charcoal mb-2'>Password</label>
                <div className='absolute left-4 top-12 text-text-secondary-slate'>
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder='Create a password'
                  className='w-full pl-12 pr-12 py-3 bg-surface-offwhite border-2 border-surface-neutral-grey rounded-xl focus:outline-none focus:border-primary-blue focus:shadow-lg focus:shadow-primary-blue/30 placeholder-text-tertiary-muted transition-all duration-300 smooth-hover'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-12 text-text-secondary-slate hover:text-primary-blue transition-colors duration-300'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Register Button */}
              <button
                type='submit'
                className='form-input w-full py-3.5 bg-primary-blue text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary-blue/40 hover:scale-105 transition-all duration-300 smooth-hover text-lg'
              >
                Create Account
              </button>

              {/* Login Link */}
              <div className='form-input text-center text-text-secondary-slate'>
                Already have an account?{' '}
                <button 
                  type='button'
                  onClick={() => handleTabSwitch(true)}
                  className='text-primary-blue font-bold hover:text-primary-light transition-colors duration-300'
                >
                  Login
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login;
