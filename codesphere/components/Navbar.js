/**
 * ============================================================
 *  components/Navbar.js  —  Top Navigation Bar
 * ============================================================
 *
 *  The Navbar shows at the top of every page.
 *  It changes depending on whether you're logged in:
 *
 *    NOT logged in:  Logo + "Login" button
 *    Logged in:      Logo + user name + role badge + "Logout" button
 *
 *  'use client' is needed because:
 *    - We use useAuth() which reads from localStorage
 *    - We use useRouter() for navigation
 *    - Both only work in the browser
 * ============================================================
 */

'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Handle logout: clear session → go to home page
  function handleLogout() {
    logout();
    router.push('/');
  }

  // Map role to a display label
  const roleLabel = {
    admin:   '⚙️ Admin',
    teacher: '👨‍🏫 Teacher',
    student: '🎓 Student',
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>

        {/* ── Logo ──────────────────────────────────────────── */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>{'</>'}</span>
          <span className={styles.logoText}>
            Code<span className={styles.logoAccent}>Sphere</span>
          </span>
        </Link>

        {/* ── Right side ────────────────────────────────────── */}
        <div className={styles.navRight}>

          {user ? (
            /* User IS logged in → show name, role, and logout */
            <>
              <span className={styles.userName}>
                {user.title ? `${user.title} ` : ''}{user.name}
              </span>

              <span className={`badge ${
                user.role === 'admin'   ? 'badge-approved' :
                user.role === 'teacher' ? 'badge-intermediate' :
                                          'badge-beginner'
              }`}>
                {roleLabel[user.role] || user.role}
              </span>

              {/* Link to dashboard */}
              <Link href="/dashboard" className="btn btn-ghost">
                Dashboard
              </Link>

              {/* Logout button */}
              <button onClick={handleLogout} className="btn btn-ghost">
                Logout
              </button>
            </>
          ) : (
            /* User is NOT logged in → show Login button */
            <Link href="/auth" className="btn btn-primary">
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}
