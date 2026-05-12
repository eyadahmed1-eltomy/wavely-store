import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Bookmark, RotateCcw } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import gsap from 'gsap';

const TAX_RATE = 0.07;

const Cart = () => {
  const { cart, savedForLater, removeFromCart, updateQuantity, saveForLater, moveToCart, cartSubtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const discount = promoApplied ? cartSubtotal * 0.1 : 0;
  const tax = (cartSubtotal - discount) * TAX_RATE;
  const total = cartSubtotal - discount + tax;

  useEffect(() => {
    gsap.fromTo('.cart-header', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' });
    gsap.fromTo('.cart-item', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.2, ease: 'power2.out' });
    gsap.fromTo('.cart-summary', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' });
  }, []);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'WAVELY10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try WAVELY10');
      setPromoApplied(false);
    }
  };

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className='min-h-screen bg-surface-offwhite fade-in'>
        <Navbar />
        <div className='max-w-4xl mx-auto px-6 py-24 flex flex-col items-center gap-6'>
          <div className='w-28 h-28 bg-primary-blue/10 rounded-full flex items-center justify-center'>
            <ShoppingBag size={52} className='text-primary-blue' />
          </div>
          <h2 className='text-3xl font-bold text-text-primary-charcoal'>Your cart is empty</h2>
          <p className='text-text-secondary-slate text-lg text-center max-w-md'>
            Browse our collection and find something you love!
          </p>
          <Link to='/' className='px-8 py-3.5 bg-primary-blue text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2'>
            <ShoppingBag size={20} /> Start Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-surface-offwhite fade-in' ref={containerRef}>
      <Navbar />
      <div className='cart-header bg-white shadow-md border-b-2 border-primary-blue/20'>
        <div className='max-w-6xl mx-auto px-6 py-6'>
          <h1 className='text-3xl font-bold text-text-primary-charcoal flex items-center gap-3'>
            <span className='w-1 h-8 bg-primary-blue rounded-full'></span>
            Shopping Cart
            <span className='text-lg font-normal text-text-secondary-slate ml-1'>({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
          </h1>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-10'>
        <div className='flex flex-col lg:flex-row gap-10'>

          {/* Left: Products */}
          <div className='flex-1 min-w-0'>
            {cart.length > 0 && (
              <div className='hidden md:grid grid-cols-12 gap-4 pb-3 border-b-2 border-surface-neutral-grey text-sm font-bold text-text-secondary-slate uppercase tracking-wide mb-2'>
                <div className='col-span-6'>Product</div>
                <div className='col-span-3 text-center'>Quantity</div>
                <div className='col-span-3 text-right'>Price</div>
              </div>
            )}

            <div className='space-y-4'>
              {cart.map((item) => (
                <div key={item._cartId} className='cart-item bg-white rounded-2xl shadow-md p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-2 border-transparent hover:border-primary-light transition-all duration-300'>
                  <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-primary-light/20 shrink-0'>
                    <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-bold text-text-primary-charcoal text-base sm:text-lg mb-1'>{item.name}</h3>
                    <p className='text-primary-blue font-bold text-lg mb-2'>${item.price.toFixed(2)}</p>
                    {item.colorNames && (
                      <p className='text-xs text-text-secondary-slate mb-2'>Color: <span className='font-semibold'>{item.colorNames[item.selectedColor] || item.colorNames[0]}</span></p>
                    )}
                    <div className='flex flex-wrap gap-3'>
                      <button onClick={() => saveForLater(item._cartId)} className='flex items-center gap-1 text-sm text-primary-blue hover:text-primary-blue/70 font-semibold transition-colors'>
                        <Bookmark size={14} /> Save for Later
                      </button>
                      <button onClick={() => removeFromCart(item._cartId)} className='flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-semibold transition-colors'>
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  <div className='flex items-center border-2 border-surface-neutral-grey rounded-full hover:border-primary-blue transition-colors shrink-0'>
                    <button onClick={() => updateQuantity(item._cartId, item.quantity - 1)} className='w-9 h-9 flex items-center justify-center text-xl font-bold hover:bg-primary-light/20 transition-colors rounded-l-full'>−</button>
                    <span className='w-10 text-center font-semibold'>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._cartId, item.quantity + 1)} className='w-9 h-9 flex items-center justify-center text-xl font-bold hover:bg-primary-light/20 transition-colors rounded-r-full'>+</button>
                  </div>
                  <div className='text-right shrink-0 min-w-[72px]'>
                    <p className='font-bold text-text-primary-charcoal text-lg'>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {savedForLater.length > 0 && (
              <div className='mt-10'>
                <h2 className='text-xl font-bold text-text-primary-charcoal mb-4 flex items-center gap-2'>
                  <Bookmark size={20} className='text-primary-blue' /> Saved for Later ({savedForLater.length})
                </h2>
                <div className='space-y-4'>
                  {savedForLater.map(item => (
                    <div key={item._cartId} className='bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 border-2 border-dashed border-surface-neutral-grey opacity-80 hover:opacity-100 hover:border-primary-light transition-all duration-300'>
                      <div className='w-16 h-16 rounded-xl overflow-hidden bg-primary-light/20 shrink-0'>
                        <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-bold text-text-primary-charcoal text-sm mb-1'>{item.name}</h3>
                        <p className='text-primary-blue font-bold'>${item.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => moveToCart(item._cartId)} className='flex items-center gap-1 text-sm px-4 py-2 bg-primary-blue/10 text-primary-blue rounded-full hover:bg-primary-blue hover:text-white font-semibold transition-all duration-300'>
                        <RotateCcw size={14} /> Move to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className='w-full lg:w-80 xl:w-96 shrink-0'>
            <div className='cart-summary bg-white rounded-2xl shadow-lg p-6 sticky top-24 border-2 border-surface-neutral-grey'>
              <h2 className='text-xl font-bold text-text-primary-charcoal mb-6 pb-4 border-b border-surface-neutral-grey'>Order Summary</h2>
              <div className='space-y-3 mb-6'>
                <div className='flex justify-between text-text-secondary-slate'>
                  <span>Subtotal</span>
                  <span className='font-semibold text-text-primary-charcoal'>${cartSubtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className='flex justify-between text-status-success'>
                    <span>Promo (WAVELY10)</span>
                    <span className='font-semibold'>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className='flex justify-between text-text-secondary-slate'>
                  <span>Shipping Estimate</span>
                  <span className='font-semibold text-status-success'>Free</span>
                </div>
                <div className='flex justify-between text-text-secondary-slate'>
                  <span>Tax</span>
                  <span className='font-semibold text-text-primary-charcoal'>${tax.toFixed(2)}</span>
                </div>
                <div className='border-t-2 border-surface-neutral-grey pt-3 flex justify-between font-bold text-text-primary-charcoal text-lg'>
                  <span>Total:</span>
                  <span className='text-primary-blue'>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className='mb-6'>
                <p className='text-sm font-semibold text-text-secondary-slate mb-2'>Promo code:</p>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder='Promo code'
                    className='flex-1 px-3 py-2 bg-surface-offwhite border-2 border-surface-neutral-grey rounded-xl focus:outline-none focus:border-primary-blue text-sm transition-all'
                  />
                  <button onClick={handleApplyPromo} className='px-4 py-2 bg-primary-blue text-white font-bold rounded-xl hover:shadow-md hover:scale-105 transition-all duration-300 text-sm'>Apply</button>
                </div>
                {promoError && <p className='text-status-error text-xs mt-1'>{promoError}</p>}
                {promoApplied && <p className='text-status-success text-xs mt-1 font-semibold'>✓ 10% discount applied!</p>}
              </div>

              <button onClick={() => navigate('/checkout')} className='w-full py-3.5 bg-primary-blue text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary-blue/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-base'>
                Proceed to Checkout <ArrowRight size={18} />
              </button>
              <Link to='/' className='mt-3 w-full py-2.5 flex items-center justify-center text-primary-blue font-semibold hover:underline text-sm transition-colors'>
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
