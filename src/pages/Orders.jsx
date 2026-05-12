import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Package, Truck, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useOrders } from '../context/OrdersContext';
import gsap from 'gsap';

const STATUS_STYLES = {
  Processing: 'bg-yellow-100 text-yellow-700',
  Shipped: 'bg-blue-100 text-primary-blue',
  Delivered: 'bg-green-100 text-status-success',
  Cancelled: 'bg-red-100 text-status-error',
};

const PAGE_SIZE = 4;

const Orders = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    gsap.fromTo('.orders-header', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' });
    gsap.fromTo('.order-card', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'power2.out' });
  }, []);

  const visibleOrders = orders.slice(0, visibleCount);

  if (orders.length === 0) {
    return (
      <div className='min-h-screen bg-surface-offwhite fade-in'>
        <Navbar />
        <div className='max-w-4xl mx-auto px-6 py-24 flex flex-col items-center gap-6'>
          <div className='w-28 h-28 bg-primary-blue/10 rounded-full flex items-center justify-center'>
            <Package size={52} className='text-primary-blue' />
          </div>
          <h2 className='text-3xl font-bold text-text-primary-charcoal'>No orders yet</h2>
          <p className='text-text-secondary-slate text-lg text-center max-w-md'>You haven't placed any orders. Start shopping to see your orders here!</p>
          <button onClick={() => navigate('/')} className='px-8 py-3.5 bg-primary-blue text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300'>
            Start Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-surface-offwhite fade-in'>
      <Navbar />
      <div className='orders-header bg-white shadow-md border-b-2 border-primary-blue/20'>
        <div className='max-w-4xl mx-auto px-6 py-6'>
          <h1 className='text-3xl font-bold text-text-primary-charcoal flex items-center gap-3'>
            <span className='w-1 h-8 bg-primary-blue rounded-full'></span>
            My Orders
          </h1>
        </div>
      </div>

      <div className='max-w-4xl mx-auto px-4 sm:px-6 py-10'>
        <div className='space-y-4'>
          {visibleOrders.map(order => (
            <div key={order.id} className='order-card bg-white rounded-2xl shadow-md border-2 border-transparent hover:border-primary-light transition-all duration-300 overflow-hidden'>
              <div className='p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div className='flex-1 min-w-0'>
                  <p className='font-bold text-text-primary-charcoal text-lg'>Order #{order.id}</p>
                  <p className='text-text-secondary-slate text-sm mt-0.5'>{order.date}</p>
                  <p className='text-text-secondary-slate text-sm mt-0.5'>Total: <span className='font-semibold text-text-primary-charcoal'>${(order.total * 1.07).toFixed(2)}</span></p>
                  <span className={`inline-block mt-2 px-3 py-0.5 rounded-full text-sm font-bold ${STATUS_STYLES[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </div>
                <div className='flex flex-col gap-2 shrink-0'>
                  <button
                    onClick={() => navigate(`/track/${order.id}`)}
                    className='px-5 py-2.5 bg-primary-blue text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm'
                  >
                    <Truck size={16} /> Track Order
                  </button>
                  <button
                    onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                    className='px-5 py-2.5 bg-white border-2 border-surface-neutral-grey text-text-primary-charcoal font-bold rounded-full hover:border-primary-blue hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm'
                  >
                    View Details <ChevronDown size={16} className={`transition-transform duration-300 ${expandedId === order.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {expandedId === order.id && (
                <div className='border-t-2 border-surface-neutral-grey bg-surface-offwhite px-5 sm:px-6 py-5 scale-in'>
                  <h3 className='font-bold text-text-primary-charcoal mb-3 flex items-center gap-2'>
                    <CheckCircle size={16} className='text-primary-blue' /> Order Items
                  </h3>
                  <div className='space-y-3'>
                    {order.items.map(item => (
                      <div key={item._cartId} className='flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm'>
                        <div className='w-12 h-12 rounded-lg overflow-hidden bg-primary-light/20 shrink-0'>
                          <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-semibold text-text-primary-charcoal line-clamp-1'>{item.name}</p>
                          <p className='text-xs text-text-secondary-slate'>Qty: {item.quantity}</p>
                        </div>
                        <p className='text-sm font-bold text-primary-blue'>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  {order.shippingDetails?.fullName && (
                    <div className='mt-4 pt-4 border-t border-surface-neutral-grey'>
                      <p className='text-sm font-bold text-text-primary-charcoal mb-1'>Shipping To:</p>
                      <p className='text-sm text-text-secondary-slate'>{order.shippingDetails.fullName}</p>
                      <p className='text-sm text-text-secondary-slate'>{order.shippingDetails.address1}{order.shippingDetails.address2 ? `, ${order.shippingDetails.address2}` : ''}</p>
                      <p className='text-sm text-text-secondary-slate'>{order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.zip}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {visibleCount < orders.length && (
          <div className='flex justify-center mt-8'>
            <button
              onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
              className='flex items-center gap-2 px-6 py-3 bg-white border-2 border-surface-neutral-grey text-text-primary-charcoal font-bold rounded-full hover:border-primary-blue hover:shadow-md transition-all duration-300'
            >
              Load More <ChevronDown size={18} />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
