# Sanskrit in Action with Alex Vijaya — Sanskrit in Action с Алексом Виджая

> **Sanskrit, the Cambridge way. Speaking from day one.**  
> **Санскрит по-кембриджски. Говорим с первого дня.**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Ready-d97706?style=flat-square&logo=github)](https://alexquantforge.github.io/sanskrit-in-action/)
[![Methodology](https://img.shields.io/badge/Methodology-Communicative%20%26%20Task--Based-0f766e?style=flat-square)](#english)
[![Levels](https://img.shields.io/badge/CEFR-A1%E2%80%93C2-1d4ed8?style=flat-square)](#cefr-a1c2-can-do-grid)
[![Matrix](https://img.shields.io/badge/Matrix-4%20Skills%20%C3%97%205%20Systems-7c3aed?style=flat-square)](#the-4-skills--5-language-systems-matrix)

---

## English

### Short Description (for GitHub "About" field)

> Sanskrit in Action with Alex Vijaya — Sanskrit the Cambridge way: communicative, task-based, CEFR A1–C2. 4 skills × 5 systems, śāstra-based texts, interactive games.

### About the Project

**Sanskrit in Action with Alex Vijaya** — learn Sanskrit the way Cambridge teaches modern languages: communicative approach, task-based learning (TBLT), and CEFR levels **A1–C2**.

Instead of nineteenth-century grammar-translation drills where learners memorize endless declension charts before speaking a single word, **Sanskrit in Action** puts communication first. You solve real-life communicative tasks from lesson one while unlocking Pāṇini's grammatical system step by step as a tool for living speech and reading authentic śāstras.

### The 4 Skills × 5 Language Systems Matrix

#### 4 Skills
* **Listening (*Śravaṇam* · श्रवणम्)** — recognizing natural spoken Sanskrit, parsing sandhi boundaries in real time, and perceiving Vedic pitch accent.
* **Speaking (*Bhāṣaṇam* · भाषणम्)** — speaking from Day 1 through role-plays (*saṃvāda*), communicative tasks, and oral drills.
* **Reading (*Paṭhanam* · पठनम्)** — graded reading in Devanāgarī and IAST, progressing from adapted fables to original śāstras and commentaries.
* **Writing (*Lekhanam* · लेखनम्)** — composing dialogues, applying sandhi and compounds, and writing structured philosophical arguments.

#### 5 Language Systems (The Canonical Cambridge Grid Filled with Sanskrit)

| Language System (Cambridge) | Sanskrit Linguistic Content |
| :--- | :--- |
| **1. Pronunciation** | **Varṇamālā**: vowels including *ṛ / ḷ*, *anusvāra*, *visarga*, retroflex consonants (*ṭ, ḍ, ṇ*); articulation points (*uccāraṇa-sthāna*); Vedic pitch accent (*udātta–svarita*); **sandhi** as natural connected speech at word boundaries. |
| **2. Grammar** | **Vibhakti** (the 8-case system in communicative context), **lakāra** (tense, aspect, mood), **samāsa** (compound architecture), and Pāṇinian **kāraka** roles. |
| **3. Vocabulary** | Themed lexical fields ("Survival Sanskrit": greetings, family, market, travel, debate) and Pāṇinian **dhātu** roots as a generative word-formation system. |
| **4. Functions** | Canonical CEFR functional exponents (*Can-Do*): greeting, introducing oneself, requesting, inviting, narrating stories, and conducting structured debate (*pūrvapakṣa → siddhānta*). |
| **5. Discourse** | Connectives and discourse markers (*ca, tu, eva, api, tatra, yathā… tathā, iti*), logical cohesion, and prose (*gadya*) vs. verse (*chandas / śloka*). |

### Śāstra-Rooted Curriculum
No artificial textbook-only Sanskrit. The curriculum is built on authentic classical sources:
* **Pāṇini’s *Aṣṭādhyāyī* (अष्टाध्यायी)** — the generative operating system of the language (*dhātu + pratyaya*).
* **Pañcatantra & Hitopadeśa (पञ्चतन्त्रम् · हितोपदेशः)** — graded narrative reading, practical wisdom, and natural dialogues.
* **Subhāṣitāni (सुभाषितानि)** — epigrammatic verses for mastering *chandas* rhythm, phonetics, and functional expressions.
* **Bhagavadgītā, Upaniṣads & Vedic Hymns** — advanced philosophical inquiry, *bhāṣya* commentary, and Vedic prosody.

### Play, Don't Just Study (Interactive Games & Drills)
* **Sandhi Builder Lab** — interactive word-joining and splitting governed by Pāṇinian sūtras.
* **Saṃvāda Dialogue Simulator** — branching task-based role-plays with immediate CELTA feedback on meaning, appropriacy, and form.
* **Pāṇini’s Dhātu Word-Forge** — combine verbal roots and suffixes to generate vocabulary and authentic sentences.
* **Listening & Chandas Quests** — prosody and phonological recognition drills.

### CEFR A1–C2 Can-Do Grid (Sample Level A1 — "Survival Sanskrit")
* **Pronunciation:** Accurately pronounce all 36 core sounds of the *varṇamālā*, distinguish short and long vowels, and read simple *Devanāgarī* sentences aloud.
* **Vocabulary:** ~300 words across 6 survival lexical fields (greetings, family, food & water, location, time, core numbers).
* **Functions:** Introduce oneself (*Mama nāma…*), greet, ask for water or help, thank someone, and ask simple questions (*kim, kutra, katham*).
* **Grammar:** Nominative (*prathamā*), accusative (*dvitīyā*), and possessive genitive (*ṣaṣṭhī*); present tense (*laṭ lakāra*) for high-frequency verbs (*bhū/as, gam, vad, pā, dā*).
* **Discourse:** Link 3–4 sentences into a short personal introduction using *ca* (and), *tu* (but), and *api* (also).

### Repository Structure

```text
sanskrit-in-action/
├── index.html        # Interactive landing page (EN / RU switch, 4×5 matrix, CEFR A1–C2 explorer, mini-games)
├── styles.css        # Cambridge editorial & Sanskrit manuscript typography styles
├── app.js            # Bilingual i18n, CEFR level explorer, Sandhi Lab, Dialogue Simulator, Dhātu Forge
├── lesson-engine.js  # Generic PPP engine (Presentation / Practice / Production) for lessons 1–4 and 6–11
├── lesson2.js        # Lesson 1 · शरीरावयवाः — body, 6 words: शीर्ष, उदर, हस्त, अङ्गुली, जानु, पाद
├── lesson3.js        # Lesson 2 · मुखसम्बन्धि-शब्दाः — face, 7 words: ललाट, नयन, नासिका, कर्ण, मुख, दन्त, जिह्वा
├── lesson-colors.js  # Lesson 3 · वर्णाः — colours, 6 words: श्वेत, कृष्ण, रक्त, नील, श्याम, गौर (+ повторение «цвет + часть тела»)
├── lesson-colors2.js # Lesson 4 · वर्णाः — ещё 6 цветов: पीत, हरित, नारङ्ग, कपिश, धूसर, पाटल (+ два блока повторения)
├── lesson1.js        # Lesson 5 · शरीरसम्बन्धि-शब्दाः — body + face, 12 words — standalone PPP lesson
├── lesson4.js        # Lesson 6 · सङ्ख्याः — 5 numerals, neuter nom.-acc.: एकम्, द्वे, त्रीणि, चत्वारि, पञ्च
├── lesson5.js        # Lesson 7 · सङ्ख्याः — 5 numerals 6–10: षट्, सप्त, अष्ट, नव, दश
├── lesson6.js        # Lesson 8 · सङ्ख्याः — 5 numerals 11–15: एकादश, द्वादश, त्रयोदश, चतुर्दश, पञ्चदश
├── lesson7.js        # Lesson 9 · सङ्ख्याः — 5 numerals 16–20: षोडश, सप्तदश, अष्टादश, नवदश, विंशतिः
├── lesson8.js        # Lesson 10 · सङ्ख्याः — 5 tens 10–50: दश, विंशतिः, त्रिंशत्, चत्वारिंशत्, पञ्चाशत्
├── lesson9.js        # Lesson 11 · सङ्ख्याः — 5 tens 60–100: षष्टिः, सप्ततिः, अशीतिः, नवतिः, शतम्
├── games-extra.js    # 19 extra practice games (solo / pair / word grids), registered via SAL.addGame()
├── .nojekyll         # Direct static asset serving on GitHub Pages
└── README.md         # Project documentation
```

### Как показано количество

До десяти количество показывают **бусины**: их можно сосчитать одним взглядом, и это остаётся
в рамках Direct Method (ни арабских цифр, ни перевода). **После десяти бусины перестают
работать** — двадцать бусин на карточке уже не сосчитать на глаз, — поэтому в уроках 8–11
карточка и таблица чисел показывают **арабскую цифру**. Перевода на карточках по-прежнему нет:
цифра — это запись количества, а не перевод слова. Тесты следят за правилом в обе стороны:
в уроках 6–7 на карточках только бусины, в уроках 8–11 — только цифры.

### Типы уроков и цели (CELTA / DELTA)

Все одиннадцать уроков проекта — **systems-уроки, подтип Vocabulary (Lexis)**: цель каждого —
языковой материал, а не навык. Форма тоже системная: PPP (Presentation → Practice → Production).
Skills-уроков (reading / listening / speaking / writing) в проекте пока нет: для них нужен
аутентичный текст или запись и другая форма — PDP (pre- / while- / post-) или Test-Teach-Test.

Цель формулируется по формуле и живёт в данных урока:

```js
aim: {
  ru: {
    main: "Ввести и отработать лексику шести основных цветов в контексте описания знакомых предметов и частей тела.",
    subs: ["Уточнить разницу между नील и श्याम.", "Поставить произношение долгих гласных."]
  },
  en: {
    main: "To introduce and practise lexis for six basic colours in the context of describing familiar objects and body parts.",
    subs: ["To clarify the difference between नील (blue) and श्याम (storm-cloud dark blue).", …]
  }
}
```

- **main aim** — `To introduce / clarify / practise / review + материал + in the context of + тема`.
  Материал назван конкретно, контекст обязателен: «to practise the Present Perfect» — плохая цель,
  «to clarify and practise the Present Perfect for life experiences» — хорошая.
- **subsidiary aims** — «другая половина»: в vocabulary-уроке это навык. У нас это почти всегда
  произношение (придыхания, варги, долгота, висарга), устная речь (Production) и чтение
  с поиском информации (филворд = scanning), реже слушание и письмо.
- Цель — не активность и не «ученикам будет весело»: «to do a role-play» целью не является.

Движок рисует цели дважды: плашкой **🎯 Цель урока** под описанием урока (тип урока, main aim,
подцели списком) и первым блоком в **«Инструкции для преподавателя»** на стадии Presentation.
Текст переводится вместе с интерфейсом (`data-i18n-*`), поэтому плашка есть в обеих версиях,
RU и EN. Урок 6 (12 слов) — рукописная страница: его плашка размечена прямо в `index.html`
(`#lesson1-lesson-aim`), а цели продублированы в `#teacher-guide-presentation`.
Регресс проверяет, что у всех уроков есть цель и подцели, что они сформулированы инфинитивом
с контекстом и что плашка не расходится с данными урока.

### Adding a New Lesson
Lessons 2+ are **pure data** — no code changes are needed:

1. Create `lessonN.js` with a single `SAL.registerLesson({ ... })` call (copy `lesson5.js` as a template:
   it is the fullest one — numerals, `syll`, `decoys`, `sortFeatures`, `extraGames`). Declare the lesson
   aim (`aim: { ru: { main, subs }, en: { main, subs } }`, see «Типы уроков и цели» above) — the engine
   shows it under the lesson description and in the teacher's guide. A lesson may also
   declare `unionSprint: ["L2", "L3"]` to get a fifth production mode: one timed sprint over the words
   of the listed lessons (see «Спринт по двум урокам» above).
2. Add `<script src="lessonN.js?v=N"></script>` to `index.html` before `app.js`, plus an empty
   `<div id="view-lessonN" class="view-pane" style="display: none;" hidden></div>` next to the other lesson panes.
3. Register the pane in the `panes` map inside `switchView()` in `app.js`. The lesson dropdown in the
   top bar picks the new lesson up by itself (from `SAL.registerLesson` + `num`); add a short label to
   `NAV_LABELS` in `lesson-engine.js` only if you want one.
4. Add the key to the lists in `tests/regression.js` (script list, lesson sweep, rules sweep).

The engine automatically provides all 4 presentation modes, all 12 practice games and all 4 production
modes for the new word list — in both RU and EN.

### Навигация по урокам

Все уроки живут в одном **выпадающем списке** в верхней строке каждой панели (подпись
«Выбрать номер урока:» / «Choose a lesson:»): строка кнопок перестала помещаться, как только
появился пятый урок. Список строится сам — движок собирает его из зарегистрированных уроков
(`SAL.registerLesson`) плюс отдельный урок 6 «Части тела (12)», у которого свой движок и панель
`view-lesson5`; сортировка по полю `num`. Новый урок появится в списке автоматически — уроки 6–9
не потребовали ни строчки в навигации.
Короткие подписи лежат в `NAV_LABELS` в `lesson-engine.js`; если подписи для ключа нет,
берётся «Урок N: <название>» из данных урока. Переход делает `SAL.gotoLesson(value)`:
`'lesson3'` переключает панель через `switchView`, остальные значения — через `SAL.openLesson`.
Панель урока 3 (12 слов) размечается в `index.html` пустым слотом `<span data-lesson-nav></span>`,
который заполняет `fillNavSlots()` — поэтому список один и тот же во всех девяти панелях и
переводится вместе с интерфейсом.

### Режим «2 ученика»: 👥 только там, где он есть

Из 31 игры Stage 2 второй ученик реализован в **одиннадцати**:

| № | Игра | Что делает режим двоих |
|---|---|---|
| 6 | Match Pairs | нашёл пару — очко и ход остаётся; промах — ход переходит |
| 7 | Классическое «Мемори» | то же правило, у каждого свой счёт |
| 16 | Снежный ком | цепочку называют по очереди, второй проверяет |
| 22 | Слепое поле | вопрос — одному, следующий — другому |
| 23 | Морской бой | очки на каждого, «Ход: 1/2» |
| 24 | Бинго | у каждого своя карта |
| 25 | Дуэль | два счёта, передача хода |
| 26 | Диктор и ученик | роли «показывает / называет» переходят |
| 27 | Эстафета порядка | очередь хода |
| 28 | Мемори вдвоём | ход и общий лимит ходов |
| 29 | Крестики-нолики | ✕ у одного, ◯ у другого, видно чей ход |

Остальные двадцать игр — соло. Для них переключатель **не показывается**:
вместо кнопок стоит подпись «👤 Эта игра — для одного ученика». Реестр парных
игр — `SAL.addDuoGame(key)` в `games-extra.js` и `SAL.duoGames()` в движке;
`renderPractice()` прячет `[data-players]` у соло-игр. `setPlayers` стирает
прогресс только у парной игры и только при реальной смене режима, поэтому
случайное нажатие в соло-игре больше не обнуляет счёт.

### «🙈 Скрыть подписи» — во всех режимах Presentation

Кнопка ставит класс `labels-hidden` на сетку Presentation. Раньше класс вешался
только на «4. Плакат», поэтому в «Пошагово», «Схеме» и «Сначала звук» кнопка
переключала состояние и меняла надпись, но на экране ничего не происходило.
Теперь режим не важен: подписи (`vocab-deva`, `vocab-iast`) размываются
`filter: blur(7px)` везде, включая рукописную страницу урока 5.
Дополнительно при скрытых подписях **сами списки слов перестают их выдавать**:
вкладки шагов («1. पीत · हरित») и кнопки-точки схемы («3. नारङ्ग») показывают
только номера, а заголовок шага становится «Шаг 2 из 6». Наведение курсора
больше не проявляет подпись — иначе проверка по карточкам теряла смысл.

### Клик всегда даёт отклик, но не двигает экран

Переключение игры или режима прокручивает страницу к своей сцене
(`ensureStageVisible`): вкладки бывают у нижнего края экрана, и без этого новая
игра появляется ниже видимой области. **Кнопки «↺ Начать сначала» страницу не
двигают вообще** — их нажимают на самой сцене, которая уже перед глазами, поэтому
restart только подсвечивает сцену зелёным кольцом. Рестарты режимов Production
(спринт, микрофон, «Что пропало?», спринт двух уроков) адресуются
`<key>-production-stage`, а не арене Practice; и они не трогают состояние
Practice — иначе после рестарта спринта арена молча переключалась на первую игру.
Это закреплено тестами с подменой раскладки и `scrollTo`.

### Спринт по двум урокам (урок 2)

Пятый режим Production есть только в уроке 2 «Лицо»: **«5. Спринт: тело + лицо ⏱ (13)»**.
Это тот же спринт на время, но не по семи словам урока, а по **всем 13 словам уроков 1 и 2** —
сначала 6 частей тела, потом 7 слов лица. На каждую картинку даётся **4, 3 или 2 секунды**:
ученик называет санскритское слово вслух, пока идёт отсчёт, и проверяет себя кнопками ✓ / ✕.
Переключатели: «1→2 по урокам» и «🔀 Вперемешку», длительность (4s / 3s / 2s) и вид картинки —
отдельная карточка или 🏹 стрелка на схеме. Схема берётся **своего урока**: для слов тела —
человек в полный рост, для слов лица — лицо крупным планом.

Подключается одной строкой в данных урока — движок сам собирает список слов в порядке уроков:

```js
unionSprint: ["L2", "L3"],   /* ключи уроков, чьи слова входят в спринт */
```

На финальном экране — счёт, общее время и секунд на слово; рекорд (забег без ошибок) лежит
в localStorage. Ошибка уходит в копилку ошибок **своего** урока: не названное `शीर्ष` попадёт
в копилку урока 1, а не урока 2. Уход на вкладку игры останавливает таймер — спринт не должен
вдруг заговорить, пока ученик занимается другим.

### Правила в каждой игре

Над любой игрой Practice — сворачиваемая панель **«ℹ Правила игры / How to play»**:
**Цель**, **Как играть** (нумерованные шаги), **Счёт и ошибки** (что именно начисляется и
куда попадают ошибки), для парных игр — **Вдвоём**, иногда — **Преподавателю**.
Правила для 12 общих игр лежат в реестре `RULES` в `lesson-engine.js`, правила 19 игр
6–11‑го уроков — в `RULES_EXTRA` в `games-extra.js` (регистрируются через `SAL.addRules`).
Панелью управляет действие `toggleRules`; урок 6 (12 слов) подключает её через
`SAL.rulesPanel(gameKey)`. Панель раскрыта по умолчанию, переводится вместе с интерфейсом
и не содержит цифр и слов, привязанных к конкретному уроку.

### Extra Practice Games (`games-extra.js`)
`games-extra.js` adds 19 further practice games (tabs 13–31) built on `SAL.addGame()`. A lesson opts in
by listing them in `extraGames`; the six numeral lessons 6–11 (1–5, 6–10, 11–15, 16–20, tens 10–50, tens 60–100) all do, so
the other lessons are untouched. A lesson may also bring its own `sortFeatures` (the yes/no questions for
game 20), otherwise `games-extra.js` falls back to its generic Devanagari features.

* **Solo (one student with a teacher):** 13 Hot Cards (streak, 3 lives) · 14 Mistake Pile · 15 Minimal
  Pairs by Ear · 16 Snowball · 17 Drip Reveal · 18 Build the Word · 19 Type It · 20 Sort into Boxes ·
  21 Flash Count · 22 Blind Board.
* **Pairs (two students, one device):** 23 Battleship on Coordinates · 24 Bingo · 25 Duel ·
  26 Describe & Guess · 27 Order Relay · 28 Co-op Memory · 29 Tic-Tac-Toe with a Quiz.
  In the numeral lessons the squares hold the words, so the four answer options show the *quantity*
  instead: one bead per unit up to five, an Arabic digit above that — the options never repeat the
  words written in the grid.
  Switch with the 👥 «2 ученика» toggle above the tabs; 🔑 reveals the answers for a student acting as teacher.
* **Grids:** 30 Word Grid 10 × 10 (find the lesson words among 100) · 31 Word Search (words hidden
  part by part in a 10 × 10 grid).

Every wrong answer in any game drops that word into a shared **mistake pile** (localStorage); game 14
drills the pile until each word has been answered right twice in a row.

### How to Publish on GitHub Pages
1. Open the repository on GitHub and go to **Settings** → **Pages** (in the left sidebar).
2. Under **Build and deployment**, set **Source** to `Deploy from a branch`, select branch `main` and folder `/ (root)`, and click **Save**.
3. Within 1–2 minutes, the live site is published at:  
   **`https://alexquantforge.github.io/sanskrit-in-action/`**

---

## Русский (RU)

### Короткое описание (для поля «About» в GitHub)

> Sanskrit in Action с Алексом Виджая — санскрит по-кембриджски: коммуникативный подход, task-based, CEFR A1–C2. 4 навыка × 5 систем, тексты на основе шастр, интерактивные игры.

### О проекте

**Sanskrit in Action с Алексом Виджая** — интерактивная образовательная платформа для изучения санскрита по современным стандартам преподавания языков **Cambridge (CELTA / Delta)**: коммуникативный подход, обучение через задачи (*Task-Based Learning*) и прозрачная шкала уровней **CEFR A1–C2**.

* **4 навыка (4 Skills)** — аудирование (*śravaṇam*), говорение (*bhāṣaṇam*), чтение (*paṭhanam*), письмо (*lekhanam*). Говорить начинаете с первого занятия; грамматика — инструмент общения, а не наоборот.
* **5 систем языка (5 Language Systems)** — CEFR-сетка, наполненная санскритом:
  1. **Pronunciation (Произношение)** — *varṇamālā* (гласные включая *ṛ / ḷ*, *anusvāra*, *visarga*, ретрофлексные *ṭ ḍ ṇ*), ведический акцент (*udātta–svarita*), *sandhi* как естественное звуковое соединение на границе слов.
  2. **Grammar (Грамматика)** — *vibhakti* (падежи), *lakāra* (время/аспект/наклонение), *samāsa* (составные слова), порядок предложения и роли *kāraka*.
  3. **Vocabulary (Лексика)** — тематические поля («выживательный санскрит»: семья, рынок, дорога) и *dhātu* (корни по Панини) как система словообразования.
  4. **Functions (Функции)** — приветствие, просьба, приглашение, обещание, рассказывание истории, аргументация в диспуте (*pūrvapakṣa → siddhānta*).
  5. **Discourse (Дискурс)** — связки (*ca, tu, eva, tatra, yathā… tathā, iti*), порядок идей, проза (*gadya*) и стих (*chandas*).
* **Основано на шастрах** — никакого искусственного «учебникового санскрита». Программа построена на аутентичных источниках: грамматика Панини как операционная система, «Панчатантра» и «Хитопадеша» для ступенчатого чтения, ведические гимны и «Бхагавадгита» по мере роста уровня.
* **Играем, а не зубрим** — интерактивные игры и тренажёры: конструктор сандхи, симулятор диалогов, кузница корней Панини и геймифицированные треки прокачки.

### Как опубликовать и открыть сайт на GitHub Pages
1. Перейдите в настройки репозитория на GitHub: **Settings** → в левом меню **Pages**.
2. В разделе **Build and deployment**:
   * **Source**: выберите `Deploy from a branch`.
   * **Branch**: выберите `main` и папку `/ (root)`, затем нажмите **Save**.
3. Через 1–2 минуты ваш сайт будет доступен по адресу:  
   **`https://alexquantforge.github.io/sanskrit-in-action/`**

---

*Note: CELTA® and Delta® are registered trademarks of Cambridge University Press & Assessment. This independent educational project is inspired by modern communicative language teaching and CEFR standards and is not affiliated with or endorsed by Cambridge University Press & Assessment.*

---

## Tests / Тесты

A jsdom harness walks all three lessons end to end — presentation modes, all 12
practice games, all 4 production modes — and locks in the details that mattered in
class (arrow direction, A/B/C/D option letters, memory-board coordinates,
second-try scoring, the exact mistake being explained).

Автотест на jsdom проходит все три урока целиком и проверяет мелочи, которые
важны в классе: направление стрелки, буквы A/B/C/D у вариантов, координаты
карточек в «Мемори», вторую попытку, показ конкретной ошибки.

```bash
npm init -y && npm install jsdom
node tests/regression.js      # ALL CHECKS PASSED
```
