/**
 * ============================================================
 *  lib/db.js  —  CodeSphere Simulated Database
 * ============================================================
 *
 *  Think of this file as your "fake database".
 *  In a real app, this data would come from MySQL, MongoDB, etc.
 *  For now, everything lives here as plain JavaScript objects.
 *
 *  HOW IT WORKS:
 *  - We export functions like getUsers(), getCourses(), etc.
 *  - Any page that needs data just calls one of these functions.
 *  - Easy to swap with a real database later.
 * ============================================================
 */

// ─────────────────────────────────────────────────────────────
//  CAMPUS & STRAND DATA
//  This is used in the registration form (campus → strand dropdown)
//  and in the admin "Assign Teacher" form.
// ─────────────────────────────────────────────────────────────

export const CAMPUSES = [
  'Gumaca Campus',
  'Tagkawayan Campus',
  'Catanuan Campus',
  'Lucena Campus',
];

// Each campus has its own available strands (tracks/courses)
export const STRANDS_BY_CAMPUS = {
  'Gumaca Campus': [
    'TVL - Information and Communication Technology (ICT)',
    'TVL - Home Economics (HE)',
    'General Academic Strand (GAS)',
    'Humanities and Social Sciences (HUMSS)',
    'Accountancy, Business and Management (ABM)',
    'Diploma in Hospitality Services and Technology',
    'Diploma in Tourism and Travel Services',
    'Diploma in Multimedia Arts and Design',
    'Diploma in Industrial Education',
  ],
  'Tagkawayan Campus': [
    'TVL - Information and Communication Technology (ICT)',
    'TVL - Home Economics (HE)',
    'General Academic Strand (GAS)',
    'Diploma in Hospitality Services and Technology',
    'Diploma in Industrial Education',
  ],
  'Catanuan Campus': [
    'Accountancy, Business and Management (ABM)',
    'General Academic Strand (GAS)',
    'TVL - Information and Communication Technology (ICT)',
    'Diploma in Multimedia Arts and Design',
    'Diploma in Tourism and Travel Services',
  ],
  'Lucena Campus': [
    'TVL - Information and Communication Technology (ICT)',
    'TVL - Home Economics (HE)',
    'General Academic Strand (GAS)',
    'Humanities and Social Sciences (HUMSS)',
    'Accountancy, Business and Management (ABM)',
    'Diploma in Multimedia Arts and Design',
    'Diploma in Tourism and Travel Services',
    'Diploma in Hospitality Services and Technology',
  ],
};

// All unique strands combined (used in admin dropdowns)
export const ALL_STRANDS = [
  'Accountancy, Business and Management (ABM)',
  'Diploma in Hospitality Services and Technology',
  'Diploma in Industrial Education',
  'Diploma in Multimedia Arts and Design',
  'Diploma in Tourism and Travel Services',
  'General Academic Strand (GAS)',
  'Hospitality Services and Technology',
  'Humanities and Social Sciences (HUMSS)',
  'Industrial Education',
  'Multimedia Arts and Design',
  'Tourism and Travel Services',
  'TVL - Home Economics (HE)',
  'TVL - Information and Communication Technology (ICT)',
];

// Available sections (A, B, C)
export const SECTIONS = [
  { key: 'A', label: 'Section A' },
  { key: 'B', label: 'Section B' },
  { key: 'C', label: 'Section C' },
];

// ─────────────────────────────────────────────────────────────
//  ROLES
//  Three user types in CodeSphere:
//    - student    → can view courses, see their section
//    - teacher    → can assign sections, create courses
//    - admin      → can approve users, assign teachers
// ─────────────────────────────────────────────────────────────

export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN:   'admin',
};

// ─────────────────────────────────────────────────────────────
//  USERS  (simulated user accounts)
//
//  Each user has:
//    id, name, email, password (plain text for demo!),
//    role, status, school, strand, section, adviserId, title
//
//  status can be: 'pending', 'approved', 'rejected'
// ─────────────────────────────────────────────────────────────

let users = [
  {
    id: 1,
    name:     'Admin User',
    email:    'admin@codesphere.edu',
    password: 'Admin@1234',
    role:     ROLES.ADMIN,
    status:   'approved',
    school:   '',
    strand:   '',
    section:  '',
    adviserId: null,
    title:    '',
  },
  {
    id: 2,
    name:     'Mr. Juan Dela Cruz',
    email:    'juan@codesphere.edu',
    password: 'Teacher@1234',
    role:     ROLES.TEACHER,
    status:   'approved',
    school:   'Lucena Campus',
    strand:   'TVL - Information and Communication Technology (ICT)',
    section:  'Section A',
    adviserId: null,
    title:    'Mr.',
  },
  {
    id: 3,
    name:     'Maria Santos',
    email:    'maria@codesphere.edu',
    password: 'Student@1234',
    role:     ROLES.STUDENT,
    status:   'approved',
    school:   'Lucena Campus',
    strand:   'TVL - Information and Communication Technology (ICT)',
    section:  'Section A',
    adviserId: 2,
    title:    '',
  },
  {
    id: 4,
    name:     'Pedro Reyes',
    email:    'pedro@codesphere.edu',
    password: 'Student@1234',
    role:     ROLES.STUDENT,
    status:   'approved',
    school:   'Lucena Campus',
    strand:   'TVL - Information and Communication Technology (ICT)',
    section:  'Section A',
    adviserId: 2,
    title:    '',
  },
  {
    id: 5,
    name:     'Ana Lim',
    email:    'ana@codesphere.edu',
    password: 'Student@1234',
    role:     ROLES.STUDENT,
    status:   'pending',   // ← waiting for admin approval
    school:   'Lucena Campus',
    strand:   'TVL - Information and Communication Technology (ICT)',
    section:  '',
    adviserId: null,
    title:    '',
  },
  {
    id: 6,
    name:     'Carlo Mendoza',
    email:    'carlo@codesphere.edu',
    password: 'Student@1234',
    role:     ROLES.STUDENT,
    status:   'pending',
    school:   'Gumaca Campus',
    strand:   'General Academic Strand (GAS)',
    section:  '',
    adviserId: null,
    title:    '',
  },
  {
    id: 7,
    name:     'Ms. Rowena Garcia',
    email:    'rowena@codesphere.edu',
    password: 'Teacher@1234',
    role:     ROLES.TEACHER,
    status:   'approved',
    school:   'Gumaca Campus',
    strand:   'TVL - Information and Communication Technology (ICT)',
    section:  'Section B',
    adviserId: null,
    title:    'Ms.',
  },
];

// ─── User CRUD helpers ───────────────────────────────────────

/** Get all users */
export function getUsers() {
  return users;
}

/** Find a single user by their ID */
export function getUserById(id) {
  return users.find((u) => u.id === id) || null;
}

/** Find a user by email (used for login) */
export function getUserByEmail(email) {
  return users.find((u) => u.email === email) || null;
}

/** Get only pending users (for admin approval page) */
export function getPendingUsers() {
  return users.filter((u) => u.status === 'pending');
}

/** Get only teachers */
export function getTeachers() {
  return users.filter((u) => u.role === ROLES.TEACHER && u.status === 'approved');
}

/** Get students in a specific school + strand + section */
export function getStudentsBySection(school, strand, section) {
  return users.filter(
    (u) =>
      u.role === ROLES.STUDENT &&
      u.status === 'approved' &&
      u.school === school &&
      u.strand === strand &&
      u.section === section
  );
}

/** Get students in a specific school + strand (for teacher's assign-sections page) */
export function getStudentsByStrand(school, strand) {
  return users.filter(
    (u) =>
      u.role === ROLES.STUDENT &&
      u.status === 'approved' &&
      u.school === school &&
      u.strand === strand
  );
}

/** Approve a pending user */
export function approveUser(id) {
  users = users.map((u) =>
    u.id === id ? { ...u, status: 'approved' } : u
  );
}

/** Reject (delete) a pending user */
export function rejectUser(id) {
  users = users.filter((u) => u.id !== id);
}

/** Update a user's section */
export function updateUserSection(userId, section) {
  users = users.map((u) =>
    u.id === userId ? { ...u, section } : u
  );
}

/** Assign a teacher to a campus/strand/section + update students' adviserId */
export function assignTeacher(teacherId, school, strand, sectionKey) {
  const sectionLabel = SECTIONS.find((s) => s.key === sectionKey)?.label || sectionKey;

  // Update the teacher's assignment
  users = users.map((u) =>
    u.id === teacherId
      ? { ...u, school, strand, section: sectionLabel }
      : u
  );

  // Update all matching students to point to this teacher as their adviser
  users = users.map((u) => {
    if (
      u.role === ROLES.STUDENT &&
      u.school === school &&
      u.strand === strand &&
      u.section === sectionLabel
    ) {
      return { ...u, adviserId: teacherId };
    }
    return u;
  });
}

/** Register a new user (returns the new user object) */
export function registerUser({ name, email, password, role, school, strand, section, title }) {
  const newUser = {
    id:        users.length + 1,
    name,
    email,
    password,
    role:      role || ROLES.STUDENT,
    status:    'pending',          // all new users start as pending
    school:    school || '',
    strand:    strand || '',
    section:   section || '',
    adviserId: null,
    title:     title || '',
  };
  users.push(newUser);
  return newUser;
}

// ─────────────────────────────────────────────────────────────
//  COURSES  (the actual learning content)
//
//  Each course has:
//    id, title, description, category (strand), tags (school, section),
//    level, duration, lessons, instructor, thumbnail (emoji for demo),
//    enrolled students count
// ─────────────────────────────────────────────────────────────

let courses = [
  {
    id: 1,
    title:       'Python Programming Fundamentals',
    description: 'Learn Python from scratch. Variables, loops, functions, and real-world projects.',
    category:    'TVL - Information and Communication Technology (ICT)',
    school:      'Lucena Campus',
    section:     'Section A',
    level:       'Beginner',
    duration:    '8 weeks',
    lessons:     24,
    students:    42,
    icon:        '🐍',
    instructor:  'Mr. Juan Dela Cruz',
    tags:        ['Python', 'Programming', 'Beginner'],
  },
  {
    id: 2,
    title:       'Cybersecurity Essentials',
    description: 'Understand threats, firewalls, encryption, and how to defend systems from attacks.',
    category:    'TVL - Information and Communication Technology (ICT)',
    school:      'Lucena Campus',
    section:     'Section A',
    level:       'Intermediate',
    duration:    '10 weeks',
    lessons:     30,
    students:    35,
    icon:        '🔐',
    instructor:  'Mr. Juan Dela Cruz',
    tags:        ['Cybersecurity', 'Networking', 'Security'],
  },
  {
    id: 3,
    title:       'Cisco Networking (CCNA Prep)',
    description: 'Routers, switches, IP addressing, subnetting, and Cisco IOS basics.',
    category:    'TVL - Information and Communication Technology (ICT)',
    school:      'Lucena Campus',
    section:     'Section A',
    level:       'Intermediate',
    duration:    '12 weeks',
    lessons:     36,
    students:    28,
    icon:        '🌐',
    instructor:  'Mr. Juan Dela Cruz',
    tags:        ['Cisco', 'Networking', 'CCNA'],
  },
  {
    id: 4,
    title:       'Web Development with HTML & CSS',
    description: 'Build beautiful websites from scratch. Learn HTML structure and CSS styling.',
    category:    'TVL - Information and Communication Technology (ICT)',
    school:      'Lucena Campus',
    section:     'Section B',
    level:       'Beginner',
    duration:    '6 weeks',
    lessons:     18,
    students:    51,
    icon:        '🖥️',
    instructor:  'Ms. Rowena Garcia',
    tags:        ['HTML', 'CSS', 'Web Design'],
  },
  {
    id: 5,
    title:       'Ethical Hacking & Penetration Testing',
    description: 'Learn how hackers think and use those skills to protect systems. Kali Linux, tools, reports.',
    category:    'TVL - Information and Communication Technology (ICT)',
    school:      'Gumaca Campus',
    section:     'Section B',
    level:       'Advanced',
    duration:    '14 weeks',
    lessons:     42,
    students:    19,
    icon:        '💀',
    instructor:  'Ms. Rowena Garcia',
    tags:        ['Ethical Hacking', 'Kali Linux', 'Pentesting'],
  },
  {
    id: 6,
    title:       'Database Management with SQL',
    description: 'Create, query, and manage databases using SQL. Learn JOIN, GROUP BY, stored procedures.',
    category:    'General Academic Strand (GAS)',
    school:      'Gumaca Campus',
    section:     'Section A',
    level:       'Beginner',
    duration:    '8 weeks',
    lessons:     22,
    students:    33,
    icon:        '🗄️',
    instructor:  'Mr. Juan Dela Cruz',
    tags:        ['SQL', 'Database', 'MySQL'],
  },
];

// ─── Course helpers ──────────────────────────────────────────

/** Get all courses */
export function getCourses() {
  return courses;
}

/** Get a single course by ID */
export function getCourseById(id) {
  return courses.find((c) => c.id === id) || null;
}

/**
 * Get courses that match a student's profile.
 * A student can only see courses in their strand + school + section.
 */
export function getCoursesByProfile(school, strand, section) {
  return courses.filter(
    (c) =>
      c.category === strand &&
      c.school === school &&
      c.section === section
  );
}

/** Get courses taught by a specific instructor */
export function getCoursesByInstructor(instructorName) {
  return courses.filter((c) => c.instructor === instructorName);
}
