import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className='bg-white shadow-lg sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6 lg:gap-8'>
        {/* Logo */}
        <Link to='/' className='shrink-0 hover:scale-105 transition-transform duration-300'>
          <img src='/colored_text_logo.png' alt='Wavely' className='h-10 lg:h-12' />
        </Link>

        {/* Search Bar - Responsive */}
        <div className='hidden md:block flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl'>
          <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
            <input
              type='text'
              placeholder='Search products...'
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full px-5 py-2.5 bg-surface-offwhite border-2 rounded-full focus:outline-none transition-all duration-300 ${
                searchFocused 
                  ? 'border-primary-blue shadow-lg shadow-primary-blue/30 bg-white' 
                  : 'border-transparent hover:border-primary-light'
              }`}
            />
            <button className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
              searchFocused ? 'text-primary-blue' : 'text-text-secondary-slate hover:text-primary-blue'
            }`}>
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Links - Hidden on mobile */}
        <div className='hidden md:flex items-center gap-6 lg:gap-8'>
          <Link 
            to='/orders' 
            className='text-text-primary-charcoal font-medium text-sm lg:text-base hover:text-primary-blue transition-colors duration-300 relative group'
          >
            My Orders
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover:w-full'></span>
          </Link>

          {/* Account Icon */}
          <Link to='/account' className='text-text-primary-charcoal hover:text-primary-blue transition-colors duration-300 hover:scale-110 transform'>
            <User size={24} />
          </Link>

          {/* Cart Icon */}
          <div className='relative group'>
            <Link to='/cart' className='relative block text-text-primary-charcoal hover:text-primary-blue transition-colors duration-300 hover:scale-110 transform'>
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-primary-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse'>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Icons */}
        <div className='md:hidden flex items-center gap-4'>
          <Link to='/cart' className='relative block text-text-primary-charcoal hover:text-primary-blue transition-colors'>
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-primary-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>
                {cartCount}
              </span>
            )}
          </Link>
          <button 
            className='text-text-primary-charcoal hover:text-primary-blue transition-colors'
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className='fixed inset-0 z-[60] bg-black/50 md:hidden' onClick={() => setMobileMenuOpen(false)}>
          <div 
            className='absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl p-6 flex flex-col gap-6 slide-in-right'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-4'>
              <span className='font-bold text-lg'>Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className='p-2 hover:bg-gray-100 rounded-full'>
                <X size={24} />
              </button>
            </div>
            
            <div className='relative'>
              <input
                type='text'
                placeholder='Search products...'
                className='w-full px-4 py-2 bg-surface-offwhite border-2 border-surface-neutral-grey rounded-full focus:outline-none focus:border-primary-blue'
              />
            </div>

            <nav className='flex flex-col gap-4'>
              <Link to='/orders' onClick={() => setMobileMenuOpen(false)} className='font-medium text-lg text-text-primary-charcoal hover:text-primary-blue py-2 border-b border-gray-100'>
                My Orders
              </Link>
              <Link to='/account' onClick={() => setMobileMenuOpen(false)} className='font-medium text-lg text-text-primary-charcoal hover:text-primary-blue py-2 border-b border-gray-100 flex items-center gap-2'>
                <User size={20} /> Account
              </Link>
            </nav>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar