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
    gapDeva: '_यन',
    gapIast: '_yana',
    gapAnswer: 'न',
    gapChoices: [
      { deva: 'न', iast: 'na' },
      { deva: 'ना', iast: 'nā' },
      { deva: 'म', iast: 'ma' },
      { deva: 'प', iast: 'pa' }
    ],
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
    gapDeva: '_सिका',
    gapIast: '_sikā',
    gapAnswer: 'ना',
    gapChoices: [
      { deva: 'ना', iast: 'nā' },
      { deva: 'न', iast: 'na' },
      { deva: 'नी', iast: 'nī' },
      { deva: 'मा', iast: 'mā' }
    ],
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
    gapDeva: '_ह्वा',
    gapIast: '_hvā',
    gapAnswer: 'जि',
    gapChoices: [
      { deva: 'जि', iast: 'ji' },
      { deva: 'जी', iast: 'jī' },
      { deva: 'जा', iast: 'jā' },
      { deva: 'दि', iast: 'di' }
    ],
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
    gapDeva: '_र्ण',
    gapIast: '_rṇa',
    gapAnswer: 'क',
    gapChoices: [
      { deva: 'क', iast: 'ka' },
      { deva: 'का', iast: 'kā' },
      { deva: 'ग', iast: 'ga' },
      { deva: 'प', iast: 'pa' }
    ],
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
    gapDeva: '_र्ष',
    gapIast: '_rṣa',
    gapAnswer: 'शी',
    gapChoices: [
      { deva: 'शी', iast: 'śī' },
      { deva: 'शि', iast: 'śi' },
      { deva: 'सी', iast: 'sī' },
      { deva: 'शा', iast: 'śā' }
    ],
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
    gapDeva: 'ल_ट',
    gapIast: 'la_ṭa',
    gapAnswer: 'ला',
    gapChoices: [
      { deva: 'ला', iast: 'lā' },
      { deva: 'ल', iast: 'la' },
      { deva: 'ली', iast: 'lī' },
      { deva: 'रा', iast: 'rā' }
    ],
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
    gapDeva: 'भ्_',
    gapIast: 'bh_',
    gapAnswer: 'रू',
    gapChoices: [
      { deva: 'रू', iast: 'rū' },
      { deva: 'रु', iast: 'ru' },
      { deva: 'री', iast: 'rī' },
      { deva: 'रा', iast: 'rā' }
    ],
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
    gapDeva: 'ओ_',
    gapIast: 'o_',
    gapAnswer: 'ष्ठ',
    gapChoices: [
      { deva: 'ष्ठ', iast: 'ṣṭha' },
      { deva: 'ष्ट', iast: 'ṣṭa' },
      { deva: 'ष्ठा', iast: 'ṣṭhā' },
      { deva: 'स्त', iast: 'sta' }
    ],
    missingDisplay: 'ओ _',
    missingAnswer: 'ष्ठ',
    missingChoices: ['ष्ठ', 'ष्ट', 'ष्ण', 'स्म'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M16 47C26 34 42 34 50 40C58 34 74 34 84 47C68 50 32 50 16 47Z" fill="#FDA4AF" stroke="#14213D" stroke-width="2.6"/>
      <path d="M16 47C30 68 70 68 84 47C66 50 34 50 16 47Z" fill="#E11D48" stroke="#14213D" stroke-width="3.2"/>
      <path d="M36 56C45 60 55 60 64 56" stroke="#FFE4E6" stroke-width="2" stroke-linecap="round"/>
      <path d="M50 86V65M44 71L50 64L56 71" stroke="#DC2626" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
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
    gapDeva: '_र',
    gapIast: '_ra',
    gapAnswer: 'क',
    gapChoices: [
      { deva: 'क', iast: 'ka' },
      { deva: 'का', iast: 'kā' },
      { deva: 'च', iast: 'ca' },
      { deva: 'त', iast: 'ta' }
    ],
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
    gapDeva: '_द',
    gapIast: '_da',
    gapAnswer: 'पा',
    gapChoices: [
      { deva: 'पा', iast: 'pā' },
      { deva: 'प', iast: 'pa' },
      { deva: 'पी', iast: 'pī' },
      { deva: 'बा', iast: 'bā' }
    ],
    missingDisplay: 'पा _',
    missingAnswer: 'द',
    missingChoices: ['द', 'त', 'प', 'ब'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#FFFFFF"/>
      <path d="M48 12C46 26 45 42 47 56C48 61 42 65 32 69C23 72 17 75 17 80C17 84 24 85 35 85C46 85 52 82 59 83C66 84 74 85 78 81C82 77 80 69 75 64C71 59 69 52 71 36C72 25 71 17 69 12" fill="#F3C6A8" stroke="#14213D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M62 60C60 64 62 68 66 68" stroke="#14213D" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M22 76C25 75 28 76 28 79" stroke="#14213D" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M24 84C24 81 26 79 28 79 M31 85C31 82 32 80 34 80 M37 85C37 82 38 81 40 81" stroke="#14213D" stroke-width="1.8" stroke-linecap="round"/>
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
    gapDeva: '_न्त',
    gapIast: '_nta',
    gapAnswer: 'द',
    gapChoices: [
      { deva: 'द', iast: 'da' },
      { deva: 'दा', iast: 'dā' },
      { deva: 'त', iast: 'ta' },
      { deva: 'ध', iast: 'dha' }
    ],
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
    gapDeva: 'अङ्गु_',
    gapIast: 'aṅgu_',
    gapAnswer: 'ली',
    gapChoices: [
      { deva: 'ली', iast: 'lī' },
      { deva: 'लि', iast: 'li' },
      { deva: 'ला', iast: 'lā' },
      { deva: 'री', iast: 'rī' }
    ],
    missingDisplay: 'अ _ ली',
    missingAnswer: 'ङ्गु',
    missingChoices: ['ङ्गु', 'म्बु', 'न्दु', 'ञ्जु'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M18 76L33 58C35 55 37 53 39 50L50 36C52 33 55 30 58 26C64 19 76 26 70 36L59 51C57 54 54 57 52 60L38 84Z" fill="#F3C6A8" stroke="#14213D" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="64" cy="29" rx="5" ry="6" transform="rotate(-38 64 29)" fill="#FDE2E4" stroke="#14213D" stroke-width="2"/>
      <path d="M48 43C51 45 54 47 56 50" stroke="#14213D" stroke-width="2.1" stroke-linecap="round"/>
      <path d="M46 46C49 48 51 49 53 52" stroke="#14213D" stroke-width="1.5" stroke-linecap="round" opacity="0.75"/>
      <path d="M35 59C39 61 42 64 45 67" stroke="#14213D" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M33 62C36 64 39 66 42 69" stroke="#14213D" stroke-width="1.5" stroke-linecap="round" opacity="0.75"/>
    </svg>`
  }
];

// Lesson 1 State
let currentPresentationMode = 'stepbystep'; // 'stepbystep' (default) | 'hotspots' | 'audiofirst' | 'poster'
let presStepIndex = 0; // 0..3 for the 4 steps of 3 words
let activeHotspotId = 'shirsha';
let audioFirstHeardIds = new Set();
let audioFirstRevealedIds = new Set();

const presentationSteps = [
  {
    num: 1,
    titleRu: 'Шаг 1 из 6 · शीर्ष · ललाट',
    titleEn: 'Step 1 of 6 · शीर्ष · ललाट',
    wordIds: ['shirsha', 'lalata']
  },
  {
    num: 2,
    titleRu: 'Шаг 2 из 6 · भ्रू · नयन',
    titleEn: 'Step 2 of 6 · भ्रू · नयन',
    wordIds: ['bhru', 'nayana']
  },
  {
    num: 3,
    titleRu: 'Шаг 3 из 6 · नासिका · कर्ण',
    titleEn: 'Step 3 of 6 · नासिका · कर्ण',
    wordIds: ['nasika', 'karna']
  },
  {
    num: 4,
    titleRu: 'Шаг 4 из 6 · ओष्ठ · जिह्वा',
    titleEn: 'Step 4 of 6 · ओष्ठ · जिह्वा',
    wordIds: ['ostha', 'jihva']
  },
  {
    num: 5,
    titleRu: 'Шаг 5 из 6 · दन्त · कर',
    titleEn: 'Step 5 of 6 · दन्त · कर',
    wordIds: ['danta', 'kara']
  },
  {
    num: 6,
    titleRu: 'Шаг 6 из 6 · अङ्गुली · पाद',
    titleEn: 'Step 6 of 6 · अङ्गुली · पाद',
    wordIds: ['anguli', 'pada']
  }
];

const hotspotPositions = [
  // Picture 1: Face & Head close-up (pins 2..9) — badges placed in margins with leader lines so pupils & features are never covered
  { id: 'lalata',  num: 2, pic: 'face', x: 160, y: 24,  tx: 160, ty: 76 },
  { id: 'bhru',    num: 3, pic: 'face', x: 56,  y: 86,  tx: 124, ty: 96 },
  { id: 'nayana',  num: 4, pic: 'face', x: 266, y: 110, tx: 204, ty: 116 },
  { id: 'nasika',  num: 5, pic: 'face', x: 266, y: 146, tx: 167, ty: 146 },
  { id: 'karna',   num: 6, pic: 'face', x: 42,  y: 140, tx: 84,  ty: 140 },
  { id: 'ostha',   num: 7, pic: 'face', x: 64,  y: 198, tx: 148, ty: 192 },
  { id: 'danta',   num: 8, pic: 'face', x: 266, y: 180, tx: 170, ty: 178 },
  { id: 'jihva',   num: 9, pic: 'face', x: 254, y: 218, tx: 163, ty: 186 },
  // Picture 2: Full Standing Person with 2 Arms & 2 Legs (pins 1, 10, 11, 12)
  { id: 'shirsha', num: 1,  pic: 'body', x: 246, y: 32,  tx: 176, ty: 32 },
  { id: 'kara',    num: 10, pic: 'body', x: 46,  y: 118, tx: 88,  ty: 144 },
  { id: 'anguli',  num: 11, pic: 'body', x: 46,  y: 176, tx: 71,  ty: 155 },
  { id: 'pada',    num: 12, pic: 'body', x: 256, y: 232, tx: 198, ty: 238 }
];

let labelsHidden = false;
let posterMaskedMode = false; // Whether the 12-card Presentation poster has pink squares covering word endings
let posterRevealedIds = new Set();
let iastHidden = true;
let currentPracticeGame = 'masked';

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

// Game 10: Categories (Select matching words from all 12 text-only words — 12 categories)
const categoriesData = [
  {
    id: 'sense-head',
    titleRu: 'Органы чувств на голове',
    titleEn: 'Sense Organs on the Head',
    wordIds: ['nayana', 'nasika', 'karna']
  },
  {
    id: 'upper-head',
    titleRu: 'Верхняя часть головы',
    titleEn: 'Upper Part of the Head',
    wordIds: ['shirsha', 'lalata', 'bhru']
  },
  {
    id: 'mouth-area',
    titleRu: 'Область рта',
    titleEn: 'Mouth Area',
    wordIds: ['ostha', 'danta', 'jihva']
  },
  {
    id: 'limbs',
    titleRu: 'Конечности',
    titleEn: 'Limbs',
    wordIds: ['kara', 'anguli', 'pada']
  },
  {
    id: 'long-a',
    titleRu: 'Где встречается долгая гласная «ā» (ा)',
    titleEn: 'Words with Long Vowel "ā" (ा)',
    wordIds: ['nasika', 'jihva', 'lalata', 'pada']
  },
  {
    id: 'long-i',
    titleRu: 'Где встречается долгая гласная «ī» (ी)',
    titleEn: 'Words with Long Vowel "ī" (ी)',
    wordIds: ['shirsha', 'anguli']
  },
  {
    id: 'short-i',
    titleRu: 'Где встречается краткая гласная «i» (ि)',
    titleEn: 'Words with Short Vowel "i" (ि)',
    wordIds: ['nasika', 'jihva']
  },
  {
    id: 'paired',
    titleRu: 'Парные',
    titleEn: 'Paired',
    wordIds: ['nayana', 'karna', 'bhru', 'kara', 'pada'],
    bonusWordIds: ['ostha']
  },
  {
    id: 'unpaired',
    titleRu: 'Непарные',
    titleEn: 'Unpaired',
    wordIds: ['shirsha', 'lalata', 'nasika', 'jihva']
  },
  {
    id: 'grasping-pointing',
    titleRu: 'Чем мы берём что-то, держим что-то или указываем на что-то',
    titleEn: 'What We Use to Take, Hold, or Point at Something',
    wordIds: ['kara', 'anguli']
  },
  {
    id: 'has-r',
    titleRu: 'Слова со звуком «r» (र / र् / ्र)',
    titleEn: 'Words Containing the Sound "r" (र / र् / ्र)',
    wordIds: ['karna', 'shirsha', 'bhru', 'kara']
  },
  {
    id: 'only-short-a',
    titleRu: 'Слова только с краткими гласными «a»',
    titleEn: 'Words with Only Short "a" Vowels',
    wordIds: ['nayana', 'karna', 'kara', 'danta']
  }
];
let catIndex = 0;
let catScore = 0;
let catSelectedCorrectIds = new Set();
let catWrongClickedIds = new Set();
let catFirstTry = true;
let catAnswered = false;
let catFinished = false;

// Game 11: Spelling / Missing Letters state
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

// Teacher's Guide toggle for Presentation / Practice / Production stages
function toggleTeacherGuide(stageKey) {
  const box = document.getElementById('teacher-guide-' + stageKey);
  const btn = document.getElementById('tg-btn-' + stageKey);
  if (!box) return;
  const isOpen = box.classList.toggle('open');
  if (btn) btn.classList.toggle('active', isOpen);
}

// 1. Render Stage 1: PRESENTATION (4 CELTA Modes: 1. Step-by-Step [default], 2. Hotspots, 3. Audio-First, 4. Full Poster)
function selectPresentationMode(mode) {
  currentPresentationMode = mode;
  document.querySelectorAll('.practice-tab-btn[data-pres-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.presMode === mode);
  });
  renderPresentationStage();
}

function renderVocabCardItemHtml(item, large = false) {
  const isRev = posterRevealedIds.has(item.id);
  const devaFontSize = large ? '2.1rem' : '1.55rem';
  const wordHtml = posterMaskedMode
    ? renderMaskedWordMarkup(item, isRev, devaFontSize)
    : `<div class="vocab-deva" style="${large ? 'font-size:2.1rem;' : ''}">${item.deva}</div>`;

  return `
    <div class="vocab-item-card" onclick="handlePosterCardClick('${item.id}', '${item.ttsText}')" style="${large ? 'padding:1.65rem 1.25rem;' : ''}">
      <button type="button" class="vocab-audio-btn" title="🔊" onclick="event.stopPropagation(); speakSanskritWord('${item.ttsText}')">🔊</button>
      <div class="vocab-svg-box" style="${large ? 'width:118px;height:118px;' : ''}">${item.svg}</div>
      ${wordHtml}
      <div class="vocab-iast" style="${large ? 'font-size:0.98rem;' : ''}">${item.iast}</div>
    </div>
  `;
}

function renderStepByStepPresentationHtml() {
  const step = presentationSteps[presStepIndex] || presentationSteps[0];
  const stepTitle = currentLang === 'ru' ? step.titleRu : step.titleEn;
  const playAllLabel = currentLang === 'ru' ? '🔊 Прослушать оба слова' : '🔊 Listen to Both Words';
  const prevLabel = currentLang === 'ru' ? '← Предыдущие 2' : '← Previous 2';
  const nextLabel = currentLang === 'ru' ? 'Следующие 2 →' : 'Next 2 →';

  const stepTabsHtml = presentationSteps.map((s, idx) => {
    const wordsDeva = s.wordIds
      .map(id => bodyPartsVocab.find(w => w.id === id))
      .filter(Boolean)
      .map(w => w.deva)
      .join(' · ');
    return `
      <button type="button" class="chip-btn ${idx === presStepIndex ? 'active' : ''}" onclick="setPresStep(${idx})">
        ${s.num}. ${wordsDeva}
      </button>
    `;
  }).join('');

  const stepCardsHtml = step.wordIds
    .map(id => bodyPartsVocab.find(w => w.id === id))
    .filter(Boolean)
    .map(item => renderVocabCardItemHtml(item, true))
    .join('');

  return `
    <div style="background:var(--bg-card);border:1.5px solid var(--border-strong);border-radius:18px;padding:1.5rem;margin-bottom:2rem;box-shadow:var(--shadow-sm);">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:1.15rem;padding-bottom:0.9rem;border-bottom:1px solid var(--border-color);">
        <div>
          <strong style="font-size:1.15rem;color:var(--text-primary);">${stepTitle}</strong>
        </div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <button type="button" class="chip-btn active" onclick="playCurrentStepAudio()">${playAllLabel}</button>
        </div>
      </div>

      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.25rem;">
        ${stepTabsHtml}
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:1.25rem;max-width:680px;margin:0 auto 1.25rem;">
        ${stepCardsHtml}
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color);">
        <button type="button" class="chip-btn" onclick="setPresStep(${(presStepIndex - 1 + presentationSteps.length) % presentationSteps.length})">
          ${prevLabel}
        </button>
        <span class="game-score-pill">${presStepIndex + 1} / ${presentationSteps.length}</span>
        <button type="button" class="chip-btn active" onclick="setPresStep(${(presStepIndex + 1) % presentationSteps.length})">
          ${nextLabel}
        </button>
      </div>
    </div>
  `;
}

function setPresStep(idx) {
  presStepIndex = idx;
  renderPresentationStage();
}

function playCurrentStepAudio() {
  const step = presentationSteps[presStepIndex] || presentationSteps[0];
  const items = step.wordIds.map(id => bodyPartsVocab.find(w => w.id === id)).filter(Boolean);
  items.forEach((item, i) => {
    setTimeout(() => {
      speakSanskritWord(item.ttsText);
    }, i * 1150);
  });
}

function renderHotspotPinGroupHtml(pos, activeId) {
  const isCurrent = pos.id === activeId;
  const item = bodyPartsVocab.find(w => w.id === pos.id);
  const fill = isCurrent ? '#DC2626' : '#0F766E';
  const r = isCurrent ? 13.5 : 11;
  const stroke = isCurrent ? '#FEF08A' : '#FFFFFF';
  const lineColor = isCurrent ? '#DC2626' : '#0F766E';

  return `
    <g style="cursor:pointer;" onclick="selectHotspotWord('${pos.id}')">
      <line x1="${pos.x}" y1="${pos.y}" x2="${pos.tx}" y2="${pos.ty}" stroke="${lineColor}" stroke-width="${isCurrent ? '2.4' : '1.6'}" stroke-dasharray="${isCurrent ? 'none' : '3,2'}"/>
      <circle cx="${pos.tx}" cy="${pos.ty}" r="${isCurrent ? '4.2' : '3'}" fill="${lineColor}" stroke="#FFFFFF" stroke-width="1.2"/>
      ${isCurrent ? `<circle cx="${pos.x}" cy="${pos.y}" r="19" fill="rgba(220,38,38,0.2)"/>` : ''}
      <circle cx="${pos.x}" cy="${pos.y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2.2"/>
      <text x="${pos.x}" y="${pos.y + 3.8}" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="700" font-family="Plus Jakarta Sans, sans-serif">${pos.num}</text>
      <title>${item ? item.deva : ''}</title>
    </g>
  `;
}

function renderHotspotsPresentationHtml() {
  const sortedPositions = [...hotspotPositions].sort((a, b) => a.num - b.num);
  const activeItem = bodyPartsVocab.find(w => w.id === activeHotspotId) || bodyPartsVocab[0];
  const activePos = hotspotPositions.find(p => p.id === activeItem.id) || hotspotPositions[0];
  const isRev = posterRevealedIds.has(activeItem.id);
  const wordHtml = posterMaskedMode
    ? renderMaskedWordMarkup(activeItem, isRev, '2.25rem')
    : `<div class="vocab-deva" style="font-size:2.25rem;">${activeItem.deva}</div>`;

  const facePinsHtml = hotspotPositions
    .filter(p => p.pic === 'face')
    .map(pos => renderHotspotPinGroupHtml(pos, activeItem.id))
    .join('');

  const bodyPinsHtml = hotspotPositions
    .filter(p => p.pic === 'body')
    .map(pos => renderHotspotPinGroupHtml(pos, activeItem.id))
    .join('');

  const chipsHtml = sortedPositions.map(pos => {
    const item = bodyPartsVocab.find(w => w.id === pos.id);
    if (!item) return '';
    const isCurrent = item.id === activeItem.id;
    return `
      <button type="button" class="chip-btn ${isCurrent ? 'active' : ''}" onclick="selectHotspotWord('${item.id}')">
        ${pos.num}. ${item.deva}<span class="iast-text"> (${item.iast})</span>
      </button>
    `;
  }).join('');

  const hintText = currentLang === 'ru'
    ? 'Нажимайте на точки 1–12 на двух рисунках (Лицо и Человек в полный рост) или на кнопки справа:'
    : 'Click markers 1–12 on the two diagrams (Face Close-Up & Full Person) or the buttons on the right:';
  const faceCaption = currentLang === 'ru' ? '1. Лицо крупным планом (2–9)' : '1. Face Close-Up (2–9)';
  const bodyCaption = currentLang === 'ru' ? '2. Человек в полный рост (1, 10–12)' : '2. Full Person (1, 10–12)';

  return `
    <div style="background:var(--bg-card);border:1.5px solid var(--border-strong);border-radius:18px;padding:1.5rem;margin-bottom:2rem;box-shadow:var(--shadow-sm);">
      <div style="margin-bottom:1rem;font-size:0.92rem;font-weight:600;color:var(--text-secondary);">
        ${hintText}
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(255px, 1fr));gap:1.15rem;align-items:stretch;">
        <!-- PICTURE 1: Face Close-Up (gently smiling, uncovered pupils) -->
        <div style="background:var(--bg-primary);border:1.5px solid ${activePos.pic === 'face' ? 'var(--accent-cambridge)' : 'var(--border-color)'};border-radius:16px;padding:0.75rem;text-align:center;">
          <div style="font-size:0.82rem;font-weight:700;color:var(--accent-cambridge);margin-bottom:0.4rem;">${faceCaption}</div>
          <svg viewBox="0 0 320 260" style="width:100%;max-width:310px;height:auto;display:block;margin:0 auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="308" height="248" rx="14" fill="#F8EFE6" stroke="#E5DEC9" stroke-width="1.5"/>

            <!-- Neck & Shoulders hint -->
            <path d="M134 210V238H186V210" fill="#F4C7AB" stroke="#14213D" stroke-width="2.4"/>
            <path d="M108 246C122 232 198 232 212 246" fill="#0F766E" stroke="#14213D" stroke-width="2.4" stroke-linecap="round"/>

            <!-- Ears (karna) -->
            <ellipse cx="90" cy="140" rx="11" ry="19" fill="#F4C7AB" stroke="#14213D" stroke-width="2.6"/>
            <path d="M88 132C84 136 84 144 88 148" stroke="#14213D" stroke-width="1.8" stroke-linecap="round"/>
            <ellipse cx="230" cy="140" rx="11" ry="19" fill="#F4C7AB" stroke="#14213D" stroke-width="2.6"/>
            <path d="M232 132C236 136 236 144 232 148" stroke="#14213D" stroke-width="1.8" stroke-linecap="round"/>

            <!-- Head / Face Oval -->
            <ellipse cx="160" cy="136" rx="68" ry="82" fill="#F4C7AB" stroke="#14213D" stroke-width="2.8"/>

            <!-- Hair -->
            <path d="M92 120C92 68 122 46 160 46C198 46 228 68 228 120C214 88 190 78 160 78C130 78 106 88 92 120Z" fill="#1E293B" stroke="#14213D" stroke-width="2.4"/>

            <!-- Eyebrows (bhru) -->
            <path d="M114 100C125 92 141 92 150 98" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
            <path d="M170 98C179 92 195 92 206 100" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>

            <!-- Eyes (nayana) — pupils & irises 100% uncovered! -->
            <ellipse cx="132" cy="116" rx="15" ry="9.5" fill="#FFFFFF" stroke="#14213D" stroke-width="2.4"/>
            <circle cx="132" cy="116" r="5.5" fill="#1D4ED8"/>
            <circle cx="132" cy="116" r="2.6" fill="#0F172A"/>
            <circle cx="130" cy="114" r="1.3" fill="#FFFFFF"/>

            <ellipse cx="188" cy="116" rx="15" ry="9.5" fill="#FFFFFF" stroke="#14213D" stroke-width="2.4"/>
            <circle cx="188" cy="116" r="5.5" fill="#1D4ED8"/>
            <circle cx="188" cy="116" r="2.6" fill="#0F172A"/>
            <circle cx="186" cy="114" r="1.3" fill="#FFFFFF"/>

            <!-- Nose (nasika) -->
            <path d="M160 112V145C153 149 149 147 149 143M160 145C167 149 171 147 171 143" stroke="#14213D" stroke-width="2.5" stroke-linecap="round"/>

            <!-- Gentle Smile Mouth with Lips (ostha), Teeth (danta), and Tongue (jihva) -->
            <path d="M132 172C148 167 172 167 188 172C183 196 137 196 132 172Z" fill="#7F1D1D" stroke="#14213D" stroke-width="2.4"/>
            <!-- Upper Teeth (danta) -->
            <path d="M139 172H181V179C170 181 150 181 139 179V172Z" fill="#FFFFFF" stroke="#14213D" stroke-width="1.5"/>
            <!-- Tongue (jihva) -->
            <path d="M148 185C154 180 166 180 172 185C174 194 146 194 148 185Z" fill="#FB7185" stroke="#14213D" stroke-width="1.6"/>
            <!-- Gently smiling lips (ostha) -->
            <path d="M129 171C146 165 174 165 191 171" stroke="#E11D48" stroke-width="3.2" stroke-linecap="round"/>
            <path d="M133 173C146 197 174 197 187 173" stroke="#E11D48" stroke-width="3.4" stroke-linecap="round"/>

            <!-- Face Hotspot Pins (2..9) -->
            ${facePinsHtml}
          </svg>
        </div>

        <!-- PICTURE 2: Full Standing Person (2 arms/hands, 2 legs/feet, smiling, uncovered pupils) -->
        <div style="background:var(--bg-primary);border:1.5px solid ${activePos.pic === 'body' ? 'var(--accent-cambridge)' : 'var(--border-color)'};border-radius:16px;padding:0.75rem;text-align:center;">
          <div style="font-size:0.82rem;font-weight:700;color:var(--accent-cambridge);margin-bottom:0.4rem;">${bodyCaption}</div>
          <svg viewBox="0 0 320 260" style="width:100%;max-width:310px;height:auto;display:block;margin:0 auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="308" height="248" rx="14" fill="#F8EFE6" stroke="#E5DEC9" stroke-width="1.5"/>

            <!-- Left Arm & Hand (kara) with Fingers (anguli) -->
            <path d="M132 84L96 132L86 142" stroke="#F4C7AB" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M132 84L96 132L86 142" stroke="#14213D" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="86" cy="144" r="8" fill="#F4C7AB" stroke="#14213D" stroke-width="2.2"/>
            <!-- 5 Left Hand Fingers (anguli) -->
            <path d="M80 139L70 135 M78 143L67 144 M79 147L69 154 M83 150L76 160 M89 150L86 160" stroke="#14213D" stroke-width="2.6" stroke-linecap="round"/>

            <!-- Right Arm & Hand (2nd arm/hand) -->
            <path d="M188 84L224 132L234 142" stroke="#F4C7AB" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M188 84L224 132L234 142" stroke="#14213D" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="234" cy="144" r="8" fill="#F4C7AB" stroke="#14213D" stroke-width="2.2"/>
            <!-- 5 Right Hand Fingers -->
            <path d="M240 139L250 135 M242 143L253 144 M241 147L251 154 M237 150L244 160 M231 150L234 160" stroke="#14213D" stroke-width="2.6" stroke-linecap="round"/>

            <!-- Left Leg & Foot (1st leg) -->
            <path d="M145 158V228" stroke="#F4C7AB" stroke-width="13" stroke-linecap="round"/>
            <path d="M139 158V226M151 158V226" stroke="#14213D" stroke-width="2.4" stroke-linecap="round"/>
            <path d="M151 226C151 234 146 240 136 240H120C115 240 114 234 120 231L139 225Z" fill="#F4C7AB" stroke="#14213D" stroke-width="2.4" stroke-linejoin="round"/>

            <!-- Right Leg & Foot (2nd leg — pada) -->
            <path d="M175 158V228" stroke="#F4C7AB" stroke-width="13" stroke-linecap="round"/>
            <path d="M169 158V226M181 158V226" stroke="#14213D" stroke-width="2.4" stroke-linecap="round"/>
            <path d="M169 226C169 234 174 240 184 240H202C207 240 208 234 202 231L181 225Z" fill="#F4C7AB" stroke="#14213D" stroke-width="2.4" stroke-linejoin="round"/>

            <!-- Tunic / Kurta & Shorts -->
            <path d="M130 78C144 85 176 85 190 78L196 154H124L130 78Z" fill="#0F766E" stroke="#14213D" stroke-width="2.5" stroke-linejoin="round"/>
            <path d="M132 154H188L186 184H163L160 168L157 184H134L132 154Z" fill="#1E3A5F" stroke="#14213D" stroke-width="2.3" stroke-linejoin="round"/>

            <!-- Neck & Head (shirsha) with uncovered eyes & gentle smile -->
            <rect x="153" y="68" width="14" height="12" rx="4" fill="#F4C7AB" stroke="#14213D" stroke-width="2.2"/>
            <ellipse cx="160" cy="46" rx="22" ry="25" fill="#F4C7AB" stroke="#14213D" stroke-width="2.6"/>
            <path d="M138 42C138 25 148 18 160 18C172 18 182 25 182 42C176 32 168 29 160 29C152 29 144 32 138 42Z" fill="#1E293B" stroke="#14213D" stroke-width="2.2"/>
            <!-- Uncovered Eyes with Pupils -->
            <circle cx="152" cy="44" r="2.3" fill="#0F172A"/>
            <circle cx="168" cy="44" r="2.3" fill="#0F172A"/>
            <!-- Gentle Smile -->
            <path d="M152 55C156 60 164 60 168 55" stroke="#14213D" stroke-width="2.2" stroke-linecap="round"/>

            <!-- Body Hotspot Pins (1, 10, 11, 12) -->
            ${bodyPinsHtml}
          </svg>
        </div>

        <!-- Active Hotspot Close-up Card -->
        <div style="display:flex;flex-direction:column;justify-content:space-between;">
          <div class="vocab-item-card" onclick="handlePosterCardClick('${activeItem.id}', '${activeItem.ttsText}')" style="padding:1.35rem 1rem;margin-bottom:0.85rem;">
            <span class="game-score-pill" style="position:absolute;top:0.65rem;left:0.65rem;">#${activePos.num} / 12</span>
            <button type="button" class="vocab-audio-btn" title="🔊" onclick="event.stopPropagation(); speakSanskritWord('${activeItem.ttsText}')">🔊</button>
            <div class="vocab-svg-box" style="width:112px;height:112px;margin-bottom:0.5rem;">${activeItem.svg}</div>
            ${wordHtml}
            <div class="vocab-iast" style="font-size:1rem;">${activeItem.iast}</div>
            <div style="display:flex;justify-content:center;gap:0.6rem;margin-top:0.75rem;" onclick="event.stopPropagation();">
              <button type="button" class="chip-btn" onclick="stepHotspotWord(-1)">←</button>
              <button type="button" class="chip-btn active" onclick="speakSanskritWord('${activeItem.ttsText}')">🔊</button>
              <button type="button" class="chip-btn" onclick="stepHotspotWord(1)">→</button>
            </div>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
            ${chipsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

function selectHotspotWord(wordId) {
  activeHotspotId = wordId;
  const item = bodyPartsVocab.find(w => w.id === wordId);
  if (item) speakSanskritWord(item.ttsText);
  renderPresentationStage();
}

function stepHotspotWord(delta) {
  const ordered = [...hotspotPositions].sort((a, b) => a.num - b.num);
  const idx = ordered.findIndex(p => p.id === activeHotspotId);
  const nextPos = ordered[(idx + delta + ordered.length) % ordered.length];
  if (nextPos) selectHotspotWord(nextPos.id);
}

function renderAudioFirstPresentationHtml() {
  const instructionText = currentLang === 'ru'
    ? 'Правило CELTA «Сначала ухо — потом глаз»: нажмите на карточку, чтобы сначала услышать и повторить слово, а вторым нажатием откройте буквы'
    : 'CELTA Audio-First Rule: click a card once to hear & repeat the word from the picture, then click again to reveal the written form';
  const revealAllLabel = currentLang === 'ru' ? '👁 Открыть все буквы' : '👁 Reveal All Letters';
  const resetAllLabel = currentLang === 'ru' ? '↺ Снова скрыть буквы' : '↺ Hide All Letters';

  const cardsHtml = bodyPartsVocab.map(item => {
    const heard = audioFirstHeardIds.has(item.id);
    const revealed = audioFirstRevealedIds.has(item.id);
    const listenLabel = currentLang === 'ru' ? '🔊 1. Послушать' : '🔊 1. Listen';
    const showTextLabel = currentLang === 'ru' ? '👁 2. Показать слово' : '👁 2. Show Word';

    return `
      <div class="vocab-item-card" onclick="handleAudioFirstCardClick('${item.id}', '${item.ttsText}')">
        <button type="button" class="vocab-audio-btn" title="🔊" onclick="event.stopPropagation(); speakSanskritWord('${item.ttsText}'); audioFirstHeardIds.add('${item.id}'); renderPresentationStage();">🔊</button>
        <div class="vocab-svg-box">${item.svg}</div>
        ${revealed ? `
          <div class="vocab-deva" style="color:#15803d;">${item.deva}</div>
          <div class="vocab-iast">${item.iast}</div>
        ` : `
          <div style="margin-top:0.35rem;">
            <span class="chip-btn ${heard ? 'active' : ''}" style="font-size:0.8rem;padding:0.3rem 0.65rem;">
              ${heard ? showTextLabel : listenLabel}
            </span>
          </div>
        `}
      </div>
    `;
  }).join('');

  return `
    <div style="margin-bottom:2rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;background:var(--bg-card);border:1px solid var(--border-strong);border-radius:12px;padding:0.9rem 1.15rem;margin-bottom:1.15rem;">
        <span style="font-size:0.9rem;font-weight:600;color:var(--text-secondary);">${instructionText}</span>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <button type="button" class="chip-btn" onclick="revealAllAudioFirst()">${revealAllLabel}</button>
          <button type="button" class="chip-btn" onclick="resetAudioFirst()">${resetAllLabel}</button>
        </div>
      </div>
      <div class="vocab-grid-12" style="margin-bottom:0;">
        ${cardsHtml}
      </div>
    </div>
  `;
}

function handleAudioFirstCardClick(itemId, ttsText) {
  speakSanskritWord(ttsText);
  if (!audioFirstHeardIds.has(itemId)) {
    audioFirstHeardIds.add(itemId);
  } else {
    audioFirstRevealedIds.add(itemId);
  }
  renderPresentationStage();
}

function revealAllAudioFirst() {
  bodyPartsVocab.forEach(item => {
    audioFirstHeardIds.add(item.id);
    audioFirstRevealedIds.add(item.id);
  });
  renderPresentationStage();
}

function resetAudioFirst() {
  audioFirstHeardIds.clear();
  audioFirstRevealedIds.clear();
  renderPresentationStage();
}

function renderPresentationStage() {
  const gridEl = document.getElementById('lesson1-vocab-grid');
  if (!gridEl) return;

  gridEl.classList.toggle('labels-hidden', labelsHidden);

  document.querySelectorAll('.practice-tab-btn[data-pres-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.presMode === currentPresentationMode);
  });

  if (currentPresentationMode === 'stepbystep') {
    gridEl.classList.remove('vocab-grid-12');
    gridEl.innerHTML = renderStepByStepPresentationHtml();
  } else if (currentPresentationMode === 'hotspots') {
    gridEl.classList.remove('vocab-grid-12');
    gridEl.innerHTML = renderHotspotsPresentationHtml();
  } else if (currentPresentationMode === 'audiofirst') {
    gridEl.classList.remove('vocab-grid-12');
    gridEl.innerHTML = renderAudioFirstPresentationHtml();
  } else {
    gridEl.classList.add('vocab-grid-12');
    gridEl.innerHTML = bodyPartsVocab.map(item => renderVocabCardItemHtml(item, false)).join('');
  }

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
  } else if (currentPracticeGame === 'categories') {
    renderCategoriesGame(arena);
  } else if (currentPracticeGame === 'spelling') {
    renderSpellingGame(arena);
  } else if (currentPracticeGame === 'truefalse') {
    renderTrueFalseGame(arena);
  }
}

// GAME 2: Flashcards (Front: Picture only -> Back: Sanskrit word + Audio + Self-Score)
function renderFlashcardsGame(arena) {
  if (fcFinished) {
    renderFinalScoreScreen(arena, '2. Flashcards', fcScore, bodyPartsVocab.length, 'restartFlashcardsGame()');
    return;
  }

  const item = bodyPartsVocab[fcIndex];
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">2. Flashcards</strong>
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
      renderFinalScoreScreen(arena, '1. ■ (12 / 12)', bodyPartsVocab.length, bodyPartsVocab.length, 'resetMaskedGrid()');
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
    renderFinalScoreScreen(arena, '1. ■', msScore, bodyPartsVocab.length, 'restartMaskedGame()');
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

// GAME 3: Fill in the Gaps (Missing Consonant + Vowel Syllable with Underscore, e.g. _यन -> न, _सिका -> ना, भ्_ -> रू, अङ्गु_ -> ली)
function renderFillGapsGame(arena) {
  if (gapFinished) {
    renderFinalScoreScreen(arena, '3. Fill in the Gaps', gapScore, bodyPartsVocab.length, 'restartGapsGame()');
    return;
  }

  const item = bodyPartsVocab[gapIndex];
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';

  // Deterministically rotate the 4 syllable choices so the correct option varies across positions 1..4
  const shift = (gapIndex * 3 + 1) % item.gapChoices.length;
  const options = item.gapChoices.map((_, i) => item.gapChoices[(i + shift) % item.gapChoices.length]);

  const optionsHtml = options.map((opt, idx) => `
    <button type="button" class="quiz-opt-btn" id="gap-opt-${idx}" onclick="checkGapAnswer('${opt.deva}', ${idx})">
      <div style="font-family:var(--font-deva);font-size:1.75rem;font-weight:700;">${opt.deva}</div>
      <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.9rem;color:var(--accent-saffron);">${opt.iast}</div>
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

    <div style="text-align:center;background:var(--bg-primary);padding:1.35rem;border-radius:12px;border:1px solid var(--border-color);">
      <div class="vocab-svg-box" style="margin:0 auto 0.6rem;width:115px;height:115px;">${item.svg}</div>
      <div id="gap-sentence-display">
        <div style="font-family:var(--font-deva);font-size:2.4rem;font-weight:700;color:var(--text-primary);letter-spacing:0.04em;">
          ${item.gapDeva}
        </div>
        <div class="vocab-iast" style="font-family:var(--font-mono);font-size:1.1rem;color:var(--accent-saffron);margin-top:0.2rem;">
          ${item.gapIast}
        </div>
      </div>
    </div>

    <div class="quiz-options-grid">${optionsHtml}</div>
    <div id="gap-feedback-msg" style="margin-top:1rem;text-align:center;"></div>
  `;
}

function checkGapAnswer(chosenSyllable, btnIdx) {
  if (gapAnswered) return;
  const item = bodyPartsVocab[gapIndex];
  const btn = document.getElementById('gap-opt-' + btnIdx);
  const feedbackEl = document.getElementById('gap-feedback-msg');

  if (chosenSyllable === item.gapAnswer) {
    gapAnswered = true;
    if (gapFirstTry) gapScore++;
    if (btn) btn.classList.add('correct');
    const sentenceEl = document.getElementById('gap-sentence-display');
    if (sentenceEl) {
      sentenceEl.innerHTML = `
        <div style="font-family:var(--font-deva);font-size:2.4rem;font-weight:700;color:#15803d;">
          ${item.deva}
        </div>
        <div class="vocab-iast" style="font-family:var(--font-mono);font-size:1.1rem;color:#15803d;margin-top:0.2rem;">
          ${item.iast}
        </div>
      `;
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

// GAME 10: Categories (Category Title Visible -> Select Matching Words from All 12 Text-Only Words without Pictures)
function renderCategoriesGame(arena) {
  if (catFinished) {
    const title = currentLang === 'ru' ? '10. Категории (12 слов)' : '10. Categories (12 words)';
    renderFinalScoreScreen(arena, title, catScore, categoriesData.length, 'restartCategoriesGame()');
    return;
  }

  const currentCat = categoriesData[catIndex];
  const catTitle = currentLang === 'ru' ? currentCat.titleRu : currentCat.titleEn;
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';
  const neededCount = currentCat.wordIds.length;
  const foundCount = catSelectedCorrectIds.size;
  const pickHint = currentLang === 'ru'
    ? `Выберите слова из 12 (${foundCount} / ${neededCount}):`
    : `Select words out of 12 (${foundCount} / ${neededCount}):`;

  const wordsGridHtml = bodyPartsVocab.map(item => {
    const isSelectedCorrect = catSelectedCorrectIds.has(item.id);
    const isClickedWrong = catWrongClickedIds.has(item.id);
    const classes = ['quiz-opt-btn'];
    if (isSelectedCorrect) classes.push('correct');
    if (isClickedWrong) classes.push('wrong');

    return `
      <button type="button" class="${classes.join(' ')}" onclick="clickCategoryWord('${item.id}')"
              style="padding:1rem 0.75rem;text-align:center;">
        <div style="font-family:var(--font-deva);font-size:1.75rem;font-weight:700;color:var(--text-primary);">
          ${isSelectedCorrect ? '✓ ' : ''}${item.deva}
        </div>
        <div class="vocab-iast" style="font-family:var(--font-mono);font-size:0.86rem;color:var(--accent-saffron);margin-top:0.15rem;">
          ${item.iast}
        </div>
      </button>
    `;
  }).join('');

  const matchedWordsSummary = currentCat.wordIds
    .map(id => bodyPartsVocab.find(w => w.id === id))
    .filter(Boolean)
    .map(w => `${w.deva}<span class="iast-text" style="font-family:var(--font-mono);font-size:0.9rem;"> (${w.iast})</span>`)
    .join(' · ');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? '10. Категории' : '10. Categories'}</strong>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartCategoriesGame()">${resetText}</button>
        <span class="game-score-pill">${catScore} / ${categoriesData.length} · (${catIndex + 1}/${categoriesData.length})</span>
      </div>
    </div>

    <div style="text-align:center;background:var(--bg-primary);padding:1.35rem 1.25rem;border-radius:14px;border:2px solid var(--accent-cambridge);margin-bottom:1.15rem;">
      <div style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--accent-saffron);margin-bottom:0.35rem;">
        ${currentLang === 'ru' ? 'КАТЕГОРИЯ' : 'CATEGORY'} ${catIndex + 1} / ${categoriesData.length}
      </div>
      <div style="font-size:1.45rem;font-weight:800;color:var(--text-primary);margin-bottom:0.35rem;">
        ${catTitle}
      </div>
      <div style="font-size:0.9rem;color:var(--text-secondary);font-weight:600;">
        ${pickHint}
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(150px, 1fr));gap:0.75rem;">
      ${wordsGridHtml}
    </div>

    ${catAnswered ? `
      <div style="margin-top:1.25rem;text-align:center;">
        <div style="color:#15803d;font-weight:700;font-family:var(--font-deva);font-size:1.35rem;margin-bottom:0.6rem;">
          ✓ ${matchedWordsSummary}
        </div>
        <button type="button" class="chip-btn active" onclick="nextCategoryRound()">→</button>
      </div>
    ` : ''}
  `;
}

function clickCategoryWord(wordId) {
  if (catAnswered) return;
  const currentCat = categoriesData[catIndex];
  const item = bodyPartsVocab.find(w => w.id === wordId);
  if (!currentCat || !item) return;

  const isPrimary = currentCat.wordIds.includes(wordId);
  const isBonus = Array.isArray(currentCat.bonusWordIds) && currentCat.bonusWordIds.includes(wordId);

  if (isPrimary || isBonus) {
    catSelectedCorrectIds.add(wordId);
    speakSanskritWord(item.ttsText);
    const allPrimarySelected = currentCat.wordIds.every(id => catSelectedCorrectIds.has(id));
    if (allPrimarySelected || catSelectedCorrectIds.size >= currentCat.wordIds.length) {
      catAnswered = true;
      if (catFirstTry) catScore++;
    }
    renderPracticeArena();
  } else {
    catFirstTry = false;
    catWrongClickedIds.add(wordId);
    renderPracticeArena();
  }
}

function nextCategoryRound() {
  if (catIndex + 1 >= categoriesData.length) {
    catFinished = true;
  } else {
    catIndex++;
    catSelectedCorrectIds.clear();
    catWrongClickedIds.clear();
    catFirstTry = true;
    catAnswered = false;
  }
  renderPracticeArena();
}

function restartCategoriesGame() {
  catIndex = 0;
  catScore = 0;
  catSelectedCorrectIds.clear();
  catWrongClickedIds.clear();
  catFirstTry = true;
  catAnswered = false;
  catFinished = false;
  renderPracticeArena();
}

// GAME 11: Missing Syllable / Devanagari Spelling Drill (12 rounds + Final Score)
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

// 3. Render Stage 3: PRODUCTION (4 Communicative Production Formats: 1. Speed Sprint ⏱, 2. Microphone 🎙, 3. What's Missing? ❓, 4. TPR Chant ↑↓)
let currentProductionMode = 'sprint'; // 'sprint' | 'mic' | 'missingpart' | 'chant'

// Mode 1: Speed Sprint ⏱ state
let prodSprintIndex = 0;
let prodSprintScore = 0;
let prodSprintDuration = 4;
let prodSprintTimeLeft = 4;
let prodSprintAutoTimer = true; // Default: 2nd option (Timer starts automatically)
let prodSprintRunning = false;
let prodSprintRevealed = false;
let prodSprintFinished = false;
let prodSprintTimerId = null;

// Mode 2: Microphone Speech Recognition 🎙 state
let prodMicIndex = 0;
let prodMicScore = 0;
let prodMicListening = false;
let prodMicStatusMsg = '';
let prodMicRevealed = false;
let prodMicFinished = false;

const speechAcceptMap = {
  nayana:  ['नयन', 'नयना', 'नयान', 'नैना', 'nayana', 'nayan'],
  nasika:  ['नासिका', 'नसिका', 'नासिक', 'nasika', 'naasika'],
  jihva:   ['जिह्वा', 'जिह्व', 'जीभ', 'जिहवा', 'jihva', 'jihwa'],
  karna:   ['कर्ण', 'कर्णा', 'करण', 'कान', 'karna', 'karan'],
  shirsha: ['शीर्ष', 'शीर्षा', 'शिर्ष', 'shirsha', 'sheersha', 'sirsha'],
  lalata:  ['ललाट', 'ललाटा', 'ललट', 'lalata', 'lalaat', 'lalat'],
  bhru:    ['भ्रू', 'भ्रु', 'भ्रूः', 'भू', 'bhru', 'bhroo'],
  ostha:   ['ओष्ठ', 'ओष्ठा', 'ओष्ट', 'ओठ', 'ostha', 'oshtha', 'oshth'],
  kara:    ['कर', 'करा', 'कार', 'कल', 'kara', 'kar'],
  pada:    ['पाद', 'पादा', 'पद', 'पदा', 'pada', 'paada', 'paad'],
  danta:   ['दन्त', 'दन्ता', 'दंत', 'दंता', 'दान्त', 'danta', 'dant'],
  anguli:  ['अङ्गुली', 'अंगुली', 'अङ्गुलि', 'अंगुलि', 'उंगली', 'anguli', 'angulee']
};

// Mode 3: What's Missing on the Portrait? ❓ state
let prodMissingIndex = 0;
let prodMissingScore = 0;
let prodMissingRevealed = false;
let prodMissingFinished = false;

// Mode 4: TPR Chant ↑↓ & Checklist state
let prodChantReverse = false;
let prodChantPlaying = false;
let prodChantTimerId = null;

function stopAllProductionTimers() {
  if (prodSprintTimerId) {
    clearInterval(prodSprintTimerId);
    prodSprintTimerId = null;
  }
  prodSprintRunning = false;
  if (prodChantTimerId) {
    clearInterval(prodChantTimerId);
    prodChantTimerId = null;
  }
  prodChantPlaying = false;
}

function selectProductionMode(mode) {
  stopAllProductionTimers();
  currentProductionMode = mode;
  document.querySelectorAll('.practice-tab-btn[data-prod-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.prodMode === mode);
  });
  if (mode === 'sprint' && prodSprintAutoTimer && !prodSprintFinished && !prodSprintRevealed) {
    startProdSprintTimer();
  } else {
    renderProductionStage();
  }
}

// MODE 1: Speed Sprint ⏱ (See picture only -> Say word aloud before timer hits 0 -> Check with audio)
function setProdSprintAutoTimer(isAuto) {
  stopAllProductionTimers();
  prodSprintAutoTimer = isAuto;
  if (prodSprintAutoTimer && !prodSprintFinished && !prodSprintRevealed) {
    startProdSprintTimer();
  } else {
    prodSprintTimeLeft = prodSprintDuration;
    renderProductionStage();
  }
}

function setProdSprintDuration(sec) {
  stopAllProductionTimers();
  prodSprintDuration = sec;
  prodSprintTimeLeft = sec;
  if (prodSprintAutoTimer && !prodSprintFinished && !prodSprintRevealed) {
    startProdSprintTimer();
  } else {
    renderProductionStage();
  }
}

function startProdSprintTimer() {
  stopAllProductionTimers();
  prodSprintRevealed = false;
  prodSprintTimeLeft = prodSprintDuration;
  prodSprintRunning = true;
  renderProductionStage();

  prodSprintTimerId = setInterval(() => {
    prodSprintTimeLeft--;
    if (prodSprintTimeLeft <= 0) {
      stopAllProductionTimers();
      revealProdSprintCard();
    } else {
      renderProductionStage();
    }
  }, 1000);
}

function revealProdSprintCard() {
  stopAllProductionTimers();
  prodSprintRevealed = true;
  const item = bodyPartsVocab[prodSprintIndex];
  if (item) speakSanskritWord(item.ttsText);
  renderProductionStage();
}

function gradeProdSprintCard(knewIt) {
  stopAllProductionTimers();
  if (knewIt) prodSprintScore++;
  if (prodSprintIndex + 1 >= bodyPartsVocab.length) {
    prodSprintFinished = true;
    renderProductionStage();
  } else {
    prodSprintIndex++;
    prodSprintRevealed = false;
    prodSprintTimeLeft = prodSprintDuration;
    if (prodSprintAutoTimer) {
      startProdSprintTimer();
    } else {
      renderProductionStage();
    }
  }
}

function restartProdSprint() {
  stopAllProductionTimers();
  prodSprintIndex = 0;
  prodSprintScore = 0;
  prodSprintRevealed = false;
  prodSprintFinished = false;
  prodSprintTimeLeft = prodSprintDuration;
  if (prodSprintAutoTimer) {
    startProdSprintTimer();
  } else {
    renderProductionStage();
  }
}

function renderProdSprintMode(container) {
  if (prodSprintFinished) {
    const title = currentLang === 'ru' ? '1. Спринт на время ⏱' : '1. Speed Sprint ⏱';
    renderFinalScoreScreen(container, title, prodSprintScore, bodyPartsVocab.length, 'restartProdSprint()');
    return;
  }

  const item = bodyPartsVocab[prodSprintIndex];
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';
  const manualModeLabel = currentLang === 'ru' ? '✋ Таймер вручную' : '✋ Manual Timer';
  const autoModeLabel = currentLang === 'ru' ? '⚡ Авто-таймер' : '⚡ Auto Timer';
  const startTimerText = currentLang === 'ru'
    ? `▶ Запустить таймер (${prodSprintDuration} сек)`
    : `▶ Start Timer (${prodSprintDuration}s)`;
  const revealNowText = currentLang === 'ru' ? '🔊 Я назвал вслух! Проверить' : '🔊 I Said It! Check Answer';
  const promptText = currentLang === 'ru'
    ? 'Покажите эту часть тела у себя и назовите её вслух ДО окончания таймера:'
    : 'Point to this body part on yourself and say the Sanskrit word aloud BEFORE time runs out:';

  container.innerHTML = `
    <div class="game-top-bar">
      <div style="display:flex;align-items:center;gap:0.45rem;flex-wrap:wrap;">
        <button type="button" class="chip-btn ${!prodSprintAutoTimer ? 'active' : ''}" onclick="setProdSprintAutoTimer(false)">
          ${manualModeLabel}
        </button>
        <button type="button" class="chip-btn ${prodSprintAutoTimer ? 'active' : ''}" onclick="setProdSprintAutoTimer(true)">
          ${autoModeLabel}
        </button>
        <span style="color:var(--border-strong);margin:0 0.15rem;">|</span>
        <button type="button" class="chip-btn ${prodSprintDuration === 4 ? 'active' : ''}" onclick="setProdSprintDuration(4)">4s</button>
        <button type="button" class="chip-btn ${prodSprintDuration === 3 ? 'active' : ''}" onclick="setProdSprintDuration(3)">3s</button>
        <button type="button" class="chip-btn ${prodSprintDuration === 2 ? 'active' : ''}" onclick="setProdSprintDuration(2)">2s</button>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartProdSprint()">${resetText}</button>
        <span class="game-score-pill">${prodSprintScore} / ${bodyPartsVocab.length} · (${prodSprintIndex + 1}/${bodyPartsVocab.length})</span>
      </div>
    </div>

    <div style="text-align:center;font-size:0.9rem;font-weight:600;color:var(--text-secondary);margin-bottom:0.85rem;">
      ${promptText}
    </div>

    <div class="flashcard-box" style="cursor:default;">
      <div class="vocab-svg-box" style="width:138px;height:138px;margin-bottom:0.75rem;">${item.svg}</div>
      ${!prodSprintRevealed ? `
        <div style="font-size:2rem;font-weight:800;color:${prodSprintRunning ? '#dc2626' : 'var(--accent-cambridge)'};margin-bottom:0.65rem;">
          ⏱ ${prodSprintTimeLeft}s
        </div>
        <div style="display:flex;gap:0.6rem;flex-wrap:wrap;justify-content:center;">
          ${!prodSprintRunning ? `
            <button type="button" class="chip-btn active" onclick="startProdSprintTimer()">${startTimerText}</button>
          ` : ''}
          <button type="button" class="chip-btn" onclick="revealProdSprintCard()">${revealNowText}</button>
        </div>
      ` : `
        <div class="vocab-deva" style="font-size:2.5rem;color:#15803d;margin-bottom:0.15rem;">${item.deva}</div>
        <div class="vocab-iast" style="font-size:1.1rem;margin-bottom:0.85rem;">${item.iast}</div>
        <div style="display:flex;gap:0.65rem;flex-wrap:wrap;justify-content:center;">
          <button type="button" class="chip-btn" onclick="speakSanskritWord('${item.ttsText}')">🔊</button>
          <button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;" onclick="gradeProdSprintCard(false)">
            ${currentLang === 'ru' ? '✕ Не успел / ошибся' : '✕ Missed'}
          </button>
          <button type="button" class="chip-btn active" style="background:#16a34a;border-color:#16a34a;" onclick="gradeProdSprintCard(true)">
            ${currentLang === 'ru' ? '✓ Успел назвать верно!' : '✓ Said It in Time!'}
          </button>
        </div>
      `}
    </div>
  `;
}

// MODE 2: Speak into Microphone 🎙 (Speech Recognition + Self-Check Fallback)
function startProdMicRecognition() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const item = bodyPartsVocab[prodMicIndex];
  if (!item) return;

  if (!SpeechRec) {
    prodMicStatusMsg = currentLang === 'ru'
      ? 'Браузер не поддерживает распознавание речи. Произнесите слово вслух и нажмите «🔊 Проверить звуком».'
      : 'Speech recognition is not supported in this browser. Say the word aloud and click "🔊 Check with Audio".';
    prodMicRevealed = true;
    speakSanskritWord(item.ttsText);
    renderProductionStage();
    return;
  }

  try {
    const rec = new SpeechRec();
    rec.lang = 'hi-IN';
    rec.interimResults = false;
    rec.maxAlternatives = 5;
    prodMicListening = true;
    prodMicStatusMsg = currentLang === 'ru' ? '🎙 Слушаю... Произнесите слово на санскрите!' : '🎙 Listening... Speak the Sanskrit word aloud!';
    renderProductionStage();

    rec.onresult = (event) => {
      prodMicListening = false;
      const alts = [];
      for (let i = 0; i < event.results[0].length; i++) {
        alts.push(event.results[0][i].transcript.trim().toLowerCase());
      }
      const accepted = speechAcceptMap[item.id] || [item.deva, item.iast];
      const matched = alts.some(t => accepted.some(acc => t.includes(acc.toLowerCase()) || acc.toLowerCase().includes(t)));
      const heardDisplay = alts[0] || '';
      prodMicRevealed = true;
      speakSanskritWord(item.ttsText);
      if (matched) {
        prodMicStatusMsg = currentLang === 'ru'
          ? `✓ Распознано: «${heardDisplay}» — отлично!`
          : `✓ Recognized: "${heardDisplay}" — great job!`;
      } else {
        prodMicStatusMsg = currentLang === 'ru'
          ? `Распознано: «${heardDisplay}». Сравните с эталоном 🔊 и отметьте ниже:`
          : `Heard: "${heardDisplay}". Compare with the audio 🔊 and mark below:`;
      }
      renderProductionStage();
    };

    rec.onerror = () => {
      prodMicListening = false;
      prodMicRevealed = true;
      prodMicStatusMsg = currentLang === 'ru'
        ? 'Микрофон недоступен. Произнесите слово вслух и сверьте с эталоном 🔊:'
        : 'Microphone unavailable. Speak the word aloud and check against the audio 🔊:';
      speakSanskritWord(item.ttsText);
      renderProductionStage();
    };

    rec.start();
  } catch (e) {
    prodMicListening = false;
    prodMicRevealed = true;
    speakSanskritWord(item.ttsText);
    renderProductionStage();
  }
}

function revealProdMicManual() {
  const item = bodyPartsVocab[prodMicIndex];
  prodMicRevealed = true;
  if (item) speakSanskritWord(item.ttsText);
  renderProductionStage();
}

function gradeProdMicCard(knewIt) {
  if (knewIt) prodMicScore++;
  if (prodMicIndex + 1 >= bodyPartsVocab.length) {
    prodMicFinished = true;
  } else {
    prodMicIndex++;
    prodMicRevealed = false;
    prodMicStatusMsg = '';
  }
  renderProductionStage();
}

function restartProdMic() {
  prodMicIndex = 0;
  prodMicScore = 0;
  prodMicListening = false;
  prodMicRevealed = false;
  prodMicStatusMsg = '';
  prodMicFinished = false;
  renderProductionStage();
}

function renderProdMicMode(container) {
  if (prodMicFinished) {
    const title = currentLang === 'ru' ? '2. Произнеси в микрофон 🎙' : '2. Speak into Microphone 🎙';
    renderFinalScoreScreen(container, title, prodMicScore, bodyPartsVocab.length, 'restartProdMic()');
    return;
  }

  const item = bodyPartsVocab[prodMicIndex];
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';
  const speakBtnText = prodMicListening
    ? (currentLang === 'ru' ? '🎙 Слушаю...' : '🎙 Listening...')
    : (currentLang === 'ru' ? '🎙 Нажать и сказать в микрофон' : '🎙 Click & Speak into Mic');
  const manualCheckText = currentLang === 'ru' ? '🔊 Проверить звуком (без микрофона)' : '🔊 Check with Audio (No Mic)';

  container.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? '2. Произнеси в микрофон 🎙' : '2. Speak into Microphone 🎙'}</strong>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartProdMic()">${resetText}</button>
        <span class="game-score-pill">${prodMicScore} / ${bodyPartsVocab.length} · (${prodMicIndex + 1}/${bodyPartsVocab.length})</span>
      </div>
    </div>

    <div class="flashcard-box" style="cursor:default;">
      <div class="vocab-svg-box" style="width:138px;height:138px;margin-bottom:0.75rem;">${item.svg}</div>

      <div style="display:flex;gap:0.65rem;flex-wrap:wrap;justify-content:center;margin-bottom:0.75rem;">
        <button type="button" class="chip-btn active" onclick="startProdMicRecognition()">${speakBtnText}</button>
        <button type="button" class="chip-btn" onclick="revealProdMicManual()">${manualCheckText}</button>
      </div>

      ${prodMicStatusMsg ? `
        <div style="font-size:0.88rem;font-weight:600;color:var(--accent-cambridge);margin-bottom:0.65rem;">
          ${prodMicStatusMsg}
        </div>
      ` : ''}

      ${prodMicRevealed ? `
        <div class="vocab-deva" style="font-size:2.45rem;color:#15803d;margin-bottom:0.15rem;">${item.deva}</div>
        <div class="vocab-iast" style="font-size:1.05rem;margin-bottom:0.8rem;">${item.iast}</div>
        <div style="display:flex;gap:0.65rem;flex-wrap:wrap;justify-content:center;">
          <button type="button" class="chip-btn" onclick="speakSanskritWord('${item.ttsText}')">🔊</button>
          <button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;" onclick="gradeProdMicCard(false)">
            ${currentLang === 'ru' ? '✕ Ещё повторить' : '✕ Retry'}
          </button>
          <button type="button" class="chip-btn active" style="background:#16a34a;border-color:#16a34a;" onclick="gradeProdMicCard(true)">
            ${currentLang === 'ru' ? '✓ Произнёс верно!' : '✓ Pronounced Correctly!'}
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

// MODE 3: What's Missing on the Portrait? ❓ (Spot the '?' marker on the face/body diagram and say the word aloud)
function revealProdMissingCard() {
  const ordered = [...hotspotPositions].sort((a, b) => a.num - b.num);
  const pos = ordered[prodMissingIndex];
  const item = pos ? bodyPartsVocab.find(w => w.id === pos.id) : null;
  prodMissingRevealed = true;
  if (item) speakSanskritWord(item.ttsText);
  renderProductionStage();
}

function gradeProdMissingCard(knewIt) {
  if (knewIt) prodMissingScore++;
  if (prodMissingIndex + 1 >= hotspotPositions.length) {
    prodMissingFinished = true;
  } else {
    prodMissingIndex++;
    prodMissingRevealed = false;
  }
  renderProductionStage();
}

function restartProdMissing() {
  prodMissingIndex = 0;
  prodMissingScore = 0;
  prodMissingRevealed = false;
  prodMissingFinished = false;
  renderProductionStage();
}

function renderProdMissingMode(container) {
  if (prodMissingFinished) {
    const title = currentLang === 'ru' ? '3. Что пропало на рисунке? ❓' : '3. What Is Missing? ❓';
    renderFinalScoreScreen(container, title, prodMissingScore, hotspotPositions.length, 'restartProdMissing()');
    return;
  }

  const ordered = [...hotspotPositions].sort((a, b) => a.num - b.num);
  const pos = ordered[prodMissingIndex];
  const item = bodyPartsVocab.find(w => w.id === pos.id) || bodyPartsVocab[0];
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';
  const promptText = currentLang === 'ru'
    ? 'Посмотрите, куда указывает красный знак «?» на рисунке, и назовите эту часть тела вслух:'
    : 'Look where the red "?" marker points on the drawing and say that body part aloud in Sanskrit:';
  const checkBtnText = currentLang === 'ru' ? '🔊 Я назвал вслух! Проверить ответ' : '🔊 I Said It! Reveal Answer';

  const targetPinSvg = `
    <g>
      <line x1="${pos.x}" y1="${pos.y}" x2="${pos.tx}" y2="${pos.ty}" stroke="#DC2626" stroke-width="2.8"/>
      <circle cx="${pos.tx}" cy="${pos.ty}" r="11" fill="#FEF08A" stroke="#DC2626" stroke-width="2.5" stroke-dasharray="3,2"/>
      <circle cx="${pos.x}" cy="${pos.y}" r="15" fill="#DC2626" stroke="#FEF08A" stroke-width="2.5"/>
      <text x="${pos.x}" y="${pos.y + 5}" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="800" font-family="Plus Jakarta Sans, sans-serif">?</text>
    </g>
  `;

  const diagramSvg = pos.pic === 'face' ? `
    <svg viewBox="0 0 320 260" style="width:100%;max-width:290px;height:auto;display:block;margin:0 auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="308" height="248" rx="14" fill="#F8EFE6" stroke="#E5DEC9" stroke-width="1.5"/>
      <path d="M134 210V238H186V210" fill="#F4C7AB" stroke="#14213D" stroke-width="2.4"/>
      <ellipse cx="90" cy="140" rx="11" ry="19" fill="#F4C7AB" stroke="#14213D" stroke-width="2.6"/>
      <ellipse cx="230" cy="140" rx="11" ry="19" fill="#F4C7AB" stroke="#14213D" stroke-width="2.6"/>
      <ellipse cx="160" cy="136" rx="68" ry="82" fill="#F4C7AB" stroke="#14213D" stroke-width="2.8"/>
      <path d="M92 120C92 68 122 46 160 46C198 46 228 68 228 120C214 88 190 78 160 78C130 78 106 88 92 120Z" fill="#1E293B" stroke="#14213D" stroke-width="2.4"/>
      <path d="M114 100C125 92 141 92 150 98" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
      <path d="M170 98C179 92 195 92 206 100" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="132" cy="116" rx="15" ry="9.5" fill="#FFFFFF" stroke="#14213D" stroke-width="2.4"/>
      <circle cx="132" cy="116" r="5.5" fill="#1D4ED8"/>
      <circle cx="132" cy="116" r="2.6" fill="#0F172A"/>
      <ellipse cx="188" cy="116" rx="15" ry="9.5" fill="#FFFFFF" stroke="#14213D" stroke-width="2.4"/>
      <circle cx="188" cy="116" r="5.5" fill="#1D4ED8"/>
      <circle cx="188" cy="116" r="2.6" fill="#0F172A"/>
      <path d="M160 112V145C153 149 149 147 149 143M160 145C167 149 171 147 171 143" stroke="#14213D" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M132 172C148 167 172 167 188 172C183 196 137 196 132 172Z" fill="#7F1D1D" stroke="#14213D" stroke-width="2.4"/>
      <path d="M139 172H181V179C170 181 150 181 139 179V172Z" fill="#FFFFFF" stroke="#14213D" stroke-width="1.5"/>
      <path d="M148 185C154 180 166 180 172 185C174 194 146 194 148 185Z" fill="#FB7185" stroke="#14213D" stroke-width="1.6"/>
      <path d="M129 171C146 165 174 165 191 171" stroke="#E11D48" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M133 173C146 197 174 197 187 173" stroke="#E11D48" stroke-width="3.4" stroke-linecap="round"/>
      ${targetPinSvg}
    </svg>
  ` : `
    <svg viewBox="0 0 320 260" style="width:100%;max-width:290px;height:auto;display:block;margin:0 auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="308" height="248" rx="14" fill="#F8EFE6" stroke="#E5DEC9" stroke-width="1.5"/>
      <path d="M132 84L96 132L86 142" stroke="#F4C7AB" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M132 84L96 132L86 142" stroke="#14213D" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="86" cy="144" r="8" fill="#F4C7AB" stroke="#14213D" stroke-width="2.2"/>
      <path d="M80 139L70 135 M78 143L67 144 M79 147L69 154 M83 150L76 160 M89 150L86 160" stroke="#14213D" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M188 84L224 132L234 142" stroke="#F4C7AB" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M188 84L224 132L234 142" stroke="#14213D" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="234" cy="144" r="8" fill="#F4C7AB" stroke="#14213D" stroke-width="2.2"/>
      <path d="M240 139L250 135 M242 143L253 144 M241 147L251 154 M237 150L244 160 M231 150L234 160" stroke="#14213D" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M145 158V228" stroke="#F4C7AB" stroke-width="13" stroke-linecap="round"/>
      <path d="M139 158V226M151 158V226" stroke="#14213D" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M151 226C151 234 146 240 136 240H120C115 240 114 234 120 231L139 225Z" fill="#F4C7AB" stroke="#14213D" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M175 158V228" stroke="#F4C7AB" stroke-width="13" stroke-linecap="round"/>
      <path d="M169 158V226M181 158V226" stroke="#14213D" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M169 226C169 234 174 240 184 240H202C207 240 208 234 202 231L181 225Z" fill="#F4C7AB" stroke="#14213D" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M130 78C144 85 176 85 190 78L196 154H124L130 78Z" fill="#0F766E" stroke="#14213D" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M132 154H188L186 184H163L160 168L157 184H134L132 154Z" fill="#1E3A5F" stroke="#14213D" stroke-width="2.3" stroke-linejoin="round"/>
      <rect x="153" y="68" width="14" height="12" rx="4" fill="#F4C7AB" stroke="#14213D" stroke-width="2.2"/>
      <ellipse cx="160" cy="46" rx="22" ry="25" fill="#F4C7AB" stroke="#14213D" stroke-width="2.6"/>
      <path d="M138 42C138 25 148 18 160 18C172 18 182 25 182 42C176 32 168 29 160 29C152 29 144 32 138 42Z" fill="#1E293B" stroke="#14213D" stroke-width="2.2"/>
      <circle cx="152" cy="44" r="2.3" fill="#0F172A"/>
      <circle cx="168" cy="44" r="2.3" fill="#0F172A"/>
      <path d="M152 55C156 60 164 60 168 55" stroke="#14213D" stroke-width="2.2" stroke-linecap="round"/>
      ${targetPinSvg}
    </svg>
  `;

  container.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? '3. Что под знаком «?»' : '3. Spot the "?" Part'}</strong>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button type="button" class="chip-btn" onclick="restartProdMissing()">${resetText}</button>
        <span class="game-score-pill">${prodMissingScore} / ${ordered.length} · (${prodMissingIndex + 1}/${ordered.length})</span>
      </div>
    </div>

    <div style="text-align:center;font-size:0.9rem;font-weight:600;color:var(--text-secondary);margin-bottom:0.85rem;">
      ${promptText}
    </div>

    <div style="text-align:center;background:var(--bg-primary);padding:1.25rem;border-radius:16px;border:1.5px solid var(--border-strong);">
      ${diagramSvg}

      ${!prodMissingRevealed ? `
        <div style="margin-top:1rem;">
          <button type="button" class="chip-btn active" onclick="revealProdMissingCard()">${checkBtnText}</button>
        </div>
      ` : `
        <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border-color);">
          <div class="vocab-deva" style="font-size:2.35rem;color:#15803d;margin-bottom:0.15rem;">${item.deva}</div>
          <div class="vocab-iast" style="font-size:1.05rem;margin-bottom:0.75rem;">${item.iast}</div>
          <div style="display:flex;gap:0.65rem;flex-wrap:wrap;justify-content:center;">
            <button type="button" class="chip-btn" onclick="speakSanskritWord('${item.ttsText}')">🔊</button>
            <button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;" onclick="gradeProdMissingCard(false)">
              ${currentLang === 'ru' ? '✕ Ошибся' : '✕ Missed'}
            </button>
            <button type="button" class="chip-btn active" style="background:#16a34a;border-color:#16a34a;" onclick="gradeProdMissingCard(true)">
              ${currentLang === 'ru' ? '✓ Назвал верно!' : '✓ Said It Right!'}
            </button>
          </div>
        </div>
      `}
    </div>
  `;
}

// MODE 4: TPR Chant ↑↓ & Full 12/12 Checklist
function selectProductionWord(wordId) {
  activeProdWordId = wordId;
  producedWordsSet.add(wordId);
  const item = bodyPartsVocab.find(w => w.id === wordId);
  if (item) {
    speakSanskritWord(item.ttsText);
  }
  renderProductionStage();
}

function toggleProdChantOrder() {
  stopAllProductionTimers();
  prodChantReverse = !prodChantReverse;
  renderProductionStage();
}

function toggleProdAutoChant() {
  if (prodChantPlaying) {
    stopAllProductionTimers();
    renderProductionStage();
    return;
  }

  const orderedIds = hotspotPositions
    .slice()
    .sort((a, b) => prodChantReverse ? b.num - a.num : a.num - b.num)
    .map(p => p.id);

  let stepIdx = 0;
  prodChantPlaying = true;
  selectProductionWord(orderedIds[0]);

  prodChantTimerId = setInterval(() => {
    stepIdx++;
    if (stepIdx >= orderedIds.length) {
      stopAllProductionTimers();
      renderProductionStage();
    } else {
      selectProductionWord(orderedIds[stepIdx]);
    }
  }, 1600);
}

function restartProductionStage() {
  stopAllProductionTimers();
  producedWordsSet.clear();
  activeProdWordId = 'shirsha';
  renderProductionStage();
}

function renderProdChantMode(container) {
  const resetText = currentLang === 'ru' ? '↺ Начать сначала' : '↺ Start Over';
  const scoreLabel = currentLang === 'ru'
    ? `${producedWordsSet.size} из ${bodyPartsVocab.length} правильно`
    : `${producedWordsSet.size} out of ${bodyPartsVocab.length} correct`;
  const orderBtnText = prodChantReverse
    ? (currentLang === 'ru' ? '↑ Снизу вверх (पाद → शीर्ष)' : '↑ Bottom-Up (पाद → शीर्ष)')
    : (currentLang === 'ru' ? '↓ Сверху вниз (शीर्ष → पाद)' : '↓ Top-Down (शीर्ष → पाद)');
  const autoChantText = prodChantPlaying
    ? (currentLang === 'ru' ? '⏹ Стоп ритм' : '⏹ Stop Chant')
    : (currentLang === 'ru' ? '▶ Авто-ритм 🔊 (все 12)' : '▶ Auto-Chant 🔊 (All 12)');

  const orderedVocab = hotspotPositions
    .slice()
    .sort((a, b) => prodChantReverse ? b.num - a.num : a.num - b.num)
    .map(pos => bodyPartsVocab.find(w => w.id === pos.id))
    .filter(Boolean);

  const activeItem = bodyPartsVocab.find(w => w.id === activeProdWordId) || orderedVocab[0];
  const chipsHtml = orderedVocab.map(w => {
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
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.95rem;">
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
        <button type="button" class="chip-btn" onclick="toggleProdChantOrder()">${orderBtnText}</button>
        <button type="button" class="chip-btn ${prodChantPlaying ? 'active' : ''}" onclick="toggleProdAutoChant()">${autoChantText}</button>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <span class="game-score-pill">${scoreLabel}</span>
        <button type="button" class="chip-btn" onclick="restartProductionStage()">${resetText}</button>
      </div>
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

function renderProductionStage() {
  const container = document.getElementById('lesson1-production-stage');
  if (!container) return;

  document.querySelectorAll('.practice-tab-btn[data-prod-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.prodMode === currentProductionMode);
  });

  if (currentProductionMode === 'sprint') {
    renderProdSprintMode(container);
  } else if (currentProductionMode === 'mic') {
    renderProdMicMode(container);
  } else if (currentProductionMode === 'missingpart') {
    renderProdMissingMode(container);
  } else {
    renderProdChantMode(container);
  }
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

  const prodEl = document.getElementById('lesson1-production-stage');
  if (prodEl && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (currentProductionMode === 'sprint' && prodSprintAutoTimer && !prodSprintRunning && !prodSprintRevealed && !prodSprintFinished) {
            startProdSprintTimer();
          }
        } else if (currentProductionMode === 'sprint' && prodSprintRunning) {
          stopAllProductionTimers();
          prodSprintTimeLeft = prodSprintDuration;
          renderProductionStage();
        }
      });
    }, { threshold: 0.35 });
    obs.observe(prodEl);
  }
});
