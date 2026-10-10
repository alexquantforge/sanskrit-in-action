// Lesson 1 (PPP: Presentation -> Practice -> Production)
// Topic: Vocabulary — शरीरसम्बन्धि-शब्दाः (Parts of the Body / Части тела)
// Pure stem forms (no gender/case endings, zero mention of grammatical gender)

const bodyPartsVocab = [
  {
    id: 'nayana',
    deva: 'नयन',
    iast: 'nayana',
    ttsText: 'नयन',
    ru: 'глаз',
    en: 'eye',
    pronounceHintRu: 'на́-я-на (все гласные краткие)',
    pronounceHintEn: 'ná-ya-na (all short vowels)',
    gapPromptRu: 'Орган зрения, которым мы видим мир: ___',
    gapPromptEn: 'The organ of sight with which we see the world: ___',
    missingDisplay: 'न _ न',
    missingAnswer: 'य',
    missingChoices: ['य', 'ग', 'प', 'त'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M12 52C24 32 76 32 88 52C76 72 24 72 12 52Z" fill="#FFFFFF" stroke="#14213D" stroke-width="3.5"/>
      <circle cx="50" cy="52" r="16" fill="#2563EB" stroke="#14213D" stroke-width="2.5"/>
      <circle cx="50" cy="52" r="7.5" fill="#0F172A"/>
      <circle cx="44" cy="46" r="3.5" fill="#FFFFFF"/>
      <path d="M22 36L27 42M38 30L40 37M50 29L50 36M62 30L60 37M78 36L73 42" stroke="#14213D" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'nasika',
    deva: 'नासिका',
    iast: 'nāsikā',
    ttsText: 'नासिका',
    ru: 'нос',
    en: 'nose',
    pronounceHintRu: 'на̄́-си-ка̄ (долгие «а̄» в первом и последнем слогах)',
    pronounceHintEn: 'nā́-si-kā (long ā in first and last syllables)',
    gapPromptRu: 'Мы дышим и чувствуем аромат цветов через ___',
    gapPromptEn: 'We breathe and smell the fragrance of flowers through the ___',
    missingDisplay: 'ना _ का',
    missingAnswer: 'सि',
    missingChoices: ['सि', 'मि', 'लि', 'रि'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M45 18C45 35 36 56 28 66C24 71 28 79 37 78C43 77 46 81 50 81C54 81 57 77 63 78C72 79 76 71 72 66C64 56 55 35 55 18" fill="#F3C6A8" stroke="#14213D" stroke-width="3.2" stroke-linecap="round"/>
      <ellipse cx="38" cy="73" rx="5" ry="3" fill="#14213D"/>
      <ellipse cx="62" cy="73" rx="5" ry="3" fill="#14213D"/>
    </svg>`
  },
  {
    id: 'jihva',
    deva: 'जिह्वा',
    iast: 'jihvā',
    ttsText: 'जिह्वा',
    ru: 'язык',
    en: 'tongue',
    pronounceHintRu: 'джи́х-ва̄ (сочетание хв + долгое а̄ на конце)',
    pronounceHintEn: 'jíh-vā (aspirated hv cluster + final long ā)',
    gapPromptRu: 'Орган речи и вкуса во рту человека: ___',
    gapPromptEn: 'The organ of taste and speech inside the mouth: ___',
    missingDisplay: 'जि _',
    missingAnswer: 'ह्वा',
    missingChoices: ['ह्वा', 'त्वा', 'न्ना', 'म्मा'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M20 34C35 26 65 26 80 34C76 52 68 58 50 58C32 58 24 52 20 34Z" fill="#7F1D1D" stroke="#14213D" stroke-width="3"/>
      <path d="M30 38C30 38 30 82 50 82C70 82 70 38 70 38Z" fill="#F43F5E" stroke="#14213D" stroke-width="3.2"/>
      <path d="M50 42V72" stroke="#BE123C" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'karna',
    deva: 'कर्ण',
    iast: 'karṇa',
    ttsText: 'कर्ण',
    ru: 'ухо',
    en: 'ear',
    pronounceHintRu: 'ка́р-на (ретрофлексное ṇ после r)',
    pronounceHintEn: 'kár-ṇa (retroflex ṇ after r)',
    gapPromptRu: 'Орган слуха, которым мы слушаем речь и музыку: ___',
    gapPromptEn: 'The organ of hearing with which we listen to speech and music: ___',
    missingDisplay: 'क _',
    missingAnswer: 'र्ण',
    missingChoices: ['र्ण', 'र्म', 'र्थ', 'र्क'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M35 28C38 15 68 14 72 36C75 53 64 62 60 72C56 82 40 85 36 74C34 68 38 64 38 64" fill="#F3C6A8" stroke="#14213D" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M44 34C54 26 62 36 58 48C55 56 46 56 46 64" stroke="#14213D" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="45" cy="52" r="4" fill="#14213D"/>
    </svg>`
  },
  {
    id: 'shirsha',
    deva: 'शीर्ष',
    iast: 'śīrṣa',
    ttsText: 'शीर्ष',
    ru: 'голова',
    en: 'head',
    pronounceHintRu: 'шӣ́р-ша (долгое ӣ + ретрофлексное ṣ)',
    pronounceHintEn: 'śī́r-ṣa (long ī + retroflex ṣ)',
    gapPromptRu: 'Самая верхняя часть тела человека: ___',
    gapPromptEn: 'The uppermost part of the human body: ___',
    missingDisplay: 'शी _',
    missingAnswer: 'र्ष',
    missingChoices: ['र्ष', 'र्ण', 'र्म', 'र्व'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <ellipse cx="50" cy="48" rx="24" ry="30" fill="#F3C6A8" stroke="#14213D" stroke-width="3.2"/>
      <path d="M38 76V88H62V76" fill="#E5B293" stroke="#14213D" stroke-width="3"/>
      <path d="M38 45H44M56 45H62" stroke="#14213D" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M50 46V56" stroke="#14213D" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M43 64C47 67 53 67 57 64" stroke="#14213D" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="50" cy="48" r="35" stroke="#C84B31" stroke-width="2" stroke-dasharray="4 4"/>
    </svg>`
  },
  {
    id: 'lalata',
    deva: 'ललाट',
    iast: 'lalāṭa',
    ttsText: 'ललाट',
    ru: 'лоб',
    en: 'forehead',
    pronounceHintRu: 'ла-ла̄́-та (долгое а̄ во втором слоге + ретрофлексное ṭ)',
    pronounceHintEn: 'la-lā́-ṭa (long ā in second syllable + retroflex ṭ)',
    gapPromptRu: 'Верхняя часть лица над бровями и глазами: ___',
    gapPromptEn: 'The upper part of the face above the eyebrows and eyes: ___',
    missingDisplay: 'ल _ ट',
    missingAnswer: 'ला',
    missingChoices: ['ला', 'ली', 'लू', 'ले'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M24 78C24 40 30 20 50 20C70 20 76 40 76 78" fill="#F3C6A8" stroke="#14213D" stroke-width="3.2"/>
      <rect x="31" y="28" width="38" height="22" rx="6" fill="#FDE68A" stroke="#D97706" stroke-width="2.5"/>
      <path d="M32 62C37 58 43 58 46 62M54 62C57 58 63 58 68 62" stroke="#14213D" stroke-width="3" stroke-linecap="round"/>
      <circle cx="39" cy="70" r="3" fill="#14213D"/>
      <circle cx="61" cy="70" r="3" fill="#14213D"/>
    </svg>`
  },
  {
    id: 'bhru',
    deva: 'भ्रू',
    iast: 'bhrū',
    ttsText: 'भ्रू',
    ru: 'бровь',
    en: 'eyebrow',
    pronounceHintRu: 'бхрӯ (придыхательное bh + долгое ӯ; родственно рус. «бровь» и англ. brow!)',
    pronounceHintEn: 'bhrū (aspirated bh + long ū; cognate with English brow!)',
    gapPromptRu: 'Дуга из волосков прямо над глазом: ___',
    gapPromptEn: 'The arch of hair directly above the eye: ___',
    missingDisplay: 'भ् _',
    missingAnswer: 'रू',
    missingChoices: ['रू', 'री', 'रा', 'रे'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#FFFFFF"/>
      <path d="M22 40C38 28 64 28 78 38" stroke="#14213D" stroke-width="6" stroke-linecap="round"/>
      <path d="M14 26L28 31M28 31L22 23M28 31L20 34" stroke="#DC2626" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M26 64C36 52 64 52 74 64C64 76 36 76 26 64Z" fill="#FFFFFF" stroke="#14213D" stroke-width="3"/>
      <circle cx="50" cy="64" r="9" fill="#0F172A"/>
      <circle cx="47" cy="61" r="2.5" fill="#FFFFFF"/>
    </svg>`
  },
  {
    id: 'ostha',
    deva: 'ओष्ठ',
    iast: 'oṣṭha',
    ttsText: 'ओष्ठ',
    ru: 'губы',
    en: 'lips',
    pronounceHintRu: 'о́-штха (долгий гласный «о» + ретрофлексное сочетание ṣṭh)',
    pronounceHintEn: 'ó-ṣṭha (long vowel o + retroflex cluster ṣṭh)',
    gapPromptRu: 'Когда мы улыбаемся или произносим звуки «п, б, м», смыкаются ___',
    gapPromptEn: 'When we smile or pronounce labial sounds like p, b, m, we use the ___',
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
    ttsText: 'कर',
    ru: 'рука',
    en: 'hand / arm',
    pronounceHintRu: 'ка́-ра (от корня √kṛ «делать» — то, чем делают!)',
    pronounceHintEn: 'ká-ra (from √kṛ “to do” — the instrument of action!)',
    gapPromptRu: 'Часть тела, которой мы пишем, держим предметы и трудимся: ___',
    gapPromptEn: 'The part of the body with which we write, hold objects, and work: ___',
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
    ttsText: 'पाद',
    ru: 'нога',
    en: 'foot / leg',
    pronounceHintRu: 'па̄́-да (долгое а̄; родственно русскому «пеший», лат. ped-)',
    pronounceHintEn: 'pā́-da (long ā; cognate with Latin ped- / English foot)',
    gapPromptRu: 'Часть тела, благодаря которой мы стоим и шагаем по дороге: ___',
    gapPromptEn: 'The part of the body with which we stand and walk along a path: ___',
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
    ttsText: 'दन्त',
    ru: 'зуб',
    en: 'tooth',
    pronounceHintRu: 'да́н-та (родственно латинскому dent- и англ. dental!)',
    pronounceHintEn: 'dán-ta (cognate with Latin dent- and English dental!)',
    gapPromptRu: 'Ими мы откусываем и пережёвываем твёрдую пищу: ___',
    gapPromptEn: 'With this white structure in the mouth we bite and chew food: ___',
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
    ru: 'палец',
    en: 'finger',
    pronounceHintRu: 'а́н-гу-лӣ (носовой ṅ перед g + долгое ӣ на конце)',
    pronounceHintEn: 'áṅ-gu-lī (velar nasal ṅ before g + final long ī)',
    gapPromptRu: 'На каждой руке их пять, ими мы указываем и берём мелкие вещи: ___',
    gapPromptEn: 'There are five of them on each hand, used for pointing and grasping: ___',
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
let iastHidden = false;
let currentPracticeGame = 'flashcards'; // 'flashcards' | 'gaps' | 'picquiz' | 'wordquiz' | 'match' | 'spelling' | 'truefalse'
let fcIndex = 0;
let fcFlipped = false;
let gapIndex = 0;
let gapScore = 0;
let gapAnswered = false;
let pqIndex = 0;
let pqScore = 0;
let pqAnswered = false;
let wqIndex = 0;
let wqScore = 0;
let wqAnswered = false;
let spIndex = 0;
let spScore = 0;
let spAnswered = false;
let tfIndex = 0;
let tfScore = 0;
let tfIsTrue = true;
let tfDisplayedWordIdx = 0;
let tfAnswered = false;

// Match game state
let matchTiles = [];
let matchFirstIdx = null;
let matchMatchedCount = 0;

// Production state: track which of the 12 words the student has spoken
let producedWordsSet = new Set(['nayana']);
let activeProdWordId = 'nayana';

// Audio Speech Helper (Web Speech API — pronounces pure stem without case/gender endings)
function speakSanskritWord(devaText, iastText) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    // Ensure final short 'a' in Sanskrit stems is articulated clearly by TTS
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

// 1. Render Stage 1: PRESENTATION (3x4 Chart without any mention of gender)
function renderPresentationStage() {
  const gridEl = document.getElementById('lesson1-vocab-grid');
  if (!gridEl) return;

  gridEl.classList.toggle('labels-hidden', labelsHidden);

  gridEl.innerHTML = bodyPartsVocab.map(item => {
    const meaning = currentLang === 'ru' ? item.ru : item.en;
    return `
      <div class="vocab-item-card" onclick="speakSanskritWord('${item.ttsText}', '${item.iast}')">
        <button type="button" class="vocab-audio-btn" title="Listen" onclick="event.stopPropagation(); speakSanskritWord('${item.ttsText}', '${item.iast}')">🔊</button>
        <div class="vocab-svg-box">${item.svg}</div>
        <div class="vocab-deva">${item.deva}</div>
        <div class="vocab-iast">${item.iast}</div>
        <div class="vocab-meaning">${meaning}</div>
      </div>
    `;
  }).join('');

  const toggleBtn = document.getElementById('toggle-labels-btn');
  if (toggleBtn) {
    if (labelsHidden) {
      toggleBtn.innerText = currentLang === 'ru' ? '👁 Показать подписи' : '👁 Show Labels';
      toggleBtn.classList.add('active');
    } else {
      toggleBtn.innerText = currentLang === 'ru' ? '🙈 Скрыть подписи (проверь себя)' : '🙈 Hide Labels (Test Yourself)';
      toggleBtn.classList.remove('active');
    }
  }
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
      btn.classList.add('active');
    } else {
      btn.innerText = currentLang === 'ru' ? '🔤 Отключить IAST' : '🔤 Disable IAST';
      btn.classList.remove('active');
    }
  });
}

function toggleIast() {
  iastHidden = !iastHidden;
  updateIastButtons();
}

// 2. Render Stage 2: PRACTICE (7 Simple ELT Games)
function selectPracticeGame(gameKey) {
  currentPracticeGame = gameKey;
  document.querySelectorAll('.practice-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.game === gameKey);
  });

  if (gameKey === 'match') {
    initMatchGame();
  } else if (gameKey === 'truefalse') {
    prepareTrueFalseRound();
  }
  renderPracticeArena();
}

function renderPracticeArena() {
  const arena = document.getElementById('lesson1-practice-arena');
  if (!arena) return;

  if (currentPracticeGame === 'flashcards') {
    renderFlashcardsGame(arena);
  } else if (currentPracticeGame === 'gaps') {
    renderFillGapsGame(arena);
  } else if (currentPracticeGame === 'picquiz') {
    renderPictureQuizGame(arena);
  } else if (currentPracticeGame === 'wordquiz') {
    renderWordToPicQuizGame(arena);
  } else if (currentPracticeGame === 'match') {
    renderMatchPairsGame(arena);
  } else if (currentPracticeGame === 'spelling') {
    renderSpellingGame(arena);
  } else if (currentPracticeGame === 'truefalse') {
    renderTrueFalseGame(arena);
  }
}

// GAME 1: Flashcards
function renderFlashcardsGame(arena) {
  const item = bodyPartsVocab[fcIndex];
  const meaning = currentLang === 'ru' ? item.ru : item.en;
  const hint = currentLang === 'ru' ? item.pronounceHintRu : item.pronounceHintEn;

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 1: Flashcards (Флэш-карточки)' : 'Game 1: Flashcards'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Нажмите на карточку, чтобы перевернуть её и услышать произношение' : 'Click the card to flip it and hear the pronunciation'}
        </div>
      </div>
      <span class="game-score-pill">${fcIndex + 1} / ${bodyPartsVocab.length}</span>
    </div>

    <div class="flashcard-box" onclick="flipFlashcard()">
      ${!fcFlipped ? `
        <div class="vocab-svg-box" style="width:130px;height:130px;margin-bottom:0.9rem;">${item.svg}</div>
        <div style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin-bottom:0.35rem;">${meaning.toUpperCase()}</div>
        <div style="font-size:0.8rem;color:var(--accent-cambridge);font-weight:600;">
          ${currentLang === 'ru' ? '👆 Нажмите, чтобы увидеть слово на санскрите' : '👆 Click to reveal the Sanskrit word'}
        </div>
      ` : `
        <div class="vocab-deva" style="font-size:2.4rem;margin-bottom:0.25rem;">${item.deva}</div>
        <div class="vocab-iast" style="font-size:1.15rem;margin-bottom:0.4rem;">${item.iast}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.4rem;">${meaning}</div>
        <div style="font-size:0.82rem;background:var(--bg-secondary);padding:0.45rem 0.85rem;border-radius:8px;color:var(--text-primary);">
          🗣 ${hint}
        </div>
      `}
    </div>

    <div style="display:flex;justify-content:center;gap:0.65rem;flex-wrap:wrap;">
      <button type="button" class="chip-btn" onclick="prevFlashcard()">← ${currentLang === 'ru' ? 'Назад' : 'Prev'}</button>
      <button type="button" class="chip-btn active" onclick="flipFlashcard()">↺ ${currentLang === 'ru' ? 'Перевернуть' : 'Flip Card'}</button>
      <button type="button" class="chip-btn" onclick="speakSanskritWord('${item.ttsText}', '${item.iast}')">🔊 ${currentLang === 'ru' ? 'Озвучить' : 'Listen'}</button>
      <button type="button" class="chip-btn" onclick="nextFlashcard()">${currentLang === 'ru' ? 'Дальше' : 'Next'} →</button>
    </div>
  `;
}

function flipFlashcard() {
  fcFlipped = !fcFlipped;
  if (fcFlipped) {
    const item = bodyPartsVocab[fcIndex];
    speakSanskritWord(item.ttsText, item.iast);
  }
  renderPracticeArena();
}

function nextFlashcard() {
  fcIndex = (fcIndex + 1) % bodyPartsVocab.length;
  fcFlipped = false;
  renderPracticeArena();
}

function prevFlashcard() {
  fcIndex = (fcIndex - 1 + bodyPartsVocab.length) % bodyPartsVocab.length;
  fcFlipped = false;
  renderPracticeArena();
}

// GAME 2: Fill in the Gaps (Meaning Cloze Drill without gender endings)
function renderFillGapsGame(arena) {
  const item = bodyPartsVocab[gapIndex];
  const promptText = currentLang === 'ru' ? item.gapPromptRu : item.gapPromptEn;

  const distractors = [
    bodyPartsVocab[(gapIndex + 3) % bodyPartsVocab.length],
    bodyPartsVocab[(gapIndex + 6) % bodyPartsVocab.length],
    bodyPartsVocab[(gapIndex + 9) % bodyPartsVocab.length]
  ];
  const options = [item, ...distractors].sort((a, b) => a.id.localeCompare(b.id));

  const optionsHtml = options.map(opt => {
    const optMeaning = currentLang === 'ru' ? opt.ru : opt.en;
    return `
      <button type="button" class="quiz-opt-btn" id="gap-opt-${opt.id}" onclick="checkGapAnswer('${opt.id}')">
        <div style="font-family:var(--font-deva);font-size:1.35rem;font-weight:700;">${opt.deva}</div>
        <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-saffron);">${opt.iast}</div>
        <div style="font-size:0.78rem;color:var(--text-secondary);">${optMeaning}</div>
      </button>
    `;
  }).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 2: Fill in the Gaps (Вставь пропущенное слово)' : 'Game 2: Fill in the Gaps'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Выберите подходящее по смыслу слово на санскрите, чтобы заполнить пропуск' : 'Choose the Sanskrit word that fits the definition to fill the gap'}
        </div>
      </div>
      <span class="game-score-pill">${currentLang === 'ru' ? 'Счёт:' : 'Score:'} ${gapScore} · (${gapIndex + 1}/${bodyPartsVocab.length})</span>
    </div>

    <div style="display:flex;align-items:center;gap:1.25rem;background:var(--bg-primary);padding:1.25rem;border-radius:12px;border:1px solid var(--border-color);flex-wrap:wrap;justify-content:center;">
      <div class="vocab-svg-box" style="margin:0;width:95px;height:95px;">${item.svg}</div>
      <div style="flex:1;min-width:220px;">
        <div style="font-size:1.15rem;font-weight:700;color:var(--text-primary);margin-bottom:0.3rem;" id="gap-sentence-display">
          ${promptText}
        </div>
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
  const promptText = currentLang === 'ru' ? item.gapPromptRu : item.gapPromptEn;

  if (chosenId === item.id) {
    gapAnswered = true;
    gapScore++;
    if (btn) btn.classList.add('correct');
    const sentenceEl = document.getElementById('gap-sentence-display');
    if (sentenceEl) {
      sentenceEl.innerHTML = promptText.replace('___', `<span style="color:var(--accent-cambridge);font-family:var(--font-deva);font-size:1.35rem;text-decoration:underline;">${item.deva}<span class="iast-text"> (${item.iast})</span></span>`);
    }
    speakSanskritWord(item.ttsText, item.iast);
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div style="color:#15803d;font-weight:700;margin-bottom:0.5rem;">
          ✓ ${currentLang === 'ru' ? 'Верно!' : 'Correct!'} ${item.deva}<span class="iast-text"> (${item.iast})</span>
        </div>
        <button type="button" class="chip-btn active" onclick="nextGapRound()">
          ${currentLang === 'ru' ? 'Следующее задание →' : 'Next Question →'}
        </button>
      `;
    }
  } else {
    if (btn) btn.classList.add('wrong');
    if (feedbackEl) {
      feedbackEl.innerHTML = `<div style="color:#dc2626;font-weight:600;">${currentLang === 'ru' ? 'Попробуйте другое слово!' : 'Try another word!'}</div>`;
    }
  }
}

function nextGapRound() {
  gapIndex = (gapIndex + 1) % bodyPartsVocab.length;
  gapAnswered = false;
  renderPracticeArena();
}

// GAME 3: Picture Quiz (See Picture -> Pick Word)
function renderPictureQuizGame(arena) {
  const item = bodyPartsVocab[pqIndex];
  const distractors = [
    bodyPartsVocab[(pqIndex + 2) % bodyPartsVocab.length],
    bodyPartsVocab[(pqIndex + 5) % bodyPartsVocab.length],
    bodyPartsVocab[(pqIndex + 8) % bodyPartsVocab.length]
  ];
  const options = [item, ...distractors].sort((a, b) => a.id.localeCompare(b.id));

  const optionsHtml = options.map(opt => `
    <button type="button" class="quiz-opt-btn" id="pq-opt-${opt.id}" onclick="checkPicQuizAnswer('${opt.id}')">
      <div style="font-family:var(--font-deva);font-size:1.45rem;font-weight:700;">${opt.deva}</div>
      <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.82rem;color:var(--accent-saffron);">${opt.iast}</div>
    </button>
  `).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 3: Picture Quiz (Угадай слово по картинке)' : 'Game 3: Picture Quiz'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Выберите правильное санскритское слово для показанной картинки' : 'Pick the Sanskrit word matching the illustration'}
        </div>
      </div>
      <span class="game-score-pill">${currentLang === 'ru' ? 'Счёт:' : 'Score:'} ${pqScore} · (${pqIndex + 1}/${bodyPartsVocab.length})</span>
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
    pqScore++;
    if (btn) btn.classList.add('correct');
    speakSanskritWord(item.ttsText, item.iast);
    const meaning = currentLang === 'ru' ? item.ru : item.en;
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div style="color:#15803d;font-weight:700;margin-bottom:0.5rem;">
          ✓ ${currentLang === 'ru' ? 'Отлично!' : 'Spot on!'} ${item.deva}<span class="iast-text"> (${item.iast})</span> — ${meaning}
        </div>
        <button type="button" class="chip-btn active" onclick="nextPicQuizRound()">
          ${currentLang === 'ru' ? 'Дальше →' : 'Next →'}
        </button>
      `;
    }
  } else {
    if (btn) btn.classList.add('wrong');
  }
}

function nextPicQuizRound() {
  pqIndex = (pqIndex + 1) % bodyPartsVocab.length;
  pqAnswered = false;
  renderPracticeArena();
}

// GAME 4: Word -> Picture Quiz (Read Sanskrit Word -> Click Picture)
function renderWordToPicQuizGame(arena) {
  const item = bodyPartsVocab[wqIndex];
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
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 4: Найди картинку по слову (Read & Match)' : 'Game 4: Read & Pick the Picture'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Прочитайте слово на деванагари и нажмите на соответствующую картинку' : 'Read the Sanskrit word and click the matching picture'}
        </div>
      </div>
      <span class="game-score-pill">${currentLang === 'ru' ? 'Счёт:' : 'Score:'} ${wqScore} · (${wqIndex + 1}/${bodyPartsVocab.length})</span>
    </div>

    <div style="text-align:center;padding:0.75rem;background:var(--bg-primary);border-radius:12px;border:1px solid var(--border-color);">
      <div class="vocab-deva" style="font-size:2.2rem;">${item.deva}</div>
      <div class="vocab-iast" style="font-size:1rem;">${item.iast}</div>
      <button type="button" class="chip-btn" style="margin-top:0.35rem;" onclick="speakSanskritWord('${item.ttsText}', '${item.iast}')">🔊 ${currentLang === 'ru' ? 'Прослушать' : 'Listen'}</button>
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
    wqScore++;
    if (btn) btn.classList.add('correct');
    speakSanskritWord(item.ttsText, item.iast);
    const meaning = currentLang === 'ru' ? item.ru : item.en;
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div style="color:#15803d;font-weight:700;margin-bottom:0.5rem;">
          ✓ ${currentLang === 'ru' ? 'Верно!' : 'Correct!'} ${item.deva} — ${meaning}
        </div>
        <button type="button" class="chip-btn active" onclick="nextWordQuizRound()">
          ${currentLang === 'ru' ? 'Следующее слово →' : 'Next Word →'}
        </button>
      `;
    }
  } else {
    if (btn) btn.classList.add('wrong');
  }
}

function nextWordQuizRound() {
  wqIndex = (wqIndex + 1) % bodyPartsVocab.length;
  wqAnswered = false;
  renderPracticeArena();
}

// GAME 5: Match Pairs (Pelmanism — 4 Pictures + 4 Words = 8 tiles)
function initMatchGame() {
  const subset = [...bodyPartsVocab].sort(() => Math.random() - 0.5).slice(0, 4);
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
  if (matchTiles.length === 0) initMatchGame();

  const tilesHtml = matchTiles.map((t, idx) => {
    const isSelected = matchFirstIdx === idx;
    const classes = ['match-tile'];
    if (isSelected) classes.push('selected');
    if (t.matched) classes.push('matched');

    const content = t.type === 'pic'
      ? `<div class="vocab-svg-box" style="margin:0;width:68px;height:68px;">${t.item.svg}</div>`
      : `<div style="font-family:var(--font-deva);font-size:1.35rem;font-weight:700;">${t.item.deva}</div>
         <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.76rem;color:var(--accent-saffron);">${t.item.iast}</div>`;

    return `
      <div class="${classes.join(' ')}" onclick="clickMatchTile(${idx})">
        ${content}
      </div>
    `;
  }).join('');

  const allDone = matchMatchedCount === 4;

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 5: Match Pairs (Соедини картинку и слово)' : 'Game 5: Match Pairs (Picture + Word)'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Нажмите на картинку, а затем на соответствующее ей санскритское слово' : 'Click a picture tile and then its matching Sanskrit word tile'}
        </div>
      </div>
      <span class="game-score-pill">${matchMatchedCount} / 4 ${currentLang === 'ru' ? 'пар' : 'pairs'}</span>
    </div>

    <div class="match-grid">${tilesHtml}</div>

    ${allDone ? `
      <div style="margin-top:1.25rem;text-align:center;">
        <div style="color:#15803d;font-weight:700;margin-bottom:0.5rem;">
          🎉 ${currentLang === 'ru' ? 'Все пары найдены!' : 'All pairs matched!'}
        </div>
        <button type="button" class="chip-btn active" onclick="initMatchGame(); renderPracticeArena();">
          ${currentLang === 'ru' ? 'Сыграть ещё раз с новыми словами ↺' : 'Play Again with New Words ↺'}
        </button>
      </div>
    ` : ''}
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
    if (tile.type === 'word') speakSanskritWord(tile.item.ttsText, tile.item.iast);
    renderPracticeArena();
  } else {
    const firstTile = matchTiles[matchFirstIdx];
    if (firstTile.pairId === tile.pairId && firstTile.type !== tile.type) {
      firstTile.matched = true;
      tile.matched = true;
      matchMatchedCount++;
      speakSanskritWord(tile.item.ttsText, tile.item.iast);
    }
    matchFirstIdx = null;
    renderPracticeArena();
  }
}

// GAME 6: Missing Syllable / Devanagari Spelling Drill
function renderSpellingGame(arena) {
  const item = bodyPartsVocab[spIndex];
  const meaning = currentLang === 'ru' ? item.ru : item.en;

  const choicesHtml = item.missingChoices.map((ch, i) => `
    <button type="button" class="quiz-opt-btn" id="sp-opt-${i}" onclick="checkSpellingAnswer('${ch}', ${i})">
      <div style="font-family:var(--font-deva);font-size:1.65rem;font-weight:700;">${ch}</div>
    </button>
  `).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 6: Собери слово по слогам (Spelling Drill)' : 'Game 6: Complete the Devanāgarī Word'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Выберите пропущенный слог деванагари, чтобы получилось правильное слово' : 'Choose the missing Devanāgarī syllable to complete the word'}
        </div>
      </div>
      <span class="game-score-pill">${currentLang === 'ru' ? 'Счёт:' : 'Score:'} ${spScore} · (${spIndex + 1}/${bodyPartsVocab.length})</span>
    </div>

    <div style="text-align:center;background:var(--bg-primary);padding:1.25rem;border-radius:12px;border:1px solid var(--border-color);">
      <div class="vocab-svg-box" style="width:95px;height:95px;margin:0 auto 0.5rem;">${item.svg}</div>
      <div style="font-family:var(--font-deva);font-size:2.3rem;font-weight:700;letter-spacing:0.06em;" id="sp-word-display">
        ${item.missingDisplay}
      </div>
      <div style="font-size:0.9rem;color:var(--text-secondary);"><span class="iast-text">${item.iast} — </span><strong>${meaning}</strong></div>
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
    spScore++;
    if (btn) btn.classList.add('correct');
    const wordDisp = document.getElementById('sp-word-display');
    if (wordDisp) wordDisp.innerHTML = `<span style="color:var(--accent-cambridge);">${item.deva}</span>`;
    speakSanskritWord(item.ttsText, item.iast);
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div style="color:#15803d;font-weight:700;margin-bottom:0.5rem;">
          ✓ ${item.deva}<span class="iast-text"> (${item.iast})</span>
        </div>
        <button type="button" class="chip-btn active" onclick="nextSpellingRound()">
          ${currentLang === 'ru' ? 'Следующее слово →' : 'Next Word →'}
        </button>
      `;
    }
  } else {
    if (btn) btn.classList.add('wrong');
  }
}

function nextSpellingRound() {
  spIndex = (spIndex + 1) % bodyPartsVocab.length;
  spAnswered = false;
  renderPracticeArena();
}

// GAME 7: True or False ("Ām / Na")
function prepareTrueFalseRound() {
  tfAnswered = false;
  tfIsTrue = Math.random() >= 0.45;
  if (tfIsTrue) {
    tfDisplayedWordIdx = tfIndex;
  } else {
    tfDisplayedWordIdx = (tfIndex + 3) % bodyPartsVocab.length;
  }
}

function renderTrueFalseGame(arena) {
  const picItem = bodyPartsVocab[tfIndex];
  const wordItem = bodyPartsVocab[tfDisplayedWordIdx];

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 7: Правда или Ложь (आम् / न — True or False)' : 'Game 7: True or False (Ām / Na)'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Совпадает ли подпись на санскрите с картинкой?' : 'Does the Sanskrit word match the picture shown?'}
        </div>
      </div>
      <span class="game-score-pill">${currentLang === 'ru' ? 'Счёт:' : 'Score:'} ${tfScore}</span>
    </div>

    <div style="text-align:center;background:var(--bg-primary);padding:1.35rem;border-radius:12px;border:1px solid var(--border-color);">
      <div class="vocab-svg-box" style="width:115px;height:115px;margin:0 auto 0.65rem;">${picItem.svg}</div>
      <div style="font-family:var(--font-deva);font-size:1.75rem;font-weight:700;color:var(--text-primary);">
        <span style="color:var(--accent-saffron);">${wordItem.deva}</span><span class="iast-text"> (${wordItem.iast})</span> ?
      </div>
    </div>

    <div class="quiz-options-grid">
      <button type="button" class="quiz-opt-btn" id="tf-btn-true" onclick="checkTrueFalse(true)">
        <div style="font-family:var(--font-deva);font-size:1.45rem;font-weight:700;color:#15803d;">आम्<span class="iast-text"> (Ām)</span></div>
        <div style="font-size:0.85rem;font-weight:700;">${currentLang === 'ru' ? 'Да, верно' : 'Yes, True'}</div>
      </button>
      <button type="button" class="quiz-opt-btn" id="tf-btn-false" onclick="checkTrueFalse(false)">
        <div style="font-family:var(--font-deva);font-size:1.45rem;font-weight:700;color:#dc2626;">न<span class="iast-text"> (Na)</span></div>
        <div style="font-size:0.85rem;font-weight:700;">${currentLang === 'ru' ? 'Нет, неверно' : 'No, False'}</div>
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

  speakSanskritWord(picItem.ttsText, picItem.iast);
  const meaning = currentLang === 'ru' ? picItem.ru : picItem.en;

  if (feedbackEl) {
    feedbackEl.innerHTML = `
      <div style="font-weight:700;color:${isCorrect ? '#15803d' : '#dc2626'};margin-bottom:0.5rem;">
        ${isCorrect ? (currentLang === 'ru' ? '✓ Правильно!' : '✓ Correct!') : (currentLang === 'ru' ? '✕ Ошибка!' : '✕ Not quite!')}
        ${currentLang === 'ru' ? 'На картинке:' : 'Shown in picture:'} <strong>${picItem.deva}<span class="iast-text"> (${picItem.iast})</span> — ${meaning}</strong>
      </div>
      <button type="button" class="chip-btn active" onclick="nextTrueFalseRound()">
        ${currentLang === 'ru' ? 'Следующий вопрос →' : 'Next Question →'}
      </button>
    `;
  }
}

function nextTrueFalseRound() {
  tfIndex = (tfIndex + 1) % bodyPartsVocab.length;
  prepareTrueFalseRound();
  renderPracticeArena();
}

// 3. Render Stage 3: PRODUCTION ("Point & Speak Aloud" TPR Activity — zero gender mention)
function selectProductionWord(wordId) {
  activeProdWordId = wordId;
  producedWordsSet.add(wordId);
  const item = bodyPartsVocab.find(w => w.id === wordId);
  if (item) {
    speakSanskritWord(item.ttsText, item.iast);
  }
  renderProductionStage();
}

function renderProductionStage() {
  const container = document.getElementById('lesson1-production-stage');
  if (!container) return;

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

  const wordMeaning = currentLang === 'ru' ? activeItem.ru : activeItem.en;
  const hint = currentLang === 'ru' ? activeItem.pronounceHintRu : activeItem.pronounceHintEn;

  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:1rem;">
      <div style="font-weight:700;color:var(--text-primary);">
        ${currentLang === 'ru'
          ? 'Выберите любую часть тела, покажите её у себя и чётко назовите вслух на санскрите:'
          : 'Click any body part, point to it on yourself, and speak the Sanskrit word aloud:'}
      </div>
      <span class="game-score-pill">${producedWordsSet.size} / 12 ${currentLang === 'ru' ? 'слов названо' : 'words spoken'}</span>
    </div>

    <div class="preset-buttons" style="margin-bottom:1.25rem;">${chipsHtml}</div>

    <div style="display:flex;align-items:center;gap:1.5rem;background:var(--bg-primary);padding:1.5rem;border-radius:16px;border:1.5px solid var(--border-strong);flex-wrap:wrap;">
      <div class="vocab-svg-box" style="margin:0;width:120px;height:120px;">${activeItem.svg}</div>
      <div style="flex:1;min-width:240px;">
        <div style="font-family:var(--font-deva);font-size:2.2rem;font-weight:700;color:var(--text-primary);margin-bottom:0.15rem;">
          ${activeItem.deva}
        </div>
        <div style="font-family:var(--font-mono);font-size:1.05rem;color:var(--accent-saffron);margin-bottom:0.35rem;">
          <span class="iast-text">${activeItem.iast} — </span><strong>${wordMeaning}</strong>
        </div>
        <div style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:0.85rem;">
          🗣 ${hint}
        </div>
        <button type="button" class="btn btn-primary" style="padding:0.55rem 1.1rem;font-size:0.86rem;"
                onclick="speakSanskritWord('${activeItem.ttsText}', '${activeItem.iast}')">
          🔊 ${currentLang === 'ru' ? 'Прослушать и повторить вслух' : 'Listen & Repeat Aloud'}
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
  prepareTrueFalseRound();
  refreshLesson1();
});
