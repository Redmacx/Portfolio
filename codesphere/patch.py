import codecs, re

file_path = 'codesphere-ui-demo.html'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

pattern = r'/\* ════════════════════════════════════════\s*AUTHENTICATION LOGIC \(LocalStorage\)\s*════════════════════════════════════════ \*/.*?const originalLoadLesson = loadLesson;'

firebase_logic = '''/* ════════════════════════════════════════
   AUTHENTICATION LOGIC (Firebase)
════════════════════════════════════════ */
// Firebase Configuration (PLACEHOLDER - User must replace this)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (using compat library imported in head)
if (!window.firebase) {
  console.error("Firebase JS not loaded! Please add the Firebase CDN links to your HTML.");
} else if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = window.firebase ? firebase.auth() : null;

let currentUser = null;
let savedLessonId = null;

function updateNavAuth() {
  const nav = document.getElementById('navRight');
  if(!nav) return;
  if(currentUser) {
    const displayName = currentUser.displayName || currentUser.email.split('@')[0];
    nav.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px;">
        <span style="font-size:13px; font-weight:700; color:var(--green)">Hi, ${displayName.split(' ')[0]}</span>
        <button class="nav-btn" onclick="handleLogout()">LOGOUT</button>
        <button class="nav-btn-p" onclick="go('dashboard')">DASHBOARD</button>
      </div>
    `;
    const dbName = document.querySelector('.db-name');
    const dbEmail = document.querySelector('.db-email');
    const dbAv = document.querySelector('.db-av');
    if(dbName) dbName.innerText = displayName;
    if(dbEmail) dbEmail.innerText = currentUser.email;
    if(dbAv) dbAv.innerText = displayName.charAt(0).toUpperCase();
  } else {
    nav.innerHTML = `
      <button class="nav-btn" onclick="go('auth')" style="margin-right:6px">SIGN IN</button>
      <button class="nav-btn-p" onclick="go('auth')">GET ACCESS</button>
    `;
  }
}

function switchAuthTab(tab) {
  document.getElementById('tab-login').classList.remove('on');
  document.getElementById('tab-register').classList.remove('on');
  document.getElementById('form-login').style.display = 'none';
  document.getElementById('form-register').style.display = 'none';
  document.getElementById('auth-error').style.display = 'none';

  if(tab === 'login') {
    document.getElementById('tab-login').classList.add('on');
    document.getElementById('form-login').style.display = 'block';
    document.getElementById('auth-subtitle').innerText = "Sign in to access your courses";
  } else {
    document.getElementById('tab-register').classList.add('on');
    document.getElementById('form-register').style.display = 'block';
    document.getElementById('auth-subtitle').innerText = "Create a free account to track progress";
  }
}

function showAuthError(msg) {
  const err = document.getElementById('auth-error');
  err.innerText = msg;
  err.style.display = 'block';
}

function handleRegister() {
  if(!auth) return showAuthError("Firebase not configured! Check console.");
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const pass = document.getElementById('reg-pass').value;

  if(!name || !email || !pass) return showAuthError("Please fill all fields.");
  
  auth.createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      return userCredential.user.updateProfile({ displayName: name });
    })
    .then(() => {
      // Re-trigger updateNavAuth manually to show new display name
      updateNavAuth();
    })
    .catch((error) => {
      showAuthError(error.message);
    });
}

function handleLogin() {
  if(!auth) return showAuthError("Firebase not configured! Check console.");
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-pass').value;

  if(!email || !pass) return showAuthError("Please fill all fields.");

  auth.signInWithEmailAndPassword(email, pass)
    .catch((error) => {
      showAuthError(error.message);
    });
}

function handleLogout() {
  if(!auth) return;
  auth.signOut().then(() => {
    // Lock the current view if we are on the lesson page
    if (savedLessonId !== null) {
      loadLesson(savedLessonId);
    }
    go('home');
  });
}

function fakeSocial(platform) {
  if(!auth) return showAuthError("Firebase not configured! Check console.");
  if(platform === 'Google') {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(e => showAuthError(e.message));
  } else if (platform === 'Facebook') {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).catch(e => showAuthError(e.message));
  } else {
    showAuthError(platform + " login not implemented.");
  }
}

if(auth) {
  auth.onAuthStateChanged((user) => {
    currentUser = user;
    updateNavAuth();
    if(user) {
      if(savedLessonId !== null) {
        loadLesson(savedLessonId);
        go('lesson');
      } else if (curScreen === 'auth') {
        go('dashboard');
      }
    } else {
      if(savedLessonId !== null) {
        loadLesson(savedLessonId);
      }
    }
  });
}

const originalLoadLesson = loadLesson;'''

if re.search(pattern, content, flags=re.DOTALL):
    content = re.sub(pattern, firebase_logic, content, flags=re.DOTALL)
    
    head_injection = '''
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
</head>'''
    if 'firebase-app-compat' not in content:
        content = content.replace('</head>', head_injection)
        
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(content)
    print('SUCCESS')
else:
    print('PATTERN NOT FOUND')
