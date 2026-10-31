/*
 * Regression harness for the Sanskrit PPP lessons (Lesson 1 untouched, Lessons 2 & 3 engine).
 *
 *   npm init -y && npm install jsdom
 *   node tests/regression.js
 *
 * It boots index.html in jsdom, loads the real scripts and walks every lesson:
 * presentation modes, all 12 practice games, every production mode (lesson 2 has a
 * fifth one — a timed sprint over lessons 1 + 2), plus the
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
['lesson1.js', 'lesson-engine.js', 'lesson2.js', 'lesson3.js', 'lesson4.js', 'lesson5.js',
  'lesson6.js', 'lesson7.js', 'lesson8.js', 'lesson9.js', 'lesson-colors.js',
  'lesson-colors2.js', 'lesson-gender.js', 'lesson-gender2.js', 'games-extra.js', 'app.js'].forEach(f => {
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
const colsFor = n => (n <= 6 ? 3 : (n <= 9 && n % 3 === 0 ? 3 : (n <= 16 ? 4 : 6)));

const GAMES = ['masked', 'flashcards', 'gaps', 'picquiz', 'wordquiz', 'match', 'memory',
  'wronglabel', 'typo', 'categories', 'spelling', 'truefalse'];
const PRESMODES = ['stepbystep', 'hotspots', 'audiofirst', 'poster'];
const PRODMODES = ['sprint', 'mic', 'missingpart', 'chant'];

for (const key of ['L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9']) {
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
  /* production mode 5 — the timed sprint over lessons 1 + 2 — only lesson 2 has it */
  {
    const prodTabs = [...win.document.getElementById('view-lesson' + cfg.num)
      .querySelectorAll('[data-prod-mode]')];
    ck(prodTabs.length === (cfg.unionSprint ? 5 : 4),
      'режимов продакшна: ' + prodTabs.length + (cfg.unionSprint ? ' (пятый — спринт по двум урокам)' : ''));
    if (cfg.unionSprint) {
      SAL.do(key, 'setProdMode', 'union');
      ck(!!stageOf(key).innerHTML.trim(), 'продакшн union (спринт по двум урокам) отрисовывается');
    }
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

  /* ---------- game 10: the category is named on screen ---------- */
  SAL.do(key, 'restart', 'categories'); SAL.do(key, 'setGame', 'categories');
  {
    const titleEl = arenaOf(key).querySelector('.cat-title');
    const want = cfg.categories[0].titleRu;
    ck(!!titleEl && titleEl.textContent.trim() === want,
      'категории: название категории написано — «' + (titleEl ? titleEl.textContent.trim() : 'пусто') + '»');
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

  /* ---------- lesson 2 only: production mode 5 — sprint over lessons 1 + 2 ---------- */
  if (key === 'L3') {
    const body = SAL.lessons.L2, face = SAL.lessons.L3;
    const all13 = body.words.concat(face.words).map(w => w.deva);
    const P = () => cfg._st.prod.union;
    const devaNow = () => {
      const m = stageOf(key).innerHTML.match(/class="vocab-deva"[^>]*>([^<]+)</);
      return m ? m[1].trim() : null;
    };
    const tab5 = [...win.document.getElementById('view-lesson' + cfg.num)
      .querySelectorAll('[data-prod-mode]')].pop().textContent.trim();

    ck(Array.isArray(cfg.unionSprint) && cfg.unionSprint.join() === 'L2,L3',
      'урок 2 объявляет спринт по урокам 1 и 2');
    ck(/13/.test(tab5), 'пятый режим продакшна: в подписи все 13 слов — ' + tab5);

    /* --- one clean run: 13 pictures, lesson 1 first, then lesson 2 --- */
    SAL.do(key, 'setProdMode', 'union');
    SAL.do(key, 'unionRestart');
    SAL.do(key, 'unionDur', '2');
    SAL.do(key, 'unionBegin');
    ck(P().running === true && P().timeLeft === 2, 'спринт по двум урокам: таймер пошёл, 2 с на слово');
    const seen = [];
    for (let r = 0; r < 20 && !P().finished; r++) {
      SAL.do(key, 'unionReveal');
      seen.push(devaNow());
      if (r === 0) {
        const h = stageOf(key).innerHTML;
        ck(/vocab-iast/.test(h), 'спринт: после проверки видно слово и его IAST');
        ck(/unionGrade','0'/.test(h) && /unionGrade','1'/.test(h), 'спринт: оценка ✓ / ✕ на месте');
      }
      SAL.do(key, 'unionGrade', '1');
    }
    ck(seen.join(' · ') === all13.join(' · '),
      'спринт проходит все 13 слов: 6 из урока 1, потом 7 из урока 2');
    ck(P().finished === true && P().score === 13, 'спринт: 13 из 13');
    ck(/🏆/.test(stageOf(key).innerHTML), 'спринт: финальный экран с результатом');
    ck(/Результат|Score/.test(stageOf(key).innerHTML), 'спринт: на финальном экране есть счёт');

    /* --- the countdown runs out by itself: the interval is captured and fired by hand --- */
    SAL.do(key, 'unionRestart');
    SAL.do(key, 'unionDur', '2');
    {
      const realInterval = win.setInterval;
      let tick = null;
      win.setInterval = function (fn) { tick = fn; return 999; };
      SAL.do(key, 'unionBegin');
      win.setInterval = realInterval;
      ck(typeof tick === 'function', 'спринт: секундный таймер заведён');
      if (tick) {
        tick();
        ck(P().timeLeft === 1 && P().elapsed === 1, 'спринт: через секунду осталась 1 с');
        tick();
        ck(P().revealed === true && P().running === false,
          'спринт: время вышло — слово открывается само');
      }
      SAL.do(key, 'unionPause');
    }

    /* --- arrow view: every word is pointed at on the diagram of its own lesson --- */
    SAL.do(key, 'unionRestart');
    SAL.do(key, 'unionVisual', 'arrow');
    SAL.do(key, 'unionBegin');
    for (let r = 0; r < 13 && !P().finished; r++) {
      SAL.do(key, 'unionReveal');
      const h = stageOf(key).innerHTML;
      const deva = devaNow();
      const home = [body, face].find(c => c.words.some(w => w.deva === deva));
      const w = home.words.find(x => x.deva === deva);
      const pin = home.hotspots.figures[0].pins.find(x => x.id === w.id);
      ck(h.indexOf('viewBox="' + home.hotspots.figures[0].viewBox + '"') >= 0,
        deva + ': стрелка — на схеме своего урока');
      const qs = [...h.matchAll(/<text([^>]*)>\s*\?\s*<\/text>/g)]
        .map(m => ({ x: num(m[1], 'x'), y: num(m[1], 'y') }));
      ck(qs.some(q => near(q.x, pin.x, 1) && near(q.y, pin.y, 6)), deva + ': «?» — на поле схемы');
      ck(lines(h).filter(l => l.marker).some(l =>
        near(l.x1, pin.x, 1) && near(l.y1, pin.y, 1) &&
        Math.hypot(l.x2 - pin.tx, l.y2 - pin.ty) < 14),
        deva + ': стрелка указывает на часть тела');
      SAL.do(key, 'unionGrade', '1');
    }

    /* --- shuffled: the same 13 words in another order --- */
    SAL.do(key, 'unionRestart');
    SAL.do(key, 'unionMix', 'shuffle');
    SAL.do(key, 'unionBegin');
    const shuf = [];
    for (let r = 0; r < 13 && !P().finished; r++) {
      SAL.do(key, 'unionReveal');
      shuf.push(devaNow());
      SAL.do(key, 'unionGrade', '1');
    }
    ck(shuf.length === 13 && shuf.slice().sort().join() === all13.slice().sort().join(),
      'спринт вперемешку: те же 13 слов');
    ck(shuf.join() !== all13.join(), 'спринт вперемешку: порядок другой');

    /* --- a miss: no point, the word goes to the pile of its own lesson --- */
    SAL.do(key, 'unionRestart');
    SAL.do(key, 'unionMix', 'ordered');
    SAL.do(key, 'unionBegin');
    SAL.do(key, 'unionReveal');
    {
      const deva = devaNow();
      const w = body.words.find(x => x.deva === deva);
      ck(deva === body.words[0].deva, 'спринт начинается с первого слова урока 1');
      SAL.do(key, 'unionGrade', '0');
      ck(P().score === 0 && P().wrong.join() === w.id, 'спринт: ✕ не даёт очка и запоминает слово');
      ck(!!(body._st.pile && body._st.pile[w.id]), 'спринт: ошибка ушла в копилку ошибок урока 1');
      ck(!(face._st.pile && face._st.pile[w.id]), 'спринт: копилка урока 2 не затронута');
    }

    /* --- leaving for a practice game stops the timer --- */
    SAL.do(key, 'unionBegin');
    SAL.do(key, 'setGame', 'masked');
    ck(P().running === false, 'спринт: уход в игру останавливает таймер');
    SAL.do(key, 'setProdMode', 'sprint');
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
    if (w.syll && w.syll.join('') !== w.deva) broken.push(w.deva + ': слоги не складываются в слово');
  });
  ck(broken.length === 0, key + ': данные слов согласованы (пропуск + ответ = слово, опечатка в одну букву)' +
    (broken.length ? ' — ' + broken.join('; ') : ''));

  /* ---------- lessons 4 and 5: the counting frame must really show the numbers ---------- */
  const ROWS = { L4: [1, 2, 3, 4, 5], L5: [6, 7, 8, 9, 10],
                 L6: [11, 12, 13, 14, 15], L7: [16, 17, 18, 19, 20],
                 L8: [10, 20, 30, 40, 50], L9: [60, 70, 80, 90, 100] };
  if (ROWS[key]) {
    const ROW = ROWS[key];
    const BEAD = /<circle cx="([\d.]+)" cy="([\d.]+)" r="[\d.]+" fill="#F59E0B"/g;
    const DIGIT = /<text x="([\d.]+)" y="([\d.]+)"[^>]*>(\d+)<\/text>/g;
    const fig = cfg.hotspots.figures[0];
    const past = ROW[ROW.length - 1] > 10;   /* past ten, beads cannot be counted at a glance */
    if (past) {
      const marks = [...fig.art.matchAll(DIGIT)].map(m => ({ x: +m[1], y: +m[2], n: +m[3] }));
      ck(marks.length === ROW.length && marks.every((m, i) => m.n === ROW[i]),
        'урок ' + cfg.num + ': таблица чисел показывает ' + ROW.join(', ') + ' (найдено ' +
        marks.map(m => m.n).join(', ') + ')');
      ck(fig.pins.every((p, i) => marks[i] && marks[i].x === p.tx && marks[i].y === p.ty),
        'урок ' + cfg.num + ': мишень каждого пина попадает в свою цифру');
      ck(cfg.words.every((w, i) => {
        const d = [...w.svg.matchAll(DIGIT)];
        return d.length === 1 && +d[0][3] === ROW[i];
      }), 'урок ' + cfg.num + ': на карточке арабская цифра, сколько и означает числительное');
      ck(!cfg.words.some(w => /fill="#F59E0B"/.test(w.svg)) && !/fill="#F59E0B"/.test(fig.art),
        'урок ' + cfg.num + ': бусин нет — на числах больше десяти их не сосчитать');
    } else {
      const beads = [...fig.art.matchAll(BEAD)].map(m => ({ x: +m[1], y: +m[2] }));
      const sum = ROW.reduce((a, b) => a + b, 0);
      ck(beads.length === sum,
        'урок ' + cfg.num + ': на счётах ' + sum + ' бусин (' + ROW.join('+') + '), найдено ' + beads.length);
      let rowsOk = true;
      fig.pins.forEach((p, i) => {
        const row = beads.filter(b => b.y === p.ty);
        if (row.length !== ROW[i] || !row.some(b => b.x === p.tx)) rowsOk = false;
      });
      ck(rowsOk, 'урок ' + cfg.num + ': в ряду N ровно N бусин и мишень попадает в бусину своего ряда');
      ck(cfg.words.every((w, i) => [...w.svg.matchAll(BEAD)].length === ROW[i]),
        'урок ' + cfg.num + ': на карточке столько бусин, сколько означает числительное');
      ck(!cfg.words.some(w => /<text[^>]*>\d+<\/text>/.test(w.svg)),
        'урок ' + cfg.num + ': цифр нет, только бусины (до десяти считаем на глаз)');
    }
    const sets = cfg.categories.map(c => c.wordIds.slice().sort().join('|'));
    ck(cfg.categories.every(c => c.wordIds.length >= 2),
      'урок ' + cfg.num + ': в каждой категории хотя бы два слова (иначе игра не имеет смысла)');
    ck(new Set(sets).size === sets.length,
      'урок ' + cfg.num + ': у всех ' + sets.length + ' категорий разные наборы слов');
    ck(cfg.sortFeatures && cfg.sortFeatures.length >= 3 &&
      cfg.sortFeatures.every(f => cfg.words.some(w => f.test(w)) && cfg.words.some(w => !f.test(w))),
      'урок ' + cfg.num + ': вопросы сортировки делят слова и на «да», и на «нет»');
  }

  /* ---------- every control is clickable without throwing ---------- */
  for (const m of PRESMODES) { SAL.do(key, 'setPresMode', m); clickAll(win.document.getElementById(key + '-pres-grid')); }
  for (const gm of GAMES) { SAL.do(key, 'setGame', gm); clickAll(arenaOf(key)); }
  for (const m of PRODMODES) { SAL.do(key, 'setProdMode', m); clickAll(stageOf(key)); }
  ck(true, 'все кнопки нажаты без ошибок');
}

/* ---------- lesson order: body (6) -> face (7) -> colours (6) -> more colours (6) -> body+face (12) -> numbers ---------- */
{
  const order = ['view-lesson1', 'view-lesson2', 'view-lesson3', 'view-lesson4', 'view-lesson5',
                 'view-lesson6', 'view-lesson7', 'view-lesson8', 'view-lesson9', 'view-lesson10',
                 'view-lesson11', 'view-lesson12', 'view-lesson13']
    .map(id => win.document.getElementById(id));
  SAL.openLesson('LC2');   /* панель урока 4 строится движком — собираем её заранее */
  ck(order.every(Boolean), 'все тринадцать панелей урока есть на странице');
  for (let i = 0; i < order.length - 1; i++) {
    ck(order[i].compareDocumentPosition(order[i + 1]) & 4,
      'порядок панелей: урок ' + (i + 1) + ' → урок ' + (i + 2));
  }
  ck(SAL.lessons.L2.num === 1 && SAL.lessons.L3.num === 2 && SAL.lessons.LC.num === 3 &&
     SAL.lessons.LC2.num === 4 && SAL.lessons.LG.num === 5 && SAL.lessons.LG2.num === 6 &&
     SAL.lessons.L4.num === 8 && SAL.lessons.L5.num === 9 &&
     SAL.lessons.L6.num === 10 && SAL.lessons.L7.num === 11 && SAL.lessons.L8.num === 12 &&
     SAL.lessons.L9.num === 13,
    'номера в данных: Тело = 1, Лицо = 2, Цвета = 3, Ещё цвета = 4, Три рода = 5, рода·цвета = 6, 12 частей = 7, 1–5 = 8, 6–10 = 9, 11–15 = 10, 16–20 = 11, десятки = 12 и 13');
  /* урок 5 — «Три рода» (движок), урок 7 — написанная вручную страница из 12 слов */
  ck(/УРОК 4 · CAMBRIDGE PPP/.test(win.document.getElementById('view-lesson4').textContent),
    'слот 4 — урок «Ещё цвета», помечен как УРОК 4');
  ck(win.document.getElementById('view-lesson4').textContent.indexOf('वर्णाः — Ещё цвета') >= 0,
    'слот 4: заголовок वर्णाः — Ещё цвета');
  ck(/УРОК 7 · CAMBRIDGE PPP/.test(win.document.getElementById('view-lesson7').textContent),
    'слот 7 — 12 слов, помечен как УРОК 7');
  ck(['नयन', 'नासिका', 'जिह्वा', 'कर्ण', 'शीर्ष', 'ललाट', 'भ्रू', 'ओष्ठ', 'कर', 'पाद', 'दन्त', 'अङ्गुली']
    .every(w => win.document.getElementById('view-lesson7').innerHTML.indexOf(w) >= 0),
    'слот 7: все 12 слов на месте');
  ck(/Урок 8: Цифры 1–5/.test(win.document.getElementById('view-lesson8').textContent), 'слот 8 — Цифры 1–5');
  ck(/सङ्ख्याः/.test(win.document.getElementById('view-lesson8').innerHTML), 'слот 8: заголовок सङ्ख्याः');
  const w4 = SAL.lessons.L4.words.map(w => w.deva).join(' ');
  ck(w4 === 'एकम् द्वे त्रीणि चत्वारि पञ्च', 'урок 8: ровно пять числительных — ' + w4);
  ck(/Урок 9: Цифры 6–10/.test(win.document.getElementById('view-lesson9').textContent), 'слот 9 — Цифры 6–10');
  ck(/Урок 10: Цифры 11–15/.test(win.document.getElementById('view-lesson10').textContent), 'слот 10 — Цифры 11–15');
  ck(/Урок 11: Цифры 16–20/.test(win.document.getElementById('view-lesson11').textContent), 'слот 11 — Цифры 16–20');
  ck(/Урок 12: Десятки 10–50/.test(win.document.getElementById('view-lesson12').textContent), 'слот 12 — Десятки 10–50');
  ck(/Урок 13: Десятки 60–100/.test(win.document.getElementById('view-lesson13').textContent), 'слот 13 — Десятки 60–100');
  const w5list = SAL.lessons.L5.words.map(w => w.deva).join(' ');
  ck(w5list === 'षट् सप्त अष्ट नव दश', 'урок 9: ровно пять числительных — ' + w5list);
  ck(/Урок 1: Тело/.test(win.document.getElementById('view-lesson1').textContent), 'слот 1 — Тело (6 слов)');
  ck(/Урок 2: Лицо/.test(win.document.getElementById('view-lesson2').textContent), 'слот 2 — Лицо (7 слов)');
  SAL.openLesson('LC');
  ck(/УРОК 3 · CAMBRIDGE PPP/.test(win.document.getElementById('view-lesson3').textContent), 'слот 3 — цвета, помечен как УРОК 3');
}

/* ---------- внизу каждого урока: «← Предыдущий урок / Следующий урок →» ---------- */
console.log('\n===== Кнопки предыдущего и следующего урока =====');
{
  const ORDER = ['L2', 'L3', 'LC', 'LC2', 'LG', 'LG2', 'lesson7', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'];
  const paneOf = key => win.document.getElementById(
    'view-lesson' + (key === 'lesson7' ? 7 : SAL.lessons[key].num));
  const pagerOf = key => paneOf(key).querySelector('[data-lesson-pager]');
  const linksOf = key => [...pagerOf(key).querySelectorAll('.lesson-pager-btn')]
    .map(b => b.getAttribute('data-goto'));

  /* панели всех уроков должны быть построены — проходим по всем урокам */
  Object.keys(SAL.lessons).forEach(k => { if (!SAL.lessons[k].hidden) SAL.openLesson(k); });

  const missing = ORDER.filter(k => !pagerOf(k));
  ck(missing.length === 0, 'у каждого урока внизу есть блок перехода к соседним урокам' +
    (missing.length ? ' — нет у ' + missing.join(', ') : ''));

  const notLast = ORDER.filter(k => {
    const pane = paneOf(k);
    const nodes = [...pane.children].filter(el => el.className !== 'lesson-pager' || el.hasAttribute('data-lesson-pager'));
    return nodes[nodes.length - 1] !== pagerOf(k);
  });
  ck(notLast.length === 0, 'кнопки стоят в самом низу страницы урока' +
    (notLast.length ? ' — не внизу у ' + notLast.join(', ') : ''));

  /* цепочка: у урока N предыдущий — N-1, следующий — N+1 */
  const wrongLinks = [];
  ORDER.forEach((k, i) => {
    const want = [];
    if (i > 0) want.push(ORDER[i - 1]);
    want.push(i < ORDER.length - 1 ? ORDER[i + 1] : null);
    const got = linksOf(k);
    const expect = want.filter(Boolean);
    if (got.join() !== expect.join()) wrongLinks.push(k + ': ' + got.join('/') + ' вместо ' + expect.join('/'));
  });
  ck(wrongLinks.length === 0, 'кнопки ведут на соседние уроки по порядку 1 … 13' +
    (wrongLinks.length ? ' — ' + wrongLinks.join('; ') : ''));

  ck(linksOf('L2').join() === 'L3' && linksOf('L9').join() === 'L8',
    'у первого урока только «следующий», у последнего — только «предыдущий»');
  ck(linksOf('LG').join() === 'LC2,LG2' && linksOf('LG2').join() === 'LG,lesson7' &&
     linksOf('lesson7').join() === 'LG2,L4',
    'урок рода ведёт ко второму уроку рода, тот — к 12 частям тела, а 12 частей — к числам: ' +
    linksOf('LG').join(' / ') + ' · ' + linksOf('LG2').join(' / ') + ' · ' + linksOf('lesson7').join(' / '));

  /* подписи: стрелка, название кнопки и номер урока */
  const l2btns = [...pagerOf('L2').querySelectorAll('.lesson-pager-btn')];
  ck(/^Следующий урок →/.test(l2btns[0].querySelector('.lesson-pager-cap').textContent.trim()) &&
     /Урок 2: Лицо/.test(l2btns[0].querySelector('.lesson-pager-name').textContent),
    'кнопка подписана «Следующий урок →» и называет урок: ' +
    l2btns[0].textContent.replace(/\s+/g, ' ').trim());
  const lgBtns = [...pagerOf('LG').querySelectorAll('.lesson-pager-btn')];
  ck(/^← Предыдущий урок/.test(lgBtns[0].querySelector('.lesson-pager-cap').textContent.trim()) &&
     /Урок 4: Ещё цвета/.test(lgBtns[0].querySelector('.lesson-pager-name').textContent),
    'кнопка «← Предыдущий урок» называет урок: ' + lgBtns[0].textContent.replace(/\s+/g, ' ').trim());

  /* нажатие действительно открывает соседний урок */
  SAL.openLesson('LG');
  ck(win.document.getElementById('view-lesson5').style.display !== 'none',
    'перед нажатием открыт урок 5');
  pagerOf('LG').querySelector('.lesson-pager-btn.next').click();
  ck(win.document.getElementById('view-lesson6').style.display !== 'none' &&
     win.document.getElementById('view-lesson5').style.display === 'none',
    'нажатие «Следующий урок» в уроке 5 открывает урок 6 — второй урок рода');
  pagerOf('LG2').querySelectorAll('.lesson-pager-btn')[0].click();
  ck(win.document.getElementById('view-lesson5').style.display !== 'none',
    'нажатие «Предыдущий урок» в уроке 6 возвращает в урок 5');
  pagerOf('lesson7').querySelectorAll('.lesson-pager-btn')[0].click();
  ck(win.document.getElementById('view-lesson6').style.display !== 'none',
    'нажатие «Предыдущий урок» в уроке 7 ведёт в урок 6');
  pagerOf('LG').querySelectorAll('.lesson-pager-btn')[0].click();
  ck(win.document.getElementById('view-lesson4').style.display !== 'none',
    'нажатие «Предыдущий урок» в уроке 5 открывает урок 4');

  /* по-английски кнопки переведены, кириллицы нет */
  win.setLanguage('en');
  const enCaps = ORDER.map(k => [...pagerOf(k).querySelectorAll('.lesson-pager-btn')]
    .map(b => b.querySelector('.lesson-pager-cap').textContent.trim()).join(' | ')).join(' · ');
  ck(!/[\u0400-\u04FF]/.test(enCaps) && /Previous lesson/.test(enCaps) && /Next lesson/.test(enCaps),
    'английская версия: кнопки подписаны по-английски — ' + enCaps.slice(0, 80) + '…');
  const enLg = [...pagerOf('LG').querySelectorAll('.lesson-pager-name')].map(e => e.textContent.trim()).join(' | ');
  ck(/Lesson 4: More Colours/.test(enLg) && /Lesson 6: Three Genders · More Colours/.test(enLg),
    'английская версия: названия соседних уроков тоже по-английски — ' + enLg);
  const enLg2 = [...pagerOf('LG2').querySelectorAll('.lesson-pager-name')].map(e => e.textContent.trim()).join(' | ');
  ck(/Lesson 5: Three Genders/.test(enLg2) && /Lesson 7: Body Parts/.test(enLg2),
    'урок 6 по-английски: соседи названы по-английски — ' + enLg2);
  win.setLanguage('ru');
  const ruBack = [...pagerOf('LG').querySelectorAll('.lesson-pager-cap')].map(e => e.textContent.trim()).join(' | ');
  ck(/Предыдущий урок/.test(ruBack) && /Следующий урок/.test(ruBack),
    'после возврата языка кнопки снова по-русски — ' + ruBack);
  SAL.openLesson('L2');
}

/* ---------- Lesson 5 (the 12-word lesson): same letters and memory squares ---------- */
win.switchView('lesson7');
const l1 = win.document.getElementById('view-lesson7').innerHTML;
ck(['नयन', 'नासिका', 'जिह्वा', 'कर्ण', 'शीर्ष', 'ललाट', 'भ्रू', 'ओष्ठ', 'कर', 'पाद', 'दन्त', 'अङ्गुली']
  .every(w => l1.indexOf(w) >= 0), 'урок 7 (12 слов): все 12 слов на месте');

console.log('\n===== L1 · 12 слов (урок 7) =====');
const l1arena = win.document.getElementById('lesson1-practice-arena');
for (const [gm, n] of [['gaps', 4], ['picquiz', 4], ['wordquiz', 4], ['spelling', 4],
                       ['truefalse', 2], ['wronglabel', 3], ['typo', 3]]) {
  win.selectPracticeGame(gm);
  const got = [...l1arena.querySelectorAll('.quiz-opt-btn')]
    .map(b => { const sp = b.querySelector('.opt-letter'); return sp ? sp.textContent.trim() : null; });
  ck(got.length === n && got.every((v, i) => v === LETTERS[i]), 'урок 7 (12 слов): буквы в игре ' + gm + ': ' + JSON.stringify(got));
}
for (const pairs of [6, 12]) {
  win.setMemoryPairsCount(pairs);
  win.selectPracticeGame('memory');
  const cards = [...l1arena.querySelectorAll('.memory-card')];
  const cols = 4;                       // .memory-grid in styles.css
  const backs = cards.map(b => { const sp = b.querySelector('.memory-coord'); return sp ? sp.textContent.trim() : null; });
  const want = cards.map((_, i) => LETTERS[Math.floor(i / cols)].toLowerCase() + ((i % cols) + 1));
  ck(cards.length === pairs * 2, 'урок 7 (12 слов): мемори на ' + pairs * 2 + ' карточек');
  ck(backs.every((v, i) => v === want[i]), 'урок 7 (12 слов): координаты рубашек ' + backs.join(' '));
}
ck(/Называйте карточку по клетке|Name the card by its square/.test(l1arena.textContent),
  'урок 7 (12 слов): подсказка про букву ряда и номер столбца');
win.setLanguage('en'); win.setLanguage('ru');
ck(true, 'переключение RU/EN работает');


/* ---------- Lesson 3 (colours): a carbon copy of Lesson 2 ---------- */
console.log('\n===== Урок 3: цвета =====');
{
  SAL.openLesson('L3');
  SAL.openLesson('LC');
  const tabsFor = k => [...win.document.querySelectorAll('#view-lesson' + SAL.lessons[k].num +
    ' .practice-tab-btn:not([data-rc-game]):not([data-rc-prod])')].map(b => b.textContent.trim())
    .map(t => t.replace(/\(\d+\)/g, '(N)')
               .replace(/\b\d+\/\d+\b/g, 'N/N')
               .replace(/все \d+ слов/g, 'все N слов')
               .replace(/из \d+\)/g, 'из N)')
               .replace(/(Спринт|Sprint): [^⏱]*⏱/g, '$1: … ⏱'));
  const prodFor = k => [...win.document.querySelectorAll('#view-lesson' + SAL.lessons[k].num +
    ' .practice-tab-btn[data-prod-mode]')].map(b => b.getAttribute('data-prod-mode'));
  const l2tabs = tabsFor('L3');
  const l3tabs = tabsFor('LC');
  const l3games = l3tabs.filter(t => !/^(1\. Спринт на время|2\. Произнеси в микрофон|3\. Что пропало|4\. Ритм-чант|5\. Спринт)/.test(t));
  const l2games = l2tabs.filter(t => !/^(1\. Спринт на время|2\. Произнеси в микрофон|3\. Что пропало|4\. Ритм-чант|5\. Спринт)/.test(t));
  ck(l2games.length === 18 && l3games.length === 18 &&
     l2games.join('|') === l3games.join('|'),
    'урок 3: 18 игр Practice — те же и в том же порядке, что у урока 2');
  /* Production у урока цветов короче: сквозного спринта по трём урокам там нет */
  ck(prodFor('L3').join() === 'sprint,mic,missingpart,chant,union',
    'урок 2: пять режимов Production, последний — спринт по двум урокам');
  ck(prodFor('LC').join() === 'sprint,mic,missingpart,chant',
    'урок 3: четыре режима Production — без сквозного спринта (всего вкладок ' + l3tabs.length + ')');
  const gamesOf = k => [...win.document.querySelectorAll('#view-lesson' + SAL.lessons[k].num +
    ' .practice-tab-btn[data-game]')].map(b => b.getAttribute('data-game'));
  ck(gamesOf('LC').join() === GAMES.concat(['wordgrid', 'wordsearch']).join(),
    'урок 3: те же 14 игр в том же порядке');
  const w = SAL.lessons.LC.words.map(x => x.deva).join(' ');
  ck(w === 'श्वेत कृष्ण रक्त नील श्याम गौर', 'урок 3: шесть цветов — ' + w);
  ck(SAL.lessons.LC.words.every(x => x.iast && x.typoDeva && x.typoIast && x.svg),
    'урок 3: у каждого цвета есть IAST, опечатка и картинка');
  /* श्याम — цвет грозовой тучи, тёмно-синий (а не зелёный) */
  const shyamaCard = SAL.lessons.LC.words.filter(x => x.id === 'shyama')[0];
  ck(/#1F3A5F/.test(shyamaCard.svg) && !/#14532D|#86EFAC/i.test(shyamaCard.svg),
    'श्याम нарисован грозовым тёмно-синим, зелёного в карточке нет');
  ck(/грозов/i.test(SAL.lessons.LC.topicRu) && /storm/i.test(SAL.lessons.LC.topicEn),
    'описание урока говорит про грозовую тучу');
  /* цвет нельзя «показать у себя» — Production зовёт только назвать слова */
  SAL.openLesson('LC');
  const prodH2 = [...win.document.querySelectorAll('#view-lesson3 h2.section-title')]
    .map(h => h.textContent.trim());
  ck(prodH2[prodH2.length - 1] === 'Живая речь: назовите вслух все 6 слов',
    'урок 3: заголовок Production — «' + prodH2[prodH2.length - 1] + '»');
  ck(win.document.getElementById('view-lesson3').textContent.indexOf('покажите у себя') < 0 &&
     win.document.getElementById('view-lesson3').textContent.indexOf('коснитесь этой части тела') < 0,
    'урок 3: ни в заголовке, ни в подсказках нет «покажите у себя»');
  const prodDesc = [...win.document.querySelectorAll('#view-lesson3 .section-desc')].pop().textContent.trim();
  ck(prodDesc.indexOf('выберите слово и уверенно произнесите') >= 0,
    'урок 3: описание этапа без жеста — «' + prodDesc.slice(0, 80) + '…»');
  SAL.do('LC', 'setProdMode', 'sprint');
  ck(/ДО окончания таймера:/.test(win.document.getElementById('LC-production-stage').textContent.trim()),
    'урок 3: спринт просит назвать слово, без скобок с жестом');
  win.setLanguage('en');
  ck([...win.document.querySelectorAll('#view-lesson3 h2.section-title')].pop().textContent.trim() ===
     'Freer Production: Say All 6 Words Aloud', 'EN: заголовок Production переведён');
  win.setLanguage('ru');
  /* у урока цветов ровно четыре режима Production — сквозного спринта нет */
  SAL.openLesson('LC');
  ck(!SAL.lessons.LC.unionSprint, 'урок 3: сквозного спринта по урокам нет');
  const lcProd = [...win.document.querySelectorAll('#view-lesson3 [data-prod-mode]')]
    .map(b => b.getAttribute('data-prod-mode'));
  ck(lcProd.join() === 'sprint,mic,missingpart,chant',
    'урок 3: четыре режима Production — ' + lcProd.join(', '));
  ck(!win.document.querySelector('#view-lesson3 [data-prod-mode="union"]'),
    'урок 3: пятой вкладки «Спринт: Тело + Лицо + Цвета» больше нет');
  /* «Что пропало?»: пропавший цвет оставляет пустое место, а не белый шарик */
  SAL.do('LC', 'setProdMode', 'missingpart');
  const missStage = win.document.getElementById('LC-production-stage');
  const missSvg = missStage.querySelector('svg').innerHTML;
  ck(/<circle[^>]*r="35"[^>]*fill="#FDF6EC"/.test(missSvg),
    'урок 3: на месте пропавшего цвета — дырка цвета фона, шарика нет');
  const missPinId = SAL.lessons.LC._st.prod.missing.i;
  ck(missPinId === 0, 'урок 3: «Что пропало?» начинается с первого пина');
  const holeIdx = missSvg.indexOf('r="35"');
  const markerIdx = missSvg.indexOf('stroke-dasharray="3,2"');
  ck(holeIdx > 0 && markerIdx > holeIdx, 'урок 3: дырка нарисована до знака «?», он виден поверх');
  SAL.do('LC', 'missingReveal');
  ck(/श्वेत/.test(win.document.getElementById('LC-production-stage').textContent),
    'урок 3: после проверки показан пропавший цвет — श्वेत');
  SAL.do('LC', 'missingRestart');   /* возвращаем основной урок в исходное состояние */

  SAL.do('LC', 'setProdMode', 'sprint');
  ck(!!win.document.getElementById('LC-production-stage').innerHTML.trim(),
    'урок 3: спринт по своим словам отрисовывается');
  /* филворды на своих данных */
  SAL.do('LC', 'restart', 'wordsearch');
  const ws3 = SAL.lessons.LC._st.g.wordsearch;
  ck(ws3.grid.length === 100 && ws3.places.length === 6, 'урок 3: в филворде все 6 цветов');
  ck(ws3.places.every(pl => pl.cells.map(i => ws3.grid[i]).join('') ===
    SAL.lessons.LC.words.filter(x => x.id === pl.id)[0].deva),
    'урок 3: каждое слово читается в сетке верно');
  SAL.do('LC', 'restart', 'wordgrid');
  ck(SAL.lessons.LC._st.g.wordgrid.grid.length === 100, 'урок 3: второй филворд тоже 10 × 10');
  SAL.do('LC', 'wgSize', '5');
  ck(SAL.lessons.LC._st.g.wordgrid.grid.length === 25, 'урок 3: размер поля переключается до 5 × 5');
  SAL.do('LC', 'restart', 'wordsearch');
  SAL.do('LC', 'wsSize', '6');
  ck(SAL.lessons.LC._st.g.wordsearch.grid.length === 36, 'урок 3: и второй филворд меняет размер');
  /* подписи режимов Production переводятся вместе с сайтом */
  win.setLanguage('en');
  const chantTabEn = win.document.querySelector('#view-lesson3 [data-prod-mode="chant"]');
  ck(chantTabEn && chantTabEn.textContent.trim() === '4. TPR Chant & Checklist 6/6 ↑↓',
    'урок 3: подпись ритм-чанта переведена на английский — ' + (chantTabEn && chantTabEn.textContent.trim()));
  win.setLanguage('ru');
  /* панель пересобирается при смене языка, поэтому узел берём заново */
  const chantTabRu = win.document.querySelector('#view-lesson3 [data-prod-mode="chant"]');
  ck(chantTabRu && chantTabRu.textContent.trim() === '4. Ритм-чант и Чек-лист 6/6 ↑↓',
    'урок 3: и возвращается на русский');
}


/* ---------- Lesson 3 · recycling: colour + body part ---------- */
console.log('\n===== Урок 3: повторение «цвет + часть тела» =====');
{
  const rc = SAL.lessons.LC.recycle;
  const shim = win.SAL.recycleCfg('LC');
  const WANT = ['गौर-शीर्ष', 'नील-नयन', 'श्वेत-दन्त', 'कृष्ण-पाद', 'रक्त-मुख', 'श्याम-उदर'];
  ck(!!rc && !!shim && shim.words.length === 6, 'урок 3: блок повторения из 6 сдвоенных слов');
  ck(shim.words.map(w => w.deva).join(' ') === WANT.join(' '),
    'компаунды: ' + shim.words.map(w => w.deva).join(' '));
  ck(shim.words.every(w => w.deva.indexOf('-') > 0 && w.iast.indexOf('-') > 0),
    'каждое слово записано через тире — и в деванагари, и в IAST');
  ck(shim.words.every(w => w.syll && w.syll.join('') === w.deva),
    'слово нарезано на части, которые складываются обратно');
  ck(!SAL.lessons.LCRC, 'служебная конфигурация повторения не попадает в список уроков');
  const belly = shim.words.filter(w => w.id === 'shyamaudara')[0];
  ck(/#1F3A5F/.test(belly.svg) && !/#14532D|#86EFAC/i.test(belly.svg),
    'श्याम-उदर: живот того же грозового тёмно-синего цвета, без зелёного');
  /* на карточке живота нет головы и жёлтого кружка сверху — только силуэт торса */
  ck(!/#FDE68A|#F59E0B/i.test(belly.svg), 'श्याम-उदर: сверху нет жёлтого кружка');
  ck(!/<circle[^>]*cy="19"/.test(belly.svg), 'श्याम-उदर: головы над животом нет — карточка без лишних деталей');

  /* данные согласованы так же, как у слов основного урока */
  const nospace = t => String(t).replace(/[\s\u200d\u200c]/g, '');
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
  shim.words.forEach(w => {
    if (w.maskedPrefix + w.maskedHidden !== w.deva) broken.push(w.deva + ': masked');
    if (nospace(w.gapDeva).replace('_', w.gapAnswer) !== w.deva) broken.push(w.deva + ': gap');
    if (nospace(w.missingDisplay).replace('_', w.missingAnswer) !== w.deva) broken.push(w.deva + ': missing');
    if (!w.gapChoices.some(c => c.deva === w.gapAnswer)) broken.push(w.deva + ': gapChoices');
    if (!w.missingChoices.includes(w.missingAnswer)) broken.push(w.deva + ': missingChoices');
    if (editDist(w.deva, w.typoDeva) !== 1) broken.push(w.deva + ': опечатка не в одну букву');
    if (!w.svg || !w.iast) broken.push(w.deva + ': нет картинки или IAST');
  });
  ck(broken.length === 0, 'данные компаундов согласованы (тире, пропуски, опечатка в одну букву)' +
    (broken.length ? ' — ' + broken.join('; ') : ''));

  /* блок в Practice: те же вкладки, своя арена */
  SAL.openLesson('LC');
  const pane = win.document.getElementById('view-lesson3');
  const rcArena = win.document.getElementById('LCRC-practice-arena');
  const rcStage = win.document.getElementById('LCRC-production-stage');
  const mainArena = win.document.getElementById('LC-practice-arena');
  ck(!!rcArena && !!rcStage, 'у блока повторения свои арены в Practice и Production');
  ck(pane.querySelectorAll('[data-rc-game]').length === 14, 'в Practice повторения — те же 14 игр');
  ck(rcArena.innerHTML.length > 500, 'игра повторения отрисована сразу');
  ck(pane.querySelector('[data-rc-game="masked"]').classList.contains('active'),
    'открыта та же первая игра — «Закрыто квадратом»');

  /* каждая вкладка переключается и не ломает основной урок */
  const mainGameBefore = SAL.lessons.LC._st.game;
  const badRc = [];
  ['masked', 'flashcards', 'gaps', 'picquiz', 'wordquiz', 'match', 'memory',
   'wronglabel', 'typo', 'categories', 'spelling', 'truefalse', 'wordgrid', 'wordsearch'].forEach(gm => {
    SAL.do('LC', 'rcGame', gm);
    if (!rcArena.innerHTML.trim()) badRc.push(gm + ' (пусто)');
    if (rcArena.textContent.indexOf('undefined') >= 0 || rcArena.textContent.indexOf('NaN') >= 0) badRc.push(gm + ' (мусор)');
    if (!pane.querySelector('[data-rc-game="' + gm + '"]').classList.contains('active')) badRc.push(gm + ' (вкладка не активна)');
  });
  ck(badRc.length === 0, 'все 14 игр повторения открываются' + (badRc.length ? ' — ' + badRc.join(', ') : ''));
  ck(SAL.lessons.LC._st.game === mainGameBefore, 'переключение игр повторения не трогает основной урок');
  ck(mainArena.textContent.indexOf('गौर-शीर्ष') < 0, 'в основной арене нет компаундов — блок отдельный');
  ck(rcArena.textContent.indexOf('गौर-शीर्ष') >= 0 || rcArena.textContent.indexOf('गौर') >= 0,
    'в арене повторения — составные слова');

  /* правильный ответ в Fill in the Gaps (действия идут по ключу LCRC) */
  SAL.do('LC', 'rcGame', 'gaps');
  const gGap = shim._st.g.gaps;
  const wGap = shim.words[gGap.i];
  SAL.do('LCRC', 'gapPick', wGap.gapAnswer);
  ck(shim._st.g.gaps.answered === true && shim._st.g.gaps.score === 1,
    'ответ в игре повторения засчитывается (' + wGap.deva + ')');
  ck(SAL.lessons.LC._st.g.gaps === undefined || SAL.lessons.LC._st.g.gaps.score !== 1,
    'очко не утекает в основной урок');

  /* филворды на компаундах: тире — тоже клетка поля, слово читается целиком */
  SAL.do('LCRC', 'restart', 'wordsearch');
  const rcWs = shim._st.g.wordsearch;
  ck(rcWs.grid.length === 100 && rcWs.places.length === 6, 'повторение: в филворде все 6 компаундов');
  ck(rcWs.places.every(pl => pl.cells.map(i => rcWs.grid[i]).join('') ===
    shim.words.filter(x => x.id === pl.id)[0].deva), 'повторение: слово читается в сетке целиком, вместе с тире');
  const rcPlace = rcWs.places[0];
  rcPlace.cells.forEach(i => SAL.do('LCRC', 'wsTap', String(i)));
  ck(shim._st.g.wordsearch.found[rcPlace.id] === true, 'повторение: нажатие клеток находит компаунд');
  ck((shim._st.g.wordsearch.twins || []).length >= 2, 'повторение: у компаундов есть двойники-ловушки');
  SAL.do('LCRC', 'wsSize', '6');
  ck(shim._st.g.wordsearch.grid.length === 36, 'повторение: размер поля переключается');
  SAL.do('LCRC', 'restart', 'wordgrid');
  ck(shim._st.g.wordgrid.grid.length === 100 && shim._st.g.wordgrid.total === 12,
    'повторение: второй филворд 10 × 10, цель — каждое слово дважды');

  /* блок в Production: те же 4 режима и свои арены */
  const prodModes = [...pane.querySelectorAll('[data-rc-prod]')].map(b => b.getAttribute('data-rc-prod'));
  ck(prodModes.join() === 'sprint,mic,missingpart,chant', 'в Production повторения — 4 режима: ' + prodModes.join(', '));
  const badProd = [];
  prodModes.forEach(m => {
    SAL.do('LC', 'rcProd', m);
    if (!rcStage.innerHTML.trim()) badProd.push(m + ' (пусто)');
    if (!pane.querySelector('[data-rc-prod="' + m + '"]').classList.contains('active')) badProd.push(m + ' (вкладка не активна)');
  });
  ck(badProd.length === 0, 'все режимы Production повторения отрисовываются' + (badProd.length ? ' — ' + badProd.join(', ') : ''));
  SAL.do('LC', 'rcProd', 'sprint');
  SAL.do('LCRC', 'sprintVisual', 'arrow');
  ck(rcStage.innerHTML.indexOf('sprint-arrow-head-LCRC') >= 0, 'повторение: спринт умеет показывать стрелку на схеме');
  SAL.do('LCRC', 'sprintVisual', 'card');
  SAL.do('LCRC', 'sprintBegin');
  ck(shim._st.prod.sprint.running === true || shim._st.prod.sprint.started === true,
    'повторение: таймер спринта запускается');
  SAL.do('LCRC', 'sprintRestart');
  SAL.do('LC', 'rcProd', 'missingpart');
  SAL.do('LCRC', 'missingReveal');
  ck(rcStage.textContent.indexOf('गौर-शीर्ष') >= 0 || rcStage.textContent.indexOf('नील-नयन') >= 0,
    'повторение: «Что пропало?» показывает компаунд после проверки');
  ck(!SAL.lessons.LC._st.prod.missing || SAL.lessons.LC._st.prod.missing.revealed !== true,
    'режимы Production повторения не меняют основной урок');

  /* язык: заголовок блока и подписи вкладок переводятся */
  win.setLanguage('en');
  ck(/RECYCLING · LESSONS 1–2/.test(win.document.getElementById('LC-recycle-practice').textContent),
    'повторение: бейдж переводится на английский');
  ck(pane.querySelector('[data-rc-game="masked"]').textContent.trim() === '1. Covered Square ■ (Guess Word)',
    'повторение: подписи игр переводятся');
  win.setLanguage('ru');
  ck(/ПОВТОРЕНИЕ · УРОКИ 1–2/.test(win.document.getElementById('LC-recycle-practice').textContent),
    'повторение: и возвращаются на русский');

  /* блок есть только у урока цветов */
  /* у компаундов жест — «коснитесь той части тела, о которой говорится в слове» */
  SAL.do('LC', 'rcProd', 'sprint');
  ck(/коснитесь той части тела, о которой говорится в слове/.test(
    win.document.getElementById('LCRC-production-stage').textContent),
    'повторение: подсказка спринта говорит про часть тела внутри слова');

  SAL.openLesson('L4');
  ck(!win.document.getElementById('L4-recycle-practice') && !win.document.getElementById('L4-recycle-production'),
    'у других уроков блока повторения нет');
  /* числительные тоже не «показываются у себя»: там хлопки */
  const numH2 = [...win.document.querySelectorAll('#view-lesson8 h2.section-title')].pop().textContent.trim();
  ck(numH2 === 'Живая речь: назовите вслух все 5 числительных',
    'урок 8: заголовок Production — «' + numH2 + '»');
  SAL.do('L4', 'setProdMode', 'sprint');
  ck(/хлопните в ладоши/.test(win.document.getElementById('L4-production-stage').textContent),
    'урок 8: в спринте жест — хлопки, а не «коснитесь части тела»');
  SAL.openLesson('LC');
}

/* ==========================================================================
   LESSON 4 · MORE COLOURS — полный близнец урока 3 с другим словарём
   ========================================================================== */
console.log('\n===== Урок 4: ещё цвета =====');
{
  const paneOf = k => win.document.getElementById('view-lesson' + SAL.lessons[k].num);
  const labTabs = k => [...paneOf(k).querySelectorAll('.practice-tab-btn:not([data-rc-game]):not([data-rc-prod])')]
    .map(b => b.textContent.trim())
    .map(t => t.replace(/\(\d+\)/g, '(N)')
               .replace(/\b\d+\/\d+\b/g, 'N/N')
               .replace(/все \d+ слов/g, 'все N слов')
               .replace(/из \d+\)/g, 'из N)')
               .replace(/(Спринт|Sprint): [^⏱]*⏱/g, '$1: … ⏱'));
  const gamesTabs = k => [...paneOf(k).querySelectorAll('.practice-tab-btn[data-game]')]
    .map(b => b.getAttribute('data-game'));
  const prodTabs = k => [...paneOf(k).querySelectorAll('.practice-tab-btn[data-prod-mode]')]
    .map(b => b.getAttribute('data-prod-mode'));
  const presTabs = k => [...paneOf(k).querySelectorAll('.practice-tab-btn[data-pres-mode]')]
    .map(b => b.getAttribute('data-pres-mode'));
  const cleanLc2 = h => !/undefined|NaN|\[object Object\]/.test(h);

  SAL.openLesson('LC');
  SAL.openLesson('LC2');
  ck(SAL.lessons.LC2.num === 4 && paneOf('LC2').id === 'view-lesson4',
    'урок 4 стоит четвёртым и живёт в панели view-lesson4');
  /* «абсолютно такой же, как урок 3»: те же вкладки, кнопки и опции */
  ck(gamesTabs('LC2').join() === gamesTabs('LC').join() && gamesTabs('LC2').length === 14,
    'урок 4: те же 14 игр Practice и в том же порядке, что у урока 3');
  ck(prodTabs('LC2').join() === prodTabs('LC').join(),
    'урок 4: те же режимы Production, что у урока 3 — ' + prodTabs('LC2').join(', '));
  ck(presTabs('LC2').join() === presTabs('LC').join() && presTabs('LC2').length === 4,
    'урок 4: те же четыре режима Presentation, что у урока 3');
  ck(labTabs('LC2').join('|') === labTabs('LC').join('|'),
    'урок 4: подписи всех вкладок совпадают с уроком 3');
  ck(!SAL.lessons.LC2.unionSprint, 'урок 4: сквозного спринта по урокам тоже нет');

  /* ---------- словарь ---------- */
  const W = SAL.lessons.LC2.words;
  const DEVA = 'पीत हरित नारङ्ग कपिश धूसर पाटल';
  ck(W.map(w => w.deva).join(' ') === DEVA,
    'урок 4: шесть новых цветов — ' + W.map(w => w.deva).join(' '));
  ck(SAL.lessons.LC.words.map(w => w.deva).every(d => W.map(x => x.deva).indexOf(d) < 0),
    'урок 4: ни одно слово не повторяет цвета урока 3');
  ck(W.every(w => w.iast && w.typoDeva && w.typoIast && w.svg && w.ttsText),
    'урок 4: у каждого цвета есть IAST, опечатка, картинка и озвучка');
  ck(/жёлт/.test(SAL.lessons.LC2.topicRu) && /yellow/i.test(SAL.lessons.LC2.topicEn),
    'урок 4: тема урока называет жёлтый');

  /* पीत — светло-жёлтый, गौर — пастельно-золотой: дети не должны их путать.
     Проверяем не «на глаз», а числами: тон (hue), светлота в Lab и полное
     цветовое расстояние △E. */
  const pita = W.filter(w => w.id === 'pita')[0];
  const gaura = SAL.lessons.LC.words.filter(w => w.id === 'gaura')[0];
  const rgbOf = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = c => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const labOf = hex => {
    const [r, g, b] = rgbOf(hex).map(lin);
    const X = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    const Y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const Z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    const f = t => t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116;
    const fx = f(X), fy = f(Y), fz = f(Z);
    return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
  };
  const dE = (a, b) => { const A = labOf(a), B = labOf(b); return Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2]); };
  const hueOf = hex => {
    const [r, g, b] = rgbOf(hex);
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    if (!d) return 0;
    let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
    return h < 0 ? h + 360 : h;
  };
  ck(/#FFEE58/i.test(pita.svg), 'पीत нарисован светло-жёлтым #FFEE58');
  ck(/#F2C46B/i.test(gaura.svg) && !/#FFEE58/i.test(gaura.svg),
    'गौर из урока 3 остался пастельно-золотым #F2C46B');
  const hueDiff = Math.abs(hueOf('#FFEE58') - hueOf('#F2C46B'));
  const lightDiff = labOf('#FFEE58')[0] - labOf('#F2C46B')[0];
  ck(hueDiff >= 10,
    'पीत и गौर разного тона: ' + hueOf('#FFEE58').toFixed(0) + '° против ' +
    hueOf('#F2C46B').toFixed(0) + '° (Δhue ' + hueDiff.toFixed(0) + '°)');
  ck(lightDiff >= 8,
    'पीत светлее गौर на ' + lightDiff.toFixed(1) + ' по L* (светло-жёлтый, а не золотистый)');
  ck(dE('#FFEE58', '#F2C46B') >= 25,
    'पीत и गौर уверенно различимы: △E = ' + dE('#FFEE58', '#F2C46B').toFixed(1) + ' (порог 25)');
  ck(dE('#FFEE58', '#FFFFFF') >= 30,
    'पीत не читается как белый: △E до белого = ' + dE('#FFEE58', '#FFFFFF').toFixed(1));

  /* палитра урока 4 */
  const palette = SAL.lessons.LC2.hotspots.figures[0];
  ck(palette.pins.length === 6 && palette.pins.every((p, i) => p.num === i + 1),
    'урок 4: на палитре шесть точек с номерами 1–6');
  ck(['#FFEE58', '#16A34A', '#F97316', '#8B5E34', '#94A3B8', '#EC4899']
      .every(c => palette.art.toUpperCase().indexOf(c) >= 0),
    'урок 4: палитра нарисована шестью новыми цветами');
  ck(palette.art.toUpperCase().indexOf('#F2C46B') < 0,
    'урок 4: золотистого गौर на палитре нет — он живёт только в повторении урока 3');
  ck(palette.pins.every(p => /r="35"/.test(p.erase) && /#FDF6EC/i.test(p.erase)),
    '«Что пропало?» урока 4: на месте шарика — пустое место цвета фона');

  /* ---------- данные согласованы так же, как у урока 3 ---------- */
  const nospace = t => String(t).replace(/[\s\u200d\u200c]/g, '');
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
  const rc0 = SAL.recycleCfg('LC2'), rc1 = SAL.recycleCfg('LC2', 1);
  const broken = [];
  W.concat(rc0.words, rc1.words).forEach(w => {
    if (w.maskedPrefix + w.maskedHidden !== w.deva) broken.push(w.deva + ': masked');
    if (nospace(w.gapDeva).replace('_', w.gapAnswer) !== w.deva) broken.push(w.deva + ': gap');
    if (nospace(w.missingDisplay).replace('_', w.missingAnswer) !== w.deva) broken.push(w.deva + ': missing');
    if (!w.gapChoices.some(c => c.deva === w.gapAnswer)) broken.push(w.deva + ': gapChoices');
    if (!w.missingChoices.includes(w.missingAnswer)) broken.push(w.deva + ': missingChoices');
    if (editDist(w.deva, w.typoDeva) !== 1) broken.push(w.deva + ': опечатка не в одну букву');
    if (!w.svg || !w.iast) broken.push(w.deva + ': нет картинки или IAST');
  });
  ck(broken.length === 0, 'данные урока 4 согласованы (маска, пропуски, опечатка в одну букву)' +
    (broken.length ? ' — ' + broken.join('; ') : ''));

  /* ---------- блок повторения 1: новые цвета + части тела ---------- */
  const WANT_RC = ['पाटल-मुख', 'कपिश-हस्त', 'धूसर-पाद', 'नारङ्ग-शीर्ष', 'हरित-नयन', 'पीत-दन्त'];
  ck(!!rc0 && rc0.words.length === 6 && rc0.words.map(w => w.deva).join(' ') === WANT_RC.join(' '),
    'компаунды урока 4: ' + (rc0 ? rc0.words.map(w => w.deva).join(' ') : '—'));
  ck(rc0.words.every(w => w.deva.indexOf('-') > 0 && w.iast.indexOf('-') > 0 &&
    w.syll && w.syll.join('') === w.deva),
    'каждый компаунд записан через тире и нарезан на складывающиеся части');
  ck(/#EC4899/i.test(rc0.words[0].svg) && /#8B5E34/i.test(rc0.words[1].svg) &&
     /#94A3B8/i.test(rc0.words[2].svg) && /#F97316/i.test(rc0.words[3].svg) &&
     /#16A34A/i.test(rc0.words[4].svg) && /#FFEE58/i.test(rc0.words[5].svg),
    'часть тела в каждом компаунде нарисована цветом своего слова');

  /* ---------- блок повторения 2: шесть цветов прошлого урока ---------- */
  ck(!!rc1 && rc1.words.map(w => w.deva).join(' ') === 'श्वेत कृष्ण रक्त नील श्याम गौर',
    'блок повторения 2: все шесть цветов урока 3 — ' +
    (rc1 ? rc1.words.map(w => w.deva).join(' ') : '—'));
  ck(rc1.words.map(w => w.deva).join(' ') === SAL.lessons.LC.words.map(w => w.deva).join(' '),
    'блок повторения 2 в точности повторяет словарь урока 3');
  ck(rc1.hotspots.figures[0].pins.length === 6, 'блок повторения 2: палитра урока 3 с шестью точками');
  ck(!SAL.lessons.LC2RC && !SAL.lessons.LC2RC2, 'служебные конфигурации повторения не попадают в список уроков');

  /* ---------- две панели в Practice и Production ---------- */
  const pane = paneOf('LC2');
  const panel0 = win.document.getElementById('LC2-recycle-practice');
  const panel1 = win.document.getElementById('LC2-recycle2-practice');
  ck(!!panel0 && !!panel1 && !!win.document.getElementById('LC2-recycle2-production'),
    'урок 4: две панели повторения в Practice и две в Production');
  ck(panel0.querySelectorAll('[data-rc-game]').length === 14 &&
     panel1.querySelectorAll('[data-rc-game]').length === 14,
    'в каждой панели повторения — те же 14 игр');
  ck(win.document.getElementById('LC2-recycle-production').querySelectorAll('[data-rc-prod]').length === 4 &&
     win.document.getElementById('LC2-recycle2-production').querySelectorAll('[data-rc-prod]').length === 4,
    'в каждом блоке Production — те же четыре режима');
  ck(/ПОВТОРЕНИЕ · УРОКИ 1–2/.test(panel0.textContent),
    'первый блок подписан «повторение · уроки 1–2»');
  ck(/ПОВТОРЕНИЕ · УРОК 3/.test(panel1.textContent),
    'второй блок подписан «повторение · урок 3»');
  ck(!win.document.getElementById('LC-recycle2-practice'),
    'у урока 3 по-прежнему ровно один блок повторения');

  /* ---------- блоки не мешают друг другу и основному уроку ---------- */
  SAL.do('LC2', 'setGame', 'masked');
  SAL.do('LC2', 'rcGame', 'gaps', '0');
  SAL.do('LC2', 'rcGame', 'memory', '1');
  ck(SAL.lessons.LC2._st.game === 'masked', 'переключение игр повторения не трогает основной урок');
  ck(SAL.recycleCfg('LC2')._st.game === 'gaps' && SAL.recycleCfg('LC2', 1)._st.game === 'memory',
    'у каждого блока повторения своя игра');
  const arena0 = win.document.getElementById('LC2RC-practice-arena');
  const arena1 = win.document.getElementById('LC2RC2-practice-arena');
  ck(arena0.innerHTML.indexOf('memory-grid') < 0 && arena1.innerHTML.indexOf('memory-grid') >= 0,
    'арены двух блоков не перепутаны');
  SAL.do('LC2', 'rcProd', 'chant', '0');
  SAL.do('LC2', 'rcProd', 'missingpart', '1');
  ck(SAL.recycleCfg('LC2')._st.prod.mode === 'chant' &&
     SAL.recycleCfg('LC2', 1)._st.prod.mode === 'missingpart',
    'у каждого блока повторения свой режим Production');
  ck(SAL.lessons.LC2._st.prod.mode === 'sprint', 'Production основного урока не сдвинулся');

  /* «Что пропало?» второго блока: пустое место вместо белого шарика */
  const stage1 = win.document.getElementById('LC2RC2-production-stage');
  const missSvg1 = stage1.querySelector('svg').innerHTML;
  const missIdx = SAL.recycleCfg('LC2', 1)._st.prod.missing.i;
  ck(/<circle[^>]*r="35"[^>]*fill="#FDF6EC"/.test(missSvg1),
    '«Что пропало?» блока 2: на месте пропавшего цвета — дырка цвета фона, шарика нет');
  ck(missSvg1.indexOf('r="35"') < missSvg1.indexOf('stroke-dasharray="3,2"'),
    'блока 2: дырка нарисована до знака «?», он виден поверх');
  SAL.do('LC2RC2', 'missingReveal');
  ck(win.document.getElementById('LC2RC2-production-stage').textContent
      .indexOf(SAL.recycleCfg('LC2', 1).words[missIdx].deva) >= 0,
    'блок 2: после проверки показан пропавший цвет');

  /* филворды обоих блоков */
  SAL.do('LC2', 'rcGame', 'wordsearch', '0');
  SAL.do('LC2', 'rcGame', 'wordsearch', '1');
  const ws0 = SAL.recycleCfg('LC2')._st.g.wordsearch;
  const ws1 = SAL.recycleCfg('LC2', 1)._st.g.wordsearch;
  ck(ws0.grid.length === 100 && ws0.places.length === 6, 'филворд блока 1: все шесть компаундов на поле 10 × 10');
  ck(ws1.grid.length === 100 && ws1.places.length === 6, 'филворд блока 2: все шесть цветов урока 3 на поле');
  SAL.do('LC2', 'rcGame', 'wordgrid', '1');
  ck(win.document.getElementById('LC2RC2-practice-arena').querySelectorAll('.wcell').length === 100,
    'филворд «среди слов» блока 2: поле 10 × 10');

  /* все игры в обоих блоках рисуются без мусора */
  const badBlocks = [];
  [['0', 'LC2RC'], ['1', 'LC2RC2']].forEach(([b, shimKey]) => {
    GAMES.concat(['wordgrid', 'wordsearch']).forEach(gm => {
      SAL.do('LC2', 'rcGame', gm, b);
      const arena = win.document.getElementById(shimKey + '-practice-arena');
      const title = arena.querySelector('.game-title');
      if (!cleanLc2(arena.innerHTML) || !title || arena.innerHTML.length < 200) badBlocks.push(b + ':' + gm);
    });
  });
  ck(badBlocks.length === 0, 'все 14 игр в каждом блоке повторения рисуются с заголовком' +
    (badBlocks.length ? ' — сломано: ' + badBlocks.join(', ') : ''));

  /* «цвет нельзя показать у себя» — только назвать вслух */
  const prodHeads = [...pane.querySelectorAll('h2.section-title')].map(h => h.textContent).join(' ');
  ck(prodHeads.indexOf('покажите у себя') < 0 && /назовите вслух/.test(prodHeads),
    'урок 4: Production просит назвать вслух — без «покажите у себя»');

  /* язык */
  win.setLanguage('en');
  ck(/RECYCLING · LESSONS 1–2/.test(win.document.getElementById('LC2-recycle-practice').textContent) &&
     /RECYCLING · LESSON 3/.test(win.document.getElementById('LC2-recycle2-practice').textContent),
    'блоки повторения урока 4 переводятся на английский');
  win.setLanguage('ru');
  ck(/ПОВТОРЕНИЕ · УРОК 3/.test(win.document.getElementById('LC2-recycle2-practice').textContent),
    'и возвращаются на русский');
  SAL.openLesson('LC');
}

/* ==========================================================================
   ЦЕЛИ УРОКОВ · CELTA: main aim + subsidiary aims
   ========================================================================== */
console.log('\n===== Цели уроков (main aim / subsidiary aims) =====');
{
  const KEYS = ['L2', 'L3', 'LC', 'LC2', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'];
  const NO_AIM = [], BAD = [];
  KEYS.forEach(k => {
    const a = SAL.lessons[k].aim;
    if (!a || !a.ru || !a.en || !a.ru.main || !a.en.main || !a.ru.subs || !a.en.subs) { NO_AIM.push(k); return; }
    if (a.ru.subs.length !== a.en.subs.length || a.ru.subs.length < 2) BAD.push(k + ': подцели разной длины');
    /* systems-урок формулируется инфинитивом: To introduce / clarify / practise / review … */
    if (!/^To (introduce|clarify|practise|review|develop|give|provide|raise)\b/.test(a.en.main)) BAD.push(k + ': главная цель не по формуле CELTA');
    if (!a.en.subs.every(s => /^To \w/.test(s))) BAD.push(k + ': подцель не по формуле CELTA');
    if (!/[А-Яа-я]/.test(a.ru.main)) BAD.push(k + ': нет русской формулировки');
    /* главная цель — про языковой материал и контекст, а не про активность */
    if (a.en.main.indexOf('in the context of') < 0) BAD.push(k + ': в главной цели нет контекста');
  });
  ck(NO_AIM.length === 0, 'у всех десяти уроков движка есть цели (main + subsidiary aims)' +
    (NO_AIM.length ? ' — нет у: ' + NO_AIM.join(', ') : ''));
  ck(BAD.length === 0, 'цели сформулированы по схеме CELTA: инфинитив, материал и контекст' +
    (BAD.length ? ' — ' + BAD.join('; ') : ''));

  /* плашка в шапке урока и те же цели в инструкции преподавателя */
  const plaqueBad = [], guideBad = [];
  KEYS.forEach(k => {
    SAL.openLesson(k);
    const pane = win.document.getElementById('view-lesson' + SAL.lessons[k].num);
    const box = pane.querySelector('.lesson-aim');
    if (!box) { plaqueBad.push(k + ': нет плашки'); return; }
    if (box.querySelector('.lesson-aim-main').textContent.trim() !== SAL.lessons[k].aim.ru.main) plaqueBad.push(k + ': плашка расходится с данными');
    if (box.querySelectorAll('.lesson-aim-subs li').length !== SAL.lessons[k].aim.ru.subs.length) plaqueBad.push(k + ': подцели не все');
    if (!/Системный урок · лексика/.test(box.textContent)) plaqueBad.push(k + ': не указан тип урока');
    const guide = win.document.getElementById(k + '-tg-presentation');
    if (!guide || !guide.querySelector('.teacher-guide-aim')) guideBad.push(k + ': нет целей в инструкции');
    else if (guide.querySelector('.teacher-guide-aim').textContent.indexOf(SAL.lessons[k].aim.ru.main) < 0) guideBad.push(k + ': инструкция расходится с данными');
  });
  ck(plaqueBad.length === 0, 'плашка «🎯 Цель урока» стоит под описанием урока у всех десяти уроков' +
    (plaqueBad.length ? ' — ' + plaqueBad.join('; ') : ''));
  ck(guideBad.length === 0, 'цели продублированы первым блоком в инструкции преподавателя' +
    (guideBad.length ? ' — ' + guideBad.join('; ') : ''));

  /* плашка переводится вместе с интерфейсом */
  SAL.openLesson('LC2');
  const boxOf = () => win.document.getElementById('LC2-lesson-aim');
  ck(boxOf().querySelector('.lesson-aim-main').textContent.trim() === SAL.lessons.LC2.aim.ru.main,
    'урок 4: по-русски плашка показывает русскую цель');
  win.setLanguage('en');
  ck(boxOf().querySelector('.lesson-aim-main').textContent.trim() === SAL.lessons.LC2.aim.en.main &&
     /Subsidiary aims/.test(boxOf().textContent) && /Systems lesson · Vocabulary/.test(boxOf().textContent),
    'EN: плашка и подцели переключаются на английский');
  ck(win.document.getElementById('LC2-tg-presentation').querySelector('.teacher-guide-aim')
      .textContent.indexOf(SAL.lessons.LC2.aim.en.main) >= 0,
    'EN: инструкция преподавателя тоже на английском');
  win.setLanguage('ru');
  ck(/Подцели \(subsidiary aims\)/.test(boxOf().textContent), 'RU: плашка возвращается на русский');

  /* та же плашка у рукописной страницы из 12 слов */
  win.switchView('lesson7');
  const staticAim = win.document.getElementById('lesson1-lesson-aim');
  ck(!!staticAim && staticAim.classList.contains('lesson-aim') &&
     staticAim.querySelectorAll('.lesson-aim-subs li').length === 3,
    'урок 7 (12 слов): плашка целей на месте, три подцели');
  ck(/^Повторить и расширить лексику/.test(staticAim.querySelector('.lesson-aim-main').textContent.trim()),
    'урок 7: главная цель сформулирована от лексики и контекста');
  ck(!!win.document.getElementById('teacher-guide-presentation').querySelector('.teacher-guide-aim'),
    'урок 7: цели есть и в инструкции преподавателя');
  win.setLanguage('en');
  ck(/^To review and extend body and face lexis/.test(
      win.document.getElementById('lesson1-lesson-aim').querySelector('.lesson-aim-main').textContent.trim()),
    'урок 7: EN-версия цели на месте');
  win.setLanguage('ru');

  /* в файле стилей есть оформление плашки */
  const css = fs.readFileSync(path.join(REPO, 'styles.css'), 'utf8');
  ck(/\.lesson-aim\s*\{/.test(css) && /\.lesson-aim-subs\s+li/.test(css) && /\.teacher-guide-aim\s*\{/.test(css),
    'стили плашки и строки целей в инструкции описаны в styles.css');
}


/* ==========================================================================
   EXTRA PRACTICE GAMES (games-extra.js) — only Lesson 5 (numbers 1–5) lists them
   ========================================================================== */
console.log('\n===== Новые игры (games-extra.js) =====');
const EXTRA = ['hotcards', 'retry', 'echo', 'snowball', 'drip', 'anagram', 'typein', 'sorting',
  'flashcount', 'blindboard', 'battleship', 'bingo', 'duel', 'describe', 'orderrelay',
  'coopmemory', 'tictactoe', 'wordgrid', 'wordsearch'];
/* игры с режимом «2 ученика»: семь прежних + memory, match, blindboard, snowball */
const PAIR = ['battleship', 'bingo', 'duel', 'describe', 'orderrelay', 'coopmemory', 'tictactoe',
  'memory', 'match', 'blindboard', 'snowball'];
const L4 = SAL.lessons.L4;
const clean = h => !/undefined|NaN|\[object Object\]/.test(h);
const openL4 = () => { SAL.openLesson('L4'); return arenaOf('L4'); };
const wById = id => L4.words.filter(w => w.id === id)[0];

/* ---------- they exist for lesson 4 and nowhere else ---------- */
const tabsOf = k => [...win.document.getElementById('view-lesson' + SAL.lessons[k].num)
  .querySelectorAll('.practice-tab-btn[data-game]')].map(b => b.getAttribute('data-game'));
['L2', 'L3', 'L4'].forEach(k => SAL.openLesson(k));
const l4tabs = tabsOf('L4');
ck(l4tabs.length === 12 + EXTRA.length, 'урок 8: вкладок ' + l4tabs.length + ' (12 классических + ' + EXTRA.length + ' новых)');
ck(EXTRA.every(g => l4tabs.indexOf(g) >= 0), 'урок 8: все новые игры есть во вкладках');
ck(l4tabs.slice(0, 12).join() === GAMES.join(), 'урок 8: первые 12 вкладок — классические игры, порядок не сбит');
/* уроки 1 и 2 получили только два филворда — остальные новые игры им не нужны */
['L2', 'L3'].forEach(k => {
  const t = tabsOf(k);
  const words = t.filter(g => g === 'wordgrid' || g === 'wordsearch');
  ck(t.length === 14 && words.length === 2, k + ': вкладок ' + t.length + ' (12 классических + 2 филворда)');
  ck(t.slice(0, 12).join() === GAMES.join(), k + ': первые 12 вкладок — классические игры, порядок не сбит');
  ck(!t.some(g => EXTRA.indexOf(g) >= 0 && g !== 'wordgrid' && g !== 'wordsearch'),
    k + ': чужих новых игр нет');
});

/* филворд в уроках 1 и 2 действительно работает: слова нарезаны на акшары */
['L2', 'L3'].forEach(k => {
  const L = SAL.lessons[k];
  SAL.openLesson(k);
  SAL.do(k, 'setGame', 'wordsearch');
  const g = SAL.lessons[k]._st.g.wordsearch;
  ck(g.grid.length === 100 && g.places.length === L.words.length,
    k + ': филворд собрал поле 10 × 10 и спрятал все ' + L.words.length + ' слов');
  ck(g.places.every(p => p.cells.length >= 2), k + ': каждое слово занимает минимум две клетки');
  const readBack = g.places.every(p => {
    const parts = L.words.filter(w => w.id === p.id)[0].syll || [];
    const txt = p.cells.map(i => g.grid[i]).join('');
    return parts.length ? txt === parts.join('') : txt.length > 1;
  });
  ck(readBack, k + ': слово на поле читается теми же частями, что и в задании');
  ck((g.twins || []).length >= 2, k + ': у слов есть двойники (' + (g.twins || []).length + ')');
  /* нажатие по клеткам находит слово */
  const first = g.places[0];
  first.cells.forEach(i => SAL.do(k, 'wsTap', String(i)));
  ck(SAL.lessons[k]._st.g.wordsearch.found[first.id] === true, k + ': нажатие клеток находит слово');
  /* все шесть размеров */
  const sizes = [9, 8, 7, 6, 5, 10].map(n => {
    SAL.do(k, 'wsSize', String(n));
    return SAL.lessons[k]._st.g.wordsearch.grid.length;
  });
  ck(sizes.join() === '81,64,49,36,25,100', k + ': работают все шесть размеров поля');
  SAL.do(k, 'setGame', 'wordgrid');
  const wg = SAL.lessons[k]._st.g.wordgrid;
  ck(wg.grid.length === 100 && wg.total >= L.words.length,
    k + ': филворд среди слов собрал поле и цели (' + wg.total + ')');
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
ck(win.document.getElementById('view-lesson8').querySelector('[data-players="2"]').classList.contains('active'),
  'переключатель «2 ученика» подсвечен');
SAL.do('L4', 'setPlayers', '1');

/* ---------- 29. tic-tac-toe: варианты — количество, а не слова ---------- */
/* числовое значение слова: нужно, чтобы показать количество в вариантах */
[['L4', [1, 2, 3, 4, 5]], ['L5', [6, 7, 8, 9, 10]], ['L6', [11, 12, 13, 14, 15]],
 ['L7', [16, 17, 18, 19, 20]], ['L8', [10, 20, 30, 40, 50]], ['L9', [60, 70, 80, 90, 100]]]
  .forEach(([k, vals]) => {
    ck(SAL.lessons[k].words.map(w => w.value).join() === vals.join(),
      'урок ' + SAL.lessons[k].num + ': у числительных есть значение — ' + vals.join(', '));
  });
const tttValues = arena => [...arena.querySelectorAll('.quiz-opt-btn .qty-opt svg')].map(svg => {
  const digit = svg.querySelector('text');
  return digit ? parseInt(digit.textContent, 10) : svg.querySelectorAll('circle').length;
});
SAL.openLesson('L4');
SAL.do('L4', 'restart', 'tictactoe');
SAL.do('L4', 'tttOpen', '0');
const tttA = arenaOf('L4');
ck(!!tttA.querySelector('.ttt-ask-word') &&
   /[\u0900-\u097F]/.test(tttA.querySelector('.ttt-ask-word').textContent),
  'крестики-нолики: в вопросе — само числительное, а не картинка');
ck(tttA.querySelectorAll('.quiz-opt-btn .qty-opt').length === 4,
  'крестики-нолики: четыре варианта-количества');
ck([...tttA.querySelectorAll('.quiz-opt-btn')].every(b => !/[\u0900-\u097F]/.test(b.textContent)),
  'крестики-нолики: в вариантах нет санскритских слов — они больше не повторяют клетки');
const askedId = gst('L4', 'tictactoe').cells[gst('L4', 'tictactoe').ask];
const askedVal = wById(askedId).value;
const l4vals = tttValues(tttA);
ck(l4vals.every(v => v >= 1 && v <= 5), 'крестики-нолики: до пяти — кружочки, по одному на единицу');
ck(l4vals.indexOf(askedVal) >= 0, 'крестики-нолики: среди вариантов есть верное количество (' + askedVal + ')');
ck(new Set(l4vals).size === 4, 'крестики-нолики: все четыре варианта разные');
SAL.openLesson('L5');
SAL.do('L5', 'restart', 'tictactoe');
SAL.do('L5', 'tttOpen', '0');
const l5svg = [...arenaOf('L5').querySelectorAll('.quiz-opt-btn .qty-opt svg')];
ck(l5svg.length === 4 && l5svg.every(s => s.querySelector('text')),
  'крестики-нолики: больше пяти — в вариантах арабские цифры, без бусин');
ck(tttValues(arenaOf('L5')).every(v => v > 5 && v <= 10), 'крестики-нолики: цифры берутся из слов урока 6');
/* ✕ и ◯: нолик появляется только в режиме «2 ученика» — и это сказано на экране */
SAL.openLesson('L4');
SAL.do('L4', 'setPlayers', '1');
SAL.do('L4', 'restart', 'tictactoe');
const soloHint = arenaOf('L4').querySelector('.ttt-hint');
ck(soloHint && /2 ученика/.test(soloHint.textContent),
  'крестики-нолики: один игрок видит подсказку, как включить второго (' +
  (soloHint ? soloHint.textContent.trim().slice(0, 60) : '—') + '…)');
ck(!arenaOf('L4').querySelector('.ttt-mark'),
  'крестики-нолики: в одиночной игре плашки хода со знаком нет');
SAL.do('L4', 'setPlayers', '2');
SAL.do('L4', 'restart', 'tictactoe');
const tttG = () => SAL.lessons.L4._st.g.tictactoe;
SAL.do('L4', 'tttOpen', '0');
SAL.do('L4', 'tttPick', tttG().cells[0]);
const marksAfterOne = [...arenaOf('L4').querySelectorAll('.ttt-mark')];
ck(marksAfterOne.length === 3 && marksAfterOne[2].textContent.trim() === '◯',
  'крестики-нолики: после ✕ ход переходит к ◯ и это видно в плашке');
SAL.do('L4', 'tttOpen', '4');
SAL.do('L4', 'tttPick', tttG().cells[4]);
const marksAfterTwo = [...arenaOf('L4').querySelectorAll('.ttt-mark')];
ck(marksAfterTwo[2].textContent.trim() === '✕', 'крестики-нолики: после ◯ ход возвращается к ✕');
ck(arenaOf('L4').querySelectorAll('.ttt-cell.own-1').length === 1 &&
   arenaOf('L4').querySelectorAll('.ttt-cell.own-2').length === 1,
  'крестики-нолики: на поле появляются и ✕, и ◯');
SAL.lessons.L4._st.rulesOpen = true;      /* панель правил могла остаться свёрнутой */
SAL.do('L4', 'restart', 'tictactoe');
ck(/2 ученика/.test([...arenaOf('L4').querySelectorAll('.rules-row')].pop().textContent),
  'крестики-нолики: в правилах сказано, что ◯ — для режима «2 ученика»');
SAL.do('L4', 'restart', 'tictactoe');
SAL.do('L4', 'setPlayers', '1');
/* один игрок: три верных ответа подряд — победа без слов про «ученика 2» */
SAL.do('L4', 'restart', 'tictactoe');
[0, 1, 2].forEach(i => {
  SAL.do('L4', 'tttOpen', String(i));
  SAL.do('L4', 'tttPick', tttG().cells[i]);
});
ck(/Три в ряд/.test(arenaOf('L4').textContent) && !/Победил ученик/.test(arenaOf('L4').textContent),
  'крестики-нолики: в одиночной игре финал — «Три в ряд — есть!», а не «победил ученик»');
SAL.do('L4', 'restart', 'tictactoe');

/* уроки слов не изменились: вопрос — картинка, варианты — слова */
SAL.openLesson('L2');
SAL.do('L2', 'restart', 'tictactoe');
SAL.do('L2', 'tttOpen', '0');
const tttWordArena = arenaOf('L2');
ck(!tttWordArena.querySelector('.ttt-ask-word') && !tttWordArena.querySelector('.qty-opt'),
  'урок 1: в крестиках-ноликах всё по-прежнему — картинка и слова');
SAL.openLesson('L4');
SAL.do('L4', 'restart', 'tictactoe');

/* ---------- закрытые клетки: тёмная рубашка с координатой, а не белый квадрат ---------- */
SAL.openLesson('L4');
const backsOf = (gm) => {
  SAL.do('L4', 'restart', gm);
  const a = arenaOf('L4');
  const emblems = [...a.querySelectorAll('.memory-card-back-emblem')];
  const bare = emblems.filter(e => !e.closest('.card-back'));
  return { total: emblems.length, bare: bare.length, a: a };
};
const mem = backsOf('coopmemory');
ck(mem.total === 10 && mem.bare === 0,
  'мемори вдвоём: у всех закрытых карточек есть тёмная рубашка (без неё — белый экран)');
ck([...mem.a.querySelectorAll('.card-back')].every(c => /^[a-c][1-4]$/.test(c.textContent.trim())),
  'мемори вдвоём: на рубашке читается координата (a1 … c4)');
const bat = backsOf('battleship');
ck(bat.total === 10 && bat.bare === 0, 'морской бой: закрытые клетки тоже под рубашкой');
SAL.do('L4', 'restart', 'blindboard');
const bbG = SAL.lessons.L4._st.g.blindboard;
bbG.phase = 'ask';
bbG.ask = 0;
SAL.refresh();
const bbBare = [...arenaOf('L4').querySelectorAll('.memory-card-back-emblem')]
  .filter(e => !e.closest('.card-back'));
ck(bbBare.length === 0 && arenaOf('L4').querySelectorAll('.wcell.card-back').length === 10,
  'слепое поле: все закрытые клетки под рубашкой');
SAL.do('L4', 'restart', 'blindboard');
SAL.do('L4', 'restart', 'coopmemory');
SAL.do('L4', 'coopFlip', '0');
ck(arenaOf('L4').querySelectorAll('.bcell.card-back').length === 9 &&
   !arenaOf('L4').querySelectorAll('.bcell')[0].classList.contains('card-back'),
  'мемори вдвоём: открытая карточка рубашку теряет, остальные остаются закрытыми');
SAL.do('L4', 'restart', 'coopmemory');

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
const wgBoard = arenaOf('L4').querySelector('.ws-board');
ck(wgBoard.querySelectorAll('.ws-coord.col').length === 10 &&
   wgBoard.querySelectorAll('.ws-coord.row').length === 10 &&
   wgBoard.querySelectorAll('.wcell').length === 100,
  'филворд: сетка слов тоже с координатами (цифры сверху, буквы слева)');
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

/* размер поля «среди слов»: 10, 9, 8, 7, 6, 5 по горизонтали и вертикали */
['9', '8', '7', '6', '5', '10'].forEach(sz => {
  const n2 = parseInt(sz, 10);
  SAL.do('L4', 'wgSize', sz);
  const g2 = gst('L4', 'wordgrid');
  ck(g2.size === n2 && g2.grid.length === n2 * n2 &&
     g2.grid.every(c => !!(c.t ? wById(c.id).deva : c.s)),
    'филворд: поле ' + n2 + ' × ' + n2 + ' — ' + (n2 * n2) + ' клеток, пустых нет');
  ck(g2.grid.filter(c => c.t).length === g2.total && g2.total >= L4.words.length,
    'филворд: на поле ' + n2 + ' × ' + n2 + ' цель — ' + g2.total + ' клеток со словами урока');
  ck(Object.keys(g2.found).length === 0 && Object.keys(g2.wrong).length === 0,
    'филворд: смена размера сбрасывает прогресс');
});
const wgDecoys = gst('L4', 'wordgrid').grid.filter(c => !c.t).map(c => c.s);
ck(wgDecoys.length > 0 && wgDecoys.some(s2 => L4.decoys.indexOf(s2) < 0),
  'филворд: часть ловушек — почти-двойники слов урока (ि/ी, ण/न, ऋ/रि), а не только готовый список');

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

/* диагоналей нет: разрешены только «слева направо» и «сверху вниз» */
const onlyStraightAxes = ws.places.every(p => {
  if (p.cells.length < 2) return true;
  const dr = Math.floor(p.cells[1] / 10) - Math.floor(p.cells[0] / 10);
  const dc = (p.cells[1] % 10) - (p.cells[0] % 10);
  return (dr === 0 && dc === 1) || (dr === 1 && dc === 0);
});
ck(onlyStraightAxes, 'филворд по частям: слов по диагонали нет — только → и ↓');

/* слова-двойники: в другом месте поля лежит почти то же слово, но с одной
   заменой — именно это и делает филворд неочевидным */
const wsTwins = ws.twins || [];
ck(wsTwins.length >= 2, 'филворд по частям: на поле есть слова-двойники (' + wsTwins.length + ')');
const twinChecks = wsTwins.map(tw => {
  const trueWord = wById(tw.id).syll.join('');
  const text = tw.parts.join('');
  const differs = tw.parts.filter((p, k) => p !== wById(tw.id).syll[k]).length;
  const straight = tw.cells.map(i => ws.grid[i]).join('') === text;
  return { text, trueWord, differs, straight, kind: tw.kind };
});
ck(twinChecks.every(t => t.straight), 'филворд по частям: каждый двойник читается по своим клеткам');
ck(twinChecks.every(t => t.text !== t.trueWord), 'филворд по частям: двойник не совпадает с настоящим словом');
ck(twinChecks.every(t => t.differs === 1), 'филворд по частям: двойник отличается ровно одной частью');
ck(twinChecks.every(t => !!t.kind), 'филворд по частям: у двойника записан признак замены');
const twinKinds = twinChecks.map(t => t.kind);
ck(twinKinds.indexOf('length') >= 0 || twinKinds.indexOf('varga') >= 0 || twinKinds.indexOf('rvowel') >= 0,
  'филворд по частям: среди ловушек есть долгота / варга / ऋ-रि (' + twinKinds.join(',') + ')');

/* нажатие на двойника не засчитывается и объясняется */
const tw0 = wsTwins[0];
tw0.cells.forEach(i => SAL.do('L4', 'wsTap', String(i)));
const afterTwin = gst('L4', 'wordsearch');
ck(afterTwin.found[tw0.id] !== true, 'филворд по частям: двойник не засчитывается как слово');
ck(!!(afterTwin.twinsMiss && afterTwin.twinsMiss[0]), 'филворд по частям: двойник помечается промахом');
ck(arenaOf('L4').querySelectorAll('.wcell.wrong').length === tw0.cells.length,
  'филворд по частям: клетки двойника краснеют');
ck(/Двойник/.test(arenaOf('L4').textContent) && /это не/.test(arenaOf('L4').textContent),
  'филворд по частям: под сеткой объяснено, чем двойник отличается');

/* 🧩 «Ловушки» — учитель показывает двойников */
SAL.do('L4', 'wsTwins');
const twinArena = arenaOf('L4');
ck(gst('L4', 'wordsearch').showTwins === true &&
   twinArena.querySelectorAll('.wcell.twin').length >= wsTwins.length,
  'филворд по частям: 🧩 «Ловушки» подсвечивает двойников');
ck(twinArena.querySelectorAll('.ws-twin-item').length === wsTwins.length,
  'филворд по частям: список ловушек показывает каждый двойник и его отличие');
/* со скрытым списком слов ловушки не выдают настоящие слова урока
   (showTwins здесь ещё включён с прошлой проверки) */
SAL.do('L4', 'wsWords');
const twinListEl = arenaOf('L4').querySelector('.ws-twin-list');
const leakText = twinListEl ? twinListEl.textContent : '';
ck(twinListEl !== null && !L4.words.some(w => leakText.indexOf(w.deva) >= 0),
  'филворд по частям: при скрытом списке 🧩 не показывает настоящие слова');
SAL.do('L4', 'wsWords');
SAL.do('L4', 'wsTwins');
ck(gst('L4', 'wordsearch').showTwins === false &&
   arenaOf('L4').querySelectorAll('.wcell.twin').length === 0,
  'филворд по частям: режим ловушек выключается');

/* координаты поля: цифры сверху, буквы слева */
const coordsOf = k => {
  const board = arenaOf(k).querySelector('.ws-board');
  return {
    cols: Array.from(board.querySelectorAll('.ws-coord.col')).map(e => e.textContent),
    rows: Array.from(board.querySelectorAll('.ws-coord.row')).map(e => e.textContent),
    cells: board.querySelectorAll('.wcell').length,
    corner: board.querySelector('.ws-coord.corner') !== null
  };
};
const c10 = coordsOf('L4');
ck(c10.cols.join(',') === '1,2,3,4,5,6,7,8,9,10', 'филворд по частям: цифры колонок 1…10 сверху');
ck(c10.rows.join(',') === 'a,b,c,d,e,f,g,h,i,j', 'филворд по частям: буквы рядов a…j слева');
ck(c10.cells === 100 && c10.corner, 'филворд по частям: подписи не попали в игровые клетки (100 + угол)');
const firstCell = arenaOf('L4').querySelector('.ws-board .wcell');
const lastCell = Array.from(arenaOf('L4').querySelectorAll('.ws-board .wcell')).pop();
ck(/^a1 /.test(firstCell.getAttribute('aria-label')) && /^j10 /.test(lastCell.getAttribute('aria-label')),
  'филворд по частям: клетки подписаны координатами (a1 … j10)');
SAL.do('L4', 'wsSize', '5');
const c5 = coordsOf('L4');
ck(c5.cols.join(',') === '1,2,3,4,5' && c5.rows.join(',') === 'a,b,c,d,e' && c5.cells === 25,
  'филворд по частям: на поле 5 × 5 координаты 1…5 и a…e');
SAL.do('L4', 'wsSize', '10');
ck(coordsOf('L4').cols.length === 10, 'филворд по частям: возврат на 10 × 10 восстанавливает координаты');

/* 🙈 кнопка прячет список слов под сеткой и возвращает его */
ck(arenaOf('L4').querySelectorAll('.ws-legend').length === L4.words.length,
  'филворд по частям: список слов под сеткой показан');
SAL.do('L4', 'wsWords');
ck(gst('L4', 'wordsearch').hideWords === true && arenaOf('L4').querySelectorAll('.ws-legend').length === 0,
  'филворд по частям: кнопка 🙈 прячет список слов');
ck(/Слова скрыты/.test(arenaOf('L4').textContent),
  'филворд по частям: при скрытом списке показана подсказка, как его вернуть');
SAL.do('L4', 'wsWords');
ck(gst('L4', 'wordsearch').hideWords === false && arenaOf('L4').querySelectorAll('.ws-legend').length === L4.words.length,
  'филворд по частям: 👁 возвращает список слов');
/* размер поля «среди букв»: те же шесть вариантов, клетки пересчитываются через n */
['9', '8', '7', '6', '5', '10'].forEach(sz => {
  const n2 = parseInt(sz, 10);
  SAL.do('L4', 'wsSize', sz);
  const g2 = gst('L4', 'wordsearch');
  ck(g2.size === n2 && g2.grid.length === n2 * n2 && g2.grid.every(c => c && c.length),
    'филворд по частям: поле ' + n2 + ' × ' + n2 + ' — ' + (n2 * n2) + ' клеток, пустых нет');
  ck(g2.places.length === L4.words.length,
    'филворд по частям: на поле ' + n2 + ' × ' + n2 + ' поместились все ' + L4.words.length + ' слов');
  const straight2 = g2.places.every(p => {
    const ch = wById(p.id).syll.join('');
    if (p.cells.map(i => g2.grid[i]).join('') !== ch) return false;
    if (p.cells.length < 2) return true;
    const r0 = Math.floor(p.cells[0] / n2), c0 = p.cells[0] % n2;
    const dr = Math.floor(p.cells[1] / n2) - r0, dc = (p.cells[1] % n2) - c0;
    return p.cells.every((idx, k) => idx === (r0 + dr * k) * n2 + (c0 + dc * k));
  });
  ck(straight2, 'филворд по частям: на ' + n2 + ' × ' + n2 + ' каждое слово лежит по прямой и читается верно');
  ck(Object.keys(g2.found).length === 0 && g2.sel.length === 0,
    'филворд по частям: смена размера начинает раунд заново');
});

/* ловушки: у слов урока в поле стоит почти-двойник, а не случайная буква */
const g10 = gst('L4', 'wordsearch');
const lessonText = L4.words.map(w => w.syll.join('')).join('|');
const boardText = g10.grid.join('');
[['ि', 'ी'], ['ु', 'ू'], ['े', 'ै'], ['ो', 'ौ'], ['ण', 'न']].forEach(pair => {
  const a = pair[0], b = pair[1];
  const inLesson = ch => lessonText.indexOf(ch) >= 0;
  if (inLesson(a) !== inLesson(b)) {
    const miss = inLesson(a) ? b : a;
    ck(boardText.indexOf(miss) >= 0,
      'филворд по частям: в поле стоит ловушка ' + miss + ' (в словах урока только ' + (inLesson(a) ? a : b) + ')');
  }
});

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
/* на карточке — само числительное словом, а не картинка: бусины и цифры
   выдавали бы значение, и порядок выкладывался бы без слов */
const relayCards = k => {
  SAL.openLesson(k);
  SAL.do(k, 'restart', 'orderrelay');
  const rows = arenaOf(k).querySelectorAll('.vocab-grid-6');
  return {
    shelf: [...rows[0].querySelectorAll('.relay-word')].map(e => e.textContent.trim()),
    pool: [...rows[1].querySelectorAll('.relay-word')].map(e => e.textContent.trim()),
    svg: arenaOf(k).querySelectorAll('.vocab-grid-6 svg').length,
    empty: rows[0].querySelector('.relay-slot-num'),
    arena: arenaOf(k)
  };
};
[['L4', 5], ['L5', 5], ['L6', 5], ['L7', 5], ['L8', 5], ['L9', 5]].forEach(([k, n]) => {
  const r = relayCards(k);
  const words = SAL.lessons[k].words.map(w => w.deva);
  ck(r.svg === 0, 'эстафета (' + k + '): на карточках нет картинок — ни бусин, ни цифр');
  ck(r.pool.length === n && r.pool.every(d => words.indexOf(d) >= 0),
    'эстафета (' + k + '): внизу лежат сами числительные словами');
  ck(r.empty && r.empty.textContent.trim() === '1',
    'эстафета (' + k + '): пустая полка подписана номером места');
});
SAL.openLesson('L4');
SAL.do('L4', 'restart', 'orderrelay');
SAL.do('L4', 'relayTap', 'ekam');
const afterOne = arenaOf('L4').querySelectorAll('.vocab-grid-6');
ck(afterOne[0].querySelectorAll('.relay-word').length === 1 &&
   afterOne[0].querySelector('.relay-word').textContent.trim() === 'एकम्' &&
   afterOne[1].querySelectorAll('.relay-word').length === 4,
  'эстафета: верное слово уходит на полку и остаётся словом, а не картинкой');
ck(/словом/.test(arenaOf('L4').querySelector('.rules-list').textContent),
  'эстафета: в правилах сказано, что на карточке числительное словом');
SAL.do('L4', 'restart', 'orderrelay');

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



/* ==========================================================================
   THE NUMERAL LESSONS 5, 6 and 7 — twins of Lesson 4, each on its own data
   ========================================================================== */
console.log('\n===== Уроки 6–10: числительные =====');
const NUMS = {
  L5: { ru: 'Цифры 6–10', deva: 'षट् सप्त अष्ट नव दश' },
  L6: { ru: 'Цифры 11–15', deva: 'एकादश द्वादश त्रयोदश चतुर्दश पञ्चदश' },
  L7: { ru: 'Цифры 16–20', deva: 'षोडश सप्तदश अष्टादश नवदश विंशतिः' },
  L8: { ru: 'Десятки 10–50', deva: 'दश विंशतिः त्रिंशत् चत्वारिंशत् पञ्चाशत्' },
  L9: { ru: 'Десятки 60–100', deva: 'षष्टिः सप्ततिः अशीतिः नवतिः शतम्' }
};
const plain = t => t.replace(/[āīūṃñṇṛṝḷśṣṭḍḥṅ]/g,
  c => ({ 'ā': 'a', 'ī': 'i', 'ū': 'u', 'ṃ': 'm', 'ñ': 'n', 'ṇ': 'n', 'ṛ': 'r',
          'ṝ': 'r', 'ḷ': 'l', 'ś': 's', 'ṣ': 's', 'ṭ': 't', 'ḍ': 'd', 'ḥ': 'h', 'ṅ': 'n' }[c]));

Object.keys(NUMS).forEach(key => {
  const L = SAL.lessons[key];
  const byIdOf = id => L.words.filter(w => w.id === id)[0];
  console.log('\n----- ' + key + ' · ' + NUMS[key].ru + ' -----');
  ck(!!L && L.num === Number(key.slice(1)) + 4, key + ': зарегистрирован под номером ' + (L && L.num));
  ck(L.words.map(w => w.deva).join(' ') === NUMS[key].deva,
    key + ': ровно пять числительных — ' + L.words.map(w => w.deva).join(' '));
  ck(L.words.every(w => w.syll.join('') === w.deva), key + ': слоги складываются в слово');
  ck(L.decoys.length >= 20 && new Set(L.decoys).size === L.decoys.length,
    key + ': ' + L.decoys.length + ' разных отвлекающих слов');
  ck(L.decoys.every(d => L.words.every(w => w.deva !== d)),
    key + ': отвлекающие слова не совпадают со словами урока');
  const pastTen = L.num >= 10;   /* уроки 10–13: числа 11–100, их не сосчитать на глаз */
  const digits = L.words.every(w => /<text[^>]*>\d+<\/text>/.test(w.svg));
  const beads = L.words.every(w => /fill="#F59E0B"/.test(w.svg));
  ck(pastTen ? (digits && !beads) : (beads && !digits),
    key + ': количество показано ' + (pastTen
      ? 'арабскими цифрами — больше десяти бусины не сосчитать'
      : 'бусинами — до десяти считаем на глаз'));
  ck(JSON.stringify(L.extraGames) === JSON.stringify(EXTRA),
    key + ': тот же набор из ' + EXTRA.length + ' игр, что и в уроке 5');

  const tabs = tabsOf(key);
  ck(tabs.length === 12 + EXTRA.length, key + ': вкладок ' + tabs.length + ' (12 + ' + EXTRA.length + ')');
  ck(tabs.slice(0, 12).join() === GAMES.join(), key + ': первые 12 вкладок — классические игры');
  ck(EXTRA.every(g => tabs.indexOf(g) >= 0), key + ': все новые игры есть во вкладках');

  ['1', '2'].forEach(np => {
    SAL.openLesson(key);
    SAL.do(key, 'setPlayers', np);
    const bad = [];
    EXTRA.forEach(gm => {
      SAL.do(key, 'restart', gm);
      if (!arenaOf(key).innerHTML || arenaOf(key).innerHTML.length < 40) { bad.push(gm + ' (пусто)'); return; }
      clickAll(arenaOf(key));
      if (!clean(arenaOf(key).innerHTML)) bad.push(gm + ' (после нажатий)');
    });
    ck(bad.length === 0, key + ': 19 игр работают на своих данных (' + np + ' ученик' +
      (np === '1' ? '' : 'а') + ')' + (bad.length ? ' — ' + bad.join(', ') : ''));
  });
  SAL.do(key, 'setPlayers', '1');
  ck(win.document.getElementById('view-lesson' + L.num).querySelector('[data-players="2"]') !== null,
    key + ': переключатель «1 / 2 ученика» на месте');

  SAL.do(key, 'restart', 'wordgrid');
  const wg = gst(key, 'wordgrid');
  const deva = L.words.map(w => w.deva);
  ck(wg.grid.length === 100 && wg.total === L.words.length * 2, key + ': поле 10 × 10, цель — каждое слово дважды');
  ck(wg.grid.filter(c => c.t).every(c => deva.indexOf(byIdOf(c.id).deva) >= 0), key + ': отмечены только свои слова');
  ck(wg.grid.filter(c => !c.t).every(c => deva.indexOf(c.s) < 0),
    key + ': ни одна чужая клетка не совпадает со словом урока');
  SAL.do(key, 'restart', 'wordsearch');
  const ws = gst(key, 'wordsearch');
  ck(ws.grid.length === 100 && ws.places.length === L.words.length &&
     ws.places.every(p => p.cells.map(i => ws.grid[i]).join('') === byIdOf(p.id).syll.join('')),
    key + ': в сетке спрятаны все пять слов, каждое читается верно');

  SAL.do(key, 'restart', 'anagram');
  const an = gst(key, 'anagram');
  byIdOf(an.order[0]).syll.map(ch => String(an.tiles.indexOf(ch))).forEach(i => SAL.do(key, 'anaTap', i));
  ck(gst(key, 'anagram').answered === true && gst(key, 'anagram').score === 1,
    key + ': собирание слова из частей по слогам');

  SAL.do(key, 'restart', 'typein');
  const tw = byIdOf(gst(key, 'typein').order[0]);
  SAL.do(key, 'typeCheck', plain(tw.iast));
  ck(gst(key, 'typein').result === 'ok',
    key + ': напиши сам принимает написание без диакритики (' + tw.iast + ' → ' + plain(tw.iast) + ')');
  SAL.do(key, 'restart', 'typein');
  SAL.do(key, 'typeCheck', 'zzz');
  ck(gst(key, 'typein').result === 'bad', key + ': напиши сам отвергает мусор');

  ck(L.words.every(w => w.typoDeva && w.typoIast), key + ': у каждого слова есть опечатка для минимальных пар');
  SAL.do(key, 'restart', 'sorting');
  ck(L.sortFeatures.some(f => arenaOf(key).textContent.indexOf(f.ru) >= 0),
    key + ': сортировка задаёт свой вопрос по форме слова');
});


/* navigation: one dropdown lists every lesson, in every pane */
console.log('\n===== Выпадающий список уроков =====');
const NAV_VALUES = ['L2', 'L3', 'LC', 'LC2', 'LG', 'LG2', 'lesson7', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'];
const PANES = ['view-lesson1', 'view-lesson2', 'view-lesson3', 'view-lesson4', 'view-lesson5',
               'view-lesson6', 'view-lesson7', 'view-lesson8', 'view-lesson9', 'view-lesson10',
               'view-lesson11', 'view-lesson12', 'view-lesson13'];
const CUR = { 'view-lesson1': 'L2', 'view-lesson2': 'L3', 'view-lesson3': 'LC',
              'view-lesson4': 'LC2', 'view-lesson5': 'LG', 'view-lesson6': 'LG2',
              'view-lesson7': 'lesson7',
              'view-lesson8': 'L4', 'view-lesson9': 'L5', 'view-lesson10': 'L6',
              'view-lesson11': 'L7', 'view-lesson12': 'L8', 'view-lesson13': 'L9' };
['L2', 'L3', 'LC', 'LC2', 'LG', 'LG2', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'].forEach(k => SAL.openLesson(k));
win.switchView('lesson7');
PANES.forEach(id => {
  const pane = win.document.getElementById(id);
  const sels = pane.querySelectorAll('select.lesson-select');
  ck(sels.length === 1, id + ': ровно один выпадающий список уроков (найдено ' + sels.length + ')');
  const sel = sels[0];
  if (!sel) return;
  ck(NAV_VALUES.every(v => [...sel.options].some(o => o.value === v)) && sel.options.length === NAV_VALUES.length,
    id + ': в списке ровно все тринадцать уроков (' + sel.options.length + ')');
  ck(sel.value === CUR[id] && sel.options[sel.selectedIndex].value === CUR[id],
    id + ': выбран текущий урок (' + sel.value + ')');
  ck(pane.querySelectorAll('.ppp-top-row [onclick*="openLesson"]').length === 0,
    id + ': строки кнопок-уроков больше нет');
  ck(/Выбрать номер урока/.test(pane.textContent), id + ': подпись «Выбрать номер урока» на месте');
});
ck(win.document.getElementById('view-lesson8')
    .querySelectorAll('.ppp-top-row > div:first-child > *').length === 3,
  'слева в строке три элемента: «на главную», подпись и список');
SAL.gotoLesson('L5');
ck(win.document.getElementById('view-lesson9').classList.contains('active'),
  'выбор урока 9 в списке открывает девятую панель');
SAL.gotoLesson('LC2');
ck(win.document.getElementById('view-lesson4').classList.contains('active'),
  'выбор урока 4 открывает второй урок цветов');
SAL.gotoLesson('LG2');
ck(win.document.getElementById('view-lesson6').classList.contains('active'),
  'выбор урока 6 открывает второй урок рода');
SAL.gotoLesson('lesson7');
ck(win.document.getElementById('view-lesson7').classList.contains('active'),
  'выбор урока 7 открывает панель 12 слов');
SAL.gotoLesson('LC');
ck(win.document.getElementById('view-lesson3').classList.contains('active'),
  'выбор урока 3 открывает урок цветов');
SAL.gotoLesson('L2');
ck(win.document.getElementById('view-lesson1').classList.contains('active'),
  'выбор урока 1 открывает первую панель');
win.setLanguage('en');
SAL.openLesson('LC2');
ck([...win.document.getElementById('view-lesson4').querySelector('select.lesson-select').options]
    .every(o => /^Lesson \d/.test(o.textContent)), 'список уроков переведён на английский');
ck(/Choose a lesson/.test(win.document.getElementById('view-lesson4').textContent),
  'урок 4 (Ещё цвета): подпись списка тоже переведена');
win.setLanguage('ru');
SAL.openLesson('LC2');
ck([...win.document.getElementById('view-lesson4').querySelector('select.lesson-select').options]
    .every(o => /^Урок \d/.test(o.textContent)), 'список уроков возвращается на русский');

/* ==========================================================================
   RULES — every practice game must carry its own short manual
   ========================================================================== */
console.log('\n===== Правила в каждой игре =====');
function rulesProbe(keyPair, arena) {
  const panel = arena.querySelector('.game-rules');
  if (!panel) return keyPair + ': нет панели правил';
  const rows = panel.querySelectorAll('.rules-row').length;
  const steps = panel.querySelectorAll('.rules-list li').length;
  const len = panel.textContent.replace(/\s+/g, ' ').trim().length;
  if (rows < 3) return keyPair + ': только ' + rows + ' раздела правил';
  if (steps < 2) return keyPair + ': только ' + steps + ' шага «как играть»';
  if (len < 150) return keyPair + ': правил всего ' + len + ' символов';
  return null;
}
const missing = [];
['L2', 'L3', 'LC', 'LC2', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'].forEach(k => {
  SAL.openLesson(k);
  SAL.lessons[k]._st.rulesOpen = true;   /* the click-through above flips the toggle */
  const pane = win.document.getElementById('view-lesson' + SAL.lessons[k].num);
  [...pane.querySelectorAll('.practice-tab-btn[data-game]')].forEach(btn => {
    const gm = btn.getAttribute('data-game');
    SAL.do(k, 'restart', gm);
    const err = rulesProbe(k + ' · ' + gm, arenaOf(k));
    if (err) missing.push(err);
  });
});
ck(missing.length === 0, 'в каждой игре уроков 1–3 и 5–10 есть подробные правила (цель, шаги, счёт)' +
  (missing.length ? ' — ' + missing.join('; ') : ''));

SAL.openLesson('L4');
const l4panel = () => arenaOf('L4').querySelector('.game-rules');
SAL.do('L4', 'restart', 'bingo');
ck(l4panel().querySelectorAll('.rules-row').length >= 3, 'панель правил раскрыта по умолчанию');
SAL.do('L4', 'toggleRules');
ck(l4panel() && l4panel().querySelectorAll('.rules-row').length === 0, 'панель правил свёртывается');
SAL.do('L4', 'toggleRules');
ck(l4panel().querySelectorAll('.rules-row').length >= 3, 'панель правил разворачивается обратно');

SAL.lessons.L4._st.rulesOpen = true;
win.setLanguage('en');
SAL.do('L4', 'restart', 'duel');
ck(/How to play/.test(arenaOf('L4').querySelector('.game-rules-head').textContent) &&
   /Aim/.test(arenaOf('L4').querySelector('.rules-label').textContent) &&
   /Scoring/.test(arenaOf('L4').querySelector('.game-rules').textContent),
  'правила переведены на английский');
win.setLanguage('ru');
SAL.do('L4', 'restart', 'duel');
ck(/Правила игры/.test(arenaOf('L4').querySelector('.game-rules-head').textContent) &&
   /Цель/.test(arenaOf('L4').querySelector('.rules-label').textContent) &&
   /Счёт/.test(arenaOf('L4').querySelector('.game-rules').textContent),
  'правила возвращаются на русский');

/* ---------- над правилами — название игры и её номер, как на вкладке ---------- */
SAL.openLesson('L4');
SAL.do('L4', 'restart', 'tictactoe');
const tttHead = arenaOf('L4').querySelector('.game-title');
ck(tttHead && tttHead.textContent.trim() === '29. Крестики-нолики с проверкой',
  'над правилами крестиков-ноликов — название с номером («' + (tttHead && tttHead.textContent.trim()) + '»)');
ck(arenaOf('L4').firstElementChild === tttHead &&
   arenaOf('L4').children[1].classList.contains('game-rules'),
  'название игры стоит первым, правила — сразу под ним');
SAL.do('L4', 'restart', 'masked');
ck(arenaOf('L4').querySelector('.game-title').textContent.trim() === '1. Закрыто квадратом ■ (Угадай слово)',
  'заголовок меняется вместе с игрой');
win.setLanguage('en');
SAL.do('L4', 'restart', 'tictactoe');
ck(arenaOf('L4').querySelector('.game-title').textContent.trim() === '29. Tic-Tac-Toe with a Quiz',
  'EN: название игры переводится вместе с вкладкой');
win.setLanguage('ru');

/* заголовок каждой игры равен подписи её вкладки — ни один номер не разъехался */
const headDrift = [];
['L2', 'L3', 'LC', 'LC2', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'].forEach(k => {
  SAL.openLesson(k);
  const pane = win.document.getElementById('view-lesson' + SAL.lessons[k].num);
  [...pane.querySelectorAll('.practice-tab-btn[data-game]')].forEach(btn => {
    const gm = btn.getAttribute('data-game');
    SAL.do(k, 'restart', gm);
    const head = arenaOf(k).querySelector('.game-title');
    const tabText = btn.textContent.replace(/\s+/g, ' ').trim();
    if (!head) headDrift.push(k + ' · ' + gm + ': нет заголовка');
    else if (head.textContent.replace(/\s+/g, ' ').trim() !== tabText)
      headDrift.push(k + ' · ' + gm + ': «' + head.textContent.trim() + '» ≠ «' + tabText + '»');
  });
});
ck(headDrift.length === 0, 'у каждой игры заголовок совпадает с вкладкой (номер и название)' +
  (headDrift.length ? ' — ' + headDrift.join('; ') : ''));

/* блок повторения тоже показывает название и номер своей игры */
SAL.openLesson('LC');
SAL.do('LC', 'rcGame', 'wordsearch');
const rcHead = win.document.getElementById('LCRC-practice-arena').querySelector('.game-title');
ck(rcHead && /^14\. Филворд/.test(rcHead.textContent.trim()),
  'повторение: над правилами — название игры с номером («' + (rcHead && rcHead.textContent.trim()) + '»)');

/* the standalone 12-word lesson shares the same rules via SAL.rulesPanel() */
win.switchView('lesson7');
const noRulesL1 = GAMES.filter(gm => {
  win.selectPracticeGame(gm);
  return !l1arena.querySelector('.game-rules');
});
ck(noRulesL1.length === 0, 'урок 7 (12 слов): правила есть во всех 12 играх' +
  (noRulesL1.length ? ' — без правил: ' + noRulesL1.join(', ') : ''));
/* и здесь над правилами стоит название игры с номером из её вкладки */
const noTitleL1 = GAMES.filter(gm => {
  win.selectPracticeGame(gm);
  const head = l1arena.querySelector('.game-title');
  const tab = [...win.document.querySelectorAll('#view-lesson7 .practice-tab-btn[data-game]')]
    .filter(b => b.getAttribute('data-game') === gm)[0];
  return !head || !tab || head.textContent.replace(/\s+/g, ' ').trim() !== tab.textContent.replace(/\s+/g, ' ').trim();
});
ck(noTitleL1.length === 0, 'урок 7 (12 слов): у каждой игры свой заголовок с номером' +
  (noTitleL1.length ? ' — без заголовка: ' + noTitleL1.join(', ') : ''));
win.selectPracticeGame('wordsearch');
ck(/^13\. Филворд \(ищи слова по частям\)$/
    .test(win.document.getElementById('L1B-practice-arena').querySelector('.game-title').textContent.trim()),
  'урок 7 (12 слов): у филворда заголовок 13 — как на вкладке');

/* ---- 13-я вкладка: филворд на странице урока 7 ---- */
console.log('\n===== Урок 7: филворд на отдельной странице =====');
const l3tabs = [...win.document.querySelectorAll('#view-lesson7 .practice-tab-btn[data-game]')]
  .map(b => b.getAttribute('data-game'));
ck(l3tabs.length === 13 && l3tabs[12] === 'wordsearch', 'урок 7: 13-я вкладка — филворд');
ck(!!SAL.lessons.L1B && SAL.lessons.L1B.hidden === true, 'урок 7: конфигурация филворда скрыта от списка уроков');
const navOptions = [...win.document.querySelectorAll('.lesson-select option')].map(o => o.value);
ck(navOptions.indexOf('L1B') < 0, 'урок 7: служебный урок не попал в выпадающий список');
win.selectPracticeGame('wordsearch');
const engineArena = win.document.getElementById('L1B-practice-arena');
const staticArena = win.document.getElementById('lesson1-practice-arena');
ck(engineArena.style.display !== 'none' && staticArena.style.display === 'none',
  'урок 7: филворд рисуется в своей арене, 12 старых игр не тронуты');
const g1b = SAL.lessons.L1B._st.g.wordsearch;
ck(g1b.grid.length === 100 && g1b.places.length === 12,
  'урок 7: в филворде все 12 слов (' + g1b.places.length + ')');
ck(engineArena.querySelectorAll('.ws-board .wcell').length === 100 &&
   engineArena.querySelectorAll('.ws-coord.col').length === 10,
  'урок 7: поле с координатами и сотней клеток');
const bFirst = g1b.places[0];
bFirst.cells.forEach(i => SAL.do('L1B', 'wsTap', String(i)));
ck(SAL.lessons.L1B._st.g.wordsearch.found[bFirst.id] === true, 'урок 7: нажатие клеток находит слово');
ck((SAL.lessons.L1B._st.g.wordsearch.twins || []).length >= 2, 'урок 7: у слов есть двойники-ловушки');
SAL.do('L1B', 'wsSize', '6');
ck(SAL.lessons.L1B._st.g.wordsearch.grid.length === 36, 'урок 7: размер поля переключается');
win.selectPracticeGame('masked');
ck(staticArena.style.display !== 'none' && engineArena.style.display === 'none',
  'урок 7: возврат к обычной игре прячет арену филворда');


/* ===== URL уроков: #/<язык>/<урок> ===== */
console.log('\n===== Адреса уроков =====');
win.switchView('lesson7');
ck(win.location.hash === '#/ru/lesson7', 'адрес урока 7 по-русски: #/ru/lesson7');
win.setLanguage('en');
ck(win.location.hash === '#/en/lesson7', 'переключение на EN меняет адрес: #/en/lesson7');
win.switchView('lesson3');
ck(win.location.hash === '#/en/lesson3', 'урок 3 по-английски: #/en/lesson3');
win.setLanguage('ru');
ck(win.location.hash === '#/ru/lesson3', 'обратно на RU: #/ru/lesson3');
win.switchView('lesson13');
ck(win.location.hash === '#/ru/lesson13', 'у последнего урока свой адрес: #/ru/lesson13');
win.switchView('lesson7');
ck(win.location.hash === '#/ru/lesson7', '12-словная страница: #/ru/lesson7');
win.switchView('details');
ck(win.location.hash === '#/ru/details', 'раздел «о методе» тоже с адресом: #/ru/details');
win.switchView('home');
ck(win.location.hash === '#/ru/home', 'главная: #/ru/home');
ck(win.parseRoute('#/en/lesson10').lang === 'en' && win.parseRoute('#/en/lesson10').view === 'lesson10',
  'адрес #/en/lesson10 разбирается в язык и урок');
ck(win.parseRoute('#/ru/lesson13') !== null && win.parseRoute('#/ru/lesson13').view === 'lesson13',
  'адрес #/ru/lesson13 разбирается в язык и урок');
ck(win.parseRoute('#playground') === null && win.parseRoute('#/xx/lesson7') === null &&
   win.parseRoute('') === null && win.parseRoute('#/ru/nosuchview') === null,
  'якоря и неверные адреса маршрутом не считаются');

/* прямой адрес открывает нужный урок на нужном языке */
win.location.hash = '#/en/lesson8';
win.dispatchEvent(new win.Event('popstate'));
ck(win.location.hash === '#/en/lesson8' && win.document.documentElement.lang === 'en' &&
   win.document.getElementById('view-lesson8').classList.contains('active'),
  'прямая ссылка #/en/lesson8 открывает урок 8 по-английски');
ck(/Lesson 8/.test(win.document.getElementById('view-lesson8').textContent) ||
   win.document.getElementById('view-lesson8').textContent.indexOf('Choose a lesson') >= 0,
  'содержимое урока 8 отрисовано на английском');
win.location.hash = '#/ru/lesson8';
win.dispatchEvent(new win.Event('popstate'));
ck(win.document.documentElement.lang === 'ru' &&
   win.document.getElementById('view-lesson8').classList.contains('active'),
  'прямая ссылка #/ru/lesson8 переключает тот же урок на русский');
win.setLanguage('ru');
win.switchView('home');
ck(win.location.hash === '#/ru/home', 'после проверок адрес снова #/ru/home');

/* ===== заголовок, description и canonical под каждый урок ===== */
console.log('\n===== Метаданные страницы =====');
const metaOf = () => ({
  title: win.document.title,
  desc: (win.document.querySelector('meta[name="description"]') || {}).content || '',
  canonical: (win.document.querySelector('link[rel="canonical"]') || {}).href || '',
  ogTitle: (win.document.querySelector('meta[property="og:title"]') || {}).content || '',
  ogLocale: (win.document.querySelector('meta[property="og:locale"]') || {}).content || ''
});
win.switchView('lesson8');
let mm = metaOf();
ck(mm.title === 'Урок 8: Цифры 1–5 — Sanskrit in Action',
  'заголовок вкладки для урока 8: «' + mm.title + '»');
ck(mm.desc.indexOf('Урок 8: Цифры 1–5') === 0 && mm.desc.indexOf('пять') > 0,
  'description урока 8 собран из названия и темы');
ck(mm.canonical.indexOf('#') < 0 && mm.canonical === win.location.origin + win.location.pathname,
  'canonical указывает на сам документ без фрагмента: ' + mm.canonical);
ck((win.document.querySelector('link[rel="canonical"]') || {}).rel === 'canonical' &&
   win.document.querySelector('link[rel="canonical"]') !== null,
  'link rel=canonical есть в <head> (не создаётся заново при переходах)');
ck(mm.ogTitle === mm.title && mm.ogLocale === 'ru_RU', 'og:title и локаль обновлены (RU)');
win.setLanguage('en');
mm = metaOf();
ck(mm.title === 'Lesson 8: Numbers 1–5 — Sanskrit in Action', 'EN: заголовок «' + mm.title + '»');
ck(mm.desc.indexOf('Lesson 8: Numbers 1–5') === 0 && mm.ogLocale === 'en_GB',
  'EN: description и og:locale');
win.setLanguage('ru');
win.switchView('lesson3');
ck(metaOf().title === 'Урок 3: Цвета — Sanskrit in Action',
  'заголовок урока цветов');
win.setLanguage('en');
ck(metaOf().title === 'Lesson 3: Colours — Sanskrit in Action',
  'EN: заголовок урока цветов');
win.setLanguage('ru');
win.switchView('lesson7');
ck(metaOf().title === 'Урок 7: Части тела (12) — Sanskrit in Action',
  'заголовок отдельной страницы из 12 слов');
win.switchView('lesson6');
ck(metaOf().title === 'Урок 6: Три рода · другие цвета — Sanskrit in Action',
  'заголовок второго урока рода: «' + metaOf().title + '»');
win.switchView('details');
ck(/^Метод и программа курса — /.test(metaOf().title), 'заголовок раздела «о методе»');
win.switchView('home');
ck(/^Sanskrit in Action/.test(metaOf().title), 'заголовок главной восстановлен');

/* ===== метрика: page_view на переход между адресами ===== */
console.log('\n===== Метрика: page_view =====');
ck(typeof win.salPageViews === 'function', 'есть журнал просмотров salPageViews()');
const before = win.salPageViews().length;
const fired = [];
const onPageView = e => fired.push(e.detail);
win.document.addEventListener('sal:pageview', onPageView);
win.switchView('lesson7');
win.switchView('lesson7');          // тот же урок — повтора быть не должно
win.setLanguage('en');
win.switchView('lesson10');
ck(fired.length === 3, 'page_view сработал на каждый новый адрес, без повторов (' + fired.length + ')');
ck(fired[0].route === '#/ru/lesson7' && fired[0].view === 'lesson7' && fired[0].lang === 'ru',
  'событие несёт адрес, урок и язык');
ck(fired[1].route === '#/en/lesson7' && fired[1].lang === 'en', 'переключение языка даёт отдельный page_view');
ck(fired.every(ev => ev.type === 'page_view' && typeof ev.ts === 'number' && ev.title),
  'у каждого события есть тип, время и заголовок');
const pvTail = win.salPageViews().slice(-3).map(ev => ev.route).join(', ');
ck(pvTail === '#/ru/lesson7, #/en/lesson7, #/en/lesson10' &&
   win.salPageViews().length === Math.min(100, before + 3),
  'журнал просмотров пополняется тремя адресами подряд (' + pvTail + ')');
win.setLanguage('ru');
win.switchView('lesson8');
const gtagEvents = [];
const savedGtag = win.gtag;
win.gtag = (cmd, name, params) => gtagEvents.push({ cmd, name, params });
win.switchView('lesson11');
ck(gtagEvents.length === 1 && gtagEvents[0].name === 'page_view' &&
   gtagEvents[0].params.page_path === '#/ru/lesson11' &&
   gtagEvents[0].params.page_title === 'Урок 11: Цифры 16–20 — Sanskrit in Action',
  'при наличии gtag событие уходит в GA4 с page_path и page_title (' +
   JSON.stringify(gtagEvents.map(g => g.params.page_path)) + ')');
win.gtag = savedGtag;
win.document.removeEventListener('sal:pageview', onPageView);
win.switchView('home');

/* ===== озвучка: хинди-движок не должен «съедать» конечную короткую «а» ===== */
console.log('\n===== Озвучка: конечная «а» =====');
const ttsNorm = win.sanskritTtsText;
ck(typeof ttsNorm === 'function', 'есть нормализация текста для озвучки');
ck(ttsNorm('सप्त') === 'सप्ता', 'सप्त → सप्ता (звучит «сапта», а не «сапт»)');
ck(ttsNorm('पञ्च') === 'पञ्चा', 'पञ्च → पञ्चा (звучит «панча», а не «панч»)');
ck(ttsNorm('दश') === 'दशा' && ttsNorm('नव') === 'नवा' && ttsNorm('अष्ट') === 'अष्टा',
  'दश → दशा, नव → नवा, अष्ट → अष्टा');
ck(ttsNorm('षट्') === 'षट्' && ttsNorm('त्रिंशत्') === 'त्रिंशत्',
  'слова на вираме (षट्, त्रिंशत्) не трогаются');
ck(ttsNorm('विंशतिः') === 'विंशतिहि' && ttsNorm('एकं') === 'एकम्',
  'висарга даёт отзвук, конечная анусвара становится «म्»: एकं → एकम्');
ck(ttsNorm('नासिका') === 'नासिका' && ttsNorm('द्वे') === 'द्वे' && ttsNorm('त्रीणि') === 'त्रीणि',
  'конечная долгая гласная не удваивается');
ck(ttsNorm('') === '' && !ttsNorm(null), 'пустой текст не ломает озвучку');

/* то, что реально уходит в движок */
const heard = [];
const realSynth = win.speechSynthesis;
const realUtter = win.SpeechSynthesisUtterance;
win.SpeechSynthesisUtterance = function (t) { this.text = t; };
win.speechSynthesis = {
  cancel() {}, getVoices() { return [{ lang: 'hi-IN', name: 'Hindi' }]; },
  speak(u) { heard.push(u.text); }
};
SAL.speak('सप्त');
SAL.speak('पञ्च');
SAL.speak('षट्');
ck(heard.join('|') === 'सप्ता|पञ्चा|षट्',
  'в хинди-движок уходит सप्ता, पञ्चा, а षट् — как есть (' + heard.join('|') + ')');
SAL.speak(L4.words.filter(w => w.deva === 'पञ्च')[0].ttsText);
ck(heard[heard.length - 1] === 'पञ्चा', 'слово урока тоже озвучивается с конечной ा');

/* ---- какой голос читает слово: один путь для всех браузеров -------------
   Правило одно: слово уходит в движок ДЕВАНАГАРИ и просит хинди-движок
   (lang="hi-IN"), а если в системе есть индийский голос — говорит им.
   Латинской подмены нет ни для Safari, ни для кого-либо ещё. */
const simSpeak = (voices, text) => {
  const got = [];
  win.salTtsResetVoices();
  win.speechSynthesis = {
    speaking: false, pending: false,
    cancel() {}, getVoices() { return voices; },
    speak(u) { got.push({ text: u.text, lang: u.lang, voice: u.voice }); }
  };
  SAL.speak(text);
  return got;
};
const isDeva = t => /[\u0900-\u097F]/.test(t);

/* Chrome: есть хинди-голос — говорим им */
const chromeTts = simSpeak([{ name: 'Google हिन्दी', lang: 'hi-IN' }, { name: 'Samantha', lang: 'en-US' }], 'पादः');
ck(chromeTts.length === 1 && chromeTts[0].text === 'पादहा' &&
   chromeTts[0].voice && chromeTts[0].voice.lang === 'hi-IN',
  'Chrome с хинди-голосом: в движок уходит पादहा и голос hi-IN — ' + chromeTts[0].text);

/* Safari без индийского голоса: всё равно деванагари и hi-IN, без латиницы */
const safariTts = simSpeak([{ name: 'Samantha', lang: 'en-US' }, { name: 'Milena', lang: 'ru-RU' }], 'पादः');
ck(safariTts.length === 1 && safariTts[0].text === 'पादहा' && isDeva(safariTts[0].text),
  'Safari без хинди-голоса: слово всё равно уходит деванагари — ' + safariTts[0].text);
ck(safariTts[0].lang === 'hi-IN' && !safariTts[0].voice,
  'Safari без хинди-голоса: язык фразы — hi-IN, чужой голос не подставляется (' +
    safariTts[0].lang + ')');
const safariWords = SAL.lessons.LG.words.map(w => simSpeak([{ name: 'Samantha', lang: 'en-US' }], w.ttsText)[0].text);
ck(safariWords.every(isDeva) && safariWords.join('|') === SAL.lessons.LG.words.map(w => ttsNorm(w.ttsText)).join('|'),
  'Safari: все восемь слов уходят деванагари, а не латиницей — ' + safariWords.join(' · '));

/* Английский en-IN больше не перехватывает слово: исключений нет */
const enInTts = simSpeak([{ name: 'Rishi', lang: 'en-IN' }, { name: 'Samantha', lang: 'en-US' }], 'हस्तः');
ck(enInTts[0].text === 'हस्तहा' && enInTts[0].lang === 'hi-IN' && !enInTts[0].voice,
  'английские голоса не перехватывают слово: हस्तहा с lang hi-IN — ' + enInTts[0].lang);

/* латинской подмены в проекте больше нет */
ck(typeof win.devaToLatin !== 'function',
  'запасного пути через латиницу больше нет — devaToLatin удалён');

/* Firefox/старый Safari: список голосов ещё пуст — деванагари и hi-IN */
const noVoices = simSpeak([], 'पादः');
ck(noVoices.length === 1 && noVoices[0].text === 'पादहा' && noVoices[0].lang === 'hi-IN',
  'голосов ещё нет: читаем деванагари с lang hi-IN, как и везде');

/* Android/неизвестные системы: язык может прийти как hi_IN */
const underscore = simSpeak([{ name: 'हिन्दी', lang: 'hi_IN' }], 'गौरः');
ck(underscore[0].text === 'गौरहा' && underscore[0].voice.lang === 'hi_IN',
  'язык с подчёркиванием hi_IN тоже опознаётся как хинди');

/* Safari выбрасывает новую фразу, если cancel() и speak() идут подряд:
   новая фраза ставится чуть позже, сразу после cancel(). */
{
  const realTimeout = win.setTimeout;
  const afterCancel = [];
  let cancelled = 0;
  win.salTtsResetVoices();
  win.speechSynthesis = {
    speaking: true, pending: false,
    cancel() { cancelled++; },
    getVoices() { return [{ name: 'Google हिन्दी', lang: 'hi-IN' }]; },
    speak(u) { afterCancel.push(u.text); }
  };
  win.setTimeout = fn => { fn(); return 0; };
  SAL.speak('पादः');
  win.setTimeout = realTimeout;
  ck(cancelled === 1 && afterCancel.length === 1 && afterCancel[0] === 'पादहा',
    'пока звучит прошлая фраза: cancel(), затем новая фраза — ' + afterCancel.join('|'));
}

win.speechSynthesis = realSynth;
win.SpeechSynthesisUtterance = realUtter;

/* ==========================================================================
   Режим «2 ученика»: честный переключатель + четыре новые парные игры
   --------------------------------------------------------------------------
   Раньше 👥 показывался над всеми играми, хотя второй ученик был только в 7,
   а нажатие стирало прогресс соло-игры. Теперь переключатель виден лишь там,
   где режим действительно есть (11 игр), у остальных — подпись «для одного».
   ========================================================================== */
console.log('\n===== Режим «2 ученика» =====');
{
  const DUO_EXPECT = ['battleship', 'bingo', 'duel', 'describe', 'orderrelay',
    'coopmemory', 'tictactoe', 'memory', 'match', 'blindboard', 'snowball'].sort();
  ck(SAL.duoGames().sort().join() === DUO_EXPECT.join(),
    'парных игр ровно 11: ' + SAL.duoGames().length + ' (7 прежних + memory, match, blindboard, snowball)');

  /* переключатель виден только у парных игр, у соло — подпись */
  SAL.openLesson('L4');
  const gamesL4 = Array.from(win.document.getElementById('view-lesson8')
    .querySelectorAll('.practice-tab-btn[data-game]')).map(b => b.getAttribute('data-game'));
  const shownBad = [];
  gamesL4.forEach(g => {
    SAL.do('L4', 'setGame', g);
    const toggle = win.document.getElementById('L4-players-toggle');
    const note = win.document.getElementById('L4-solo-note');
    const shown = toggle && toggle.style.display !== 'none';
    const noteShown = note && note.style.display !== 'none';
    if (shown !== SAL.isDuoGame(g)) shownBad.push(g + ' (путаница)');
    if (noteShown === SAL.isDuoGame(g)) shownBad.push(g + ' (подпись не там)');
  });
  ck(shownBad.length === 0, '👤/👥 виден ровно у парных игр, у соло — «эта игра для одного ученика»' +
    (shownBad.length ? ' — ' + shownBad.join(', ') : ''));
  const soloCount = gamesL4.filter(g => !SAL.isDuoGame(g)).length;
  ck(soloCount === gamesL4.length - 11, 'соло-игр в уроке 6: ' + soloCount + ' из ' + gamesL4.length);

  /* в уроках 1–4 есть match и memory, поэтому переключатель доступен и там */
  SAL.openLesson('L2');
  SAL.do('L2', 'setGame', 'memory');
  ck(win.document.getElementById('L2-players-toggle').style.display !== 'none',
    'урок 1: у «Мемори» переключатель есть (парная игра)');
  SAL.do('L2', 'setGame', 'gaps');
  ck(win.document.getElementById('L2-players-toggle').style.display === 'none',
    'урок 1: у «Пропусков» переключателя нет (соло)');

  /* прогресс соло-игры не стирается */
  SAL.do('L2', 'setPlayers', '1');
  SAL.do('L2', 'setGame', 'gaps');
  const gGaps = SAL.lessons.L2._st.g.gaps;
  gGaps.score = 4; gGaps.i = 2;
  SAL.do('L2', 'setPlayers', '2');
  ck(gGaps.score === 4 && gGaps.i === 2,
    'соло-игра не теряет прогресс при переключении «Кто играет»');

  /* смена режима в парной игре начинает её заново */
  SAL.openLesson('L4');
  SAL.do('L4', 'setGame', 'memory');
  SAL.do('L4', 'setPlayers', '2');
  const mem = SAL.lessons.L4._st.g.memory;
  ck(mem.scores.join() === '0,0' && mem.turn === 0, '«2 ученика»: у «Мемори» свой счёт и первый ход');

  /* --- Мемори вдвоём: нашёл пару — очко и ход остаётся, промах — ход переходит --- */
  const findPair = (cards, same) => {
    for (let i = 0; i < cards.length; i++) for (let j = i + 1; j < cards.length; j++) {
      const okId = same ? cards[i].id === cards[j].id : cards[i].id !== cards[j].id;
      const okKind = cards[i].kind !== cards[j].kind || !same;
      if (okId && okKind && !mem.matched[cards[i].id] && !mem.matched[cards[j].id]) return [i, j];
    }
    return [-1, -1];
  };
  let [m1, m2] = findPair(mem.cards, true);
  SAL.do('L4', 'tile', String(m1)); SAL.do('L4', 'tile', String(m2));
  ck(mem.scores.join() === '1,0' && mem.turn === 0,
    '«Мемори» вдвоём: пара приносит очко ученику 1, ход остаётся у него');
  let [n1, n2] = findPair(mem.cards, false);
  SAL.do('L4', 'tile', String(n1)); SAL.do('L4', 'tile', String(n2));
  ck(mem.turn === 1, '«Мемори» вдвоём: промах передаёт ход ученику 2');

  /* --- Match Pairs вдвоём --- */
  SAL.do('L4', 'setPlayers', '2');
  SAL.do('L4', 'setGame', 'match');
  const mt = SAL.lessons.L4._st.g.match;
  let [t1, t2] = [-1, -1];
  for (let i = 0; i < mt.tiles.length; i++) for (let j = i + 1; j < mt.tiles.length; j++)
    if (mt.tiles[i].id === mt.tiles[j].id && mt.tiles[i].kind !== mt.tiles[j].kind && t1 < 0) { t1 = i; t2 = j; }
  SAL.do('L4', 'tile', String(t1)); SAL.do('L4', 'tile', String(t2));
  ck(mt.scores.join() === '1,0' && mt.turn === 0, '«Match Pairs» вдвоём: пара — очко ученику 1, ход у него');
  let [u1, u2] = [-1, -1];
  for (let i = 0; i < mt.tiles.length; i++) for (let j = i + 1; j < mt.tiles.length; j++)
    if (mt.tiles[i].id !== mt.tiles[j].id && u1 < 0 && !mt.matched[mt.tiles[i].id] && !mt.matched[mt.tiles[j].id]) { u1 = i; u2 = j; }
  SAL.do('L4', 'tile', String(u1)); SAL.do('L4', 'tile', String(u2));
  ck(mt.turn === 1, '«Match Pairs» вдвоём: промах передаёт ход');

  /* --- Слепое поле вдвоём --- */
  SAL.do('L4', 'setPlayers', '2');
  SAL.do('L4', 'setGame', 'blindboard');
  const bb = SAL.lessons.L4._st.g.blindboard;
  bb.phase = 'ask'; bb.ask = 0;
  SAL.do('L4', 'blindPick', bb.cards[0]);
  ck(bb.scores[0] === 1, '«Слепое поле» вдвоём: верный ответ — очко отвечавшему');
  SAL.do('L4', 'blindNext');
  ck(bb.turn === 1, '«Слепое поле» вдвоём: следующий вопрос — другому ученику');

  /* --- Снежный ком вдвоём --- */
  SAL.do('L4', 'setPlayers', '2');
  SAL.do('L4', 'setGame', 'snowball');
  const sn = SAL.lessons.L4._st.g.snowball;
  SAL.do('L4', 'snowGrade', '1');
  ck(sn.scores.join() === '1,0' && sn.turn === 1 && sn.step === 2,
    '«Снежный ком» вдвоём: ✓ — очко говорившему, цепочку дальше называет второй');

  /* --- соло: двое не просачиваются --- */
  SAL.do('L4', 'setPlayers', '1');
  SAL.do('L4', 'setGame', 'memory');
  const soloPills = Array.from(win.document.getElementById('L4-practice-arena')
    .querySelectorAll('.game-score-pill')).map(p => p.textContent.trim());
  ck(!soloPills.some(t => /^Ход:|^1 — |^2 — /.test(t)),
    '«Мемори» соло: плашек «1 — / 2 — / Ход» нет (' + soloPills.join(' · ') + ')');

  const cssDuo = fs.readFileSync(path.join(REPO, 'styles.css'), 'utf8');
  ck(/\.players-toggle\s*\{/.test(cssDuo) && /\.practice-extra-note\.solo-note\s*\{/.test(cssDuo),
    'стили: обёртка переключателя и подпись «для одного» описаны');
  SAL.openLesson('L4');
}

/* ==========================================================================
   «🙈 Скрыть подписи» действительно скрывает подписи — во всех режимах
   --------------------------------------------------------------------------
   Жалоба: в первом режиме Presentation кнопка нажималась, но на экране
   ничего не менялось. Причина: класс labels-hidden вешался только на плакат.
   ========================================================================== */
console.log('\n===== Кнопка «Скрыть подписи» (все режимы Presentation) =====');
{
  const css = fs.readFileSync(path.join(REPO, 'styles.css'), 'utf8');
  ck(/\.labels-hidden\s+\.vocab-deva/.test(css) && /filter:\s*blur\(/.test(css),
    'стили: при labels-hidden подписи размываются (filter: blur)');
  ck(!/\.labels-hidden[^{]*:hover/.test(css),
    'скрытие настоящее: наведение курсора больше не проявляет подпись');
  ck(/\.labels-hidden\s+\.masked-word-line\s*>\s*span:first-child/.test(css),
    'в связке 🟪 + 🙈 размывается и видимая часть слова (квадратик остаётся чётким)');

  const MODE_RU = { stepbystep: '1. Пошагово', hotspots: '2. Схема', audiofirst: '3. Сначала звук', poster: '4. Плакат' };
  const labelsOn = key => /^👁/.test(win.document.getElementById(key + '-labels-btn').innerHTML);

  for (const key of ['L2', 'L4', 'LC2']) {
    SAL.openLesson(key);
    const grid = win.document.getElementById(key + '-pres-grid');
    const bad = [];
    for (const mode of PRESMODES) {
      SAL.do(key, 'setPresMode', mode);
      /* включаем, если было выключено */
      if (labelsOn(key)) SAL.do(key, 'toggleLabels');
      if (grid.classList.contains('labels-hidden')) bad.push(mode + ': класс не снят');
      if (!/🙈/.test(win.document.getElementById(key + '-labels-btn').innerHTML)) bad.push(mode + ': надпись кнопки');

      SAL.do(key, 'toggleLabels');
      if (!grid.classList.contains('labels-hidden')) bad.push(mode + ': подписи не скрылись');
      if (!/^👁/.test(win.document.getElementById(key + '-labels-btn').innerHTML)) bad.push(mode + ': кнопка не сменилась на «Показать»');
      if (!win.document.getElementById(key + '-labels-btn').classList.contains('active')) bad.push(mode + ': кнопка не подсвечена');

      SAL.do(key, 'toggleLabels');
      if (grid.classList.contains('labels-hidden')) bad.push(mode + ': подписи не вернулись');
    }
    SAL.do(key, 'setPresMode', 'stepbystep');
    ck(bad.length === 0, key + ': «Скрыть подписи» срабатывает во всех четырёх режимах' +
      (bad.length ? ' — ' + bad.join('; ') : ''));
  }

  /* в «Пошагово» и «Схеме» вкладки и точки тоже не выдают слова */
  SAL.openLesson('L4');
  SAL.do('L4', 'setPresMode', 'stepbystep');
  SAL.do('L4', 'toggleLabels');
  const stepChips = Array.from(win.document.getElementById('L4-pres-grid').querySelectorAll('.chip-btn'))
    .map(b => b.textContent.trim()).filter(t => /^\d+/.test(t));
  ck(stepChips.length > 0 && stepChips.every(t => /^\d+$/.test(t)),
    '«Пошагово» при скрытых подписях: на вкладках шагов только номера (' + stepChips.slice(0, 4).join(' · ') + ')');
  const anyDeva = /[\u0900-\u097F]/.test(win.document.getElementById('L4-pres-grid').textContent);
  ck(anyDeva, '«Пошагово» при скрытых подписях: сами слова на карточках остались (их размывает CSS)');
  SAL.do('L4', 'toggleLabels');
  ck(/[\u0900-\u097F]/.test(Array.from(win.document.getElementById('L4-pres-grid').querySelectorAll('.chip-btn'))
    .map(b => b.textContent).join(' ')), '«Пошагово»: подписи вернулись и на вкладках');

  SAL.do('L4', 'setPresMode', 'hotspots');
  SAL.do('L4', 'toggleLabels');
  const hotChips = Array.from(win.document.getElementById('L4-pres-grid').querySelectorAll('.chip-btn'))
    .map(b => b.textContent.trim()).filter(t => /^\d+$/.test(t));
  ck(hotChips.length >= 4, '«Схема» при скрытых подписях: кнопки-точки показывают только номера');
  SAL.do('L4', 'toggleLabels');

  /* рукописная страница урока 7 — та же кнопка */
  win.switchView('lesson7');
  if (typeof win.setPresentationMode === 'function') win.setPresentationMode('stepbystep');
  if (typeof win.toggleVocabLabels === 'function') {
    if (win.document.getElementById('lesson1-vocab-grid').classList.contains('labels-hidden')) win.toggleVocabLabels();
    win.toggleVocabLabels();
    const g5 = win.document.getElementById('lesson1-vocab-grid');
    const chips5 = Array.from(g5.querySelectorAll('.chip-btn')).map(b => b.textContent.trim()).filter(t => /^\d+/.test(t));
    ck(g5.classList.contains('labels-hidden'), 'урок 7: «Скрыть подписи» ставит labels-hidden на сетку');
    ck(chips5.length > 0 && chips5.every(t => /^\d+$/.test(t)),
      'урок 7, «Пошагово»: на вкладках шагов тоже только номера');
    ck(!/[\u0900-\u097F]/.test((g5.textContent.match(/Шаг \d+ из \d+/) || [''])[0]) &&
       /Шаг \d+ из \d+/.test(g5.textContent),
      'урок 7: заголовок шага при скрытых подписях — «Шаг N из 6», без слов');
    win.toggleVocabLabels();
    ck(!g5.classList.contains('labels-hidden'), 'урок 7: подписи возвращаются');
  }
  SAL.openLesson('L4');
}

/* ==========================================================================
   «Начать сначала» не прокручивает страницу
   --------------------------------------------------------------------------
   Жалоба: в Production (спринт на время) кнопка ↺ увозила экран вверх.
   Причина была в ackClick: любой restart адресовался practice-арене, а она
   стоит выше production; ensureStageVisible честно доводил туда страницу.
   Тест подменяет раскладку (getBoundingClientRect) и scrollTo, «ставит»
   страницу на Production и проверяет, что restart не двигает экран.
   ========================================================================== */
console.log('\n===== Restart не прокручивает экран =====');
{
  const scroll = { y: 2400, calls: [] };
  const realInner = Object.getOwnPropertyDescriptor(win, 'innerHeight');
  const realOffset = Object.getOwnPropertyDescriptor(win, 'pageYOffset');
  const realScrollTo = win.scrollTo;
  const realRect = win.Element.prototype.getBoundingClientRect;
  const OFFSETS = { 'L4-practice-arena': 1100, 'L4-production-stage': 2500, 'L4-pres-grid': 300 };
  const header = win.document.querySelector('.site-header');
  win.innerHeight = 900;
  Object.defineProperty(win, 'pageYOffset', { get: () => scroll.y, configurable: true });
  win.scrollTo = opts => { scroll.calls.push(typeof opts === 'number' ? opts : opts && opts.top); };
  win.Element.prototype.getBoundingClientRect = function () {
    if (this === header || (this.classList && this.classList.contains('site-header'))) {
      return { top: 0, height: 70, bottom: 70, left: 0, right: 800, width: 800 };
    }
    const docTop = OFFSETS[this.id];
    if (docTop == null) return { top: 0, height: 0, bottom: 0, left: 0, right: 0, width: 0 };
    return { top: docTop - scroll.y, height: 600, bottom: docTop - scroll.y + 600, left: 0, right: 800, width: 800 };
  };

  SAL.openLesson('L4');
  SAL.do('L4', 'setProdMode', 'sprint');
  scroll.calls.length = 0;

  const quiet = (label, fn) => {
    const before = scroll.calls.length;
    fn();
    ck(scroll.calls.length === before, label + (scroll.calls.length === before ? '' :
      ' — уехало на ' + JSON.stringify(scroll.calls.slice(before))));
  };

  quiet('спринт: кнопка ↺ «Начать сначала» не прокручивает страницу',
    () => SAL.do('L4', 'sprintRestart'));
  quiet('спринт: ↺ на финальном экране (restart + sprintRestart) не прокручивает',
    () => SAL.do('L4', 'restart', 'sprintRestart'));
  quiet('микрофон: ↺ не прокручивает', () => SAL.do('L4', 'micRestart'));
  quiet('«Что пропало?»: ↺ не прокручивает', () => SAL.do('L4', 'missingRestart'));
  quiet('Practice: ↺ не прокручивает', () => SAL.do('L4', 'restart', 'masked'));
  quiet('блок повторения: ↺ не прокручивает', () => {
    SAL.do('L4', 'rcGame', 'memory', 0);
    SAL.do('L4RC', 'restart', 'memory');
  });

  /* production-restart адресуется production-сцене, а не арене Practice */
  SAL.do('L4', 'setProdMode', 'sprint');
  scroll.calls.length = 0;
  SAL.do('L4', 'sprintRestart');
  ck(scroll.calls.length === 0, 'сцена рестарта — production, а не Practice (прокрутки нет)');

  /* а переключение режима по-прежнему доводит сцену до экрана */
  scroll.y = 0;
  scroll.calls.length = 0;
  SAL.do('L4', 'setProdMode', 'mic');
  ck(scroll.calls.length === 1 && scroll.calls[0] === 2500 - 70 - 12,
    'переключение режима Production по-прежнему прокручивает к своей сцене (' + JSON.stringify(scroll.calls) + ')');

  /* рестарт спринта не должен сбивать Practice на первую игру */
  SAL.do('L4', 'setGame', 'memory');
  const practiceBefore = arenaOf('L4').innerHTML;
  SAL.do('L4', 'restart', 'sprintRestart');
  ck(arenaOf('L4').innerHTML === practiceBefore,
    '«Начать сначала» в спринте не переключает Practice на первую игру');
  const activeTabs = Array.from(win.document.getElementById('view-lesson' + SAL.lessons.L4.num)
    .querySelectorAll('.practice-tab-btn[data-game].active'));
  ck(activeTabs.length === 1 && activeTabs[0].getAttribute('data-game') === 'memory',
    'после рестарта спринта вкладка Practice остаётся «Мемори»');

  /* и сам спринт действительно начинается заново */
  const sp = SAL.lessons.L4._st.prod.sprint;
  ck(sp.i === 0 && sp.score === 0 && !sp.finished,
    'рестарт спринта обнуляет индекс и счёт');

  win.Element.prototype.getBoundingClientRect = realRect;
  win.scrollTo = realScrollTo;
  if (realOffset) Object.defineProperty(win, 'pageYOffset', realOffset);
  else delete win.pageYOffset;
  if (realInner) Object.defineProperty(win, 'innerHeight', realInner);
  SAL.openLesson('L4');
}

/* ==========================================================================
   УРОК 5 · लिङ्गानि «Три рода» — guided discovery и родовые ловушки
   ========================================================================== */
console.log('\n===== Урок 5 · Три рода (LG) =====');
{
  const LG = SAL.lessons.LG;
  const doc = win.document;
  ck(!!LG && LG.num === 5, 'LG зарегистрирован под номером 5');
  ck(['L2', 'L3', 'LC', 'LC2', 'LG'].every(k => SAL.lessons[k]) &&
     SAL.lessons.LC2.num === 4 && LG.num === 5 && SAL.lessons.LG2.num === 6 &&
     SAL.lessons.L4.num === 8,
    'LG стоит между «Ещё цвета» (4) и вторым уроком рода (6)');

  /* --- восемь существительных и их род ------------------------------------ */
  const GENDER = { hasta: 'm', danta: 'm', pada: 'm',
                   lalata: 'n', udara: 'n', nayana: 'n', mukha: 'n', jihva: 'f' };
  const ENDING = { m: 'ः', n: 'म्', f: 'ा' };
  ck(LG.words.length === 8, 'в уроке ровно 8 существительных (' + LG.words.length + ')');
  ck(LG.words.every(w => GENDER[w.id] === w.gender),
    'род восьми слов: ' + LG.words.map(w => w.id + '=' + w.gender).join(', '));
  const ENDING_RE = { m: /\u0903$/, n: /(\u0902|\u092e\u094d)$/, f: /\u093e$/ };
  ck(LG.words.every(w => ENDING_RE[w.gender].test(w.deva)),
    'окончание слова и есть род: ः — м., म् — ср., ा — ж.');
  ck(LG.words.filter(w => w.gender === 'm').length === 3 &&
     LG.words.filter(w => w.gender === 'n').length === 4 &&
     LG.words.filter(w => w.gender === 'f').length === 1,
    'три мужских, четыре средних, один женский — как в восьми предложениях');

  /* --- цвета уроков 3–4: шесть разных ------------------------------------ */
  const colours = LG.words.map(w => w.deva.split(' ')[0]);
  ck(colours.every(c => /^(श्याम|श्वेत|गौर|पाटल|नील|रक्त)/.test(c)),
    'все цвета — из уроков 3–4: ' + [...new Set(colours)].join(' · '));

  /* --- пропуски спрашивают только окончание, варианты все настоящие ------ */
  ck(LG.words.every(w => w.gapAnswer === ENDING[w.gender]),
    'в «Пропусках» ответ — окончание своего рода: ' + LG.words.map(w => w.gapAnswer).join(' '));
  ck(LG.words.every(w => ['ः', 'म्', 'ा'].every(s => w.gapChoices.some(c => c.deva === s))),
    'в каждом пропуске три варианта ः / म् / ा — выдуманных окончаний нет');
  ck(LG.words.every(w => w.gapChoices.every(c => ['ः', 'म्', 'ा'].indexOf(c.deva) >= 0)),
    'кроме ः / म् / ा в пропусках ничего не предлагается');

  /* --- данные слов складываются обратно ---------------------------------- */
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
  LG.words.forEach(w => {
    if (w.maskedPrefix + w.maskedHidden !== w.deva) broken.push(w.deva + ': masked');
    if (nospace(w.gapDeva).replace('_', w.gapAnswer) !== nospace(w.deva)) broken.push(w.deva + ': gap');
    if (nospace(w.missingDisplay).replace('_', w.missingAnswer) !== nospace(w.deva)) broken.push(w.deva + ': missing');
    if (!w.gapChoices.some(c => c.deva === w.gapAnswer)) broken.push(w.deva + ': gapChoices');
    if (!w.missingChoices.includes(w.missingAnswer)) broken.push(w.deva + ': missingChoices');
    if (editDist(w.deva, w.typoDeva) !== 1) broken.push(w.deva + ': опечатка не в одну букву');
    if (w.syll && w.syll.join('') !== nospace(w.deva)) broken.push(w.deva + ': слоги не складываются в слово');
  });
  ck(broken.length === 0, 'данные слов согласованы' + (broken.length ? ' — ' + broken.join('; ') : ''));

  /* --- «Закрыто квадратом»: вторая версия с двумя окончаниями ------------ */
  /* В уроке рода закрыт не только конец существительного, но и конец
     прилагательного: ученик восстанавливает оба окончания и видит, что цвет
     согласуется со словом. Ничего не выдумываем — обе части режутся по
     уже существующим w.syll и w.maskedPrefix. */
  {
    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'masked');
    SAL.do('LG', 'restart', 'masked');
    const pane = win.document.getElementById('view-lesson5');
    const arena = arenaOf('LG');
    /* арену перезапрашиваем каждый раз: смена языка пересобирает панель
       урока, и прежняя ссылка на узел становится отсоединённой */
    const lineOf = () => {
      const l = arenaOf('LG').querySelector('.masked-word-line');
      return l ? l.textContent.replace(/\u00A0/g, ' ') : '';
    };

    /* переключатель версий есть и подписан */
    const verRow = arena.querySelector('.game-ver-row');
    ck(!!verRow, 'урок 5, игра 1: есть переключатель двух версий игры');
    const verBtns = verRow ? [...verRow.querySelectorAll('[data-onclick]')] : [];
    const verChips = [...(verRow ? verRow.querySelectorAll('.chip-btn') : [])];
    ck(verChips.length === 2, 'урок 5, игра 1: в переключателе ровно две версии (' + verChips.length + ')');
    ck(verChips.length === 2 && verChips[0].classList.contains('active'),
      'урок 5, игра 1: по умолчанию открыта первая версия — закрыт только конец слова');
    const verLabels = verChips.map(b => b.textContent.trim());
    ck(verLabels[0].indexOf('1') === 0 && verLabels[1].indexOf('2') === 0 &&
       /конец слова/.test(verLabels[0]) && /оба окончания/.test(verLabels[1]),
      'урок 5, игра 1: версии подписаны по-русски — ' + verLabels.join(' | '));

    /* версия 1: одна ■, конец существительного */
    const one = lineOf();
    ck((one.match(/■/g) || []).length === 1,
      'версия 1: закрыт один квадратик — ' + one);

    /* версия 2: два квадратика, оба конца закрыты */
    SAL.do('LG', 'maskedBoth', '1');
    ck(gst('LG', 'masked').both === true, 'версия 2 включается');
    const two = lineOf();
    ck((two.match(/■/g) || []).length === 2,
      'версия 2: закрыты два квадратика — ' + two);
    const hint = arena.querySelector('.game-both-hint');
    ck(!!hint && /оба окончания/i.test(hint.textContent),
      'версия 2: есть подсказка про согласование — ' + (hint ? hint.textContent.trim() : '—'));

    /* каждая из восьми фраз: закрытая часть — последняя акшара прилагательного
       и конец существительного; после открытия фраза собирается дословно */
    const brokenBoth = [];
    LG.words.forEach((w, idx) => {
      SAL.do('LG', 'restart', 'masked');
      SAL.do('LG', 'maskedBoth', '1');
      for (let k = 0; k < idx; k++) SAL.do('LG', 'maskedGrade', '1');
      const masked = lineOf();
      const squares = (masked.match(/■/g) || []).length;
      SAL.do('LG', 'maskedFlip');
      const shown = lineOf();
      const adjEnd = w.syll[w.syll.findIndex((_, i) => w.syll.slice(0, i + 1).join('') === w.deva.split(' ')[0])];
      if (squares !== 2) brokenBoth.push(w.deva + ': квадратиков ' + squares);
      if (shown !== w.deva) brokenBoth.push(w.deva + ': открылось «' + shown + '»');
      if (masked.indexOf(adjEnd) >= 0) brokenBoth.push(w.deva + ': окончание «' + adjEnd + '» не закрыто');
    });
    ck(brokenBoth.length === 0,
      'версия 2: во всех восьми фразах закрыты оба конца и открываются дословно' +
      (brokenBoth.length ? ' — ' + brokenBoth.join('; ') : ''));

    /* открытие показывает обе закрытые части сразу */
    SAL.do('LG', 'restart', 'masked');
    SAL.do('LG', 'maskedBoth', '1');
    SAL.do('LG', 'maskedFlip');
    ck(lineOf() === LG.words[0].deva && arena.querySelectorAll('.pink-mask-square.revealed').length === 2,
      'версия 2: одно нажатие открывает обе закрытые части — ' + lineOf());

    /* сетка 8 / 8 тоже respects версию */
    SAL.do('LG', 'maskedBoth', '1');
    SAL.do('LG', 'maskedView', 'grid');
    const gridLines = [...arena.querySelectorAll('.masked-word-line')].map(l => l.textContent);
    ck(gridLines.length === 8 && gridLines.every(t => (t.match(/■/g) || []).length === 2),
      'версия 2 работает и в сетке 8 / 8: у всех карточек по два квадратика');
    SAL.do('LG', 'maskedView', 'card');

    /* в остальных уроках переключателя нет — там закрыт только конец слова */
    const others = [];
    ['L2', 'L3', 'LC', 'LC2', 'L4'].forEach(k => {
      SAL.openLesson(k);
      SAL.do(k, 'setGame', 'masked');
      if (arenaOf(k).querySelector('.game-ver-row')) others.push(k);
    });
    ck(others.length === 0,
      'в уроках без прилагательных переключателя версий нет' +
      (others.length ? ': ' + others.join(', ') : ''));

    /* по-английски подписи тоже переведены */
    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'masked');
    win.setLanguage('en');
    const enRow = arenaOf('LG').querySelector('.game-ver-row');
    const enLabels = enRow ? [...enRow.querySelectorAll('.chip-btn')].map(b => b.textContent.trim()) : [];
    ck(enLabels.length === 2 && !/[\u0400-\u04FF]/.test(enLabels.join(' ')) &&
       /noun ending/.test(enLabels[0]) && /both endings/.test(enLabels[1]),
      'английская версия: версии подписаны по-английски — ' + enLabels.join(' | '));
    win.setLanguage('ru');

    /* в связке 🟪 + 🙈 размываются обе видимые части, квадратики остаются */
    const cssAll = fs.readFileSync(path.join(REPO, 'styles.css'), 'utf8');
    ck(/\.labels-hidden\s+\.masked-word-line\s+\.masked-part\s*\{[^}]*filter:\s*blur/.test(cssAll),
      'стили: при скрытых подписях размываются обе видимые части слова');

    /* смена версии снова закрывает слово: иначе ответ виден с прошлого раза.
       Проверяем в самом конце — переключение урока сбрасывает отрисовку. */
    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'masked');
    SAL.do('LG', 'restart', 'masked');
    SAL.do('LG', 'maskedBoth', '0');
    SAL.do('LG', 'maskedFlip');
    ck(gst('LG', 'masked').shown === true, 'версия 1: слово открыли');
    SAL.do('LG', 'maskedBoth', '1');
    ck(gst('LG', 'masked').shown === false && /■/.test(lineOf()),
      'смена версии закрывает слово заново — ' + lineOf());

    /* в правилах игры про вторую версию сказано, и только в уроке рода */
    SAL.do('LG', 'restart', 'masked');
    const rulesLg = arenaOf('LG').querySelector('.game-rules');
    ck(!!rulesLg && /Версия 2/.test(rulesLg.textContent) &&
       /закрывает ещё и конец прилагательного/.test(rulesLg.textContent),
      'правила игры в уроке рода объясняют вторую версию');
    SAL.openLesson('L2');
    SAL.do('L2', 'setGame', 'masked');
    const rulesL2 = arenaOf('L2').querySelector('.game-rules');
    ck(!!rulesL2 && rulesL2.textContent.indexOf('Версия 2') < 0,
      'в уроке без прилагательных правила про вторую версию не упоминают');

    SAL.openLesson('LG');
    SAL.do('LG', 'restart', 'masked');
    SAL.do('LG', 'setGame', 'masked');
  }

  /* --- «Пропуски»: две версии, разница только в подчёркивании ---------------
     Версия 1 закрывает конец существительного: श्यामं ललाट_. Версия 2 — ещё и
     конец прилагательного: श्या_ ललाट_. Ответ остаётся один (w.gapAnswer):
     окончание у цвета и у слова общее, поэтому оно подходит обоим пропускам. */
  {
    const gapArena = () => arenaOf('LG');
    const gapLine = () => {
      const el = gapArena().querySelector('div[style*="2.6rem"]');
      return el ? el.textContent.trim() : '';
    };
    const gapIastLine = () => {
      const el = gapArena().querySelector('.iast-text');
      return el ? el.textContent.trim() : '';
    };

    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'gaps');
    SAL.do('LG', 'restart', 'gaps');

    const gRow = gapArena().querySelector('.game-ver-row');
    ck(!!gRow, '«Пропуски»: есть переключатель двух версий');
    const gChips = [...(gRow ? gRow.querySelectorAll('.chip-btn') : [])];
    ck(gChips.length === 2 && gChips[0].classList.contains('active'),
      '«Пропуски»: две версии, первая открыта по умолчанию');
    const gLabels = gChips.map(b => b.textContent.trim());
    ck(gLabels.length === 2 && /конец слова/.test(gLabels[0]) && /оба окончания/.test(gLabels[1]),
      '«Пропуски»: версии подписаны по-русски — ' + gLabels.join(' | '));

    /* версия 1: одна черта, конец слова, как и раньше */
    const v1bad = [];
    LG.words.forEach((w, idx) => {
      SAL.do('LG', 'restart', 'gaps');
      SAL.do('LG', 'gapBoth', '0');
      for (let k = 0; k < idx; k++) { SAL.do('LG', 'gapPick', LG.words[k].gapAnswer); SAL.do('LG', 'gapsNext'); }
      if (gapLine() !== w.gapDeva) v1bad.push(w.deva + ' → ' + gapLine());
      if (gapIastLine() !== w.gapIast) v1bad.push(w.iast + ' → ' + gapIastLine());
    });
    ck(v1bad.length === 0, '«Пропуски», версия 1: у всех восьми слов один пропуск в конце слова' +
      (v1bad.length ? ' — ' + v1bad.join('; ') : ''));

    /* версия 2: два пропуска, и оба принимают один и тот же ответ */
    const v2bad = [];
    LG.words.forEach((w, idx) => {
      SAL.do('LG', 'restart', 'gaps');
      SAL.do('LG', 'gapBoth', '1');
      for (let k = 0; k < idx; k++) { SAL.do('LG', 'gapPick', LG.words[k].gapAnswer); SAL.do('LG', 'gapsNext'); }
      const line = gapLine(), iast = gapIastLine();
      const cut = w.syll.findIndex((_, i) => w.syll.slice(0, i + 1).join('') === w.deva.split(' ')[0]);
      const adjEnd = w.syll[cut];
      const filled = line.split('_').length - 1 === 2 ? line.replace('_', adjEnd).replace('_', w.gapAnswer) : '';
      const iastAdj = iast.split(' ')[0].replace(/_+$/, '');
      if (line.split('_').length - 1 !== 2) v2bad.push(w.deva + ': черт ' + (line.split('_').length - 1));
      if (filled !== w.deva) v2bad.push(w.deva + ': собралось «' + filled + '»');
      if (line.split('_')[0] === w.deva.split(' ')[0]) v2bad.push(w.deva + ': конец прилагательного не закрыт');
      if (line.split('_')[0].indexOf(adjEnd) >= 0) v2bad.push(w.deva + ': окончание цвета видно');
      if (iast.split('_').length - 1 !== 2) v2bad.push(w.iast + ': в IAST черт ' + (iast.split('_').length - 1));
      if (!iastAdj || w.iast.split(' ')[0].indexOf(iastAdj) !== 0 || iastAdj === w.iast.split(' ')[0])
        v2bad.push(w.iast + ': IAST «' + iastAdj + '» — не укороченное прилагательное');
      if (iast.split(' ')[1] !== w.gapIast.split(' ').pop()) v2bad.push(w.iast + ': конец слова изменился');
    });
    ck(v2bad.length === 0, '«Пропуски», версия 2: два пропуска, в IAST тоже, ответ подходит к обоим' +
      (v2bad.length ? ' — ' + v2bad.join('; ') : ''));

    /* ответ по-прежнему один: выбираем w.gapAnswer — и заполняются оба пропуска */
    SAL.do('LG', 'restart', 'gaps');
    SAL.do('LG', 'gapBoth', '1');
    const gw0 = LG.words[0];
    const choicesOk = gw0.gapChoices.some(c => c.deva === gw0.gapAnswer);
    SAL.do('LG', 'gapPick', gw0.gapAnswer);
    ck(choicesOk && gst('LG', 'gaps').answered === true,
      '«Пропуски», версия 2: варианты прежние, ответ всё тот же «' + gw0.gapAnswer + '»');

    /* смена версии не оставляет на экране прошлый ответ */
    SAL.do('LG', 'gapBoth', '0');
    ck(gst('LG', 'gaps').answered === false && !gst('LG', 'gaps').picked,
      '«Пропуски»: смена версии убирает показанный ответ');
    SAL.do('LG', 'gapBoth', '1');
    ck(gapLine().split('_').length - 1 === 2, '«Пропуски»: после возврата к версии 2 снова два пропуска — ' + gapLine());

    /* в уроке без прилагательных переключателя нет */
    SAL.openLesson('L2');
    SAL.do('L2', 'setGame', 'gaps');
    ck(!arenaOf('L2').querySelector('.game-ver-row') && arenaOf('L2').querySelectorAll('.game-both-hint').length === 0,
      '«Пропуски»: в уроке без прилагательных переключателя версий нет');

    /* по-английски подписи переведены, кириллицы нет */
    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'gaps');
    win.setLanguage('en');
    const enGapsRow = arenaOf('LG').querySelector('.game-ver-row');
    const enGapsLabels = enGapsRow ? [...enGapsRow.querySelectorAll('.chip-btn')].map(b => b.textContent.trim()) : [];
    ck(enGapsLabels.length === 2 && !/[\u0400-\u04FF]/.test(enGapsLabels.join(' ')) &&
       /noun ending/.test(enGapsLabels[0]) && /both endings/.test(enGapsLabels[1]),
      'английская версия «Пропусков»: версии подписаны по-английски — ' + enGapsLabels.join(' | '));
    SAL.do('LG', 'gapBoth', '1');
    const enHint = arenaOf('LG').querySelector('.game-both-hint');
    ck(!!enHint && !/[\u0400-\u04FF]/.test(enHint.textContent) && /agreement/i.test(enHint.textContent),
      'английская версия «Пропусков»: подсказка про согласование без кириллицы');
    win.setLanguage('ru');

    /* правила игры объясняют вторую версию — и только в уроке рода */
    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'gaps');
    const gapRulesLg = arenaOf('LG').querySelector('.game-rules');
    ck(!!gapRulesLg && /Версия 2/.test(gapRulesLg.textContent) &&
       /конец прилагательного/.test(gapRulesLg.textContent),
      'правила «Пропусков» в уроке рода объясняют вторую версию');
    SAL.openLesson('L2');
    SAL.do('L2', 'setGame', 'gaps');
    const gapRulesL2 = arenaOf('L2').querySelector('.game-rules');
    ck(!!gapRulesL2 && gapRulesL2.textContent.indexOf('Версия 2') < 0,
      'в уроке без прилагательных правила «Пропусков» про вторую версию не упоминают');

    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'gaps');
    SAL.do('LG', 'restart', 'gaps');
  }

  /* --- «Категории»: название категории и слова без окончаний ----------------
     Названия категорий в данных лежат как titleRu/titleEn, а движок читал cat.ru —
     заголовок был пустым, и было непонятно, к чему относить слова. Теперь он
     написан. Вторая жалоба: с окончаниями род виден сразу, поэтому у игры есть
     кнопка «🙈 Без окончаний» — слова показываются основами. */
  {
    const catArena = () => arenaOf('LG');
    const catTitleEl = () => catArena().querySelector('.cat-title');
    const wordChips = () => [...catArena().querySelectorAll('button[onclick*="catToggle"]')]
      .map(b => b.textContent.trim());
    const bareChip = () => [...catArena().querySelectorAll('.chip-btn')]
      .find(b => (b.getAttribute('onclick') || '').indexOf('catBare') >= 0);

    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'categories');
    SAL.do('LG', 'restart', 'categories');

    /* все семь категорий названы — и по-русски, и по-английски */
    const seenTitles = [];
    for (let i = 0; i < LG.categories.length; i++) {
      seenTitles.push(catTitleEl() ? catTitleEl().textContent.trim() : '—');
      SAL.do('LG', 'catNext');
    }
    ck(seenTitles.join('|') === LG.categories.map(c => c.titleRu).join('|'),
      '«Категории»: у всех семи категорий написано название — ' + seenTitles.join(' · '));

    /* по умолчанию слова видны с окончаниями — как раньше */
    SAL.do('LG', 'restart', 'categories');
    const withEnd = wordChips();
    ck(withEnd.length === 8 && withEnd[0] === 'श्यामं ललाटम् (śyāmaṃ lalāṭam)',
      '«Категории»: по умолчанию окончания видны — ' + withEnd[0]);

    /* кнопка «без окончаний» есть в уроке рода */
    const bChip = bareChip();
    ck(!!bChip && /Без окончаний/.test(bChip.textContent),
      '«Категории»: есть кнопка «🙈 Без окончаний» — ' + (bChip ? bChip.textContent.trim() : '—'));

    /* нажали — слова показаны без окончаний (основами, без выдуманных форм) */
    SAL.do('LG', 'catBare', '1');
    ck(gst('LG', 'categories').bare === true, '«Категории»: режим без окончаний включается');
    const BARE_DEVA = ['श्याम ललाट', 'श्वेत उदर', 'गौर हस्त', 'श्वेत दन्त',
                       'पाटल जिह्वा', 'नील नयन', 'श्याम पाद', 'रक्त मुख'];
    const BARE_IAST = ['śyāma lalāṭa', 'śveta udara', 'gaura hasta', 'śveta danta',
                       'pāṭal jihvā', 'nīla nayana', 'śyāma pāda', 'rakta mukha'];
    const bareChips = wordChips();
    const bareDeva = bareChips.map(t => t.split(' (')[0]);
    const bareIast = [...catArena().querySelectorAll('button[onclick*="catToggle"] .iast-text')]
      .map(e => e.textContent.replace(/[()]/g, '').trim());
    ck(bareDeva.join('|') === BARE_DEVA.join('|'),
      '«Категории» без окончаний: слова показаны основами — ' + bareDeva.join(' · '));
    ck(bareIast.join('|') === BARE_IAST.join('|'),
      '«Категории» без окончаний: в IAST окончания тоже убраны — ' + bareIast.join(' · '));
    /* основа, а не обрубок: последний согласный основы остаётся (श्याम, а не श्या) */
    ck(bareDeva.every(t => { const w = t.split(' ')[1]; return !/(ः|म्)$/.test(w); }) &&
       bareDeva[0].split(' ')[0] === 'श्याम' && bareDeva[0].split(' ')[1] === 'ललाट',
      '«Категории» без окончаний: у имён убраны только ः / म्, основа цела');
    ck(bareDeva.every(t => !/[ंःा]$/.test(t.split(' ')[0])),
      '«Категории» без окончаний: у прилагательных убраны ं / ः / ा');

    /* выбор по-прежнему идёт по id — режим меняет только показ */
    const cat0 = LG.categories[0];
    cat0.wordIds.forEach(id => SAL.do('LG', 'catToggle', id));
    ck(gst('LG', 'categories').checked === true && gst('LG', 'categories').score === 1,
      '«Категории» без окончаний: раунд засчитывается как обычно');

    /* кнопка возвращает окончания */
    SAL.do('LG', 'restart', 'categories');
    SAL.do('LG', 'catBare', '1');
    const onLabel = bareChip() ? bareChip().textContent.trim() : '';
    ck(/С окончаниями/.test(onLabel), '«Категории»: включённая кнопка предлагает вернуть окончания — ' + onLabel);
    SAL.do('LG', 'catBare', '0');
    ck(wordChips()[0] === 'श्यामं ललाटम् (śyāmaṃ lalāṭam)',
      '«Категории»: кнопка возвращает окончания — ' + wordChips()[0]);

    /* в уроках, где окончание не выдаёт род, кнопки нет */
    const extra = [];
    ['L2', 'L3', 'LC', 'LC2', 'L7'].forEach(k => {
      SAL.openLesson(k);
      SAL.do(k, 'setGame', 'categories');
      if ([...arenaOf(k).querySelectorAll('.chip-btn')].some(b => (b.getAttribute('onclick') || '').indexOf('catBare') >= 0)) extra.push(k);
    });
    ck(extra.length === 0, '«Категории»: в остальных уроках кнопки «без окончаний» нет' +
      (extra.length ? ': ' + extra.join(', ') : ''));

    /* по-английски: название категории и кнопка переведены, кириллицы нет */
    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'categories');
    win.setLanguage('en');
    const enTitle = catTitleEl() ? catTitleEl().textContent.trim() : '';
    const enBare = bareChip() ? bareChip().textContent.trim() : '';
    ck(enTitle === LG.categories[0].titleEn && !/[\u0400-\u04FF]/.test(enTitle),
      'английская версия «Категорий»: название категории переведено — ' + enTitle);
    ck(/No endings/.test(enBare) && !/[\u0400-\u04FF]/.test(enBare),
      'английская версия «Категорий»: кнопка переведена — ' + enBare);
    win.setLanguage('ru');

    /* правила игры объясняют кнопку — и только в уроке рода */
    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'categories');
    const catRulesLg = arenaOf('LG').querySelector('.game-rules');
    ck(!!catRulesLg && /Без окончаний/.test(catRulesLg.textContent),
      'правила «Категорий» в уроке рода объясняют кнопку «без окончаний»');
    SAL.openLesson('L2');
    SAL.do('L2', 'setGame', 'categories');
    const catRulesL2 = arenaOf('L2').querySelector('.game-rules');
    ck(!!catRulesL2 && catRulesL2.textContent.indexOf('Без окончаний') < 0,
      'в уроках без рода правила о кнопке не упоминают');

    SAL.openLesson('LG');
    SAL.do('LG', 'restart', 'categories');
    SAL.do('LG', 'setGame', 'categories');
  }

  /* --- «Мемори»: ловушки, которые не выдают себя -----------------------------
     В классическом «Мемори» парами ищутся «картинка ↔ слово». Ловушка — это
     словосочетание, в котором ОБА слова согласованы друг с другом, но род
     выбран неверный: श्वेतः उदरः (оба в мужском, а उदर среднего рода). По
     окончаниям такую ловушку не вычислить — и красным её не обводят: на поле
     она выглядит точно как обычная карточка слова. Замечать её надо по роду
     самого слова, а после промаха игра показывает правильную форму. */
  {
    const memArena = () => arenaOf('LG');
    const endGender = d => /\u0903$/.test(d) ? 'm' : /(\u0902|\u092E\u094D)$/.test(d) ? 'n' :
      /\u093E$/.test(d) ? 'f' : '?';
    const bare = d => String(d).replace(/\u092E\u094D$/, '').replace(/[\u0903\u0902\u093E]$/, '');
    const lessonDeva = LG.words.map(w => w.deva);

    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'memory');
    SAL.do('LG', 'restart', 'memory');

    const mem = gst('LG', 'memory');
    const traps = mem.cards.filter(c => c.kind === 'trap');
    ck(mem.cards.length === 18 && traps.length === 2,
      '«Мемори»: полное поле — 18 карточек, из них 2 ловушки (' + mem.cards.length + ' / ' + traps.length + ')');

    /* внутри ловушки слова согласованы друг с другом — окончания совпадают */
    const trapParts = traps.map(c => c.trap.deva.split(' '));
    ck(trapParts.every(p => endGender(p[0]) !== '?' && endGender(p[0]) === endGender(p[1])),
      '«Мемори»: в ловушке оба слова в одном роде, по окончаниям её не вычислить — ' +
      traps.map(c => c.trap.deva).join(' · '));

    /* но этот род — не род слова из урока: правильная форма лежит в fix */
    ck(traps.every(c => {
      const p = c.trap.deva.split(' '), f = c.trap.fix.split(' ');
      return endGender(f[0]) === endGender(f[1]) && endGender(f[0]) !== endGender(p[0]) &&
             bare(f[1]) === bare(p[1]);
    }), '«Мемори»: род в ловушке неверный, а fix — та же пара в правильном роде — ' +
      traps.map(c => c.trap.deva + ' → ' + c.trap.fix).join(' · '));

    ck(traps.every(c => lessonDeva.indexOf(c.trap.fix) >= 0),
      '«Мемори»: правильная форма ловушки — настоящее слово этого урока');
    ck(traps.every(c => {
      const p = c.trap.deva.split(' ').map(bare), f = c.trap.fix.split(' ').map(bare);
      return p[0] === f[0] && p[1] === f[1];
    }), '«Мемори»: в ловушке те же основы, что в правильной форме, меняется только окончание');
    ck(traps.every(c => !!c.trap.iast && !/[\u0900-\u097F]/.test(c.trap.iast)),
      '«Мемори»: у ловушки есть IAST — ' + traps.map(c => c.trap.iast).join(' · '));

    /* на поле ловушка выглядит как обычная карточка слова: ни класса, ни IAST */
    const cards = [...memArena().querySelectorAll('.memory-card')];
    const trapIdx = mem.cards.findIndex(c => c.kind === 'trap');
    const wordIdx = mem.cards.findIndex(c => c.kind === 'word');
    ck(cards[trapIdx].className === cards[wordIdx].className,
      '«Мемори»: закрытая ловушка не отличается от обычной карточки — ' + cards[trapIdx].className);

    /* ловушка и слово открываются одновременно — обе карточки в одинаковом виде */
    SAL.do('LG', 'tile', String(trapIdx));
    SAL.do('LG', 'tile', String(wordIdx));
    const openedTrap = [...memArena().querySelectorAll('.memory-card')][trapIdx];
    const openedWord = [...memArena().querySelectorAll('.memory-card')][wordIdx];
    ck(openedTrap.className.indexOf('trap') < 0 && openedTrap.className.indexOf('flipped') >= 0,
      '«Мемори»: открытая ловушка не обведена и не помечена — ' + openedTrap.className);
    ck(openedTrap.innerHTML.indexOf('iast-text') < 0,
      '«Мемори»: на карточке ловушки нет IAST, иначе она сразу видна');
    const wDeva = LG.words.find(w => w.id === mem.cards[wordIdx].id).deva;
    ck(openedTrap.innerHTML.replace(mem.cards[trapIdx].trap.deva, 'X') ===
       openedWord.innerHTML.replace(wDeva, 'X'),
      '«Мемори»: разметка ловушки и обычного слова совпадает — ' + openedTrap.innerHTML);

    /* промах объясняет, какой род показан, какой на самом деле и как верно */
    const picIdx = mem.cards.findIndex(c => c.kind === 'pic');
    const scoreBefore = mem.score;
    SAL.do('LG', 'tile', String(picIdx));
    ck(Object.keys(mem.matched).length === 0 && mem.score === scoreBefore,
      '«Мемори»: ловушка не складывается в пару и очка не даёт');
    const trapHint = memArena().querySelector('.trap-hint');
    const fixed = mem.cards[trapIdx].trap.fix;
    ck(!!trapHint && trapHint.textContent.indexOf(fixed) >= 0 &&
       /мужск|средн|женск/.test(trapHint.textContent) && /Правильно/.test(trapHint.textContent),
      '«Мемори»: после промаха названа правильная форма — ' + (trapHint ? trapHint.textContent.trim() : '—'));
    ck(!!trapHint && trapHint.textContent.indexOf(mem.cards[trapIdx].trap.deva) >= 0,
      '«Мемори»: в объяснении есть и сама ловушка, чтобы было видно, что не так');
    mem.flipped = []; mem.wrong = null; mem.lock = false;
    SAL.refresh();
    ck(!!memArena().querySelector('.trap-hint'),
      '«Мемори»: объяснение ловушки остаётся, пока не начат новый ход');
    SAL.do('LG', 'tile', String(picIdx));
    ck(!mem.trapNote, '«Мемори»: новый ход убирает прошлое объяснение');

    /* настоящие пары складываются, ловушки игре не мешают */
    SAL.do('LG', 'restart', 'memory');
    const mem2 = gst('LG', 'memory');
    const realIds = [...new Set(mem2.cards.filter(c => c.kind !== 'trap').map(c => c.id))];
    realIds.forEach(id => {
      const a = mem2.cards.findIndex(c => c.id === id && c.kind === 'pic');
      const b = mem2.cards.findIndex(c => c.id === id && c.kind === 'word');
      SAL.do('LG', 'tile', String(a));
      SAL.do('LG', 'tile', String(b));
    });
    ck(Object.keys(mem2.matched).length === LG.words.length,
      '«Мемори»: все настоящие пары складываются, хотя ловушки остались лежать');
    ck(/пройдено/i.test(memArena().textContent),
      '«Мемори»: игра заканчивается, когда собраны все настоящие пары');

    /* кнопка «с ловушками / без ловушек» — есть и работает */
    SAL.do('LG', 'restart', 'memory');
    SAL.do('LG', 'setGame', 'memory');
    const trapRow = memArena().querySelector('.game-ver-row');
    const trapChips = [...(trapRow ? trapRow.querySelectorAll('.chip-btn') : [])];
    ck(!!trapRow && trapChips.length === 2 &&
       /с ловушками/.test(trapChips[0].textContent) && /без ловушек/.test(trapChips[1].textContent),
      '«Мемори»: есть кнопка «с ловушками / без ловушек» — ' +
      (trapRow ? trapRow.textContent.replace(/\s+/g, ' ').trim() : '—'));
    ck(trapChips.length === 2 && trapChips[0].classList.contains('active') && gst('LG', 'memory').traps !== false,
      '«Мемори»: по умолчанию ловушки включены');

    SAL.do('LG', 'memoryTraps', '0');
    const memOff = gst('LG', 'memory');
    ck(memOff.traps === false && memOff.cards.length === 16 &&
       memOff.cards.every(c => c.kind !== 'trap'),
      '«Мемори» без ловушек: поле 16 карточек, ловушек нет (' + memOff.cards.length + ')');
    ck([...memArena().querySelectorAll('.game-ver-row .chip-btn')][1].classList.contains('active'),
      '«Мемори» без ловушек: кнопка показывает выбранный вариант');
    const sizeChipsOff = [...memArena().querySelectorAll('.chip-btn')]
      .map(b => b.textContent.trim()).filter(t => t.indexOf('×') >= 0);
    ck(sizeChipsOff.join('|') === '8 × 2 (16)|4 × 2 (8)',
      '«Мемори» без ловушек: на кнопках размера нет приписки про ловушки — ' + sizeChipsOff.join(' · '));
    ck(!memArena().querySelector('.trap-hint'), '«Мемори» без ловушек: подсказок про ловушки нет');

    /* игра без ловушек проходится как обычное «Мемори» */
    const offIds = [...new Set(memOff.cards.map(c => c.id))];
    offIds.forEach(id => {
      const a = memOff.cards.findIndex(c => c.id === id && c.kind === 'pic');
      const b = memOff.cards.findIndex(c => c.id === id && c.kind === 'word');
      SAL.do('LG', 'tile', String(a));
      SAL.do('LG', 'tile', String(b));
    });
    ck(Object.keys(memOff.matched).length === LG.words.length && /пройдено/i.test(memArena().textContent),
      '«Мемори» без ловушек: все пары складываются, игра заканчивается');

    /* кнопка возвращает ловушки, размер поля при этом сохраняется */
    SAL.do('LG', 'restart', 'memory');
    SAL.do('LG', 'memoryTraps', '0');
    SAL.do('LG', 'memorySize', '4');
    const memSmallOff = gst('LG', 'memory');
    ck(memSmallOff.size === 4 && memSmallOff.cards.length === 8 &&
       memSmallOff.cards.every(c => c.kind !== 'trap') && memSmallOff.traps === false,
      '«Мемори»: выключенные ловушки переживают смену размера поля');
    SAL.do('LG', 'memoryTraps', '1');
    const memSmallOn = gst('LG', 'memory');
    ck(memSmallOn.traps === true && memSmallOn.size === 4 && memSmallOn.cards.length === 9 &&
       memSmallOn.cards.filter(c => c.kind === 'trap').length === 1,
      '«Мемори»: кнопка возвращает ловушки, размер поля остаётся прежним');

    /* малое поле: одна ловушка и ровный квадрат 3 × 3 */
    SAL.do('LG', 'restart', 'memory');
    SAL.do('LG', 'memorySize', '4');
    const small = gst('LG', 'memory');
    const smallGrid = memArena().querySelector('.memory-grid');
    ck(small.cards.length === 9 && small.cards.filter(c => c.kind === 'trap').length === 1 &&
       /repeat\(3,/.test(smallGrid.getAttribute('style') || ''),
      '«Мемори»: малое поле — 9 карточек, 1 ловушка, сетка 3 × 3');

    /* в уроках без рода ловушек нет */
    const withTraps = [];
    ['L2', 'L3', 'LC', 'LC2', 'L4', 'L7'].forEach(k => {
      SAL.openLesson(k);
      SAL.do(k, 'setGame', 'memory');
      SAL.do(k, 'restart', 'memory');
      if (gst(k, 'memory').cards.some(c => c.kind === 'trap')) withTraps.push(k);
    });
    ck(withTraps.length === 0, '«Мемори»: ловушки только в уроке рода' +
      (withTraps.length ? ' — ' + withTraps.join(', ') : ''));

    /* правила игры объясняют ловушки — и только в уроке рода */
    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'memory');
    const memRulesLg = arenaOf('LG').querySelector('.game-rules');
    ck(!!memRulesLg && /ловушк/i.test(memRulesLg.textContent) &&
       /согласованы друг с другом/i.test(memRulesLg.textContent),
      'правила «Мемори» в уроке рода объясняют ловушки');
    SAL.openLesson('L2');
    SAL.do('L2', 'setGame', 'memory');
    const memRulesL2 = arenaOf('L2').querySelector('.game-rules');
    ck(!!memRulesL2 && !/ловушк/i.test(memRulesL2.textContent),
      'в уроках без рода правила «Мемори» о ловушках не упоминают');

    /* по-английски объяснение тоже есть и без кириллицы */
    SAL.openLesson('LG');
    SAL.do('LG', 'setGame', 'memory');
    SAL.do('LG', 'restart', 'memory');
    win.setLanguage('en');
    const memEn = gst('LG', 'memory');
    const tEn = memEn.cards.findIndex(c => c.kind === 'trap');
    const pEn = memEn.cards.findIndex(c => c.kind === 'pic');
    SAL.do('LG', 'tile', String(tEn));
    SAL.do('LG', 'tile', String(pEn));
    const enTrapRow = memArena().querySelector('.game-ver-row');
    const enTrapLabels = enTrapRow ? [...enTrapRow.querySelectorAll('.chip-btn')].map(b => b.textContent.trim()) : [];
    ck(enTrapLabels.length === 2 && !/[\u0400-\u04FF]/.test(enTrapLabels.join(' ')) &&
       /with traps/.test(enTrapLabels[0]) && /without traps/.test(enTrapLabels[1]),
      'английская версия «Мемори»: кнопка ловушек переведена — ' + enTrapLabels.join(' | '));
    const enTrapHint = memArena().querySelector('.trap-hint');
    const enFix = memEn.cards[tEn].trap.fix;
    ck(!!enTrapHint && !/[\u0400-\u04FF]/.test(enTrapHint.textContent) &&
       /masculine|neuter|feminine/.test(enTrapHint.textContent) &&
       enTrapHint.textContent.indexOf(enFix) >= 0,
      'английская версия «Мемори»: ловушка объясняется по-английски — ' +
      (enTrapHint ? enTrapHint.textContent.trim() : '—'));
    win.setLanguage('ru');

    SAL.openLesson('LG');
    SAL.do('LG', 'restart', 'memory');
    SAL.do('LG', 'setGame', 'memory');
  }

  /* --- guided discovery --------------------------------------------------- */
  const D = LG.discovery;
  ck(!!D && Array.isArray(D.sentences) && D.sentences.length === 8,
    'вводный текст — восемь предложений (' + (D ? D.sentences.length : 0) + ')');
  const SENT = [
    'कृष्णस्य ललाटं श्यामम् अस्ति।', 'बलरामस्य उदरं श्वेतम् अस्ति।',
    'चैतन्यस्य हस्तः गौरः अस्ति।', 'गोपालस्य दन्तः श्वेतः अस्ति।',
    'राधायाः जिह्वा पाटला अस्ति।', 'कृष्णस्य नयनं नीलम् अस्ति।',
    'कृष्णस्य पादः श्यामः अस्ति।', 'गौराङ्गस्य मुखं रक्तम् अस्ति।'
  ];
  ck(D.sentences.map(s => s.deva).join('|') === SENT.join('|'),
    'все восемь предложений на месте и в том же порядке');
  ck(D.sentences.every((s, i) => s.gender === LG.words[i].gender),
    'род каждого предложения совпадает с родом слова из игр');
  ck(D.sentences.every(s => s.ru && s.en && s.iast),
    'у каждого предложения есть IAST и перевод на два языка');

  /* मुख — «рот», а не «лицо»: перевод и картинка должны совпадать со словом */
  const mukhaSentence = D.sentences.filter(s => s.deva.indexOf('मुख') >= 0)[0];
  ck(!!mukhaSentence && mukhaSentence.ru === 'Рот Гауранги красный.',
    'मुख переведено как «рот»: ' + (mukhaSentence ? mukhaSentence.ru : '—'));
  ck(D.sentences.every(s => s.ru.indexOf('Лицо') < 0) && D.sentences.every(s => s.en.indexOf('face') < 0),
    'ни в одном предложении मुख не названо лицом');
  const mukhaWord = LG.words.filter(w => w.id === 'mukha')[0];
  ck(!!mukhaWord && !/fill="#0B1220"/.test(mukhaWord.svg),
    'на карточке मुख нет глаз — иначе ребёнок опознал бы лицо, а не рот');
  ck(!!mukhaWord && /#5B1010/.test(mukhaWord.svg),
    'на карточке मुख нарисован рот (тёмная полость рта)');
  /* рот должен читаться как рот: губы, зубы и язык. Прошлая версия была
     полукругом со светлой полосой сверху и походила на миску с крышкой. */
  ck(!!mukhaWord && /fill="#FFFFFF"/.test(mukhaWord.svg),
    'у рта есть полоска зубов');
  ck(!!mukhaWord && /#F08A9E/.test(mukhaWord.svg),
    'у рта есть язык — без него это не рот, а просто тёмное пятно');
  ck(!!mukhaWord && (mukhaWord.svg.match(/<path/g) || []).length >= 4,
    'губы нарисованы кривыми, а не одним полукругом');
  ck(!!mukhaWord && /M10 50 C12 34/.test(mukhaWord.svg),
    'верхняя губа с ложбинкой посередине (форма «сердечко»)');
  /* живот उदर: прошлый значок — скруглённый прямоугольник с кружком —
     читался как стиральная машина. Теперь это торс: плечи, талия, живот. */
  const udaraWord = LG.words.filter(w => w.id === 'udara')[0];
  ck(!!udaraWord && /M43 13C43 17 42 20 38 22/.test(udaraWord.svg),
    'живот нарисован торсом с плечами и талией, а не прямоугольником');
  ck(!!udaraWord && !/M32 20h36l7 13v45/.test(udaraWord.svg),
    'старого квадратного живота на карточке उदर больше нет');
  ck(!!udaraWord && /<ellipse cx="50" cy="64"/.test(udaraWord.svg),
    'у живота есть пупок');
  ck(!!udaraWord && /C30 66 30 74 30 88L70 88/.test(udaraWord.svg),
    'торс обрезан снизу — это часть тела, а не целый человек');
  ck(!!udaraWord && (udaraWord.svg.match(/M/g) || []).length >= 4,
    'силуэт живота не симметричный прямоугольник, а живая форма');
  /* глаз и рот не должны быть похожи силуэтом */
  const nayanaWord = LG.words.filter(w => w.id === 'nayana')[0];
  ck(!!nayanaWord && nayanaWord.svg.indexOf('#F08A9E') < 0 && mukhaWord.svg.indexOf('#2563EB') < 0,
    'рот и глаз не путаются: у рта нет синего, у глаза нет языка');
  ck(LG.introRu.indexOf('рот') >= 0 && LG.introEn.indexOf('mouth') >= 0 &&
     LG.introRu.indexOf('лицо') < 0,
    'в описании урока मुख названо ртом, а не лицом');

  SAL.openLesson('LG');
  const slot = doc.getElementById('LG-discovery');
  ck(!!slot && slot.querySelectorAll('.disc-row').length === 8,
    'в Presentation восемь строк вводного текста (' +
      (slot ? slot.querySelectorAll('.disc-row').length : 0) + ')');
  ck(!!slot && !slot.querySelector('.disc-rule'),
    'по умолчанию разбор закрыт — правила на экране нет');
  ck(!!slot && [...slot.querySelectorAll('.disc-tag')].every(t => t.textContent.trim() === '?'),
    'закрытый разбор не выдаёт род: вместо окончания стоит «?»');
  ck(!!slot && [...slot.querySelectorAll('.disc-deva')].every(el => el.textContent.trim().slice(-1) === '।'),
    'предложения уже видны целиком — скрыт только разбор, а не текст');
  SAL.do('LG', 'discoveryToggle');
  const slot2 = doc.getElementById('LG-discovery');
  ck(!!slot2 && !!slot2.querySelector('.disc-rule'), 'кнопка открывает правило под списком');
  const tags = [...slot2.querySelectorAll('.disc-tag')].map(t => t.textContent);
  ck(tags.filter(t => /मужской|мужской/.test(t)).length === 3 &&
     tags.filter(t => /средний/.test(t)).length === 4 &&
     tags.filter(t => /женский/.test(t)).length === 1,
    'после открытия видны 3 мужских, 4 средних и 1 женский род');
  ck(!slot2.querySelector('.disc-rule').innerHTML.indexOf('undefined') >= 0, 'в правиле нет пустых подстановок');
  SAL.do('LG', 'discoveryToggle');
  ck(!doc.getElementById('LG-discovery').querySelector('.disc-rule'), 'повторное нажатие снова прячет разбор');

  /* ---------- перевод: скрыт по умолчанию, по кнопке ---------- */
  const slotT = doc.getElementById('LG-discovery');
  ck(slotT.querySelectorAll('.disc-tr').length === 0, 'перевод скрыт по умолчанию');
  ck([...slotT.querySelectorAll('.disc-iast')].length === 8,
    'IAST при этом на месте — скрыт именно перевод');
  const trBtn = [...slotT.querySelectorAll('.chip-btn')].filter(b => /перевод/.test(b.textContent))[0];
  ck(!!trBtn && /Показать перевод/.test(trBtn.textContent),
    'в шапке есть кнопка «Показать перевод»');
  SAL.do('LG', 'translationToggle');
  const slotT2 = doc.getElementById('LG-discovery');
  ck(slotT2.querySelectorAll('.disc-tr').length === 8, 'кнопка показывает перевод во всех восьми строках');
  ck(/Стопа Кришны тёмно-синяя/.test(slotT2.textContent), 'перевод тот самый, из данных урока');
  const hideBtn = [...slotT2.querySelectorAll('.chip-btn')].filter(b => /перевод/.test(b.textContent))[0];
  ck(!!hideBtn && /Скрыть перевод/.test(hideBtn.textContent), 'после нажатия кнопка предлагает скрыть перевод');
  ck(!/undefined/.test(slotT2.textContent), 'в переводе нет пустых подстановок');
  SAL.do('LG', 'translationToggle');
  ck(doc.getElementById('LG-discovery').querySelectorAll('.disc-tr').length === 0,
    'повторное нажатие снова прячет перевод');
  ck(SAL.lessons.LG._st.pres.translationsShown === false, 'состояние перевода сброшено');

  /* ---------- кнопка 🔊 нажимается всей площадью ---------- */
  /* Абсолютный блок внутри flex-контейнера рисуется в порядке DOM: кнопка уходила
     под текст, и нажимался только её край. Проверяем, что этого больше нет. */
  const css = fs.readFileSync(path.join(REPO, 'styles.css'), 'utf8');
  const rule = css.slice(css.indexOf('.disc-row .vocab-audio-btn'));
  ck(rule.indexOf('position: static') >= 0 && rule.indexOf('position: static') < 400,
    'кнопка 🔊 в строке вводного текста стоит в потоке (position: static)');
  const speakBtn = doc.getElementById('LG-discovery').querySelector('.disc-speak');
  ck(!!speakBtn, 'кнопка 🔊 отрисована в каждой строке');
  ck(!!speakBtn && /SAL\.speak/.test(speakBtn.getAttribute('onclick') || ''),
    'кнопка 🔊 вызывает озвучку своего предложения');
  ck([...doc.getElementById('LG-discovery').querySelectorAll('.disc-speak')].length === 8,
    'кнопка 🔊 есть у всех восьми строк');

  /* --- ловушки «филворда среди слов» -------------------------------------- */
  const DEC = LG.decoys || [];
  ck(DEC.length >= 8, 'в филворде есть ловушки: ' + DEC.length);
  ck(DEC.every(d => LG.words.every(w => w.deva !== d)), 'ловушка не совпадает ни с одним словом урока');
  const COLOUR_STEMS = ['श्याम', 'श्वेत', 'गौर', 'पाटल', 'नील', 'रक्त', 'कपिश', 'हरित', 'धूसर', 'पीत', 'नारङ्ग', 'कृष्ण'];
  const NOUN_STEMS = LG.words.map(w => w.deva.split(' ')[1].replace(/[ःा]\S*$|म्$/, ''));
  const fake = DEC.filter(d => {
    const parts = d.split(' ');
    if (parts.length !== 2) return true;
    const col = COLOUR_STEMS.some(c => parts[0].indexOf(c) === 0);
    const noun = LG.words.some(w => parts[1].indexOf(w.deva.split(' ')[1].slice(0, 3)) === 0);
    return !(col && noun);
  });
  ck(fake.length === 0, 'каждая ловушка собрана из настоящих санскритских слов' +
    (fake.length ? ' — не настоящие: ' + fake.join('; ') : ''));
  const sign = t => { const c = t.slice(-1); return c === 'ः' ? 'm' : c === 'ा' ? 'f' : 'n'; };
  const wrongGender = DEC.filter(d => {
    const p = d.split(' ');
    return sign(p[0]) !== sign(p[1]);
  });
  ck(wrongGender.length >= 8, 'ловушек с чужим родом не меньше восьми: ' + wrongGender.length);

  /* --- игры --------------------------------------------------------------- */
  const tabs = [...doc.querySelectorAll('#view-lesson5 .practice-tab-btn[data-game]')]
    .map(b => b.getAttribute('data-game'));
  ck(tabs.length === 14 && tabs.slice(12).join() === 'wordgrid,wordsearch',
    'те же игры, что в других уроках, плюс два филворда: ' + tabs.length + ' вкладок');

  const arena = doc.getElementById('LG-practice-arena');
  const clickAll = el => [...el.querySelectorAll('button')].forEach(b => { try { b.click(); } catch (e) { errs.push(String(e && e.message)); } });
  const GAMES_LG = tabs;
  GAMES_LG.forEach(g => { SAL.do('LG', 'setGame', g); clickAll(arenaOf('LG')); });
  ['sprint', 'mic', 'missingpart', 'chant'].forEach(m => { SAL.do('LG', 'setProdMode', m); clickAll(stageOf('LG')); });
  ck(true, 'все 14 игр и 4 режима Production нажимаются без ошибок');

  /* филворд среди слов: ловушка с чужим родом реально попадает на поле.
     Сначала обнуляем поле — предыдущий проход нажал «Показать всё». */
  delete SAL.lessons.LG._st.g.wordgrid;
  SAL.do('LG', 'setGame', 'wordgrid');
  const cells = [...arena.querySelectorAll('.wcell')].map(c => c.textContent.trim());
  ck(cells.filter(t => LG.words.some(w => w.deva === t)).length === 16,
    'на поле лежат все 8 фраз урока, каждая дважды (' +
      cells.filter(t => LG.words.some(w => w.deva === t)).length + ')');
  /* Ловушки не должны теряться: раньше пул перемешивался целиком и по
     абсолютному индексу клетки, поэтому иной раз на поле не попадало ни
     одной. Теперь все 12 стоят на любом размере. */
  const trapsOnBoard = new Set(cells.filter(t => wrongGender.indexOf(t) >= 0)).size;
  ck(trapsOnBoard >= 8,
    'на поле есть ловушки с чужим родом — их не перепутать с настоящей фразой (' +
      trapsOnBoard + ' из ' + new Set(wrongGender).size + ')');
  /* и то же на самом маленьком поле: там каждая клетка на счету */
  {
    const keep = SAL.lessons.LG._st.g.wordgrid;
    delete SAL.lessons.LG._st.g.wordgrid;
    SAL.do('LG', 'setGame', 'wordgrid');
    SAL.do('LG', 'wgSize', '5');
    const small = [...arena.querySelectorAll('.wcell')].map(c => c.textContent.trim());
    const smallTraps = new Set(small.filter(t => wrongGender.indexOf(t) >= 0)).size;
    ck(small.length === 25 && smallTraps >= 8,
      'на поле 5 × 5 ловушки тоже на месте: ' + smallTraps);
    delete SAL.lessons.LG._st.g.wordgrid;
    SAL.do('LG', 'setGame', 'wordgrid');
    SAL.do('LG', 'wgSize', '10');
    if (keep) SAL.lessons.LG._st.g.wordgrid = keep;
  }

  /* филворд среди букв: фраза режется на акшары, все восемь влезают в 10 × 10 */
  delete SAL.lessons.LG._st.g.wordsearch;
  SAL.do('LG', 'setGame', 'wordsearch');
  const ws = SAL.lessons.LG._st.g.wordsearch;
  ck(ws.places.length === 8, 'в поле 10 × 10 размещены все 8 фраз');
  ck(ws.maxLen === 5, 'самая длинная фраза — 5 акшар (' + ws.maxLen + ')');
  ck(ws.grid.every(c => c !== ' '), 'клеток с пробелом нет — фраза режется на акшары, а не на слова');
  SAL.openLesson('L4');
}

/* ==========================================================================
   УРОК 6 · लिङ्गानि (द्वितीयः) «Три рода · другие цвета» (LG2)
   Тот же урок, что LG, но с четырьмя другими цветами: कपिश, हरित, धूसर,
   नारङ्ग. Проверяем, что урок действительно тот же по устройству, что
   поменялись только цвета — и что ни одной выдуманной формы не появилось.
   ========================================================================== */
console.log('\n===== Урок 6 · Три рода · другие цвета (LG2) =====');
{
  const LG2 = SAL.lessons.LG2;
  const LG = SAL.lessons.LG;
  const doc = win.document;
  const no = t => String(t).replace(/ /g, '');
  const stem = t => t.replace(/म्$/, '').replace(/[ंःा]$/, '');
  const colourOf = w => stem(w.deva.split(' ')[0]);
  const nounOf = w => stem(w.deva.split(' ')[1]);
  const NEW = ['कपिश', 'हरित', 'धूसर', 'नारङ्ग'];
  const OLD = ['श्याम', 'श्वेत', 'गौर', 'पाटल', 'नील', 'रक्त', 'पीत'];

  ck(!!LG2 && LG2.num === 6, 'LG2 зарегистрирован под номером 6');
  ck(!!LG2 && LG2.titleDeva === LG.titleDeva && LG2.titleRu !== LG.titleRu,
    'то же санскритское название लिङ्गानि, но своё имя у урока: ' + (LG2 && LG2.titleRu));

  /* --- те же восемь частей тела и те же роды ------------------------------ */
  ck(LG2.words.length === 8 && LG2.words.map(w => w.id).join() === LG.words.map(w => w.id).join(),
    'те же восемь слов в том же порядке: ' + LG2.words.map(w => w.id).join(', '));
  ck(LG2.words.every((w, i) => w.gender === LG.words[i].gender),
    'род каждого слова тот же, что в уроке 5');

  /* --- четыре новых цвета, каждый ровно дважды ---------------------------- */
  const stems = [...new Set(LG2.words.map(colourOf))];
  ck(stems.length === 4 && stems.every(st => NEW.indexOf(st) >= 0),
    'в уроке ровно четыре новых цвета: ' + stems.join(' · '));
  const perColour = {};
  LG2.words.forEach(w => { perColour[colourOf(w)] = (perColour[colourOf(w)] || 0) + 1; });
  ck(stems.every(st => perColour[st] === 2),
    'каждый цвет стоит дважды — с существительными разного рода: ' + JSON.stringify(perColour));
  ck(LG2.words.every(w => OLD.every(c => w.deva.indexOf(c) < 0)),
    'в словах урока нет ни одного цвета из урока 5 — цвета действительно другие');

  /* --- женская форма цвета — настоящая, из урока 4 ------------------------ */
  const lc2Forms = SAL.lessons.LC2.words.map(w => w.ttsText || w.deva);
  const femColour = LG2.words.filter(w => w.gender === 'f')[0].deva.split(' ')[0];
  ck(lc2Forms.indexOf(femColour) >= 0,
    'женская форма цвета «' + femColour + '» — та же, что звучит в уроке 4');

  /* --- цвет и слово кончаются окончанием одного рода ---------------------- */
  const ENDING_RE = { m: /\u0903$/, n: /(\u0902|\u092e\u094d)$/, f: /\u093e$/ };
  const badEnd = LG2.words.filter(w => {
    const p = w.deva.split(' ');
    return !(ENDING_RE[w.gender].test(p[0]) && ENDING_RE[w.gender].test(p[1]));
  });
  ck(badEnd.length === 0,
    'в каждом слове и цвет, и существительное кончаются окончанием своего рода' +
      (badEnd.length ? ' — ' + badEnd.map(w => w.deva).join('; ') : ''));

  /* --- данные слов складываются обратно ---------------------------------- */
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
  LG2.words.forEach(w => {
    if (w.maskedPrefix + w.maskedHidden !== w.deva) broken.push(w.deva + ': masked');
    if (no(w.gapDeva).replace('_', w.gapAnswer) !== no(w.deva)) broken.push(w.deva + ': gap');
    if (no(w.missingDisplay).replace('_', w.missingAnswer) !== no(w.deva)) broken.push(w.deva + ': missing');
    if (!w.gapChoices.some(c => c.deva === w.gapAnswer)) broken.push(w.deva + ': gapChoices');
    if (!w.missingChoices.includes(w.missingAnswer)) broken.push(w.deva + ': missingChoices');
    if (editDist(w.deva, w.typoDeva) !== 1) broken.push(w.deva + ': опечатка не в одну букву');
    if (w.syll.join('') !== no(w.deva)) broken.push(w.deva + ': слоги не складываются в слово');
  });
  ck(broken.length === 0, 'данные слов согласованы' + (broken.length ? ' — ' + broken.join('; ') : ''));
  ck(LG2.words.every(w => w.gapAnswer === { m: 'ः', n: 'म्', f: 'ा' }[w.gender]),
    'в «Пропусках» спрашивается окончание своего рода: ' + LG2.words.map(w => w.gapAnswer).join(' '));
  ck(LG2.words.every(w => w.gapChoices.every(c => ['ः', 'म्', 'ा'].indexOf(c.deva) >= 0)),
    'варианты в пропуске — только ः / म् / ा, выдуманных окончаний нет');

  /* --- восемь предложений: та же схема, свои цвета ------------------------ */
  const D = LG2.discovery;
  ck(!!D && D.sentences.length === 8, 'вводный текст — восемь предложений (' + (D ? D.sentences.length : 0) + ')');
  ck(D.sentences.every(s => /(\u0938\u094d\u092f|\u092f\u093e\u0903)\s/.test(s.deva) && /अस्ति।$/.test(s.deva)),
    'все восемь предложений построены по схеме «…स्य / …याः … अस्ति»');
  ck(D.sentences.every((s, i) => s.deva.indexOf(colourOf(LG2.words[i])) >= 0 &&
     s.deva.indexOf(nounOf(LG2.words[i])) >= 0),
    'в каждом предложении стоит цвет и часть тела своего слова — ' + D.sentences[0].deva);
  ck(D.sentences.every((s, i) => s.gender === LG2.words[i].gender &&
     s.ending.indexOf(LG2.words[i].deva.split(' ')[1]) === 0),
    'род предложения совпадает со словом, а подпись об окончании начинается с этого слова');
  ck(D.sentences.every(s => s.ru && s.en && s.iast), 'у каждого предложения есть IAST и перевод на два языка');
  const mukhaS = D.sentences.filter(s => s.deva.indexOf('मुख') >= 0)[0];
  ck(!!mukhaS && mukhaS.ru === 'Рот Гауранги оранжевый.' && mukhaS.en.indexOf('mouth') >= 0,
    'मुख снова «рот», а не лицо: ' + (mukhaS ? mukhaS.ru : '—'));
  ck(D.sentences.every(s => s.ru.indexOf('Лицо') < 0 && s.en.indexOf('face') < 0),
    'ни в одном предложении मुख не названо лицом');

  /* --- категории: те же семь, что в уроке 5 ------------------------------- */
  const byGender = g => LG2.words.filter(w => w.gender === g).map(w => w.id).sort().join();
  const catKey = c => c.wordIds.slice().sort().join();
  ck(LG2.categories.length === LG.categories.length && LG2.categories.length === 7,
    'семь категорий — столько же, сколько в уроке 5 (' + LG2.categories.length + ')');
  ck(['m', 'n', 'f'].every(g => LG2.categories.filter(c => catKey(c) === byGender(g)).length === 1),
    'категории родов собраны верно: ' + LG2.categories.slice(0, 3).map(c => c.wordIds.length).join(' / '));
  ck(LG2.categories.every(c => c.titleRu && c.titleEn && c.wordIds.length >= 1),
    'у каждой категории есть название на двух языках');

  /* --- ловушки филворда: настоящие словосочетания, чужой род ------------- */
  const DEC = LG2.decoys || [];
  const sign = t => { const c = t.slice(-1); return c === 'ः' ? 'm' : c === 'ा' ? 'f' : 'n'; };
  ck(DEC.length === 12, 'в филворде двенадцать ловушек (' + DEC.length + ')');
  ck(DEC.every(d => LG2.words.every(w => w.deva !== d)), 'ловушка не совпадает ни с одним словом урока');
  const fake = DEC.filter(d => {
    const p = d.split(' ');
    return p.length !== 2 ||
      !NEW.concat(OLD).some(c => p[0].indexOf(c) === 0) ||
      !LG2.words.some(w => p[1].indexOf(nounOf(w)) === 0);
  });
  ck(fake.length === 0, 'каждая ловушка собрана из настоящих санскритских слов' +
    (fake.length ? ' — не настоящие: ' + fake.join('; ') : ''));
  const wrongGender = DEC.filter(d => { const p = d.split(' '); return sign(p[0]) !== sign(p[1]); });
  ck(wrongGender.length === 8, 'восемь ловушек с чужим родом: ' + wrongGender.length);
  const absent = DEC.filter(d => OLD.some(c => d.indexOf(c) === 0));
  ck(absent.length === 4, 'четыре ловушки с верным согласованием, но цветом не из этого урока: ' + absent.length);

  /* --- ловушки «Мемори»: слова согласованы, род неверный ----------------- */
  const TR = LG2.memoryTraps || [];
  const endGender = d => /\u0903$/.test(d) ? 'm' : /(\u0902|\u092e\u094d)$/.test(d) ? 'n' : /\u093e$/.test(d) ? 'f' : '?';
  const bareStem = d => String(d).replace(/\u092e\u094d$/, '').replace(/[\u0903\u0902\u093e]$/, '');
  const lessonDeva = LG2.words.map(w => w.deva);
  ck(TR.length === 4, 'четыре ловушки «Мемори» (' + TR.length + ')');
  ck(TR.every(t => { const p = t.deva.split(' ');
    return endGender(p[0]) === endGender(p[1]) && endGender(p[0]) !== '?'; }),
    'в ловушке оба слова в одном роде — по окончаниям её не вычислить: ' + TR.map(t => t.deva).join(' · '));
  ck(TR.every(t => { const p = t.deva.split(' '), f = t.fix.split(' ');
    return endGender(f[0]) === endGender(f[1]) && endGender(f[0]) !== endGender(p[0]) &&
           bareStem(f[1]) === bareStem(p[1]); }),
    'род в ловушке неверный, а fix — та же пара в правильном роде: ' +
      TR.map(t => t.deva + ' → ' + t.fix).join(' · '));
  ck(TR.every(t => lessonDeva.indexOf(t.fix) >= 0), 'правильная форма ловушки — настоящее слово этого урока');
  ck(TR.every(t => !!t.iast && !/[\u0900-\u097F]/.test(t.iast)),
    'у каждой ловушки есть IAST — ' + TR.map(t => t.iast).join(' · '));

  /* --- игры: тот же набор; вторая версия «Покрытого квадрата» работает ---- */
  ck(LG2.extraGames.join() === LG.extraGames.join(),
    'тот же набор игр, что в уроке 5: ' + LG2.extraGames.join(', '));
  SAL.openLesson('LG2');
  const pane = doc.getElementById('view-lesson6');
  const lg2tabs = [...pane.querySelectorAll('.practice-tab-btn[data-game]')].map(b => b.getAttribute('data-game'));
  ck(lg2tabs.length === 14 && lg2tabs.slice(12).join() === 'wordgrid,wordsearch',
    'четырнадцать вкладок — 12 игр и два филворда');

  SAL.do('LG2', 'setGame', 'masked');
  SAL.do('LG2', 'restart', 'masked');
  ck(!!arenaOf('LG2').querySelector('.game-ver-row'),
    '«Закрыто квадратом»: есть вторая версия — как в уроке рода');
  const lineOf = () => {
    const l = arenaOf('LG2').querySelector('.masked-word-line');
    return l ? l.textContent.replace(/\u00A0/g, ' ') : '';
  };
  const bothBad = [];
  LG2.words.forEach((w, idx) => {
    SAL.do('LG2', 'restart', 'masked');
    SAL.do('LG2', 'maskedBoth', '1');
    for (let k = 0; k < idx; k++) SAL.do('LG2', 'maskedGrade', '1');
    const squares = (lineOf().match(/■/g) || []).length;
    SAL.do('LG2', 'maskedFlip');
    if (squares !== 2) bothBad.push(w.deva + ': квадратиков ' + squares);
    if (lineOf() !== w.deva) bothBad.push(w.deva + ': открылось «' + lineOf() + '»');
  });
  ck(bothBad.length === 0, 'вторая версия закрывает оба окончания и открывает фразу дословно' +
    (bothBad.length ? ' — ' + bothBad.join('; ') : ''));
  SAL.do('LG2', 'maskedBoth', '0');

  /* --- «Мемори»: ловушки на поле и кнопка «с ловушками / без ловушек» ----- */
  SAL.do('LG2', 'setGame', 'memory');
  SAL.do('LG2', 'restart', 'memory');
  const mem = gst('LG2', 'memory');
  ck(mem.cards.length === 18 && mem.cards.filter(c => c.kind === 'trap').length === 2,
    '«Мемори»: 18 карточек, из них 2 ловушки (' + mem.cards.length + ')');
  const trapChips = [...arenaOf('LG2').querySelectorAll('.game-ver-row .chip-btn')];
  ck(trapChips.length === 2 && /с ловушками/.test(trapChips[0].textContent) &&
     /без ловушек/.test(trapChips[1].textContent),
    '«Мемори»: кнопка «с ловушками / без ловушек» на месте');
  const tIdx = mem.cards.findIndex(c => c.kind === 'trap');
  const pIdx = mem.cards.findIndex(c => c.kind === 'pic');
  SAL.do('LG2', 'tile', String(tIdx));
  SAL.do('LG2', 'tile', String(pIdx));
  const trapHint = arenaOf('LG2').querySelector('.trap-hint');
  ck(!!trapHint && trapHint.textContent.indexOf(mem.cards[tIdx].trap.fix) >= 0 &&
     /Правильно/.test(trapHint.textContent),
    'ловушка объясняется по-русски и с правильной формой: ' +
      (trapHint ? trapHint.textContent.trim() : '—'));
  mem.flipped = []; mem.wrong = null; mem.lock = false; SAL.refresh();
  SAL.do('LG2', 'restart', 'memory');

  /* --- «Категории»: название на экране и кнопка «без окончаний» ----------- */
  SAL.do('LG2', 'setGame', 'categories');
  SAL.do('LG2', 'restart', 'categories');
  const catTitle = arenaOf('LG2').querySelector('.cat-title');
  ck(!!catTitle && catTitle.textContent.trim() === LG2.categories[0].titleRu,
    '«Категории»: название категории видно на экране — ' +
      (catTitle ? catTitle.textContent.trim() : '—'));
  const bareBtn = [...arenaOf('LG2').querySelectorAll('.chip-btn')]
    .filter(b => (b.getAttribute('onclick') || '').indexOf('catBare') >= 0)[0];
  ck(!!bareBtn && /Без окончаний/.test(bareBtn.textContent), '«Категории»: кнопка «без окончаний» есть');
  SAL.do('LG2', 'catBare', '1');
  const bareChips = [...arenaOf('LG2').querySelectorAll('button[onclick*="catToggle"]')]
    .map(b => b.textContent.trim().split(' (')[0]);
  ck(bareChips.length === 8 && bareChips.every(t => !/[ंःम्ा]$/.test(t.split(' ')[0])),
    '«Категории» без окончаний: у цветов убраны ं / ः / ा — ' + bareChips[0]);
  SAL.do('LG2', 'catBare', '0');
  SAL.do('LG2', 'restart', 'categories');

  /* --- филворд среди слов: ловушки на поле --------------------------------- */
  delete SAL.lessons.LG2._st.g.wordgrid;
  SAL.do('LG2', 'setGame', 'wordgrid');
  const cells = [...arenaOf('LG2').querySelectorAll('.wcell')].map(c => c.textContent.trim());
  const own = cells.filter(t => LG2.words.some(w => w.deva === t)).length;
  const trapsOnBoard = new Set(cells.filter(t => wrongGender.indexOf(t) >= 0)).size;
  ck(own === 16, 'на поле лежат все 8 фраз урока, каждая дважды (' + own + ')');
  ck(trapsOnBoard >= 8, 'ловушки с чужим родом на поле есть (' + trapsOnBoard + ' из 8)');

  /* --- презентация: восемь мишеней на схеме ------------------------------- */
  const fig = LG2.hotspots.figures[0];
  ck(!!fig && fig.pins.length === 8 && fig.viewBox === LG.hotspots.figures[0].viewBox,
    'плакат-схема та же (320 × 184), восемь мишеней');
  ck(!!fig && LG2.words.every((w, i) => fig.pins[i].id === w.id && fig.pins[i].num === i + 1),
    'мишени подписаны теми же номерами, что в уроке 5');

  /* --- по-английски: подписи урока без кириллицы -------------------------- */
  SAL.openLesson('LG2');
  SAL.do('LG2', 'setGame', 'categories');
  SAL.do('LG2', 'restart', 'categories');
  win.setLanguage('en');
  const enTitle = arenaOf('LG2').querySelector('.cat-title');
  const enHead = doc.getElementById('view-lesson6').textContent;
  ck(!!LG2.titleEn && !/[\u0400-\u04FF]/.test(LG2.titleEn + LG2.topicEn + LG2.introEn),
    'английские поля урока без кириллицы');
  ck(!!enTitle && !/[\u0400-\u04FF]/.test(enTitle.textContent) &&
     enTitle.textContent.trim() === LG2.categories[0].titleEn,
    'английская версия «Категорий»: название категории по-английски — ' +
      (enTitle ? enTitle.textContent.trim() : '—'));
  ck(!/Урок/.test(enHead) && /Choose a lesson/.test(enHead), 'панель урока 6 переведена целиком');
  win.setLanguage('ru');
  SAL.openLesson('LG2');
  SAL.do('LG2', 'setGame', 'masked');
  SAL.openLesson('L4');
}

/* ==========================================================================
   ОЗВУЧКА · ВИСАРГА ः
   Хинди-движок читал ः как «е»: हस्तः звучал «хасте». Для речи висарга
   заменяется на ह (лёгкое эхо гласного: aḥ → aha), а на письме остаётся ः.
   ========================================================================== */
console.log('\n===== Озвучка: висарга ः =====');
{
  const T = win.sanskritTtsText;
  ck(typeof T === 'function', 'sanskritTtsText доступна');
  ck(T('\u0939\u0938\u094d\u0924\u0903') === '\u0939\u0938\u094d\u0924\u0939\u093e',
    'हस्तः озвучивается как हस्तहा («хастаха», а не «хасте»)');
  ck(T('\u092a\u093e\u0926\u0903 \u0936\u094d\u092f\u093e\u092e\u0903') ===
     '\u092a\u093e\u0926\u0939\u093e \u0936\u094d\u092f\u093e\u092e\u0939\u093e',
    'पादः श्यामः → पादहा श्यामहा: отзвук слышен у каждого слова');
  ck(T('\u0917\u094c\u0930\u0903 \u0939\u0938\u094d\u0924\u0903') ===
     '\u0917\u094c\u0930\u0939\u093e \u0939\u0938\u094d\u0924\u0939\u093e',
    'во фразе заменены обе висарги: गौरः हस्तः → गौरहा हस्तहा');
  ck(T('\u0935\u093f\u0902\u0936\u0924\u093f\u0903') === '\u0935\u093f\u0902\u0936\u0924\u093f\u0939\u093f',
    'विंशतिः → विंशतिहि: отзвук повторяет «и», а не «а»');
  ck(T('\u0930\u093e\u0927\u093e\u092f\u093e\u0903') === '\u0930\u093e\u0927\u093e\u092f\u093e\u0939\u093e',
    'राधायाः: долгая «а» перед висаргой сохранена, эхо на месте');
  ck(T('\u0926\u0941\u0903\u0916').indexOf('\u0939\u094d') >= 0,
    'висарга перед согласной — это ह् с вирамой (दुःख), лишней «а» нет');
  /* отзвук повторяет предыдущий гласный: а → ा, и → ि, у → ु, э → े */
  ck(T('\u0917\u0941\u0930\u0941\u0903') === '\u0917\u0941\u0930\u0941\u0939\u0941',
    'गुरुः → गुरुहु: после «у» отзвук «у»');
  ck(T('\u0928\u0930\u0947\u0903') === '\u0928\u0930\u0947\u0939\u0947',
    'नरेः → नरेहे: после «э» отзвук «э»');
  ck(T('\u0938\u093e\u0927\u094b\u0903') === '\u0938\u093e\u0927\u094b\u0939\u094b',
    'साधोः → साधोहो: после «о» отзвук «о»');
  ck(!/\u0903/.test(T('\u0939\u0938\u094d\u0924\u0903 \u0917\u094c\u0930\u0903 \u0936\u094d\u092f\u093e\u092e\u0903')),
    'в строке с тремя висаргами ни одна не уходит в движок');
  ck(/(\u0939\u093e.*){3}/.test(T('\u0939\u0938\u094d\u0924\u0903 \u0917\u094c\u0930\u0903 \u0936\u094d\u092f\u093e\u092e\u0903')),
    'все три получили явный отзвук «हा»');
  ck(T('\u0939\u0938\u094d\u0924') === '\u0939\u0938\u094d\u0924\u093e',
    'старый обход конечной короткой «а» не сломан: हस्त → हस्ता');
  ck(T('\u0937\u091f\u094d') === '\u0937\u091f\u094d',
    'слова на вираме не трогаются: षट्');

  /* ---------- анусвара ं: в конце слова это «m», иначе «мукх» ---------- */
  ck(T('\u092E\u0941\u0916\u0902') === '\u092E\u0941\u0916\u092E\u094D',
    'मुखं → मुखम्: слышно «мукхам», а не «мукх»');
  ck(T('\u090F\u0915\u0902') === '\u090F\u0915\u092E\u094D',
    'एकं → एकम्: конечная анусвара стала «म्»');
  ck(T('\u0917\u094C\u0930\u093E\u0919\u094D\u0917\u0938\u094D\u092F \u092E\u0941\u0916\u0902 \u0930\u0915\u094D\u0924\u092E\u094D \u0905\u0938\u094D\u0924\u093F') ===
     '\u0917\u094C\u0930\u093E\u0919\u094D\u0917\u0938\u094D\u092F \u092E\u0941\u0916\u092E\u094D \u0930\u0915\u094D\u0924\u092E\u094D \u0905\u0938\u094D\u0924\u093F',
    'предложение про Гаурангу: गौराङ्गस्य मुखम् रक्तम् अस्ति');
  ck(T('\u0930\u0915\u094D\u0924\u0902 \u092E\u0941\u0916\u092E\u094D') ===
     '\u0930\u0915\u094D\u0924\u092E\u094D \u092E\u0941\u0916\u092E\u094D',
    'रक्तं मुखम् → रक्तम् मुखम्: обе части слышны целиком');
  ck(T('\u0935\u093F\u0902\u0936\u0924\u093F\u0903') === '\u0935\u093F\u0902\u0936\u0924\u093F\u0939\u093F',
    'внутри слова перед «श» анусвара не трогается: विंशतिः');
  ck(T('\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D') === '\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D',
    'анусвара перед «स» остаётся анусварой: संस्कृतम्');

  /* ни в одном уроке конечная анусвара не уходит в движок как ं */
  {
    const tailAnu = [];
    Object.keys(SAL.lessons).forEach(k => {
      const cfg = SAL.lessons[k];
      const spoken = [];
      (cfg.words || []).forEach(w => { if (w.ttsText) spoken.push(w.ttsText); });
      if (cfg.discovery && cfg.discovery.sentences) cfg.discovery.sentences.forEach(sn => spoken.push(sn.ttsText));
      spoken.forEach(t => { if (/\u0902(?=\s|$)/.test(T(t))) tailAnu.push(k + ': ' + t); });
    });
    ck(tailAnu.length === 0, 'нигде в конце слова не осталось ं' +
      (tailAnu.length ? ' — ' + tailAnu.slice(0, 4).join('; ') : ''));
  }

  /* ни в одном уроке висарга не уходит в движок как есть */
  const WITH_VISARGA = [];
  Object.keys(SAL.lessons).forEach(k => {
    const cfg = SAL.lessons[k];
    (cfg.words || []).forEach(w => {
      if (w.ttsText && /\u0903/.test(w.ttsText)) WITH_VISARGA.push({ k: k, t: w.ttsText, out: T(w.ttsText) });
    });
    if (cfg.discovery && cfg.discovery.sentences) {
      cfg.discovery.sentences.forEach(sn => {
        if (sn.ttsText && /\u0903/.test(sn.ttsText)) WITH_VISARGA.push({ k: k, t: sn.ttsText, out: T(sn.ttsText) });
      });
    }
  });
  ck(WITH_VISARGA.length >= 8,
    'во всех уроках найдено ' + WITH_VISARGA.length + ' строк с висаргой');
  ck(WITH_VISARGA.every(x => x.out.indexOf('\u0903') < 0),
    'ни одна из них не отдаёт ः в движок речи');

  /* а на экране висарга остаётся — правка только для звука */
  ck(SAL.lessons.LG.words.filter(w => /\u0903/.test(w.deva)).length === 3,
    'на экране урока 5 висарга на месте (три слова)');
  ck(SAL.lessons.LG.discovery.sentences.filter(s => /\u0903/.test(s.deva)).length === 4,
    'в восьми предложениях висарга на месте (четыре строки)');
  ck(SAL.lessons.LG.words.filter(w => /\u0903/.test(w.deva)).every(w => /\u0903$/.test(w.deva)),
    'на экране висарга стоит там же, где была — в конце слова');
  ck(SAL.lessons.LG.words.filter(w => /\u0903/.test(w.deva)).every(w => w.gapAnswer === '\u0903'),
    'в «Пропусках» по-прежнему спрашивается ः — правка коснулась только звука');
  SAL.openLesson('L4');
}

/* ==========================================================================
   ПОРЯДОК ВАРИАНТОВ · верный ответ не должен всегда стоять первым
   --------------------------------------------------------------------------
   В данных всех уроков верный вариант записан первым, поэтому «Пропуски» и
   «Буквы» показывали его под буквой A. Теперь движок перемешивает варианты.
   Проверяем: буква бывает разной, порядок не прыгает при перерисовке и
   ответ по-прежнему засчитывается.
   ========================================================================== */
console.log('\n===== Порядок вариантов: ответ не всегда A =====');
{
  const L = 'ABCD';
  const keys = Object.keys(SAL.lessons).filter(k => SAL.lessons[k].words && SAL.lessons[k].words.length);
  const tally = { 0: 0, 1: 0, 2: 0, 3: 0 };
  const perLesson = [];
  const unstable = [];
  const notScored = [];

  keys.forEach(k => {
    const cfg = SAL.lessons[k];
    SAL.openLesson(k);
    ['gaps', 'spelling'].forEach(game => {
      SAL.do(k, 'setGame', game);
      const arena = win.document.getElementById(k + '-practice-arena');
      const g = SAL.lessons[k]._st.g[game];
      const marks = [];
      cfg.words.forEach((w, i) => {
        const answer = game === 'gaps' ? w.gapAnswer : w.missingAnswer;
        const pick = game === 'gaps' ? 'gapPick' : 'spellPick';
        const readAt = () => {
          g.i = i; SAL.refresh();
          const btns = [...arena.querySelectorAll('.quiz-opt-btn')];
          return btns.findIndex(b => (b.getAttribute('onclick') || '').indexOf("'" + answer + "'") >= 0);
        };
        const at = readAt();
        if (at >= 0) { marks.push(L[at]); tally[at]++; } else { marks.push('-'); }
        /* порядок не должен меняться при перерисовке того же слова */
        if (at >= 0 && readAt() !== at) unstable.push(k + '/' + game + '/' + w.id);
        /* и верный вариант по-прежнему засчитывается */
        if (game === 'gaps') {
          g.answered = false; g.firstTry = true; g.redPick = null;
          const before = g.score;
          SAL.do(k, 'gapPick', answer);
          if (!g.answered || g.score !== before + 1) notScored.push(k + '/' + w.id);
        }
      });
      perLesson.push(k + ' ' + game + ': ' + marks.join(''));
    });
  });

  perLesson.forEach(line => console.log('  · ' + line));
  const total = Object.keys(tally).reduce((s, n) => s + tally[n], 0);
  ck(tally[1] + tally[2] + tally[3] > 0,
    'верный ответ бывает не только под A: ' + JSON.stringify(tally));
  ck(Object.keys(tally).filter(n => tally[n] > 0).length === 4,
    'задействованы все четыре буквы A/B/C/D на ' + total + ' вопросах');
  ck(tally[0] < total * 0.45,
    'на A приходится меньше половины ответов (' + tally[0] + ' из ' + total + ')');
  ck(unstable.length === 0,
    'порядок вариантов не прыгает при перерисовке' + (unstable.length ? ': ' + unstable.slice(0, 3).join(', ') : ''));
  ck(notScored.length === 0,
    'верный вариант засчитывается на любой позиции' + (notScored.length ? ': ' + notScored.slice(0, 3).join(', ') : ''));

  /* ни в одном уроке верный ответ не стоит на одной и той же букве всегда */
  const mono = [];
  keys.forEach(k => {
    const cfg = SAL.lessons[k];
    SAL.openLesson(k);
    ['gaps', 'spelling'].forEach(game => {
      SAL.do(k, 'setGame', game);
      const g = SAL.lessons[k]._st.g[game];
      const seen = new Set();
      cfg.words.forEach((w, i) => {
        const answer = game === 'gaps' ? w.gapAnswer : w.missingAnswer;
        g.i = i; SAL.refresh();
        const btns = [...win.document.getElementById(k + '-practice-arena').querySelectorAll('.quiz-opt-btn')];
        const at = btns.findIndex(b => (b.getAttribute('onclick') || '').indexOf("'" + answer + "'") >= 0);
        if (at >= 0) seen.add(at);
      });
      if (seen.size === 1 && cfg.words.length >= 4) mono.push(k + '/' + game);
    });
  });
  ck(mono.length === 0, 'ни в одном уроке буква не закреплена за ответом навсегда' +
    (mono.length ? ': ' + mono.join(', ') : ''));

  /* рукописный урок 12 слов: у него своя отрисовка */
  win.selectPracticeGame('spelling');
  SAL.openLesson('LG');
  win.switchView('lesson7');
  const spMarks = [];
  for (let i = 0; i < 12; i++) {
    win.eval('spIndex = ' + i + '; renderPracticeArena();');
    const btns = [...win.document.getElementById('lesson1-practice-arena').querySelectorAll('.quiz-opt-btn')];
    const answer = win.eval('bodyPartsVocab[spIndex].missingAnswer');
    const at = btns.findIndex(b => (b.getAttribute('onclick') || '').indexOf("'" + answer + "'") >= 0);
    spMarks.push(at >= 0 ? L[at] : '-');
  }
  ck(new Set(spMarks).size >= 3,
    'урок 12 слов, «Буквы»: ответ на разных буквах — ' + spMarks.join(''));

  win.eval('gapIndex = 0; renderPracticeArena();');
  SAL.openLesson('L4');
}

/* ---------- английская версия без кириллицы ---------- */
console.log('\n===== Английская версия: ни одной русской буквы =====');
{
  const CYR = /[\u0400-\u04FF]/;
  const doc = win.document;

  /* Текст и подписи, которые читает человек: узлы текста + title / aria-label /
     placeholder / alt. Служебные скрипты и стили пропускаем. */
  const cyrIn = root => {
    const out = [];
    if (!root) return out;
    const w = doc.createTreeWalker(root, win.NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      const el = n.parentElement;
      if (!el || /^(SCRIPT|STYLE)$/.test(el.nodeName)) continue;
      if (CYR.test(n.nodeValue)) out.push(n.nodeValue.replace(/\s+/g, ' ').trim().slice(0, 90));
    }
    root.querySelectorAll('*').forEach(el => {
      if (!el.getAttribute) return;
      ['title', 'aria-label', 'placeholder', 'alt'].forEach(a => {
        const v = el.getAttribute(a);
        if (v && CYR.test(v)) out.push('@' + a + ' ' + v.replace(/\s+/g, ' ').trim().slice(0, 80));
      });
    });
    return out;
  };

  win.setLanguage('en');

  const EN_KEYS = Object.keys(SAL.lessons).filter(k => doc.getElementById('view-lesson' + SAL.lessons[k].num));
  const offenders = [];
  EN_KEYS.forEach(k => {
    const pane = doc.getElementById('view-lesson' + SAL.lessons[k].num);
    SAL.openLesson(k);
    SAL.refresh();
    ['presentation', 'practice', 'production'].forEach(st => SAL.toggleGuide(k, st));
    SAL.refresh();
    cyrIn(pane).forEach(t => offenders.push('урок ' + SAL.lessons[k].num + ': ' + t));
    [...pane.querySelectorAll('.practice-tab-btn[data-pres-mode]')].forEach(b => {
      b.click();
      SAL.refresh();
      cyrIn(pane).forEach(t => offenders.push('урок ' + SAL.lessons[k].num + '/режим: ' + t));
    });
    [...pane.querySelectorAll('.practice-tab-btn[data-prod-mode]')].forEach(b => {
      b.click();
      SAL.refresh();
      cyrIn(pane).forEach(t => offenders.push('урок ' + SAL.lessons[k].num + '/production: ' + t));
    });
  });
  cyrIn(doc.getElementById('view-home')).forEach(t => offenders.push('главная: ' + t));
  win.switchView('details');
  cyrIn(doc.getElementById('view-details')).forEach(t => offenders.push('details: ' + t));
  win.switchView('home');

  ck(offenders.length === 0, 'в английском режиме нет ни одного русского слова' +
    (offenders.length ? ' — найдено ' + offenders.length + ': ' + offenders.slice(0, 6).join(' | ') : ''));

  /* Места, где русский текст жил дольше всего: их проверяем поимённо,
     чтобы при поломке было видно, что именно сломалось. */
  SAL.openLesson('LG');
  SAL.refresh();
  const pane = doc.getElementById('view-lesson5');
  const t = sel => (pane.querySelector(sel) ? pane.querySelector(sel).textContent.trim() : '');
  const cyr = s => CYR.test(s);

  ck(t('[data-players="1"]') === '👤 1 student', 'кнопка 👤 на английском: ' + t('[data-players="1"]'));
  ck(t('[data-players="2"]') === '👥 2 students', 'кнопка 👥 на английском: ' + t('[data-players="2"]'));
  ck(t('[data-key="1"]') === '🔑 Answer key', 'кнопка ключа на английском: ' + t('[data-key="1"]'));
  const presLabels = [...pane.querySelectorAll('[data-pres-mode]')].map(b => b.textContent.trim());
  ck(presLabels.length === 4 && presLabels.every(l => !cyr(l)),
    'все 4 режима Presentation на английском: ' + presLabels.join(' | '));
  ck(/Step-by-Step/.test(presLabels[0]) && /Diagram/.test(presLabels[1]) &&
     /Audio-First/.test(presLabels[2]) && /Full Poster/.test(presLabels[3]),
    'режимы Presentation подписаны по-английски, а не «Пошагово/Схема»');
  ck(!cyr(t('h2.section-title')) && /Colours|Three Genders|Gender/i.test(t('h2.section-title')) ||
     !cyr(t('h2.section-title')),
    'заголовок урока на английском: ' + t('h2.section-title'));
  ck(!cyr(t('#LG-tg-presentation h3')), 'заголовок инструкции преподавателя на английском: ' + t('#LG-tg-presentation h3'));
  const sel2 = pane.querySelector('.lesson-select');
  ck(sel2 && !cyr(sel2.getAttribute('aria-label') || '') && !cyr(sel2.getAttribute('title') || ''),
    'подпись выбора урока в title и aria-label тоже английская: ' +
    (sel2 ? sel2.getAttribute('aria-label') : '—'));

  /* Английская инструкция не должна тащить внутрь себя русский жест TPR:
     раньше в ней стояло «(or коснитесь этой части тела у себя)». */
  const guideEn = [...pane.querySelectorAll('.teacher-guide-step')]
    .map(d => d.getAttribute('data-i18n-en') || '').join(' ');
  ck(!cyr(guideEn), 'в английских инструкциях преподавателя нет русских вставок');
  ck(guideEn.indexOf('touch that part of your body') >= 0 ||
     guideEn.indexOf('point to the body part') >= 0,
    'английская инструкция использует английский жест TPR');

  /* --- обратная сторона: русская версия не должна онеметь --- */
  win.setLanguage('ru');
  SAL.refresh();
  ck(t('[data-players="1"]') === '👤 1 ученик', 'русская кнопка 👤 вернулась: ' + t('[data-players="1"]'));
  ck(t('[data-key="1"]') === '🔑 Ключ учителя', 'русская кнопка ключа вернулась: ' + t('[data-key="1"]'));
  const presRu = [...pane.querySelectorAll('[data-pres-mode]')].map(b => b.textContent.trim());
  ck(/Пошагово/.test(presRu[0]) && /Схема/.test(presRu[1]) && /Сначала звук/.test(presRu[2]),
    'русские подписи режимов на месте: ' + presRu.join(' | '));
  ck(cyr(t('#LG-tg-presentation h3')) && /Инструкция для преподавателя/.test(t('#LG-tg-presentation h3')),
    'русский заголовок инструкции на месте');
  ck(/Три рода/.test(t('h2.section-title')), 'русский заголовок урока на месте: ' + t('h2.section-title'));
  const selRu = pane.querySelector('.lesson-select');
  ck(cyr(selRu.getAttribute('aria-label') || ''), 'русская подпись выбора урока на месте: ' +
    selRu.getAttribute('aria-label'));

  /* В английских данных урока не должно быть русских полей: ловим то,
     что пока не выведено на экран, но вылезет при следующей правке. */
  const CYR_FIELD = /(^|\.)(en|en[A-Z][A-Za-z]*|[a-zA-Z]+En|titleEn|introEn|topicEn)$/;
  const fieldHits = [];
  const seenObj = new Set();
  const walkEn = (o, path) => {
    if (o == null) return;
    if (typeof o === 'string') { if (CYR_FIELD.test(path) && CYR.test(o)) fieldHits.push(path); return; }
    if (typeof o !== 'object' || seenObj.has(o)) return;
    seenObj.add(o);
    if (Array.isArray(o)) { o.forEach((v, i) => walkEn(v, path + '[' + i + ']')); return; }
    Object.keys(o).forEach(k => walkEn(o[k], path ? path + '.' + k : k));
  };
  walkEn(SAL.lessons, 'lessons');
  ck(fieldHits.length === 0, 'в полях en всех уроков нет кириллицы' +
    (fieldHits.length ? ': ' + fieldHits.slice(0, 5).join(', ') : ''));

  win.setLanguage('ru');
  SAL.openLesson('L4');
}

/* ---------- английская версия: путь настоящего пользователя ---------- */
console.log('\n===== Английская версия: сначала по-русски, потом EN =====');
{
  /* Панели уроков строятся один раз. Если пользователь сначала полистал
     сайт по-русски, а потом нажал EN, любой элемент без data-i18n-* остался
     бы русским. Проверяем именно этот путь: сначала всё строим в RU,
     переключаемся и только потом смотрим. */
  const CYR = /[\u0400-\u04FF]/;
  const doc = win.document;
  /* видимость: скрытая панель (display:none) — не то, что читает ученик.
     В уроке 12 слов филворд живёт в отдельной арене, а прежняя остаётся
     в DOM скрытой; её содержимое пользователю не показывают. */
  const visible = el => {
    let n = el;
    while (n && n.nodeType === 1) {
      if (n.hasAttribute && n.hasAttribute('hidden')) return false;
      const st = (n.getAttribute && n.getAttribute('style')) || '';
      if (/display\s*:\s*none/i.test(st)) return false;
      if (n.classList && n.classList.contains('view-pane') && !n.classList.contains('active')) return false;
      n = n.parentElement;
    }
    return true;
  };
  const cyrIn = root => {
    const out = [];
    if (!root) return out;
    const w = doc.createTreeWalker(root, win.NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      const el = n.parentElement;
      if (!el || /^(SCRIPT|STYLE)$/.test(el.nodeName)) continue;
      if (!visible(el)) continue;
      if (CYR.test(n.nodeValue)) out.push(n.nodeValue.replace(/\s+/g, ' ').trim().slice(0, 80));
    }
    root.querySelectorAll('*').forEach(el => {
      if (!el.getAttribute || !visible(el)) return;
      ['title', 'aria-label', 'placeholder', 'alt'].forEach(a => {
        const v = el.getAttribute(a);
        if (v && CYR.test(v)) out.push('@' + a + ' ' + v.replace(/\s+/g, ' ').trim().slice(0, 70));
      });
    });
    return out;
  };

  /* 1. прогрев по-русски, как это делает человек */
  win.setLanguage('ru');
  const keys = Object.keys(SAL.lessons).filter(k => doc.getElementById('view-lesson' + SAL.lessons[k].num));
  keys.forEach(k => {
    SAL.openLesson(k);
    const pane = doc.getElementById('view-lesson' + SAL.lessons[k].num);
    ['presentation', 'practice', 'production'].forEach(st => SAL.toggleGuide(k, st));
    [...pane.querySelectorAll('[data-pres-mode]')].forEach(b => b.click());
    [...pane.querySelectorAll('[data-game]')].forEach(b => SAL.do(k, 'setGame', b.getAttribute('data-game')));
    [...pane.querySelectorAll('[data-prod-mode]')].forEach(b => SAL.do(k, 'setProdMode', b.getAttribute('data-prod-mode')));
  });
  win.switchView('lesson7');

  /* 2. переключение на английский */
  win.setLanguage('en');

  /* 3. что видно после переключения */
  const off = [];
  keys.forEach(k => {
    const pane = doc.getElementById('view-lesson' + SAL.lessons[k].num);
    SAL.openLesson(k);
    SAL.refresh();
    cyrIn(pane).forEach(t => off.push('урок ' + SAL.lessons[k].num + ': ' + t));
    [...pane.querySelectorAll('[data-pres-mode]')].forEach(b => {
      b.click(); SAL.refresh();
      cyrIn(pane).forEach(t => off.push('урок ' + SAL.lessons[k].num + '/режим: ' + t));
    });
    [...pane.querySelectorAll('[data-game]')].forEach(b => {
      SAL.do(k, 'setGame', b.getAttribute('data-game'));
      cyrIn(pane).forEach(t => off.push('урок ' + SAL.lessons[k].num + '/игра: ' + t));
    });
  });
  ['lesson7', 'home', 'details'].forEach(v => {
    win.switchView(v);
    cyrIn(doc.getElementById('view-' + v)).forEach(t => off.push(v + ': ' + t));
  });
  ck(off.length === 0, 'после RU → EN русских слов не остаётся' +
    (off.length ? ' — ' + off.length + ': ' + off.slice(0, 5).join(' | ') : ''));

  /* 4. пересборка панелей — гарантия: она включается при смене языка */
  ck(typeof SAL.rebuildForLang === 'function',
    'при смене языка панели уроков пересобираются целиком (SAL.rebuildForLang)');
  const pane5 = doc.getElementById('view-lesson5');
  SAL.openLesson('LG');
  win.setLanguage('ru');
  const before = pane5.querySelector('h2.section-title').textContent;
  win.setLanguage('en');
  const after = doc.getElementById('view-lesson5').querySelector('h2.section-title').textContent;
  ck(/Три рода/.test(before) && !CYR.test(after) && /Three Genders/.test(after),
    'заголовок урока перерисован при смене языка: «' + after + '»');

  /* 5. и обратно: русская версия на месте */
  win.setLanguage('ru');
  const back = doc.getElementById('view-lesson5').querySelector('h2.section-title').textContent;
  ck(/Три рода/.test(back), 'после EN → RU заголовок снова русский: «' + back + '»');
  SAL.openLesson('L4');
}

console.log(errs.length ? '\nJS ERRORS: ' + errs.slice(0, 5).join(' | ') : '\nJS-ошибок нет');
console.log(bad === 0 && errs.length === 0 ? 'ALL CHECKS PASSED' : bad + ' FAILURES');
process.exit(bad || errs.length ? 1 : 0);
