/**
 * LESSON 10 · सङ्ख्याः · "Tens 60–100" (5 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * The same build as Lessons 4–7, for the tens 60–100:
 * - the counting forms: षष्टिः, सप्ततिः, अशीतिः, नवतिः, शतम्
 * - past ten, quantity is shown by Arabic digits: beads cannot be counted at a glance
 * - the TPR gesture is one clap per ten, not a clap per unit
 * - IAST is hidden by default and can be switched on with the 🔤 button.
 * Data file for the generic engine in lesson-engine.js.
 */

SAL.registerLesson({
  key: "L9",
  num: 10,
  titleDeva: "सङ्ख्याः",
  titleRu: "Десятки 60–100",
  titleEn: "Tens 60–100",
  topicRu: "шестьдесят, семьдесят, восемьдесят, девяносто, сто",
  topicEn: "sixty, seventy, eighty, ninety, one hundred",
  introRu: "Десятый урок: десятки от шестидесяти до ста — <code>षष्टिः</code>, <code>सप्ततिः</code>, <code>अशीतिः</code>, <code>नवतिः</code>, <code>शतम्</code>. Четыре из них кончаются на <code>-तिः</code> с висаргой, а «сто» — слово среднего рода на <code>-म्</code>. Количество показывают арабские цифры: перевода по-прежнему нет.",
  introEn: "The tenth lesson: the tens from sixty to a hundred — <code>ṣaṣṭiḥ</code>, <code>saptatiḥ</code>, <code>aśītiḥ</code>, <code>navatiḥ</code>, <code>śatam</code>. Four of them end in <code>-tiḥ</code> with a visarga, while “hundred” is a neuter word in <code>-m</code>. Quantity is shown by Arabic digits: still no translation.",
  gestureRu: "хлопните в ладоши столько раз, сколько десятков",
  gestureEn: "clap once for every ten",
  prodTitleRu: "Живая речь: назовите вслух все {n} числительных",
  prodTitleEn: "Freer Production: Say All {n} Numerals Aloud",
  words: [
    {
      id: "shashti", deva: "षष्टिः", iast: "ṣaṣṭiḥ", ttsText: "षष्टिः",
      syll: ["ष", "ष्टिः"],
      typoDeva: "षष्ठिः", typoIast: "ṣaṣṭhiḥ",
      maskedPrefix: "ष", maskedHidden: "ष्टिः",
      gapDeva: "_ष्टिः", gapIast: "_ṣṭiḥ", gapAnswer: "ष",
      gapChoices: [
          { deva: "ष", iast: "ṣa" },
          { deva: "श", iast: "śa" },
          { deva: "स", iast: "sa" },
          { deva: "क्ष", iast: "kṣa" }
      ],
      missingDisplay: "ष _ टिः", missingAnswer: "ष्",
      missingChoices: ["ष्", "श्", "स्", "ष"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">60</text>\n    </svg>"
    },
    {
      id: "saptati", deva: "सप्ततिः", iast: "saptatiḥ", ttsText: "सप्ततिः",
      syll: ["सप्त", "तिः"],
      typoDeva: "सप्तति", typoIast: "saptati",
      maskedPrefix: "सप्त", maskedHidden: "तिः",
      gapDeva: "सप्त _", gapIast: "sapta _", gapAnswer: "तिः",
      gapChoices: [
          { deva: "तिः", iast: "tiḥ" },
          { deva: "ति", iast: "ti" },
          { deva: "तीः", iast: "tīḥ" },
          { deva: "थिः", iast: "thiḥ" }
      ],
      missingDisplay: "_प्ततिः", missingAnswer: "स",
      missingChoices: ["स", "श", "ष", "ह"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">70</text>\n    </svg>"
    },
    {
      id: "ashiti", deva: "अशीतिः", iast: "aśītiḥ", ttsText: "अशीतिः",
      syll: ["अ", "शी", "तिः"],
      typoDeva: "अषीतिः", typoIast: "aṣītiḥ",
      maskedPrefix: "अशी", maskedHidden: "तिः",
      gapDeva: "_शीतिः", gapIast: "_śītiḥ", gapAnswer: "अ",
      gapChoices: [
          { deva: "अ", iast: "a" },
          { deva: "आ", iast: "ā" },
          { deva: "उ", iast: "u" },
          { deva: "इ", iast: "i" }
      ],
      missingDisplay: "अशी _", missingAnswer: "तिः",
      missingChoices: ["तिः", "ति", "तीः", "थिः"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">80</text>\n    </svg>"
    },
    {
      id: "navati", deva: "नवतिः", iast: "navatiḥ", ttsText: "नवतिः",
      syll: ["नव", "तिः"],
      typoDeva: "नवतीः", typoIast: "navatīḥ",
      maskedPrefix: "नव", maskedHidden: "तिः",
      gapDeva: "न _ तिः", gapIast: "na _ tiḥ", gapAnswer: "व",
      gapChoices: [
          { deva: "व", iast: "va" },
          { deva: "ब", iast: "ba" },
          { deva: "य", iast: "ya" },
          { deva: "र", iast: "ra" }
      ],
      missingDisplay: "नवति _", missingAnswer: "ः",
      missingChoices: ["ः", "ं", "ँ", "ऽ"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">90</text>\n    </svg>"
    },
    {
      id: "shatam", deva: "शतम्", iast: "śatam", ttsText: "शतम्",
      syll: ["श", "त", "म्"],
      typoDeva: "षतम्", typoIast: "ṣatam",
      maskedPrefix: "श", maskedHidden: "तम्",
      gapDeva: "_तम्", gapIast: "_tam", gapAnswer: "श",
      gapChoices: [
          { deva: "श", iast: "śa" },
          { deva: "ष", iast: "ṣa" },
          { deva: "स", iast: "sa" },
          { deva: "ह", iast: "ha" }
      ],
      missingDisplay: "शत _", missingAnswer: "म्",
      missingChoices: ["म्", "म", "न्", "व्"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"38\" font-weight=\"700\" fill=\"#14213D\">100</text>\n    </svg>"
    }
  ],
  /* words for the 10 x 10 word grid: real Sanskrit, but never in this lesson */
  decoys: [
    "षष्ठिः",
    "सष्टिः",
    "षष्टि",
    "सप्तति",
    "सप्ततीः",
    "सप्तत",
    "अषीतिः",
    "अशीति",
    "नवतीः",
    "नवति",
    "षतम्",
    "शत",
    "एकम्",
    "द्वे",
    "त्रीणि",
    "चत्वारि",
    "पञ्च",
    "षट्",
    "सप्त",
    "अष्ट",
    "नव",
    "दश",
    "विंशतिः",
    "त्रिंशत्",
    "पञ्चाशत्",
    "शीर्ष",
    "हस्त",
    "पाद",
    "मुख",
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
    { ru: 'Есть висарга ः (ḥ)', en: 'Has a visarga (ः)',
      test: function (w) { return w.deva.indexOf('ः') >= 0; } },
    { ru: 'Оканчиваются на «म्» (-m)', en: 'Ending in "म्" (-m)',
      test: function (w) { return /म्$/.test(w.deva); } },
    { ru: 'Есть буква «ष» (ṣa)', en: 'Contains "ष" (ṣa)',
      test: function (w) { return w.deva.indexOf('ष') >= 0; } },
    { ru: 'Начинается с гласной «अ»', en: 'Starts with the vowel "अ"',
      test: function (w) { return w.deva.charAt(0) === 'अ'; } }
  ],
  steps: [
    { wordIds: ["shashti", "saptati"] },
    { wordIds: ["ashiti", "navati"] },
    { wordIds: ["shatam"] }
  ],
  hotspots: {
    figures: [
      {
        key: "chart",
        captionRu: "Таблица чисел: 60–100",
        captionEn: "Number Chart: 60–100",
        viewBox: "0 0 320 300",
        art: "<rect x=\"36\" y=\"16\" width=\"248\" height=\"268\" rx=\"16\" fill=\"#FFFBEB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <rect x=\"36\" y=\"16\" width=\"248\" height=\"30\" rx=\"16\" fill=\"#FDE68A\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M52 31H268\" stroke=\"#B45309\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"160\" y=\"70\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">60</text>\n  <text x=\"160\" y=\"110\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">70</text>\n  <text x=\"160\" y=\"150\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">80</text>\n  <text x=\"160\" y=\"190\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">90</text>\n  <text x=\"160\" y=\"230\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">100</text>",
        pins: [
          { id: "shashti", num: 1, x: 300, y: 64, tx: 160, ty: 70 },
          { id: "saptati", num: 2, x: 20, y: 104, tx: 160, ty: 110 },
          { id: "ashiti", num: 3, x: 300, y: 144, tx: 160, ty: 150 },
          { id: "navati", num: 4, x: 20, y: 184, tx: 160, ty: 190 },
          { id: "shatam", num: 5, x: 300, y: 224, tx: 160, ty: 230 }
        ]
      }
    ]
  },
  groups: [
    { titleRu: "Шестьдесят и семьдесят", titleEn: "Sixty and Seventy", wordIds: ["shashti", "saptati"] },
    { titleRu: "Восемьдесят — сто", titleEn: "Eighty to a Hundred", wordIds: ["ashiti", "navati", "shatam"] },
    { titleRu: "Кратны двадцати", titleEn: "Multiples of Twenty", wordIds: ["shashti", "ashiti", "shatam"] },
    { titleRu: "Оканчиваются на «तिः»", titleEn: "Ending in «तिः»", wordIds: ["shashti", "saptati", "ashiti", "navati"] }
  ],
  categories: [
    { titleRu: "Больше семидесяти", titleEn: "More Than Seventy", wordIds: ["ashiti", "navati", "shatam"] },
    { titleRu: "Меньше восьмидесяти", titleEn: "Less Than Eighty", wordIds: ["shashti", "saptati"] },
    { titleRu: "Больше шестидесяти", titleEn: "More Than Sixty", wordIds: ["saptati", "ashiti", "navati", "shatam"] },
    { titleRu: "Меньше девяноста", titleEn: "Less Than Ninety", wordIds: ["shashti", "saptati", "ashiti"] },
    { titleRu: "Больше восьмидесяти", titleEn: "More Than Eighty", wordIds: ["navati", "shatam"] },
    { titleRu: "Меньше ста", titleEn: "Less Than a Hundred", wordIds: ["shashti", "saptati", "ashiti", "navati"] },
    { titleRu: "Начинаются с согласной", titleEn: "Starting with a Consonant", wordIds: ["shashti", "saptati", "navati", "shatam"] },
    { titleRu: "Кратны тридцати", titleEn: "Multiples of Thirty", wordIds: ["shashti", "navati"] },
    { titleRu: "Кратны двадцати", titleEn: "Multiples of Twenty", wordIds: ["shashti", "ashiti", "shatam"] },
    { titleRu: "Не кратны двадцати", titleEn: "Not Multiples of Twenty", wordIds: ["saptati", "navati"] }
  ]
});
