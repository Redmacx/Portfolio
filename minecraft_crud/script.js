/* =====================================================
   MINECRAFT CRUD — SCRIPT.JS
   Interactive LocalStorage & GUI Manager
   ===================================================== */

const STORAGE_KEY = 'maccin_minecraft_books';

// Initial Default Minecraft Books Data
const defaultBooks = [
  { id: 1, name: "Enchanting Secrets", author: "Notch", category: "Enchanting", rarity: "Legendary" },
  { id: 2, name: "Redstone Wiring 101", author: "Jeb", category: "Redstone", rarity: "Epic" },
  { id: 3, name: "Nether Survival Guide", author: "Alex", category: "Survival", rarity: "Rare" },
  { id: 4, name: "Building Epic Castles", author: "Steve", category: "Crafting", rarity: "Common" },
  { id: 5, name: "Dragon Defeat Tactics", author: "Herobrine", category: "Lore & Story", rarity: "Legendary" }
];

let books = [];

// Initialize Data
function loadBooks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      books = JSON.parse(saved);
    } catch(e) {
      books = [...defaultBooks];
    }
  } else {
    books = [...defaultBooks];
    saveBooks();
  }
  renderBooks();
}

function saveBooks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// Render Table Rows
function renderBooks(filteredList = null) {
  const list = filteredList || books;
  const tbody = document.getElementById('bookTableBody');
  tbody.innerHTML = '';

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px; color: #ff5555;">Empty Chest! No Minecraft books found.</td></tr>`;
  } else {
    list.forEach((book, index) => {
      const tr = document.createElement('tr');
      
      let rarityClass = 'badge-common';
      if (book.rarity === 'Rare') rarityClass = 'badge-rare';
      if (book.rarity === 'Epic') rarityClass = 'badge-epic';
      if (book.rarity === 'Legendary') rarityClass = 'badge-legendary';

      tr.innerHTML = `
        <td>#${index + 1}</td>
        <td><strong>📚 ${escapeHtml(book.name)}</strong></td>
        <td>✍️ ${escapeHtml(book.author)}</td>
        <td class="mc-category">${escapeHtml(book.category || 'General')}</td>
        <td><span class="mc-badge ${rarityClass}">${escapeHtml(book.rarity || 'Common')}</span></td>
        <td>
          <button class="mc-btn mc-btn-sm mc-btn-green" onclick="openEditModal(${book.id})">✏️ Edit</button>
          <button class="mc-btn mc-btn-sm mc-btn-red" onclick="deleteBook(${book.id})">🗑️ Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Update XP Level Bar
  const xpFill = document.getElementById('xpFill');
  const xpText = document.getElementById('xpText');
  const count = books.length;
  const fillPct = Math.min(100, count * 15);
  
  if (xpFill) xpFill.style.width = `${fillPct}%`;
  if (xpText) xpText.textContent = `Level ${30 + count * 5} · ${count} Book${count === 1 ? '' : 's'} Stored in Chest`;
}

// Play Minecraft Click Sound FX
function playClickSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch(e) {}
}

// Modal Handlers
function openAddModal() {
  playClickSound();
  document.getElementById('editBookId').value = '';
  document.getElementById('bookNameInput').value = '';
  document.getElementById('authorInput').value = '';
  document.getElementById('categoryInput').value = 'Enchanting';
  document.getElementById('rarityInput').value = 'Common';
  document.getElementById('modalTitle').textContent = '📖 ADD BOOK INFORMATION';
  document.getElementById('saveBtn').textContent = 'Submit';
  document.getElementById('bookModal').classList.add('open');
}

function openEditModal(id) {
  playClickSound();
  const book = books.find(b => b.id === id);
  if (!book) return;

  document.getElementById('editBookId').value = book.id;
  document.getElementById('bookNameInput').value = book.name;
  document.getElementById('authorInput').value = book.author;
  document.getElementById('categoryInput').value = book.category || 'Enchanting';
  document.getElementById('rarityInput').value = book.rarity || 'Common';
  document.getElementById('modalTitle').textContent = '✏️ UPDATE BOOK INFORMATION';
  document.getElementById('saveBtn').textContent = 'Update';
  document.getElementById('bookModal').classList.add('open');
}

function closeBookModal() {
  playClickSound();
  document.getElementById('bookModal').classList.remove('open');
}

// Handle Add / Edit Submit
function handleFormSubmit(e) {
  e.preventDefault();
  playClickSound();

  const editId = document.getElementById('editBookId').value;
  const name = document.getElementById('bookNameInput').value.trim();
  const author = document.getElementById('authorInput').value.trim();
  const category = document.getElementById('categoryInput').value;
  const rarity = document.getElementById('rarityInput').value;

  if (!name || !author) return;

  if (editId) {
    // Update existing
    const index = books.findIndex(b => b.id == editId);
    if (index !== -1) {
      books[index] = { id: Number(editId), name, author, category, rarity };
    }
  } else {
    // Add new
    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    books.push({ id: newId, name, author, category, rarity });
  }

  saveBooks();
  renderBooks();
  closeBookModal();
}

// Delete Book
function deleteBook(id) {
  playClickSound();
  if (confirm('Are you sure you want to discard this book into lava?')) {
    books = books.filter(b => b.id !== id);
    saveBooks();
    renderBooks();
  }
}

// Search Filter
function filterBooks() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = books.filter(b => 
    b.name.toLowerCase().includes(query) || 
    b.author.toLowerCase().includes(query) ||
    (b.category && b.category.toLowerCase().includes(query))
  );
  renderBooks(filtered);
}

// Reset Default Data
function resetDefaultData() {
  playClickSound();
  if (confirm('Reset inventory back to default Minecraft books?')) {
    books = [...defaultBooks];
    saveBooks();
    renderBooks();
  }
}

// PHP Inspector Modal & Tabs
function togglePhpModal() {
  playClickSound();
  document.getElementById('phpModal').classList.toggle('open');
}

function showTab(tabId, btn) {
  playClickSound();
  const tabs = document.querySelectorAll('.mc-tab-btn');
  const contents = document.querySelectorAll('.mc-tab-content');

  tabs.forEach(t => t.classList.remove('active'));
  contents.forEach(c => c.classList.remove('active'));

  btn.classList.add('active');
  document.getElementById(`tab_${tabId}`).classList.add('active');
}

// Helper XSS Escape
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Initial Load
document.addEventListener('DOMContentLoaded', loadBooks);
