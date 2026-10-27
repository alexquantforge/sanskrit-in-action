/**
 * LESSON 8 · सङ्ख्याः · "Numbers 11–15" (5 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * The same build as Lessons 4 and 5, for the numerals 11–15:
 * - the counting forms (neuter nominative-accusative): एकादश, द्वादश, त्रयोदश, चतुर्दश, पञ्चदश
 * - past ten, quantity is shown by Arabic digits: beads cannot be counted at a glance
 * - the TPR gesture is clapping, not touching a body part
 * - IAST is hidden by default and can be switched on with the 🔤 button.
 * Data file for the generic engine in lesson-engine.js.
 */

SAL.registerLesson({
  key: "L6",
  num: 9,
  titleDeva: "सङ्ख्याः",
  titleRu: "Цифры 11–15",
  titleEn: "Numbers 11–15",
  topicRu: "одиннадцать, двенадцать, тринадцать, четырнадцать, пятнадцать",
  topicEn: "eleven, twelve, thirteen, fourteen, fifteen",
  introRu: "Восьмой урок: числа от одиннадцати до пятнадцати — <code>एकादश</code>, <code>द्वादश</code>, <code>त्रयोदश</code>, <code>चतुर्दश</code>, <code>पञ्चदश</code>. Все они построены на <code>दश</code> «десять»: к основе первого числа прибавляется «десять». Количество показывают арабские цифры: больше десяти бусины уже не сосчитать на глаз. Перевода по-прежнему нет.",
  introEn: "The eighth lesson: eleven to fifteen — <code>ekādaśa</code>, <code>dvādaśa</code>, <code>trayodaśa</code>, <code>caturdaśa</code>, <code>pañcadaśa</code>. They are all built on <code>daśa</code> “ten”: the stem of the first number plus “ten”. Quantity is shown by Arabic digits: past ten, beads can no longer be counted at a glance. Still no translation.",
  /* цели урока по схеме CELTA: главная цель — языковой материал, подцели — «другая половина» */
  aim: {
    ru: {
      main: "Ввести и отработать числительные 11–15 в контексте счёта предметов и уточнить модель -दश, по которой образуются эти числа.",
      subs: [
        "Уточнить словообразование: основа первого числа плюс दश.",
        "Поставить произношение दश внутри сложного слова.",
        "Повторить числительные 6–10 перед новым материалом."
      ]
    },
    en: {
      main: "To introduce and practise the numerals 11–15 in the context of counting everyday objects, and to clarify the -दश pattern used to form the teens.",
      subs: [
        "To clarify the word-formation pattern: the stem of the first number plus दश.",
        "To give practice in the pronunciation of दश inside a compound.",
        "To review the numerals 6–10 before the new set."
      ]
    }
  },
  gestureRu: "хлопните в ладоши столько раз",
  gestureEn: "clap your hands that many times",
  prodTitleRu: "Живая речь: назовите вслух все {n} числительных",
  prodTitleEn: "Freer Production: Say All {n} Numerals Aloud",
  words: [
    {
      id: "ekadasa", deva: "एकादश", iast: "ekādaśa", ttsText: "एकादश", value: 11,
      syll: ["एका", "द", "श"],
      typoDeva: "ऐकादश", typoIast: "aikādaśa",
      maskedPrefix: "एका", maskedHidden: "दश",
      gapDeva: "_कादश", gapIast: "_kādaśa", gapAnswer: "ए",
      gapChoices: [
          { deva: "ए", iast: "e" },
          { deva: "ऐ", iast: "ai" },
          { deva: "ओ", iast: "o" },
          { deva: "अ", iast: "a" }
      ],
      missingDisplay: "एका _", missingAnswer: "दश",
      missingChoices: ["दश", "दस", "धश", "दष"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">11</text>\n    </svg>"
    },
    {
      id: "dvadasa", deva: "द्वादश", iast: "dvādaśa", ttsText: "द्वादश", value: 12,
      syll: ["द्वा", "द", "श"],
      typoDeva: "द्वादस", typoIast: "dvādasa",
      maskedPrefix: "द्वा", maskedHidden: "दश",
      gapDeva: "द्वाद _", gapIast: "dvād _", gapAnswer: "श",
      gapChoices: [
          { deva: "श", iast: "śa" },
          { deva: "ष", iast: "ṣa" },
          { deva: "स", iast: "sa" },
          { deva: "ह", iast: "ha" }
      ],
      missingDisplay: "_दश", missingAnswer: "द्वा",
      missingChoices: ["द्वा", "ध्वा", "त्वा", "द्व"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">12</text>\n    </svg>"
    },
    {
      id: "trayodasa", deva: "त्रयोदश", iast: "trayodaśa", ttsText: "त्रयोदश", value: 13,
      syll: ["त्र", "यो", "द", "श"],
      typoDeva: "त्रयादश", typoIast: "trayādaśa",
      maskedPrefix: "त्रयो", maskedHidden: "दश",
      gapDeva: "त्रयो _ श", gapIast: "trayo _ śa", gapAnswer: "द",
      gapChoices: [
          { deva: "द", iast: "da" },
          { deva: "ध", iast: "dha" },
          { deva: "ड", iast: "ḍa" },
          { deva: "त", iast: "ta" }
      ],
      missingDisplay: "त्रयो _", missingAnswer: "दश",
      missingChoices: ["दश", "दस", "दष", "धश"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">13</text>\n    </svg>"
    },
    {
      id: "caturdasa", deva: "चतुर्दश", iast: "caturdaśa", ttsText: "चतुर्दश", value: 14,
      syll: ["चतुर्", "द", "श"],
      typoDeva: "चतूर्दश", typoIast: "catūrdaśa",
      maskedPrefix: "चतुर्", maskedHidden: "दश",
      gapDeva: "च _ र्दश", gapIast: "ca _ rdaśa", gapAnswer: "तु",
      gapChoices: [
          { deva: "तु", iast: "tu" },
          { deva: "तू", iast: "tū" },
          { deva: "त", iast: "ta" },
          { deva: "थु", iast: "thu" }
      ],
      missingDisplay: "चतु _ श", missingAnswer: "र्द",
      missingChoices: ["र्द", "र्ध", "द्र", "र्ड"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">14</text>\n    </svg>"
    },
    {
      id: "pancadasa", deva: "पञ्चदश", iast: "pañcadaśa", ttsText: "पञ्चदश", value: 15,
      syll: ["पञ्च", "द", "श"],
      typoDeva: "पन्चदश", typoIast: "pañcadaśa",
      maskedPrefix: "पञ्च", maskedHidden: "दश",
      gapDeva: "प _ दश", gapIast: "pa _ daśa", gapAnswer: "ञ्च",
      gapChoices: [
          { deva: "ञ्च", iast: "ñca" },
          { deva: "न्च", iast: "nca" },
          { deva: "ञ्छ", iast: "ñcha" },
          { deva: "ण्च", iast: "ṇca" }
      ],
      missingDisplay: "पञ्च _", missingAnswer: "दश",
      missingChoices: ["दश", "दस", "धश", "दष"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">15</text>\n    </svg>"
    }
  ],
  /* words for the 10 x 10 word grid: real Sanskrit, but never in this lesson */
  decoys: [
    "ऐकादश",
    "एकादस",
    "द्वादस",
    "ध्वादश",
    "त्रयादश",
    "त्रयोदस",
    "चतूर्दश",
    "चतुर्दस",
    "पन्चदश",
    "पञ्चदस",
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
    "षोडश",
    "सप्तदश",
    "अष्टादश",
    "नवदश",
    "विंशतिः",
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
    { ru: 'Есть долгий «आ» (ा)', en: 'Has a long "आ" (ा)',
      test: function (w) { return w.deva.indexOf('ा') >= 0; } },
    { ru: 'Есть носовой (ञ / ण / न / म)', en: 'Has a nasal (ञ / ण / न / म)',
      test: function (w) { return /[ञणनम]/.test(w.deva); } },
    { ru: 'Начинается с гласной «ए»', en: 'Starts with the vowel "ए"',
      test: function (w) { return w.deva.charAt(0) === 'ए'; } },
    { ru: 'Есть знак ् (вирама)', en: 'Has a virāma (्)',
      test: function (w) { return w.deva.indexOf('्') >= 0; } }
  ],
  steps: [
    { wordIds: ["ekadasa", "dvadasa"] },
    { wordIds: ["trayodasa", "caturdasa"] },
    { wordIds: ["pancadasa"] }
  ],
  hotspots: {
    figures: [
      {
        key: "frame",
        captionRu: "Таблица чисел: 11–15",
        captionEn: "Number Chart: 11–15",
        viewBox: "0 0 320 300",
        art: "<rect x=\"36\" y=\"16\" width=\"248\" height=\"268\" rx=\"16\" fill=\"#FFFBEB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <rect x=\"36\" y=\"16\" width=\"248\" height=\"30\" rx=\"16\" fill=\"#FDE68A\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M52 31H268\" stroke=\"#B45309\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"160\" y=\"70\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">11</text>\n  <text x=\"160\" y=\"110\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">12</text>\n  <text x=\"160\" y=\"150\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">13</text>\n  <text x=\"160\" y=\"190\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">14</text>\n  <text x=\"160\" y=\"230\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">15</text>",
        pins: [
          { id: "ekadasa", num: 1, x: 300, y: 64, tx: 160, ty: 70 },
          { id: "dvadasa", num: 2, x: 20, y: 104, tx: 160, ty: 110 },
          { id: "trayodasa", num: 3, x: 300, y: 144, tx: 160, ty: 150 },
          { id: "caturdasa", num: 4, x: 20, y: 184, tx: 160, ty: 190 },
          { id: "pancadasa", num: 5, x: 300, y: 224, tx: 160, ty: 230 }
        ]
      }
    ]
  },
  groups: [
    { titleRu: "Одиннадцать и двенадцать", titleEn: "Eleven and Twelve", wordIds: ["ekadasa", "dvadasa"] },
    { titleRu: "Тринадцать — пятнадцать", titleEn: "Thirteen to Fifteen", wordIds: ["trayodasa", "caturdasa", "pancadasa"] },
    { titleRu: "Чётные", titleEn: "Even", wordIds: ["dvadasa", "caturdasa"] },
    { titleRu: "Нечётные", titleEn: "Odd", wordIds: ["ekadasa", "trayodasa", "pancadasa"] }
  ],
  categories: [
    { titleRu: "Чётные числа", titleEn: "Even Numbers", wordIds: ["dvadasa", "caturdasa"] },
    { titleRu: "Нечётные числа", titleEn: "Odd Numbers", wordIds: ["ekadasa", "trayodasa", "pancadasa"] },
    { titleRu: "Больше двенадцати", titleEn: "More Than Twelve", wordIds: ["trayodasa", "caturdasa", "pancadasa"] },
    { titleRu: "Меньше тринадцати", titleEn: "Less Than Thirteen", wordIds: ["ekadasa", "dvadasa"] },
    { titleRu: "Больше одиннадцати", titleEn: "More Than Eleven", wordIds: ["dvadasa", "trayodasa", "caturdasa", "pancadasa"] },
    { titleRu: "Меньше пятнадцати", titleEn: "Less Than Fifteen", wordIds: ["ekadasa", "dvadasa", "trayodasa", "caturdasa"] },
    { titleRu: "От двенадцати до четырнадцати", titleEn: "Twelve to Fourteen", wordIds: ["dvadasa", "trayodasa", "caturdasa"] },
    { titleRu: "Одиннадцать или пятнадцать", titleEn: "Eleven or Fifteen", wordIds: ["ekadasa", "pancadasa"] },
    { titleRu: "Все, кроме тринадцати", titleEn: "Everything but Thirteen", wordIds: ["ekadasa", "dvadasa", "caturdasa", "pancadasa"] },
    { titleRu: "Без знака ्", titleEn: "Without a Virāma", wordIds: ["ekadasa", "dvadasa", "trayodasa", "pancadasa"] }
  ]
});
