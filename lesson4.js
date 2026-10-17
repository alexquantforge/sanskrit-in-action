/**
 * LESSON 4 · सङ्ख्याः · "Numbers 1–5" (5 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * Same exercise set as Lesson 2 (Face), built for the first five Sanskrit numerals:
 * - pure stems (no case endings, no gender): एक, द्वि, त्रि, चतुर्, पञ्चन्
 * - no Arabic digits on the cards: quantity is shown only by beads (Direct Method)
 * - the TPR gesture here is clapping, not touching a body part
 * - IAST is hidden by default and can be switched on with the 🔤 button.
 * Data file for the generic engine in lesson-engine.js.
 */

SAL.registerLesson({
  key: "L4",
  num: 4,
  titleDeva: "सङ्ख्याः",
  titleRu: "Цифры 1–5",
  titleEn: "Numbers 1–5",
  topicRu: "один, два, три, четыре, пять",
  topicEn: "one, two, three, four, five",
  introRu: "Четвёртый урок: пять первых санскритских числительных — чистые основы (<code>एक</code>, <code>द्वि</code>, <code>त्रि</code>, <code>चतुर्</code>, <code>पञ्चन्</code>). Количество показывают только бусины на картинке: ни арабских цифр, ни перевода. Считая вслух, санскрит использует формы <code>एकम्</code>, <code>द्वे</code>, <code>त्रीणि</code>, <code>चत्वारि</code>, <code>पञ्च</code> — но сначала учим саму основу слова.",
  introEn: "The fourth lesson: the first five Sanskrit numerals as pure stems (<code>एक</code>, <code>द्वि</code>, <code>त्रि</code>, <code>चतुर्</code>, <code>पञ्चन्</code>). Quantity is shown only by beads in the picture: no Arabic digits, no translation. When counting aloud Sanskrit uses the forms <code>ekam</code>, <code>dve</code>, <code>trīṇi</code>, <code>catvāri</code>, <code>pañca</code> — but first we learn the stem itself.",
  gestureRu: "хлопните в ладоши столько раз",
  gestureEn: "clap your hands that many times",
  words: [
    {
      id: "eka", deva: "एक", iast: "eka", ttsText: "एक",
      typoDeva: "ऐक", typoIast: "aika",
      maskedPrefix: "ए", maskedHidden: "क",
      gapDeva: "_क", gapIast: "_ka", gapAnswer: "ए",
      gapChoices: [
        { deva: "ए", iast: "e" },
        { deva: "ऐ", iast: "ai" },
        { deva: "ओ", iast: "o" },
        { deva: "अ", iast: "a" }
      ],
      missingDisplay: "ए _", missingAnswer: "क",
      missingChoices: ["क", "ख", "ग", "च"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"50\" cy=\"52\" r=\"13\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.8\"/>\n      <circle cx=\"46\" cy=\"48\" r=\"3.2\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "dvi", deva: "द्वि", iast: "dvi", ttsText: "द्वि",
      typoDeva: "द्वी", typoIast: "dvī",
      maskedPrefix: "द्व", maskedHidden: "ि",
      gapDeva: "_ि", gapIast: "_i", gapAnswer: "द्व",
      gapChoices: [
        { deva: "द्व", iast: "dvi" },
        { deva: "ध्व", iast: "dhvi" },
        { deva: "त्व", iast: "tvi" },
        { deva: "थ्व", iast: "thvi" }
      ],
      missingDisplay: "द् _", missingAnswer: "वि",
      missingChoices: ["वि", "वी", "बि", "व"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"33\" cy=\"52\" r=\"13\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.8\"/>\n      <circle cx=\"29\" cy=\"48\" r=\"3.2\" fill=\"#FDE68A\"/>\n      <circle cx=\"67\" cy=\"52\" r=\"13\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.8\"/>\n      <circle cx=\"63\" cy=\"48\" r=\"3.2\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "tri", deva: "त्रि", iast: "tri", ttsText: "त्रि",
      typoDeva: "त्री", typoIast: "trī",
      maskedPrefix: "त्र", maskedHidden: "ि",
      gapDeva: "_ि", gapIast: "_i", gapAnswer: "त्र",
      gapChoices: [
        { deva: "त्र", iast: "tri" },
        { deva: "ध्र", iast: "dhri" },
        { deva: "थ्र", iast: "thri" },
        { deva: "द्र", iast: "dri" }
      ],
      missingDisplay: "त् _", missingAnswer: "रि",
      missingChoices: ["रि", "री", "लि", "र"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"25\" cy=\"52\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"21\" cy=\"48\" r=\"3\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"52\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"46\" cy=\"48\" r=\"3\" fill=\"#FDE68A\"/>\n      <circle cx=\"75\" cy=\"52\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"71\" cy=\"48\" r=\"3\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "catur", deva: "चतुर्", iast: "catur", ttsText: "चतुर्",
      typoDeva: "चतूर्", typoIast: "catūr",
      maskedPrefix: "चतु", maskedHidden: "र्",
      gapDeva: "च_ुर्", gapIast: "ca_ur", gapAnswer: "त",
      gapChoices: [
        { deva: "त", iast: "ta" },
        { deva: "ट", iast: "ṭa" },
        { deva: "थ", iast: "tha" },
        { deva: "द", iast: "da" }
      ],
      missingDisplay: "च _ ुर्", missingAnswer: "त",
      missingChoices: ["त", "ट", "थ", "द"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"34\" cy=\"37\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"30\" cy=\"33\" r=\"3\" fill=\"#FDE68A\"/>\n      <circle cx=\"66\" cy=\"37\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"62\" cy=\"33\" r=\"3\" fill=\"#FDE68A\"/>\n      <circle cx=\"34\" cy=\"67\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"30\" cy=\"63\" r=\"3\" fill=\"#FDE68A\"/>\n      <circle cx=\"66\" cy=\"67\" r=\"12\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.6\"/>\n      <circle cx=\"62\" cy=\"63\" r=\"3\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "pancan", deva: "पञ्चन्", iast: "pañcan", ttsText: "पञ्चन्",
      typoDeva: "पञ्चान्", typoIast: "pañcān",
      maskedPrefix: "पञ्च", maskedHidden: "न्",
      gapDeva: "प_्चन्", gapIast: "pa_ñcan", gapAnswer: "ञ",
      gapChoices: [
        { deva: "ञ", iast: "ña" },
        { deva: "न", iast: "na" },
        { deva: "ण", iast: "ṇa" },
        { deva: "म", iast: "ma" }
      ],
      missingDisplay: "प _ चन्", missingAnswer: "ञ",
      missingChoices: ["ञ", "न", "ण", "म"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"30\" cy=\"32\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"27\" cy=\"29\" r=\"2.6\" fill=\"#FDE68A\"/>\n      <circle cx=\"70\" cy=\"32\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"67\" cy=\"29\" r=\"2.6\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"50\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"47\" cy=\"47\" r=\"2.6\" fill=\"#FDE68A\"/>\n      <circle cx=\"30\" cy=\"68\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"27\" cy=\"65\" r=\"2.6\" fill=\"#FDE68A\"/>\n      <circle cx=\"70\" cy=\"68\" r=\"10.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n      <circle cx=\"67\" cy=\"65\" r=\"2.6\" fill=\"#FDE68A\"/>\n    </svg>"
    }
  ],
  steps: [
    { wordIds: ["eka", "dvi"] },
    { wordIds: ["tri", "catur"] },
    { wordIds: ["pancan"] }
  ],
  hotspots: {
    figures: [
      {
        key: "frame",
        captionRu: "Счёты: 1–5 бусин (1–5)",
        captionEn: "Counting Frame: 1–5 Beads (1–5)",
        viewBox: "0 0 320 300",
        art: "<rect x=\"36\" y=\"16\" width=\"248\" height=\"268\" rx=\"16\" fill=\"#FFFBEB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <rect x=\"36\" y=\"16\" width=\"248\" height=\"30\" rx=\"16\" fill=\"#FDE68A\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M52 31H268\" stroke=\"#B45309\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <line x1=\"52\" y1=\"70\" x2=\"268\" y2=\"70\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"160\" cy=\"70\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"157\" cy=\"67\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"110\" x2=\"268\" y2=\"110\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"145\" cy=\"110\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"142\" cy=\"107\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"175\" cy=\"110\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"172\" cy=\"107\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"150\" x2=\"268\" y2=\"150\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"130\" cy=\"150\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"127\" cy=\"147\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"160\" cy=\"150\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"157\" cy=\"147\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"190\" cy=\"150\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"187\" cy=\"147\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"190\" x2=\"268\" y2=\"190\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"115\" cy=\"190\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"112\" cy=\"187\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"145\" cy=\"190\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"142\" cy=\"187\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"175\" cy=\"190\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"172\" cy=\"187\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"205\" cy=\"190\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"202\" cy=\"187\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"230\" x2=\"268\" y2=\"230\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"100\" cy=\"230\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"97\" cy=\"227\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"130\" cy=\"230\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"127\" cy=\"227\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"160\" cy=\"230\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"157\" cy=\"227\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"190\" cy=\"230\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"187\" cy=\"227\" r=\"2.6\" fill=\"#FDE68A\"/>\n  <circle cx=\"220\" cy=\"230\" r=\"10\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.4\"/>\n  <circle cx=\"217\" cy=\"227\" r=\"2.6\" fill=\"#FDE68A\"/>",
        pins: [
          { id: "eka", num: 1, x: 300, y: 64, tx: 160, ty: 70 },
          { id: "dvi", num: 2, x: 20, y: 104, tx: 145, ty: 110 },
          { id: "tri", num: 3, x: 300, y: 144, tx: 190, ty: 150 },
          { id: "catur", num: 4, x: 20, y: 184, tx: 115, ty: 190 },
          { id: "pancan", num: 5, x: 300, y: 224, tx: 220, ty: 230 }
        ]
      }
    ]
  },
  groups: [
    { titleRu: "Первые два числа", titleEn: "The First Two", wordIds: ["eka", "dvi"] },
    { titleRu: "От трёх до пяти", titleEn: "Three to Five", wordIds: ["tri", "catur", "pancan"] },
    { titleRu: "Нечётные", titleEn: "Odd", wordIds: ["eka", "tri", "pancan"] },
    { titleRu: "Чётные", titleEn: "Even", wordIds: ["dvi", "catur"] }
  ],
  categories: [
    { titleRu: "Чётные числа", titleEn: "Even Numbers", wordIds: ["dvi", "catur"] },
    { titleRu: "Нечётные числа", titleEn: "Odd Numbers", wordIds: ["eka", "tri", "pancan"] },
    { titleRu: "Больше двух", titleEn: "More Than Two", wordIds: ["tri", "catur", "pancan"] },
    { titleRu: "Меньше трёх", titleEn: "Less Than Three", wordIds: ["eka", "dvi"] },
    { titleRu: "Один слог", titleEn: "One Syllable", wordIds: ["dvi", "tri"] },
    { titleRu: "Два слога", titleEn: "Two Syllables", wordIds: ["eka", "catur", "pancan"] },
    { titleRu: "Со звуком «च» (ca)", titleEn: "Containing \"च\" (ca)", wordIds: ["catur", "pancan"] },
    { titleRu: "Со звуком «र» (ra)", titleEn: "Containing \"र\" (ra)", wordIds: ["tri", "catur"] },
    { titleRu: "Оканчиваются на согласную", titleEn: "Ending on a Consonant", wordIds: ["catur", "pancan"] },
    { titleRu: "Все, кроме «एक»", titleEn: "Everything but \"एक\"", wordIds: ["dvi", "tri", "catur", "pancan"] }
  ]
});
