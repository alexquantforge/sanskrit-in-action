/**
 * LESSON 6 · सङ्ख्याः · "Numbers 11–15" (5 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * The same build as Lessons 4 and 5, for the numerals 11–15:
 * - the counting forms (neuter nominative-accusative): एकादश, द्वादश, त्रयोदश, चतुर्दश, पञ्चदश
 * - quantity is shown only by beads, never by Arabic digits (Direct Method)
 * - the TPR gesture is clapping, not touching a body part
 * - IAST is hidden by default and can be switched on with the 🔤 button.
 * Data file for the generic engine in lesson-engine.js.
 */

SAL.registerLesson({
  key: "L6",
  num: 6,
  titleDeva: "सङ्ख्याः",
  titleRu: "Цифры 11–15",
  titleEn: "Numbers 11–15",
  topicRu: "одиннадцать, двенадцать, тринадцать, четырнадцать, пятнадцать",
  topicEn: "eleven, twelve, thirteen, fourteen, fifteen",
  introRu: "Шестой урок: числа от одиннадцати до пятнадцати — <code>एकादश</code>, <code>द्वादश</code>, <code>त्रयोदश</code>, <code>चतुर्दश</code>, <code>पञ्चदश</code>. Все они построены на <code>दश</code> «десять»: к основе первого числа прибавляется «десять». Количество показывают только бусины: ни арабских цифр, ни перевода.",
  introEn: "The sixth lesson: eleven to fifteen — <code>ekādaśa</code>, <code>dvādaśa</code>, <code>trayodaśa</code>, <code>caturdaśa</code>, <code>pañcadaśa</code>. They are all built on <code>daśa</code> “ten”: the stem of the first number plus “ten”. Quantity is shown only by beads: no Arabic digits, no translation.",
  gestureRu: "хлопните в ладоши столько раз",
  gestureEn: "clap your hands that many times",
  words: [
    {
      id: "ekadasa", deva: "एकादश", iast: "ekādaśa", ttsText: "एकादश",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"27\" cy=\"32\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"24.75\" cy=\"29.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"43\" cy=\"32\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"40.75\" cy=\"29.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"59\" cy=\"32\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"56.75\" cy=\"29.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"75\" cy=\"32\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"72.75\" cy=\"29.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"27\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"24.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"43\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"40.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"59\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"56.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"75\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"72.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"36\" cy=\"72\" r=\"6.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"34.05\" cy=\"70.05\" r=\"1.56\" fill=\"#FDE68A\"/>\n      <circle cx=\"50\" cy=\"72\" r=\"6.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"48.05\" cy=\"70.05\" r=\"1.56\" fill=\"#FDE68A\"/>\n      <circle cx=\"64\" cy=\"72\" r=\"6.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"62.05\" cy=\"70.05\" r=\"1.56\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "dvadasa", deva: "द्वादश", iast: "dvādaśa", ttsText: "द्वादश",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"27\" cy=\"32\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"24.75\" cy=\"29.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"43\" cy=\"32\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"40.75\" cy=\"29.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"59\" cy=\"32\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"56.75\" cy=\"29.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"75\" cy=\"32\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"72.75\" cy=\"29.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"27\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"24.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"43\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"40.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"59\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"56.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"75\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"72.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"27\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"24.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"43\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"40.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"59\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"56.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"75\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"72.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "trayodasa", deva: "त्रयोदश", iast: "trayodaśa", ttsText: "त्रयोदश",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"21\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"18.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"37\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"34.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"53\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"50.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"69\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"66.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"85\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"82.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"27\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"24.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"43\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"40.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"59\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"56.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"75\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"72.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"27\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"24.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"43\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"40.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"59\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"56.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"75\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"72.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "caturdasa", deva: "चतुर्दश", iast: "caturdaśa", ttsText: "चतुर्दश",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"21\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"18.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"37\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"34.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"53\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"50.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"69\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"66.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"85\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"82.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"21\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"18.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"37\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"34.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"53\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"50.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"69\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"66.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"85\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"82.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"27\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"24.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"43\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"40.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"59\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"56.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"75\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"72.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n    </svg>"
    },
    {
      id: "pancadasa", deva: "पञ्चदश", iast: "pañcadaśa", ttsText: "पञ्चदश",
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/>\n      <rect x=\"6\" y=\"6\" width=\"88\" height=\"88\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/>\n      <circle cx=\"21\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"18.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"37\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"34.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"53\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"50.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"69\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"66.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"85\" cy=\"30\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"82.75\" cy=\"27.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"21\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"18.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"37\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"34.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"53\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"50.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"69\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"66.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"85\" cy=\"52\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"82.75\" cy=\"49.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"21\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"18.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"37\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"34.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"53\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"50.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"69\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"66.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n      <circle cx=\"85\" cy=\"72\" r=\"7.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2.2\"/>\n      <circle cx=\"82.75\" cy=\"69.75\" r=\"1.8\" fill=\"#FDE68A\"/>\n    </svg>"
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
        captionRu: "Счёты: ряды от одиннадцати до пятнадцати",
        captionEn: "Counting Frame: Rows of Eleven to Fifteen",
        viewBox: "0 0 320 300",
        art: "<rect x=\"36\" y=\"16\" width=\"248\" height=\"268\" rx=\"16\" fill=\"#FFFBEB\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <rect x=\"36\" y=\"16\" width=\"248\" height=\"30\" rx=\"16\" fill=\"#FDE68A\" stroke=\"#14213D\" stroke-width=\"2.6\"/>\n  <path d=\"M52 31H268\" stroke=\"#B45309\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <line x1=\"52\" y1=\"70\" x2=\"268\" y2=\"70\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"46\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"43.15\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"68.8\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"65.95\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"91.6\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"88.75\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"114.4\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"111.55\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"137.2\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"134.35\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"160\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"157.15\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"182.8\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"179.95\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"205.6\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"202.75\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"228.4\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"225.55\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"251.2\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"248.35\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n      <circle cx=\"274\" cy=\"70\" r=\"9.5\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"271.15\" cy=\"67.15\" r=\"2.28\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"110\" x2=\"268\" y2=\"110\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"46\" cy=\"110\" r=\"9.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"43.21\" cy=\"107.21\" r=\"2.232\" fill=\"#FDE68A\"/>\n      <circle cx=\"66.7\" cy=\"110\" r=\"9.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"63.91\" cy=\"107.21\" r=\"2.232\" fill=\"#FDE68A\"/>\n      <circle cx=\"87.5\" cy=\"110\" r=\"9.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"84.71\" cy=\"107.21\" r=\"2.232\" fill=\"#FDE68A\"/>\n      <circle cx=\"108.2\" cy=\"110\" r=\"9.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"105.41\" cy=\"107.21\" r=\"2.232\" fill=\"#FDE68A\"/>\n      <circle cx=\"128.9\" cy=\"110\" r=\"9.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"126.11\" cy=\"107.21\" r=\"2.232\" fill=\"#FDE68A\"/>\n      <circle cx=\"149.6\" cy=\"110\" r=\"9.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"146.81\" cy=\"107.21\" r=\"2.232\" fill=\"#FDE68A\"/>\n      <circle cx=\"170.4\" cy=\"110\" r=\"9.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"167.61\" cy=\"107.21\" r=\"2.232\" fill=\"#FDE68A\"/>\n      <circle cx=\"191.1\" cy=\"110\" r=\"9.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"188.31\" cy=\"107.21\" r=\"2.232\" fill=\"#FDE68A\"/>\n      <circle cx=\"211.8\" cy=\"110\" r=\"9.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"209.01\" cy=\"107.21\" r=\"2.232\" fill=\"#FDE68A\"/>\n      <circle cx=\"232.5\" cy=\"110\" r=\"9.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"229.71\" cy=\"107.21\" r=\"2.232\" fill=\"#FDE68A\"/>\n      <circle cx=\"253.3\" cy=\"110\" r=\"9.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"250.51\" cy=\"107.21\" r=\"2.232\" fill=\"#FDE68A\"/>\n      <circle cx=\"274\" cy=\"110\" r=\"9.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"271.21\" cy=\"107.21\" r=\"2.232\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"150\" x2=\"268\" y2=\"150\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"46\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"43.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n      <circle cx=\"65\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"62.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n      <circle cx=\"84\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"81.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n      <circle cx=\"103\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"100.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n      <circle cx=\"122\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"119.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n      <circle cx=\"141\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"138.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n      <circle cx=\"160\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"157.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n      <circle cx=\"179\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"176.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n      <circle cx=\"198\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"195.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n      <circle cx=\"217\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"214.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n      <circle cx=\"236\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"233.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n      <circle cx=\"255\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"252.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n      <circle cx=\"274\" cy=\"150\" r=\"8.6\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"271.42\" cy=\"147.42\" r=\"2.064\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"190\" x2=\"268\" y2=\"190\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"46\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"43.63\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"63.5\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"61.13\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"81.1\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"78.73\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"98.6\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"96.23\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"116.2\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"113.83\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"133.7\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"131.33\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"151.2\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"148.83\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"168.8\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"166.43\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"186.3\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"183.93\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"203.8\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"201.43\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"221.4\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"219.03\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"238.9\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"236.53\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"256.5\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"254.13\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n      <circle cx=\"274\" cy=\"190\" r=\"7.9\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"271.63\" cy=\"187.63\" r=\"1.896\" fill=\"#FDE68A\"/>\n  <line x1=\"52\" y1=\"230\" x2=\"268\" y2=\"230\" stroke=\"#B45309\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n  <circle cx=\"46\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"43.81\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"62.3\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"60.11\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"78.6\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"76.41\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"94.9\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"92.71\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"111.1\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"108.91\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"127.4\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"125.21\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"143.7\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"141.51\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"160\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"157.81\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"176.3\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"174.11\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"192.6\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"190.41\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"208.9\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"206.71\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"225.1\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"222.91\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"241.4\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"239.21\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"257.7\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"255.51\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>\n      <circle cx=\"274\" cy=\"230\" r=\"7.3\" fill=\"#F59E0B\" stroke=\"#B45309\" stroke-width=\"2\"/>\n      <circle cx=\"271.81\" cy=\"227.81\" r=\"1.752\" fill=\"#FDE68A\"/>",
        pins: [
          { id: "ekadasa", num: 1, x: 300, y: 64, tx: 160, ty: 70 },
          { id: "dvadasa", num: 2, x: 20, y: 104, tx: 170.4, ty: 110 },
          { id: "trayodasa", num: 3, x: 300, y: 144, tx: 160, ty: 150 },
          { id: "caturdasa", num: 4, x: 20, y: 184, tx: 168.8, ty: 190 },
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
