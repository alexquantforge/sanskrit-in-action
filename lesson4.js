/**
 * LESSON 5 · सङ्ख्याः · "Numbers 1–5" (5 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * Same exercise set as Lesson 2 (Face), built for the first five Sanskrit numerals:
 * - the counting forms: neuter nominative-accusative एकम्, द्वे, त्रीणि, चत्वारि, पञ्च
 * - these are the forms a learner counts things with: "one ...", "two ...", "three ..."
 * - no Arabic digits on the cards: quantity is shown only by beads (Direct Method)
 * - the TPR gesture here is clapping, not touching a body part
 * - IAST is hidden by default and can be switched on with the 🔤 button.
 * Data file for the generic engine in lesson-engine.js.
 */

SAL.registerLesson({
  key: "L4",
  num: 5,
  titleDeva: "सङ्ख्याः",
  titleRu: "Цифры 1–5",
  titleEn: "Numbers 1–5",
  topicRu: "один, два, три, четыре, пять",
  topicEn: "one, two, three, four, five",
  introRu: "Пятый урок: пять первых санскритских числительных в форме среднего рода (именительный-винительный падеж) — <code>एकम्</code>, <code>द्वे</code>, <code>त्रीणि</code>, <code>चत्वारि</code>, <code>पञ्च</code>. В этой форме считают предметы. Количество показывают только бусины на картинке: ни арабских цифр, ни перевода.",
  introEn: "The fifth lesson: the first five Sanskrit numerals in the neuter nominative-accusative — <code>ekam</code>, <code>dve</code>, <code>trīṇi</code>, <code>catvāri</code>, <code>pañca</code>. This is the form used for counting things. Quantity is shown only by beads in the picture: no Arabic digits, no translation.",
  gestureRu: "хлопните в ладоши столько раз",
  gestureEn: "clap your hands that many times",
  prodTitleRu: "Живая речь: назовите вслух все {n} числительных",
  prodTitleEn: "Freer Production: Say All {n} Numerals Aloud",
  words: [
    {
      id: "ekam", deva: "एकम्", iast: "ekam", ttsText: "एकं",
      syll: ["ए", "क", "म्"],
      typoDeva: "ऐकम्", typoIast: "aikam",
      maskedPrefix: "ए", maskedHidden: "कम्",
      gapDeva: "_कम्", gapIast: "_kam", gapAnswer: "ए",
      gapChoices: [
        { deva: "ए", iast: "e" },
        { deva: "ऐ", iast: "ai" },
        { deva: "ओ", iast: "o" },
        { deva: "अ", iast: "a" }
      ],
      missingDisplay: "एक _", missingAnswer: "म्",
      missingChoices: ["म्", "म", "व", "न"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"50\" cy=\"52\" r=\"13\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.8\"/>\n      <circle cx=\"46\" cy=\"48\" r=\"3.2\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "dve", deva: "द्वे", iast: "dve", ttsText: "द्वे",
      syll: ["द्व", "े"],
      typoDeva: "द्वै", typoIast: "dvai",
      maskedPrefix: "", maskedHidden: "द्वे",
      gapDeva: "द्व _", gapIast: "dv _", gapAnswer: "े",
      gapChoices: [
        { deva: "े", iast: "e" },
        { deva: "ै", iast: "ai" },
        { deva: "ो", iast: "o" },
        { deva: "ौ", iast: "au" }
      ],
      missingDisplay: "_", missingAnswer: "द्वे",
      missingChoices: ["द्वे", "ध्वे", "त्वे", "द्वै"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"33\" cy=\"52\" r=\"13\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.8\"/>\n      <circle cx=\"29\" cy=\"48\" r=\"3.2\" fill=\"#FDE68A\"/>\n      <circle cx=\"67\" cy=\"52\" r=\"13\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.8\"/>\n      <circle cx=\"63\" cy=\"48\" r=\"3.2\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "trini", deva: "त्रीणि", iast: "trīṇi", ttsText: "त्रीणि",
      syll: ["त्री", "णि"],
      typoDeva: "त्रिणि", typoIast: "triṇi",
      maskedPrefix: "त्री", maskedHidden: "णि",
      gapDeva: "त्री _", gapIast: "trī _", gapAnswer: "णि",
      gapChoices: [
        { deva: "णि", iast: "ṇi" },
        { deva: "णी", iast: "ṇī" },
        { deva: "नि", iast: "ni" },
        { deva: "नी", iast: "nī" }
      ],
      missingDisplay: "_णि", missingAnswer: "त्री",
      missingChoices: ["त्री", "त्रि", "ध्री", "थ्री"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"25\" cy=\"52\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"21\" cy=\"48\" r=\"3\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"52\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"46\" cy=\"48\" r=\"3\" fill=\"#FDE68A\"/>\n      <circle cx=\"75\" cy=\"52\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"71\" cy=\"48\" r=\"3\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "catvari", deva: "चत्वारि", iast: "catvāri", ttsText: "चत्वारि",
      syll: ["च", "त्वा", "रि"],
      typoDeva: "चत्वरि", typoIast: "catvari",
      maskedPrefix: "च", maskedHidden: "त्वारि",
      gapDeva: "च _ रि", gapIast: "ca _ ri", gapAnswer: "त्वा",
      gapChoices: [
        { deva: "त्वा", iast: "tvā" },
        { deva: "त्व", iast: "tva" },
        { deva: "त्या", iast: "tyā" },
        { deva: "थ्वा", iast: "thvā" }
      ],
      missingDisplay: "चत्वा _", missingAnswer: "रि",
      missingChoices: ["रि", "री", "लि", "र"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"34\" cy=\"37\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"30\" cy=\"33\" r=\"3\" fill=\"#FDE68A\"/>\n      <circle cx=\"66\" cy=\"37\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"62\" cy=\"33\" r=\"3\" fill=\"#FDE68A\"/>\n      <circle cx=\"34\" cy=\"67\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"30\" cy=\"63\" r=\"3\" fill=\"#FDE68A\"/>\n      <circle cx=\"66\" cy=\"67\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"62\" cy=\"63\" r=\"3\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "panca", deva: "पञ्च", iast: "pañca", ttsText: "पञ्च",
      syll: ["प", "ञ्च"],
      typoDeva: "पन्च", typoIast: "panca",
      maskedPrefix: "प", maskedHidden: "ञ्च",
      gapDeva: "प _", gapIast: "pa _", gapAnswer: "ञ्च",
      gapChoices: [
        { deva: "ञ्च", iast: "ñca" },
        { deva: "न्च", iast: "nca" },
        { deva: "ञ्छ", iast: "ñcha" },
        { deva: "ण्च", iast: "ṇca" }
      ],
      missingDisplay: "_ञ्च", missingAnswer: "प",
      missingChoices: ["प", "फ", "ब", "भ"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"30\" cy=\"32\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"27\" cy=\"29\" r=\"2.6\" fill=\"#FDE68A\"/>\n      <circle cx=\"70\" cy=\"32\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"67\" cy=\"29\" r=\"2.6\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"50\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"47\" cy=\"47\" r=\"2.6\" fill=\"#FDE68A\"/>\n      <circle cx=\"30\" cy=\"68\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"27\" cy=\"65\" r=\"2.6\" fill=\"#FDE68A\"/>\n      <circle cx=\"70\" cy=\"68\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"67\" cy=\"65\" r=\"2.6\" fill=\"#FDE68A\"/>\n    </svg>"
    }
  ],
  /* words for the 10 x 10 word grid: real Sanskrit, but never in this lesson */
  decoys: [
    "ऐकम्",
    "द्वै",
    "त्रिणि",
    "चत्वरि",
    "पन्च",
    "षट्",
    "सप्त",
    "अष्ट",
    "नव",
    "दश",
    "अहम्",
    "त्वम्",
    "अस्ति",
    "नास्ति",
    "जलम्",
    "फलम्",
    "गृहम्",
    "पुस्तकम्",
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
    "जिह्वा"
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
    { ru: 'Есть носовой (ङ / ञ / ण / न / म)', en: 'Has a nasal (ङ / ञ / ण / न / म)',
      test: function (w) { return /[\u0901\u0902ङञणनम]/.test(w.deva); } },
    { ru: 'Оканчивается на гласный знак', en: 'Ends on a vowel sign',
      test: function (w) { return /[\u093E-\u094C]$/.test(w.deva); } },
    { ru: 'Есть буква «च» (ca)', en: 'Contains "च" (ca)',
      test: function (w) { return w.deva.indexOf('च') >= 0; } },
    { ru: 'Есть долгий гласный (ा / ी / े)', en: 'Has a long vowel sign (ा / ी / े)',
      test: function (w) { return /[\u093E\u0940\u0947]/.test(w.deva); } }
  ],
  steps: [
    { wordIds: ["ekam", "dve"] },
    { wordIds: ["trini", "catvari"] },
    { wordIds: ["panca"] }
  ],
  hotspots: {
    figures: [
      {
        key: "frame",
        captionRu: "Счёты: ряды от одного до пяти",
        captionEn: "Counting Frame: Rows of One to Five",
        viewBox: "0 0 320 300",
        art: "<rect x=\"36\" y=\"16\" width=\"248\" height=\"268\" rx=\"16\" fill=\"#FFFBEB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <rect x=\"36\" y=\"16\" width=\"248\" height=\"30\" rx=\"16\" fill=\"#FDE68A\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M52 31H268\" stroke=\"#B45309\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <line x1=\"52\" y1=\"70\" x2=\"268\" y2=\"70\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"160\" cy=\"70\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"157\" cy=\"67\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"110\" x2=\"268\" y2=\"110\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"145\" cy=\"110\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"142\" cy=\"107\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"175\" cy=\"110\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"172\" cy=\"107\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"150\" x2=\"268\" y2=\"150\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"130\" cy=\"150\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"127\" cy=\"147\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"160\" cy=\"150\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"157\" cy=\"147\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"190\" cy=\"150\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"187\" cy=\"147\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"190\" x2=\"268\" y2=\"190\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"115\" cy=\"190\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"112\" cy=\"187\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"145\" cy=\"190\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"142\" cy=\"187\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"175\" cy=\"190\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"172\" cy=\"187\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"205\" cy=\"190\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"202\" cy=\"187\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"230\" x2=\"268\" y2=\"230\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"100\" cy=\"230\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"97\" cy=\"227\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"130\" cy=\"230\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"127\" cy=\"227\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"160\" cy=\"230\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"157\" cy=\"227\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"190\" cy=\"230\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"187\" cy=\"227\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"220\" cy=\"230\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"217\" cy=\"227\" r=\"2.6\" fill=\"#FDE68A\"/>",
        pins: [
          { id: "ekam", num: 1, x: 300, y: 64, tx: 160, ty: 70 },
          { id: "dve", num: 2, x: 20, y: 104, tx: 145, ty: 110 },
          { id: "trini", num: 3, x: 300, y: 144, tx: 190, ty: 150 },
          { id: "catvari", num: 4, x: 20, y: 184, tx: 115, ty: 190 },
          { id: "panca", num: 5, x: 300, y: 224, tx: 220, ty: 230 }
        ]
      }
    ]
  },
  groups: [
    { titleRu: "Первые два числа", titleEn: "The First Two", wordIds: ["ekam", "dve"] },
    { titleRu: "От трёх до пяти", titleEn: "Three to Five", wordIds: ["trini", "catvari", "panca"] },
    { titleRu: "Нечётные", titleEn: "Odd", wordIds: ["ekam", "trini", "panca"] },
    { titleRu: "Чётные", titleEn: "Even", wordIds: ["dve", "catvari"] }
  ],
  categories: [
    { titleRu: "Чётные числа", titleEn: "Even Numbers", wordIds: ["dve", "catvari"] },
    { titleRu: "Нечётные числа", titleEn: "Odd Numbers", wordIds: ["ekam", "trini", "panca"] },
    { titleRu: "Больше двух", titleEn: "More Than Two", wordIds: ["trini", "catvari", "panca"] },
    { titleRu: "Меньше трёх", titleEn: "Less Than Three", wordIds: ["ekam", "dve"] },
    { titleRu: "Меньше четырёх", titleEn: "Less Than Four", wordIds: ["ekam", "dve", "trini"] },
    { titleRu: "Оканчиваются на «इ» (i)", titleEn: "Ending in \"i\" (इ)", wordIds: ["trini", "catvari"] },
    { titleRu: "С гласным знаком (ि, ी, ा, े)", titleEn: "With a Vowel Sign (ि, ी, ा, े)", wordIds: ["dve", "trini", "catvari"] },
    { titleRu: "Со слитным знаком ्", titleEn: "With a Conjunct (्)", wordIds: ["dve", "trini", "catvari", "panca"] },
    { titleRu: "Со звуком «च» (ca)", titleEn: "Containing \"च\" (ca)", wordIds: ["catvari", "panca"] },
    { titleRu: "Все, кроме «पञ्च»", titleEn: "Everything but \"पञ्च\"", wordIds: ["ekam", "dve", "trini", "catvari"] }
  ]
});
