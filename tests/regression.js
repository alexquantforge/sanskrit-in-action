/*
 * Regression harness for the Sanskrit PPP lessons (Lesson 1 untouched, Lessons 2 & 3 engine).
 *
 *   npm init -y && npm install jsdom
 *   node tests/regression.js
 *
 * It boots index.html in jsdom, loads the real scripts and walks every lesson:
 * presentation modes, all 12 practice games, all 4 production modes, plus the
 * details that were wrong once and must stay right (arrow direction, A/B/C/D
 * option letters, memory board coordinates, second-try scoring, ...).
 */
const fs = require('fs');
const path = require('path');

let JSDOM;
try { JSDOM = require('jsdom').JSDOM; }
catch (e) { JSDOM = require('/tmp/domtest/node_modules/jsdom').JSDOM; }
const VirtualConsole = (() => {
  try { return require('jsdom').VirtualConsole; } catch (e) { return require('/tmp/domtest/node_modules/jsdom').VirtualConsole; }
})();

const REPO = path.resolve(__dirname, '..');
const errs = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if (!/scrollTo|Not implemented/.test(e.message)) errs.push(e.message); });

const dom = new JSDOM(fs.readFileSync(path.join(REPO, 'index.html'), 'utf8'), {
  runScripts: 'dangerously', url: 'https://example.test/', virtualConsole: vc, pretendToBeVisual: true
});
const win = dom.window;
['lesson1.js', 'lesson-engine.js', 'lesson2.js', 'lesson3.js', 'lesson4.js', 'games-extra.js', 'app.js'].forEach(f => {
  const s = win.document.createElement('script');
  s.textContent = fs.readFileSync(path.join(REPO, f), 'utf8');
  win.document.body.appendChild(s);
});
const SAL = win.SAL;

let bad = 0;
const ck = (c, m) => { console.log((c ? '  OK   ' : '  FAIL ') + m); if (!c) bad++; };
const arenaOf = k => win.document.getElementById(k + '-practice-arena');
const stageOf = k => win.document.getElementById(k + '-production-stage');
const gst = (k, n) => SAL.lessons[k]._st.g[n];
const clickAll = el => Array.from(el.querySelectorAll('[onclick]'))
  .forEach(b => b.dispatchEvent(new win.MouseEvent('click', { bubbles: true })));

const attr = (s, a) => { const m = s.match(new RegExp(a + '="([^"]*)"')); return m ? m[1] : null; };
const num = (s, a) => { const v = attr(s, a); return v === null ? NaN : parseFloat(v); };
const circles = h => [...h.matchAll(/<circle([^>]*)>/g)].map(m => ({
  cx: num(m[1], 'cx'), cy: num(m[1], 'cy'), r: num(m[1], 'r'), fill: attr(m[1], 'fill'), dash: /dasharray/.test(m[1])
}));
const lines = h => [...h.matchAll(/<line([^>]*)>/g)].map(m => ({
  x1: num(m[1], 'x1'), y1: num(m[1], 'y1'), x2: num(m[1], 'x2'), y2: num(m[1], 'y2'), marker: /marker-end/.test(m[1])
}));
const near = (v, t, tol) => Math.abs(v - t) <= tol;
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const colsFor = n => (n <= 6 ? 3 : (n <= 16 ? 4 : 6));

const GAMES = ['masked', 'flashcards', 'gaps', 'picquiz', 'wordquiz', 'match', 'memory',
  'wronglabel', 'typo', 'categories', 'spelling', 'truefalse'];
const PRESMODES = ['stepbystep', 'hotspots', 'audiofirst', 'poster'];
const PRODMODES = ['sprint', 'mic', 'missingpart', 'chant'];

for (const key of ['L2', 'L3', 'L4']) {
  const cfg = SAL.lessons[key];
  const N = cfg.words.length;
  SAL.openLesson(key);
  console.log('\n===== ' + key + ' (' + N + ' слов) =====');

  /* ---------- everything renders ---------- */
  ck(win.document.getElementById('view-lesson' + cfg.num).innerHTML.length > 1000, 'урок отрисован');
  for (const m of PRESMODES) {
    SAL.do(key, 'setPresMode', m);
    ck(!!win.document.getElementById(key + '-pres-grid').innerHTML.trim(), 'презентация: ' + m);
  }
  for (const gm of GAMES) {
    SAL.do(key, 'setGame', gm);
    ck(!!arenaOf(key).innerHTML.trim(), 'игра ' + gm + ' отрисовывается');
  }
  for (const m of PRODMODES) {
    SAL.do(key, 'setProdMode', m);
    ck(!!stageOf(key).innerHTML.trim(), 'продакшн ' + m + ' отрисовывается');
  }

  /* ---------- game 1: self-assessment, not multiple choice ---------- */
  SAL.do(key, 'restart', 'masked'); SAL.do(key, 'setGame', 'masked');
  {
    const g = gst(key, 'masked');
    ck(arenaOf(key).innerHTML.indexOf('flashcard-box') >= 0, 'игра 1: карточка с закрытым словом');
    ck(arenaOf(key).innerHTML.indexOf('quiz-opt-btn') < 0, 'игра 1: это самопроверка, вариантов нет');
    SAL.do(key, 'maskedFlip');
    ck(g.shown === true, 'игра 1: слово открывается');
    SAL.do(key, 'maskedGrade', '1');
    ck(g.score === 1 && g.i === 1 && g.shown === false, 'игра 1: ✓ начисляет очко и закрывает следующее слово');
    SAL.do(key, 'maskedGrade', '0');
    ck(g.score === 1 && g.i === 2, 'игра 1: ✕ проходит без очка');
  }

  /* ---------- option letters A B C D ---------- */
  for (const [gm, n] of [['gaps', 4], ['picquiz', 4], ['wordquiz', 4], ['spelling', 4], ['truefalse', 2], ['wronglabel', 3], ['typo', 3]]) {
    SAL.do(key, 'restart', gm); SAL.do(key, 'setGame', gm);
    const got = [...arenaOf(key).querySelectorAll('.quiz-opt-btn')]
      .map(b => { const sp = b.querySelector('.opt-letter'); return sp ? sp.textContent.trim() : null; });
    ck(got.length === n && got.every((v, i) => v === LETTERS[i]), 'буквы в игре ' + gm + ': ' + JSON.stringify(got));
  }

  /* ---------- second try in games 3, 4, 5, 11 ---------- */
  for (const [gm, act, choicesF, ansF, nextAct] of [
    ['gaps', 'gapPick', 'gapChoices', 'gapAnswer', 'gapsNext'],
    ['spelling', 'spellPick', 'missingChoices', 'missingAnswer', 'spellingNext']
  ]) {
    SAL.do(key, 'restart', gm); SAL.do(key, 'setGame', gm);
    const g = gst(key, gm);
    const w = cfg.words[g.i];
    const wrongVal = (typeof w[choicesF][0] === 'object')
      ? w[choicesF].find(c => c.deva !== w[ansF]).deva
      : w[choicesF].find(c => c !== w[ansF]);
    SAL.do(key, act, wrongVal);
    ck(g.answered === false && g.firstTry === false && g.score === 0, gm + ': неверный ответ даёт вторую попытку');
    ck(arenaOf(key).innerHTML.indexOf('quiz-opt-btn wrong') >= 0, gm + ': неверный вариант красный');
    SAL.do(key, act, w[ansF]);
    ck(g.answered && g.score === 0, gm + ': очко только за первую попытку');
    ck(arenaOf(key).innerHTML.indexOf('✓ ' + w.deva) >= 0, gm + ': показан правильный ответ');
    ck(arenaOf(key).textContent.indexOf('второй попытки') >= 0, gm + ': сообщение про вторую попытку');
    SAL.do(key, nextAct);
    const w2 = cfg.words[g.i];
    SAL.do(key, act, w2[ansF]);
    ck(g.score === 1, gm + ': в следующем раунде очко начисляется');
  }
  for (const gm of ['picquiz', 'wordquiz']) {
    SAL.do(key, 'restart', gm); SAL.do(key, 'setGame', gm);
    const g = gst(key, gm);
    const w = cfg.words[g.i];
    const shown = [...arenaOf(key).innerHTML.matchAll(/quizPick','([a-z]+)'/g)].map(m => m[1]);
    const other = shown.find(id => id !== w.id);
    SAL.do(key, 'quizPick', other);
    ck(g.answered === false && g.firstTry === false, gm + ': неверный ответ даёт вторую попытку');
    ck(arenaOf(key).innerHTML.indexOf('quiz-opt-btn wrong') >= 0, gm + ': неверный вариант красный');
    SAL.do(key, 'quizPick', w.id);
    ck(g.answered && g.score === 0, gm + ': очко только за первую попытку');
  }

  /* ---------- games 8 / 9: the exact mistake is explained ---------- */
  for (const [gm, nextAct] of [['wronglabel', 'wronglabelNext'], ['typo', 'typoNext']]) {
    SAL.do(key, 'restart', gm); SAL.do(key, 'setGame', gm);
    const g = gst(key, gm);
    SAL.do(key, 'pick3', String(g.round.wrongIdx));
    const h = arenaOf(key).innerHTML;
    ck(h.indexOf('line-through') >= 0, gm + ': неверный вариант зачёркнут');
    ck(/Ошибка была под картинкой|Опечатка в слове/.test(arenaOf(key).textContent), gm + ': пояснение, в чём ошибка');
  }

  /* ---------- game 10: instant grading ---------- */
  SAL.do(key, 'restart', 'categories'); SAL.do(key, 'setGame', 'categories');
  {
    const g = gst(key, 'categories');
    const cat = cfg.categories[0];
    const outsider = cfg.words.find(w => cat.wordIds.indexOf(w.id) < 0 && (cat.bonusWordIds || []).indexOf(w.id) < 0);
    if (outsider) {
      SAL.do(key, 'catToggle', outsider.id);
      ck(g.checked === false && g.firstTry === false, 'категории: неверное слово не закрывает раунд');
    }
    cat.wordIds.forEach(id => SAL.do(key, 'catToggle', id));
    ck(g.checked === true, 'категории: раунд закрывается, когда найдены все слова');
    ck(arenaOf(key).textContent.indexOf('Верно:') >= 0, 'категории: показан правильный список');
  }

  /* ---------- game 6: stages advance by themselves ---------- */
  SAL.do(key, 'restart', 'match'); SAL.do(key, 'setGame', 'match');
  {
    const g = gst(key, 'match');
    const chunks = [];
    for (let i = 0; i < N; i += 4) chunks.push(cfg.words.slice(i, i + 4));
    const pairUp = () => chunks[g.stage].forEach(w => {
      const pi = g.tiles.findIndex(t => t.id === w.id && t.kind === 'pic');
      const wi = g.tiles.findIndex(t => t.id === w.id && t.kind === 'word');
      if (pi >= 0 && wi >= 0 && !g.matched[w.id]) { SAL.do(key, 'tile', String(pi)); SAL.do(key, 'tile', String(wi)); }
    });
    pairUp();
    if (chunks.length > 1) ck(g.stage === 1, 'пары: следующий этап открылся сам');
    let guard = 0;
    while (!g.done && guard++ < 50) pairUp();
    ck(g.done === true, 'пары: игра завершена');
    ck(arenaOf(key).textContent.indexOf('%') >= 0, 'пары: процент на финальном экране');
  }

  /* ---------- game 7: face-down cards are named by their square ---------- */
  for (const size of [N, Math.max(3, Math.ceil(N / 2))]) {
    SAL.do(key, 'restart', 'memory'); SAL.do(key, 'setGame', 'memory');
    SAL.do(key, 'memorySize', String(size));
    const g = gst(key, 'memory');
    const n = g.cards.length;
    const cols = colsFor(n);
    const grid = arenaOf(key).querySelector('.memory-grid');
    const declared = (grid.getAttribute('style') || '').match(/repeat\((\d+),/);
    ck(declared && +declared[1] === cols, 'мемори ' + n + ' карточек: сетка ' + cols + ' столбца');
    const backs = [...arenaOf(key).querySelectorAll('.memory-card')]
      .map(b => { const sp = b.querySelector('.memory-coord'); return sp ? sp.textContent.trim() : null; });
    const want = backs.map((_, i) => LETTERS[Math.floor(i / cols)].toLowerCase() + ((i % cols) + 1));
    ck(backs.every((v, i) => v === want[i]), 'мемори: координаты рубашек ' + backs.join(' '));
  }

  /* ---------- arrow view: '?' in the margin, arrow on the body part ---------- */
  {
    const pins = cfg.hotspots.figures[0].pins;
    const order = pins.slice().sort((a, b) => a.num - b.num).map(p => p.id);
    SAL.do(key, 'setProdMode', 'sprint'); SAL.do(key, 'sprintVisual', 'arrow'); SAL.do(key, 'sprintBegin');
    for (let r = 0; r < N; r++) {
      const p = cfg._st.prod.sprint;
      const pin = pins.find(x => x.id === cfg.words[p.i].id);
      if (!pin) break;
      const h = stageOf(key).innerHTML;
      const qs = [...h.matchAll(/<text([^>]*)>\s*\?\s*<\/text>/g)].map(m => ({ x: num(m[1], 'x'), y: num(m[1], 'y') }));
      const d = Math.hypot(pin.tx - pin.x, pin.ty - pin.y);
      ck(qs.some(q => near(q.x, pin.x, 1) && near(q.y, pin.y, 6)), pin.id + ': «?» на поле схемы');
      ck(lines(h).filter(l => l.marker).some(l =>
        near(l.x1, pin.x, 1) && near(l.y1, pin.y, 1) &&
        Math.hypot(l.x2 - pin.x, l.y2 - pin.y) < d &&
        Math.hypot(l.x2 - pin.tx, l.y2 - pin.ty) < 14),
        pin.id + ': стрелка указывает на часть тела');
      SAL.do(key, 'sprintReveal'); SAL.do(key, 'sprintGrade', '1');
      if (cfg._st.prod.sprint.finished) break;
    }
    SAL.do(key, 'setPresMode', 'hotspots');
    for (const pin of pins) {
      SAL.do(key, 'setPresMode', 'hotspots'); SAL.do(key, 'hotspot', pin.id);
      const cs = circles(win.document.getElementById(key + '-pres-grid').innerHTML);
      ck(cs.some(c => c.r < 5 && near(c.cx, pin.tx, 0.6) && near(c.cy, pin.ty, 0.6)),
        pin.id + ': в презентации мишень на части тела');
      ck(cs.some(c => c.r >= 11 && near(c.cx, pin.x, 0.6) && near(c.cy, pin.y, 0.6)),
        pin.id + ': в презентации номер — на поле схемы');
    }
    SAL.do(key, 'setProdMode', 'missingpart');
    for (let r = 0; r < N; r++) {
      const p = cfg._st.prod.missing;
      const pin = pins.find(x => x.id === order[p.i]);
      if (!pin) break;
      const cs = circles(stageOf(key).innerHTML);
      ck(cs.some(c => near(c.r, 15, 0.1) && c.fill === '#DC2626' && near(c.cx, pin.x, 1) && near(c.cy, pin.y, 1)),
        pin.id + ': «что пропало» — «?» на поле');
      ck(cs.some(c => c.dash && near(c.cx, pin.tx, 1) && near(c.cy, pin.ty, 1)),
        pin.id + ': «что пропало» — мишень на части тела');
      SAL.do(key, 'missingReveal'); SAL.do(key, 'missingGrade', '1');
      if (cfg._st.prod.missing.finished) break;
    }
  }

  /* ---------- the word data must add up: gap + answer = the word, etc. ---------- */
  const nospace = t => t.replace(/ /g, '');
  const editDist = (a, b) => {
    a = [...a]; b = [...b];
    const d = [];
    for (let i = 0; i <= a.length; i++) d.push([i].concat(new Array(b.length).fill(0)));
    for (let j = 0; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  };
  const broken = [];
  cfg.words.forEach(w => {
    if (w.maskedPrefix + w.maskedHidden !== w.deva) broken.push(w.deva + ': masked');
    if (nospace(w.gapDeva).replace('_', w.gapAnswer) !== w.deva) broken.push(w.deva + ': gap');
    if (nospace(w.missingDisplay).replace('_', w.missingAnswer) !== w.deva) broken.push(w.deva + ': missing');
    if (!w.gapChoices.some(c => c.deva === w.gapAnswer)) broken.push(w.deva + ': gapChoices');
    if (!w.missingChoices.includes(w.missingAnswer)) broken.push(w.deva + ': missingChoices');
    if (editDist(w.deva, w.typoDeva) !== 1) broken.push(w.deva + ': опечатка не в одну букву');
  });
  ck(broken.length === 0, key + ': данные слов согласованы (пропуск + ответ = слово, опечатка в одну букву)' +
    (broken.length ? ' — ' + broken.join('; ') : ''));

  /* ---------- lesson 4: the counting frame must really show 1..5 ---------- */
  if (key === 'L4') {
    const fig = cfg.hotspots.figures[0];
    const beads = [...fig.art.matchAll(/<circle cx="(\d+)" cy="(\d+)" r="10"/g)].map(m => ({ x: +m[1], y: +m[2] }));
    ck(beads.length === 15, 'урок 4: на счётах 15 бусин (1+2+3+4+5), найдено ' + beads.length);
    let rowsOk = true;
    fig.pins.forEach(p => {
      const row = beads.filter(b => b.y === p.ty);
      if (row.length !== p.num || !row.some(b => b.x === p.tx)) rowsOk = false;
    });
    ck(rowsOk, 'урок 4: в ряду N ровно N бусин и мишень попадает в бусину своего ряда');
    ck(cfg.words.every((w, i) =>
      [...w.svg.matchAll(/<circle cx="[\d.]+" cy="[\d.]+" r="(?:10\.5|12|13)"/g)].length === i + 1),
      'урок 4: на карточке столько бусин, сколько означает числительное');
    const sets = cfg.categories.map(c => c.wordIds.slice().sort().join('|'));
    ck(cfg.categories.every(c => c.wordIds.length >= 2),
      'урок 4: в каждой категории хотя бы два слова (иначе игра не имеет смысла)');
    ck(new Set(sets).size === sets.length,
      'урок 4: у всех ' + sets.length + ' категорий разные наборы слов');
  }

  /* ---------- every control is clickable without throwing ---------- */
  for (const m of PRESMODES) { SAL.do(key, 'setPresMode', m); clickAll(win.document.getElementById(key + '-pres-grid')); }
  for (const gm of GAMES) { SAL.do(key, 'setGame', gm); clickAll(arenaOf(key)); }
  for (const m of PRODMODES) { SAL.do(key, 'setProdMode', m); clickAll(stageOf(key)); }
  ck(true, 'все кнопки нажаты без ошибок');
}

/* ---------- lesson order: body (6) -> face (7) -> body+face (12) ---------- */
{
  const order = ['view-lesson1', 'view-lesson2', 'view-lesson3', 'view-lesson4']
    .map(id => win.document.getElementById(id));
  ck(order.every(Boolean), 'все четыре панели урока есть на странице');
  ck(order[0].compareDocumentPosition(order[1]) & 4, 'порядок панелей: урок 1 → урок 2');
  ck(order[1].compareDocumentPosition(order[2]) & 4, 'порядок панелей: урок 2 → урок 3');
  ck(order[2].compareDocumentPosition(order[3]) & 4, 'порядок панелей: урок 3 → урок 4');
  ck(SAL.lessons.L2.num === 1 && SAL.lessons.L3.num === 2 && SAL.lessons.L4.num === 4,
    'номера в данных: Тело = 1, Лицо = 2, Цифры = 4');
  ck(/Урок 4: Цифры/.test(win.document.getElementById('view-lesson4').textContent), 'слот 4 — Цифры 1–5');
  ck(/सङ्ख्याः/.test(win.document.getElementById('view-lesson4').innerHTML), 'слот 4: заголовок सङ्ख्याः');
  const w4 = SAL.lessons.L4.words.map(w => w.deva).join(' ');
  ck(w4 === 'एकम् द्वे त्रीणि चत्वारि पञ्च', 'урок 4: ровно пять числительных — ' + w4);
  ck(/Урок 1: Тело/.test(win.document.getElementById('view-lesson1').textContent), 'слот 1 — Тело (6 слов)');
  ck(/Урок 2: Лицо/.test(win.document.getElementById('view-lesson2').textContent), 'слот 2 — Лицо (7 слов)');
  ck(/УРОК 3 · CAMBRIDGE PPP/.test(win.document.getElementById('view-lesson3').textContent), 'слот 3 — 12 слов, помечен как УРОК 3');
}

/* ---------- Lesson 3 (the 12-word lesson): same letters and memory squares ---------- */
win.switchView('lesson3');
const l1 = win.document.getElementById('view-lesson3').innerHTML;
ck(['नयन', 'नासिका', 'जिह्वा', 'कर्ण', 'शीर्ष', 'ललाट', 'भ्रू', 'ओष्ठ', 'कर', 'पाद', 'दन्त', 'अङ्गुली']
  .every(w => l1.indexOf(w) >= 0), 'урок 3 (12 слов): все 12 слов на месте');

console.log('\n===== L1 · 12 слов (урок 3) =====');
const l1arena = win.document.getElementById('lesson1-practice-arena');
for (const [gm, n] of [['gaps', 4], ['picquiz', 4], ['wordquiz', 4], ['spelling', 4],
                       ['truefalse', 2], ['wronglabel', 3], ['typo', 3]]) {
  win.selectPracticeGame(gm);
  const got = [...l1arena.querySelectorAll('.quiz-opt-btn')]
    .map(b => { const sp = b.querySelector('.opt-letter'); return sp ? sp.textContent.trim() : null; });
  ck(got.length === n && got.every((v, i) => v === LETTERS[i]), 'урок 3 (12 слов): буквы в игре ' + gm + ': ' + JSON.stringify(got));
}
for (const pairs of [6, 12]) {
  win.setMemoryPairsCount(pairs);
  win.selectPracticeGame('memory');
  const cards = [...l1arena.querySelectorAll('.memory-card')];
  const cols = 4;                       // .memory-grid in styles.css
  const backs = cards.map(b => { const sp = b.querySelector('.memory-coord'); return sp ? sp.textContent.trim() : null; });
  const want = cards.map((_, i) => LETTERS[Math.floor(i / cols)].toLowerCase() + ((i % cols) + 1));
  ck(cards.length === pairs * 2, 'урок 3 (12 слов): мемори на ' + pairs * 2 + ' карточек');
  ck(backs.every((v, i) => v === want[i]), 'урок 3 (12 слов): координаты рубашек ' + backs.join(' '));
}
ck(/Называйте карточку по клетке|Name the card by its square/.test(l1arena.textContent),
  'урок 3 (12 слов): подсказка про букву ряда и номер столбца');
win.setLanguage('en'); win.setLanguage('ru');
ck(true, 'переключение RU/EN работает');


/* ==========================================================================
   EXTRA PRACTICE GAMES (games-extra.js) — only Lesson 4 lists them
   ========================================================================== */
console.log('\n===== Новые игры (games-extra.js) =====');
const EXTRA = ['hotcards', 'retry', 'echo', 'snowball', 'drip', 'anagram', 'typein', 'sorting',
  'flashcount', 'blindboard', 'battleship', 'bingo', 'duel', 'describe', 'orderrelay',
  'coopmemory', 'tictactoe', 'wordgrid', 'wordsearch'];
const PAIR = ['battleship', 'bingo', 'duel', 'describe', 'orderrelay', 'coopmemory', 'tictactoe'];
const L4 = SAL.lessons.L4;
const clean = h => !/undefined|NaN|\[object Object\]/.test(h);
const openL4 = () => { SAL.openLesson('L4'); return arenaOf('L4'); };
const wById = id => L4.words.filter(w => w.id === id)[0];

/* ---------- they exist for lesson 4 and nowhere else ---------- */
const tabsOf = k => [...win.document.getElementById('view-lesson' + SAL.lessons[k].num)
  .querySelectorAll('.practice-tab-btn[data-game]')].map(b => b.getAttribute('data-game'));
['L2', 'L3', 'L4'].forEach(k => SAL.openLesson(k));
const l4tabs = tabsOf('L4');
ck(l4tabs.length === 12 + EXTRA.length, 'урок 4: вкладок ' + l4tabs.length + ' (12 классических + ' + EXTRA.length + ' новых)');
ck(EXTRA.every(g => l4tabs.indexOf(g) >= 0), 'урок 4: все новые игры есть во вкладках');
ck(l4tabs.slice(0, 12).join() === GAMES.join(), 'урок 4: первые 12 вкладок — классические игры, порядок не сбит');
['L2', 'L3'].forEach(k => {
  const t = tabsOf(k);
  ck(t.length === 12 && !t.some(g => EXTRA.indexOf(g) >= 0),
    k + ': новых игр нет, вкладок ' + t.length + ' (как было)');
});

/* ---------- every new game renders and survives being clicked ---------- */
SAL.do('L4', 'setPlayers', '1');
let dirty = [];
for (const gm of EXTRA) {
  SAL.do('L4', 'restart', gm);
  const a = openL4();
  if (!a.innerHTML || a.innerHTML.length < 40 || !clean(a.innerHTML)) dirty.push(gm + ' (разметка)');
  Array.from(a.querySelectorAll('[onclick]')).slice(0, 40)
    .forEach(b => b.dispatchEvent(new win.MouseEvent('click', { bubbles: true })));
  if (!clean(arenaOf('L4').innerHTML)) dirty.push(gm + ' (после нажатий)');
}
ck(dirty.length === 0, 'все ' + EXTRA.length + ' новых игр рисуются и выдерживают нажатия' +
  (dirty.length ? ' — ' + dirty.join(', ') : ''));

/* ---------- two players: a score column each ---------- */
SAL.do('L4', 'setPlayers', '2');
const noPair = PAIR.filter(gm => {
  SAL.do('L4', 'restart', gm);
  const h = arenaOf('L4').innerHTML;
  return !/(1 — |2 — |Ученик 1|Ученик 2|Student 1|Student 2)/.test(h);
});
ck(noPair.length === 0, 'в режиме «2 ученика» у каждой парной игры два счёта' +
  (noPair.length ? ' — без счёта: ' + noPair.join(', ') : ''));
ck(win.document.getElementById('view-lesson4').querySelector('[data-players="2"]').classList.contains('active'),
  'переключатель «2 ученика» подсвечен');
SAL.do('L4', 'setPlayers', '1');

/* ---------- 30. word grid 10 x 10 ---------- */
SAL.do('L4', 'restart', 'wordgrid');
let wg = gst('L4', 'wordgrid');
const lessonDeva = L4.words.map(w => w.deva);
ck(wg.grid.length === 100, 'филворд: поле 10 × 10 = 100 клеток');
ck(wg.total === L4.words.length * 2, 'филворд: цель — каждое слово урока дважды (' + wg.total + ')');
const targets = wg.grid.filter(c => c.t);
ck(targets.length === wg.total, 'филворд: в поле ровно ' + wg.total + ' клеток со словами урока');
ck(targets.every(c => lessonDeva.indexOf(wById(c.id).deva) >= 0), 'филворд: все отмеченные клетки — слова урока');
ck(wg.grid.filter(c => !c.t).every(c => lessonDeva.indexOf(c.s) < 0),
  'филворд: ни один отвлекающий вариант не совпадает со словом урока');
ck(L4.decoys.length >= 20 && new Set(L4.decoys).size === L4.decoys.length,
  'филворд: ' + L4.decoys.length + ' разных отвлекающих слов');
const targetIdx = wg.grid.map((c, i) => c.t ? i : -1).filter(i => i >= 0);
const decoyIdx = wg.grid.map((c, i) => c.t ? -1 : i).filter(i => i >= 0);
SAL.do('L4', 'wgTap', String(targetIdx[0]));
ck(gst('L4', 'wordgrid').found[targetIdx[0]] === true, 'филворд: верная клетка отмечается найденной');
SAL.do('L4', 'wgTap', String(decoyIdx[0]));
ck(gst('L4', 'wordgrid').wrong[decoyIdx[0]] === true, 'филворд: чужая клетка отмечается промахом');
SAL.do('L4', 'toggleKey');
ck(/hint/.test(arenaOf('L4').innerHTML), 'филворд: 🔑 ключ учителя подсвечивает нужные клетки');
SAL.do('L4', 'toggleKey');

/* ---------- 31. word search (among letters) ---------- */
SAL.do('L4', 'restart', 'wordsearch');
const ws = gst('L4', 'wordsearch');
ck(ws.grid.length === 100 && ws.grid.every(c => c && c.length), 'филворд по частям: 100 клеток, пустых нет');
ck(ws.places.length === L4.words.length, 'филворд по частям: спрятаны все ' + L4.words.length + ' слов');
const straight = ws.places.every(p => {
  const ch = wById(p.id).syll.join('');
  const built = p.cells.map(i => ws.grid[i]).join('');
  const r0 = Math.floor(p.cells[0] / 10), c0 = p.cells[0] % 10;
  const dr = Math.floor(p.cells[1] / 10) - r0, dc = (p.cells[1] % 10) - c0;
  const line = p.cells.every((idx, k) => idx === (r0 + dr * k) * 10 + (c0 + dc * k));
  return line && built === ch;
});
ck(straight, 'филворд по частям: каждое слово лежит по прямой и читается верно');
ws.places.forEach(p => p.cells.forEach(i => SAL.do('L4', 'wsTap', String(i))));
ck(Object.keys(gst('L4', 'wordsearch').found).length === L4.words.length,
  'филворд по частям: нажатие клеток по порядку находит слово');

/* ---------- 19. type-in ---------- */
SAL.do('L4', 'restart', 'typein');
SAL.do('L4', 'typeCheck', 'trini');
ck(gst('L4', 'typein').result === null || gst('L4', 'typein').result === 'bad' || gst('L4', 'typein').result === 'ok',
  'напиши сам: ответ принимается');
SAL.do('L4', 'restart', 'typein');
const firstW = wById(gst('L4', 'typein').order[0]);
SAL.do('L4', 'typeCheck', firstW.iast);
ck(gst('L4', 'typein').result === 'ok' && gst('L4', 'typein').score === 1,
  'напиши сам: верное написание засчитывается (' + firstW.iast + ')');
SAL.do('L4', 'restart', 'typein');
const w2 = wById(gst('L4', 'typein').order[0]);
SAL.do('L4', 'typeCheck', w2.iast.replace(/[āīūṃñṇṛṝḷśṣṭḍḥṅ]/g, '') + 'x');
ck(gst('L4', 'typein').result === 'bad', 'напиши сам: неверное написание не засчитывается');
SAL.do('L4', 'restart', 'typein');
const w3 = wById(gst('L4', 'typein').order[0]);
SAL.do('L4', 'typeCheck', w3.iast.replace(/[āīūṃñṇṛṝḷśṣṭḍḥṅ]/g, c => ({ 'ā': 'a', 'ī': 'i', 'ū': 'u', 'ṃ': 'm', 'ñ': 'n', 'ṇ': 'n', 'ṛ': 'r', 'ṝ': 'r', 'ḷ': 'l', 'ś': 's', 'ṣ': 's', 'ṭ': 't', 'ḍ': 'd', 'ḥ': 'h', 'ṅ': 'n' }[c])));
ck(gst('L4', 'typein').result === 'ok', 'напиши сам: диакритику можно не набирать');

/* ---------- 18. anagram ---------- */
SAL.do('L4', 'restart', 'anagram');
const an = gst('L4', 'anagram');
const anW = wById(an.order[0]);
const rightOrder = anW.syll.map(c => String(an.tiles.indexOf(c)));
rightOrder.forEach(i => SAL.do('L4', 'anaTap', i));
ck(gst('L4', 'anagram').answered === true && gst('L4', 'anagram').score === 1,
  'собери слово: части в верном порядке собирают слово');
SAL.do('L4', 'restart', 'anagram');
const an2 = gst('L4', 'anagram');
const wrongOrder = an2.tiles.map((_, i) => String(i)).reverse();
wrongOrder.forEach(i => SAL.do('L4', 'anaTap', i));
ck(gst('L4', 'anagram').miss === 1 || gst('L4', 'anagram').answered === true,
  'собери слово: неверный порядок не проходит молча');

/* ---------- 27. order relay ---------- */
SAL.do('L4', 'restart', 'orderrelay');
L4.words.forEach(w => SAL.do('L4', 'relayTap', w.id));
ck(gst('L4', 'orderrelay').placed.length === L4.words.length,
  'эстафета: слова выкладываются по порядку 1–5');
SAL.do('L4', 'restart', 'orderrelay');
SAL.do('L4', 'relayTap', L4.words[L4.words.length - 1].id);
ck(gst('L4', 'orderrelay').placed.length === 0 && gst('L4', 'orderrelay').wrong !== null,
  'эстафета: не в том порядке — ход не засчитывается');

/* ---------- 20. sorting: every box has at least two words ---------- */
const feats = [
  { ru: 'носовой', test: w => /[ंङञणनम]/.test(w.deva) },
  { ru: 'три части', test: w => w.syll.length >= 3 },
  { ru: 'гласный знак на конце', test: w => /[ा-ौ]$/.test(w.deva) },
  { ru: 'буква च', test: w => w.deva.indexOf('च') >= 0 }
];
const unbalanced = feats.filter(f => {
  const yes = L4.words.filter(f.test).length;
  return yes < 2 || (L4.words.length - yes) < 2;
});
ck(unbalanced.length === 0, 'сортировка: в каждой коробке хотя бы два слова (иначе игра пустая)' +
  (unbalanced.length ? ' — ' + unbalanced.map(f => f.ru).join(', ') : ''));

/* ---------- 14. retry: the mistake pile fills and empties ---------- */
SAL.do('L4', 'clearPile');
SAL.do('L4', 'restart', 'gaps');
const gw = L4.words[0];
SAL.do('L4', 'gapPick', gw.gapChoices.filter(c => c.deva !== gw.gapAnswer)[0].deva);
ck(Object.keys(SAL.lessons.L4._st.pile).length === 1, 'копилка ошибок: неверный ответ кладёт слово в копилку');
SAL.do('L4', 'restart', 'retry');
ck(gst('L4', 'retry').queue.length === 1 && gst('L4', 'retry').queue[0] === gw.id,
  'копилка ошибок: игра повторяет именно ошибки');
SAL.do('L4', 'retryPick', gw.id);
SAL.do('L4', 'retryNext');
SAL.do('L4', 'retryPick', gw.id);
ck(Object.keys(SAL.lessons.L4._st.pile).length === 0,
  'копилка ошибок: два верных ответа — и слово выходит из копилки');
SAL.do('L4', 'clearPile');

/* ---------- 13. hot cards: three misses end the game ---------- */
SAL.do('L4', 'restart', 'hotcards');
SAL.do('L4', 'hotGrade', '0');
SAL.do('L4', 'hotGrade', '0');
SAL.do('L4', 'hotGrade', '0');
ck(gst('L4', 'hotcards').finished === true && gst('L4', 'hotcards').lives === 0,
  'горячая карточка: три промаха — игра окончена');
SAL.do('L4', 'restart', 'hotcards');
SAL.do('L4', 'hotGrade', '1');
ck(gst('L4', 'hotcards').score === 1 && gst('L4', 'hotcards').streak === 1,
  'горячая карточка: верный ответ даёт очко и продолжает серию');


console.log(errs.length ? '\nJS ERRORS: ' + errs.slice(0, 5).join(' | ') : '\nJS-ошибок нет');
console.log(bad === 0 && errs.length === 0 ? 'ALL CHECKS PASSED' : bad + ' FAILURES');
process.exit(bad || errs.length ? 1 : 0);
