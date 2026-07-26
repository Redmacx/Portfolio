import codecs
import re

html_file = r"C:\Users\MACCIN _09\.gemini\antigravity\scratch\portfolio\codesphere\codesphere-ui-demo.html"
with codecs.open(html_file, 'r', 'utf-8') as f:
    content = f.read()

# 1. Update the nav buttons
nav_right_old = """      <div id="navRight">
        <button class="nav-btn" onclick="go('auth')" style="margin-right:6px">SIGN IN</button>
        <button class="nav-btn-p" onclick="go('auth')">GET ACCESS (FREE)</button>
      </div>"""

nav_right_new = """      <div id="navRight">
        <!-- Will be dynamically populated by JS -->
      </div>"""
content = content.replace(nav_right_old, nav_right_new)

# 2. Add auth modal UI
auth_ui_old_regex = r'<div id="screen-auth" class="screen">.*?</div>\s*<!-- ══════════════════════════════════\s*SCREEN 6: DASHBOARD'
auth_ui_new = """<div id="screen-auth" class="screen">
  <div class="auth-pg">
    <div class="auth-card" id="authCardBox">
      <div class="auth-hd">
        <div class="auth-logo">Code<span style="color:var(--green)">Sphere</span></div>
        <p style="font-size:12px; color:var(--muted); margin-top:4px;" id="auth-subtitle">Sign in to access your courses</p>
      </div>
      <div class="auth-body">
        
        <!-- Tab Toggles -->
        <div style="display:flex; border-bottom:1px solid var(--border); margin-bottom:20px;">
          <button class="cstab on" style="flex:1" id="tab-login" onclick="switchAuthTab('login')">LOGIN</button>
          <button class="cstab" style="flex:1" id="tab-register" onclick="switchAuthTab('register')">REGISTER</button>
        </div>

        <div id="form-login" style="display:block;">
          <div class="fg">
            <label class="fl">Email Address</label>
            <input class="fi" type="email" id="login-email" placeholder="user@example.com"/>
          </div>
          <div class="fg">
            <label class="fl">Password</label>
            <input class="fi" type="password" id="login-pass" placeholder="********"/>
          </div>
          <button class="btn btn-g" style="width:100%; justify-content:center; margin-top:8px;" onclick="handleLogin()">SIGN IN</button>
        </div>

        <div id="form-register" style="display:none;">
          <div class="fg">
            <label class="fl">Full Name</label>
            <input class="fi" type="text" id="reg-name" placeholder="John Doe"/>
          </div>
          <div class="fg">
            <label class="fl">Email Address</label>
            <input class="fi" type="email" id="reg-email" placeholder="john@example.com"/>
          </div>
          <div class="fg">
            <label class="fl">Password</label>
            <input class="fi" type="password" id="reg-pass" placeholder="********"/>
          </div>
          <button class="btn btn-g" style="width:100%; justify-content:center; margin-top:8px;" onclick="handleRegister()">CREATE ACCOUNT</button>
        </div>
        
        <div style="text-align:center; margin: 20px 0; color:var(--muted); font-size:12px;">OR CONTINUE WITH</div>
        
        <button class="btn btn-b" style="width:100%; justify-content:center; margin-bottom:10px; background:#1877f2; border:none; color:#fff;" onclick="fakeSocial('Facebook')">
          <svg style="width:16px;height:16px;margin-right:4px;" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          Facebook
        </button>
        <button class="btn btn-ghost" style="width:100%; justify-content:center; background:#fff; color:#000; border:none;" onclick="fakeSocial('Google')">
          <svg style="width:16px;height:16px;margin-right:4px;" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Google / Email
        </button>
        
        <div id="auth-error" style="color:var(--red); font-size:12px; margin-top:12px; text-align:center; display:none;"></div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════
     SCREEN 6: DASHBOARD"""

content = re.sub(auth_ui_old_regex, auth_ui_new, content, flags=re.DOTALL)


# 3. Safe override of loadLesson
js_injection = """
/* ════════════════════════════════════════
   AUTHENTICATION LOGIC (LocalStorage)
════════════════════════════════════════ */
let currentUser = JSON.parse(localStorage.getItem('codesphereUser')) || null;
let savedLessonId = null;

function updateNavAuth() {
  const nav = document.getElementById('navRight');
  if(currentUser) {
    nav.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px;">
        <span style="font-size:13px; font-weight:700; color:var(--green)">Hi, ${currentUser.name.split(' ')[0]}</span>
        <button class="nav-btn" onclick="handleLogout()">LOGOUT</button>
        <button class="nav-btn-p" onclick="go('dashboard')">DASHBOARD</button>
      </div>
    `;
    const dbName = document.querySelector('.db-name');
    const dbEmail = document.querySelector('.db-email');
    const dbAv = document.querySelector('.db-av');
    if(dbName) dbName.innerText = currentUser.name;
    if(dbEmail) dbEmail.innerText = currentUser.email;
    if(dbAv) dbAv.innerText = currentUser.name.charAt(0).toUpperCase();
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
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const pass = document.getElementById('reg-pass').value;

  if(!name || !email || !pass) return showAuthError("Please fill all fields.");
  
  let users = JSON.parse(localStorage.getItem('codesphereUsers')) || [];
  if(users.find(u => u.email === email)) {
    return showAuthError("Email already registered. Please login.");
  }

  const newUser = { name, email, pass };
  users.push(newUser);
  localStorage.setItem('codesphereUsers', JSON.stringify(users));
  
  currentUser = newUser;
  localStorage.setItem('codesphereUser', JSON.stringify(currentUser));
  updateNavAuth();
  
  if(savedLessonId !== null) {
    loadLesson(savedLessonId);
    go('lesson');
  } else {
    go('dashboard');
  }
}

function handleLogin() {
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-pass').value;

  if(!email || !pass) return showAuthError("Please fill all fields.");

  let users = JSON.parse(localStorage.getItem('codesphereUsers')) || [];
  const user = users.find(u => u.email === email && u.pass === pass);
  
  if(!user) return showAuthError("Invalid email or password.");

  currentUser = user;
  localStorage.setItem('codesphereUser', JSON.stringify(currentUser));
  updateNavAuth();

  if(savedLessonId !== null) {
    loadLesson(savedLessonId);
    go('lesson');
  } else {
    go('dashboard');
  }
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('codesphereUser');
  updateNavAuth();
  // Lock the current view if we are on the lesson page
  if (savedLessonId !== null) {
    loadLesson(savedLessonId);
  }
  go('home');
}

function fakeSocial(platform) {
  const fakeEmail = "user_" + Math.floor(Math.random()*1000) + "@" + platform.replace(/[^a-zA-Z]/g,'').toLowerCase() + ".com";
  currentUser = { name: platform + " User", email: fakeEmail };
  localStorage.setItem('codesphereUser', JSON.stringify(currentUser));
  updateNavAuth();
  if(savedLessonId !== null) {
    loadLesson(savedLessonId);
    go('lesson');
  } else {
    go('dashboard');
  }
}

const originalLoadLesson = loadLesson;
loadLesson = function(lessonId) {
  savedLessonId = lessonId;
  
  // 1. Ensure locked panel element exists
  let lockedPanel = document.getElementById('locked-panel');
  if(!lockedPanel) {
    lockedPanel = document.createElement('div');
    lockedPanel.id = 'locked-panel';
    lockedPanel.style.display = 'none';
    lockedPanel.innerHTML = `
      <div style="background:var(--bg2); border:1px solid var(--border); padding:60px 20px; text-align:center; border-radius:6px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); margin-top:18px;">
        <div style="font-size:54px; margin-bottom:16px;">&#128274;</div>
        <h2 style="margin-bottom:12px; font-family:var(--forb); font-size:24px;">Lesson Locked</h2>
        <p style="color:var(--text-sub); margin-bottom:24px; font-size:15px; max-width:400px; margin-left:auto; margin-right:auto;">You need an account to view this course video, read the notes, and take the quiz.</p>
        <button class="btn btn-g" style="padding: 14px 30px; font-size:16px;" onclick="go('auth')">SIGN IN OR REGISTER TO UNLOCK</button>
      </div>
    `;
    const ltabs = document.querySelector('.ltabs');
    if (ltabs) {
      ltabs.parentNode.insertBefore(lockedPanel, ltabs.nextSibling);
    }
  }

  const panelVid = document.getElementById('lpanel-vid');
  const panelRead = document.getElementById('lpanel-read');
  const panelQuiz = document.getElementById('lpanel-quiz');
  const ltabs = document.querySelector('.ltabs');

  if(!currentUser) {
    // Show locked state
    document.getElementById('ls-header-tag').innerText = `ACCESS RESTRICTED // PLEASE LOGIN`;
    document.getElementById('ls-title').innerText = "Members Only Content &#128274;";
    
    // Hide real panels and tabs, show lock
    if(lockedPanel) lockedPanel.style.display = 'block';
    if(ltabs) ltabs.style.display = 'none';
    
    if(panelVid) panelVid.classList.remove('on');
    if(panelRead) panelRead.classList.remove('on');
    if(panelQuiz) panelQuiz.classList.remove('on');
    
    // Stop any playing video
    const vidIframe = document.getElementById('vid-iframe');
    if (vidIframe) vidIframe.src = "";
    
    // Highlight sidebar
    document.querySelectorAll('.ls-item').forEach(e => e.classList.remove('on'));
    const sidebarItem = document.getElementById(`side-ls-${lessonId}`);
    if(sidebarItem) sidebarItem.classList.add('on');
    return;
  }
  
  // If logged in: restore UI state and call original
  if(lockedPanel) lockedPanel.style.display = 'none';
  if(ltabs) ltabs.style.display = 'flex';
  
  ltab(0); // Show video tab
  originalLoadLesson(lessonId);
};

// Initialize nav
setTimeout(updateNavAuth, 100);

// Re-evaluate the initial lesson load to apply the lock if needed!
if (typeof currentLesson !== 'undefined' && currentLesson) {
  loadLesson(currentLesson.id);
}
</script>"""

content = content.replace("</script>", js_injection)

with codecs.open(html_file, 'w', 'utf-8') as f:
    f.write(content)

print("Auth script applied successfully!")
