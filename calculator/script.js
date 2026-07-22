/* ===================================================
   MACX Calculator — Premium Edition
   JavaScript Logic
   =================================================== */

'use strict';

// ─── State ─────────────────────────────────────────
const state = {
  expression:   '',          // full expression string shown on display
  justEvaled:   false,       // true right after = was pressed
  scientificOn: false,
  historyOn:    false,
  history:      [],          // [{expr, result}]
};

// ─── DOM Refs ───────────────────────────────────────
const exprEl        = document.getElementById('expression');
const previewEl     = document.getElementById('result-preview');
const historyPanel  = document.getElementById('historyPanel');
const historyList   = document.getElementById('historyList');
const modeBadge     = document.getElementById('modeBadge');
const sciRow        = document.getElementById('scientificRow');
const btnAC         = document.getElementById('btnAC');

// ─── Helpers ────────────────────────────────────────
function safeEval(expr) {
  try {
    // Replace display symbols with JS operators
    const sanitized = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, Math.PI)
      .replace(/e(?![0-9])/g, Math.E);
    // Only allow safe characters
    if (/[^0-9+\-*/().%eMathsincotaglqrpu π,^]/.test(sanitized)) return null;
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + sanitized + ')')();
    if (!isFinite(result)) return null;
    // Round to 10 decimal places to avoid floating-point noise
    return parseFloat(result.toPrecision(12));
  } catch { return null; }
}

function updateDisplay() {
  const raw = state.expression || '0';
  exprEl.textContent = raw;
  exprEl.classList.remove('error', 'shrink', 'tiny');
  if (raw.length > 18) exprEl.classList.add('tiny');
  else if (raw.length > 10) exprEl.classList.add('shrink');

  // Live preview
  if (state.expression && !state.justEvaled) {
    const prev = safeEval(state.expression);
    if (prev !== null && String(prev) !== state.expression) {
      previewEl.textContent = '= ' + formatNumber(prev);
      previewEl.classList.add('has-preview');
    } else {
      previewEl.textContent = '';
      previewEl.classList.remove('has-preview');
    }
  } else {
    previewEl.textContent = '';
    previewEl.classList.remove('has-preview');
  }

  // AC vs C toggle
  btnAC.textContent = state.expression ? 'C' : 'AC';
}

function formatNumber(n) {
  if (n === null || n === undefined) return '';
  const s = String(n);
  return s;
}

function pushRipple(btn) {
  const circle = document.createElement('span');
  circle.classList.add('ripple-circle');
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 500);
}

// ─── Core Actions ───────────────────────────────────
function handleAction(action, btn) {
  if (btn) pushRipple(btn);

  // Digits 0-9, dot
  if (/^[0-9.]$/.test(action)) {
    if (state.justEvaled) { state.expression = ''; state.justEvaled = false; }
    // Prevent multiple dots in same segment
    if (action === '.') {
      const parts = state.expression.split(/[\+\-\*\/]/);
      if (parts[parts.length - 1].includes('.')) return;
    }
    state.expression += action;
    updateDisplay();
    return;
  }

  switch (action) {
    case 'ac':
      state.expression = '';
      state.justEvaled = false;
      updateDisplay();
      break;

    case 'de':  // backspace
      if (state.justEvaled) { state.expression = ''; state.justEvaled = false; }
      state.expression = state.expression.slice(0, -1);
      updateDisplay();
      break;

    case 'sign':
      if (!state.expression) break;
      if (state.expression.startsWith('-')) {
        state.expression = state.expression.slice(1);
      } else {
        state.expression = '-' + state.expression;
      }
      updateDisplay();
      break;

    case 'percent':
      if (state.expression) {
        const v = safeEval(state.expression);
        if (v !== null) {
          state.expression = String(v / 100);
          state.justEvaled = true;
          updateDisplay();
        }
      }
      break;

    case '+': case '-': case '*': case '/':
      if (!state.expression && action === '-') {
        state.expression = '-';
      } else if (state.expression) {
        // Replace trailing operator
        const last = state.expression.slice(-1);
        if (['+','-','*','/'].includes(last)) {
          state.expression = state.expression.slice(0,-1);
        }
        state.expression += action;
        state.justEvaled = false;
      }
      updateDisplay();
      break;

    case '=': {
      if (!state.expression) break;
      const result = safeEval(state.expression);
      if (result === null) {
        exprEl.classList.add('error');
        exprEl.textContent = 'Error';
        previewEl.textContent = '';
        setTimeout(() => { state.expression = ''; state.justEvaled = false; updateDisplay(); }, 1200);
        return;
      }
      const histEntry = { expr: state.expression, result: formatNumber(result) };
      state.history.unshift(histEntry);
      renderHistory();
      state.expression = String(result);
      state.justEvaled = true;
      updateDisplay();
      break;
    }

    /* ── Scientific functions ── */
    case 'sin':   applyMathFn(x => Math.sin(x * Math.PI / 180), 'sin'); break;
    case 'cos':   applyMathFn(x => Math.cos(x * Math.PI / 180), 'cos'); break;
    case 'tan':   applyMathFn(x => Math.tan(x * Math.PI / 180), 'tan'); break;
    case 'log':   applyMathFn(Math.log10, 'log'); break;
    case 'ln':    applyMathFn(Math.log, 'ln');   break;
    case 'sqrt':  applyMathFn(Math.sqrt, '√');   break;
    case 'pow2':  applyMathFn(x => x * x, 'x²'); break;
    case 'pow3':  applyMathFn(x => x * x * x, 'x³'); break;
    case 'pi':
      if (state.justEvaled) state.expression = '';
      state.expression += String(Math.PI);
      state.justEvaled = false;
      updateDisplay();
      break;
    case 'e':
      if (state.justEvaled) state.expression = '';
      state.expression += String(Math.E);
      state.justEvaled = false;
      updateDisplay();
      break;
  }
}

function applyMathFn(fn, label) {
  const v = safeEval(state.expression);
  if (v !== null) {
    const r = parseFloat(fn(v).toPrecision(10));
    const histEntry = { expr: label + '(' + state.expression + ')', result: String(r) };
    state.history.unshift(histEntry);
    renderHistory();
    state.expression = String(r);
    state.justEvaled = true;
    updateDisplay();
  }
}

// ─── History ────────────────────────────────────────
function renderHistory() {
  if (state.history.length === 0) {
    historyList.innerHTML = '<li class="history-empty">No calculations yet…</li>';
    return;
  }
  historyList.innerHTML = state.history.slice(0, 30).map((h, i) => `
    <li class="history-item" data-index="${i}">
      <div class="history-expr">${escHtml(h.expr)}</div>
      <div class="history-ans">= ${escHtml(h.result)}</div>
    </li>
  `).join('');
  historyList.querySelectorAll('.history-item').forEach(li => {
    li.addEventListener('click', () => {
      const idx = parseInt(li.dataset.index);
      state.expression = state.history[idx].result;
      state.justEvaled = true;
      updateDisplay();
    });
  });
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ─── Event Listeners ────────────────────────────────

// Button clicks
document.querySelectorAll('.btn').forEach(btn => {
  const action = btn.dataset.action;
  if (action) btn.addEventListener('click', () => handleAction(action, btn));
});

// Toggle History Panel
document.getElementById('toggleHistory').addEventListener('click', () => {
  state.historyOn = !state.historyOn;
  historyPanel.classList.toggle('hidden', !state.historyOn);
});

// Toggle Scientific Mode
document.getElementById('toggleScientific').addEventListener('click', () => {
  state.scientificOn = !state.scientificOn;
  sciRow.classList.toggle('hidden', !state.scientificOn);
  modeBadge.textContent = state.scientificOn ? 'Scientific' : 'Standard';
  modeBadge.style.color = state.scientificOn ? 'var(--accent-cyan)' : 'var(--accent-purple)';
  modeBadge.style.background = state.scientificOn ? 'rgba(34,211,238,0.12)' : 'rgba(168,85,247,0.12)';
  modeBadge.style.borderColor = state.scientificOn ? 'rgba(34,211,238,0.25)' : 'rgba(168,85,247,0.25)';
});

// Clear history
document.getElementById('clearHistory').addEventListener('click', () => {
  state.history = [];
  renderHistory();
});

// ─── Keyboard Support ───────────────────────────────
document.addEventListener('keydown', e => {
  const key = e.key;
  if ('0123456789'.includes(key))      { handleAction(key); return; }
  if (key === '.')                     { handleAction('.'); return; }
  if (key === '+')                     { handleAction('+'); return; }
  if (key === '-')                     { handleAction('-'); return; }
  if (key === '*')                     { handleAction('*'); return; }
  if (key === '/')                     { e.preventDefault(); handleAction('/'); return; }
  if (key === 'Enter' || key === '=')  { handleAction('='); return; }
  if (key === 'Backspace')             { handleAction('de'); return; }
  if (key === 'Escape')                { handleAction('ac'); return; }
  if (key === '%')                     { handleAction('percent'); return; }
});

// ─── Init ───────────────────────────────────────────
updateDisplay();
renderHistory();
