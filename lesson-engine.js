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
  var timers = { sprint: null, chant: null, extra: null };

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
    if (!text) return;
    /* lesson1.js owns the shared audio helper: it shows a "🔊 word" toast and
       explains when the browser has no speech synthesis at all. */
    if (typeof window.speakSanskritWord === 'function') {
      window.speakSanskritWord(text);
      return;
    }
    try {
      if (!window.speechSynthesis) return;
      /* хинди-движок «съедает» конечную короткую а — см. sanskritTtsText в lesson1.js */
      var spoken = typeof window.sanskritTtsText === 'function' ? window.sanskritTtsText(text) : text;
      var u = new SpeechSynthesisUtterance(spoken);
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
        revealed: {}, heard: {}, audioRevealed: {}, hotspotId: cfg.words[0].id,
        discoveryOpen: false,
        translationsShown: false
      },
      game: 'masked',
      players: 1,
      teacherKey: false,
      pile: loadPile(cfg),
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
        /* Sprint across several lessons at once (declared by cfg.unionSprint) */
        union: {
          duration: 4,      /* 4 | 3 | 2 seconds per picture */
          visual: 'card',   /* 'card' (isolated picture) | 'arrow' (arrow on the diagram) */
          random: false,    /* lesson order (1 -> 2) or shuffled */
          order: null, i: 0, score: 0, wrong: [],
          timeLeft: 4, elapsed: 0,
          running: false, started: false, revealed: false, finished: false
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

  /* ------------------------------------------------ mistake pile ("Повтор") */
  /* Every wrong answer anywhere in the lesson drops that word into a pile kept
     in localStorage; the extra game "retry" then drills the pile until each
     word has been answered right twice in a row. */
  function pileKey(cfg) { return 'sal-pile-' + cfg.key; }
  function loadPile(cfg) {
    try {
      var raw = window.localStorage ? window.localStorage.getItem(pileKey(cfg)) : null;
      return raw ? (JSON.parse(raw) || {}) : {};
    } catch (e) { return {}; }
  }
  function savePile(cfg) {
    try {
      if (window.localStorage) window.localStorage.setItem(pileKey(cfg), JSON.stringify(state(cfg).pile || {}));
    } catch (e) { /* storage unavailable */ }
  }
  function noteWrong(cfg, id) {
    if (!id) return;
    var st = state(cfg);
    if (!st.pile) st.pile = {};
    st.pile[id] = (st.pile[id] || 0) + 1;
    savePile(cfg);
  }
  function pileIds(cfg) {
    var st = state(cfg);
    return cfg.words.map(function (w) { return w.id; })
      .filter(function (id) { return st.pile && st.pile[id]; });
  }
  function pileDrop(cfg, id) {
    var st = state(cfg);
    if (st.pile) delete st.pile[id];
    savePile(cfg);
  }
  function pileClear(cfg) { state(cfg).pile = {}; savePile(cfg); }

  /* ------------------------------------------------------- tiny html pieces */
  /* The TPR gesture of the lesson: touching a body part, clapping N times, ...
     each lesson can define its own in gestureRu / gestureEn. A lesson whose
     words cannot be shown on the body (colours) passes '' — then every prompt
     simply drops the gesture instead of saying something impossible. */
  function gestureText(cfg, lang) {
    if (cfg.gestureRu === '' || cfg.gestureEn === '') return '';
    return lang === 'ru'
      ? (cfg.gestureRu || 'коснитесь этой части тела у себя')
      : (cfg.gestureEn || 'touch that part of your body');
  }
  function gesture(cfg) {
    return gestureText(cfg, L());
  }

  function iastSpan(s) {
    return '<span class="iast-text"> (' + s + ')</span>';
  }
  function devaLabel(w, size) {
    return '<div class="vocab-deva"' + (size ? ' style="font-size:' + size + '"' : '') + '>' + w.deva + '</div>';
  }
  /* --------------------------------------------------------------- masked word */
  /* Закрытая часть слова (игра «Закрыто квадратом»). По умолчанию закрыт
     только конец существительного: w.maskedPrefix + w.maskedHidden.

     Вторая версия игры (both) закрывает ещё и последнюю акшару
     прилагательного: श्यामं ललाटम् → श्या ■ लला ■. Тогда ученик
     восстанавливает оба окончания и видит главное правило урока — цвет
     кончается так же, как слово. Ничего не выдумываем: обе части режутся
     по уже существующим w.syll и w.maskedPrefix. */
  function adjCut(w) {
    if (w && w._adjCut !== undefined) return w._adjCut;
    if (!w) return -1;
    w._adjCut = -1;
    if (!w.syll || !w.syll.length || !w.deva || w.deva.indexOf(' ') < 0) return w._adjCut;
    var first = w.deva.split(' ')[0], acc = '';
    for (var i = 0; i < w.syll.length; i++) {
      acc += w.syll[i];
      if (acc === first) { w._adjCut = i; break; }     /* индекс последней акшары прилагательного */
      if (acc.length > first.length) break;
    }
    return w._adjCut;
  }
  function hasBothMask(cfg) {
    if (!cfg || !cfg.words || !cfg.words.length) return false;
    return cfg.words.every(function (w) { return adjCut(w) >= 1; });
  }
  function maskedParts(w, both) {
    if (!both) return [{ t: w.maskedPrefix }, { m: w.maskedHidden }];
    var cut = adjCut(w);
    if (cut < 1) return [{ t: w.maskedPrefix }, { m: w.maskedHidden }];
    var sp = w.maskedPrefix.lastIndexOf(' ');
    return [
      { t: w.syll.slice(0, cut).join('') },
      { m: w.syll[cut] },
      /* неразрывный пробел: обычный схлопнулся бы между флекс-элементами */
      { t: '\u00A0' + w.maskedPrefix.slice(sp + 1) },
      { m: w.maskedHidden }
    ];
  }
  /* ряд «Версия: 1 · … / 2 · …» — одинаковый у обеих игр с двумя версиями */
  function verRow(cfg, action, both) {
    return '<div class="game-ver-row">' +
        '<span class="game-ver-label">' + ru('Version:', 'Версия:') + '</span>' +
        chip(cfg, action, '0', ru('1 · noun ending', '1 · конец слова'), !both) +
        chip(cfg, action, '1', ru('2 · both endings', '2 · оба окончания'), both) +
      '</div>';
  }
  function bothHint(cfg) {
    return '<div class="game-both-hint">' +
      ru('Agreement: say both endings aloud — the colour ends the same way as the noun.',
         'Согласование: назовите вслух оба окончания — цвет кончается так же, как слово.') + '</div>';
  }
  /* IAST раскладывается на те же акшары, что и деванагари в w.syll: группа
     кончается на гласную (анусвара и висарга прилипают к своей гласной).
     Нужно, чтобы закрыть в IAST ровно тот слог, что закрыт в деванагари. */
  function iastGroups(word) {
    var LONG = 'āīūṛṝḷeo', SHORT = 'aiu', out = [], cur = '';
    for (var i = 0; i < word.length; i++) {
      var ch = word[i];
      cur += ch;
      var isVowel = LONG.indexOf(ch) >= 0;
      if (SHORT.indexOf(ch) >= 0) {
        /* дифтонги ai / au пишутся двумя буквами, но это один слог */
        if (ch === 'a' && i + 1 < word.length && 'iu'.indexOf(word[i + 1]) >= 0) {
          cur += word[++i];
        }
        isVowel = true;
      }
      if (isVowel) {
        /* анусвара и висарга идут сразу после гласной */
        while (i + 1 < word.length && 'ṃḥ'.indexOf(word[i + 1]) >= 0) { cur += word[++i]; }
        out.push(cur);
        cur = '';
      }
    }
    if (cur) out.push(cur);
    /* конечный согласный (как в -tam) закрывает слог, а не образует новый:
       в деванагари तम् — одна акшара, и здесь должно быть так же */
    var VOW_ALL = LONG + SHORT;
    if (out.length > 1) {
      var last = out[out.length - 1], hasVowel = false;
      for (var k = 0; k < last.length; k++) if (VOW_ALL.indexOf(last[k]) >= 0) hasVowel = true;
      if (!hasVowel) { out[out.length - 2] += out.pop(); }
    }
    return out;
  }
  /* Пропуски, версия 2: закрыт и конец прилагательного.
     श्यामं ललाट_ → श्या_ ललाट_. Ответ остаётся один и тот же (w.gapAnswer):
     окончание у цвета и у слова общее, поэтому оба пропуска берут его. */
  function gapBothDeva(w) {
    var cut = adjCut(w);
    if (cut < 1) return null;
    var parts = w.gapDeva.split(' ');
    if (parts.length < 2) return null;
    var noun = parts[parts.length - 1].replace(/_+$/, '');
    return w.syll.slice(0, cut).join('') + '_ ' + noun + '_';
  }
  function gapBothIast(w) {
    var cut = adjCut(w);
    if (cut < 1 || !w.gapIast) return null;
    var parts = w.gapIast.split(' ');
    if (parts.length < 2) return null;
    var adj = iastGroups(parts[0]);
    var noun = parts[parts.length - 1];
    if (adj.length !== cut + 1) return null;      /* раскладка не совпала — не рискуем */
    return adj.slice(0, cut).join('') + '_ ' + noun;
  }
  /* Названия категорий в данных лежат как titleRu/titleEn, а tx() ждёт ru/en —
     из-за этого заголовок категории рисовался пустым. */
  function catTitle(cat) {
    if (!cat) return '';
    return tx({ ru: cat.ru || cat.titleRu || '', en: cat.en || cat.titleEn || '' });
  }
  /* «Слово без окончания» для игры «Категории»: у прилагательного отпадает ं/ः/ा,
     у существительного — ः или म्. Женское ा — конец основы, окончание нулевое,
     поэтому जिह्वा остаётся जिह्वा: выдуманных форм не показываем. */
  function bareWord(w) {
    if (!w || !w.deva || !w.iast) return null;
    var dp = w.deva.split(' '), ip = w.iast.split(' ');
    if (dp.length !== 2 || ip.length !== 2) return null;
    /* у прилагательного в среднем роде пишут и ं, и म् (श्यामं / श्वेतम्) */
    var adj = { deva: dp[0].replace(/म्$/, '').replace(/[ःंा]$/, ''),
                iast: ip[0].replace(/[ḥṃm]$/, '').replace(/ā$/, '') };
    var noun = { deva: dp[1], iast: ip[1] };
    if (/ः$/.test(noun.deva)) { noun.deva = noun.deva.slice(0, -1); noun.iast = noun.iast.replace(/ḥ$/, ''); }
    else if (/म्$/.test(noun.deva)) { noun.deva = noun.deva.slice(0, -2); noun.iast = noun.iast.replace(/m$/, ''); }
    if (!adj.deva || !noun.deva || !adj.iast || !noun.iast) return null;
    return { deva: adj.deva + ' ' + noun.deva, iast: adj.iast + ' ' + noun.iast };
  }
  /* кнопка «без окончаний» нужна там, где окончание выдаёт род */
  function canBareWords(cfg) {
    return !!(cfg && cfg.words && cfg.words.length && cfg.words.every(function (w) { return !!w.gender; }));
  }
  function maskedMarkup(w, revealed, size, both) {
    var parts = maskedParts(w, both);
    return '<div class="masked-word-line"' + (size ? ' style="font-size:' + size + '"' : '') + '>' +
      parts.map(function (p) {
        if (p.m === undefined) return '<span class="masked-part">' + p.t + '</span>';
        return '<span class="pink-mask-square' + (revealed ? ' revealed' : '') + '">' +
          (revealed ? p.m : '■') + '</span>';
      }).join('') + '</div>';
  }
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  /* memory board shape: rows are lettered a, b, c... and columns numbered 1, 2, 3...
     so a face-down card can be named aloud, e.g. "b2" */
  function memoryCols(n) {
    if (n <= 6) return 3;
    /* 9 карточек (половина пар + ловушка) — ровный квадрат 3 × 3 */
    if (n <= 9 && n % 3 === 0) return 3;
    if (n <= 16) return 4;
    return 6;
  }
  function cellName(idx, cols) {
    return LETTERS[Math.floor(idx / cols)].toLowerCase() + ((idx % cols) + 1);
  }
  function letterBadge(i) {
    return '<span class="opt-letter">' + LETTERS[i] + '</span>';
  }
  function optBtn(cfg, action, value, html, cls, letter) {
    return '<button type="button" class="quiz-opt-btn ' + (cls || '') + '" onclick="SAL.do(\'' + cfg.key +
      '\',\'' + action + '\',\'' + value + '\')">' +
      (typeof letter === 'number' ? letterBadge(letter) : '') + html + '</button>';
  }

  /* ------------------------------------------------------------ порядок вариантов
     «Пропуски» и «Буквы» брали варианты из данных как есть, а данные во всех
     уроках перечисляют верный ответ первым — значит, верный ответ всегда был A,
     и угадать было нетрудно. Теперь порядок перемешивается один раз на слово и
     запоминается в состоянии игры: при перерисовке (нажали, ошиблись, вернулись)
     варианты не прыгают, а после «↺» тасуются заново, потому что состояние игры
     создаётся с нуля.

     Повтор подряд не запрещаем наглухо: если верный ответ снова попал на ту же
     позицию, что у предыдущего слова, в большинстве случаев тасуем ещё раз, но
     иногда оставляем. Строгий запрет давал другую крайность — в коротком уроке
     буквы шли строго по очереди (A, D, A, D…), и это тоже узор. */
  function optionOrder(cfg, game, w, list, keyOf, correct) {
    var g = gst(cfg, game);
    if (!g.orders) g.orders = {};
    var memo = g.orders[w.id];
    if (memo && memo.length === list.length) return memo;
    var n = list.length;
    var perm = [];
    for (var i = 0; i < n; i++) perm.push(i);
    if (n < 2) { g.orders[w.id] = perm; return perm; }
    for (var attempt = 0; attempt < 10; attempt++) {
      perm = shuffle(perm);
      var pos = -1;
      for (var k = 0; k < n; k++) {
        if (keyOf(list[perm[k]]) === correct) { pos = k; break; }
      }
      if (pos !== g.lastPos || Math.random() < 0.3) { g.lastPos = pos; break; }
    }
    g.orders[w.id] = perm;
    return perm;
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
      '<div style="margin-top:0.55rem;font-size:1rem;color:var(--accent-cambridge);font-weight:800;">' +
      (total ? Math.round((score / total) * 100) : 0) + '%</div>' +
      '<div style="margin-top:1.15rem;">' +
      '<button type="button" class="btn btn-primary" onclick="SAL.do(\'' + cfg.key + '\',\'restart\',\'' + game + '\')">' +
      ru('↺ Start Over', '↺ Начать сначала') + '</button></div></div>'
    );
  }

  /* =========================================================================
     SKELETON (built once per lesson pane)
     ========================================================================= */
  /* One dropdown for every lesson instead of a row of buttons: the row ran out
     of space as soon as the fifth lesson arrived. */
  var NAV_LABELS = {
    L2: { ru: 'Урок 1: Тело', en: 'Lesson 1: Body' },
    L3: { ru: 'Урок 2: Лицо', en: 'Lesson 2: Face' },
    LC: { ru: 'Урок 3: Цвета', en: 'Lesson 3: Colours' },
    LC2: { ru: 'Урок 4: Ещё цвета', en: 'Lesson 4: More Colours' },
    LG: { ru: 'Урок 5: Три рода', en: 'Lesson 5: Three Genders' },
    lesson6: { ru: 'Урок 6: Части тела (12)', en: 'Lesson 6: Body Parts (12)' },
    L4: { ru: 'Урок 7: Цифры 1–5', en: 'Lesson 7: Numbers 1–5' },
    L5: { ru: 'Урок 8: Цифры 6–10', en: 'Lesson 8: Numbers 6–10' },
    L6: { ru: 'Урок 9: Цифры 11–15', en: 'Lesson 9: Numbers 11–15' },
    L7: { ru: 'Урок 10: Цифры 16–20', en: 'Lesson 10: Numbers 16–20' },
    L8: { ru: 'Урок 11: Десятки 10–50', en: 'Lesson 11: Tens 10–50' },
    L9: { ru: 'Урок 12: Десятки 60–100', en: 'Lesson 12: Tens 60–100' }
  };
  /* every lesson of the site in one list: the engine lessons + the standalone 12-word one */
  function navRows() {
    /* hidden: true — служебные конфигурации (например, блоки повторения
       урока 4, у которых своя вёрстка): они нужны движку, но не списку */
    var rows = Object.keys(lessons).filter(function (k) { return !lessons[k].hidden; }).map(function (k) {
      var c = lessons[k], lab = NAV_LABELS[k];
      return { v: k, num: c.num,
               ru: lab ? lab.ru : ('Урок ' + c.num + ': ' + c.titleRu),
               en: lab ? lab.en : ('Lesson ' + c.num + ': ' + c.titleEn) };
    });
    rows.push({ v: 'lesson6', num: 6, ru: NAV_LABELS.lesson6.ru, en: NAV_LABELS.lesson6.en });
    rows.sort(function (a, b) { return a.num - b.num; });
    return rows;
  }
  /* current = the lesson this nav bar belongs to ('lesson5' for the 12-word lesson) */
  function navSelectHtml(current) {
    var opts = navRows().map(function (r) {
      return '<option value="' + r.v + '"' + (r.v === current ? ' selected' : '') +
        ' data-i18n-ru="' + r.ru + '" data-i18n-en="' + r.en + '">' + (L() === 'ru' ? r.ru : r.en) + '</option>';
    }).join('');
    return '<label class="lesson-nav-label" for="lesson-nav-' + current + '"' +
        ' data-i18n-ru="Выбрать номер урока:" data-i18n-en="Choose a lesson:">' +
        ru('Choose a lesson:', 'Выбрать номер урока:') + '</label>' +
      '<select id="lesson-nav-' + current + '" class="lesson-select" onchange="SAL.gotoLesson(this.value)"' +
        ' aria-label="Выбрать номер урока / Choose a lesson" title="Выбрать номер урока / Choose a lesson"' +
        ' data-i18n-aria-ru="Выбрать номер урока" data-i18n-aria-en="Choose a lesson"' +
        ' data-i18n-title-ru="Выбрать номер урока" data-i18n-title-en="Choose a lesson">' +
        opts + '</select>';
  }
  /* «← Предыдущий урок / Следующий урок →» — кнопки в самом низу страницы
     урока. Порядок берём из того же списка navRows(), что и выпадающее меню:
     один источник правды, поэтому кнопки не разъедутся с номерами уроков. */
  function lessonPagerHtml(current) {
    var rows = navRows(), at = -1, i;
    for (i = 0; i < rows.length; i++) if (rows[i].v === current) { at = i; break; }
    if (at < 0) return '';
    var prev = at > 0 ? rows[at - 1] : null;
    var next = at < rows.length - 1 ? rows[at + 1] : null;
    function btn(r, dir) {
      if (!r) return '<span class="lesson-pager-slot"></span>';
      var name = L() === 'ru' ? r.ru : r.en;
      var cap = dir === 'prev'
        ? ru('← Previous lesson', '← Предыдущий урок')
        : ru('Next lesson →', 'Следующий урок →');
      return '<button type="button" class="lesson-pager-btn ' + dir + '"' +
        ' onclick="SAL.gotoLesson(\'' + r.v + '\')"' +
        ' data-goto="' + r.v + '" title="' + attrSafe(cap + ': ' + name) + '">' +
        '<span class="lesson-pager-cap">' + cap + '</span>' +
        '<span class="lesson-pager-name">' + name + '</span></button>';
    }
    return '<div class="container lesson-pager-inner">' + btn(prev, 'prev') + btn(next, 'next') + '</div>';
  }
  function lessonPagerSlot(current) {
    return '<div class="lesson-pager" data-lesson-pager="' + current + '"></div>';
  }
  /* слоты перерисовываются в текущем языке: refresh() зовётся после смены языка */
  function fillLessonPagers() {
    var slots = document.querySelectorAll('[data-lesson-pager]');
    for (var i = 0; i < slots.length; i++) {
      var key = slots[i].getAttribute('data-lesson-pager');
      var html = lessonPagerHtml(key);
      if (slots[i].innerHTML !== html) slots[i].innerHTML = html;
    }
  }
  SAL.lessonPagerHtml = lessonPagerHtml;

  /* the standalone 12-word lesson keeps its nav bar in index.html — fill that slot */
  function fillNavSlots() {
    var slots = document.querySelectorAll('[data-lesson-nav]');
    for (var i = 0; i < slots.length; i++) {
      if (slots[i].getAttribute('data-filled') === '1') continue;
      slots[i].innerHTML = navSelectHtml('lesson6');
      slots[i].setAttribute('data-filled', '1');
    }
  }

  function navBarHtml(cfg) {
    return '' +
      '<div class="ppp-nav-bar"><div class="container ppp-top-row">' +
        '<div style="display:inline-flex;align-items:center;gap:0.4rem;flex-wrap:nowrap;white-space:nowrap;">' +
          '<button type="button" class="chip-btn" style="padding:0.28rem 0.65rem;font-size:0.78rem;" onclick="switchView(\'home\')"' +
            ' data-i18n-ru="← На главную" data-i18n-en="← Home">← ' + ru('Home', 'На главную') + '</button>' +
          navSelectHtml(cfg.key) +
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

  function tgBox(cfg, stageKey, titleRu, titleEn, steps, preface) {
    var items = steps.map(function (s) {
      return '<div class="teacher-guide-step" data-i18n-ru="' + s[0] + '" data-i18n-en="' + s[1] + '">' +
        (L() === 'ru' ? s[0] : s[1]) + '</div>';
    }).join('');
    return '' +
      '<div id="' + cfg.key + '-tg-' + stageKey + '" class="teacher-guide-box">' +
        '<div class="teacher-guide-header"><h3' +
          ' data-i18n-ru="' + attrSafe(titleRu) + '" data-i18n-en="' + attrSafe(titleEn) + '">' +
          (L() === 'ru' ? titleRu : titleEn) + '</h3>' +
          '<button type="button" class="chip-btn" onclick="SAL.toggleGuide(\'' + cfg.key + '\',\'' + stageKey + '\')"' +
            ' data-i18n-ru="✕ Закрыть" data-i18n-en="✕ Close">✕ ' + ru('Close', 'Закрыть') + '</button>' +
        '</div><div class="teacher-guide-grid">' + (preface || '') + items + '</div></div>';
  }

  /* =========================================================================
     Ц Е Л И   У Р О К А  ·  CELTA / DELTA
     -------------------------------------------------------------------------
     Главная цель (main aim) формулируется от языкового материала и контекста:
       systems-урок → To introduce / clarify / practise + материал + in the context of …
     Подцели (subsidiary aims) берутся из «другой половины»: в vocabulary-уроке
     это навык — произношение, чтение (scanning), слушание, устная речь.
     Данные урока: aim: { ru: { main, subs: [] }, en: { main, subs: [] } }.
     Плашка стоит под описанием урока, те же цели первым блоком — в инструкции
     преподавателя. Текст переводится через data-i18n-* вместе с интерфейсом.
     ========================================================================= */
  function aimEsc(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  /* пара ru/en на одном элементе: язык переключается без перерисовки урока */
  function aimPair(ruText, enText, tag, cls) {
    return '<' + tag + (cls ? ' class="' + cls + '"' : '') +
      ' data-i18n-ru="' + aimEsc(ruText) + '" data-i18n-en="' + aimEsc(enText) + '">' +
      aimEsc(L() === 'ru' ? ruText : enText) + '</' + tag + '>';
  }
  function aimHtml(cfg) {
    var a = cfg && cfg.aim;
    if (!a || !a.ru || !a.en) return '';
    var n = Math.min(a.ru.subs.length, a.en.subs.length);
    var subs = '';
    for (var i = 0; i < n; i++) subs += aimPair(a.ru.subs[i], a.en.subs[i], 'li');
    return '<div class="lesson-aim" id="' + cfg.key + '-lesson-aim">' +
      '<div class="lesson-aim-head">' +
        aimPair('🎯 Цель урока', '🎯 Lesson aim', 'span', 'lesson-aim-badge') +
        aimPair('Системный урок · лексика (Vocabulary)', 'Systems lesson · Vocabulary', 'span', 'lesson-aim-type') +
      '</div>' +
      aimPair(a.ru.main, a.en.main, 'p', 'lesson-aim-main') +
      aimPair('Подцели (subsidiary aims)', 'Subsidiary aims', 'div', 'lesson-aim-subtitle') +
      '<ul class="lesson-aim-subs">' + subs + '</ul>' +
      '</div>';
  }
  /* те же цели — первой строкой в инструкции преподавателя */
  function aimGuideHtml(cfg) {
    var a = cfg && cfg.aim;
    if (!a || !a.ru || !a.en) return '';
    var n = Math.min(a.ru.subs.length, a.en.subs.length);
    var rs = [], es = [];
    for (var i = 0; i < n; i++) { rs.push(a.ru.subs[i]); es.push(a.en.subs[i]); }
    var ruHtml = '<strong>🎯 Цель урока (main aim):</strong> ' + aimEsc(a.ru.main) +
      '<br/><strong>Подцели (subsidiary aims):</strong> ' + aimEsc(rs.join(' · '));
    var enHtml = '<strong>🎯 Lesson aim (main aim):</strong> ' + aimEsc(a.en.main) +
      '<br/><strong>Subsidiary aims:</strong> ' + aimEsc(es.join(' · '));
    return '<div class="teacher-guide-step teacher-guide-aim" data-i18n-ru="' + ruHtml +
      '" data-i18n-en="' + enHtml + '">' + (L() === 'ru' ? ruHtml : enHtml) + '</div>';
  }

  /* ==========================================================================
     РЕЖИМ «2 УЧЕНИКА»
     --------------------------------------------------------------------------
     Двух учеников поддерживают не все игры: базовые memory и match плюс те,
     что регистрируются из games-extra.js через SAL.addDuoGame(key). Для
     остальных переключатель 👥 не показывается — иначе кнопка обещает режим,
     которого в игре нет (а setPlayers ещё и стирал прогресс).
     ========================================================================== */
  var DUO_GAMES = { memory: true, match: true };
  SAL.addDuoGame = function (k) { if (k) DUO_GAMES[k] = true; };
  SAL.isDuoGame = function (k) { return !!DUO_GAMES[k]; };
  SAL.duoGames = function () { return Object.keys(DUO_GAMES); };

  /* счёт на двоих: «1 — n 2 — n Ход: 1» */
  function duoScorePills(g) {
    return pill('1 — ' + (g.scores && g.scores[0] || 0)) + ' ' +
      pill('2 — ' + (g.scores && g.scores[1] || 0)) + ' ' +
      pill(ru('Turn', 'Ход') + ': ' + ((g.turn || 0) + 1));
  }
  /* ход переходит другому; при верном ответе по умолчанию остаётся у игрока */
  function duoSwap(g) { g.turn = g.turn ? 0 : 1; }
  function duoAward(g, i) {
    if (!g.scores) g.scores = [0, 0];
    g.scores[i] = (g.scores[i] || 0) + 1;
  }

  /* Who is playing (one student / a pair) and the teacher answer key */
  function extraBarHtml(cfg) {
    var st = state(cfg);
    return '<div class="practice-extra-bar">' +
      '<span class="game-score-pill" data-i18n-ru="Кто играет" data-i18n-en="Who plays">' +
        tx({ ru: 'Кто играет', en: 'Who plays' }) + '</span>' +
      '<span class="players-toggle" id="' + cfg.key + '-players-toggle">' +
        '<button type="button" class="chip-btn' + (st.players === 1 ? ' active' : '') + '" data-players="1"' +
          ' data-i18n-ru="👤 1 ученик" data-i18n-en="👤 1 student"' +
          ' onclick="SAL.do(\'' + cfg.key + '\',\'setPlayers\',\'1\')">👤 ' +
          tx({ ru: '1 ученик', en: '1 student' }) + '</button>' +
        '<button type="button" class="chip-btn' + (st.players === 2 ? ' active' : '') + '" data-players="2"' +
          ' data-i18n-ru="👥 2 ученика" data-i18n-en="👥 2 students"' +
          ' onclick="SAL.do(\'' + cfg.key + '\',\'setPlayers\',\'2\')">👥 ' +
          tx({ ru: '2 ученика', en: '2 students' }) + '</button>' +
      '</span>' +
      '<span class="practice-extra-note solo-note" id="' + cfg.key + '-solo-note"' +
        ' data-i18n-ru="👤 Эта игра — для одного ученика."' +
        ' data-i18n-en="👤 This game is for one student.">' +
        tx({ ru: '👤 Эта игра — для одного ученика.', en: '👤 This game is for one student.' }) + '</span>' +
      '<button type="button" class="chip-btn' + (st.teacherKey ? ' active' : '') + '" data-key="1"' +
        ' data-i18n-ru="🔑 Ключ учителя" data-i18n-en="🔑 Answer key"' +
        ' onclick="SAL.do(\'' + cfg.key + '\',\'toggleKey\')">🔑 ' +
        tx({ ru: 'Ключ учителя', en: 'Answer key' }) + '</button>' +
      '<span class="practice-extra-note" data-i18n-ru="🔑 показывает ответ: ученик-«учитель» проверяет напарника. 👥 есть только у парных игр — там ход передаётся по очереди; у остальных кнопки нет."' +
        ' data-i18n-en="🔑 reveals the answer so the student acting as teacher can check a partner. 👥 appears only in pair games, where turns alternate; solo games show no toggle.">' +
        tx({ ru: '🔑 показывает ответ: ученик-«учитель» проверяет напарника. 👥 есть только у парных игр — там ход передаётся по очереди; у остальных кнопки нет.',
             en: '🔑 reveals the answer so the student acting as teacher can check a partner. 👥 appears only in pair games, where turns alternate; solo games show no toggle.' }) +
      '</span></div>';
  }

  /* =========================================================================
     RECYCLING BLOCK — a lesson may declare
       recycle:  { words, categories, hotspots, titleRu/En, descRu/En }
       recycle2: { … то же самое для второго блока … }
     — extra sets of tasks inside the SAME Practice and Production stages,
     built from the vocabulary of earlier lessons (Lesson 4 · new colours +
     body parts: पाटल-मुख, कपिश-हस्त … и цвета урока 3). The games are exactly
     the same; only the word list changes. Each block keeps its state in its own
     shim config (`<key>RC` / `<key>RC2`) so the main lesson never loses scores.
     ========================================================================= */
  var recycleShims = {};
  var RECYCLE_KEYS = ['recycle', 'recycle2'];

  /* ключ служебной конфигурации блока: LCRC, LC2RC, LC2RC2 … */
  function recycleShimKey(cfg, idx) { return cfg.key + (idx ? 'RC2' : 'RC'); }

  /* номер блока приходит из onclick строкой ('0' / '1') — нормализуем его */
  function recycleIndex(v) { return (v === 1 || v === '1') ? 1 : 0; }

  function recycleOf(cfg, idx) {
    var i = recycleIndex(idx);
    var rc = cfg ? cfg[RECYCLE_KEYS[i]] : null;
    if (!rc) return null;
    var shimKey = recycleShimKey(cfg, i);
    if (!recycleShims[shimKey]) {
      recycleShims[shimKey] = {
        key: shimKey, num: cfg.num, hidden: true, _recycleOf: cfg.key, _recycleIdx: i,
        titleDeva: rc.titleDeva || cfg.titleDeva,
        titleRu: rc.titleRu, titleEn: rc.titleEn,
        /* свой жест и свой заголовок Production: у компаунда это часть тела */
        gestureRu: rc.gestureRu, gestureEn: rc.gestureEn,
        prodTitleRu: rc.prodTitleRu, prodTitleEn: rc.prodTitleEn,
        words: rc.words, decoys: rc.decoys || [],
        categories: rc.categories || [], groups: rc.groups || [],
        steps: rc.steps || [], hotspots: rc.hotspots
      };
    }
    return recycleShims[shimKey];
  }
  /* все блоки повторения урока по порядку — вместе с их служебными конфигурациями */
  function recycleBlocksOf(cfg) {
    var out = [];
    for (var i = 0; i < RECYCLE_KEYS.length; i++) {
      if (cfg && cfg[RECYCLE_KEYS[i]]) out.push({ idx: i, block: cfg[RECYCLE_KEYS[i]], shim: recycleOf(cfg, i) });
    }
    return out;
  }
  SAL.recycleCfg = function (key, idx) { return recycleOf(lessons[key], idx); };

  function attrSafe(t) { return String(t == null ? '' : t).replace(/"/g, '&quot;'); }

  function recycleHeadHtml(rc, badgeRu, badgeEn) {
    return '<div class="cycle-banner" style="padding:1.4rem 1.6rem;margin-bottom:1.25rem;text-align:left;">' +
      '<span class="badge badge-gold" data-i18n-ru="' + attrSafe(badgeRu) + '" data-i18n-en="' + attrSafe(badgeEn) + '">' +
        tx({ ru: badgeRu, en: badgeEn }) + '</span>' +
      '<h3 style="margin:0.6rem 0 0.35rem;font-size:1.22rem;" data-i18n-ru="' + attrSafe(rc.titleRu) +
        '" data-i18n-en="' + attrSafe(rc.titleEn) + '">' + tx({ ru: rc.titleRu, en: rc.titleEn }) + '</h3>' +
      '<p style="margin:0;font-size:0.92rem;color:var(--text-secondary);line-height:1.55;" data-i18n-ru="' +
        attrSafe(rc.descRu) + '" data-i18n-en="' + attrSafe(rc.descEn) + '">' +
        tx({ ru: rc.descRu, en: rc.descEn }) + '</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:0.45rem;margin-top:0.9rem;">' +
        rc.words.map(function (w) {
          return '<span class="chip-btn" style="cursor:default;">' +
            '<span style="font-family:var(--font-deva);font-weight:700;">' + w.deva + '</span>' +
            ' <em style="font-size:0.76rem;color:var(--text-secondary);">' + w.iast + '</em></span>';
        }).join('') +
      '</div></div>';
  }

  /* id панели блока: LC-recycle-practice, LC2-recycle2-practice … */
  function recyclePanelId(cfg, idx, stage) {
    return cfg.key + (idx ? '-recycle2-' : '-recycle-') + stage;
  }

  function recyclePracticeHtml(cfg, games) {
    return recycleBlocksOf(cfg).map(function (b) {
      var rc = b.block, i = b.idx;
      var tabs = games.map(function (g) {
        return '<button type="button" class="practice-tab-btn" data-rc-game="' + g[0] + '"' +
          ' data-rc-block="' + i + '"' +
          ' data-i18n-ru="' + attrSafe(g[2]) + '" data-i18n-en="' + attrSafe(g[3]) + '"' +
          ' onclick="SAL.do(\'' + cfg.key + '\',\'rcGame\',\'' + g[0] + '\',\'' + i + '\')">' + g[1] + '</button>';
      }).join('');
      return '<div id="' + recyclePanelId(cfg, i, 'practice') + '" style="margin-top:2.75rem;padding-top:2rem;border-top:2px dashed var(--border-strong);">' +
        recycleHeadHtml(rc,
          rc.badgeRu || '♻️ ПОВТОРЕНИЕ · УРОКИ 1–2',
          rc.badgeEn || '♻️ RECYCLING · LESSONS 1–2') +
        '<div class="practice-tabs" role="tablist">' + tabs + '</div>' +
        '<div id="' + b.shim.key + '-practice-arena" class="practice-arena"></div></div>';
    }).join('');
  }

  function recycleProdHtml(cfg, modes) {
    return recycleBlocksOf(cfg).map(function (b) {
      var rc = b.block, i = b.idx;
      var tabs = modes.filter(function (m) { return m[0] !== 'union'; }).map(function (m) {
        return '<button type="button" class="practice-tab-btn" data-rc-prod="' + m[0] + '"' +
          ' data-rc-block="' + i + '"' +
          ' data-i18n-ru="' + attrSafe(m[2]) + '" data-i18n-en="' + attrSafe(m[3]) + '"' +
          ' onclick="SAL.do(\'' + cfg.key + '\',\'rcProd\',\'' + m[0] + '\',\'' + i + '\')">' + m[1] + '</button>';
      }).join('');
      return '<div id="' + recyclePanelId(cfg, i, 'production') + '" style="margin-top:2.75rem;padding-top:2rem;border-top:2px dashed var(--border-strong);">' +
        recycleHeadHtml(rc,
          rc.prodBadgeRu || '🗣 PRODUCTION · ПОВТОРЕНИЕ',
          rc.prodBadgeEn || '🗣 PRODUCTION · RECYCLING') +
        '<div class="practice-tabs" role="tablist">' + tabs + '</div>' +
        '<div id="' + b.shim.key + '-production-stage" class="practice-arena"></div></div>';
    }).join('');
  }

  function renderRecyclePractice(cfg) {
    recycleBlocksOf(cfg).forEach(function (b) {
      var shim = b.shim, i = b.idx;
      var st = state(shim);
      var pane = document.getElementById('view-lesson' + cfg.num);
      var sel = '[data-rc-game="' + st.game + '"][data-rc-block="' + i + '"]';
      if (pane) {
        pane.querySelectorAll('[data-rc-game][data-rc-block="' + i + '"]').forEach(function (btn) {
          btn.classList.toggle('active', btn.getAttribute('data-rc-game') === st.game);
        });
      }
      var arena = document.getElementById(shim.key + '-practice-arena');
      if (!arena) return;
      var fn = GAME_RENDER[st.game] || renderMasked;
      arena.innerHTML = gameTitleHtml(pane, sel, shim, st.game) + rulesHtml(shim, st) + fn(shim, st);
    });
  }

  /* The heading above every game: its number and name, taken from the very tab the
     student pressed — so a heading can never drift away from its tab. A hidden
     configuration without a tabbed pane (L1B: the word search of lesson 1) falls
     back to the same labels the tabs would have carried. */
  function gameTitleHtml(pane, sel, cfg, game) {
    var btn = pane ? pane.querySelector('.practice-tab-btn' + sel) : null;
    var ruLabel = '', enLabel = '', label = '';
    if (btn) {
      label = String(btn.textContent || '').replace(/\s+/g, ' ').trim();
      ruLabel = btn.getAttribute('data-i18n-ru') || '';
      enLabel = btn.getAttribute('data-i18n-en') || '';
    }
    if (!label && cfg && game && cfg.extraGames && cfg.extraGames.indexOf(game) >= 0) {
      var lab = (cfg.gameLabels && cfg.gameLabels[game]) || EXTRA_LABELS[game];
      var num = 12 + cfg.extraGames.indexOf(game) + 1 + '. ';
      if (lab) { ruLabel = num + lab.ru; enLabel = num + lab.en; label = tx({ ru: ruLabel, en: enLabel }); }
    }
    if (!label) return '';
    var esc = function (t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
    return '<h3 class="game-title"' + (ruLabel && enLabel
      ? ' data-i18n-ru="' + esc(ruLabel) + '" data-i18n-en="' + esc(enLabel) + '"' : '') + '>' +
      esc(label) + '</h3>';
  }
  SAL.gameTitle = function (label) {
    if (!label) return '';
    return '<h3 class="game-title">' +
      String(label).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</h3>';
  };

  function renderRecycleProd(cfg) {
    recycleBlocksOf(cfg).forEach(function (b) {
      var shim = b.shim, i = b.idx;
      var st = state(shim);
      var pane = document.getElementById('view-lesson' + cfg.num);
      if (pane) {
        pane.querySelectorAll('[data-rc-prod][data-rc-block="' + i + '"]').forEach(function (btn) {
          btn.classList.toggle('active', btn.getAttribute('data-rc-prod') === st.prod.mode);
        });
      }
      var box = document.getElementById(shim.key + '-production-stage');
      if (!box) return;
      var m = st.prod.mode;
      if (m === 'mic') box.innerHTML = renderMic(shim, st);
      else if (m === 'missingpart') box.innerHTML = renderMissing(shim, st);
      else if (m === 'chant') box.innerHTML = renderChant(shim, st);
      else box.innerHTML = renderSprint(shim, st);
    });
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

    /* [game, label in the current language, label ru, label en] — the ru/en pair
       goes into data-i18n-* so every tab is translated without re-rendering. */
    var defGames = [
      ['masked', ru('1. Covered Square ■ (Guess Word)', '1. Закрыто квадратом ■ (Угадай слово)'),
        '1. Закрыто квадратом ■ (Угадай слово)', '1. Covered Square ■ (Guess Word)'],
      ['flashcards', ru('2. Flashcards', '2. Flashcards (Карточки)'),
        '2. Flashcards (Карточки)', '2. Flashcards'],
      ['gaps', ru('3. Fill in the Gaps', '3. Fill in the Gaps (Пропуски)'),
        '3. Fill in the Gaps (Пропуски)', '3. Fill in the Gaps'],
      ['picquiz', ru('4. Picture Quiz', '4. Picture Quiz (Картинка → Слово)'),
        '4. Picture Quiz (Картинка → Слово)', '4. Picture Quiz'],
      ['wordquiz', ru('5. Word → Picture', '5. Read & Match (Слово → Картинка)'),
        '5. Read & Match (Слово → Картинка)', '5. Word → Picture'],
      ['match', ru('6. Match Pairs', '6. Match Pairs (Найди пары)'),
        '6. Match Pairs (Найди пары)', '6. Match Pairs'],
      ['memory', ru('7. Classic Memory', '7. Классическое «Мемори»'),
        '7. Классическое «Мемори»', '7. Classic Memory'],
      ['wronglabel', ru('8. Spot the Wrong Word', '8. Где ошибка? (3 картинки)'),
        '8. Где ошибка? (3 картинки)', '8. Spot the Wrong Word'],
      ['typo', ru('9. Spot the 1-Letter Typo', '9. Ошибка в 1 букве (3 картинки)'),
        '9. Ошибка в 1 букве (3 картинки)', '9. Spot the 1-Letter Typo'],
      ['categories', ru('10. Categories', '10. Категории (Выбери из ' + N + ')'),
        '10. Категории (Выбери из ' + N + ')', '10. Categories'],
      ['spelling', ru('11. Missing Letters', '11. Missing Letters (Буквы)'),
        '11. Missing Letters (Буквы)', '11. Missing Letters'],
      ['truefalse', ru('12. आम् / न (True / False)', '12. आम् / न (Да / Нет)'),
        '12. आम् / न (Да / Нет)', '12. आम् / न (True / False)']
    ];
    /* lessons may add their own games (see SAL.addGame in games-extra.js) */
    var extraTabs = (cfg.extraGames || []).map(function (k, i) {
      var lab = (cfg.gameLabels && cfg.gameLabels[k]) || EXTRA_LABELS[k] || { ru: k, en: k };
      var num = (defGames.length + i + 1) + '. ';
      return [k, num + tx(lab), num + lab.ru, num + lab.en];
    });
    var gameTabs = defGames.concat(extraTabs).map(function (g) {
      return '<button type="button" class="practice-tab-btn' + (g[0] === 'masked' ? ' active' : '') + '" data-game="' + g[0] +
        '"' + (g[2] ? ' data-i18n-ru="' + attrSafe(g[2]) + '" data-i18n-en="' + attrSafe(g[3]) + '"' : '') +
        ' onclick="SAL.do(\'' + key + '\',\'setGame\',\'' + g[0] + '\')">' + g[1] + '</button>';
    }).join('');

    /* [mode, label in the current language, label ru, label en] — the ru/en pair
       goes into data-i18n-* so the tab is translated without re-rendering. */
    var prodList = [
      ['sprint', ru('1. Speed Sprint ⏱ (No Text)', '1. Спринт на время ⏱ (Без текста)'),
        '1. Спринт на время ⏱ (Без текста)', '1. Speed Sprint ⏱ (No Text)'],
      ['mic', ru('2. Speak into Microphone 🎙', '2. Произнеси в микрофон 🎙'),
        '2. Произнеси в микрофон 🎙', '2. Speak into Microphone 🎙'],
      ['missingpart', ru('3. What Is Missing? ❓', '3. Что пропало на рисунке? ❓'),
        '3. Что пропало на рисунке? ❓', '3. What Is Missing? ❓'],
      ['chant', ru('4. TPR Chant & Checklist ' + N + '/' + N + ' ↑↓', '4. Ритм-чант и Чек-лист ' + N + '/' + N + ' ↑↓'),
        '4. Ритм-чант и Чек-лист ' + N + '/' + N + ' ↑↓', '4. TPR Chant & Checklist ' + N + '/' + N + ' ↑↓']
    ];
    /* A lesson may declare `unionSprint`: one more production mode — a timed run
       over the words of several lessons at once (спиральное повторение).
       cfg.unionLabel задаёт свою подпись, иначе остаётся «тело + лицо». */
    if (cfg.unionSprint) {
      var uTotal = unionWords(cfg).length;
      var uRu = (cfg.unionLabel ? cfg.unionLabel.ru : '5. Спринт: тело + лицо ⏱') + ' (' + uTotal + ')';
      var uEn = (cfg.unionLabel ? cfg.unionLabel.en : '5. Sprint: Body + Face ⏱') + ' (' + uTotal + ')';
      prodList.push(['union', L() === 'ru' ? uRu : uEn, uRu, uEn]);
    }
    var prodTabs = prodList.map(function (p) {
      var safe = function (t) { return String(t).replace(/"/g, '&quot;'); };
      return '<button type="button" class="practice-tab-btn' + (p[0] === 'sprint' ? ' active' : '') + '" data-prod-mode="' + p[0] +
        '" data-i18n-ru="' + safe(p[2]) + '" data-i18n-en="' + safe(p[3]) +
        '" onclick="SAL.do(\'' + key + '\',\'setProdMode\',\'' + p[0] + '\')">' + p[1] + '</button>';
    }).join('');

    /* Production headline and its description: the gesture is optional */
    /* The TPR gesture goes into both language versions of the strings below,
       so it has to be built twice — a single tx() would bake the Russian
       gesture into the English sentence. */
    var tprRu = gestureText(cfg, 'ru');
    var tprEn = gestureText(cfg, 'en');
    function withN(t) { return String(t).replace(/\{n\}/g, N); }
    var prodTitleRu = withN(cfg.prodTitleRu ||
      'Живая речь: покажите у себя и назовите вслух все ' + N + ' слов');
    var prodTitleEn = withN(cfg.prodTitleEn ||
      'Freer Production: Point &amp; Name All ' + N + ' Words Aloud');
    var prodDescRu = tprRu
      ? 'Финальный этап <strong>PPP</strong>: выберите слово, ' + tprRu + ' и уверенно произнесите чистую основу вслух.'
      : 'Финальный этап <strong>PPP</strong>: выберите слово и уверенно произнесите чистую основу вслух.';
    var prodDescEn = tprEn
      ? 'The final <strong>PPP</strong> stage: pick a word, ' + tprEn + ', and say the Sanskrit stem aloud.'
      : 'The final <strong>PPP</strong> stage: pick a word and say the Sanskrit stem aloud.';

    var presTabs = [
      ['stepbystep', ru('1. Step-by-Step (2 Words)', '1. Пошагово (по 2 слова)'),
        '1. Пошагово (по 2 слова)', '1. Step-by-Step (2 Words)'],
      ['hotspots', ru('2. Diagram (Hotspots)', '2. Схема (Hotspots)'),
        '2. Схема (Hotspots)', '2. Diagram (Hotspots)'],
      ['audiofirst', ru('3. Audio-First 🔊 → Text', '3. Сначала звук 🔊 → потом буквы'),
        '3. Сначала звук 🔊 → потом буквы', '3. Audio-First 🔊 → Text'],
      ['poster', ru('4. Full Poster (All ' + N + ')', '4. Плакат (все ' + N + ' слов)'),
        '4. Плакат (все ' + N + ' слов)', '4. Full Poster (All ' + N + ')']
    ].map(function (p) {
      return '<button type="button" class="practice-tab-btn' + (p[0] === 'stepbystep' ? ' active' : '') + '" data-pres-mode="' + p[0] +
        '" onclick="SAL.do(\'' + key + '\',\'setPresMode\',\'' + p[0] + '\')"' +
        ' data-i18n-ru="' + attrSafe(p[2]) + '" data-i18n-en="' + attrSafe(p[3]) + '">' + p[1] + '</button>';
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
        '<h2 class="section-title"' +
          ' data-i18n-ru="' + attrSafe(cfg.titleDeva + ' — ' + cfg.titleRu + ' (Vocabulary A1)') + '"' +
          ' data-i18n-en="' + attrSafe(cfg.titleDeva + ' — ' + cfg.titleEn + ' (Vocabulary A1)') + '">' +
          cfg.titleDeva + ' — ' + tx({ ru: cfg.titleRu, en: cfg.titleEn }) + ' (Vocabulary A1)</h2>' +
        '<p class="section-desc" data-i18n-ru="' + cfg.introRu + '" data-i18n-en="' + cfg.introEn + '">' + tx({ ru: cfg.introRu, en: cfg.introEn }) + '</p>' +
      '</div>' +

      aimHtml(cfg) +

      '<div id="' + key + '-discovery"></div>' +

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
        ],
        aimGuideHtml(cfg)) +

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
        ].concat((cfg.extraGames && cfg.extraGames.length) ? [
          ['<strong>5. Игры 13+ — соло и в паре (по выбору преподавателя):</strong><br/>Соло: <strong>13. Горячая карточка</strong> (серия, 3 жизни), <strong>14. Копилка ошибок</strong> (повтор только того, что ученик пропустил), <strong>15. Минимальные пары на слух</strong>, <strong>19. Напиши сам</strong>. В паре (переключатель 👥 есть только у парных игр): <strong>6. Match Pairs</strong>, <strong>7. Мемори</strong>, <strong>16. Снежный ком</strong>, <strong>22. Слепое поле</strong>, <strong>23. Морской бой</strong>, <strong>24. Бинго</strong>, <strong>25. Дуэль</strong>, <strong>26. Диктор и ученик</strong>, <strong>27. Эстафета</strong>, <strong>28. Мемори вдвоём</strong>, <strong>29. Крестики-нолики</strong>. Финальный дрилль: <strong>30. Филворд 10 × 10</strong>.',
           '<strong>5. Games 13+ — solo and pair work (pick what fits):</strong><br/>Solo: <strong>13. Hot Cards</strong> (streak, 3 lives), <strong>14. Mistake Pile</strong> (recycling only what this student missed), <strong>15. Minimal Pairs by Ear</strong>, <strong>19. Type It</strong>. In pairs (the 👥 toggle appears only in pair games): <strong>6. Match Pairs</strong>, <strong>7. Memory</strong>, <strong>16. Snowball</strong>, <strong>22. Blind Board</strong>, <strong>23. Battleship</strong>, <strong>24. Bingo</strong>, <strong>25. Duel</strong>, <strong>26. Describe &amp; Guess</strong>, <strong>27. Order Relay</strong>, <strong>28. Co-op Memory</strong>, <strong>29. Tic-tac-toe</strong>. Final drill: <strong>30. Word Grid 10 × 10</strong>.']
        ] : [])) +

      (((cfg.extraGames && cfg.extraGames.length) ? extraBarHtml(cfg) : '')) +
      '<div class="practice-tabs" role="tablist">' + gameTabs + '</div>' +
      '<div id="' + key + '-practice-arena" class="practice-arena"></div>' +
      recyclePracticeHtml(cfg, defGames.concat(extraTabs)) +
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
        '<h2 class="section-title" data-i18n-ru="' + prodTitleRu + '" data-i18n-en="' + prodTitleEn + '">' +
          (L() === 'ru' ? prodTitleRu : prodTitleEn) + '</h2>' +
        '<p class="section-desc" data-i18n-ru="' + prodDescRu + '" data-i18n-en="' + prodDescEn + '">' +
          (L() === 'ru' ? prodDescRu : prodDescEn) + '</p>' +
      '</div>' +

      tgBox(cfg, 'production',
        '👩‍🏫 Инструкция для преподавателя · Stage 3: Production (10–15 мин)',
        '👩‍🏫 Teacher\'s Guide · Stage 3: Production (10–15 min)',
        [
          ['<strong>1. Цель этапа (Freer Production &amp; Fluency):</strong><br/>Вывести все ' + N + ' слов в устную речь без опоры на текст. Главный принцип CELTA: <strong>максимум речи учеников (High STT), минимум речи учителя (Low TTT)</strong>.',
           '<strong>1. Stage Aim (Freer Production &amp; Fluency):</strong><br/>Activate all ' + N + ' words in speech without written prompts. Core CELTA principle: <strong>high Student Talking Time, low Teacher Talking Time</strong>.'],
          ['<strong>2. Тренажёр 1 «Спринт» — три режима таймера:</strong><br/><code>✋ Таймер вручную</code> (учитель запускает таймер сам), <code>⚡ Авто-таймер</code> (после оценки карточка и таймер запускаются сами), <code>⏩ Авто-смена картинок</code> (чистый TPR-поток: картинки меняются каждые 4 / 3 / 2 сек без текста и звука). Вид: <code>🖼 отдельная картинка</code> или <code>🏹 стрелка на схеме</code>.',
           '<strong>2. Trainer 1 "Speed Sprint" — three timer modes:</strong><br/><code>✋ Manual Timer</code> (the teacher starts the countdown), <code>⚡ Auto Timer</code> (the next card and countdown start automatically), <code>⏩ Auto-Advance Pictures</code> (pure TPR flow: pictures change every 4 / 3 / 2 s with no text and no sound). View: <code>🖼 isolated picture</code> or <code>🏹 arrow on the diagram</code>.'],
          ['<strong>3. Активность А — «Живое зеркало» в парах (4 мин):</strong><br/>Ученик А молча показывает карточку' + (tprRu ? ' (или ' + tprRu + ')' : '') + ', ученик Б мгновенно называет слово на санскрите. Через ' + Math.ceil(N / 2) + ' слов меняются ролями.',
           '<strong>2. Activity A — Living Mirror in Pairs (4 min):</strong><br/>Partner A silently shows a card' + (tprEn ? ' (or ' + tprEn + ')' : '') + ', Partner B names the word in Sanskrit at once. Swap roles after ' + Math.ceil(N / 2) + ' words.'],
          ['<strong>4. Активность Б — «Ловушка ведущего» (Simon Says, 4 мин):</strong><br/>Ведущий называет одно слово, а показывает другое. Ученики слушают ушами, реагируют на названное слово и хором его повторяют.',
           '<strong>3. Activity B — Listen, Don\'t Copy (Simon Says, 4 min):</strong><br/>The leader says one word but shows another. Learners must listen, react to the word they hear, and repeat it in chorus.'],
          ['<strong>5. Активность В — Индивидуальный зачёт ' + N + '/' + N + ' (4 мин):</strong><br/>Каждый ученик проходит тренажёр ниже до результата <code>' + N + ' из ' + N + '</code>. Не перебивайте — разберите ошибки в конце (<em>Delayed Error Correction</em>).',
           '<strong>4. Activity C — Individual ' + N + '/' + N + ' Check (4 min):</strong><br/>Every learner completes the trainer below up to <code>' + N + ' out of ' + N + '</code>. Do not interrupt — give <em>delayed error correction</em> at the end.']
        ]) +

      '<div class="practice-tabs" role="tablist">' + prodTabs + '</div>' +
      '<div id="' + key + '-production-stage" class="practice-arena"></div>' +
      recycleProdHtml(cfg, prodList) +
    '</div></section>' +
    lessonPagerSlot(key);
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
      /* при скрытых подписях вкладки не выдают слова — остаются только номера */
      var sub = st.pres.labelsHidden ? ''
        : '. ' + ss.wordIds.map(function (id) { return byId(cfg, id).deva; }).join(' · ');
      return '<button type="button" class="chip-btn' + (i === idx ? ' active' : '') +
        '" onclick="SAL.do(\'' + cfg.key + '\',\'setStep\',\'' + i + '\')">' + (i + 1) + sub + '</button>';
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
      /* при скрытых подписях кнопки-точки не выдают слово — остаётся номер */
      var label = st.pres.labelsHidden ? String(p.num) : p.num + '. ' + item.deva + iastSpan(item.iast);
      return '<button type="button" class="chip-btn' + (p.id === active ? ' active' : '') +
        '" onclick="SAL.do(\'' + cfg.key + '\',\'hotspot\',\'' + p.id + '\')"' +
        (st.pres.labelsHidden ? ' title="' + p.num + '"' : '') + '>' + label + '</button>';
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

  /* =========================================================================
     GUIDED DISCOVERY (только у уроков с cfg.discovery)
     -------------------------------------------------------------------------
     Восемь предложений лежат на экране БЕЗ разбора: ученик сам находит, что
     цвет и существительное кончаются одинаково. Кнопка открывает разбор —
     по строке на предложение и правило под списком. Урок без cfg.discovery
     ведёт себя ровно как раньше: слот остаётся пустым.
     ========================================================================= */
  var DISC_GENDER = {
    m: { ru: 'мужской род', en: 'masculine' },
    n: { ru: 'средний род', en: 'neuter' },
    f: { ru: 'женский род', en: 'feminine' }
  };

  function discoveryHtml(cfg) {
    var d = cfg.discovery;
    if (!d) return '';
    var st = state(cfg);
    var open = !!st.pres.discoveryOpen;
    /* Перевод по умолчанию скрыт: сначала ученик читает и слышит санскрит,
       значение выясняется из картинки и разбора, а не из русской строки. */
    var showTr = !!st.pres.translationsShown;
    var rows = d.sentences.map(function (s, i) {
      var tag = open
        ? '<span class="disc-tag disc-g-' + s.gender + '">' +
            (i + 1) + '. ' + s.ending + ' — ' + tx(DISC_GENDER[s.gender]) + '</span>'
        : '<span class="disc-tag disc-hidden">?</span>';
      return '<li class="disc-row' + (open ? ' open' : '') + '">' +
        '<button type="button" class="vocab-audio-btn disc-speak" title="🔊"' +
          ' aria-label="' + ru('Listen', 'Прослушать') + ': ' + s.iast + '"' +
          ' onclick="event.stopPropagation(); SAL.speak(\'' + s.ttsText + '\')">🔊</button>' +
        '<div class="disc-text"><div class="disc-deva">' + s.deva + '</div>' +
          '<div class="disc-iast">' + s.iast + '</div>' +
          (showTr ? '<div class="disc-tr">' + tx({ ru: s.ru, en: s.en }) + '</div>' : '') +
        '</div>' +
        tag + '</li>';
    }).join('');
    var rule = open ? '<div class="disc-rule">' + tx({ ru: d.ruleRu, en: d.ruleEn }) + '</div>' : '';
    return '<section class="disc-box" id="' + cfg.key + '-discovery-box">' +
      '<div class="disc-head">' +
        '<div class="disc-head-text">' +
          '<div class="disc-eyebrow">' + tx({ ru: d.badgeRu, en: d.badgeEn }) + '</div>' +
          '<h3 class="disc-title">' + tx({ ru: d.titleRu, en: d.titleEn }) + '</h3>' +
          '<p class="disc-lead">' + tx({ ru: d.leadRu, en: d.leadEn }) + '</p>' +
        '</div>' +
        '<div class="disc-actions">' +
          '<button type="button" class="chip-btn' + (open ? ' active' : '') + '"' +
            ' onclick="SAL.do(\'' + cfg.key + '\',\'discoveryToggle\')">' +
            (open ? '🙈 ' + ru('Hide the analysis', 'Скрыть разбор')
                  : '🔍 ' + ru('Reveal the pattern', 'Открыть разбор')) + '</button>' +
          '<button type="button" class="chip-btn' + (showTr ? ' active' : '') + '"' +
            ' onclick="SAL.do(\'' + cfg.key + '\',\'translationToggle\')">' +
            (showTr ? '🙈 ' + ru('Hide translation', 'Скрыть перевод')
                    : '👁 ' + ru('Show translation', 'Показать перевод')) + '</button>' +
        '</div>' +
      '</div>' +
      '<ol class="disc-list">' + rows + '</ol>' + rule +
    '</section>';
  }

  function renderDiscovery(cfg) {
    if (!cfg.discovery) return;
    var el = document.getElementById(cfg.key + '-discovery');
    if (el) el.innerHTML = discoveryHtml(cfg);
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
    /* «🙈 Скрыть подписи» работает во ВСЕХ четырёх режимах. Раньше класс
       labels-hidden вешался только на плакат: в «Пошагово», «Схеме» и «Сначала
       звук» кнопка переключала состояние и меняла свою надпись, но на экране
       ничего не происходило. */
    var hideCls = st.pres.labelsHidden ? ' labels-hidden' : '';
    if (st.pres.mode === 'stepbystep') {
      grid.className = hideCls.replace(/^ /, ''); grid.innerHTML = stepHtml(cfg, st);
    } else if (st.pres.mode === 'hotspots') {
      grid.className = hideCls.replace(/^ /, ''); grid.innerHTML = hotspotsHtml(cfg, st);
    } else if (st.pres.mode === 'audiofirst') {
      grid.className = hideCls.replace(/^ /, ''); grid.innerHTML = audioFirstHtml(cfg, st);
    } else {
      grid.className = 'vocab-grid-6' + hideCls;
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
    masked: function () { return { i: 0, score: 0, answered: false, picked: null, shown: false, view: 'card', revealed: {}, finished: false, both: false }; },
    flashcards: function () { return { i: 0, flipped: false, score: 0, finished: false }; },
    gaps: function () { return { i: 0, score: 0, answered: false, picked: null, firstTry: true, redPick: null, finished: false, both: false }; },
    picquiz: function () { return { i: 0, score: 0, answered: false, picked: null, firstTry: true, redPick: null, finished: false }; },
    wordquiz: function () { return { i: 0, score: 0, answered: false, picked: null, options: null, firstTry: true, redPick: null, finished: false }; },
    match: function (cfg) { return { stage: 0, sel: null, matched: {}, wrong: null, failed: {}, score: 0, done: false, tiles: null, scores: [0, 0], turn: 0 }; },
    memory: function (cfg) { return { cards: null, flipped: [], matched: {}, wrong: null, lock: false, moves: 0, score: 0, seen: {}, failed: {}, size: cfg.words.length, scores: [0, 0], turn: 0, traps: true }; },
    wronglabel: function (cfg) { return { i: 0, score: 0, answered: false, picked: null, firstTry: true, redIdx: null, round: null, finished: false }; },
    typo: function (cfg) { return { i: 0, score: 0, answered: false, picked: null, firstTry: true, redIdx: null, round: null, finished: false }; },
    categories: function () { return { i: 0, score: 0, sel: {}, wrong: {}, firstTry: true, checked: false, finished: false, bare: false }; },
    spelling: function () { return { i: 0, score: 0, answered: false, picked: null, firstTry: true, redPick: null, finished: false }; },
    truefalse: function (cfg) { return { i: 0, score: 0, answered: false, picked: null, isTrue: true, otherId: null, finished: false }; }
  };

  function wordBtn(cfg, w, action, value, cls, letter) {
    return optBtn(cfg, action, value, w.deva + iastSpan(w.iast), cls, letter);
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
  /* Lesson 1 feedback line: ✓ correct word (iast), a note if it took 2 tries, Listen + Next */
  function answerFeedback(cfg, g, w, nextAction) {
    return '<div style="margin-top:1rem;">' +
      '<div style="font-family:var(--font-deva);font-size:1.75rem;font-weight:700;color:#15803d;">✓ ' + w.deva + '</div>' +
      '<div class="iast-text" style="color:#15803d;">' + w.iast + '</div>' +
      (!g.firstTry
        ? '<div style="margin-top:0.4rem;font-size:0.86rem;color:#b45309;font-weight:700;">' +
          ru('Correct, but on the 2nd try — no point this round.', 'Верно, но со второй попытки — очко не начисляется.') + '</div>'
        : '') +
      nextRow(cfg, nextAction, chip(cfg, 'speak', w.ttsText, '🔊 ' + ru('Listen', 'Послушать'))) +
      '</div>';
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
    var two = hasBothMask(cfg);
    var both = two && !!g.both;

    /* Две версии одной игры. Первая (по умолчанию) закрывает только конец
       существительного, вторая — ещё и конец прилагательного. */
    var gridView = g.view === 'grid';
    var vRow = two ? verRow(cfg, 'maskedBoth', both) : '';
    var vHint = both ? bothHint(cfg) : '';

    if (gridView) {
      if (Object.keys(g.revealed).length >= N) {
        return finalScreen(cfg, 'masked', ru('1. Covered Square ■ (' + N + ' / ' + N + ')', '1. Закрыто квадратом ■ (' + N + ' / ' + N + ')'), N, N);
      }
      var cards = cfg.words.map(function (w) {
        var rev = !!g.revealed[w.id];
        return '<div class="vocab-item-card" onclick="SAL.do(\'' + cfg.key + '\',\'maskedReveal\',\'' + w.id + '\')">' +
          '<button type="button" class="vocab-audio-btn" title="🔊" onclick="event.stopPropagation(); SAL.speak(\'' + w.ttsText + '\')">🔊</button>' +
          maskedMarkup(w, rev, '1.6rem', both) +
          '<div class="vocab-iast">' + w.iast + '</div>' +
          '<div style="margin-top:0.5rem;">' + svgBox(w, 92) + '</div></div>';
      }).join('');
      return topBar(
        chip(cfg, 'maskedView', 'card', '1 / ' + N, false) + chip(cfg, 'maskedView', 'grid', N + ' / ' + N + ' ■', true),
        pill(Object.keys(g.revealed).length + ' / ' + N) + ' ' + chip(cfg, 'maskedGridReset', '', '↺')) +
        vRow +
        '<div class="vocab-grid-6" style="margin-top:1rem;">' + cards + '</div>' +
        vHint;
    }
    if (g.finished || g.i >= N) {
      return vRow + finalScreen(cfg, 'masked', ru('1. ■', '1. ■'), g.score, N);
    }
    var w = cfg.words[g.i];
    return topBar(
        chip(cfg, 'maskedView', 'card', '1 / ' + N, g.view !== 'grid') +
        chip(cfg, 'maskedView', 'grid', N + ' / ' + N + ' ■', g.view === 'grid'),
        pill(g.score + ' · (' + (g.i + 1) + ' / ' + N) + ' ' + chip(cfg, 'restart', 'masked', '↺')) +
      vRow +
      centerCard(
        '<div class="flashcard-box" onclick="SAL.do(\'' + cfg.key + '\',\'maskedFlip\')">' +
          svgBox(w, 140) +
          maskedMarkup(w, g.shown, '2.45rem', both) +
          '<div class="iast-text" style="font-size:1.1rem;margin-top:0.25rem;">' + (g.shown ? w.iast : '&nbsp;') + '</div>' +
        '</div>' +
        '<div style="display:flex;justify-content:center;gap:0.65rem;flex-wrap:wrap;">' +
          chip(cfg, 'maskedFlip', '', '↺') +
          chip(cfg, 'speak', w.ttsText, '🔊') +
          '<button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;" onclick="SAL.do(\'' + cfg.key + '\',\'maskedGrade\',\'0\')">✕ ' +
            ru('Repeat', 'Повторить') + '</button>' +
          '<button type="button" class="chip-btn" style="background:#16a34a;border-color:#16a34a;color:#fff;" onclick="SAL.do(\'' + cfg.key + '\',\'maskedGrade\',\'1\')">✓ ' +
            ru('I knew it', 'Знаю') + '</button>' +
        '</div>' +
        vHint +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          ru('Say the word aloud, then uncover it and grade yourself.', 'Назовите слово вслух, затем откройте его и оцените себя.') + '</div>'
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
    var two = hasBothMask(cfg);
    var both = two && !!g.both;
    var vRow = two ? verRow(cfg, 'gapBoth', both) : '';
    if (g.finished || g.i >= N) {
      return vRow + finalScreen(cfg, 'gaps', ru('Fill in the Gaps — done!', 'Fill in the Gaps — пройдено!'), g.score, N);
    }
    var w = cfg.words[g.i];
    /* во второй версии пропусков два: конец цвета и конец слова */
    var gapDeva = (both && gapBothDeva(w)) || w.gapDeva;
    var gapIast = (both && gapBothIast(w)) || w.gapIast;
    var gapOrder = optionOrder(cfg, 'gaps', w, w.gapChoices,
      function (c) { return c.deva; }, w.gapAnswer);
    var btns = gapOrder.map(function (oi, idx) {
      var c = w.gapChoices[oi];
      var cls = '';
      if (g.answered && c.deva === w.gapAnswer) cls = 'correct';
      if (c.deva === g.redPick) cls = 'wrong';
      return optBtn(cfg, 'gapPick', c.deva, c.deva + iastSpan(c.iast), cls, idx);
    }).join('');
    return topBar(pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'restart', 'gaps', '↺')) +
      vRow +
      centerCard(
        '<div style="margin-bottom:0.5rem;">' + svgBox(w, 120) + '</div>' +
        '<div style="font-family:var(--font-deva);font-size:2.6rem;font-weight:700;letter-spacing:0.05em;">' + gapDeva + '</div>' +
        '<div class="iast-text" style="margin-bottom:1rem;">' + gapIast + '</div>' +
        optGrid(btns) +
        (g.answered
          ? answerFeedback(cfg, g, w, 'gapsNext')
          : '<div style="margin-top:0.85rem;">' + chip(cfg, 'speak', w.ttsText, '🔊 ' + ru('Listen', 'Послушать')) + '</div>') +
        (both ? bothHint(cfg) : '')
      );
  }

  /* 4. Picture Quiz ------------------------------------------------------- */
  function renderPicQuiz(cfg, st) {
    var g = gst(cfg, 'picquiz');
    var N = cfg.words.length;
    if (g.finished || g.i >= N) return finalScreen(cfg, 'picquiz', ru('Picture Quiz — done!', 'Picture Quiz — пройдено!'), g.score, N);
    var w = cfg.words[g.i];
    if (!g.options) g.options = shuffle([w.id].concat(others(cfg, w.id, 3).map(function (o) { return o.id; })));
    var opts = g.options.map(function (id) { return byId(cfg, id); });
    var btns = opts.map(function (o, idx) {
      var cls = '';
      if (g.answered && o.id === w.id) cls = 'correct';
      if (o.id === g.redPick) cls = 'wrong';
      return wordBtn(cfg, o, 'quizPick', o.id, cls, idx);
    }).join('');
    return topBar(pill(ru('Picture', 'Картинка') + ' ' + (g.i + 1) + '/' + N) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'restart', 'picquiz', '↺')) +
      centerCard(
        '<div style="margin-bottom:1rem;">' + svgBox(w, 170) + '</div>' +
        '<div style="font-size:0.9rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.75rem;">' +
        ru('Which word is it?', 'Какое это слово?') + '</div>' +
        optGrid(btns) +
        (g.answered ? answerFeedback(cfg, g, w, 'picquizNext') : '')
      );
  }

  /* 5. Word → Picture ----------------------------------------------------- */
  function renderWordQuiz(cfg, st) {
    var g = gst(cfg, 'wordquiz');
    var N = cfg.words.length;
    if (g.finished || g.i >= N) return finalScreen(cfg, 'wordquiz', ru('Read & Match — done!', 'Read & Match — пройдено!'), g.score, N);
    var w = cfg.words[g.i];
    if (!g.options) g.options = shuffle([w.id].concat(others(cfg, w.id, 3).map(function (o) { return o.id; })));
    var btns = g.options.map(function (id, idx) {
      var o = byId(cfg, id);
      var cls = '';
      if (g.answered && id === w.id) cls = 'correct';
      if (id === g.redPick) cls = 'wrong';
      return optBtn(cfg, 'quizPick', id, '<div style="display:flex;flex-direction:column;align-items:center;gap:0.35rem;">' +
        svgBox(o, 92) + '</div>', cls, idx);
    }).join('');
    return topBar(pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'restart', 'wordquiz', '↺')) +
      centerCard(
        '<div style="font-family:var(--font-deva);font-size:2.6rem;font-weight:700;">' + w.deva + '</div>' +
        '<div class="iast-text" style="margin-bottom:0.9rem;">' + w.iast + '</div>' +
        '<div style="font-size:0.9rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.75rem;">' +
        ru('Find the picture', 'Найдите картинку') + '</div>' +
        optGrid(btns) +
        (g.answered ? answerFeedback(cfg, g, w, 'wordquizNext') : '')
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
      var failed = Object.keys(g.failed).length;
      var duoFin = SAL.isDuoGame('match') && st.players === 2;
      return finalScreen(cfg, 'match', ru('Match Pairs — done!', 'Match Pairs — пройдено!'),
        duoFin ? Math.max(g.scores[0], g.scores[1]) : Math.max(1, cfg.words.length - failed), cfg.words.length,
        (duoFin ? '1 — ' + g.scores[0] + ' · 2 — ' + g.scores[1] + (g.scores[0] === g.scores[1]
          ? ' · ' + ru('draw', 'ничья')
          : ' · ' + ru('student ' + (g.scores[0] > g.scores[1] ? 1 : 2) + ' wins',
                       'победил ученик ' + (g.scores[0] > g.scores[1] ? 1 : 2))) : '') +
        (failed ? (duoFin ? ' · ' : '') + ru('Mistakes', 'Ошибок') + ': ' + failed : ''));
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
    var duoM = SAL.isDuoGame('match') && st.players === 2;
    return topBar(
      (duoM ? duoScorePills(g) + ' ' : '') +
      pill(ru('Stage', 'Этап') + ' ' + (g.stage + 1) + '/' + chunks.length) + ' ' +
      pill(matchedCount + ' / ' + cfg.words.length),
      chip(cfg, 'restart', 'match', '↺')) +
      centerCard(
        '<div style="font-size:0.9rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.9rem;">' +
        ru('Tap a picture, then its word', 'Нажмите картинку, затем её слово') + '</div>' +
        '<div class="match-grid">' + tilesHtml + '</div>' +
        (g.wrong && g.wrong.length === 2
          ? '<div class="game-hint" role="status">' + (function () {
              var w1 = g.tiles[g.wrong[0]], w2 = g.tiles[g.wrong[1]];
              return (w1 && w2 && w1.kind === w2.kind)
                ? ru('🙈 A pair is a picture + a word — pick a tile of the other type.',
                     '🙈 Здесь нужна пара «картинка + слово» — выберите карточку другого типа.')
                : ru('🙈 Not a match — try another pair.', '🙈 Не совпало — попробуйте другую пару.');
            })() + '</div>' : '') +
        (stageDone
          ? '<div style="margin-top:1rem;">' +
            '<button type="button" class="btn btn-primary" style="padding:0.5rem 1.2rem;font-size:0.9rem;" onclick="SAL.do(\'' + cfg.key + '\',\'matchNext\')">' +
            (g.stage + 1 < chunks.length ? ru('Next stage →', 'Следующий этап →') : ru('Finish ✓', 'Завершить ✓')) + '</button></div>'
          : '') +
        (duoM
          ? '<div class="game-hint" style="margin-top:0.85rem;">' +
            ru('Turns alternate: a matched pair keeps your turn, a miss passes it on.',
               'Ходят по очереди: нашёл пару — ход остаётся, не совпало — ход переходит.') + '</div>'
          : '')
      );
  }

  /* 7. Classic Memory ----------------------------------------------------- */
  /* Ловушки «Мемори»: словосочетания, в которых ОБА слова согласованы друг с
     другом, но род выбран неверный (श्वेतः उदरः — оба в мужском, а उदर среднего).
     По окончаниям такую ловушку не вычислить: чтобы её заметить, надо знать род
     самого слова. Пары у ловушки нет, поэтому она всегда даёт промах, а игра
     объясняет, в чём дело, и показывает правильную форму из этого же урока. */
  var GENDER_WORD = {
    m: { en: 'masculine', inRu: 'мужском', genRu: 'мужского' },
    n: { en: 'neuter', inRu: 'среднем', genRu: 'среднего' },
    f: { en: 'feminine', inRu: 'женском', genRu: 'женского' }
  };
  function genderByEnd(deva) {
    var t = String(deva || '');
    if (/\u0903$/.test(t)) return 'm';                   /* ः */
    if (/(\u0902|\u092E\u094D)$/.test(t)) return 'n';   /* ं или म् */
    if (/\u093E$/.test(t)) return 'f';                   /* ा */
    return null;
  }
  function WORD_CARD_HTML(deva) {
    return '<div style="font-family:var(--font-deva);font-size:1.15rem;font-weight:700;">' + deva + '</div>';
  }
  /* ловушки включаются и выключаются кнопкой: с ними тренируется род,
     без них игра превращается в обычное «Мемори» по картинкам */
  function canMemoryTraps(cfg) {
    return !!(cfg && cfg.memoryTraps && cfg.memoryTraps.length);
  }
  function memoryTrapCount(cfg, size, enabled) {
    var all = cfg.memoryTraps || [];
    if (!all.length || enabled === false) return 0;
    return size >= cfg.words.length ? Math.min(2, all.length) : Math.min(1, all.length);
  }
  function memoryTrapsFor(cfg, size, enabled) {
    var n = memoryTrapCount(cfg, size, enabled);
    return n ? shuffle(cfg.memoryTraps).slice(0, n) : [];
  }
  /* основа слова без окончания: ः / म् / ा — так в объяснении видно само слово,
     а не его неверная форма из ловушки */
  function stemOf(deva) {
    return String(deva || '').replace(/\u092E\u094D$/, '').replace(/[\u0903\u0902\u093E]$/, '');
  }
  /* объяснение после промаха: какой род показан, какой на самом деле и как верно */
  function memoryTrapNote(trap) {
    var parts = String(trap.deva || '').split(' ');
    var fixParts = String(trap.fix || '').split(' ');
    var shown = genderByEnd(parts[0]);
    var real = genderByEnd(fixParts[1] || '');
    if (!shown || !real || shown === real) {
      return ru('⚠ ' + trap.deva + ' — the gender is wrong here. We say ' + trap.fix + '.',
                '⚠ ' + trap.deva + ' — здесь неверный род. Правильно: ' + trap.fix + '.');
    }
    return ru('⚠ ' + trap.deva + ' — both words are ' + GENDER_WORD[shown].en + ', but ' +
              stemOf(fixParts[1]) + ' is ' + GENDER_WORD[real].en + '. We say ' + trap.fix + '.',
              '⚠ ' + trap.deva + ' — оба слова в ' + GENDER_WORD[shown].inRu + ' роде, но ' +
              stemOf(fixParts[1]) + ' — ' + GENDER_WORD[real].genRu + ' рода. Правильно: ' + trap.fix + '.');
  }
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
      memoryTrapsFor(cfg, g.size, g.traps).forEach(function (t, i) {
        cards.push({ id: 'trap' + i, kind: 'trap', trap: t });
      });
      g.cards = shuffle(cards);
    }
    var matchedPairs = Object.keys(g.matched).length;
    if (matchedPairs >= g.size) {
      var memFailed = Object.keys(g.failed).length;
      return finalScreen(cfg, 'memory', ru('Memory — done!', 'Мемори — пройдено!'),
        Math.max(1, g.size - memFailed), g.size,
        ru('Moves', 'Ходов') + ': ' + g.moves +
        (memFailed ? ' · ' + ru('Pairs to review', 'Пар на повтор') + ': ' + memFailed : ''));
    }
    var cols = memoryCols(g.cards.length);
    var html = g.cards.map(function (c, idx) {
      var w = c.kind === 'trap' ? null : byId(cfg, c.id);
      var flipped = g.flipped.indexOf(idx) >= 0 || !!g.matched[c.id];
      var cls = '';
      if (g.matched[c.id]) cls += ' matched';
      cls += flipped ? ' flipped' : ' face-down';
      if (g.wrong && g.wrong.indexOf(idx) >= 0) cls += ' mismatch';
      var inner;
      if (c.kind === 'pic') inner = svgBox(w, 62);
      else if (c.kind === 'trap') inner = WORD_CARD_HTML(c.trap.deva);
      else inner = WORD_CARD_HTML(w.deva);
      var back = '<span class="memory-card-back-emblem memory-coord">' + cellName(idx, cols) + '</span>';
      return '<button type="button" class="memory-card ' + cls + '" onclick="SAL.do(\'' + cfg.key + '\',\'tile\',\'' + idx + '\')">' +
        (flipped ? inner : back) + '</button>';
    }).join('');
    var duoMem = SAL.isDuoGame('memory') && st.players === 2;
    /* «с ловушками / без ловушек» — только там, где ловушки вообще есть */
    var trapRow = canMemoryTraps(cfg)
      ? '<div class="game-ver-row"><span class="game-ver-label">' + ru('Traps:', 'Ловушки:') + '</span>' +
          chip(cfg, 'memoryTraps', '1', ru('⚠ with traps', '⚠ с ловушками'), g.traps !== false) +
          chip(cfg, 'memoryTraps', '0', ru('without traps', 'без ловушек'), g.traps === false) +
        '</div>'
      : '';
    return topBar((duoMem ? duoScorePills(g) + ' ' : '') +
      pill(ru('Pairs', 'Пары') + ': ' + matchedPairs + '/' + g.size) + ' ' + pill(ru('Moves', 'Ходов') + ': ' + g.moves) +
      (duoMem ? '' : ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score)),
      (function () {
        var full = cfg.words.length, half = Math.max(3, Math.ceil(cfg.words.length / 2));
        var tFull = memoryTrapCount(cfg, full, g.traps), tHalf = memoryTrapCount(cfg, half, g.traps);
        return chip(cfg, 'memorySize', String(full),
          full + ' × 2' + (tFull ? ' + ' + tFull + ' ⚠' : '') + ' (' + (full * 2 + tFull) + ')',
          g.size >= full) +
          chip(cfg, 'memorySize', String(half),
          half + ' × 2' + (tHalf ? ' + ' + tHalf + ' ⚠' : '') + ' (' + (half * 2 + tHalf) + ')',
          g.size < full);
      })() +
      chip(cfg, 'restart', 'memory', '↺')) +
      trapRow +
      centerCard('<div class="memory-grid" style="grid-template-columns: repeat(' + cols + ', 1fr);">' + html + '</div>' +
        (g.trapNote ? '<div class="game-hint trap-hint" role="status">' + memoryTrapNote(g.trapNote) + '</div>' : '') +
        (g.lock && !g.trapNote ? '<div class="game-hint" role="status">' +
          ru('🙈 No match — the cards are flipping back…', '🙈 Не совпало — карточки переворачиваются обратно…') +
          '</div>' : '') +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);text-align:center;">' +
        ru('Name the card by its square — the letter is the row, the number is the column (for example <strong>b2</strong>).',
           'Называйте карточку по клетке: буква — ряд, цифра — столбец (например <strong>b2</strong>).') +
        (duoMem ? '<br/>' + ru('Turns alternate: a matched pair keeps your turn, a miss passes it on.',
                               'Ходят по очереди: нашёл пару — ход остаётся, не совпало — ход переходит.') : '') + '</div>');
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
        letterBadge(idx) +
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
        letterBadge(idx) +
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
    var canBare = canBareWords(cfg);
    var bare = canBare && !!g.bare;
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
      } else {
        if (on) cls += ' active';
        if (g.wrong[w.id]) style = 'border-color:#dc2626;background:#fef2f2;color:#b91c1c;';
      }
      var shown = (bare && bareWord(w)) || w;
      return '<button type="button" class="' + cls + '" style="' + style + '" onclick="SAL.do(\'' + cfg.key + '\',\'catToggle\',\'' + w.id + '\')">' +
        shown.deva + iastSpan(shown.iast) + '</button>';
    }).join('');
    /* по умолчанию окончания видны; кнопка прячет их — род приходится вспоминать */
    var bareChip = canBare
      ? chip(cfg, 'catBare', bare ? '0' : '1',
          bare ? ru('👁 With endings', '👁 С окончаниями') : ru('🙈 No endings', '🙈 Без окончаний'), bare)
      : '';
    return topBar(pill(ru('Category', 'Категория') + ' ' + (g.i + 1) + '/' + cats.length) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      (bareChip ? bareChip + ' ' : '') + chip(cfg, 'restart', 'categories', '↺')) +
      centerCard(
        '<div class="cat-title" style="font-size:1.05rem;font-weight:800;color:var(--accent-cambridge);margin-bottom:0.35rem;">' + catTitle(cat) + '</div>' +
        '<div style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1rem;">' +
        ru('Select all the words that belong to this category', 'Выберите все слова, которые относятся к этой категории') + '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:center;">' + chips + '</div>' +
        '<div style="margin-top:1.15rem;display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;">' +
        (g.checked
          ? '<button type="button" class="btn btn-primary" style="padding:0.5rem 1.2rem;font-size:0.9rem;" onclick="SAL.do(\'' + cfg.key + '\',\'catNext\')">' +
            ru('Next →', 'Далее →') + '</button>'
          : '<button type="button" class="btn btn-primary" style="padding:0.5rem 1.2rem;font-size:0.9rem;" onclick="SAL.do(\'' + cfg.key + '\',\'catCheck\')">' +
            ru('Show Answer ✓', 'Показать ответ ✓') + '</button>') +
        '</div>' +
        (g.checked && !g.firstTry ? '<div style="margin-top:0.9rem;font-size:0.86rem;color:#b45309;font-weight:700;">' +
          ru('There was a wrong click — no point this round.', 'Был неверный клик — очко не начисляется.') + '</div>' : '') +
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
    var spellOrder = optionOrder(cfg, 'spelling', w, w.missingChoices,
      function (c) { return c; }, w.missingAnswer);
    var btns = spellOrder.map(function (oi, idx) {
      var c = w.missingChoices[oi];
      var cls = '';
      if (g.answered && c === w.missingAnswer) cls = 'correct';
      if (c === g.redPick) cls = 'wrong';
      return optBtn(cfg, 'spellPick', c, '<span style="font-family:var(--font-deva);font-size:1.35rem;font-weight:700;">' + c + '</span>', cls, idx);
    }).join('');
    return topBar(pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'restart', 'spelling', '↺')) +
      centerCard(
        '<div style="margin-bottom:0.5rem;">' + svgBox(w, 120) + '</div>' +
        '<div style="font-family:var(--font-deva);font-size:2.4rem;font-weight:700;letter-spacing:0.06em;">' + w.missingDisplay + '</div>' +
        '<div class="iast-text" style="margin-bottom:1rem;">' + w.iast + '</div>' +
        optGrid(btns) +
        (g.answered
          ? answerFeedback(cfg, g, w, 'spellingNext')
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
        optBtn(cfg, 'tfAnswer', 'yes', '<span style="font-family:var(--font-deva);font-size:1.5rem;">आम्</span> ' + ru('Yes', 'Да'), clsYes, 0) +
        optBtn(cfg, 'tfAnswer', 'no', '<span style="font-family:var(--font-deva);font-size:1.5rem;">न</span> ' + ru('No', 'Нет'), clsNo, 1) +
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
      pane.querySelectorAll('[data-players]').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-players') === String(st.players));
      });
      pane.querySelectorAll('[data-key]').forEach(function (b) {
        b.classList.toggle('active', !!st.teacherKey);
      });
      /* 👤/👥 — только у игр, где второй ученик действительно есть */
      var duo = SAL.isDuoGame(st.game);
      pane.querySelectorAll('[data-players]').forEach(function (b) {
        b.style.display = duo ? '' : 'none';
      });
      var toggle = document.getElementById(cfg.key + '-players-toggle');
      if (toggle) toggle.style.display = duo ? '' : 'none';
      var soloNote = document.getElementById(cfg.key + '-solo-note');
      if (soloNote) soloNote.style.display = duo ? 'none' : '';
    }
    var arena = document.getElementById(cfg.key + '-practice-arena');
    if (!arena) return;
    var fn = GAME_RENDER[st.game] || renderMasked;
    arena.innerHTML = gameTitleHtml(pane, '[data-game="' + st.game + '"]', cfg, st.game) + rulesHtml(cfg, st) + fn(cfg, st);
  }

  /* =========================================================================
     PRODUCTION
     ========================================================================= */
  function clearExtra() {
    if (timers.extra) { clearTimeout(timers.extra); clearInterval(timers.extra); timers.extra = null; }
  }
  function stopTimers() {
    if (timers.sprint) { clearInterval(timers.sprint); timers.sprint = null; }
    if (timers.chant) { clearInterval(timers.chant); timers.chant = null; }
    clearExtra();
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

  /* =========================================================================
     SPRINT ACROSS LESSONS — production mode 5, only for a lesson that
     declares `unionSprint` (Lesson 2 · the face: L2 + L3; Lesson 3 · colours:
     L2 + L3 + LC). One timed run over every word of the listed lessons.
     4 / 3 / 2 seconds a picture;
     the student names the word aloud, then checks it himself (✓ / ✕).
     ========================================================================= */
  var UNION_BEST = 'sal.unionSprint.best.';

  function unionWords(cfg) {
    var out = [];
    (cfg.unionSprint || []).forEach(function (k) {
      var c = lessons[k];
      if (!c) return;
      c.words.forEach(function (w) { out.push({ cfg: c, w: w }); });
    });
    return out;
  }
  /* p.order keeps the run stable across re-renders: [index into unionWords()] */
  function unionOrder(cfg, p) {
    var all = unionWords(cfg);
    if (!p.order || p.order.length !== all.length) {
      p.order = all.map(function (_, i) { return i; });
      if (p.random) p.order = shuffle(p.order);
    }
    return p.order.map(function (i) { return all[i]; });
  }
  function unionBest(cfg) {
    try {
      var v = window.localStorage ? window.localStorage.getItem(UNION_BEST + cfg.key) : null;
      return v === null ? null : parseInt(v, 10);
    } catch (e) { return null; }
  }
  function saveUnionBest(cfg, p, total) {
    if (p.score < total) return;                 /* only a clean run sets a record */
    var prev = unionBest(cfg);
    if (prev === null || p.elapsed < prev) {
      try { window.localStorage.setItem(UNION_BEST + cfg.key, String(p.elapsed)); } catch (e) {}
    }
  }
  function startUnionTimer(cfg) {
    stopTimers();
    var p = state(cfg).prod.union;
    p.running = true;
    p.revealed = false;
    p.timeLeft = p.duration;
    var key = cfg.key;
    timers.sprint = setInterval(function () { unionTick(lessons[key]); }, 1000);
    SAL.refresh();
  }
  function unionTick(cfg) {
    var p = state(cfg).prod.union;
    if (state(cfg).prod.mode !== 'union' || p.finished) { stopTimers(); return; }
    p.elapsed++;
    p.timeLeft--;
    if (p.timeLeft <= 0) {
      stopTimers();
      p.running = false;
      p.started = true;
      p.revealed = true;
      SAL.speak(unionOrder(cfg, p)[p.i].w.ttsText);
    }
    SAL.refresh();
  }

  function renderUnionSprint(cfg, st) {
    var p = st.prod.union;
    var all = unionOrder(cfg, p);
    var total = all.length;
    if (!total) return stage('<div style="text-align:center;padding:1.5rem 1rem;">\u2014</div>');
    if (p.finished) {
      stopTimers();
      var extra = ru('Time', 'Время') + ': ' + p.elapsed + ' s \u00b7 ' +
        (p.elapsed / total).toFixed(1) + ' s / ' + ru('word', 'слово');
      var best = unionBest(cfg);
      if (best !== null) extra += '<br>\ud83c\udfc5 ' + ru('Best clean run', 'Рекорд без ошибок') + ': ' + best + ' s';
      if (p.wrong.length) {
        extra += '<br>' + ru('Repeat', 'Повторить') + ': ' + p.wrong.map(function (id) {
          var it = all.filter(function (x) { return x.w.id === id; })[0];
          return it ? it.w.deva : id;
        }).join(' \u00b7 ');
      }
      return finalScreen(cfg, 'unionRestart', tx({ ru: '5. Спринт: тело + лицо ⏱', en: '5. Sprint: Body + Face ⏱' }),
        p.score, total, extra);
    }
    var item = all[p.i], w = item.w;
    var startText = ru('▶ Start Timer', '▶ Запустить таймер') + ' (' + p.duration + 's)';
    var pauseText = ru('⏸ Pause', '⏸ Пауза');
    var revealText = ru('🔊 I Said It! Check Answer', '🔊 Я назвал вслух! Проверить');
    var visualHtml = p.visual === 'arrow'
      ? sprintArrowHtml(item.cfg, w.id)
      : '<div class="vocab-svg-box" style="width:142px;height:142px;margin-bottom:0.75rem;">' + w.svg + '</div>';

    var rows = '<div class="game-top-bar" style="margin-bottom:0.6rem;">' +
      '<div style="display:flex;align-items:center;gap:0.45rem;flex-wrap:wrap;">' +
      chip(cfg, 'unionMix', 'ordered', ru('1→2 In Lesson Order', '1→2 по урокам'), !p.random) +
      chip(cfg, 'unionMix', 'shuffle', ru('🔀 Shuffled', '🔀 Вперемешку'), p.random) +
      '<span style="color:var(--border-strong);margin:0 0.15rem;">|</span>' +
      chip(cfg, 'unionDur', '4', '4s', p.duration === 4) +
      chip(cfg, 'unionDur', '3', '3s', p.duration === 3) +
      chip(cfg, 'unionDur', '2', '2s', p.duration === 2) +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:0.5rem;">' +
      chip(cfg, 'unionRestart', '', '↺ ' + ru('Start Over', 'Начать сначала')) +
      pill(p.score + ' / ' + total + ' · (' + (p.i + 1) + '/' + total + ')') +
      pill('⏱ ' + p.elapsed + ' s') +
      '</div></div>' +
      '<div style="display:flex;justify-content:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.85rem;">' +
      chip(cfg, 'unionVisual', 'card', ru('🖼 Isolated Picture', '🖼 Отдельная картинка'), p.visual === 'card') +
      chip(cfg, 'unionVisual', 'arrow', ru('🏹 Arrow on the Diagram', '🏹 Стрелка на схеме'), p.visual === 'arrow') +
      '</div>' +
      '<div style="text-align:center;font-size:0.9rem;font-weight:600;color:var(--text-secondary);margin-bottom:0.85rem;">' +
      ru('Say the Sanskrit word aloud BEFORE time runs out (' + gesture(item.cfg) + '):',
         'Назовите слово вслух ДО окончания таймера (' + gesture(item.cfg) + '):') + '</div>' +
      '<div class="flashcard-box" style="cursor:default;">' +
      '<div style="font-family:var(--font-deva);font-weight:700;font-size:0.95rem;color:var(--text-secondary);' +
      'margin-bottom:0.5rem;">' + item.cfg.titleDeva + '</div>' +
      visualHtml;

    if (!p.revealed) {
      rows += '<div style="font-size:2rem;font-weight:800;color:' + (p.running ? '#dc2626' : 'var(--accent-cambridge)') +
        ';margin-bottom:0.65rem;">⏱ ' + p.timeLeft + 's</div>' +
        '<div style="display:flex;gap:0.6rem;flex-wrap:wrap;justify-content:center;">' +
        (p.running
          ? '<button type="button" class="chip-btn" onclick="SAL.do(\'' + cfg.key + '\',\'unionPause\')">' + pauseText + '</button>'
          : '<button type="button" class="btn btn-primary" style="padding:0.55rem 1.2rem;font-size:0.92rem;" onclick="SAL.do(\'' +
            cfg.key + '\',\'unionBegin\')">' + startText + '</button>') +
        '<button type="button" class="chip-btn" onclick="SAL.do(\'' + cfg.key + '\',\'unionReveal\')">' + revealText + '</button>' +
        '</div>';
    } else {
      rows += '<div class="vocab-deva" style="font-size:2.5rem;color:#15803d;margin-bottom:0.15rem;">' + w.deva + '</div>' +
        '<div class="vocab-iast" style="font-size:1.1rem;margin-bottom:0.85rem;">' + w.iast + '</div>' +
        '<div style="display:flex;gap:0.65rem;flex-wrap:wrap;justify-content:center;">' +
        chip(cfg, 'speak', w.ttsText, '🔊') +
        '<button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;" onclick="SAL.do(\'' + cfg.key +
        '\',\'unionGrade\',\'0\')">' + ru('✕ Missed', '✕ Не успел / ошибся') + '</button>' +
        '<button type="button" class="chip-btn active" style="background:#16a34a;border-color:#16a34a;" onclick="SAL.do(\'' +
        cfg.key + '\',\'unionGrade\',\'1\')">' + ru('✓ Said It in Time!', '✓ Успел назвать верно!') + '</button>' +
        '</div>';
    }
    return rows + '</div>';
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
    var cardLabel = ru('🖼 Isolated Picture', '🖼 Отдельная картинка');
    var arrowLabel = ru('🏹 Arrow on the Diagram', '🏹 Стрелка на схеме');
    var enableText = ru('▶ Enable Timer & Start Game', '▶ Включить таймер и начать игру') + ' (' + p.duration + 's)';
    var startText = ru('▶ Start Timer', '▶ Запустить таймер') + ' (' + p.duration + 's)';
    var pauseText = ru('⏸ Pause', '⏸ Пауза');
    var revealText = ru('🔊 I Said It! Check Answer', '🔊 Я назвал вслух! Проверить');
    var sprintGesture = gesture(cfg);
    var promptText = p.subMode === 'slideshow'
      ? ru('Pictures advance automatically every ' + p.duration + 's with no text and no sound — say all ' + N + ' words aloud in time!',
           'Картинки сменяют друг друга каждые ' + p.duration + ' сек без текста и звука — успевайте называть все ' + N + ' слов вслух!')
      : (sprintGesture
          ? ru('Say the Sanskrit word aloud BEFORE time runs out (' + sprintGesture + '):',
               'Назовите слово вслух ДО окончания таймера (' + sprintGesture + '):')
          : ru('Say the Sanskrit word aloud BEFORE time runs out:',
               'Назовите слово вслух ДО окончания таймера:'));
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
  /* «Что пропало на рисунке?»: у пина может быть свой `erase` — фигура, которой
     закрашивается пропавший предмет фоном. Иначе (например, на портрете лица)
     рисунок остаётся целым и знак «?» только указывает место. */
  function renderMissing(cfg, st) {
    var m = st.prod.missing;
    var all = allPinsOf(cfg);
    var N = all.length;
    if (m.finished || m.i >= N) {
      return finalScreen(cfg, 'missingRestart', ru("3. What's Missing on the Portrait? ❓", '3. Что пропало на рисунке? ❓'), m.score, N);
    }
    var cur = all[m.i];
    var w = byId(cfg, cur.pin.id);
    var erase = cur.pin.erase || '';
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
      ' xmlns="http://www.w3.org/2000/svg">' + cur.fig.art + erase + marker + '</svg>' +
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
        '<div><strong>1.</strong> ' + (gesture(cfg)
          ? ru('Tap the words in order, ' + gesture(cfg).toUpperCase() + ' and say the word aloud.',
               'Нажимайте слова по порядку, ' + gesture(cfg).toUpperCase() + ' и называйте слово вслух.')
          : ru('Tap the words in order and say the word aloud.',
               'Нажимайте слова по порядку и называйте слово вслух.')) + '</div>' +
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
    else if (m === 'union') box.innerHTML = renderUnionSprint(cfg, st);
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
    discoveryToggle: function (cfg, st) { if (cfg.discovery) st.pres.discoveryOpen = !st.pres.discoveryOpen; },
    translationToggle: function (cfg, st) { if (cfg.discovery) st.pres.translationsShown = !st.pres.translationsShown; },
    hotspot: function (cfg, st, id) { st.pres.hotspotId = id; SAL.speak(byId(cfg, id).ttsText); },
    hotspotStep: function (cfg, st, a) {
      var order = orderedByPins(cfg);
      var idx = order.indexOf(st.pres.hotspotId);
      var next = order[(idx + parseInt(a, 10) + order.length) % order.length];
      st.pres.hotspotId = next; SAL.speak(byId(cfg, next).ttsText);
    },

    /* practice: shared */
    /* switching to a practice game stops every production timer: no sprint may
       keep counting (and suddenly speak) while the student is elsewhere */
    setGame: function (cfg, st, a) {
      stopTimers();
      clearExtra();
      if (st.prod.sprint) st.prod.sprint.running = false;
      if (st.prod.union) st.prod.union.running = false;
      st.game = a;
    },
    toggleRules: function (cfg, st, a) {
      if (a === '__l1') {
        rulesOpenL1 = !rulesOpenL1;
        if (typeof refreshLesson1 === 'function') refreshLesson1();
        return;
      }
      st.rulesOpen = st.rulesOpen === false;
    },
    /* recycling blocks — same games, the compound / previous-lesson word lists */
    rcGame: function (cfg, st, a, b) {
      var shim = recycleOf(cfg, b);
      if (shim) { stopTimers(); clearExtra(); state(shim).game = a; }
    },
    rcProd: function (cfg, st, a, b) {
      var shim = recycleOf(cfg, b);
      if (!shim) return;
      stopTimers();
      var pst = state(shim);
      if (pst.prod.sprint) pst.prod.sprint.running = false;
      pst.prod.mode = a;
    },
    restart: function (cfg, st, a) {
      clearExtra();
      /* «Начать сначала» у режимов Production перерисовывает ТОЛЬКО свою сцену.
         Раньше этот же обработчик писал a в состояние Practice (st.game =
         'sprintRestart'), и арена Practice молча переключалась на первую игру
         с погашенными вкладками. Теперь Practice не трогаем вообще. */
      if (a === 'sprintRestart') { st.prod.sprint = makeState(cfg).prod.sprint; st.prod.mode = 'sprint'; return; }
      if (a === 'micRestart') { st.prod.mic = makeState(cfg).prod.mic; st.prod.mode = 'mic'; return; }
      if (a === 'missingRestart') { st.prod.missing = makeState(cfg).prod.missing; st.prod.mode = 'missingpart'; return; }
      if (a === 'unionRestart') { ACTIONS.unionRestart(cfg, st); return; }
      st.g[a] = (GAME_INIT[a] || function () { return {}; })(cfg, st);
      st.game = a;
    },

    /* 1 masked */
    /* Lesson 1 game 1 is a self-check drill: say the word aloud, uncover it, then grade yourself ✓/✕ */
    maskedFlip: function (cfg, st) {
      var g = gst(cfg, 'masked');
      g.shown = !g.shown;
      if (g.shown) SAL.speak(cfg.words[g.i].ttsText);
    },
    maskedGrade: function (cfg, st, a) {
      var g = gst(cfg, 'masked');
      if (a === '1') g.score++; else noteWrong(cfg, cfg.words[g.i].id);
      g.i++; g.shown = false;
      if (g.i >= cfg.words.length) g.finished = true;
    },
    maskedNext: function (cfg, st) {
      var g = gst(cfg, 'masked');
      g.i++; g.answered = false; g.picked = null; g.shown = false;
    },
    maskedView: function (cfg, st, a) { gst(cfg, 'masked').view = a; },
    /* вторая версия игры: закрыт и конец прилагательного. При смене версии
       снова закрываем слова — иначе ответ уже виден с прошлого раза. */
    maskedBoth: function (cfg, st, a) {
      var g = gst(cfg, 'masked');
      if ((a === '1') !== !!g.both) { g.shown = false; g.revealed = {}; }
      g.both = a === '1';
    },
    maskedReveal: function (cfg, st, id) {
      var g = gst(cfg, 'masked');
      if (g.revealed[id]) delete g.revealed[id]; else { g.revealed[id] = true; SAL.speak(byId(cfg, id).ttsText); }
    },
    maskedGridReset: function (cfg, st) { gst(cfg, 'masked').revealed = {}; },

    /* 2 flashcards */
    fcFlip: function (cfg, st) { gst(cfg, 'flashcards').flipped = !gst(cfg, 'flashcards').flipped; },
    fcAnswer: function (cfg, st, a) {
      var g = gst(cfg, 'flashcards');
      if (a === '1') g.score++; else noteWrong(cfg, cfg.words[g.i].id);
      g.i++; g.flipped = false;
      if (g.i >= cfg.words.length) g.finished = true;
    },

    /* 3 gaps */
    gapBoth: function (cfg, st, a) {
      var g = gst(cfg, 'gaps');
      var both = a === '1';
      if (g.both === both) return;
      g.both = both;
      /* другой пропуск — другой вопрос: старый ответ не должен остаться на экране */
      g.answered = false; g.picked = null; g.redPick = null; g.firstTry = true;
    },
    gapPick: function (cfg, st, a) {
      var g = gst(cfg, 'gaps');
      if (g.answered) return;
      var w = cfg.words[g.i];
      if (a !== w.gapAnswer) { g.firstTry = false; g.redPick = a; noteWrong(cfg, w.id); return; }
      g.answered = true; g.picked = a;
      if (g.firstTry) g.score++;
      SAL.speak(w.ttsText);
    },
    gapsNext: function (cfg, st) {
      var g = gst(cfg, 'gaps');
      g.i++; g.answered = false; g.picked = null; g.firstTry = true; g.redPick = null;
      if (g.i >= cfg.words.length) g.finished = true;
    },

    /* 4 / 5 quizzes */
    quizPick: function (cfg, st, id) {
      var st2 = state(cfg);
      var g = gst(cfg, st2.game);
      if (g.answered) return;
      var w = cfg.words[g.i];
      if (id !== w.id) { g.firstTry = false; g.redPick = id; noteWrong(cfg, w.id); return; }
      g.answered = true; g.picked = id;
      if (g.firstTry) g.score++;
      SAL.speak(w.ttsText);
    },
    picquizNext: function (cfg, st) {
      var g = gst(cfg, 'picquiz');
      g.i++; g.answered = false; g.picked = null; g.options = null; g.firstTry = true; g.redPick = null;
      if (g.i >= cfg.words.length) g.finished = true;
    },
    wordquizNext: function (cfg, st) {
      var g = gst(cfg, 'wordquiz');
      g.i++; g.answered = false; g.picked = null; g.options = null; g.firstTry = true; g.redPick = null;
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
        var duoMatch = st.players === 2;
        if (a1.kind !== b1.kind && a1.id === b1.id) {
          g.matched[a1.id] = true; g.sel = null; g.wrong = null;
          if (!g.scores) g.scores = [0, 0];
          if (duoMatch) duoAward(g, g.turn || 0);
          SAL.speak(byId(cfg, a1.id).ttsText);
          var chunkNow = matchChunks(cfg)[g.stage] || [];
          var stageDone = chunkNow.every(function (w) { return g.matched[w.id]; });
          if (stageDone) {
            if (g.stage + 1 >= matchChunks(cfg).length) g.done = true;
            else { g.stage++; g.tiles = null; g.sel = null; }
          }
        } else {
          g.failed[a1.id] = true; noteWrong(cfg, a1.id);
          g.wrong = [g.sel, idx]; g.sel = null;
          if (duoMatch) { if (!g.scores) g.scores = [0, 0]; duoSwap(g); }
        }
      } else { /* memory */
        if (g.lock) return;
        if (g.flipped.indexOf(idx) >= 0 || g.matched[g.cards[idx].id]) return;
        g.flipped.push(idx);
        g.trapNote = null;             /* новый ход — старая ловушка больше не на столе */
        if (g.flipped.length < 2) return;
        g.moves++;
        var c1 = g.cards[g.flipped[0]], c2 = g.cards[g.flipped[1]];
        var duoMemT = st.players === 2;
        var trapCard = c1.kind === 'trap' ? c1 : (c2.kind === 'trap' ? c2 : null);
        if (!trapCard && c1.kind !== c2.kind && c1.id === c2.id) {
          g.matched[c1.id] = true; g.score++; g.flipped = [];
          if (duoMemT) duoAward(g, g.turn || 0);
          SAL.speak(byId(cfg, c1.id).ttsText);
        } else {
          if (trapCard) g.trapNote = trapCard.trap;
          if (c1.kind !== 'trap') {
            if (g.seen[c1.id]) g.failed[c1.id] = true;
            g.seen[c1.id] = true;
            noteWrong(cfg, c1.id);
          }
          if (c2.kind !== 'trap') g.seen[c2.id] = true;
          if (duoMemT) duoSwap(g);
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
      var traps = g.traps !== false;
      st.g.memory = GAME_INIT.memory(cfg, st);
      st.g.memory.size = Math.min(size, cfg.words.length);
      st.g.memory.traps = traps;          /* размер меняется — выбор ловушек остаётся */
    },
    /* «с ловушками / без ловушек»: поле пересобирается, размер сохраняется */
    memoryTraps: function (cfg, st, a) {
      var g = gst(cfg, 'memory');
      var want = a === '1';
      if ((g.traps !== false) === want) return;
      var size = g.size;
      st.g.memory = GAME_INIT.memory(cfg, st);
      st.g.memory.size = Math.min(size, cfg.words.length);
      st.g.memory.traps = want;
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
        noteWrong(cfg, wordId);
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
    catBare: function (cfg, st, a) { gst(cfg, 'categories').bare = a === '1'; },
    /* Lesson 1: every click is graded at once — a wrong word only costs the first-try point */
    catToggle: function (cfg, st, id) {
      var g = gst(cfg, 'categories');
      if (g.checked) return;
      var cat = cfg.categories[g.i];
      var isPrimary = cat.wordIds.indexOf(id) >= 0;
      var isBonus = (cat.bonusWordIds || []).indexOf(id) >= 0;
      if (!isPrimary && !isBonus) {
        g.firstTry = false;
        g.wrong[id] = true;
        return;
      }
      if (g.sel[id]) return;
      g.sel[id] = true;
      SAL.speak(byId(cfg, id).ttsText);
      var allPrimary = cat.wordIds.every(function (wid) { return g.sel[wid]; });
      if (allPrimary) {
        g.checked = true;
        if (g.firstTry) g.score++;
      }
    },
    catCheck: function (cfg, st) {
      var g = gst(cfg, 'categories');
      if (g.checked) return;
      var cat = cfg.categories[g.i];
      var sel = Object.keys(g.sel);
      var right = cat.wordIds.concat(cat.bonusWordIds || []);
      var perfect = sel.length === cat.wordIds.length && sel.every(function (id) { return right.indexOf(id) >= 0; });
      if (perfect) g.score++;
      else {
        cat.wordIds.forEach(function (id) { if (sel.indexOf(id) < 0) noteWrong(cfg, id); });
        sel.forEach(function (id) { if (right.indexOf(id) < 0) noteWrong(cfg, id); });
      }
      g.checked = true;
    },
    catNext: function (cfg, st) {
      var g = gst(cfg, 'categories');
      g.i++; g.sel = {}; g.wrong = {}; g.firstTry = true; g.checked = false;
      if (g.i >= cfg.categories.length) g.finished = true;
    },

    /* 11 spelling */
    spellPick: function (cfg, st, a) {
      var g = gst(cfg, 'spelling');
      if (g.answered) return;
      var w = cfg.words[g.i];
      if (a !== w.missingAnswer) { g.firstTry = false; g.redPick = a; noteWrong(cfg, w.id); return; }
      g.answered = true; g.picked = a;
      if (g.firstTry) g.score++;
      SAL.speak(w.ttsText);
    },
    spellingNext: function (cfg, st) {
      var g = gst(cfg, 'spelling');
      g.i++; g.answered = false; g.picked = null; g.firstTry = true; g.redPick = null;
      if (g.i >= cfg.words.length) g.finished = true;
    },

    /* 12 true / false */
    tfAnswer: function (cfg, st, a) {
      var g = gst(cfg, 'truefalse');
      if (g.answered) return;
      g.answered = true; g.picked = a;
      var right = g.isTrue ? 'yes' : 'no';
      if (a === right) { g.score++; SAL.speak(cfg.words[g.idx].ttsText); }
      else noteWrong(cfg, cfg.words[g.idx].id);
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
      if (st.prod.union) st.prod.union.running = false;
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

    /* Sprint across lessons 1 + 2: one picture at a time, 4 / 3 / 2 s each */
    unionDur: function (cfg, st, a) {
      stopTimers();
      var p = st.prod.union;
      p.duration = parseInt(a, 10) || 4;
      p.timeLeft = p.duration;
      p.running = false;
      if (p.started && !p.finished && !p.revealed) startUnionTimer(cfg);
    },
    unionVisual: function (cfg, st, a) { st.prod.union.visual = a; },
    unionMix: function (cfg, st, a) {
      stopTimers();
      var p = st.prod.union;
      p.random = a === 'shuffle';
      p.order = null;                 /* a new order means a new run */
      p.i = 0; p.score = 0; p.wrong = []; p.elapsed = 0;
      p.running = false; p.started = false; p.revealed = false; p.finished = false;
      p.timeLeft = p.duration;
    },
    unionBegin: function (cfg, st) {
      st.prod.union.started = true;
      startUnionTimer(cfg);
    },
    unionPause: function (cfg, st) {
      stopTimers();
      st.prod.union.running = false;
    },
    unionReveal: function (cfg, st) {
      stopTimers();
      var p = st.prod.union;
      p.running = false; p.started = true; p.revealed = true;
      SAL.speak(unionOrder(cfg, p)[p.i].w.ttsText);
    },
    unionGrade: function (cfg, st, a) {
      stopTimers();
      var p = st.prod.union;
      var all = unionOrder(cfg, p);
      var item = all[p.i];
      p.running = false;
      if (a === '1') {
        p.score++;
        state(item.cfg).prod.produced[item.w.id] = true;
      } else {
        p.wrong.push(item.w.id);
        noteWrong(item.cfg, item.w.id);
      }
      if (p.i + 1 >= all.length) {
        p.finished = true;
        p.revealed = false;
        saveUnionBest(cfg, p, all.length);
      } else {
        p.i++;
        p.revealed = false;
        p.timeLeft = p.duration;
        startUnionTimer(cfg);
      }
    },
    unionRestart: function (cfg, st) {
      stopTimers();
      var old = st.prod.union;
      var fresh = makeState(cfg).prod.union;
      fresh.duration = old.duration;
      fresh.visual = old.visual;
      fresh.random = old.random;
      fresh.timeLeft = old.duration;
      st.prod.union = fresh;
      st.prod.mode = 'union';
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

  /* =========================================================================
     RULES — every practice game carries its own short manual
     =========================================================================
     Aim / how to play / scoring / pair play / a note for the teacher, in RU
     and EN, shown in a collapsible panel above the game. Lessons add rules
     for their own games with SAL.addRules(); the standalone lesson 1 calls
     SAL.rulesPanel(gameKey).
     ------------------------------------------------------------------------ */
  var RULES = {
    masked: {
      aim: { ru: 'Вспомнить слово по картинке без всякой подсказки и честно оценить себя.',
             en: 'Recall the word from the picture with no prompt at all, and grade yourself honestly.' },
      how: { ru: ['Посмотрите на картинку и назовите слово вслух — про себя не считается.',
                  'Нажмите «Открыть» (или на саму карточку) — слово открывается.',
                  '✓ «Знаю» — если назвали верно; ✕ «Повторить» — если нет.',
                  'Кнопка «все слова ■» показывает весь список сразу: открывайте в любом порядке.'],
             en: ['Look at the picture and say the word aloud — saying it in your head does not count.',
                  'Press “Show” (or the card itself) and the word appears.',
                  '✓ “I knew it” if you were right; ✕ “Repeat” if not.',
                  'The “all words ■” view shows the whole list at once: open them in any order.'] },
      score: { ru: 'Очко за каждый ✓. ✕ не снимает очко, но отправляет слово в копилку ошибок — игра 14 повторит его отдельно.',
               en: 'A point for every ✓. ✕ costs no point, but drops the word into the mistake pile — game 14 drills it again.' },
      tip: { ru: 'Не подсказывайте. Ошибку исправьте на месте: пусть ученик произнесёт верную форму и нажмёт ✕.',
             en: 'Do not prompt. Correct on the spot: have the student say the right form, then press ✕.' },
      /* В уроке рода у игры есть вторая версия: закрыт и конец прилагательного.
         Добавляем про неё шаг только там, где такая версия действительно есть. */
      adapt: function (cfg) {
        if (!hasBothMask(cfg)) return null;
        var base = this, out = {}, k;
        for (k in base) if (Object.prototype.hasOwnProperty.call(base, k) && k !== 'adapt') out[k] = base[k];
        out.how = {
          ru: base.how.ru.concat(['«Версия 2» закрывает ещё и конец прилагательного: श्या ■ लला ■. Назовите оба окончания и проверьте, что они совпадают.']),
          en: base.how.en.concat(['“Version 2” also hides the end of the adjective: श्या ■ लला ■. Say both endings and check that they match.'])
        };
        return out;
      }
    },
    flashcards: {
      aim: { ru: 'Самое быстрое узнавание: картинка → слово, без письма.',
             en: 'Fastest recognition: picture → word, no writing involved.' },
      how: { ru: ['Назовите слово по картинке вслух.',
                  '👁 «Показать» — проверьте себя по написанию.',
                  '🔊 — послушать слово; ✓ или ✕ — оценить себя.'],
             en: ['Say the word for the picture aloud.',
                  '👁 “Show” — check yourself against the written word.',
                  '🔊 to listen; ✓ or ✕ to grade yourself.'] },
      score: { ru: 'Очко за каждый ✓. Промахи уходят в копилку ошибок (игра 14).',
               en: 'A point per ✓. Misses go to the mistake pile (game 14).' },
      tip: { ru: 'Держите темп 3–4 секунды на карточку: это разогрев, а не экзамен.',
             en: 'Keep it at 3–4 seconds a card: this is a warm-up, not a test.' }
    },
    gaps: {
      aim: { ru: 'Точность написания: в слове пропущена одна часть.',
             en: 'Spelling accuracy: one part of the word is missing.' },
      how: { ru: ['Прочитайте слово с пропуском и выберите вариант A–D.',
                  'Назовите ответ вслух буквой («B») — так быстрее и слышно всему классу.',
                  'Ошиблись — вариант станет красным, будет вторая попытка.',
                  'После ответа игра показывает верное слово и включает 🔊.'],
             en: ['Read the word with the gap and choose A–D.',
                  'Say the letter of your answer out loud (“B”) — quicker, and the whole class is involved.',
                  'A wrong pick turns red and you get a second try.',
                  'After the answer the game shows the correct word and lets you hear it.'] },
      score: { ru: 'Очко даётся только за первую попытку. Вторая попытка спасает раунд, но не счёт; ошибка кладёт слово в копилку.',
               en: 'A point only for the first try. The second try saves the round but not the score; a miss drops the word into the pile.' },
      tip: { ru: 'Если ученик ошибся — пусть назовёт, в чём именно разница между его вариантом и верным.',
             en: 'When a student misses, make them say what exactly differs between their pick and the right one.' },
      /* вторая версия есть только там, где слова — «цвет + существительное» */
      adapt: function (cfg) {
        if (!hasBothMask(cfg)) return null;
        var base = this, out = {}, k;
        for (k in base) if (Object.prototype.hasOwnProperty.call(base, k) && k !== 'adapt') out[k] = base[k];
        out.how = {
          ru: base.how.ru.concat(['«Версия 2» прячет и конец прилагательного: श्या_ ललाट_. Окончание одно и то же — оно подходит и цвету, и слову.']),
          en: base.how.en.concat(['“Version 2” also hides the end of the adjective: श्या_ ललाट_. The ending is the same — it fits both the colour and the noun.'])
        };
        return out;
      }
    },
    picquiz: {
      aim: { ru: 'Узнавание: картинка → написание слова.',
             en: 'Recognition: picture → written word.' },
      how: { ru: ['Посмотрите на картинку.',
                  'Выберите слово из четырёх вариантов (A–D).',
                  'Ошибка даёт вторую попытку, верный вариант подсвечивается зелёным.'],
             en: ['Look at the picture.',
                  'Choose the word from four options (A–D).',
                  'A wrong pick gives a second try; the right one turns green.'] },
      score: { ru: 'Очко только с первой попытки.',
               en: 'A point only for the first try.' }
    },
    wordquiz: {
      aim: { ru: 'Чтение: написанное слово → смысл (картинка).',
             en: 'Reading: the written word → its meaning (the picture).' },
      how: { ru: ['Прочитайте слово в деванагари.',
                  'Найдите среди четырёх картинок ту, которую оно называет.',
                  'Ошибка даёт вторую попытку.'],
             en: ['Read the word in Devanagari.',
                  'Find the picture it names among the four.',
                  'A wrong pick gives a second try.'] },
      score: { ru: 'Очко только с первой попытки. Это самая медленная из игр на узнавание — не гоните.',
               en: 'A point only for the first try. This is the slowest of the recognition games — do not rush it.' }
    },
    match: {
      aim: { ru: 'Связать картинку и написание, пока все слова перед глазами.',
             en: 'Tie picture and spelling together with every word in front of you.' },
      how: { ru: ['Нажмите картинку, затем её слово — так собирается пара.',
                  'Пары даются этапами: следующий этап откроется, когда закрыт предыдущий.',
                  'Ошибка не страшна: пара просто не закрывается, пробуйте снова.'],
             en: ['Tap a picture, then its word — that makes a pair.',
                  'Pairs come in stages: the next stage opens once the previous one is cleared.',
                  'A mismatch does nothing: the pair simply stays, try again.'] },
      score: { ru: 'Считаются пары, закрытые с первой попытки; счётчик показывает, сколько пар стоит повторить.',
               en: 'Pairs matched first try are counted; the counter shows how many pairs need another look.' }
    },
    memory: {
      aim: { ru: 'Память плюс чтение; единственная из классических игр, где ученик работает вслух по клеткам.',
             en: 'Memory plus reading; the one classic game where the student works out loud, square by square.' },
      how: { ru: ['Откройте две карточки: картинка и её слово — пара.',
                  'Не совпали — карточки закроются; постарайтесь запомнить, что где.',
                  'Размер поля переключается над ним: все слова или только половина.',
                  'Называйте карточку по клетке: буква — ряд, цифра — столбец (например b2).'],
             en: ['Open two cards: a picture and its word make a pair.',
                  'If they do not match they close again — try to remember what was where.',
                  'The size of the board is switched above it: all the words, or only half of them.',
                  'Name a card by its square: the letter is the row, the number is the column (b2, for example).'] },
      score: { ru: 'Считаются пары и ходы; пары, в которых ошиблись, помечаются как «на повтор».',
               en: 'Pairs and moves are counted; pairs you missed are marked for review.' },
      pair: { ru: 'Ходите по очереди; совпавшая пара даёт право на ещё один ход. Вслух называйте клетку, а не тыкайте пальцем.',
              en: 'Take turns; a matched pair earns another turn. Say the square out loud instead of pointing.' },
      /* ловушки есть только в уроке рода — там род и проверяется */
      adapt: function (cfg) {
        if (!cfg.memoryTraps || !cfg.memoryTraps.length) return null;
        var base = this, out = {}, k;
        for (k in base) if (Object.prototype.hasOwnProperty.call(base, k) && k !== 'adapt') out[k] = base[k];
        out.how = {
          ru: base.how.ru.concat([
            'На поле лежат ловушки: оба слова согласованы друг с другом, но род выбран неверный — श्वेतः उदरः (оба в мужском, а उदर среднего рода). Пары у ловушки нет; при промахе игра называет правильную форму — श्वेतम् उदरम्.',
            'Кнопка «Ловушки: ⚠ с ловушками / без ловушек» над полем убирает их: без ловушек это обычное «Мемори» по картинкам.'
          ]),
          en: base.how.en.concat([
            'The board also holds traps: the two words agree with each other, but the gender is the wrong one — श्वेतः उदरः (both masculine, yet उदर is neuter). A trap has no pair; after a miss the game gives the correct form — श्वेतम् उदरम्.',
            'The “Traps: ⚠ with traps / without traps” button above the board removes them: without traps it is a plain picture Memory.'
          ])
        };
        return out;
      }
    },
    wronglabel: {
      aim: { ru: 'Заметить, где подпись не соответствует картинке.',
             en: 'Spot the card whose label does not match its picture.' },
      how: { ru: ['На трёх карточках — картинка и подпись; одна подпись НЕВЕРНАЯ.',
                  'Нажмите эту карточку (A, B или C).',
                  'Ошиблись — карточка станет красной, раунд продолжается.',
                  'После верного ответа игра показывает, в чём именно ошибка, и даёт послушать верное слово.'],
             en: ['Three cards show a picture and a label; one label is WRONG.',
                  'Press that card (A, B or C).',
                  'A wrong pick turns red and the round goes on.',
                  'After the correct answer the game explains exactly what the mistake was and lets you hear the right word.'] },
      score: { ru: 'Очко с первой попытки; вторая попытка очка не даёт.',
               en: 'A point for the first try; the second try earns none.' }
    },
    typo: {
      aim: { ru: 'Зоркость к одной букве: долгота, качество гласной, носовой, ретрофлексный звук.',
             en: 'Keenness for a single letter: vowel length, vowel quality, the nasal, a retroflex.' },
      how: { ru: ['На трёх карточках одно слово написано с ошибкой в одной букве.',
                  'Найдите его (A, B или C).',
                  'В разборе игра зачёркивает неверную форму, показывает верную и называет тип ошибки.'],
             en: ['One of three cards has a one-letter spelling mistake.',
                  'Find it (A, B or C).',
                  'The feedback strikes the wrong form through, shows the right one and names the kind of error.'] },
      score: { ru: 'Очко с первой попытки.',
               en: 'A point for the first try.' },
      tip: { ru: 'Полезно произносить пару вслух (dve / dvai) — ухо ловит то, что глаз пропускает.',
             en: 'Say the pair aloud (dve / dvai) — the ear catches what the eye skips.' }
    },
    categories: {
      aim: { ru: 'Осмысленная группировка: перебрать все слова урока под одним признаком.',
             en: 'Meaningful grouping: go through every word of the lesson under one heading.' },
      how: { ru: ['Прочитайте название категории.',
                  'Отметьте ВСЕ слова, которые к ней относятся (их может быть два, три или четыре).',
                  '«Показать ответ» — проверьте себя; лишние слова раунд не закрывают.'],
             en: ['Read the name of the category.',
                  'Tick ALL the words that belong to it (there may be two, three or four).',
                  '“Show answer” to check yourself; extra words keep the round open.'] },
      score: { ru: 'Очко, если отмечены все нужные слова и ни одного лишнего.',
               en: 'A point if all the right words are ticked and no extra ones.' },
      /* кнопка есть только там, где окончание выдаёт род */
      adapt: function (cfg) {
        if (!canBareWords(cfg)) return null;
        var base = this, out = {}, k;
        for (k in base) if (Object.prototype.hasOwnProperty.call(base, k) && k !== 'adapt') out[k] = base[k];
        out.how = {
          ru: base.how.ru.concat(['Кнопка «🙈 Без окончаний» убирает ः, म् и ा — род приходится вспоминать, а не читать с конца слова.']),
          en: base.how.en.concat(['The “🙈 No endings” button hides ः, म् and ा — now the gender has to be recalled, not read off the word.'])
        };
        return out;
      }
    },
    spelling: {
      aim: { ru: 'Точность написания: собрать слово из частей.',
             en: 'Spelling accuracy: assemble the word from its parts.' },
      how: { ru: ['В слове пропущена часть — на месте пропуска стоит подчёркивание.',
                  'Выберите подходящую часть из вариантов A–D.',
                  'Ошибка даёт вторую попытку, затем игра показывает верное слово и включает 🔊.'],
             en: ['A part of the word is missing, marked with an underscore.',
                  'Choose the right part from A–D.',
                  'A wrong pick gives a second try; then the game shows the word and lets you hear it.'] },
      score: { ru: 'Очко только с первой попытки.',
               en: 'A point only for the first try.' }
    },
    truefalse: {
      aim: { ru: 'Реакция «да / нет» по‑санскритски: आम् / न.',
             en: 'A yes / no reflex in Sanskrit: आम् / न.' },
      how: { ru: ['Игра показывает картинку и слово.',
                  'Подходит ли это слово к этой картинке? A — आम् (да), B — न (нет).'],
             en: ['The game shows a picture and a word.',
                  'Does the word belong to the picture? A — आम् (yes), B — न (no).'] },
      score: { ru: 'Очко за верный ответ; ошибка отправляет слово в копилку.',
               en: 'A point for a correct answer; a miss drops the word into the pile.' }
    }
  };
  function txPair(o) { return o ? tx({ ru: o.ru, en: o.en }) : ''; }
  function rulesBlock(r, open, onclick) {
    var how = r.how ? txPair(r.how) : null;
    var howHtml = how && how.length
      ? '<ol class="rules-list">' + how.map(function (step) { return '<li>' + step + '</li>'; }).join('') + '</ol>'
      : '';
    function row(label, text, cls) {
      return text ? '<div class="rules-row' + (cls ? ' ' + cls : '') + '">' +
        '<span class="rules-label">' + label + '.</span> ' + text + '</div>' : '';
    }
    return '<div class="game-rules' + (open ? ' open' : '') + '">' +
      '<button type="button" class="game-rules-head" onclick="' + onclick + '">' +
        '<span>ℹ ' + tx({ ru: 'Правила игры', en: 'How to play' }) + '</span>' +
        '<span class="game-rules-caret">' + (open ? '▾' : '▸') + '</span></button>' +
      (open
        ? '<div class="game-rules-body">' +
          row(tx({ ru: 'Цель', en: 'Aim' }), txPair(r.aim)) +
          row(tx({ ru: 'Как играть', en: 'Steps' }), howHtml, 'rules-how') +
          row(tx({ ru: 'Счёт и ошибки', en: 'Scoring' }), txPair(r.score)) +
          row(tx({ ru: 'Вдвоём', en: 'In pairs' }), txPair(r.pair)) +
          row(tx({ ru: 'Преподавателю', en: 'Teacher' }), txPair(r.tip)) +
          '</div>'
        : '') +
      '</div>';
  }
  function rulesHtml(cfg, st) {
    var r = RULES[st.game];
    if (!r) return '';
    /* a game may describe itself differently per lesson (numerals: quantity options) */
    if (typeof r.adapt === 'function') r = r.adapt(cfg) || r;
    return rulesBlock(r, st.rulesOpen !== false,
      'SAL.do(\'' + cfg.key + '\',\'toggleRules\')');
  }
  /* the standalone 12-word lesson (lesson1.js) renders its own arena */
  var rulesOpenL1 = true;
  SAL.rulesPanel = function (gameKey) {
    var r = RULES[gameKey];
    if (!r) return '';
    return rulesBlock(r, rulesOpenL1, 'SAL.do(\'\',\'toggleRules\',\'__l1\')');
  };

  /* =========================================================================
     EXTENSION POINT — extra practice games live in games-extra.js
     ========================================================================= */
  var EXTRA_LABELS = {};
  SAL.addGame = function (key, spec) {
    EXTRA_LABELS[key] = { ru: spec.labelRu || key, en: spec.labelEn || spec.labelRu || key };
    GAME_INIT[key] = spec.init || function () { return {}; };
    GAME_RENDER[key] = spec.render;
    Object.keys(spec.actions || {}).forEach(function (a) { ACTIONS[a] = spec.actions[a]; });
  };
  SAL.addAction = function (name, fn) { ACTIONS[name] = fn; };
  SAL.addRules = function (game, spec) { RULES[game] = spec; };
  SAL.kit = {
    ru: ru, tx: tx, shuffle: shuffle, others: others, byId: byId,
    optBtn: optBtn, chip: chip, topBar: topBar, pill: pill, stage: stage,
    centerCard: centerCard, svgBox: svgBox, finalScreen: finalScreen, optGrid: optGrid,
    wordBtn: wordBtn, letterBadge: letterBadge, LETTERS: LETTERS,
    cellName: cellName, memoryCols: memoryCols,
    gst: gst, state: state, iastOn: iastOn,
    maskedMarkup: maskedMarkup, devaLabel: devaLabel, iastSpan: iastSpan,
    answerFeedback: answerFeedback, restartRow: restartRow,
    noteWrong: noteWrong, pileIds: pileIds, pileDrop: pileDrop, pileClear: pileClear,
    speak: function (t) { SAL.speak(t); },
    /* one shared timer slot: the extra games never run two at once */
    after: function (ms, fn) { clearExtra(); timers.extra = setTimeout(fn, ms); },
    clearAfter: clearExtra,
    pending: function () { return !!timers.extra; }
  };

  /* ------------------------------------------------- click acknowledgement
     Same rule as Lesson 1: a click must always produce a visible reaction.
     Switching a game/mode scrolls its stage into view; re-clicking the already
     open game/mode and pressing a restart button pulse the stage instead. */
  /* Кнопки Production (спринт, микрофон, «что пропало?», спринт двух уроков)
     перерисовывают СВОЮ сцену — их «Начать сначала» живёт в production-stage,
     а не в арене Practice. Раньше любой restart адресовался practice-арене,
     и нажатие «Начать сначала» в спринте увозило страницу вверх. */
  var PROD_RESTART_RE = /^(sprint|mic|missing|union)Restart$/;
  function stageIdFor(cfg, action, block) {
    if (action === 'setPresMode') return cfg.key + '-pres-grid';
    if (action === 'setProdMode' || PROD_RESTART_RE.test(action)) return cfg.key + '-production-stage';
    if (action === 'rcGame') return recycleShimKey(cfg, recycleIndex(block)) + '-practice-arena';
    if (action === 'rcProd') return recycleShimKey(cfg, recycleIndex(block)) + '-production-stage';
    return cfg.key + '-practice-arena';
  }
  function ackClick(cfg, action, unchanged, domBefore) {
    var isSwitch = action === 'setGame' || action === 'setPresMode' || action === 'setProdMode' ||
      action === 'rcGame' || action === 'rcProd';
    var isRestart = action === 'restart' || /Restart$/.test(action) || action === 'memorySize' || action === 'matchNext';
    var id = stageIdFor(cfg, action);
    /* Прокрутка нужна ТОЛЬКО при переключении игры/режима (вкладки могут быть
       у нижнего края экрана). Restart нажимают на самой сцене, которая уже
       перед глазами: любая прокрутка здесь — это прыжок экрана, поэтому
       restart только подсвечивается кольцом и ничего не двигает. */
    if (isSwitch) {
      if (typeof window.ensureStageVisible === 'function') window.ensureStageVisible(id);
    }
    /* A click is only "silent" when the stage looks exactly the same afterwards:
       the same game/mode was already open, the answer was already given, or the
       board is locked for a moment. Acknowledge it with the pulse ring. */
    var el = document.getElementById(id);
    var domSame = domBefore !== null && !!el && el.innerHTML === domBefore;
    if ((isSwitch && unchanged) || isRestart || domSame) {
      if (typeof window.pulseStage === 'function') window.pulseStage(id);
    }
  }

  SAL.do = function (key, action, a, b) {
    var cfg = lessons[key] || recycleShims[key];
    if (!cfg) return;
    var fn = ACTIONS[action];
    if (!fn) return;
    var st = state(cfg);
    var before = action === 'setGame' ? st.game
      : action === 'setPresMode' ? st.pres.mode
      : action === 'setProdMode' ? st.prod.mode : '';
    var domBefore = null;
    if (action !== 'speak') {
      var stageEl = document.getElementById(stageIdFor(cfg, action, b));
      domBefore = stageEl ? stageEl.innerHTML : null;
    }
    fn(cfg, st, a, b);
    if (action === 'speak') return;
    if (cfg._recycleOf) {
      /* the compound block has its own arenas: redraw them, leave the main
         Practice/Production exactly as the student left it */
      var parent = lessons[cfg._recycleOf];
      if (parent) { renderRecyclePractice(parent); renderRecycleProd(parent); }
      ackClick(cfg, action, before !== '' && before === a, domBefore);
      return;
    }
    SAL.refresh();
    ackClick(cfg, action, before !== '' && before === a, domBefore);
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

  /* Отрисовать игру скрытой конфигурации в её арену и сделать её активной:
     так филворд попадает на страницу урока 3, у которой своя вёрстка и нет
     панели движка (см. games-extra.js, конфигурация L1B). */
  SAL.showGame = function (key, game) {
    var cfg = lessons[key];
    if (!cfg) return false;
    activeKey = key;
    clearExtra();
    state(cfg).game = game;
    renderPractice(cfg);
    return true;
  };

  /* the lesson dropdown: 'lesson5' is the standalone 12-word lesson, everything
     else is a key registered by a lesson data file */
  /* название урока для адреса, закладки и заголовка вкладки:
     SAL.lessonLabel('L5', 'ru') → «Урок 5: Цифры 6–10» */
  SAL.lessonLabel = function (key, lang) {
    var lab = NAV_LABELS[key];
    if (!lab) return null;
    return lang === 'en' ? lab.en : lab.ru;
  };

  SAL.gotoLesson = function (v) {
    if (v === 'lesson6') { if (typeof switchView === 'function') switchView('lesson6'); return; }
    SAL.openLesson(v);
  };

  SAL.refresh = function () {
    fillNavSlots();
    fillLessonPagers();
    var cfg = lessons[activeKey];
    if (!cfg) return;
    renderDiscovery(cfg);
    renderPres(cfg);
    renderPractice(cfg);
    renderProd(cfg);
    if (cfg.recycle || cfg.recycle2) { renderRecyclePractice(cfg); renderRecycleProd(cfg); }
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

  /* Panes are built once, on first open, with the strings of the language that
     was active at that moment. Everything that carries data-i18n-* is translated
     by setLanguage(), but an element that forgets the attribute would stay in
     the old language forever. Rebuilding the panes on a language switch removes
     that whole class of bugs: after it every pane is rendered from scratch in
     the new language. Game state lives in cfg._st, so nothing is lost. */
  SAL.rebuildForLang = function () {
    Object.keys(lessons).forEach(function (k) {
      var pane = document.getElementById('view-lesson' + lessons[k].num);
      if (!pane) return;
      pane.innerHTML = skeletonHtml(lessons[k]);
      pane.setAttribute('data-built', '1');
    });
  };

  /* keep the engine in sync when the site language switches (app.js calls this) */
  SAL.refreshOnLangChange = function () {
    SAL.refresh();
  };

  document.addEventListener('DOMContentLoaded', function () {
    fillNavSlots();
    fillLessonPagers();
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
