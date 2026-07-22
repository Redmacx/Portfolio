/**
 * ============================================================
 *  context/AuthContext.js  —  Global Auth State
 * ============================================================
 *
 *  "Context" in React is like a global variable that any
 *  component in your app can read — without passing props
 *  down through every component manually.
 *
 *  This file creates an "AuthContext" that stores:
 *    - user      → the currently logged-in user (or null)
 *    - loading   → true while we're checking localStorage
 *    - login()   → function to log in
 *    - logout()  → function to log out
 *
 *  HOW TO USE IN A COMPONENT:
 *    import { useAuth } from '@/context/AuthContext';
 *    const { user, logout } = useAuth();
 * ============================================================
 */

'use client'; // This file runs in the browser, not the server

import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login as authLogin, logout as authLogout } from '@/lib/auth';

// ─── 1. Create the Context ───────────────────────────────────
//  This is the "box" that will hold our auth data.
//  We start with null as the default value.

const AuthContext = createContext(null);

// ─── 2. Create the Provider ──────────────────────────────────
//  The Provider is a wrapper component that gives all its
//  children access to the auth context.
//
//  Place it in layout.js so every page can access it.

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);   // currently logged-in user
  const [loading, setLoading] = useState(true);   // true while loading from localStorage

  // On first render, check if someone was already logged in
  useEffect(() => {
    const savedUser = getCurrentUser();
    setUser(savedUser);
    setLoading(false);
  }, []);

  // ── Login function ──────────────────────────────────────
  function handleLogin(email, password) {
    const result = authLogin(email, password);
    if (result.success) {
      setUser(result.user); // update the state → all components re-render
    }
    return result;
  }

  // ── Logout function ─────────────────────────────────────
  function handleLogout() {
    authLogout();
    setUser(null); // clear the user from state
  }

  // ── Refresh user ────────────────────────────────────────
  //  Call this after updating user data (e.g. after admin approves)
  function refreshUser() {
    const updatedUser = getCurrentUser();
    setUser(updatedUser);
  }

  // The "value" object is what every component will receive
  const value = {
    user,
    loading,
    login:   handleLogin,
    logout:  handleLogout,
    refresh: refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── 3. Create the Hook ──────────────────────────────────────
//  A custom hook so components can easily access the context.
//  Usage:  const { user } = useAuth();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>');
  }
  return context;
}
