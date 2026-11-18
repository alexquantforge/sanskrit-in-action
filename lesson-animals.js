/**
 * LESSON 18 · पशवः · "Beasts of the Bhāgavata" (10 животных)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 *
 * Урок стоит сразу после «Десятков 60–100» (урок 17) и не вводит ни новых
 * чисел, ни новых цветов: всё это уже знакомо, поэтому работает как
 * спиральное повторение — животное называется словом, а цвет прилагательным
 * из уроков 3–4.
 *
 *   वृषभः   «бык»            खरः   «осёл»             बकः    «цапля»
 *   अजगरः   «удав»           कृकलासः «ящерица»        कच्छपः  «черепаха»
 *   कुलीरः  «краб»           हरितः कृकलासः «зелёная ящерица»
 *   रक्तः कुलीरः «красный краб»
 *
 * Все десять существ — из Шримад-Бхагаватам (5-я песнь, «Бхагавата-вана»:
 * वृṣabha, khara, baka, ajagara, kṛkalāsa, kacchapa, kulīra и другие).
 * Счёта животных в уроке нет — только слово и цвет.
 *
 * IAST скрыт по умолчанию и включается кнопкой 🔤.
 * Data file for the generic engine in lesson-engine.js.
 */

/* ============================================================================
   1. КАРТИНКИ
   Каждое существо нарисовано в той же манере, что и части тела: толстый
   контур, заливка цветом, светлый блик. Форма узнаётся по силуэту —
   рога у быка, горб у верблюда нет, но есть панцирь у черепахи и клешни
   у краба, — поэтому «Picture Quiz» и «Read & Match» работают без подписи.
   ========================================================================= */
var AN_INK = '#14213D';

function anCard(inner, tint) {
  return '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100" height="100" rx="14" fill="' + (tint || '#FFFBEB') + '"/>' +
    '<rect x="6" y="6" width="88" height="88" rx="10" fill="none" stroke="#E5DEC9" stroke-width="1.5"/>' +
    inner +
    '</svg>';
}

/* бык: массивное тело, рога, копыта */
function anBull(fill) {
  return '<ellipse cx="52" cy="62" rx="24" ry="15" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="3"/>' +
    '<path d="M66 52c1-8 4-11 9-11s9 4 9 10-4 9-9 9-8-3-9-8Z" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="3"/>' +
    '<path d="M74 42c-3-5-2-8 1-9 3-1 5 2 5 7" fill="none" stroke="' + AN_INK + '" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M84 42c3-5 5-6 7-4" fill="none" stroke="' + AN_INK + '" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="78" cy="50" r="2" fill="' + AN_INK + '"/>' +
    '<path d="M36 76v8M46 77v7M60 77v7M68 76v8" stroke="' + AN_INK + '" stroke-width="3.4" stroke-linecap="round"/>' +
    '<path d="M29 58c-4 2-6 5-6 8" stroke="' + AN_INK + '" stroke-width="3" stroke-linecap="round"/>';
}

/* осёл: длинные уши, вытянутая морда */
function anDonkey(fill) {
  return '<ellipse cx="46" cy="64" rx="22" ry="13" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="3"/>' +
    '<path d="M56 56c1-9 5-13 11-13 6 0 9 4 9 9 0 5-4 8-9 8s-9-1-11-4Z" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="3"/>' +
    '<path d="M62 46c-2-8-1-11 2-12 2-1 4 2 4 9" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M72 45c1-7 3-10 5-10 2 0 3 3 2 9" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<circle cx="72" cy="55" r="2" fill="' + AN_INK + '"/>' +
    '<path d="M32 75v8M42 76v7M54 76v7M62 75v8" stroke="' + AN_INK + '" stroke-width="3.2" stroke-linecap="round"/>' +
    '<path d="M26 60c-4 3-6 6-5 10" stroke="' + AN_INK + '" stroke-width="3" stroke-linecap="round"/>';
}

/* цапля: тонкие ноги, длинная шея, клюв */
function anHeron(fill) {
  return '<ellipse cx="42" cy="60" rx="16" ry="12" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="3"/>' +
    '<path d="M52 54c6-6 9-12 9-18" fill="none" stroke="' + fill + '" stroke-width="9" stroke-linecap="round"/>' +
    '<path d="M52 54c6-6 9-12 9-18" fill="none" stroke="' + AN_INK + '" stroke-width="2.6"/>' +
    '<circle cx="61" cy="32" r="6.5" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="3"/>' +
    '<path d="M67 30l18-3-18 8Z" fill="#E8A33D" stroke="' + AN_INK + '" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<circle cx="62" cy="31" r="1.8" fill="' + AN_INK + '"/>' +
    '<path d="M37 72v14M47 72v14" stroke="' + AN_INK + '" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M28 56c-5 4-7 8-6 11" stroke="' + AN_INK + '" stroke-width="3" stroke-linecap="round"/>';
}

/* удав: тело кольцами и голова */
function anPython(fill) {
  return '<path d="M26 78c0-7 7-10 14-7 8 3 12 0 14-6 2-6-2-12-9-14-8-2-11-6-9-11 2-5 9-6 14-2" ' +
      'fill="none" stroke="' + AN_INK + '" stroke-width="13" stroke-linecap="round"/>' +
    '<path d="M26 78c0-7 7-10 14-7 8 3 12 0 14-6 2-6-2-12-9-14-8-2-11-6-9-11 2-5 9-6 14-2" ' +
      'fill="none" stroke="' + fill + '" stroke-width="8" stroke-linecap="round"/>' +
    '<ellipse cx="63" cy="36" rx="9" ry="6.5" transform="rotate(-14 63 36)" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="3"/>' +
    '<circle cx="65" cy="34" r="1.7" fill="' + AN_INK + '"/>' +
    '<path d="M71 40l6 3" stroke="#DC2626" stroke-width="2.4" stroke-linecap="round"/>';
}

/* ящерица: приземистое тело, длинный хвост, лапки */
function anLizard(fill) {
  return '<ellipse cx="48" cy="54" rx="18" ry="10" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="3"/>' +
    '<circle cx="66" cy="50" r="8" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="3"/>' +
    '<path d="M32 54c-7 3-12 8-15 14" fill="none" stroke="' + AN_INK + '" stroke-width="6" stroke-linecap="round"/>' +
    '<path d="M32 54c-7 3-12 8-15 14" fill="none" stroke="' + fill + '" stroke-width="3.4" stroke-linecap="round"/>' +
    '<circle cx="68" cy="47" r="1.8" fill="' + AN_INK + '"/>' +
    '<path d="M40 63l-3 11M50 63l1 11M57 60l5 10" stroke="' + AN_INK + '" stroke-width="3.2" stroke-linecap="round"/>' +
    '<path d="M42 46c3-4 9-5 13-4" stroke="' + AN_INK + '" stroke-width="2" stroke-linecap="round" opacity="0.45"/>';
}

/* черепаха: панцирь с ячейками, голова и лапы */
function anTortoise(fill) {
  return '<path d="M22 62C22 48 34 37 50 37c16 0 28 11 28 25Z" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M50 38v24M35 43l6 19M65 43l-6 19M26 52h48" stroke="' + AN_INK + '" stroke-width="2" opacity="0.7"/>' +
    '<path d="M78 62c0-4 2-6 5-6s4 2 4 6" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="3"/>' +
    '<circle cx="84" cy="59" r="1.6" fill="' + AN_INK + '"/>' +
    '<path d="M28 73h12M60 73h12" stroke="' + AN_INK + '" stroke-width="6" stroke-linecap="round"/>' +
    '<path d="M20 66h60" stroke="' + AN_INK + '" stroke-width="3" stroke-linecap="round"/>';
}

/* краб: панцирь, две клешни, глаза на стебельках, ноги */
function anCrab(fill) {
  return '<ellipse cx="50" cy="58" rx="20" ry="14" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="3"/>' +
    '<path d="M32 52c-7-2-11 0-12 4 5 1 7 4 7 7-1 4 3 7 7 4" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M68 52c7-2 11 0 12 4-5 1-7 4-7 7 1 4-3 7-7 4" fill="' + fill + '" stroke="' + AN_INK + '" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M42 45v-7M58 45v-7" stroke="' + AN_INK + '" stroke-width="2.6" stroke-linecap="round"/>' +
    '<circle cx="42" cy="35" r="4" fill="#FFFFFF" stroke="' + AN_INK + '" stroke-width="2.2"/>' +
    '<circle cx="58" cy="35" r="4" fill="#FFFFFF" stroke="' + AN_INK + '" stroke-width="2.2"/>' +
    '<circle cx="42" cy="35" r="1.5" fill="' + AN_INK + '"/>' +
    '<circle cx="58" cy="35" r="1.5" fill="' + AN_INK + '"/>' +
    '<path d="M36 69l-7 8M45 71l-3 9M55 71l3 9M64 69l7 8" stroke="' + AN_INK + '" stroke-width="3" stroke-linecap="round"/>';
}

/* ============================================================================
   2. РАЗБИЕНИЕ НА АКШАРЫ
   То же правило, что в уроках 11–12: akṣara = согласная + её матры,
   вирама приклеивается к предыдущей. chunks.join('') === deva проверяет регресс.
   ========================================================================= */
var AN_CONSONANT = /[\u0915-\u0939\u0958-\u095F\u0979-\u097F]/;
function anAksharas(word) {
  var out = [], cur = '', chars = String(word).split('');
  for (var i = 0; i < chars.length; i++) {
    var ch = chars[i];
    if (AN_CONSONANT.test(ch)) {
      if (cur && cur.slice(-1) !== '\u094D') { out.push(cur); cur = ''; }
      cur += ch;
      continue;
    }
    cur += ch;
  }
  if (cur) out.push(cur);
  return out;
}
function anChunks(text) {
  var words = String(text).split(' '), out = [];
  words.forEach(function (word, wi) {
    var ak = anAksharas(word), i;
    for (i = 0; i < ak.length; i += 2) out.push(ak[i] + (ak[i + 1] || ''));
    if (wi < words.length - 1) out[out.length - 1] += ' ';
  });
  return out;
}

/* ============================================================================
   3. СЛОВА
   Семь существ простыми словами и три словосочетания «цвет + животное».
   Цвета взяты из уроков 3–4: कपिश (бурый), कृष्ण (чёрный), रक्त (красный),
   हरित (зелёный), पीत (жёлтый). Согласование — мужской род, : на конце:
   हरितः कृकलासः, रक्तः कुलीरः.
   ========================================================================= */
var AN_WORDS = [
  {
    id: 'vrishabha', deva: 'वृषभः', iast: 'vṛṣabhaḥ', ttsText: 'वृषभः',
    short: 'वृषभः', meaningRu: 'бык', meaningEn: 'bull',
    gender: 'm', count: 1, fill: '#8B5E3C',
    syll: anChunks('वृषभः'),
    /* ष → श: та же группа шипящих, слово не меняет длину */
    typoDeva: 'वृशभः', typoIast: 'vṛśabhaḥ',
    maskedPrefix: 'वृष', maskedHidden: 'भः',
    gapDeva: '_षभः', gapIast: '_ṣabhaḥ', gapAnswer: 'वृ',
    gapChoices: [
      { deva: 'वृ', iast: 'vṛ' }, { deva: 'व', iast: 'va' },
      { deva: 'वॄ', iast: 'vṝ' }, { deva: 'बृ', iast: 'bṛ' }
    ],
    missingDisplay: 'वृ _भः', missingAnswer: 'ष',
    missingChoices: ['ष', 'श', 'स', 'ठ'],
    svg: anCard(anBull('#8B5E3C'))
  },
  {
    id: 'khara', deva: 'खरः', iast: 'kharaḥ', ttsText: 'खरः',
    short: 'खरः', meaningRu: 'осёл', meaningEn: 'donkey',
    gender: 'm', count: 1, fill: '#94A3B8',
    syll: anChunks('खरः'),
    /* ख → घ: одна варга क / ख / ग / घ */
    typoDeva: 'घरः', typoIast: 'gharaḥ',
    maskedPrefix: 'ख', maskedHidden: 'रः',
    gapDeva: '_रः', gapIast: '_raḥ', gapAnswer: 'ख',
    gapChoices: [
      { deva: 'ख', iast: 'kha' }, { deva: 'क', iast: 'ka' },
      { deva: 'ग', iast: 'ga' }, { deva: 'घ', iast: 'gha' }
    ],
    missingDisplay: 'ख _ः', missingAnswer: 'र',
    missingChoices: ['र', 'ल', 'न', 'य'],
    svg: anCard(anDonkey('#94A3B8'))
  },
  {
    id: 'baka', deva: 'बकः', iast: 'bakaḥ', ttsText: 'बकः',
    short: 'बकः', meaningRu: 'цапля', meaningEn: 'heron',
    gender: 'm', count: 1, fill: '#E2E8F0',
    syll: anChunks('बकः'),
    /* ब → भ: одна варга प / फ / ब / भ / म */
    typoDeva: 'भकः', typoIast: 'bhakaḥ',
    maskedPrefix: 'ब', maskedHidden: 'कः',
    gapDeva: '_कः', gapIast: '_kaḥ', gapAnswer: 'ब',
    gapChoices: [
      { deva: 'ब', iast: 'ba' }, { deva: 'भ', iast: 'bha' },
      { deva: 'प', iast: 'pa' }, { deva: 'व', iast: 'va' }
    ],
    missingDisplay: 'ब _ः', missingAnswer: 'क',
    missingChoices: ['क', 'ख', 'ग', 'त'],
    svg: anCard(anHeron('#E2E8F0'))
  },
  {
    id: 'ajagara', deva: 'अजगरः', iast: 'ajagaraḥ', ttsText: 'अजगरः',
    short: 'अजगरः', meaningRu: 'удав', meaningEn: 'python',
    gender: 'm', count: 1, fill: '#4D7C0F',
    syll: anChunks('अजगरः'),
    /* ग → घ: одна варга */
    typoDeva: 'अजघरः', typoIast: 'ajagharaḥ',
    maskedPrefix: 'अजग', maskedHidden: 'रः',
    gapDeva: 'अजग_ः', gapIast: 'ajaga_ḥ', gapAnswer: 'र',
    gapChoices: [
      { deva: 'र', iast: 'ra' }, { deva: 'ल', iast: 'la' },
      { deva: 'न', iast: 'na' }, { deva: 'य', iast: 'ya' }
    ],
    missingDisplay: 'अजग_ः', missingAnswer: 'र',
    missingChoices: ['र', 'ल', 'व', 'न'],
    svg: anCard(anPython('#4D7C0F'))
  },
  {
    id: 'krkalasa', deva: 'कृकलासः', iast: 'kṛkalāsaḥ', ttsText: 'कृकलासः',
    short: 'कृकलासः', meaningRu: 'ящерица', meaningEn: 'lizard',
    gender: 'm', count: 1, fill: '#65A30D',
    syll: anChunks('कृकलासः'),
    /* स → ष: шипящие */
    typoDeva: 'कृकलाषः', typoIast: 'kṛkalāṣaḥ',
    maskedPrefix: 'कृकला', maskedHidden: 'सः',
    gapDeva: 'कृकला_ः', gapIast: 'kṛkalā_ḥ', gapAnswer: 'स',
    gapChoices: [
      { deva: 'स', iast: 'sa' }, { deva: 'श', iast: 'śa' },
      { deva: 'ष', iast: 'ṣa' }, { deva: 'त', iast: 'ta' }
    ],
    missingDisplay: 'कृक_ासः', missingAnswer: 'ल',
    missingChoices: ['ल', 'र', 'न', 'व'],
    svg: anCard(anLizard('#65A30D'))
  },
  {
    id: 'kacchapa', deva: 'कच्छपः', iast: 'kacchapaḥ', ttsText: 'कच्छपः',
    short: 'कच्छपः', meaningRu: 'черепаха', meaningEn: 'tortoise',
    gender: 'm', count: 1, fill: '#0E7490',
    syll: anChunks('कच्छपः'),
    /* छ → च: одна варга च / छ / ज / झ / ञ */
    typoDeva: 'कच्छफः', typoIast: 'kacchaphaḥ',
    maskedPrefix: 'कच्छ', maskedHidden: 'पः',
    gapDeva: 'कच्छ_ः', gapIast: 'kaccha_ḥ', gapAnswer: 'प',
    gapChoices: [
      { deva: 'प', iast: 'pa' }, { deva: 'फ', iast: 'pha' },
      { deva: 'ब', iast: 'ba' }, { deva: 'भ', iast: 'bha' }
    ],
    missingDisplay: 'कच्_पः', missingAnswer: 'छ',
    missingChoices: ['छ', 'च', 'श', 'ष'],
    svg: anCard(anTortoise('#0E7490'))
  },
  {
    id: 'kulira', deva: 'कुलीरः', iast: 'kulīraḥ', ttsText: 'कुलीरः',
    short: 'कुलीरः', meaningRu: 'краб', meaningEn: 'crab',
    gender: 'm', count: 1, fill: '#EA580C',
    syll: anChunks('कुलीरः'),
    /* ी → ि: долгота — самая частая ошибка, но слово не меняет длину */
    typoDeva: 'कुलिरः', typoIast: 'kuliraḥ',
    maskedPrefix: 'कुली', maskedHidden: 'रः',
    gapDeva: 'कुली_ः', gapIast: 'kulī_ḥ', gapAnswer: 'र',
    gapChoices: [
      { deva: 'र', iast: 'ra' }, { deva: 'ल', iast: 'la' },
      { deva: 'न', iast: 'na' }, { deva: 'ड', iast: 'ḍa' }
    ],
    missingDisplay: 'कु_ीरः', missingAnswer: 'ल',
    missingChoices: ['ल', 'र', 'न', 'व'],
    svg: anCard(anCrab('#EA580C'))
  },
  /* ---------- цвет + животное: повторение уроков 3–4 ---------- */
  {
    id: 'haritakrkalasa', deva: 'हरितः कृकलासः', iast: 'haritaḥ kṛkalāsaḥ', ttsText: 'हरितः कृकलासः',
    short: 'हरितः कृकलासः', meaningRu: 'зелёная ящерица', meaningEn: 'green lizard',
    gender: 'm', count: 1, fill: '#16A34A',
    syll: anChunks('हरितः कृकलासः'),
    /* त → द: одна варга */
    typoDeva: 'हरिदः कृकलासः', typoIast: 'haridaḥ kṛkalāsaḥ',
    maskedPrefix: 'हरितः कृकला', maskedHidden: 'सः',
    gapDeva: 'हरितः कृकला_ः', gapIast: 'haritaḥ kṛkalā_ḥ', gapAnswer: 'स',
    gapChoices: [
      { deva: 'स', iast: 'sa' }, { deva: 'श', iast: 'śa' },
      { deva: 'ष', iast: 'ṣa' }, { deva: 'त', iast: 'ta' }
    ],
    missingDisplay: 'हरितः _ृकलासः', missingAnswer: 'क',
    missingChoices: ['क', 'ख', 'ग', 'च'],
    svg: anCard(anLizard('#16A34A'))
  },
  {
    id: 'raktakulira', deva: 'रक्तः कुलीरः', iast: 'raktaḥ kulīraḥ', ttsText: 'रक्तः कुलीरः',
    short: 'रक्तः कुलीरः', meaningRu: 'красный краб', meaningEn: 'red crab',
    gender: 'm', count: 1, fill: '#DC2626',
    syll: anChunks('रक्तः कुलीरः'),
    /* र → ल: плавные — ошибка почти незаметна на слух и на глаз */
    typoDeva: 'लक्तः कुलीरः', typoIast: 'laktaḥ kulīraḥ',
    maskedPrefix: 'रक्तः कुली', maskedHidden: 'रः',
    gapDeva: 'रक्तः कुली_ः', gapIast: 'raktaḥ kulī_ḥ', gapAnswer: 'र',
    gapChoices: [
      { deva: 'र', iast: 'ra' }, { deva: 'ल', iast: 'la' },
      { deva: 'न', iast: 'na' }, { deva: 'ड', iast: 'ḍa' }
    ],
    missingDisplay: 'रक्तः कु_ीरः', missingAnswer: 'ल',
    missingChoices: ['ल', 'र', 'न', 'व'],
    svg: anCard(anCrab('#DC2626'))
  },
  {
    id: 'pittakacchapa', deva: 'पीतः कच्छपः', iast: 'pītaḥ kacchapaḥ', ttsText: 'पीतः कच्छपः',
    short: 'पीतः कच्छपः', meaningRu: 'жёлтая черепаха', meaningEn: 'yellow tortoise',
    gender: 'm', count: 1, fill: '#EAB308',
    syll: anChunks('पीतः कच्छपः'),
    /* त → थ: одна варга */
    typoDeva: 'पीथः कच्छपः', typoIast: 'pīthaḥ kacchapaḥ',
    maskedPrefix: 'पीतः कच्छ', maskedHidden: 'पः',
    gapDeva: 'पीतः कच्छ_ः', gapIast: 'pītaḥ kaccha_ḥ', gapAnswer: 'प',
    gapChoices: [
      { deva: 'प', iast: 'pa' }, { deva: 'फ', iast: 'pha' },
      { deva: 'ब', iast: 'ba' }, { deva: 'भ', iast: 'bha' }
    ],
    missingDisplay: 'पीतः _च्छपः', missingAnswer: 'क',
    missingChoices: ['क', 'ख', 'ग', 'च'],
    svg: anCard(anTortoise('#EAB308'))
  }
];

/* ============================================================================
   4. ПОСТЕР И ЕГО МЕТКИ
   ========================================================================= */
function anPosterArt() {
  var art = '<rect x="4" y="4" width="312" height="212" rx="16" fill="#F8EFE6" stroke="#E5DEC9" stroke-width="1.5"/>';
  AN_WORDS.forEach(function (w, i) {
    var x = 10 + (i % 5) * 62, y = 10 + Math.floor(i / 5) * 100;
    var inner = w.svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    art += '<rect x="' + x + '" y="' + y + '" width="56" height="56" rx="10" fill="#FFFFFF" stroke="#E5DEC9" stroke-width="1.2"/>' +
      '<svg x="' + (x + 2) + '" y="' + (y + 2) + '" width="52" height="52" viewBox="0 0 100 100">' + inner + '</svg>';
  });
  return art;
}
function anPosterPins() {
  return AN_WORDS.map(function (w, i) {
    var x = 10 + (i % 5) * 62, y = 10 + Math.floor(i / 5) * 100;
    return { id: w.id, num: i + 1, x: x + 28, y: y + 28, tx: x + 28, ty: y + 14 };
  });
}

/* ============================================================================
   5. УРОК
   ========================================================================= */
SAL.registerLesson({
  key: 'LAN',
  num: 18,
  titleDeva: 'पशवः',
  titleRu: 'Животные Шримад-Бхагаватам',
  titleEn: 'Beasts of the Bhāgavata',
  topicRu: 'бык, осёл, цапля, удав, ящерица, черепаха, краб и цветные словосочетания',
  topicEn: 'bull, donkey, heron, python, lizard, tortoise, crab and colour phrases',
  introRu: 'Восемнадцатый урок: десять существ из «Шримад-Бхагаватам» (5-я песнь, Бхагавата-вана) — <code>वृषभः</code> бык, <code>खरः</code> осёл, <code>बकः</code> цапля, <code>अजगरः</code> удав, <code>कृकलासः</code> ящерица, <code>कच्छपः</code> черепаха и <code>कुलीरः</code> краб. Счёта в этом уроке нет: каждое слово — одно существо. Зато цвета из уроков 3–4 работают как определение, и получается <code>हरितः कृकलासः</code> «зелёная ящерица» и <code>रक्तः कुलीरः</code> «красный краб»; прилагательное стоит впереди и принимает мужское окончание <code>-ः</code>.',
  introEn: 'The eighteenth lesson: ten creatures from the Śrīmad Bhāgavatam (Fifth Canto, Bhāgavata-vana) — <code>vṛṣabhaḥ</code> bull, <code>kharaḥ</code> donkey, <code>bakaḥ</code> heron, <code>ajagaraḥ</code> python, <code>kṛkalāsaḥ</code> lizard, <code>kacchapaḥ</code> tortoise and <code>kulīraḥ</code> crab. Counting is left out: one word, one creature. The colours from lessons 3–4 work as adjectives instead, giving <code>haritaḥ kṛkalāsaḥ</code> “green lizard” and <code>raktaḥ kulīraḥ</code> “red crab”; the adjective comes first and takes the masculine ending <code>-aḥ</code>.',
  aim: {
    ru: {
      main: 'Ввести и отработать десять существительных мужского рода в контексте описания животных и их цвета.',
      subs: [
        'Отработать окончание мужского рода -ः у существительного и у согласуемого прилагательного: हरितः कृकलासः.',
        'Уточнить звуки ṣ / ś в वृषभः, कच्छपः и छ в कच्छपः, कृकलासः.',
        'Повторить цвета уроков 3–4 в роли определения, а не отдельного слова.'
      ]
    },
    en: {
      main: 'To introduce and practise ten masculine nouns in the context of describing animals and their colour.',
      subs: [
        'To drill the masculine ending -aḥ on the noun and on the agreeing adjective: haritaḥ kṛkalāsaḥ.',
        'To clarify ṣ / ś in vṛṣabhaḥ, kacchapaḥ and the cluster cch in kacchapaḥ, kṛkalāsaḥ.',
        'To recycle the colours of lessons 3–4 in their adjectival role rather than as words on their own.'
      ]
    }
  },
  gestureRu: 'покажите рукой силуэт животного: рога, уши, длинную шею или клешни',
  gestureEn: 'draw the animal’s outline in the air: horns, ears, a long neck or claws',
  prodTitleRu: 'Живая речь: назовите вслух всех {n}',
  prodTitleEn: 'Freer Production: Name All {n} Aloud',
  words: AN_WORDS,
  /* настоящий санскрит, но в этом уроке его нет — для поля 10 × 10 */
  decoys: [
    'हस्ती', 'सिंहः', 'व्याघ्रः', 'मृगः', 'अश्वः', 'गर्दभः',
    'मूषकः', 'सर्पः', 'मण्डूकः', 'मत्स्यः', 'पक्षी', 'शुकः',
    'काकः', 'गरुडः', 'वानरः', 'भल्लूकः', 'उष्ट्रः', 'महिषः',
    'अजा', 'गौः', 'सूकरः', 'शशः', 'कपोतः', 'मयूरः',
    'वृक्षः', 'जलम्', 'फलम्', 'गृहम्', 'पुस्तकम्', 'नयनम्',
    'पादः', 'हस्तः', 'शीर्षम्', 'कर्णः', 'मुखम्', 'ललाटम्'
  ],
  /* extra practice games from games-extra.js (solo, then pair, then the grids) */
  extraGames: [
    'hotcards', 'retry', 'echo', 'snowball', 'drip', 'anagram', 'typein', 'sorting',
    'flashcount', 'blindboard',
    'battleship', 'bingo', 'duel', 'describe', 'orderrelay', 'coopmemory', 'tictactoe',
    'wordgrid', 'wordsearch'
  ],
  /* the sorting game asks about the shape of the word */
  sortFeatures: [
    { ru: 'Есть звук «क» (ka)', en: 'Contains "क" (ka)',
      test: function (w) { return w.deva.indexOf('क') >= 0; } },
    { ru: 'Есть шипящая (श / ष / स)', en: 'Has a sibilant (श / ष / स)',
      test: function (w) { return /[शषस]/.test(w.deva); } },
    { ru: 'Есть висарга ः', en: 'Has a visarga (ः)',
      test: function (w) { return w.deva.indexOf('ः') >= 0; } },
    { ru: 'Окончание -ः (мужской род)', en: 'Ends in -aḥ (masculine)',
      test: function (w) { return w.gender === 'm'; } },
    { ru: 'Слово с цветом', en: 'A phrase with a colour',
      test: function (w) { return w.deva.indexOf(' ') >= 0; } }
  ],
  steps: [
    { wordIds: ['vrishabha', 'khara'] },
    { wordIds: ['baka', 'ajagara'] },
    { wordIds: ['krkalasa', 'kacchapa'] },
    { wordIds: ['kulira'] },
    { wordIds: ['haritakrkalasa', 'raktakulira'] },
    { wordIds: ['pittakacchapa'] }
  ],
  hotspots: {
    figures: [
      {
        key: 'beasts',
        captionRu: 'Десять существ: семь слов и три с цветом',
        captionEn: 'Ten Creatures: Seven Words, Three with a Colour',
        viewBox: '0 0 320 220',
        art: anPosterArt(),
        pins: anPosterPins()
      }
    ]
  },
  groups: [
    { titleRu: 'Пресмыкающиеся', titleEn: 'Reptiles',
      wordIds: ['ajagara', 'krkalasa', 'kacchapa'] },
    { titleRu: 'Птицы и звери', titleEn: 'Birds and Beasts',
      wordIds: ['vrishabha', 'khara', 'baka'] },
    { titleRu: 'Живёт в воде и у воды', titleEn: 'Water and Shore',
      wordIds: ['kulira', 'kacchapa', 'baka'] },
    { titleRu: 'С цветом впереди', titleEn: 'With a Colour First',
      wordIds: ['haritakrkalasa', 'raktakulira', 'pittakacchapa'] },
    { titleRu: 'Окончание -ः', titleEn: 'Ending -aḥ',
      wordIds: ['vrishabha', 'khara', 'baka', 'ajagara', 'krkalasa', 'kacchapa', 'kulira'] }
  ],
  categories: [
    { titleRu: 'Длинный и гибкий', titleEn: 'Long and Slithery',
      wordIds: ['ajagara', 'krkalasa', 'haritakrkalasa'] },
    { titleRu: 'В панцире', titleEn: 'In a Shell',
      hintRu: 'कच्छपः и कुलीरः носят твёрдый покров, बकः — нет.',
      hintEn: 'kacchapaḥ and kulīraḥ wear a hard covering; bakaḥ does not.',
      wordIds: ['kacchapa', 'kulira', 'pittakacchapa', 'raktakulira'] },
    { titleRu: 'С цветом', titleEn: 'With a Colour in the Phrase',
      wordIds: ['haritakrkalasa', 'raktakulira', 'pittakacchapa'] },
    { titleRu: 'Без цвета', titleEn: 'Without a Colour',
      wordIds: ['vrishabha', 'khara', 'baka', 'ajagara', 'krkalasa', 'kacchapa', 'kulira'] },
    { titleRu: 'Есть छ (cha) или ष (ṣa)', titleEn: 'Have छ (cha) or ष (ṣa)',
      wordIds: ['kacchapa', 'pittakacchapa', 'vrishabha'] },
    { titleRu: 'Самое короткое и самое длинное', titleEn: 'Shortest and Longest',
      hintRu: 'खरः из двух слогов, कृकलासः и हरितः कृकलासः — длинные.',
      hintEn: 'kharaḥ has two syllables; kṛkalāsaḥ and haritaḥ kṛkalāsaḥ are the long ones.',
      wordIds: ['khara', 'krkalasa', 'haritakrkalasa'] },
    { titleRu: 'Все десять — мужской род', titleEn: 'All Ten Are Masculine',
      wordIds: ['vrishabha', 'khara', 'baka', 'ajagara', 'krkalasa', 'kacchapa', 'kulira',
        'haritakrkalasa', 'raktakulira', 'pittakacchapa'] }
  ]
});
