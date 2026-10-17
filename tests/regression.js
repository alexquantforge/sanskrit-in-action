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
['lesson1.js', 'lesson-engine.js', 'lesson2.js', 'lesson3.js', 'app.js'].forEach(f => {
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

for (const key of ['L2', 'L3']) {
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

  /* ---------- every control is clickable without throwing ---------- */
  for (const m of PRESMODES) { SAL.do(key, 'setPresMode', m); clickAll(win.document.getElementById(key + '-pres-grid')); }
  for (const gm of GAMES) { SAL.do(key, 'setGame', gm); clickAll(arenaOf(key)); }
  for (const m of PRODMODES) { SAL.do(key, 'setProdMode', m); clickAll(stageOf(key)); }
  ck(true, 'все кнопки нажаты без ошибок');
}

/* ---------- lesson order: body (6) -> face (7) -> body+face (12) ---------- */
{
  const order = ['view-lesson1', 'view-lesson2', 'view-lesson3']
    .map(id => win.document.getElementById(id));
  const pos = order.map(p => order.map(q => q.compareDocumentPosition(p)).length);
  ck(order[0].compareDocumentPosition(order[1]) & 4, 'порядок панелей: урок 1 → урок 2 → урок 3');
  ck(order[1].compareDocumentPosition(order[2]) & 4, 'урок 3 (12 слов) стоит последним');
  ck(SAL.lessons.L2.num === 1 && SAL.lessons.L3.num === 2, 'номера в данных: Тело = 1, Лицо = 2');
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

console.log(errs.length ? '\nJS ERRORS: ' + errs.slice(0, 5).join(' | ') : '\nJS-ошибок нет');
console.log(bad === 0 && errs.length === 0 ? 'ALL CHECKS PASSED' : bad + ' FAILURES');
process.exit(bad || errs.length ? 1 : 0);
