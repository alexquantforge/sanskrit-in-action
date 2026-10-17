/* =============================================================================
   Sanskrit in Action — GENERIC PPP LESSON ENGINE
   -----------------------------------------------------------------------------
   Renders lessons 2, 3, ... built on the Cambridge CELTA / Direct Method
   PPP framework (Presentation → Practice → Production).

   Lesson 1 keeps its own standalone file (lesson1.js) and is NOT touched by
   this engine. Every new lesson is pure DATA (see lesson2.js / lesson3.js):

       SAL.registerLesson({
         key, num, titleDeva, titleRu, titleEn, topicRu, topicEn,
         introRu, introEn,
         words:      [ { id, deva, iast, ttsText, svg, typoDeva, typoIast,
                         maskedPrefix, maskedHidden, gapDeva, gapIast, gapAnswer,
                         gapChoices:[{deva,iast}], missingDisplay, missingAnswer,
                         missingChoices:[] } ],
         steps:      [ { wordIds: [id, id] } ],
         hotspots:   { figures: [ { key, captionRu, captionEn, viewBox, art,
                                    pins: [{ id, num, x, y, tx, ty }] } ] },
         groups:     [ { titleRu, titleEn, wordIds } ],
         categories: [ { titleRu, titleEn, wordIds, bonusWordIds? } ]
       });

   Everything below is generic: the same 4 presentation modes, the same 12
   practice games and the same 4 production modes work for any word list.
   ============================================================================= */
/* Global namespace shared with the lesson data files (lesson2.js, lesson3.js) */
var SAL = (window.SAL = window.SAL || {});

(function () {
  'use strict';

  var lessons = {};
  SAL.lessons = lessons;
  var activeKey = null;
  var timers = { sprint: null, chant: null };

  /* Called by every lesson data file (lesson2.js, lesson3.js, ...) */
  SAL.registerLesson = function (cfg) {
    lessons[cfg.key] = cfg;
    return cfg;
  };

  /* ------------------------------------------------------------------ utils */
  function L() {
    return typeof currentLang !== 'undefined' ? currentLang : 'ru';
  }
  function tx(o) {
    if (o == null) return '';
    if (typeof o === 'string') return o;
    return o[L()] || o.en || o.ru || '';
  }
  function ru(enStr, ruStr) { return L() === 'ru' ? ruStr : enStr; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function others(cfg, id, n) {
    return shuffle(cfg.words.filter(function (w) { return w.id !== id; })).slice(0, n);
  }
  function byId(cfg, id) {
    for (var i = 0; i < cfg.words.length; i++) if (cfg.words[i].id === id) return cfg.words[i];
    return cfg.words[0];
  }
  function iastOn() {
    return typeof iastHidden === 'undefined' ? false : !iastHidden;
  }

  SAL.speak = function (text) {
    try {
      if (!window.speechSynthesis || !text) return;
      var u = new SpeechSynthesisUtterance(text);
      var voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
      var v = voices.filter(function (x) { return x.lang && x.lang.toLowerCase().indexOf('sa') === 0; })[0] ||
              voices.filter(function (x) { return x.lang && x.lang.toLowerCase().indexOf('hi') === 0; })[0] ||
              voices.filter(function (x) { return x.lang && x.lang.toLowerCase().indexOf('mr') === 0; })[0];
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'hi-IN'; }
      u.rate = 0.82; u.pitch = 1; u.volume = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) { /* TTS unavailable */ }
  };

  /* ------------------------------------------------------------------ state */
  function makeState(cfg) {
    return {
      pres: {
        mode: 'stepbystep', step: 0, labelsHidden: false, maskMode: false,
        revealed: {}, heard: {}, audioRevealed: {}, hotspotId: cfg.words[0].id
      },
      game: 'masked',
      g: {},
      prod: {
        mode: 'sprint',
        produced: {},
        active: cfg.words[0].id,
        chantReverse: false,
        /* Speed Sprint — same 3 sub-modes / 3 speeds / 2 views as Lesson 1 */
        sprint: {
          subMode: 'manual',   /* 'manual' | 'auto' | 'slideshow' */
          duration: 4,         /* 4 | 3 | 2 seconds */
          visual: 'card',      /* 'card' (isolated picture) | 'arrow' (arrow on the diagram) */
          i: 0, score: 0, timeLeft: 4, running: false,
          started: false, revealed: false, finished: false
        },
        mic: { i: 0, score: 0, listening: false, revealed: false, transcript: '', result: null, finished: false },
        missing: { order: null, i: 0, score: 0, revealed: false, finished: false }
      }
    };
  }
  function state(cfg) {
    if (!cfg._st) cfg._st = makeState(cfg);
    return cfg._st;
  }
  function gst(cfg, name) {
    var st = state(cfg);
    if (!st.g[name]) st.g[name] = (GAME_INIT[name] || function () { return {}; })(cfg, st);
    return st.g[name];
  }

  /* ------------------------------------------------------- tiny html pieces */
  function iastSpan(s) {
    return '<span class="iast-text"> (' + s + ')</span>';
  }
  function devaLabel(w, size) {
    return '<div class="vocab-deva"' + (size ? ' style="font-size:' + size + '"' : '') + '>' + w.deva + '</div>';
  }
  function maskedMarkup(w, revealed, size) {
    return '<div class="masked-word-line"' + (size ? ' style="font-size:' + size + '"' : '') + '>' +
      '<span>' + w.maskedPrefix + '</span>' +
      '<span class="pink-mask-square' + (revealed ? ' revealed' : '') + '">' +
      (revealed ? w.maskedHidden : '■') + '</span></div>';
  }
  function optBtn(cfg, action, value, html, cls) {
    return '<button type="button" class="quiz-opt-btn ' + (cls || '') + '" onclick="SAL.do(\'' + cfg.key +
      '\',\'' + action + '\',\'' + value + '\')">' + html + '</button>';
  }
  function chip(cfg, action, value, label, active) {
    return '<button type="button" class="chip-btn' + (active ? ' active' : '') + '" onclick="SAL.do(\'' + cfg.key +
      '\',\'' + action + '\'' + (value ? ',\'' + value + '\'' : '') + ')">' + label + '</button>';
  }
  function topBar(left, right) {
    return '<div class="game-top-bar"><div>' + left + '</div><div style="display:flex;gap:0.45rem;flex-wrap:wrap;">' +
      right + '</div></div>';
  }
  function pill(txt) { return '<span class="game-score-pill">' + txt + '</span>'; }
  function stage(inner) {
    return '<div class="game-stage">' + inner + '</div>';
  }
  function finalScreen(cfg, game, title, score, total, extra) {
    return stage(
      '<div style="text-align:center;padding:1.5rem 1rem;">' +
      '<div style="font-size:2.6rem;line-height:1;">🏆</div>' +
      '<h3 style="margin:0.5rem 0 0.35rem;">' + title + '</h3>' +
      (extra ? '<div style="margin-bottom:0.75rem;color:var(--text-secondary);font-size:0.95rem;">' + extra + '</div>' : '') +
      '<div class="game-score-pill" style="font-size:1rem;padding:0.5rem 1.1rem;">' +
      ru('Score', 'Результат') + ': ' + score + ' / ' + total + '</div>' +
      '<div style="margin-top:1.15rem;">' +
      '<button type="button" class="btn btn-primary" onclick="SAL.do(\'' + cfg.key + '\',\'restart\',\'' + game + '\')">' +
      ru('↺ Start Over', '↺ Начать сначала') + '</button></div></div>'
    );
  }

  /* =========================================================================
     SKELETON (built once per lesson pane)
     ========================================================================= */
  function navBarHtml(cfg) {
    function lessonBtn(key, labelRu, labelEn, num) {
      return '<button type="button" class="chip-btn' + (cfg.num === num ? ' active' : '') +
        '" style="padding:0.28rem 0.65rem;font-size:0.78rem;white-space:nowrap;" onclick="SAL.openLesson(\'' + key + '\')"' +
        ' data-i18n-ru="' + labelRu + '" data-i18n-en="' + labelEn + '">' + (L() === 'ru' ? labelRu : labelEn) + '</button>';
    }
    return '' +
      '<div class="ppp-nav-bar"><div class="container ppp-top-row">' +
        '<div style="display:inline-flex;align-items:center;gap:0.4rem;flex-wrap:nowrap;white-space:nowrap;">' +
          '<button type="button" class="chip-btn" style="padding:0.28rem 0.65rem;font-size:0.78rem;" onclick="switchView(\'home\')"' +
            ' data-i18n-ru="← На главную" data-i18n-en="← Home">← ' + ru('Home', 'На главную') + '</button>' +
          '<button type="button" class="chip-btn" style="padding:0.28rem 0.65rem;font-size:0.78rem;" onclick="switchView(\'lesson1\')"' +
            ' data-i18n-ru="Урок 1: Части тела" data-i18n-en="Lesson 1: Body Parts">' + ru('Lesson 1: Body Parts', 'Урок 1: Части тела') + '</button>' +
          lessonBtn('L2', 'Урок 2: Тело', 'Lesson 2: Body', 2) +
          lessonBtn('L3', 'Урок 3: Лицо', 'Lesson 3: Face', 3) +
        '</div>' +
        '<div class="ppp-steps-pills">' +
          '<a href="#' + cfg.key + '-presentation" class="ppp-step-pill p1" data-i18n-ru="1. Presentation" data-i18n-en="1. Presentation">1. Presentation</a>' +
          '<a href="#' + cfg.key + '-practice" class="ppp-step-pill p2" data-i18n-ru="2. Practice" data-i18n-en="2. Practice">2. Practice</a>' +
          '<a href="#' + cfg.key + '-production" class="ppp-step-pill p3" data-i18n-ru="3. Production" data-i18n-en="3. Production">3. Production</a>' +
        '</div>' +
        '<div style="display:inline-flex;align-items:center;gap:0.4rem;flex-wrap:nowrap;white-space:nowrap;">' +
          '<button type="button" class="chip-btn toggle-iast-btn" style="padding:0.28rem 0.7rem;font-size:0.78rem;" onclick="SAL.toggleIast()"' +
            ' data-i18n-ru="🔤 Включить IAST" data-i18n-en="🔤 Enable IAST">🔤 ' + ru('Enable IAST', 'Включить IAST') + '</button>' +
        '</div>' +
      '</div></div>';
  }

  function tgBox(cfg, stageKey, titleRu, titleEn, steps) {
    var items = steps.map(function (s) {
      return '<div class="teacher-guide-step" data-i18n-ru="' + s[0] + '" data-i18n-en="' + s[1] + '">' +
        (L() === 'ru' ? s[0] : s[1]) + '</div>';
    }).join('');
    return '' +
      '<div id="' + cfg.key + '-tg-' + stageKey + '" class="teacher-guide-box">' +
        '<div class="teacher-guide-header"><h3>' + (L() === 'ru' ? titleRu : titleEn) + '</h3>' +
          '<button type="button" class="chip-btn" onclick="SAL.toggleGuide(\'' + cfg.key + '\',\'' + stageKey + '\')"' +
            ' data-i18n-ru="✕ Закрыть" data-i18n-en="✕ Close">✕ ' + ru('Close', 'Закрыть') + '</button>' +
        '</div><div class="teacher-guide-grid">' + items + '</div></div>';
  }

  function skeletonHtml(cfg) {
    var N = cfg.words.length;
    var devaList = cfg.words.map(function (w) { return w.deva; }).join(' · ');
    var iastList = cfg.words.map(function (w) { return w.iast; }).join(' · ');
    var key = cfg.key;

    var groupsHtml = cfg.groups.map(function (g, i) {
      var words = g.wordIds.map(function (id) { return byId(cfg, id); });
      return '<div class="cycle-step"><div class="cycle-step-num">' + (i + 1) + '</div>' +
        '<div style="font-size:0.8rem;font-weight:700;color:var(--accent-cambridge);margin-bottom:0.25rem;"' +
        ' data-i18n-ru="' + g.titleRu + '" data-i18n-en="' + g.titleEn + '">' + tx(g) + '</div>' +
        '<h4>' + words.map(function (w) { return w.deva; }).join(' · ') + '</h4>' +
        '<p class="iast-text"><em>' + words.map(function (w) { return w.iast; }).join(' · ') + '</em></p></div>';
    }).join('');

    var gameTabs = [
      ['masked', ru('1. Covered Square ■ (Guess Word)', '1. Закрыто квадратом ■ (Угадай слово)')],
      ['flashcards', ru('2. Flashcards', '2. Flashcards (Карточки)')],
      ['gaps', ru('3. Fill in the Gaps', '3. Fill in the Gaps (Пропуски)')],
      ['picquiz', ru('4. Picture Quiz', '4. Picture Quiz (Картинка → Слово)')],
      ['wordquiz', ru('5. Word → Picture', '5. Read & Match (Слово → Картинка)')],
      ['match', ru('6. Match Pairs', '6. Match Pairs (Найди пары)')],
      ['memory', ru('7. Classic Memory', '7. Классическое «Мемори»')],
      ['wronglabel', ru('8. Spot the Wrong Word', '8. Где ошибка? (3 картинки)')],
      ['typo', ru('9. Spot the 1-Letter Typo', '9. Ошибка в 1 букве (3 картинки)')],
      ['categories', ru('10. Categories', '10. Категории (Выбери из ' + N + ')')],
      ['spelling', ru('11. Missing Letters', '11. Missing Letters (Буквы)')],
      ['truefalse', ru('12. आम् / न (True / False)', '12. आम् / न (Да / Нет)')]
    ].map(function (g) {
      return '<button type="button" class="practice-tab-btn' + (g[0] === 'masked' ? ' active' : '') + '" data-game="' + g[0] +
        '" onclick="SAL.do(\'' + key + '\',\'setGame\',\'' + g[0] + '\')">' + g[1] + '</button>';
    }).join('');

    var prodTabs = [
      ['sprint', ru('1. Speed Sprint ⏱ (No Text)', '1. Спринт на время ⏱ (Без текста)')],
      ['mic', ru('2. Speak into Microphone 🎙', '2. Произнеси в микрофон 🎙')],
      ['missingpart', ru('3. What Is Missing? ❓', '3. Что пропало на рисунке? ❓')],
      ['chant', ru('4. TPR Chant & Checklist ' + N + '/' + N + ' ↑↓', '4. Ритм-чант и Чек-лист ' + N + '/' + N + ' ↑↓')]
    ].map(function (p) {
      return '<button type="button" class="practice-tab-btn' + (p[0] === 'sprint' ? ' active' : '') + '" data-prod-mode="' + p[0] +
        '" onclick="SAL.do(\'' + key + '\',\'setProdMode\',\'' + p[0] + '\')">' + p[1] + '</button>';
    }).join('');

    var presTabs = [
      ['stepbystep', ru('1. Step-by-Step (2 Words)', '1. Пошагово (по 2 слова)')],
      ['hotspots', ru('2. Body Diagram (Hotspots)', '2. Схема (Hotspots)')],
      ['audiofirst', ru('3. Audio-First 🔊 → Text', '3. Сначала звук 🔊 → потом буквы')],
      ['poster', ru('4. Full Poster (All ' + N + ')', '4. Плакат (все ' + N + ' слов)')]
    ].map(function (p) {
      return '<button type="button" class="practice-tab-btn' + (p[0] === 'stepbystep' ? ' active' : '') + '" data-pres-mode="' + p[0] +
        '" onclick="SAL.do(\'' + key + '\',\'setPresMode\',\'' + p[0] + '\')"' +
        ' data-i18n-ru="' + p[1].replace(/"/g, '') + '">' + p[1] + '</button>';
    }).join('');

    return navBarHtml(cfg) +

    /* ---------------------------------------------------------- PRESENTATION */
    '<section id="' + key + '-presentation" style="padding-top:2rem;"><div class="container">' +
      '<div class="section-header" style="margin-bottom:2rem;">' +
        '<div class="stage-eyebrow-row">' +
          '<div class="eyebrow" data-i18n-ru="УРОК ' + cfg.num + ' · CAMBRIDGE PPP · STAGE 1: PRESENTATION"' +
            ' data-i18n-en="LESSON ' + cfg.num + ' · CAMBRIDGE PPP · STAGE 1: PRESENTATION">УРОК ' + cfg.num + ' · CAMBRIDGE PPP · STAGE 1: PRESENTATION</div>' +
          '<button type="button" class="teacher-guide-btn" id="' + key + '-tgb-presentation" onclick="SAL.toggleGuide(\'' + key + '\',\'presentation\')"' +
            ' data-i18n-ru="👩‍🏫 Инструкция для преподавателя" data-i18n-en="👩‍🏫 Teacher\'s Guide">👩‍🏫 ' + ru('Teacher\'s Guide', 'Инструкция для преподавателя') + '</button>' +
        '</div>' +
        '<h2 class="section-title">' + cfg.titleDeva + ' — ' + tx({ ru: cfg.titleRu, en: cfg.titleEn }) + ' (Vocabulary A1)</h2>' +
        '<p class="section-desc" data-i18n-ru="' + cfg.introRu + '" data-i18n-en="' + cfg.introEn + '">' + tx({ ru: cfg.introRu, en: cfg.introEn }) + '</p>' +
      '</div>' +

      tgBox(cfg, 'presentation',
        '👩‍🏫 Инструкция для преподавателя · Stage 1: Presentation (10–12 мин)',
        '👩‍🏫 Teacher\'s Guide · Stage 1: Presentation (10–12 min)',
        [
          ['<strong>1. Цель и золотое правило CELTA (Direct Method):</strong><br/>Ввести ' + N + ' слов по формуле <strong>MPF (Meaning → Pronunciation → Form)</strong> строго без перевода на русский/английский. Значение передаётся только через картинку и жест на себе (<em>TPR — Total Physical Response</em>).',
           '<strong>1. Stage Aim &amp; CELTA Direct Method Rule:</strong><br/>Introduce the ' + N + ' target words via <strong>MPF (Meaning → Pronunciation → Form)</strong> with zero translation. Convey meaning purely through the illustration and pointing to yourself (<em>TPR — Total Physical Response</em>).'],
          ['<strong>2. Шаг А — Режим «1. Пошагово (по 2 слова)» (5 мин):</strong><br/>Открывайте по 2 слова за раз. Сначала жест на себе → <code>🔊</code> 2–3 раза → <strong>Choral Drill</strong> (хором), затем <strong>Individual Drill</strong> (по одному). Следите за долготой гласных и чётким конечным <code>-a</code>.',
           '<strong>2. Step A — Mode 1: Step-by-Step (5 min):</strong><br/>Reveal 2 words at a time. Point at yourself → play <code>🔊</code> 2–3 times → run a <strong>Choral Drill</strong>, then <strong>Individual Drills</strong>. Monitor vowel length and the final <code>-a</code>.'],
          ['<strong>3. Шаг Б — Режимы «2. Схема (Hotspots)» и «3. Сначала звук 🔊» (4 мин):</strong><br/>В режиме со схемой называйте номер точки вразброс и просите ученика назвать слово до нажатия. В режиме «Сначала звук» ученики повторяют слово на слух и лишь затем открывают деванагари.',
           '<strong>3. Step B — Modes 2 (Hotspots) &amp; 3 (Audio-First) (4 min):</strong><br/>In the diagram mode, call out marker numbers at random and elicit the word before clicking. In Audio-First, students hear and repeat the word before revealing the Devanagari script.'],
          ['<strong>4. Шаг В — Проверка понимания (CCQs, 2 мин):</strong><br/>Откройте «4. Плакат», нажмите <code>🟪 Закрыть часть слова ■</code>, затем <code>🙈 Скрыть подписи</code>. Указывайте на карточки в случайном порядке: если группа называет уверенно ' + Math.max(2, N - 2) + '–' + N + ' слов из ' + N + ', переходите к <strong>Practice</strong>.',
           '<strong>4. Step C — Concept &amp; Recall Check (CCQs, 2 min):</strong><br/>Open the full poster, click <code>🟪 Cover Part of Word ■</code>, then <code>🙈 Hide Labels</code>. Point to cards randomly: once learners recall ' + Math.max(2, N - 2) + '–' + N + ' of ' + N + ' words, move to <strong>Practice</strong>.']
        ]) +

      '<div class="practice-tabs" role="tablist" style="margin-bottom:1.25rem;">' + presTabs + '</div>' +

      '<div class="vocab-toolbar">' +
        '<div class="vocab-poster-title">' + cfg.titleDeva + '</div>' +
        '<div style="display:flex;gap:0.65rem;flex-wrap:wrap;">' +
          '<button type="button" class="chip-btn toggle-iast-btn" onclick="SAL.toggleIast()" data-i18n-ru="🔤 Включить IAST" data-i18n-en="🔤 Enable IAST">🔤 ' + ru('Enable IAST', 'Включить IAST') + '</button>' +
          '<button type="button" id="' + key + '-mask-btn" class="chip-btn" onclick="SAL.do(\'' + key + '\',\'toggleMask\')"' +
            ' data-i18n-ru="🟪 Закрыть часть слова ■" data-i18n-en="🟪 Cover Part of Word ■">🟪 ' + ru('Cover Part of Word ■', 'Закрыть часть слова ■') + '</button>' +
          '<button type="button" id="' + key + '-labels-btn" class="chip-btn" onclick="SAL.do(\'' + key + '\',\'toggleLabels\')"' +
            ' data-i18n-ru="🙈 Скрыть подписи" data-i18n-en="🙈 Hide Labels">🙈 ' + ru('Hide Labels', 'Скрыть подписи') + '</button>' +
          '<a href="#' + key + '-practice" class="btn btn-primary" style="padding:0.45rem 1rem;font-size:0.85rem;"' +
            ' data-i18n-ru="Перейти к играм (Practice) ↓" data-i18n-en="Go to Practice Games ↓">' + ru('Go to Practice Games ↓', 'Перейти к играм (Practice) ↓') + '</a>' +
        '</div>' +
      '</div>' +

      '<div id="' + key + '-pres-grid" class="vocab-grid-6"></div>' +

      '<div class="cycle-banner" style="padding:1.65rem 2rem;">' +
        '<span class="badge badge-gold" data-i18n-ru="CELTA LEXICAL GROUPING · ' + cfg.groups.length + ' КАТЕГОРИИ ДЛЯ ЗАПОМИНАНИЯ"' +
          ' data-i18n-en="CELTA LEXICAL GROUPING · ' + cfg.groups.length + ' CATEGORIES FOR EASY RECALL">CELTA LEXICAL GROUPING · ' +
          ru(cfg.groups.length + ' CATEGORIES FOR EASY RECALL', cfg.groups.length + ' КАТЕГОРИИ ДЛЯ ЗАПОМИНАНИЯ') + '</span>' +
        '<div class="cycle-steps" style="margin-top:1rem;">' + groupsHtml + '</div>' +
        '<div style="margin-top:1rem;text-align:center;" class="iast-text"><em>' + iastList + '</em></div>' +
        '<div style="margin-top:0.35rem;text-align:center;font-family:var(--font-deva);font-weight:600;">' + devaList + '</div>' +
      '</div>' +
    '</div></section>' +

    /* -------------------------------------------------------------- PRACTICE */
    '<section id="' + key + '-practice" class="section-alt"><div class="container">' +
      '<div class="section-header" style="margin-bottom:2rem;">' +
        '<div class="stage-eyebrow-row">' +
          '<div class="eyebrow saffron" data-i18n-ru="STAGE 2: PRACTICE · ИГРЫ ДЛЯ ЗАПОМИНАНИЯ" data-i18n-en="STAGE 2: PRACTICE · GAMES FOR MEMORIZATION">STAGE 2: PRACTICE · ' +
            ru('GAMES FOR MEMORIZATION', 'ИГРЫ ДЛЯ ЗАПОМИНАНИЯ') + '</div>' +
          '<button type="button" class="teacher-guide-btn" id="' + key + '-tgb-practice" onclick="SAL.toggleGuide(\'' + key + '\',\'practice\')"' +
            ' data-i18n-ru="👩‍🏫 Инструкция для преподавателя" data-i18n-en="👩‍🏫 Teacher\'s Guide">👩‍🏫 ' + ru('Teacher\'s Guide', 'Инструкция для преподавателя') + '</button>' +
        '</div>' +
        '<h2 class="section-title" data-i18n-ru="Отработка лексики: Flashcards, Fill in the Gaps и другие быстрые игры"' +
          ' data-i18n-en="Controlled Practice: Flashcards, Fill in the Gaps &amp; More Quick Games">' +
          ru('Controlled Practice: Flashcards, Fill in the Gaps &amp; More Quick Games',
             'Отработка лексики: Flashcards, Fill in the Gaps и другие быстрые игры') + '</h2>' +
        '<p class="section-desc" data-i18n-ru="Переключайтесь между классическими играми из практики CELTA — от флэш-карточек и угадывания по картинке до вставки пропущенных слогов и парных карточек."' +
          ' data-i18n-en="Switch freely among classic CELTA classroom games — flashcards, picture quizzes, gap-fills, matching pairs, and category drills.">' +
          ru('Switch freely among classic CELTA classroom games — flashcards, picture quizzes, gap-fills, matching pairs, and category drills.',
             'Переключайтесь между классическими играми из практики CELTA — от флэш-карточек и угадывания по картинке до вставки пропущенных слогов и парных карточек.') + '</p>' +
      '</div>' +

      tgBox(cfg, 'practice',
        '👩‍🏫 Инструкция для преподавателя · Stage 2: Practice (15–20 мин)',
        '👩‍🏫 Teacher\'s Guide · Stage 2: Practice (15–20 min)',
        [
          ['<strong>1. Цель этапа (Controlled Practice &amp; Accuracy):</strong><br/>Автоматизировать распознавание и точное написание всех ' + N + ' слов по принципу <strong>Scaffolding</strong> (от узнавания к воспроизведению по памяти). Ошибки исправляем сразу (<em>On-the-spot correction</em>).',
           '<strong>1. Stage Aim (Controlled Practice &amp; Accuracy):</strong><br/>Build instant recognition and accurate Devanagari spelling of all ' + N + ' words using <strong>Scaffolding</strong> (recognition → active recall). Correct errors <em>on the spot</em>.'],
          ['<strong>2. Волна 1 — Быстрое узнавание (Игры 4, 5, 8, 12 · 5 мин):</strong><br/><strong>4. Picture Quiz</strong>, <strong>5. Read &amp; Match</strong> и <strong>12. आम् / न</strong> в высоком темпе (3–4 сек на ответ), затем <strong>8. Где ошибка?</strong>',
           '<strong>2. Wave 1 — Rapid Recognition (Games 4, 5, 8, 12 · 5 min):</strong><br/>Run <strong>4. Picture Quiz</strong>, <strong>5. Word → Picture</strong> and <strong>12. आम् / न</strong> at a brisk pace (3–4 sec per item), then <strong>8. Spot the Wrong Word</strong>.'],
          ['<strong>3. Волна 2 — Внимание к буквам (Игры 3, 9, 11 · 5 мин):</strong><br/><strong>9. Ошибка в 1 букве</strong> (зоркость к долготе гласных), затем <strong>3. Fill in the Gaps</strong> и <strong>11. Missing Letters</strong>.',
           '<strong>3. Wave 2 — Script Precision (Games 3, 9, 11 · 5 min):</strong><br/><strong>9. Spot the 1-Letter Typo</strong> (sensitivity to vowel length), then <strong>3. Fill in the Gaps</strong> and <strong>11. Missing Letters</strong>.'],
          ['<strong>4. Волна 3 — Память без подсказок (Игры 6, 7, 10 → 1, 2 · 6 мин):</strong><br/><strong>6. Match Pairs</strong>, <strong>7. Мемори</strong>, <strong>10. Категории</strong>, финал — <strong>1. Закрыто квадратом ■</strong> и <strong>2. Flashcards</strong> до результата ' + N + '/' + N + '.',
           '<strong>4. Wave 3 — Unprompted Recall (Games 6, 7, 10 → 1, 2 · 6 min):</strong><br/><strong>6. Match Pairs</strong>, <strong>7. Classic Memory</strong>, <strong>10. Categories</strong>, then finish with <strong>1. Covered Square ■</strong> and <strong>2. Flashcards</strong> up to ' + N + '/' + N + '.']
        ]) +

      '<div class="practice-tabs" role="tablist">' + gameTabs + '</div>' +
      '<div id="' + key + '-practice-arena" class="practice-arena"></div>' +
    '</div></section>' +

    /* ------------------------------------------------------------ PRODUCTION */
    '<section id="' + key + '-production"><div class="container">' +
      '<div class="section-header" style="margin-bottom:2rem;">' +
        '<div class="stage-eyebrow-row">' +
          '<div class="eyebrow gold" data-i18n-ru="STAGE 3: PRODUCTION · СВОБОДНАЯ РЕЧЬ" data-i18n-en="STAGE 3: PRODUCTION · FREER SPEAKING">STAGE 3: PRODUCTION · ' +
            ru('FREER SPEAKING', 'СВОБОДНАЯ РЕЧЬ') + '</div>' +
          '<button type="button" class="teacher-guide-btn" id="' + key + '-tgb-production" onclick="SAL.toggleGuide(\'' + key + '\',\'production\')"' +
            ' data-i18n-ru="👩‍🏫 Инструкция для преподавателя" data-i18n-en="👩‍🏫 Teacher\'s Guide">👩‍🏫 ' + ru('Teacher\'s Guide', 'Инструкция для преподавателя') + '</button>' +
        '</div>' +
        '<h2 class="section-title" data-i18n-ru="Живая речь: покажите у себя и назовите вслух все ' + N + ' слов"' +
          ' data-i18n-en="Freer Production: Point &amp; Name All ' + N + ' Words Aloud">' +
          ru('Freer Production: Point &amp; Name All ' + N + ' Words Aloud', 'Живая речь: покажите у себя и назовите вслух все ' + N + ' слов') + '</h2>' +
        '<p class="section-desc" data-i18n-ru="Финальный этап <strong>PPP</strong>: выберите слово, коснитесь этой части тела у себя и уверенно произнесите чистую основу вслух."' +
          ' data-i18n-en="The final <strong>PPP</strong> stage: pick a word, touch that part of your body, and say the Sanskrit stem aloud.">' +
          ru('The final <strong>PPP</strong> stage: pick a word, touch that part of your body, and say the Sanskrit stem aloud.',
             'Финальный этап <strong>PPP</strong>: выберите слово, коснитесь этой части тела у себя и уверенно произнесите чистую основу вслух.') + '</p>' +
      '</div>' +

      tgBox(cfg, 'production',
        '👩‍🏫 Инструкция для преподавателя · Stage 3: Production (10–15 мин)',
        '👩‍🏫 Teacher\'s Guide · Stage 3: Production (10–15 min)',
        [
          ['<strong>1. Цель этапа (Freer Production &amp; Fluency):</strong><br/>Вывести все ' + N + ' слов в устную речь без опоры на текст. Главный принцип CELTA: <strong>максимум речи учеников (High STT), минимум речи учителя (Low TTT)</strong>.',
           '<strong>1. Stage Aim (Freer Production &amp; Fluency):</strong><br/>Activate all ' + N + ' words in speech without written prompts. Core CELTA principle: <strong>high Student Talking Time, low Teacher Talking Time</strong>.'],
          ['<strong>2. Тренажёр 1 «Спринт» — три режима таймера:</strong><br/><code>✋ Таймер вручную</code> (учитель запускает таймер сам), <code>⚡ Авто-таймер</code> (после оценки карточка и таймер запускаются сами), <code>⏩ Авто-смена картинок</code> (чистый TPR-поток: картинки меняются каждые 4 / 3 / 2 сек без текста и звука). Вид: <code>🖼 отдельная часть тела</code> или <code>🏹 стрелка на схеме</code>.',
           '<strong>2. Trainer 1 "Speed Sprint" — three timer modes:</strong><br/><code>✋ Manual Timer</code> (the teacher starts the countdown), <code>⚡ Auto Timer</code> (the next card and countdown start automatically), <code>⏩ Auto-Advance Pictures</code> (pure TPR flow: pictures change every 4 / 3 / 2 s with no text and no sound). View: <code>🖼 isolated body part</code> or <code>🏹 arrow on the diagram</code>.'],
          ['<strong>3. Активность А — «Живое зеркало» в парах (4 мин):</strong><br/>Ученик А молча указывает на часть тела, ученик Б мгновенно называет её на санскрите. Через ' + Math.ceil(N / 2) + ' слов меняются ролями.',
           '<strong>2. Activity A — Living Mirror in Pairs (4 min):</strong><br/>Partner A silently points to a body part, Partner B names it in Sanskrit at once. Swap roles after ' + Math.ceil(N / 2) + ' words.'],
          ['<strong>4. Активность Б — «Ловушка ведущего» (Simon Says, 4 мин):</strong><br/>Ведущий называет одно слово, но касается другой части тела. Ученики слушают ушами, касаются правильного и хором повторяют слово.',
           '<strong>3. Activity B — Listen, Don\'t Copy (Simon Says, 4 min):</strong><br/>The leader says one word while touching a different body part. Learners must listen, touch the right part, and repeat the word in chorus.'],
          ['<strong>5. Активность В — Индивидуальный зачёт ' + N + '/' + N + ' (4 мин):</strong><br/>Каждый ученик проходит тренажёр ниже до результата <code>' + N + ' из ' + N + '</code>. Не перебивайте — разберите ошибки в конце (<em>Delayed Error Correction</em>).',
           '<strong>4. Activity C — Individual ' + N + '/' + N + ' Check (4 min):</strong><br/>Every learner completes the trainer below up to <code>' + N + ' out of ' + N + '</code>. Do not interrupt — give <em>delayed error correction</em> at the end.']
        ]) +

      '<div class="practice-tabs" role="tablist">' + prodTabs + '</div>' +
      '<div id="' + key + '-production-stage" class="practice-arena"></div>' +
    '</div></section>';
  }

  /* =========================================================================
     PRESENTATION
     ========================================================================= */
  function cardHtml(cfg, st, w, large) {
    var rev = !!st.pres.revealed[w.id];
    var word = st.pres.maskMode ? maskedMarkup(w, rev, large ? '2.1rem' : '1.6rem') : devaLabel(w, large ? '2.1rem' : '');
    return '<div class="vocab-item-card" style="' + (large ? 'padding:1.65rem 1.25rem;' : '') +
      '" onclick="SAL.do(\'' + cfg.key + '\',\'posterClick\',\'' + w.id + '\')">' +
      '<button type="button" class="vocab-audio-btn" title="🔊" onclick="event.stopPropagation(); SAL.speak(\'' + w.ttsText + '\')">🔊</button>' +
      '<div class="vocab-svg-box"' + (large ? ' style="width:118px;height:118px;"' : '') + '>' + w.svg + '</div>' +
      word +
      '<div class="vocab-iast"' + (large ? ' style="font-size:0.98rem;"' : '') + '>' + w.iast + '</div>' +
      '</div>';
  }

  function posterHtml(cfg, st) {
    return cfg.words.map(function (w) { return cardHtml(cfg, st, w, false); }).join('');
  }

  function stepHtml(cfg, st) {
    var steps = cfg.steps;
    var idx = Math.min(st.pres.step, steps.length - 1);
    var s = steps[idx];
    var words = s.wordIds.map(function (id) { return byId(cfg, id); });
    var tabs = steps.map(function (ss, i) {
      var sub = ss.wordIds.map(function (id) { return byId(cfg, id).deva; }).join(' · ');
      return '<button type="button" class="chip-btn' + (i === idx ? ' active' : '') +
        '" onclick="SAL.do(\'' + cfg.key + '\',\'setStep\',\'' + i + '\')">' + (i + 1) + '. ' + sub + '</button>';
    }).join('');
    var tts = words.map(function (w) { return w.ttsText; }).join(' ');
    return '<div style="background:var(--bg-card);border:1.5px solid var(--border-strong);border-radius:18px;padding:1.5rem;margin-bottom:2rem;box-shadow:var(--shadow-sm);">' +
      '<div class="game-top-bar"><div>' + pill(ru('Step', 'Шаг') + ' ' + (idx + 1) + ' / ' + steps.length) + '</div>' +
      '<div><button type="button" class="chip-btn" onclick="SAL.speak(\'' + tts + '\')">🔊 ' + ru('Listen to Both', 'Прослушать оба слова') + '</button></div></div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px,1fr));gap:1.5rem;justify-items:center;margin:1.25rem 0;">' +
      words.map(function (w) { return cardHtml(cfg, st, w, true); }).join('') + '</div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;flex-wrap:wrap;">' +
      chip(cfg, 'setStep', String(Math.max(0, idx - 1)), '← ' + ru('Previous', 'Предыдущие'), idx === 0) +
      '<div style="display:flex;gap:0.4rem;flex-wrap:wrap;">' + tabs + '</div>' +
      chip(cfg, 'setStep', String(Math.min(steps.length - 1, idx + 1)), ru('Next', 'Следующие') + ' →', idx === steps.length - 1) +
      '</div></div>';
  }

  function hotspotsHtml(cfg, st) {
    var figs = cfg.hotspots.figures;
    var active = st.pres.hotspotId;
    var activeFig = null;
    figs.forEach(function (f) {
      f.pins.forEach(function (p) { if (p.id === active) activeFig = f; });
    });
    if (!activeFig) activeFig = figs[0];
    var activePin = activeFig.pins.filter(function (p) { return p.id === active; })[0] || activeFig.pins[0];
    var w = byId(cfg, active);

    function pinsHtml(fig) {
      return fig.pins.map(function (p) {
        var cur = p.id === active;
        var fill = cur ? '#DC2626' : '#0F766E';
        var r = cur ? 13.5 : 11;
        var stroke = cur ? '#FEF08A' : '#FFFFFF';
        var line = cur ? '#DC2626' : '#0F766E';
        return '<g style="cursor:pointer;" onclick="SAL.do(\'' + cfg.key + '\',\'hotspot\',\'' + p.id + '\')">' +
          '<line x1="' + p.x + '" y1="' + p.y + '" x2="' + p.tx + '" y2="' + p.ty + '" stroke="' + line +
            '" stroke-width="' + (cur ? '2.4' : '1.6') + '" stroke-dasharray="' + (cur ? 'none' : '3,2') + '"/>' +
          '<circle cx="' + p.tx + '" cy="' + p.ty + '" r="' + (cur ? '4.2' : '3') + '" fill="' + line + '" stroke="#FFFFFF" stroke-width="1.2"/>' +
          (cur ? '<circle cx="' + p.x + '" cy="' + p.y + '" r="19" fill="rgba(220,38,38,0.2)"/>' : '') +
          '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + r + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2.2"/>' +
          '<text x="' + p.x + '" y="' + (p.y + 3.8) + '" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="700"' +
            ' font-family="Plus Jakarta Sans, sans-serif">' + p.num + '</text>' +
          '<title>' + byId(cfg, p.id).deva + '</title></g>';
      }).join('');
    }

    var figsHtml = figs.map(function (f) {
      return '<div style="background:var(--bg-primary);border:1.5px solid ' +
        (activeFig.key === f.key ? 'var(--accent-cambridge)' : 'var(--border-color)') +
        ';border-radius:16px;padding:0.75rem;text-align:center;">' +
        '<div style="font-size:0.82rem;font-weight:700;color:var(--accent-cambridge);margin-bottom:0.4rem;"' +
        ' data-i18n-ru="' + f.captionRu + '" data-i18n-en="' + f.captionEn + '">' + tx({ ru: f.captionRu, en: f.captionEn }) + '</div>' +
        '<svg viewBox="' + f.viewBox + '" style="width:100%;max-width:310px;height:auto;display:block;margin:0 auto;" fill="none"' +
        ' xmlns="http://www.w3.org/2000/svg">' + f.art + pinsHtml(f) + '</svg></div>';
    }).join('');

    var allPins = [];
    figs.forEach(function (f) { f.pins.forEach(function (p) { allPins.push(p); }); });
    allPins.sort(function (a, b) { return a.num - b.num; });
    var chipsHtml = allPins.map(function (p) {
      var item = byId(cfg, p.id);
      return '<button type="button" class="chip-btn' + (p.id === active ? ' active' : '') +
        '" onclick="SAL.do(\'' + cfg.key + '\',\'hotspot\',\'' + p.id + '\')">' + p.num + '. ' + item.deva + iastSpan(item.iast) + '</button>';
    }).join('');

    var wordHtml = st.pres.maskMode ? maskedMarkup(w, !!st.pres.revealed[w.id], '2.25rem') : devaLabel(w, '2.25rem');

    return '<div style="background:var(--bg-card);border:1.5px solid var(--border-strong);border-radius:18px;padding:1.5rem;margin-bottom:2rem;box-shadow:var(--shadow-sm);">' +
      '<div style="margin-bottom:1rem;font-size:0.92rem;font-weight:600;color:var(--text-secondary);" data-i18n-ru="Нажимайте на точки на рисунке или на кнопки справа:"' +
      ' data-i18n-en="Click the markers on the diagram or the buttons on the right:">' +
      ru('Click the markers on the diagram or the buttons on the right:', 'Нажимайте на точки на рисунке или на кнопки справа:') + '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(255px,1fr));gap:1.15rem;align-items:stretch;">' +
      figsHtml +
      '<div style="display:flex;flex-direction:column;justify-content:space-between;">' +
        '<div class="vocab-item-card" onclick="SAL.do(\'' + cfg.key + '\',\'posterClick\',\'' + w.id + '\')" style="padding:1.35rem 1rem;margin-bottom:0.85rem;">' +
        '<span class="game-score-pill" style="position:absolute;top:0.65rem;left:0.65rem;">#' + activePin.num + ' / ' + allPins.length + '</span>' +
        '<button type="button" class="vocab-audio-btn" title="🔊" onclick="event.stopPropagation(); SAL.speak(\'' + w.ttsText + '\')">🔊</button>' +
        '<div class="vocab-svg-box" style="width:112px;height:112px;margin-bottom:0.5rem;">' + w.svg + '</div>' +
        wordHtml + '<div class="vocab-iast" style="font-size:1rem;">' + w.iast + '</div>' +
        '<div style="display:flex;justify-content:center;gap:0.6rem;margin-top:0.75rem;" onclick="event.stopPropagation();">' +
        chip(cfg, 'hotspotStep', '-1', '←') +
        '<button type="button" class="chip-btn active" onclick="SAL.speak(\'' + w.ttsText + '\')">🔊</button>' +
        chip(cfg, 'hotspotStep', '1', '→') +
        '</div></div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:0.4rem;">' + chipsHtml + '</div>' +
      '</div></div></div>';
  }

  function audioFirstHtml(cfg, st) {
    var cards = cfg.words.map(function (w) {
      var heard = !!st.pres.heard[w.id];
      var revealed = !!st.pres.audioRevealed[w.id];
      var listen = ru('🔊 1. Listen', '🔊 1. Послушать');
      var show = ru('👁 2. Show Word', '👁 2. Показать слово');
      return '<div class="vocab-item-card" onclick="SAL.do(\'' + cfg.key + '\',\'audioClick\',\'' + w.id + '\')">' +
        '<button type="button" class="vocab-audio-btn" title="🔊" onclick="event.stopPropagation(); SAL.speak(\'' + w.ttsText +
          '\'); SAL.do(\'' + cfg.key + '\',\'audioHear\',\'' + w.id + '\')">🔊</button>' +
        '<div class="vocab-svg-box">' + w.svg + '</div>' +
        (revealed
          ? '<div class="vocab-deva" style="color:#15803d;">' + w.deva + '</div><div class="vocab-iast">' + w.iast + '</div>'
          : '<div style="margin-top:0.35rem;"><span class="chip-btn' + (heard ? ' active' : '') +
            '" style="font-size:0.8rem;padding:0.3rem 0.65rem;">' + (heard ? show : listen) + '</span></div>') +
        '</div>';
    }).join('');
    return '<div style="margin-bottom:2rem;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;background:var(--bg-card);' +
      'border:1px solid var(--border-strong);border-radius:12px;padding:0.9rem 1.15rem;margin-bottom:1.15rem;">' +
      '<span style="font-size:0.9rem;font-weight:600;color:var(--text-secondary);" data-i18n-ru="Правило CELTA «Сначала ухо — потом глаз»: нажмите на карточку, чтобы услышать и повторить слово, вторым нажатием откройте буквы."' +
      ' data-i18n-en="CELTA Audio-First Rule: click a card once to hear & repeat the word, then click again to reveal the written form.">' +
      ru('CELTA Audio-First Rule: click a card once to hear & repeat the word, then click again to reveal the written form.',
         'Правило CELTA «Сначала ухо — потом глаз»: нажмите на карточку, чтобы услышать и повторить слово, вторым нажатием откройте буквы.') + '</span>' +
      '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;">' +
      chip(cfg, 'revealAll', '', '👁 ' + ru('Reveal All Letters', 'Открыть все буквы')) +
      chip(cfg, 'resetAudio', '', '↺ ' + ru('Hide All Letters', 'Снова скрыть буквы')) +
      '</div></div>' +
      '<div class="vocab-grid-6" style="margin-bottom:0;">' + cards + '</div></div>';
  }

  function renderPres(cfg) {
    var st = state(cfg);
    var pane = document.getElementById('view-lesson' + cfg.num);
    if (pane) {
      pane.querySelectorAll('.practice-tab-btn[data-pres-mode]').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-pres-mode') === st.pres.mode);
      });
    }
    var grid = document.getElementById(cfg.key + '-pres-grid');
    if (!grid) return;
    if (st.pres.mode === 'stepbystep') {
      grid.className = ''; grid.innerHTML = stepHtml(cfg, st);
    } else if (st.pres.mode === 'hotspots') {
      grid.className = ''; grid.innerHTML = hotspotsHtml(cfg, st);
    } else if (st.pres.mode === 'audiofirst') {
      grid.className = ''; grid.innerHTML = audioFirstHtml(cfg, st);
    } else {
      grid.className = 'vocab-grid-6' + (st.pres.labelsHidden ? ' labels-hidden' : '');
      grid.innerHTML = posterHtml(cfg, st);
    }
    var maskBtn = document.getElementById(cfg.key + '-mask-btn');
    if (maskBtn) {
      maskBtn.innerHTML = st.pres.maskMode
        ? '🟪 ' + ru('Show Full Words', 'Показать слова целиком')
        : '🟪 ' + ru('Cover Part of Word ■', 'Закрыть часть слова ■');
      maskBtn.classList.toggle('active', st.pres.maskMode);
    }
    var labBtn = document.getElementById(cfg.key + '-labels-btn');
    if (labBtn) {
      labBtn.innerHTML = st.pres.labelsHidden ? '👁 ' + ru('Show Labels', 'Показать подписи') : '🙈 ' + ru('Hide Labels', 'Скрыть подписи');
      labBtn.classList.toggle('active', st.pres.labelsHidden);
    }
  }

  /* =========================================================================
     PRACTICE GAMES
     ========================================================================= */
  var GAME_INIT = {
    masked: function () { return { i: 0, score: 0, answered: false, picked: null, view: 'card', revealed: {} }; },
    flashcards: function () { return { i: 0, flipped: false, score: 0, finished: false }; },
    gaps: function () { return { i: 0, score: 0, answered: false, picked: null, finished: false }; },
    picquiz: function () { return { i: 0, score: 0, answered: false, picked: null, finished: false }; },
    wordquiz: function () { return { i: 0, score: 0, answered: false, picked: null, options: null, finished: false }; },
    match: function (cfg) { return { stage: 0, sel: null, matched: {}, wrong: null, score: 0, done: false, tiles: null }; },
    memory: function (cfg) { return { cards: null, flipped: [], matched: {}, wrong: null, lock: false, moves: 0, score: 0, size: cfg.words.length }; },
    wronglabel: function (cfg) { return { i: 0, score: 0, answered: false, picked: null, firstTry: true, redIdx: null, round: null, finished: false }; },
    typo: function (cfg) { return { i: 0, score: 0, answered: false, picked: null, firstTry: true, redIdx: null, round: null, finished: false }; },
    categories: function () { return { i: 0, score: 0, sel: {}, checked: false, finished: false }; },
    spelling: function () { return { i: 0, score: 0, answered: false, picked: null, finished: false }; },
    truefalse: function (cfg) { return { i: 0, score: 0, answered: false, picked: null, isTrue: true, otherId: null, finished: false }; }
  };

  function wordBtn(cfg, w, action, value, cls) {
    return optBtn(cfg, action, value, w.deva + iastSpan(w.iast), cls);
  }
  function optGrid(items) {
    return '<div class="quiz-options-grid">' + items + '</div>';
  }
  function svgBox(w, size) {
    return '<div class="vocab-svg-box" style="width:' + (size || 150) + 'px;height:' + (size || 150) + 'px;">' + w.svg + '</div>';
  }
  function centerCard(inner) {
    return '<div style="background:var(--bg-card);border:1.5px solid var(--border-strong);border-radius:18px;padding:1.5rem;' +
      'margin-bottom:1.25rem;box-shadow:var(--shadow-sm);text-align:center;">' + inner + '</div>';
  }
  function nextRow(cfg, action, extra) {
    return '<div style="display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;margin-top:0.5rem;">' +
      (extra || '') +
      '<button type="button" class="btn btn-primary" style="padding:0.5rem 1.2rem;font-size:0.9rem;" onclick="SAL.do(\'' + cfg.key +
      '\',\'' + action + '\')">' + ru('Next →', 'Далее →') + '</button></div>';
  }
  function restartRow(cfg, game) {
    return '<div style="display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;margin-top:0.75rem;">' +
      chip(cfg, 'restart', game, '↺ ' + ru('Start Over', 'Начать сначала')) + '</div>';
  }

  /* 1. Covered Square ■ --------------------------------------------------- */
  function renderMasked(cfg, st) {
    var g = gst(cfg, 'masked');
    var N = cfg.words.length;
    if (g.view === 'grid') {
      if (Object.keys(g.revealed).length >= N) {
        return finalScreen(cfg, 'masked', ru('1. Covered Square ■ (All Revealed)', '1. Закрыто квадратом ■ (все открыты)'), N, N);
      }
      var cards = cfg.words.map(function (w) {
        var rev = !!g.revealed[w.id];
        return '<div class="vocab-item-card" onclick="SAL.do(\'' + cfg.key + '\',\'maskedReveal\',\'' + w.id + '\')">' +
          maskedMarkup(w, rev, '1.6rem') +
          '<div class="vocab-iast">' + w.iast + '</div>' +
          '<div style="margin-top:0.5rem;">' + svgBox(w, 92) + '</div></div>';
      }).join('');
      return topBar(pill(ru('Covered Square ■', 'Закрыто квадратом ■') + ' · ' + Object.keys(g.revealed).length + '/' + N),
        chip(cfg, 'maskedView', 'card', '1 / ' + N, false) + chip(cfg, 'restart', 'masked', '↺')) +
        '<div class="vocab-grid-6" style="margin-top:1rem;">' + cards + '</div>';
    }
    if (g.i >= N) {
      return finalScreen(cfg, 'masked', ru('Covered Square ■ — done!', 'Закрыто квадратом ■ — пройдено!'), g.score, N);
    }
    var w = cfg.words[g.i];
    var opts = shuffle([w].concat(others(cfg, w.id, 3)));
    var btns = opts.map(function (o) {
      var cls = '';
      if (g.answered) {
        if (o.id === w.id) cls = 'correct';
        else if (o.id === g.picked) cls = 'wrong';
      }
      return wordBtn(cfg, o, 'maskedPick', o.id, cls);
    }).join('');
    return topBar(pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'maskedView', 'grid', N + ' / ' + N + ' ■', false) + chip(cfg, 'restart', 'masked', '↺')) +
      centerCard(
        '<div style="margin-bottom:0.75rem;">' + svgBox(w, 130) + '</div>' +
        maskedMarkup(w, g.answered && g.picked === w.id, '2.4rem') +
        '<div class="iast-text" style="margin-bottom:0.85rem;">' + (g.answered ? w.iast : '&nbsp;') + '</div>' +
        optGrid(btns) +
        (g.answered
          ? nextRow(cfg, 'maskedNext', '<button type="button" class="chip-btn" onclick="SAL.speak(\'' + w.ttsText + '\')">🔊 ' + ru('Listen', 'Прослушать') + '</button>')
          : '<div style="margin-top:0.85rem;">' + chip(cfg, 'speak', w.ttsText, '🔊 ' + ru('Listen', 'Послушать')) + '</div>')
      );
  }

  /* 2. Flashcards --------------------------------------------------------- */
  function renderFlashcards(cfg, st) {
    var g = gst(cfg, 'flashcards');
    var N = cfg.words.length;
    if (g.finished || g.i >= N) {
      return finalScreen(cfg, 'flashcards', ru('Flashcards — done!', 'Flashcards — пройдено!'), g.score, N);
    }
    var w = cfg.words[g.i];
    return topBar(pill(ru('Card', 'Карточка') + ' ' + (g.i + 1) + '/' + N) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'restart', 'flashcards', '↺')) +
      centerCard(
        '<div class="flashcard-box" onclick="SAL.do(\'' + cfg.key + '\',\'fcFlip\')" style="cursor:pointer;">' +
        (g.flipped
          ? '<div style="font-family:var(--font-deva);font-size:2.6rem;font-weight:700;color:var(--text-primary);">' + w.deva + '</div>' +
            '<div class="vocab-iast" style="font-size:1.05rem;">' + w.iast + '</div>'
          : svgBox(w, 150)) +
        '</div>' +
        '<div style="display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;margin-top:1rem;">' +
        '<button type="button" class="chip-btn" onclick="SAL.speak(\'' + w.ttsText + '\')">🔊 ' + ru('Listen', 'Послушать') + '</button>' +
        '<button type="button" class="chip-btn" onclick="SAL.do(\'' + cfg.key + '\',\'fcFlip\')">' +
        (g.flipped ? ru('🙈 Hide', '🙈 Скрыть') : ru('👁 Reveal', '👁 Показать')) + '</button>' +
        '</div>' +
        '<div style="display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;margin-top:0.85rem;">' +
        '<button type="button" class="quiz-opt-btn correct" style="max-width:220px;" onclick="SAL.do(\'' + cfg.key + '\',\'fcAnswer\',\'1\')">✓ ' + ru('I knew it', 'Знаю') + '</button>' +
        '<button type="button" class="quiz-opt-btn wrong" style="max-width:220px;" onclick="SAL.do(\'' + cfg.key + '\',\'fcAnswer\',\'0\')">✗ ' + ru('Repeat again', 'Повторить') + '</button>' +
        '</div>'
      );
  }

  /* 3. Fill in the Gaps --------------------------------------------------- */
  function renderGaps(cfg, st) {
    var g = gst(cfg, 'gaps');
    var N = cfg.words.length;
    if (g.finished || g.i >= N) return finalScreen(cfg, 'gaps', ru('Fill in the Gaps — done!', 'Fill in the Gaps — пройдено!'), g.score, N);
    var w = cfg.words[g.i];
    var btns = w.gapChoices.map(function (c) {
      var cls = '';
      if (g.answered) {
        if (c.deva === w.gapAnswer) cls = 'correct';
        else if (c.deva === g.picked) cls = 'wrong';
      }
      return optBtn(cfg, 'gapPick', c.deva, c.deva + iastSpan(c.iast), cls);
    }).join('');
    return topBar(pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'restart', 'gaps', '↺')) +
      centerCard(
        '<div style="margin-bottom:0.5rem;">' + svgBox(w, 120) + '</div>' +
        '<div style="font-family:var(--font-deva);font-size:2.6rem;font-weight:700;letter-spacing:0.05em;">' + w.gapDeva + '</div>' +
        '<div class="iast-text" style="margin-bottom:1rem;">' + w.gapIast + '</div>' +
        optGrid(btns) +
        (g.answered
          ? '<div style="margin-top:0.9rem;font-family:var(--font-deva);font-size:1.6rem;font-weight:600;color:#15803d;">' + w.deva + '</div>' +
            nextRow(cfg, 'gapsNext', '<button type="button" class="chip-btn" onclick="SAL.speak(\'' + w.ttsText + '\')">🔊 ' + ru('Listen', 'Прослушать') + '</button>')
          : '<div style="margin-top:0.85rem;">' + chip(cfg, 'speak', w.ttsText, '🔊 ' + ru('Listen', 'Послушать')) + '</div>')
      );
  }

  /* 4. Picture Quiz ------------------------------------------------------- */
  function renderPicQuiz(cfg, st) {
    var g = gst(cfg, 'picquiz');
    var N = cfg.words.length;
    if (g.finished || g.i >= N) return finalScreen(cfg, 'picquiz', ru('Picture Quiz — done!', 'Picture Quiz — пройдено!'), g.score, N);
    var w = cfg.words[g.i];
    var opts = shuffle([w].concat(others(cfg, w.id, 3)));
    var btns = opts.map(function (o) {
      var cls = '';
      if (g.answered) {
        if (o.id === w.id) cls = 'correct';
        else if (o.id === g.picked) cls = 'wrong';
      }
      return wordBtn(cfg, o, 'quizPick', o.id, cls);
    }).join('');
    return topBar(pill(ru('Picture', 'Картинка') + ' ' + (g.i + 1) + '/' + N) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'restart', 'picquiz', '↺')) +
      centerCard(
        '<div style="margin-bottom:1rem;">' + svgBox(w, 170) + '</div>' +
        '<div style="font-size:0.9rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.75rem;">' +
        ru('Which word is it?', 'Какое это слово?') + '</div>' +
        optGrid(btns) +
        (g.answered ? nextRow(cfg, 'picquizNext', '<button type="button" class="chip-btn" onclick="SAL.speak(\'' + w.ttsText + '\')">🔊 ' + ru('Listen', 'Прослушать') + '</button>') : '')
      );
  }

  /* 5. Word → Picture ----------------------------------------------------- */
  function renderWordQuiz(cfg, st) {
    var g = gst(cfg, 'wordquiz');
    var N = cfg.words.length;
    if (g.finished || g.i >= N) return finalScreen(cfg, 'wordquiz', ru('Read & Match — done!', 'Read & Match — пройдено!'), g.score, N);
    var w = cfg.words[g.i];
    if (!g.options) g.options = shuffle([w.id].concat(others(cfg, w.id, 3).map(function (o) { return o.id; })));
    var btns = g.options.map(function (id) {
      var o = byId(cfg, id);
      var cls = '';
      if (g.answered) {
        if (id === w.id) cls = 'correct';
        else if (id === g.picked) cls = 'wrong';
      }
      return optBtn(cfg, 'quizPick', id, '<div style="display:flex;flex-direction:column;align-items:center;gap:0.35rem;">' +
        svgBox(o, 92) + '</div>', cls);
    }).join('');
    return topBar(pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'restart', 'wordquiz', '↺')) +
      centerCard(
        '<div style="font-family:var(--font-deva);font-size:2.6rem;font-weight:700;">' + w.deva + '</div>' +
        '<div class="iast-text" style="margin-bottom:0.9rem;">' + w.iast + '</div>' +
        '<div style="font-size:0.9rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.75rem;">' +
        ru('Find the picture', 'Найдите картинку') + '</div>' +
        optGrid(btns) +
        (g.answered ? nextRow(cfg, 'wordquizNext', '<button type="button" class="chip-btn" onclick="SAL.speak(\'' + w.ttsText + '\')">🔊 ' + ru('Listen', 'Прослушать') + '</button>') : '')
      );
  }

  /* 6. Match Pairs -------------------------------------------------------- */
  function matchChunks(cfg) {
    var chunks = [], i;
    for (i = 0; i < cfg.words.length; i += 4) chunks.push(cfg.words.slice(i, i + 4));
    return chunks;
  }
  function renderMatch(cfg, st) {
    var g = gst(cfg, 'match');
    var chunks = matchChunks(cfg);
    if (g.done || g.stage >= chunks.length) {
      return finalScreen(cfg, 'match', ru('Match Pairs — done!', 'Match Pairs — пройдено!'), g.score, cfg.words.length);
    }
    var words = chunks[g.stage];
    if (!g.tiles) {
      var pics = shuffle(words.map(function (w) { return { kind: 'pic', id: w.id }; }));
      var wrds = shuffle(words.map(function (w) { return { kind: 'word', id: w.id }; }));
      g.tiles = [];
      for (var i = 0; i < Math.max(pics.length, wrds.length); i++) {
        if (pics[i]) g.tiles.push(pics[i]);
        if (wrds[i]) g.tiles.push(wrds[i]);
      }
    }
    var tilesHtml = g.tiles.map(function (t, idx) {
      var w = byId(cfg, t.id);
      var cls = '';
      if (g.matched[t.id]) cls = 'matched';
      if (g.sel === idx) cls += ' selected';
      var inner = t.kind === 'pic' ? svgBox(w, 74) :
        '<div style="font-family:var(--font-deva);font-size:1.35rem;font-weight:700;">' + w.deva + '</div>' +
        '<div class="iast-text">' + w.iast + '</div>';
      return '<button type="button" class="match-tile ' + cls + '" onclick="SAL.do(\'' + cfg.key + '\',\'tile\',\'' + idx + '\')">' +
        inner + '</button>';
    }).join('');
    var matchedCount = Object.keys(g.matched).length;
    var stageDone = words.every(function (w) { return g.matched[w.id]; });
    return topBar(pill(ru('Stage', 'Этап') + ' ' + (g.stage + 1) + '/' + chunks.length) + ' ' +
      pill(ru('Matched', 'Пары') + ': ' + matchedCount + '/' + cfg.words.length) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'restart', 'match', '↺')) +
      centerCard(
        '<div style="font-size:0.9rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.9rem;">' +
        ru('Tap a picture, then its word', 'Нажмите картинку, затем её слово') + '</div>' +
        '<div class="match-grid">' + tilesHtml + '</div>' +
        (stageDone
          ? '<div style="margin-top:1rem;">' +
            '<button type="button" class="btn btn-primary" style="padding:0.5rem 1.2rem;font-size:0.9rem;" onclick="SAL.do(\'' + cfg.key + '\',\'matchNext\')">' +
            (g.stage + 1 < chunks.length ? ru('Next stage →', 'Следующий этап →') : ru('Finish ✓', 'Завершить ✓')) + '</button></div>'
          : '')
      );
  }

  /* 7. Classic Memory ----------------------------------------------------- */
  function renderMemory(cfg, st) {
    var g = gst(cfg, 'memory');
    var N = cfg.words.length;
    if (!g.cards) {
      var pairs = shuffle(cfg.words).slice(0, g.size);
      var cards = [];
      pairs.forEach(function (w) {
        cards.push({ id: w.id, kind: 'pic' });
        cards.push({ id: w.id, kind: 'word' });
      });
      g.cards = shuffle(cards);
    }
    var matchedPairs = Object.keys(g.matched).length;
    if (matchedPairs >= g.size) {
      return finalScreen(cfg, 'memory', ru('Memory — done!', 'Мемори — пройдено!'), g.score, g.size,
        ru('Moves', 'Ходов') + ': ' + g.moves);
    }
    var html = g.cards.map(function (c, idx) {
      var w = byId(cfg, c.id);
      var flipped = g.flipped.indexOf(idx) >= 0 || g.matched[c.id];
      var cls = '';
      if (g.matched[c.id]) cls += ' matched';
      cls += flipped ? ' flipped' : ' face-down';
      if (g.wrong && g.wrong.indexOf(idx) >= 0) cls += ' mismatch';
      var inner = c.kind === 'pic' ? svgBox(w, 62) :
        '<div style="font-family:var(--font-deva);font-size:1.15rem;font-weight:700;">' + w.deva + '</div>';
      return '<button type="button" class="memory-card ' + cls + '" onclick="SAL.do(\'' + cfg.key + '\',\'tile\',\'' + idx + '\')">' +
        (flipped ? inner : '<span class="memory-card-back-emblem">🕉</span>') + '</button>';
    }).join('');
    return topBar(pill(ru('Pairs', 'Пары') + ': ' + matchedPairs + '/' + g.size) + ' ' + pill(ru('Moves', 'Ходов') + ': ' + g.moves) +
      ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'memorySize', String(cfg.words.length), cfg.words.length + ' × 2 (' + cfg.words.length * 2 + ')', g.size >= cfg.words.length) +
      chip(cfg, 'memorySize', String(Math.max(3, Math.ceil(cfg.words.length / 2))),
        Math.max(3, Math.ceil(cfg.words.length / 2)) + ' × 2 (' + Math.max(3, Math.ceil(cfg.words.length / 2)) * 2 + ')', g.size < cfg.words.length) +
      chip(cfg, 'restart', 'memory', '↺')) +
      centerCard('<div class="memory-grid">' + html + '</div>');
  }

  /* Explain the exact mistake (Lesson 1 shows the correction on the card itself) */
  function diffSegments(wrongStr, rightStr) {
    var a = Array.from(wrongStr), b = Array.from(rightStr);
    var i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    var j = 0;
    while (j < a.length - i && j < b.length - i && a[a.length - 1 - j] === b[b.length - 1 - j]) j++;
    return {
      from: a.slice(i, a.length - j).join(''),
      to: b.slice(i, b.length - j).join('')
    };
  }
  function mistakeKind(seg) {
    if (/[ािीुूृेैोौ]/.test(seg)) return { ru: 'ошибка в гласной (долгота или качество звука)', en: 'a vowel mistake (length or quality)' };
    if (/[टठडढणष]/.test(seg)) return { ru: 'ошибка в согласной (ретрофлексный звук)', en: 'a consonant mistake (retroflex sound)' };
    if (/[कखगघचछजझतथदधपफबभयरलवशसह]/.test(seg)) return { ru: 'ошибка в согласной', en: 'a consonant mistake' };
    return { ru: 'ошибка в одной букве', en: 'a one-letter mistake' };
  }

  /* 8. Spot the Wrong Word (3 pictures) ----------------------------------- */
  function prepareWrongLabel(cfg) {
    var trio = shuffle(cfg.words).slice(0, 3);
    var wrongIdx = Math.floor(Math.random() * 3);
    var pool = cfg.words.filter(function (w) { return trio.indexOf(w) < 0; });
    var wrongWord = pool.length ? shuffle(pool)[0] : shuffle(trio.filter(function (w, i) { return i !== wrongIdx; }))[0];
    return {
      cards: trio.map(function (w, i) {
        return { wordId: w.id, labelId: i === wrongIdx ? wrongWord.id : w.id };
      }),
      wrongIdx: wrongIdx
    };
  }
  function renderWrongLabel(cfg, st) {
    var g = gst(cfg, 'wronglabel');
    var N = cfg.words.length;
    var title = ru('8. 3 🖼 → 1 ✕ — Spot the Wrong Word', '8. Где ошибка? (3 картинки)');
    if (g.finished || g.i >= N) return finalScreen(cfg, 'wronglabel', title, g.score, N);
    if (!g.round) g.round = prepareWrongLabel(cfg);

    var good = byId(cfg, g.round.cards[g.round.wrongIdx].wordId);
    var bad = byId(cfg, g.round.cards[g.round.wrongIdx].labelId);

    var cards = g.round.cards.map(function (c, idx) {
      var w = byId(cfg, c.wordId);
      var label = byId(cfg, c.labelId);
      var isTarget = idx === g.round.wrongIdx;
      var showCorrection = g.answered && isTarget;
      var cls = '';
      if (g.answered && isTarget) cls = 'correct';
      if (!g.answered && g.redIdx === idx) cls = 'wrong';
      return '<button type="button" class="quiz-opt-btn ' + cls + '" onclick="SAL.do(\'' + cfg.key + '\',\'pick3\',\'' + idx + '\')"' +
        ' style="display:flex;flex-direction:column;align-items:center;padding:1.25rem 0.85rem;">' +
        '<div class="vocab-svg-box" style="margin:0 auto 0.75rem;width:110px;height:110px;">' + w.svg + '</div>' +
        (showCorrection
          ? '<div style="font-family:var(--font-deva);font-size:1.3rem;color:#dc2626;text-decoration:line-through;opacity:0.8;">' + label.deva + '</div>' +
            '<div style="font-family:var(--font-deva);font-size:1.85rem;font-weight:700;color:#15803d;">✓ ' + w.deva + '</div>' +
            '<div class="vocab-iast" style="font-size:0.85rem;color:#15803d;">' + w.iast + '</div>'
          : '<div style="font-family:var(--font-deva);font-size:1.75rem;font-weight:700;color:var(--text-primary);">' + label.deva + '</div>' +
            '<div class="vocab-iast" style="font-size:0.85rem;color:var(--accent-saffron);">' + label.iast + '</div>') +
        '</button>';
    }).join('');

    var explain = '';
    if (g.answered) {
      explain = '<div style="margin-top:1.15rem;background:#f0fdf4;border:1.5px solid #16a34a;border-radius:12px;padding:0.9rem 1.15rem;text-align:center;">' +
        '<div style="font-size:0.98rem;line-height:1.6;">' +
        (L() === 'ru'
          ? 'Ошибка была под картинкой <strong style="font-family:var(--font-deva);font-size:1.2rem;">' + good.deva + '</strong> (' + good.iast + '): там стояла подпись ' +
            '<span style="font-family:var(--font-deva);font-size:1.15rem;color:#dc2626;text-decoration:line-through;">' + bad.deva + '</span> (' + bad.iast + ').'
          : 'The wrong label was under the picture <strong style="font-family:var(--font-deva);font-size:1.2rem;">' + good.deva + '</strong> (' + good.iast + '): it read ' +
            '<span style="font-family:var(--font-deva);font-size:1.15rem;color:#dc2626;text-decoration:line-through;">' + bad.deva + '</span> (' + bad.iast + ').') +
        '</div>' +
        (!g.firstTry
          ? '<div style="margin-top:0.4rem;font-size:0.88rem;color:#b45309;font-weight:700;">' +
            ru('Found on the 2nd try — the point is only awarded for the first try.',
               'Нашли со второй попытки — очко начисляется только за первую.') + '</div>'
          : '') +
        '<div style="margin-top:0.75rem;display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;">' +
        chip(cfg, 'speak', good.ttsText, '🔊 ' + ru('Listen', 'Послушать')) +
        chip(cfg, 'wronglabelNext', '', ru('Next', 'Далее') + ' →') +
        '</div></div>';
    }

    return '<div class="game-top-bar"><div><strong style="font-size:1.05rem;">' + title + '</strong></div>' +
      '<div style="display:flex;align-items:center;gap:0.5rem;">' +
      chip(cfg, 'restart', 'wronglabel', '↺ ' + ru('Start Over', 'Начать сначала')) +
      pill(g.score + ' / ' + N + ' · (' + (g.i + 1) + '/' + N + ')') +
      '</div></div>' +
      '<div style="text-align:center;font-size:0.95rem;font-weight:700;color:var(--text-secondary);margin:0.9rem 0;">' +
      ru('One picture has the WRONG label — find it!', 'На одной картинке НЕВЕРНАЯ подпись — найдите её!') + '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:1rem;">' + cards + '</div>' +
      explain;
  }

  /* 9. Spot the 1-Letter Typo --------------------------------------------- */
  function prepareTypo(cfg) {
    var trio = shuffle(cfg.words).slice(0, 3);
    var wrongIdx = Math.floor(Math.random() * 3);
    return { trio: trio.map(function (w) { return w.id; }), wrongIdx: wrongIdx };
  }
  function renderTypo(cfg, st) {
    var g = gst(cfg, 'typo');
    var N = cfg.words.length;
    var title = ru('9. 3 🖼 → 1 आ/अ ✕ — Spot the 1-Letter Typo', '9. Ошибка в 1 букве (3 картинки)');
    if (g.finished || g.i >= N) return finalScreen(cfg, 'typo', title, g.score, N);
    if (!g.round) g.round = prepareTypo(cfg);

    var targetId = g.round.trio[g.round.wrongIdx];
    var target = byId(cfg, targetId);

    var cards = g.round.trio.map(function (id, idx) {
      var w = byId(cfg, id);
      var isTarget = idx === g.round.wrongIdx;
      var shownDeva = isTarget ? w.typoDeva : w.deva;
      var shownIast = isTarget ? w.typoIast : w.iast;
      var showCorrection = g.answered && isTarget;
      var cls = '';
      if (g.answered && isTarget) cls = 'correct';
      if (!g.answered && g.redIdx === idx) cls = 'wrong';
      return '<button type="button" class="quiz-opt-btn ' + cls + '" onclick="SAL.do(\'' + cfg.key + '\',\'pick3\',\'' + idx + '\')"' +
        ' style="display:flex;flex-direction:column;align-items:center;padding:1.25rem 0.85rem;">' +
        '<div class="vocab-svg-box" style="margin:0 auto 0.75rem;width:110px;height:110px;">' + w.svg + '</div>' +
        (showCorrection
          ? '<div style="font-family:var(--font-deva);font-size:1.3rem;color:#dc2626;text-decoration:line-through;opacity:0.85;">' + shownDeva + '</div>' +
            '<div style="font-family:var(--font-deva);font-size:1.85rem;font-weight:700;color:#15803d;">✓ ' + w.deva + '</div>' +
            '<div class="vocab-iast" style="font-size:0.85rem;color:#15803d;">' + w.iast + '</div>'
          : '<div style="font-family:var(--font-deva);font-size:1.75rem;font-weight:700;color:var(--text-primary);">' + shownDeva + '</div>' +
            '<div class="vocab-iast" style="font-size:0.85rem;color:var(--accent-saffron);">' + shownIast + '</div>') +
        '</button>';
    }).join('');

    var explain = '';
    if (g.answered) {
      var d = diffSegments(target.typoDeva, target.deva);
      var kind = mistakeKind(d.from + d.to);
      explain = '<div style="margin-top:1.15rem;background:#f0fdf4;border:1.5px solid #16a34a;border-radius:12px;padding:0.9rem 1.15rem;text-align:center;">' +
        '<div style="font-size:0.98rem;line-height:1.6;">' +
        (L() === 'ru'
          ? 'Опечатка в слове <strong style="font-family:var(--font-deva);font-size:1.2rem;">' + target.deva + '</strong> (' + target.iast + '): написано ' +
            '<span style="font-family:var(--font-deva);font-size:1.15rem;color:#dc2626;text-decoration:line-through;">' + target.typoDeva + '</span>, верно ' +
            '<span style="font-family:var(--font-deva);font-size:1.15rem;color:#15803d;">' + target.deva + '</span>.'
          : 'The typo is in <strong style="font-family:var(--font-deva);font-size:1.2rem;">' + target.deva + '</strong> (' + target.iast + '): it read ' +
            '<span style="font-family:var(--font-deva);font-size:1.15rem;color:#dc2626;text-decoration:line-through;">' + target.typoDeva + '</span>, correct is ' +
            '<span style="font-family:var(--font-deva);font-size:1.15rem;color:#15803d;">' + target.deva + '</span>.') +
        '</div>' +
        '<div style="margin-top:0.5rem;font-size:0.92rem;font-weight:700;color:var(--accent-cambridge);">' +
        ru('Difference', 'Разница') + ': <span style="font-family:var(--font-deva);color:#dc2626;text-decoration:line-through;">' + (d.from || '—') + '</span> ✕ → ' +
        '<span style="font-family:var(--font-deva);color:#15803d;">' + (d.to || '—') + '</span> ✓ — ' + tx(kind) + '</div>' +
        (!g.firstTry
          ? '<div style="margin-top:0.4rem;font-size:0.88rem;color:#b45309;font-weight:700;">' +
            ru('Found on the 2nd try — the point is only awarded for the first try.',
               'Нашли со второй попытки — очко начисляется только за первую.') + '</div>'
          : '') +
        '<div style="margin-top:0.75rem;display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;">' +
        chip(cfg, 'speak', target.ttsText, '🔊 ' + ru('Listen', 'Послушать')) +
        chip(cfg, 'typoNext', '', ru('Next', 'Далее') + ' →') +
        '</div></div>';
    }

    return '<div class="game-top-bar"><div><strong style="font-size:1.05rem;">' + title + '</strong></div>' +
      '<div style="display:flex;align-items:center;gap:0.5rem;">' +
      chip(cfg, 'restart', 'typo', '↺ ' + ru('Start Over', 'Начать сначала')) +
      pill(g.score + ' / ' + N + ' · (' + (g.i + 1) + '/' + N + ')') +
      '</div></div>' +
      '<div style="text-align:center;font-size:0.95rem;font-weight:700;color:var(--text-secondary);margin:0.9rem 0;">' +
      ru('One word has a 1-letter spelling mistake — find it!', 'В одном слове ошибка в одной букве — найдите её!') + '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:1rem;">' + cards + '</div>' +
      explain;
  }

  /* 10. Categories -------------------------------------------------------- */
  function renderCategories(cfg, st) {
    var g = gst(cfg, 'categories');
    var cats = cfg.categories;
    if (g.finished || g.i >= cats.length) {
      return finalScreen(cfg, 'categories', ru('Categories — done!', 'Категории — пройдено!'), g.score, cats.length);
    }
    var cat = cats[g.i];
    var sel = g.sel;
    var chips = cfg.words.map(function (w) {
      var on = !!sel[w.id];
      var cls = 'chip-btn';
      var style = '';
      if (g.checked) {
        var isCorrect = cat.wordIds.indexOf(w.id) >= 0;
        var isBonus = (cat.bonusWordIds || []).indexOf(w.id) >= 0;
        if (on && (isCorrect || isBonus)) { cls += ' active'; style = 'border-color:#16a34a;background:#f0fdf4;color:#15803d;'; }
        else if (on) { style = 'border-color:#dc2626;background:#fef2f2;color:#b91c1c;'; }
        else if (isCorrect) { style = 'border-color:#f59e0b;background:#fffbeb;color:#b45309;'; }
      } else if (on) cls += ' active';
      return '<button type="button" class="' + cls + '" style="' + style + '" onclick="SAL.do(\'' + cfg.key + '\',\'catToggle\',\'' + w.id + '\')">' +
        w.deva + iastSpan(w.iast) + '</button>';
    }).join('');
    return topBar(pill(ru('Category', 'Категория') + ' ' + (g.i + 1) + '/' + cats.length) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'restart', 'categories', '↺')) +
      centerCard(
        '<div style="font-size:1.05rem;font-weight:800;color:var(--accent-cambridge);margin-bottom:0.35rem;">' + tx(cat) + '</div>' +
        '<div style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1rem;">' +
        ru('Select all the words that belong to this category', 'Выберите все слова, которые относятся к этой категории') + '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:center;">' + chips + '</div>' +
        '<div style="margin-top:1.15rem;display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;">' +
        (g.checked
          ? '<button type="button" class="btn btn-primary" style="padding:0.5rem 1.2rem;font-size:0.9rem;" onclick="SAL.do(\'' + cfg.key + '\',\'catNext\')">' +
            ru('Next →', 'Далее →') + '</button>'
          : '<button type="button" class="btn btn-primary" style="padding:0.5rem 1.2rem;font-size:0.9rem;" onclick="SAL.do(\'' + cfg.key + '\',\'catCheck\')">' +
            ru('Check ✓', 'Проверить ✓') + '</button>') +
        '</div>' +
        (g.checked ? '<div style="margin-top:0.9rem;font-size:0.88rem;color:var(--text-secondary);">' +
          ru('Correct', 'Верно') + ': ' + cat.wordIds.map(function (id) { return byId(cfg, id).deva; }).join(' · ') +
          ((cat.bonusWordIds && cat.bonusWordIds.length) ? ' (+ ' + cat.bonusWordIds.map(function (id) { return byId(cfg, id).deva; }).join(' · ') + ')' : '') +
          '</div>' : '')
      );
  }

  /* 11. Missing Letters --------------------------------------------------- */
  function renderSpelling(cfg, st) {
    var g = gst(cfg, 'spelling');
    var N = cfg.words.length;
    if (g.finished || g.i >= N) return finalScreen(cfg, 'spelling', ru('Missing Letters — done!', 'Missing Letters — пройдено!'), g.score, N);
    var w = cfg.words[g.i];
    var btns = w.missingChoices.map(function (c) {
      var cls = '';
      if (g.answered) {
        if (c === w.missingAnswer) cls = 'correct';
        else if (c === g.picked) cls = 'wrong';
      }
      return optBtn(cfg, 'spellPick', c, '<span style="font-family:var(--font-deva);font-size:1.35rem;font-weight:700;">' + c + '</span>', cls);
    }).join('');
    return topBar(pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'restart', 'spelling', '↺')) +
      centerCard(
        '<div style="margin-bottom:0.5rem;">' + svgBox(w, 120) + '</div>' +
        '<div style="font-family:var(--font-deva);font-size:2.4rem;font-weight:700;letter-spacing:0.06em;">' + w.missingDisplay + '</div>' +
        '<div class="iast-text" style="margin-bottom:1rem;">' + w.iast + '</div>' +
        optGrid(btns) +
        (g.answered
          ? '<div style="margin-top:0.9rem;font-family:var(--font-deva);font-size:1.7rem;font-weight:600;color:#15803d;">' + w.deva + '</div>' +
            nextRow(cfg, 'spellingNext', '<button type="button" class="chip-btn" onclick="SAL.speak(\'' + w.ttsText + '\')">🔊 ' + ru('Listen', 'Прослушать') + '</button>')
          : '<div style="margin-top:0.85rem;">' + chip(cfg, 'speak', w.ttsText, '🔊 ' + ru('Listen', 'Послушать')) + '</div>')
      );
  }

  /* 12. आम् / न ----------------------------------------------------------- */
  function prepareTF(cfg) {
    var idx = Math.floor(Math.random() * cfg.words.length);
    var isTrue = Math.random() < 0.5;
    var otherId = null;
    if (!isTrue) otherId = shuffle(cfg.words.filter(function (w, i) { return i !== idx; }))[0].id;
    return { idx: idx, isTrue: isTrue, otherId: otherId };
  }
  function renderTrueFalse(cfg, st) {
    var g = gst(cfg, 'truefalse');
    var N = cfg.words.length;
    if (g.finished || g.i >= N) return finalScreen(cfg, 'truefalse', ru('आम् / न — done!', 'आम् / न — пройдено!'), g.score, N);
    if (g.isTrue === undefined || (g.isTrue === true && g.otherId === null && g.answered === false && g.picked === null && g.i === 0 && !g.init)) {
      var r = prepareTF(cfg);
      g.idx = r.idx; g.isTrue = r.isTrue; g.otherId = r.otherId; g.init = true;
    }
    if (g.idx === undefined) {
      var r2 = prepareTF(cfg);
      g.idx = r2.idx; g.isTrue = r2.isTrue; g.otherId = r2.otherId; g.init = true;
    }
    var w = cfg.words[g.idx];
    var shown = g.isTrue ? w : byId(cfg, g.otherId);
    var clsYes = '', clsNo = '';
    if (g.answered) {
      if (g.isTrue) clsYes = 'correct'; else clsNo = 'correct';
      if (g.picked === 'yes' && !g.isTrue) clsYes = 'wrong';
      if (g.picked === 'no' && g.isTrue) clsNo = 'wrong';
    }
    return topBar(pill(ru('Round', 'Раунд') + ' ' + (g.i + 1) + '/' + N) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'restart', 'truefalse', '↺')) +
      centerCard(
        '<div style="margin-bottom:0.75rem;">' + svgBox(w, 150) + '</div>' +
        '<div style="font-family:var(--font-deva);font-size:2.4rem;font-weight:700;">' + shown.deva + '</div>' +
        '<div class="iast-text" style="margin-bottom:1rem;">' + shown.iast + '</div>' +
        '<div style="font-size:0.9rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.75rem;">' +
        ru('Does the word match the picture?', 'Слово подходит к картинке?') + '</div>' +
        '<div class="quiz-options-grid">' +
        optBtn(cfg, 'tfAnswer', 'yes', '<span style="font-family:var(--font-deva);font-size:1.5rem;">आम्</span> ' + ru('Yes', 'Да'), clsYes) +
        optBtn(cfg, 'tfAnswer', 'no', '<span style="font-family:var(--font-deva);font-size:1.5rem;">न</span> ' + ru('No', 'Нет'), clsNo) +
        '</div>' +
        (g.answered ? nextRow(cfg, 'tfNext', '<button type="button" class="chip-btn" onclick="SAL.speak(\'' + w.ttsText + '\')">🔊 ' + ru('Listen', 'Прослушать') + '</button>') : '')
      );
  }

  var GAME_RENDER = {
    masked: renderMasked, flashcards: renderFlashcards, gaps: renderGaps, picquiz: renderPicQuiz,
    wordquiz: renderWordQuiz, match: renderMatch, memory: renderMemory, wronglabel: renderWrongLabel,
    typo: renderTypo, categories: renderCategories, spelling: renderSpelling, truefalse: renderTrueFalse
  };

  function renderPractice(cfg) {
    var st = state(cfg);
    var pane = document.getElementById('view-lesson' + cfg.num);
    if (pane) {
      pane.querySelectorAll('.practice-tab-btn[data-game]').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-game') === st.game);
      });
    }
    var arena = document.getElementById(cfg.key + '-practice-arena');
    if (!arena) return;
    var fn = GAME_RENDER[st.game] || renderMasked;
    arena.innerHTML = fn(cfg, st);
  }

  /* =========================================================================
     PRODUCTION
     ========================================================================= */
  function stopTimers() {
    if (timers.sprint) { clearInterval(timers.sprint); timers.sprint = null; }
    if (timers.chant) { clearInterval(timers.chant); timers.chant = null; }
  }
  SAL.stopTimers = stopTimers;

  function orderedByPins(cfg) {
    var all = [];
    cfg.hotspots.figures.forEach(function (f) { f.pins.forEach(function (p) { all.push(p); }); });
    all.sort(function (a, b) { return a.num - b.num; });
    var out = all.map(function (p) { return p.id; });
    cfg.words.forEach(function (w) { if (out.indexOf(w.id) < 0) out.push(w.id); });
    return out;
  }

  /* 1. Speed Sprint (parity with Lesson 1: manual / auto / slideshow + 4s|3s|2s + card/arrow) */
  function sprintArrowHtml(cfg, wordId) {
    var fig = null, pin = null;
    cfg.hotspots.figures.forEach(function (f) {
      f.pins.forEach(function (pn) { if (pn.id === wordId) { fig = f; pin = pn; } });
    });
    if (!fig) return '';
    var dx = pin.tx - pin.x, dy = pin.ty - pin.y;
    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
    var endX = pin.tx - (dx / dist) * 6;
    var endY = pin.ty - (dy / dist) * 6;
    var markerId = 'sprint-arrow-head-' + cfg.key;
    return '<div style="width:100%;max-width:320px;margin:0 auto 0.75rem;">' +
      '<svg viewBox="' + fig.viewBox + '" style="width:100%;height:auto;display:block;margin:0 auto;" fill="none"' +
      ' xmlns="http://www.w3.org/2000/svg">' +
      '<defs><marker id="' + markerId + '" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"' +
      ' markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 Z" fill="#DC2626"/></marker></defs>' +
      fig.art +
      '<circle cx="' + pin.tx + '" cy="' + pin.ty + '" r="11" fill="rgba(220,38,38,0.18)" stroke="#DC2626" stroke-width="2" stroke-dasharray="3,2"/>' +
      '<circle cx="' + pin.tx + '" cy="' + pin.ty + '" r="4" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.4"/>' +
      '<line x1="' + pin.x + '" y1="' + pin.y + '" x2="' + endX + '" y2="' + endY + '" stroke="#FFFFFF" stroke-width="6.5" stroke-linecap="round"/>' +
      '<line x1="' + pin.x + '" y1="' + pin.y + '" x2="' + endX + '" y2="' + endY + '" stroke="#DC2626" stroke-width="3.6"' +
      ' stroke-linecap="round" marker-end="url(#' + markerId + ')"/>' +
      '<circle cx="' + pin.x + '" cy="' + pin.y + '" r="14" fill="#DC2626" stroke="#FEF08A" stroke-width="2.5"/>' +
      '<text x="' + pin.x + '" y="' + (pin.y + 4.5) + '" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="800"' +
      ' font-family="Plus Jakarta Sans, sans-serif">?</text>' +
      '</svg></div>';
  }

  function sprintTick(cfg) {
    var p = state(cfg).prod.sprint;
    p.timeLeft--;
    if (p.timeLeft <= 0) {
      if (p.subMode === 'slideshow') {
        /* Pure picture slideshow: no text and no audio — advance to the next picture at once */
        if (p.i + 1 >= cfg.words.length) {
          stopTimers();
          p.running = false;
          p.score = cfg.words.length;
          p.finished = true;
        } else {
          p.i++;
          p.timeLeft = p.duration;
        }
      } else {
        stopTimers();
        p.running = false;
        p.revealed = true;
        SAL.speak(cfg.words[p.i].ttsText);
      }
    }
    SAL.refresh();
  }

  function startSprintTimer(cfg) {
    stopTimers();
    var p = state(cfg).prod.sprint;
    p.running = true;
    p.revealed = false;
    p.timeLeft = p.duration;
    var key = cfg.key;
    timers.sprint = setInterval(function () { sprintTick(lessons[key]); }, 1000);
    SAL.refresh();
  }

  function renderSprint(cfg, st) {
    var p = st.prod.sprint;
    var N = cfg.words.length;
    if (p.finished) {
      stopTimers();
      return finalScreen(cfg, 'sprintRestart', ru('1. Speed Sprint ⏱', '1. Спринт на время ⏱'), p.score, N,
        p.subMode === 'slideshow' ? ru('All ' + N + ' pictures shown', 'Показаны все ' + N + ' картинок') : '');
    }
    var w = cfg.words[p.i];
    var manualLabel = ru('✋ Manual Timer', '✋ Таймер вручную');
    var autoLabel = ru('⚡ Auto Timer', '⚡ Авто-таймер');
    var slideshowLabel = ru('⏩ Auto-Advance Pictures (No Text & No Sound)', '⏩ Авто-смена картинок (без текста и звука)');
    var cardLabel = ru('🖼 Isolated Body Part', '🖼 Отдельная часть тела');
    var arrowLabel = ru('🏹 Arrow on the Diagram', '🏹 Стрелка на схеме');
    var enableText = ru('▶ Enable Timer & Start Game', '▶ Включить таймер и начать игру') + ' (' + p.duration + 's)';
    var startText = ru('▶ Start Timer', '▶ Запустить таймер') + ' (' + p.duration + 's)';
    var pauseText = ru('⏸ Pause', '⏸ Пауза');
    var revealText = ru('🔊 I Said It! Check Answer', '🔊 Я назвал вслух! Проверить');
    var promptText = p.subMode === 'slideshow'
      ? ru('Pictures advance automatically every ' + p.duration + 's with no text and no sound — say all ' + N + ' words aloud in time!',
           'Картинки сменяют друг друга каждые ' + p.duration + ' сек без текста и звука — успевайте называть все ' + N + ' слов вслух!')
      : ru('Point to this body part on yourself and say the Sanskrit word aloud BEFORE time runs out:',
           'Покажите эту часть тела у себя и назовите её вслух ДО окончания таймера:');
    var visualHtml = p.visual === 'arrow'
      ? sprintArrowHtml(cfg, w.id)
      : '<div class="vocab-svg-box" style="width:142px;height:142px;margin-bottom:0.75rem;">' + w.svg + '</div>';
    var counter = p.subMode === 'slideshow'
      ? (p.i + 1) + ' / ' + N
      : p.score + ' / ' + N + ' · (' + (p.i + 1) + '/' + N + ')';

    var rows = '<div class="game-top-bar" style="margin-bottom:0.6rem;">' +
      '<div style="display:flex;align-items:center;gap:0.45rem;flex-wrap:wrap;">' +
      chip(cfg, 'sprintSub', 'manual', manualLabel, p.subMode === 'manual') +
      chip(cfg, 'sprintSub', 'auto', autoLabel, p.subMode === 'auto') +
      chip(cfg, 'sprintSub', 'slideshow', slideshowLabel, p.subMode === 'slideshow') +
      '<span style="color:var(--border-strong);margin:0 0.15rem;">|</span>' +
      chip(cfg, 'sprintDur', '4', '4s', p.duration === 4) +
      chip(cfg, 'sprintDur', '3', '3s', p.duration === 3) +
      chip(cfg, 'sprintDur', '2', '2s', p.duration === 2) +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:0.5rem;">' +
      chip(cfg, 'sprintRestart', '', '↺ ' + ru('Start Over', 'Начать сначала')) +
      pill(counter) +
      '</div></div>' +
      '<div style="display:flex;justify-content:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.85rem;">' +
      chip(cfg, 'sprintVisual', 'card', cardLabel, p.visual === 'card') +
      chip(cfg, 'sprintVisual', 'arrow', arrowLabel, p.visual === 'arrow') +
      '</div>' +
      '<div style="text-align:center;font-size:0.9rem;font-weight:600;color:var(--text-secondary);margin-bottom:0.85rem;">' +
      promptText + '</div>' +
      '<div class="flashcard-box" style="cursor:default;">' +
      visualHtml;

    if (!p.revealed) {
      rows += '<div style="font-size:2rem;font-weight:800;color:' + (p.running ? '#dc2626' : 'var(--accent-cambridge)') +
        ';margin-bottom:0.65rem;">⏱ ' + p.timeLeft + 's</div>' +
        '<div style="display:flex;gap:0.6rem;flex-wrap:wrap;justify-content:center;">' +
        (p.running
          ? '<button type="button" class="chip-btn" onclick="SAL.do(\'' + cfg.key + '\',\'sprintPause\')">' + pauseText + '</button>'
          : '<button type="button" class="btn btn-primary" style="padding:0.55rem 1.2rem;font-size:0.92rem;" onclick="SAL.do(\'' + cfg.key + '\',\'sprintBegin\')">' +
            (p.subMode !== 'manual' && !p.started ? enableText : startText) + '</button>') +
        (p.subMode !== 'slideshow'
          ? '<button type="button" class="chip-btn" onclick="SAL.do(\'' + cfg.key + '\',\'sprintReveal\')">' + revealText + '</button>'
          : '') +
        '</div>';
    } else {
      rows += '<div class="vocab-deva" style="font-size:2.5rem;color:#15803d;margin-bottom:0.15rem;">' + w.deva + '</div>' +
        '<div class="vocab-iast" style="font-size:1.1rem;margin-bottom:0.85rem;">' + w.iast + '</div>' +
        '<div style="display:flex;gap:0.65rem;flex-wrap:wrap;justify-content:center;">' +
        chip(cfg, 'speak', w.ttsText, '🔊') +
        '<button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;" onclick="SAL.do(\'' + cfg.key + '\',\'sprintGrade\',\'0\')">' +
        ru('✕ Missed', '✕ Не успел / ошибся') + '</button>' +
        '<button type="button" class="chip-btn active" style="background:#16a34a;border-color:#16a34a;" onclick="SAL.do(\'' + cfg.key + '\',\'sprintGrade\',\'1\')">' +
        ru('✓ Said It in Time!', '✓ Успел назвать верно!') + '</button>' +
        '</div>';
    }
    return rows + '</div>';
  }

  /* 2. Microphone (parity with Lesson 1: record → auto-check, or check with audio) */
  function renderMic(cfg, st) {
    var m = st.prod.mic;
    var N = cfg.words.length;
    var title = ru('2. Speak into Microphone 🎙', '2. Произнеси в микрофон 🎙');
    if (m.finished || m.i >= N) return finalScreen(cfg, 'micRestart', title, m.score, N);
    var w = cfg.words[m.i];
    var supported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    var statusHtml = '';
    if (m.transcript) {
      statusHtml += '<div style="font-size:0.88rem;font-weight:600;color:var(--accent-cambridge);margin-bottom:0.5rem;">' +
        ru('Heard', 'Распознано') + ': ' + m.transcript + '</div>';
    }
    if (m.result === 'ok') {
      statusHtml += '<div style="font-size:0.9rem;font-weight:700;color:#15803d;margin-bottom:0.5rem;">✓ ' +
        ru('Correct!', 'Верно!') + '</div>';
    } else if (m.result === 'no') {
      statusHtml += '<div style="font-size:0.9rem;font-weight:700;color:#b91c1c;margin-bottom:0.5rem;">✗ ' +
        ru('Not quite — compare with the correct word below', 'Не совсем — сравните с правильным словом ниже') + '</div>';
    }
    return '<div class="game-top-bar"><div><strong style="font-size:1.05rem;">' + title + '</strong></div>' +
      '<div style="display:flex;align-items:center;gap:0.5rem;">' +
      chip(cfg, 'micRestart', '', '↺ ' + ru('Start Over', 'Начать сначала')) +
      pill(m.score + ' / ' + N + ' · (' + (m.i + 1) + '/' + N + ')') +
      '</div></div>' +
      '<div class="flashcard-box" style="cursor:default;">' +
      '<div class="vocab-svg-box" style="width:138px;height:138px;margin-bottom:0.75rem;">' + w.svg + '</div>' +
      '<div style="display:flex;gap:0.65rem;flex-wrap:wrap;justify-content:center;margin-bottom:0.75rem;">' +
      '<button type="button" class="chip-btn active" onclick="SAL.do(\'' + cfg.key + '\',\'micStart\')">' +
      (m.listening ? ru('🎙 Listening...', '🎙 Слушаю...') : ru('🎙 Click & Speak into Mic', '🎙 Нажать и сказать в микрофон')) + '</button>' +
      '<button type="button" class="chip-btn" onclick="SAL.do(\'' + cfg.key + '\',\'micReveal\')">🔊 ' +
      ru('Check with Audio (No Mic)', 'Проверить звуком (без микрофона)') + '</button>' +
      '</div>' +
      (!supported
        ? '<div class="game-score-pill" style="margin-bottom:0.7rem;">' +
          ru('Speech recognition is not supported in this browser — use the audio check button',
             'Распознавание речи не поддерживается этим браузером — используйте кнопку проверки звуком') + '</div>'
        : '') +
      statusHtml +
      (m.revealed
        ? '<div class="vocab-deva" style="font-size:2.45rem;color:#15803d;margin-bottom:0.15rem;">' + w.deva + '</div>' +
          '<div class="vocab-iast" style="font-size:1.05rem;margin-bottom:0.8rem;">' + w.iast + '</div>' +
          '<div style="display:flex;gap:0.65rem;flex-wrap:wrap;justify-content:center;">' +
          chip(cfg, 'speak', w.ttsText, '🔊') +
          '<button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;" onclick="SAL.do(\'' + cfg.key + '\',\'micGrade\',\'0\')">' +
          ru('✕ Retry', '✕ Ещё повторить') + '</button>' +
          '<button type="button" class="chip-btn active" style="background:#16a34a;border-color:#16a34a;" onclick="SAL.do(\'' + cfg.key + '\',\'micGrade\',\'1\')">' +
          ru('✓ Pronounced Correctly!', '✓ Произнёс верно!') + '</button>' +
          '</div>'
        : '') +
      '</div>';
  }

  /* 3. What Is Missing? (parity with Lesson 1: '?' marker on the diagram) */
  function allPinsOf(cfg) {
    var all = [];
    cfg.hotspots.figures.forEach(function (f) { f.pins.forEach(function (p) { all.push({ pin: p, fig: f }); }); });
    all.sort(function (a, b) { return a.pin.num - b.pin.num; });
    return all;
  }
  function renderMissing(cfg, st) {
    var m = st.prod.missing;
    var all = allPinsOf(cfg);
    var N = all.length;
    if (m.finished || m.i >= N) {
      return finalScreen(cfg, 'missingRestart', ru("3. What's Missing on the Portrait? ❓", '3. Что пропало на рисунке? ❓'), m.score, N);
    }
    var cur = all[m.i];
    var w = byId(cfg, cur.pin.id);
    var marker = '<g><line x1="' + cur.pin.x + '" y1="' + cur.pin.y + '" x2="' + cur.pin.tx + '" y2="' + cur.pin.ty +
      '" stroke="#DC2626" stroke-width="2.8"/>' +
      '<circle cx="' + cur.pin.tx + '" cy="' + cur.pin.ty + '" r="11" fill="#FEF08A" stroke="#DC2626" stroke-width="2.5" stroke-dasharray="3,2"/>' +
      '<circle cx="' + cur.pin.x + '" cy="' + cur.pin.y + '" r="15" fill="#DC2626" stroke="#FEF08A" stroke-width="2.5"/>' +
      '<text x="' + cur.pin.x + '" y="' + (cur.pin.y + 5) + '" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="800"' +
      ' font-family="Plus Jakarta Sans, sans-serif">?</text></g>';
    var title = ru("3. What's Missing on the Portrait? ❓", '3. Что пропало на рисунке? ❓');
    return '<div class="game-top-bar"><div><strong style="font-size:1.05rem;">' + title + '</strong></div>' +
      '<div style="display:flex;align-items:center;gap:0.5rem;">' +
      chip(cfg, 'missingRestart', '', '↺ ' + ru('Start Over', 'Начать сначала')) +
      pill(m.score + ' / ' + N + ' · (' + (m.i + 1) + '/' + N + ')') +
      '</div></div>' +
      '<div class="flashcard-box" style="cursor:default;">' +
      '<div style="font-size:0.9rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.75rem;">' +
      ru('Look where the red ? points and say that word aloud',
         'Посмотрите, куда указывает красный знак «?», и назовите это слово вслух') + '</div>' +
      '<svg viewBox="' + cur.fig.viewBox + '" style="width:100%;max-width:320px;height:auto;display:block;margin:0 auto;" fill="none"' +
      ' xmlns="http://www.w3.org/2000/svg">' + cur.fig.art + marker + '</svg>' +
      (m.revealed
        ? '<div style="margin-top:0.75rem;" class="vocab-svg-box" style="width:96px;height:96px;margin:0.75rem auto 0.25rem;">' + w.svg + '</div>' +
          '<div class="vocab-deva" style="font-size:2.2rem;color:#15803d;margin-bottom:0.15rem;">' + w.deva + '</div>' +
          '<div class="vocab-iast" style="font-size:1.05rem;margin-bottom:0.8rem;">' + w.iast + '</div>' +
          '<div style="display:flex;gap:0.65rem;flex-wrap:wrap;justify-content:center;">' +
          chip(cfg, 'speak', w.ttsText, '🔊') +
          '<button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;" onclick="SAL.do(\'' + cfg.key + '\',\'missingGrade\',\'0\')">' +
          ru('✕ Missed', '✕ Ошибся') + '</button>' +
          '<button type="button" class="chip-btn active" style="background:#16a34a;border-color:#16a34a;" onclick="SAL.do(\'' + cfg.key + '\',\'missingGrade\',\'1\')">' +
          ru('✓ Said It Right!', '✓ Назвал верно!') + '</button>' +
          '</div>'
        : '<div style="margin-top:0.85rem;"><button type="button" class="chip-btn active" onclick="SAL.do(\'' + cfg.key + '\',\'missingReveal\')">' +
          ru('🔊 I Said It! Check Answer', '🔊 Я назвал вслух! Проверить') + '</button></div>') +
      '</div>';
  }

  /* 4. TPR Chant & Checklist --------------------------------------------- */
  function renderChant(cfg, st) {
    var N = cfg.words.length;
    var order = orderedByPins(cfg);
    if (st.prod.chantReverse) order = order.slice().reverse();
    var active = st.prod.active;
    var w = byId(cfg, active);
    var producedCount = Object.keys(st.prod.produced).length;
    var chips = order.map(function (id) {
      var item = byId(cfg, id);
      var done = !!st.prod.produced[id];
      var isCur = id === active;
      return '<button type="button" class="chip-btn' + (isCur ? ' active' : '') + '" onclick="SAL.do(\'' + cfg.key + '\',\'chantWord\',\'' + id + '\')"' +
        ' style="' + (done && !isCur ? 'border-color:#16a34a;background:#f0fdf4;color:#15803d;' : '') + '">' +
        (done ? '✓ ' : '') + item.deva + iastSpan(item.iast) + '</button>';
    }).join('');
    return topBar(pill(ru('Checklist', 'Чек-лист') + ': ' + producedCount + '/' + N) + ' ' + pill('🎶 ' + ru('TPR Chant', 'Ритм-чант')),
      chip(cfg, 'chantReverse', '', (st.prod.chantReverse ? '↑ ' : '↓ ') + ru('Reverse order', 'Обратный порядок'), st.prod.chantReverse) +
      chip(cfg, 'chantReset', '', '↺')) +
      centerCard(
        '<div style="background:#f0fdfa;border:1.5px solid var(--accent-cambridge);border-radius:12px;padding:1rem 1.2rem;margin-bottom:1.15rem;' +
        'text-align:left;font-size:0.88rem;line-height:1.55;">' +
        '<div style="font-weight:800;color:var(--accent-cambridge);margin-bottom:0.35rem;font-size:0.94rem;">🎓 ' +
        ru('Student instructions (TPR Chant)', 'Инструкция для ученика (ритм-чант)') + ':</div>' +
        '<div><strong>1.</strong> ' + ru('Tap the words in order, TOUCH that part of your body and say the word aloud.',
          'Нажимайте слова по порядку, КАСАЙТЕСЬ этой части тела у себя и называйте слово вслух.') + '</div>' +
        '<div><strong>2.</strong> ' + ru('Press Auto-Chant: cards advance every 1.6 s — keep up with the rhythm!',
          'Нажмите «Авто-ритм»: карточки переключаются каждые 1,6 сек — успевайте в ритм!') + '</div>' +
        '<div><strong>3.</strong> ' + ru('Mark ✓ every word you can say from memory.',
          'Отмечайте ✓ каждое слово, которое вы назвали по памяти.') + '</div></div>' +
        '<div style="margin-bottom:0.75rem;">' + svgBox(w, 130) + '</div>' +
        '<div style="font-family:var(--font-deva);font-size:2.1rem;font-weight:700;">' + w.deva + '</div>' +
        '<div class="iast-text">' + w.iast + '</div>' +
        '<div style="display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;margin:1rem 0 0.5rem;">' +
        '<button type="button" class="chip-btn active" onclick="SAL.speak(\'' + w.ttsText + '\')">🔊 ' + ru('Listen', 'Послушать') + '</button>' +
        '<button type="button" class="btn btn-primary" style="padding:0.5rem 1.1rem;font-size:0.88rem;" onclick="SAL.do(\'' + cfg.key + '\',\'chantPlay\')">' +
        (timers.chant ? '⏹ ' + ru('Stop Chant', 'Стоп ритм') : '▶ ' + ru('Auto-Chant 🔊', 'Авто-ритм 🔊')) + '</button>' +
        '<button type="button" class="quiz-opt-btn correct" style="max-width:240px;" onclick="SAL.do(\'' + cfg.key + '\',\'produced\',\'' + w.id + '\')">✓ ' +
        (st.prod.produced[w.id] ? ru('Done!', 'Готово!') : ru('I said it!', 'Я назвал(а)!')) + '</button>' +
        '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:0.4rem;justify-content:center;margin-top:0.9rem;">' + chips + '</div>' +
        (producedCount >= N ? '<div style="margin-top:1rem;font-weight:800;color:#15803d;">🏆 ' + N + '/' + N + ' — ' +
          ru('perfect lesson!', 'урок пройден идеально!') + '</div>' : '')
      );
  }

  function renderProd(cfg) {
    var st = state(cfg);
    var pane = document.getElementById('view-lesson' + cfg.num);
    if (pane) {
      pane.querySelectorAll('.practice-tab-btn[data-prod-mode]').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-prod-mode') === st.prod.mode);
      });
    }
    var box = document.getElementById(cfg.key + '-production-stage');
    if (!box) return;
    var m = st.prod.mode;
    if (m === 'mic') box.innerHTML = renderMic(cfg, st);
    else if (m === 'missingpart') box.innerHTML = renderMissing(cfg, st);
    else if (m === 'chant') box.innerHTML = renderChant(cfg, st);
    else box.innerHTML = renderSprint(cfg, st);
  }

  /* =========================================================================
     ACTIONS
     ========================================================================= */
  var ACTIONS = {
    speak: function (cfg, st, a) { SAL.speak(a); },

    /* presentation */
    setPresMode: function (cfg, st, a) { st.pres.mode = a; },
    toggleLabels: function (cfg, st) { st.pres.labelsHidden = !st.pres.labelsHidden; },
    toggleMask: function (cfg, st) { st.pres.maskMode = !st.pres.maskMode; st.pres.revealed = {}; },
    posterClick: function (cfg, st, id) {
      var w = byId(cfg, id);
      if (st.pres.maskMode) {
        if (st.pres.revealed[id]) delete st.pres.revealed[id];
        else { st.pres.revealed[id] = true; SAL.speak(w.ttsText); }
      } else SAL.speak(w.ttsText);
    },
    audioClick: function (cfg, st, id) {
      var w = byId(cfg, id);
      if (!st.pres.heard[id]) { st.pres.heard[id] = true; SAL.speak(w.ttsText); }
      else { st.pres.audioRevealed[id] = true; SAL.speak(w.ttsText); }
    },
    audioHear: function (cfg, st, id) { st.pres.heard[id] = true; },
    revealAll: function (cfg, st) {
      cfg.words.forEach(function (w) { st.pres.heard[w.id] = true; st.pres.audioRevealed[w.id] = true; });
    },
    resetAudio: function (cfg, st) { st.pres.heard = {}; st.pres.audioRevealed = {}; },
    setStep: function (cfg, st, a) { st.pres.step = parseInt(a, 10) || 0; },
    hotspot: function (cfg, st, id) { st.pres.hotspotId = id; SAL.speak(byId(cfg, id).ttsText); },
    hotspotStep: function (cfg, st, a) {
      var order = orderedByPins(cfg);
      var idx = order.indexOf(st.pres.hotspotId);
      var next = order[(idx + parseInt(a, 10) + order.length) % order.length];
      st.pres.hotspotId = next; SAL.speak(byId(cfg, next).ttsText);
    },

    /* practice: shared */
    setGame: function (cfg, st, a) { st.game = a; },
    restart: function (cfg, st, a) {
      st.g[a] = (GAME_INIT[a] || function () { return {}; })(cfg, st);
      st.game = a;
      if (a === 'sprintRestart') { st.prod.sprint = makeState(cfg).prod.sprint; st.prod.mode = 'sprint'; }
      if (a === 'micRestart') { st.prod.mic = makeState(cfg).prod.mic; st.prod.mode = 'mic'; }
      if (a === 'missingRestart') { st.prod.missing = makeState(cfg).prod.missing; st.prod.mode = 'missingpart'; }
    },

    /* 1 masked */
    maskedPick: function (cfg, st, id) {
      var g = gst(cfg, 'masked');
      if (g.answered) return;
      g.answered = true; g.picked = id;
      if (id === cfg.words[g.i].id) { g.score++; SAL.speak(cfg.words[g.i].ttsText); }
    },
    maskedNext: function (cfg, st) {
      var g = gst(cfg, 'masked');
      g.i++; g.answered = false; g.picked = null;
    },
    maskedView: function (cfg, st, a) { gst(cfg, 'masked').view = a; },
    maskedReveal: function (cfg, st, id) {
      var g = gst(cfg, 'masked');
      if (g.revealed[id]) delete g.revealed[id]; else { g.revealed[id] = true; SAL.speak(byId(cfg, id).ttsText); }
    },

    /* 2 flashcards */
    fcFlip: function (cfg, st) { gst(cfg, 'flashcards').flipped = !gst(cfg, 'flashcards').flipped; },
    fcAnswer: function (cfg, st, a) {
      var g = gst(cfg, 'flashcards');
      if (a === '1') g.score++;
      g.i++; g.flipped = false;
      if (g.i >= cfg.words.length) g.finished = true;
    },

    /* 3 gaps */
    gapPick: function (cfg, st, a) {
      var g = gst(cfg, 'gaps');
      if (g.answered) return;
      var w = cfg.words[g.i];
      g.answered = true; g.picked = a;
      if (a === w.gapAnswer) { g.score++; SAL.speak(w.ttsText); }
    },
    gapsNext: function (cfg, st) {
      var g = gst(cfg, 'gaps');
      g.i++; g.answered = false; g.picked = null;
      if (g.i >= cfg.words.length) g.finished = true;
    },

    /* 4 / 5 quizzes */
    quizPick: function (cfg, st, id) {
      var st2 = state(cfg);
      var g = gst(cfg, st2.game);
      if (g.answered) return;
      g.answered = true; g.picked = id;
      if (id === cfg.words[g.i].id) { g.score++; SAL.speak(cfg.words[g.i].ttsText); }
    },
    picquizNext: function (cfg, st) {
      var g = gst(cfg, 'picquiz');
      g.i++; g.answered = false; g.picked = null;
      if (g.i >= cfg.words.length) g.finished = true;
    },
    wordquizNext: function (cfg, st) {
      var g = gst(cfg, 'wordquiz');
      g.i++; g.answered = false; g.picked = null; g.options = null;
      if (g.i >= cfg.words.length) g.finished = true;
    },

    /* 6 / 7 tiles */
    tile: function (cfg, st, a) {
      var g = gst(cfg, st.game);
      var idx = parseInt(a, 10);
      if (st.game === 'match') {
        if (g.matched[g.tiles[idx].id]) return;
        if (g.sel === null) { g.sel = idx; g.wrong = null; return; }
        if (g.sel === idx) { g.sel = null; return; }
        var a1 = g.tiles[g.sel], b1 = g.tiles[idx];
        if (a1.kind !== b1.kind && a1.id === b1.id) {
          g.matched[a1.id] = true; g.score++; g.sel = null; g.wrong = null;
          SAL.speak(byId(cfg, a1.id).ttsText);
        } else {
          g.wrong = [g.sel, idx]; g.sel = null;
        }
      } else { /* memory */
        if (g.lock) return;
        if (g.flipped.indexOf(idx) >= 0 || g.matched[g.cards[idx].id]) return;
        g.flipped.push(idx);
        if (g.flipped.length < 2) return;
        g.moves++;
        var c1 = g.cards[g.flipped[0]], c2 = g.cards[g.flipped[1]];
        if (c1.kind !== c2.kind && c1.id === c2.id) {
          g.matched[c1.id] = true; g.score++; g.flipped = [];
          SAL.speak(byId(cfg, c1.id).ttsText);
        } else {
          g.wrong = g.flipped.slice(); g.lock = true;
          setTimeout(function () {
            var gg = gst(cfg, 'memory');
            gg.flipped = []; gg.wrong = null; gg.lock = false;
            SAL.refresh();
          }, 750);
        }
      }
    },
    matchNext: function (cfg, st) {
      var g = gst(cfg, 'match');
      g.stage++; g.tiles = null; g.sel = null; g.wrong = null;
      if (g.stage >= matchChunks(cfg).length) g.done = true;
    },
    memorySize: function (cfg, st, a) {
      var g = gst(cfg, 'memory');
      var size = parseInt(a, 10) || cfg.words.length;
      st.g.memory = GAME_INIT.memory(cfg, st);
      st.g.memory.size = Math.min(size, cfg.words.length);
    },

    /* 8 / 9 pick one of three (Lesson 1: a wrong pick only costs the first-try point) */
    pick3: function (cfg, st, a) {
      var g = gst(cfg, st.game);
      if (g.answered) return;
      var idx = parseInt(a, 10);
      var isTarget = idx === g.round.wrongIdx;
      var wordId = st.game === 'typo' ? g.round.trio[idx] : g.round.cards[idx].wordId;
      if (!isTarget) {
        /* Clicked a clean card: mark it red, keep the round going (2nd chance) */
        g.firstTry = false;
        g.redIdx = idx;
        SAL.speak(byId(cfg, wordId).ttsText);
        return;
      }
      g.answered = true;
      g.picked = idx;
      g.redIdx = null;
      if (g.firstTry) g.score++;
      SAL.speak(byId(cfg, wordId).ttsText);
    },
    wronglabelNext: function (cfg, st) {
      var g = gst(cfg, 'wronglabel');
      g.i++; g.answered = false; g.picked = null; g.round = null;
      g.firstTry = true; g.redIdx = null;
      if (g.i >= cfg.words.length) g.finished = true;
    },
    typoNext: function (cfg, st) {
      var g = gst(cfg, 'typo');
      g.i++; g.answered = false; g.picked = null; g.round = null;
      g.firstTry = true; g.redIdx = null;
      if (g.i >= cfg.words.length) g.finished = true;
    },

    /* 10 categories */
    catToggle: function (cfg, st, id) {
      var g = gst(cfg, 'categories');
      if (g.checked) return;
      if (g.sel[id]) delete g.sel[id]; else g.sel[id] = true;
    },
    catCheck: function (cfg, st) {
      var g = gst(cfg, 'categories');
      var cat = cfg.categories[g.i];
      var sel = Object.keys(g.sel);
      var right = cat.wordIds.concat(cat.bonusWordIds || []);
      var perfect = sel.length === cat.wordIds.length && sel.every(function (id) { return right.indexOf(id) >= 0; });
      if (perfect) g.score++;
      g.checked = true;
    },
    catNext: function (cfg, st) {
      var g = gst(cfg, 'categories');
      g.i++; g.sel = {}; g.checked = false;
      if (g.i >= cfg.categories.length) g.finished = true;
    },

    /* 11 spelling */
    spellPick: function (cfg, st, a) {
      var g = gst(cfg, 'spelling');
      if (g.answered) return;
      var w = cfg.words[g.i];
      g.answered = true; g.picked = a;
      if (a === w.missingAnswer) { g.score++; SAL.speak(w.ttsText); }
    },
    spellingNext: function (cfg, st) {
      var g = gst(cfg, 'spelling');
      g.i++; g.answered = false; g.picked = null;
      if (g.i >= cfg.words.length) g.finished = true;
    },

    /* 12 true / false */
    tfAnswer: function (cfg, st, a) {
      var g = gst(cfg, 'truefalse');
      if (g.answered) return;
      g.answered = true; g.picked = a;
      var right = g.isTrue ? 'yes' : 'no';
      if (a === right) { g.score++; SAL.speak(cfg.words[g.idx].ttsText); }
    },
    tfNext: function (cfg, st) {
      var g = gst(cfg, 'truefalse');
      g.i++; g.answered = false; g.picked = null;
      var r = prepareTF(cfg);
      g.idx = r.idx; g.isTrue = r.isTrue; g.otherId = r.otherId;
      if (g.i >= cfg.words.length) g.finished = true;
    },

    /* production */
    setProdMode: function (cfg, st, a) {
      stopTimers();
      st.prod.sprint.running = false;
      st.prod.mode = a;
    },

    /* Speed Sprint — manual / auto / slideshow, 4s|3s|2s, card / arrow */
    sprintSub: function (cfg, st, a) {
      stopTimers();
      var p = st.prod.sprint;
      p.subMode = a;
      p.i = 0;
      p.score = a === 'slideshow' ? cfg.words.length : 0;
      p.revealed = false; p.finished = false; p.started = false;
      p.running = false; p.timeLeft = p.duration;
    },
    sprintDur: function (cfg, st, a) {
      stopTimers();
      var p = st.prod.sprint;
      p.duration = parseInt(a, 10) || 4;
      p.timeLeft = p.duration;
      p.running = false;
      if (p.subMode !== 'manual' && p.started && !p.finished && !p.revealed) startSprintTimer(cfg);
    },
    sprintVisual: function (cfg, st, a) { st.prod.sprint.visual = a; },
    sprintBegin: function (cfg, st) {
      st.prod.sprint.started = true;
      startSprintTimer(cfg);
    },
    sprintPause: function (cfg, st) {
      stopTimers();
      st.prod.sprint.running = false;
    },
    sprintReveal: function (cfg, st) {
      stopTimers();
      var p = st.prod.sprint;
      p.running = false; p.started = true; p.revealed = true;
      SAL.speak(cfg.words[p.i].ttsText);
    },
    sprintGrade: function (cfg, st, a) {
      stopTimers();
      var p = st.prod.sprint;
      p.running = false;
      if (a === '1') {
        p.score++;
        st.prod.produced[cfg.words[p.i].id] = true;
      }
      if (p.i + 1 >= cfg.words.length) {
        p.finished = true;
      } else {
        p.i++;
        p.revealed = false;
        p.timeLeft = p.duration;
        if (p.subMode === 'auto' && p.started) startSprintTimer(cfg);
      }
    },
    sprintRestart: function (cfg, st) {
      stopTimers();
      var p = st.prod.sprint;
      p.i = 0;
      p.score = p.subMode === 'slideshow' ? cfg.words.length : 0;
      p.revealed = false; p.finished = false; p.started = false;
      p.running = false; p.timeLeft = p.duration;
      st.prod.mode = 'sprint';
    },

    /* Microphone */
    micStart: function (cfg, st) {
      var m = st.prod.mic;
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) { m.revealed = true; SAL.speak(cfg.words[m.i].ttsText); return; }
      try {
        var rec = new SR();
        rec.lang = 'sa-IN';
        rec.interimResults = false;
        rec.maxAlternatives = 3;
        m.listening = true;
        rec.onresult = function (ev) {
          var alts = [];
          for (var i = 0; i < ev.results[0].length; i++) alts.push(ev.results[0][i].transcript);
          m.transcript = alts.join(' / ');
          var w = cfg.words[m.i];
          var target = normalize(w.iast);
          var hit = alts.some(function (t) {
            var n = normalize(t);
            return n === target || n.indexOf(target) >= 0 || (target.length > 4 && n.indexOf(target.slice(0, target.length - 1)) >= 0);
          });
          m.result = hit ? 'ok' : 'no';
          m.listening = false;
          m.revealed = true;
          SAL.refresh();
        };
        rec.onerror = function () { m.listening = false; SAL.refresh(); };
        rec.onend = function () { m.listening = false; SAL.refresh(); };
        rec.start();
      } catch (e) { m.listening = false; m.revealed = true; }
    },
    micReveal: function (cfg, st) {
      var m = st.prod.mic;
      m.revealed = true;
      SAL.speak(cfg.words[m.i].ttsText);
    },
    micGrade: function (cfg, st, a) {
      var m = st.prod.mic;
      if (a === '1') { m.score++; st.prod.produced[cfg.words[m.i].id] = true; }
      m.transcript = ''; m.result = null; m.listening = false; m.revealed = false;
      m.i++;
      if (m.i >= cfg.words.length) m.finished = true;
    },
    micRestart: function (cfg, st) {
      st.prod.mic = { i: 0, score: 0, listening: false, revealed: false, transcript: '', result: null, finished: false };
      st.prod.mode = 'mic';
    },

    /* What Is Missing? */
    missingReveal: function (cfg, st) {
      var all = allPinsOf(cfg);
      st.prod.missing.revealed = true;
      SAL.speak(byId(cfg, all[st.prod.missing.i].pin.id).ttsText);
    },
    missingGrade: function (cfg, st, a) {
      var m = st.prod.missing;
      var all = allPinsOf(cfg);
      if (a === '1') { m.score++; st.prod.produced[all[m.i].pin.id] = true; }
      if (m.i + 1 >= all.length) m.finished = true;
      else { m.i++; m.revealed = false; }
    },
    missingRestart: function (cfg, st) {
      st.prod.missing = { order: null, i: 0, score: 0, revealed: false, finished: false };
      st.prod.mode = 'missingpart';
    },

    /* TPR chant & checklist */
    chantWord: function (cfg, st, id) { st.prod.active = id; SAL.speak(byId(cfg, id).ttsText); },
    chantReverse: function (cfg, st) { st.prod.chantReverse = !st.prod.chantReverse; },
    chantReset: function (cfg, st) {
      stopTimers();
      st.prod.produced = {};
    },
    chantPlay: function (cfg, st) {
      if (timers.chant) { stopTimers(); return; }
      var order = orderedByPins(cfg);
      if (st.prod.chantReverse) order = order.slice().reverse();
      var i = 0;
      var tick = function () {
        var id = order[i % order.length];
        st.prod.active = id;
        SAL.speak(byId(cfg, id).ttsText);
        SAL.refresh();
        i++;
      };
      tick();
      timers.chant = setInterval(tick, 1600);
    },

    produced: function (cfg, st, id) {
      if (st.prod.produced[id]) delete st.prod.produced[id]; else st.prod.produced[id] = true;
    }
  };

  SAL.do = function (key, action, a, b) {
    var cfg = lessons[key];
    if (!cfg) return;
    var fn = ACTIONS[action];
    if (!fn) return;
    fn(cfg, state(cfg), a, b);
    if (action !== 'speak') SAL.refresh();
  };

  /* ------------------------------------------------------------- public API */
  SAL.toggleIast = function () {
    if (typeof toggleIast === 'function') {
      toggleIast();
      if (typeof refreshLesson1 === 'function') refreshLesson1();
    } else if (typeof iastHidden !== 'undefined') {
      /* fallback (should not happen while lesson1.js is loaded) */
      document.body.classList.toggle('hide-iast', iastHidden);
    }
    SAL.refresh();
    syncIastButtons();
  };

  function syncIastButtons() {
    var label = iastOn() ? ru('Disable IAST', 'Отключить IAST') : ru('Enable IAST', 'Включить IAST');
    document.querySelectorAll('.toggle-iast-btn').forEach(function (btn) {
      btn.innerHTML = '🔤 ' + label;
      btn.classList.toggle('active', iastOn());
    });
  }

  SAL.toggleGuide = function (key, stageKey) {
    var box = document.getElementById(key + '-tg-' + stageKey);
    var btn = document.getElementById(key + '-tgb-' + stageKey);
    if (!box) return;
    var open = box.classList.toggle('open');
    if (btn) btn.classList.toggle('active', open);
  };

  SAL.refresh = function () {
    var cfg = lessons[activeKey];
    if (!cfg) return;
    renderPres(cfg);
    renderPractice(cfg);
    renderProd(cfg);
    syncIastButtons();
  };

  SAL.openLesson = function (key) {
    var cfg = lessons[key];
    if (!cfg) return;
    activeKey = key;
    stopTimers();
    var pane = document.getElementById('view-lesson' + cfg.num);
    if (pane && pane.getAttribute('data-built') !== '1') {
      pane.setAttribute('data-built', '1');
      pane.innerHTML = skeletonHtml(cfg);
    }
    if (typeof switchView === 'function') switchView('lesson' + cfg.num);
    SAL.refresh();
  };

  /* keep the engine in sync when the site language switches (app.js calls this) */
  SAL.refreshOnLangChange = function () {
    SAL.refresh();
  };

  document.addEventListener('DOMContentLoaded', function () {
    Object.keys(lessons).forEach(function (k) {
      var pane = document.getElementById('view-lesson' + lessons[k].num);
      if (pane && pane.getAttribute('data-built') !== '1') {
        pane.setAttribute('data-built', '1');
        pane.innerHTML = skeletonHtml(lessons[k]);
      }
    });
    syncIastButtons();
    SAL.refresh();
  });
})();
