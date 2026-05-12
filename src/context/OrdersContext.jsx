import { createContext, useContext, useReducer, useEffect } from 'react';

/* eslint-disable react-refresh/only-export-components -- provider + hook in one module */

const OrdersContext = createContext(null);

const ordersReducer = (state, action) => {
  switch (action.type) {
    case 'PLACE_ORDER':
      return { orders: [action.payload, ...state.orders] };
    default:
      return state;
  }
};

const initialState = { orders: [] };

export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState, () => {
    try {
      const saved = localStorage.getItem('wavely_orders');
      return saved ? JSON.parse(saved) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem('wavely_orders', JSON.stringify(state));
  }, [state]);

  const placeOrder = (cart, shippingDetails, deliveryMethod) => {
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    const order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      items: cart,
      status: 'Processing',
      shippingDetails,
      deliveryMethod,
      trackingEvents: [
        { label: 'Order Placed', date: new Date().toLocaleString(), done: true },
        { label: 'Processing', date: '', done: false },
        { label: 'Shipped', date: '', done: false },
        { label: 'Out for Delivery', date: '', done: false },
        { label: 'Delivered', date: '', done: false },
      ]
    };
    dispatch({ type: 'PLACE_ORDER', payload: order });
    return orderId;
  };

  return (
    <OrdersContext.Provider value={{ orders: state.orders, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used inside OrdersProvider');
  return ctx;
};
