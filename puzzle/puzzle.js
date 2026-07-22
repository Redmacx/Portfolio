/* =====================================================
   PUZZLE.JS — Custom Jigsaw Puzzle Logic
   ===================================================== */

const board = document.getElementById('puzzle-board');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const gridStatus = document.getElementById('grid-status');
const dropzone = document.getElementById('dropzone');
const successModal = document.getElementById('successModal');
const modalTime = document.getElementById('modal-time');
const modalMoves = document.getElementById('modal-moves');

// Game state variables
let time = 0;
let moves = 0;
let timerInterval;
let gridSize = 3; // default: 3x3
let totalBoardWidth = 450; // pixels
let currentImage = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop'; // high-quality default music/neon theme

// Track dragged elements
let draggedPiece = null;

// Initialize drag events for Dropzone
['dragenter', 'dragover'].forEach(eventName => {
  dropzone.addEventListener(eventName, (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  }, false);
});
['dragleave', 'drop'].forEach(eventName => {
  dropzone.addEventListener(eventName, (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
  }, false);
});
dropzone.addEventListener('drop', (e) => {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFileUpload(files);
});

// Start/Stop Timer
function startTimer() {
  time = 0;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    time++;
    timerDisplay.textContent = `${time}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Fisher-Yates shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate the puzzle board
function createPuzzle(imageURL) {
  board.innerHTML = '';
  moves = 0;
  movesDisplay.textContent = moves;
  gridStatus.textContent = `${gridSize}x3`.replace('3', gridSize); // update visual size status

  // Apply board size and columns dynamically based on gridSize
  board.style.width = `${totalBoardWidth}px`;
  board.style.height = `${totalBoardWidth}px`;
  board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  const pieceSize = totalBoardWidth / gridSize;

  // Build target grid indices
  let originalPositions = [];
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      originalPositions.push({ row: r, col: c });
    }
  }

  // Shuffle positions
  let shuffledPositions = shuffleArray([...originalPositions]);

  // Keep shuffling until it's not solved initially
  while (isSolved(shuffledPositions)) {
    shuffledPositions = shuffleArray([...originalPositions]);
  }

  shuffledPositions.forEach((pos, idx) => {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.width = `${pieceSize}px`;
    piece.style.height = `${pieceSize}px`;
    piece.style.backgroundImage = `url('${imageURL}')`;
    piece.style.backgroundSize = `${totalBoardWidth}px ${totalBoardWidth}px`;
    piece.style.backgroundPosition = `-${pos.col * pieceSize}px -${pos.row * pieceSize}px`;
    
    // Dataset markers
    piece.dataset.correctIndex = pos.row * gridSize + pos.col;
    piece.dataset.currentIndex = idx;

    // Make pieces draggable
    piece.draggable = true;
    piece.addEventListener('dragstart', dragStart);
    piece.addEventListener('dragover', dragOver);
    piece.addEventListener('dragenter', dragEnter);
    piece.addEventListener('dragleave', dragLeave);
    piece.addEventListener('drop', dropPiece);
    piece.addEventListener('dragend', dragEnd);

    // Mobile touch support
    piece.addEventListener('touchstart', handleTouchStart, { passive: true });
    piece.addEventListener('touchmove', handleTouchMove, { passive: false });
    piece.addEventListener('touchend', handleTouchEnd);

    board.appendChild(piece);
  });

  startTimer();
}

function isSolved(positions) {
  return positions.every((pos, idx) => {
    const correctIdx = pos.row * gridSize + pos.col;
    return correctIdx === idx;
  });
}

// Drag & Drop event functions
function dragStart(e) {
  draggedPiece = this;
  setTimeout(() => this.classList.add('dragging'), 0);
}

function dragEnd() {
  this.classList.remove('dragging');
  draggedPiece = null;
  
  // Clean up any remaining drag-over borders
  const pieces = board.querySelectorAll('.piece');
  pieces.forEach(p => p.classList.remove('drag-over'));
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('drag-over');
}

function dragLeave() {
  this.classList.remove('drag-over');
}

function dropPiece(e) {
  e.preventDefault();
  this.classList.remove('drag-over');

  if (draggedPiece && draggedPiece !== this) {
    swapPieces(draggedPiece, this);
    
    moves++;
    movesDisplay.textContent = moves;

    if (checkWin()) {
      stopTimer();
      showSuccessModal();
    }
  }
}

// Safe, clean DOM swap function
function swapPieces(el1, el2) {
  const parent = el1.parentNode;
  
  // Track indexes
  const tempIdx = el1.dataset.currentIndex;
  el1.dataset.currentIndex = el2.dataset.currentIndex;
  el2.dataset.currentIndex = tempIdx;

  // Swap positions in DOM
  const temp = document.createElement('div');
  parent.insertBefore(temp, el1);
  parent.insertBefore(el1, el2);
  parent.insertBefore(el2, temp);
  parent.removeChild(temp);
}

// Touch support for mobile devices
let touchStartElement = null;

function handleTouchStart(e) {
  touchStartElement = this;
}

function handleTouchMove(e) {
  e.preventDefault(); // prevent scrolling
}

function handleTouchEnd(e) {
  if (!touchStartElement) return;

  const changedTouch = e.changedTouches[0];
  const targetElement = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);

  if (targetElement && targetElement.classList.contains('piece') && targetElement !== touchStartElement) {
    swapPieces(touchStartElement, targetElement);
    moves++;
    movesDisplay.textContent = moves;

    if (checkWin()) {
      stopTimer();
      showSuccessModal();
    }
  }
  touchStartElement = null;
}

// Check win state
function checkWin() {
  const pieces = Array.from(board.children);
  return pieces.every(piece => {
    return Number(piece.dataset.correctIndex) === Number(piece.dataset.currentIndex);
  });
}

// Change difficulty / size
function changeGridSize(size, btn) {
  // Update active state class on buttons
  const buttons = document.querySelectorAll('.diff-btn');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  gridSize = size;
  resetGame();
}

// Handle File upload
function handleFileUpload(files) {
  if (files && files[0]) {
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file!');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      currentImage = e.target.result;
      resetGame();
    };
    reader.readAsDataURL(file);
  }
}

// Load from URL
function loadNewImage() {
  const url = document.getElementById('imageURL').value.trim();
  if (url) {
    currentImage = url;
    resetGame();
  } else {
    alert("Please enter a valid image URL!");
  }
}

// Restart game helper
function resetGame() {
  stopTimer();
  createPuzzle(currentImage);
}

// Modals
function showSuccessModal() {
  modalTime.textContent = `${time}s`;
  modalMoves.textContent = moves;
  successModal.classList.add('open');
}

function closeModal() {
  successModal.classList.remove('open');
  resetGame();
}

// Initial build
createPuzzle(currentImage);
