/**
 * LESSON 3 · वर्णाः · "Colours" (6 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * Полный близнец урока 2 (лицо): те же 12 классических игр, те же два филворда
 * и те же пять режимов Production — отличается только словарь.
 *
 * - Только чистые основы, без падежей и рода: श्वेत, कृष्ण, रक्त, नील, श्याम, गौर
 * - Никаких переводов на карточках: значение передаёт цветное пятно и звук
 *   (100% Direct Method).
 * - IAST скрыт по умолчанию и включается кнопкой 🔤.
 *
 * Спиральное повторение: цвета описывают то, что уже знакомо, — предметы,
 * части тела и лица из уроков 1–2.
 *
 * Дополнительный блок `recycle` (ниже) — те же игры и те же режимы Production,
 * но со сдвоенными словами через тире: गौर-शीर्ष, नील-नयन, श्वेत-दन्त,
 * कृष्ण-पाद, रक्त-मुख, श्याम-उदर. Движок рисует его отдельной панелью.
 */

/* ============================================================================
   R E C Y C L I N G · ЦВЕТ + ЧАСТЬ ТЕЛА (уроки 1–2)
   Сдвоенные слова через тире: गौर-शीर्ष «золотая голова», नील-नयन «синий
   глаз», श्वेत-दन्त «белый зуб», कृष्ण-पाद «чёрная нога», रक्त-मुख «красный
   рот», श्याम-उदर «живот цвета грозовой тучи» (тёмно-синий). Это спиральное
   повторение лексики
   уроков 1 и 2: цвет из этого урока плюс часть тела или лица.
   ========================================================================= */
function rcSvg(tint, inner) {
  return '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100" height="100" rx="14" fill="' + tint + '"/>' + inner + '</svg>';
}

var RC_ICON = {
  head: '<circle cx="50" cy="50" r="25" fill="#F2C46B" stroke="#14213D" stroke-width="3"/>' +
    '<path d="M25 46c-7-1-8 11 0 12" stroke="#14213D" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M75 46c7-1 8 11 0 12" stroke="#14213D" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="41" cy="45" r="2.8" fill="#14213D"/><circle cx="59" cy="45" r="2.8" fill="#14213D"/>' +
    '<path d="M43 59c4.5 3.6 9.5 3.6 14 0" stroke="#14213D" stroke-width="2.6" stroke-linecap="round"/>' +
    '<ellipse cx="37" cy="33" rx="6" ry="3.4" fill="#FFFFFF" opacity="0.55"/>',
  eye: '<path d="M14 50c12-17 60-17 72 0-12 17-60 17-72 0Z" fill="#FFFFFF" stroke="#14213D" stroke-width="3"/>' +
    '<circle cx="50" cy="50" r="14" fill="#2563EB" stroke="#14213D" stroke-width="2.4"/>' +
    '<circle cx="50" cy="50" r="6" fill="#0B1220"/>' +
    '<circle cx="45" cy="45" r="2.6" fill="#FFFFFF" opacity="0.9"/>',
  tooth: '<path d="M32 22h36c4 0 6 3 6 7 0 12-3 18-6 30-2 8-3 16-7 16s-5-10-7-16h-8c-2 6-3 16-7 16s-5-8-7-16c-3-12-6-18-6-30 0-4 2-7 6-7Z" fill="#FFFFFF" stroke="#14213D" stroke-width="3"/>' +
    '<path d="M38 34c6-2 18-2 24 0" stroke="#CBD5E1" stroke-width="2.4" stroke-linecap="round"/>',
  foot: '<ellipse cx="49" cy="63" rx="20" ry="26" fill="#0B1220" stroke="#14213D" stroke-width="3"/>' +
    '<circle cx="31" cy="28" r="6" fill="#0B1220" stroke="#14213D" stroke-width="2.4"/>' +
    '<circle cx="43" cy="21" r="5.2" fill="#0B1220" stroke="#14213D" stroke-width="2.4"/>' +
    '<circle cx="54" cy="19" r="4.8" fill="#0B1220" stroke="#14213D" stroke-width="2.4"/>' +
    '<circle cx="64" cy="22" r="4.2" fill="#0B1220" stroke="#14213D" stroke-width="2.4"/>' +
    '<circle cx="72" cy="29" r="3.8" fill="#0B1220" stroke="#14213D" stroke-width="2.4"/>' +
    '<ellipse cx="43" cy="55" rx="5" ry="7" fill="#94A3B8" opacity="0.35"/>',
  mouth: '<path d="M20 50c9-13 51-13 60 0-9 15-51 15-60 0Z" fill="#DC2626" stroke="#14213D" stroke-width="3"/>' +
    '<path d="M22 50h56" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>',
  /* живот: округлый силуэт торса без головы — только сам живот цвета श्याम */
  belly: '<path d="M28 32C28 26 36 23 50 23C64 23 72 26 72 32C72 42 80 52 82 62C84 76 70 88 50 88C30 88 16 76 18 62C20 52 28 42 28 32Z" fill="#F8FAFC" stroke="#14213D" stroke-width="3"/>' +
    '<ellipse cx="50" cy="58" rx="19" ry="17" fill="#1F3A5F" stroke="#14213D" stroke-width="2.4"/>' +
    '<circle cx="50" cy="61" r="2.8" fill="#0B1220" opacity="0.55"/>' +
    '<ellipse cx="42" cy="48" rx="5" ry="3.4" fill="#AFC4DE" opacity="0.55"/>'
};

var RC_COMPOUNDS = [
  {
    id: "gaurashirsha", deva: "गौर-शीर्ष", iast: "gaura-śīrṣa", ttsText: "गौर-शीर्ष",
    typoDeva: "गौर-शीर्श", typoIast: "gaura-śīrśa",
    maskedPrefix: "गौर-", maskedHidden: "शीर्ष",
    gapDeva: "गौर-_", gapIast: "gaura-_", gapAnswer: "शीर्ष",
    gapChoices: [
      { deva: "शीर्ष", iast: "śīrṣa" },
      { deva: "नयन", iast: "nayana" },
      { deva: "दन्त", iast: "danta" },
      { deva: "पाद", iast: "pāda" }
    ],
    missingDisplay: "गौर-शी _", missingAnswer: "र्ष",
    missingChoices: ["र्ष", "ष", "र्श", "षी"],
    syll: ["गौ", "र", "-", "शी", "र्ष"],
    svg: rcSvg("#FFFBEB", RC_ICON.head)
  },
  {
    id: "nilanayana", deva: "नील-नयन", iast: "nīla-nayana", ttsText: "नील-नयन",
    typoDeva: "निल-नयन", typoIast: "nila-nayana",
    maskedPrefix: "नील-", maskedHidden: "नयन",
    gapDeva: "नील-_", gapIast: "nīla-_", gapAnswer: "नयन",
    gapChoices: [
      { deva: "नयन", iast: "nayana" },
      { deva: "दन्त", iast: "danta" },
      { deva: "मुख", iast: "mukha" },
      { deva: "शीर्ष", iast: "śīrṣa" }
    ],
    missingDisplay: "नील-न_न", missingAnswer: "य",
    missingChoices: ["य", "ि", "व", "न"],
    syll: ["नी", "ल", "-", "न", "य", "न"],
    svg: rcSvg("#EFF6FF", RC_ICON.eye)
  },
  {
    id: "shvetadanta", deva: "श्वेत-दन्त", iast: "śveta-danta", ttsText: "श्वेत-दन्त",
    typoDeva: "श्वेट-दन्त", typoIast: "śveṭa-danta",
    maskedPrefix: "श्वेत-", maskedHidden: "दन्त",
    gapDeva: "श्वेत-_", gapIast: "śveta-_", gapAnswer: "दन्त",
    gapChoices: [
      { deva: "दन्त", iast: "danta" },
      { deva: "पाद", iast: "pāda" },
      { deva: "उदर", iast: "udara" },
      { deva: "नयन", iast: "nayana" }
    ],
    missingDisplay: "श्वेत-द_त", missingAnswer: "न्",
    missingChoices: ["न्", "न", "ण्", "म्"],
    syll: ["श्वे", "त", "-", "द", "न्", "त"],
    svg: rcSvg("#F1F5F9", RC_ICON.tooth)
  },
  {
    id: "krishnapada", deva: "कृष्ण-पाद", iast: "kṛṣṇa-pāda", ttsText: "कृष्ण-पाद",
    typoDeva: "कृश्ण-पाद", typoIast: "kṛśṇa-pāda",
    maskedPrefix: "कृष्ण-", maskedHidden: "पाद",
    gapDeva: "कृष्ण-_", gapIast: "kṛṣṇa-_", gapAnswer: "पाद",
    gapChoices: [
      { deva: "पाद", iast: "pāda" },
      { deva: "मुख", iast: "mukha" },
      { deva: "शीर्ष", iast: "śīrṣa" },
      { deva: "दन्त", iast: "danta" }
    ],
    missingDisplay: "कृष्ण-प_द", missingAnswer: "ा",
    missingChoices: ["ा", "अ", "ि", "ी"],
    syll: ["कृ", "ष्ण", "-", "पा", "द"],
    svg: rcSvg("#E2E8F0", RC_ICON.foot)
  },
  {
    id: "raktamukha", deva: "रक्त-मुख", iast: "rakta-mukha", ttsText: "रक्त-मुख",
    typoDeva: "रक्त-मुक", typoIast: "rakta-muka",
    maskedPrefix: "रक्त-", maskedHidden: "मुख",
    gapDeva: "रक्त-_", gapIast: "rakta-_", gapAnswer: "मुख",
    gapChoices: [
      { deva: "मुख", iast: "mukha" },
      { deva: "उदर", iast: "udara" },
      { deva: "नयन", iast: "nayana" },
      { deva: "पाद", iast: "pāda" }
    ],
    missingDisplay: "रक्त-मु_", missingAnswer: "ख",
    missingChoices: ["ख", "क", "घ", "ग"],
    syll: ["र", "क्त", "-", "मु", "ख"],
    svg: rcSvg("#FEF2F2", RC_ICON.mouth)
  },
  {
    id: "shyamaudara", deva: "श्याम-उदर", iast: "śyāma-udara", ttsText: "श्याम-उदर",
    typoDeva: "स्याम-उदर", typoIast: "syāma-udara",
    maskedPrefix: "श्याम-", maskedHidden: "उदर",
    gapDeva: "श्याम-_", gapIast: "śyāma-_", gapAnswer: "उदर",
    gapChoices: [
      { deva: "उदर", iast: "udara" },
      { deva: "शीर्ष", iast: "śīrṣa" },
      { deva: "दन्त", iast: "danta" },
      { deva: "मुख", iast: "mukha" }
    ],
    missingDisplay: "श्याम-उ_र", missingAnswer: "द",
    missingChoices: ["द", "ड", "त", "ध"],
    syll: ["श्या", "म", "-", "उ", "द", "र"],
    svg: rcSvg("#EDF2F9", RC_ICON.belly)
  }
];

/* постер «шесть компаундов» для стрелки на схеме и игры «Что пропало?» */
var RC_POSTER_ART = (function () {
  var art = '<rect x="4" y="4" width="312" height="222" rx="16" fill="#F8EFE6" stroke="#E5DEC9" stroke-width="1.5"/>';
  RC_COMPOUNDS.forEach(function (w, i) {
    var x = 10 + (i % 3) * 104, y = 10 + Math.floor(i / 3) * 108;
    var inner = w.svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    art += '<rect x="' + x + '" y="' + y + '" width="92" height="92" rx="12" fill="#FFFFFF" stroke="#E5DEC9" stroke-width="1.5"/>' +
      '<svg x="' + (x + 2) + '" y="' + (y + 2) + '" width="88" height="88" viewBox="0 0 100 100">' + inner + '</svg>';
  });
  return art;
})();

var RC_PINS = RC_COMPOUNDS.map(function (w, i) {
  var cx = 56 + (i % 3) * 104, cy = 56 + Math.floor(i / 3) * 108;
  return { id: w.id, num: i + 1, x: cx - 30, y: cy - 30, tx: cx, ty: cy };
});

SAL.registerLesson({
  key: "LC",
  num: 3,
  titleDeva: "वर्णाः",
  titleRu: "Цвета",
  titleEn: "Colours",
  topicRu: "белый, чёрный, красный, синий, тёмно-синий как грозовая туча, золотистый",
  topicEn: "white, black, red, blue, storm-cloud dark blue, golden",
  introRu: "Третий урок — шесть цветов: <code>श्वेत</code> (белый), <code>कृष्ण</code> (чёрный), <code>रक्त</code> (красный), <code>नील</code> (синий), <code>श्याम</code> (тёмно-синий, цвет грозовой тучи), <code>गौर</code> (золотистый, светлый). Слова короткие, поэтому тренируем точность: долгота гласной (<code>नील</code> / <code>निल</code>), придыхание и варга (<code>कृष्ण</code>). Цвета сразу работают как определения к знакомым словам уроков 1–2.",
  introEn: "The third lesson brings six colours: <code>श्वेत</code> (white), <code>कृष्ण</code> (black), <code>रक्त</code> (red), <code>नील</code> (blue), <code>श्याम</code> (storm-cloud dark blue), <code>गौर</code> (golden, fair). The words are short, so the focus is precision: vowel length (<code>नील</code> / <code>निल</code>) and aspiration and varga (<code>कृष्ण</code>). The colours work straight away as attributes of the body and face words from lessons 1–2.",
  /* Цвет нельзя «показать у себя» — поэтому жеста в этом уроке нет, а заголовок
     Production называет только то, что нужно сделать: назвать слова вслух. */
  gestureRu: "",
  gestureEn: "",
  prodTitleRu: "Живая речь: назовите вслух все {n} слов",
  prodTitleEn: "Freer Production: Say All {n} Words Aloud",
  words: [
    {
      id: "shveta", deva: "श्वेत", iast: "śveta", ttsText: "श्वेत",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#F1F5F9\"/>\n      <path d=\"M52 18C68 17 82 31 82 49C82 68 68 82 50 82C32 82 18 69 18 51C18 33 34 19 52 18Z\" fill=\"#FFFFFF\" stroke=\"#14213D\" stroke-width=\"3\"/>\n      <path d=\"M32 44C34 34 42 28 50 27\" stroke=\"#CBD5E1\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>\n      <ellipse cx=\"41\" cy=\"37\" rx=\"7\" ry=\"4.2\" fill=\"#E2E8F0\"/>\n    </svg>"
    },
    {
      id: "krishna", deva: "कृष्ण", iast: "kṛṣṇa", ttsText: "कृष्ण",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#E2E8F0\"/>\n      <path d=\"M52 18C68 17 82 31 82 49C82 68 68 82 50 82C32 82 18 69 18 51C18 33 34 19 52 18Z\" fill=\"#0B1220\" stroke=\"#14213D\" stroke-width=\"3\"/>\n      <ellipse cx=\"41\" cy=\"36\" rx=\"8\" ry=\"4.6\" fill=\"#94A3B8\" opacity=\"0.55\"/>\n    </svg>"
    },
    {
      id: "rakta", deva: "रक्त", iast: "rakta", ttsText: "रक्त",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FEF2F2\"/>\n      <path d=\"M52 18C68 17 82 31 82 49C82 68 68 82 50 82C32 82 18 69 18 51C18 33 34 19 52 18Z\" fill=\"#DC2626\" stroke=\"#14213D\" stroke-width=\"3\"/>\n      <ellipse cx=\"41\" cy=\"36\" rx=\"8\" ry=\"4.6\" fill=\"#FFFFFF\" opacity=\"0.5\"/>\n    </svg>"
    },
    {
      id: "nila", deva: "नील", iast: "nīla", ttsText: "नील",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#EFF6FF\"/>\n      <path d=\"M52 18C68 17 82 31 82 49C82 68 68 82 50 82C32 82 18 69 18 51C18 33 34 19 52 18Z\" fill=\"#2563EB\" stroke=\"#14213D\" stroke-width=\"3\"/>\n      <ellipse cx=\"41\" cy=\"36\" rx=\"8\" ry=\"4.6\" fill=\"#FFFFFF\" opacity=\"0.5\"/>\n    </svg>"
    },
    {
      id: "shyama", deva: "श्याम", iast: "śyāma", ttsText: "श्याम",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#EDF2F9\"/>\n      <path d=\"M52 18C68 17 82 31 82 49C82 68 68 82 50 82C32 82 18 69 18 51C18 33 34 19 52 18Z\" fill=\"#1F3A5F\" stroke=\"#14213D\" stroke-width=\"3\"/>\n      <ellipse cx=\"41\" cy=\"36\" rx=\"8\" ry=\"4.6\" fill=\"#AFC4DE\" opacity=\"0.55\"/>\n    </svg>"
    },
    {
      id: "gaura", deva: "गौर", iast: "gaura", ttsText: "गौर",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <path d=\"M52 18C68 17 82 31 82 49C82 68 68 82 50 82C32 82 18 69 18 51C18 33 34 19 52 18Z\" fill=\"#F2C46B\" stroke=\"#14213D\" stroke-width=\"3\"/>\n      <ellipse cx=\"41\" cy=\"36\" rx=\"8\" ry=\"4.6\" fill=\"#FFFFFF\" opacity=\"0.6\"/>\n    </svg>"
    }
  ],
  /* те же игры, что у урока 2: 12 классических + два филворда */
  extraGames: ['wordgrid', 'wordsearch'],
  /* пятый режим Production — как в уроке 2: спринт по накопленному словарю */
  unionSprint: ["L2", "L3", "LC"],
  unionLabel: {
    ru: "5. Спринт: Тело + Лицо + Цвета ⏱",
    en: "5. Sprint: Body + Face + Colours ⏱"
  },
  steps: [
    { wordIds: ["shveta", "krishna"] },
    { wordIds: ["rakta", "nila"] },
    { wordIds: ["shyama", "gaura"] }
  ],
  hotspots: {
    figures: [
      {
        key: "palette",
        captionRu: "Палитра: шесть цветов (1–6)",
        captionEn: "Palette: Six Colours (1–6)",
        viewBox: "0 0 320 230",
        art: "<rect x=\"6\" y=\"6\" width=\"308\" height=\"218\" rx=\"14\" fill=\"#F8EFE6\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n  <path d=\"M24 108C24 56 78 20 160 20C242 20 296 56 296 108C296 160 242 196 160 196C78 196 24 160 24 108Z\" fill=\"#FDF6EC\" stroke=\"#E5DEC9\" stroke-width=\"0\"/>\n  <circle cx=\"62\" cy=\"66\" r=\"32\" fill=\"#FFFFFF\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <circle cx=\"160\" cy=\"66\" r=\"32\" fill=\"#0B1220\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <circle cx=\"258\" cy=\"66\" r=\"32\" fill=\"#DC2626\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <circle cx=\"62\" cy=\"164\" r=\"32\" fill=\"#2563EB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <circle cx=\"160\" cy=\"164\" r=\"32\" fill=\"#1F3A5F\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <circle cx=\"258\" cy=\"164\" r=\"32\" fill=\"#F2C46B\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <ellipse cx=\"52\" cy=\"55\" rx=\"8\" ry=\"4.4\" fill=\"#CBD5E1\"/>\n  <ellipse cx=\"150\" cy=\"55\" rx=\"8\" ry=\"4.4\" fill=\"#64748B\" opacity=\"0.7\"/>\n  <ellipse cx=\"248\" cy=\"55\" rx=\"8\" ry=\"4.4\" fill=\"#FFFFFF\" opacity=\"0.55\"/>\n  <ellipse cx=\"52\" cy=\"153\" rx=\"8\" ry=\"4.4\" fill=\"#FFFFFF\" opacity=\"0.55\"/>\n  <ellipse cx=\"150\" cy=\"153\" rx=\"8\" ry=\"4.4\" fill=\"#AFC4DE\" opacity=\"0.6\"/>\n  <ellipse cx=\"248\" cy=\"153\" rx=\"8\" ry=\"4.4\" fill=\"#FFFFFF\" opacity=\"0.65\"/>",
        pins: [
          { id: "shveta", num: 1, x: 30, y: 34, tx: 62, ty: 66 },
          { id: "krishna", num: 2, x: 160, y: 20, tx: 160, ty: 66 },
          { id: "rakta", num: 3, x: 290, y: 34, tx: 258, ty: 66 },
          { id: "nila", num: 4, x: 30, y: 198, tx: 62, ty: 164 },
          { id: "shyama", num: 5, x: 160, y: 210, tx: 160, ty: 164 },
          { id: "gaura", num: 6, x: 290, y: 198, tx: 258, ty: 164 }
        ]
      }
    ]
  },
  groups: [
    { titleRu: "Светлые тона", titleEn: "Light Colours", wordIds: ["shveta", "gaura"] },
    { titleRu: "Тёмные тона", titleEn: "Dark Colours", wordIds: ["krishna", "shyama"] },
    { titleRu: "Тёплые тона", titleEn: "Warm Colours", wordIds: ["rakta", "gaura"] },
    { titleRu: "Холодные тона", titleEn: "Cool Colours", wordIds: ["nila", "krishna"] }
  ],
  categories: [
    { titleRu: "Светлые тона", titleEn: "Light Colours", wordIds: ["shveta", "gaura"] },
    { titleRu: "Тёмные тона", titleEn: "Dark Colours", wordIds: ["krishna", "shyama"] },
    { titleRu: "Тёплые тона", titleEn: "Warm Colours", wordIds: ["rakta", "gaura"] },
    { titleRu: "Холодные тона", titleEn: "Cool Colours", wordIds: ["nila", "krishna"] },
    { titleRu: "Есть звук «श» (śa)", titleEn: "Words with \"श\" (śa)", wordIds: ["shveta", "shyama"] },
    { titleRu: "Долгая гласная (ा / ी)", titleEn: "Long Vowel (ा / ी)", wordIds: ["shyama", "nila"] },
    { titleRu: "Есть звук «क» (ka)", titleEn: "Words with \"क\" (ka)", wordIds: ["krishna", "rakta"] },
    { titleRu: "Есть носовой (ण / न / म)", titleEn: "With a Nasal (ण / न / म)", wordIds: ["krishna", "nila", "shyama"] }
  ],
  /* ==========================================================================
     ДОПОЛНИТЕЛЬНЫЙ БЛОК: повторение лексики уроков 1–2
     --------------------------------------------------------------------------
     Движок рисует этот набор отдельной панелью в Practice (те же 14 игр) и
     отдельной панелью в Production (те же 4 режима). Состояние игр хранится
     у служебной конфигурации LCRC, поэтому основной урок цветов не меняется.
     ========================================================================== */
  recycle: {
    titleRu: "Повторение: цвет + часть тела",
    titleEn: "Recycling: colour + body part",
    gestureRu: "коснитесь той части тела, о которой говорится в слове",
    gestureEn: "touch the body part the word names",
    descRu: "Соедините цвет из этого урока с частью тела или лица из уроков 1–2 — и получится одно сдвоенное слово через тире: <code>गौर</code> + <code>शीर्ष</code> = <code>गौर-शीर्ष</code>. Те же игры, что выше, но карточки уже составные: это спиральное повторение всей лексики.",
    descEn: "Join a colour from this lesson with a body or face part from lessons 1–2 — and one hyphenated compound word appears: <code>गौर</code> + <code>शीर्ष</code> = <code>गौर-शीर्ष</code>. The same games as above, but every card is now a compound: spiral revision of all the vocabulary.",
    words: RC_COMPOUNDS,
    decoys: ["गौर-नयन", "नील-मुख", "श्वेत-पाद", "कृष्ण-उदर", "रक्त-दन्त", "श्याम-शीर्ष"],
    categories: [
      { titleRu: "Часть лица", titleEn: "Part of the Face", wordIds: ["nilanayana", "shvetadanta", "raktamukha"] },
      { titleRu: "Часть тела", titleEn: "Part of the Body", wordIds: ["gaurashirsha", "krishnapada", "shyamaudara"] },
      { titleRu: "Светлые тона", titleEn: "Light Colours", wordIds: ["shvetadanta", "gaurashirsha"] },
      { titleRu: "Тёмные тона", titleEn: "Dark Colours", wordIds: ["krishnapada", "shyamaudara"] },
      { titleRu: "Есть звук «श» (śa)", titleEn: "With «श» (śa)", wordIds: ["gaurashirsha", "shvetadanta", "shyamaudara"] },
      { titleRu: "Долгая гласная в цвете (ा / ी / ौ)", titleEn: "Long Vowel in the Colour (ा / ी / ौ)", wordIds: ["gaurashirsha", "nilanayana", "shyamaudara"] }
    ],
    hotspots: {
      figures: [
        {
          key: "compounds",
          captionRu: "Шесть сдвоенных слов (1–6)",
          captionEn: "Six Compound Words (1–6)",
          viewBox: "0 0 320 230",
          art: RC_POSTER_ART,
          pins: RC_PINS
        }
      ]
    }
  }
});
