import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { generateOrderId } from '../utils/helpers';

const OrderContext = createContext(null);

const SEED_ORDERS = [
  {
    id: 'FRZ-20261006-4821',
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    status: 'delivered',
    items: [
      {
        product: {
          id: 'veg-tomato-hybrid',
          name: 'Farm Fresh Tomatoes (Hybrid)',
          image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
          price: 38,
          unit: '500 g'
        },
        quantity: 2
      },
      {
        product: {
          id: 'fruit-apple-fuji',
          name: 'Crisp Royal Gala Apples',
          image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
          price: 149,
          unit: '4 pcs (approx 650g)'
        },
        quantity: 1
      }
    ],
    subtotal: 225,
    deliveryFee: 39,
    discount: 22,
    total: 242,
    deliveryPreference: 'express',
    paymentMethod: 'UPI',
    paymentDetails: 'UPI ID: aarav@okhdfcbank',
    deliveryAddress: {
      label: 'Home',
      house: 'Flat 402, Lotus Gardenia',
      street: '12th Main Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    deliveryPartner: {
      name: 'Ramesh Kumar',
      phone: '+91 98451 22319',
      rating: 4.9,
      vehicle: 'FRUZO Green EV Pod (KA-03-EX-9912)'
    },
    estimatedMinutes: 'Superfast Delivery'
  }
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = getStorageItem(STORAGE_KEYS.ORDERS, null);
    if (!saved) {
      setStorageItem(STORAGE_KEYS.ORDERS, SEED_ORDERS);
      return SEED_ORDERS;
    }
    return saved;
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.ORDERS, orders);
  }, [orders]);

  const placeOrder = ({ items, subtotal, deliveryFee, discount, total, address, deliveryPreference, paymentMethod, paymentDetails }) => {
    const newOrder = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      items: items.map(item => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
          unit: item.product.unit,
        },
        quantity: item.quantity
      })),
      subtotal,
      deliveryFee,
      discount,
      total,
      deliveryPreference: deliveryPreference || 'express',
      paymentMethod,
      paymentDetails,
      deliveryAddress: address,
      deliveryPartner: {
        name: 'Ramesh Kumar',
        phone: '+91 98451 22319',
        rating: 4.9,
        vehicle: 'FRUZO Green EV Pod (KA-03-EX-9912)'
      },
      estimatedMinutes: 'Superfast Delivery'
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (orderId) => {
    return orders.find((o) => o.id === orderId);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
