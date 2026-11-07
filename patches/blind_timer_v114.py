# -*- coding: utf-8 -*-
"""Таймер «Слепого поля» (игра 22): сколько секунд поле остаётся открытым.

Было: жёстко 2,5 с — запомнить 10 клеток за это время нельзя.
Стало: кнопки «Поле открыто: 3 / 5 / 8 / 12 / 20 / 30 с» над полем
(по умолчанию 8 с), выбор запоминается в localStorage на весь сайт,
на экране идёт обратный отсчёт. Сделано по образцу настройки паузы
в «Мемори» (MEMORY_PAUSE_* в lesson-engine.js).

Запуск:  python3 patch_blind_timer_v113.py   (из корня ветки v113)
Печатает OK / MISS по каждому якорю; MISS значит «участок не найден,
ничего не тронуто».
"""
import io, sys

def rd(p):
    return io.open(p, encoding='utf-8').read()

def wr(p, s):
    io.open(p, 'w', encoding='utf-8').write(s)

def patch(path, old, new, name, count=1, only_after=None):
    """Меняет ровно count вхождений old на new; печатает OK или MISS."""
    s = rd(path)
    if old not in s:
        print('MISS  [%s] %s' % (path, name)); return False
    if only_after and only_after in s:
        head, tail = s.rsplit(only_after, 1)
        if old not in tail:
            print('MISS  [%s] %s (только после %r не найдено)' % (path, name, only_after)); return False
        if tail.count(old) != count:
            print('MISS  [%s] %s (вхождений %d, ожидалось %d)' % (path, name, tail.count(old), count)); return False
        s = head + only_after + tail.replace(old, new, count)
    else:
        if s.count(old) != count:
            print('MISS  [%s] %s (вхождений %d, ожидалось %d)' % (path, name, s.count(old), count)); return False
        s = s.replace(old, new, count)
    wr(path, s)
    print('OK    [%s] %s' % (path, name))
    return True

G = 'games-extra.js'
E = 'lesson-engine.js'
ok = True

# ------------------------------------------------ 1. константы и помощники
HELPERS = u"""  /* Сколько секунд поле «Слепого поля» остаётся открытым. Раньше было ровно
     2,5 с — за это время десять клеток не запомнить, поэтому длительность
     выбирается кнопками над полем (3 / 5 / 8 / 12 / 20 / 30 с), по умолчанию
     8 с, и запоминается в localStorage (одна на весь сайт, а не на урок). */
  var BLIND_SHOW_KEY = 'sal-blind-show';
  var BLIND_SHOW_OPTIONS = [3, 5, 8, 12, 20, 30];
  var BLIND_SHOW_DEFAULT = 8;
  function loadBlindShowSec() {
    try {
      var raw = window.localStorage ? window.localStorage.getItem(BLIND_SHOW_KEY) : null;
      var sec = parseInt(raw, 10);
      if (BLIND_SHOW_OPTIONS.indexOf(sec) >= 0) return sec;
    } catch (e) { /* storage unavailable */ }
    return BLIND_SHOW_DEFAULT;
  }
  function saveBlindShowSec(sec) {
    try { if (window.localStorage) window.localStorage.setItem(BLIND_SHOW_KEY, String(sec)); } catch (e) { }
  }
  function blindShowSec(g) {
    var sec = g && g.sec ? g.sec : loadBlindShowSec();
    return BLIND_SHOW_OPTIONS.indexOf(sec) >= 0 ? sec : BLIND_SHOW_DEFAULT;
  }
  function blindLeft(g) {
    return Math.max(0, Math.ceil((((g && g.showUntil) || 0) - Date.now()) / 1000));
  }
  /* У поля свои таймеры: один закрывает его, второй перерисовывает экран,
     чтобы цифра «сколько секунд осталось» шла вниз сама. Общего таймера
     движка (K.after) здесь мало: после любой другой игры он считается
     занятым, и новый отсчёт молча не ставится — поле висело бы открытым.
     Оба таймера перед делом проверяют, что игра та же и поле то же, поэтому
     чужие срабатывания (игру переключили, поле пересобрали) ничего не делают. */
  var blindHideId = null, blindTickId = null, blindArmed = 0;
  function blindSame(cfg, g) {
    var st = K.state(cfg);
    return !!st && st.game === 'blindboard' && K.gst(cfg, 'blindboard') === g &&
      g.phase === 'show' && !!g.showUntil;
  }
  function blindStopTimers() {
    if (blindHideId) { clearTimeout(blindHideId); blindHideId = null; }
    if (blindTickId) { clearTimeout(blindTickId); blindTickId = null; }
    blindArmed = 0;
  }
  function blindArm(cfg, g) {
    var left = g.showUntil - Date.now();
    if (blindArmed !== g.showUntil || !blindHideId) {
      if (blindHideId) clearTimeout(blindHideId);
      blindArmed = g.showUntil;
      blindHideId = setTimeout(function () {
        blindHideId = null; blindArmed = 0;
        if (blindSame(cfg, g)) boardHide(cfg);
      }, left > 0 ? left : 0);
    }
    if (blindTickId) clearTimeout(blindTickId);
    blindTickId = setTimeout(function () {
      blindTickId = null;
      if (blindSame(cfg, g)) SAL.refresh();
    }, 500);
  }
"""
ok &= patch(G,
    u"  /* ======================================================= 22. BLIND BOARD */",
    HELPERS + u"  /* ======================================================= 22. BLIND BOARD */",
    u"константы и помощники таймера")

# ------------------------------------------------ 2. boardHide чистит отсчёт
ok &= patch(G,
    u"    g.phase = 'ask'; g.ask = null;\n    SAL.refresh();",
    u"    g.phase = 'ask'; g.ask = null; g.showUntil = 0;\n    blindStopTimers();\n    SAL.refresh();",
    u"boardHide сбрасывает отсчёт")

# ------------------------------------------------ 3. вместо 2500 мс — выбранное время
ok &= patch(G,
    u"    if (g.phase === 'show' && !K.pending()) K.after(2500, function () { boardHide(cfg); });",
    u"    /* поле открыто выбранное число секунд; если ушли к другой игре и\n"
    u"       вернулись, отсчёт начинается заново, а не «уже всё закрылось» */\n"
    u"    if (g.phase === 'show') {\n"
    u"      var showMs = blindShowSec(g) * 1000;\n"
    u"      if (!g.showUntil || g.showUntil - Date.now() < -1500) g.showUntil = Date.now() + showMs;\n"
    u"      blindArm(cfg, g);\n"
    u"    }",
    u"время показа берётся из настройки")

# ------------------------------------------------ 4. строка кнопок над полем
ok &= patch(G,
    u"    var duoB = players(cfg) === 2;",
    u"    var duoB = players(cfg) === 2;\n"
    u"    /* «Поле открыто: 3 / 5 / 8 / 12 / 20 / 30 с» — столько секунд поле\n"
    u"       видно, прежде чем закрыться. Как пауза на промах в «Мемори». */\n"
    u"    var showRow = '<div class=\"game-ver-row\" data-blind-row=\"show\"><span class=\"game-ver-label\">' +\n"
    u"      ru('Board open:', 'Поле открыто:') + '</span>' +\n"
    u"      BLIND_SHOW_OPTIONS.map(function (s) {\n"
    u"        return chip(cfg, 'blindSec', String(s), ru(s + ' s', s + ' с'), blindShowSec(g) === s);\n"
    u"      }).join('') + '</div>';",
    u"строка «Поле открыто»", only_after=u"  function renderBlindBoard(cfg) {")

ok &= patch(G,
    u"      chip(cfg, 'blindAgain', '', '👁 ' + tx({ ru: 'Показать поле', en: 'Show board' })) + ' ' + restartChip(cfg, 'blindboard')) +",
    u"      chip(cfg, 'blindAgain', '', '👁 ' + tx({ ru: 'Показать поле', en: 'Show board' })) + ' ' + restartChip(cfg, 'blindboard')) +\n"
    u"      showRow +",
    u"строка кнопок вставлена над полем")

# ------------------------------------------------ 5. плашка с обратным отсчётом
ok &= patch(G,
    u"      K.pill(g.phase === 'show' ? tx({ ru: 'Запоминайте…', en: 'Memorise…' }) : tx({ ru: 'Что в клетке', en: 'What is in' }) +",
    u"      K.pill(g.phase === 'show' ? tx({ ru: 'Запоминайте', en: 'Memorise' }) + ': ' +\n"
    u"          blindLeft(g) + ' ' + tx({ ru: 'с', en: 's' }) : tx({ ru: 'Что в клетке', en: 'What is in' }) +",
    u"плашка «Запоминайте: 8 с»")

# ------------------------------------------------ 6. подпись под полем
ok &= patch(G,
    u"            ? tx({ ru: 'Запоминайте: поле закроется через 2,5 секунды. Потом игра назовёт клетку (например b2), и вы выберете, какое слово в ней спрятано.',\n"
    u"                   en: 'Memorise: the board closes in 2.5 seconds. Then the game names a square (b2, for example) and you choose the word hidden in it.' })",
    u"            ? tx({ ru: 'Запоминайте: поле закроется через ', en: 'Memorise: the board closes in ' }) +\n"
    u"              blindLeft(g) + ' ' + tx({ ru: 'с', en: 's' }) + '. ' +\n"
    u"              tx({ ru: 'Потом игра назовёт клетку (например b2), и вы выберете, какое слово в ней спрятано.',\n"
    u"                   en: 'Then the game names a square (b2, for example) and you choose the word hidden in it.' })",
    u"подпись под полем с отсчётом")

# ------------------------------------------------ 7. состояние: sec и showUntil
ok &= patch(G,
    u"      return { cards: null, phase: 'show', i: 0, ask: null, done: {},",
    u"      return { cards: null, phase: 'show', i: 0, ask: null, done: {}, sec: 0, showUntil: 0,",
    u"состояние игры: sec и showUntil", only_after=u"  SAL.addGame('blindboard', {")

# ------------------------------------------------ 8. «Показать поле» — на выбранное время
ok &= patch(G,
    u"      blindAgain: function (cfg) { var g = K.gst(cfg, 'blindboard'); g.phase = 'show'; K.clearAfter(); },",
    u"      blindAgain: function (cfg) {\n"
    u"        var g = K.gst(cfg, 'blindboard');\n"
    u"        g.phase = 'show'; g.showUntil = Date.now() + blindShowSec(g) * 1000;\n"
    u"        blindStopTimers();\n"
    u"      },",
    u"«Показать поле» открывает на выбранное время")

# ------------------------------------------------ 9. новое действие blindSec
ok &= patch(G,
    u"      blindPick: function (cfg, st, a) {",
    u"      /* «Поле открыто: 3 / 5 / 8 / 12 / 20 / 30 с». Выбор запоминается на\n"
    u"         весь сайт; если его меняют, пока поле открыто, отсчёт идёт заново\n"
    u"         по новой длительности — иначе кнопка выглядит неработающей. */\n"
    u"      blindSec: function (cfg, st, a) {\n"
    u"        var g = K.gst(cfg, 'blindboard');\n"
    u"        var sec = parseInt(a, 10);\n"
    u"        if (BLIND_SHOW_OPTIONS.indexOf(sec) < 0) return;\n"
    u"        g.sec = sec;\n"
    u"        saveBlindShowSec(sec);\n"
    u"        if (g.phase === 'show') { g.showUntil = Date.now() + sec * 1000; blindStopTimers(); }\n"
    u"      },\n"
    u"      blindPick: function (cfg, st, a) {",
    u"действие blindSec", only_after=u"  SAL.addGame('blindboard', {")

# ------------------------------------------------ 10. правила: не «2,5 секунды»
ok &= patch(G,
    u"      how: { ru: ['Шаг 1. Поле открыто 2,5 секунды: во всех клетках видны слова урока (каждое — дважды). Запомните, где что лежит.',",
    u"      how: { ru: ['Шаг 1. Поле открыто столько, сколько выбрано кнопками «Поле открыто» над полем: 3, 5, 8, 12, 20 или 30 секунд (по умолчанию 8). Во всех клетках видны слова урока (каждое — дважды). Запомните, где что лежит.',",
    u"правила: шаг 1 (RU)", only_after=u"    blindboard: {")

ok &= patch(G,
    u"             en: ['Step 1. The board is open for 2.5 seconds: every square shows a word of the lesson (each word twice). Memorise what is where.',",
    u"             en: ['Step 1. The board stays open for as long as you choose with the “Board open” buttons above it: 3, 5, 8, 12, 20 or 30 seconds (8 by default). Every square shows a word of the lesson (each word twice). Memorise what is where.',",
    u"правила: шаг 1 (EN)", only_after=u"    blindboard: {")

ok &= patch(G,
    u"'Забыли, где что? 👁 «Показать поле» — откроет всё поле ещё на 2,5 секунды. Так можно сколько угодно раз.'],",
    u"'Забыли, где что? 👁 «Показать поле» — откроет всё поле ещё на выбранное время. Так можно сколько угодно раз.'],",
    u"правила: про «Показать поле» (RU)", only_after=u"    blindboard: {")

ok &= patch(G,
    u"'Forgot the board? 👁 “Show board” opens everything again for another 2.5 seconds — as often as you like.'] },",
    u"'Forgot the board? 👁 “Show board” opens everything again for the time you have chosen — as often as you like.'] },",
    u"правила: про «Показать поле» (EN)", only_after=u"    blindboard: {")

# ------------------------------------------------ 11. движок: клик по кнопкам не прокручивает экран
ok &= patch(E,
    u"      action === 'matchNext';",
    u"      action === 'matchNext' || action === 'blindSec';",
    u"клик по «Поле открыто» без прокрутки")

# ------------------------------------------------ 11b. тесты живой ветки
REG_ANCHOR = u"""  /* возвращаем обычную настройку, чтобы не влиять на остальные проверки */
  win.localStorage.removeItem('sal-memory-pause');
  ['LG', 'LG2', 'L2'].forEach(k => {
    const gm = gst(k, 'memory');
    if (gm) { gm.pause = 0; gm.missUntil = 0; }
  });
  SAL.openLesson('LG');
  SAL.do('LG', 'setGame', 'memory');
  SAL.do('LG', 'restart', 'memory');
}
"""
REG_BLOCK = REG_ANCHOR + u"""
/* ==========================================================================
   «СЛЕПОЕ ПОЛЕ» · СКОЛЬКО СЕКУНД ПОЛЕ ОТКРЫТО: 3 / 5 / 8 / 12 / 20 / 30 С
   Раньше поле закрывалось ровно через 2,5 с — десять клеток за это время не
   запомнить. Теперь длительность выбирается кнопками над полем, сохраняется
   в localStorage и действует во всех уроках. Таймер в тесте не выполняется,
   а только записывается — проверка остаётся синхронной (как для паузы
   в «Мемори»).
   ========================================================================== */
console.log('\\n===== «Слепое поле»: кнопки «Поле открыто» =====');
{
  const chips = k => [...arenaOf(k).querySelectorAll('[data-blind-row="show"] .chip-btn')];
  const activeLabel = k => chips(k).filter(b => b.classList.contains('active'))
    .map(b => b.textContent.trim()).join();
  const rowLabel = k => ((arenaOf(k).querySelector('[data-blind-row="show"] .game-ver-label') || {}).textContent || '');
  const waitOfShow = k => {
    const g = gst(k, 'blindboard');
    g.phase = 'show'; g.showUntil = 0;
    const real = win.setTimeout;
    const waits = [];
    win.setTimeout = (fn, ms) => { waits.push(ms); return 0; };
    try { SAL.refresh(); } finally { win.setTimeout = real; }
    g.phase = 'ask'; g.showUntil = 0; SAL.refresh();
    return waits.filter(w => w >= 1000)[0];
  };

  win.localStorage.removeItem('sal-blind-show');
  SAL.openLesson('L4');
  SAL.do('L4', 'restart', 'blindboard');
  const labels = chips('L4').map(b => b.textContent.trim());
  ck(labels.length === 6 && labels.join('|') === '3 с|5 с|8 с|12 с|20 с|30 с',
    'над полем шесть кнопок длительности — ' + labels.join(' | '));
  ck(/Поле открыто/.test(rowLabel('L4')),
    'ряд подписан: «Поле открыто:» — ' + rowLabel('L4').trim());
  const defMs = waitOfShow('L4');
  ck(activeLabel('L4') === '8 с' && defMs > 7000 && defMs <= 8000,
    'по умолчанию 8 секунд: кнопка «8 с» подсвечена, поле ждёт ~8000 мс (' + defMs + ')');
  ck(!/2,5 секунды|2\\.5 seconds/.test(arenaOf('L4').querySelector('.game-rules').textContent),
    'в правилах больше нет «2,5 секунды» — длительность настраивается');

  SAL.do('L4', 'blindSec', '20');
  ck(activeLabel('L4') === '20 с' && gst('L4', 'blindboard').sec === 20,
    'кнопка «20 с» включается и запоминает 20 секунд');
  const bigMs = waitOfShow('L4');
  ck(bigMs > 19000 && bigMs <= 20000,
    'после выбора поле открыто 20 секунд, а не 2,5 (' + bigMs + ' мс)');
  ck(win.localStorage.getItem('sal-blind-show') === '20',
    'выбор сохранён в localStorage — ' + win.localStorage.getItem('sal-blind-show'));

  SAL.do('L4', 'restart', 'blindboard');
  ck(activeLabel('L4') === '20 с' && waitOfShow('L4') > 19000,
    '«↺» не сбрасывает выбранное время — поле новое, длительность прежняя');
  SAL.openLesson('L2');
  SAL.do('L2', 'setGame', 'blindboard');
  SAL.do('L2', 'restart', 'blindboard');
  ck(chips('L2').length === 6 && activeLabel('L2') === '20 с',
    'в уроке лица кнопки те же и время то же — настройка одна на весь сайт');

  const gm = gst('L2', 'blindboard');
  gm.phase = 'ask'; gm.showUntil = 0;
  SAL.do('L2', 'blindAgain');
  const againMs = gm.showUntil - Date.now();
  ck(gm.phase === 'show' && againMs > 19000 && againMs <= 20000,
    '«👁 Показать поле» открывает поле на те же 20 секунд (' + Math.round(againMs) + ' мс)');

  const bbPill = [...arenaOf('L2').querySelectorAll('.game-score-pill')].map(p => p.textContent).join(' | ');
  ck(/Запоминайте: \\d+ с/.test(bbPill), 'на плашке идёт обратный отсчёт — ' + bbPill);

  win.setLanguage('en');
  const enRow = [...arenaOf('L2').querySelectorAll('[data-blind-row="show"]')]
    .map(el => el.textContent.replace(/\\s+/g, ' ').trim()).join(' ');
  ck(!/[\\u0400-\\u04FF]/.test(enRow) && /Board open/.test(enRow),
    'английская версия: «Board open: …» без кириллицы — ' + enRow);
  win.setLanguage('ru');

  /* возвращаем обычную настройку, чтобы не влиять на остальные проверки */
  win.localStorage.removeItem('sal-blind-show');
  SAL.openLesson('L4');
  SAL.do('L4', 'setGame', 'blindboard');
  SAL.do('L4', 'restart', 'blindboard');
}
"""
ok &= patch('tests/regression.js', REG_ANCHOR, REG_BLOCK,
    u"тесты: кнопки «Поле открыто»")

# ------------------------------------------------ 12. версия кэша
try:
    import re
    h = rd('index.html')
    cur = re.search(r'\?v=(\d+)', h)
    if cur:
        now, nxt = int(cur.group(1)), int(cur.group(1)) + 1
        h2 = h.replace('?v=%d' % now, '?v=%d' % nxt).replace('data-build="v%d"' % now, 'data-build="v%d"' % nxt)
        wr('index.html', h2)
        print('OK    [index.html] v%d -> v%d (%d ссылок)' % (now, nxt, h2.count('?v=%d' % nxt)))
    else:
        print('MISS  [index.html] версия не найдена — увеличьте ?v= вручную')
        ok = False
except IOError:
    print('MISS  [index.html] файла нет')
    ok = False

print('')
print('Готово.' if ok else 'Готово, но были пропуски.')
sys.exit(0 if ok else 1)
