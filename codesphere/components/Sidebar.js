/**
 * ============================================================
 *  components/Sidebar.js  —  Dashboard Sidebar Navigation
 * ============================================================
 *
 *  The sidebar appears on all dashboard pages.
 *  It shows DIFFERENT menu items based on the user's role:
 *
 *    Student:  My Subjects, My Section, Dashboard
 *    Teacher:  My Courses, Assign Sections, Dashboard
 *    Admin:    Dashboard, Pending Users, Assign Teacher, Courses
 *
 *  Props received:
 *    - user: the currently logged-in user object
 * ============================================================
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

// ── Navigation items per role ─────────────────────────────
// Each object has: href (link), icon (emoji), label (text)

const STUDENT_LINKS = [
  { href: '/dashboard',             icon: '🏠', label: 'Dashboard'    },
  { href: '/dashboard/my-subject',  icon: '📚', label: 'My Subjects'  },
  { href: '/dashboard/my-section',  icon: '🏫', label: 'My Section'   },
  { href: '/courses',               icon: '🌐', label: 'All Courses'  },
];

const TEACHER_LINKS = [
  { href: '/dashboard',                    icon: '🏠', label: 'Dashboard'        },
  { href: '/dashboard/assign-sections',    icon: '📋', label: 'Assign Sections'  },
  { href: '/courses',                      icon: '🌐', label: 'All Courses'      },
];

const ADMIN_LINKS = [
  { href: '/dashboard',                    icon: '🏠', label: 'Dashboard'        },
  { href: '/dashboard/pending-users',      icon: '⏳', label: 'Pending Users'    },
  { href: '/dashboard/assign-teacher',     icon: '👩‍🏫', label: 'Assign Teacher'   },
  { href: '/courses',                      icon: '🌐', label: 'All Courses'      },
];

export default function Sidebar({ user }) {
  const pathname = usePathname(); // Current URL path (used to highlight active link)

  // Pick the right navigation list based on role
  const links =
    user?.role === 'admin'   ? ADMIN_LINKS   :
    user?.role === 'teacher' ? TEACHER_LINKS :
                               STUDENT_LINKS;

  return (
    <aside className={styles.sidebar}>

      {/* ── User Info ───────────────────────────────────── */}
      <div className={styles.userInfo}>
        {/* Avatar: first letter of their name */}
        <div className={styles.avatar}>
          {user?.name?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <div className={styles.userName}>
            {user?.title ? `${user.title} ` : ''}{user?.name}
          </div>
          <div className={styles.userRole}>
            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
          </div>
        </div>
      </div>

      {/* ── Navigation Links ────────────────────────────── */}
      <nav className={styles.nav}>
        {links.map((link) => {
          // Is this the current page? → highlight it
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Footer info ─────────────────────────────────── */}
      {user?.school && (
        <div className={styles.sidebarFooter}>
          <div className={styles.footerLabel}>📍 Campus</div>
          <div className={styles.footerValue}>{user.school}</div>
          {user.strand && (
            <>
              <div className={styles.footerLabel} style={{marginTop: '8px'}}>📚 Strand</div>
              <div className={styles.footerValue}>{user.strand}</div>
            </>
          )}
          {user.section && (
            <>
              <div className={styles.footerLabel} style={{marginTop: '8px'}}>🏷️ Section</div>
              <div className={styles.footerValue}>{user.section}</div>
            </>
          )}
        </div>
      )}

    </aside>
  );
}
