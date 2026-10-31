/* ============================================================================
   УРОК 6 · लिङ्गानि (द्वितीयः) «Три рода — другие цвета»
   ----------------------------------------------------------------------------
   Тот же урок, что «Три рода» (lesson-gender.js), устроенный точно так же:
   те же восемь частей тела, те же восемь предложений о божествах, те же игры
   и тот же guided discovery. Отличаются только ЦВЕТА — четыре из урока 4:

     कपिश  kapiśa   — коричневый  (#8B5E34)
     हरित   harita   — зелёный     (#16A34A)
     धूसर   dhūsara  — серый       (#94A3B8)
     नारङ्ग  nāraṅga  — оранжевый   (#F97316)

   Каждый цвет стоит в уроке дважды — с существительным другого рода, поэтому
   правило «цвет кончается так же, как слово» видно на новом материале:

     कपिशं ललाटम् (ср. р.)   हरितः पादः (м. р.)   नारङ्गा जिह्वा (ж. р.)

   Значки частей тела те же, что в уроке 5 (lgPart из lesson-gender.js), но
   залиты новым цветом: урок узнаётся, а материал другой. Женские формы
   цветов — कपिशा, हरिता, धूसरा, नारङ्गा — обычные основы на -a, ровно как
   पाटला в уроке 5; в уроке 4 те же формы звучат в подсказке 🔊.
   ========================================================================= */

var LG2_INK = '#14213D';

/* цвета этого урока — те же значения, что в палитре урока 4 «Ещё цвета» */
var LG2_COLOUR = {
  kapisha: '#8B5E34',   /* коричневый */
  harita: '#16A34A',    /* зелёный    */
  dhusara: '#94A3B8',   /* серый      */
  naranga: '#F97316'    /* оранжевый  */
};
var LG2_TINT = {
  kapisha: '#FAF7F2',
  harita: '#F0FDF4',
  dhusara: '#F1F5F9',
  naranga: '#FFF7ED'
};

/* значки урока 5 переиспользуются как есть; если файл урока 5 не загружен,
   рисуем нейтральный кружок, чтобы карточка всё равно отрисовалась */
function lg2Svg(tint, inner) {
  if (typeof lgSvg === 'function') return lgSvg(tint, inner);
  return '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100" height="100" rx="14" fill="' + tint + '"/>' + inner + '</svg>';
}
function lg2Part(kind, fill) {
  if (typeof lgPart === 'function') return lgPart(kind, fill);
  return '<circle cx="50" cy="50" r="30" fill="' + fill + '" stroke="' + LG2_INK + '" stroke-width="3"/>';
}

/* ============================================================================
   1. ВОСЕМЬ СЛОВ — те же части тела, что в уроке 5, и четыре новых цвета
   gapDeva прячет ТОЛЬКО окончание существительного: именно его выбирает
   ученик — ः, म् или ा. Все три знака настоящие, выдуманных форм нет.
   syll — акшары без пробела: филворд кладёт на поле 4–5 клеток вместо
   семи, которые дал бы автоделёж (он рвёт «टम्» на «ट» и «म्»).
   ========================================================================= */
var LG2_WORDS = [
  {
    id: 'lalata', deva: 'कपिशं ललाटम्', iast: 'kapiśaṃ lalāṭam', ttsText: 'कपिशं ललाटम्',
    gender: 'n',
    typoDeva: 'कपिश ललाटम्', typoIast: 'kapiśa lalāṭam',
    syll: ['क', 'पि', 'शं', 'ल', 'ला', 'टम्'],
    maskedPrefix: 'कपिशं लला', maskedHidden: 'टम्',
    gapDeva: 'कपिशं ललाट_', gapIast: 'kapiśaṃ lalāṭa_', gapAnswer: 'म्',
    gapChoices: [{ deva: 'म्', iast: 'm' }, { deva: 'ः', iast: 'ḥ' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'कपिशं लला_म्', missingAnswer: 'ट',
    missingChoices: ['ट', 'त', 'ड', 'ठ'],
    icon: 'forehead', fill: LG2_COLOUR.kapisha, tint: LG2_TINT.kapisha
  },
  {
    id: 'udara', deva: 'हरितम् उदरम्', iast: 'haritam udaram', ttsText: 'हरितम् उदरम्',
    gender: 'n',
    typoDeva: 'हरितम् उदारम्', typoIast: 'haritam udāram',
    syll: ['ह', 'रि', 'तम्', 'उ', 'द', 'रम्'],
    maskedPrefix: 'हरितम् उ', maskedHidden: 'दरम्',
    gapDeva: 'हरितम् उदर_', gapIast: 'haritam udara_', gapAnswer: 'म्',
    gapChoices: [{ deva: 'म्', iast: 'm' }, { deva: 'ः', iast: 'ḥ' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'हरितम् उद_म्', missingAnswer: 'र',
    missingChoices: ['र', 'ल', 'ड', 'द'],
    icon: 'belly', fill: LG2_COLOUR.harita, tint: LG2_TINT.harita
  },
  {
    id: 'hasta', deva: 'कपिशः हस्तः', iast: 'kapiśaḥ hastaḥ', ttsText: 'कपिशः हस्तः',
    gender: 'm',
    typoDeva: 'कपिशः हास्तः', typoIast: 'kapiśaḥ hāstaḥ',
    syll: ['क', 'पि', 'शः', 'ह', 'स्तः'],
    maskedPrefix: 'कपिशः ह', maskedHidden: 'स्तः',
    gapDeva: 'कपिशः हस्त_', gapIast: 'kapiśaḥ hasta_', gapAnswer: 'ः',
    gapChoices: [{ deva: 'ः', iast: 'ḥ' }, { deva: 'म्', iast: 'm' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'कपिशः ह_तः', missingAnswer: 'स्',
    missingChoices: ['स्', 'स', 'ष्', 'श्'],
    icon: 'hand', fill: LG2_COLOUR.kapisha, tint: LG2_TINT.kapisha
  },
  {
    id: 'danta', deva: 'धूसरः दन्तः', iast: 'dhūsaraḥ dantaḥ', ttsText: 'धूसरः दन्तः',
    gender: 'm',
    typoDeva: 'धूसर दन्तः', typoIast: 'dhūsara dantaḥ',
    syll: ['धू', 'स', 'रः', 'द', 'न्तः'],
    maskedPrefix: 'धूसरः द', maskedHidden: 'न्तः',
    gapDeva: 'धूसरः दन्त_', gapIast: 'dhūsaraḥ danta_', gapAnswer: 'ः',
    gapChoices: [{ deva: 'ः', iast: 'ḥ' }, { deva: 'म्', iast: 'm' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'धूसरः द_तः', missingAnswer: 'न्',
    missingChoices: ['न्', 'न', 'ण्', 'म्'],
    icon: 'tooth', fill: LG2_COLOUR.dhusara, tint: LG2_TINT.dhusara
  },
  {
    id: 'jihva', deva: 'नारङ्गा जिह्वा', iast: 'nāraṅgā jihvā', ttsText: 'नारङ्गा जिह्वा',
    gender: 'f',
    typoDeva: 'नारङ्ग जिह्वा', typoIast: 'nāraṅga jihvā',
    syll: ['ना', 'र', 'ङ्गा', 'जि', 'ह्वा'],
    maskedPrefix: 'नारङ्गा जि', maskedHidden: 'ह्वा',
    gapDeva: 'नारङ्गा जिह्व_', gapIast: 'nāraṅgā jihvā_', gapAnswer: 'ा',
    gapChoices: [{ deva: 'ा', iast: 'ā' }, { deva: 'ः', iast: 'ḥ' }, { deva: 'म्', iast: 'm' }],
    missingDisplay: 'नारङ्गा जि_वा', missingAnswer: 'ह्',
    missingChoices: ['ह्', 'ह', 'घ्', 'भ्'],
    icon: 'tongue', fill: LG2_COLOUR.naranga, tint: LG2_TINT.naranga
  },
  {
    id: 'nayana', deva: 'धूसरं नयनम्', iast: 'dhūsaraṃ nayanam', ttsText: 'धूसरं नयनम्',
    gender: 'n',
    typoDeva: 'धूसर नयनम्', typoIast: 'dhūsara nayanam',
    syll: ['धू', 'स', 'रं', 'न', 'य', 'नम्'],
    maskedPrefix: 'धूसरं नय', maskedHidden: 'नम्',
    gapDeva: 'धूसरं नयन_', gapIast: 'dhūsaraṃ nayana_', gapAnswer: 'म्',
    gapChoices: [{ deva: 'म्', iast: 'm' }, { deva: 'ः', iast: 'ḥ' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'धूसरं _यनम्', missingAnswer: 'न',
    missingChoices: ['न', 'ण', 'म', 'न्'],
    icon: 'eye', fill: LG2_COLOUR.dhusara, tint: LG2_TINT.dhusara
  },
  {
    id: 'pada', deva: 'हरितः पादः', iast: 'haritaḥ pādaḥ', ttsText: 'हरितः पादः',
    gender: 'm',
    typoDeva: 'हरितः पाद', typoIast: 'haritaḥ pāda',
    syll: ['ह', 'रि', 'तः', 'पा', 'दः'],
    maskedPrefix: 'हरितः पा', maskedHidden: 'दः',
    gapDeva: 'हरितः पाद_', gapIast: 'haritaḥ pāda_', gapAnswer: 'ः',
    gapChoices: [{ deva: 'ः', iast: 'ḥ' }, { deva: 'म्', iast: 'm' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'हरितः पा_ः', missingAnswer: 'द',
    missingChoices: ['द', 'त', 'ड', 'ध'],
    icon: 'foot', fill: LG2_COLOUR.harita, tint: LG2_TINT.harita
  },
  {
    id: 'mukha', deva: 'नारङ्गं मुखम्', iast: 'nāraṅgaṃ mukham', ttsText: 'नारङ्गं मुखम्',
    gender: 'n',
    typoDeva: 'नारङ्ग मुखम्', typoIast: 'nāraṅga mukham',
    syll: ['ना', 'र', 'ङ्गं', 'मु', 'खम्'],
    maskedPrefix: 'नारङ्गं मु', maskedHidden: 'खम्',
    gapDeva: 'नारङ्गं मुख_', gapIast: 'nāraṅgaṃ mukha_', gapAnswer: 'म्',
    gapChoices: [{ deva: 'म्', iast: 'm' }, { deva: 'ः', iast: 'ḥ' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'नारङ्गं मु_म्', missingAnswer: 'ख',
    missingChoices: ['ख', 'क', 'घ', 'ग'],
    icon: 'mouth', fill: LG2_COLOUR.naranga, tint: LG2_TINT.naranga
  }
];

/* карточка слова: кружок-иконка в цвете своего предложения */
LG2_WORDS.forEach(function (w) { w.svg = lg2Svg(w.tint, lg2Part(w.icon, w.fill)); });

/* ============================================================================
   2. ВОСЕМЬ ПРЕДЛОЖЕНИЙ — вводный текст
   Та же схема, что в уроке 5: <божество>स्य <часть тела> <цвет> अस्ति.
   ========================================================================= */
var LG2_SENTENCES = [
  {
    deva: 'कृष्णस्य ललाटं कपिशम् अस्ति।', iast: 'kṛṣṇasya lalāṭaṃ kapiśam asti',
    ttsText: 'कृष्णस्य ललाटं कपिशम् अस्ति',
    ru: 'Лоб Кришны коричневый.', en: 'Krishna’s forehead is brown.',
    gender: 'n', ending: 'ललाटम् → -म्'
  },
  {
    deva: 'बलरामस्य उदरं हरितम् अस्ति।', iast: 'balarāmasya udaraṃ haritam asti',
    ttsText: 'बलरामस्य उदरं हरितम् अस्ति',
    ru: 'Живот Баларамы зелёный.', en: 'Balarāma’s belly is green.',
    gender: 'n', ending: 'उदरम् → -म्'
  },
  {
    deva: 'चैतन्यस्य हस्तः कपिशः अस्ति।', iast: 'caitanyasya hastaḥ kapiśaḥ asti',
    ttsText: 'चैतन्यस्य हस्तः कपिशः अस्ति',
    ru: 'Рука Чайтаньи коричневая.', en: 'Caitanya’s hand is brown.',
    gender: 'm', ending: 'हस्तः → -ः'
  },
  {
    deva: 'गोपालस्य दन्तः धूसरः अस्ति।', iast: 'gopālasya dantaḥ dhūsaraḥ asti',
    ttsText: 'गोपालस्य दन्तः धूसरः अस्ति',
    ru: 'Зуб Гопалы серый.', en: 'Gopāla’s tooth is grey.',
    gender: 'm', ending: 'दन्तः → -ः'
  },
  {
    deva: 'राधायाः जिह्वा नारङ्गा अस्ति।', iast: 'rādhāyāḥ jihvā nāraṅgā asti',
    ttsText: 'राधायाः जिह्वा नारङ्गा अस्ति',
    ru: 'Язык Радхи оранжевый.', en: 'Rādhā’s tongue is orange.',
    gender: 'f', ending: 'जिह्वा → -ा'
  },
  {
    deva: 'कृष्णस्य नयनं धूसरम् अस्ति।', iast: 'kṛṣṇasya nayanaṃ dhūsaram asti',
    ttsText: 'कृष्णस्य नयनं धूसरम् अस्ति',
    ru: 'Глаз Кришны серый.', en: 'Krishna’s eye is grey.',
    gender: 'n', ending: 'नयनम् → -म्'
  },
  {
    deva: 'कृष्णस्य पादः हरितः अस्ति।', iast: 'kṛṣṇasya pādaḥ haritaḥ asti',
    ttsText: 'कृष्णस्य पादः हरितः अस्ति',
    ru: 'Стопа Кришны зелёная.', en: 'Krishna’s foot is green.',
    gender: 'm', ending: 'पादः → -ः'
  },
  {
    deva: 'गौराङ्गस्य मुखं नारङ्गम् अस्ति।', iast: 'gaurāṅgasya mukhaṃ nāraṅgam asti',
    ttsText: 'गौराङ्गस्य मुखं नारङ्गम् अस्ति',
    ru: 'Рот Гауранги оранжевый.', en: 'Gaurāṅga’s mouth is orange.',
    gender: 'n', ending: 'मुखम् → -म्'
  }
];

/* ============================================================================
   3. ПЛАКАТ-СХЕМА: восемь частей тела в клетках 4 × 2 — как в уроке 5
   ========================================================================= */
var LG2_CELL = [
  [12, 6], [88, 6], [164, 6], [240, 6],
  [12, 94], [88, 94], [164, 94], [240, 94]
];

function lg2PosterArt() {
  var art = '<rect x="2" y="2" width="316" height="180" rx="14" fill="#F8EFE6" stroke="#E5DEC9" stroke-width="1.5"/>';
  LG2_WORDS.forEach(function (w, i) {
    var p = LG2_CELL[i];
    art += '<rect x="' + p[0] + '" y="' + p[1] + '" width="72" height="82" rx="10" fill="#FFFFFF" stroke="#E5DEC9" stroke-width="1.2"/>' +
      '<g transform="translate(' + (p[0] + 5) + ',' + (p[1] + 10) + ') scale(0.62)">' + lg2Part(w.icon, w.fill) + '</g>';
  });
  return art;
}

/* «Что пропало?»: клетка становится пустой — пустое место, а не серый значок */
function lg2PosterHole(i) {
  var p = LG2_CELL[i];
  return '<rect x="' + (p[0] + 5) + '" y="' + (p[1] + 10) + '" width="62" height="62" rx="10" fill="#FFFFFF"/>';
}

function lg2PosterPins() {
  return LG2_WORDS.map(function (w, i) {
    var p = LG2_CELL[i];
    return {
      id: w.id, num: i + 1,
      x: p[0] + 12, y: p[1] + 14,          /* кружок с номером — в углу клетки */
      tx: p[0] + 36, ty: p[1] + 41,        /* точка-указатель — на самой части  */
      erase: lg2PosterHole(i)
    };
  });
}

/* ============================================================================
   4. РЕГИСТРАЦИЯ УРОКА
   ========================================================================= */
SAL.registerLesson({
  key: 'LG2',
  num: 6,
  titleDeva: 'लिङ्गानि',
  titleRu: 'Три рода · другие цвета',
  titleEn: 'Three Genders · More Colours',
  topicRu: 'мужской, средний и женский род: ः · म् · ा — на новых цветах',
  topicEn: 'masculine, neuter and feminine: ः · म् · ा — with new colours',
  introRu: 'Шестой урок — снова про <strong>род</strong>, и построен он точно так же, как пятый: те же восемь частей тела и те же восемь предложений о божествах. Отличаются только цвета — <code>कपिश</code> (коричневый), <code>हरित</code> (зелёный), <code>धूसर</code> (серый) и <code>नारङ्ग</code> (оранжевый), — и каждый стоит в уроке дважды, с существительным другого рода. Прочитайте вслух <code>कृष्णस्य ललाटं कपिशम् अस्ति</code> и проверьте правило ещё раз: цвет всегда кончается так же, как существительное — <code>-ः</code> у мужского рода, <code>-म्</code> у среднего, <code>-ा</code> у женского. Разбор закрыт, пока его не откроют кнопкой.',
  introEn: 'The sixth lesson is about <strong>gender</strong> again, and it is built exactly like the fifth: the same eight body and face words and the same eight sentences about the deities. Only the colours are new — <code>kapiśa</code> (brown), <code>harita</code> (green), <code>dhūsara</code> (grey) and <code>nāraṅga</code> (orange) — and each one appears twice, with a noun of a different gender. Read <code>kṛṣṇasya lalāṭaṃ kapiśam asti</code> aloud and check the rule once more: the colour always ends the way the noun ends — <code>-ḥ</code> for masculine, <code>-m</code> for neuter, <code>-ā</code> for feminine. The analysis stays closed until the button is pressed.',
  aim: {
    ru: {
      main: 'Закрепить три рода санскритских существительных на новых цветах — на тех же восьми частях тела и восьми предложениях, что в уроке 5.',
      subs: [
        'Повторить четыре цвета урока 4 (कपिश, हरित, धूसर, नारङ्ग) в роли определений.',
        'Провести guided discovery ещё раз: ученики сами выводят правило ः / म् / ा на новом материале.',
        'Поставить произношение висарги ः, анусвары ं и долгих гласных в новых фразах.'
      ]
    },
    en: {
      main: 'To consolidate the three genders of Sanskrit nouns with new colours — on the same eight body parts and eight sentences as in lesson 5.',
      subs: [
        'To recycle four colours from lesson 4 (kapiśa, harita, dhūsara, nāraṅga) as attributes.',
        'To run the guided discovery again: learners work out the ः / म् / ा rule themselves on new material.',
        'To give practice in the pronunciation of visarga ः, anusvāra ं and long vowels in the new phrases.'
      ]
    }
  },
  gestureRu: 'покажите у себя ту часть тела, о которой говорится',
  gestureEn: 'point to the body part the phrase names',

  /* --- вводный текст: тот же формат, что в уроке 5 ------------------------ */
  discovery: {
    badgeRu: '🔍 GUIDED DISCOVERY · ВВОДНЫЙ ТЕКСТ',
    badgeEn: '🔍 GUIDED DISCOVERY · LEAD-IN TEXT',
    titleRu: 'Восемь предложений. Найдите правило сами',
    titleEn: 'Eight Sentences. Find the Rule Yourself',
    leadRu: 'Прочитайте вслух и посмотрите на <strong>последнюю букву</strong> цвета и последнюю букву части тела. Сколько разных окончаний вы видите? Что каждое из них значит? Не открывайте разбор, пока ученики не назовут свою догадку.',
    leadEn: 'Read the sentences aloud and look at the <strong>last letter</strong> of the colour and the last letter of the body part. How many different endings can you see? What does each one mean? Keep the analysis closed until learners offer their guess.',
    ruleRu: '<strong>Правило.</strong> Окончание одно на двоих: цвет повторяет род существительного. <code>हस्तः</code> — мужской род, поэтому <code>कपिशः हस्तः</code>. <code>मुखम्</code> — средний, поэтому <code>नारङ्गं मुखम्</code>. <code>जिह्वा</code> — женский, поэтому <code>नारङ्गा जिह्वा</code>. Три окончания — три рода: <strong>ः</strong> мужской, <strong>म्</strong> средний, <strong>ा</strong> женский.',
    ruleEn: '<strong>The rule.</strong> One ending for both words: the colour copies the gender of the noun. <code>hastaḥ</code> is masculine, hence <code>kapiśaḥ hastaḥ</code>. <code>mukham</code> is neuter, hence <code>nāraṅgaṃ mukham</code>. <code>jihvā</code> is feminine, hence <code>nāraṅgā jihvā</code>. Three endings — three genders: <strong>ḥ</strong> masculine, <strong>m</strong> neuter, <strong>ā</strong> feminine.',
    sentences: LG2_SENTENCES
  },

  prodTitleRu: 'Живая речь: назовите вслух все {n} фраз этого урока',
  prodTitleEn: 'Freer Production: Say All {n} Phrases Aloud',

  words: LG2_WORDS,
  extraGames: ['wordgrid', 'wordsearch'],

  /* шаги нарочно смешивают роды: ученик сравнивает ः, म् и ा рядом */
  steps: [
    { wordIds: ['hasta', 'mukha'] },
    { wordIds: ['jihva', 'lalata'] },
    { wordIds: ['danta', 'nayana'] },
    { wordIds: ['pada', 'udara'] }
  ],

  hotspots: {
    figures: [
      {
        key: 'poster',
        captionRu: 'Восемь частей тела в цвете своего предложения (1–8)',
        captionEn: 'Eight Body Parts in Their Sentence Colour (1–8)',
        viewBox: '0 0 320 184',
        art: lg2PosterArt(),
        pins: lg2PosterPins()
      }
    ]
  },

  groups: [
    { titleRu: 'Мужской род · ः', titleEn: 'Masculine · ः', wordIds: ['hasta', 'danta', 'pada'] },
    { titleRu: 'Средний род · म्', titleEn: 'Neuter · म्', wordIds: ['lalata', 'udara', 'nayana', 'mukha'] },
    { titleRu: 'Женский род · ा', titleEn: 'Feminine · ा', wordIds: ['jihva'] }
  ],

  categories: [
    { titleRu: 'Мужской род (ः)', titleEn: 'Masculine (ः)', wordIds: ['hasta', 'danta', 'pada'] },
    { titleRu: 'Средний род (म्)', titleEn: 'Neuter (म्)', wordIds: ['lalata', 'udara', 'nayana', 'mukha'] },
    { titleRu: 'Женский род (ा)', titleEn: 'Feminine (ा)', wordIds: ['jihva'] },
    { titleRu: 'Часть лица', titleEn: 'Part of the Face', wordIds: ['lalata', 'danta', 'jihva', 'nayana', 'mukha'] },
    { titleRu: 'Часть тела', titleEn: 'Part of the Body', wordIds: ['udara', 'hasta', 'pada'] },
    { titleRu: 'Есть звук «र» (ra)', titleEn: 'With «र» (ra)', wordIds: ['udara', 'danta', 'jihva', 'nayana', 'pada', 'mukha'] },
    { titleRu: 'Есть звук «ह» (ha)', titleEn: 'With «ह» (ha)', wordIds: ['udara', 'hasta', 'jihva', 'pada'] }
  ],

  /* бинарные признаки для игры «Сортировка»: род проверяется напрямую */
  sortFeatures: [
    { ru: 'Мужской род — кончается на ः', en: 'Masculine — ends in ः',
      test: function (w) { return /\u0903$/.test(w.deva); } },
    { ru: 'Средний род — кончается на म्', en: 'Neuter — ends in म्',
      test: function (w) { return /\u092e\u094d$/.test(w.deva); } },
    { ru: 'Женский род — кончается на ा', en: 'Feminine — ends in ा',
      test: function (w) { return /\u093e$/.test(w.deva); } },
    { ru: 'Есть звук «र» (ra)', en: 'Contains «र» (ra)',
      test: function (w) { return w.deva.indexOf('र') >= 0; } },
    { ru: 'Есть звук «ह» (ha)', en: 'Contains «ह» (ha)',
      test: function (w) { return w.deva.indexOf('ह') >= 0; } }
  ],

  /* ==========================================================================
     ЛОВУШКИ ДЛЯ «ФИЛВОРДА СРЕДИ СЛОВ»
     В поле лежат только настоящие санскритские словосочетания. Ни одной
     выдуманной формы: ловушка — это либо ЧУЖОЙ род при верных словах
     (कपिशं हस्तः, नारङ्गः जिह्वा), либо верное согласование с цветом,
     которого в этом уроке не было (श्यामं मुखम्, नीलः पादः).
     ========================================================================== */
  decoys: [
    /* чужой род: окончание цвета не совпадает с родом существительного */
    'कपिशं हस्तः',
    'हरितः ललाटम्',
    'धूसरा मुखम्',
    'नारङ्गः जिह्वा',
    'धूसरः उदरम्',
    'हरितं दन्तः',
    'कपिशा पादः',
    'हरिता हस्तः',
    /* согласование верное, но таких цветов в этом уроке нет */
    'श्यामं मुखम्',
    'नीलः पादः',
    'पीतं ललाटम्',
    'रक्ता जिह्वा'
  ],

  /* ==========================================================================
     ЛОВУШКИ ДЛЯ «МЕМОРИ»
     Как в уроке 5: оба слова согласованы друг с другом, но род выбран
     неверный — हरितः उदरः. Согласование внутри пары верное, поэтому по
     окончаниям ловушку не вычислить: чтобы её заметить, надо знать род
     самого слова. В поле fix — правильная форма из этого же урока; игра
     показывает её в объяснении, чтобы неверная форма не осталась в памяти
     одна.
     ========================================================================== */
  memoryTraps: [
    { deva: 'हरितः उदरः', iast: 'haritaḥ udaraḥ', fix: 'हरितम् उदरम्' },
    { deva: 'कपिशं हस्तम्', iast: 'kapiśaṃ hastam', fix: 'कपिशः हस्तः' },
    { deva: 'धूसरं दन्तम्', iast: 'dhūsaraṃ dantam', fix: 'धूसरः दन्तः' },
    { deva: 'नारङ्गः मुखः', iast: 'nāraṅgaḥ mukhaḥ', fix: 'नारङ्गं मुखम्' }
  ]
});
