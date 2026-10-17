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
├── lesson-engine.js  # Generic PPP engine (Presentation / Practice / Production) for lessons 1, 2 and 4
├── lesson2.js        # Lesson 1 · शरीरावयवाः — body, 6 words: शीर्ष, उदर, हस्त, अङ्गुली, जानु, पाद
├── lesson3.js        # Lesson 2 · मुखसम्बन्धि-शब्दाः — face, 7 words: ललाट, नयन, नासिका, कर्ण, मुख, दन्त, जिह्वा
├── lesson1.js        # Lesson 3 · शरीरसम्बन्धि-शब्दाः — body + face, 12 words — standalone PPP lesson
├── lesson4.js        # Lesson 4 · सङ्ख्याः — 5 numerals, neuter nom.-acc.: एकम्, द्वे, त्रीणि, चत्वारि, पञ्च
├── .nojekyll         # Direct static asset serving on GitHub Pages
└── README.md         # Project documentation
```

### Adding a New Lesson
Lessons 2+ are **pure data** — no code changes are needed:

1. Create `lesson4.js` with a single `SAL.registerLesson({ ... })` call (copy `lesson2.js` as a template).
2. Add `<script src="lesson4.js?v=N"></script>` to `index.html` before `app.js`, plus an empty
   `<div id="view-lesson4" class="view-pane" style="display: none;" hidden></div>` next to the other lesson panes.
3. Register the pane in the `panes` / `buttons` maps inside `switchView()` in `app.js`.

The engine automatically provides all 4 presentation modes, all 12 practice games and all 4 production
modes for the new word list — in both RU and EN.

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
