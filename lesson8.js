/**
 * LESSON 10 · सङ्ख्याः · "Tens 10–50" (5 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * The same build as Lessons 4–7, for the tens 10–50:
 * - the counting forms: दश, विंशतिः, त्रिंशत्, चत्वारिंशत्, पञ्चाशत्
 * - past ten, quantity is shown by Arabic digits: beads cannot be counted at a glance
 * - the TPR gesture is one clap per ten, not a clap per unit
 * - IAST is hidden by default and can be switched on with the 🔤 button.
 * Data file for the generic engine in lesson-engine.js.
 */

SAL.registerLesson({
  key: "L8",
  num: 11,
  titleDeva: "सङ्ख्याः",
  titleRu: "Десятки 10–50",
  titleEn: "Tens 10–50",
  topicRu: "десять, двадцать, тридцать, сорок, пятьдесят",
  topicEn: "ten, twenty, thirty, forty, fifty",
  introRu: "Десятый урок: круглые десятки от десяти до пятидесяти — <code>दश</code>, <code>विंशतिः</code>, <code>त्रिंशत्</code>, <code>चत्वारिंशत्</code>, <code>पञ्चाशत्</code>. Обратите внимание на два разных конца: <code>-तिः</code> у двадцати и <code>-शत्</code> у тридцати, сорока и пятидесяти. Количество показывают арабские цифры: перевода по-прежнему нет.",
  introEn: "The tenth lesson: the tens from ten to fifty — <code>daśa</code>, <code>viṃśatiḥ</code>, <code>triṃśat</code>, <code>catvāriṃśat</code>, <code>pañcāśat</code>. Note the two different endings: <code>-tiḥ</code> for twenty and <code>-śat</code> for thirty, forty and fifty. Quantity is shown by Arabic digits: still no translation.",
  /* цели урока по схеме CELTA: главная цель — языковой материал, подцели — «другая половина» */
  aim: {
    ru: {
      main: "Ввести и отработать круглые десятки 10–50 в контексте счёта круглыми числами и уточнить окончания -तिः и -शत्.",
      subs: [
        "Уточнить два окончания: -तिः (विंशतिः) и -शत् (त्रिंशत्, चत्वारिंशत्, पञ्चाशत्).",
        "Поставить словесное ударение в длинных числительных.",
        "Повторить числительные 16–20 перед новым материалом."
      ]
    },
    en: {
      main: "To introduce and practise the tens 10–50 in the context of counting in round numbers, and to clarify the -तिः and -शत् endings.",
      subs: [
        "To clarify the two endings: -तिः (विंशतिः) and -शत् (त्रिंशत्, चत्वारिंशत्, पञ्चाशत्).",
        "To give practice in word stress in the longer numerals.",
        "To review the numerals 16–20 before the new set."
      ]
    }
  },
  gestureRu: "хлопните в ладоши столько раз, сколько десятков",
  gestureEn: "clap once for every ten",
  prodTitleRu: "Живая речь: назовите вслух все {n} числительных",
  prodTitleEn: "Freer Production: Say All {n} Numerals Aloud",
  words: [
    {
      id: "dasha", deva: "दश", iast: "daśa", ttsText: "दश", value: 10,
      syll: ["द", "श"],
      typoDeva: "दष", typoIast: "daṣa",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">10</text>\n    </svg>"
    },
    {
      id: "vimshati", deva: "विंशतिः", iast: "viṃśatiḥ", ttsText: "विंशतिः", value: 20,
      syll: ["विं", "श", "तिः"],
      typoDeva: "विंशतीः", typoIast: "viṃśatīḥ",
      maskedPrefix: "विं", maskedHidden: "शतिः",
      gapDeva: "विंश _", gapIast: "viṃś _", gapAnswer: "तिः",
      gapChoices: [
          { deva: "तिः", iast: "tiḥ" },
          { deva: "ति", iast: "ti" },
          { deva: "तीः", iast: "tīḥ" },
          { deva: "ती", iast: "tī" }
      ],
      missingDisplay: "विं _ तिः", missingAnswer: "श",
      missingChoices: ["श", "ष", "स", "ह"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">20</text>\n    </svg>"
    },
    {
      id: "trimshat", deva: "त्रिंशत्", iast: "triṃśat", ttsText: "त्रिंशत्", value: 30,
      syll: ["त्रिं", "शत्"],
      typoDeva: "त्रिशत्", typoIast: "triśat",
      maskedPrefix: "त्रिं", maskedHidden: "शत्",
      gapDeva: "त्रिं _", gapIast: "triṃ _", gapAnswer: "शत्",
      gapChoices: [
          { deva: "शत्", iast: "śat" },
          { deva: "षत्", iast: "ṣat" },
          { deva: "सत्", iast: "sat" },
          { deva: "शद्", iast: "śad" }
      ],
      missingDisplay: "त्रिंश _", missingAnswer: "त्",
      missingChoices: ["त्", "थ्", "द्", "ट्"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">30</text>\n    </svg>"
    },
    {
      id: "catvarimshat", deva: "चत्वारिंशत्", iast: "catvāriṃśat", ttsText: "चत्वारिंशत्", value: 40,
      syll: ["च", "त्वा", "रिं", "शत्"],
      typoDeva: "चत्वारिंसत्", typoIast: "catvāriṃsat",
      maskedPrefix: "चत्वारिं", maskedHidden: "शत्",
      gapDeva: "च _ रिंशत्", gapIast: "ca _ riṃśat", gapAnswer: "त्वा",
      gapChoices: [
          { deva: "त्वा", iast: "tvā" },
          { deva: "त्व", iast: "tva" },
          { deva: "त्या", iast: "tyā" },
          { deva: "थ्वा", iast: "thvā" }
      ],
      missingDisplay: "चत्वा _ शत्", missingAnswer: "रिं",
      missingChoices: ["रिं", "रि", "रीं", "लिं"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">40</text>\n    </svg>"
    },
    {
      id: "pancashat", deva: "पञ्चाशत्", iast: "pañcāśat", ttsText: "पञ्चाशत्", value: 50,
      syll: ["प", "ञ्चा", "शत्"],
      typoDeva: "पन्चाशत्", typoIast: "pancāśat",
      maskedPrefix: "पञ्चा", maskedHidden: "शत्",
      gapDeva: "प _ शत्", gapIast: "pa _ śat", gapAnswer: "ञ्चा",
      gapChoices: [
          { deva: "ञ्चा", iast: "ñcā" },
          { deva: "न्चा", iast: "ncā" },
          { deva: "ञ्छा", iast: "ñchā" },
          { deva: "ण्चा", iast: "ṇcā" }
      ],
      missingDisplay: "पञ्चा _", missingAnswer: "शत्",
      missingChoices: ["शत्", "षत्", "सत्", "शद्"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">50</text>\n    </svg>"
    }
  ],
  /* words for the 10 x 10 word grid: real Sanskrit, but never in this lesson */
  decoys: [
    "दस",
    "दष",
    "विंशतीः",
    "विंसतिः",
    "त्रिशत्",
    "त्रिंसत्",
    "चत्वारिंसत्",
    "चत्वारिशत्",
    "पन्चाशत्",
    "पञ्चासत्",
    "एकम्",
    "द्वे",
    "त्रीणि",
    "चत्वारि",
    "पञ्च",
    "षट्",
    "सप्त",
    "अष्ट",
    "नव",
    "षष्टिः",
    "सप्ततिः",
    "अशीतिः",
    "नवतिः",
    "शतम्",
    "शीर्ष",
    "हस्त",
    "पाद",
    "मुख",
    "जलम्",
    "फलम्",
    "गृहम्"
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
    { ru: 'Оканчиваются на «तिः» (-tiḥ)', en: 'Ending in "तिः" (-tiḥ)',
      test: function (w) { return /तिः$/.test(w.deva); } },
    { ru: 'Оканчиваются на «शत्» (-śat)', en: 'Ending in "शत्" (-śat)',
      test: function (w) { return /शत्$/.test(w.deva); } },
    { ru: 'Есть висарга ः (ḥ)', en: 'Has a visarga (ः)',
      test: function (w) { return w.deva.indexOf('ः') >= 0; } },
    { ru: 'Есть носовой ं (ṃ)', en: 'Has an anusvāra (ं)',
      test: function (w) { return w.deva.indexOf('ं') >= 0; } }
  ],
  steps: [
    { wordIds: ["dasha", "vimshati"] },
    { wordIds: ["trimshat", "catvarimshat"] },
    { wordIds: ["pancashat"] }
  ],
  hotspots: {
    figures: [
      {
        key: "chart",
        captionRu: "Таблица чисел: 10–50",
        captionEn: "Number Chart: 10–50",
        viewBox: "0 0 320 300",
        art: "<rect x=\"36\" y=\"16\" width=\"248\" height=\"268\" rx=\"16\" fill=\"#FFFBEB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <rect x=\"36\" y=\"16\" width=\"248\" height=\"30\" rx=\"16\" fill=\"#FDE68A\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M52 31H268\" stroke=\"#B45309\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"160\" y=\"70\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">10</text>\n  <text x=\"160\" y=\"110\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">20</text>\n  <text x=\"160\" y=\"150\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">30</text>\n  <text x=\"160\" y=\"190\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">40</text>\n  <text x=\"160\" y=\"230\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">50</text>",
        pins: [
          { id: "dasha", num: 1, x: 300, y: 64, tx: 160, ty: 70 },
          { id: "vimshati", num: 2, x: 20, y: 104, tx: 160, ty: 110 },
          { id: "trimshat", num: 3, x: 300, y: 144, tx: 160, ty: 150 },
          { id: "catvarimshat", num: 4, x: 20, y: 184, tx: 160, ty: 190 },
          { id: "pancashat", num: 5, x: 300, y: 224, tx: 160, ty: 230 }
        ]
      }
    ]
  },
  groups: [
    { titleRu: "Десять и двадцать", titleEn: "Ten and Twenty", wordIds: ["dasha", "vimshati"] },
    { titleRu: "Тридцать — пятьдесят", titleEn: "Thirty to Fifty", wordIds: ["trimshat", "catvarimshat", "pancashat"] },
    { titleRu: "Кратны двадцати", titleEn: "Multiples of Twenty", wordIds: ["vimshati", "catvarimshat"] },
    { titleRu: "Оканчиваются на «शत्»", titleEn: "Ending in «शत्»", wordIds: ["trimshat", "catvarimshat", "pancashat"] }
  ],
  categories: [
    { titleRu: "Больше двадцати", titleEn: "More Than Twenty", wordIds: ["trimshat", "catvarimshat", "pancashat"] },
    { titleRu: "Меньше тридцати", titleEn: "Less Than Thirty", wordIds: ["dasha", "vimshati"] },
    { titleRu: "Больше десяти", titleEn: "More Than Ten", wordIds: ["vimshati", "trimshat", "catvarimshat", "pancashat"] },
    { titleRu: "Меньше сорока", titleEn: "Less Than Forty", wordIds: ["dasha", "vimshati", "trimshat"] },
    { titleRu: "Больше тридцати", titleEn: "More Than Thirty", wordIds: ["catvarimshat", "pancashat"] },
    { titleRu: "Меньше пятидесяти", titleEn: "Less Than Fifty", wordIds: ["dasha", "vimshati", "trimshat", "catvarimshat"] },
    { titleRu: "С носовым ं (ṃ)", titleEn: "With an Anusvāra (ं)", wordIds: ["vimshati", "trimshat", "catvarimshat"] },
    { titleRu: "Без носового ं", titleEn: "Without an Anusvāra", wordIds: ["dasha", "pancashat"] },
    { titleRu: "Кратны двадцати", titleEn: "Multiples of Twenty", wordIds: ["vimshati", "catvarimshat"] },
    { titleRu: "Не кратны двадцати", titleEn: "Not Multiples of Twenty", wordIds: ["dasha", "trimshat", "pancashat"] }
  ]
});
