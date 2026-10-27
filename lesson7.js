/**
 * LESSON 9 · सङ्ख्याः · "Numbers 16–20" (5 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * The same build as Lessons 4 and 5, for the numerals 16–20:
 * - the counting forms (neuter nominative-accusative): षोडश, सप्तदश, अष्टादश, नवदश, विंशतिः
 * - past ten, quantity is shown by Arabic digits: beads cannot be counted at a glance
 * - the TPR gesture is clapping, not touching a body part
 * - IAST is hidden by default and can be switched on with the 🔤 button.
 * Data file for the generic engine in lesson-engine.js.
 */

SAL.registerLesson({
  key: "L7",
  num: 10,
  titleDeva: "सङ्ख्याः",
  titleRu: "Цифры 16–20",
  titleEn: "Numbers 16–20",
  topicRu: "шестнадцать, семнадцать, восемнадцать, девятнадцать, двадцать",
  topicEn: "sixteen, seventeen, eighteen, nineteen, twenty",
  introRu: "Девятый урок: числа от шестнадцати до двадцати — <code>षोडश</code>, <code>सप्तदश</code>, <code>अष्टादश</code>, <code>नवदश</code>, <code>विंशतिः</code>. Первые четыре тоже построены на <code>दश</code>, а «двадцать» — уже отдельное слово с висаргой на конце. Количество показывают арабские цифры: больше десяти бусины уже не сосчитать на глаз. Перевода по-прежнему нет.",
  introEn: "The ninth lesson: sixteen to twenty — <code>ṣoḍaśa</code>, <code>saptadaśa</code>, <code>aṣṭādaśa</code>, <code>navadaśa</code>, <code>viṃśatiḥ</code>. The first four are still built on <code>daśa</code>, while “twenty” is a separate word ending in a visarga. Quantity is shown by Arabic digits: past ten, beads can no longer be counted at a glance. Still no translation.",
  /* цели урока по схеме CELTA: главная цель — языковой материал, подцели — «другая половина» */
  aim: {
    ru: {
      main: "Ввести и отработать числительные 16–20 в контексте счёта предметов и уточнить षोडश и विंशतिः с висаргой.",
      subs: [
        "Уточнить нерегулярное षोडश на фоне обычной модели с -दश.",
        "Поставить произношение конечной висарги в विंशतिः.",
        "Повторить числительные 11–15 перед новым материалом."
      ]
    },
    en: {
      main: "To introduce and practise the numerals 16–20 in the context of counting everyday objects, and to clarify षोडश and विंशतिः with its visarga.",
      subs: [
        "To clarify the irregular षोडश against the regular -दश pattern.",
        "To give practice in the pronunciation of the final visarga in विंशतिः.",
        "To review the numerals 11–15 before the new set."
      ]
    }
  },
  gestureRu: "хлопните в ладоши столько раз",
  gestureEn: "clap your hands that many times",
  prodTitleRu: "Живая речь: назовите вслух все {n} числительных",
  prodTitleEn: "Freer Production: Say All {n} Numerals Aloud",
  words: [
    {
      id: "shodasa", deva: "षोडश", iast: "ṣoḍaśa", ttsText: "षोडश", value: 16,
      syll: ["षो", "ड", "श"],
      typoDeva: "सोडश", typoIast: "soḍaśa",
      maskedPrefix: "षो", maskedHidden: "डश",
      gapDeva: "_ोडश", gapIast: "_oḍaśa", gapAnswer: "ष",
      gapChoices: [
          { deva: "ष", iast: "ṣa" },
          { deva: "श", iast: "śa" },
          { deva: "स", iast: "sa" },
          { deva: "क्ष", iast: "kṣa" }
      ],
      missingDisplay: "षो _ श", missingAnswer: "ड",
      missingChoices: ["ड", "ढ", "द", "ट"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">16</text>\n    </svg>"
    },
    {
      id: "saptadasa", deva: "सप्तदश", iast: "saptadaśa", ttsText: "सप्तदश", value: 17,
      syll: ["सप्त", "द", "श"],
      typoDeva: "सपतदश", typoIast: "sapatadaśa",
      maskedPrefix: "सप्त", maskedHidden: "दश",
      gapDeva: "सप्त _ श", gapIast: "sapta _ śa", gapAnswer: "द",
      gapChoices: [
          { deva: "द", iast: "da" },
          { deva: "ध", iast: "dha" },
          { deva: "ड", iast: "ḍa" },
          { deva: "त", iast: "ta" }
      ],
      missingDisplay: "सप्त _", missingAnswer: "दश",
      missingChoices: ["दश", "दस", "दष", "धश"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">17</text>\n    </svg>"
    },
    {
      id: "ashtadasa", deva: "अष्टादश", iast: "aṣṭādaśa", ttsText: "अष्टादश", value: 18,
      syll: ["अष्टा", "द", "श"],
      typoDeva: "अष्टादस", typoIast: "aṣṭādasa",
      maskedPrefix: "अष्टा", maskedHidden: "दश",
      gapDeva: "अ _ दश", gapIast: "a _ daśa", gapAnswer: "ष्टा",
      gapChoices: [
          { deva: "ष्टा", iast: "ṣṭā" },
          { deva: "ष्ठा", iast: "ṣṭhā" },
          { deva: "स्टा", iast: "sṭā" },
          { deva: "ष्ट", iast: "ṣṭa" }
      ],
      missingDisplay: "अष्टाद _", missingAnswer: "श",
      missingChoices: ["श", "ष", "स", "ह"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">18</text>\n    </svg>"
    },
    {
      id: "navadasa", deva: "नवदश", iast: "navadaśa", ttsText: "नवदश", value: 19,
      syll: ["नव", "द", "श"],
      typoDeva: "नभदश", typoIast: "nabhadaśa",
      maskedPrefix: "नव", maskedHidden: "दश",
      gapDeva: "न _ दश", gapIast: "na _ daśa", gapAnswer: "व",
      gapChoices: [
          { deva: "व", iast: "va" },
          { deva: "ब", iast: "ba" },
          { deva: "य", iast: "ya" },
          { deva: "र", iast: "ra" }
      ],
      missingDisplay: "नव _", missingAnswer: "दश",
      missingChoices: ["दश", "दस", "दष", "धश"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <text x=\"50\" y=\"52\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"46\" font-weight=\"700\" fill=\"#14213D\">19</text>\n    </svg>"
    },
    {
      id: "vimshati", deva: "विंशतिः", iast: "viṃśatiḥ", ttsText: "विंशतिः", value: 20,
      syll: ["विं", "श", "तिः"],
      typoDeva: "विंशति", typoIast: "viṃśati",
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
    }
  ],
  /* words for the 10 x 10 word grid: real Sanskrit, but never in this lesson */
  decoys: [
    "सोडश",
    "षोडस",
    "षोढश",
    "सपतदश",
    "सप्तदस",
    "अष्टादस",
    "अष्ठादश",
    "नभदश",
    "नवदस",
    "विंशति",
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
    "एकादश",
    "द्वादश",
    "त्रयोदश",
    "चतुर्दश",
    "पञ्चदश",
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
    { ru: 'Есть буква «ष» (ṣa)', en: 'Contains "ष" (ṣa)',
      test: function (w) { return w.deva.indexOf('ष') >= 0; } },
    { ru: 'Есть знак ् (вирама)', en: 'Has a virāma (्)',
      test: function (w) { return w.deva.indexOf('्') >= 0; } },
    { ru: 'Есть висарга ः (ḥ)', en: 'Has a visarga (ः)',
      test: function (w) { return w.deva.indexOf('ः') >= 0; } },
    { ru: 'Начинается с гласной «अ»', en: 'Starts with the vowel "अ"',
      test: function (w) { return w.deva.charAt(0) === 'अ'; } }
  ],
  steps: [
    { wordIds: ["shodasa", "saptadasa"] },
    { wordIds: ["ashtadasa", "navadasa"] },
    { wordIds: ["vimshati"] }
  ],
  hotspots: {
    figures: [
      {
        key: "frame",
        captionRu: "Таблица чисел: 16–20",
        captionEn: "Number Chart: 16–20",
        viewBox: "0 0 320 300",
        art: "<rect x=\"36\" y=\"16\" width=\"248\" height=\"268\" rx=\"16\" fill=\"#FFFBEB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <rect x=\"36\" y=\"16\" width=\"248\" height=\"30\" rx=\"16\" fill=\"#FDE68A\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M52 31H268\" stroke=\"#B45309\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"160\" y=\"70\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">16</text>\n  <text x=\"160\" y=\"110\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">17</text>\n  <text x=\"160\" y=\"150\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">18</text>\n  <text x=\"160\" y=\"190\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">19</text>\n  <text x=\"160\" y=\"230\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif\" font-size=\"34\" font-weight=\"700\" fill=\"#14213D\">20</text>",
        pins: [
          { id: "shodasa", num: 1, x: 300, y: 64, tx: 160, ty: 70 },
          { id: "saptadasa", num: 2, x: 20, y: 104, tx: 160, ty: 110 },
          { id: "ashtadasa", num: 3, x: 300, y: 144, tx: 160, ty: 150 },
          { id: "navadasa", num: 4, x: 20, y: 184, tx: 160, ty: 190 },
          { id: "vimshati", num: 5, x: 300, y: 224, tx: 160, ty: 230 }
        ]
      }
    ]
  },
  groups: [
    { titleRu: "Шестнадцать и семнадцать", titleEn: "Sixteen and Seventeen", wordIds: ["shodasa", "saptadasa"] },
    { titleRu: "Восемнадцать — двадцать", titleEn: "Eighteen to Twenty", wordIds: ["ashtadasa", "navadasa", "vimshati"] },
    { titleRu: "Чётные", titleEn: "Even", wordIds: ["shodasa", "ashtadasa", "vimshati"] },
    { titleRu: "Нечётные", titleEn: "Odd", wordIds: ["saptadasa", "navadasa"] }
  ],
  categories: [
    { titleRu: "Чётные числа", titleEn: "Even Numbers", wordIds: ["shodasa", "ashtadasa", "vimshati"] },
    { titleRu: "Нечётные числа", titleEn: "Odd Numbers", wordIds: ["saptadasa", "navadasa"] },
    { titleRu: "Больше семнадцати", titleEn: "More Than Seventeen", wordIds: ["ashtadasa", "navadasa", "vimshati"] },
    { titleRu: "Меньше восемнадцати", titleEn: "Less Than Eighteen", wordIds: ["shodasa", "saptadasa"] },
    { titleRu: "Больше шестнадцати", titleEn: "More Than Sixteen", wordIds: ["saptadasa", "ashtadasa", "navadasa", "vimshati"] },
    { titleRu: "Меньше девятнадцати", titleEn: "Less Than Nineteen", wordIds: ["shodasa", "saptadasa", "ashtadasa"] },
    { titleRu: "Оканчиваются на «दश»", titleEn: "Ending in 'दश'", wordIds: ["shodasa", "saptadasa", "ashtadasa", "navadasa"] },
    { titleRu: "С буквой «ष» (ṣa)", titleEn: "Containing 'ष' (ṣa)", wordIds: ["shodasa", "ashtadasa"] },
    { titleRu: "Без буквы «ष» (ṣa)", titleEn: "Without 'ष' (ṣa)", wordIds: ["saptadasa", "navadasa", "vimshati"] },
    { titleRu: "Девятнадцать или двадцать", titleEn: "Nineteen or Twenty", wordIds: ["navadasa", "vimshati"] }
  ]
});
