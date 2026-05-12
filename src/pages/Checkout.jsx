import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, RefreshCcw, Headphones, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import gsap from 'gsap';

const COUNTRIES = ['United States','United Kingdom','Canada','Australia','Germany','France','Egypt','Saudi Arabia','UAE'];

const Checkout = () => {
  const { cart, cartSubtotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [step] = useState(2); // 1=Shipping, 2=Payment, 3=Confirmation
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [saveCard, setSaveCard] = useState(false);
  const [form, setForm] = useState({
    fullName:'', address1:'', address2:'', city:'', state:'', zip:'', country:'United States', phone:'', email:'',
    cardNumber:'', expiry:'', cvc:''
  });

  const shippingCost = deliveryMethod === 'standard' ? 0 : 10;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal + shippingCost + tax;

  useEffect(() => {
    gsap.fromTo('.checkout-form', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    gsap.fromTo('.checkout-summary', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' });
  }, []);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    placeOrder(cart, form, deliveryMethod);
    clearCart();
    navigate(`/orders`);
  };

  const inputClass = 'w-full px-4 py-2.5 bg-surface-offwhite border-2 border-surface-neutral-grey rounded-xl focus:outline-none focus:border-primary-blue transition-all duration-300 text-sm placeholder-text-tertiary-muted';

  return (
    <div className='min-h-screen bg-surface-offwhite fade-in'>
      {/* Custom header with steps */}
      <nav className='bg-white shadow-lg sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6'>
          <div className='shrink-0'>
            <img src='/colored_text_logo.png' alt='Wavely' className='h-10' />
          </div>
          {/* Step indicator */}
          <div className='flex items-center gap-2 text-sm font-semibold'>
            <span className={step >= 1 ? 'text-primary-blue' : 'text-text-tertiary-muted'}>1. Shipping</span>
            <ChevronRight size={16} className='text-text-tertiary-muted' />
            <span className={`${step >= 2 ? 'text-primary-blue underline' : 'text-text-tertiary-muted'}`}>2. Payment</span>
            <ChevronRight size={16} className='text-text-tertiary-muted' />
            <span className={step >= 3 ? 'text-primary-blue' : 'text-text-tertiary-muted'}>3. Confirmation</span>
          </div>
        </div>
      </nav>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-10'>
        <h1 className='text-3xl font-bold text-text-primary-charcoal mb-8 flex items-center gap-3'>
          <span className='w-1 h-8 bg-primary-blue rounded-full'></span>
          Secure Checkout
        </h1>

        <form onSubmit={handlePlaceOrder}>
          <div className='flex flex-col lg:flex-row gap-10'>
            {/* Left: Form */}
            <div className='flex-1 min-w-0 checkout-form space-y-6'>

              {/* Shipping Details */}
              <div className='bg-white rounded-2xl shadow-md p-6 border-2 border-surface-neutral-grey'>
                <h2 className='text-xl font-bold text-text-primary-charcoal mb-5 pb-3 border-b border-surface-neutral-grey'>Shipping Details</h2>
                <div className='space-y-3'>
                  <input name='fullName' value={form.fullName} onChange={handleChange} required placeholder='Full Name' className={inputClass} />
                  <input name='address1' value={form.address1} onChange={handleChange} required placeholder='Address Line 1' className={inputClass} />
                  <input name='address2' value={form.address2} onChange={handleChange} placeholder='Address Line 2 (optional)' className={inputClass} />
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                    <input name='city' value={form.city} onChange={handleChange} required placeholder='City' className={inputClass} />
                    <input name='state' value={form.state} onChange={handleChange} required placeholder='State/Province' className={inputClass} />
                    <input name='zip' value={form.zip} onChange={handleChange} required placeholder='ZIP/Postal Code' className={inputClass} />
                  </div>
                  <select name='country' value={form.country} onChange={handleChange} className={inputClass}>
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <input name='phone' value={form.phone} onChange={handleChange} required placeholder='Phone Number' className={inputClass} />
                    <input name='email' value={form.email} onChange={handleChange} required type='email' placeholder='Email Address' className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className='bg-white rounded-2xl shadow-md p-6 border-2 border-surface-neutral-grey'>
                <h2 className='text-xl font-bold text-text-primary-charcoal mb-5 pb-3 border-b border-surface-neutral-grey'>Delivery Method</h2>
                <div className='space-y-3'>
                  {[
                    { id:'standard', label:'Standard Shipping (Free - 3-5 Business Days)', cost:0 },
                    { id:'express', label:'Express Shipping ($10.00 - 1-2 Business Days)', cost:10 },
                    { id:'overnight', label:'Overnight Shipping ($25.00 - Next Day)', cost:25 },
                  ].map(opt => (
                    <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === opt.id ? 'border-primary-blue bg-primary-blue/5' : 'border-surface-neutral-grey hover:border-primary-light'}`}>
                      <input type='radio' name='delivery' value={opt.id} checked={deliveryMethod === opt.id} onChange={() => setDeliveryMethod(opt.id)} className='accent-primary-blue' />
                      <span className='text-sm font-medium text-text-primary-charcoal'>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Information */}
              <div className='bg-white rounded-2xl shadow-md p-6 border-2 border-surface-neutral-grey'>
                <h2 className='text-xl font-bold text-text-primary-charcoal mb-5 pb-3 border-b border-surface-neutral-grey'>Payment Information</h2>
                <div className='flex gap-3 mb-5'>
                  {['VISA','MC','AMEX'].map(brand => (
                    <div key={brand} className='px-3 py-1.5 bg-surface-offwhite border-2 border-surface-neutral-grey rounded-lg text-xs font-bold text-text-primary-charcoal'>{brand}</div>
                  ))}
                </div>
                <div className='space-y-3'>
                  <input name='cardNumber' value={form.cardNumber} onChange={handleChange} required placeholder='Card Number' maxLength={19} className={inputClass} />
                  <div className='grid grid-cols-2 gap-3'>
                    <input name='expiry' value={form.expiry} onChange={handleChange} required placeholder='MM/YY' maxLength={5} className={inputClass} />
                    <input name='cvc' value={form.cvc} onChange={handleChange} required placeholder='CVC' maxLength={4} className={inputClass} />
                  </div>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input type='checkbox' checked={saveCard} onChange={e => setSaveCard(e.target.checked)} className='accent-primary-blue w-4 h-4' />
                    <span className='text-sm text-text-secondary-slate'>Save card for future purchases</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className='w-full lg:w-80 xl:w-96 shrink-0'>
              <div className='checkout-summary bg-white rounded-2xl shadow-lg p-6 sticky top-24 border-2 border-surface-neutral-grey'>
                <h2 className='text-xl font-bold text-text-primary-charcoal mb-5 pb-4 border-b border-surface-neutral-grey'>Order Summary</h2>

                <div className='space-y-3 mb-5'>
                  {cart.map(item => (
                    <div key={item._cartId} className='flex items-center gap-3'>
                      <div className='w-12 h-12 rounded-lg overflow-hidden bg-primary-light/20 shrink-0'>
                        <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-xs font-semibold text-text-primary-charcoal leading-tight line-clamp-2'>{item.name} ({item.colorNames?.[item.selectedColor] || ''}, Qty: {item.quantity})</p>
                      </div>
                      <p className='text-sm font-bold text-primary-blue shrink-0'>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className='space-y-2 border-t border-surface-neutral-grey pt-4 mb-5'>
                  <div className='flex justify-between text-sm text-text-secondary-slate'>
                    <span>Subtotal</span><span className='font-semibold text-text-primary-charcoal'>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-sm text-text-secondary-slate'>
                    <span>Shipping</span><span className='font-semibold text-status-success'>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className='flex justify-between text-sm text-text-secondary-slate'>
                    <span>Tax</span><span className='font-semibold text-text-primary-charcoal'>${tax.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between font-bold text-text-primary-charcoal text-lg border-t border-surface-neutral-grey pt-2'>
                    <span>Total</span><span className='text-primary-blue'>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button type='submit' className='w-full py-3.5 bg-primary-blue text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary-blue/30 hover:scale-105 transition-all duration-300 text-base'>
                  Place Order
                </button>

                {/* Trust badges */}
                <div className='flex justify-around mt-5 pt-4 border-t border-surface-neutral-grey'>
                  <div className='flex flex-col items-center gap-1 text-center'>
                    <Shield size={20} className='text-primary-blue' />
                    <span className='text-[10px] text-text-secondary-slate font-medium'>Secure SSL</span>
                  </div>
                  <div className='flex flex-col items-center gap-1 text-center'>
                    <RefreshCcw size={20} className='text-primary-blue' />
                    <span className='text-[10px] text-text-secondary-slate font-medium'>30-Day Money-Back</span>
                  </div>
                  <div className='flex flex-col items-center gap-1 text-center'>
                    <Headphones size={20} className='text-primary-blue' />
                    <span className='text-[10px] text-text-secondary-slate font-medium'>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
