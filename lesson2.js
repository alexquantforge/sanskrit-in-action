/**
 * LESSON 2 · शरीरावयवाः · "Parts of the Body — 2" (6 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * Pure visual association (Picture <-> Sanskrit stem):
 * - No grammatical gender and no case endings (pure stems: शीर्ष, उदर, हस्त, अङ्गुली, जानु, पाद)
 * - No Russian or English translations anywhere (100% Direct Method via illustrations & sound)
 * - IAST is hidden by default and can be switched on with the 🔤 button.
 * Sample lesson file for the generic engine in lesson-engine.js.
 */


SAL.registerLesson({
  key: "L2",
  num: 1,
  titleDeva: "शरीरावयवाः",
  titleRu: "Части тела — 2",
  titleEn: "Body Parts — 2",
  topicRu: "голова, живот, рука, палец, колено, стопа",
  topicEn: "head, belly, hand, finger, knee, foot",
  introRu: "Первый урок цикла <strong>शरीरसम्बन्धि-शब्दाः</strong>. 6 слов — чистые основы (без падежных окончаний и без указания рода), значение передаётся только картинкой и звуком (<em>Direct Method</em>). Начинаем с крупных частей тела: голова, живот, руки и ноги. В Уроке 5 к ним прибавится лицо, и весь набор из 12 слов соберётся вместе — так работает <strong>спиральное повторение</strong>.",
  introEn: "The first lesson of the <strong>शरीरसम्बन्धि-शब्दाः</strong> cycle: 6 pure stems (no case endings, no gender), with meaning conveyed only through pictures and sound (<em>Direct Method</em>). We start with the large parts of the body: head, belly, arms and legs. In Lesson 5 the face joins them and the full set of 12 words comes together — that is <strong>spiral revision</strong>.",
  words: [
    {
      id: "shirsha", deva: "शीर्ष", iast: "śīrṣa", ttsText: "शीर्षा",
      typoDeva: "शिर्ष", typoIast: "śirṣa",
      maskedPrefix: "शी", maskedHidden: "र्ष",
      gapDeva: "_र्ष", gapIast: "_rṣa", gapAnswer: "शी",
      gapChoices: [
        { deva: "शी", iast: "śī" },
        { deva: "शि", iast: "śi" },
        { deva: "सी", iast: "sī" },
        { deva: "शा", iast: "śā" }
      ],
      missingDisplay: "शी _", missingAnswer: "र्ष",
      missingChoices: ["र्ष", "र्स", "र्श", "र्ण"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#2B5B6C\"/>\n      <path d=\"M26 88C28 75 36 70 50 70C64 70 72 75 74 88\" fill=\"#F59E0B\" stroke=\"#14213D\" stroke-width=\"2.8\"/>\n      <ellipse cx=\"50\" cy=\"48\" rx=\"20\" ry=\"23\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"3\"/>\n      <path d=\"M29 44C28 25 40 19 52 20C64 20 72 28 71 44C66 35 58 32 48 33C38 33 33 38 29 44Z\" fill=\"#1E293B\"/>\n      <circle cx=\"43\" cy=\"48\" r=\"2.2\" fill=\"#14213D\"/>\n      <circle cx=\"57\" cy=\"48\" r=\"2.2\" fill=\"#14213D\"/>\n      <path d=\"M44 59C48 62 52 62 56 59\" stroke=\"#14213D\" stroke-width=\"2.3\" stroke-linecap=\"round\"/>\n      <path d=\"M50 8V17M45 13L50 18L55 13\" stroke=\"#FEF08A\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    </svg>"
    },
    {
      id: "udara", deva: "उदर", iast: "udara", ttsText: "उदरा",
      typoDeva: "उदार", typoIast: "udāra",
      maskedPrefix: "उद", maskedHidden: "र",
      gapDeva: "_दर", gapIast: "_dara", gapAnswer: "उ",
      gapChoices: [
        { deva: "उ", iast: "u" },
        { deva: "ऊ", iast: "ū" },
        { deva: "ओ", iast: "o" },
        { deva: "अ", iast: "a" }
      ],
      missingDisplay: "उ _ र", missingAnswer: "द",
      missingChoices: ["द", "ध", "त", "ड"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#F8EFE6\"/>\n  <path d=\"M24 24C34 18 66 18 76 24L82 40H18L24 24Z\" fill=\"#0F766E\" stroke=\"#14213D\" stroke-width=\"2.6\" stroke-linejoin=\"round\"/>\n  <path d=\"M27 40H73C79 40 83 47 81 57C78 73 71 85 61 87H39C29 85 22 73 19 57C17 47 21 40 27 40Z\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"3\" stroke-linejoin=\"round\"/>\n  <path d=\"M42 58C46 62 54 62 58 58\" stroke=\"#14213D\" stroke-width=\"1.8\" stroke-linecap=\"round\" opacity=\"0.6\"/>\n  <circle cx=\"50\" cy=\"65\" r=\"3.6\" fill=\"#14213D\"/>\n  <ellipse cx=\"50\" cy=\"63\" rx=\"19\" ry=\"16\" fill=\"none\" stroke=\"#DC2626\" stroke-width=\"2\" stroke-dasharray=\"4,3\"/>\n</svg>"
    },
    {
      id: "hasta", deva: "हस्त", iast: "hasta", ttsText: "हस्ता",
      typoDeva: "हास्त", typoIast: "hāsta",
      maskedPrefix: "हस", maskedHidden: "्त",
      gapDeva: "_स्त", gapIast: "_sta", gapAnswer: "ह",
      gapChoices: [
        { deva: "ह", iast: "ha" },
        { deva: "हा", iast: "hā" },
        { deva: "स", iast: "sa" },
        { deva: "भ", iast: "bha" }
      ],
      missingDisplay: "ह _ त", missingAnswer: "स्",
      missingChoices: ["स्", "श्", "ष्", "म्"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#F8EFE6\"/>\n  <path d=\"M44 38V22C44 19 41 17 38.5 19C36.5 20.5 36 23 36 26V40\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n  <path d=\"M57 38V17C57 14 54 12 51.5 14C49.5 15.5 49 18 49 21V38\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n  <path d=\"M70 38V21C70 18 67 16 64.5 18C62.5 19.5 62 22 62 25V38\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n  <path d=\"M83 50V33C83 30 80 28 77.5 30C75.5 31.5 75 34 75 37V56\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n  <path d=\"M32 78V54C32 46 38 40 46 40H70C78 40 84 46 84 54V78C84 84 79 89 72 89H44C37 89 32 84 32 78Z\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"3\" stroke-linejoin=\"round\"/>\n  <path d=\"M33 62C24 60 17 54 18 48C19 43 25 42 29 45L33 51\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.8\" stroke-linejoin=\"round\"/>\n  <path d=\"M42 68C50 64 60 64 70 68\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <path d=\"M42 77C51 73.5 61 73.5 71 77\" stroke=\"#14213D\" stroke-width=\"1.7\" stroke-linecap=\"round\" opacity=\"0.65\"/>\n</svg>"
    },
    {
      id: "anguli", deva: "अङ्गुली", iast: "aṅgulī", ttsText: "अङ्गुली",
      typoDeva: "अङ्गुलि", typoIast: "aṅguli",
      maskedPrefix: "अङ्गु", maskedHidden: "ली",
      gapDeva: "अङ्गु_", gapIast: "aṅgu_", gapAnswer: "ली",
      gapChoices: [
        { deva: "ली", iast: "lī" },
        { deva: "लि", iast: "li" },
        { deva: "ला", iast: "lā" },
        { deva: "री", iast: "rī" }
      ],
      missingDisplay: "अ _ ली", missingAnswer: "ङ्गु",
      missingChoices: ["ङ्गु", "म्बु", "न्दु", "ञ्जु"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#F8EFE6\"/>\n      <path d=\"M18 76L33 58C35 55 37 53 39 50L50 36C52 33 55 30 58 26C64 19 76 26 70 36L59 51C57 54 54 57 52 60L38 84Z\" fill=\"#F3C6A8\" stroke=\"#14213D\" stroke-width=\"3\" stroke-linejoin=\"round\"/>\n      <ellipse cx=\"64\" cy=\"29\" rx=\"5\" ry=\"6\" transform=\"rotate(-38 64 29)\" fill=\"#FDE2E4\" stroke=\"#14213D\" stroke-width=\"2\"/>\n      <path d=\"M48 43C51 45 54 47 56 50\" stroke=\"#14213D\" stroke-width=\"2.1\" stroke-linecap=\"round\"/>\n      <path d=\"M46 46C49 48 51 49 53 52\" stroke=\"#14213D\" stroke-width=\"1.5\" stroke-linecap=\"round\" opacity=\"0.75\"/>\n      <path d=\"M35 59C39 61 42 64 45 67\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n      <path d=\"M33 62C36 64 39 66 42 69\" stroke=\"#14213D\" stroke-width=\"1.5\" stroke-linecap=\"round\" opacity=\"0.75\"/>\n    </svg>"
    },
    {
      id: "janu", deva: "जानु", iast: "jānu", ttsText: "जानु",
      typoDeva: "जनु", typoIast: "janu",
      maskedPrefix: "जा", maskedHidden: "नु",
      gapDeva: "_नु", gapIast: "_nu", gapAnswer: "जा",
      gapChoices: [
        { deva: "जा", iast: "jā" },
        { deva: "ज", iast: "ja" },
        { deva: "जी", iast: "jī" },
        { deva: "या", iast: "yā" }
      ],
      missingDisplay: "जा _", missingAnswer: "नु",
      missingChoices: ["नु", "मु", "णु", "तु"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#F8EFE6\"/>\n  <path d=\"M22 42H56\" stroke=\"#14213D\" stroke-width=\"26\" stroke-linecap=\"round\"/>\n  <path d=\"M22 42H56\" stroke=\"#F4C7AB\" stroke-width=\"20\" stroke-linecap=\"round\"/>\n  <path d=\"M59 52V82\" stroke=\"#14213D\" stroke-width=\"25\" stroke-linecap=\"round\"/>\n  <path d=\"M59 52V82\" stroke=\"#F4C7AB\" stroke-width=\"19\" stroke-linecap=\"round\"/>\n  <circle cx=\"59\" cy=\"46\" r=\"14\" fill=\"#FDBA74\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M52 43C55 39 63 39 66 43\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\" opacity=\"0.8\"/>\n  <path d=\"M59 82C59 90 54 95 45 95H33C28 95 27 89 33 87L52 80Z\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.6\" stroke-linejoin=\"round\"/>\n</svg>"
    },
    {
      id: "pada", deva: "पाद", iast: "pāda", ttsText: "पादा",
      typoDeva: "पद", typoIast: "pada",
      maskedPrefix: "पा", maskedHidden: "द",
      gapDeva: "_द", gapIast: "_da", gapAnswer: "पा",
      gapChoices: [
        { deva: "पा", iast: "pā" },
        { deva: "प", iast: "pa" },
        { deva: "पी", iast: "pī" },
        { deva: "बा", iast: "bā" }
      ],
      missingDisplay: "पा _", missingAnswer: "द",
      missingChoices: ["द", "त", "प", "ब"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFFFF\"/>\n      <path d=\"M48 12C46 26 45 42 47 56C48 61 42 65 32 69C23 72 17 75 17 80C17 84 24 85 35 85C46 85 52 82 59 83C66 84 74 85 78 81C82 77 80 69 75 64C71 59 69 52 71 36C72 25 71 17 69 12\" fill=\"#F3C6A8\" stroke=\"#14213D\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M62 60C60 64 62 68 66 68\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n      <path d=\"M22 76C25 75 28 76 28 79\" stroke=\"#14213D\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>\n      <path d=\"M24 84C24 81 26 79 28 79 M31 85C31 82 32 80 34 80 M37 85C37 82 38 81 40 81\" stroke=\"#14213D\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>\n    </svg>"
    }
  ],
  /* филворды: те же две игры, что в уроках 5–10 (см. games-extra.js) */
  extraGames: ['wordgrid', 'wordsearch'],
  steps: [
    { wordIds: ["shirsha", "udara"] },
    { wordIds: ["hasta", "anguli"] },
    { wordIds: ["janu", "pada"] }
  ],
  hotspots: {
    figures: [
    {
      key: "body",
      captionRu: "Человек в полный рост (1–6)",
      captionEn: "Full Standing Person (1–6)",
      viewBox: "0 0 320 340",
      art: "<rect x=\"6\" y=\"6\" width=\"308\" height=\"328\" rx=\"14\" fill=\"#F8EFE6\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n  <path d=\"M126 92L96 140L92 176\" stroke=\"#14213D\" stroke-width=\"17\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  <path d=\"M126 92L96 140L92 176\" stroke=\"#F4C7AB\" stroke-width=\"11\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  <path d=\"M194 92L224 140L228 176\" stroke=\"#14213D\" stroke-width=\"17\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  <path d=\"M194 92L224 140L228 176\" stroke=\"#F4C7AB\" stroke-width=\"11\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  <circle cx=\"92\" cy=\"186\" r=\"12\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.4\"/>\n  <path d=\"M85 192L79 202M89 196L85 208M95 197L95 209M100 194L103 204\" stroke=\"#14213D\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>\n  <circle cx=\"228\" cy=\"186\" r=\"12\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.4\"/>\n  <path d=\"M235 192L241 202M231 196L235 208M225 197L225 209M220 194L217 204\" stroke=\"#14213D\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>\n  <path d=\"M142 214V294\" stroke=\"#14213D\" stroke-width=\"22\" stroke-linecap=\"round\"/>\n  <path d=\"M142 214V294\" stroke=\"#F4C7AB\" stroke-width=\"15\" stroke-linecap=\"round\"/>\n  <path d=\"M178 214V294\" stroke=\"#14213D\" stroke-width=\"22\" stroke-linecap=\"round\"/>\n  <path d=\"M178 214V294\" stroke=\"#F4C7AB\" stroke-width=\"15\" stroke-linecap=\"round\"/>\n  <path d=\"M142 292C142 304 136 313 123 313H107C100 313 99 304 106 301L134 288Z\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.4\" stroke-linejoin=\"round\"/>\n  <path d=\"M178 292C178 304 184 313 197 313H213C220 313 221 304 214 301L186 288Z\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.4\" stroke-linejoin=\"round\"/>\n  <ellipse cx=\"160\" cy=\"46\" rx=\"24\" ry=\"27\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M136 42C136 24 146 17 160 17C174 17 184 24 184 42C178 31 170 28 160 28C150 28 142 31 136 42Z\" fill=\"#1E293B\" stroke=\"#14213D\" stroke-width=\"2.2\"/>\n  <circle cx=\"152\" cy=\"46\" r=\"2.4\" fill=\"#0F172A\"/>\n  <circle cx=\"168\" cy=\"46\" r=\"2.4\" fill=\"#0F172A\"/>\n  <path d=\"M153 56C157 60 163 60 167 56\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <rect x=\"152\" y=\"68\" width=\"16\" height=\"12\" rx=\"4\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.2\"/>\n  <path d=\"M126 80C140 88 180 88 194 80L201 202C201 212 195 219 184 219H136C125 219 119 212 119 202L126 80Z\" fill=\"#0F766E\" stroke=\"#14213D\" stroke-width=\"2.6\" stroke-linejoin=\"round\"/>\n  <ellipse cx=\"160\" cy=\"168\" rx=\"30\" ry=\"26\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.4\"/>\n  <path d=\"M150 160C155 165 165 165 170 160\" stroke=\"#14213D\" stroke-width=\"1.8\" stroke-linecap=\"round\" opacity=\"0.6\"/>\n  <circle cx=\"160\" cy=\"171\" r=\"3.4\" fill=\"#14213D\"/>\n  <circle cx=\"178\" cy=\"254\" r=\"13\" fill=\"#FDBA74\" stroke=\"#14213D\" stroke-width=\"2.4\"/>\n  <path d=\"M172 251C175 247 181 247 184 251\" stroke=\"#14213D\" stroke-width=\"1.9\" stroke-linecap=\"round\" opacity=\"0.8\"/>",
      pins: [
        { id: "shirsha", num: 1, x: 244, y: 36, tx: 160, ty: 40 },
        { id: "hasta", num: 2, x: 34, y: 196, tx: 92, ty: 186 },
        { id: "anguli", num: 3, x: 34, y: 232, tx: 84, ty: 202 },
        { id: "udara", num: 4, x: 246, y: 168, tx: 160, ty: 168 },
        { id: "janu", num: 5, x: 250, y: 258, tx: 178, ty: 254 },
        { id: "pada", num: 6, x: 44, y: 300, tx: 150, ty: 300 }
      ]
    }
    ]
  },
  groups: [
    { titleRu: "Голова и туловище", titleEn: "Head & Torso", wordIds: ["shirsha", "udara"] },
    { titleRu: "Руки", titleEn: "Hands & Arms", wordIds: ["hasta", "anguli"] },
    { titleRu: "Ноги", titleEn: "Legs & Feet", wordIds: ["janu", "pada"] },
    { titleRu: "Парные части тела", titleEn: "Paired Body Parts", wordIds: ["hasta", "anguli", "janu", "pada"] }
  ],
  categories: [
    { titleRu: "Голова и туловище", titleEn: "Head & Torso", wordIds: ["shirsha", "udara"] },
    { titleRu: "Руки", titleEn: "Hands & Arms", wordIds: ["hasta", "anguli"] },
    { titleRu: "Ноги", titleEn: "Legs & Feet", wordIds: ["janu", "pada"] },
    { titleRu: "Парные", titleEn: "Paired", wordIds: ["hasta", "anguli", "janu", "pada"] },
    { titleRu: "Непарные", titleEn: "Unpaired", wordIds: ["shirsha", "udara"] },
    { titleRu: "Долгая гласная «ā» (ा)", titleEn: "Words with Long Vowel \"ā\" (ा)", wordIds: ["janu", "pada"] },
    { titleRu: "Долгая гласная «ī» (ी)", titleEn: "Words with Long Vowel \"ī\" (ी)", wordIds: ["shirsha", "anguli"] },
    { titleRu: "Слова со звуком «र» (ra)", titleEn: "Words Containing \"र\" (ra)", wordIds: ["shirsha", "udara"] },
    { titleRu: "Чем берём, держим и указываем", titleEn: "What We Take, Hold & Point With", wordIds: ["hasta", "anguli"] },
    { titleRu: "Начинаются с гласной (अ / उ)", titleEn: "Starting with a Vowel (अ / उ)", wordIds: ["udara", "anguli"] }
  ]
});
