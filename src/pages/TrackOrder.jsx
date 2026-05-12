import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useOrders } from '../context/OrdersContext';
import gsap from 'gsap';

const STEPS = [
  { label: 'Order Placed', icon: '📋' },
  { label: 'Processing', icon: '⚙️' },
  { label: 'Shipped', icon: '🚚' },
  { label: 'Out for Delivery', icon: '📦' },
  { label: 'Delivered', icon: '✅' },
];

const STATUS_STEP_INDEX = {
  'Order Placed': 0,
  Processing: 1,
  Shipped: 2,
  'Out for Delivery': 3,
  Delivered: 4,
};

const TrackOrder = () => {
  const { orderId } = useParams();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const order = orders.find(o => o.id === orderId);

  useEffect(() => {
    gsap.fromTo('.track-header', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    gsap.fromTo('.track-step', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.15, delay: 0.3, ease: 'back.out(1.7)' });
    gsap.fromTo('.track-event', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, delay: 0.5, ease: 'power2.out' });
    gsap.fromTo('.track-map', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.7, delay: 0.4, ease: 'power2.out' });
  }, []);

  if (!order) {
    return (
      <div className='min-h-screen bg-surface-offwhite fade-in'>
        <Navbar />
        <div className='max-w-4xl mx-auto px-6 py-24 flex flex-col items-center gap-6'>
          <div className='w-24 h-24 bg-primary-blue/10 rounded-full flex items-center justify-center'>
            <Package size={48} className='text-primary-blue' />
          </div>
          <h2 className='text-2xl font-bold text-text-primary-charcoal'>Order not found</h2>
          <button onClick={() => navigate('/orders')} className='px-6 py-3 bg-primary-blue text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300'>
            Back to Orders
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const currentStepIdx = STATUS_STEP_INDEX[order.status] ?? 1;

  const trackingEvents = [
    { label: 'Order Placed', location: 'Wavely Warehouse', date: order.date, done: true },
    ...(currentStepIdx >= 1 ? [{ label: 'Order Processed', location: 'Wavely Processing Center', date: order.date, done: true }] : []),
    ...(currentStepIdx >= 2 ? [{ label: 'Shipped from Carrier Facility', location: 'Distribution Hub', date: order.date, done: true }] : []),
    ...(currentStepIdx >= 3 ? [{ label: 'Out for Delivery', location: `${order.shippingDetails?.city || 'Your City'}`, date: order.date, done: true }] : []),
    ...(currentStepIdx >= 4 ? [{ label: 'Delivered', location: order.shippingDetails?.address1 || 'Destination', date: order.date, done: true }] : []),
  ].reverse();

  return (
    <div className='min-h-screen bg-surface-offwhite fade-in'>
      <Navbar />
      <div className='max-w-4xl mx-auto px-4 sm:px-6 py-10'>
        {/* Breadcrumb */}
        <p className='text-sm text-text-secondary-slate mb-2'>Wavely Real-Time Tracking</p>

        {/* Header */}
        <div className='track-header flex items-start justify-between mb-8 gap-4 flex-wrap'>
          <h1 className='text-3xl sm:text-4xl font-bold text-text-primary-charcoal'>Track Your Order #{order.id}</h1>
          <button onClick={() => navigate('/orders')} className='flex items-center gap-2 px-4 py-2.5 bg-primary-blue text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm shrink-0'>
            <ArrowLeft size={16} /> My Orders
          </button>
        </div>

        {/* Progress Steps */}
        <div className='bg-white rounded-2xl shadow-md p-6 mb-8 border-2 border-surface-neutral-grey overflow-x-auto'>
          <div className='flex items-center min-w-max mx-auto gap-0'>
            {STEPS.map((step, idx) => {
              const done = idx < currentStepIdx;
              const active = idx === currentStepIdx;
              return (
                <div key={idx} className='flex items-center'>
                  <div className='flex flex-col items-center gap-2 track-step'>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-3 transition-all duration-500 ${
                      done ? 'bg-primary-blue border-primary-blue text-white' :
                      active ? 'bg-primary-blue border-primary-blue text-white shadow-lg shadow-primary-blue/40 scale-110 glow-effect' :
                      'bg-white border-surface-neutral-grey text-text-tertiary-muted'
                    }`}>
                      {done ? '✓' : step.icon}
                    </div>
                    <span className={`text-xs font-semibold text-center max-w-16 leading-tight ${active ? 'text-primary-blue' : done ? 'text-text-primary-charcoal' : 'text-text-tertiary-muted'}`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`w-16 sm:w-24 h-1 mx-1 rounded-full transition-all duration-500 ${idx < currentStepIdx ? 'bg-primary-blue' : 'bg-surface-neutral-grey'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline + Map */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          {/* Timeline */}
          <div className='bg-white rounded-2xl shadow-md p-6 border-2 border-surface-neutral-grey'>
            <h2 className='text-lg font-bold text-text-primary-charcoal mb-5'>Tracking History</h2>
            <div className='relative'>
              {/* Vertical line */}
              <div className='absolute left-3.5 top-4 bottom-4 w-0.5 bg-primary-light/60'></div>
              <div className='space-y-6'>
                {trackingEvents.map((event, idx) => (
                  <div key={idx} className='track-event flex items-start gap-4 relative'>
                    <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center z-10 ${idx === 0 ? 'bg-primary-blue' : 'bg-primary-light'}`}>
                      <div className='w-2.5 h-2.5 rounded-full bg-white'></div>
                    </div>
                    <div>
                      <p className='font-bold text-text-primary-charcoal text-sm'>{event.label}</p>
                      <p className='text-xs text-text-secondary-slate mt-0.5'>{event.location} · {event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map + Order Summary */}
          <div className='space-y-4'>
            {/* Static Map Placeholder */}
            <div className='track-map bg-white rounded-2xl shadow-md border-2 border-surface-neutral-grey overflow-hidden h-48 relative'>
              <div className='w-full h-full bg-gradient-to-br from-blue-50 to-primary-light/30 flex items-center justify-center relative'>
                <div className='absolute inset-0 opacity-20' style={{backgroundImage:'repeating-linear-gradient(0deg,#4489E3 0,#4489E3 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#4489E3 0,#4489E3 1px,transparent 1px,transparent 40px)'}}></div>
                <div className='relative z-10 flex flex-col items-center gap-2'>
                  <div className='w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center shadow-lg shadow-primary-blue/40'>
                    <MapPin size={20} className='text-white' />
                  </div>
                  <div className='bg-white rounded-xl px-3 py-1.5 shadow-md text-xs font-bold text-text-primary-charcoal'>Last Scanned Location</div>
                  <p className='text-xs font-semibold text-primary-blue'>{order.shippingDetails?.city || 'Distribution Hub'}</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className='bg-white rounded-2xl shadow-md p-5 border-2 border-surface-neutral-grey'>
              <h3 className='font-bold text-text-primary-charcoal mb-3'>Order Summary</h3>
              <div className='space-y-1.5 mb-3'>
                {order.items.map(item => (
                  <p key={item._cartId} className='text-sm text-text-secondary-slate'>
                    {item.name}{item.colorNames ? ` (${item.colorNames[item.selectedColor] || item.colorNames[0]})` : ''} - Qty {item.quantity}
                  </p>
                ))}
              </div>
              {order.shippingDetails?.address1 && (
                <>
                  <p className='text-sm font-bold text-text-primary-charcoal mt-3 mb-1'>Shipping Address</p>
                  <p className='text-sm text-text-secondary-slate'>{order.shippingDetails.address1}, {order.shippingDetails.city}, {order.shippingDetails.state}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;
