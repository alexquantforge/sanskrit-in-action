/**
 * LESSON 12 · जिह्वाः · "Five Tongues — Feminine Endings" (5 словосочетаний)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 *
 * Урок стоит сразу после «Окончаний» (урок 11) и замыкает тройку: там были
 * средний и мужской род, здесь — женский, на одном и том же предмете.
 * Числительные 1–5 те же, что в «Счёте девочек» (урок 10), но теперь они
 * считают не девочек, а языки — и род виден уже не по числительному,
 * а по окончанию слова и цвета:
 *
 *   एका पाटला जिह्वा        «один розовый язык»      -ा
 *   द्वे रक्ते जिह्वे        «два красных языка»      -े
 *   तिस्रः पीताः जिह्वाः     «три жёлтых языка»       -ः
 *   चतस्रः हरिताः जिह्वाः    «четыре зелёных языка»   -ः
 *   पञ्च नारङ्गाः जिह्वाः    «пять оранжевых языков»  -ः
 *
 * Главная мысль: у женского рода три окончания, а не два — -ा (один),
 * -े (два) и -ाः (три и больше). पञ्च не меняется, поэтому в последней фразе
 * женский род несёт только हरित / नारङ्ग и जिह्वा.
 *
 * Цвета взяты из уроков 3–4 (पाटल, रक्त, पीत, हरित, नारङ्ग) — все уже
 * знакомы, поэтому цвет работает как проверка рода, а не как новая лексика.
 *
 * IAST скрыт по умолчанию и включается кнопкой 🔤.
 * Data file for the generic engine in lesson-engine.js.
 */

/* ============================================================================
   1. КАРТИНКИ
   Язык рисуется как язык с ложки или изо рта: широкий лепесток с бороздкой
   посередине. На карточке ровно столько языков, сколько названо, и все они
   нужного цвета — पाटला читается как «розовый», а не как «какой-то».
   ========================================================================= */
var LT_INK = '#14213D';

/* один язык: лепесток, бороздка и подсветка */
function ltTongue(fill) {
  return '<path d="M20 54C20 32 32 20 50 20C68 20 80 32 80 54C80 74 66 84 50 84C34 84 20 74 20 54Z" fill="' + fill + '" stroke="' + LT_INK + '" stroke-width="3.4" stroke-linejoin="round"/>' +
    '<path d="M50 30V70" stroke="' + LT_INK + '" stroke-width="2.6" stroke-linecap="round" opacity="0.55"/>' +
    '<path d="M38 33C32 38 29 45 29 53" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.55"/>';
}

/* раскладка по количеству: 1 / 2 / 3 в ряд, 4 — 2 × 2, 5 — 3 + 2 (как в уроке 10).
   Язык шире, чем кажется: 60 единиц по ширине, поэтому шаг в ряду считается
   от ширины, иначе три и пять языков наползают друг на друга. */
var LT_ASPECT = 60;
function ltScale(step) {
  return Math.min(1.15, (step * 0.94) / LT_ASPECT);
}
var LT_LAYOUT = {
  1: [[50, 50, 1.15]],
  2: [[29, 50, ltScale(42)], [71, 50, ltScale(42)]],
  3: [[19, 50, ltScale(31)], [50, 50, ltScale(31)], [81, 50, ltScale(31)]],
  4: [[30, 32, ltScale(36)], [70, 32, ltScale(36)], [30, 68, ltScale(36)], [70, 68, ltScale(36)]],
  5: [[19, 30, ltScale(31)], [50, 30, ltScale(31)], [81, 30, ltScale(31)],
      [34, 70, ltScale(31)], [66, 70, ltScale(31)]]
};

/* n языков одного цвета вокруг точки (cx, cy) */
function ltFigure(fill, n, cx, cy, scale) {
  scale = scale || 1;
  return LT_LAYOUT[n].map(function (p) {
    return '<g transform="translate(' + (cx + (p[0] - 50) * scale) + ' ' + (cy + (p[1] - 50) * scale) +
      ') scale(' + (p[2] * scale) + ') translate(-50 -50)">' + ltTongue(fill) + '</g>';
  }).join('');
}

/* картинка урока */
function ltCard(fill, n) {
  return '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100" height="100" rx="14" fill="#FFFBEB"/>' +
    '<rect x="7" y="7" width="86" height="86" rx="10" fill="none" stroke="#E5DEC9" stroke-width="1.5"/>' +
    ltFigure(fill, n, 50, 50, 1) +
    '</svg>';
}

/* ============================================================================
   2. РАЗБИЕНИЕ НА АКШАРЫ
   «Филворд (среди букв)» и «Собери слово» режут слово на части: пары акшар
   внутри каждого слова. Пробел остаётся на конце последней части слова,
   поэтому chunks.join('') всегда равно deva (это проверяет регресс).
   ========================================================================= */
var LT_CONSONANT = /[\u0915-\u0939\u0958-\u095F\u0979-\u097F]/;
function ltAksharas(word) {
  var out = [], cur = '', chars = String(word).split('');
  for (var i = 0; i < chars.length; i++) {
    var ch = chars[i];
    if (LT_CONSONANT.test(ch)) {
      if (cur && cur.slice(-1) !== '\u094D') { out.push(cur); cur = ''; }
      cur += ch;
      continue;
    }
    cur += ch;                                          /* вирама, матры, анусвара, висарга */
  }
  if (cur) out.push(cur);
  return out;
}
function ltChunks(text) {
  var words = String(text).split(' '), out = [];
  words.forEach(function (word, wi) {
    var ak = ltAksharas(word), i;
    for (i = 0; i < ak.length; i += 2) out.push(ak[i] + (ak[i + 1] || ''));
    if (wi < words.length - 1) out[out.length - 1] += ' ';
  });
  return out;
}

/* ============================================================================
   3. СЛОВА
   Пять фраз женского рода: одна основа जिह्वा и пять цветов. Числительное
   женского рода — как в уроке 10 (एका, द्वे, तिस्रः, चतस्रः, पञ्च).
   ========================================================================= */
var LT_WORDS = [
  {
    id: "ekapatala", deva: "एका पाटला जिह्वा", iast: "ekā pāṭalā jihvā", ttsText: "एका पाटला जिह्वा",
    short: "पाटला जिह्वा",
    bareDeva: "1 पाटल जिह्वा",
    bareIast: "1 pāṭala jihvā",
    grammaticalNumber: "sg", gender: "f", count: 1, fill: "#EC4899",
    syll: ltChunks("एका पाटला जिह्वा"),
    /* цвет потерял женское окончание -ा: पाटला → पाटल */
    typoDeva: "एका पाटल जिह्वा", typoIast: "ekā pāṭala jihvā",
    maskedPrefix: "एका पाटला जिह्व", maskedHidden: "ा",
    gapDeva: "एका पाटला जिह्व_", gapIast: "ekā pāṭalā jihv_", gapAnswer: "ा",
    gapChoices: [
      { deva: "ा", iast: "ā" },
      { deva: "े", iast: "e" },
      { deva: "ाः", iast: "āḥ" },
      { deva: "ः", iast: "ḥ" }
    ],
    missingDisplay: "एका पाटला _िह्वा", missingAnswer: "ज",
    missingChoices: ["ज", "य", "झ", "ञ"],
    svg: ltCard("#EC4899", 1)
  },
  {
    id: "dverakte", deva: "द्वे रक्ते जिह्वे", iast: "dve rakte jihve", ttsText: "द्वे रक्ते जिह्वे",
    short: "रक्ते जिह्वे",
    bareDeva: "2 रक्त जिह्वा",
    bareIast: "2 rakta jihvā",
    grammaticalNumber: "du", gender: "f", count: 2, fill: "#DC2626",
    syll: ltChunks("द्वे रक्ते जिह्वे"),
    /* двойственное число потеряло -े: रक्ते → रक्ता (форма мн. ч. — частая ошибка) */
    typoDeva: "द्वे रक्ता जिह्वे", typoIast: "dve raktā jihve",
    maskedPrefix: "द्वे रक्ते जिह्व", maskedHidden: "े",
    gapDeva: "द्वे रक्ते जिह्व_", gapIast: "dve rakte jihv_", gapAnswer: "े",
    gapChoices: [
      { deva: "े", iast: "e" },
      { deva: "ा", iast: "ā" },
      { deva: "ाः", iast: "āḥ" },
      { deva: "ौ", iast: "au" }
    ],
    missingDisplay: "द्वे _क्ते जिह्वे", missingAnswer: "र",
    missingChoices: ["र", "ल", "व", "न"],
    svg: ltCard("#DC2626", 2)
  },
  {
    id: "tisrahpita", deva: "तिस्रः पीताः जिह्वाः", iast: "tisraḥ pītāḥ jihvāḥ", ttsText: "तिस्रः पीताः जिह्वाः",
    short: "पीताः जिह्वाः",
    bareDeva: "3 पीत जिह्वा",
    bareIast: "3 pīta jihvā",
    grammaticalNumber: "pl", gender: "f", count: 3, fill: "#FFEE58",
    syll: ltChunks("तिस्रः पीताः जिह्वाः"),
    /* множественное число потеряло висаргу: पीताः → पीता */
    typoDeva: "तिस्रः पीता जिह्वाः", typoIast: "tisraḥ pītā jihvāḥ",
    maskedPrefix: "तिस्रः पीताः जिह्व", maskedHidden: "ाः",
    gapDeva: "तिस्रः पीताः जिह्व_", gapIast: "tisraḥ pītāḥ jihv_", gapAnswer: "ाः",
    gapChoices: [
      { deva: "ाः", iast: "āḥ" },
      { deva: "ा", iast: "ā" },
      { deva: "े", iast: "e" },
      { deva: "म्", iast: "m" }
    ],
    missingDisplay: "तिस्रः _ीताः जिह्वाः", missingAnswer: "प",
    missingChoices: ["प", "फ", "ब", "म"],
    svg: ltCard("#FFEE58", 3)
  },
  {
    id: "catasrahharita", deva: "चतस्रः हरिताः जिह्वाः", iast: "catasraḥ haritāḥ jihvāḥ",
    ttsText: "चतस्रः हरिताः जिह्वाः",
    short: "हरिताः जिह्वाः",
    bareDeva: "4 हरित जिह्वा",
    bareIast: "4 harita jihvā",
    grammaticalNumber: "pl", gender: "f", count: 4, fill: "#16A34A",
    syll: ltChunks("चतस्रः हरिताः जिह्वाः"),
    /* हरिता — форма без висарги, которой в этом числе нет */
    typoDeva: "चतस्रः हरिता जिह्वाः", typoIast: "catasraḥ haritā jihvāḥ",
    maskedPrefix: "चतस्रः हरिताः जिह्व", maskedHidden: "ाः",
    gapDeva: "चतस्रः हरिताः जिह्व_", gapIast: "catasraḥ haritāḥ jihv_", gapAnswer: "ाः",
    gapChoices: [
      { deva: "ाः", iast: "āḥ" },
      { deva: "ा", iast: "ā" },
      { deva: "े", iast: "e" },
      { deva: "ौ", iast: "au" }
    ],
    missingDisplay: "चतस्रः _रिताः जिह्वाः", missingAnswer: "ह",
    missingChoices: ["ह", "घ", "स", "भ"],
    svg: ltCard("#16A34A", 4)
  },
  {
    id: "pancanaranga", deva: "पञ्च नारङ्गाः जिह्वाः", iast: "pañca nāraṅgāḥ jihvāḥ",
    ttsText: "पञ्च नारङ्गाः जिह्वाः",
    short: "नारङ्गाः जिह्वाः",
    bareDeva: "5 नारङ्ग जिह्वा",
    bareIast: "5 nāraṅga jihvā",
    grammaticalNumber: "pl", gender: "f", count: 5, fill: "#F97316",
    syll: ltChunks("पञ्च नारङ्गाः जिह्वाः"),
    /* здесь ошибка в самом числительном: पञ्च пишется с ञ्, а не с ङ् */
    typoDeva: "पङ्च नारङ्गाः जिह्वाः", typoIast: "paṅca nāraṅgāḥ jihvāḥ",
    maskedPrefix: "पञ्च नारङ्गाः जिह्व", maskedHidden: "ाः",
    gapDeva: "पञ्च नारङ्गाः जिह्व_", gapIast: "pañca nāraṅgāḥ jihv_", gapAnswer: "ाः",
    gapChoices: [
      { deva: "ाः", iast: "āḥ" },
      { deva: "ा", iast: "ā" },
      { deva: "ः", iast: "ḥ" },
      { deva: "ौ", iast: "au" }
    ],
    missingDisplay: "पञ्च नारङ्गाः _िह्वाः", missingAnswer: "ज",
    missingChoices: ["ज", "य", "झ", "ञ"],
    svg: ltCard("#F97316", 5)
  }
];

/* ============================================================================
   4. КАРТИНКА ДЛЯ ПОСТЕРА
   Пять языков в столбик: у каждого своё число и свой цвет, справа точка
   с номером. Пины ведут на середину языка.
   ========================================================================= */
/* Сетка постера: три карточки в первом ряду, две во втором (по центру),
   под каждой — точка с номером, соединённая с карточкой пунктиром. */
var LT_CELL_W = 92;
var LT_CELL_H = 100;
var LT_CELLS = [
  [14, 34], [114, 34], [214, 34],
  [64, 168], [164, 168]
];

function ltPosterArt() {
  var art = '<rect x="6" y="6" width="308" height="300" rx="16" fill="#F8EFE6" stroke="#E5DEC9" stroke-width="1.5"/>';
  art += '<text x="12" y="24" font-family="Noto Serif Devanagari, Noto Sans Devanagari, sans-serif" ' +
    'font-size="10" font-weight="700" fill="#BE185D">जिह्वा · -ा / -े / -ाः</text>';
  LT_WORDS.forEach(function (w, i) {
    var x = LT_CELLS[i][0], y = LT_CELLS[i][1];
    art += '<rect x="' + x + '" y="' + y + '" width="' + LT_CELL_W + '" height="' + LT_CELL_H +
      '" rx="10" fill="#FFFBEB" stroke="#F9A8D4" stroke-width="2"/>';
    art += ltFigure(w.fill, w.count, x + LT_CELL_W / 2, y + LT_CELL_H / 2, 0.58);
  });
  return art;
}

function ltPosterPins() {
  return LT_WORDS.map(function (w, i) {
    var x = LT_CELLS[i][0], y = LT_CELLS[i][1];
    return {
      id: w.id, num: i + 1,
      x: x + LT_CELL_W / 2, y: y + LT_CELL_H + 14,
      tx: x + LT_CELL_W / 2, ty: y + LT_CELL_H - 12
    };
  });
}

SAL.registerLesson({
  key: "LT",
  num: 12,
  titleDeva: "जिह्वाः",
  titleRu: "Окончания: ед., дв. и мн. число (женский род)",
  titleEn: "Endings: Singular, Dual, Plural (Feminine)",
  topicRu: "один розовый язык, два красных языка, три жёлтых языка, четыре зелёных языка, пять оранжевых языков",
  topicEn: "one pink tongue, two red tongues, three yellow tongues, four green tongues, five orange tongues",
  introRu: "Двенадцатый урок: тот же предмет, пять цветов — и все пять форм женского рода. Числительные те же, что в «Счёте девочек»: <code>एका</code>, <code>द्वे</code>, <code>तिस्रः</code>, <code>चतस्रः</code>, <code>पञ्च</code>. Но теперь они считают языки, и род виден уже по окончанию слова и цвета: <code>एका पाटला जिह्वा</code> — все три слова на <code>-ा</code>, <code>द्वे रक्ते जिह्वे</code> — на <code>-े</code>, а <code>तिस्रः पीताः जिह्वाः</code> — на <code>-ाः</code>. У женского рода три окончания: одно для одного предмета, одно для двух и одно для трёх и больше. <code>पञ्च</code> не меняется, поэтому в последней фразе женский род несут только цвет и слово.",
  introEn: "The twelfth lesson: one object, five colours — and all five phrases are feminine. The numerals are the same as in “Counting Girls”: <code>ekā</code>, <code>dve</code>, <code>tisraḥ</code>, <code>catasraḥ</code>, <code>pañca</code>. But now they count tongues, and the gender shows in the ending of the colour and the noun: <code>ekā pāṭalā jihvā</code> — all three words end in <code>-ā</code>, <code>dve rakte jihve</code> — in <code>-e</code>, and <code>tisraḥ pītāḥ jihvāḥ</code> — in <code>-āḥ</code>. Feminine has three endings: one for a single thing, one for two, and one for three or more. <code>pañca</code> does not change, so in the last phrase only the colour and the noun carry the gender.",
  aim: {
    ru: {
      main: "Ввести и отработать женские окончания существительных и согласуемых с ними слов в единственном, двойственном и множественном числе — в контексте описания языка и его цвета.",
      subs: [
        "Показать женскую парадигму: जिह्वा → जिह्वे → जिह्वाः (-ा / -े / -ाः).",
        "Отработать согласование: числительное 1–5, цвет и существительное меняются вместе.",
        "Дать практику различения на слух: एका / एकः / एकम्, द्वे / द्वौ / द्वे, तिस्रः / त्रयः / त्रीणि, पञ्च не меняется."
      ]
    },
    en: {
      main: "To introduce and practise feminine noun and agreeing-word endings in the singular, dual and plural, in the context of describing a tongue and its colour.",
      subs: [
        "To present the feminine paradigm: जिह्वा → जिह्वे → जिह्वाः (-ā / -e / -āḥ).",
        "To drill agreement: the numeral 1–5, the colour and the noun all change together.",
        "To give listening practice on the contrast एका / एकः / एकम्, द्वे / द्वौ / द्वे, तिस्रः / त्रयः / त्रीणि, with पञ्च unchanged."
      ]
    }
  },
  gestureRu: "покажите язык и оближите губы — столько раз, сколько языков",
  gestureEn: "show your tongue and lick your lips once for every tongue",
  prodTitleRu: "Живая речь: назовите вслух все {n} словосочетаний",
  prodTitleEn: "Freer Production: Say All {n} Phrases Aloud",
  words: LT_WORDS,
  /* слова для поля 10 × 10: настоящий санскрит, но в этом уроке их нет */
  decoys: [
    "जिह्वा", "जिह्वे", "जिह्वाः", "नासिका", "ओष्ठः", "दन्तः",
    "एकः", "एकम्", "द्वौ", "त्रयः", "त्रीणि", "चत्वारः",
    "चत्वारि", "चतस्रः", "एका", "द्वे", "पञ्च", "षट्",
    "सप्त", "अष्ट", "नव", "दश", "बालकः", "बालिका",
    "वृक्षः", "जलम्", "फलम्", "गृहम्", "पुस्तकम्", "नयनम्",
    "पादः", "हस्तः", "शीर्षम्", "कर्णः", "मुखम्", "ललाटम्"
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
    { ru: 'Окончание -ा (один предмет)', en: 'Ends in -ā (one thing)',
      test: function (w) { return w.grammaticalNumber === 'sg'; } },
    { ru: 'Окончание -े (два предмета)', en: 'Ends in -e (two things)',
      test: function (w) { return w.grammaticalNumber === 'du'; } },
    { ru: 'Окончание -ाः (три и больше)', en: 'Ends in -āḥ (three or more)',
      test: function (w) { return w.grammaticalNumber === 'pl'; } },
    { ru: 'Есть висарга ः', en: 'Has a visarga (ः)',
      test: function (w) { return w.deva.indexOf('ः') >= 0; } },
    { ru: 'Есть звук «ज» (ja)', en: 'Contains "ज" (ja)',
      test: function (w) { return w.deva.indexOf('ज') >= 0; } },
    { ru: 'Есть цвет जिह्वा', en: 'Mentions जिह्वा',
      test: function (w) { return w.deva.indexOf('जिह्वा') >= 0; } }
  ],
  steps: [
    { wordIds: ["ekapatala", "dverakte"] },
    { wordIds: ["tisrahpita", "catasrahharita"] },
    { wordIds: ["pancanaranga"] }
  ],
  hotspots: {
    figures: [
      {
        key: "tongues",
        captionRu: "Языки: один, два, три, четыре, пять — и пять цветов",
        captionEn: "The Tongues: One to Five, in Five Colours",
        viewBox: "0 0 320 300",
        art: ltPosterArt(),
        pins: ltPosterPins()
      }
    ]
  },
  groups: [
    { titleRu: "Окончание -ाः (три и больше)", titleEn: "Ending -āḥ (three or more)",
      wordIds: ["tisrahpita", "catasrahharita", "pancanaranga"] },
    { titleRu: "Окончание -ा или -े (один и два)", titleEn: "Ending -ā or -e (one and two)",
      wordIds: ["ekapatala", "dverakte"] },
    { titleRu: "Тёплые цвета", titleEn: "Warm Colours",
      wordIds: ["ekapatala", "dverakte", "tisrahpita", "pancanaranga"] },
    { titleRu: "Холодные цвета", titleEn: "Cool Colours",
      wordIds: ["catasrahharita"] },
    { titleRu: "С висаргой ः", titleEn: "With a Visarga (ः)",
      wordIds: ["dverakte", "tisrahpita", "catasrahharita", "pancanaranga"] }
  ],
  categories: [
    { titleRu: "Больше двух языков", titleEn: "More Than Two Tongues",
      wordIds: ["tisrahpita", "catasrahharita", "pancanaranga"] },
    { titleRu: "Меньше трёх языков", titleEn: "Fewer Than Three Tongues",
      wordIds: ["ekapatala", "dverakte"] },
    { titleRu: "Оканчиваются на -ाः", titleEn: "Ending in -āḥ",
      hintRu: "Долгая आ с висаргой ः на конце — окончание множественного числа женского рода.",
      hintEn: "Long आ plus visarga ः at the end — the feminine plural ending.",
      wordIds: ["tisrahpita", "catasrahharita", "pancanaranga"] },
    { titleRu: "Не оканчиваются на -ाः", titleEn: "Not ending in -āḥ",
      hintRu: "Наоборот: слова кончаются на -ा или -े.",
      hintEn: "The other way round: the words end in -ā or -e.",
      wordIds: ["ekapatala", "dverakte"] },
    { titleRu: "Числительное меняется", titleEn: "The Numeral Changes",
      hintRu: "एका, द्वे, तिस्रः, चतस्रः — у каждого своя женская форма.",
      hintEn: "एका, द्वे, तिस्रः, चतस्रः — each has its own feminine form.",
      wordIds: ["ekapatala", "dverakte", "tisrahpita", "catasrahharita"] },
    { titleRu: "Числительное не меняется", titleEn: "The Numeral Stays the Same",
      hintRu: "पञ्च одинаково для всех трёх родов — оно не подстраивается.",
      hintEn: "पञ्च is the same in all three genders — it does not agree.",
      wordIds: ["pancanaranga"] },
    { titleRu: "Все пять — женский род", titleEn: "All Five Are Feminine",
      wordIds: ["ekapatala", "dverakte", "tisrahpita", "catasrahharita", "pancanaranga"] }
  ]
});
