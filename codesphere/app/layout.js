/**
 * ============================================================
 *  app/layout.js  —  Root Layout
 * ============================================================
 *
 *  In Next.js App Router, layout.js wraps EVERY page.
 *  Think of it like the "shell" of your app:
 *    - <html> and <body> tags go here
 *    - Fonts are loaded here
 *    - The AuthProvider wraps everything here
 *    - The Navbar goes here (so it shows on every page)
 *
 *  metadata = the <title> and <meta> tags for SEO.
 * ============================================================
 */

import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

// SEO metadata for the whole site
export const metadata = {
  title: {
    default:  'CodeSphere — Learn Coding & Cybersecurity',
    template: '%s | CodeSphere',  // e.g. "Dashboard | CodeSphere"
  },
  description:
    'CodeSphere is a professional Learning Management System for Coding, Cybersecurity, and Cisco Networking courses.',
  keywords: ['LMS', 'Coding', 'Cybersecurity', 'Cisco', 'Networking', 'CCNA', 'Python'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts: Orbitron (techy headings) + Inter (readable body) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/*
          AuthProvider wraps everything so EVERY page can access
          the logged-in user via the useAuth() hook.
        */}
        <AuthProvider>
          {/* Navbar appears at the top of every page */}
          <Navbar />

          {/* 'children' = the actual page content */}
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
