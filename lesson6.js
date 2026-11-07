/**
 * LESSON 10 · सङ्ख्याः · "Counting Girls 1–5" (5 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * Счёт девочек: те же пять чисел, но в женском роде — форма, которой считают
 * девочек и женщин, а не предметы и не мальчиков:
 * - एका, द्वे, तिस्रः, चतस्रः, पञ्च
 * - окончания -ा (एका), -े (द्वे), -ः (तिस्रः, चतस्रः); पञ्च не меняется
 * - на каждой картинке девочки: платье и косички, один рисунок = одна девочка;
 *   ни арабских цифр, ни точек — количество видно по самим девочкам
 * - TPR-жест здесь — прыжок, а не хлопок: урок не повторяет жест девятого
 * - IAST скрыт по умолчанию и включается кнопкой 🔤.
 * Data file for the generic engine in lesson-engine.js.
 */

/* ============================================================================
   1. КАРТИНКИ
   Считаем девочек: на карточке ровно столько фигурок в платье, сколько
   означает числительное. Ни точек, ни арабских цифр — количество видно
   только по самим девочкам, поэтому एका читается как «одна девочка».
   Та же фигурка стоит в рядах «двора» на схеме урока.
   ========================================================================= */
var L6_INK = '#14213D';
var L6_SKIN = '#F6C89A';
var L6_HAIR = '#3B2438';
var L6_DRESS = '#B03A6E';

/* одна девочка: волосы с косичками, платье, руки, ноги и туфельки */
function l6Girl(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
    '<circle cx="0" cy="-12.6" r="6.1" fill="' + L6_HAIR + '"/>' +
    '<circle cx="0" cy="-10.8" r="5.7" fill="' + L6_SKIN + '" stroke="' + L6_INK + '" stroke-width="1.1"/>' +
    '<path d="M-5.4 -10.2 -7.0 4.6" stroke="' + L6_HAIR + '" stroke-width="2.9" stroke-linecap="round"/>' +
    '<path d="M5.4 -10.2 7.0 4.6" stroke="' + L6_HAIR + '" stroke-width="2.9" stroke-linecap="round"/>' +
    '<circle cx="-7.2" cy="-9.0" r="2.4" fill="' + L6_HAIR + '"/>' +
    '<circle cx="7.2" cy="-9.0" r="2.4" fill="' + L6_HAIR + '"/>' +
    '<path d="M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z" fill="' + L6_DRESS + '" stroke="' + L6_INK + '" stroke-width="1.2" stroke-linejoin="round"/>' +
    '<path d="M-4.3 -2.2 -7.6 4.4" stroke="' + L6_SKIN + '" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M4.3 -2.2 7.6 4.4" stroke="' + L6_SKIN + '" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M-2.7 9.0 -3.5 14.6" stroke="' + L6_SKIN + '" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M2.7 9.0 3.5 14.6" stroke="' + L6_SKIN + '" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M-3.5 14.6 -5.9 14.6" stroke="' + L6_INK + '" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M3.5 14.6 5.9 14.6" stroke="' + L6_INK + '" stroke-width="2.2" stroke-linecap="round"/>' +
    '</g>';
}

/* раскладка фигурок по количеству: 1 / 2 / 3 / 4 (2 × 2) / 5 (3 + 2) */
var L6_LAYOUT = {
  1: [[50, 54, 1.3]],
  2: [[33, 54, 1.05], [67, 54, 1.05]],
  3: [[25, 54, 0.88], [50, 54, 0.88], [75, 54, 0.88]],
  4: [[34, 34, 0.88], [66, 34, 0.88], [34, 72, 0.88], [66, 72, 0.88]],
  5: [[30, 32, 0.82], [50, 32, 0.82], [70, 32, 0.82], [40, 72, 0.82], [60, 72, 0.82]]
};

/* картинка урока: столько девочек, сколько означает числительное */
function l6Card(n) {
  return '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100" height="100" rx="14" fill="#FFFBEB"/>' +
    '<rect x="7" y="7" width="86" height="86" rx="10" fill="none" stroke="#E5DEC9" stroke-width="1.5"/>' +
    L6_LAYOUT[n].map(function (p) { return l6Girl(p[0], p[1], p[2]); }).join('') +
    '</svg>';
}

/* ряд «двора»: девочки стоят на одной линии, ровно по числу */
var L6_GAP = 21;
function l6Row(n, line) {
  var start = 160 - (n - 1) * L6_GAP / 2, out = '', i;
  out += '<path d="M58 ' + line + 'H262" stroke="#D6CBB3" stroke-width="2.6" stroke-linecap="round"/>';
  for (i = 0; i < n; i++) out += l6Girl(start + i * L6_GAP, line - 14.6 * 0.62, 0.62);
  return out;
}

/* пять рядов: одна девочка, две, три, четыре, пять */
var L6_LINES = [70, 110, 150, 190, 230];
function l6Yard() {
  var out = '<rect x="36" y="16" width="248" height="268" rx="16" fill="#FFFBEB" stroke="' + L6_INK + '" stroke-width="2.6"/>' +
    '<rect x="36" y="16" width="248" height="30" rx="16" fill="#FBCFE8" stroke="' + L6_INK + '" stroke-width="2.6"/>' +
    '<path d="M52 31H268" stroke="#9D174D" stroke-width="2" stroke-linecap="round"/>';
  for (var i = 0; i < L6_LINES.length; i++) out += l6Row(i + 1, L6_LINES[i]);
  return out;
}

/* слова: формы женского рода для счёта девочек */
var L6_WORDS = [
    {
      id: "eka", deva: "एका", iast: "ekā", ttsText: "एका", value: 1,
      /* женский род: -ा у एका, -े у द्वे, -ः у तिस्रः / चतस्रः, पञ्च не меняется */
      grammaticalNumber: "sg",
      syll: ["ए", "का"],
      typoDeva: "ऐका", typoIast: "aikā",
      maskedPrefix: "ए", maskedHidden: "का",
      gapDeva: "एक_", gapIast: "eka_", gapAnswer: "ा",
      gapChoices: [
        { deva: "ा", iast: "ā" },
        { deva: "ः", iast: "ḥ" },
        { deva: "े", iast: "e" },
        { deva: "ौ", iast: "au" }
      ],
      missingDisplay: "ए_ा", missingAnswer: "क",
      missingChoices: ["क", "ख", "ग", "घ"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/><rect x=\"7\" y=\"7\" width=\"86\" height=\"86\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/><g transform=\"translate(50 54) scale(1.3)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g></svg>"
    },
    {
      id: "dve", deva: "द्वे", iast: "dve", ttsText: "द्वे", value: 2,
      /* женский род: -ा у एका, -े у द्वे, -ः у तिस्रः / चतस्रः, पञ्च не меняется */
      grammaticalNumber: "du",
      syll: ["द्वे"],
      typoDeva: "द्वै", typoIast: "dvai",
      maskedPrefix: "द्व", maskedHidden: "े",
      gapDeva: "द्व_", gapIast: "dv_", gapAnswer: "े",
      gapChoices: [
        { deva: "े", iast: "e" },
        { deva: "ो", iast: "o" },
        { deva: "ा", iast: "ā" },
        { deva: "ौ", iast: "au" }
      ],
      missingDisplay: "_े", missingAnswer: "द्व",
      missingChoices: ["द्व", "ध्व", "त्व", "द्र"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/><rect x=\"7\" y=\"7\" width=\"86\" height=\"86\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/><g transform=\"translate(33 54) scale(1.1)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(67 54) scale(1.1)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g></svg>"
    },
    {
      id: "tisrah", deva: "तिस्रः", iast: "tisraḥ", ttsText: "तिस्रः", value: 3,
      /* женский род: -ा у एका, -े у द्वे, -ः у तिस्रः / चतस्रः, पञ्च не меняется */
      grammaticalNumber: "pl",
      syll: ["ति", "स्रः"],
      typoDeva: "तिसरः", typoIast: "tisaraḥ",
      maskedPrefix: "तिस्र", maskedHidden: "ः",
      gapDeva: "तिस्र_", gapIast: "tisra_", gapAnswer: "ः",
      gapChoices: [
        { deva: "ः", iast: "ḥ" },
        { deva: "म्", iast: "m" },
        { deva: "ा", iast: "ā" },
        { deva: "ौ", iast: "au" }
      ],
      missingDisplay: "ति_ः", missingAnswer: "स्र",
      missingChoices: ["स्र", "श्र", "स्त", "स्य"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/><rect x=\"7\" y=\"7\" width=\"86\" height=\"86\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/><g transform=\"translate(25 54) scale(0.9)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(50 54) scale(0.9)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(75 54) scale(0.9)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g></svg>"
    },
    {
      id: "catasrah", deva: "चतस्रः", iast: "catasraḥ", ttsText: "चतस्रः", value: 4,
      /* женский род: -ा у एका, -े у द्वे, -ः у तिस्रः / चतस्रः, पञ्च не меняется */
      grammaticalNumber: "pl",
      syll: ["चत", "स्रः"],
      typoDeva: "चतश्रः", typoIast: "cataśraḥ",
      maskedPrefix: "चतस्र", maskedHidden: "ः",
      gapDeva: "चतस्र_", gapIast: "catasra_", gapAnswer: "ः",
      gapChoices: [
        { deva: "ः", iast: "ḥ" },
        { deva: "म्", iast: "m" },
        { deva: "ि", iast: "i" },
        { deva: "ा", iast: "ā" }
      ],
      missingDisplay: "चत_ः", missingAnswer: "स्र",
      missingChoices: ["स्र", "श्र", "स्न", "स्य"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/><rect x=\"7\" y=\"7\" width=\"86\" height=\"86\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/><g transform=\"translate(34 34) scale(0.9)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(66 34) scale(0.9)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(34 72) scale(0.9)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(66 72) scale(0.9)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g></svg>"
    },
    {
      id: "panca", deva: "पञ्च", iast: "pañca", ttsText: "पञ्च", value: 5,
      /* женский род: -ा у एका, -े у द्वे, -ः у तिस्रः / चतस्रः, पञ्च не меняется */
      grammaticalNumber: "pl",
      syll: ["प", "ञ्च"],
      typoDeva: "पन्च", typoIast: "panca",
      maskedPrefix: "प", maskedHidden: "ञ्च",
      gapDeva: "पञ्_", gapIast: "pañ_", gapAnswer: "च",
      gapChoices: [
        { deva: "च", iast: "ca" },
        { deva: "च्", iast: "c" },
        { deva: "छ", iast: "cha" },
        { deva: "ज", iast: "ja" }
      ],
      missingDisplay: "_ञ्च", missingAnswer: "प",
      missingChoices: ["प", "फ", "ब", "भ"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/><rect x=\"7\" y=\"7\" width=\"86\" height=\"86\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/><g transform=\"translate(30 32) scale(0.8)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(50 32) scale(0.8)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(70 32) scale(0.8)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(40 72) scale(0.8)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(60 72) scale(0.8)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g></svg>"
    }
];

SAL.registerLesson({
  key: "L6",
  num: 10,
  titleDeva: "सङ्ख्याः",
  titleRu: "Счёт девочек 1–5",
  titleEn: "Counting Girls 1–5",
  topicRu: "одна девочка, две девочки, три девочки, четыре девочки, пять девочек",
  topicEn: "one girl, two girls, three girls, four girls, five girls",
  introRu: "Десятый урок: те же пять чисел, но в женском роде — <code>एका</code>, <code>द्वे</code>, <code>तिस्रः</code>, <code>चतस्रः</code>, <code>पञ्च</code>. На картинке девочки, и слово говорит, сколько их: одна девочка — <code>एका</code>, две — <code>द्वे</code>, три — <code>तिस्रः</code>, четыре — <code>चतस्रः</code>, пять — <code>पञ्च</code>. Женский род виден по окончанию: <code>-ा</code> у एका, <code>-े</code> у द्वे, <code>-ः</code> у तिस्रः и चतस्रः; पञ्च не меняется. Ни арабских цифр, ни перевода: количество показывают сами девочки.",
  introEn: "The tenth lesson: the same five numbers in the feminine gender — <code>ekā</code>, <code>dve</code>, <code>tisraḥ</code>, <code>catasraḥ</code>, <code>pañca</code>. The picture shows girls, and the word says how many: one girl is <code>ekā</code>, two are <code>dve</code>, three are <code>tisraḥ</code>, four are <code>catasraḥ</code>, five are <code>pañca</code>. The feminine gender shows in the ending: <code>-ā</code> in एका, <code>-e</code> in द्वे, <code>-ḥ</code> in तिस्रः and चतस्रः; पञ्च does not change. No Arabic digits and no translation: the girls themselves show the quantity.",
  aim: {
    ru: {
      main: "Ввести и отработать числительные 1–5 в женском роде в контексте счёта девочек.",
      subs: [
        "Показать женские окончания: -ा у एका, -े у द्वे, -ः у तिस्रः и चतस्रः.",
        "Поставить произношение तिस्रः и चतस्रः.",
        "Дать практику счёта вслух: назвать число по картинке и картинку по числу."
      ]
    },
    en: {
      main: "To introduce and practise the numerals 1–5 in the feminine gender in the context of counting girls.",
      subs: [
        "To present the feminine endings: -ā in एका, -e in द्वे, -ḥ in तिस्रः and चतस्रः.",
        "To give practice in the pronunciation of तिस्रः and चतस्रः.",
        "To give practice in counting aloud: name the number from the picture and the picture from the number."
      ]
    }
  },
  gestureRu: "прыгните столько раз, сколько девочек",
  gestureEn: "jump once for every girl",
  prodTitleRu: "Живая речь: назовите вслух все {n} числительных",
  prodTitleEn: "Freer Production: Say All {n} Numerals Aloud",
  /* количество на карточках считаем девочками — этим урок и отличается от «Счёта мальчиков» */
  countKind: "girls",
  words: L6_WORDS,
  /* слова для поля 10 × 10: настоящий санскрит, но в этом уроке их нет */
  decoys: [
    "एकः",
    "द्वौ",
    "त्रयः",
    "चत्वारः",
    "एकम्",
    "त्रीणि",
    "चत्वारि",
    "षट्",
    "सप्त",
    "अष्ट",
    "नव",
    "दश",
    "बालकः",
    "बालिका",
    "बालकौ",
    "कन्या",
    "वृक्षः",
    "जलम्",
    "फलम्",
    "गृहम्",
    "पुस्तकम्",
    "हस्तः",
    "पादः",
    "मुखम्",
    "नयनम्",
    "कर्णः",
    "शीर्षम्",
    "दन्तः",
    "जिह्वा",
    "नासिका",
    "ललाटम्",
    "अङ्गुली"
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
    { ru: 'Есть висарга ः', en: 'Has a visarga (ः)',
      test: function (w) { return w.deva.indexOf('ः') >= 0; } },
    { ru: 'Есть звук «स» (sa)', en: 'Contains "स" (sa)',
      test: function (w) { return w.deva.indexOf('स') >= 0; } },
    { ru: 'Есть звук «च» (ca)', en: 'Contains "च" (ca)',
      test: function (w) { return w.deva.indexOf('च') >= 0; } },
    { ru: 'Окончание ा или े', en: 'Ends in ा or े',
      test: function (w) { return /[\u093E\u0947]$/.test(w.deva); } }
  ],
  steps: [
    { wordIds: ["eka", "dve"] },
    { wordIds: ["tisrah", "catasrah"] },
    { wordIds: ["panca"] }
  ],
  hotspots: {
    figures: [
      {
        key: "yard",
        captionRu: "Двор: ряды девочек — одна, две, три, четыре, пять",
        captionEn: "The Yard: Rows of Girls — One to Five",
        viewBox: "0 0 320 300",
        art: "<rect x=\"36\" y=\"16\" width=\"248\" height=\"268\" rx=\"16\" fill=\"#FFFBEB\" stroke=\"#14213D\" stroke-width=\"2.6\"/><rect x=\"36\" y=\"16\" width=\"248\" height=\"30\" rx=\"16\" fill=\"#FBCFE8\" stroke=\"#14213D\" stroke-width=\"2.6\"/><path d=\"M52 31H268\" stroke=\"#9D174D\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M58 70H262\" stroke=\"#D6CBB3\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><g transform=\"translate(160 60.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><path d=\"M58 110H262\" stroke=\"#D6CBB3\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><g transform=\"translate(149.5 100.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(170.5 100.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><path d=\"M58 150H262\" stroke=\"#D6CBB3\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><g transform=\"translate(139 140.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(160 140.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(181 140.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><path d=\"M58 190H262\" stroke=\"#D6CBB3\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><g transform=\"translate(128.5 180.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(149.5 180.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(170.5 180.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(191.5 180.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><path d=\"M58 230H262\" stroke=\"#D6CBB3\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><g transform=\"translate(118 220.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(139 220.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(160 220.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(181 220.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g><g transform=\"translate(202 220.9) scale(0.6)\"><circle cx=\"0\" cy=\"-12.6\" r=\"6.1\" fill=\"#3B2438\"/><circle cx=\"0\" cy=\"-10.8\" r=\"5.7\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.1\"/><path d=\"M-5.4 -10.2 -7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><path d=\"M5.4 -10.2 7.0 4.6\" stroke=\"#3B2438\" stroke-width=\"2.9\" stroke-linecap=\"round\"/><circle cx=\"-7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><circle cx=\"7.2\" cy=\"-9.0\" r=\"2.4\" fill=\"#3B2438\"/><path d=\"M-4.6 -5.0 4.6 -5.0 8.2 9.0 -8.2 9.0Z\" fill=\"#B03A6E\" stroke=\"#14213D\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M-4.3 -2.2 -7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M4.3 -2.2 7.6 4.4\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-2.7 9.0 -3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M2.7 9.0 3.5 14.6\" stroke=\"#F6C89A\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M-3.5 14.6 -5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M3.5 14.6 5.9 14.6\" stroke=\"#14213D\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g>",
        pins: [
        { id: "eka", num: 1, x: 300, y: 70, tx: 160, ty: 60.9 },
        { id: "dve", num: 2, x: 20, y: 110, tx: 170.5, ty: 100.9 },
        { id: "tisrah", num: 3, x: 300, y: 150, tx: 160, ty: 140.9 },
        { id: "catasrah", num: 4, x: 20, y: 190, tx: 170.5, ty: 180.9 },
        { id: "panca", num: 5, x: 300, y: 230, tx: 160, ty: 220.9 }
        ]
      }
    ]
  },
  groups: [
    { titleRu: "С висаргой ः", titleEn: "Ending in ः", wordIds: ["tisrah", "catasrah"] },
    { titleRu: "Без висарги", titleEn: "No Visarga", wordIds: ["eka", "dve", "panca"] },
    { titleRu: "Окончание ा или े", titleEn: "Ending in ा or े", wordIds: ["eka", "dve"] },
    { titleRu: "Два слога", titleEn: "Two Syllables", wordIds: ["eka", "tisrah", "panca"] }
  ],
  categories: [
    { titleRu: "Больше двух девочек", titleEn: "More Than Two Girls", wordIds: ["tisrah", "catasrah", "panca"] },
    { titleRu: "Меньше трёх девочек", titleEn: "Fewer Than Three Girls", wordIds: ["eka", "dve"] },
    { titleRu: "Больше трёх девочек", titleEn: "More Than Three Girls", wordIds: ["catasrah", "panca"] },
    { titleRu: "Меньше четырёх девочек", titleEn: "Fewer Than Four Girls", wordIds: ["eka", "dve", "tisrah"] },
    { titleRu: "Оканчиваются на ः (висарга, ḥ)", titleEn: "Ending in ः (visarga, ḥ)",
      hintRu: "Две точки справа от буквы — ः (висарга): придыхание на конце слова, в латинице «ḥ».",
      hintEn: "Two dots to the right of the letter — ः (visarga): a breath at the end of the word, written “ḥ” in Latin.",
      wordIds: ["tisrah", "catasrah"] },
    { titleRu: "Не оканчиваются на ः", titleEn: "Not ending in ः",
      hintRu: "Наоборот: двух точек ः на конце слова нет.",
      hintEn: "The other way round: there are no two dots ः at the end.",
      wordIds: ["eka", "dve", "panca"] },
    { titleRu: "Нет буквы «स» (sa)", titleEn: "Without the letter «स» (sa)",
      hintRu: "Наоборот: буквы स в слове нет.",
      hintEn: "The other way round: the word has no स at all.",
      wordIds: ["dve", "panca"] },
    { titleRu: "Ровно два слога", titleEn: "Exactly two syllables",
      hintRu: "Считаем гласные звуки: например, नरः — два слога, जलम् — три.",
      hintEn: "Count the vowel sounds: नरः has two syllables, जलम् has three.",
      wordIds: ["eka", "tisrah", "panca"] },
    { titleRu: "Окончание ा или ः", titleEn: "Ending in ा or ः",
      hintRu: "Последний знак слова — либо «палочка» ा, либо две точки ः.",
      hintEn: "The last sign of the word is either the “stroke” ा or the two dots ः.",
      wordIds: ["eka", "tisrah", "catasrah"] },
    { titleRu: "Все пять — женский род", titleEn: "All Five Are Feminine", wordIds: ["eka", "dve", "tisrah", "catasrah", "panca"] }
  ]
});
