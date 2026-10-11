/**
 * LESSON 1: शरीरसम्बन्धि-शब्दाः (Parts of the Body)
 * Built on the Cambridge CELTA / Direct Method PPP (Presentation -> Practice -> Production) framework.
 * Pure visual association (Picture <-> Sanskrit stem word):
 * - No grammatical gender mention or case endings (pure stems: नयन, नासिका, जिह्वा, कर्ण, शीर्ष, ललाट, भ्रू, ओष्ठ, कर, पाद, दन्त, अङ्गुली)
 * - No Russian or English word translations anywhere (100% Direct Method via illustrations & sound)
 * - IAST disabled by default, with a toggle button to enable/disable IAST
 * - Includes dedicated "Covered by Square (■)" game where part of the word is hidden under a pink square and the learner guesses the whole word.
 */

const bodyPartsVocab = [
  {
    id: 'nayana',
    deva: 'नयन',
    iast: 'nayana',
    ttsText: 'नयना',
    typoDeva: 'नयान',
    typoIast: 'nayāna',
    maskedPrefix: 'नय',
    maskedHidden: 'न',
    missingDisplay: 'न _ न',
    missingAnswer: 'य',
    missingChoices: ['य', 'व', 'प', 'म'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M12 52C24 32 40 26 50 26C60 26 76 32 88 52C76 68 60 74 50 74C40 74 24 68 12 52Z" fill="#FFFFFF" stroke="#14213D" stroke-width="3.5"/>
      <circle cx="50" cy="50" r="15" fill="#1D4ED8" stroke="#14213D" stroke-width="2.5"/>
      <circle cx="50" cy="50" r="7.5" fill="#0F172A"/>
      <circle cx="44" cy="44" r="3.2" fill="#FFFFFF"/>
      <path d="M22 36L17 28M35 28L33 19M50 25V16M65 28L67 19M78 36L83 28" stroke="#14213D" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'nasika',
    deva: 'नासिका',
    iast: 'nāsikā',
    ttsText: 'नासिका',
    typoDeva: 'नसिका',
    typoIast: 'nasikā',
    maskedPrefix: 'नासि',
    maskedHidden: 'का',
    missingDisplay: 'ना _ का',
    missingAnswer: 'सि',
    missingChoices: ['सि', 'शि', 'पि', 'ति'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M46 18C45 35 35 55 29 66C25 74 32 81 41 79C46 78 48 80 50 80C52 80 54 78 59 79C68 81 75 74 71 66C65 55 55 35 54 18" fill="#F4C7AB" stroke="#14213D" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="41" cy="73" rx="4.5" ry="2.6" fill="#14213D"/>
      <ellipse cx="59" cy="73" rx="4.5" ry="2.6" fill="#14213D"/>
    </svg>`
  },
  {
    id: 'jihva',
    deva: 'जिह्वा',
    iast: 'jihvā',
    ttsText: 'जिह्वा',
    typoDeva: 'जिह्व',
    typoIast: 'jihva',
    maskedPrefix: 'जि',
    maskedHidden: 'ह्वा',
    missingDisplay: 'जि _',
    missingAnswer: 'ह्वा',
    missingChoices: ['ह्वा', 'ह्मा', 'ह्या', 'ह्रा'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M22 36C34 28 66 28 78 36C74 52 66 58 50 58C34 58 26 52 22 36Z" fill="#7F1D1D" stroke="#14213D" stroke-width="3"/>
      <path d="M32 39H68L65 65C64 78 56 85 50 85C44 85 36 78 35 65L32 39Z" fill="#FB7185" stroke="#14213D" stroke-width="3.2"/>
      <path d="M50 42V74" stroke="#BE123C" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'karna',
    deva: 'कर्ण',
    iast: 'karṇa',
    ttsText: 'कर्णा',
    typoDeva: 'कर्न',
    typoIast: 'karna',
    maskedPrefix: 'क',
    maskedHidden: 'र्ण',
    missingDisplay: 'क _',
    missingAnswer: 'र्ण',
    missingChoices: ['र्ण', 'र्म', 'र्य', 'र्त'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M35 30C35 16 68 14 70 38C72 56 60 64 56 75C52 84 36 82 36 70" fill="#F4C7AB" stroke="#14213D" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M44 35C46 25 60 26 60 40C60 50 51 54 49 62" stroke="#14213D" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="45" cy="54" r="4" fill="#14213D"/>
    </svg>`
  },
  {
    id: 'shirsha',
    deva: 'शीर्ष',
    iast: 'śīrṣa',
    ttsText: 'शीर्षा',
    typoDeva: 'शिर्ष',
    typoIast: 'śirṣa',
    maskedPrefix: 'शी',
    maskedHidden: 'र्ष',
    missingDisplay: 'शी _',
    missingAnswer: 'र्ष',
    missingChoices: ['र्ष', 'र्स', 'र्श', 'र्ण'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#2B5B6C"/>
      <path d="M26 88C28 75 36 70 50 70C64 70 72 75 74 88" fill="#F59E0B" stroke="#14213D" stroke-width="2.8"/>
      <ellipse cx="50" cy="48" rx="20" ry="23" fill="#F4C7AB" stroke="#14213D" stroke-width="3"/>
      <path d="M29 44C28 25 40 19 52 20C64 20 72 28 71 44C66 35 58 32 48 33C38 33 33 38 29 44Z" fill="#1E293B"/>
      <circle cx="43" cy="48" r="2.2" fill="#14213D"/>
      <circle cx="57" cy="48" r="2.2" fill="#14213D"/>
      <path d="M44 59C48 62 52 62 56 59" stroke="#14213D" stroke-width="2.3" stroke-linecap="round"/>
      <path d="M50 8V17M45 13L50 18L55 13" stroke="#FEF08A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 'lalata',
    deva: 'ललाट',
    iast: 'lalāṭa',
    ttsText: 'ललाटा',
    typoDeva: 'ललट',
    typoIast: 'lalaṭa',
    maskedPrefix: 'लला',
    maskedHidden: 'ट',
    missingDisplay: 'ल _ ट',
    missingAnswer: 'ला',
    missingChoices: ['ला', 'ली', 'लो', 'ले'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#E0F2FE"/>
      <ellipse cx="50" cy="54" rx="23" ry="26" fill="#F4C7AB" stroke="#14213D" stroke-width="3"/>
      <path d="M27 46C27 26 40 20 50 20C60 20 73 26 73 46C66 36 34 36 27 46Z" fill="#1E293B"/>
      <rect x="35" y="37" width="30" height="11" rx="5.5" fill="#FEF08A" stroke="#DC2626" stroke-width="2.2"/>
      <circle cx="42" cy="57" r="2.3" fill="#14213D"/>
      <circle cx="58" cy="57" r="2.3" fill="#14213D"/>
    </svg>`
  },
  {
    id: 'bhru',
    deva: 'भ्रू',
    iast: 'bhrū',
    ttsText: 'भ्रू',
    typoDeva: 'भ्रु',
    typoIast: 'bhru',
    maskedPrefix: 'भ्र',
    maskedHidden: 'ू',
    missingDisplay: '_ → भ्रू',
    missingAnswer: 'भ्रू',
    missingChoices: ['भ्रू', 'भ्रि', 'भ्रा', 'भ्रे'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M16 42C30 27 64 25 84 39C70 34 34 35 16 42Z" fill="#1E293B" stroke="#14213D" stroke-width="4" stroke-linecap="round"/>
      <path d="M22 62C34 50 66 50 78 62C66 72 34 72 22 62Z" fill="#FFFFFF" stroke="#14213D" stroke-width="2.6"/>
      <circle cx="50" cy="62" r="8" fill="#334155"/>
      <path d="M50 15V25M45 21L50 26L55 21" stroke="#DC2626" stroke-width="2.6" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'ostha',
    deva: 'ओष्ठ',
    iast: 'oṣṭha',
    ttsText: 'ओष्ठा',
    typoDeva: 'ओष्ट',
    typoIast: 'oṣṭa',
    maskedPrefix: 'ओ',
    maskedHidden: 'ष्ठ',
    missingDisplay: 'ओ _',
    missingAnswer: 'ष्ठ',
    missingChoices: ['ष्ठ', 'ष्ट', 'ष्ण', 'स्म'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M16 50C26 36 42 36 50 43C58 36 74 36 84 50C68 53 32 53 16 50Z" fill="#E11D48" stroke="#14213D" stroke-width="3"/>
      <path d="M16 50C30 70 70 70 84 50C66 53 34 53 16 50Z" fill="#FB7185" stroke="#14213D" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'kara',
    deva: 'कर',
    iast: 'kara',
    ttsText: 'करा',
    typoDeva: 'कार',
    typoIast: 'kāra',
    maskedPrefix: 'क',
    maskedHidden: 'र',
    missingDisplay: 'क _',
    missingAnswer: 'र',
    missingChoices: ['र', 'ल', 'न', 'म'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#FFFFFF"/>
      <path d="M42 88V54L30 42C27 39 31 35 35 38L42 45V22C42 18 47 18 47 22V40V16C47 12 53 12 53 16V40V19C53 15 58 15 58 19V42V26C58 22 63 22 63 26V56L58 88H42Z" fill="#F3C6A8" stroke="#14213D" stroke-width="2.8" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 'pada',
    deva: 'पाद',
    iast: 'pāda',
    ttsText: 'पादा',
    typoDeva: 'पद',
    typoIast: 'pada',
    maskedPrefix: 'पा',
    maskedHidden: 'द',
    missingDisplay: 'पा _',
    missingAnswer: 'द',
    missingChoices: ['द', 'त', 'प', 'ब'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#FFFFFF"/>
      <path d="M44 16H62L58 64C58 72 64 78 56 82C46 86 26 84 26 77C26 72 38 69 42 62L44 16Z" fill="#F3C6A8" stroke="#14213D" stroke-width="3" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 'danta',
    deva: 'दन्त',
    iast: 'danta',
    ttsText: 'दन्ता',
    typoDeva: 'दान्त',
    typoIast: 'dānta',
    maskedPrefix: 'द',
    maskedHidden: 'न्त',
    missingDisplay: 'द _ त',
    missingAnswer: 'न्',
    missingChoices: ['न्', 'म्', 'र्', 'ल्'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#1E293B"/>
      <path d="M28 32C28 20 42 18 50 24C58 18 72 20 72 32C72 48 66 56 64 76C63 83 56 83 54 72C52 63 48 63 46 72C44 83 37 83 36 76C34 56 28 48 28 32Z" fill="#FFFBEB" stroke="#14213D" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'anguli',
    deva: 'अङ्गुली',
    iast: 'aṅgulī',
    ttsText: 'अङ्गुली',
    typoDeva: 'अङ्गुलि',
    typoIast: 'aṅguli',
    maskedPrefix: 'अङ्गु',
    maskedHidden: 'ली',
    missingDisplay: 'अ _ ली',
    missingAnswer: 'ङ्गु',
    missingChoices: ['ङ्गु', 'म्बु', 'न्दु', 'ञ्जु'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M18 76L58 26C64 19 76 26 70 36L38 84Z" fill="#F3C6A8" stroke="#14213D" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="64" cy="29" rx="5" ry="6" transform="rotate(-38 64 29)" fill="#FDE2E4" stroke="#14213D" stroke-width="2"/>
    </svg>`
  }
];

// Lesson 1 State
let labelsHidden = false;
let posterMaskedMode = false; // Whether the 12-card Presentation poster has pink squares covering word endings
let posterRevealedIds = new Set();
let iastHidden = true;
let currentPracticeGame = 'flashcards';

// Game 1: Flashcards state
let fcIndex = 0;
let fcFlipped = false;
let fcScore = 0;
let fcFinished = false;

// Game 2: Masked Square Game State ("часть слова закрыта квадратом и надо отгадать все слово")
let maskedModeView = 'card'; // 'card' | 'grid'
let msIndex = 0;
let msScore = 0;
let msAnswered = false;
let msFinished = false;
let msGridRevealed = new Set();

// Game 3: Fill in the Gaps state
let gapIndex = 0;
let gapScore = 0;
let gapAnswered = false;
let gapFirstTry = true;
let gapFinished = false;

// Game 4: Picture Quiz state
let pqIndex = 0;
let pqScore = 0;
let pqAnswered = false;
let pqFirstTry = true;
let pqFinished = false;

// Game 5: Word -> Picture Quiz state
let wqIndex = 0;
let wqScore = 0;
let wqAnswered = false;
let wqFirstTry = true;
let wqFinished = false;

// Game 6: Match Pairs (3 stages x 4 pairs = 12 pairs total) state
let matchOrderedVocab = [];
let matchStage = 0; // 0, 1, 2 (each stage has 4 pairs = 12 words total)
let matchTiles = [];
let matchFirstIdx = null;
let matchMatchedCount = 0;
let matchScore = 12;
let matchFailedPairIds = new Set();
let matchFinished = false;

// Game 7: Classic Memory (Face-down Pairs) state
let memoryCards = [];
let memoryPairGoal = 6; // 6 pairs (12 cards) or 12 pairs (24 cards)
let memoryFlippedIndices = [];
let memoryMatchedPairs = 0;
let memoryMoves = 0;
let memoryScore = 6;
let memorySeenPairIds = new Set();
let memoryFailedPairIds = new Set();
let memoryLock = false;

// Game 8: Spot the Wrong Label (3 Pictures, 1 Wrong Label, 12 Rounds) state
let wlIndex = 0;
let wlScore = 0;
let wlAnswered = false;
let wlFirstTry = true;
let wlFinished = false;
let wlCards = [];

// Game 9: Spot the Single-Letter Typo (3 Pictures, 1 Word has a 1-letter spelling error, 12 Rounds) state
let typoIndex = 0;
let typoScore = 0;
let typoAnswered = false;
let typoFirstTry = true;
let typoFinished = false;
let typoCards = [];

// Game 10: Spelling / Missing Letters state
let spIndex = 0;
let spScore = 0;
let spAnswered = false;
let spFirstTry = true;
let spFinished = false;

// Game 11: True or False ("आम् / न") state
let tfIndex = 0;
let tfScore = 0;
let tfIsTrue = true;
let tfDisplayedWordIdx = 0;
let tfAnswered = false;
let tfFinished = false;

// Production state: track which of the 12 words the student has spoken
let producedWordsSet = new Set(['nayana']);
let activeProdWordId = 'nayana';

// Audio Speech Helper (Web Speech API — pronounces pure stem without case/gender endings)
function speakSanskritWord(devaText) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(devaText);
    const voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
    const saVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('sa'));
    const hiVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('hi'));
    if (saVoice) {
      utter.voice = saVoice;
      utter.lang = saVoice.lang;
    } else if (hiVoice) {
      utter.voice = hiVoice;
      utter.lang = 'hi-IN';
    } else {
      utter.lang = 'hi-IN';
    }
    utter.rate = 0.85;
    window.speechSynthesis.speak(utter);
  }
}

// Unified Final Score Screen ("например 10 из 12 правильно и кнопка начать сначала")
function renderFinalScoreScreen(arena, title, score, total, restartFnCall, extraLine = '') {
  const scoreLabel = currentLang === 'ru'
    ? `${score} из ${total} правильно`
    : `${score} out of ${total} correct`;
  const startOverLabel = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';

  arena.innerHTML = `
    <div class="game-top-bar">
      <div><strong style="font-size:1.05rem;">${title}</strong></div>
      <span class="game-score-pill">${score} / ${total}</span>
    </div>
    <div style="text-align:center;padding:2.5rem 1.5rem;background:var(--bg-primary);border-radius:16px;border:1.5px solid var(--border-strong);">
      <div style="font-size:2.75rem;margin-bottom:0.5rem;">🏆</div>
      <div style="font-size:1.6rem;font-weight:800;color:var(--text-primary);margin-bottom:0.35rem;">
        ${scoreLabel}
      </div>
      ${extraLine ? `<div style="font-size:0.92rem;color:var(--text-secondary);margin-bottom:0.4rem;">${extraLine}</div>` : ''}
      <div style="font-size:0.9rem;color:var(--accent-cambridge);font-weight:700;margin-bottom:1.35rem;">
        ${Math.round((score / total) * 100)}%
      </div>
      <button type="button" class="btn btn-primary" onclick="${restartFnCall}">
        ${startOverLabel}
      </button>
    </div>
  `;
}

// Helper to render a word with its second part covered by a pink square (like in the user's screenshot)
function renderMaskedWordMarkup(item, isRevealed, fontSize = '1.65rem') {
  if (isRevealed) {
    return `<div class="vocab-deva" style="font-size:${fontSize};color:#15803d;">${item.deva}</div>`;
  }
  return `
    <div class="masked-word-line" style="font-size:${fontSize};">
      <span>${item.maskedPrefix}</span><span class="pink-mask-square">${item.maskedHidden}</span>
    </div>
  `;
}

// 1. Render Stage 1: PRESENTATION (3x4 Chart — pure Picture + Sanskrit, zero translations)
function renderPresentationStage() {
  const gridEl = document.getElementById('lesson1-vocab-grid');
  if (!gridEl) return;

  gridEl.classList.toggle('labels-hidden', labelsHidden);

  gridEl.innerHTML = bodyPartsVocab.map(item => {
    const isRev = posterRevealedIds.has(item.id);
    const wordHtml = posterMaskedMode
      ? renderMaskedWordMarkup(item, isRev, '1.55rem')
      : `<div class="vocab-deva">${item.deva}</div>`;

    return `
      <div class="vocab-item-card" onclick="handlePosterCardClick('${item.id}', '${item.ttsText}')">
        <button type="button" class="vocab-audio-btn" title="🔊" onclick="event.stopPropagation(); speakSanskritWord('${item.ttsText}')">🔊</button>
        <div class="vocab-svg-box">${item.svg}</div>
        ${wordHtml}
        <div class="vocab-iast">${item.iast}</div>
      </div>
    `;
  }).join('');

  const toggleBtn = document.getElementById('toggle-labels-btn');
  if (toggleBtn) {
    if (labelsHidden) {
      toggleBtn.innerText = currentLang === 'ru' ? '👁 Показать подписи' : '👁 Show Labels';
      toggleBtn.classList.add('active');
    } else {
      toggleBtn.innerText = currentLang === 'ru' ? '🙈 Скрыть подписи' : '🙈 Hide Labels';
      toggleBtn.classList.remove('active');
    }
  }

  const maskPosterBtn = document.getElementById('toggle-poster-mask-btn');
  if (maskPosterBtn) {
    if (posterMaskedMode) {
      maskPosterBtn.innerText = currentLang === 'ru' ? '🟪 Показать слова целиком' : '🟪 Show Full Words';
      maskPosterBtn.classList.add('active');
    } else {
      maskPosterBtn.innerText = currentLang === 'ru' ? '🟪 Закрыть часть слова ■' : '🟪 Cover Part of Word ■';
      maskPosterBtn.classList.remove('active');
    }
  }
}

function handlePosterCardClick(itemId, ttsText) {
  if (posterMaskedMode) {
    if (posterRevealedIds.has(itemId)) {
      posterRevealedIds.delete(itemId);
    } else {
      posterRevealedIds.add(itemId);
      speakSanskritWord(ttsText);
    }
    renderPresentationStage();
  } else {
    speakSanskritWord(ttsText);
  }
}

function togglePosterMaskMode() {
  posterMaskedMode = !posterMaskedMode;
  posterRevealedIds.clear();
  renderPresentationStage();
}

function toggleVocabLabels() {
  labelsHidden = !labelsHidden;
  renderPresentationStage();
}

function updateIastButtons() {
  document.body.classList.toggle('hide-iast', iastHidden);
  document.querySelectorAll('.toggle-iast-btn').forEach(btn => {
    if (iastHidden) {
      btn.innerText = currentLang === 'ru' ? '🔤 Включить IAST' : '🔤 Enable IAST';
      btn.classList.remove('active');
    } else {
      btn.innerText = currentLang === 'ru' ? '🔤 Отключить IAST' : '🔤 Disable IAST';
      btn.classList.add('active');
    }
  });
}

function toggleIast() {
  iastHidden = !iastHidden;
  updateIastButtons();
}

// 2. Render Stage 2: PRACTICE (ELT Games — zero translations)
function selectPracticeGame(gameKey) {
  currentPracticeGame = gameKey;
  document.querySelectorAll('.practice-tab-btn[data-game]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.game === gameKey);
  });

  if (gameKey === 'match' && matchTiles.length === 0) {
    initMatchGame();
  } else if (gameKey === 'memory' && memoryCards.length === 0) {
    initMemoryGame();
  } else if (gameKey === 'wronglabel' && wlCards.length === 0) {
    prepareWrongLabelRound();
  } else if (gameKey === 'typo' && typoCards.length === 0) {
    prepareTypoRound();
  } else if (gameKey === 'truefalse' && tfIndex === 0 && !tfAnswered && !tfFinished) {
    prepareTrueFalseRound();
  }
  renderPracticeArena();
}

function renderPracticeArena() {
  const arena = document.getElementById('lesson1-practice-arena');
  if (!arena) return;

  if (currentPracticeGame === 'flashcards') {
    renderFlashcardsGame(arena);
  } else if (currentPracticeGame === 'masked') {
    renderMaskedSquareGame(arena);
  } else if (currentPracticeGame === 'gaps') {
    renderFillGapsGame(arena);
  } else if (currentPracticeGame === 'picquiz') {
    renderPictureQuizGame(arena);
  } else if (currentPracticeGame === 'wordquiz') {
    renderWordToPicQuizGame(arena);
  } else if (currentPracticeGame === 'match') {
    renderMatchPairsGame(arena);
  } else if (currentPracticeGame === 'memory') {
    renderMemoryGame(arena);
  } else if (currentPracticeGame === 'wronglabel') {
    renderWrongLabelGame(arena);
  } else if (currentPracticeGame === 'typo') {
    renderTypoGame(arena);
  } else if (currentPracticeGame === 'spelling') {
    renderSpellingGame(arena);
  } else if (currentPracticeGame === 'truefalse') {
    renderTrueFalseGame(arena);
  }
}

// GAME 1: Flashcards (Front: Picture only -> Back: Sanskrit word + Audio + Self-Score)
function renderFlashcardsGame(arena) {
  if (fcFinished) {
    renderFinalScoreScreen(arena, '1. Flashcards', fcScore, bodyPartsVocab.length, 'restartFlashcardsGame()');
    return;
  }

  const item = bodyPartsVocab[fcIndex];
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">1. Flashcards</strong>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartFlashcardsGame()">${resetText}</button>
        <span class="game-score-pill">${fcScore} · (${fcIndex + 1} / ${bodyPartsVocab.length})</span>
      </div>
    </div>

    <div class="flashcard-box" onclick="flipFlashcard()">
      ${!fcFlipped ? `
        <div class="vocab-svg-box" style="width:140px;height:140px;margin-bottom:0.5rem;">${item.svg}</div>
        <div style="font-size:1.35rem;font-family:var(--font-deva);color:var(--accent-cambridge);font-weight:700;">?</div>
      ` : `
        <div class="vocab-svg-box" style="width:105px;height:105px;margin-bottom:0.65rem;">${item.svg}</div>
        <div class="vocab-deva" style="font-size:2.5rem;margin-bottom:0.2rem;">${item.deva}</div>
        <div class="vocab-iast" style="font-size:1.15rem;">${item.iast}</div>
      `}
    </div>

    <div style="display:flex;justify-content:center;gap:0.65rem;flex-wrap:wrap;">
      <button type="button" class="chip-btn" onclick="flipFlashcard()">↺</button>
      <button type="button" class="chip-btn" onclick="speakSanskritWord('${item.ttsText}')">🔊</button>
      <button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;" onclick="gradeFlashcard(false)">✕</button>
      <button type="button" class="chip-btn active" style="background:#16a34a;border-color:#16a34a;" onclick="gradeFlashcard(true)">✓</button>
    </div>
  `;
}

function flipFlashcard() {
  fcFlipped = !fcFlipped;
  if (fcFlipped) {
    const item = bodyPartsVocab[fcIndex];
    speakSanskritWord(item.ttsText);
  }
  renderPracticeArena();
}

function gradeFlashcard(knewIt) {
  if (knewIt) fcScore++;
  if (fcIndex + 1 >= bodyPartsVocab.length) {
    fcFinished = true;
  } else {
    fcIndex++;
    fcFlipped = false;
  }
  renderPracticeArena();
}

function restartFlashcardsGame() {
  fcIndex = 0;
  fcScore = 0;
  fcFlipped = false;
  fcFinished = false;
  renderPracticeArena();
}

// GAME 2: Masked Square Game ("часть слова закрыта квадратом и надо отгадать все слово")
function setMaskedModeView(mode) {
  maskedModeView = mode;
  renderPracticeArena();
}

function renderMaskedSquareGame(arena) {
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';

  if (maskedModeView === 'grid') {
    if (msGridRevealed.size === bodyPartsVocab.length) {
      renderFinalScoreScreen(arena, '2. ■ (12 / 12)', bodyPartsVocab.length, bodyPartsVocab.length, 'resetMaskedGrid()');
      return;
    }

    const cardsHtml = bodyPartsVocab.map(item => {
      const revealed = msGridRevealed.has(item.id);
      return `
        <div class="vocab-item-card" onclick="toggleMaskedGridCard('${item.id}', '${item.ttsText}')">
          <button type="button" class="vocab-audio-btn" title="🔊" onclick="event.stopPropagation(); speakSanskritWord('${item.ttsText}')">🔊</button>
          <div class="vocab-svg-box">${item.svg}</div>
          ${renderMaskedWordMarkup(item, revealed, '1.6rem')}
          <div class="vocab-iast">${item.iast}</div>
        </div>
      `;
    }).join('');

    arena.innerHTML = `
      <div class="game-top-bar">
        <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
          <button type="button" class="chip-btn" onclick="setMaskedModeView('card')">1 / 12</button>
          <button type="button" class="chip-btn active" onclick="setMaskedModeView('grid')">12 / 12 ■</button>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <button type="button" class="chip-btn" onclick="resetMaskedGrid()">${resetText}</button>
          <span class="game-score-pill">${msGridRevealed.size} / ${bodyPartsVocab.length}</span>
        </div>
      </div>

      <div class="vocab-grid-12" style="margin-bottom:0;">
        ${cardsHtml}
      </div>
    `;
    return;
  }

  if (msFinished) {
    renderFinalScoreScreen(arena, '2. ■', msScore, bodyPartsVocab.length, 'restartMaskedGame()');
    return;
  }

  // Single-card mode: shows picture + word with pink square covering part of it (NO 4 hint words at the bottom!)
  const item = bodyPartsVocab[msIndex];

  arena.innerHTML = `
    <div class="game-top-bar">
      <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
        <button type="button" class="chip-btn active" onclick="setMaskedModeView('card')">1 / 12</button>
        <button type="button" class="chip-btn" onclick="setMaskedModeView('grid')">12 / 12 ■</button>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartMaskedGame()">${resetText}</button>
        <span class="game-score-pill">${msScore} · (${msIndex + 1} / ${bodyPartsVocab.length})</span>
      </div>
    </div>

    <div class="flashcard-box" onclick="toggleCurrentMaskedCard()">
      <div class="vocab-svg-box" style="width:140px;height:140px;margin-bottom:0.75rem;">${item.svg}</div>
      <div id="ms-word-box">
        ${renderMaskedWordMarkup(item, msAnswered, '2.45rem')}
      </div>
      <div class="vocab-iast" style="font-size:1.1rem;margin-top:0.25rem;">${msAnswered ? item.iast : ''}</div>
    </div>

    <div style="display:flex;justify-content:center;gap:0.65rem;flex-wrap:wrap;">
      <button type="button" class="chip-btn" onclick="toggleCurrentMaskedCard()">↺</button>
      <button type="button" class="chip-btn" onclick="speakSanskritWord('${item.ttsText}')">🔊</button>
      <button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;" onclick="gradeMaskedCard(false)">✕</button>
      <button type="button" class="chip-btn active" style="background:#16a34a;border-color:#16a34a;" onclick="gradeMaskedCard(true)">✓</button>
    </div>
  `;
}

function toggleCurrentMaskedCard() {
  const item = bodyPartsVocab[msIndex];
  msAnswered = !msAnswered;
  if (msAnswered) {
    speakSanskritWord(item.ttsText);
  }
  renderPracticeArena();
}

function gradeMaskedCard(knewIt) {
  if (knewIt) msScore++;
  if (msIndex + 1 >= bodyPartsVocab.length) {
    msFinished = true;
  } else {
    msIndex++;
    msAnswered = false;
  }
  renderPracticeArena();
}

function restartMaskedGame() {
  msIndex = 0;
  msScore = 0;
  msAnswered = false;
  msFinished = false;
  renderPracticeArena();
}

function toggleMaskedGridCard(itemId, ttsText) {
  if (msGridRevealed.has(itemId)) {
    msGridRevealed.delete(itemId);
  } else {
    msGridRevealed.add(itemId);
    speakSanskritWord(ttsText);
  }
  renderPracticeArena();
}

function resetMaskedGrid() {
  msGridRevealed.clear();
  renderPracticeArena();
}

// GAME 3: Fill in the Gaps (Visual Sequence Cloze — 12 rounds + Final Score)
function renderFillGapsGame(arena) {
  if (gapFinished) {
    renderFinalScoreScreen(arena, '3. Fill in the Gaps', gapScore, bodyPartsVocab.length, 'restartGapsGame()');
    return;
  }

  const prevItem = bodyPartsVocab[(gapIndex + bodyPartsVocab.length - 1) % bodyPartsVocab.length];
  const item = bodyPartsVocab[gapIndex];
  const nextItem = bodyPartsVocab[(gapIndex + 1) % bodyPartsVocab.length];
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';

  const distractors = [
    bodyPartsVocab[(gapIndex + 3) % bodyPartsVocab.length],
    bodyPartsVocab[(gapIndex + 6) % bodyPartsVocab.length],
    bodyPartsVocab[(gapIndex + 9) % bodyPartsVocab.length]
  ];
  const options = [item, ...distractors].sort((a, b) => a.id.localeCompare(b.id));

  const optionsHtml = options.map(opt => `
    <button type="button" class="quiz-opt-btn" id="gap-opt-${opt.id}" onclick="checkGapAnswer('${opt.id}')">
      <div style="font-family:var(--font-deva);font-size:1.5rem;font-weight:700;">${opt.deva}</div>
      <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.82rem;color:var(--accent-saffron);">${opt.iast}</div>
    </button>
  `).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">3. Fill in the Gaps</strong>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartGapsGame()">${resetText}</button>
        <span class="game-score-pill">${gapScore} / ${bodyPartsVocab.length} · (${gapIndex + 1}/${bodyPartsVocab.length})</span>
      </div>
    </div>

    <div style="display:flex;align-items:center;justify-content:center;gap:1rem;background:var(--bg-primary);padding:1.25rem;border-radius:12px;border:1px solid var(--border-color);flex-wrap:wrap;">
      <div style="text-align:center;opacity:0.75;">
        <div class="vocab-svg-box" style="margin:0 auto 0.35rem;width:76px;height:76px;">${prevItem.svg}</div>
        <div style="font-family:var(--font-deva);font-size:1.2rem;font-weight:700;">${prevItem.deva}</div>
        <div class="vocab-iast" style="font-size:0.75rem;">${prevItem.iast}</div>
      </div>

      <div style="font-size:1.3rem;color:var(--text-muted);">→</div>

      <div style="text-align:center;padding:0.65rem 1rem;background:var(--bg-card);border:2px dashed var(--accent-cambridge);border-radius:12px;">
        <div class="vocab-svg-box" style="margin:0 auto 0.35rem;width:96px;height:96px;">${item.svg}</div>
        <div id="gap-sentence-display" style="font-family:var(--font-deva);font-size:1.5rem;font-weight:700;color:var(--accent-cambridge);">
          ___
        </div>
      </div>

      <div style="font-size:1.3rem;color:var(--text-muted);">→</div>

      <div style="text-align:center;opacity:0.75;">
        <div class="vocab-svg-box" style="margin:0 auto 0.35rem;width:76px;height:76px;">${nextItem.svg}</div>
        <div style="font-family:var(--font-deva);font-size:1.2rem;font-weight:700;">${nextItem.deva}</div>
        <div class="vocab-iast" style="font-size:0.75rem;">${nextItem.iast}</div>
      </div>
    </div>

    <div class="quiz-options-grid">${optionsHtml}</div>
    <div id="gap-feedback-msg" style="margin-top:1rem;text-align:center;"></div>
  `;
}

function checkGapAnswer(chosenId) {
  if (gapAnswered) return;
  const item = bodyPartsVocab[gapIndex];
  const btn = document.getElementById('gap-opt-' + chosenId);
  const feedbackEl = document.getElementById('gap-feedback-msg');

  if (chosenId === item.id) {
    gapAnswered = true;
    if (gapFirstTry) gapScore++;
    if (btn) btn.classList.add('correct');
    const sentenceEl = document.getElementById('gap-sentence-display');
    if (sentenceEl) {
      sentenceEl.innerHTML = `${item.deva}<span class="iast-text" style="font-size:0.85rem;font-family:var(--font-mono);display:block;">${item.iast}</span>`;
    }
    speakSanskritWord(item.ttsText);
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div style="color:#15803d;font-weight:700;font-family:var(--font-deva);font-size:1.3rem;margin-bottom:0.5rem;">
          ✓ ${item.deva}<span class="iast-text" style="font-family:var(--font-mono);font-size:0.9rem;"> (${item.iast})</span>
        </div>
        <button type="button" class="chip-btn active" onclick="nextGapRound()">→</button>
      `;
    }
  } else {
    gapFirstTry = false;
    if (btn) btn.classList.add('wrong');
  }
}

function nextGapRound() {
  if (gapIndex + 1 >= bodyPartsVocab.length) {
    gapFinished = true;
  } else {
    gapIndex++;
    gapAnswered = false;
    gapFirstTry = true;
  }
  renderPracticeArena();
}

function restartGapsGame() {
  gapIndex = 0;
  gapScore = 0;
  gapAnswered = false;
  gapFirstTry = true;
  gapFinished = false;
  renderPracticeArena();
}

// GAME 4: Picture Quiz (See Picture -> Pick Sanskrit Word — 12 rounds + Final Score)
function renderPictureQuizGame(arena) {
  if (pqFinished) {
    renderFinalScoreScreen(arena, '4. Picture Quiz', pqScore, bodyPartsVocab.length, 'restartPicQuizGame()');
    return;
  }

  const item = bodyPartsVocab[pqIndex];
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';
  const distractors = [
    bodyPartsVocab[(pqIndex + 2) % bodyPartsVocab.length],
    bodyPartsVocab[(pqIndex + 5) % bodyPartsVocab.length],
    bodyPartsVocab[(pqIndex + 8) % bodyPartsVocab.length]
  ];
  const options = [item, ...distractors].sort((a, b) => a.id.localeCompare(b.id));

  const optionsHtml = options.map(opt => `
    <button type="button" class="quiz-opt-btn" id="pq-opt-${opt.id}" onclick="checkPicQuizAnswer('${opt.id}')">
      <div style="font-family:var(--font-deva);font-size:1.5rem;font-weight:700;">${opt.deva}</div>
      <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.82rem;color:var(--accent-saffron);">${opt.iast}</div>
    </button>
  `).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">4. Picture Quiz</strong>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartPicQuizGame()">${resetText}</button>
        <span class="game-score-pill">${pqScore} / ${bodyPartsVocab.length} · (${pqIndex + 1}/${bodyPartsVocab.length})</span>
      </div>
    </div>

    <div style="text-align:center;">
      <div class="vocab-svg-box" style="width:130px;height:130px;margin:0 auto 0.5rem;">${item.svg}</div>
    </div>

    <div class="quiz-options-grid">${optionsHtml}</div>
    <div id="pq-feedback-msg" style="margin-top:1rem;text-align:center;"></div>
  `;
}

function checkPicQuizAnswer(chosenId) {
  if (pqAnswered) return;
  const item = bodyPartsVocab[pqIndex];
  const btn = document.getElementById('pq-opt-' + chosenId);
  const feedbackEl = document.getElementById('pq-feedback-msg');

  if (chosenId === item.id) {
    pqAnswered = true;
    if (pqFirstTry) pqScore++;
    if (btn) btn.classList.add('correct');
    speakSanskritWord(item.ttsText);
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div style="color:#15803d;font-weight:700;font-family:var(--font-deva);font-size:1.3rem;margin-bottom:0.5rem;">
          ✓ ${item.deva}<span class="iast-text" style="font-family:var(--font-mono);font-size:0.9rem;"> (${item.iast})</span>
        </div>
        <button type="button" class="chip-btn active" onclick="nextPicQuizRound()">→</button>
      `;
    }
  } else {
    pqFirstTry = false;
    if (btn) btn.classList.add('wrong');
  }
}

function nextPicQuizRound() {
  if (pqIndex + 1 >= bodyPartsVocab.length) {
    pqFinished = true;
  } else {
    pqIndex++;
    pqAnswered = false;
    pqFirstTry = true;
  }
  renderPracticeArena();
}

function restartPicQuizGame() {
  pqIndex = 0;
  pqScore = 0;
  pqAnswered = false;
  pqFirstTry = true;
  pqFinished = false;
  renderPracticeArena();
}

// GAME 5: Word -> Picture Quiz (Read Sanskrit Word -> Click Picture — 12 rounds + Final Score)
function renderWordToPicQuizGame(arena) {
  if (wqFinished) {
    renderFinalScoreScreen(arena, '5. Word → Picture', wqScore, bodyPartsVocab.length, 'restartWordQuizGame()');
    return;
  }

  const item = bodyPartsVocab[wqIndex];
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';
  const distractors = [
    bodyPartsVocab[(wqIndex + 1) % bodyPartsVocab.length],
    bodyPartsVocab[(wqIndex + 4) % bodyPartsVocab.length],
    bodyPartsVocab[(wqIndex + 7) % bodyPartsVocab.length]
  ];
  const options = [item, ...distractors].sort((a, b) => a.id.localeCompare(b.id));

  const optionsHtml = options.map(opt => `
    <button type="button" class="quiz-opt-btn" id="wq-opt-${opt.id}" onclick="checkWordQuizAnswer('${opt.id}')" style="display:flex;flex-direction:column;align-items:center;">
      <div class="vocab-svg-box" style="margin:0;width:95px;height:95px;">${opt.svg}</div>
    </button>
  `).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">5. Word → Picture</strong>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartWordQuizGame()">${resetText}</button>
        <span class="game-score-pill">${wqScore} / ${bodyPartsVocab.length} · (${wqIndex + 1}/${bodyPartsVocab.length})</span>
      </div>
    </div>

    <div style="text-align:center;padding:0.75rem;background:var(--bg-primary);border-radius:12px;border:1px solid var(--border-color);">
      <div class="vocab-deva" style="font-size:2.2rem;">${item.deva}</div>
      <div class="vocab-iast" style="font-size:1rem;">${item.iast}</div>
      <button type="button" class="chip-btn" style="margin-top:0.35rem;" onclick="speakSanskritWord('${item.ttsText}')">🔊</button>
    </div>

    <div class="quiz-options-grid">${optionsHtml}</div>
    <div id="wq-feedback-msg" style="margin-top:1rem;text-align:center;"></div>
  `;
}

function checkWordQuizAnswer(chosenId) {
  if (wqAnswered) return;
  const item = bodyPartsVocab[wqIndex];
  const btn = document.getElementById('wq-opt-' + chosenId);
  const feedbackEl = document.getElementById('wq-feedback-msg');

  if (chosenId === item.id) {
    wqAnswered = true;
    if (wqFirstTry) wqScore++;
    if (btn) btn.classList.add('correct');
    speakSanskritWord(item.ttsText);
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div style="color:#15803d;font-weight:700;font-family:var(--font-deva);font-size:1.3rem;margin-bottom:0.5rem;">
          ✓ ${item.deva}<span class="iast-text" style="font-family:var(--font-mono);font-size:0.9rem;"> (${item.iast})</span>
        </div>
        <button type="button" class="chip-btn active" onclick="nextWordQuizRound()">→</button>
      `;
    }
  } else {
    wqFirstTry = false;
    if (btn) btn.classList.add('wrong');
  }
}

function nextWordQuizRound() {
  if (wqIndex + 1 >= bodyPartsVocab.length) {
    wqFinished = true;
  } else {
    wqIndex++;
    wqAnswered = false;
    wqFirstTry = true;
  }
  renderPracticeArena();
}

function restartWordQuizGame() {
  wqIndex = 0;
  wqScore = 0;
  wqAnswered = false;
  wqFirstTry = true;
  wqFinished = false;
  renderPracticeArena();
}

// GAME 6: Match Pairs (3 stages x 4 pairs = all 12 words, with Final Score out of 12)
function initMatchGame() {
  matchOrderedVocab = [...bodyPartsVocab].sort(() => Math.random() - 0.5);
  matchStage = 0;
  matchScore = 12;
  matchFailedPairIds = new Set();
  matchFinished = false;
  setupMatchStageBoard();
}

function setupMatchStageBoard() {
  const subset = matchOrderedVocab.slice(matchStage * 4, (matchStage + 1) * 4);
  const tiles = [];
  subset.forEach(item => {
    tiles.push({ uid: 'pic-' + item.id, pairId: item.id, type: 'pic', item, matched: false });
    tiles.push({ uid: 'word-' + item.id, pairId: item.id, type: 'word', item, matched: false });
  });
  matchTiles = tiles.sort(() => Math.random() - 0.5);
  matchFirstIdx = null;
  matchMatchedCount = 0;
}

function renderMatchPairsGame(arena) {
  if (matchTiles.length === 0 && !matchFinished) initMatchGame();

  if (matchFinished) {
    const finalScore = Math.max(0, 12 - matchFailedPairIds.size);
    renderFinalScoreScreen(arena, '6. Match Pairs', finalScore, 12, 'initMatchGame(); renderPracticeArena();');
    return;
  }

  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';
  const totalMatchedSoFar = matchStage * 4 + matchMatchedCount;

  const tilesHtml = matchTiles.map((t, idx) => {
    const isSelected = matchFirstIdx === idx;
    const classes = ['match-tile'];
    if (isSelected) classes.push('selected');
    if (t.matched) classes.push('matched');

    const content = t.type === 'pic'
      ? `<div class="vocab-svg-box" style="margin:0;width:68px;height:68px;">${t.item.svg}</div>`
      : `<div style="font-family:var(--font-deva);font-size:1.4rem;font-weight:700;">${t.item.deva}</div>
         <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.76rem;color:var(--accent-saffron);">${t.item.iast}</div>`;

    return `
      <div class="${classes.join(' ')}" onclick="clickMatchTile(${idx})">
        ${content}
      </div>
    `;
  }).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">6. Match Pairs (${matchStage + 1} / 3)</strong>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="initMatchGame(); renderPracticeArena();">${resetText}</button>
        <span class="game-score-pill">${totalMatchedSoFar} / 12</span>
      </div>
    </div>

    <div class="match-grid">${tilesHtml}</div>
  `;
}

function clickMatchTile(idx) {
  const tile = matchTiles[idx];
  if (!tile || tile.matched) return;
  if (matchFirstIdx === idx) {
    matchFirstIdx = null;
    renderPracticeArena();
    return;
  }

  if (matchFirstIdx === null) {
    matchFirstIdx = idx;
    if (tile.type === 'word') speakSanskritWord(tile.item.ttsText);
    renderPracticeArena();
  } else {
    const firstTile = matchTiles[matchFirstIdx];
    if (firstTile.pairId === tile.pairId && firstTile.type !== tile.type) {
      firstTile.matched = true;
      tile.matched = true;
      matchMatchedCount++;
      speakSanskritWord(tile.item.ttsText);
      matchFirstIdx = null;

      if (matchMatchedCount === 4) {
        if (matchStage + 1 >= 3) {
          matchFinished = true;
        } else {
          matchStage++;
          setupMatchStageBoard();
        }
      }
      renderPracticeArena();
    } else {
      matchFailedPairIds.add(firstTile.pairId);
      matchFirstIdx = null;
      renderPracticeArena();
    }
  }
}

// GAME 7: Classic Memory (Все карточки лежат рубашкой вверх: переворачиваем по 2 карточки — картинка + слово)
function setMemoryPairsCount(pairsCount) {
  memoryPairGoal = pairsCount;
  initMemoryGame();
  renderPracticeArena();
}

function initMemoryGame() {
  const subset = [...bodyPartsVocab].sort(() => Math.random() - 0.5).slice(0, memoryPairGoal);
  const deck = [];
  subset.forEach(item => {
    deck.push({ uid: 'mem-pic-' + item.id, pairId: item.id, type: 'pic', item, flipped: false, matched: false, mismatch: false });
    deck.push({ uid: 'mem-word-' + item.id, pairId: item.id, type: 'word', item, flipped: false, matched: false, mismatch: false });
  });
  memoryCards = deck.sort(() => Math.random() - 0.5);
  memoryFlippedIndices = [];
  memoryMatchedPairs = 0;
  memoryMoves = 0;
  memorySeenPairIds = new Set();
  memoryFailedPairIds = new Set();
  memoryLock = false;
}

function renderMemoryGame(arena) {
  if (memoryCards.length === 0) initMemoryGame();

  const allDone = memoryMatchedPairs === memoryPairGoal;
  if (allDone) {
    const extraMovesText = currentLang === 'ru' ? `Ходов: ${memoryMoves}` : `Moves: ${memoryMoves}`;
    const memScore = Math.max(1, memoryPairGoal - memoryFailedPairIds.size);
    renderFinalScoreScreen(arena, '7. Memory', memScore, memoryPairGoal, 'initMemoryGame(); renderPracticeArena();', extraMovesText);
    return;
  }

  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';

  const cardsHtml = memoryCards.map((c, idx) => {
    const isVisible = c.flipped || c.matched;
    const classes = ['memory-card'];
    if (!isVisible) classes.push('face-down');
    if (c.flipped && !c.matched) classes.push('flipped');
    if (c.mismatch) classes.push('mismatch');
    if (c.matched) classes.push('matched');

    let innerContent = '';
    if (!isVisible) {
      innerContent = `<div class="memory-card-back-emblem">सं</div>`;
    } else if (c.type === 'pic') {
      innerContent = `<div class="vocab-svg-box" style="margin:0;width:74px;height:74px;">${c.item.svg}</div>`;
    } else {
      innerContent = `
        <div style="font-family:var(--font-deva);font-size:1.55rem;font-weight:700;color:var(--text-primary);">${c.item.deva}</div>
        <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.78rem;color:var(--accent-saffron);">${c.item.iast}</div>
      `;
    }

    return `
      <div class="${classes.join(' ')}" onclick="clickMemoryCard(${idx})">
        ${innerContent}
      </div>
    `;
  }).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
        <strong style="font-size:1.05rem;margin-right:0.35rem;">7. Memory</strong>
        <button type="button" class="chip-btn ${memoryPairGoal === 6 ? 'active' : ''}" onclick="setMemoryPairsCount(6)">
          6 × 2 (12)
        </button>
        <button type="button" class="chip-btn ${memoryPairGoal === 12 ? 'active' : ''}" onclick="setMemoryPairsCount(12)">
          12 × 2 (24)
        </button>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="initMemoryGame(); renderPracticeArena();">${resetText}</button>
        <span class="game-score-pill">${memoryMatchedPairs} / ${memoryPairGoal} · (${memoryMoves})</span>
      </div>
    </div>

    <div class="memory-grid">${cardsHtml}</div>
  `;
}

function clickMemoryCard(idx) {
  if (memoryLock) return;
  const card = memoryCards[idx];
  if (!card || card.flipped || card.matched) return;

  card.flipped = true;
  memoryFlippedIndices.push(idx);

  if (card.type === 'word') {
    speakSanskritWord(card.item.ttsText);
  }

  if (memoryFlippedIndices.length === 1) {
    renderPracticeArena();
    return;
  }

  if (memoryFlippedIndices.length === 2) {
    memoryMoves++;
    const [firstIdx, secondIdx] = memoryFlippedIndices;
    const firstCard = memoryCards[firstIdx];
    const secondCard = memoryCards[secondIdx];

    if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
      firstCard.matched = true;
      secondCard.matched = true;
      memoryMatchedPairs++;
      memoryFlippedIndices = [];
      speakSanskritWord(firstCard.item.ttsText);
      renderPracticeArena();
    } else {
      if (memorySeenPairIds.has(firstCard.pairId)) {
        memoryFailedPairIds.add(firstCard.pairId);
      }
      memorySeenPairIds.add(firstCard.pairId);
      memorySeenPairIds.add(secondCard.pairId);

      memoryLock = true;
      firstCard.mismatch = true;
      secondCard.mismatch = true;
      renderPracticeArena();

      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
        firstCard.mismatch = false;
        secondCard.mismatch = false;
        memoryFlippedIndices = [];
        memoryLock = false;
        renderPracticeArena();
      }, 850);
    }
  }
}

// GAME 8: Spot the Wrong Label (3 Pictures, 1 Wrongly Labeled — 12 rounds + Final Score)
function prepareWrongLabelRound() {
  wlAnswered = false;
  wlFirstTry = true;
  const n = bodyPartsVocab.length;
  const wrongPicItem = bodyPartsVocab[wlIndex];
  const wrongLabelItem = bodyPartsVocab[(wlIndex + 2) % n];
  const correct1 = bodyPartsVocab[(wlIndex + 4) % n];
  const correct2 = bodyPartsVocab[(wlIndex + 8) % n];

  const rawCards = [
    { picItem: wrongPicItem, labelItem: wrongLabelItem, isWrong: true },
    { picItem: correct1, labelItem: correct1, isWrong: false },
    { picItem: correct2, labelItem: correct2, isWrong: false }
  ];

  const shift = (wlIndex * 5 + 1) % 3;
  wlCards = [
    rawCards[shift % 3],
    rawCards[(shift + 1) % 3],
    rawCards[(shift + 2) % 3]
  ];
}

function renderWrongLabelGame(arena) {
  if (wlFinished) {
    renderFinalScoreScreen(arena, '8. 3 🖼 → 1 ✕', wlScore, bodyPartsVocab.length, 'restartWrongLabelGame()');
    return;
  }

  if (wlCards.length === 0) prepareWrongLabelRound();
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';

  const cardsHtml = wlCards.map((c, idx) => {
    const showCorrection = wlAnswered && c.isWrong;
    return `
      <button type="button" class="quiz-opt-btn" id="wl-card-${idx}" onclick="checkWrongLabelCard(${idx})"
              style="display:flex;flex-direction:column;align-items:center;padding:1.25rem 0.85rem;">
        <div class="vocab-svg-box" style="margin:0 auto 0.75rem;width:110px;height:110px;">${c.picItem.svg}</div>
        ${!showCorrection ? `
          <div style="font-family:var(--font-deva);font-size:1.75rem;font-weight:700;color:var(--text-primary);">${c.labelItem.deva}</div>
          <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.85rem;color:var(--accent-saffron);">${c.labelItem.iast}</div>
        ` : `
          <div style="font-family:var(--font-deva);font-size:1.3rem;color:#dc2626;text-decoration:line-through;opacity:0.8;">${c.labelItem.deva}</div>
          <div style="font-family:var(--font-deva);font-size:1.85rem;font-weight:700;color:#15803d;">✓ ${c.picItem.deva}</div>
          <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.85rem;color:#15803d;">${c.picItem.iast}</div>
        `}
      </button>
    `;
  }).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">8. 3 🖼 → 1 ✕</strong>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartWrongLabelGame()">${resetText}</button>
        <span class="game-score-pill">${wlScore} / ${bodyPartsVocab.length} · (${wlIndex + 1}/${bodyPartsVocab.length})</span>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:1rem;">
      ${cardsHtml}
    </div>

    <div id="wl-feedback-msg" style="margin-top:1.15rem;text-align:center;"></div>
  `;
}

function checkWrongLabelCard(idx) {
  if (wlAnswered) return;
  const chosen = wlCards[idx];
  const btn = document.getElementById('wl-card-' + idx);
  if (!chosen) return;

  if (chosen.isWrong) {
    wlAnswered = true;
    if (wlFirstTry) wlScore++;
    speakSanskritWord(chosen.picItem.ttsText);
    renderPracticeArena();
    const matchedBtn = document.getElementById('wl-card-' + idx);
    if (matchedBtn) matchedBtn.classList.add('correct');
    const feedbackEl = document.getElementById('wl-feedback-msg');
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <button type="button" class="chip-btn active" onclick="nextWrongLabelRound()">→</button>
      `;
    }
  } else {
    wlFirstTry = false;
    if (btn) btn.classList.add('wrong');
    speakSanskritWord(chosen.picItem.ttsText);
  }
}

function nextWrongLabelRound() {
  if (wlIndex + 1 >= bodyPartsVocab.length) {
    wlFinished = true;
  } else {
    wlIndex++;
    prepareWrongLabelRound();
  }
  renderPracticeArena();
}

function restartWrongLabelGame() {
  wlIndex = 0;
  wlScore = 0;
  wlFinished = false;
  prepareWrongLabelRound();
  renderPracticeArena();
}

// GAME 9: Spot the 1-Letter Spelling Mistake (3 Pictures, 1 has a 1-letter typo — 12 rounds + Final Score)
function prepareTypoRound() {
  typoAnswered = false;
  typoFirstTry = true;
  const n = bodyPartsVocab.length;
  const typoItem = bodyPartsVocab[typoIndex];
  const correct1 = bodyPartsVocab[(typoIndex + 3) % n];
  const correct2 = bodyPartsVocab[(typoIndex + 7) % n];

  const rawCards = [
    { item: typoItem, displayedDeva: typoItem.typoDeva, displayedIast: typoItem.typoIast, hasTypo: true },
    { item: correct1, displayedDeva: correct1.deva, displayedIast: correct1.iast, hasTypo: false },
    { item: correct2, displayedDeva: correct2.deva, displayedIast: correct2.iast, hasTypo: false }
  ];

  const shift = (typoIndex * 7 + 2) % 3;
  typoCards = [
    rawCards[shift % 3],
    rawCards[(shift + 1) % 3],
    rawCards[(shift + 2) % 3]
  ];
}

function renderTypoGame(arena) {
  if (typoFinished) {
    renderFinalScoreScreen(arena, '9. 3 🖼 → 1 आ/अ ✕', typoScore, bodyPartsVocab.length, 'restartTypoGame()');
    return;
  }

  if (typoCards.length === 0) prepareTypoRound();
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';

  const cardsHtml = typoCards.map((c, idx) => {
    const showCorrection = typoAnswered && c.hasTypo;
    return `
      <button type="button" class="quiz-opt-btn" id="typo-card-${idx}" onclick="checkTypoCard(${idx})"
              style="display:flex;flex-direction:column;align-items:center;padding:1.25rem 0.85rem;">
        <div class="vocab-svg-box" style="margin:0 auto 0.75rem;width:110px;height:110px;">${c.item.svg}</div>
        ${!showCorrection ? `
          <div style="font-family:var(--font-deva);font-size:1.75rem;font-weight:700;color:var(--text-primary);">${c.displayedDeva}</div>
          <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.85rem;color:var(--accent-saffron);">${c.displayedIast}</div>
        ` : `
          <div style="font-family:var(--font-deva);font-size:1.3rem;color:#dc2626;text-decoration:line-through;opacity:0.85;">${c.displayedDeva}</div>
          <div style="font-family:var(--font-deva);font-size:1.85rem;font-weight:700;color:#15803d;">✓ ${c.item.deva}</div>
          <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.85rem;color:#15803d;">${c.item.iast}</div>
        `}
      </button>
    `;
  }).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">9. 3 🖼 → 1 आ/अ ✕</strong>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartTypoGame()">${resetText}</button>
        <span class="game-score-pill">${typoScore} / ${bodyPartsVocab.length} · (${typoIndex + 1}/${bodyPartsVocab.length})</span>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:1rem;">
      ${cardsHtml}
    </div>

    <div id="typo-feedback-msg" style="margin-top:1.15rem;text-align:center;"></div>
  `;
}

function checkTypoCard(idx) {
  if (typoAnswered) return;
  const chosen = typoCards[idx];
  const btn = document.getElementById('typo-card-' + idx);
  if (!chosen) return;

  if (chosen.hasTypo) {
    typoAnswered = true;
    if (typoFirstTry) typoScore++;
    speakSanskritWord(chosen.item.ttsText);
    renderPracticeArena();
    const matchedBtn = document.getElementById('typo-card-' + idx);
    if (matchedBtn) matchedBtn.classList.add('correct');
    const feedbackEl = document.getElementById('typo-feedback-msg');
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <button type="button" class="chip-btn active" onclick="nextTypoRound()">→</button>
      `;
    }
  } else {
    typoFirstTry = false;
    if (btn) btn.classList.add('wrong');
    speakSanskritWord(chosen.item.ttsText);
  }
}

function nextTypoRound() {
  if (typoIndex + 1 >= bodyPartsVocab.length) {
    typoFinished = true;
  } else {
    typoIndex++;
    prepareTypoRound();
  }
  renderPracticeArena();
}

function restartTypoGame() {
  typoIndex = 0;
  typoScore = 0;
  typoFinished = false;
  prepareTypoRound();
  renderPracticeArena();
}

// GAME 10: Missing Syllable / Devanagari Spelling Drill (12 rounds + Final Score)
function renderSpellingGame(arena) {
  if (spFinished) {
    renderFinalScoreScreen(arena, '10. Missing Letters', spScore, bodyPartsVocab.length, 'restartSpellingGame()');
    return;
  }

  const item = bodyPartsVocab[spIndex];
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';

  const choicesHtml = item.missingChoices.map((ch, i) => `
    <button type="button" class="quiz-opt-btn" id="sp-opt-${i}" onclick="checkSpellingAnswer('${ch}', ${i})">
      <div style="font-family:var(--font-deva);font-size:1.65rem;font-weight:700;">${ch}</div>
    </button>
  `).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">10. Missing Letters</strong>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartSpellingGame()">${resetText}</button>
        <span class="game-score-pill">${spScore} / ${bodyPartsVocab.length} · (${spIndex + 1}/${bodyPartsVocab.length})</span>
      </div>
    </div>

    <div style="text-align:center;background:var(--bg-primary);padding:1.25rem;border-radius:12px;border:1px solid var(--border-color);">
      <div class="vocab-svg-box" style="width:105px;height:105px;margin:0 auto 0.5rem;">${item.svg}</div>
      <div style="font-family:var(--font-deva);font-size:2.3rem;font-weight:700;letter-spacing:0.06em;" id="sp-word-display">
        ${item.missingDisplay}
      </div>
      <div class="vocab-iast" style="font-size:0.9rem;">${item.iast}</div>
    </div>

    <div class="quiz-options-grid">${choicesHtml}</div>
    <div id="sp-feedback-msg" style="margin-top:1rem;text-align:center;"></div>
  `;
}

function checkSpellingAnswer(chosenSyllable, btnIdx) {
  if (spAnswered) return;
  const item = bodyPartsVocab[spIndex];
  const btn = document.getElementById('sp-opt-' + btnIdx);
  const feedbackEl = document.getElementById('sp-feedback-msg');

  if (chosenSyllable === item.missingAnswer) {
    spAnswered = true;
    if (spFirstTry) spScore++;
    if (btn) btn.classList.add('correct');
    const wordDisp = document.getElementById('sp-word-display');
    if (wordDisp) wordDisp.innerHTML = `<span style="color:var(--accent-cambridge);">${item.deva}</span>`;
    speakSanskritWord(item.ttsText);
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div style="color:#15803d;font-weight:700;font-family:var(--font-deva);font-size:1.3rem;margin-bottom:0.5rem;">
          ✓ ${item.deva}<span class="iast-text" style="font-family:var(--font-mono);font-size:0.9rem;"> (${item.iast})</span>
        </div>
        <button type="button" class="chip-btn active" onclick="nextSpellingRound()">→</button>
      `;
    }
  } else {
    spFirstTry = false;
    if (btn) btn.classList.add('wrong');
  }
}

function nextSpellingRound() {
  if (spIndex + 1 >= bodyPartsVocab.length) {
    spFinished = true;
  } else {
    spIndex++;
    spAnswered = false;
    spFirstTry = true;
  }
  renderPracticeArena();
}

function restartSpellingGame() {
  spIndex = 0;
  spScore = 0;
  spAnswered = false;
  spFirstTry = true;
  spFinished = false;
  renderPracticeArena();
}

// GAME 11: True or False ("आम् / न" — 12 rounds + Final Score)
function prepareTrueFalseRound() {
  tfAnswered = false;
  tfIsTrue = (tfIndex % 2 === 0) ? (Math.random() >= 0.4) : (Math.random() >= 0.5);
  if (tfIsTrue) {
    tfDisplayedWordIdx = tfIndex;
  } else {
    tfDisplayedWordIdx = (tfIndex + 3) % bodyPartsVocab.length;
  }
}

function renderTrueFalseGame(arena) {
  if (tfFinished) {
    renderFinalScoreScreen(arena, '11. आम् / न', tfScore, bodyPartsVocab.length, 'restartTrueFalseGame()');
    return;
  }

  const picItem = bodyPartsVocab[tfIndex];
  const wordItem = bodyPartsVocab[tfDisplayedWordIdx];
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">11. आम् / न</strong>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartTrueFalseGame()">${resetText}</button>
        <span class="game-score-pill">${tfScore} / ${bodyPartsVocab.length} · (${tfIndex + 1}/${bodyPartsVocab.length})</span>
      </div>
    </div>

    <div style="text-align:center;background:var(--bg-primary);padding:1.35rem;border-radius:12px;border:1px solid var(--border-color);">
      <div class="vocab-svg-box" style="width:115px;height:115px;margin:0 auto 0.65rem;">${picItem.svg}</div>
      <div style="font-family:var(--font-deva);font-size:1.9rem;font-weight:700;color:var(--text-primary);">
        <span style="color:var(--accent-saffron);">${wordItem.deva}</span><span class="iast-text" style="font-family:var(--font-mono);font-size:0.95rem;"> (${wordItem.iast})</span> ?
      </div>
    </div>

    <div class="quiz-options-grid">
      <button type="button" class="quiz-opt-btn" id="tf-btn-true" onclick="checkTrueFalse(true)">
        <div style="font-family:var(--font-deva);font-size:1.55rem;font-weight:700;color:#15803d;">✓ आम्<span class="iast-text" style="font-family:var(--font-mono);font-size:0.85rem;"> (ām)</span></div>
      </button>
      <button type="button" class="quiz-opt-btn" id="tf-btn-false" onclick="checkTrueFalse(false)">
        <div style="font-family:var(--font-deva);font-size:1.55rem;font-weight:700;color:#dc2626;">✕ न<span class="iast-text" style="font-family:var(--font-mono);font-size:0.85rem;"> (na)</span></div>
      </button>
    </div>

    <div id="tf-feedback-msg" style="margin-top:1rem;text-align:center;"></div>
  `;
}

function checkTrueFalse(userSaidTrue) {
  if (tfAnswered) return;
  tfAnswered = true;
  const picItem = bodyPartsVocab[tfIndex];
  const isCorrect = userSaidTrue === tfIsTrue;
  const btn = document.getElementById(userSaidTrue ? 'tf-btn-true' : 'tf-btn-false');
  const feedbackEl = document.getElementById('tf-feedback-msg');

  if (isCorrect) {
    tfScore++;
    if (btn) btn.classList.add('correct');
  } else {
    if (btn) btn.classList.add('wrong');
  }

  speakSanskritWord(picItem.ttsText);

  if (feedbackEl) {
    feedbackEl.innerHTML = `
      <div style="font-weight:700;font-family:var(--font-deva);font-size:1.35rem;color:${isCorrect ? '#15803d' : '#dc2626'};margin-bottom:0.5rem;">
        ${isCorrect ? '✓' : '✕'} ${picItem.deva}<span class="iast-text" style="font-family:var(--font-mono);font-size:0.9rem;"> (${picItem.iast})</span>
      </div>
      <button type="button" class="chip-btn active" onclick="nextTrueFalseRound()">→</button>
    `;
  }
}

function nextTrueFalseRound() {
  if (tfIndex + 1 >= bodyPartsVocab.length) {
    tfFinished = true;
  } else {
    tfIndex++;
    prepareTrueFalseRound();
  }
  renderPracticeArena();
}

function restartTrueFalseGame() {
  tfIndex = 0;
  tfScore = 0;
  tfFinished = false;
  prepareTrueFalseRound();
  renderPracticeArena();
}

// 3. Render Stage 3: PRODUCTION (Direct Picture + Sanskrit Word Aloud — zero translations)
function selectProductionWord(wordId) {
  activeProdWordId = wordId;
  producedWordsSet.add(wordId);
  const item = bodyPartsVocab.find(w => w.id === wordId);
  if (item) {
    speakSanskritWord(item.ttsText);
  }
  renderProductionStage();
}

function restartProductionStage() {
  producedWordsSet.clear();
  activeProdWordId = 'nayana';
  renderProductionStage();
}

function renderProductionStage() {
  const container = document.getElementById('lesson1-production-stage');
  if (!container) return;

  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';
  const scoreLabel = currentLang === 'ru'
    ? `${producedWordsSet.size} из ${bodyPartsVocab.length} правильно`
    : `${producedWordsSet.size} out of ${bodyPartsVocab.length} correct`;

  const activeItem = bodyPartsVocab.find(w => w.id === activeProdWordId) || bodyPartsVocab[0];
  const chipsHtml = bodyPartsVocab.map(w => {
    const done = producedWordsSet.has(w.id);
    const isCurrent = w.id === activeProdWordId;
    return `
      <button type="button" class="chip-btn ${isCurrent ? 'active' : ''}" onclick="selectProductionWord('${w.id}')"
              style="${done && !isCurrent ? 'border-color:#16a34a;background:#f0fdf4;color:#15803d;' : ''}">
        ${done ? '✓ ' : ''}${w.deva}<span class="iast-text"> (${w.iast})</span>
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.85rem;">
      <span class="game-score-pill">${scoreLabel}</span>
      <button type="button" class="chip-btn" onclick="restartProductionStage()">${resetText}</button>
    </div>

    <div class="preset-buttons" style="margin-bottom:1.25rem;">${chipsHtml}</div>

    <div style="display:flex;align-items:center;justify-content:center;gap:1.5rem;background:var(--bg-primary);padding:1.5rem;border-radius:16px;border:1.5px solid var(--border-strong);flex-wrap:wrap;text-align:center;">
      <div class="vocab-svg-box" style="margin:0;width:130px;height:130px;">${activeItem.svg}</div>
      <div>
        <div style="font-family:var(--font-deva);font-size:2.6rem;font-weight:700;color:var(--text-primary);margin-bottom:0.2rem;">
          ${activeItem.deva}
        </div>
        <div class="vocab-iast" style="font-family:var(--font-mono);font-size:1.1rem;color:var(--accent-saffron);margin-bottom:0.65rem;">
          ${activeItem.iast}
        </div>
        <button type="button" class="btn btn-primary" style="padding:0.55rem 1.25rem;font-size:0.95rem;"
                onclick="speakSanskritWord('${activeItem.ttsText}')">
          🔊 ${activeItem.deva}
        </button>
      </div>
    </div>
  `;
}

// Initialize / Refresh all Lesson 1 views when language changes
function refreshLesson1() {
  updateIastButtons();
  renderPresentationStage();
  renderPracticeArena();
  renderProductionStage();
}

document.addEventListener('DOMContentLoaded', () => {
  initMatchGame();
  initMemoryGame();
  prepareWrongLabelRound();
  prepareTypoRound();
  prepareTrueFalseRound();
  refreshLesson1();
});
