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
 */

SAL.registerLesson({
  key: "LC",
  num: 3,
  titleDeva: "वर्णाः",
  titleRu: "Цвета",
  titleEn: "Colours",
  topicRu: "белый, чёрный, красный, синий, тёмно-зелёный, золотистый",
  topicEn: "white, black, red, blue, dark green, golden",
  introRu: "Третий урок — шесть цветов: <code>श्वेत</code> (белый), <code>कृष्ण</code> (чёрный), <code>रक्त</code> (красный), <code>नील</code> (синий), <code>श्याम</code> (тёмно-зелёный), <code>गौर</code> (золотистый, светлый). Слова короткие, поэтому тренируем точность: долгота гласной (<code>नील</code> / <code>निल</code>), придыхание и варга (<code>कृष्ण</code>). Цвета сразу работают как определения к знакомым словам уроков 1–2.",
  introEn: "The third lesson brings six colours: <code>श्वेत</code> (white), <code>कृष्ण</code> (black), <code>रक्त</code> (red), <code>नील</code> (blue), <code>श्याम</code> (dark green), <code>गौर</code> (golden, fair). The words are short, so the focus is precision: vowel length (<code>नील</code> / <code>निल</code>) and aspiration and varga (<code>कृष्ण</code>). The colours work straight away as attributes of the body and face words from lessons 1–2.",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#ECFDF5\"/>\n      <path d=\"M52 18C68 17 82 31 82 49C82 68 68 82 50 82C32 82 18 69 18 51C18 33 34 19 52 18Z\" fill=\"#14532D\" stroke=\"#14213D\" stroke-width=\"3\"/>\n      <ellipse cx=\"41\" cy=\"36\" rx=\"8\" ry=\"4.6\" fill=\"#86EFAC\" opacity=\"0.4\"/>\n    </svg>"
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
        art: "<rect x=\"6\" y=\"6\" width=\"308\" height=\"218\" rx=\"14\" fill=\"#F8EFE6\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n  <path d=\"M24 108C24 56 78 20 160 20C242 20 296 56 296 108C296 160 242 196 160 196C78 196 24 160 24 108Z\" fill=\"#FDF6EC\" stroke=\"#E5DEC9\" stroke-width=\"0\"/>\n  <circle cx=\"62\" cy=\"66\" r=\"32\" fill=\"#FFFFFF\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <circle cx=\"160\" cy=\"66\" r=\"32\" fill=\"#0B1220\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <circle cx=\"258\" cy=\"66\" r=\"32\" fill=\"#DC2626\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <circle cx=\"62\" cy=\"164\" r=\"32\" fill=\"#2563EB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <circle cx=\"160\" cy=\"164\" r=\"32\" fill=\"#14532D\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <circle cx=\"258\" cy=\"164\" r=\"32\" fill=\"#F2C46B\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <ellipse cx=\"52\" cy=\"55\" rx=\"8\" ry=\"4.4\" fill=\"#CBD5E1\"/>\n  <ellipse cx=\"150\" cy=\"55\" rx=\"8\" ry=\"4.4\" fill=\"#64748B\" opacity=\"0.7\"/>\n  <ellipse cx=\"248\" cy=\"55\" rx=\"8\" ry=\"4.4\" fill=\"#FFFFFF\" opacity=\"0.55\"/>\n  <ellipse cx=\"52\" cy=\"153\" rx=\"8\" ry=\"4.4\" fill=\"#FFFFFF\" opacity=\"0.55\"/>\n  <ellipse cx=\"150\" cy=\"153\" rx=\"8\" ry=\"4.4\" fill=\"#86EFAC\" opacity=\"0.45\"/>\n  <ellipse cx=\"248\" cy=\"153\" rx=\"8\" ry=\"4.4\" fill=\"#FFFFFF\" opacity=\"0.65\"/>",
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
  ]
});
