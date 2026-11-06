#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Clarity patch for the LIVE branch (arena/c55ca3f6 · v113).

Run it in a checkout of that branch:

    python3 patch_clarity_v113.py          # from the repository root

It fixes the three things that are impossible to play, in every lesson at once:

  1. Упражнение 10 «Категории» — понятные названия + подсказка под названием
     (term ् / ः / ं / ष / «два слога» and the number rules explained in words).
  2. Игра 22 «Слепое поле» — на экране и в правилах: шаги, координаты, подсвеченная
     клетка, «показать поле».
  3. Игра 24 «Бинго» — прямой ответ на вопрос «два ученика заходят на сайт?»:
     оба за ОДНИМ устройством, две карты на экране, закрывать только свою.
     Плюс одна и та же фраза про одно устройство в «Вдвоём» у всех парных игр.

It also repairs one wrong category: lesson 8 (Цифры 11–15) claimed «Без знака ्»
for four words, but three of them do have a ्. The category is now «Есть буква «च»».

Anchors are asserted — a silent no-op is impossible: every line prints OK or MISS.
"""
import io, sys

# ---------------------------------------------------------------- concepts
# (titleRu, titleEn, hintRu, hintEn)
CONJ = ("Есть слитная согласная (знак ् внутри слова)",
        "Has a joined consonant (a ् inside the word)",
        "Знак ् под буквой гасит гласную «а», и две согласные слипаются в одну — ज्ञ, क्त, स्त. "
        "Знак ् в самом конце слова (слово просто обрывается на согласной) сюда не идёт.",
        "The sign ् under a letter cancels the vowel “a” and two consonants merge into one — ज्ञ, क्त, स्त. "
        "A ् at the very end (the word simply stops on a consonant) does not count here.")

VIRAMA = ("Есть знак ् — согласная без гласной",
          "Has a ् — a consonant with no vowel",
          "Знак ् (вирама) под буквой: эта согласная стоит без гласной — она либо слипается со следующей (ज्ञ), "
          "либо обрывает слово на конце (वाक्).",
          "The sign ् (virāma) under a letter: that consonant stands without a vowel — it either merges with the "
          "next one (ज्ञ) or ends the word (वाक्).")

NO_VIRAMA = ("Нет знака ् — все согласные с гласной",
             "No ् — every consonant keeps its vowel",
             "Наоборот: ни одной согласной без гласной — каждая стоит со своей гласной.",
             "The other way round: not a single consonant stands without its vowel.")

VISARGA = ("Оканчиваются на ः (висарга, ḥ)",
           "Ending in ः (visarga, ḥ)",
           "Две точки справа от буквы — ः (висарга): придыхание на конце слова, в латинице «ḥ».",
           "Two dots to the right of the letter — ः (visarga): a breath at the end of the word, written “ḥ” in Latin.")

NO_VISARGA = ("Не оканчиваются на ः",
              "Not ending in ः",
              "Наоборот: двух точек ः на конце слова нет.",
              "The other way round: there are no two dots ः at the end.")

ANU = ("Есть носовой ं (ṃ, анусвара)",
       "Has a nasal ं (ṃ, anusvāra)",
       "Точка над буквой — ं (анусвара): носовой призвук; в латинице он записывается как «ṃ».",
       "A dot above the letter — ं (anusvāra): a nasal sound, written “ṃ” in Latin.")

NO_ANU = ("Нет носового ं (ṃ)",
          "No nasal ं (ṃ)",
          "Наоборот: точки ं над буквой нет.",
          "The other way round: there is no ं dot above any letter.")

MULT20 = ("Кратны двадцати (20, 40, 60…)",
          "Multiples of twenty (20, 40, 60…)",
          "Число делится на 20 без остатка: 20, 40, 60, 80, 100.",
          "The number divides by 20 with nothing left over: 20, 40, 60, 80, 100.")

NOT_MULT20 = ("Не кратны двадцати",
              "Not multiples of twenty",
              "Наоборот: при делении на 20 остаётся остаток — 10, 30, 50, 70, 90.",
              "The other way round: dividing by 20 leaves a remainder — 10, 30, 50, 70, 90.")

MULT30 = ("Кратны тридцати (30, 60, 90)",
          "Multiples of thirty (30, 60, 90)",
          "Число делится на 30 без остатка: 30, 60, 90.",
          "The number divides by 30 with nothing left over: 30, 60, 90.")

SSA = ("Есть буква «ष» (ṣa)",
       "Contains the letter «ष» (ṣa)",
       "Буква ष — с «хвостиком» внизу слева; в латинице это «ṣ».",
       "The letter ष has a little tail at the bottom left; it is “ṣ” in Latin.")

NO_SSA = ("Нет буквы «ष» (ṣa)",
          "Without the letter «ष» (ṣa)",
          "Наоборот: буквы ष в слове нет.",
          "The other way round: the word has no ष at all.")

CA = ("Есть буква «च» (ca)",
      "Contains the letter «च» (ca)",
      "В слове встречается буква च — «ca».",
      "The word contains the letter च — “ca”.")

TA = ("Есть буква «त» (ta)",
      "Contains the letter «त» (ta)",
      "В слове встречается буква त — «ta».",
      "The word contains the letter त — “ta”.")

NO_SA = ("Нет буквы «स» (sa)",
         "Without the letter «स» (sa)",
         "Наоборот: буквы स в слове нет.",
         "The other way round: the word has no स at all.")

ENDS_DASA = ("Оканчиваются на «दश» (daśa)",
             "Ending in «दश» (daśa)",
             "Последние слоги слова — те же, что в слове «दश» (десять).",
             "The word ends with the same syllables as «दश» (ten).")

ENDS_I = ("Последний звук — «i» (знак ि)",
          "Last sound is «i» (sign ि)",
          "Посмотрите на последний слог: он звучит как краткое «i» — это знак ि.",
          "Look at the last syllable: it sounds like a short “i” — the sign ि.")

VOWEL_SIGN = ("Есть знак гласной (ि, ी, ा, े)",
              "Has a vowel sign (ि, ी, ा, े)",
              "Знак гласной — это «крючок» ि, «палочка» ा или ी либо «галочка» े при согласной. "
              "Отдельная гласная буква (अ, आ, इ) знаком не считается.",
              "A vowel sign is the “hook” ि, the “stroke” ा or ी, or the “tick” े attached to a consonant. "
              "A standalone vowel letter (अ, आ, इ) is not a sign.")

LONG_VOWEL = ("С долгим гласным (ा / ौ)",
              "With a long vowel (ा / ौ)",
              "Долгая гласная — «палочка» ा или «крючок» ौ: она звучит вдвое дольше краткой.",
              "A long vowel is the “stroke” ा or the “hook” ौ: it sounds twice as long as a short one.")

TWO_SYLL = ("Ровно два слога",
            "Exactly two syllables",
            "Считаем гласные звуки: например, नरः — два слога, जलम् — три.",
            "Count the vowel sounds: नरः has two syllables, जलम् has three.")

END_A_OR_H = ("Окончание ा или ः",
              "Ending in ा or ः",
              "Последний знак слова — либо «палочка» ा, либо две точки ः.",
              "The last sign of the word is either the “stroke” ा or the two dots ः.")

START_CONS = ("Начинаются с согласной (не с гласной)",
              "Start with a consonant (not a vowel)",
              "Первая буква — согласная: слово не начинается на гласную अ, आ, इ или उ.",
              "The first letter is a consonant: the word does not begin with the vowel अ, आ, इ or उ.")


def cat_line(concept, ids, comma=True):
    """A trailing comma everywhere except on the last item of the array —
    decided by the punctuation of the line we are replacing."""
    return ('    { titleRu: "%s", titleEn: "%s",\n'
            '      hintRu: "%s",\n'
            '      hintEn: "%s",\n'
            '      wordIds: %s }%s' % (concept[0], concept[1], concept[2], concept[3], ids,
                                       ',' if comma else ''))


# old exact line -> (concept, wordIds)
DATA = {
    'lesson4.js': [   # урок 8 · Цифры 1–5  ← the lesson the student complained about
        ('    { titleRu: "Оканчиваются на «इ» (i)", titleEn: "Ending in \\"i\\" (इ)", wordIds: ["trini", "catvari"] },',
         ENDS_I, '["trini", "catvari"]'),
        ('    { titleRu: "С гласным знаком (ि, ी, ा, े)", titleEn: "With a Vowel Sign (ि, ी, ा, े)", wordIds: ["dve", "trini", "catvari"] },',
         VOWEL_SIGN, '["dve", "trini", "catvari"]'),
        ('    { titleRu: "Со слитным знаком ्", titleEn: "With a Conjunct (्)", wordIds: ["dve", "trini", "catvari", "panca"] },',
         CONJ, '["dve", "trini", "catvari", "panca"]'),
        ('    { titleRu: "Со звуком «च» (ca)", titleEn: "Containing \\"च\\" (ca)", wordIds: ["catvari", "panca"] },',
         CA, '["catvari", "panca"]'),
    ],
    'lesson5.js': [   # урок 9 · Счёт мальчиков 1–5
        ('    { titleRu: "С висаргой ः", titleEn: "Ending in ः", wordIds: ["ekah", "trayah", "catvarah"] },',
         VISARGA, '["ekah", "trayah", "catvarah"]'),
        ('    { titleRu: "Без висарги", titleEn: "No Visarga", wordIds: ["dvau", "panca"] },',
         NO_VISARGA, '["dvau", "panca"]'),
        ('    { titleRu: "С долгим гласным (ा / ौ)", titleEn: "With a Long Vowel (ा / ौ)", wordIds: ["dvau", "catvarah"] },',
         LONG_VOWEL, '["dvau", "catvarah"]'),
        ('    { titleRu: "Есть звук «त» (ta)", titleEn: "Containing \\"त\\" (ta)", wordIds: ["trayah", "catvarah"] },',
         TA, '["trayah", "catvarah"]'),
        ('    { titleRu: "Два слога", titleEn: "Two Syllables", wordIds: ["ekah", "trayah", "panca"] },',
         TWO_SYLL, '["ekah", "trayah", "panca"]'),
    ],
    'lesson6.js': [   # урок 10 · Счёт девочек 1–5
        ('    { titleRu: "С висаргой ः", titleEn: "Ending in ः", wordIds: ["tisrah", "catasrah"] },',
         VISARGA, '["tisrah", "catasrah"]'),
        ('    { titleRu: "Без висарги", titleEn: "No Visarga", wordIds: ["eka", "dve", "panca"] },',
         NO_VISARGA, '["eka", "dve", "panca"]'),
        ('    { titleRu: "Без звука «स» (sa)", titleEn: "Without \\"स\\" (sa)", wordIds: ["dve", "panca"] },',
         NO_SA, '["dve", "panca"]'),
        ('    { titleRu: "Два слога", titleEn: "Two Syllables", wordIds: ["eka", "tisrah", "panca"] },',
         TWO_SYLL, '["eka", "tisrah", "panca"]'),
        ('    { titleRu: "Окончание ा или ः", titleEn: "Ending in ा or ः", wordIds: ["eka", "tisrah", "catasrah"] },',
         END_A_OR_H, '["eka", "tisrah", "catasrah"]'),
    ],
    'lesson7.js': [   # урок 11 · Цифры 6–10
        ('    { titleRu: "С буквой «ष» (ṣa)", titleEn: \'Containing "ष" (ṣa)\', wordIds: ["shat", "ashta"] },',
         SSA, '["shat", "ashta"]'),
        ('    { titleRu: "Со знаком ् (вирама)", titleEn: \'With a Virāma (्)\', wordIds: ["shat", "sapta", "ashta"] },',
         VIRAMA, '["shat", "sapta", "ashta"]'),
        ('    { titleRu: "Без знака ्", titleEn: \'Without a Virāma\', wordIds: ["nava", "dasha"] },',
         NO_VIRAMA, '["nava", "dasha"]'),
    ],
    'lesson8.js': [   # урок 12 · Цифры 11–15 — «Без знака ्» was wrong (only एकादश has no ्)
        ('    { titleRu: "Без знака ्", titleEn: "Without a Virāma", wordIds: ["ekadasa", "dvadasa", "trayodasa", "pancadasa"] }',
         CA, '["caturdasa", "pancadasa"]'),
    ],
    'lesson9.js': [   # урок 13 · Цифры 16–20
        ('    { titleRu: "Оканчиваются на «दश»", titleEn: "Ending in \'दश\'", wordIds: ["shodasa", "saptadasa", "ashtadasa", "navadasa"] },',
         ENDS_DASA, '["shodasa", "saptadasa", "ashtadasa", "navadasa"]'),
        ('    { titleRu: "С буквой «ष» (ṣa)", titleEn: "Containing \'ष\' (ṣa)", wordIds: ["shodasa", "ashtadasa"] },',
         SSA, '["shodasa", "ashtadasa"]'),
        ('    { titleRu: "Без буквы «ष» (ṣa)", titleEn: "Without \'ष\' (ṣa)", wordIds: ["saptadasa", "navadasa", "vimshati"] },',
         NO_SSA, '["saptadasa", "navadasa", "vimshati"]'),
    ],
    'lesson10.js': [  # урок 14 · Десятки 10–50
        ('    { titleRu: "С носовым ं (ṃ)", titleEn: "With an Anusvāra (ं)", wordIds: ["vimshati", "trimshat", "catvarimshat"] },',
         ANU, '["vimshati", "trimshat", "catvarimshat"]'),
        ('    { titleRu: "Без носового ं", titleEn: "Without an Anusvāra", wordIds: ["dasha", "pancashat"] },',
         NO_ANU, '["dasha", "pancashat"]'),
        ('    { titleRu: "Кратны двадцати", titleEn: "Multiples of Twenty", wordIds: ["vimshati", "catvarimshat"] },',
         MULT20, '["vimshati", "catvarimshat"]'),
        ('    { titleRu: "Не кратны двадцати", titleEn: "Not Multiples of Twenty", wordIds: ["dasha", "trimshat", "pancashat"] }',
         NOT_MULT20, '["dasha", "trimshat", "pancashat"]'),
    ],
    'lesson11.js': [  # урок 15 · Десятки 60–100
        ('    { titleRu: "Начинаются с согласной", titleEn: "Starting with a Consonant", wordIds: ["shashti", "saptati", "navati", "shatam"] },',
         START_CONS, '["shashti", "saptati", "navati", "shatam"]'),
        ('    { titleRu: "Кратны тридцати", titleEn: "Multiples of Thirty", wordIds: ["shashti", "navati"] },',
         MULT30, '["shashti", "navati"]'),
        ('    { titleRu: "Кратны двадцати", titleEn: "Multiples of Twenty", wordIds: ["shashti", "ashiti", "shatam"] },',
         MULT20, '["shashti", "ashiti", "shatam"]'),
        ('    { titleRu: "Не кратны двадцати", titleEn: "Not Multiples of Twenty", wordIds: ["saptati", "navati"] }',
         NOT_MULT20, '["saptati", "navati"]'),
    ],
}


def patch(path, pairs, only_after=None):
    """only_after: replace only inside the tail of the file starting at that
    marker — category titles can also occur in `groups`, and those must stay."""
    s = io.open(path, encoding='utf-8').read()
    for old, new in pairs:
        if only_after and only_after in s:
            cut = s.rindex(only_after)
            head, tail = s[:cut], s[cut:]
            if old not in tail:
                print('MISS [%s]: %s' % (path, old.strip().split('\n')[0][:66]))
                continue
            s = head + tail.replace(old, new, 1)
        elif old not in s:
            print('MISS [%s]: %s' % (path, old.strip().split('\n')[0][:66]))
            continue
        else:
            s = s.replace(old, new, 1)
        print('OK   [%s]: %s' % (path, old.strip().split('\n')[0][:66]))
    io.open(path, 'w', encoding='utf-8').write(s)


# --------------------------------------------------------------- 1. engine
patch('lesson-engine.js', [

    # game 10: «КАТЕГОРИЯ n / N» + the hint under the title
    ("""      centerCard(
        '<div class="cat-title" style="font-size:1.05rem;font-weight:800;color:var(--accent-cambridge);margin-bottom:0.35rem;">' + catTitle(cat) + '</div>' +
        '<div style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1rem;">' +
        ru('Select all the words that belong to this category', 'Выберите все слова, которые относятся к этой категории') + '</div>' +""",
     """      centerCard(
        '<div style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;' +
          'color:var(--accent-saffron);margin-bottom:0.35rem;"' +
          ' data-i18n-ru="' + ru('CATEGORY ', 'КАТЕГОРИЯ ') + (g.i + 1) + ' / ' + cats.length + '"' +
          ' data-i18n-en="' + ru('CATEGORY ', 'CATEGORY ') + (g.i + 1) + ' / ' + cats.length + '">' +
          ru('CATEGORY ', 'КАТЕГОРИЯ ') + (g.i + 1) + ' / ' + cats.length + '</div>' +
        '<div class="cat-title" style="font-size:1.45rem;font-weight:800;color:var(--text-primary);margin-bottom:0.35rem;">' +
          catTitle(cat) + '</div>' +
        (cat.hintRu || cat.hintEn
          ? '<div class="cat-hint" style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:0.35rem;"' +
            ' data-i18n-ru="' + q(cat.hintRu) + '" data-i18n-en="' + q(cat.hintEn) + '">' +
            tx({ ru: cat.hintRu, en: cat.hintEn }) + '</div>'
          : '') +
        '<div style="font-size:0.88rem;color:var(--text-secondary);font-weight:600;margin-bottom:1rem;">' +
        ru('Select all the words that belong to this category', 'Выберите все слова, которые относятся к этой категории') + '</div>' +"""),

    # values that go into an HTML attribute (a title may contain quotes)
    ("""  function tx(o) {
    if (o == null) return '';
    if (typeof o === 'string') return o;
    return o[L()] || o.en || o.ru || '';
  }""",
     """  function tx(o) {
    if (o == null) return '';
    if (typeof o === 'string') return o;
    if (o[L()] != null) return o[L()];
    var t = L() === 'ru' ? o.titleRu : o.titleEn;
    if (t != null) return t;
    return o.en || o.ru || '';
  }
  /* a value that goes into an HTML attribute: a title may contain quotes */
  function q(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }"""),

    # every pair game says it once, the same way: two students, one device
    ("""  function rulesBlock(r, open, onclick) {""",
     """  /* Every pair game is hot-seat: two students, one device. Said once, the same
     way, in every lesson — nobody should have to guess whether a second phone
     has to join the site. */
  var PAIR_NOTE = {
    ru: '<em>Оба игрока — за одним устройством: заходить на сайт с двух телефонов ' +
        'не нужно, ход просто передаётся по экрану.</em>',
    en: '<em>Both players share one device: there is nothing to join from a second ' +
        'phone — the turn simply passes on screen.</em>'
  };
  function pairRow(pair) {
    var t = txPair(pair);
    if (!t) return '';
    return t + '<div style="margin-top:0.3rem;">' + tx(PAIR_NOTE) + '</div>';
  }

  function rulesBlock(r, open, onclick) {"""),

    ("""          row(tx({ ru: 'Вдвоём', en: 'In pairs' }), txPair(r.pair)) +""",
     """          row(tx({ ru: 'Вдвоём', en: 'In pairs' }), pairRow(r.pair)) +"""),
])

# --------------------------------------------------------- 2. games-extra
patch('games-extra.js', [

    # ---- 22 · Слепое поле: rules
    ("""    blindboard: {
      aim: { ru: 'Чистая память: вспомнить, что спрятано в названной клетке, без подсказок.',
             en: 'Pure recall: remember what hides in the square you are asked about, with no prompts.' },
      how: { ru: ['Поле открыто 2,5 секунды — запомните, где что лежит.',
                  'Потом поле закрывается, и игра спрашивает про одну клетку: «Что в b2?»',
                  'Выберите слово из всех слов урока.',
                  '👁 «Показать поле» — открыть всё поле заново.'],""",
     """    blindboard: {
      aim: { ru: 'Память на расположение: запомнить поле, а потом назвать, какое слово спрятано в названной клетке.',
             en: 'Memory for positions: memorise the board, then name the word hidden in the square you are asked about.' },
      how: { ru: ['Шаг 1. Поле открыто 2,5 секунды: во всех клетках видны слова урока (каждое — дважды). Запомните, где что лежит.',
                  'Шаг 2. Поле закрывается — вместо слов остаются только координаты: a1, a2, b1… (буква — ряд, цифра — столбец).',
                  'Шаг 3. Игра называет одну клетку, и она подсвечена: «Что в b2?» Выберите слово из всех слов урока — нажмите ту букву (A, B, C…), которую назвали бы вслух.',
                  'Шаг 4. Угадали — клетка открывается и остаётся открытой. Ошиблись — игра показывает верное слово, клетка остаётся закрытой.',
                  'Забыли, где что? 👁 «Показать поле» — откроет всё поле ещё на 2,5 секунды. Так можно сколько угодно раз.'],"""),

    ("""             en: ['The board is open for 2.5 seconds — memorise what is where.',
                  'Then it closes and the game asks about one square: “What is in b2?”',
                  'Choose the word from all the words of the lesson.',
                  '👁 “Show board” opens the whole board again.'] },""",
     """             en: ['Step 1. The board is open for 2.5 seconds: every square shows a word of the lesson (each word twice). Memorise what is where.',
                  'Step 2. The board closes — only the coordinates stay: a1, a2, b1… (letter = row, number = column).',
                  'Step 3. The game names one square and highlights it: “What is in b2?” Choose the word from all the words of the lesson — press the letter (A, B, C…) you would say aloud.',
                  'Step 4. A hit: the square opens and stays open. A miss: the game shows the right word and the square stays closed.',
                  'Forgot the board? 👁 “Show board” opens everything again for another 2.5 seconds — as often as you like.'] },"""),

    # ---- 22 · Слепое поле: the question above the options
    ("""        (g.phase === 'ask' && !g.answered
          ? '<div style="margin-top:0.9rem;">' + K.optGrid(shuffle(cfg.words).map(function (o, i) {
              return wordOpt(cfg, o, 'blindPick', '', i);
            }).join('')) + '</div>'
          : '') +""",
     """        (g.phase === 'ask' && g.ask !== null && !g.answered
          ? '<div style="margin-top:0.9rem;font-size:1.15rem;font-weight:800;">' +
              tx({ ru: 'Что в клетке', en: 'What is in' }) +
              ' <span style="color:var(--accent-cambridge);">' + K.cellName(g.ask, cols) + '</span>?</div>' +
            '<div style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:0.4rem;">' +
              tx({ ru: 'Выберите слово, которое спрятано в этой клетке — назовите его букву вслух.',
                   en: 'Choose the word hidden in that square — say its letter aloud.' }) + '</div>' +
            '<div>' + K.optGrid(shuffle(cfg.words).map(function (o, i) {
              return wordOpt(cfg, o, 'blindPick', '', i);
            }).join('')) + '</div>'
          : '') +"""),

    # ---- 22 · Слепое поле: the line under the board (keeps the pair line)
    ("""        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Поле открыто 2,5 секунды, затем закрыто. Назовите, что спрятано в названной клетке.',
               en: 'The board shows for 2.5 seconds, then closes. Name what hides in the square you are asked about.' }) +
          (duoB ? '<br/>' + tx({ ru: 'Отвечает по очереди: вопрос — одному, следующий — другому.',
                                 en: 'Turns alternate: one question for each student.' }) : '') + '</div>');""",
     """        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          (g.phase === 'show'
            ? tx({ ru: 'Запоминайте: поле закроется через 2,5 секунды. Потом игра назовёт клетку (например b2), и вы выберете, какое слово в ней спрятано.',
                   en: 'Memorise: the board closes in 2.5 seconds. Then the game names a square (b2, for example) and you choose the word hidden in it.' })
            : tx({ ru: 'Поле закрыто, клетки видны по координатам (a1, b2…). Названная клетка подсвечена — выберите слово. Забыли поле? Нажмите 👁 «Показать поле».',
                   en: 'The board is closed and the squares show coordinates (a1, b2…). The square you are asked about is highlighted — choose the word. Forgot the board? Press 👁 “Show board”.' })) +
          (duoB ? '<br/>' + tx({ ru: 'Отвечает по очереди: вопрос — одному, следующий — другому.',
                                 en: 'Turns alternate: one question for each student.' }) : '') + '</div>');"""),

    # ---- 24 · Бинго: rules
    ("""      how: { ru: ['📣 «Следующее слово» — ведущий называет слово (слово видно и звучит 🔊).',
                  'Каждый игрок закрывает это слово у себя на карте 3 × 3 — нажмите нужную клетку.',
                  'Закрыта не та клетка — нажатие не засчитывается.',
                  'Кто закрыл все девять клеток, тот кричит «бинго!» и побеждает.'],
             en: ['📣 “Next word” — the caller says a word (shown and spoken with 🔊).',
                  'Each player covers that word on their own 3 × 3 card by pressing the cell.',
                  'Pressing the wrong cell simply does not count.',
                  'Whoever covers all nine cells shouts “bingo!” and wins.'] },""",
     """      how: { ru: ['Два ученика играют за ОДНИМ устройством: обе карты 3 × 3 видны на экране рядом — слева карта ученика 1, справа карта ученика 2. Заходить на сайт с двух телефонов не нужно.',
                  'Ведущий (учитель или третий ученик) нажимает 📣 «Следующее слово»: слово появляется на экране и звучит 🔊.',
                  'Каждый игрок ищет это слово у себя на карте и нажимает клетку — она закрывается ✓.',
                  'Нажимать можно только на СВОЕЙ карте и только на названное слово; другое нажатие просто не засчитывается.',
                  'Кто первым закрыл все девять клеток — кричит «бинго!» и побеждает.'],
             en: ['Two students play on ONE device: both 3 × 3 cards are on the screen side by side — student 1 on the left, student 2 on the right. Nobody has to join the site from a second phone.',
                  'The caller (the teacher or a third student) presses 📣 “Next word”: the word appears and is spoken with 🔊.',
                  'Each player finds the word on their own card and presses the cell — it is covered with ✓.',
                  'You may only press a cell on YOUR OWN card and only for the word that has been called; anything else simply does not count.',
                  'The first to cover all nine cells shouts “bingo!” and wins.'] },"""),

    # ---- 24 · Бинго: the line under the cards
    ("""        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Ведущий называет слово — игрок закрывает его у себя на карте. Кто закрыл все девять клеток, тот кричит «бинго!».',
               en: 'The caller says a word; each player covers it on their own card. All nine covered — shout “bingo!”.' }) + '</div>');""",
     """        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          (players(cfg) === 2
            ? tx({ ru: 'Оба игрока — за одним устройством: карта ученика 1 слева, ученика 2 справа. Каждый закрывает клетку только на СВОЕЙ карте — и только то слово, которое назвал ведущий.',
                   en: 'Both players share one device: student 1’s card is on the left, student 2’s on the right. Each covers a cell only on THEIR OWN card — and only for the word the caller has just said.' })
            : tx({ ru: 'Один игрок: нажимайте 📣 «Следующее слово» и закрывайте названное слово на карте. Хочется вдвоём — переключитесь на «2 ученика» над вкладками: появится вторая карта.',
                   en: 'One player: press 📣 “Next word” and cover the word that has been called. For two, switch to “2 students” above the tabs — a second card appears.' })) + '</div>');"""),
])

# ------------------------------------------------------------- 3. the data
for path, items in DATA.items():
    pairs = []
    for old, concept, ids in items:
        comma = old.rstrip().endswith(',')
        pairs.append((old, cat_line(concept, ids, comma)))
    patch(path, pairs, only_after='\n  categories: [')

# ------------------------------------------------- 4. cache: bump the version
# Without this the browser serves the old lesson-engine.js / games-extra.js and
# the student sees nothing new. The number is read from index.html, so it never
# collides with whatever version the branch is on.
try:
    h = io.open('index.html', encoding='utf-8').read()
    import re as _re
    cur = _re.search(r'\?v=(\d+)', h)
    if cur:
        now, nxt = int(cur.group(1)), int(cur.group(1)) + 1
        h2 = h.replace('?v=%d' % now, '?v=%d' % nxt).replace('data-build="v%d"' % now,
                                                             'data-build="v%d"' % nxt)
        io.open('index.html', 'w', encoding='utf-8').write(h2)
        print('OK   [index.html]: v%d -> v%d (%d ссылок)' % (now, nxt, h2.count('?v=%d' % nxt)))
    else:
        print('MISS [index.html]: версия не найдена — увеличьте ?v= вручную')
except IOError:
    print('MISS [index.html]: файла нет')

print('\nГотово. Проверьте: node --check <файл> и node tests/regression.js')
