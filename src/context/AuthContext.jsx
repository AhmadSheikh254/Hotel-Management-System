import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginGuest, registerGuest } from '../api/hotelApi';

const AuthContext = createContext(null);

const STORAGE_KEY = 'luxurystay_guest';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('guest_token');
    }
    setLoading(false);
  }, []);

  const persist = (guest, token) => {
    setUser(guest);
    if (guest) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(guest));
      if (token) localStorage.setItem('guest_token', token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('guest_token');
    }
  };

  const login = async (email, password) => {
    const result = await loginGuest(email, password);
    const guest = { ...result };
    const token = localStorage.getItem('guest_token');
    persist(guest, token);
    return guest;
  };

  const register = async (data) => {
    const result = await registerGuest(data);
    const guest = { ...result };
    const token = localStorage.getItem('guest_token');
    persist(guest, token);
    return guest;
  };

  const logout = () => persist(null);

  const updateUser = (guest) => persist(guest, localStorage.getItem('guest_token'));

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
