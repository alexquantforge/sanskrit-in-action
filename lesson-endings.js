/**
 * LESSON 11 · वचनानि · "Singular, Dual, Plural" (8 словосочетаний)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 *
 * Урок стоит сразу после «Счёта девочек» (урок 10) и собран ровно так же, как
 * «Счёт мальчиков» (урок 9): те же двенадцать игр движка, те же девятнадцать
 * дополнительных игр, тот же постер с точками-номерами, та же схема
 * «карточка → шаг за шагом → точки → постер». Меняется только материал:
 *
 *   средний род, नयन «глаз»:      नयनम्  → नयने   → नयनानि      (-म् / -े / -ानि)
 *   мужской род,  पाद «нога»:     पादः   → पादौ   → हस्ताः, दन्ताः (-ः / -ौ / -ाः)
 *
 * Восемь словосочетаний (числительное + цвет + предмет):
 *   एकं नीलं नयनम् · द्वे हरिते नयने · त्रीणि नारङ्गाणि नयनानि ·
 *   चत्वारि पाटलानि नयनानि · एकः कृष्णः पादः · द्वौ श्वेतौ पादौ ·
 *   त्रयः गौराः हस्ताः · चत्वारः श्यामाः दन्ताः
 *
 * Главная мысль урока: окончание повторяется трижды в одном словосочетании —
 * у числительного, у цвета и у существительного. Ребёнок слышит его как рифму:
 *   -म् / -े / -ानि у среднего рода,  -ः / -ौ / -ाः у мужского.
 * Поэтому и цвета взяты из уроков 3–4 (नील, कृष्ण, श्वेत, गौर, श्याम + हरित,
 * नारङ्ग, पाटल): они уже знакомы и работают как «проверка рода».
 *
 * IAST скрыт по умолчанию и включается кнопкой 🔤.
 * Data file for the generic engine in lesson-engine.js.
 */

/* ============================================================================
   1. КАРТИНКИ
   На карточке ровно столько предметов, сколько названо: один глаз, два глаза,
   три, четыре; одна нога, две ноги, три руки, четыре зуба. Ни точек, ни
   арабских цифр: количество видно только по самим предметам, а цвет предмета
   — это цвет из уроков 3–4, поэтому नीलं читается как «синий», а не «какой-то».
   ========================================================================= */
var LV_INK = '#14213D';

/* глаз: миндалевидный белок и радужка нужного цвета */
function lvEye(fill) {
  return '<path d="M7 50C20 27 80 27 93 50C80 73 20 73 7 50Z" fill="#FFFFFF" stroke="' + LV_INK + '" stroke-width="4" stroke-linejoin="round"/>' +
    '<circle cx="50" cy="50" r="18.5" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="3"/>' +
    '<circle cx="50" cy="50" r="7.8" fill="#0B1220"/>' +
    '<circle cx="43.5" cy="43" r="3.4" fill="#FFFFFF" opacity="0.92"/>';
}

/* ступня: подошва и пять пальцев */
function lvFoot(fill) {
  return '<ellipse cx="50" cy="61" rx="23" ry="29" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="3.4"/>' +
    '<circle cx="25" cy="28" r="7.2" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="2.6"/>' +
    '<circle cx="39" cy="19" r="6.6" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="2.6"/>' +
    '<circle cx="53" cy="16" r="6" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="2.6"/>' +
    '<circle cx="65" cy="20" r="5.4" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="2.6"/>' +
    '<circle cx="76" cy="29" r="4.6" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="2.6"/>';
}

/* кисть: ладонь, три пальца и большой палец */
function lvHand(fill) {
  return '<rect x="28" y="40" width="44" height="49" rx="15" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="3.4"/>' +
    '<rect x="33" y="16" width="11" height="30" rx="5.5" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="3"/>' +
    '<rect x="46" y="10" width="11" height="36" rx="5.5" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="3"/>' +
    '<rect x="59" y="14" width="11" height="32" rx="5.5" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="3"/>' +
    '<rect x="11" y="42" width="13" height="27" rx="6.5" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="3" transform="rotate(-22 17.5 55.5)"/>';
}

/* зуб: коронка с двумя корнями и бороздкой */
function lvTooth(fill) {
  return '<path d="M28 18H72C78 18 80 22 80 27C80 40 77 48 74 60C72 69 70 80 66 80C62 80 60 70 59 62H41C40 70 38 80 34 80C30 80 28 69 26 60C23 48 20 40 20 27C20 22 22 18 28 18Z" fill="' + fill + '" stroke="' + LV_INK + '" stroke-width="3.4" stroke-linejoin="round"/>' +
    '<path d="M36 34C44 30 56 30 64 34" stroke="' + LV_INK + '" stroke-width="2.4" stroke-linecap="round" opacity="0.32"/>';
}

function lvShape(kind, fill) {
  if (kind === 'foot') return lvFoot(fill);
  if (kind === 'hand') return lvHand(fill);
  if (kind === 'tooth') return lvTooth(fill);
  return lvEye(fill);
}

/* раскладка по количеству: 1 / 2 / 3 в ряд, 4 — квадратом 2 × 2.
   Глаз шире ступни и кисти, поэтому масштаб считается от ширины значка:
   иначе три глаза в ряд залезали друг на друга. */
var LV_ASPECT = { eye: 88, foot: 62, hand: 66, tooth: 62 };
var LV_BASE_SCALE = { 1: 0.92, 2: 0.58, 3: 0.44, 4: 0.44 };

function lvSlots(kind, n) {
  var s;
  if (n === 4) {
    s = Math.min(LV_BASE_SCALE[4], (36 * 0.95) / LV_ASPECT[kind]);
    return [[32, 32, s], [68, 32, s], [32, 68, s], [68, 68, s]];
  }
  var xs = n === 1 ? [50] : (n === 2 ? [29, 71] : [19, 50, 81]);
  var step = n === 1 ? 100 : (n === 2 ? 42 : 31);
  s = Math.min(LV_BASE_SCALE[n], (step * 0.95) / LV_ASPECT[kind]);
  return xs.map(function (x) { return [x, 50, s]; });
}

/* n предметов одного вида и цвета вокруг точки (cx, cy) */
function lvFigure(kind, fill, n, cx, cy, scale) {
  scale = scale || 1;
  return lvSlots(kind, n).map(function (p) {
    return '<g transform="translate(' + (cx + (p[0] - 50) * scale) + ' ' + (cy + (p[1] - 50) * scale) +
      ') scale(' + (p[2] * scale) + ') translate(-50 -50)">' + lvShape(kind, fill) + '</g>';
  }).join('');
}

/* картинка урока: столько предметов, сколько названо в словосочетании */
function lvCard(kind, fill, n) {
  return '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100" height="100" rx="14" fill="#FFFBEB"/>' +
    '<rect x="7" y="7" width="86" height="86" rx="10" fill="none" stroke="#E5DEC9" stroke-width="1.5"/>' +
    lvFigure(kind, fill, n, 50, 50, 1) +
    '</svg>';
}

/* ============================================================================
   1b. РАЗБИЕНИЕ НА АКШАРЫ
   Игра «Филворд (среди букв)» и «Собери слово» режут слово на части и кладут
   их в клетки: у уроков из одного слова это слоги, у нас — пары акшар внутри
   каждого слова словосочетания. Пробел приклеивается к последней части слова,
   поэтому chunks.join('') точно равно deva (это проверяет регресс).
   ========================================================================= */
var LV_CONSONANT = /[\u0915-\u0939\u0958-\u095F\u0979-\u097F]/;
function lvAksharas(word) {
  var out = [], cur = '', chars = String(word).split('');
  for (var i = 0; i < chars.length; i++) {
    var ch = chars[i];
    if (LV_CONSONANT.test(ch)) {
      if (cur && cur.slice(-1) !== '\u094D') { out.push(cur); cur = ''; }
      cur += ch;
      continue;
    }
    cur += ch;                                          /* вирама, матры, анусвара, висарга */
  }
  if (cur) out.push(cur);
  return out;
}
/* Части для «филворда по буквам» и «Собери слово»: слово режется на акшары и
   они склеиваются по два. Одна акшара в клетке 40 × 40 px — хорошо, две —
   тоже, целое слово уже нет; парами все восемь словосочетаний укладываются
   на поле 10 × 10 (около тридцати клеток из ста). Пробел остаётся на конце
   последней части слова, поэтому chunks.join('') === deva. */
function lvChunks(text) {
  var words = String(text).split(' '), out = [];
  words.forEach(function (word, wi) {
    var ak = lvAksharas(word), i;
    for (i = 0; i < ak.length; i += 2) out.push(ak[i] + (ak[i + 1] || ''));
    if (wi < words.length - 1) out[out.length - 1] += ' ';
  });
  return out;
}

/* ============================================================================
   2. СЛОВА
   Числительное 1–4 согласуется с существительным в роде и числе, цвет — тоже:
   एकं नीलं नयनम् (все три слова на -म्), द्वे हरिते नयने (все три на -े),
   एकः कृष्णः पादः (все три на -ः). Это и есть «рифма окончаний».
   ========================================================================= */
var LV_WORDS = [
  {
    id: "ekanayanam", deva: "एकं नीलं नयनम्", iast: "ekaṃ nīlaṃ nayanam", ttsText: "एकं नीलं नयनम्",
    /* короткая подпись для тесных клеток филворда и мемори */
    short: "नीलं नयनम्",
    grammaticalNumber: "sg", gender: "n", count: 1, kind: "eye", fill: "#2563EB",
    syll: lvChunks("एकं नीलं नयनम्"),
    /* потерянная вирама: नयनम् → नयनम — самая частая ошибка письма */
    typoDeva: "एकं नीलं नयनम", typoIast: "ekaṃ nīlaṃ nayanama",
    maskedPrefix: "एकं नीलं नयन", maskedHidden: "म्",
    gapDeva: "एकं नीलं नयन_", gapIast: "ekaṃ nīlaṃ nayana_", gapAnswer: "म्",
    gapChoices: [
      { deva: "म्", iast: "m" },
      { deva: "ः", iast: "ḥ" },
      { deva: "े", iast: "e" },
      { deva: "ानि", iast: "āni" }
    ],
    missingDisplay: "एकं नीलं _यनम्", missingAnswer: "न",
    missingChoices: ["न", "ण", "म", "न्"],
    svg: lvCard("eye", "#2563EB", 1)
  },
  {
    id: "dvenayane", deva: "द्वे हरिते नयने", iast: "dve harite nayane", ttsText: "द्वे हरिते नयने",
    short: "हरिते नयने",
    grammaticalNumber: "du", gender: "n", count: 2, kind: "eye", fill: "#16A34A",
    syll: lvChunks("द्वे हरिते नयने"),
    /* цвет потерял двойственное окончание: हरिते → हरिता */
    typoDeva: "द्वे हरिता नयने", typoIast: "dve haritā nayane",
    maskedPrefix: "द्वे हरिते नयन", maskedHidden: "े",
    gapDeva: "द्वे हरिते नयन_", gapIast: "dve harite nayana_", gapAnswer: "े",
    gapChoices: [
      { deva: "े", iast: "e" },
      { deva: "म्", iast: "m" },
      { deva: "ः", iast: "ḥ" },
      { deva: "ानि", iast: "āni" }
    ],
    missingDisplay: "द्वे _रिते नयने", missingAnswer: "ह",
    missingChoices: ["ह", "घ", "स", "भ"],
    svg: lvCard("eye", "#16A34A", 2)
  },
  {
    id: "trininayanani", deva: "त्रीणि नारङ्गाणि नयनानि", iast: "trīṇi nāraṅgāṇi nayanāni",
    ttsText: "त्रीणि नारङ्गाणि नयनानि",
    short: "नारङ्गाणि नयनानि",
    grammaticalNumber: "pl", gender: "n", count: 3, kind: "eye", fill: "#F97316",
    syll: lvChunks("त्रीणि नारङ्गाणि नयनानि"),
    /* ण → न: «н из другой варги» — ровно та ошибка, которую слышит учитель */
    typoDeva: "त्रीणि नारङ्गानि नयनानि", typoIast: "trīṇi nāraṅgāni nayanāni",
    maskedPrefix: "त्रीणि नारङ्गाणि नयन", maskedHidden: "ानि",
    gapDeva: "त्रीणि नारङ्गाणि नयन_", gapIast: "trīṇi nāraṅgāṇi nayana_", gapAnswer: "ानि",
    gapChoices: [
      { deva: "ानि", iast: "āni" },
      { deva: "े", iast: "e" },
      { deva: "म्", iast: "m" },
      { deva: "ः", iast: "ḥ" }
    ],
    missingDisplay: "त्रीणि नारङ्गाणि _यनानि", missingAnswer: "न",
    missingChoices: ["न", "ण", "म", "न्"],
    svg: lvCard("eye", "#F97316", 3)
  },
  {
    id: "catvarinayanani", deva: "चत्वारि पाटलानि नयनानि", iast: "catvāri pāṭalāni nayanāni",
    ttsText: "चत्वारि पाटलानि नयनानि",
    short: "पाटलानि नयनानि",
    grammaticalNumber: "pl", gender: "n", count: 4, kind: "eye", fill: "#EC4899",
    syll: lvChunks("चत्वारि पाटलानि नयनानि"),
    /* ि → ी: короткая «и» вместо долгой */
    typoDeva: "चत्वारी पाटलानि नयनानि", typoIast: "catvārī pāṭalāni nayanāni",
    maskedPrefix: "चत्वारि पाटलानि नयन", maskedHidden: "ानि",
    gapDeva: "चत्वारि पाटलानि नयन_", gapIast: "catvāri pāṭalāni nayana_", gapAnswer: "ानि",
    gapChoices: [
      { deva: "ानि", iast: "āni" },
      { deva: "म्", iast: "m" },
      { deva: "े", iast: "e" },
      { deva: "ाः", iast: "āḥ" }
    ],
    missingDisplay: "चत्वारि पाटलानि _यनानि", missingAnswer: "न",
    missingChoices: ["न", "ण", "म", "न्"],
    svg: lvCard("eye", "#EC4899", 4)
  },
  {
    id: "ekapadah", deva: "एकः कृष्णः पादः", iast: "ekaḥ kṛṣṇaḥ pādaḥ", ttsText: "एकः कृष्णः पादः",
    short: "कृष्णः पादः",
    grammaticalNumber: "sg", gender: "m", count: 1, kind: "foot", fill: "#0B1220",
    syll: lvChunks("एकः कृष्णः पादः"),
    /* ः → ं: числительное взято в форме среднего рода */
    typoDeva: "एकं कृष्णः पादः", typoIast: "ekaṃ kṛṣṇaḥ pādaḥ",
    maskedPrefix: "एकः कृष्णः पाद", maskedHidden: "ः",
    gapDeva: "एकः कृष्णः पाद_", gapIast: "ekaḥ kṛṣṇaḥ pāda_", gapAnswer: "ः",
    gapChoices: [
      { deva: "ः", iast: "ḥ" },
      { deva: "ौ", iast: "au" },
      { deva: "ाः", iast: "āḥ" },
      { deva: "म्", iast: "m" }
    ],
    missingDisplay: "एकः कृष्णः _ादः", missingAnswer: "प",
    missingChoices: ["प", "फ", "ब", "भ"],
    svg: lvCard("foot", "#0B1220", 1)
  },
  {
    id: "dvaupadau", deva: "द्वौ श्वेतौ पादौ", iast: "dvau śvetau pādau", ttsText: "द्वौ श्वेतौ पादौ",
    short: "श्वेतौ पादौ",
    grammaticalNumber: "du", gender: "m", count: 2, kind: "foot", fill: "#FFFFFF",
    syll: lvChunks("द्वौ श्वेतौ पादौ"),
    /* द्वौ → द्वे: двойственное число взято в форме среднего рода */
    typoDeva: "द्वे श्वेतौ पादौ", typoIast: "dve śvetau pādau",
    maskedPrefix: "द्वौ श्वेतौ पाद", maskedHidden: "ौ",
    gapDeva: "द्वौ श्वेतौ पाद_", gapIast: "dvau śvetau pāda_", gapAnswer: "ौ",
    gapChoices: [
      { deva: "ौ", iast: "au" },
      { deva: "ः", iast: "ḥ" },
      { deva: "ाः", iast: "āḥ" },
      { deva: "े", iast: "e" }
    ],
    missingDisplay: "द्वौ श्वेतौ _ादौ", missingAnswer: "प",
    missingChoices: ["प", "फ", "ब", "भ"],
    svg: lvCard("foot", "#FFFFFF", 2)
  },
  {
    id: "trayahastah", deva: "त्रयः गौराः हस्ताः", iast: "trayaḥ gaurāḥ hastāḥ", ttsText: "त्रयः गौराः हस्ताः",
    short: "गौराः हस्ताः",
    grammaticalNumber: "pl", gender: "m", count: 3, kind: "hand", fill: "#F2C46B",
    syll: lvChunks("त्रयः गौराः हस्ताः"),
    /* हस्ताः → हस्तः: множественное число стало единственным */
    typoDeva: "त्रयः गौराः हस्तः", typoIast: "trayaḥ gaurāḥ hastaḥ",
    maskedPrefix: "त्रयः गौराः हस्त", maskedHidden: "ाः",
    gapDeva: "त्रयः गौराः हस्त_", gapIast: "trayaḥ gaurāḥ hasta_", gapAnswer: "ाः",
    gapChoices: [
      { deva: "ाः", iast: "āḥ" },
      { deva: "ः", iast: "ḥ" },
      { deva: "ौ", iast: "au" },
      { deva: "ानि", iast: "āni" }
    ],
    missingDisplay: "त्रयः गौराः _स्ताः", missingAnswer: "ह",
    missingChoices: ["ह", "घ", "स", "भ"],
    svg: lvCard("hand", "#F2C46B", 3)
  },
  {
    id: "catvarahdantah", deva: "चत्वारः श्यामाः दन्ताः", iast: "catvāraḥ śyāmāḥ dantāḥ",
    ttsText: "चत्वारः श्यामाः दन्ताः",
    short: "श्यामाः दन्ताः",
    grammaticalNumber: "pl", gender: "m", count: 4, kind: "tooth", fill: "#1F3A5F",
    syll: lvChunks("चत्वारः श्यामाः दन्ताः"),
    /* दन्ताः → दन्तः: та же ошибка числа, но на другом слове */
    typoDeva: "चत्वारः श्यामाः दन्तः", typoIast: "catvāraḥ śyāmāḥ dantaḥ",
    maskedPrefix: "चत्वारः श्यामाः दन्त", maskedHidden: "ाः",
    gapDeva: "चत्वारः श्यामाः दन्त_", gapIast: "catvāraḥ śyāmāḥ danta_", gapAnswer: "ाः",
    gapChoices: [
      { deva: "ाः", iast: "āḥ" },
      { deva: "ौ", iast: "au" },
      { deva: "ः", iast: "ḥ" },
      { deva: "ानि", iast: "āni" }
    ],
    missingDisplay: "चत्वारः श्यामाः _न्ताः", missingAnswer: "द",
    missingChoices: ["द", "ध", "त", "ड"],
    svg: lvCard("tooth", "#1F3A5F", 4)
  }
];

/* ============================================================================
   3. ПОСТЕР: доска с восемью словосочетаниями и точками-номерами
   Два ряда по четыре клетки: сверху средний род (четыре глаза), снизу мужской
   (нога, нога, рука, зуб). Номер точки — это номер словосочетания в уроке.
   ========================================================================= */
var LV_CELL_X = [12, 88, 164, 240];
var LV_CELL_Y = [34, 176];
var LV_CELL_W = 70;
var LV_CELL_H = 84;
var LV_ROW_LABEL_Y = [26, 168];

function lvBoardArt() {
  var art = '<rect x="6" y="6" width="308" height="288" rx="16" fill="#F8EFE6" stroke="#E5DEC9" stroke-width="1.5"/>';
  LV_WORDS.forEach(function (w, i) {
    var x = LV_CELL_X[i % 4], y = LV_CELL_Y[Math.floor(i / 4)];
    var neuter = w.gender === 'n';
    art += '<rect x="' + x + '" y="' + y + '" width="' + LV_CELL_W + '" height="' + LV_CELL_H +
      '" rx="10" fill="#FFFBEB" stroke="' + (neuter ? '#93C5FD' : '#FDBA74') + '" stroke-width="2"/>';
    art += lvFigure(w.kind, w.fill, w.count, x + LV_CELL_W / 2, y + 42, 0.58);
  });
  /* подписи рядов: средний род и мужской род */
  art += '<text x="12" y="' + LV_ROW_LABEL_Y[0] + '" font-family="Noto Serif Devanagari, Noto Sans Devanagari, sans-serif" font-size="10" font-weight="700" fill="#1D4ED8">' +
    'नयन · -म् / -े / -ानि</text>';
  art += '<text x="12" y="' + LV_ROW_LABEL_Y[1] + '" font-family="Noto Serif Devanagari, Noto Sans Devanagari, sans-serif" font-size="10" font-weight="700" fill="#B45309">' +
    'पाद · हस्त · दन्त · -ः / -ौ / -ाः</text>';
  return art;
}

function lvPins() {
  return LV_WORDS.map(function (w, i) {
    var x = LV_CELL_X[i % 4], y = LV_CELL_Y[Math.floor(i / 4)];
    return {
      id: w.id, num: i + 1,
      x: x + LV_CELL_W / 2, y: y + LV_CELL_H + 14,
      tx: x + LV_CELL_W / 2, ty: y + 58
    };
  });
}

/* ============================================================================
   4. КОНФИГ УРОКА
   ========================================================================= */
SAL.registerLesson({
  key: "LV",
  num: 11,
  titleDeva: "वचनानि",
  titleRu: "Окончания: один · два · много",
  titleEn: "Endings: Singular, Dual, Plural",
  topicRu: "один синий глаз, два зелёных глаза, три оранжевых глаза, четыре розовых глаза, одна чёрная нога, две белые ноги, три золотые руки, четыре тёмных зуба",
  topicEn: "one blue eye, two green eyes, three orange eyes, four pink eyes, one black foot, two white feet, three golden hands, four dark teeth",
  introRu: "Одиннадцатый урок: одно и то же окончание повторяется в словосочетании три раза — у числительного, у цвета и у предмета. Средний род: <code>नयनम्</code> → <code>नयने</code> → <code>नयनानि</code> (<code>-म्</code>, <code>-े</code>, <code>-ानि</code>). Мужской род: <code>पादः</code> → <code>पादौ</code> → <code>हस्ताः</code>, <code>दन्ताः</code> (<code>-ः</code>, <code>-ौ</code>, <code>-ाः</code>). Поэтому <code>एकं नीलं नयनम्</code> звучит как рифма: все три слова кончаются на <code>-म्</code>, а <code>एकः कृष्णः पादः</code> — на <code>-ः</code>. Один предмет — ед. ч., два — двойственное, три и больше — множественное. Ни перевода, ни арабских цифр: количество видно по картинке, род — по окончанию.",
  introEn: "The eleventh lesson: one and the same ending repeats three times in a phrase — on the numeral, on the colour and on the noun. Neuter: <code>nayanam</code> → <code>nayane</code> → <code>nayanāni</code> (<code>-m</code>, <code>-e</code>, <code>-āni</code>). Masculine: <code>pādaḥ</code> → <code>pādau</code> → <code>hastāḥ</code>, <code>dantāḥ</code> (<code>-ḥ</code>, <code>-au</code>, <code>-āḥ</code>). That is why <code>ekaṃ nīlaṃ nayanam</code> rhymes: all three words end in <code>-m</code>, and <code>ekaḥ kṛṣṇaḥ pādaḥ</code> in <code>-ḥ</code>. One thing is singular, two are dual, three or more are plural. No translation and no Arabic digits: the picture shows the quantity and the ending shows the gender.",
  /* цели урока по схеме CELTA: главная цель — языковой материал, подцели — «другая половина» */
  aim: {
    ru: {
      main: "Ввести и отработать окончания существительных и согласуемых с ними слов в единственном, двойственном и множественном числе на двух родах — в контексте описания глаз, ног, рук и зубов.",
      subs: [
        "Показать парадигму среднего рода: नयनम् → नयने → नयनानि (-म् / -े / -ानि).",
        "Показать парадигму мужского рода: पादः → पादौ → हस्ताः / दन्ताः (-ः / -ौ / -ाः).",
        "Отработать согласование: числительное 1–4 и цвет меняются вместе с существительным.",
        "Дать практику различения на слух: एकम् / एकः, द्वे / द्वौ, त्रीणि / त्रयः, चत्वारि / चत्वारः."
      ]
    },
    en: {
      main: "To introduce and practise noun and agreeing-word endings in the singular, dual and plural across two genders — neuter and masculine — in the context of describing eyes, feet, hands and teeth.",
      subs: [
        "To present the neuter paradigm: nayanam → nayane → nayanāni (-m / -e / -āni).",
        "To present the masculine paradigm: pādaḥ → pādau → hastāḥ / dantāḥ (-ḥ / -au / -āḥ).",
        "To drill agreement: the numeral 1–4 and the colour change together with the noun.",
        "To give practice in hearing the difference: ekam / ekaḥ, dve / dvau, trīṇi / trayaḥ, catvāri / catvāraḥ."
      ]
    }
  },
  gestureRu: "покажите пальцами: один — एकम्, два — द्वे, три — त्रीणि, четыре — चत्वारि",
  gestureEn: "hold up your fingers: one is ekam, two dve, three trīṇi, four catvāri",
  prodTitleRu: "Живая речь: назовите вслух все {n} словосочетаний",
  prodTitleEn: "Freer Production: Say All {n} Phrases Aloud",
  words: LV_WORDS,
  /* слова для поля 10 × 10: настоящий санскрит, но в этом уроке их нет */
  decoys: [
    "बालकः", "बालिका", "बालकौ", "वृक्षः", "जलम्", "फलम्", "गृहम्", "पुस्तकम्",
    "अश्वः", "गजः", "सूर्यः", "चन्द्रः", "नदी", "पर्वत", "मित्रम्", "हृदयम्",
    "वदनम्", "कपोलः", "अङ्गुली", "नासिका", "जिह्वा", "कर्णः", "मुखम्", "शीर्षम्",
    "उदरम्", "जानु", "ललाटम्", "ओष्ठः", "करः", "नेत्रम्"
  ],
  /* те же девятнадцать дополнительных игр, что в «Счёте мальчиков» */
  extraGames: [
    'hotcards', 'retry', 'echo', 'snowball', 'drip', 'anagram', 'typein', 'sorting',
    'flashcount', 'blindboard',
    'battleship', 'bingo', 'duel', 'describe', 'orderrelay', 'coopmemory', 'tictactoe',
    'wordgrid', 'wordsearch'
  ],
  /* игра «сортировка» спрашивает про род и число — то есть про само окончание */
  sortFeatures: [
    { ru: 'Средний род (नयन)', en: 'Neuter (नयन)',
      test: function (w) { return w.gender === 'n'; } },
    { ru: 'Мужской род (पाद, हस्त, दन्त)', en: 'Masculine (पाद, हस्त, दन्त)',
      test: function (w) { return w.gender === 'm'; } },
    { ru: 'Двойственное число (два предмета)', en: 'Dual (two things)',
      test: function (w) { return w.grammaticalNumber === 'du'; } },
    { ru: 'Множественное число (три и больше)', en: 'Plural (three or more)',
      test: function (w) { return w.grammaticalNumber === 'pl'; } },
    { ru: 'Есть висарга ः', en: 'Has a visarga (ः)',
      test: function (w) { return w.deva.indexOf('ः') >= 0; } },
    { ru: 'Есть окончание ानि', en: 'Ends in ानि',
      test: function (w) { return w.deva.indexOf('ानि') >= 0; } }
  ],
  /* четыре шага: один предмет, два предмета, три, четыре — каждый раз оба рода */
  steps: [
    { wordIds: ["ekanayanam", "ekapadah"] },
    { wordIds: ["dvenayane", "dvaupadau"] },
    { wordIds: ["trininayanani", "trayahastah"] },
    { wordIds: ["catvarinayanani", "catvarahdantah"] }
  ],
  hotspots: {
    figures: [
      {
        key: "board",
        captionRu: "Доска урока: восемь словосочетаний — средний и мужской род",
        captionEn: "The Lesson Board: Eight Phrases — Neuter and Masculine",
        viewBox: "0 0 320 300",
        art: lvBoardArt(),
        pins: lvPins()
      }
    ]
  },
  groups: [
    { titleRu: "Средний род: नयनम् → नयने → नयनानि (-म् / -े / -ानि)",
      titleEn: "Neuter: nayanam → nayane → nayanāni (-m / -e / -āni)",
      wordIds: ["ekanayanam", "dvenayane", "trininayanani", "catvarinayanani"] },
    { titleRu: "Мужской род: पादः → पादौ → हस्ताः / दन्ताः (-ः / -ौ / -ाः)",
      titleEn: "Masculine: pādaḥ → pādau → hastāḥ / dantāḥ (-ḥ / -au / -āḥ)",
      wordIds: ["ekapadah", "dvaupadau", "trayahastah", "catvarahdantah"] },
    { titleRu: "Один и два предмета (ед. и дв. ч.)",
      titleEn: "One and Two Things (Singular and Dual)",
      wordIds: ["ekanayanam", "dvenayane", "ekapadah", "dvaupadau"] },
    { titleRu: "Три и четыре предмета (мн. ч.)",
      titleEn: "Three and Four Things (Plural)",
      wordIds: ["trininayanani", "catvarinayanani", "trayahastah", "catvarahdantah"] }
  ],
  categories: [
    { titleRu: "Средний род (नयन)", titleEn: "Neuter (नयन)",
      hintRu: "Средний род: окончания -म्, -े, -ानि.",
      hintEn: "Neuter: the endings are -m, -e, -āni.",
      wordIds: ["ekanayanam", "dvenayane", "trininayanani", "catvarinayanani"] },
    { titleRu: "Мужской род (पाद, हस्त, दन्त)", titleEn: "Masculine (पाद, हस्त, दन्त)",
      hintRu: "Мужской род: окончания -ः, -ौ, -ाः.",
      hintEn: "Masculine: the endings are -ḥ, -au, -āḥ.",
      wordIds: ["ekapadah", "dvaupadau", "trayahastah", "catvarahdantah"] },
    { titleRu: "Один предмет", titleEn: "One Thing", wordIds: ["ekanayanam", "ekapadah"] },
    { titleRu: "Два предмета", titleEn: "Two Things", wordIds: ["dvenayane", "dvaupadau"] },
    { titleRu: "Три предмета", titleEn: "Three Things", wordIds: ["trininayanani", "trayahastah"] },
    { titleRu: "Четыре предмета", titleEn: "Four Things", wordIds: ["catvarinayanani", "catvarahdantah"] },
    { titleRu: "Окончание -ानि", titleEn: "Ending in -āni",
      hintRu: "Долгое आ, носовой ण и ि на конце — три знака одного окончания.",
      hintEn: "Long ā, retroflex ṇ and final i — three signs of one ending.",
      wordIds: ["trininayanani", "catvarinayanani"] },
    { titleRu: "Есть висарга ः", titleEn: "Has a visarga (ः)",
      hintRu: "Две точки справа от буквы — ः; так кончаются पादः, हस्ताः, दन्ताः, но не द्वौ.",
      hintEn: "Two dots to the right of the letter — ः; that is how pādaḥ, hastāḥ, dantāḥ end, but not dvau.",
      wordIds: ["ekapadah", "trayahastah", "catvarahdantah"] },
    { titleRu: "Цвет из урока 3 (नील, कृष्ण, श्वेत, गौर, श्याम)",
      titleEn: "Colour from Lesson 3 (नील, कृष्ण, श्वेत, गौर, श्याम)",
      hintRu: "Эти цвета уже были в уроке 3; здесь они только меняют окончание.",
      hintEn: "These colours come from lesson 3; here they only change their ending.",
      wordIds: ["ekanayanam", "ekapadah", "dvaupadau", "trayahastah", "catvarahdantah"] },
    { titleRu: "Цвет из урока 4 (हरित, नारङ्ग, पाटल)",
      titleEn: "Colour from Lesson 4 (हरित, नारङ्ग, पाटल)",
      hintRu: "Эти цвета пришли из урока 4 — с ними окончание слышно так же ясно.",
      hintEn: "These colours come from lesson 4 — the ending rings just as clearly with them.",
      wordIds: ["dvenayane", "trininayanani", "catvarinayanani"] },
    { titleRu: "Все восемь: два рода, три числа",
      titleEn: "All Eight: Two Genders, Three Numbers",
      wordIds: ["ekanayanam", "dvenayane", "trininayanani", "catvarinayanani",
                "ekapadah", "dvaupadau", "trayahastah", "catvarahdantah"] }
  ]
});
