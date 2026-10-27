/* ============================================================================
   УРОК 5 · लिङ्गानि «Три рода»
   ----------------------------------------------------------------------------
   Восемь существительных из уроков 1–2 (лоб, живот, рука, зуб, язык, глаз,
   стопа, рот) и шесть цветов из уроков 3–4.

   Смысл урока — род существительного, а не окончание прилагательного.
   Поэтому вводный текст — восемь предложений о божествах, где цвет стоит
   рядом с существительным и оба кончаются одинаково:

     कृष्णस्य ललाटं श्यामम् अस्ति   — лоб (ср. р.)  → -म्
     चैतन्यस्य हस्तः गौरः अस्ति     — рука (м. р.)  → -ः
     राधायाः जिह्वा पाटला अस्ति     — язык (ж. р.)  → -ा

   Разбор закрыт, пока ученик не нажмёт «Открыть разбор»: он должен сам
   увидеть, что ः / म् / ा — это три рода, и что цвет их повторяет.

   Игры те же, что в остальных уроках: 12 классических плюс два филворда.
   «Филворд среди слов» — с ловушками: в поле стоят настоящие санскритские
   словосочетания, но с ЧУЖИМ родом (श्यामं हस्तः, नीलः जिह्वा) или с цветом,
   которого в уроке не было. Выдуманных форм нет ни одной.
   ========================================================================= */

/* ============================================================================
   1. КАРТИНКИ
   Часть тела нарисована в цвете своего предложения: श्यामं ललाटम् — тёмный
   лоб, श्वेतः दन्तः — белый зуб. Один и тот же значок используется и в
   карточке слова, и на плакате-схеме.
   ========================================================================= */
var LG_INK = '#14213D';

function lgSvg(tint, inner) {
  return '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100" height="100" rx="14" fill="' + tint + '"/>' + inner + '</svg>';
}

/* значок части тела, залитый цветом fill */
function lgPart(kind, fill) {
  var C = LG_INK;
  if (kind === 'forehead') {
    return '<ellipse cx="50" cy="54" rx="23" ry="27" fill="#F4C7AB" stroke="' + C + '" stroke-width="3"/>' +
      '<path d="M29 47c2-16 40-16 42 0z" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<circle cx="41" cy="57" r="2.6" fill="' + C + '"/><circle cx="59" cy="57" r="2.6" fill="' + C + '"/>' +
      '<path d="M44 68c4 3 8 3 12 0" stroke="' + C + '" stroke-width="2.2" stroke-linecap="round"/>';
  }
  if (kind === 'belly') {
    return '<path d="M32 20h36l7 13v45a8 8 0 0 1-8 8H33a8 8 0 0 1-8-8V33z" fill="#F4C7AB" stroke="' + C + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<ellipse cx="50" cy="58" rx="16" ry="15" fill="' + fill + '" stroke="' + C + '" stroke-width="2.6"/>' +
      '<circle cx="50" cy="58" r="3.4" fill="' + C + '" opacity="0.5"/>';
  }
  if (kind === 'hand') {
    return '<rect x="30" y="44" width="40" height="42" rx="13" fill="' + fill + '" stroke="' + C + '" stroke-width="3"/>' +
      '<rect x="34" y="24" width="9" height="26" rx="4.5" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4"/>' +
      '<rect x="44" y="18" width="9" height="32" rx="4.5" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4"/>' +
      '<rect x="54" y="20" width="9" height="30" rx="4.5" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4"/>' +
      '<rect x="64" y="28" width="9" height="22" rx="4.5" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4"/>' +
      '<rect x="20" y="46" width="11" height="25" rx="5.5" transform="rotate(-22 25 58)" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4"/>';
  }
  if (kind === 'tooth') {
    return '<path d="M32 22h36c4 0 6 3 6 7 0 12-3 18-6 30-2 8-3 16-7 16s-5-10-7-16h-8c-2 6-3 16-7 16s-5-8-7-16c-3-12-6-18-6-30 0-4 2-7 6-7Z" fill="' + fill + '" stroke="' + C + '" stroke-width="3"/>' +
      '<path d="M38 34c6-2 18-2 24 0" stroke="' + C + '" stroke-width="2.4" stroke-linecap="round" opacity="0.35"/>';
  }
  if (kind === 'tongue') {
    return '<path d="M20 38c9-13 51-13 60 0-9 30-51 30-60 0Z" fill="#7F1D1D" stroke="' + C + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M36 50h28c0 14-6 22-14 22s-14-8-14-22z" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<path d="M50 57v9" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" opacity="0.55"/>';
  }
  if (kind === 'eye') {
    return '<path d="M14 50c12-17 60-17 72 0-12 17-60 17-72 0Z" fill="#FFFFFF" stroke="' + C + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<circle cx="50" cy="50" r="13" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4"/>' +
      '<circle cx="50" cy="50" r="5.5" fill="#0B1220"/>' +
      '<circle cx="45" cy="45" r="2.4" fill="#FFFFFF" opacity="0.9"/>';
  }
  if (kind === 'foot') {
    return '<ellipse cx="49" cy="63" rx="20" ry="26" fill="' + fill + '" stroke="' + C + '" stroke-width="3"/>' +
      '<circle cx="31" cy="28" r="6" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4"/>' +
      '<circle cx="43" cy="21" r="5.2" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4"/>' +
      '<circle cx="54" cy="19" r="4.8" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4"/>' +
      '<circle cx="64" cy="22" r="4.2" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4"/>' +
      '<circle cx="72" cy="29" r="3.8" fill="' + fill + '" stroke="' + C + '" stroke-width="2.4"/>';
  }
  /* mouth — मुख здесь «рот». Открытый рот: плоская верхняя губа, круглый
     подбородок и полоска зубов. Лица с глазами быть не должно (по глазам
     ребёнок опознал бы «лицо»), и форма нарочно не «линза», как у глаза
     नयन, — иначе два значка перепутались бы. */
  return '<path d="M16 42h68c-1 24-18 38-34 38S17 66 16 42Z" fill="' + fill + '" stroke="' + C + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<ellipse cx="50" cy="64" rx="14" ry="9" fill="#5B1010"/>' +
    '<path d="M24 47h52" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round"/>';
}

/* цвета уроков 3–4 — те же значения, что в палитрах */
var LG_COLOUR = {
  shyama: '#1F3A5F',   /* тёмно-синий  */
  shveta: '#FFFFFF',   /* белый        */
  gaura: '#F2C46B',    /* золотистый   */
  patala: '#EC4899',   /* розовый      */
  nila: '#2563EB',     /* синий        */
  rakta: '#DC2626'     /* красный      */
};

/* ============================================================================
   2. ВОСЕМЬ СЛОВ
   gapDeva прячет ТОЛЬКО окончание существительного: именно его выбирает
   ученик — ः, म् или ा. Все три знака настоящие, выдуманных форм нет.
   syll — акшары без пробела: филворд кладёт на поле 4–5 клеток вместо
   семи, которые дал бы автоделёж (он рвёт «टम्» на «ट» и «म्»).
   ========================================================================= */
var LG_WORDS = [
  {
    id: 'lalata', deva: 'श्यामं ललाटम्', iast: 'śyāmaṃ lalāṭam', ttsText: 'श्यामं ललाटम्',
    gender: 'n',
    typoDeva: 'श्याम ललाटम्', typoIast: 'śyāma lalāṭam',
    syll: ['श्या', 'मं', 'ल', 'ला', 'टम्'],
    maskedPrefix: 'श्यामं लला', maskedHidden: 'टम्',
    gapDeva: 'श्यामं ललाट_', gapIast: 'śyāmaṃ lalāṭa_', gapAnswer: 'म्',
    gapChoices: [{ deva: 'म्', iast: 'm' }, { deva: 'ः', iast: 'ḥ' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'श्यामं लला_म्', missingAnswer: 'ट',
    missingChoices: ['ट', 'त', 'ड', 'ठ'],
    icon: 'forehead', fill: LG_COLOUR.shyama, tint: '#F1F5F9'
  },
  {
    id: 'udara', deva: 'श्वेतम् उदरम्', iast: 'śvetam udaram', ttsText: 'श्वेतम् उदरम्',
    gender: 'n',
    typoDeva: 'श्वेतम् उदारम्', typoIast: 'śvetam udāram',
    syll: ['श्वे', 'तम्', 'उ', 'द', 'रम्'],
    maskedPrefix: 'श्वेतम् उ', maskedHidden: 'दरम्',
    gapDeva: 'श्वेतम् उदर_', gapIast: 'śvetam udara_', gapAnswer: 'म्',
    gapChoices: [{ deva: 'म्', iast: 'm' }, { deva: 'ः', iast: 'ḥ' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'श्वेतम् उद_म्', missingAnswer: 'र',
    missingChoices: ['र', 'ल', 'ड', 'द'],
    icon: 'belly', fill: LG_COLOUR.shveta, tint: '#EEF2F6'
  },
  {
    id: 'hasta', deva: 'गौरः हस्तः', iast: 'gauraḥ hastaḥ', ttsText: 'गौरः हस्तः',
    gender: 'm',
    typoDeva: 'गौरः हास्तः', typoIast: 'gauraḥ hāstaḥ',
    syll: ['गौ', 'रः', 'ह', 'स्तः'],
    maskedPrefix: 'गौरः ह', maskedHidden: 'स्तः',
    gapDeva: 'गौरः हस्त_', gapIast: 'gauraḥ hasta_', gapAnswer: 'ः',
    gapChoices: [{ deva: 'ः', iast: 'ḥ' }, { deva: 'म्', iast: 'm' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'गौरः ह_तः', missingAnswer: 'स्',
    missingChoices: ['स्', 'स', 'ष्', 'श्'],
    icon: 'hand', fill: LG_COLOUR.gaura, tint: '#FFF7ED'
  },
  {
    id: 'danta', deva: 'श्वेतः दन्तः', iast: 'śvetaḥ dantaḥ', ttsText: 'श्वेतः दन्तः',
    gender: 'm',
    typoDeva: 'श्वेत दन्तः', typoIast: 'śveta dantaḥ',
    syll: ['श्वे', 'तः', 'द', 'न्तः'],
    maskedPrefix: 'श्वेतः द', maskedHidden: 'न्तः',
    gapDeva: 'श्वेतः दन्त_', gapIast: 'śvetaḥ danta_', gapAnswer: 'ः',
    gapChoices: [{ deva: 'ः', iast: 'ḥ' }, { deva: 'म्', iast: 'm' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'श्वेतः द_तः', missingAnswer: 'न्',
    missingChoices: ['न्', 'न', 'ण्', 'म्'],
    icon: 'tooth', fill: LG_COLOUR.shveta, tint: '#F1F5F9'
  },
  {
    id: 'jihva', deva: 'पाटला जिह्वा', iast: 'pāṭalā jihvā', ttsText: 'पाटला जिह्वा',
    gender: 'f',
    typoDeva: 'पाटल जिह्वा', typoIast: 'pāṭala jihvā',
    syll: ['पा', 'ट', 'ला', 'जि', 'ह्वा'],
    maskedPrefix: 'पाटला जि', maskedHidden: 'ह्वा',
    gapDeva: 'पाटला जिह्व_', gapIast: 'pāṭalā jihvā_', gapAnswer: 'ा',
    gapChoices: [{ deva: 'ा', iast: 'ā' }, { deva: 'ः', iast: 'ḥ' }, { deva: 'म्', iast: 'm' }],
    missingDisplay: 'पाटला जि_वा', missingAnswer: 'ह्',
    missingChoices: ['ह्', 'ह', 'घ्', 'भ्'],
    icon: 'tongue', fill: LG_COLOUR.patala, tint: '#FDF2F8'
  },
  {
    id: 'nayana', deva: 'नीलं नयनम्', iast: 'nīlaṃ nayanam', ttsText: 'नीलं नयनम्',
    gender: 'n',
    typoDeva: 'निलं नयनम्', typoIast: 'nilaṃ nayanam',
    syll: ['नी', 'लं', 'न', 'य', 'नम्'],
    maskedPrefix: 'नीलं नय', maskedHidden: 'नम्',
    gapDeva: 'नीलं नयन_', gapIast: 'nīlaṃ nayana_', gapAnswer: 'म्',
    gapChoices: [{ deva: 'म्', iast: 'm' }, { deva: 'ः', iast: 'ḥ' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'नीलं _यनम्', missingAnswer: 'न',
    missingChoices: ['न', 'ण', 'म', 'न्'],
    icon: 'eye', fill: LG_COLOUR.nila, tint: '#EFF6FF'
  },
  {
    id: 'pada', deva: 'श्यामः पादः', iast: 'śyāmaḥ pādaḥ', ttsText: 'श्यामः पादः',
    gender: 'm',
    typoDeva: 'श्यामः पाद', typoIast: 'śyāmaḥ pāda',
    syll: ['श्या', 'मः', 'पा', 'दः'],
    maskedPrefix: 'श्यामः पा', maskedHidden: 'दः',
    gapDeva: 'श्यामः पाद_', gapIast: 'śyāmaḥ pāda_', gapAnswer: 'ः',
    gapChoices: [{ deva: 'ः', iast: 'ḥ' }, { deva: 'म्', iast: 'm' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'श्यामः पा_ः', missingAnswer: 'द',
    missingChoices: ['द', 'त', 'ड', 'ध'],
    icon: 'foot', fill: LG_COLOUR.shyama, tint: '#F1F5F9'
  },
  {
    id: 'mukha', deva: 'रक्तं मुखम्', iast: 'raktaṃ mukham', ttsText: 'रक्तं मुखम्',
    gender: 'n',
    typoDeva: 'रक्त मुखम्', typoIast: 'rakta mukham',
    syll: ['र', 'क्तं', 'मु', 'खम्'],
    maskedPrefix: 'रक्तं मु', maskedHidden: 'खम्',
    gapDeva: 'रक्तं मुख_', gapIast: 'raktaṃ mukha_', gapAnswer: 'म्',
    gapChoices: [{ deva: 'म्', iast: 'm' }, { deva: 'ः', iast: 'ḥ' }, { deva: 'ा', iast: 'ā' }],
    missingDisplay: 'रक्तं मु_म्', missingAnswer: 'ख',
    missingChoices: ['ख', 'क', 'घ', 'ग'],
    icon: 'mouth', fill: LG_COLOUR.rakta, tint: '#FEF2F2'
  }
];

/* карточка слова: кружок-иконка в цвете своего предложения */
LG_WORDS.forEach(function (w) { w.svg = lgSvg(w.tint, lgPart(w.icon, w.fill)); });

/* ============================================================================
   3. ВОСЕМЬ ПРЕДЛОЖЕНИЙ — вводный текст
   Пока разбор закрыт, вместо окончания стоит «?»: ученик сам должен увидеть,
   что цвет и существительное кончаются одинаково.
   ========================================================================= */
var LG_SENTENCES = [
  {
    deva: 'कृष्णस्य ललाटं श्यामम् अस्ति।', iast: 'kṛṣṇasya lalāṭaṃ śyāmam asti',
    ttsText: 'कृष्णस्य ललाटं श्यामम् अस्ति',
    ru: 'Лоб Кришны тёмно-синий.', en: 'Krishna’s forehead is dark blue.',
    gender: 'n', ending: 'ललाटम् → -म्'
  },
  {
    deva: 'बलरामस्य उदरं श्वेतम् अस्ति।', iast: 'balarāmasya udaraṃ śvetam asti',
    ttsText: 'बलरामस्य उदरं श्वेतम् अस्ति',
    ru: 'Живот Баларамы белый.', en: 'Balarāma’s belly is white.',
    gender: 'n', ending: 'उदरम् → -म्'
  },
  {
    deva: 'चैतन्यस्य हस्तः गौरः अस्ति।', iast: 'caitanyasya hastaḥ gauraḥ asti',
    ttsText: 'चैतन्यस्य हस्तः गौरः अस्ति',
    ru: 'Рука Чайтаньи золотистая.', en: 'Caitanya’s hand is golden.',
    gender: 'm', ending: 'हस्तः → -ः'
  },
  {
    deva: 'गोपालस्य दन्तः श्वेतः अस्ति।', iast: 'gopālasya dantaḥ śvetaḥ asti',
    ttsText: 'गोपालस्य दन्तः श्वेतः अस्ति',
    ru: 'Зуб Гопалы белый.', en: 'Gopāla’s tooth is white.',
    gender: 'm', ending: 'दन्तः → -ः'
  },
  {
    deva: 'राधायाः जिह्वा पाटला अस्ति।', iast: 'rādhāyāḥ jihvā pāṭalā asti',
    ttsText: 'राधायाः जिह्वा पाटला अस्ति',
    ru: 'Язык Радхи розовый.', en: 'Rādhā’s tongue is pink.',
    gender: 'f', ending: 'जिह्वा → -ा'
  },
  {
    deva: 'कृष्णस्य नयनं नीलम् अस्ति।', iast: 'kṛṣṇasya nayanaṃ nīlam asti',
    ttsText: 'कृष्णस्य नयनं नीलम् अस्ति',
    ru: 'Глаз Кришны синий.', en: 'Krishna’s eye is blue.',
    gender: 'n', ending: 'नयनम् → -म्'
  },
  {
    deva: 'कृष्णस्य पादः श्यामः अस्ति।', iast: 'kṛṣṇasya pādaḥ śyāmaḥ asti',
    ttsText: 'कृष्णस्य पादः श्यामः अस्ति',
    ru: 'Стопа Кришны тёмно-синяя.', en: 'Krishna’s foot is dark blue.',
    gender: 'm', ending: 'पादः → -ः'
  },
  {
    deva: 'गौराङ्गस्य मुखं रक्तम् अस्ति।', iast: 'gaurāṅgasya mukhaṃ raktam asti',
    ttsText: 'गौराङ्गस्य मुखं रक्तम् अस्ति',
    ru: 'Рот Гауранги красный.', en: 'Gaurāṅga’s mouth is red.',
    gender: 'n', ending: 'मुखम् → -म्'
  }
];

/* ============================================================================
   4. ПЛАКАТ-СХЕМА: восемь частей тела в клетках 4 × 2
   ========================================================================= */
var LG_CELL = [
  [12, 6], [88, 6], [164, 6], [240, 6],
  [12, 94], [88, 94], [164, 94], [240, 94]
];

function lgPosterArt() {
  var art = '<rect x="2" y="2" width="316" height="180" rx="14" fill="#F8EFE6" stroke="#E5DEC9" stroke-width="1.5"/>';
  LG_WORDS.forEach(function (w, i) {
    var p = LG_CELL[i];
    art += '<rect x="' + p[0] + '" y="' + p[1] + '" width="72" height="82" rx="10" fill="#FFFFFF" stroke="#E5DEC9" stroke-width="1.2"/>' +
      '<g transform="translate(' + (p[0] + 5) + ',' + (p[1] + 10) + ') scale(0.62)">' + lgPart(w.icon, w.fill) + '</g>';
  });
  return art;
}

/* «Что пропало?»: клетка становится пустой — пустое место, а не серый значок */
function lgPosterHole(i) {
  var p = LG_CELL[i];
  return '<rect x="' + (p[0] + 5) + '" y="' + (p[1] + 10) + '" width="62" height="62" rx="10" fill="#FFFFFF"/>';
}

function lgPosterPins() {
  return LG_WORDS.map(function (w, i) {
    var p = LG_CELL[i];
    return {
      id: w.id, num: i + 1,
      x: p[0] + 12, y: p[1] + 14,          /* кружок с номером — в углу клетки */
      tx: p[0] + 36, ty: p[1] + 41,        /* точка-указатель — на самой части  */
      erase: lgPosterHole(i)
    };
  });
}

/* ============================================================================
   5. РЕГИСТРАЦИЯ УРОКА
   ========================================================================= */
SAL.registerLesson({
  key: 'LG',
  num: 5,
  titleDeva: 'लिङ्गानि',
  titleRu: 'Три рода',
  titleEn: 'Three Genders',
  topicRu: 'мужской, средний и женский род: ः · म् · ा',
  topicEn: 'masculine, neuter and feminine: ः · म् · ा',
  introRu: 'Пятый урок — про <strong>род</strong>. Восемь частей тела из уроков 1–2 (лоб, живот, рука, зуб, язык, глаз, стопа, рот) и шесть цветов из уроков 3–4. Вводный текст — восемь предложений о божествах: <code>कृष्णस्य ललाटं श्यामम् अस्ति</code>. Прочитайте их вслух и найдите правило сами: цвет всегда кончается так же, как существительное — <code>-ः</code> у мужского рода, <code>-म्</code> у среднего, <code>-ा</code> у женского. Разбор закрыт, пока его не откроют кнопкой.',
  introEn: 'The fifth lesson is about <strong>gender</strong>. Eight body and face words from lessons 1–2 (forehead, belly, hand, tooth, tongue, eye, foot, mouth) and six colours from lessons 3–4. The lead-in text is eight sentences about the deities: <code>kṛṣṇasya lalāṭaṃ śyāmam asti</code>. Read them aloud and find the rule yourself: the colour always ends the way the noun ends — <code>-ḥ</code> for masculine, <code>-m</code> for neuter, <code>-ā</code> for feminine. The analysis stays closed until the button is pressed.',
  aim: {
    ru: {
      main: 'Уточнить и отработать три рода санскритских существительных в контексте описания частей тела и цветов.',
      subs: [
        'Повторить шесть цветов уроков 3–4 в качестве определений.',
        'Провести guided discovery: ученики сами выводят правило ः / म् / ा по восьми предложениям.',
        'Поставить произношение висарги ः, анусвары ं и долгих гласных в новых фразах.'
      ]
    },
    en: {
      main: 'To clarify and practise the three genders of Sanskrit nouns in the context of describing body parts and colours.',
      subs: [
        'To recycle six colours from lessons 3–4 as attributes.',
        'To run a guided discovery: learners work out the ः / म् / ा rule from eight sentences themselves.',
        'To give practice in the pronunciation of visarga ः, anusvāra ं and long vowels in the new phrases.'
      ]
    }
  },
  gestureRu: 'покажите у себя ту часть тела, о которой говорится',
  gestureEn: 'point to the body part the phrase names',

  /* --- вводный текст ------------------------------------------------------ */
  discovery: {
    badgeRu: '🔍 GUIDED DISCOVERY · ВВОДНЫЙ ТЕКСТ',
    badgeEn: '🔍 GUIDED DISCOVERY · LEAD-IN TEXT',
    titleRu: 'Восемь предложений. Найдите правило сами',
    titleEn: 'Eight Sentences. Find the Rule Yourself',
    leadRu: 'Прочитайте вслух и посмотрите на <strong>последнюю букву</strong> цвета и последнюю букву части тела. Сколько разных окончаний вы видите? Что каждое из них значит? Не открывайте разбор, пока ученики не назовут свою догадку.',
    leadEn: 'Read the sentences aloud and look at the <strong>last letter</strong> of the colour and the last letter of the body part. How many different endings can you see? What does each one mean? Keep the analysis closed until learners offer their guess.',
    ruleRu: '<strong>Правило.</strong> Окончание одно на двоих: цвет повторяет род существительного. <code>हस्तः</code> — мужской род, поэтому <code>गौरः हस्तः</code>. <code>मुखम्</code> — средний, поэтому <code>रक्तं मुखम्</code>. <code>जिह्वा</code> — женский, поэтому <code>पाटला जिह्वा</code>. Три окончания — три рода: <strong>ः</strong> мужской, <strong>म्</strong> средний, <strong>ा</strong> женский.',
    ruleEn: '<strong>The rule.</strong> One ending for both words: the colour copies the gender of the noun. <code>hastaḥ</code> is masculine, hence <code>gauraḥ hastaḥ</code>. <code>mukham</code> is neuter, hence <code>raktaṃ mukham</code>. <code>jihvā</code> is feminine, hence <code>pāṭalā jihvā</code>. Three endings — three genders: <strong>ḥ</strong> masculine, <strong>m</strong> neuter, <strong>ā</strong> feminine.',
    sentences: LG_SENTENCES
  },

  prodTitleRu: 'Живая речь: назовите вслух все {n} фраз этого урока',
  prodTitleEn: 'Freer Production: Say All {n} Phrases Aloud',

  words: LG_WORDS,
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
        art: lgPosterArt(),
        pins: lgPosterPins()
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
    { titleRu: 'Есть звук «श» (śa)', titleEn: 'With «श» (śa)', wordIds: ['lalata', 'udara', 'danta', 'pada'] },
    { titleRu: 'Есть звук «ह» (ha)', titleEn: 'With «ह» (ha)', wordIds: ['hasta', 'jihva'] }
  ],

  /* бинарные признаки для игры «Сортировка»: род проверяется напрямую */
  sortFeatures: [
    { ru: 'Мужской род — кончается на ः', en: 'Masculine — ends in ः',
      test: function (w) { return /\u0903$/.test(w.deva); } },
    { ru: 'Средний род — кончается на म्', en: 'Neuter — ends in म्',
      test: function (w) { return /\u092e\u094d$/.test(w.deva); } },
    { ru: 'Женский род — кончается на ा', en: 'Feminine — ends in ा',
      test: function (w) { return /\u093e$/.test(w.deva); } },
    { ru: 'Есть звук «श» (śa)', en: 'Contains «श» (śa)',
      test: function (w) { return w.deva.indexOf('श') >= 0; } },
    { ru: 'Есть звук «ह» (ha)', en: 'Contains «ह» (ha)',
      test: function (w) { return w.deva.indexOf('ह') >= 0; } }
  ],

  /* ==========================================================================
     ЛОВУШКИ ДЛЯ «ФИЛВОРДА СРЕДИ СЛОВ»
     В поле лежат только настоящие санскритские словосочетания. Ни одной
     выдуманной формы: ловушка — это либо ЧУЖОЙ род при верных словах
     (श्यामं हस्तः, नीलः जिह्वा), либо верное согласование с цветом, которого
     в уроке не было (कपिशं मुखम्, हरितः पादः).
     ========================================================================== */
  decoys: [
    /* чужой род: среднее окончание при мужском слове и наоборот */
    'श्यामं हस्तः',
    'गौरः ललाटम्',
    'पाटला मुखम्',
    'नीलः जिह्वा',
    'रक्तः उदरम्',
    'श्वेतं दन्तः',
    'श्यामा पादः',
    'गौरा हस्तः',
    /* согласование верное, но такого цвета в уроке нет */
    'कपिशं मुखम्',
    'हरितः पादः',
    'धूसरं ललाटम्',
    'पीता जिह्वा'
  ]
});
