/**
 * ============================================================
 *  lib/auth.js  —  Authentication Helpers
 * ============================================================
 *
 *  This file handles everything related to "who is logged in".
 *
 *  Since we have no real backend, we store the logged-in user's
 *  ID in localStorage (browser storage that survives page refreshes).
 *
 *  Functions:
 *    login()        → check credentials and save user to localStorage
 *    logout()       → clear localStorage
 *    getCurrentUser() → read who is currently logged in
 *    isLoggedIn()   → quick true/false check
 *
 *  NOTE: localStorage only works in the browser (client-side).
 *  Next.js also renders on the server, so we always check
 *  `typeof window !== 'undefined'` before using localStorage.
 * ============================================================
 */

import { getUserByEmail, getUserById, registerUser, ROLES } from './db';

// The key we use to store the user ID in localStorage
const STORAGE_KEY = 'codesphere_user_id';

// ─────────────────────────────────────────────────────────────
//  LOGIN
//  Compare email + password against our user list.
//  If matched and approved, save the user's ID to localStorage.
// ─────────────────────────────────────────────────────────────

export function login(email, password) {
  const user = getUserByEmail(email);

  // User not found
  if (!user) {
    return { success: false, error: 'No account found with that email.' };
  }

  // Wrong password
  if (user.password !== password) {
    return { success: false, error: 'Incorrect password.' };
  }

  // Account not yet approved by admin
  if (user.status === 'pending') {
    return {
      success: false,
      error:   'Your account is pending admin approval.',
      pending: true,
      userId:  user.id,
    };
  }

  // Account was rejected
  if (user.status === 'rejected') {
    return { success: false, error: 'Your account was rejected. Contact the admin.' };
  }

  // Everything is good — save user ID to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, String(user.id));
  }

  return { success: true, user };
}

// ─────────────────────────────────────────────────────────────
//  LOGOUT
//  Simply remove the saved user ID from localStorage.
// ─────────────────────────────────────────────────────────────

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// ─────────────────────────────────────────────────────────────
//  GET CURRENT USER
//  Read the saved ID from localStorage, then look up the user.
// ─────────────────────────────────────────────────────────────

export function getCurrentUser() {
  if (typeof window === 'undefined') return null; // server-side → no localStorage

  const savedId = localStorage.getItem(STORAGE_KEY);
  if (!savedId) return null;

  return getUserById(Number(savedId));
}

// ─────────────────────────────────────────────────────────────
//  IS LOGGED IN
//  Quick helper to check if anyone is logged in.
// ─────────────────────────────────────────────────────────────

export function isLoggedIn() {
  return getCurrentUser() !== null;
}

// ─────────────────────────────────────────────────────────────
//  ROLE CHECKERS
//  Convenient helpers so you can write:
//    if (isAdmin(user)) { ... }
//  instead of:
//    if (user.role === 'admin') { ... }
// ─────────────────────────────────────────────────────────────

export function isAdmin(user) {
  return user?.role === ROLES.ADMIN;
}

export function isTeacher(user) {
  return user?.role === ROLES.TEACHER;
}

export function isStudent(user) {
  return user?.role === ROLES.STUDENT;
}

// ─────────────────────────────────────────────────────────────
//  REGISTER
//  Create a new user account (starts as "pending").
//  Returns the new user object.
// ─────────────────────────────────────────────────────────────

export function register(userData) {
  // Basic validation
  if (!userData.name || !userData.email || !userData.password) {
    return { success: false, error: 'Name, email and password are required.' };
  }

  // Minimum password rules (same as original WordPress plugin):
  //   ✓ 8+ characters
  //   ✓ uppercase letter
  //   ✓ lowercase letter
  //   ✓ number
  //   ✓ special character
  const pw = userData.password;
  if (
    pw.length < 8 ||
    !/[A-Z]/.test(pw) ||
    !/[a-z]/.test(pw) ||
    !/[0-9]/.test(pw) ||
    !/[^a-zA-Z0-9]/.test(pw)
  ) {
    return {
      success: false,
      error:   'Password must be 8+ characters with uppercase, lowercase, number, and special character.',
    };
  }

  const newUser = registerUser(userData);
  return { success: true, user: newUser };
}
