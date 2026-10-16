/**
 * LESSON 3 · मुखसम्बन्धि-शब्दाः · "The Face" (7 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * Pure visual association (Picture <-> Sanskrit stem):
 * - No grammatical gender and no case endings (pure stems: ललाट, नयन, नासिका, कर्ण, मुख, दन्त, जिह्वा)
 * - No Russian or English translations anywhere (100% Direct Method via illustrations & sound)
 * - IAST is hidden by default and can be switched on with the 🔤 button.
 * Sample lesson file for the generic engine in lesson-engine.js.
 */


SAL.registerLesson({
  key: "L3",
  num: 3,
  titleDeva: "मुखसम्बन्धि-शब्दाः",
  titleRu: "Лицо",
  titleEn: "The Face",
  topicRu: "лоб, глаз, нос, ухо, рот, зуб, язык",
  topicEn: "forehead, eye, nose, ear, mouth, tooth, tongue",
  introRu: "Третий урок: всё лицо целиком — 7 слов на одной схеме. Слова <code>ललाट</code>, <code>नयन</code>, <code>नासिका</code>, <code>कर्ण</code>, <code>दन्त</code>, <code>जिह्वा</code> уже встречались в Уроке 1, теперь они собраны в отдельный урок-лицо и добавляется новое слово <code>मुख</code> (рот/лицо).",
  introEn: "The third lesson zooms into the face: 7 words on a single diagram. The words <code>ललाट</code>, <code>नयन</code>, <code>नासिका</code>, <code>कर्ण</code>, <code>दन्त</code>, <code>जिह्वा</code> already appeared in Lesson 1; here they are grouped into a dedicated face lesson with one new word, <code>मुख</code> (mouth / face).",
  words: [
    {
      id: "lalata", deva: "ललाट", iast: "lalāṭa", ttsText: "ललाटा",
      typoDeva: "ललट", typoIast: "lalaṭa",
      maskedPrefix: "लला", maskedHidden: "ट",
      gapDeva: "ल_ट", gapIast: "la_ṭa", gapAnswer: "ला",
      gapChoices: [
        { deva: "ला", iast: "lā" },
        { deva: "ल", iast: "la" },
        { deva: "ली", iast: "lī" },
        { deva: "रा", iast: "rā" }
      ],
      missingDisplay: "ल _ ट", missingAnswer: "ला",
      missingChoices: ["ला", "ली", "लो", "ले"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#E0F2FE\"/>\n      <ellipse cx=\"50\" cy=\"54\" rx=\"23\" ry=\"26\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"3\"/>\n      <path d=\"M27 46C27 26 40 20 50 20C60 20 73 26 73 46C66 36 34 36 27 46Z\" fill=\"#1E293B\"/>\n      <rect x=\"35\" y=\"37\" width=\"30\" height=\"11\" rx=\"5.5\" fill=\"#FEF08A\" stroke=\"#DC2626\" stroke-width=\"2.2\"/>\n      <circle cx=\"42\" cy=\"57\" r=\"2.3\" fill=\"#14213D\"/>\n      <circle cx=\"58\" cy=\"57\" r=\"2.3\" fill=\"#14213D\"/>\n    </svg>"
    },
    {
      id: "nayana", deva: "नयन", iast: "nayana", ttsText: "नयना",
      typoDeva: "नयान", typoIast: "nayāna",
      maskedPrefix: "नय", maskedHidden: "न",
      gapDeva: "_यन", gapIast: "_yana", gapAnswer: "न",
      gapChoices: [
        { deva: "न", iast: "na" },
        { deva: "ना", iast: "nā" },
        { deva: "म", iast: "ma" },
        { deva: "प", iast: "pa" }
      ],
      missingDisplay: "न _ न", missingAnswer: "य",
      missingChoices: ["य", "व", "प", "म"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#F8EFE6\"/>\n      <path d=\"M12 52C24 32 40 26 50 26C60 26 76 32 88 52C76 68 60 74 50 74C40 74 24 68 12 52Z\" fill=\"#FFFFFF\" stroke=\"#14213D\" stroke-width=\"3.5\"/>\n      <circle cx=\"50\" cy=\"50\" r=\"15\" fill=\"#1D4ED8\" stroke=\"#14213D\" stroke-width=\"2.5\"/>\n      <circle cx=\"50\" cy=\"50\" r=\"7.5\" fill=\"#0F172A\"/>\n      <circle cx=\"44\" cy=\"44\" r=\"3.2\" fill=\"#FFFFFF\"/>\n      <path d=\"M22 36L17 28M35 28L33 19M50 25V16M65 28L67 19M78 36L83 28\" stroke=\"#14213D\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n    </svg>"
    },
    {
      id: "nasika", deva: "नासिका", iast: "nāsikā", ttsText: "नासिका",
      typoDeva: "नसिका", typoIast: "nasikā",
      maskedPrefix: "नासि", maskedHidden: "का",
      gapDeva: "_सिका", gapIast: "_sikā", gapAnswer: "ना",
      gapChoices: [
        { deva: "ना", iast: "nā" },
        { deva: "न", iast: "na" },
        { deva: "नी", iast: "nī" },
        { deva: "मा", iast: "mā" }
      ],
      missingDisplay: "ना _ का", missingAnswer: "सि",
      missingChoices: ["सि", "शि", "पि", "ति"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#F8EFE6\"/>\n      <path d=\"M46 18C45 35 35 55 29 66C25 74 32 81 41 79C46 78 48 80 50 80C52 80 54 78 59 79C68 81 75 74 71 66C65 55 55 35 54 18\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"3.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <ellipse cx=\"41\" cy=\"73\" rx=\"4.5\" ry=\"2.6\" fill=\"#14213D\"/>\n      <ellipse cx=\"59\" cy=\"73\" rx=\"4.5\" ry=\"2.6\" fill=\"#14213D\"/>\n    </svg>"
    },
    {
      id: "karna", deva: "कर्ण", iast: "karṇa", ttsText: "कर्णा",
      typoDeva: "कर्न", typoIast: "karna",
      maskedPrefix: "क", maskedHidden: "र्ण",
      gapDeva: "_र्ण", gapIast: "_rṇa", gapAnswer: "क",
      gapChoices: [
        { deva: "क", iast: "ka" },
        { deva: "का", iast: "kā" },
        { deva: "ग", iast: "ga" },
        { deva: "प", iast: "pa" }
      ],
      missingDisplay: "क _", missingAnswer: "र्ण",
      missingChoices: ["र्ण", "र्म", "र्य", "र्त"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#F8EFE6\"/>\n      <path d=\"M35 30C35 16 68 14 70 38C72 56 60 64 56 75C52 84 36 82 36 70\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n      <path d=\"M44 35C46 25 60 26 60 40C60 50 51 54 49 62\" stroke=\"#14213D\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>\n      <circle cx=\"45\" cy=\"54\" r=\"4\" fill=\"#14213D\"/>\n    </svg>"
    },
    {
      id: "mukha", deva: "मुख", iast: "mukha", ttsText: "मुखा",
      typoDeva: "मूख", typoIast: "mūkha",
      maskedPrefix: "मु", maskedHidden: "ख",
      gapDeva: "_ख", gapIast: "_kha", gapAnswer: "मु",
      gapChoices: [
        { deva: "मु", iast: "mu" },
        { deva: "मू", iast: "mū" },
        { deva: "म", iast: "ma" },
        { deva: "नु", iast: "nu" }
      ],
      missingDisplay: "मु _", missingAnswer: "ख",
      missingChoices: ["ख", "क", "घ", "ष"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#F8EFE6\"/>\n  <ellipse cx=\"50\" cy=\"50\" rx=\"31\" ry=\"35\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"3\"/>\n  <path d=\"M19 46C19 26 32 15 50 15C68 15 81 26 81 46C74 32 64 28 50 28C36 28 26 32 19 46Z\" fill=\"#1E293B\" stroke=\"#14213D\" stroke-width=\"2.4\"/>\n  <circle cx=\"38\" cy=\"44\" r=\"2.8\" fill=\"#0F172A\"/>\n  <circle cx=\"62\" cy=\"44\" r=\"2.8\" fill=\"#0F172A\"/>\n  <path d=\"M31 64C40 57 60 57 69 64C64 82 36 82 31 64Z\" fill=\"#7F1D1D\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M37 63H63V67C56 68.6 44 68.6 37 67V63Z\" fill=\"#FFFFFF\" stroke=\"#14213D\" stroke-width=\"1.2\"/>\n  <path d=\"M31 64C40 59 60 59 69 64\" stroke=\"#E11D48\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <path d=\"M34 66C41 79 59 79 66 66\" stroke=\"#E11D48\" stroke-width=\"3.4\" stroke-linecap=\"round\"/>\n</svg>"
    },
    {
      id: "danta", deva: "दन्त", iast: "danta", ttsText: "दन्ता",
      typoDeva: "दान्त", typoIast: "dānta",
      maskedPrefix: "द", maskedHidden: "न्त",
      gapDeva: "_न्त", gapIast: "_nta", gapAnswer: "द",
      gapChoices: [
        { deva: "द", iast: "da" },
        { deva: "दा", iast: "dā" },
        { deva: "त", iast: "ta" },
        { deva: "ध", iast: "dha" }
      ],
      missingDisplay: "द _ त", missingAnswer: "न्",
      missingChoices: ["न्", "म्", "र्", "ल्"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#1E293B\"/>\n      <path d=\"M28 32C28 20 42 18 50 24C58 18 72 20 72 32C72 48 66 56 64 76C63 83 56 83 54 72C52 63 48 63 46 72C44 83 37 83 36 76C34 56 28 48 28 32Z\" fill=\"#FFFBEB\" stroke=\"#14213D\" stroke-width=\"3\"/>\n    </svg>"
    },
    {
      id: "jihva", deva: "जिह्वा", iast: "jihvā", ttsText: "जिह्वा",
      typoDeva: "जिह्व", typoIast: "jihva",
      maskedPrefix: "जि", maskedHidden: "ह्वा",
      gapDeva: "_ह्वा", gapIast: "_hvā", gapAnswer: "जि",
      gapChoices: [
        { deva: "जि", iast: "ji" },
        { deva: "जी", iast: "jī" },
        { deva: "जा", iast: "jā" },
        { deva: "दि", iast: "di" }
      ],
      missingDisplay: "जि _", missingAnswer: "ह्वा",
      missingChoices: ["ह्वा", "ह्मा", "ह्या", "ह्रा"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#F8EFE6\"/>\n      <path d=\"M22 36C34 28 66 28 78 36C74 52 66 58 50 58C34 58 26 52 22 36Z\" fill=\"#7F1D1D\" stroke=\"#14213D\" stroke-width=\"3\"/>\n      <path d=\"M32 39H68L65 65C64 78 56 85 50 85C44 85 36 78 35 65L32 39Z\" fill=\"#FB7185\" stroke=\"#14213D\" stroke-width=\"3.2\"/>\n      <path d=\"M50 42V74\" stroke=\"#BE123C\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n    </svg>"
    }
  ],
  steps: [
    { wordIds: ["lalata", "nayana"] },
    { wordIds: ["nasika", "karna"] },
    { wordIds: ["mukha", "danta"] },
    { wordIds: ["jihva"] }
  ],
  hotspots: {
    figures: [
    {
      key: "face",
      captionRu: "Лицо крупным планом (1–7)",
      captionEn: "Face Close-Up (1–7)",
      viewBox: "0 0 320 260",
      art: "<rect x=\"6\" y=\"6\" width=\"308\" height=\"248\" rx=\"14\" fill=\"#F8EFE6\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n  <path d=\"M134 210V238H186V210\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.4\"/>\n  <path d=\"M108 246C122 232 198 232 212 246\" fill=\"#0F766E\" stroke=\"#14213D\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>\n  <ellipse cx=\"90\" cy=\"140\" rx=\"11\" ry=\"19\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M88 132C84 136 84 144 88 148\" stroke=\"#14213D\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>\n  <ellipse cx=\"230\" cy=\"140\" rx=\"11\" ry=\"19\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M232 132C236 136 236 144 232 148\" stroke=\"#14213D\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>\n  <ellipse cx=\"160\" cy=\"136\" rx=\"68\" ry=\"82\" fill=\"#F4C7AB\" stroke=\"#14213D\" stroke-width=\"2.8\"/>\n  <path d=\"M92 120C92 68 122 46 160 46C198 46 228 68 228 120C214 88 190 78 160 78C130 78 106 88 92 120Z\" fill=\"#1E293B\" stroke=\"#14213D\" stroke-width=\"2.4\"/>\n  <path d=\"M114 100C125 92 141 92 150 98\" stroke=\"#1E293B\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n  <path d=\"M170 98C179 92 195 92 206 100\" stroke=\"#1E293B\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n  <ellipse cx=\"132\" cy=\"116\" rx=\"15\" ry=\"9.5\" fill=\"#FFFFFF\" stroke=\"#14213D\" stroke-width=\"2.4\"/>\n  <circle cx=\"132\" cy=\"116\" r=\"5.5\" fill=\"#1D4ED8\"/>\n  <circle cx=\"132\" cy=\"116\" r=\"2.6\" fill=\"#0F172A\"/>\n  <circle cx=\"130\" cy=\"114\" r=\"1.3\" fill=\"#FFFFFF\"/>\n  <ellipse cx=\"188\" cy=\"116\" rx=\"15\" ry=\"9.5\" fill=\"#FFFFFF\" stroke=\"#14213D\" stroke-width=\"2.4\"/>\n  <circle cx=\"188\" cy=\"116\" r=\"5.5\" fill=\"#1D4ED8\"/>\n  <circle cx=\"188\" cy=\"116\" r=\"2.6\" fill=\"#0F172A\"/>\n  <circle cx=\"186\" cy=\"114\" r=\"1.3\" fill=\"#FFFFFF\"/>\n  <path d=\"M160 112V145C153 149 149 147 149 143M160 145C167 149 171 147 171 143\" stroke=\"#14213D\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n  <path d=\"M132 172C148 167 172 167 188 172C183 196 137 196 132 172Z\" fill=\"#7F1D1D\" stroke=\"#14213D\" stroke-width=\"2.4\"/>\n  <path d=\"M139 172H181V179C170 181 150 181 139 179V172Z\" fill=\"#FFFFFF\" stroke=\"#14213D\" stroke-width=\"1.5\"/>\n  <path d=\"M148 185C154 180 166 180 172 185C174 194 146 194 148 185Z\" fill=\"#FB7185\" stroke=\"#14213D\" stroke-width=\"1.6\"/>\n  <path d=\"M129 171C146 165 174 165 191 171\" stroke=\"#E11D48\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <path d=\"M133 173C146 197 174 197 187 173\" stroke=\"#E11D48\" stroke-width=\"3.4\" stroke-linecap=\"round\"/>",
      pins: [
        { id: "lalata", num: 1, x: 160, y: 86, tx: 246, ty: 58 },
        { id: "nayana", num: 2, x: 132, y: 116, tx: 40, ty: 96 },
        { id: "nasika", num: 3, x: 160, y: 140, tx: 252, ty: 130 },
        { id: "mukha", num: 4, x: 150, y: 169, tx: 36, ty: 150 },
        { id: "karna", num: 5, x: 230, y: 140, tx: 276, ty: 178 },
        { id: "danta", num: 6, x: 160, y: 177, tx: 254, ty: 200 },
        { id: "jihva", num: 7, x: 172, y: 188, tx: 40, ty: 210 }
      ]
    }
    ]
  },
  groups: [
    { titleRu: "Верхняя часть лица", titleEn: "Upper Face", wordIds: ["lalata", "nayana"] },
    { titleRu: "Органы чувств", titleEn: "Sense Organs", wordIds: ["nayana", "nasika", "karna"] },
    { titleRu: "Рот и всё внутри", titleEn: "Mouth & Inside", wordIds: ["mukha", "danta", "jihva"] },
    { titleRu: "Парные", titleEn: "Paired", wordIds: ["nayana", "karna"] }
  ],
  categories: [
    { titleRu: "Органы чувств", titleEn: "Sense Organs", wordIds: ["nayana", "nasika", "karna"], bonusWordIds: ["jihva"] },
    { titleRu: "Область рта", titleEn: "Mouth Area", wordIds: ["mukha", "danta", "jihva"] },
    { titleRu: "Верхняя часть лица", titleEn: "Upper Face", wordIds: ["lalata", "nayana"] },
    { titleRu: "Внутри рта", titleEn: "Inside the Mouth", wordIds: ["danta", "jihva"] },
    { titleRu: "Парные", titleEn: "Paired", wordIds: ["nayana", "karna"] },
    { titleRu: "Непарные", titleEn: "Unpaired", wordIds: ["lalata", "mukha", "nasika", "danta", "jihva"] },
    { titleRu: "Чем видим, слышим и дышим", titleEn: "What We See, Hear & Breathe With", wordIds: ["nayana", "karna", "nasika"] },
    { titleRu: "Долгая гласная «ā» (ा)", titleEn: "Words with Long Vowel \"ā\" (ा)", wordIds: ["lalata", "nasika", "jihva"] },
    { titleRu: "Краткая гласная «i» (ि)", titleEn: "Words with Short Vowel \"i\" (ि)", wordIds: ["nasika", "jihva"] },
    { titleRu: "Всего два слога", titleEn: "Two Syllables Only", wordIds: ["mukha", "karna", "danta", "jihva"] },
    { titleRu: "Слова со звуком «न / ण» (na)", titleEn: "Words Containing \"न / ण\" (na)", wordIds: ["nayana", "nasika", "karna", "danta"] }
  ]
});
