/**
 * EXTRA PRACTICE GAMES (games 13+) — loaded by index.html after lesson-engine.js
 *
 * The engine keeps the 12 classic CELTA games. Everything here is an add-on
 * registered through SAL.addGame() and only shows up for lessons that list it
 * in `extraGames` (Lesson 6 · सङ्ख्याः, the numerals lesson).
 *
 * Two families:
 *   SOLO  — one student with a teacher: speed, recall without prompts,
 *           active spelling, the ear, and a mistake pile that recycles
 *           whatever the student got wrong anywhere in the lesson.
 *   PAIR  — two students on one device (hot seat): turns, two score columns,
 *           and games where the partner, not the screen, is the judge.
 *
 * Rules of the road:
 *   - 100% Direct Method: no translations of the vocabulary anywhere.
 *   - Every answer option carries a letter badge (A, B, C…) so a student can
 *     name the answer aloud instead of pointing.
 *   - Wrong answers feed the shared mistake pile (SAL.kit.noteWrong).
 *   - Timers share one slot (SAL.kit.after) and are cleared on every game
 *     switch, restart and lesson change.
 */

(function () {
  var K = SAL.kit;
  var tx = K.tx, ru = K.ru, shuffle = K.shuffle, byId = K.byId;

  /* ------------------------------------------------------------- shortcuts */
  function opt(cfg, action, value, html, cls, letter) {
    return K.optBtn(cfg, action, value, html, cls, letter);
  }
  function chip(cfg, action, value, label, active) {
    return K.chip(cfg, action, value, label, active);
  }
  function wordOpt(cfg, w, action, cls, letter) {
    return K.wordBtn(cfg, w, action, w.id, cls, letter);
  }
  /* Числительные: слово уже написано в клетке, поэтому варианты ответа — не слова,
     а количество. До пяти — кружочки-бусины (их можно пересчитать), больше пяти —
     арабская цифра: семь бусин в маленькой плашке считать уже неудобно. */
  var QTY_DOTS = {
    1: [[50, 50]],
    2: [[34, 66], [66, 34]],
    3: [[30, 70], [50, 50], [70, 30]],
    4: [[34, 34], [66, 34], [34, 66], [66, 66]],
    5: [[32, 32], [68, 32], [50, 50], [32, 68], [68, 68]]
  };
  function qtySvg(n) {
    var card = '<rect width="100" height="100" rx="14" fill="#FFFBEB"/>' +
      '<rect x="6" y="6" width="88" height="88" rx="10" fill="none" stroke="#E5DEC9" stroke-width="1.5"/>';
    var inner;
    if (n > 5 || !QTY_DOTS[n]) {
      inner = '<text x="50" y="52" text-anchor="middle" dominant-baseline="central" ' +
        'font-family="system-ui, -apple-system, Roboto, sans-serif" font-size="46" font-weight="700" ' +
        'fill="#14213D">' + n + '</text>';
    } else {
      inner = QTY_DOTS[n].map(function (p) {
        return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="11" fill="#F59E0B" stroke="#B45309" stroke-width="2.8"/>';
      }).join('');
    }
    return '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' + card + inner + '</svg>';
  }
  function qtyOpt(cfg, w, action, cls, letter) {
    return opt(cfg, action, w.id, '<span class="qty-opt">' + qtySvg(w.value) + '</span>', cls, letter);
  }
  function devaSpan(txt, size) {
    return '<span style="font-family:var(--font-deva);font-weight:700;' +
      (size ? 'font-size:' + size + ';' : '') + '">' + txt + '</span>';
  }
  /* onclick builder for cells and other buttons the helpers do not cover */
  function call(cfg, action, v1, v2) {
    var s = ' onclick="SAL.do(\'' + cfg.key + '\',\'' + action + '\'';
    if (typeof v1 !== 'undefined' && v1 !== null) s += ',\'' + v1 + '\'';
    if (typeof v2 !== 'undefined' && v2 !== null) s += ',\'' + v2 + '\'';
    return s + ')"';
  }
  function players(cfg) { return K.state(cfg).players; }
  function keyOn(cfg) { return !!K.state(cfg).teacherKey; }
  function pairInit(extra) {
    var o = { scores: [0, 0], turn: 0, finished: false };
    Object.keys(extra || {}).forEach(function (k) { o[k] = extra[k]; });
    return o;
  }
  function swapTurn(g) { g.turn = 1 - g.turn; }
  function award(g, i) { g.scores[i] = (g.scores[i] || 0) + 1; }
  function scorePills(cfg, g) {
    if (players(cfg) === 1) return K.pill(ru('Score', 'Счёт') + ': ' + g.scores[0]);
    return K.pill('1 — ' + g.scores[0]) + ' ' + K.pill('2 — ' + g.scores[1]) +
      ' ' + K.pill(ru('Turn', 'Ход') + ': ' + (g.turn + 1));
  }
  function done(cfg, game, title, score, total, extra) {
    return K.finalScreen(cfg, game, title, score, total, extra);
  }
  function restartChip(cfg, game) { return chip(cfg, 'restart', game, '↺'); }
  /* Деванагари на акшары (орфографические слоги): «शीर्ष» → शी + र्ष,
     «ललाट» → ल + ला + ट, «जिह्वा» → जि + ह्वा. Нужно урокам 1–3: в их данных
     нет готового поля syll, а филворд по частям без нарезки выродился бы в
     «нажми одну клетку». */
  var AKSHARA_RE = /(?:[\u0915-\u0939](?:\u094d[\u0915-\u0939])*\u094d?|[\u0905-\u0914])[\u093e-\u094c\u0901\u0902\u0903]*/g;
  function devaAksharas(text) {
    var src = String(text || '');
    var out = src.match(AKSHARA_RE);
    if (out && out.length && out.join('') === src) return out;
    /* Фраза из двух слов («श्यामं ललाटम्»): режем по словам, а пробел в клетки
       не отдаём — иначе поле получило бы клетку-пробел. Слово с дефисом
       («पाटल-मुख») сюда не попадает: дефис — не пробел, и такая нарезка
       по-прежнему отдаётся целиком, как и раньше. */
    var parts = src.split(/\s+/).filter(Boolean);
    if (parts.length > 1) {
      var all = [];
      for (var i = 0; i < parts.length; i++) {
        var m = parts[i].match(AKSHARA_RE);
        if (!m || !m.length || m.join('') !== parts[i]) return [src];
        all = all.concat(m);
      }
      if (all.length) return all;
    }
    return [src];
  }

  /* the word split into the chunks a learner assembles it from (data: syll) */
  function chunks(w) {
    if (w.syll && w.syll.length) return w.syll.slice();
    return devaAksharas(w.deva);
  }
  function orderOf(cfg, g) {
    if (!g.order) g.order = shuffle(cfg.words.map(function (w) { return w.id; }));
    return g.order;
  }
  function letters(n) {
    var out = [];
    for (var i = 0; i < n; i++) out.push(K.LETTERS[i]);
    return out;
  }
  /* 4 word options in a stable grid with A/B/C/D badges */
  function pickFour(cfg, w, action, redPick, rightId) {
    var opts = shuffle([w].concat(K.others(cfg, w.id, 3)));
    return K.optGrid(opts.map(function (o, i) {
      var cls = '';
      if (redPick && o.id === redPick) cls = 'wrong';
      if (rightId && o.id === rightId) cls = 'correct';
      return wordOpt(cfg, o, action, cls, i);
    }).join(''));
  }
  function listenChip(cfg, w) { return chip(cfg, 'speak', w.ttsText, '🔊 ' + ru('Listen', 'Послушать')); }

  /* ========================================================== 13. HOT CARDS */
  var HOT_SECONDS = 8;
  function hotTick(cfg) {
    var g = K.gst(cfg, 'hotcards');
    if (K.state(cfg).game !== 'hotcards' || g.finished || !g.running) { K.clearAfter(); return; }
    g.timeLeft--;
    if (g.timeLeft <= 0) {
      g.lives--; g.streak = 0;
      K.noteWrong(cfg, orderOf(cfg, g)[g.i]);
      g.i++; g.shown = false; g.timeLeft = HOT_SECONDS;
    }
    if (g.lives <= 0 || g.i >= cfg.words.length) {
      g.finished = true; g.running = false; K.clearAfter(); SAL.refresh(); return;
    }
    SAL.refresh();
    if (!g.finished) K.after(1000, function () { hotTick(cfg); });
  }
  function renderHotcards(cfg) {
    var g = K.gst(cfg, 'hotcards');
    var N = cfg.words.length;
    orderOf(cfg, g);
    if (g.finished || g.lives <= 0 || g.i >= N) {
      return done(cfg, 'hotcards', tx({ ru: 'Горячая карточка — игра окончена', en: 'Hot Cards — over' }),
        g.score, N, tx({ ru: 'Лучшая серия', en: 'Best streak' }) + ': ' + g.best);
    }
    if (g.running && !g.finished && !K.pending()) {
      K.after(1000, function () { hotTick(cfg); });
    }
    var w = byId(cfg, orderOf(cfg, g)[g.i]);
    var hearts = '♥'.repeat(g.lives) + '<span style="opacity:.25;">' + '♥'.repeat(Math.max(0, 3 - g.lives)) + '</span>';
    return K.topBar(
      K.pill(hearts) + ' ' + K.pill(ru('Streak', 'Серия') + ': ' + g.streak) + ' ' +
        K.pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' +
        K.pill('⏱ ' + g.timeLeft + (g.running ? '' : ' ⏸')),
      (g.running ? chip(cfg, 'hotPause', '', '⏸') : chip(cfg, 'hotStart', '', '▶')) + ' ' +
        restartChip(cfg, 'hotcards')) +
      K.centerCard(
        K.svgBox(w, 140) +
        K.maskedMarkup(w, g.shown, '2.45rem') +
        '<div class="iast-text" style="font-size:1.1rem;">' + (g.shown ? w.iast : '&nbsp;') + '</div>' +
        '<div style="display:flex;justify-content:center;gap:0.55rem;flex-wrap:wrap;margin-top:0.85rem;">' +
          chip(cfg, 'hotFlip', '', g.shown ? '👁 ' + ru('shown', 'открыто') : '👁 ' + ru('Show', 'Открыть')) +
          chip(cfg, 'speak', w.ttsText, '🔊') +
          '<button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;"' +
            call(cfg, 'hotGrade', '0') + '>✕ ' + ru('Repeat', 'Повторить') + '</button>' +
          '<button type="button" class="chip-btn" style="background:#16a34a;border-color:#16a34a;color:#fff;"' +
            call(cfg, 'hotGrade', '1') + '>✓ ' + ru('I knew it', 'Знаю') + '</button>' +
        '</div>' +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({
            ru: 'Назовите слово вслух за ' + HOT_SECONDS + ' секунд. Три ошибки — игра окончена. Ошибка отправляет слово в копилку (игра 14).',
            en: 'Say the word aloud within ' + HOT_SECONDS + ' seconds. Three misses end the game. A miss drops the word into the pile (game 14).'
          }) + '</div>');
  }

  /* ============================================================ 14. RETRY */
  function renderRetry(cfg) {
    var g = K.gst(cfg, 'retry');
    if (!g.queue) {
      g.queue = K.pileIds(cfg);
      g.all = g.queue.length === 0;
      if (g.all) g.queue = shuffle(cfg.words.map(function (w) { return w.id; }));
    }
    var total = g.queue.length;
    if (g.finished || g.i >= total) {
      return done(cfg, 'retry', tx({ ru: 'Копилка ошибок — повтор пройден', en: 'Mistake pile — done' }),
        g.score, total,
        tx({ ru: 'Верных с первой попытки', en: 'Right first time' }) + ': ' + g.score);
    }
    var w = byId(cfg, g.queue[g.i]);
    return K.topBar(
      K.pill(tx({ ru: 'В копилке', en: 'In the pile' }) + ': ' + (g.all ? cfg.words.length : total)) + ' ' +
        K.pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + total) + ' ' +
        K.pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'clearPile', '', '🗑 ' + tx({ ru: 'Очистить', en: 'Clear' })) + ' ' + restartChip(cfg, 'retry')) +
      K.centerCard(
        '<div style="margin-bottom:0.5rem;">' + K.svgBox(w, 120) + '</div>' +
        (g.answered ? '<div style="font-family:var(--font-deva);font-size:2rem;font-weight:700;">' + w.deva + '</div>' +
          '<div class="iast-text" style="margin-bottom:0.85rem;">' + w.iast + '</div>' : '<div style="height:0.4rem;"></div>') +
        pickFour(cfg, w, 'retryPick', g.redPick, g.answered ? w.id : null) +
        (g.answered
          ? '<div style="margin-top:0.85rem;">' + listenChip(cfg, w) + ' ' +
            '<button type="button" class="btn btn-primary" style="padding:0.45rem 1.1rem;"' +
            call(cfg, 'retryNext') + '>' + ru('Next →', 'Далее →') + '</button></div>'
          : '') +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({
            ru: 'Слова, на которых ученик ошибся в любой игре урока. Два верных ответа подряд — и слово выходит из копилки.',
            en: 'Words the student missed in any game of this lesson. Two correct answers in a row take a word out of the pile.'
          }) + '</div>');
  }

  /* ============================================================= 15. ECHO */
  function renderEcho(cfg) {
    var g = K.gst(cfg, 'echo');
    var N = cfg.words.length;
    if (g.finished || g.i >= N) {
      return done(cfg, 'echo', tx({ ru: 'Минимальные пары — пройдено', en: 'Minimal pairs — done' }), g.score, N);
    }
    orderOf(cfg, g);
    var w = byId(cfg, orderOf(cfg, g)[g.i]);
    var optA = { deva: w.deva, iast: w.iast, ok: true };
    var optB = { deva: w.typoDeva, iast: w.typoIast, ok: false };
    if (!g.mix) g.mix = shuffle([optA, optB]);
    var mix = g.mix;
    var secret = mix.filter(function (o) { return o.ok; })[0];
    var body;
    if (g.mode === 'partner') {
      body = '<div class="game-note-box" style="margin-bottom:0.85rem;">' +
        '<div style="font-size:0.9rem;font-weight:800;margin-bottom:0.35rem;">👤 ' +
          tx({ ru: 'Диктор читает', en: 'The reader reads' }) + '</div>' +
        (g.showSecret
          ? '<div style="font-family:var(--font-deva);font-size:2.2rem;font-weight:700;">' + secret.deva + '</div>' +
            '<div class="iast-text">' + secret.iast + '</div>' +
            '<div style="margin-top:0.5rem;">' + chip(cfg, 'echoSecret', '0', '🙈 ' + tx({ ru: 'Скрыть', en: 'Hide' })) + '</div>'
          : '<div style="font-family:var(--font-deva);font-size:2.2rem;font-weight:700;letter-spacing:0.2em;">■■■</div>' +
            '<div style="margin-top:0.5rem;">' + chip(cfg, 'echoSecret', '1', '👁 ' + tx({ ru: 'Показать диктору', en: 'Show the reader' })) + '</div>') +
        '</div>';
    } else {
      body = '<div style="margin-bottom:0.85rem;">' +
        '<button type="button" class="chip-btn" style="font-size:1rem;padding:0.6rem 1.4rem;"' +
        call(cfg, 'speak', w.ttsText) + '>🔊 ' + tx({ ru: 'Прослушать', en: 'Listen' }) + '</button></div>';
    }
    var btns = mix.map(function (o, i) {
      var cls = '';
      if (g.answered && o.ok) cls = 'correct';
      if (g.answered && g.picked === String(i) && !o.ok) cls = 'wrong';
      if (!g.answered && keyOn(cfg) && o.ok) cls = 'correct';
      return opt(cfg, 'echoPick', String(i),
        devaSpan(o.deva, '1.6rem') + '<span class="iast-text"> (' + o.iast + ')</span>', cls, i);
    }).join('');
    return K.topBar(
      K.pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + K.pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'echoMode', 'tts', '🔊 ' + tx({ ru: 'Синтезатор', en: 'Player' }), g.mode === 'tts') + ' ' +
        chip(cfg, 'echoMode', 'partner', '👤 ' + tx({ ru: 'Читает напарник', en: 'Partner reads' }), g.mode === 'partner') + ' ' +
        restartChip(cfg, 'echo')) +
      K.centerCard(
        body + K.optGrid(btns) +
        (g.answered
          ? '<div style="margin-top:0.85rem;">' + listenChip(cfg, w) + ' ' +
            '<button type="button" class="btn btn-primary" style="padding:0.45rem 1.1rem;"' +
            call(cfg, 'echoNext') + '>' + ru('Next →', 'Далее →') + '</button></div>' +
            '<div style="margin-top:0.6rem;font-size:0.9rem;color:var(--text-secondary);">' +
              (mix[parseInt(g.picked, 10)] && !mix[parseInt(g.picked, 10)].ok
                ? '❌ ' + tx({ ru: 'Это форма с ошибкой — она отличается ровно на одну букву.', en: 'That is the misspelled form — it differs by exactly one letter.' })
                : '✓ ' + tx({ ru: 'Верно.', en: 'Correct.' })) + '</div>'
          : '') +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Слова отличаются одной буквой: долгота или качество гласной, носовой. Слушайте — и выбирайте.',
               en: 'The two forms differ by one letter: vowel length or quality, or the nasal. Listen, then choose.' }) + '</div>');
  }

  /* ========================================================= 16. SNOWBALL */
  function renderSnowball(cfg) {
    var g = K.gst(cfg, 'snowball');
    var N = cfg.words.length;
    if (g.finished || g.step > N) {
      return done(cfg, 'snowball', tx({ ru: 'Снежный ком — пройдено', en: 'Snowball — done' }), g.score, N);
    }
    var ws = cfg.words.slice(0, g.step);
    var cards = ws.map(function (w) {
      return '<div class="vocab-item-card">' + K.svgBox(w, 74) +
        K.maskedMarkup(w, g.revealed, '1.25rem') +
        '<div class="iast-text" style="font-size:0.72rem;">' + (g.revealed ? w.iast : '') + '</div></div>';
    }).join('');
    var controls = g.revealed
      ? '<button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;"' + call(cfg, 'snowGrade', '0') +
        '>✕ ' + tx({ ru: 'Не вспомнил', en: 'Forgot' }) + '</button>' +
        '<button type="button" class="btn btn-primary" style="padding:0.45rem 1.2rem;"' + call(cfg, 'snowNext') + '>' +
        ru('Next →', 'Далее →') + '</button>'
      : '<button type="button" class="chip-btn" style="background:#16a34a;border-color:#16a34a;color:#fff;"' +
        call(cfg, 'snowGrade', '1') + '>✓ ' + tx({ ru: 'Вспомнил все', en: 'Remembered all' }) + '</button>' +
        chip(cfg, 'snowReveal', '', '👁 ' + tx({ ru: 'Показать', en: 'Show' }));
    var duoS = players(cfg) === 2;
    return K.topBar(
      (duoS ? scorePills(cfg, g) + ' ' : '') +
      K.pill(tx({ ru: 'Цепочка', en: 'Chain' }) + ': ' + g.step + ' / ' + N) +
        (duoS ? '' : ' ' + K.pill(ru('Score', 'Счёт') + ': ' + g.score)),
      restartChip(cfg, 'snowball')) +
      K.centerCard(
        '<div class="vocab-grid-6" style="margin-bottom:1rem;">' + cards + '</div>' +
        '<div style="display:flex;justify-content:center;gap:0.55rem;flex-wrap:wrap;">' + controls + '</div>' +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Назовите всю цепочку по памяти: сначала первое слово, потом первое и второе, и так далее. Каждый шаг добавляет одно слово.',
               en: 'Say the whole chain from memory: first one word, then two, then three. Each step adds one word.' }) +
          (duoS ? '<br/>' + tx({ ru: 'Цепочку называет по очереди: один говорит — другой проверяет и нажимает ✓ или ✕.',
                                 en: 'The chain is recited in turn: one says it, the other checks and presses ✓ or ✕.' }) : '') + '</div>');
  }

  /* ============================================================= 17. DRIP */
  function renderDrip(cfg) {
    var g = K.gst(cfg, 'drip');
    var N = cfg.words.length;
    orderOf(cfg, g);
    if (g.finished || g.i >= N) {
      return done(cfg, 'drip', tx({ ru: 'Угадай по капле — пройдено', en: 'Drip reveal — done' }),
        g.score, g.max || N,
        tx({ ru: 'Чем раньше угадано, тем больше очков', en: 'The earlier the guess, the more points' }));
    }
    var w = byId(cfg, orderOf(cfg, g)[g.i]);
    var ch = chunks(w);
    g.max = 0;
    cfg.words.forEach(function (x) { g.max += chunks(x).length; });
    var shown = ch.slice(0, Math.min(g.shown, ch.length));
    var hidden = ch.length - shown.length;
    var line = shown.map(function (c) { return devaSpan(c, '2.6rem'); }).join('') +
      '<span style="font-size:2.2rem;font-weight:700;letter-spacing:0.12em;">' + '■'.repeat(hidden) + '</span>';
    var last = g.shown >= ch.length;
    return K.topBar(
      K.pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + K.pill(ru('Score', 'Счёт') + ': ' + g.score),
      restartChip(cfg, 'drip')) +
      K.centerCard(
        '<div style="margin-bottom:0.5rem;">' + K.svgBox(w, 110) + '</div>' +
        '<div style="font-family:var(--font-deva);letter-spacing:0.05em;margin-bottom:0.35rem;">' + line + '</div>' +
        '<div class="iast-text" style="margin-bottom:0.85rem;">' + (g.answered ? w.iast : '&nbsp;') + '</div>' +
        (g.answered
          ? '<div style="font-family:var(--font-deva);font-size:1.9rem;font-weight:700;color:var(--accent-cambridge);">' +
              w.deva + '</div>' +
            '<div style="margin-top:0.75rem;">' + listenChip(cfg, w) + ' ' +
            '<button type="button" class="btn btn-primary" style="padding:0.45rem 1.1rem;"' + call(cfg, 'dripNext') + '>' +
            ru('Next →', 'Далее →') + '</button></div>'
          : '<div style="display:flex;justify-content:center;gap:0.55rem;flex-wrap:wrap;">' +
            (last ? '' : chip(cfg, 'dripMore', '', '💧 ' + tx({ ru: 'Ещё часть', en: 'Another part' }))) +
            '<button type="button" class="chip-btn" style="background:#16a34a;border-color:#16a34a;color:#fff;"' +
              call(cfg, 'dripGrade', '1') + '>✓ ' + tx({ ru: 'Знаю!', en: 'I know it!' }) + '</button>' +
            '<button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;"' +
              call(cfg, 'dripGrade', '0') + '>✕ ' + tx({ ru: 'Не знаю', en: "I don't know" }) + '</button></div>') +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Слово открывается по частям. Угадали раньше — получили больше очков.',
               en: 'The word appears part by part. Guess it early and score more.' }) + '</div>');
  }

  /* ========================================================== 18. ANAGRAM */
  function renderAnagram(cfg) {
    var g = K.gst(cfg, 'anagram');
    var N = cfg.words.length;
    orderOf(cfg, g);
    if (g.finished || g.i >= N) {
      return done(cfg, 'anagram', tx({ ru: 'Собери слово — пройдено', en: 'Build the word — done' }), g.score, N);
    }
    var w = byId(cfg, orderOf(cfg, g)[g.i]);
    var ch = chunks(w);
    if (!g.tiles) g.tiles = shuffle(ch);
    var used = g.picked.map(function (i) { return g.tiles[i]; }).join('');
    var target = ch.join('');
    var slots = ch.map(function (_, i) {
      var t = g.picked[i];
      return '<span class="anagram-slot' + (g.answered ? ' correct' : '') + '">' +
        (t === undefined || g.tiles[t] === undefined ? '' : devaSpan(g.tiles[t], '1.6rem')) + '</span>';
    }).join('');
    var tiles = g.tiles.map(function (t, i) {
      var usedUp = g.picked.indexOf(i) >= 0;
      return '<button type="button" class="anagram-tile' + (usedUp ? ' used' : '') + '"' +
        call(cfg, 'anaTap', String(i)) + '>' + devaSpan(t, '1.5rem') + '</button>';
    }).join('');
    return K.topBar(
      K.pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + K.pill(ru('Score', 'Счёт') + ': ' + g.score),
      restartChip(cfg, 'anagram')) +
      K.centerCard(
        '<div style="margin-bottom:0.5rem;">' + K.svgBox(w, 110) + '</div>' +
        '<div class="iast-text" style="margin-bottom:0.6rem;">' + (g.answered ? w.iast : '&nbsp;') + '</div>' +
        '<div class="anagram-slots">' + slots + '</div>' +
        '<div class="anagram-tiles">' + tiles + '</div>' +
        (g.answered
          ? '<div style="margin-top:0.85rem;">' + listenChip(cfg, w) + ' ' +
            '<button type="button" class="btn btn-primary" style="padding:0.45rem 1.1rem;"' + call(cfg, 'anaNext') + '>' +
            ru('Next →', 'Далее →') + '</button></div>'
          : '<div style="margin-top:0.6rem;font-size:0.9rem;color:' +
            (g.miss ? '#dc2626' : 'var(--text-secondary)') + ';">' +
            (g.miss ? '✕ ' + tx({ ru: 'Не та последовательность — попробуйте снова.',
                                  en: 'Not that order — try again.' })
                    : tx({ ru: 'Нажимайте части в правильном порядке.', en: 'Tap the parts in the right order.' })) +
            '</div>') +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Активное письмо: не выбрать из вариантов, а собрать слово самому.',
               en: 'Active spelling: build the word yourself instead of picking an option.' }) + '</div>');
  }

  /* ============================================================ 19. TYPE-IN */
  var FOLD = { 'ā': 'a', 'ī': 'i', 'ū': 'u', 'ṛ': 'r', 'ṝ': 'r', 'ḷ': 'l', 'ḹ': 'l',
               'ṃ': 'm', 'ṁ': 'm', 'ḥ': 'h', 'ñ': 'n', 'ṇ': 'n', 'ṭ': 't', 'ḍ': 'd',
               'ś': 's', 'ṣ': 's', 'ṅ': 'n', 'ĕ': 'e', 'ŏ': 'o' };
  function norm(s) {
    s = String(s || '').toLowerCase().replace(/\s+/g, '');
    var out = '';
    for (var i = 0; i < s.length; i++) out += (FOLD[s[i]] || s[i]);
    return out;
  }
  function renderTypeIn(cfg) {
    var g = K.gst(cfg, 'typein');
    var N = cfg.words.length;
    orderOf(cfg, g);
    if (g.finished || g.i >= N) {
      return done(cfg, 'typein', tx({ ru: 'Напиши сам — пройдено', en: 'Type it — done' }), g.score, N);
    }
    var w = byId(cfg, orderOf(cfg, g)[g.i]);
    var id = 'typein-' + cfg.key;
    var ok = g.result === 'ok';
    var bad = g.result === 'bad';
    return K.topBar(
      K.pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + K.pill(ru('Score', 'Счёт') + ': ' + g.score),
      restartChip(cfg, 'typein')) +
      K.centerCard(
        '<div style="margin-bottom:0.5rem;">' + K.svgBox(w, 120) + '</div>' +
        '<div style="display:flex;justify-content:center;gap:0.45rem;flex-wrap:wrap;align-items:center;">' +
          '<input id="' + id + '" class="typein-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"' +
          ' placeholder="' + tx({ ru: 'латиницей, например ekam', en: 'in Latin letters, e.g. ekam' }) + '"' +
          ' onkeydown="if(event.key===\'Enter\')SAL.do(\'' + cfg.key + '\',\'typeCheck\',this.value)">' +
          '<button type="button" class="btn btn-primary" style="padding:0.5rem 1.1rem;"' +
          ' onclick="SAL.do(\'' + cfg.key + '\',\'typeCheck\',document.getElementById(\'' + id + '\').value)">' +
          ru('Check', 'Проверить') + '</button>' +
        '</div>' +
        (bad || ok
          ? '<div style="margin-top:0.85rem;font-family:var(--font-deva);font-size:2rem;font-weight:700;color:' +
              (ok ? '#16a34a' : '#dc2626') + ';">' + w.deva + '</div>' +
            '<div class="iast-text">' + w.iast + '</div>' +
            '<div style="margin-top:0.7rem;">' + listenChip(cfg, w) + ' ' +
            (ok
              ? '<button type="button" class="btn btn-primary" style="padding:0.45rem 1.1rem;"' + call(cfg, 'typeNext') + '>' +
                ru('Next →', 'Далее →') + '</button>'
              : '<button type="button" class="chip-btn"' + call(cfg, 'typeRetry') + '>' +
                ru('↺ Try again', '↺ Ещё раз') + '</button> ' +
                '<button type="button" class="chip-btn"' + call(cfg, 'typeNext') + '>' + ru('Next →', 'Далее →') + '</button>') +
            '</div>'
          : '') +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Диакритику набирать не нужно: <code>ekam</code> = <code>ekam</code>, <code>trini</code> = <code>trīṇi</code>.',
               en: 'You do not have to type the diacritics: <code>trini</code> counts as <code>trīṇi</code>.' }) + '</div>');
  }

  /* =========================================================== 20. SORTING */
  var FEATURES = [
    { ru: 'Есть носовой звук', en: 'Has a nasal',
      test: function (w) { return /[\u0901\u0902\u0919\u091E\u0923\u0928\u092E]/.test(w.deva); } },
    { ru: 'Три части в слове', en: 'Three parts in the word',
      test: function (w) { return chunks(w).length >= 3; } },
    { ru: 'Оканчивается на гласный знак', en: 'Ends on a vowel sign',
      test: function (w) { return /[\u093E-\u094C]$/.test(w.deva); } },
    { ru: 'Есть буква «च» (ca)', en: 'Contains "च" (ca)',
      test: function (w) { return w.deva.indexOf('च') >= 0; } }
  ];
  function renderSorting(cfg) {
    var g = K.gst(cfg, 'sorting');
    var N = cfg.words.length;
    orderOf(cfg, g);
    if (g.finished || g.i >= N) {
      return done(cfg, 'sorting', tx({ ru: 'Сортировка — пройдено', en: 'Sorting — done' }), g.score, N);
    }
    var w = byId(cfg, orderOf(cfg, g)[g.i]);
    var LIST = cfg.sortFeatures || FEATURES;      /* a lesson may bring its own questions */
    var f = LIST[g.i % LIST.length];
    var right = !!f.test(w);
    function box(val) {
      var cls = '';
      if (g.answered && val === right) cls = 'correct';
      if (g.answered && g.picked === String(val ? 1 : 0) && val !== right) cls = 'wrong';
      return opt(cfg, 'sortPick', val ? '1' : '0',
        '<span style="font-size:1.15rem;font-weight:800;">' + (val ? '✓ ' + tx({ ru: 'Да', en: 'Yes' })
                                                                   : '✕ ' + tx({ ru: 'Нет', en: 'No' })) + '</span>',
        cls, val ? 0 : 1);
    }
    return K.topBar(
      K.pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + K.pill(ru('Score', 'Счёт') + ': ' + g.score),
      restartChip(cfg, 'sorting')) +
      K.centerCard(
        '<div style="font-size:1rem;font-weight:800;color:var(--accent-cambridge);margin-bottom:0.5rem;">' +
          tx(f) + '?</div>' +
        '<div style="font-family:var(--font-deva);font-size:2.6rem;font-weight:700;">' + w.deva + '</div>' +
        '<div class="iast-text" style="margin-bottom:0.9rem;">' + w.iast + '</div>' +
        K.optGrid(box(true) + box(false)) +
        (g.answered
          ? '<div style="margin-top:0.85rem;">' + listenChip(cfg, w) + ' ' +
            '<button type="button" class="btn btn-primary" style="padding:0.45rem 1.1rem;"' + call(cfg, 'sortNext') + '>' +
            ru('Next →', 'Далее →') + '</button></div>'
          : '') +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Слово нужно положить в нужную коробку — так ученик разбирается в самой форме слова.',
               en: 'Drop the word into the right box — the student has to look at the shape of the word.' }) + '</div>');
  }

  /* ------------------------------------------------------- register (solo) */
  SAL.addGame('hotcards', {
    labelRu: 'Горячая карточка (серия + 3 жизни)',
    labelEn: 'Hot Cards (streak + 3 lives)',
    init: function () {
      return { i: 0, order: null, score: 0, lives: 3, streak: 0, best: 0,
               shown: false, timeLeft: HOT_SECONDS, running: true, finished: false };
    },
    render: renderHotcards,
    actions: {
      hotStart: function (cfg) { var g = K.gst(cfg, 'hotcards'); g.running = true; g.timeLeft = HOT_SECONDS; },
      hotPause: function (cfg) { K.gst(cfg, 'hotcards').running = false; K.clearAfter(); },
      hotFlip: function (cfg) { var g = K.gst(cfg, 'hotcards'); g.shown = !g.shown; },
      hotGrade: function (cfg, st, a) {
        var g = K.gst(cfg, 'hotcards');
        var id = orderOf(cfg, g)[g.i];
        if (a === '1') {
          g.score++; g.streak++;
          if (g.streak > g.best) g.best = g.streak;
          K.pileDrop(cfg, id);
        } else {
          g.lives--; g.streak = 0; K.noteWrong(cfg, id);
        }
        g.i++; g.shown = false; g.timeLeft = HOT_SECONDS;
        if (g.lives <= 0 || g.i >= cfg.words.length) { g.finished = true; g.running = false; K.clearAfter(); }
      }
    }
  });

  SAL.addGame('retry', {
    labelRu: 'Копилка ошибок (повтор)',
    labelEn: 'Mistake Pile (repeat)',
    init: function () {
      return { queue: null, all: false, i: 0, score: 0, rights: {},
               answered: false, picked: null, firstTry: true, redPick: null, finished: false };
    },
    render: renderRetry,
    actions: {
      clearPile: function (cfg) { K.pileClear(cfg); K.gst(cfg, 'retry').queue = null; },
      retryPick: function (cfg, st, a) {
        var g = K.gst(cfg, 'retry');
        if (g.answered) return;
        var w = byId(cfg, g.queue[g.i]);
        if (a !== w.id) { g.firstTry = false; g.redPick = a; K.noteWrong(cfg, w.id); return; }
        g.answered = true; g.picked = a;
        if (g.firstTry) g.score++;
        g.rights[w.id] = (g.rights[w.id] || 0) + 1;
        if (g.rights[w.id] >= 2) K.pileDrop(cfg, w.id);
        SAL.speak(w.ttsText);
      },
      retryNext: function (cfg) {
        var g = K.gst(cfg, 'retry');
        g.i++; g.answered = false; g.picked = null; g.firstTry = true; g.redPick = null;
        if (g.i >= g.queue.length) g.finished = true;
      }
    }
  });

  SAL.addGame('echo', {
    labelRu: 'Минимальные пары на слух',
    labelEn: 'Minimal Pairs by Ear',
    init: function () {
      return { i: 0, order: null, mix: null, mode: 'tts', showSecret: false,
               score: 0, answered: false, picked: null, finished: false };
    },
    render: renderEcho,
    actions: {
      echoMode: function (cfg, st, a) { var g = K.gst(cfg, 'echo'); g.mode = a; g.showSecret = false; },
      echoSecret: function (cfg, st, a) { K.gst(cfg, 'echo').showSecret = a === '1'; },
      echoPick: function (cfg, st, a) {
        var g = K.gst(cfg, 'echo');
        if (g.answered) return;
        g.answered = true; g.picked = a;
        var ok = g.mix[parseInt(a, 10)].ok;
        if (ok) { g.score++; SAL.speak(byId(cfg, orderOf(cfg, g)[g.i]).ttsText); }
        else K.noteWrong(cfg, orderOf(cfg, g)[g.i]);
      },
      echoNext: function (cfg) {
        var g = K.gst(cfg, 'echo');
        g.i++; g.answered = false; g.picked = null; g.mix = null; g.showSecret = false;
        if (g.i >= cfg.words.length) g.finished = true;
      }
    }
  });

  SAL.addGame('snowball', {
    labelRu: 'Снежный ком (цепочка)',
    labelEn: 'Snowball (chain)',
    init: function () { return { step: 1, revealed: false, score: 0, finished: false, scores: [0, 0], turn: 0 }; },
    render: renderSnowball,
    actions: {
      snowReveal: function (cfg) { K.gst(cfg, 'snowball').revealed = true; },
      snowGrade: function (cfg, st, a) {
        var g = K.gst(cfg, 'snowball');
        if (a === '1') {
          g.score++;
          if (players(cfg) === 2) award(g, g.turn);
        } else {
          cfg.words.slice(0, g.step).forEach(function (w) { K.noteWrong(cfg, w.id); });
        }
        g.step++; g.revealed = false;
        if (players(cfg) === 2) swapTurn(g);
        if (g.step > cfg.words.length) g.finished = true;
      },
      snowNext: function (cfg) {
        var g = K.gst(cfg, 'snowball');
        g.step++; g.revealed = false;
        if (players(cfg) === 2) swapTurn(g);
        if (g.step > cfg.words.length) g.finished = true;
      }
    }
  });

  SAL.addGame('drip', {
    labelRu: 'Угадай по капле',
    labelEn: 'Drip Reveal',
    init: function () { return { i: 0, order: null, shown: 1, score: 0, max: 0, answered: false, finished: false }; },
    render: renderDrip,
    actions: {
      dripMore: function (cfg) {
        var g = K.gst(cfg, 'drip');
        var ch = chunks(byId(cfg, orderOf(cfg, g)[g.i]));
        if (g.shown < ch.length) g.shown++;
      },
      dripGrade: function (cfg, st, a) {
        var g = K.gst(cfg, 'drip');
        if (g.answered) return;
        var w = byId(cfg, orderOf(cfg, g)[g.i]);
        var ch = chunks(w);
        g.answered = true;
        if (a === '1') g.score += Math.max(1, ch.length - g.shown + 1);
        else { K.noteWrong(cfg, w.id); SAL.speak(w.ttsText); }
      },
      dripNext: function (cfg) {
        var g = K.gst(cfg, 'drip');
        g.i++; g.shown = 1; g.answered = false;
        if (g.i >= cfg.words.length) g.finished = true;
      }
    }
  });

  SAL.addGame('anagram', {
    labelRu: 'Собери слово',
    labelEn: 'Build the Word',
    init: function () { return { i: 0, order: null, tiles: null, picked: [], miss: 0, score: 0, answered: false, finished: false }; },
    render: renderAnagram,
    actions: {
      anaTap: function (cfg, st, a) {
        var g = K.gst(cfg, 'anagram');
        if (g.answered) return;
        var i = parseInt(a, 10);
        if (i < 0 || i >= g.tiles.length) return;   /* stale button from a previous word */
        if (g.picked.indexOf(i) >= 0) return;
        var w = byId(cfg, orderOf(cfg, g)[g.i]);
        var ch = chunks(w);
        var next = g.picked.concat([i]);
        var built = next.map(function (k) { return g.tiles[k]; }).join('');
        if (ch.join('').indexOf(built) !== 0) {
          g.miss = 1; g.picked = []; K.noteWrong(cfg, w.id); return;
        }
        g.picked = next;
        if (built === ch.join('')) {
          g.answered = true;
          if (!g.miss) g.score++;
          SAL.speak(w.ttsText);
        }
      },
      anaNext: function (cfg) {
        var g = K.gst(cfg, 'anagram');
        g.i++; g.tiles = null; g.picked = []; g.miss = 0; g.answered = false;
        if (g.i >= cfg.words.length) g.finished = true;
      }
    }
  });

  SAL.addGame('typein', {
    labelRu: 'Напиши сам',
    labelEn: 'Type It',
    init: function () { return { i: 0, order: null, result: null, score: 0, finished: false }; },
    render: renderTypeIn,
    actions: {
      typeCheck: function (cfg, st, a) {
        var g = K.gst(cfg, 'typein');
        var w = byId(cfg, orderOf(cfg, g)[g.i]);
        if (norm(a) === norm(w.iast)) {
          g.result = 'ok'; g.score++; SAL.speak(w.ttsText);
        } else {
          g.result = 'bad'; K.noteWrong(cfg, w.id);
        }
      },
      typeRetry: function (cfg) { K.gst(cfg, 'typein').result = null; },
      typeNext: function (cfg) {
        var g = K.gst(cfg, 'typein');
        g.i++; g.result = null;
        if (g.i >= cfg.words.length) g.finished = true;
      }
    }
  });

  SAL.addGame('sorting', {
    labelRu: 'Сортировка по коробкам',
    labelEn: 'Sort into Boxes',
    init: function () { return { i: 0, order: null, answered: false, picked: null, score: 0, finished: false }; },
    render: renderSorting,
    actions: {
      sortPick: function (cfg, st, a) {
        var g = K.gst(cfg, 'sorting');
        if (g.answered) return;
        var w = byId(cfg, orderOf(cfg, g)[g.i]);
        var f = FEATURES[g.i % FEATURES.length];
        g.answered = true; g.picked = a;
        if ((a === '1') === !!f.test(w)) { g.score++; SAL.speak(w.ttsText); }
        else K.noteWrong(cfg, w.id);
      },
      sortNext: function (cfg) {
        var g = K.gst(cfg, 'sorting');
        g.i++; g.answered = false; g.picked = null;
        if (g.i >= cfg.words.length) g.finished = true;
      }
    }
  });

  /* ======================================================= 21. FLASH COUNT */
  function flashHide(cfg) {
    var g = K.gst(cfg, 'flashcount');
    if (K.state(cfg).game !== 'flashcount') { K.clearAfter(); return; }
    g.hidden = true;
    SAL.refresh();
  }
  function renderFlashCount(cfg) {
    var g = K.gst(cfg, 'flashcount');
    var N = cfg.words.length;
    orderOf(cfg, g);
    if (g.finished || g.i >= N) {
      return done(cfg, 'flashcount', tx({ ru: 'Тайный счёт — пройден', en: 'Flash count — done' }), g.score, N);
    }
    var w = byId(cfg, orderOf(cfg, g)[g.i]);
    if (!g.hidden && !g.answered && !keyOn(cfg) && !K.pending()) K.after(750, function () { flashHide(cfg); });
    var opts = shuffle(cfg.words);
    return K.topBar(
      K.pill(ru('Word', 'Слово') + ' ' + (g.i + 1) + '/' + N) + ' ' + K.pill(ru('Score', 'Счёт') + ': ' + g.score),
      chip(cfg, 'flashAgain', '', '🔄 ' + tx({ ru: 'Ещё раз', en: 'Again' })) + ' ' + restartChip(cfg, 'flashcount')) +
      K.centerCard(
        '<div style="min-height:150px;">' + (g.hidden ? '<div style="font-size:2.4rem;padding:2.2rem 0;">🙈</div>'
                                                      : K.svgBox(w, 140)) + '</div>' +
        (g.answered
          ? '<div style="font-family:var(--font-deva);font-size:2rem;font-weight:700;color:var(--accent-cambridge);">' +
            w.deva + '</div><div class="iast-text">' + w.iast + '</div>' +
            '<div style="margin-top:0.75rem;">' + listenChip(cfg, w) + ' ' +
            '<button type="button" class="btn btn-primary" style="padding:0.45rem 1.1rem;"' + call(cfg, 'flashNext') + '>' +
            ru('Next →', 'Далее →') + '</button></div>'
          : '<div style="margin-bottom:0.35rem;font-weight:800;">' + tx({ ru: 'Сколько?', en: 'How many?' }) + '</div>' +
            K.optGrid(opts.map(function (o, i) {
              var cls = '';
              if (g.answered && o.id === w.id) cls = 'correct';
              if (g.picked === o.id && o.id !== w.id) cls = 'wrong';
              return wordOpt(cfg, o, 'flashPick', cls, i);
            }).join(''))) +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Картинка вспыхивает на мгновение — считайте быстро, как в жизни, а не по пальцам.',
               en: 'The picture flashes for a moment — count at a glance, the way you do in real life.' }) + '</div>');
  }

  /* ======================================================= 22. BLIND BOARD */
  function boardHide(cfg) {
    var g = K.gst(cfg, 'blindboard');
    if (K.state(cfg).game !== 'blindboard') { K.clearAfter(); return; }
    g.phase = 'ask'; g.ask = null;
    SAL.refresh();
  }
  function renderBlindBoard(cfg) {
    var g = K.gst(cfg, 'blindboard');
    if (!g.cards) {
      var two = cfg.words.concat(cfg.words);
      g.cards = shuffle(two.map(function (w) { return w.id; }));
    }
    var cols = K.memoryCols(g.cards.length);
    if (g.finished || g.i >= g.cards.length) {
      return done(cfg, 'blindboard', tx({ ru: 'Слепое поле — пройдено', en: 'Blind board — done' }),
        g.score, g.cards.length);
    }
    if (g.phase === 'show' && !K.pending()) K.after(2500, function () { boardHide(cfg); });
    if (g.phase === 'ask' && g.ask === null) {
      var free = [];
      g.cards.forEach(function (id, idx) { if (!g.done[idx]) free.push(idx); });
      if (!free.length) g.finished = true;
      else g.ask = free[Math.floor(Math.random() * free.length)];
    }
    var cells = g.cards.map(function (id, idx) {
      var w = byId(cfg, id);
      var open = g.phase === 'show' || !!g.done[idx] || keyOn(cfg);
      var cls = 'wcell' + (g.done[idx] ? ' found' : '') + (open ? '' : ' card-back');
      if (g.phase === 'ask' && g.ask === idx) cls += ' asked';
      return '<button type="button" class="' + cls + '">' +
        (open ? devaSpan(w.deva, '0.95rem') : '<span class="memory-card-back-emblem memory-coord">' +
          K.cellName(idx, cols) + '</span>') + '</button>';
    }).join('');
    var askW = g.ask === null ? null : byId(cfg, g.cards[g.ask]);
    var duoB = players(cfg) === 2;
    return K.topBar(
      (duoB ? scorePills(cfg, g) + ' ' : '') +
      K.pill(tx({ ru: 'Клеток угадано', en: 'Squares named' }) + ': ' + g.score + '/' + g.cards.length) + ' ' +
        K.pill(g.phase === 'show' ? tx({ ru: 'Запоминайте…', en: 'Memorise…' }) : tx({ ru: 'Что в клетке', en: 'What is in' }) +
          ' ' + (g.ask === null ? '' : K.cellName(g.ask, cols) + '?')),
      chip(cfg, 'blindAgain', '', '👁 ' + tx({ ru: 'Показать поле', en: 'Show board' })) + ' ' + restartChip(cfg, 'blindboard')) +
      K.centerCard(
        '<div class="grid-10" style="grid-template-columns: repeat(' + cols + ', 1fr);">' + cells + '</div>' +
        (g.phase === 'ask' && !g.answered
          ? '<div style="margin-top:0.9rem;">' + K.optGrid(shuffle(cfg.words).map(function (o, i) {
              return wordOpt(cfg, o, 'blindPick', '', i);
            }).join('')) + '</div>'
          : '') +
        (g.answered && askW
          ? '<div style="margin-top:0.85rem;font-family:var(--font-deva);font-size:1.7rem;font-weight:700;color:' +
            (g.picked === askW.id ? '#16a34a' : '#dc2626') + ';">' + askW.deva + '</div>' +
            '<div style="margin-top:0.6rem;">' +
            '<button type="button" class="btn btn-primary" style="padding:0.45rem 1.1rem;"' + call(cfg, 'blindNext') + '>' +
            ru('Next →', 'Далее →') + '</button></div>'
          : '') +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Поле открыто 2,5 секунды, затем закрыто. Назовите, что спрятано в названной клетке.',
               en: 'The board shows for 2.5 seconds, then closes. Name what hides in the square you are asked about.' }) +
          (duoB ? '<br/>' + tx({ ru: 'Отвечает по очереди: вопрос — одному, следующий — другому.',
                                 en: 'Turns alternate: one question for each student.' }) : '') + '</div>');
  }

  /* ======================================================== 23. BATTLESHIP */
  function renderBattleship(cfg) {
    var g = K.gst(cfg, 'battleship');
    if (!g.board) {
      g.board = shuffle(cfg.words.concat(cfg.words).map(function (w) { return w.id; }));
    }
    var cols = K.memoryCols(g.board.length);
    var taken = Object.keys(g.claimed).length;
    if (g.finished || taken >= g.board.length) {
      return done(cfg, 'battleship', tx({ ru: 'Морской бой — пройден', en: 'Battleship — done' }),
        Math.max(g.scores[0], g.scores[1]), g.board.length,
        players(cfg) === 1
          ? tx({ ru: 'Найдено слов', en: 'Words found' }) + ': ' + g.scores[0]
          : tx({ ru: 'Счёт', en: 'Score' }) + ' — 1: ' + g.scores[0] + ' · 2: ' + g.scores[1]);
    }
    var cells = g.board.map(function (id, idx) {
      var w = byId(cfg, id);
      var open = !!g.claimed[idx] || g.ask === idx;
      var cls = 'bcell' + (g.claimed[idx] !== undefined ? ' captured' : '') +
        (g.ask === idx ? ' asked' : '') + (open ? '' : ' card-back');
      var owner = g.claimed[idx];
      return '<button type="button" class="' + cls + '"' + (open ? '' : call(cfg, 'battleOpen', String(idx))) + '>' +
        (open
          ? devaSpan(w.deva, '0.95rem') + (owner !== undefined && players(cfg) === 2
              ? '<span class="cell-owner">' + (owner + 1) + '</span>' : '')
          : '<span class="memory-card-back-emblem memory-coord">' + K.cellName(idx, cols) + '</span>') + '</button>';
    }).join('');
    var askW = g.ask === null ? null : byId(cfg, g.board[g.ask]);
    return K.topBar(
      scorePills(cfg, g) + ' ' + K.pill(tx({ ru: 'Закрыто', en: 'Closed' }) + ': ' + (g.board.length - taken)),
      restartChip(cfg, 'battleship')) +
      K.centerCard(
        '<div class="grid-10" style="grid-template-columns: repeat(' + cols + ', 1fr);">' + cells + '</div>' +
        (askW
          ? '<div style="margin-top:0.9rem;font-weight:800;">' + tx({ ru: 'Что в клетке', en: 'What is in' }) + ' ' +
              K.cellName(g.ask, cols) + '? ' + (players(cfg) === 2
                ? tx({ ru: 'Отвечает ученик', en: 'Answered by student' }) + ' ' + (g.turn + 1) : '') + '</div>' +
            '<div style="margin:0.5rem 0 0.35rem;">' + K.svgBox(askW, 92) + '</div>' +
            K.optGrid(shuffle(cfg.words).map(function (o, i) {
              return wordOpt(cfg, o, 'battlePick', '', i);
            }).join(''))
          : '<div style="margin-top:0.85rem;font-size:0.9rem;color:var(--text-secondary);">' +
            tx({ ru: 'Назовите клетку (например b2) и слово, которое в ней спрятано. Угадали — забираете клетку и ходите снова.',
                 en: 'Call a square (b2, for example) and name the word hiding there. A hit takes the square and earns another turn.' }) + '</div>') +
        (g.miss
          ? '<div style="margin-top:0.6rem;color:#dc2626;font-weight:800;">✕ ' +
            tx({ ru: 'Мимо — клетка закрывается, ход переходит.', en: 'Miss — the square closes and the turn passes.' }) + '</div>'
          : ''));
  }

  /* ============================================================= 24. BINGO */
  function bingoCard(cfg) {
    var ids = cfg.words.map(function (w) { return w.id; });
    var cellIds = shuffle(ids).slice(0, Math.min(9, Math.max(4, ids.length)));
    while (cellIds.length < 9) cellIds.push(ids[Math.floor(Math.random() * ids.length)]);
    return shuffle(cellIds);
  }
  function renderBingo(cfg) {
    var g = K.gst(cfg, 'bingo');
    if (!g.cards) {
      g.cards = [bingoCard(cfg), bingoCard(cfg)];
      g.calls = shuffle(cfg.words.map(function (w) { return w.id; }));
      while (g.calls.length < 25) g.calls = g.calls.concat(shuffle(cfg.words.map(function (w) { return w.id; })));
      g.i = -1;
    }
    if (g.finished) {
      return done(cfg, 'bingo',
        players(cfg) === 2
          ? tx({ ru: 'Бинго! Победил ученик ' + (g.winner + 1), en: 'Bingo! Student ' + (g.winner + 1) + ' wins' })
          : tx({ ru: 'Бинго — карта закрыта', en: 'Bingo — card covered' }),
        players(cfg) === 2 ? 1 : Object.keys(g.covered[0]).length, 9,
        tx({ ru: 'Слов названо', en: 'Words called' }) + ': ' + (g.i + 1));
    }
    var cur = g.i < 0 ? null : byId(cfg, g.calls[g.i]);
    function card(p) {
      if (players(cfg) === 1 && p === 1) return '';
      var cells = g.cards[p].map(function (id, idx) {
        var w = byId(cfg, id);
        var cov = g.covered[p][idx] !== undefined;
        return '<button type="button" class="bingo-cell' + (cov ? ' covered' : '') + '"' +
          (cov ? '' : call(cfg, 'bingoCover', String(p), String(idx))) + '>' +
          (cov ? '✓' : devaSpan(w.deva, '1rem')) + '</button>';
      }).join('');
      return '<div style="flex:1 1 180px;max-width:240px;">' +
        '<div style="font-weight:800;font-size:0.9rem;margin-bottom:0.35rem;">' +
          (players(cfg) === 2 ? tx({ ru: 'Ученик', en: 'Student' }) + ' ' + (p + 1)
                              : tx({ ru: 'Карта', en: 'Card' })) + '</div>' +
        '<div class="bingo-card">' + cells + '</div></div>';
    }
    return K.topBar(
      (players(cfg) === 2 ? scorePills(cfg, g) + ' ' : '') +
        K.pill(tx({ ru: 'Названо слов', en: 'Words called' }) + ': ' + (g.i + 1)),
      chip(cfg, 'bingoCall', '', '📣 ' + tx({ ru: 'Следующее слово', en: 'Next word' })) + ' ' + restartChip(cfg, 'bingo')) +
      K.centerCard(
        (cur
          ? '<div style="font-family:var(--font-deva);font-size:2.4rem;font-weight:700;">' + cur.deva + '</div>' +
            '<div style="margin:0.35rem 0 0.75rem;">' + listenChip(cfg, cur) + '</div>'
          : '<div style="padding:1.5rem 0;font-weight:800;">📣 ' + tx({ ru: 'Нажмите «следующее слово»', en: 'Press “next word”' }) + '</div>') +
        '<div style="display:flex;gap:1.1rem;justify-content:center;flex-wrap:wrap;">' + card(0) + card(1) + '</div>' +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Ведущий называет слово — игрок закрывает его у себя на карте. Кто закрыл все девять клеток, тот кричит «бинго!».',
               en: 'The caller says a word; each player covers it on their own card. All nine covered — shout “bingo!”.' }) + '</div>');
  }

  /* ============================================================== 25. DUEL */
  function renderDuel(cfg) {
    var g = K.gst(cfg, 'duel');
    var N = cfg.words.length;
    orderOf(cfg, g);
    if (g.finished || g.i >= N) {
      return done(cfg, 'duel', tx({ ru: 'Дуэль — окончена', en: 'Duel — over' }),
        Math.max(g.scores[0], g.scores[1]), N,
        players(cfg) === 2
          ? tx({ ru: 'Счёт', en: 'Score' }) + ' — 1: ' + g.scores[0] + ' · 2: ' + g.scores[1]
          : '');
    }
    var w = byId(cfg, orderOf(cfg, g)[g.i]);
    var claimed = players(cfg) === 1 || g.claim !== null;
    var body;
    if (!claimed) {
      body = '<div style="font-weight:800;margin-bottom:0.6rem;">' +
        tx({ ru: 'Кто знает? Нажимайте быстрее!', en: 'Who knows? Press first!' }) + '</div>' +
        '<div style="display:flex;gap:0.7rem;justify-content:center;flex-wrap:wrap;">' +
        '<button type="button" class="chip-btn" style="font-size:1rem;padding:0.7rem 1.3rem;"' +
          call(cfg, 'duelClaim', '0') + '>🙋 ' + tx({ ru: 'Ученик 1', en: 'Student 1' }) + '</button>' +
        '<button type="button" class="chip-btn" style="font-size:1rem;padding:0.7rem 1.3rem;"' +
          call(cfg, 'duelClaim', '1') + '>🙋 ' + tx({ ru: 'Ученик 2', en: 'Student 2' }) + '</button></div>';
    } else {
      var opts = shuffle([w].concat(K.others(cfg, w.id, 3)));
      body = '<div style="margin-bottom:0.5rem;font-weight:800;">' +
        (players(cfg) === 2 ? tx({ ru: 'Отвечает ученик', en: 'Answered by student' }) + ' ' + (g.claim + 1) : '') + '</div>' +
        K.optGrid(opts.map(function (o, i) {
          var cls = '';
          if (g.answered && o.id === w.id) cls = 'correct';
          if (g.answered && g.picked === o.id && o.id !== w.id) cls = 'wrong';
          return wordOpt(cfg, o, 'duelPick', cls, i);
        }).join('')) +
        (g.answered
          ? '<div style="margin-top:0.85rem;">' + listenChip(cfg, w) + ' ' +
            '<button type="button" class="btn btn-primary" style="padding:0.45rem 1.1rem;"' + call(cfg, 'duelNext') + '>' +
            ru('Next →', 'Далее →') + '</button></div>'
          : '');
    }
    return K.topBar(
      K.pill(ru('Round', 'Раунд') + ' ' + (g.i + 1) + '/' + N) + ' ' + scorePills(cfg, g),
      restartChip(cfg, 'duel')) +
      K.centerCard(
        K.svgBox(w, 130) + body +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Обеим видна одна картинка. Кто нажал первым, тот и отвечает; ошибка отдаёт очко сопернику.',
               en: 'Both see the same picture. Whoever presses first answers; a miss gives the point to the opponent.' }) + '</div>');
  }

  /* ========================================================== 26. DESCRIBE */
  function renderDescribe(cfg) {
    var g = K.gst(cfg, 'describe');
    var N = cfg.words.length;
    orderOf(cfg, g);
    if (g.finished || g.i >= N) {
      return done(cfg, 'describe', tx({ ru: 'Диктор и ученик — пройдено', en: 'Describe & guess — done' }),
        Math.max(g.scores[0], g.scores[1]), N,
        players(cfg) === 2
          ? tx({ ru: 'Счёт', en: 'Score' }) + ' — 1: ' + g.scores[0] + ' · 2: ' + g.scores[1]
          : '');
    }
    var w = byId(cfg, orderOf(cfg, g)[g.i]);
    var shows = g.mode === 'show';
    var front = shows
      ? K.svgBox(w, 130) + (g.shown
          ? '<div style="font-family:var(--font-deva);font-size:2rem;font-weight:700;">' + w.deva + '</div>'
          : '<div style="font-size:2.2rem;letter-spacing:0.2em;">' + '■'.repeat(w.deva.length) + '</div>')
      : '<div style="font-family:var(--font-deva);font-size:2.6rem;font-weight:700;">' + w.deva + '</div>' +
        '<div class="iast-text">' + w.iast + '</div>' +
        (g.shown ? K.svgBox(w, 110) : '<div style="padding:2.4rem 0;font-size:1.6rem;">🙈</div>');
    return K.topBar(
      K.pill(ru('Round', 'Раунд') + ' ' + (g.i + 1) + '/' + N) + ' ' + scorePills(cfg, g),
      chip(cfg, 'descMode', 'show', '🖼 ' + tx({ ru: 'Показывает', en: 'Shows' }), shows) + ' ' +
        chip(cfg, 'descMode', 'say', '🔤 ' + tx({ ru: 'Называет', en: 'Says' }), !shows) + ' ' +
        restartChip(cfg, 'describe')) +
      K.centerCard(
        '<div style="margin-bottom:0.5rem;font-weight:800;">' +
          (players(cfg) === 2
            ? tx({ ru: 'Показывает ученик', en: 'Performer' }) + ' ' + (g.turn + 1) + ' · ' +
              tx({ ru: 'отвечает ученик', en: 'guesser' }) + ' ' + (2 - g.turn)
            : tx({ ru: 'Скажите или покажите', en: 'Say it or show it' })) + '</div>' +
        front +
        '<div style="margin:0.6rem 0 0.85rem;">' +
          chip(cfg, 'descFlip', '', g.shown ? '🙈 ' + tx({ ru: 'Скрыть', en: 'Hide' }) : '👁 ' + tx({ ru: 'Показать', en: 'Show' })) +
          ' ' + listenChip(cfg, w) + '</div>' +
        '<div style="display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;">' +
        '<button type="button" class="chip-btn" style="background:#16a34a;border-color:#16a34a;color:#fff;"' +
          call(cfg, 'descGrade', '1') + '>✓ ' + tx({ ru: 'Угадал', en: 'Guessed' }) + '</button>' +
        '<button type="button" class="chip-btn" style="border-color:#dc2626;color:#dc2626;"' +
          call(cfg, 'descGrade', '0') + '>✕ ' + tx({ ru: 'Не угадал', en: 'Missed' }) + '</button></div>' +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Один показывает жестом урока, другой называет слово; напарник же и судья. Роли меняются каждый раунд.',
               en: 'One performs the lesson gesture, the other names the word — and the partner is the judge. Roles swap every round.' }) + '</div>');
  }

  /* ======================================================= 27. ORDER RELAY */
  function renderOrderRelay(cfg) {
    var g = K.gst(cfg, 'orderrelay');
    var N = cfg.words.length;
    if (!g.order) g.order = shuffle(cfg.words.map(function (w) { return w.id; }));
    if (g.finished || g.placed.length >= N) {
      return done(cfg, 'orderrelay', tx({ ru: 'Эстафета — пройдена', en: 'Order relay — done' }),
        Math.max(g.scores[0], g.scores[1]), N,
        players(cfg) === 2
          ? tx({ ru: 'Счёт', en: 'Score' }) + ' — 1: ' + g.scores[0] + ' · 2: ' + g.scores[1]
          : '');
    }
    /* Здесь проверяем порядок счёта, поэтому на карточке — само числительное
       словом. Картинка (бусины или цифра) сразу выдавала бы значение: бусины
       можно пересчитать, цифру — прочитать, и слово уже не нужно. */
    var placed = g.placed.map(function (id) {
      var w = byId(cfg, id);
      return '<div class="vocab-item-card relay-slot relay-done">' +
        '<div class="relay-word">' + w.deva + '</div></div>';
    }).join('');
    var left = g.order.filter(function (id) { return g.placed.indexOf(id) < 0; }).map(function (id) {
      var w = byId(cfg, id);
      var cls = 'vocab-item-card relay-slot' + (g.wrong === id ? ' wrong-card' : '');
      return '<button type="button" class="' + cls + '"' + call(cfg, 'relayTap', id) + '>' +
        '<div class="relay-word">' + w.deva + '</div></button>';
    }).join('');
    return K.topBar(
      K.pill(tx({ ru: 'Выложено', en: 'Placed' }) + ': ' + g.placed.length + '/' + N) + ' ' + scorePills(cfg, g),
      restartChip(cfg, 'orderrelay')) +
      K.centerCard(
        '<div class="vocab-grid-6" style="margin-bottom:0.9rem;">' + placed +
          '<div class="vocab-item-card relay-slot relay-empty">' +
          '<div class="relay-slot-num">' + (g.placed.length + 1) + '</div></div></div>' +
        '<div class="vocab-grid-6">' + left + '</div>' +
        (g.wrong ? '<div style="margin-top:0.6rem;color:#dc2626;font-weight:800;">✕ ' +
          tx({ ru: 'Не в том порядке — ход переходит.', en: 'Wrong order — the turn passes.' }) + '</div>' : '') +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'На карточках — сами числительные словами. Выложите их по порядку: один, два, три… Игроки ходят по одному слову; ошибка передаёт ход.',
               en: 'The cards show the numerals themselves in words. Lay them out in order: one, two, three… Players take one word each; a miss passes the turn.' }) + '</div>');
  }

  /* ======================================================= 28. CO-OP MEMORY */
  function renderCoopMemory(cfg) {
    var g = K.gst(cfg, 'coopmemory');
    if (!g.cards) {
      var two = cfg.words.concat(cfg.words);
      g.cards = shuffle(two.map(function (w) { return w.id; }));
      g.limit = Math.round(g.cards.length / 2) + 4;
    }
    var cols = K.memoryCols(g.cards.length);
    var pairs = Object.keys(g.matched).length;
    if (g.finished) {
      return done(cfg, 'coopmemory',
        pairs >= g.cards.length / 2
          ? tx({ ru: 'Поле очищено вместе!', en: 'Board cleared together!' })
          : tx({ ru: 'Не уложились в ходы', en: 'Out of moves' }),
        pairs, g.cards.length / 2, tx({ ru: 'Ходов', en: 'Moves' }) + ': ' + g.moves + ' / ' + g.limit);
    }
    if (g.moves > g.limit) g.finished = true;
    var cells = g.cards.map(function (id, idx) {
      var w = byId(cfg, id);
      var flipped = g.flipped.indexOf(idx) >= 0 || g.matched[id];
      var cls = 'bcell' + (g.matched[id] ? ' captured' : '') + (flipped ? '' : ' card-back');
      return '<button type="button" class="' + cls + '"' + call(cfg, 'coopFlip', String(idx)) + '>' +
        (flipped ? devaSpan(w.deva, '0.95rem')
                 : '<span class="memory-card-back-emblem memory-coord">' + K.cellName(idx, cols) + '</span>') + '</button>';
    }).join('');
    return K.topBar(
      K.pill(tx({ ru: 'Пары', en: 'Pairs' }) + ': ' + pairs + '/' + (g.cards.length / 2)) + ' ' +
        K.pill(tx({ ru: 'Ходов', en: 'Moves' }) + ': ' + g.moves + '/' + g.limit) + ' ' +
        (players(cfg) === 2 ? K.pill(tx({ ru: 'Ход', en: 'Turn' }) + ': ' +
          tx({ ru: 'Ученик', en: 'Student' }) + ' ' + (g.turn + 1)) : ''),
      restartChip(cfg, 'coopmemory')) +
      K.centerCard(
        '<div class="grid-10" style="grid-template-columns: repeat(' + cols + ', 1fr);">' + cells + '</div>' +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Не друг против друга, а вместе: очистите поле за ' + g.limit + ' ходов, обсуждая каждую клетку вслух.',
               en: 'Not against each other but together: clear the board in ' + g.limit + ' moves, discussing every square out loud.' }) + '</div>');
  }

  /* ========================================================= 29. TIC-TAC-TOE */
  var TTT_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  function renderTicTacToe(cfg) {
    var g = K.gst(cfg, 'tictactoe');
    if (!g.cells) {
      g.cells = [];
      for (var i = 0; i < 9; i++) g.cells.push(cfg.words[i % cfg.words.length].id);
      g.cells = shuffle(g.cells);
      g.board = [null, null, null, null, null, null, null, null, null];
    }
    if (g.finished) {
      var one = players(cfg) === 1;
      return done(cfg, 'tictactoe',
        g.winner === 'draw' ? tx({ ru: 'Ничья', en: 'Draw' })
          : one ? tx({ ru: 'Три в ряд — есть!', en: 'Three in a row — done!' })
          : tx({ ru: 'Победил ученик ' + (g.winner + 1), en: 'Student ' + (g.winner + 1) + ' wins' }),
        1, 1, tx({ ru: 'Ходов', en: 'Moves' }) + ': ' + g.moves);
    }
    var cells = g.board.map(function (owner, idx) {
      var w = byId(cfg, g.cells[idx]);
      var cls = 'ttt-cell' + (owner === 0 ? ' own-1' : owner === 1 ? ' own-2' : '') +
        (g.ask === idx ? ' asked' : '');
      return '<button type="button" class="' + cls + '"' +
        (owner === null ? call(cfg, 'tttOpen', String(idx)) : '') + '>' +
        (owner === null ? devaSpan(w.deva, '0.9rem') : (owner === 0 ? '✕' : '◯')) + '</button>';
    }).join('');
    var askW = g.ask === null ? null : byId(cfg, g.cells[g.ask]);
    var numeric = !!(askW && askW.value);
    /* счёт — со знаками игроков, ход — тем же знаком: видно, чей он */
    var marks = players(cfg) === 2
      ? K.pill('<b class="ttt-mark mark-x">✕</b> ' + g.scores[0]) + ' ' +
        K.pill('<b class="ttt-mark mark-o">◯</b> ' + g.scores[1]) + ' ' +
        K.pill(tx({ ru: 'Ход', en: 'Turn' }) + ': ' +
          '<b class="ttt-mark ' + (g.turn === 0 ? 'mark-x' : 'mark-o') + '">' +
          (g.turn === 0 ? '✕' : '◯') + '</b>')
      : scorePills(cfg, g);
    return K.topBar(
      marks,
      restartChip(cfg, 'tictactoe')) +
      K.centerCard(
        '<div class="ttt-grid">' + cells + '</div>' +
        (askW
          ? (numeric
            ? '<div style="margin-top:0.9rem;font-weight:800;">' +
                tx({ ru: 'Назовите слово вслух — и покажите, сколько это', en: 'Say the word aloud and show how many that is' }) + '</div>' +
              '<div class="ttt-ask-word">' + askW.deva + '</div>' +
              '<div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.15rem;">' +
                tx({ ru: 'Варианты A–D — это количество', en: 'Options A–D show the quantity' }) + '</div>' +
              K.optGrid(shuffle([askW].concat(K.others(cfg, askW.id, 3))).map(function (o, i) {
                return qtyOpt(cfg, o, 'tttPick', keyOn(cfg) && o.id === askW.id ? 'correct' : '', i);
              }).join(''))
            : '<div style="margin-top:0.9rem;font-weight:800;">' + tx({ ru: 'Назовите слово — и клетка ваша', en: 'Name the word and the square is yours' }) + '</div>' +
              '<div style="margin:0.4rem 0;">' + K.svgBox(askW, 92) + '</div>' +
              K.optGrid(shuffle([askW].concat(K.others(cfg, askW.id, 3))).map(function (o, i) {
                return wordOpt(cfg, o, 'tttPick', keyOn(cfg) && o.id === askW.id ? 'correct' : '', i);
              }).join('')))
          : '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
            tx({ ru: 'Клетку можно занять, только назвав слово, которое в ней написано.',
                 en: 'You can only take a square by naming the word written in it.' }) + '</div>') +
        (g.miss ? '<div style="margin-top:0.6rem;color:#dc2626;font-weight:800;">✕ ' +
          tx({ ru: 'Неверно — клетка свободна, ход переходит.', en: 'Wrong — the square stays free and the turn passes.' }) + '</div>' : '') +
        (players(cfg) === 2
          ? '<div class="ttt-hint">' + tx({ ru: 'Ходят по очереди: ученик 1 ставит ✕, ученик 2 — ◯.',
              en: 'Turns alternate: student 1 puts ✕, student 2 puts ◯.' }) + '</div>'
          : '<div class="ttt-hint">' + tx({
              ru: 'Играете один — на поле только ✕. Чтобы появились ◯ и ход по очереди, включите 👥 «2 ученика» над вкладками игр.',
              en: 'Playing alone — only ✕ appears. To get ◯ and alternating turns, switch on 👥 “2 students” above the game tabs.' }) + '</div>'));
  }

  /* =========================================================================
     30–31. ФИЛВОРДЫ: РАЗМЕР ПОЛЯ И «ТРУДНЫЕ» СОСЕДИ
     -------------------------------------------------------------------------
     Два поля: «среди слов» (wordgrid) и «среди букв» (wordsearch). У обоих
     есть выбор размера: 10 × 10, 9 × 9, 8 × 8, 7 × 7, 6 × 6, 5 × 5.

     ГЛАВНОЕ ПРАВИЛО ЗАПОЛНЕНИЯ (см. DEV_* ниже):
     свободные клетки заполняются НЕ случайными буквами, а «почти-двойниками»
     букв, которые уже стоят в слове. Ученик не может отличить слово от
     ловушки «на глаз»: нужно точно знать долготу гласной и варгу согласной.
     Ровно те ошибки, которые преподаватель слышит на уроке:

       1. ДОЛГОТА ГЛАСНОЙ: ि ↔ ी, ु ↔ ू, े ↔ ै, ो ↔ ौ, अ ↔ आ
          त्रीणि против त्रिणि (trīṇi против triṇi) — «короткая и» вместо «длинной».
       2. ऋ И РИ (r с точкой внизу против «ри»):
          तृ ↔ त्रि, कृ ↔ क्रि; отдельная ऋ ↔ रि.
          तृणि (tṛṇi) читается почти как त्रीणि — классическая ловушка.
       3. ВАРГА (место образования): ण ↔ न ↔ म, ट ↔ त ↔ प, ड ↔ द ↔ ब …
          ण — церебральная (ट-варга), न — зубная (त-варга): «н из другой варги».
       4. ОДНА ВАРГА, ДРУГАЯ КОЛОНКА: क ↔ ख ↔ ग ↔ घ (звонкость/придыхание).
       5. ШИПЯЩИЕ: श ↔ ष ↔ स.   НОСОВЫЕ: ं ↔ ँ ↔ ः.
       6. ПОХОЖИЕ НАЧЕРТАНИЯ: भ ↔ म, ध ↔ घ, व ↔ ब, प ↔ ष, र ↔ ल.
       7. ВИРАМА: षट् ↔ षट (потерянный ्).

     Ловушка ставится рядом с правильной частью слова (в том числе прямо по
     линии продолжения), а не в случайном месте сетки: поэтому «следующая
     буква» после найденной части — всегда почти-правильная, а не случайная.
     ========================================================================= */
  var WS_SIZES = [10, 9, 8, 7, 6, 5];

  /* пять варг (рядов) — колонки это звонкость и придыхание */
  var DEV_VARGAS = [
    ['क', 'ख', 'ग', 'घ', 'ङ'],
    ['च', 'छ', 'ज', 'झ', 'ञ'],
    ['ट', 'ठ', 'ड', 'ढ', 'ण'],
    ['त', 'थ', 'द', 'ध', 'न'],
    ['प', 'फ', 'ब', 'भ', 'म']
  ];
  /* те же колонки, но поперёк варг — место образования:
     ण (церебральная) ↔ न (зубная) ↔ म (губная) ↔ ङ ↔ ञ */
  var DEV_COLUMNS = [
    ['क', 'च', 'ट', 'त', 'प'],
    ['ख', 'छ', 'ठ', 'थ', 'फ'],
    ['ग', 'ज', 'ड', 'द', 'ब'],
    ['घ', 'झ', 'ढ', 'ध', 'भ'],
    ['ङ', 'ञ', 'ण', 'न', 'म']
  ];
  /* долгота независимых гласных */
  var DEV_LONG = {
    'अ': 'आ', 'आ': 'अ', 'इ': 'ई', 'ई': 'इ', 'उ': 'ऊ', 'ऊ': 'उ',
    'ऋ': 'ॠ', 'ॠ': 'ऋ', 'ए': 'ऐ', 'ऐ': 'ए', 'ओ': 'औ', 'औ': 'ओ'
  };
  /* долгота огласовок (matras) */
  var DEV_MATRA_LONG = {
    'ि': 'ी', 'ी': 'ि', 'ु': 'ू', 'ू': 'ु',
    'ृ': 'ॄ', 'ॄ': 'ृ', 'े': 'ै', 'ै': 'े', 'ो': 'ौ', 'ौ': 'ो'
  };
  /* носовые и висарга: ं / ँ / ः */
  var DEV_SIGNS = ['ं', 'ँ', 'ः'];
  /* похожие начертания и близкие на слух пары */
  var DEV_SHAPE = [
    ['भ', 'म'], ['ध', 'घ'], ['व', 'ब'], ['प', 'ष'], ['य', 'थ'],
    ['र', 'ल'], ['ज', 'झ'], ['ट', 'ड'], ['द', 'ड'], ['श', 'स'], ['ष', 'स']
  ];

  /* inCluster = буква стоит рядом с вирамой (्), т.е. входит в лигатуру.
     Тогда меняем её только внутри варги: क→ख/ग/घ остаётся читаемым кластером,
     а ण→न внутри лигатуры дало бы невозможное написание и ловушка была бы
     слишком заметной. У одиночной согласной доступны и другие варги (ण ↔ न). */
  /* согласные, к которым можно приписать ा (у гласной ए или матры ि так нельзя:
     получилось бы एा — несуществующее написание) */
  var DEV_CONSONANTS = (function () {
    var out = {};
    DEV_VARGAS.forEach(function (row) { row.forEach(function (x) { out[x] = true; }); });
    ['य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', 'ळ'].forEach(function (x) { out[x] = true; });
    return out;
  })();

  function devaAltsOfConsonant(ch, inCluster) {
    var out = [];
    DEV_VARGAS.forEach(function (row) {          /* та же варга: звонкость/придыхание */
      if (row.indexOf(ch) >= 0) row.forEach(function (x) { if (x !== ch) out.push(x); });
    });
    if (!inCluster) {
      DEV_COLUMNS.forEach(function (col) {       /* та же колонка: другая варга (ण ↔ न) */
        if (col.indexOf(ch) >= 0) col.forEach(function (x) { if (x !== ch) out.push(x); });
      });
    }
    DEV_SHAPE.forEach(function (pair) {          /* похожие начертания */
      if (pair[0] === ch) out.push(pair[1]);
      if (pair[1] === ch) out.push(pair[0]);
    });
    return out;
  }

  function devaAltsOfChar(ch, inCluster) {
    var out = [];
    if (DEV_LONG[ch]) out.push(DEV_LONG[ch]);
    if (DEV_MATRA_LONG[ch]) out.push(DEV_MATRA_LONG[ch]);
    if (DEV_SIGNS.indexOf(ch) >= 0) {
      DEV_SIGNS.forEach(function (s) { if (s !== ch) out.push(s); });
    }
    return out.concat(devaAltsOfConsonant(ch, inCluster));
  }

  function uniq(list) {
    var seen = {}, out = [];
    list.forEach(function (v) {
      if (!v || seen[v]) return;
      seen[v] = true;
      out.push(v);
    });
    return out;
  }

  /* Все «почти-двойники» одной части слова.
     Возвращает строки той же длины в буквах, кроме ऋ ↔ रि, где длина меняется:
     तृ → त्रि (tṛ → tri), त्रि → तृ. Именно эти пары и путают ученики. */
  function devaVariants(chunk) {
    if (!chunk) return [];
    var chars = chunk.split('');
    var out = [];
    chars.forEach(function (ch, i) {
      var inCluster = chars[i - 1] === '्' || chars[i + 1] === '्';
      devaAltsOfChar(ch, inCluster).forEach(function (alt) {
        out.push(chars.slice(0, i).join('') + alt + chars.slice(i + 1).join(''));
      });
    });
    /* ऋ ↔ रि  и  ृ ↔ ्रि  — «r с точкой внизу» против «ри» */
    if (chunk.indexOf('ृ') >= 0) out.push(chunk.split('ृ').join('्रि'));
    if (chunk.indexOf('्रि') >= 0) out.push(chunk.split('्रि').join('ृ'));
    if (chunk.indexOf('ऋ') >= 0) out.push(chunk.split('ऋ').join('रि'));
    if (chunk.indexOf('रि') >= 0) out.push(chunk.split('रि').join('ऋ'));
    /* долгота на конце: द ↔ दा, का ↔ क */
    var last = chars[chars.length - 1];
    if (last === 'ा') out.push(chunk.slice(0, -1));
    else if (last && devaAltsOfConsonant(last).length) out.push(chunk + 'ा');
    /* ровно ОДИН признак на ловушку: заменили долготу — варгу уже не трогаем,
       иначе ученик отличит подделку по второй ошибке и правило перестанет работать */
    return uniq(out).filter(function (v) { return v !== chunk; });
  }

  /* Перестановка для поля: слова ставим от длинных к коротким, но начало
     и направление каждый раз случайные — доска не повторяется. */
  function orderedWords(cfg) {
    return shuffle(cfg.words.slice()).sort(function (a, b) {
      return chunks(b).length - chunks(a).length;
    });
  }

  function placeWord(grid, n, w, ch, places) {
    var starts = [];
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) starts.push([r, c]);
    starts = shuffle(starts);
    var dirs = shuffle(DIRS.slice());
    for (var s = 0; s < starts.length; s++) {
      for (var d = 0; d < dirs.length; d++) {
        var dr = dirs[d][1], dc = dirs[d][0];
        var row = starts[s][0], col = starts[s][1];
        if (row + dr * (ch.length - 1) >= n || col + dc * (ch.length - 1) >= n) continue;
        var cells = [], fits = true;
        for (var k = 0; k < ch.length; k++) {
          var idx = (row + dr * k) * n + (col + dc * k);
          /* клетка занята — можно встать крест-накрест, если буква та же */
          if (grid[idx] !== '' && grid[idx] !== ch[k]) { fits = false; break; }
          cells.push(idx);
        }
        if (!fits) continue;
        cells.forEach(function (idx2, k2) { grid[idx2] = ch[k2]; });
        places.push({ id: w.id, cells: cells, dr: dr, dc: dc });
        return true;
      }
    }
    return false;
  }

  /* ---------------------------------------------------------------------
     СЛОВА-ДВОЙНИКИ (главный источник сложности)
     Настоящее слово лежит в поле — и в ДРУГОМ месте поля лежит оно же, но
     с одной заменённой буквой: त्रीणि ↔ त्रिणि, चत्वारि ↔ चत्वरि, एकम् ↔ एकम.
     Двойник занимает столько же клеток, лежит так же по прямой, и его нельзя
     отличить «на глаз» — только точно прочитав признак. Нажатие двойника не
     засчитывается, зато под сеткой объясняется, чем он отличается.
     Ровно один признак на двойник: заменили долготу — варгу не трогаем.
     --------------------------------------------------------------------- */
  var TWIN_RULES = [
    ['length', 'ि', 'ी'], ['length', 'ी', 'ि'],
    ['length', 'ु', 'ू'], ['length', 'ू', 'ु'],
    ['length', 'े', 'ै'], ['length', 'ै', 'े'],
    ['length', 'ो', 'ौ'], ['length', 'ौ', 'ो'],
    ['varga', 'ण', 'न'], ['varga', 'न', 'ण'],
    ['varga', 'ट', 'त'], ['varga', 'त', 'ट'],
    ['varga', 'ड', 'द'], ['varga', 'द', 'ड'],
    ['sibilant', 'ष', 'श'], ['sibilant', 'श', 'ष'],
    ['sibilant', 'स', 'ष'], ['sibilant', 'ष', 'स'],
    ['sign', 'ं', 'ँ'], ['sign', 'ँ', 'ं'], ['sign', 'ं', 'ः'], ['sign', 'ः', 'ं'],
    ['virama', '्', '']
  ];
  var TWIN_KINDS = {
    length: { ru: 'долгота гласной', en: 'vowel length' },
    varga: { ru: 'другая варга', en: 'another varga' },
    rvowel: { ru: 'ऋ и रि', en: 'ऋ vs रि' },
    sign: { ru: 'ं и ः', en: 'ं vs ः' },
    sibilant: { ru: 'шипящая', en: 'sibilant' },
    virama: { ru: 'вирама', en: 'virama' }
  };

  /* Все двойники слова: массив { parts, kind, from, to }. parts — те же клетки,
     что у слова, но в одной из них заменён ровно один признак. */
  function devaTwinList(parts) {
    var out = [], seen = {};
    function add(list, k, kind, from, to) {
      var copy = parts.slice();
      copy[k] = list;
      var text = copy.join('');
      if (seen[text] || text === parts.join('')) return;
      seen[text] = true;
      out.push({ parts: copy, kind: kind, from: from, to: to });
    }
    parts.forEach(function (part, k) {
      /* ऋ ↔ रि и ृ ↔ ्रि: «r с точкой внизу» против «ри» */
      if (part.indexOf('ृ') >= 0) {
        add(part.replace('ृ', '्रि'), k, 'rvowel', 'ृ', '्रि');
        add(part.replace('ृ', 'रि'), k, 'rvowel', 'ृ', 'रि');
      }
      if (part.indexOf('्रि') >= 0) add(part.replace('्रि', 'ृ'), k, 'rvowel', '्रि', 'ृ');
      if (part.indexOf('ऋ') >= 0) add(part.replace('ऋ', 'रि'), k, 'rvowel', 'ऋ', 'रि');
      /* долгота ā на конце части: द ↔ दा */
      if (part.slice(-1) === 'ा') add(part.slice(0, -1), k, 'length', 'ा', '');
      else if (DEV_CONSONANTS[part.slice(-1)]) add(part + 'ा', k, 'length', '', 'ा');
      /* остальные признаки — по одному на двойник */
      TWIN_RULES.forEach(function (rule) {
        var at = part.indexOf(rule[1]);
        if (at < 0) return;
        add(part.slice(0, at) + rule[2] + part.slice(at + rule[1].length),
          k, rule[0], rule[1], rule[2]);
      });
    });
    return out;
  }

  /* Насколько двойник «ученический»: ि/ी и ऋ/रि путают чаще всего, потерянная
     вирама — реже. Сортируем, чтобы на поле попадали в первую очередь
     настоящие минимальные пары, а не редкие подделки. */
  function twinScore(t) {
    var both = t.from + t.to;
    if (t.kind === 'rvowel') return 50;
    if (t.kind === 'length' && /[िीुूेैोौ]/.test(both)) return 45;
    if (t.kind === 'varga') return 40;
    if (t.kind === 'sign') return 30;
    if (t.kind === 'sibilant') return 28;
    if (t.kind === 'virama') return 20;
    return 10;                                  /* долгота ā: слабее всего */
  }

  /* Положить готовую цепочку частей по прямой. mustBeEmpty — двойнику нужны
     только свободные клетки, чтобы не переписать настоящее слово. */
  function placeRun(grid, n, parts, mustBeEmpty) {
    var starts = [];
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) starts.push([r, c]);
    starts = shuffle(starts);
    var dirs = shuffle(DIRS.slice());
    for (var s = 0; s < starts.length; s++) {
      for (var d = 0; d < dirs.length; d++) {
        var dr = dirs[d][1], dc = dirs[d][0];
        var row = starts[s][0], col = starts[s][1];
        if (row + dr * (parts.length - 1) >= n || col + dc * (parts.length - 1) >= n) continue;
        var cells = [], fits = true;
        for (var k = 0; k < parts.length; k++) {
          var idx = (row + dr * k) * n + (col + dc * k);
          if (mustBeEmpty && grid[idx] !== '') { fits = false; break; }
          if (!mustBeEmpty && grid[idx] !== '' && grid[idx] !== parts[k]) { fits = false; break; }
          cells.push(idx);
        }
        if (!fits) continue;
        cells.forEach(function (idx2, k2) { grid[idx2] = parts[k2]; });
        return { cells: cells, dr: dr, dc: dc };
      }
    }
    return null;
  }

  /* Расставляем двойники по одному на слово: сначала большие поля, на малых
     меньше — там каждый двойник отнимает место у настоящих слов. */
  function placeTwins(grid, n, cfg) {
    var out = [], usedText = {}, real = {};
    cfg.words.forEach(function (w) { real[w.deva] = true; });
    /* сколько двойников пытаемся поставить: на большом поле — по два на слово,
       на малом — хотя бы два-три, иначе игра снова становится «прочитай слово» */
    var perWord = n >= 9 ? 2 : (n >= 7 ? 1 : 1);
    var target = Math.max(n >= 7 ? 3 : 2, Math.min(cfg.words.length * perWord, n >= 9 ? 10 : 5));
    var queue = shuffle(cfg.words.slice());
    for (var round = 0; round < perWord && out.length < target; round++) {
      queue.forEach(function (w) {
        if (out.length >= target) return;
        var candidates = devaTwinList(chunks(w)).sort(function (a, b) {
          return twinScore(b) - twinScore(a);
        });
        /* среди равных по силе — случайный порядок: доска не повторяется */
        var top = candidates.filter(function (c) { return twinScore(c) === twinScore(candidates[0] || c); });
        candidates = shuffle(top).concat(candidates);
        for (var i = 0; i < candidates.length; i++) {
          var t = candidates[i];
          var text = t.parts.join('');
          if (real[text] || usedText[text]) continue;
          if (out.some(function (o) { return o.id === w.id && o.parts.join('') === text; })) continue;
          var spot = placeRun(grid, n, t.parts, true);
          if (!spot) continue;
          usedText[text] = true;
          out.push({ id: w.id, parts: t.parts, cells: spot.cells, dr: spot.dr, dc: spot.dc,
                     kind: t.kind, from: t.from, to: t.to });
          break;
        }
      });
    }
    return out;
  }

  function stepIdx(n, idx, dr, dc) {
    var r = Math.floor(idx / n) + dr, c = (idx % n) + dc;
    if (r < 0 || c < 0 || r >= n || c >= n) return -1;
    return r * n + c;
  }

  function neighboursOf(n, idx) {
    var out = [];
    for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue;
      var j = stepIdx(n, idx, dr, dc);
      if (j >= 0) out.push(j);
    }
    return out;
  }

  /* по возможности берём вариант, которого на поле ещё нет: иначе одна и та же
     ловушка повторяется и бросается в глаза раньше, чем нужно */
  function pickFresh(list, grid) {
    var seen = {};
    grid.forEach(function (v) { if (v) seen[v] = true; });
    var fresh = list.filter(function (v) { return !seen[v]; });
    var from = fresh.length ? fresh : list;
    return from[Math.floor(Math.random() * from.length)];
  }

  /* Заполнение поля: сначала ловушки у самих слов и у двойников, потом
     «почти-двойники» частей с доски. Ни одной случайной буквы. */
  function fillBoard(grid, n, runs) {
    var onBoard = [];
    runs.forEach(function (run) {
      (run.parts || []).forEach(function (c) { onBoard.push(c); });
    });

    function put(idx, value) {
      if (idx === null || idx < 0 || typeof idx === 'undefined') return false;
      if (grid[idx] !== '') return false;
      grid[idx] = value;
      return true;
    }

    /* 1) рядом с каждой частью слова — почти-двойник СЛЕДУЮЩЕЙ части:
          именно эту клетку ученик и хочется нажать вместо правильной */
    runs.forEach(function (run) {
      run.parts.forEach(function (part, k) {
        var next = run.parts[k + 1] || run.parts[k];
        var alts = devaVariants(next);
        if (!alts.length) return;
        var cand = shuffle(neighboursOf(n, run.cells[k]));
        /* продолжение линии за концом слова и клетка перед началом */
        if (k === run.parts.length - 1) cand.unshift(stepIdx(n, run.cells[k], run.dr, run.dc));
        if (k === 0) cand.push(stepIdx(n, run.cells[k], -run.dr, -run.dc));
        var made = false;
        for (var i = 0; i < cand.length && !made; i++) {
          var near = [];
          if (cand[i] >= 0) neighboursOf(n, cand[i]).forEach(function (j) { if (j !== cand[i]) near.push(grid[j]); });
          made = put(cand[i], pickFresh(alts, near));
        }
        if (!made) {                              /* соседи заняты — кладём в первую свободную */
          for (var f = 0; f < n * n && !made; f++) made = put(f, pickFresh(alts, grid));
        }
      });
    });

    /* 2) остальное — тоже не «мусор», а варианты частей с этого поля */
    var pool = [];
    onBoard.forEach(function (c) { pool = pool.concat(devaVariants(c)); });
    if (!pool.length) pool = onBoard.slice();
    for (var i = 0; i < n * n; i++) {
      if (grid[i] === '') grid[i] = pickFresh(pool, grid) || onBoard[0] || '';
    }
    return grid;
  }

  /* Все прямые цепочки заданной длины, читающиеся как данное слово */
  function findRuns(grid, n, chunkList) {
    var text = chunkList.join(''), len = chunkList.length, hits = [];
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        for (var d = 0; d < DIRS.length; d++) {
          if (len === 1 && d > 0) break;          /* одна клетка — все три направления дали бы её же */
          var dr = DIRS[d][1], dc = DIRS[d][0];
          if (r + dr * (len - 1) >= n || c + dc * (len - 1) >= n) continue;
          var cells = [], s = '';
          for (var k = 0; k < len; k++) {
            var idx = (r + dr * k) * n + (c + dc * k);
            cells.push(idx);
            s += grid[idx];
          }
          if (s === text) hits.push(cells);
        }
      }
    }
    return hits;
  }

  /* Ловушка не должна случайно сложить настоящее слово: если после заполнения
     слово читается где-то ещё, портим одну из «лишних» клеток. Проходов
     несколько: одна правка может убрать одно вхождение и создать другое. */
  function repairBoard(grid, n, places, cfg, twins) {
    var used = {};
    places.forEach(function (p) { p.cells.forEach(function (i) { used[i] = true; }); });
    /* двойник — тоже готовая цепочка: правка клетки сломала бы его */
    (twins || []).forEach(function (t) { t.cells.forEach(function (i) { used[i] = true; }); });

    function intended(cells, p) {
      return cells.length === p.cells.length &&
        cells.every(function (v, i) { return v === p.cells[i]; });
    }

    for (var pass = 0; pass < 4; pass++) {
      var fixed = false;
      places.forEach(function (p) {
        var ch = chunks(byId(cfg, p.id));
        var hits = findRuns(grid, n, ch);
        if (hits.length < 2) return;
        hits.forEach(function (cells) {
          if (intended(cells, p)) return;
          var want = findRuns(grid, n, ch).length;
          if (want < 2) return;
          for (var i = 0; i < cells.length; i++) {
            if (used[cells[i]]) continue;
            var old = grid[cells[i]];
            var alts = devaVariants(old);
            for (var a = 0; a < alts.length; a++) {
              grid[cells[i]] = alts[a];
              if (findRuns(grid, n, ch).length < want) { fixed = true; return; }
              grid[cells[i]] = old;
            }
          }
        });
      });
      if (!fixed) break;
    }
    return grid;
  }

  /* сколько лишних вхождений настоящих слов осталось на поле */
  function boardPenalty(grid, n, places, cfg) {
    var dup = 0;
    places.forEach(function (p) {
      var ch = chunks(byId(cfg, p.id));
      dup += Math.max(0, findRuns(grid, n, ch).length - 1);
    });
    return dup;
  }

  function buildSearch(cfg, size) {
    var n = size || 10;
    var best = null;
    for (var attempt = 0; attempt < 40; attempt++) {
      var grid = [], i;
      for (i = 0; i < n * n; i++) grid.push('');
      var places = [];
      var words = orderedWords(cfg);
      words.forEach(function (w) {
        var ch = chunks(w);
        if (ch.length > n) return;                 /* слово не влезает в поле */
        placeWord(grid, n, w, ch, places);
      });
      /* двойники — до заполнения ловушками: они должны выглядеть как слова */
      var twins = placeTwins(grid, n, cfg);
      var maxLen = 1;
      places.forEach(function (p) { maxLen = Math.max(maxLen, chunks(byId(cfg, p.id)).length); });

      var runs = [];
      places.forEach(function (p) {
        runs.push({ parts: chunks(byId(cfg, p.id)), cells: p.cells, dr: p.dr, dc: p.dc });
      });
      twins.forEach(function (t) {
        runs.push({ parts: t.parts, cells: t.cells, dr: t.dr, dc: t.dc });
      });
      fillBoard(grid, n, runs);
      repairBoard(grid, n, places, cfg, twins);

      var penalty = boardPenalty(grid, n, places, cfg);
      var allWords = places.length === cfg.words.length;
      var candidate = {
        grid: grid, places: places, twins: twins, maxLen: maxLen,
        worth: places.length * 1000 + twins.length * 50 - penalty * 100
      };
      if (!best || candidate.worth > best.worth) best = candidate;
      if (allWords && twins.length >= Math.min(2, cfg.words.length) && penalty === 0) {
        best = candidate;
        break;
      }
    }
    delete best.worth;
    return best;
  }

  /* Пул отвлекающих слов для «филворда среди слов»: настоящие санскритские
     слова из данных урока плюс почти-двойники слов этого урока. */
  function decoyPool(cfg) {
    var real = cfg.words.map(function (w) { return w.deva; });
    var out = (cfg.decoys || []).slice();
    cfg.words.forEach(function (w) {
      out = out.concat(devaVariants(w.deva));
    });
    return uniq(out).filter(function (s) { return real.indexOf(s) < 0; });
  }

  /* Доска с координатами, как на шахматной: цифры 1…n сверху, буквы a, b, c…
     слева. Нужно, чтобы клетку можно было назвать вслух — «c4» — не описывая
     её словами, и чтобы ученик диктовал ход преподавателю. */
  function boardHtml(n, cells) {
    var html = '<div class="grid-10 ws-board" style="grid-template-columns: 1.1rem repeat(' + n +
      ', 1fr); --ws-max: ' + Math.min(620, n * 66 + 26) + 'px;">';
    html += '<span class="ws-coord corner"></span>';
    for (var c = 1; c <= n; c++) html += '<span class="ws-coord col">' + c + '</span>';
    for (var r = 0; r < n; r++) {
      html += '<span class="ws-coord row">' + String.fromCharCode(97 + r) + '</span>';
      for (var k = 0; k < n; k++) html += cells[r * n + k];
    }
    return html + '</div>';
  }

  /* ряд кнопок 10…5 — одинаковый у обоих филвордов */
  function sizeRow(cfg, action, current) {
    var chips = WS_SIZES.map(function (s) {
      return chip(cfg, action, String(s), s + ' × ' + s, current === s);
    }).join(' ');
    return '<div class="ws-size-row"><span class="ws-size-label">' +
      tx({ ru: 'Размер поля:', en: 'Grid size:' }) + '</span>' + chips + '</div>';
  }

  var TRAP_NOTE = {
    ru: '🪤 Свободные клетки — не случайные буквы, а «почти-двойники» слов урока: ' +
        'долгая и краткая гласная (ि / ी), ण и न из разных варг, ऋ и रि (तृ / त्रि), ं и ः. ' +
        'Слово нужно читать точно — соседняя клетка почти всегда выглядит правильной.',
    en: '🪤 The empty cells are not random letters but near-misses of the lesson words: ' +
        'long and short vowels (ि / ी), ण and न from different vargas, ऋ and रि (तृ / त्रि), ं and ः. ' +
        'Read exactly — the neighbouring cell almost always looks right.'
  };

  /* ================================================= 30. WORD GRID (words) */
  function renderWordGrid(cfg) {
    var g = K.gst(cfg, 'wordgrid');
    if (!g.size) g.size = 10;
    var n = g.size;
    var totalCells = n * n;
    if (!g.grid) {
      var targets = [];
      cfg.words.forEach(function (w) { targets.push(w.id); targets.push(w.id); });
      if (targets.length > totalCells || targets.length > Math.floor(totalCells * 0.6)) {
        targets = cfg.words.map(function (w) { return w.id; });   /* маленькое поле — по одному разу */
      }
      var decoys = shuffle(decoyPool(cfg));
      var cells = [];
      for (var i = 0; i < totalCells; i++) cells.push(null);
      shuffle(targets).forEach(function (id) {
        var free = [];
        cells.forEach(function (c, idx) { if (c === null) free.push(idx); });
        cells[free[Math.floor(Math.random() * free.length)]] = { t: 1, id: id };
      });
      cells.forEach(function (c, idx) {
        if (c === null) cells[idx] = { t: 0, s: decoys.length ? decoys[idx % decoys.length] : '—' };
      });
      g.grid = cells;
      g.total = targets.length;
    }
    var found = Object.keys(g.found).length;
    if (g.finished || found >= g.total) {
      return done(cfg, 'wordgrid', tx({ ru: 'Филворд — найдено всё', en: 'Word grid — all found' }),
        found, g.total, tx({ ru: 'Лишних нажатий', en: 'Wrong taps' }) + ': ' + Object.keys(g.wrong).length) +
        sizeRow(cfg, 'wgSize', g.size);
    }
    var cells = g.grid.map(function (c, idx) {
      var txt = c.t ? byId(cfg, c.id).deva : c.s;
      var cls = 'wcell' + (g.found[idx] ? ' found' : '') + (g.wrong[idx] ? ' wrong' : '') +
        (keyOn(cfg) && c.t ? ' hint' : '');
      var coord = String.fromCharCode(97 + Math.floor(idx / n)) + ((idx % n) + 1);
      return '<button type="button" class="' + cls + '" aria-label="' + coord + ' ' + txt + '"' +
        call(cfg, 'wgTap', String(idx)) + '>' +
        devaSpan(txt, (1.3 - n * 0.055).toFixed(2) + 'rem') + '</button>';
    });
    return K.topBar(
      K.pill(tx({ ru: 'Найдено', en: 'Found' }) + ': ' + found + '/' + g.total) + ' ' +
        K.pill(tx({ ru: 'Мимо', en: 'Misses' }) + ': ' + Object.keys(g.wrong).length),
      chip(cfg, 'wgReveal', '', '👁 ' + tx({ ru: 'Показать всё', en: 'Reveal all' })) + ' ' + restartChip(cfg, 'wordgrid')) +
      sizeRow(cfg, 'wgSize', n) +
      K.centerCard(
        boardHtml(n, cells) +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'В поле ' + totalCells + ' слов — и только ' + g.total + ' из них были на уроке' +
                (g.total === cfg.words.length * 2 ? ' (каждое дважды)' : '') +
                '. Найдите их: остальные отличаются на одну букву — долгота, варга, ऋ / रि.',
               en: 'The grid holds ' + totalCells + ' words and only ' + g.total + ' of them were in the lesson' +
                (g.total === cfg.words.length * 2 ? ' (each twice)' : '') +
                '. Find them: the rest differ by one letter — vowel length, varga, ऋ / रि.' }) + '</div>' +
        '<div style="margin-top:0.5rem;font-size:0.83rem;color:var(--text-secondary);">' +
          tx(TRAP_NOTE) + '</div>');
  }

  /* ============================================= 31. WORD SEARCH (letters) */
  /* только два направления: слева направо и сверху вниз.
     Диагоналей в этом филворде нет — слово, разложенное наискосок, ученик
     ищет глазами совсем иначе, и ловушки «следующая буква» перестают работать. */
  var DIRS = [[1, 0], [0, 1]];

  function renderWordSearch(cfg) {
    var g = K.gst(cfg, 'wordsearch');
    if (!g.size) g.size = 10;
    if (!g.grid) {
      var built = buildSearch(cfg, g.size);
      g.grid = built.grid;
      g.places = built.places;
      g.twins = built.twins || [];
      g.maxLen = built.maxLen;
    }
    if (!g.twins) g.twins = [];
    var foundN = Object.keys(g.found).length;
    if (g.finished || (g.places.length && foundN >= g.places.length)) {
      return done(cfg, 'wordsearch', tx({ ru: 'Филворд — все слова найдены', en: 'Word search — complete' }),
        foundN, g.places.length) + sizeRow(cfg, 'wsSize', g.size);
    }
    var marked = {};
    g.places.forEach(function (p) {
      if (g.found[p.id]) p.cells.forEach(function (idx) { marked[idx] = 'found'; });
    });
    g.sel.forEach(function (idx) { if (!marked[idx]) marked[idx] = 'sel'; });
    /* клетки двойников: промах — красным, при 🧩 «Ловушки» — пунктиром */
    g.twins.forEach(function (t, ti) {
      if (g.twinsMiss && g.twinsMiss[ti]) {
        t.cells.forEach(function (idx) { if (!marked[idx]) marked[idx] = 'wrong'; });
      } else if (g.showTwins) {
        t.cells.forEach(function (idx) { if (!marked[idx]) marked[idx] = 'twin'; });
      }
    });
    if (keyOn(cfg)) g.places.forEach(function (p) {
      if (!g.found[p.id]) p.cells.forEach(function (idx) { if (!marked[idx]) marked[idx] = 'hint'; });
    });
    var cells = g.grid.map(function (c, idx) {
      var cls = 'wcell' + (marked[idx] ? ' ' + marked[idx] : '');
      var coord = String.fromCharCode(97 + Math.floor(idx / g.size)) + ((idx % g.size) + 1);
      return '<button type="button" class="' + cls + '" aria-label="' + coord + ' ' + c + '"' +
        call(cfg, 'wsTap', String(idx)) + '>' +
        devaSpan(c, g.size <= 6 ? '1rem' : '0.95rem') + '</button>';
    });
    var legend = g.hideWords
      ? '<div class="ws-legend-row"><span class="ws-legend-hidden">' +
          tx({ ru: 'Слова скрыты — вспомните их сами. 👁 «Показать слова» вернёт список.',
               en: 'Words are hidden — recall them yourself. 👁 “Show words” brings the list back.' }) +
        '</span></div>'
      : '<div class="ws-legend-row">' + g.places.map(function (p) {
          var w = byId(cfg, p.id);
          return '<span class="ws-legend' + (g.found[p.id] ? ' done' : '') + '">' +
            (g.found[p.id] ? '✓ ' : '') + devaSpan(w.deva) + '</span>';
        }).join('') + '</div>';
    var twinNote = '';
    if (g.twinsMiss && Object.keys(g.twinsMiss).length) {
      var lastTwin = null;
      g.twins.forEach(function (t, ti) { if (g.twinsMiss[ti]) lastTwin = t; });
      if (lastTwin) {
        var trueWord = byId(cfg, lastTwin.id).deva;
        var kind = TWIN_KINDS[lastTwin.kind] || TWIN_KINDS.length;
        var diff = lastTwin.from && lastTwin.to ? ' (' + lastTwin.from + ' → ' + lastTwin.to + ')'
          : lastTwin.to ? ' (' + tx({ ru: 'добавлена ' + lastTwin.to, en: 'added ' + lastTwin.to }) + ')'
          : lastTwin.from ? ' (' + tx({ ru: 'убрана ' + lastTwin.from, en: 'dropped ' + lastTwin.from }) + ')'
          : '';
        twinNote = '<div class="ws-twin-note">' +
          tx({ ru: 'Двойник: в поле стоит ' + devaSpan(lastTwin.parts.join('')) +
                ' — это не ' + devaSpan(trueWord) + '. Отличие: ' + tx(kind) + diff +
                '. Такое слово не засчитывается, ищите настоящее написание.',
               en: 'A near-miss: the board says ' + devaSpan(lastTwin.parts.join('')) +
                ' — not ' + devaSpan(trueWord) + '. Difference: ' + tx(kind) + diff +
                '. It does not score; look for the real spelling.' }) + '</div>';
      }
    }
    var twinList = '';
    if (g.showTwins && g.twins.length) {
      twinList = '<div class="ws-twin-list"><div class="ws-twin-title">' +
        tx({ ru: 'Ловушки на этом поле — не слова урока:', en: 'Near-misses on this board — not lesson words:' }) +
        '</div>' + g.twins.map(function (t) {
          /* если список слов спрятан, не выдаём и настоящее слово — только ловушку */
          var right = g.hideWords ? '' : ' <span class="ws-twin-vs">≠</span> ' + devaSpan(byId(cfg, t.id).deva);
          return '<div class="ws-twin-item">' + devaSpan(t.parts.join('')) + right +
            ' — ' + tx(TWIN_KINDS[t.kind] || TWIN_KINDS.length) + '</div>';
        }).join('') + '</div>';
    }
    var notPlaced = cfg.words.length - g.places.length;
    return K.topBar(
      K.pill(tx({ ru: 'Найдено', en: 'Found' }) + ': ' + foundN + '/' + g.places.length) +
        (notPlaced > 0 ? ' ' + K.pill(tx({ ru: 'не влезло', en: 'did not fit' }) + ': ' + notPlaced) : ''),
      chip(cfg, 'wsClear', '', '↺ ' + tx({ ru: 'Сбросить выбор', en: 'Clear' })) + ' ' +
        chip(cfg, 'wsWords', '', g.hideWords
          ? '👁 ' + tx({ ru: 'Показать слова', en: 'Show words' })
          : '🙈 ' + tx({ ru: 'Спрятать слова', en: 'Hide words' })) + ' ' +
        chip(cfg, 'wsTwins', '', (g.showTwins ? '🔍 ' : '🧩 ') +
          tx({ ru: 'Ловушки', en: 'Near-misses' }), g.showTwins) + ' ' +
        restartChip(cfg, 'wordsearch')) +
      sizeRow(cfg, 'wsSize', g.size) +
      K.centerCard(
        boardHtml(g.size, cells) +
        twinList +
        twinNote +
        legend +
        '<div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-secondary);">' +
          tx({ ru: 'Слова спрятаны по частям: слева направо и сверху вниз. Нажимайте клетки по порядку.',
               en: 'The words are hidden part by part: left to right and top to bottom. Tap the cells in order.' }) + '</div>' +
        '<div style="margin-top:0.5rem;font-size:0.83rem;color:var(--text-secondary);">' +
          tx(TRAP_NOTE) + '</div>');
  }

  /* ------------------------------------------------------- register (pair) */
  SAL.addGame('flashcount', {
    labelRu: 'Тайный счёт (сосчитай с одного взгляда)',
    labelEn: 'Flash Count (count at a glance)',
    init: function () { return { i: 0, order: null, hidden: false, answered: false, picked: null, score: 0, finished: false }; },
    render: renderFlashCount,
    actions: {
      flashAgain: function (cfg) { var g = K.gst(cfg, 'flashcount'); g.hidden = false; K.clearAfter(); },
      flashPick: function (cfg, st, a) {
        var g = K.gst(cfg, 'flashcount');
        if (g.answered) return;
        var w = byId(cfg, orderOf(cfg, g)[g.i]);
        g.answered = true; g.picked = a;
        if (a === w.id) { g.score++; SAL.speak(w.ttsText); }
        else { K.noteWrong(cfg, w.id); SAL.speak(w.ttsText); }
      },
      flashNext: function (cfg) {
        var g = K.gst(cfg, 'flashcount');
        g.i++; g.hidden = false; g.answered = false; g.picked = null; K.clearAfter();
        if (g.i >= cfg.words.length) g.finished = true;
      }
    }
  });

  SAL.addGame('blindboard', {
    labelRu: 'Слепое поле (кто в клетке?)',
    labelEn: 'Blind Board (who is in the square?)',
    init: function () {
      return { cards: null, phase: 'show', i: 0, ask: null, done: {},
               answered: false, picked: null, score: 0, finished: false,
               scores: [0, 0], turn: 0 };
    },
    render: renderBlindBoard,
    actions: {
      blindAgain: function (cfg) { var g = K.gst(cfg, 'blindboard'); g.phase = 'show'; K.clearAfter(); },
      blindPick: function (cfg, st, a) {
        var g = K.gst(cfg, 'blindboard');
        if (g.answered || g.ask === null) return;
        var id = g.cards[g.ask];
        g.answered = true; g.picked = a;
        if (a === id) {
          g.score++; g.done[g.ask] = true; SAL.speak(byId(cfg, id).ttsText);
          if (players(cfg) === 2) award(g, g.turn);
        }
        else K.noteWrong(cfg, id);
      },
      blindNext: function (cfg) {
        var g = K.gst(cfg, 'blindboard');
        g.i++; g.ask = null; g.answered = false; g.picked = null;
        if (g.i >= g.cards.length) g.finished = true;
        else if (players(cfg) === 2) swapTurn(g);
      }
    }
  });

  SAL.addGame('battleship', {
    labelRu: 'Морской бой на координатах',
    labelEn: 'Battleship on Coordinates',
    init: function () { return pairInit({ board: null, claimed: {}, ask: null, miss: false }); },
    render: renderBattleship,
    actions: {
      battleOpen: function (cfg, st, a) { var g = K.gst(cfg, 'battleship'); g.ask = parseInt(a, 10); g.miss = false; },
      battlePick: function (cfg, st, a) {
        var g = K.gst(cfg, 'battleship');
        if (g.ask === null) return;
        var idx = g.ask;
        var id = g.board[idx];
        if (a === id) {
          g.claimed[idx] = g.turn;
          award(g, g.turn);
          g.ask = null; g.miss = false;
          SAL.speak(byId(cfg, id).ttsText);
          if (players(cfg) === 1) g.scores[0] = Object.keys(g.claimed).length;
        } else {
          K.noteWrong(cfg, id);
          g.miss = true; g.ask = null;
          if (players(cfg) === 2) swapTurn(g);
        }
      }
    }
  });

  SAL.addGame('bingo', {
    labelRu: 'Бинго (карта 3 × 3)',
    labelEn: 'Bingo (3 × 3 card)',
    init: function () { return pairInit({ cards: null, calls: null, i: -1, covered: [{}, {}], winner: null }); },
    render: renderBingo,
    actions: {
      bingoCall: function (cfg) {
        var g = K.gst(cfg, 'bingo');
        g.i++;
        if (g.calls[g.i]) { SAL.speak(byId(cfg, g.calls[g.i]).ttsText); }
        if (g.i >= g.calls.length) g.finished = true;
      },
      bingoCover: function (cfg, st, a, b) {
        var g = K.gst(cfg, 'bingo');
        if (g.finished || g.i < 0) return;
        var p = parseInt(a, 10), idx = parseInt(b, 10);
        if (g.cards[p][idx] !== g.calls[g.i]) { K.noteWrong(cfg, g.cards[p][idx]); return; }
        g.covered[p][idx] = g.i;
        var full = g.cards[p].every(function (_, k) { return g.covered[p][k] !== undefined; });
        if (full) {
          g.winner = p; g.finished = true;
          award(g, p);
        }
      }
    }
  });

  SAL.addGame('duel', {
    labelRu: 'Дуэль (кто быстрее?)',
    labelEn: 'Duel (who is faster?)',
    init: function () { return pairInit({ i: 0, order: null, claim: null, answered: false, picked: null }); },
    render: renderDuel,
    actions: {
      duelClaim: function (cfg, st, a) { K.gst(cfg, 'duel').claim = parseInt(a, 10); },
      duelPick: function (cfg, st, a) {
        var g = K.gst(cfg, 'duel');
        if (g.answered) return;
        var w = byId(cfg, orderOf(cfg, g)[g.i]);
        g.answered = true; g.picked = a;
        var who = players(cfg) === 2 ? g.claim : 0;
        if (a === w.id) { award(g, who); SAL.speak(w.ttsText); }
        else { K.noteWrong(cfg, w.id); if (players(cfg) === 2) award(g, 1 - who); }
      },
      duelNext: function (cfg) {
        var g = K.gst(cfg, 'duel');
        g.i++; g.claim = null; g.answered = false; g.picked = null;
        if (players(cfg) === 2) swapTurn(g);
        if (g.i >= cfg.words.length) g.finished = true;
      }
    }
  });

  SAL.addGame('describe', {
    labelRu: 'Диктор и ученик (покажи или назови)',
    labelEn: 'Describe & Guess (show or say)',
    init: function () { return pairInit({ i: 0, order: null, mode: 'show', shown: false }); },
    render: renderDescribe,
    actions: {
      descMode: function (cfg, st, a) { var g = K.gst(cfg, 'describe'); g.mode = a; g.shown = false; },
      descFlip: function (cfg) { var g = K.gst(cfg, 'describe'); g.shown = !g.shown; },
      descGrade: function (cfg, st, a) {
        var g = K.gst(cfg, 'describe');
        var w = byId(cfg, orderOf(cfg, g)[g.i]);
        var guesser = players(cfg) === 2 ? (1 - g.turn) : 0;
        if (a === '1') award(g, guesser);
        else K.noteWrong(cfg, w.id);
        g.i++; g.shown = false;
        if (players(cfg) === 2) swapTurn(g);
        if (g.i >= cfg.words.length) g.finished = true;
      }
    }
  });

  SAL.addGame('orderrelay', {
    labelRu: 'Эстафета порядка (1, 2, 3…)',
    labelEn: 'Order Relay (1, 2, 3…)',
    init: function () { return pairInit({ order: null, placed: [], wrong: null }); },
    render: renderOrderRelay,
    actions: {
      relayTap: function (cfg, st, a) {
        var g = K.gst(cfg, 'orderrelay');
        var nextW = cfg.words[g.placed.length];
        if (a === nextW.id) {
          g.placed.push(a);
          award(g, g.turn);
          g.wrong = null;
          SAL.speak(nextW.ttsText);
          if (g.placed.length >= cfg.words.length) g.finished = true;
        } else {
          g.wrong = a;
          K.noteWrong(cfg, nextW.id);
          if (players(cfg) === 2) swapTurn(g);
        }
      }
    }
  });

  SAL.addGame('coopmemory', {
    labelRu: 'Мемори вдвоём (кооператив)',
    labelEn: 'Co-op Memory (together)',
    init: function () {
      return { cards: null, flipped: [], matched: {}, seen: {}, moves: 0,
               limit: 0, turn: 0, finished: false };
    },
    render: renderCoopMemory,
    actions: {
      coopFlip: function (cfg, st, a) {
        var g = K.gst(cfg, 'coopmemory');
        var idx = parseInt(a, 10);
        if (g.flipped.length >= 2) { g.flipped = []; }
        if (g.matched[g.cards[idx]] || g.flipped.indexOf(idx) >= 0) return;
        g.flipped.push(idx);
        if (g.flipped.length < 2) return;
        g.moves++;
        var c1 = g.cards[g.flipped[0]], c2 = g.cards[g.flipped[1]];
        if (c1 === c2) {
          g.matched[c1] = true; g.flipped = [];
          SAL.speak(byId(cfg, c1).ttsText);
          if (Object.keys(g.matched).length >= g.cards.length / 2) g.finished = true;
        } else {
          K.noteWrong(cfg, c1);
          g.flipped = [];
          if (players(cfg) === 2) swapTurn(g);
        }
        if (g.moves >= g.limit && !g.finished) {
          if (Object.keys(g.matched).length < g.cards.length / 2) g.finished = true;
        }
      }
    }
  });

  SAL.addGame('tictactoe', {
    labelRu: 'Крестики-нолики с проверкой',
    labelEn: 'Tic-Tac-Toe with a Quiz',
    init: function () { return pairInit({ cells: null, board: null, ask: null, winner: null, miss: false, moves: 0 }); },
    render: renderTicTacToe,
    actions: {
      tttOpen: function (cfg, st, a) { var g = K.gst(cfg, 'tictactoe'); g.ask = parseInt(a, 10); g.miss = false; },
      tttPick: function (cfg, st, a) {
        var g = K.gst(cfg, 'tictactoe');
        if (g.ask === null) return;
        var idx = g.ask;
        var id = g.cells[idx];
        if (a !== id) {
          K.noteWrong(cfg, id);
          g.miss = true; g.ask = null;
          if (players(cfg) === 2) swapTurn(g);
          return;
        }
        g.board[idx] = g.turn;
        g.moves++;
        g.ask = null; g.miss = false;
        SAL.speak(byId(cfg, id).ttsText);
        var win = TTT_LINES.some(function (line) {
          return g.board[line[0]] !== null && g.board[line[0]] === g.board[line[1]] && g.board[line[1]] === g.board[line[2]];
        });
        if (win) { g.winner = g.turn; g.finished = true; award(g, g.turn); return; }
        if (g.board.every(function (c) { return c !== null; })) { g.winner = 'draw'; g.finished = true; return; }
        if (players(cfg) === 2) swapTurn(g);
      }
    }
  });

  /* смена размера: поле и прогресс строятся заново с нуля */
  function setGridSize(cfg, game, raw) {
    var g = K.gst(cfg, game);
    var n = parseInt(raw, 10);
    if (WS_SIZES.indexOf(n) < 0 || g.size === n) return;
    g.size = n;
    g.grid = null;
    g.places = null;
    g.twins = [];
    g.twinsMiss = {};
    g.showTwins = false;
    g.found = {};
    g.wrong = {};
    g.sel = [];
    g.total = 0;
    g.maxLen = 2;
    g.finished = false;
    K.clearAfter();
  }

  SAL.addGame('wordgrid', {
    labelRu: 'Филворд (среди слов)',
    labelEn: 'Word Grid (among words)',
    init: function () { return { grid: null, found: {}, wrong: {}, total: 0, size: 10, finished: false }; },
    render: renderWordGrid,
    actions: {
      wgSize: function (cfg, st, a) { setGridSize(cfg, 'wordgrid', a); },
      wgTap: function (cfg, st, a) {
        var g = K.gst(cfg, 'wordgrid');
        var idx = parseInt(a, 10);
        /* поле могли пересобрать другим размером — устаревшее нажатие просто игнорируем */
        var c = g.grid && g.grid[idx];
        if (!c || g.found[idx] || g.wrong[idx]) return;
        if (c.t) {
          g.found[idx] = true;
          SAL.speak(byId(cfg, c.id).ttsText);
          if (Object.keys(g.found).length >= g.total) g.finished = true;
        } else {
          g.wrong[idx] = true;
        }
      },
      wgReveal: function (cfg) {
        var g = K.gst(cfg, 'wordgrid');
        g.grid.forEach(function (c, idx) { if (c.t) g.found[idx] = true; });
        g.finished = true;
      }
    }
  });

  SAL.addGame('wordsearch', {
    labelRu: 'Филворд (среди букв)',
    labelEn: 'Word Search (among letters)',
    init: function () { return { grid: null, places: null, twins: [], twinsMiss: {}, found: {}, sel: [],
                                 size: 10, maxLen: 2, hideWords: false, showTwins: false, finished: false }; },
    render: renderWordSearch,
    actions: {
      wsSize: function (cfg, st, a) { setGridSize(cfg, 'wordsearch', a); },
      wsTap: function (cfg, st, a) {
        var g = K.gst(cfg, 'wordsearch');
        var n = g.size || 10;
        var idx = parseInt(a, 10);
        if (!g.grid || !g.grid[idx]) return;       /* клетка из поля другого размера */
        if (g.sel.length >= 2) {
          var d0 = { r: Math.floor(g.sel[1] / n) - Math.floor(g.sel[0] / n), c: (g.sel[1] % n) - (g.sel[0] % n) };
          var dn = { r: Math.floor(idx / n) - Math.floor(g.sel[g.sel.length - 1] / n),
                     c: (idx % n) - (g.sel[g.sel.length - 1] % n) };
          if (d0.r !== dn.r || d0.c !== dn.c) g.sel = [];
        }
        if (g.sel.indexOf(idx) >= 0) { g.sel = []; return; }
        g.sel.push(idx);
        /* цепочка не длиннее самого длинного слова (+2 как допуск на промах) */
        if (g.sel.length > (g.maxLen || 2) + 2) g.sel = [idx];
        var seq = g.sel.map(function (i) { return g.grid[i]; }).join('');
        var hit = null;
        g.places.forEach(function (p) {
          if (g.found[p.id]) return;
          var w = byId(cfg, p.id);
          if (chunks(w).join('') === seq) hit = p;
        });
        /* цепочка совпала с двойником: слово почти правильное, но не то */
        var twinHit = null;
        (g.twins || []).forEach(function (t, ti) {
          if (twinHit !== null) return;
          if (t.parts.join('') === seq) twinHit = ti;
        });
        if (hit) {
          g.found[hit.id] = true;
          SAL.speak(byId(cfg, hit.id).ttsText);
          g.sel = [];
          if (Object.keys(g.found).length >= g.places.length) g.finished = true;
        } else if (twinHit !== null) {
          if (!g.twinsMiss) g.twinsMiss = {};
          g.twinsMiss[twinHit] = true;
          SAL.speak(byId(cfg, g.twins[twinHit].id).ttsText);
          g.sel = [];
        }
      },
      wsClear: function (cfg) { K.gst(cfg, 'wordsearch').sel = []; },
      /* 🙈 спрятать список слов под сеткой: поле превращается в задание «вспомни слова» */
      wsWords: function (cfg) { var g = K.gst(cfg, 'wordsearch'); g.hideWords = !g.hideWords; },
      /* 🧩 показать двойников: учитель разбирает их с учеником */
      wsTwins: function (cfg) { var g = K.gst(cfg, 'wordsearch'); g.showTwins = !g.showTwins; }
    }
  });

  /* ---------------------------------------------------------------------
     УРОК 3 — отдельная страница из 12 слов (view-lesson3 в index.html).
     Она свёрстана вручную и живёт мимо движка, но филворд у неё должен быть
     тем же, что в уроках 5–10. Поэтому заводим служебную конфигурацию:
     слова берём из bodyPartsVocab (урок 1), в выпадающий список уроков она
     не попадает (hidden), а панели view-lesson33 не существует — движок её
     не строит и ничего не перезаписывает.
     --------------------------------------------------------------------- */
  SAL.registerLesson({
    key: 'L1B',
    num: 33,
    hidden: true,
    titleDeva: 'शरीरसम्बन्धि-शब्दाः',
    titleRu: 'Части тела (12)',
    titleEn: 'Body Parts (12)',
    topicRu: '12 частей тела: лицо, руки, ноги',
    topicEn: 'twelve body parts: face, arms, legs',
    words: (typeof bodyPartsVocab !== 'undefined' ? bodyPartsVocab : []),
    extraGames: ['wordsearch'],
    /* на вкладке урока 1 игра называется иначе, чем в уроках числительных */
    gameLabels: {
      wordsearch: { ru: 'Филворд (ищи слова по частям)', en: 'Word Search (find the words)' }
    }
  });

  /* =========================================================================
     RULES for the extra games — the panel above each game (see lesson-engine.js)
     ========================================================================= */
  var RULES_EXTRA = {
    hotcards: {
      aim: { ru: 'Вспомнить слово быстро: на карточку отводится 8 секунд.',
             en: 'Recall the word fast: eight seconds a card.' },
      how: { ru: ['Картинка и закрытое слово — назовите слово вслух, пока идёт таймер.',
                  '✓ «Знаю» — если успели и назвали верно; ✕ «Повторить» — если нет.',
                  '👁 «Открыть» — посмотреть написание (таймер при этом идёт).',
                  '⏸ — поставить игру на паузу, ▶ — продолжить.'],
             en: ['A picture and a covered word — say the word aloud before the timer runs out.',
                  '✓ “I knew it” if you said it in time and got it right; ✕ “Repeat” if not.',
                  '👁 “Show” peeks at the spelling (the timer keeps running).',
                  '⏸ pauses the game, ▶ carries on.'] },
      score: { ru: 'Очко за каждый ✓, серия растёт подряд. Истёкшее время или ✕ — минус жизнь. Три жизни кончились — игра окончена. Любая ошибка отправляет слово в копилку (игра 14).',
               en: 'A point per ✓ and the streak grows. Running out of time or pressing ✕ costs a life; three lives gone ends the game. Any miss drops the word into the pile (game 14).' },
      tip: { ru: 'Секундомер — не враг: если ученик стабильно не успевает, снимите таймер кнопкой ⏸ и верните его через урок.',
             en: 'The clock is not the enemy: if a student keeps running out of time, pause it with ⏸ and bring it back later.' }
    },
    retry: {
      aim: { ru: 'Доделать именно то, что не выучено: игра берёт слова только из копилки ошибок.',
             en: 'Finish exactly what is unfinished: this game draws only from the mistake pile.' },
      how: { ru: ['Игра показывает картинку — выберите слово из четырёх вариантов (A–D).',
                  'Верный ответ с первой попытки — слово делает шаг к выходу из копилки.',
                  'Два верных ответа подряд — и слова в копилке больше нет.',
                  'Если копилка пуста, игра просто повторяет все слова урока; 🗑 — очистить копилку вручную.'],
             en: ['A picture appears — choose the word from four options (A–D).',
                  'A correct answer on the first try moves the word towards leaving the pile.',
                  'Two correct answers in a row and the word is out of the pile for good.',
                  'If the pile is empty the game simply reviews every word; 🗑 clears the pile by hand.'] },
      score: { ru: 'Очко только за верный ответ с первой попытки. Ошибка возвращает слово в копилку.',
               en: 'A point only when the first try is correct. A miss puts the word back into the pile.' },
      tip: { ru: 'Начните урок с этой игры — она показывает, что ученик не доделал в прошлый раз.',
             en: 'Open the lesson with this game: it shows exactly what was left undone last time.' }
    },
    echo: {
      aim: { ru: 'Ухо: два написания отличаются одной буквой — долгота, качество гласной или носовой.',
             en: 'The ear: two spellings differ by one letter — length, vowel quality or the nasal.' },
      how: { ru: ['🔊 «Прослушать» — звучит одно из двух написаний.',
                  'Выберите, какое именно прозвучало: A или B.',
                  'Режим 👤 «Читает напарник»: нажмите 👁 — слово покажется диктору, 🙈 — скроется; диктор читает вслух, угадывающий выбирает.',
                  'После ответа игра показывает, какое написание верное, и даёт послушать слово.'],
             en: ['🔊 “Listen” — one of the two spellings is spoken.',
                  'Choose which one you heard: A or B.',
                  'Mode 👤 “Partner reads”: press 👁 to show the reader the word, 🙈 to hide it; the reader says it aloud and the guesser chooses.',
                  'After the answer the game shows the right spelling and lets you hear the word.'] },
      score: { ru: 'Очко за верный выбор; ошибка кладёт слово в копилку.',
               en: 'A point for the right choice; a miss drops the word into the pile.' },
      tip: { ru: 'В паре диктор тренирует произношение, а угадывающий — слух; меняйтесь ролями каждый раунд.',
             en: 'In pairs the reader practises speaking while the guesser trains the ear — swap roles every round.' }
    },
    snowball: {
      aim: { ru: 'Память на цепочку: удержать в голове сразу несколько слов по порядку.',
             en: 'Chain memory: hold several words in your head in order.' },
      how: { ru: ['Шаг 1 — одно слово, шаг 2 — два, шаг 3 — три, и так до конца урока.',
                  'Каждый шаг: посмотрите на картинки и назовите ВСЮ цепочку по памяти.',
                  '✓ «Вспомнил все» — если назвали всё верно; 👁 «Показать» — если нет.'],
             en: ['Step 1 is one word, step 2 is two, step 3 is three, and so on to the end of the lesson.',
                  'Each step: look at the pictures and say the WHOLE chain from memory.',
                  '✓ “Remembered all” if you got them right; 👁 “Show” if not.'] },
      score: { ru: 'Очко за каждый шаг, названный верно. Если цепочка не вспомнилась, все её слова уходят в копилку ошибок.',
               en: 'A point for every step said correctly. If a chain is forgotten, all its words go into the mistake pile.' }
    },
    drip: {
      aim: { ru: 'Узнать слово как можно раньше — по первой же примете.',
             en: 'Recognise the word as early as possible, from the first clue.' },
      how: { ru: ['Слово закрыто и открывается по частям: 💧 «Ещё часть» — открыть следующую.',
                  'Как только догадались — ✓ «Знаю!»: чем раньше, тем больше очков.',
                  '✕ «Не знаю» — открыть слово целиком, 0 очков, слово в копилку.'],
             en: ['The word is covered and opens part by part: 💧 “Another part” reveals the next one.',
                  'As soon as you know it, press ✓ “I know it!” — the earlier, the more points.',
                  '✕ “I don’t know” opens the whole word: zero points, and the word goes to the pile.'] },
      score: { ru: 'Очки = сколько частей осталось закрытыми, плюс одна. Угадали по первой части — максимум.',
               en: 'Points = how many parts were still covered, plus one. Guessing from the first part scores the most.' }
    },
    anagram: {
      aim: { ru: 'Активное письмо: собрать слово самому, а не выбрать из вариантов.',
             en: 'Active spelling: build the word yourself instead of choosing an option.' },
      how: { ru: ['Над картинкой — пустые места, под ними — части слова вперемешку.',
                  'Нажимайте части в правильном порядке, слева направо.',
                  'Неверный порядок — набор сбрасывается, появится красная пометка.',
                  'Собрали — слово звучит, и можно идти дальше.'],
             en: ['Above the picture are empty slots; below are the parts of the word, shuffled.',
                  'Tap the parts in the right order, left to right.',
                  'A wrong order resets the row and shows a red note.',
                  'Once it is built, the word is spoken and you can go on.'] },
      score: { ru: 'Очко, если слово собрано без единой ошибки.',
               en: 'A point if the word is built with no mistake at all.' }
    },
    typein: {
      aim: { ru: 'Написать слово самому — проверка «на бумаге», а не на выбор.',
             en: 'Write the word yourself — a pen-and-paper check, not a multiple choice.' },
      how: { ru: ['Картинка — напечатайте слово латиницей в поле (Enter — быстрее).',
                  'Диакритику набирать не нужно: trini считается как trīṇi, panca как pañca.',
                  'Верно — очко и «Далее»; неверно — игра показывает верное написание, можно попробовать ещё раз или идти дальше.'],
             en: ['A picture appears — type the word in Latin letters (Enter is quicker).',
                  'You do not need the diacritics: trini counts as trīṇi, panca as pañca.',
                  'Correct — a point and “Next”; wrong — the game shows the right spelling and you may retry or move on.'] },
      score: { ru: 'Очко за верное написание с любой попытки; ошибка кладёт слово в копилку.',
               en: 'A point for a correct spelling on any try; a miss drops the word into the pile.' },
      tip: { ru: 'Хороший приём: ученик диктует, преподаватель печатает — тогда спор идёт о букве, а не о клавиатуре.',
             en: 'A good trick: the student dictates and the teacher types — then the argument is about letters, not keyboards.' }
    },
    sorting: {
      aim: { ru: 'Разобраться в самой форме слова: носовой, вирама, долгая гласная, нужная буква.',
             en: 'Look at the shape of the word: a nasal, a virāma, a long vowel, a certain letter.' },
      how: { ru: ['Над словом — вопрос (например, «Есть носовой звук?»).',
                  'Положите слово в одну из двух коробок: A — ✓ «Да», B — ✕ «Нет».',
                  'После ответа игра показывает, в какой коробке слово на самом деле, и даёт послушать его.'],
             en: ['Above the word is a question (for example, “Has a nasal?”).',
                  'Drop the word into one of two boxes: A — ✓ “Yes”, B — ✕ “No”.',
                  'After the answer the game shows which box the word really belongs to and lets you hear it.'] },
      score: { ru: 'Очко за верную коробку; ошибка кладёт слово в копилку.',
               en: 'A point for the right box; a miss drops the word into the pile.' }
    },
    flashcount: {
      aim: { ru: 'Сосчитать с одного взгляда, как в жизни, а не пересчитывая пальцем.',
             en: 'Count at a glance, the way you do in real life, without pointing at each one.' },
      how: { ru: ['Картинка вспыхивает примерно на полсекунды и закрывается.',
                  'Выберите, сколько было изображено: варианты — все слова урока.',
                  '🔄 «Ещё раз» — показать картинку заново, если не рассмотрели.'],
             en: ['The picture flashes for about half a second and is covered.',
                  'Choose how many there were: the options are all the words of the lesson.',
                  '🔄 “Again” shows the picture once more if you missed it.'] },
      score: { ru: 'Очко за верный счёт; ошибка кладёт слово в копилку. 🔑 ключ учителя оставляет картинку открытой.',
               en: 'A point for the right count; a miss drops the word into the pile. 🔑 keeps the picture open.' }
    },
    blindboard: {
      aim: { ru: 'Чистая память: вспомнить, что спрятано в названной клетке, без подсказок.',
             en: 'Pure recall: remember what hides in the square you are asked about, with no prompts.' },
      how: { ru: ['Поле открыто 2,5 секунды — запомните, где что лежит.',
                  'Потом поле закрывается, и игра спрашивает про одну клетку: «Что в b2?»',
                  'Выберите слово из всех слов урока.',
                  '👁 «Показать поле» — открыть всё поле заново.'],
             en: ['The board is open for 2.5 seconds — memorise what is where.',
                  'Then it closes and the game asks about one square: “What is in b2?”',
                  'Choose the word from all the words of the lesson.',
                  '👁 “Show board” opens the whole board again.'] },
      score: { ru: 'Очко за каждую угаданную клетку; все карточки поля — по два экземпляра каждого слова.',
               en: 'A point for every square named; the board holds two copies of each word.' },
      pair: { ru: 'Игроки отвечают по очереди; кто верно назвал, тот и забирает клетку.',
              en: 'Players answer in turns; whoever names it correctly takes the square.' }
    },
    battleship: {
      aim: { ru: 'Тот же счёт, что и в мемори, но вслух и по координатам: назвал клетку — назови слово.',
             en: 'Like memory, but out loud and by coordinates: call a square, then name the word.' },
      how: { ru: ['Нажмите любую закрытую клетку — например b2.',
                  'Игра показывает, что в ней, и предлагает выбрать слово (A–E).',
                  'Угадали — клетка становится вашей, и вы ходите снова.',
                  'Ошиблись — клетка закрывается и ход переходит сопернику.'],
             en: ['Press any closed square — b2, for example.',
                  'The game shows what is in it and offers the words to choose from (A–E).',
                  'A hit: the square is yours and you go again.',
                  'A miss: the square closes and the turn passes to your opponent.'] },
      score: { ru: 'Очко за каждую взятую клетку; в паре счёт ведётся отдельно для каждого.',
               en: 'A point per square taken; in pairs each player has their own score.' },
      pair: { ru: 'Попал — ходишь снова (как в морском бое). Промах — ход переходит. Клетка помечена номером взявшего её игрока.',
              en: 'A hit earns another turn (as in Battleship). A miss passes the turn. A captured square is stamped with the number of its owner.' }
    },
    bingo: {
      aim: { ru: 'Узнавание на скорость: услышал слово — найди его у себя на карте.',
             en: 'Recognition under time pressure: hear a word, find it on your own card.' },
      how: { ru: ['📣 «Следующее слово» — ведущий называет слово (слово видно и звучит 🔊).',
                  'Каждый игрок закрывает это слово у себя на карте 3 × 3 — нажмите нужную клетку.',
                  'Закрыта не та клетка — нажатие не засчитывается.',
                  'Кто закрыл все девять клеток, тот кричит «бинго!» и побеждает.'],
             en: ['📣 “Next word” — the caller says a word (shown and spoken with 🔊).',
                  'Each player covers that word on their own 3 × 3 card by pressing the cell.',
                  'Pressing the wrong cell simply does not count.',
                  'Whoever covers all nine cells shouts “bingo!” and wins.'] },
      score: { ru: 'Побеждает первый, кто закрыл карту; в счёте видно, сколько слов успел назвать ведущий.',
               en: 'The first to cover a card wins; the counter shows how many words the caller got through.' },
      pair: { ru: 'У каждого своя карта, ведущий один — им может быть и третий ученик.',
              en: 'Each player has their own card and there is one caller — a third student can be the caller.' }
    },
    duel: {
      aim: { ru: 'Реакция и точность: кто первый узнал, тот и отвечает.',
             en: 'Reflex and accuracy: whoever recognises it first is the one who answers.' },
      how: { ru: ['Обеим видна одна и та же картинка.',
                  'Кто узнал — жмёт 🙋 «Ученик 1» или 🙋 «Ученик 2»; нажавший первым отвечает.',
                  'Ответ — четыре варианта A–D. Верно — очко отвечавшему; неверно — очко сопернику.'],
             en: ['Both see the same picture.',
                  'Whoever knows it presses 🙋 “Student 1” or 🙋 “Student 2”; the first to press answers.',
                  'The answer is four options, A–D. Right — a point to the answerer; wrong — a point to the opponent.'] },
      score: { ru: 'Очко за верный ответ, или очко сопернику за ошибку.',
               en: 'A point for a correct answer, or a point to the opponent for a miss.' },
      pair: { ru: 'В соло-режиме (👤) кнопки «кто знает» исчезают — игра превращается в быстрый опрос.',
              en: 'In solo mode (👤) the “who knows” buttons disappear and it becomes a quick-fire quiz.' }
    },
    describe: {
      aim: { ru: 'Сказать или показать так, чтобы напарник догадался; судья — не экран, а партнёр.',
             en: 'Say it or show it so your partner guesses; the judge is the partner, not the screen.' },
      how: { ru: ['🖼 «Показывает»: один видит слово на закрытой карточке (👁 — посмотреть) и показывает его жестом урока; другой называет слово.',
                  '🔤 «Называет» (зеркало наоборот): один видит написание и произносит слово, другой показывает.',
                  'Угадал или нет — решает напарник кнопками ✓ / ✕.',
                  'Роли меняются каждый раунд автоматически.'],
             en: ['🖼 “Shows”: one sees the word on a covered card (👁 to peek) and performs it with the lesson gesture; the other names the word.',
                  '🔤 “Says” (the mirror game): one sees the written word and says it; the other performs.',
                  'Whether it was guessed is decided by the partner with ✓ / ✕.',
                  'Roles swap automatically every round.'] },
      score: { ru: 'Очко получает угадывающий, если напарник поставил ✓.',
               en: 'The guesser scores a point when the partner presses ✓.' },
      pair: { ru: 'Основная игра для двоих: один говорит, другой понимает, и наоборот. 🔑 ключ учителя показывает ответ, чтобы судья не ошибся.',
              en: 'The core pair game: one speaks, the other understands, and back again. 🔑 shows the answer so the judge cannot go wrong.' }
    },
    orderrelay: {
      aim: { ru: 'Порядок счёта: выложить числительные одно за другим, как они идут.',
             en: 'The order of counting: lay the numerals out one after another as they come.' },
      how: { ru: ['Внизу — все слова вперемешку, сверху — полка, куда они выкладываются по порядку.',
                  'На каждой карточке написано само числительное словом — картинки нет: значение нужно вспомнить, а не пересчитать.',
                  'Нажмите слово, которое идёт следующим (в начале — первым).',
                  'Верно — слово встаёт на полку и звучит; неверно — ход переходит.',
                  'Цель — выложить весь ряд по порядку, от первого слова до последнего.'],
             en: ['Below are all the words, shuffled; above is the shelf where they are laid out in order.',
                  'Each card carries the numeral itself in words — there is no picture: recall the value instead of counting it.',
                  'Press the word that comes next (the first one at the start).',
                  'Right — the word goes on the shelf and is spoken; wrong — the turn passes.',
                  'The aim is to lay out the whole row in order, from the first word to the last.'] },
      score: { ru: 'Очко за каждое верно поставленное слово.',
               en: 'A point for every word placed correctly.' },
      pair: { ru: 'Игроки ходят по одному слову: верно — ходишь снова, неверно — ход сопернику.',
              en: 'Players take one word each: right and you go again, wrong and the turn passes.' }
    },
    coopmemory: {
      aim: { ru: 'Не друг против друга, а вместе: очистить поле за ограниченное число ходов.',
             en: 'Not against each other but together: clear the board within a limited number of moves.' },
      how: { ru: ['Открывайте по две карточки, как в обычном мемори.',
                  'Каждое обсуждение — вслух: «в a1 было то‑то», и только потом нажимайте.',
                  'Лимит ходов показан сверху; если исчерпан — поле не очищено, начните заново.'],
             en: ['Open two cards at a time, as in ordinary memory.',
                  'Discuss every move out loud — “a1 was …” — and only then press.',
                  'The move limit is shown at the top; when it runs out the board is not cleared and you start over.'] },
      score: { ru: 'Счёт общий: сколько пар закрыто. Отдельного счёта по игрокам здесь нет — это намеренно.',
               en: 'The score is shared: how many pairs are cleared. There is no per-player score, on purpose.' },
      pair: { ru: 'Ход обозначается для порядка, но выигрывают или проигрывают вдвоём.',
              en: 'A turn is shown for order, but the pair wins or loses together.' }
    },
    tictactoe: {
      /* урок числительных: в клетках слова, в вариантах — количество */
      adapt: function (cfg) {
        if (!cfg.words || !cfg.words[0] || !cfg.words[0].value) return null;
        return {
          aim: { ru: 'Клетку можно занять, только ответив, сколько это: стратегия плюс счёт.',
                 en: 'You may only take a square by saying how many it is: strategy plus counting.' },
          how: { ru: ['Нажмите свободную клетку — в ней написано числительное.',
                      'Игра показывает это слово, а четыре варианта A–D — количество: до пяти кружочками, больше — арабской цифрой.',
                      'Верно — клетка ваша (✕ или ◯); неверно — клетка свободна, ход переходит.',
                      'Три свои клетки подряд — победа; заполнено поле без тройки — ничья.'],
                 en: ['Press a free square — a numeral is written in it.',
                      'The game shows the word, and the four options A–D give the quantity: circles up to five, Arabic digits above.',
                      'Right and the square is yours (✕ or ◯); wrong and it stays free, with the turn passing.',
                      'Three own squares in a row wins; a full board without one is a draw.'] },
          score: { ru: 'Побеждает тот, кто собрал тройку; ошибки в ответах отдают ход сопернику.',
                   en: 'Whoever makes a line of three wins; a wrong answer hands the turn to the opponent.' },
          pair: { ru: 'Игра для двоих: первый игрок — ✕, второй — ◯. Второй появляется, когда включён 👥 «2 ученика» над вкладками; при 👤 «1 ученик» на поле только ✕. 🔑 ключ учителя помечает верное количество заранее.',
                  en: 'For two players: the first is ✕, the second ◯. The second one appears when 👥 “2 students” is on above the tabs; with 👤 “1 student” the board only gets ✕. 🔑 marks the right quantity in advance.' }
        };
      },
      aim: { ru: 'Клетку можно занять, только ответив: стратегия плюс дрилль.',
             en: 'You may only take a square by answering: strategy plus drill.' },
      how: { ru: ['Нажмите свободную клетку — в ней написано слово.',
                  'Игра показывает картинку и четыре варианта A–D: назовите слово.',
                  'Верно — клетка ваша (✕ или ◯); неверно — клетка свободна, ход переходит.',
                  'Три свои клетки подряд — победа; заполнено поле без тройки — ничья.'],
             en: ['Press a free square — a word is written in it.',
                  'The game shows a picture and four options, A–D: name the word.',
                  'Right and the square is yours (✕ or ◯); wrong and it stays free, with the turn passing.',
                  'Three own squares in a row wins; a full board without one is a draw.'] },
      score: { ru: 'Побеждает тот, кто собрал тройку; ошибки в ответах отдают ход сопернику.',
               en: 'Whoever makes a line of three wins; a wrong answer hands the turn to the opponent.' },
      pair: { ru: 'Игра для двоих: первый игрок — ✕, второй — ◯. Второй появляется, когда включён 👥 «2 ученика» над вкладками; при 👤 «1 ученик» на поле только ✕. 🔑 ключ учителя помечает верный вариант заранее.',
              en: 'For two players: the first is ✕, the second ◯. The second one appears when 👥 “2 students” is on above the tabs; with 👤 “1 student” the board only gets ✕. 🔑 marks the right option in advance.' }
    },
    wordgrid: {
      aim: { ru: 'Найти среди слов поля те, что были на уроке, — и не попасться на похожие.',
             en: 'Find the words of the lesson on the board — without falling for the look-alikes.' },
      how: { ru: ['Размер поля выбирается кнопками 10 × 10 … 5 × 5: чем меньше поле, тем легче удержать взгляд.',
                  'Клетки подписаны: цифры 1…10 сверху, буквы a, b, c… слева.',
                  'В клетке — целое слово в деванагари. Нажимайте клетки со словами урока: на большом поле каждое встречается дважды.',
                  'Верно — клетка зелёная; мимо — красная, и это считается промахом.',
                  '🪤 Пустые клетки заполнены не случайными буквами, а почти‑двойниками слов урока: долгая и краткая гласная (ि / ी), ण и न из разных варг, ऋ и रि, ं и ः. Слово нужно читать точно.'],
             en: ['Pick the board size with the 10 × 10 … 5 × 5 buttons: the smaller the board, the easier to hold it in view.',
                  'The cells are labelled: numbers 1–10 across the top, letters a, b, c… down the left.',
                  'Each cell holds a whole word in Devanagari. Press the cells with lesson words: on a big board each appears twice.',
                  'Right — the cell turns green; a miss — red, and it counts against you.',
                  '🪤 The empty cells are not random letters but near-misses of the lesson words: long and short vowels (ि / ी), ण and न from different vargas, ऋ and रि, ं and ः. Read exactly.'] },
      score: { ru: 'Счёт — сколько нужных клеток найдено (каждое слово спрятано дважды); промахи показаны отдельно. 👁 «Показать всё» завершает раунд и открывает все нужные клетки.',
               en: 'The score is how many of the target cells were found (each word is hidden twice); misses are counted separately. 👁 “Reveal all” ends the round and opens every target cell.' },
      tip: { ru: 'Хорошо работает как финальный дрилль урока: весь словарь перед глазами, ответить нужно точно.',
             en: 'It works well as the final drill of a lesson: the whole vocabulary in view, every answer has to be exact.' }
    },
    wordsearch: {
      aim: { ru: 'Классический филворд: слова спрятаны по частям в квадратной сетке от 10 × 10 до 5 × 5.',
             en: 'A classic word search: the words are hidden part by part on a square board from 10 × 10 down to 5 × 5.' },
      how: { ru: ['Размер поля — кнопки 10 × 10, 9 × 9, 8 × 8, 7 × 7, 6 × 6, 5 × 5 над сеткой.',
                  'Слова разложены по прямой в двух направлениях: слева направо и сверху вниз. По диагонали слов нет.',
                  'Клетки подписаны: цифры 1…10 сверху, буквы a, b, c… слева. Клетку можно назвать вслух — «c4».',
                  'Нажимайте клетки подряд — так, чтобы получить нужное слово.',
                  'Нашли — цепочка зелёная, слово вычёркивается из списка под сеткой.',
                  '🙈 «Спрятать слова» убирает список под сеткой: сначала вспомните слова урока, потом ищите их в поле. 👁 возвращает список.',
                  'Сбились — нажмите ↺ «Сбросить выбор» и начните цепочку заново.',
                  '🪤 В поле лежат слова-двойники: त्रीणि и त्रिणि, चत्वारि и चत्वरी, एकम् и एकम. Двойник отличается ровно одной буквой — долготой, варгой (ण ↔ न) или ऋ / रि — и не засчитывается. Именно поэтому слово нельзя узнать «по общему виду», его нужно прочитать.',
                  '🧩 «Ловушки» показывает все двойники на поле и что в каждом не так — для разбора с учеником.',
                  'Свободные клетки тоже заполнены не случайными буквами, а вариантами частей с этого поля: ि ↔ ी, ण ↔ न, ऋ ↔ रि, ं ↔ ः.'],
             en: ['Board size — the 10 × 10, 9 × 9, 8 × 8, 7 × 7, 6 × 6, 5 × 5 buttons above the grid.',
                  'The words lie in a straight line in two directions only: left to right and top to bottom. Nothing is hidden diagonally.',
                  'The cells are labelled: numbers 1–10 across the top, letters a, b, c… down the left. You can name a cell out loud — “c4”.',
                  'Press the cells one after another to spell out a word.',
                  'Found — the chain turns green and the word is crossed off the list under the grid.',
                  '🙈 “Hide words” removes the list under the grid: recall the lesson words first, then look for them. 👁 brings the list back.',
                  'Lost the thread — press ↺ “Clear” and start the chain again.',
                  '🪤 The board holds near-miss twins: त्रीणि and त्रिणि, चत्वारि and चत्वरी, एकम् and एकम. A twin differs in exactly one letter — vowel length, varga (ण ↔ न) or ऋ / रि — and does not score. That is why a word cannot be recognised by its overall look; it has to be read.',
                  '🧩 “Near-misses” shows every twin on the board and what is wrong with it — for a talk-through with the student.',
                  'The empty cells are filled with variants of the parts on this board too: ि ↔ ी, ण ↔ न, ऋ ↔ रि, ं ↔ ः.'] },
      score: { ru: 'Счёт — сколько слов найдено из всех слов урока. 🔑 ключ учителя подсвечивает все спрятанные цепочки.',
               en: 'The score is how many of the lesson words were found. 🔑 outlines every hidden chain.' }
    }
  };
  Object.keys(RULES_EXTRA).forEach(function (k) { SAL.addRules(k, RULES_EXTRA[k]); });

  /* ==========================================================================
     КАКИЕ ИГРЫ УМЕЮТ ДВОИХ
     --------------------------------------------------------------------------
     Переключатель 👤/👥 показывается только для этих игр — остальные честно
     подписаны «для одного ученика», и кнопка у них не появляется.
     ========================================================================== */
  ['battleship', 'bingo', 'duel', 'describe', 'orderrelay',
    'coopmemory', 'tictactoe', 'blindboard', 'snowball'].forEach(function (k) { SAL.addDuoGame(k); });

  /* engine-level switches used by the extra games */
  SAL.addAction('setPlayers', function (cfg, st, a) {
    var next = parseInt(a, 10) === 2 ? 2 : 1;
    var was = st.players;
    st.players = next;
    /* прогресс стираем только у парной игры и только при реальной смене
       режима: у соло-игры переключателя нет, и её очки терять нельзя */
    if (SAL.isDuoGame(st.game) && was !== next) {
      Object.keys(st.g).forEach(function (k) { delete st.g[k]; });
      K.clearAfter();
    }
  });
  SAL.addAction('toggleKey', function (cfg, st) { st.teacherKey = !st.teacherKey; });
  SAL.addAction('clearPile', function (cfg) { K.pileClear(cfg); });
})();
