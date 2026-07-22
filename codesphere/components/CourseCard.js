/**
 * ============================================================
 *  components/CourseCard.js  —  Course Card Component
 * ============================================================
 *
 *  A reusable card that displays one course's info.
 *  Used on both the /courses page and dashboard.
 *
 *  Props:
 *    - course: { id, title, description, icon, level,
 *                duration, lessons, students, instructor, tags }
 * ============================================================
 */

import Link from 'next/link';
import styles from './CourseCard.module.css';

export default function CourseCard({ course }) {
  return (
    <div className={styles.card}>

      {/* ── Top: icon + level badge ─────────────────────── */}
      <div className={styles.cardHeader}>
        <span className={styles.courseIcon}>{course.icon}</span>
        <span className={`badge badge-${course.level.toLowerCase()}`}>
          {course.level}
        </span>
      </div>

      {/* ── Course Title ──────────────────────────────────── */}
      <h3 className={styles.title}>{course.title}</h3>

      {/* ── Description (truncated to 2 lines) ───────────── */}
      <p className={styles.description}>{course.description}</p>

      {/* ── Stats: lessons + students ─────────────────────── */}
      <div className={styles.stats}>
        <span>📖 {course.lessons} lessons</span>
        <span>👥 {course.students} students</span>
        <span>⏱️ {course.duration}</span>
      </div>

      {/* ── Tags ─────────────────────────────────────────── */}
      <div className={styles.tags}>
        {course.tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>

      {/* ── Instructor + View button ──────────────────────── */}
      <div className={styles.cardFooter}>
        <span className={styles.instructor}>👨‍💻 {course.instructor}</span>
        <Link href={`/courses/${course.id}`} className="btn btn-primary" style={{fontSize: '13px', padding: '8px 16px'}}>
          View Course
        </Link>
      </div>

    </div>
  );
}
