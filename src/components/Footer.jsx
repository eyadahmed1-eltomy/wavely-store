// import { Facebook, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-white border-t border-surface-neutral-grey mt-16'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {/* Footer Top Section */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 border-b border-surface-neutral-grey'>
          {/* Links */}
          <div className='flex gap-8'>
            <Link to='/about' className='text-text-primary-charcoal font-medium hover:text-primary-blue transition-colors'>
              About
            </Link>
            <Link to='/contact' className='text-text-primary-charcoal font-medium hover:text-primary-blue transition-colors'>
              Support
            </Link>
            <Link to='#' className='text-text-primary-charcoal font-medium hover:text-primary-blue transition-colors'>
              Terms
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className='flex gap-4'>
            <a href='#' className='w-10 h-10 bg-surface-offwhite rounded-full flex items-center justify-center text-text-primary-charcoal hover:text-primary-blue hover:bg-primary-light hover:bg-opacity-20 transition-colors'>
              <Facebook size={20} />
            </a>
            <a href='#' className='w-10 h-10 bg-surface-offwhite rounded-full flex items-center justify-center text-text-primary-charcoal hover:text-primary-blue hover:bg-primary-light hover:bg-opacity-20 transition-colors'>
              <Twitter size={20} />
            </a>
            <a href='#' className='w-10 h-10 bg-surface-offwhite rounded-full flex items-center justify-center text-text-primary-charcoal hover:text-primary-blue hover:bg-primary-light hover:bg-opacity-20 transition-colors'>
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className='pt-8 text-center text-text-secondary-slate'>
          <p>&copy; 2024 Wavely. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
