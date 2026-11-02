/**
 * LESSON 9 · सङ्ख्याः · "Counting Boys 1–5" (5 слов)
 * Cambridge CELTA / Direct Method PPP: Presentation → Practice → Production.
 * The masculine counterpart of the counting lesson: the same five numbers in
 * the form used for counting boys, not things:
 * - एकः, द्वौ, त्रयः, चत्वारः, पञ्च
 * - the endings are -ः (एकः, त्रयः, चत्वारः) and -ौ (द्वौ); पञ्च does not change
 * - every picture shows BOYS, so the count is visibly about boys, not dots:
 *   one figure = one boy, no Arabic digits, no abstract counters
 * - the TPR gesture here is clapping, not touching a body part
 * - IAST is hidden by default and can be switched on with the 🔤 button.
 * Data file for the generic engine in lesson-engine.js.
 */

/* ============================================================================
   1. КАРТИНКИ
   Считаем мальчиков: на карточке ровно столько фигурок в синей рубашке,
   сколько означает числительное. Ни точек, ни арабских цифр — количество
   видно только по самим мальчикам, поэтому एकः читается как «один мальчик».
   Та же фигурка стоит в рядах «двора» на схеме урока.
   ========================================================================= */
var L5_INK = '#14213D';
var L5_SKIN = '#F6C89A';
var L5_SHIRT = '#2B4BA8';
var L5_PANTS = '#374151';

/* один мальчик: голова с волосами, рубашка, руки в стороны, ноги и ступни */
function l5Boy(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
    '<circle cx="0" cy="-12.8" r="6.3" fill="' + L5_INK + '"/>' +
    '<circle cx="0" cy="-10.9" r="6" fill="' + L5_SKIN + '" stroke="' + L5_INK + '" stroke-width="1.2"/>' +
    '<rect x="-5" y="-4.6" width="10" height="12.6" rx="4.2" fill="' + L5_SHIRT + '" stroke="' + L5_INK + '" stroke-width="1.3"/>' +
    '<path d="M-4.4 -1.4 -8.4 6" stroke="' + L5_SHIRT + '" stroke-width="2.6" stroke-linecap="round"/>' +
    '<path d="M4.4 -1.4 8.4 6" stroke="' + L5_SHIRT + '" stroke-width="2.6" stroke-linecap="round"/>' +
    '<path d="M-2.5 7.4 -3.6 14.2" stroke="' + L5_PANTS + '" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M2.5 7.4 3.6 14.2" stroke="' + L5_PANTS + '" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2" stroke="' + L5_INK + '" stroke-width="2" stroke-linecap="round"/>' +
    '</g>';
}

/* раскладка фигурок по количеству: 1 / 2 / 3 / 4 (2 × 2) / 5 (3 + 2) */
var L5_LAYOUT = {
  1: [[50, 54, 1.3]],
  2: [[33, 54, 1.05], [67, 54, 1.05]],
  3: [[25, 54, 0.88], [50, 54, 0.88], [75, 54, 0.88]],
  4: [[34, 35, 0.88], [66, 35, 0.88], [34, 71, 0.88], [66, 71, 0.88]],
  5: [[30, 33, 0.82], [50, 33, 0.82], [70, 33, 0.82], [40, 71, 0.82], [60, 71, 0.82]]
};

/* картинка урока: столько мальчиков, сколько означает числительное */
function l5Card(n) {
  return '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100" height="100" rx="14" fill="#FFFBEB"/>' +
    '<rect x="7" y="7" width="86" height="86" rx="10" fill="none" stroke="#E5DEC9" stroke-width="1.5"/>' +
    L5_LAYOUT[n].map(function (p) { return l5Boy(p[0], p[1], p[2]); }).join('') +
    '</svg>';
}

/* ряд «двора»: мальчики стоят на одной линии, ровно по числу */
function l5Row(n, line) {
  var gap = 21, start = 160 - (n - 1) * gap / 2, out = '', i;
  out += '<path d="M58 ' + line + 'H262" stroke="#D6CBB3" stroke-width="2.6" stroke-linecap="round"/>';
  for (i = 0; i < n; i++) out += l5Boy(start + i * gap, line - 15.4 * 0.62, 0.62);
  return out;
}

/* пять рядов: один мальчик, два, три, четыре, пять */
var L5_LINES = [70, 110, 150, 190, 230];
function l5Yard() {
  var out = '<rect x="36" y="16" width="248" height="268" rx="16" fill="#FFFBEB" stroke="' + L5_INK + '" stroke-width="2.6"/>' +
    '<rect x="36" y="16" width="248" height="30" rx="16" fill="#FDE68A" stroke="' + L5_INK + '" stroke-width="2.6"/>' +
    '<path d="M52 31H268" stroke="#B45309" stroke-width="2" stroke-linecap="round"/>';
  for (var i = 0; i < L5_LINES.length; i++) out += l5Row(i + 1, L5_LINES[i]);
  return out;
}

/* слова: формы мужского рода для счёта мальчиков */
var L5_WORDS = [
    {
      id: "ekah", deva: "एकः", iast: "ekaḥ", ttsText: "एकः", value: 1,
      /* мужской род: -ः у एकः / त्रयः / चत्वारः и -ौ у द्वौ; पञ्च не меняется */
      grammaticalNumber: "sg",
      syll: ["ए", "कः"],
      typoDeva: "ऐकः", typoIast: "aikaḥ",
      maskedPrefix: "ए", maskedHidden: "कः",
      gapDeva: "एक_", gapIast: "eka_", gapAnswer: "ः",
      gapChoices: [
        { deva: "ः", iast: "ḥ" },
        { deva: "म्", iast: "m" },
        { deva: "ौ", iast: "au" },
        { deva: "ा", iast: "ā" }
      ],
      missingDisplay: "ए_ः", missingAnswer: "क",
      missingChoices: ["क", "ख", "ग", "घ"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/><rect x=\"7\" y=\"7\" width=\"86\" height=\"86\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/><g transform=\"translate(50 54) scale(1.3)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g></svg>"
    },
    {
      id: "dvau", deva: "द्वौ", iast: "dvau", ttsText: "द्वौ", value: 2,
      /* мужской род: -ः у एकः / त्रयः / चत्वारः и -ौ у द्वौ; पञ्च не меняется */
      grammaticalNumber: "du",
      syll: ["द्वौ"],
      typoDeva: "द्वै", typoIast: "dvai",
      maskedPrefix: "द्व", maskedHidden: "ौ",
      gapDeva: "द्व_", gapIast: "dv_", gapAnswer: "ौ",
      gapChoices: [
        { deva: "ौ", iast: "au" },
        { deva: "ो", iast: "o" },
        { deva: "े", iast: "e" },
        { deva: "ः", iast: "ḥ" }
      ],
      missingDisplay: "_ौ", missingAnswer: "द्व",
      missingChoices: ["द्व", "ध्व", "त्व", "द्र"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/><rect x=\"7\" y=\"7\" width=\"86\" height=\"86\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/><g transform=\"translate(33 54) scale(1.05)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(67 54) scale(1.05)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g></svg>"
    },
    {
      id: "trayah", deva: "त्रयः", iast: "trayaḥ", ttsText: "त्रयः", value: 3,
      /* мужской род: -ः у एकः / त्रयः / चत्वारः и -ौ у द्वौ; पञ्च не меняется */
      grammaticalNumber: "pl",
      syll: ["त्र", "यः"],
      typoDeva: "त्रियः", typoIast: "triyaḥ",
      maskedPrefix: "त्र", maskedHidden: "यः",
      gapDeva: "त्रय_", gapIast: "traya_", gapAnswer: "ः",
      gapChoices: [
        { deva: "ः", iast: "ḥ" },
        { deva: "म्", iast: "m" },
        { deva: "ौ", iast: "au" },
        { deva: "ा", iast: "ā" }
      ],
      missingDisplay: "त्र_ः", missingAnswer: "य",
      missingChoices: ["य", "ण", "न", "र"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/><rect x=\"7\" y=\"7\" width=\"86\" height=\"86\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/><g transform=\"translate(25 54) scale(0.88)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(50 54) scale(0.88)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(75 54) scale(0.88)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g></svg>"
    },
    {
      id: "catvarah", deva: "चत्वारः", iast: "catvāraḥ", ttsText: "चत्वारः", value: 4,
      /* мужской род: -ः у एकः / त्रयः / चत्वारः и -ौ у द्वौ; पञ्च не меняется */
      grammaticalNumber: "pl",
      syll: ["च", "त्वा", "रः"],
      typoDeva: "चत्वादः", typoIast: "catvādaḥ",
      maskedPrefix: "चत्वा", maskedHidden: "रः",
      gapDeva: "चत्वार_", gapIast: "catvāra_", gapAnswer: "ः",
      gapChoices: [
        { deva: "ः", iast: "ḥ" },
        { deva: "म्", iast: "m" },
        { deva: "ौ", iast: "au" },
        { deva: "ा", iast: "ā" }
      ],
      missingDisplay: "चत्वा_ः", missingAnswer: "र",
      missingChoices: ["र", "ल", "न", "ष"],
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/><rect x=\"7\" y=\"7\" width=\"86\" height=\"86\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/><g transform=\"translate(34 35) scale(0.88)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(66 35) scale(0.88)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(34 71) scale(0.88)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(66 71) scale(0.88)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g></svg>"
    },
    {
      id: "panca", deva: "पञ्च", iast: "pañca", ttsText: "पञ्च", value: 5,
      /* мужской род: -ः у एकः / त्रयः / चत्वारः и -ौ у द्वौ; पञ्च не меняется */
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
      svg: "<svg viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"14\" fill=\"#FFFBEB\"/><rect x=\"7\" y=\"7\" width=\"86\" height=\"86\" rx=\"10\" fill=\"none\" stroke=\"#E5DEC9\" stroke-width=\"1.5\"/><g transform=\"translate(30 33) scale(0.82)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(50 33) scale(0.82)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(70 33) scale(0.82)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(40 71) scale(0.82)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(60 71) scale(0.82)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g></svg>"
    }
];

SAL.registerLesson({
  key: "L5",
  num: 9,
  titleDeva: "सङ्ख्याः",
  titleRu: "Счёт мальчиков 1–5",
  titleEn: "Counting Boys 1–5",
  topicRu: "один мальчик, два мальчика, три мальчика, четыре мальчика, пять мальчиков",
  topicEn: "one boy, two boys, three boys, four boys, five boys",
  introRu: "Девятый урок: пять чисел в мужском роде — <code>एकः</code>, <code>द्वौ</code>, <code>त्रयः</code>, <code>चत्वारः</code>, <code>पञ्च</code>. На картинке мальчики, и слово говорит, сколько их: один мальчик — <code>एकः</code>, два — <code>द्वौ</code>, три — <code>त्रयः</code>, четыре — <code>चत्वारः</code>, пять — <code>पञ्च</code>. Мужской род виден по окончанию: <code>-ः</code> или <code>-ौ</code>. Ни арабских цифр, ни перевода: количество показывают сами мальчики.",
  introEn: "The ninth lesson: the five numbers in the masculine gender — <code>ekaḥ</code>, <code>dvau</code>, <code>trayaḥ</code>, <code>catvāraḥ</code>, <code>pañca</code>. The picture shows boys, and the word says how many: one boy is <code>ekaḥ</code>, two are <code>dvau</code>, three are <code>trayaḥ</code>, four are <code>catvāraḥ</code>, five are <code>pañca</code>. The masculine gender shows in the ending: <code>-ḥ</code> or <code>-au</code>. No Arabic digits and no translation: the boys themselves show the quantity.",
  /* цели урока по схеме CELTA: главная цель — языковой материал, подцели — «другая половина» */
  aim: {
    ru: {
      main: "Ввести и отработать числительные 1–5 в мужском роде в контексте счёта мальчиков.",
      subs: [
        "Показать окончания мужского рода: -ः у एकः, त्रयः, चत्वारः и -ौ у द्वौ.",
        "Поставить произношение चत्वारः и पञ्च.",
        "Дать практику счёта вслух: назвать число по картинке и картинку по числу."
      ]
    },
    en: {
      main: "To introduce and practise the numerals 1–5 in the masculine gender in the context of counting boys.",
      subs: [
        "To present the masculine endings: -ḥ in एकः, त्रयः, चत्वारः and -au in द्वौ.",
        "To give practice in the pronunciation of चत्वारः and पञ्च.",
        "To give practice in counting aloud: name the number from the picture and the picture from the number."
      ]
    }
  },
  gestureRu: "хлопните в ладоши столько раз, сколько мальчиков",
  gestureEn: "clap your hands once for every boy",
  prodTitleRu: "Живая речь: назовите вслух все {n} числительных",
  prodTitleEn: "Freer Production: Say All {n} Numerals Aloud",
  /* количество на карточках считаем мальчиками — этим урок и отличается от «Цифр 1–5» */
  countKind: "boys",
  words: L5_WORDS,
  /* слова для поля 10 × 10: настоящий санскрит, но в этом уроке их нет */
  decoys: [
    "एकम्",
    "द्वे",
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
    { ru: 'Есть звук «व» (va)', en: 'Contains "व" (va)',
      test: function (w) { return w.deva.indexOf('व') >= 0; } },
    { ru: 'Есть звук «च» (ca)', en: 'Contains "च" (ca)',
      test: function (w) { return w.deva.indexOf('च') >= 0; } },
    { ru: 'Есть долгий гласный (ा / ौ)', en: 'Has a long vowel (ा / ौ)',
      test: function (w) { return /[\u093E\u094C]/.test(w.deva); } }
  ],
  steps: [
    { wordIds: ["ekah", "dvau"] },
    { wordIds: ["trayah", "catvarah"] },
    { wordIds: ["panca"] }
  ],
  hotspots: {
    figures: [
      {
        key: "yard",
        captionRu: "Двор: ряды мальчиков — один, два, три, четыре, пять",
        captionEn: "The Yard: Rows of Boys — One to Five",
        viewBox: "0 0 320 300",
        art: "<rect x=\"36\" y=\"16\" width=\"248\" height=\"268\" rx=\"16\" fill=\"#FFFBEB\" stroke=\"#14213D\" stroke-width=\"2.6\"/><rect x=\"36\" y=\"16\" width=\"248\" height=\"30\" rx=\"16\" fill=\"#FDE68A\" stroke=\"#14213D\" stroke-width=\"2.6\"/><path d=\"M52 31H268\" stroke=\"#B45309\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M58 70H262\" stroke=\"#D6CBB3\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><g transform=\"translate(160 60.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><path d=\"M58 110H262\" stroke=\"#D6CBB3\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><g transform=\"translate(149.5 100.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(170.5 100.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><path d=\"M58 150H262\" stroke=\"#D6CBB3\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><g transform=\"translate(139 140.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(160 140.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(181 140.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><path d=\"M58 190H262\" stroke=\"#D6CBB3\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><g transform=\"translate(128.5 180.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(149.5 180.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(170.5 180.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(191.5 180.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><path d=\"M58 230H262\" stroke=\"#D6CBB3\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><g transform=\"translate(118 220.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(139 220.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(160 220.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(181 220.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g><g transform=\"translate(202 220.5) scale(0.62)\"><circle cx=\"0\" cy=\"-12.8\" r=\"6.3\" fill=\"#14213D\"/><circle cx=\"0\" cy=\"-10.9\" r=\"6\" fill=\"#F6C89A\" stroke=\"#14213D\" stroke-width=\"1.2\"/><rect x=\"-5\" y=\"-4.6\" width=\"10\" height=\"12.6\" rx=\"4.2\" fill=\"#2B4BA8\" stroke=\"#14213D\" stroke-width=\"1.3\"/><path d=\"M-4.4 -1.4 -8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M4.4 -1.4 8.4 6\" stroke=\"#2B4BA8\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M-2.5 7.4 -3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M2.5 7.4 3.6 14.2\" stroke=\"#374151\" stroke-width=\"2.8\" stroke-linecap=\"round\"/><path d=\"M-3.6 14.2 -6 14.2M3.6 14.2 6 14.2\" stroke=\"#14213D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g>",
        pins: [
        { id: "ekah", num: 1, x: 300, y: 70, tx: 160, ty: 60.5 },
        { id: "dvau", num: 2, x: 20, y: 110, tx: 170.5, ty: 100.5 },
        { id: "trayah", num: 3, x: 300, y: 150, tx: 160, ty: 140.5 },
        { id: "catvarah", num: 4, x: 20, y: 190, tx: 170.5, ty: 180.5 },
        { id: "panca", num: 5, x: 300, y: 230, tx: 160, ty: 220.5 }
        ]
      }
    ]
  },
  groups: [
    { titleRu: "С висаргой ः", titleEn: "Ending in ः", wordIds: ["ekah", "trayah", "catvarah"] },
    { titleRu: "Без висарги", titleEn: "No Visarga", wordIds: ["dvau", "panca"] },
    { titleRu: "С долгим гласным", titleEn: "With a Long Vowel", wordIds: ["dvau", "catvarah"] },
    { titleRu: "Два слога", titleEn: "Two Syllables", wordIds: ["ekah", "trayah", "panca"] }
  ],
  categories: [
    { titleRu: "Больше двух мальчиков", titleEn: "More Than Two Boys", wordIds: ["trayah", "catvarah", "panca"] },
    { titleRu: "Меньше трёх мальчиков", titleEn: "Fewer Than Three Boys", wordIds: ["ekah", "dvau"] },
    { titleRu: "Больше трёх мальчиков", titleEn: "More Than Three Boys", wordIds: ["catvarah", "panca"] },
    { titleRu: "Меньше четырёх мальчиков", titleEn: "Fewer Than Four Boys", wordIds: ["ekah", "dvau", "trayah"] },
    { titleRu: "С висаргой ः", titleEn: "Ending in ः", wordIds: ["ekah", "trayah", "catvarah"] },
    { titleRu: "Без висарги", titleEn: "No Visarga", wordIds: ["dvau", "panca"] },
    { titleRu: "С долгим гласным (ा / ौ)", titleEn: "With a Long Vowel (ा / ौ)", wordIds: ["dvau", "catvarah"] },
    { titleRu: "Есть звук «त» (ta)", titleEn: "Containing \"त\" (ta)", wordIds: ["trayah", "catvarah"] },
    { titleRu: "Два слога", titleEn: "Two Syllables", wordIds: ["ekah", "trayah", "panca"] },
    { titleRu: "Все пять — мужской род", titleEn: "All Five Are Masculine", wordIds: ["ekah", "dvau", "trayah", "catvarah", "panca"] }
  ]
});
