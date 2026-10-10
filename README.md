# Sanskrit in Action

**Sanskrit, the Cambridge way.** A communicative, task-based course for learning Sanskrit, built on the methodology of Cambridge CELTA and DELTA and aligned with the CEFR levels A1–C2.

🌐 **Live site:** https://alexquantforge.github.io/sanskrit-in-action/

## What is this?

Most Sanskrit materials start with tables of declensions and end with a text you can barely read. This project works the other way round:

- **Communication first.** You start speaking in the first lesson. Grammar is a tool for doing things in Sanskrit, not the goal of the lesson.
- **Cambridge framework.** The course uses the same structure teachers know from CELTA and DELTA: four skills and five language systems, each described by "can-do" statements at every CEFR level.
- **Śāstra-based content.** Texts come from authentic sources: Pāṇini's grammar as the reference system, the Panchatantra and Hitopadeśa for graded reading, Vedic hymns and the Bhagavadgītā at higher levels.
- **Learning through play.** Interactive games and drills (a sandhi builder, a dialogue simulator, listening quests, skill tracks) turn practice into gameplay.

## Structure

### 4 skills

| Skill | What you do |
|---|---|
| Listening | Understand recorded dialogues, instructions and chanted texts |
| Speaking | Hold short conversations, role-plays and simple storytelling |
| Reading | Read graded texts, from simple sentences to śāstric prose and verse |
| Writing | Write short messages, descriptions and paragraphs in Devanāgarī |

### 5 language systems

| System | Sanskrit content |
|---|---|
| Pronunciation | Varṇamālā (including ṛ, ḷ, aṃ-anusvāra, visarga, retroflex consonants), Vedic accent, sandhi at word boundaries |
| Grammar | Vibhakti (case system), lakāra (tense, aspect, mood), samāsa (compounds), sentence structure |
| Vocabulary | Themed "survival" fields (family, market, travel…), dhātu (verb roots) as a word-building system |
| Functions | Greeting, requesting, inviting, promising, describing, telling a story |
| Discourse | Connectives (ca, tu, eva, tatra, yathā…), order of ideas, prose vs. chandas (verse) |

### Levels (CEFR)

Each level is the same 4 × 5 grid, filled with more demanding content.

- **A1: Survival Sanskrit.** Pronounce the varṇamālā, introduce yourself, ask for water, use the present tense of frequent verbs.
- **A2:** Sandhi in practice, the aorist, short connected dialogues.
- **B1:** Graded reading from the Hitopadeśa, retelling simple stories.
- **B2–C2:** Pāṇinian analysis, Vedic accent, verse (chandas), Bhagavadgītā.

## Project layout

```
sanskrit-in-action/
├── README.md      # this file
├── index.html     # welcome page (served by GitHub Pages)
└── .nojekyll      # tells GitHub Pages to serve files as-is
```

## Running locally

No build step is needed. Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000
```

then go to http://localhost:8000.

## Publishing on GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select your main branch and the `/ (root)` folder, then click **Save**.
4. After a minute or two the site is live at `https://<your-login>.github.io/sanskrit-in-action/`.

## Status

This is an early version. The welcome page describes the course. Lessons, games and audio are being added step by step.

## Contributing

Ideas, corrections to Sanskrit forms and suggestions for texts are welcome. Please open an issue or a pull request.

## Notes

CELTA and DELTA are trademarks of Cambridge University Press & Assessment. This project is an independent educational resource and is not affiliated with or endorsed by Cambridge.

## License

To be decided by the author.
