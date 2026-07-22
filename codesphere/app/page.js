/**
 * ============================================================
 *  app/page.js  —  Landing / Home Page
 * ============================================================
 *
 *  This is the first page visitors see at  http://localhost:3000/
 *
 *  Sections:
 *    1. Hero          — big headline, CTA buttons
 *    2. Stats         — key numbers
 *    3. Features      — what CodeSphere offers
 *    4. Course Types  — what subjects you can learn
 * ============================================================
 */

import Link from 'next/link';
import styles from './page.module.css';

// SEO for this specific page
export const metadata = {
  title: 'CodeSphere — Learn Coding, Cybersecurity & Networking',
};

export default function HomePage() {
  return (
    <div className={styles.homePage}>

      {/* ══════════════════════════════════════════════════
          SECTION 1: HERO
          The big welcome area at the top of the page
          ══════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>

          {/* Animated badge above the heading */}
          <div className={styles.heroBadge}>
            🔐 Professional LMS for Tech Education
          </div>

          {/* Main headline */}
          <h1 className={styles.heroTitle}>
            Master Coding &<br />
            <span className={styles.gradientText}>Cybersecurity</span>
          </h1>

          {/* Subtitle */}
          <p className={styles.heroSubtitle}>
            CodeSphere is a campus-based Learning Management System for students and teachers
            focused on Programming, Cybersecurity, and Cisco Networking.
          </p>

          {/* Action buttons */}
          <div className={styles.heroButtons}>
            <Link href="/auth" className="btn btn-primary">
              🚀 Get Started — It's Free
            </Link>
            <Link href="/courses" className="btn btn-ghost">
              📚 Browse Courses
            </Link>
          </div>

          {/* Tech keywords scrolling below hero */}
          <div className={styles.techTags}>
            {['Python', 'Cybersecurity', 'Cisco CCNA', 'Ethical Hacking',
              'Web Dev', 'Networking', 'SQL', 'Linux', 'Kali Linux'].map((tag) => (
              <span key={tag} className={styles.techTag}>{tag}</span>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2: STATS
          Numbers that show credibility
          ══════════════════════════════════════════════════ */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { number: '6+',   label: 'Courses',   icon: '📚' },
              { number: '4',    label: 'Campuses',  icon: '🏫' },
              { number: '150+', label: 'Students',  icon: '🎓' },
              { number: '5+',   label: 'Teachers',  icon: '👨‍🏫' },
            ].map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <span className={styles.statIcon}>{stat.icon}</span>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 3: FEATURES
          What makes CodeSphere useful
          ══════════════════════════════════════════════════ */}
      <section className={styles.featuresSection}>
        <div className="container">
          <h2 className={`text-center ${styles.sectionTitle}`}>
            Everything You Need to <span className={styles.gradientText}>Learn</span>
          </h2>

          <div className={styles.featuresGrid}>
            {[
              {
                icon:  '🎯',
                title: 'Personalized Learning',
                desc:  'Courses are automatically filtered to match your campus, strand, and section.',
              },
              {
                icon:  '👩‍🏫',
                title: 'Teacher Management',
                desc:  'Admins assign teachers to sections. Students can see their assigned adviser.',
              },
              {
                icon:  '⏳',
                title: 'Approval Workflow',
                desc:  'New accounts are reviewed by admins before access is granted — keeping the platform secure.',
              },
              {
                icon:  '🔐',
                title: 'Cybersecurity Focus',
                desc:  'Learn ethical hacking, network defense, Cisco routing, and real-world security skills.',
              },
              {
                icon:  '🐍',
                title: 'Coding Courses',
                desc:  'Python, web development, databases — everything a modern developer needs.',
              },
              {
                icon:  '🌐',
                title: 'Cisco Networking',
                desc:  'CCNA prep, subnetting, IOS basics, router/switch configuration.',
              },
            ].map((feature) => (
              <div key={feature.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4: CTA  (Call to Action)
          Final push to get users to sign up
          ══════════════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <div className="container text-center">
          <h2 className={styles.ctaTitle}>
            Ready to Start <span className={styles.gradientText}>Learning?</span>
          </h2>
          <p style={{ marginBottom: '32px', fontSize: '16px' }}>
            Join your classmates on CodeSphere. Register with your campus and strand to get started.
          </p>
          <Link href="/auth" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
            Create Free Account
          </Link>
        </div>
      </section>

    </div>
  );
}
