import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '../utils/storage';

const AuthContext = createContext(null);

const DEFAULT_USERS = [
  {
    name: 'Aarav Sharma',
    email: 'aarav@fruzo.com',
    phone: '9876543210',
    password: 'Password@123',
    savedAddresses: [
      {
        id: 'addr-default-1',
        label: 'Home',
        house: 'Flat 402, Lotus Gardenia',
        street: '12th Main Road, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        isDefault: true,
      },
      {
        id: 'addr-default-2',
        label: 'Office',
        house: 'Floor 6, Tech Park Phase 2',
        street: 'Outer Ring Road, Bellandur',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560103',
        isDefault: false,
      }
    ]
  }
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const stored = getStorageItem(STORAGE_KEYS.USER, null);
    if (!stored || stored.length === 0) {
      setStorageItem(STORAGE_KEYS.USER, DEFAULT_USERS);
      return DEFAULT_USERS;
    }
    return stored;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return getStorageItem(STORAGE_KEYS.SESSION, null);
  });

  const [activeAddress, setActiveAddress] = useState(() => {
    const saved = getStorageItem(STORAGE_KEYS.ACTIVE_ADDRESS, null);
    if (saved) return saved;
    return {
      label: 'Home',
      house: 'Flat 402, Lotus Gardenia',
      street: '12th Main Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
    };
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.USER, users);
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      setStorageItem(STORAGE_KEYS.SESSION, currentUser);
    } else {
      removeStorageItem(STORAGE_KEYS.SESSION);
    }
  }, [currentUser]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.ACTIVE_ADDRESS, activeAddress);
  }, [activeAddress]);

  const register = ({ name, email, phone, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    const existing = users.find(
      (u) => u.email.toLowerCase() === cleanEmail || u.phone === cleanPhone
    );

    if (existing) {
      return {
        success: false,
        error: existing.email.toLowerCase() === cleanEmail
          ? 'An account with this email address already exists.'
          : 'An account with this mobile number already exists.'
      };
    }

    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      password: password,
      savedAddresses: [
        {
          id: `addr-${Date.now()}`,
          label: 'Home',
          house: 'House / Apartment',
          street: 'Main Street',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560001',
          isDefault: true,
        }
      ]
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    return { success: true, user: newUser };
  };

  const login = ({ identifier, password }) => {
    const cleanId = identifier.trim().toLowerCase();
    const foundUser = users.find(
      (u) =>
        (u.email.toLowerCase() === cleanId || u.phone === cleanId) &&
        u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        error: 'Email or password is incorrect. Please try again.'
      };
    }

    const sessionUser = {
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
      savedAddresses: foundUser.savedAddresses || []
    };

    setCurrentUser(sessionUser);

    if (sessionUser.savedAddresses && sessionUser.savedAddresses.length > 0) {
      const defaultAddr = sessionUser.savedAddresses.find(a => a.isDefault) || sessionUser.savedAddresses[0];
      setActiveAddress(defaultAddr);
    }

    return { success: true, user: sessionUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);

    setUsers((prev) =>
      prev.map((u) => (u.email === currentUser.email ? { ...u, ...updatedData } : u))
    );
  };

  const saveNewAddress = (newAddr) => {
    const addrWithId = {
      id: `addr-${Date.now()}`,
      ...newAddr,
      isDefault: false
    };

    if (currentUser) {
      const updatedAddresses = [...(currentUser.savedAddresses || []), addrWithId];
      updateProfile({ savedAddresses: updatedAddresses });
    }
    setActiveAddress(addrWithId);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        register,
        login,
        logout,
        activeAddress,
        setActiveAddress,
        saveNewAddress,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
