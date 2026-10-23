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
  'lesson6.js', 'lesson7.js', 'lesson8.js', 'lesson9.js', 'games-extra.js', 'app.js'].forEach(f => {
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

/* ---------- lesson order: body (6) -> face (7) -> body+face (12) ---------- */
{
  const order = ['view-lesson1', 'view-lesson2', 'view-lesson3', 'view-lesson4', 'view-lesson5',
                 'view-lesson6', 'view-lesson7', 'view-lesson8', 'view-lesson9']
    .map(id => win.document.getElementById(id));
  ck(order.every(Boolean), 'все девять панелей урока есть на странице');
  ck(order[0].compareDocumentPosition(order[1]) & 4, 'порядок панелей: урок 1 → урок 2');
  ck(order[1].compareDocumentPosition(order[2]) & 4, 'порядок панелей: урок 2 → урок 3');
  ck(order[2].compareDocumentPosition(order[3]) & 4, 'порядок панелей: урок 3 → урок 4');
  ck(order[3].compareDocumentPosition(order[4]) & 4, 'порядок панелей: урок 4 → урок 5');
  ck(order[4].compareDocumentPosition(order[5]) & 4, 'порядок панелей: урок 5 → урок 6');
  ck(order[5].compareDocumentPosition(order[6]) & 4, 'порядок панелей: урок 6 → урок 7');
  ck(order[6].compareDocumentPosition(order[7]) & 4, 'порядок панелей: урок 7 → урок 8');
  ck(order[7].compareDocumentPosition(order[8]) & 4, 'порядок панелей: урок 8 → урок 9');
  ck(SAL.lessons.L2.num === 1 && SAL.lessons.L3.num === 2 && SAL.lessons.L4.num === 4 &&
     SAL.lessons.L5.num === 5 && SAL.lessons.L6.num === 6 && SAL.lessons.L7.num === 7 &&
     SAL.lessons.L8.num === 8 && SAL.lessons.L9.num === 9,
    'номера в данных: Тело = 1, Лицо = 2, 1–5 = 4, 6–10 = 5, 11–15 = 6, 16–20 = 7, десятки = 8 и 9');
  ck(/Урок 4: Цифры/.test(win.document.getElementById('view-lesson4').textContent), 'слот 4 — Цифры 1–5');
  ck(/सङ्ख्याः/.test(win.document.getElementById('view-lesson4').innerHTML), 'слот 4: заголовок सङ्ख्याः');
  const w4 = SAL.lessons.L4.words.map(w => w.deva).join(' ');
  ck(w4 === 'एकम् द्वे त्रीणि चत्वारि पञ्च', 'урок 4: ровно пять числительных — ' + w4);
  ck(/Урок 5: Цифры 6–10/.test(win.document.getElementById('view-lesson5').textContent), 'слот 5 — Цифры 6–10');
  ck(/Урок 6: Цифры 11–15/.test(win.document.getElementById('view-lesson6').textContent), 'слот 6 — Цифры 11–15');
  ck(/Урок 7: Цифры 16–20/.test(win.document.getElementById('view-lesson7').textContent), 'слот 7 — Цифры 16–20');
  ck(/Урок 8: Десятки 10–50/.test(win.document.getElementById('view-lesson8').textContent), 'слот 8 — Десятки 10–50');
  ck(/Урок 9: Десятки 60–100/.test(win.document.getElementById('view-lesson9').textContent), 'слот 9 — Десятки 60–100');
  const w5list = SAL.lessons.L5.words.map(w => w.deva).join(' ');
  ck(w5list === 'षट् सप्त अष्ट नव दश', 'урок 5: ровно пять числительных — ' + w5list);
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
console.log('\n===== Уроки 5–9: числительные =====');
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
  ck(!!L && L.num === Number(key.slice(1)), key + ': зарегистрирован под номером ' + (L && L.num));
  ck(L.words.map(w => w.deva).join(' ') === NUMS[key].deva,
    key + ': ровно пять числительных — ' + L.words.map(w => w.deva).join(' '));
  ck(L.words.every(w => w.syll.join('') === w.deva), key + ': слоги складываются в слово');
  ck(L.decoys.length >= 20 && new Set(L.decoys).size === L.decoys.length,
    key + ': ' + L.decoys.length + ' разных отвлекающих слов');
  ck(L.decoys.every(d => L.words.every(w => w.deva !== d)),
    key + ': отвлекающие слова не совпадают со словами урока');
  const pastTen = L.num >= 6;
  const digits = L.words.every(w => /<text[^>]*>\d+<\/text>/.test(w.svg));
  const beads = L.words.every(w => /fill="#F59E0B"/.test(w.svg));
  ck(pastTen ? (digits && !beads) : (beads && !digits),
    key + ': количество показано ' + (pastTen
      ? 'арабскими цифрами — больше десяти бусины не сосчитать'
      : 'бусинами — до десяти считаем на глаз'));
  ck(JSON.stringify(L.extraGames) === JSON.stringify(EXTRA),
    key + ': тот же набор из ' + EXTRA.length + ' игр, что и в уроке 4');

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
const NAV_VALUES = ['L2', 'L3', 'lesson3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'];
const PANES = ['view-lesson1', 'view-lesson2', 'view-lesson3', 'view-lesson4', 'view-lesson5',
               'view-lesson6', 'view-lesson7', 'view-lesson8', 'view-lesson9'];
const CUR = { 'view-lesson1': 'L2', 'view-lesson2': 'L3', 'view-lesson3': 'lesson3',
              'view-lesson4': 'L4', 'view-lesson5': 'L5', 'view-lesson6': 'L6', 'view-lesson7': 'L7',
              'view-lesson8': 'L8', 'view-lesson9': 'L9' };
['L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'].forEach(k => SAL.openLesson(k));
win.switchView('lesson3');
PANES.forEach(id => {
  const pane = win.document.getElementById(id);
  const sels = pane.querySelectorAll('select.lesson-select');
  ck(sels.length === 1, id + ': ровно один выпадающий список уроков (найдено ' + sels.length + ')');
  const sel = sels[0];
  if (!sel) return;
  ck(NAV_VALUES.every(v => [...sel.options].some(o => o.value === v)) && sel.options.length === NAV_VALUES.length,
    id + ': в списке ровно все девять уроков (' + sel.options.length + ')');
  ck(sel.value === CUR[id] && sel.options[sel.selectedIndex].value === CUR[id],
    id + ': выбран текущий урок (' + sel.value + ')');
  ck(pane.querySelectorAll('.ppp-top-row [onclick*="openLesson"]').length === 0,
    id + ': строки кнопок-уроков больше нет');
  ck(/Выбрать номер урока/.test(pane.textContent), id + ': подпись «Выбрать номер урока» на месте');
});
ck(win.document.getElementById('view-lesson4')
    .querySelectorAll('.ppp-top-row > div:first-child > *').length === 3,
  'слева в строке три элемента: «на главную», подпись и список');
SAL.gotoLesson('L5');
ck(win.document.getElementById('view-lesson5').classList.contains('active'),
  'выбор урока 5 в списке открывает пятую панель');
SAL.gotoLesson('lesson3');
ck(win.document.getElementById('view-lesson3').classList.contains('active'),
  'выбор урока 3 открывает панель 12 слов');
SAL.gotoLesson('L2');
ck(win.document.getElementById('view-lesson1').classList.contains('active'),
  'выбор урока 1 открывает первую панель');
win.setLanguage('en');
SAL.openLesson('L4');
ck([...win.document.getElementById('view-lesson4').querySelector('select.lesson-select').options]
    .every(o => /^Lesson \d/.test(o.textContent)), 'список уроков переведён на английский');
ck(/Choose a lesson/.test(win.document.getElementById('view-lesson3').textContent),
  'урок 3 (12 слов): подпись списка тоже переведена');
win.setLanguage('ru');
SAL.openLesson('L4');
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
['L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'].forEach(k => {
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
ck(missing.length === 0, 'в каждой игре уроков 1, 2, 4–9 есть подробные правила (цель, шаги, счёт)' +
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

/* the standalone 12-word lesson shares the same rules via SAL.rulesPanel() */
win.switchView('lesson3');
const noRulesL1 = GAMES.filter(gm => {
  win.selectPracticeGame(gm);
  return !l1arena.querySelector('.game-rules');
});
ck(noRulesL1.length === 0, 'урок 3 (12 слов): правила есть во всех 12 играх' +
  (noRulesL1.length ? ' — без правил: ' + noRulesL1.join(', ') : ''));


console.log(errs.length ? '\nJS ERRORS: ' + errs.slice(0, 5).join(' | ') : '\nJS-ошибок нет');
console.log(bad === 0 && errs.length === 0 ? 'ALL CHECKS PASSED' : bad + ' FAILURES');
process.exit(bad || errs.length ? 1 : 0);
