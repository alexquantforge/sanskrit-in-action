/**
 * LESSON 4 · वर्णाः · "More Colours" (6 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * Полный близнец урока 3 (цвета): те же 12 классических игр, те же два филворда
 * и те же четыре режима Production — отличается только словарь.
 *
 * - Только чистые основы, без падежей и рода: पीत, हरित, नारङ्ग, कपिश, धूसर, पाटल
 * - Никаких переводов на карточках: значение передаёт цветное пятно и звук
 *   (100% Direct Method).
 * - IAST скрыт по умолчанию и включается кнопкой 🔤.
 *
 * ВАЖНО: पीत (#FFEE58, светло-жёлтый, лимонный) и गौर (#F2C46B, пастельно-золотой
 * из урока 3) — разные цвета, и на экране они должны читаться по-разному, чтобы
 * дети их не путали: у पीत тон 54° (чистый жёлтый) и L* = 93, у गौर тон 40°
 * (янтарный) и L* = 81. Разница △E ≈ 30 — это уверенно два разных цвета.
 *
 * Два блока повторения (движок рисует их отдельными панелями):
 *   `recycle`  — цвет + часть тела: पाटल-मुख, कपिश-हस्त, धूसर-पाद,
 *                नारङ्ग-शीर्ष, हरित-नयन, पीत-दन्त (новые цвета + уроки 1–2);
 *   `recycle2` — шесть цветов прошлого урока 3: श्वेत, कृष्ण, रक्त, नील,
 *                श्याम, गौर — спиральное повторение всей лексики.
 */

/* ============================================================================
   П А Л И Т Р А   И   Ц В Е Т Н Ы Е   П Я Т Н А
   ========================================================================= */
function lc2Blob(tint, fill) {
  return '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100" height="100" rx="14" fill="' + tint + '"/>' +
    '<path d="M52 18C68 17 82 31 82 49C82 68 68 82 50 82C32 82 18 69 18 51C18 33 34 19 52 18Z" fill="' + fill + '" stroke="#14213D" stroke-width="3"/>' +
    '<ellipse cx="41" cy="36" rx="8" ry="4.6" fill="#FFFFFF" opacity="0.5"/>' +
    '</svg>';
}

/* шесть шариков палитры: позиции те же, что в уроке 3 */
var LC2_SWATCH_POS = [[62, 66], [160, 66], [258, 66], [62, 164], [160, 164], [258, 164]];
var LC2_PIN_POS = [
  [30, 34, 62, 66], [160, 20, 160, 66], [290, 34, 258, 66],
  [30, 198, 62, 164], [160, 210, 160, 164], [290, 198, 258, 164]
];

function lc2PaletteArt(colours) {
  var art = '<rect x="6" y="6" width="308" height="218" rx="14" fill="#F8EFE6" stroke="#E5DEC9" stroke-width="1.5"/>' +
    '<path d="M24 108C24 56 78 20 160 20C242 20 296 56 296 108C296 160 242 196 160 196C78 196 24 160 24 108Z" fill="#FDF6EC" stroke="#E5DEC9" stroke-width="0"/>';
  colours.forEach(function (c, i) {
    var x = LC2_SWATCH_POS[i][0], y = LC2_SWATCH_POS[i][1];
    art += '<circle cx="' + x + '" cy="' + y + '" r="32" fill="' + c.fill + '" stroke="#14213D" stroke-width="2.6"/>' +
      '<ellipse cx="' + (x - 10) + '" cy="' + (y - 11) + '" rx="8" ry="4.4" fill="' + c.hi + '" opacity="0.6"/>';
  });
  return art;
}

/* «Что пропало?»: дырка на месте шарика палитры — пустое место, а не шарик */
function lc2PaletteHole(cx, cy) {
  return '<circle cx="' + cx + '" cy="' + cy + '" r="35" fill="#FDF6EC"/>';
}

function lc2PalettePins(colours) {
  return colours.map(function (c, i) {
    var p = LC2_PIN_POS[i];
    return { id: c.id, num: i + 1, x: p[0], y: p[1], tx: p[2], ty: p[3], erase: lc2PaletteHole(p[2], p[3]) };
  });
}

/* ============================================================================
   R E C Y C L I N G · ЦВЕТ + ЧАСТЬ ТЕЛА (уроки 1–2)
   Сдвоенные слова через тире: पाटल-मुख «розовый рот», कपिश-हस्त «коричневая
   рука», धूसर-पाद «серая нога», नारङ्ग-शीर्ष «оранжевая голова»,
   हरित-नयन «зелёный глаз», पीत-दन्त «жёлтый зуб». Каждая часть нарисована
   в цвете своего слова — как в уроке 3.
   ========================================================================= */
function rc2Svg(tint, inner) {
  return '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100" height="100" rx="14" fill="' + tint + '"/>' + inner + '</svg>';
}

var RC2_ICON = {
  /* розовый рот (पाटल) */
  mouth: '<path d="M20 50c9-13 51-13 60 0-9 15-51 15-60 0Z" fill="#EC4899" stroke="#14213D" stroke-width="3"/>' +
    '<path d="M22 50h56" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>',
  /* коричневая рука (कपिश) */
  hand: '<rect x="30" y="44" width="40" height="42" rx="13" fill="#8B5E34" stroke="#14213D" stroke-width="3"/>' +
    '<rect x="34" y="24" width="9" height="26" rx="4.5" fill="#8B5E34" stroke="#14213D" stroke-width="2.4"/>' +
    '<rect x="44" y="18" width="9" height="32" rx="4.5" fill="#8B5E34" stroke="#14213D" stroke-width="2.4"/>' +
    '<rect x="54" y="20" width="9" height="30" rx="4.5" fill="#8B5E34" stroke="#14213D" stroke-width="2.4"/>' +
    '<rect x="64" y="28" width="9" height="22" rx="4.5" fill="#8B5E34" stroke="#14213D" stroke-width="2.4"/>' +
    '<rect x="20" y="46" width="11" height="25" rx="5.5" transform="rotate(-22 25 58)" fill="#8B5E34" stroke="#14213D" stroke-width="2.4"/>' +
    '<ellipse cx="47" cy="62" rx="8" ry="6" fill="#D6BFA6" opacity="0.4"/>',
  /* серая нога (धूसर) */
  foot: '<ellipse cx="49" cy="63" rx="20" ry="26" fill="#94A3B8" stroke="#14213D" stroke-width="3"/>' +
    '<circle cx="31" cy="28" r="6" fill="#94A3B8" stroke="#14213D" stroke-width="2.4"/>' +
    '<circle cx="43" cy="21" r="5.2" fill="#94A3B8" stroke="#14213D" stroke-width="2.4"/>' +
    '<circle cx="54" cy="19" r="4.8" fill="#94A3B8" stroke="#14213D" stroke-width="2.4"/>' +
    '<circle cx="64" cy="22" r="4.2" fill="#94A3B8" stroke="#14213D" stroke-width="2.4"/>' +
    '<circle cx="72" cy="29" r="3.8" fill="#94A3B8" stroke="#14213D" stroke-width="2.4"/>' +
    '<ellipse cx="43" cy="55" rx="5" ry="7" fill="#E2E8F0" opacity="0.5"/>',
  /* оранжевая голова (नारङ्ग) */
  head: '<circle cx="50" cy="50" r="25" fill="#F97316" stroke="#14213D" stroke-width="3"/>' +
    '<path d="M25 46c-7-1-8 11 0 12" stroke="#14213D" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M75 46c7-1 8 11 0 12" stroke="#14213D" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="41" cy="45" r="2.8" fill="#14213D"/><circle cx="59" cy="45" r="2.8" fill="#14213D"/>' +
    '<path d="M43 59c4.5 3.6 9.5 3.6 14 0" stroke="#14213D" stroke-width="2.6" stroke-linecap="round"/>' +
    '<ellipse cx="37" cy="33" rx="6" ry="3.4" fill="#FFFFFF" opacity="0.5"/>',
  /* зелёный глаз (हरित) */
  eye: '<path d="M14 50c12-17 60-17 72 0-12 17-60 17-72 0Z" fill="#FFFFFF" stroke="#14213D" stroke-width="3"/>' +
    '<circle cx="50" cy="50" r="14" fill="#16A34A" stroke="#14213D" stroke-width="2.4"/>' +
    '<circle cx="50" cy="50" r="6" fill="#0B1220"/>' +
    '<circle cx="45" cy="45" r="2.6" fill="#FFFFFF" opacity="0.9"/>',
  /* жёлтый зуб (पीत) */
  tooth: '<path d="M32 22h36c4 0 6 3 6 7 0 12-3 18-6 30-2 8-3 16-7 16s-5-10-7-16h-8c-2 6-3 16-7 16s-5-8-7-16c-3-12-6-18-6-30 0-4 2-7 6-7Z" fill="#FFEE58" stroke="#14213D" stroke-width="3"/>' +
    '<path d="M38 34c6-2 18-2 24 0" stroke="#D97706" stroke-width="2.4" stroke-linecap="round" opacity="0.7"/>'
};

var RC2_COMPOUNDS = [
  {
    id: "patalamukha", deva: "पाटल-मुख", iast: "pāṭala-mukha", ttsText: "पाटल-मुख",
    typoDeva: "पाटल-मुक", typoIast: "pāṭala-muka",
    maskedPrefix: "पाटल-", maskedHidden: "मुख",
    gapDeva: "पाटल-_", gapIast: "pāṭala-_", gapAnswer: "मुख",
    gapChoices: [
      { deva: "मुख", iast: "mukha" },
      { deva: "हस्त", iast: "hasta" },
      { deva: "दन्त", iast: "danta" },
      { deva: "पाद", iast: "pāda" }
    ],
    missingDisplay: "पाटल-मु_", missingAnswer: "ख",
    missingChoices: ["ख", "क", "घ", "ग"],
    syll: ["पा", "ट", "ल", "-", "मु", "ख"],
    svg: rc2Svg("#FDF2F8", RC2_ICON.mouth)
  },
  {
    id: "kapishahasta", deva: "कपिश-हस्त", iast: "kapiśa-hasta", ttsText: "कपिश-हस्त",
    typoDeva: "कपिष-हस्त", typoIast: "kapiṣa-hasta",
    maskedPrefix: "कपिश-", maskedHidden: "हस्त",
    gapDeva: "कपिश-_", gapIast: "kapiśa-_", gapAnswer: "हस्त",
    gapChoices: [
      { deva: "हस्त", iast: "hasta" },
      { deva: "मुख", iast: "mukha" },
      { deva: "पाद", iast: "pāda" },
      { deva: "नयन", iast: "nayana" }
    ],
    missingDisplay: "कपिश-ह_त", missingAnswer: "स्",
    missingChoices: ["स्", "स", "ष्", "श्"],
    syll: ["क", "पि", "श", "-", "ह", "स्त"],
    svg: rc2Svg("#FAF7F2", RC2_ICON.hand)
  },
  {
    id: "dhusarapada", deva: "धूसर-पाद", iast: "dhūsara-pāda", ttsText: "धूसर-पाद",
    typoDeva: "धुसर-पाद", typoIast: "dhusara-pāda",
    maskedPrefix: "धूसर-", maskedHidden: "पाद",
    gapDeva: "धूसर-_", gapIast: "dhūsara-_", gapAnswer: "पाद",
    gapChoices: [
      { deva: "पाद", iast: "pāda" },
      { deva: "हस्त", iast: "hasta" },
      { deva: "मुख", iast: "mukha" },
      { deva: "शीर्ष", iast: "śīrṣa" }
    ],
    missingDisplay: "धूसर-प_द", missingAnswer: "ा",
    missingChoices: ["ा", "अ", "ि", "ी"],
    syll: ["धू", "स", "र", "-", "पा", "द"],
    svg: rc2Svg("#F1F5F9", RC2_ICON.foot)
  },
  {
    id: "narangashirsha", deva: "नारङ्ग-शीर्ष", iast: "nāraṅga-śīrṣa", ttsText: "नारङ्ग-शीर्ष",
    typoDeva: "नारङ्ग-शीर्श", typoIast: "nāraṅga-śīrśa",
    maskedPrefix: "नारङ्ग-", maskedHidden: "शीर्ष",
    gapDeva: "नारङ्ग-_", gapIast: "nāraṅga-_", gapAnswer: "शीर्ष",
    gapChoices: [
      { deva: "शीर्ष", iast: "śīrṣa" },
      { deva: "नयन", iast: "nayana" },
      { deva: "हस्त", iast: "hasta" },
      { deva: "दन्त", iast: "danta" }
    ],
    missingDisplay: "नारङ्ग-शी _", missingAnswer: "र्ष",
    missingChoices: ["र्ष", "ष", "र्श", "षी"],
    syll: ["ना", "र", "ङ्ग", "-", "शी", "र्ष"],
    svg: rc2Svg("#FFF7ED", RC2_ICON.head)
  },
  {
    id: "haritanayana", deva: "हरित-नयन", iast: "harita-nayana", ttsText: "हरित-नयन",
    typoDeva: "हरित-नयण", typoIast: "harita-nayaṇa",
    maskedPrefix: "हरित-", maskedHidden: "नयन",
    gapDeva: "हरित-_", gapIast: "harita-_", gapAnswer: "नयन",
    gapChoices: [
      { deva: "नयन", iast: "nayana" },
      { deva: "दन्त", iast: "danta" },
      { deva: "मुख", iast: "mukha" },
      { deva: "शीर्ष", iast: "śīrṣa" }
    ],
    missingDisplay: "हरित-न_न", missingAnswer: "य",
    missingChoices: ["य", "ि", "व", "न"],
    syll: ["ह", "रि", "त", "-", "न", "य", "न"],
    svg: rc2Svg("#F0FDF4", RC2_ICON.eye)
  },
  {
    id: "pitadanta", deva: "पीत-दन्त", iast: "pīta-danta", ttsText: "पीत-दन्त",
    typoDeva: "पित-दन्त", typoIast: "pita-danta",
    maskedPrefix: "पीत-", maskedHidden: "दन्त",
    gapDeva: "पीत-_", gapIast: "pīta-_", gapAnswer: "दन्त",
    gapChoices: [
      { deva: "दन्त", iast: "danta" },
      { deva: "पाद", iast: "pāda" },
      { deva: "हस्त", iast: "hasta" },
      { deva: "मुख", iast: "mukha" }
    ],
    missingDisplay: "पीत-द_त", missingAnswer: "न्",
    missingChoices: ["न्", "न", "ण्", "म्"],
    syll: ["पी", "त", "-", "द", "न्", "त"],
    svg: rc2Svg("#FEFCE8", RC2_ICON.tooth)
  }
];

/* постер «шесть компаундов» — 3 × 2, как в уроке 3 */
var RC2_POSTER_ART = (function () {
  var art = '<rect x="4" y="4" width="312" height="222" rx="16" fill="#F8EFE6" stroke="#E5DEC9" stroke-width="1.5"/>';
  RC2_COMPOUNDS.forEach(function (w, i) {
    var x = 10 + (i % 3) * 104, y = 10 + Math.floor(i / 3) * 108;
    var inner = w.svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    art += '<rect x="' + x + '" y="' + y + '" width="92" height="92" rx="12" fill="#FFFFFF" stroke="#E5DEC9" stroke-width="1.5"/>' +
      '<svg x="' + (x + 2) + '" y="' + (y + 2) + '" width="88" height="88" viewBox="0 0 100 100">' + inner + '</svg>';
  });
  return art;
})();

var RC2_PINS = RC2_COMPOUNDS.map(function (w, i) {
  var x = 10 + (i % 3) * 104, y = 10 + Math.floor(i / 3) * 108;
  var cx = x + 46, cy = y + 46;
  /* «Что пропало?»: картинка карточки закрашивается её же фоном */
  var tint = (w.svg.match(/<rect[^>]*fill="(#[0-9A-Fa-f]{6})"/) || [])[1] || '#FFFFFF';
  var erase = '<rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="88" height="88" rx="11" fill="' + tint + '"/>';
  return { id: w.id, num: i + 1, x: cx - 30, y: cy - 30, tx: cx, ty: cy, erase: erase };
});

/* ============================================================================
   ЦВЕТА ПРОШЛОГО УРОКА (3) — блок повторения `recycle2`
   Ровно те же шесть слов и те же картинки, что в уроке 3.
   ========================================================================= */
var LC2_PREV_SWATCHES = [
  { id: 'shveta', fill: '#FFFFFF', hi: '#CBD5E1' },
  { id: 'krishna', fill: '#0B1220', hi: '#64748B' },
  { id: 'rakta', fill: '#DC2626', hi: '#FFFFFF' },
  { id: 'nila', fill: '#2563EB', hi: '#FFFFFF' },
  { id: 'shyama', fill: '#1F3A5F', hi: '#AFC4DE' },
  { id: 'gaura', fill: '#F2C46B', hi: '#FFFFFF' }
];

var LC2_PREV_WORDS = [
  {
    id: "shveta", deva: "श्वेत", iast: "śveta", ttsText: "श्वेता",
    typoDeva: "श्वेट", typoIast: "śveṭa",
    maskedPrefix: "श्वे", maskedHidden: "त",
    gapDeva: "_त", gapIast: "_ta", gapAnswer: "श्वे",
    gapChoices: [
      { deva: "श्वे", iast: "śve" },
      { deva: "स्वे", iast: "sve" },
      { deva: "श्वा", iast: "śvā" },
      { deva: "श्वि", iast: "śvi" }
    ],
    missingDisplay: "श्वे _", missingAnswer: "त",
    missingChoices: ["त", "ट", "थ", "द"],
    svg: lc2Blob("#F1F5F9", "#FFFFFF")
  },
  {
    id: "krishna", deva: "कृष्ण", iast: "kṛṣṇa", ttsText: "कृष्णा",
    typoDeva: "कृश्ण", typoIast: "kṛśṇa",
    maskedPrefix: "कृ", maskedHidden: "ष्ण",
    gapDeva: "_ष्ण", gapIast: "_ṣṇa", gapAnswer: "कृ",
    gapChoices: [
      { deva: "कृ", iast: "kṛ" },
      { deva: "क्रि", iast: "kri" },
      { deva: "की", iast: "kī" },
      { deva: "कु", iast: "ku" }
    ],
    missingDisplay: "कृ _", missingAnswer: "ष्ण",
    missingChoices: ["ष्ण", "श्ण", "स्ण", "ष्णा"],
    svg: lc2Blob("#E2E8F0", "#0B1220")
  },
  {
    id: "rakta", deva: "रक्त", iast: "rakta", ttsText: "रक्ता",
    typoDeva: "रक्ता", typoIast: "raktā",
    maskedPrefix: "र", maskedHidden: "क्त",
    gapDeva: "_क्त", gapIast: "_kta", gapAnswer: "र",
    gapChoices: [
      { deva: "र", iast: "ra" },
      { deva: "रा", iast: "rā" },
      { deva: "ल", iast: "la" },
      { deva: "रि", iast: "ri" }
    ],
    missingDisplay: "र _", missingAnswer: "क्त",
    missingChoices: ["क्त", "कत", "ख्त", "क्ता"],
    svg: lc2Blob("#FEF2F2", "#DC2626")
  },
  {
    id: "nila", deva: "नील", iast: "nīla", ttsText: "नीला",
    typoDeva: "निल", typoIast: "nila",
    maskedPrefix: "नी", maskedHidden: "ल",
    gapDeva: "_ल", gapIast: "_la", gapAnswer: "नी",
    gapChoices: [
      { deva: "नी", iast: "nī" },
      { deva: "नि", iast: "ni" },
      { deva: "णी", iast: "ṇī" },
      { deva: "ने", iast: "ne" }
    ],
    missingDisplay: "नी _", missingAnswer: "ल",
    missingChoices: ["ल", "ळ", "न", "र"],
    svg: lc2Blob("#EFF6FF", "#2563EB")
  },
  {
    id: "shyama", deva: "श्याम", iast: "śyāma", ttsText: "श्यामा",
    typoDeva: "श्यम", typoIast: "śyama",
    maskedPrefix: "श्या", maskedHidden: "म",
    gapDeva: "_म", gapIast: "_ma", gapAnswer: "श्या",
    gapChoices: [
      { deva: "श्या", iast: "śyā" },
      { deva: "श्य", iast: "śya" },
      { deva: "ष्या", iast: "ṣyā" },
      { deva: "स्या", iast: "syā" }
    ],
    missingDisplay: "श्या _", missingAnswer: "म",
    missingChoices: ["म", "न", "भ", "म्"],
    svg: lc2Blob("#EDF2F9", "#1F3A5F")
  },
  {
    id: "gaura", deva: "गौर", iast: "gaura", ttsText: "गौरा",
    typoDeva: "गोर", typoIast: "gora",
    maskedPrefix: "गौ", maskedHidden: "र",
    gapDeva: "_र", gapIast: "_ra", gapAnswer: "गौ",
    gapChoices: [
      { deva: "गौ", iast: "gau" },
      { deva: "गो", iast: "go" },
      { deva: "गा", iast: "gā" },
      { deva: "घौ", iast: "ghau" }
    ],
    missingDisplay: "गौ _", missingAnswer: "र",
    missingChoices: ["र", "ल", "रा", "न"],
    svg: lc2Blob("#FFFBEB", "#F2C46B")
  }
];

/* ============================================================================
   У Р О К   4
   ========================================================================= */
SAL.registerLesson({
  key: "LC2",
  num: 4,
  titleDeva: "वर्णाः",
  titleRu: "Ещё цвета",
  titleEn: "More Colours",
  topicRu: "жёлтый, зелёный, оранжевый, коричневый, серый, розовый",
  topicEn: "yellow, green, orange, brown, grey, pink",
  introRu: "Четвёртый урок продолжает цвета: <code>पीत</code> (жёлтый), <code>हरित</code> (зелёный), <code>नारङ्ग</code> (оранжевый), <code>कपिश</code> (коричневый), <code>धूसर</code> (серый), <code>पाटल</code> (розовый). Это полный близнец урока 3: те же игры и кнопки, только словарь новый. Различаем похожие: <code>पीत</code> — светло-жёлтый, лимонный, а <code>गौर</code> из урока 3 — пастельно-золотистый, янтарный. Новые цвета сразу работают как определения к словам уроков 1–2, а шесть цветов урока 3 возвращаются в блоке повторения.",
  introEn: "The fourth lesson carries on with colours: <code>पीत</code> (yellow), <code>हरित</code> (green), <code>नारङ्ग</code> (orange), <code>कपिश</code> (brown), <code>धूसर</code> (grey), <code>पाटल</code> (pink). It is a carbon copy of lesson 3 — the same games and buttons, only the word list is new. Keep similar colours apart: <code>पीत</code> is a pale lemon yellow, while <code>गौर</code> from lesson 3 is pastel amber gold. The new colours work straight away as attributes of the body and face words from lessons 1–2, and the six colours of lesson 3 come back in the recycling block.",
  /* цели урока по схеме CELTA: главная цель — языковой материал, подцели — «другая половина» */
  aim: {
    ru: {
      main: "Уточнить и отработать ещё шесть цветов в контексте описания частей тела и научить отличать पीत от गौर.",
      subs: [
        "Повторить шесть цветов урока 3 в тех же играх (блок повторения).",
        "Ввести и отработать шесть сдвоенных слов «цвет + часть тела».",
        "Поставить произношение ṭ, ṇ, ś и долгих гласных в новых словах."
      ]
    },
    en: {
      main: "To clarify and practise a further six colours in the context of describing body parts, and to help learners tell पीत from गौर.",
      subs: [
        "To review the six colours of lesson 3 through the same games (recycling block).",
        "To introduce and practise six colour + body-part compounds.",
        "To give practice in the pronunciation of ṭ, ṇ, ś and long vowels in the new words."
      ]
    }
  },
  /* Цвет нельзя «показать у себя» — поэтому жеста в этом уроке нет, а заголовок
     Production называет только то, что нужно сделать: назвать слова вслух. */
  gestureRu: "",
  gestureEn: "",
  prodTitleRu: "Живая речь: назовите вслух все {n} слов",
  prodTitleEn: "Freer Production: Say All {n} Words Aloud",
  words: [
    {
      id: "pita", deva: "पीत", iast: "pīta", ttsText: "पीता",
      typoDeva: "पित", typoIast: "pita",
      maskedPrefix: "पी", maskedHidden: "त",
      gapDeva: "_त", gapIast: "_ta", gapAnswer: "पी",
      gapChoices: [
        { deva: "पी", iast: "pī" },
        { deva: "पि", iast: "pi" },
        { deva: "फी", iast: "phī" },
        { deva: "पे", iast: "pe" }
      ],
      missingDisplay: "पी _", missingAnswer: "त",
      missingChoices: ["त", "ट", "थ", "द"],
      svg: lc2Blob("#FFFDE7", "#FFEE58")
    },
    {
      id: "harita", deva: "हरित", iast: "harita", ttsText: "हरिता",
      typoDeva: "हरीत", typoIast: "harīta",
      maskedPrefix: "ह", maskedHidden: "रित",
      gapDeva: "_रित", gapIast: "_rita", gapAnswer: "ह",
      gapChoices: [
        { deva: "ह", iast: "ha" },
        { deva: "घ", iast: "gha" },
        { deva: "हा", iast: "hā" },
        { deva: "स", iast: "sa" }
      ],
      missingDisplay: "हरि _", missingAnswer: "त",
      missingChoices: ["त", "ट", "थ", "द"],
      svg: lc2Blob("#F0FDF4", "#16A34A")
    },
    {
      id: "naranga", deva: "नारङ्ग", iast: "nāraṅga", ttsText: "नारङ्गा",
      typoDeva: "नारङ्घ", typoIast: "nāraṅgha",
      maskedPrefix: "ना", maskedHidden: "रङ्ग",
      gapDeva: "_रङ्ग", gapIast: "_raṅga", gapAnswer: "ना",
      gapChoices: [
        { deva: "ना", iast: "nā" },
        { deva: "न", iast: "na" },
        { deva: "णा", iast: "ṇā" },
        { deva: "नि", iast: "ni" }
      ],
      missingDisplay: "ना _ङ्ग", missingAnswer: "र",
      missingChoices: ["र", "ल", "न", "रा"],
      svg: lc2Blob("#FFF7ED", "#F97316")
    },
    {
      id: "kapisha", deva: "कपिश", iast: "kapiśa", ttsText: "कपिशा",
      typoDeva: "कपिष", typoIast: "kapiṣa",
      maskedPrefix: "क", maskedHidden: "पिश",
      gapDeva: "_पिश", gapIast: "_piśa", gapAnswer: "क",
      gapChoices: [
        { deva: "क", iast: "ka" },
        { deva: "ख", iast: "kha" },
        { deva: "ग", iast: "ga" },
        { deva: "का", iast: "kā" }
      ],
      missingDisplay: "कपि _", missingAnswer: "श",
      missingChoices: ["श", "ष", "स", "स्"],
      svg: lc2Blob("#FAF7F2", "#8B5E34")
    },
    {
      id: "dhusara", deva: "धूसर", iast: "dhūsara", ttsText: "धूसरा",
      typoDeva: "धुसर", typoIast: "dhusara",
      maskedPrefix: "धू", maskedHidden: "सर",
      gapDeva: "_सर", gapIast: "_sara", gapAnswer: "धू",
      gapChoices: [
        { deva: "धू", iast: "dhū" },
        { deva: "धु", iast: "dhu" },
        { deva: "धा", iast: "dhā" },
        { deva: "दू", iast: "dū" }
      ],
      missingDisplay: "धू _र", missingAnswer: "स",
      missingChoices: ["स", "श", "ष", "स्"],
      svg: lc2Blob("#F1F5F9", "#94A3B8")
    },
    {
      id: "patala", deva: "पाटल", iast: "pāṭala", ttsText: "पाटला",
      typoDeva: "पातल", typoIast: "pātala",
      maskedPrefix: "पा", maskedHidden: "टल",
      gapDeva: "_टल", gapIast: "_ṭala", gapAnswer: "पा",
      gapChoices: [
        { deva: "पा", iast: "pā" },
        { deva: "प", iast: "pa" },
        { deva: "फा", iast: "phā" },
        { deva: "बा", iast: "bā" }
      ],
      missingDisplay: "पा _ल", missingAnswer: "ट",
      missingChoices: ["ट", "त", "ठ", "ड"],
      svg: lc2Blob("#FDF2F8", "#EC4899")
    }
  ],
  /* те же игры, что у урока 3: 12 классических + два филворда */
  extraGames: ['wordgrid', 'wordsearch'],
  steps: [
    { wordIds: ["pita", "harita"] },
    { wordIds: ["naranga", "kapisha"] },
    { wordIds: ["dhusara", "patala"] }
  ],
  hotspots: {
    figures: [
      {
        key: "palette",
        captionRu: "Палитра: шесть цветов (1–6)",
        captionEn: "Palette: Six Colours (1–6)",
        viewBox: "0 0 320 230",
        art: lc2PaletteArt([
          { id: 'pita', fill: '#FFEE58', hi: '#FFF9C4' },
          { id: 'harita', fill: '#16A34A', hi: '#86EFAC' },
          { id: 'naranga', fill: '#F97316', hi: '#FDBA74' },
          { id: 'kapisha', fill: '#8B5E34', hi: '#D6BFA6' },
          { id: 'dhusara', fill: '#94A3B8', hi: '#E2E8F0' },
          { id: 'patala', fill: '#EC4899', hi: '#F9A8D4' }
        ]),
        pins: lc2PalettePins([
          { id: 'pita' }, { id: 'harita' }, { id: 'naranga' },
          { id: 'kapisha' }, { id: 'dhusara' }, { id: 'patala' }
        ])
      }
    ]
  },
  groups: [
    { titleRu: "Тёплые тона", titleEn: "Warm Colours", wordIds: ["pita", "naranga"] },
    { titleRu: "Холодные тона", titleEn: "Cool Colours", wordIds: ["harita", "dhusara"] },
    { titleRu: "Светлые тона", titleEn: "Light Colours", wordIds: ["pita", "patala"] },
    { titleRu: "Тёмные тона", titleEn: "Dark Colours", wordIds: ["kapisha", "dhusara"] }
  ],
  categories: [
    { titleRu: "Тёплые тона", titleEn: "Warm Colours", wordIds: ["pita", "naranga"] },
    { titleRu: "Холодные тона", titleEn: "Cool Colours", wordIds: ["harita", "dhusara"] },
    { titleRu: "Светлые тона", titleEn: "Light Colours", wordIds: ["pita", "patala"] },
    { titleRu: "Тёмные тона", titleEn: "Dark Colours", wordIds: ["kapisha", "dhusara"] },
    { titleRu: "Есть звук «र» (ra)", titleEn: "Words with «र» (ra)", wordIds: ["harita", "naranga", "dhusara"] },
    { titleRu: "Долгая гласная (ा / ी / ू)", titleEn: "Long Vowel (ा / ी / ू)", wordIds: ["pita", "naranga", "dhusara"] },
    { titleRu: "Есть звук «प» (pa)", titleEn: "Words with «प» (pa)", wordIds: ["pita", "kapisha", "patala"] },
    { titleRu: "Кончается на «त»", titleEn: "Ends in «त»", wordIds: ["pita", "harita"] }
  ],
  /* ==========================================================================
     БЛОК ПОВТОРЕНИЯ 1: новые цвета + части тела уроков 1–2
     ========================================================================== */
  recycle: {
    titleRu: "Повторение: цвет + часть тела",
    titleEn: "Recycling: colour + body part",
    descRu: "Соедините цвет из этого урока с частью тела или лица из уроков 1–2 — и получится одно сдвоенное слово через тире: <code>पाटल</code> + <code>मुख</code> = <code>पाटल-मुख</code>. Те же игры, что выше, но карточки уже составные: это спиральное повторение всей лексики.",
    descEn: "Join a colour from this lesson with a body or face part from lessons 1–2 — and one hyphenated compound word appears: <code>पाटल</code> + <code>मुख</code> = <code>पाटल-मुख</code>. The same games as above, but every card is now a compound: spiral revision of all the vocabulary.",
    gestureRu: "коснитесь той части тела, о которой говорится в слове",
    gestureEn: "touch the body part the word names",
    prodTitleRu: "Живая речь: назовите вслух все {n} сдвоенных слов",
    prodTitleEn: "Freer Production: Say All {n} Compound Words Aloud",
    words: RC2_COMPOUNDS,
    decoys: ["पीत-मुख", "हरित-हस्त", "धूसर-नयन", "कपिश-पाद", "पाटल-दन्त", "नारङ्ग-उदर"],
    categories: [
      { titleRu: "Часть лица", titleEn: "Part of the Face", wordIds: ["patalamukha", "haritanayana", "pitadanta"] },
      { titleRu: "Часть тела", titleEn: "Part of the Body", wordIds: ["kapishahasta", "dhusarapada", "narangashirsha"] },
      { titleRu: "Светлые тона", titleEn: "Light Colours", wordIds: ["pitadanta", "patalamukha"] },
      { titleRu: "Тёмные тона", titleEn: "Dark Colours", wordIds: ["kapishahasta", "dhusarapada"] },
      { titleRu: "Есть звук «श» (śa)", titleEn: "With «श» (śa)", wordIds: ["kapishahasta", "narangashirsha"] },
      { titleRu: "Долгая гласная в цвете (ा / ी / ू)", titleEn: "Long Vowel in the Colour (ा / ी / ू)", wordIds: ["patalamukha", "pitadanta", "dhusarapada", "narangashirsha"] }
    ],
    hotspots: {
      figures: [
        {
          key: "compounds",
          captionRu: "Шесть сдвоенных слов (1–6)",
          captionEn: "Six Compound Words (1–6)",
          viewBox: "0 0 320 230",
          art: RC2_POSTER_ART,
          pins: RC2_PINS
        }
      ]
    }
  },
  /* ==========================================================================
     БЛОК ПОВТОРЕНИЯ 2: шесть цветов прошлого урока (3)
     ========================================================================== */
  recycle2: {
    badgeRu: "♻️ ПОВТОРЕНИЕ · УРОК 3",
    badgeEn: "♻️ RECYCLING · LESSON 3",
    titleRu: "Повторение: цвета урока 3",
    titleEn: "Recycling: colours of lesson 3",
    descRu: "Шесть цветов прошлого урока возвращаются — <code>श्वेत</code>, <code>कृष्ण</code>, <code>रक्त</code>, <code>नील</code>, <code>श्याम</code>, <code>गौर</code> — когда-то это был весь урок 3. Те же игры и те же режимы Production: спиральное повторение перед новыми словами.",
    descEn: "The six colours of the previous lesson come back — <code>श्वेत</code>, <code>कृष्ण</code>, <code>रक्त</code>, <code>नील</code>, <code>श्याम</code>, <code>गौर</code>: once they were the whole of lesson 3. The same games and the same Production modes — spiral revision before the new words.",
    gestureRu: "назовите цвет вслух",
    gestureEn: "say the colour aloud",
    prodTitleRu: "Живая речь: назовите вслух все 6 цветов урока 3",
    prodTitleEn: "Freer Production: Say All 6 Colours of Lesson 3 Aloud",
    words: LC2_PREV_WORDS,
    categories: [
      { titleRu: "Светлые тона", titleEn: "Light Colours", wordIds: ["shveta", "gaura"] },
      { titleRu: "Тёмные тона", titleEn: "Dark Colours", wordIds: ["krishna", "shyama"] },
      { titleRu: "Тёплые тона", titleEn: "Warm Colours", wordIds: ["rakta", "gaura"] },
      { titleRu: "Холодные тона", titleEn: "Cool Colours", wordIds: ["nila", "krishna"] },
      { titleRu: "Есть звук «श» (śa)", titleEn: "With «श» (śa)", wordIds: ["shveta", "shyama"] },
      { titleRu: "Долгая гласная (ा / ी)", titleEn: "Long Vowel (ा / ी)", wordIds: ["shyama", "nila"] }
    ],
    hotspots: {
      figures: [
        {
          key: "palette3",
          captionRu: "Палитра урока 3: шесть цветов (1–6)",
          captionEn: "Lesson 3 Palette: Six Colours (1–6)",
          viewBox: "0 0 320 230",
          art: lc2PaletteArt(LC2_PREV_SWATCHES),
          pins: lc2PalettePins(LC2_PREV_SWATCHES)
        }
      ]
    }
  }
});
