/**
 * LESSON 7 · सङ्ख्याः · "Numbers 6–10" (5 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * The twin of Lesson 6 (Numbers 1–5), built for the second five Sanskrit numerals:
 * - the counting forms: neuter nominative-accusative षट्, सप्त, अष्ट, नव, दश
 * - 6–10 do not change in this form: the stem IS the counting form
 * - no Arabic digits on the cards: quantity is shown only by beads (Direct Method)
 * - the TPR gesture here is clapping, not touching a body part
 * - IAST is hidden by default and can be switched on with the 🔤 button.
 * Data file for the generic engine in lesson-engine.js.
 */

SAL.registerLesson({
  key: "L5",
  num: 8,
  titleDeva: "सङ्ख्याः",
  titleRu: "Цифры 6–10",
  titleEn: "Numbers 6–10",
  topicRu: "шесть, семь, восемь, девять, десять",
  topicEn: "six, seven, eight, nine, ten",
  introRu: "Седьмой урок: числительные от шести до десяти — <code>षट्</code>, <code>सप्त</code>, <code>अष्ट</code>, <code>नव</code>, <code>दश</code>. В этой форме (именительный-винительный падеж среднего рода) они не меняются: основа и есть счётная форма. Количество показывают только бусины на картинке: ни арабских цифр, ни перевода.",
  introEn: "The seventh lesson: the numerals six to ten — <code>ṣaṭ</code>, <code>sapta</code>, <code>aṣṭa</code>, <code>nava</code>, <code>daśa</code>. In this form (neuter nominative-accusative) they do not change: the stem IS the counting form. Quantity is shown only by beads in the picture: no Arabic digits, no translation.",
  /* цели урока по схеме CELTA: главная цель — языковой материал, подцели — «другая половина» */
  aim: {
    ru: {
      main: "Ввести и отработать числительные 6–10 в контексте счёта предметов.",
      subs: [
        "Уточнить, что эти основы не меняются в счётной форме.",
        "Поставить произношение ṣ и ś в словах षट्, सप्त и दश.",
        "Повторить числительные 1–5 в тех же играх."
      ]
    },
    en: {
      main: "To introduce and practise the numerals 6–10 in the context of counting everyday objects.",
      subs: [
        "To clarify that these stems do not change in the counting form.",
        "To give practice in the pronunciation of ṣ and ś in षट्, सप्त and दश.",
        "To review the numerals 1–5 through the same games."
      ]
    }
  },
  gestureRu: "хлопните в ладоши столько раз",
  gestureEn: "clap your hands that many times",
  prodTitleRu: "Живая речь: назовите вслух все {n} числительных",
  prodTitleEn: "Freer Production: Say All {n} Numerals Aloud",
  words: [
    {
      id: "shat", deva: "षट्", iast: "ṣaṭ", ttsText: "षट्", value: 6,
      syll: ["ष", "ट्"],
      typoDeva: "शट्", typoIast: "śaṭ",
      maskedPrefix: "ष", maskedHidden: "ट्",
      gapDeva: "_ट्", gapIast: "_ṭ", gapAnswer: "ष",
      gapChoices: [
          { deva: "ष", iast: "ṣ" },
          { deva: "श", iast: "ś" },
          { deva: "स", iast: "sa" },
          { deva: "क्ष", iast: "kṣa" }
      ],
      missingDisplay: "ष _", missingAnswer: "ट्",
      missingChoices: ["ट्", "त्", "ठ्", "ड्"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"28\" cy=\"40\" r=\"11\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"24.7\" cy=\"36.7\" r=\"2.64\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"40\" r=\"11\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"46.7\" cy=\"36.7\" r=\"2.64\" fill=\"#FDE68A\"/>\n      <circle cx=\"72\" cy=\"40\" r=\"11\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"68.7\" cy=\"36.7\" r=\"2.64\" fill=\"#FDE68A\"/>\n      <circle cx=\"28\" cy=\"64\" r=\"11\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"24.7\" cy=\"60.7\" r=\"2.64\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"64\" r=\"11\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"46.7\" cy=\"60.7\" r=\"2.64\" fill=\"#FDE68A\"/>\n      <circle cx=\"72\" cy=\"64\" r=\"11\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"68.7\" cy=\"60.7\" r=\"2.64\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "sapta", deva: "सप्त", iast: "sapta", ttsText: "सप्त", value: 7,
      syll: ["स", "प्त"],
      typoDeva: "सपत", typoIast: "sapata",
      maskedPrefix: "स", maskedHidden: "प्त",
      gapDeva: "_प्त", gapIast: "_pta", gapAnswer: "स",
      gapChoices: [
          { deva: "स", iast: "sa" },
          { deva: "श", iast: "śa" },
          { deva: "ष", iast: "ṣa" },
          { deva: "ह", iast: "ha" }
      ],
      missingDisplay: "स _ त", missingAnswer: "प्",
      missingChoices: ["प्", "ब्", "फ्", "भ्"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"28\" cy=\"38\" r=\"11\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"24.7\" cy=\"34.7\" r=\"2.64\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"38\" r=\"11\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"46.7\" cy=\"34.7\" r=\"2.64\" fill=\"#FDE68A\"/>\n      <circle cx=\"72\" cy=\"38\" r=\"11\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"68.7\" cy=\"34.7\" r=\"2.64\" fill=\"#FDE68A\"/>\n      <circle cx=\"25\" cy=\"66\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"22\" cy=\"63\" r=\"2.4\" fill=\"#FDE68A\"/>\n      <circle cx=\"42\" cy=\"66\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"39\" cy=\"63\" r=\"2.4\" fill=\"#FDE68A\"/>\n      <circle cx=\"59\" cy=\"66\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"56\" cy=\"63\" r=\"2.4\" fill=\"#FDE68A\"/>\n      <circle cx=\"76\" cy=\"66\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"73\" cy=\"63\" r=\"2.4\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "ashta", deva: "अष्ट", iast: "aṣṭa", ttsText: "अष्ट", value: 8,
      syll: ["अ", "ष्ट"],
      typoDeva: "अष्ठ", typoIast: "aṣṭha",
      maskedPrefix: "अ", maskedHidden: "ष्ट",
      gapDeva: "_ष्ट", gapIast: "_ṣṭa", gapAnswer: "अ",
      gapChoices: [
          { deva: "अ", iast: "a" },
          { deva: "आ", iast: "ā" },
          { deva: "उ", iast: "u" },
          { deva: "इ", iast: "i" }
      ],
      missingDisplay: "अ _ ट", missingAnswer: "ष्",
      missingChoices: ["ष्", "श्", "स्", "क्ष्"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"25\" cy=\"38\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"22\" cy=\"35\" r=\"2.4\" fill=\"#FDE68A\"/>\n      <circle cx=\"42\" cy=\"38\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"39\" cy=\"35\" r=\"2.4\" fill=\"#FDE68A\"/>\n      <circle cx=\"59\" cy=\"38\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"56\" cy=\"35\" r=\"2.4\" fill=\"#FDE68A\"/>\n      <circle cx=\"76\" cy=\"38\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"73\" cy=\"35\" r=\"2.4\" fill=\"#FDE68A\"/>\n      <circle cx=\"25\" cy=\"66\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"22\" cy=\"63\" r=\"2.4\" fill=\"#FDE68A\"/>\n      <circle cx=\"42\" cy=\"66\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"39\" cy=\"63\" r=\"2.4\" fill=\"#FDE68A\"/>\n      <circle cx=\"59\" cy=\"66\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"56\" cy=\"63\" r=\"2.4\" fill=\"#FDE68A\"/>\n      <circle cx=\"76\" cy=\"66\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"73\" cy=\"63\" r=\"2.4\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "nava", deva: "नव", iast: "nava", ttsText: "नव", value: 9,
      syll: ["न", "व"],
      typoDeva: "नभ", typoIast: "nabha",
      maskedPrefix: "न", maskedHidden: "व",
      gapDeva: "_व", gapIast: "_va", gapAnswer: "न",
      gapChoices: [
          { deva: "न", iast: "na" },
          { deva: "ण", iast: "ṇa" },
          { deva: "म", iast: "ma" },
          { deva: "त", iast: "ta" }
      ],
      missingDisplay: "न _", missingAnswer: "व",
      missingChoices: ["व", "ब", "य", "र"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"28\" cy=\"30\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"24.85\" cy=\"26.85\" r=\"2.52\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"30\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"46.85\" cy=\"26.85\" r=\"2.52\" fill=\"#FDE68A\"/>\n      <circle cx=\"72\" cy=\"30\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"68.85\" cy=\"26.85\" r=\"2.52\" fill=\"#FDE68A\"/>\n      <circle cx=\"28\" cy=\"52\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"24.85\" cy=\"48.85\" r=\"2.52\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"52\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"46.85\" cy=\"48.85\" r=\"2.52\" fill=\"#FDE68A\"/>\n      <circle cx=\"72\" cy=\"52\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"68.85\" cy=\"48.85\" r=\"2.52\" fill=\"#FDE68A\"/>\n      <circle cx=\"28\" cy=\"74\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"24.85\" cy=\"70.85\" r=\"2.52\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"74\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"46.85\" cy=\"70.85\" r=\"2.52\" fill=\"#FDE68A\"/>\n      <circle cx=\"72\" cy=\"74\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"68.85\" cy=\"70.85\" r=\"2.52\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "dasha", deva: "दश", iast: "daśa", ttsText: "दश", value: 10,
      syll: ["द", "श"],
      typoDeva: "दस", typoIast: "dasa",
      maskedPrefix: "द", maskedHidden: "श",
      gapDeva: "_श", gapIast: "_śa", gapAnswer: "द",
      gapChoices: [
          { deva: "द", iast: "da" },
          { deva: "ध", iast: "dha" },
          { deva: "ड", iast: "ḍa" },
          { deva: "त", iast: "ta" }
      ],
      missingDisplay: "द _", missingAnswer: "श",
      missingChoices: ["श", "ष", "स", "ह"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"20\" cy=\"40\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"17.75\" cy=\"37.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"35\" cy=\"40\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"32.75\" cy=\"37.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"40\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"47.75\" cy=\"37.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"65\" cy=\"40\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"62.75\" cy=\"37.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"80\" cy=\"40\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"77.75\" cy=\"37.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"20\" cy=\"64\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"17.75\" cy=\"61.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"35\" cy=\"64\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"32.75\" cy=\"61.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"64\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"47.75\" cy=\"61.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"65\" cy=\"64\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"62.75\" cy=\"61.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"80\" cy=\"64\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"77.75\" cy=\"61.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n    </svg>"
    }
  ],
  /* words for the 10 x 10 word grid: real Sanskrit, but never in this lesson */
  decoys: [
    "षट",
    "शट्",
    "सट्",
    "सपत",
    "शप्त",
    "अष्ठ",
    "अस्त",
    "नभ",
    "णव",
    "दस",
    "दष",
    "एकम्",
    "द्वे",
    "त्रीणि",
    "चत्वारि",
    "पञ्च",
    "शीर्ष",
    "उदर",
    "हस्त",
    "अङ्गुली",
    "जानु",
    "पाद",
    "ललाट",
    "नयन",
    "नासिका",
    "कर्ण",
    "मुख",
    "दन्त",
    "जिह्वा",
    "जलम्",
    "फलम्"
  ],
  /* extra practice games from games-extra.js (solo, then pair, then the grids) */
  extraGames: [
    'hotcards', 'retry', 'echo', 'snowball', 'drip', 'anagram', 'typein', 'sorting',
    'flashcount', 'blindboard',
    'battleship', 'bingo', 'duel', 'describe', 'orderrelay', 'coopmemory', 'tictactoe',
    'wordgrid', 'wordsearch'
  ],
  /* the sorting game asks about the shape of the word (see games-extra.js) */
  sortFeatures: [
    { ru: 'Есть буква «ष» (ṣa)', en: 'Contains "ष" (ṣa)',
      test: function (w) { return w.deva.indexOf('ष') >= 0; } },
    { ru: 'Есть носовой (न / ण / म)', en: 'Has a nasal (न / ण / म)',
      test: function (w) { return /[णनम]/.test(w.deva); } },
    { ru: 'Начинается с гласной «अ»', en: 'Starts with the vowel "अ"',
      test: function (w) { return w.deva.charAt(0) === 'अ'; } },
    { ru: 'Есть знак ् (вирама)', en: 'Has a virāma (्)',
      test: function (w) { return w.deva.indexOf('्') >= 0; } }
  ],
  steps: [
    { wordIds: ["shat", "sapta"] },
    { wordIds: ["ashta", "nava"] },
    { wordIds: ["dasha"] }
  ],
  hotspots: {
    figures: [
      {
        key: "frame",
        captionRu: "Счёты: ряды от шести до десяти",
        captionEn: "Counting Frame: Rows of Six to Ten",
        viewBox: "0 0 320 300",
        art: "<rect x=\"36\" y=\"16\" width=\"248\" height=\"268\" rx=\"16\" fill=\"#FFFBEB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <rect x=\"36\" y=\"16\" width=\"248\" height=\"30\" rx=\"16\" fill=\"#FDE68A\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M52 31H268\" stroke=\"#B45309\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <line x1=\"52\" y1=\"70\" x2=\"268\" y2=\"70\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"60\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"57.15\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"99.6\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"96.75\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"139.2\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"136.35\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"178.8\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"175.95\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"218.4\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"215.55\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"258\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"255.15\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"110\" x2=\"268\" y2=\"110\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"60\" cy=\"110\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"57.15\" cy=\"107.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"93\" cy=\"110\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"90.15\" cy=\"107.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"126\" cy=\"110\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"123.15\" cy=\"107.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"159\" cy=\"110\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"156.15\" cy=\"107.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"192\" cy=\"110\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"189.15\" cy=\"107.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"225\" cy=\"110\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"222.15\" cy=\"107.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"258\" cy=\"110\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"255.15\" cy=\"107.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"150\" x2=\"268\" y2=\"150\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"60\" cy=\"150\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"57.15\" cy=\"147.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"88.3\" cy=\"150\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"85.45\" cy=\"147.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"116.6\" cy=\"150\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"113.75\" cy=\"147.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"144.9\" cy=\"150\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"142.05\" cy=\"147.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"173.1\" cy=\"150\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"170.25\" cy=\"147.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"201.4\" cy=\"150\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"198.55\" cy=\"147.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"229.7\" cy=\"150\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"226.85\" cy=\"147.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"258\" cy=\"150\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"255.15\" cy=\"147.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"190\" x2=\"268\" y2=\"190\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"60\" cy=\"190\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"57.15\" cy=\"187.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"84.8\" cy=\"190\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"81.95\" cy=\"187.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"109.5\" cy=\"190\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"106.65\" cy=\"187.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"134.2\" cy=\"190\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"131.35\" cy=\"187.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"159\" cy=\"190\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"156.15\" cy=\"187.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"183.8\" cy=\"190\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"180.95\" cy=\"187.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"208.5\" cy=\"190\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"205.65\" cy=\"187.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"233.2\" cy=\"190\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"230.35\" cy=\"187.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"258\" cy=\"190\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"255.15\" cy=\"187.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"230\" x2=\"268\" y2=\"230\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"60\" cy=\"230\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"57.15\" cy=\"227.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"82\" cy=\"230\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"79.15\" cy=\"227.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"104\" cy=\"230\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"101.15\" cy=\"227.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"126\" cy=\"230\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"123.15\" cy=\"227.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"148\" cy=\"230\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"145.15\" cy=\"227.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"170\" cy=\"230\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"167.15\" cy=\"227.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"192\" cy=\"230\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"189.15\" cy=\"227.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"214\" cy=\"230\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"211.15\" cy=\"227.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"236\" cy=\"230\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"233.15\" cy=\"227.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"258\" cy=\"230\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"255.15\" cy=\"227.15\" r=\"2.28\" fill=\"#FDE68A\"/>",
        pins: [
          { id: "shat", num: 1, x: 300, y: 64, tx: 178.8, ty: 70 },
          { id: "sapta", num: 2, x: 20, y: 104, tx: 159, ty: 110 },
          { id: "ashta", num: 3, x: 300, y: 144, tx: 173.1, ty: 150 },
          { id: "nava", num: 4, x: 20, y: 184, tx: 159, ty: 190 },
          { id: "dasha", num: 5, x: 300, y: 224, tx: 170, ty: 230 }
        ]
      }
    ]
  },
  groups: [
    { titleRu: "Шесть и семь", titleEn: "Six and Seven", wordIds: ["shat", "sapta"] },
    { titleRu: "Восемь, девять, десять", titleEn: "Eight, Nine, Ten", wordIds: ["ashta", "nava", "dasha"] },
    { titleRu: "Чётные", titleEn: "Even", wordIds: ["shat", "ashta", "dasha"] },
    { titleRu: "Нечётные", titleEn: "Odd", wordIds: ["sapta", "nava"] }
  ],
  categories: [
    { titleRu: "Чётные числа", titleEn: "Even Numbers", wordIds: ["shat", "ashta", "dasha"] },
    { titleRu: "Нечётные числа", titleEn: "Odd Numbers", wordIds: ["sapta", "nava"] },
    { titleRu: "Больше семи", titleEn: "More Than Seven", wordIds: ["ashta", "nava", "dasha"] },
    { titleRu: "Меньше восьми", titleEn: "Less Than Eight", wordIds: ["shat", "sapta"] },
    { titleRu: "Больше шести", titleEn: "More Than Six", wordIds: ["sapta", "ashta", "nava", "dasha"] },
    { titleRu: "Восемь или девять", titleEn: "Eight or Nine", wordIds: ["ashta", "nava"] },
    { titleRu: "С буквой «ष» (ṣa)", titleEn: 'Containing "ष" (ṣa)', wordIds: ["shat", "ashta"] },
    { titleRu: "Со знаком ् (вирама)", titleEn: 'With a Virāma (्)', wordIds: ["shat", "sapta", "ashta"] },
    { titleRu: "Без знака ्", titleEn: 'Without a Virāma', wordIds: ["nava", "dasha"] },
    { titleRu: "Все, кроме «दश»", titleEn: 'Everything but "दश"', wordIds: ["shat", "sapta", "ashta", "nava"] }
  ]
});
