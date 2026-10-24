// Sanskrit in Action — Interactive Application Logic (RU / EN Bilingual + CEFR + Mini-Games)

let currentLang = 'ru';
let currentLevel = 'A1';
let currentSandhiIndex = 0;
let currentDialogueStep = 0;
let selectedDhatu = 'kr';
let selectedPratyaya = 'lat';

// 1. CEFR A1-C2 Data across the 5 Cambridge Language Systems
const cefrLevelsData = {
  A1: {
    code: 'A1',
    tag: { ru: 'Survival Sanskrit', en: 'Survival Sanskrit' },
    title: {
      ru: 'A1 — Выживательный санскрит (Breakthrough)',
      en: 'A1 — Survival Sanskrit (Breakthrough)'
    },
    vocabBadge: { ru: '~300 слов · 6 тематических полей', en: '~300 words · 6 survival fields' },
    shastraBadge: { ru: 'Источник: Subhāṣita-минимумы и живые диалоги', en: 'Source: Short Subhāṣitas & Spoken Dialogues' },
    systems: {
      pronunciation: {
        ru: 'Правильно произношу все 36 базовых звуков varṇamālā (включая ретрофлексные ṭ, ḍ, ṇ и придыхательные kh, gh), различаю долготу гласных (a/ā, i/ī) и читаю вслух на деванагари.',
        en: 'Accurately pronounce all 36 core sounds of the varṇamālā (including retroflex ṭ, ḍ, ṇ and aspirates), distinguish vowel length (a/ā, i/ī), and read Devanāgarī aloud.'
      },
      vocabulary: {
        ru: 'Около 300 слов из 6 полей выживания: приветствие, семья, еда и вода, дом/ашрам, движение и базовые числа.',
        en: '~300 words across 6 survival fields: greetings, family, food & water, home/ashram, movement, and core numbers.'
      },
      functions: {
        ru: 'Могу представиться (mama nāma…), поприветствовать, попросить воду или помощь, поблагодарить, задать простые вопросы (kim, kutra, katham).',
        en: 'Can introduce myself (mama nāma…), greet, ask for water or help, thank someone, and ask simple questions (kim, kutra, katham).'
      },
      grammar: {
        ru: 'Именительный (prathamā) и винительный (dvitīyā) падежи, родительный принадлежности (ṣaṣṭhī); настоящее время (laṭ lakāra) для 10 частых глаголов.',
        en: 'Nominative (prathamā), accusative (dvitīyā), and possessive genitive (ṣaṣṭhī); present tense (laṭ lakāra) of 10 high-frequency verbs.'
      },
      discourse: {
        ru: 'Связываю 3–4 простых предложения в мини-рассказ о себе с помощью базовых коннекторов ca (и), tu (но/же), api (также) и vā (или).',
        en: 'Link 3–4 simple sentences into a short personal introduction using core connectives ca (and), tu (but), api (also), and vā (or).'
      }
    },
    sample: {
      deva: 'नमस्ते! मम नाम मित्रः। अहं संस्कृतं पठामि, जलं च पिबामि।',
      iast: 'Namaste! Mama nāma Mitraḥ. Ahaṃ saṃskṛtaṃ paṭhāmi, jalaṃ ca pibāmi.',
      trans: {
        ru: '«Здравствуйте! Меня зовут Митра. Я изучаю санскрит и пью воду.» (Функция: знакомство + действие в настоящем времени со связкой ca).',
        en: '“Hello! My name is Mitra. I study Sanskrit and drink water.” (Function: self-introduction + present action linked with ca).'
      }
    }
  },
  A2: {
    code: 'A2',
    tag: { ru: 'Everyday Saṃvāda', en: 'Everyday Saṃvāda' },
    title: {
      ru: 'A2 — Повседневный диалог (Waystage)',
      en: 'A2 — Everyday Saṃvāda (Waystage)'
    },
    vocabBadge: { ru: '~650 слов · 25 корней dhātu', en: '~650 words · 25 dhātu roots' },
    shastraBadge: { ru: 'Источник: Адаптированная «Панчатантра»', en: 'Source: Graded Pañcatantra Tales' },
    systems: {
      pronunciation: {
        ru: 'Применяю базовые гласные сандхи (savarṇa-dīrgha, guṇa) и переход -m → anusvāra в беглой устной речи без потери темпа.',
        en: 'Apply core vowel sandhi (savarṇa-dīrgha, guṇa) and -m → anusvāra transitions naturally in connected speech.'
      },
      vocabulary: {
        ru: '650+ слов: путешествие, природа, время суток, эмоции, учёба; 25 продуктивных глагольных корней Панини (dhātu) с приставками (upasarga).',
        en: '650+ words: travel, nature, daily routine, emotions, study; 25 productive Pāṇinian verbal roots (dhātu) with prefixes (upasarga).'
      },
      functions: {
        ru: 'Могу дать совет и инструкцию (loṭ lakāra), описать маршрут, договориться о встрече, рассказать о событиях вчерашнего дня и планах на завтра.',
        en: 'Can give directions and advice (loṭ lakāra), arrange a meeting, recount yesterday’s events, and state plans for tomorrow.'
      },
      grammar: {
        ru: 'Все 8 падежей (vibhakti) для основ на -a/-ā/-i; повелительное наклонение (loṭ), будущее (lṛṭ), прошедшее (laṅ) и деепричастия на -tvā / -ya.',
        en: 'All 8 cases (vibhakti) for -a/-ā/-i stems; imperative (loṭ), future (lṛṭ), imperfect past (laṅ), and gerunds (-tvā / -ya).'
      },
      discourse: {
        ru: 'Строю последовательное повествование («сначала…, затем…») через цепочки деепричастий (ktvā) и прямую речь с маркером iti.',
        en: 'Build sequential narratives (“having done X, then Y…”) using gerund chains (ktvā) and mark direct speech with iti.'
      }
    },
    sample: {
      deva: 'प्रातः उत्थाय जलं पीत्वा अहं गुरुकुलं गच्छामि। त्वं कुत्र गच्छसि?',
      iast: 'Prātaḥ utthāya jalaṃ pītvā ahaṃ gurukulaṃ gacchāmi. Tvaṃ kutra gacchasi?',
      trans: {
        ru: '«Утром встав и выпив воды, я иду в гурукулу. А ты куда идёшь?» (Цепочка действий через -ya / -tvā + вопрос собеседнику).',
        en: '“Having risen in the morning and drunk water, I go to the gurukula. Where are you going?” (Action chain via -ya / -tvā + question).'
      }
    }
  },
  B1: {
    code: 'B1',
    tag: { ru: 'Narrative & Fables', en: 'Narrative & Fables' },
    title: {
      ru: 'B1 — Живое повествование и притчи (Threshold)',
      en: 'B1 — Narrative & Fables (Threshold)'
    },
    vocabBadge: { ru: '~1 400 слов · 60 корней dhātu', en: '~1,400 words · 60 dhātu roots' },
    shastraBadge: { ru: 'Источник: Hitopadeśa & Pañcatantra (оригинал)', en: 'Source: Original Hitopadeśa & Pañcatantra' },
    systems: {
      pronunciation: {
        ru: 'Свободно разбираю и озвучиваю согласные и висарга-сандхи на стыке слов; читаю шлоки в размере anuṣṭubh с правильной цезурой (yati).',
        en: 'Decode and articulate consonant and visarga sandhi across word boundaries; chant anuṣṭubh ślokas with proper caesura (yati).'
      },
      vocabulary: {
        ru: 'Лексика этики (nīti), дружбы, политики, природы и человеческих характеров; образование причастий (kta, ktavatu, śatṛ, śānac).',
        en: 'Lexis of ethics (nīti), statecraft, friendship, and character traits; productive use of participles (kta, ktavatu, śatṛ, śānac).'
      },
      functions: {
        ru: 'Могу пересказать притчу, сформулировать мораль, выразить условие («если…, то…»), сравнить два мнения и аргументировать выбор.',
        en: 'Can retell a fable, state a moral lesson, express hypothetical conditions (“if… then…”), compare viewpoints, and justify choices.'
      },
      grammar: {
        ru: 'Желательное наклонение (vidhiliṅ), страдательный залог (karmaṇi prayoga), основные типы сложных слов (tatpuruṣa, dvandva, karmadhāraya).',
        en: 'Optative mood (vidhiliṅ), passive voice (karmaṇi prayoga), and core compound types (tatpuruṣa, dvandva, karmadhāraya).'
      },
      discourse: {
        ru: 'Использую коррелятивные конструкции yadā… tadā (когда… тогда), yadi… tarhi (если… то), yathā… tathā для логической связности абзаца.',
        en: 'Use relative-correlative structures yadā… tadā, yadi… tarhi, and yathā… tathā to build cohesive multi-sentence arguments.'
      }
    },
    sample: {
      deva: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः। न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः॥',
      iast: 'Udyamena hi sidhyanti kāryāṇi na manorathaiḥ | Na hi suptasya siṃhasya praviśanti mukhe mṛgāḥ ||',
      trans: {
        ru: '«Ведь дела вершатся усилием, а не одними мечтами: в пасть спящего льва олени сами не входят.» (Хитопадеша — аргументация через пример).',
        en: '“Deeds succeed through effort, not mere wishes; deer do not walk into the mouth of a sleeping lion.” (Hitopadeśa — moral argumentation).'
      }
    }
  },
  B2: {
    code: 'B2',
    tag: { ru: 'Śāstra & Debate', en: 'Śāstra & Debate' },
    title: {
      ru: 'B2 — Философский диалог и шастры (Vantage)',
      en: 'B2 — Śāstra & Structured Debate (Vantage)'
    },
    vocabBadge: { ru: '~2 800 слов · 120 корней dhātu', en: '~2,800 words · 120 dhātu roots' },
    shastraBadge: { ru: 'Источник: Bhagavadgītā & Subhāṣita-ratna-bhāṇḍāgāra', en: 'Source: Bhagavadgītā & Classical Subhāṣitas' },
    systems: {
      pronunciation: {
        ru: 'Владею классическими размерами (indravajrā, upajāti, vasantatilakā), интонацией вопроса, возражения и логического ударения в диспуте.',
        en: 'Master classical meters (indravajrā, upajāti, vasantatilakā) and prosodic intonation for inquiry, objection, and logical emphasis.'
      },
      vocabulary: {
        ru: 'Терминология философии (darśana), психологии, йоги и этики; вторичные производные (taddhita) и абстрактные существительные на -tva / -tā.',
        en: 'Terminology of philosophy (darśana), psychology, yoga, and ethics; secondary derivatives (taddhita) and abstract nouns in -tva / -tā.'
      },
      functions: {
        ru: 'Могу вести дискуссию по канону vāda: сформулировать позицию оппонента (pūrvapakṣa), указать на противоречие и защитить тезис (siddhānta).',
        en: 'Conduct structured debate (vāda): summarize an opponent’s view (pūrvapakṣa), point out a flaw, and establish a thesis (siddhānta).'
      },
      grammar: {
        ru: 'Бахуврихи-композиты (bahuvrīhi), абсолютный местный и родительный падежи (sat-saptamī), каузатив (ṇijanta) и перфект (liṭ lakāra).',
        en: 'Exocentric compounds (bahuvrīhi), locative/genitive absolute (sat-saptamī), causatives (ṇijanta), and perfect tense (liṭ lakāra).'
      },
      discourse: {
        ru: 'Свободно переключаюсь между поэтической строфой (śloka) и её прозаическим порядком слов (anvaya), используя маркеры nanu, cet, tasmāt, ataḥ.',
        en: 'Move fluidly between verse (śloka) and prose word-order (anvaya), deploying logical connectors nanu, cet, tasmāt, and ataḥ.'
      }
    },
    sample: {
      deva: 'ननु सुखं दुःखं च नित्यं परस्परं सम्बद्धे स्तः; तस्मात् समत्वं योग उच्यते।',
      iast: 'Nanu sukhaṃ duḥkhaṃ ca nityaṃ parasparaṃ sambaddhe staḥ; tasmāt samatvaṃ yoga ucyate.',
      trans: {
        ru: '«Воистину, радость и печаль всегда связаны друг с другом; поэтому уравновешенность зовётся йогой.» (Дискурсивные маркеры nanu… tasmāt).',
        en: '“Indeed, pleasure and pain are ever linked; therefore equanimity is called yoga.” (Philosophical discourse with nanu… tasmāt).'
      }
    }
  },
  C1: {
    code: 'C1',
    tag: { ru: 'Pāṇini & Kāvya', en: 'Pāṇini & Kāvya' },
    title: {
      ru: 'C1 — Система Панини и классическая поэзия (Effective Operational Proficiency)',
      en: 'C1 — Pāṇinian System & Classical Kāvya'
    },
    vocabBadge: { ru: '~5 000+ слов · Aṣṭādhyāyī OS', en: '~5,000+ words · Aṣṭādhyāyī OS' },
    shastraBadge: { ru: 'Источник: Kālidāsa, Laghusiddhāntakaumudī', en: 'Source: Kālidāsa & Laghusiddhāntakaumudī' },
    systems: {
      pronunciation: {
        ru: 'Безупречная рецитация сложных лирических размеров (mandākrāntā, śārdūlavikrīḍita) и фонетический анализ пратьяхар (pratyāhāra) Панини.',
        en: 'Fluent recitation of complex classical meters (mandākrāntā, śārdūlavikrīḍita) and phonetic mastery of Pāṇinian pratyāhāras.'
      },
      vocabulary: {
        ru: 'Поэтическая синонимика (Amarakośa), многозначные слова (śleṣa), редкие kṛdanta-формы и технический метаязык сутр Панини.',
        en: 'Poetic synonymy (Amarakośa), double-entendre (śleṣa), advanced kṛdanta derivatives, and Pāṇini’s metalinguistic terminology.'
      },
      functions: {
        ru: 'Могу комментировать классический текст на самом санскрите (ṭīkā-стиль), объяснять этимологию слова через dhātu + pratyaya и писать стихи.',
        en: 'Compose Sanskrit-medium commentary (ṭīkā style) on classical verse, derive words via dhātu + pratyaya, and write original metered verse.'
      },
      grammar: {
        ru: 'Дезидератив (sannanta), интенсив (yaṅanta), аорист (luṅ lakāra), многочленные композиты классической прозы и правила kāraka по Панини.',
        en: 'Desiderative (sannanta), intensive (yaṅanta), aorist (luṅ lakāra), multi-member compounds, and Pāṇini’s kāraka syntax.'
      },
      discourse: {
        ru: 'Владею приёмами классической риторики (alaṅkāra), структурой комментария (vigraha-vākya) и устной импровизацией.',
        en: 'Command figures of speech (alaṅkāra), compound-dissolution commentary (vigraha-vākya), and spontaneous oral exposition.'
      }
    },
    sample: {
      deva: 'वागर्थाविव सम्पृक्तौ वागर्थप्रतिपत्तये। जगतः पितरौ वन्दे पार्वतीपरमेश्वरौ॥',
      iast: 'Vāgarthāv iva sampṛktau vāgarthapratipattaye | Jagataḥ pitarau vande pārvatīparameśvarau ||',
      trans: {
        ru: '«Неразлучных, словно слово и смысл, ради постижения слова и смысла — родителей мира чту я, Парвати и Парамешвару.» (Калидаса, Рагхувамша 1.1).',
        en: '“Inseparable as word and meaning, for the true grasp of word and meaning, I bow to the parents of the world, Pārvatī and Parameśvara.” (Kālidāsa, Raghuvaṃśa 1.1).'
      }
    }
  },
  C2: {
    code: 'C2',
    tag: { ru: 'Bhāṣya & Veda', en: 'Bhāṣya & Veda' },
    title: {
      ru: 'C2 — Мастерство шастр, бхашьи и ведической традиции (Mastery)',
      en: 'C2 — Mastery of Bhāṣya, Darśana & Vedic Tradition'
    },
    vocabBadge: { ru: 'Свободный корпус · Веды и Бхашьи', en: 'Unrestricted Corpus · Veda & Bhāṣya' },
    shastraBadge: { ru: 'Источник: Mahābhāṣya, Upaniṣad-bhāṣya, Ṛgveda', en: 'Source: Mahābhāṣya, Upaniṣad-bhāṣya, Ṛgveda' },
    systems: {
      pronunciation: {
        ru: 'Владею тройным ведическим музыкальным ударением (udātta, anudātta, svarita) и тонкостями пратишакхьи при чтении ведических гимнов.',
        en: 'Master the three-tone Vedic pitch accent (udātta, anudātta, svarita) and phonetic rules of the Prātiśākhyas in Vedic recitation.'
      },
      vocabulary: {
        ru: 'Полный спектр эпистемологии (pramāṇa-śāstra), грамматической философии (Патанджали, Бхартрихари), ведической архаики и научного санскрита.',
        en: 'Full command of epistemological (pramāṇa), grammatical-philosophical (Patañjali, Bhartṛhari), and Vedic archaic vocabulary.'
      },
      functions: {
        ru: 'Могу вести полноценный академический диспут (śāstrārtha), преподавать сложные дисциплины на санскрите и читать неадаптированные рукописи.',
        en: 'Lead full scholarly disputations (śāstrārtha), teach complex subjects through Sanskrit medium, and read unedited commentaries.'
      },
      grammar: {
        ru: 'Ведические формы глагола и инфинитива (tumun-варианты -tave, -adhyai), тонкие парибхаши (метаправила) «Аштадхьяи» и синтаксис «Махабхашьи».',
        en: 'Vedic modal and infinitival formations (-tave, -adhyai), subtle metarules (paribhāṣā) of the Aṣṭādhyāyī, and Mahābhāṣya dialectics.'
      },
      discourse: {
        ru: 'Строю многоступенчатые комментарии (bhāṣya) с цепочками вопросов и ответов, сочетая предельную точность формулировки (lāghava) и ясность.',
        en: 'Construct multi-layered scholastic commentaries (bhāṣya) balancing Pāṇinian economy of expression (lāghava) with rhetorical precision.'
      }
    },
    sample: {
      deva: 'एकः शब्दः सम्यग्ज्ञातः सुष्ठु प्रयुक्तः स्वर्गे लोके कामधुग्भवति।',
      iast: 'Ekaḥ śabdaḥ samyag jñātaḥ suṣṭhu prayuktaḥ svarge loke kāmadhug bhavati.',
      trans: {
        ru: '«Одно-единственное слово, глубоко познанное и безупречно применённое в речи, исполняет все желания в высшем мире и на земле.» (Патанджали, Махабхашья).',
        en: '“Even a single word, thoroughly understood and skillfully used in communication, fulfills all wishes.” (Patañjali’s Mahābhāṣya).'
      }
    }
  }
};

// 2. Hero First-30-Seconds Task Options
const heroTaskData = [
  {
    deva: 'नमस्ते! मम नाम अलेक्सः। कृपया मह्यं जलं यच्छतु।',
    iast: 'Namaste! Mama nāma Aleksaḥ. Kṛpayā mahyaṃ jalaṃ yacchatu.',
    sub: {
      ru: 'Здравствуйте! Меня зовут Алекс. Пожалуйста, дайте мне воды.',
      en: 'Hello! My name is Alex. Please give me water.'
    },
    feedback: {
      ru: 'Отлично! Вы только что выполнили коммуникативную задачу A1: представились и вежливо попросили воды. Обратите внимание на метод CELTA (MPF):',
      en: 'Spot on! You just completed an A1 communicative task: introduced yourself and politely asked for water. Notice the CELTA MPF breakdown:'
    },
    meaning: {
      ru: 'Приветствие + имя + вежливая просьба',
      en: 'Greeting + Name + Polite Request'
    },
    pronun: {
      ru: 'Ударение на долгих ā; -ṃ перед j звучит мягко',
      en: 'Long ā rhythm; anusvāra before j'
    },
    form: {
      ru: 'mahyam (Дат. п. «мне») + jalam (Вин. п.) + yacchatu (Императив)',
      en: 'mahyam (Dat. "to me") + jalam (Acc.) + yacchatu (Imperative)'
    },
    correct: true
  },
  {
    deva: 'स्वागतम्! अहं संस्कृतेन वदामि। जलं कुत्र अस्ति?',
    iast: 'Svāgatam! Ahaṃ saṃskṛtena vadāmi. Jalaṃ kutra asti?',
    sub: {
      ru: 'Добро пожаловать! Я говорю на санскрите. Где находится вода?',
      en: 'Welcome! I speak in Sanskrit. Where is the water?'
    },
    feedback: {
      ru: 'Прекрасный живой ответ! Вместо прямой просьбы вы задали уточняющий вопрос (функция запроса информации A1):',
      en: 'Great communicative choice! Instead of a direct request, you asked an information question (A1 Inquiry Function):'
    },
    meaning: {
      ru: 'Утверждение о языке + вопрос о месте',
      en: 'Language statement + Location inquiry'
    },
    pronun: {
      ru: 'Чёткое сочетание -skṛ- и слитное чтение kutra asti',
      en: 'Crisp -skṛ- cluster; smooth transition in kutra asti'
    },
    form: {
      ru: 'saṃskṛtena (Твор. п. «на санскрите») + kutra (вопрос «где?»)',
      en: 'saṃskṛtena (Inst. "in Sanskrit") + kutra (locative interrogative)'
    },
    correct: true
  }
];

// 3. Sandhi Builder Presets (Game 1)
const sandhiPresets = [
  {
    left: 'देव',
    right: 'आलयः',
    leftIast: 'deva',
    rightIast: 'ālayaḥ',
    result: 'देवालयः',
    resultIast: 'devālayaḥ',
    sutra: 'अकः सवर्णे दीर्घः (Pāṇini 6.1.101)',
    ruleName: { ru: 'Savarṇa-dīrgha (Слияние однородных гласных)', en: 'Savarṇa-dīrgha · Homorganic Vowel Lengthening' },
    explanation: {
      ru: 'Краткий «a» на конце слова deva («божество») + долгий «ā» в начале ālayaḥ («обитель») сливаются в один долгий звук «ā» → devālayaḥ («храм»). В живой речи это убирает паузу между словами.',
      en: 'Short “a” at the end of deva (“deity”) + long “ā” at the start of ālayaḥ (“abode”) merge into a single long “ā” → devālayaḥ (“temple”). In speech, this creates smooth vocalic flow.'
    }
  },
  {
    left: 'सूर्य',
    right: 'उदयः',
    leftIast: 'sūrya',
    rightIast: 'udayaḥ',
    result: 'सूर्योदयः',
    resultIast: 'sūryodayaḥ',
    sutra: 'आद्गुणः (Pāṇini 6.1.87)',
    ruleName: { ru: 'Guṇa Sandhi (Ступень гуна: a + u → o)', en: 'Guṇa Sandhi · Vowel Blending (a + u → o)' },
    explanation: {
      ru: 'Звук «a» (открытый) + «u» (губной) встречаются на границе слов и дают промежуточный гласный «o» → sūryodayaḥ («восход солнца»). Чистая акустическая физика голоса!',
      en: 'Open vowel “a” + rounded vowel “u” meet at the word boundary and blend into the mid-vowel “o” → sūryodayaḥ (“sunrise”). Pure articulatory phonetics in action!'
    }
  },
  {
    left: 'इति',
    right: 'उवाच',
    leftIast: 'iti',
    rightIast: 'uvāca',
    result: 'इत्युवाच',
    resultIast: 'ityuvāca',
    sutra: 'इको यणचि (Pāṇini 6.1.77)',
    ruleName: { ru: 'Yaṇ Sandhi (Переход гласного в полугласный: i → y)', en: 'Yaṇ Sandhi · Semivowel Glide (i → y)' },
    explanation: {
      ru: 'Перед другим гласным («u») конечный звук «i» в слове iti («так») мгновенно превращается в скользящий «y» → ityuvāca («так сказал»). Встречается на каждой странице шастр.',
      en: 'Before a dissimilar vowel (“u”), final “i” in iti (“thus”) glides into the semivowel “y” → ityuvāca (“thus spoke”). Seen on every page of classical narratives.'
    }
  },
  {
    left: 'नमः',
    right: 'ते',
    leftIast: 'namaḥ',
    rightIast: 'te',
    result: 'नमस्ते',
    resultIast: 'namaste',
    sutra: 'विसर्जनीयस्य सः (Pāṇini 8.3.34)',
    ruleName: { ru: 'Visarga Sandhi (Переход придыхания ḥ → s перед t)', en: 'Visarga Sandhi · Sibilant Transition (ḥ → s before t)' },
    explanation: {
      ru: 'Знакомое всем приветствие «Намасте» — это на самом деле сандхи двух слов: namaḥ («поклон/почтение») + te («тебе», дательный падеж). Перед зубным «t» висарга звучит как «s»!',
      en: 'The world-famous greeting “Namaste” is actually two words joined by sandhi: namaḥ (“salutation”) + te (“to you”, dative). Before dental “t”, visarga becomes “s”!'
    }
  },
  {
    left: 'तत्',
    right: 'च',
    leftIast: 'tat',
    rightIast: 'ca',
    result: 'तच्च',
    resultIast: 'tacca',
    sutra: 'स्तोः श्चुना श्चुः (Pāṇini 8.4.40)',
    ruleName: { ru: 'Ścutva Sandhi (Палатализация согласного: t + c → cc)', en: 'Ścutva Sandhi · Palatal Assimilation (t + c → cc)' },
    explanation: {
      ru: 'Зубной «t» в слове tat («то») подстраивается под нёбный «c» в союзе ca («и»), превращаясь в двойной «cc» → tacca («и то»). Язык заранее занимает позицию для следующего звука.',
      en: 'Dental “t” in tat (“that”) assimilates to the point of articulation of palatal “c” in ca (“and”), yielding tacca (“and that”). Effortless articulatory economy.'
    }
  }
];

// 4. Samvada Simulator (Game 2 — Task-Based Dialogue)
const dialogueSteps = [
  {
    stepBadge: { ru: 'Шаг 1 из 3 · Прибытие в гурукулу (Функция: Приветствие и представление)', en: 'Step 1 of 3 · Arriving at the Gurukula · Greeting & Intro' },
    npcSpeaker: { ru: 'Ачарья (Учитель):', en: 'Ācārya · Teacher:' },
    npcDeva: 'हरिः ओम्! अत्र आश्रमे स्वागतम्। भवान् कः अस्ति? कुतः आगच्छति?',
    npcIast: 'Hariḥ Om! Atra āśrame svāgatam. Bhavān kaḥ asti? Kutaḥ āgacchati?',
    npcTrans: {
      ru: '«Хари Ом! Добро пожаловать в этот ашрам. Кто вы и откуда приходите?»',
      en: '“Hari Om! Welcome to this ashram. Who are you, and where do you come from?”'
    },
    options: [
      {
        deva: 'प्रणामः आचार्य! अहं पथिकः अस्मि, नगरात् आगच्छामि।',
        iast: 'Praṇāmaḥ ācārya! Ahaṃ pathikaḥ asmi, nagarāt āgacchāmi.',
        trans: { ru: 'Поклон, учитель! Я путник, прихожу из города.', en: 'Salutations, teacher! I am a traveler, I come from the city.' },
        isBest: true,
        feedback: {
          ru: 'Точное попадание в регистр (Appropriacy)! Вы использовали уважительное обращение и отложительный падеж (nagarāt — «из города») в ответ на вопрос kutaḥ («откуда»).',
          en: 'Perfect register and appropriacy! You used a respectful greeting and the ablative case (nagarāt — “from the city”) matching the question kutaḥ (“from where”).'
        }
      },
      {
        deva: 'अहं जलं पिबामि। श्वः गमिष्यामि।',
        iast: 'Ahaṃ jalaṃ pibāmi. Śvaḥ gamiṣyāmi.',
        trans: { ru: 'Я пью воду. Завтра пойду.', en: 'I drink water. Tomorrow I will go.' },
        isBest: false,
        feedback: {
          ru: 'Грамматически фраза верна, но коммуникативная задача не решена: учитель спросил, кто вы и откуда (kaḥ / kutaḥ). Попробуйте первый вариант!',
          en: 'Grammatically valid, but it misses the communicative function: the teacher asked who you are and where you come from (kaḥ / kutaḥ). Try the other option!'
        }
      }
    ]
  },
  {
    stepBadge: { ru: 'Шаг 2 из 3 · Выражение цели визита (Функция: Запрос и намерение)', en: 'Step 2 of 3 · Stating Your Purpose · Request & Intention' },
    npcSpeaker: { ru: 'Ачарья (Учитель):', en: 'Ācārya · Teacher:' },
    npcDeva: 'शोभनम्! उपविशतु। किमर्थं भवान् अत्र आगतवान्?',
    npcIast: 'Śobhanam! Upaviśatu. Kimarthaṃ bhavān atra āgatavān?',
    npcTrans: {
      ru: '«Прекрасно! Присаживайтесь. С какой целью вы прибыли сюда?»',
      en: '“Wonderful! Please sit down. For what purpose have you come here?”'
    },
    options: [
      {
        deva: 'अहं संस्कृतसम्भाषणं पाणिनीयव्याकरणं च पठितुम् इच्छामि।',
        iast: 'Ahaṃ saṃskṛtasambhāṣaṇaṃ pāṇinīyavyākaraṇaṃ ca paṭhitum icchāmi.',
        trans: { ru: 'Я хочу изучать разговорный санскрит и грамматику Панини.', en: 'I wish to study spoken Sanskrit and Pāṇinian grammar.' },
        isBest: true,
        feedback: {
          ru: 'Блестяще! На вопрос kimartham («зачем/с какой целью?») идеально отвечает инфинитив цели paṭhitum («чтобы изучать») в связке с глаголом желания icchāmi.',
          en: 'Brilliant! The question kimartham (“for what purpose?”) is naturally answered with the tumun infinitive paṭhitum (“to study”) + icchāmi (“I wish”).'
        }
      },
      {
        deva: 'वृक्षे खगाः कूजन्ति। सूर्यः तपति।',
        iast: 'Vṛkṣe khagāḥ kūjanti. Sūryaḥ tapati.',
        trans: { ru: 'На дереве поют птицы. Солнце светит.', en: 'Birds sing in the tree. The sun shines.' },
        isBest: false,
        feedback: {
          ru: 'Красивое поэтическое наблюдение, но оно не отвечает на вопрос о цели визита (kimartham). Выберите ответ с инфинитивом цели paṭhitum!',
          en: 'A lovely poetic observation, but it does not answer the question of purpose (kimartham). Choose the response using the infinitive of purpose paṭhitum!'
        }
      }
    ]
  },
  {
    stepBadge: { ru: 'Шаг 3 из 3 · Начало практики (Функция: Согласие и обязательство)', en: 'Step 3 of 3 · Starting Practice · Agreement & Commitment' },
    npcSpeaker: { ru: 'Ачарья (Учитель):', en: 'Ācārya · Teacher:' },
    npcDeva: 'उत्तमम्! अद्य आरभ्य वयं प्रतिदिनं संस्कृतेन एव संवदामः। सज्जः वा?',
    npcIast: 'Uttamam! Adya ārabhya vayaṃ pratidinaṃ saṃskṛtena eva saṃvadāmaḥ. Sajjaḥ vā?',
    npcTrans: {
      ru: '«Отлично! Начиная с сегодняшнего дня мы каждый день общаемся именно на санскрите. Готовы?»',
      en: '“Excellent! Starting today, we converse every day in Sanskrit itself. Are you ready?”'
    },
    options: [
      {
        deva: 'आम्, अहं सज्जः अस्मि! अद्यैव आरभामहे। धन्यवादाः!',
        iast: 'Ām, ahaṃ sajjaḥ asmi! Adyaiva ārabhāmahe. Dhanyavādāḥ!',
        trans: { ru: 'Да, я готов! Начнём же прямо сегодня. Благодарю!', en: 'Yes, I am ready! Let us begin right today. Thank you!' },
        isBest: true,
        feedback: {
          ru: 'Миссия выполнена! Вы использовали усилительное сандхи adya + eva → adyaiva («прямо сегодня») и пригласительную форму 1-го лица мн. ч. ārabhāmahe («давайте начнём»).',
          en: 'Mission accomplished! You used emphatic sandhi adya + eva → adyaiva (“right today”) and the 1st-person plural cohortative ārabhāmahe (“let us begin”).'
        }
      },
      {
        deva: 'न जानामि, अहं निद्रां करोमि।',
        iast: 'Na jānāmi, ahaṃ nidrāṃ karomi.',
        trans: { ru: 'Не знаю, я ложусь спать.', en: 'I do not know, I am going to sleep.' },
        isBest: false,
        feedback: {
          ru: 'Забавный ответ, но для успешного старта обучения в гурукуле лучше согласиться и сказать «Ахaм саджджах асми!» (Я готов!).',
          en: 'Funny answer, but to kick off your learning at the gurukula, try agreeing with “Ahaṃ sajjaḥ asmi!” (I am ready!).'
        }
      }
    ]
  }
];

// 5. Panini's Dhatu Forge Data (Game 3)
const dhatuForgeData = {
  kr: {
    rootDeva: '√कृ',
    rootIast: '√kṛ',
    meaning: { ru: 'делать, творить', en: 'to do, make, create' },
    forms: {
      lat: {
        wordDeva: 'करोति',
        wordIast: 'karoti',
        type: { ru: 'laṭ lakāra (наст. время, 3 л. ед. ч.)', en: 'laṭ lakāra · Present 3rd sg.' },
        wordMeaning: { ru: 'делает / создаёт', en: 'does / makes' },
        sentenceDeva: 'शिष्यः अभ्यासं करोति। (Śiṣyaḥ abhyāsaṃ karoti)',
        sentenceTrans: { ru: 'Ученик выполняет практику.', en: 'The student performs practice.' }
      },
      ktva: {
        wordDeva: 'कृत्वा',
        wordIast: 'kṛtvā',
        type: { ru: 'ktvā pratyaya (деепричастие сов. вида)', en: 'ktvā pratyaya · Gerund' },
        wordMeaning: { ru: 'сделав', en: 'having done' },
        sentenceDeva: 'कार्यं कृत्वा सः विश्राम्यति। (Kāryaṃ kṛtvā saḥ viśrāmyati)',
        sentenceTrans: { ru: 'Сделав дело, он отдыхает.', en: 'Having done the work, he rests.' }
      },
      tavya: {
        wordDeva: 'कर्तव्यम्',
        wordIast: 'kartavyam',
        type: { ru: 'tavya pratyaya (герундий долженствования)', en: 'tavya pratyaya · Gerundive' },
        wordMeaning: { ru: 'то, что должно сделать / долг', en: 'what ought to be done / duty' },
        sentenceDeva: 'सत्यं वचनं कर्तव्यम्। (Satyaṃ vacanaṃ kartavyam)',
        sentenceTrans: { ru: 'Следует говорить правду.', en: 'Truthful speech ought to be practiced.' }
      },
      tr: {
        wordDeva: 'कर्तृ (कर्ता)',
        wordIast: 'kartṛ (kartā)',
        type: { ru: 'tṛc pratyaya (имя деятеля)', en: 'tṛc pratyaya · Agent noun' },
        wordMeaning: { ru: 'деятель, творец, субъект действия', en: 'doer, maker, grammatical agent' },
        sentenceDeva: 'स्वतन्त्रः कर्ता। (Svatantraḥ kartā — Pāṇini 1.4.54)',
        sentenceTrans: { ru: 'Деятель (kartā) — тот, кто независим в действии.', en: 'The agent (kartā) is the independent initiator of action.' }
      }
    }
  },
  gam: {
    rootDeva: '√गम्',
    rootIast: '√gam',
    meaning: { ru: 'идти, двигаться, достигать', en: 'to go, move, reach' },
    forms: {
      lat: {
        wordDeva: 'गच्छति',
        wordIast: 'gacchati',
        type: { ru: 'laṭ lakāra (наст. время, 3 л. ед. ч.)', en: 'laṭ lakāra · Present 3rd sg.' },
        wordMeaning: { ru: 'идёт / направляется', en: 'goes / moves' },
        sentenceDeva: 'मित्रं आपणं गच्छति। (Mitraṃ āpaṇaṃ gacchati)',
        sentenceTrans: { ru: 'Друг идёт на рынок.', en: 'The friend goes to the market.' }
      },
      ktva: {
        wordDeva: 'गत्वा',
        wordIast: 'gatvā',
        type: { ru: 'ktvā pratyaya (деепричастие сов. вида)', en: 'ktvā pratyaya · Gerund' },
        wordMeaning: { ru: 'пойдя / придя', en: 'having gone' },
        sentenceDeva: 'वनं गत्वा मुनिः ध्यायति। (Vanaṃ gatvā muniḥ dhyāyati)',
        sentenceTrans: { ru: 'Придя в лес, мудрец медитирует.', en: 'Having gone to the forest, the sage meditates.' }
      },
      tavya: {
        wordDeva: 'गन्तव्यम्',
        wordIast: 'gantavyam',
        type: { ru: 'tavya pratyaya (долженствование / цель пути)', en: 'tavya pratyaya · Gerundive' },
        wordMeaning: { ru: 'нужно идти / пункт назначения', en: 'must go / destination' },
        sentenceDeva: 'अस्माभिः अग्रे गन्तव्यम्। (Asmābhiḥ agre gantavyam)',
        sentenceTrans: { ru: 'Нам следует двигаться вперёд.', en: 'We must move forward.' }
      },
      tr: {
        wordDeva: 'गन्तृ (गन्ता)',
        wordIast: 'gantṛ (gantā)',
        type: { ru: 'tṛc pratyaya (имя деятеля)', en: 'tṛc pratyaya · Agent noun' },
        wordMeaning: { ru: 'идущий, путник', en: 'one who goes, traveler' },
        sentenceDeva: 'सः लक्ष्यस्य गन्ता भवति। (Saḥ lakṣyasya gantā bhavati)',
        sentenceTrans: { ru: 'Он становится тем, кто достигает цели.', en: 'He becomes the one who reaches the goal.' }
      }
    }
  },
  vad: {
    rootDeva: '√वद्',
    rootIast: '√vad',
    meaning: { ru: 'говорить, беседовать, произносить', en: 'to speak, converse, articulate' },
    forms: {
      lat: {
        wordDeva: 'वदति',
        wordIast: 'vadati',
        type: { ru: 'laṭ lakāra (наст. время, 3 л. ед. ч.)', en: 'laṭ lakāra · Present 3rd sg.' },
        wordMeaning: { ru: 'говорит', en: 'speaks' },
        sentenceDeva: 'सा स्पष्टं संस्कृतं वदति। (Sā spaṣṭaṃ saṃskṛtaṃ vadati)',
        sentenceTrans: { ru: 'Она ясно говорит на санскрите.', en: 'She speaks clear Sanskrit.' }
      },
      ktva: {
        wordDeva: 'उदित्वा',
        wordIast: 'uditvā',
        type: { ru: 'ktvā pratyaya (с редукцией samprasāraṇa v → u)', en: 'ktvā pratyaya · Samprasāraṇa v → u' },
        wordMeaning: { ru: 'сказав', en: 'having spoken' },
        sentenceDeva: 'इति उदित्वा सः तूष्णीं अभवत्। (Iti uditvā saḥ tūṣṇīṃ abhavat)',
        sentenceTrans: { ru: 'Сказав так, он замолчал.', en: 'Having spoken thus, he became silent.' }
      },
      tavya: {
        wordDeva: 'वक्तव्यम्',
        wordIast: 'vaktavyam',
        type: { ru: 'tavya pratyaya (долженствование)', en: 'tavya pratyaya · Gerundive' },
        wordMeaning: { ru: 'следует сказать / тезис речи', en: 'ought to be spoken / statement' },
        sentenceDeva: 'प्रियं च सत्यं च वक्तव्यम्। (Priyaṃ ca satyaṃ ca vaktavyam)',
        sentenceTrans: { ru: 'Следует говорить то, что доброжелательно и правдиво.', en: 'One should speak what is both kind and true.' }
      },
      tr: {
        wordDeva: 'वक्तृ (वक्ता)',
        wordIast: 'vaktṛ (vaktā)',
        type: { ru: 'tṛc pratyaya (имя деятеля)', en: 'tṛc pratyaya · Agent noun' },
        wordMeaning: { ru: 'оратор, говорящий', en: 'speaker, orator' },
        sentenceDeva: 'कुशलः वक्ता श्रोतृन् रञ्जयति। (Kuśalaḥ vaktā śrotṝn rañjayati)',
        sentenceTrans: { ru: 'Искусный оратор вдохновляет слушателей.', en: 'A skillful speaker delights the listeners.' }
      }
    }
  },
  jna: {
    rootDeva: '√ज्ञा',
    rootIast: '√jñā',
    meaning: { ru: 'знать, понимать, познавать', en: 'to know, understand, realize' },
    forms: {
      lat: {
        wordDeva: 'जानाति',
        wordIast: 'jānāti',
        type: { ru: 'laṭ lakāra (9 класс kryādi, 3 л. ед. ч.)', en: 'laṭ lakāra · 9th class kryādi, 3rd sg.' },
        wordMeaning: { ru: 'знает / понимает', en: 'knows / understands' },
        sentenceDeva: 'यः धातुं जानाति सः शब्दं जानाति। (Yaḥ dhātuṃ jānāti saḥ śabdaṃ jānāti)',
        sentenceTrans: { ru: 'Кто знает корень, тот понимает слово.', en: 'Whoever knows the root understands the word.' }
      },
      ktva: {
        wordDeva: 'ज्ञात्वा',
        wordIast: 'jñātvā',
        type: { ru: 'ktvā pratyaya (деепричастие)', en: 'ktvā pratyaya · Gerund' },
        wordMeaning: { ru: 'узнав / познав', en: 'having known / understood' },
        sentenceDeva: 'अर्थं ज्ञात्वा श्लोकं पठ। (Arthaṃ jñātvā ślokaṃ paṭha)',
        sentenceTrans: { ru: 'Поняв смысл, читай шлоку.', en: 'Having understood the meaning, recite the verse.' }
      },
      tavya: {
        wordDeva: 'ज्ञातव्यम्',
        wordIast: 'jñātavyam',
        type: { ru: 'tavya pratyaya (долженствование)', en: 'tavya pratyaya · Gerundive' },
        wordMeaning: { ru: 'подлежащее познанию / нужно знать', en: 'to be known / worth knowing' },
        sentenceDeva: 'तत्त्वम् अन्वेष्टव्यं ज्ञातव्यं च। (Tattvam anveṣṭavyaṃ jñātavyaṃ ca)',
        sentenceTrans: { ru: 'Истину следует искать и познавать.', en: 'Reality ought to be sought and understood.' }
      },
      tr: {
        wordDeva: 'ज्ञातृ (ज्ञाता)',
        wordIast: 'jñātṛ (jñātā)',
        type: { ru: 'tṛc pratyaya (имя деятеля)', en: 'tṛc pratyaya · Agent noun' },
        wordMeaning: { ru: 'знаток, познающий субъект', en: 'knower, expert' },
        sentenceDeva: 'सः शास्त्रस्य ज्ञाता अस्ति। (Saḥ śāstrasya jñātā asti)',
        sentenceTrans: { ru: 'Он — знаток шастры.', en: 'He is a knower of the śāstra.' }
      }
    }
  }
};

// Render Hero Interactive Task
function selectHeroOption(idx) {
  const item = heroTaskData[idx];
  const buttons = document.querySelectorAll('.hero-option-btn');
  buttons.forEach((btn, i) => {
    btn.classList.remove('selected-correct', 'selected-alt');
    if (i === idx) {
      btn.classList.add(idx === 0 ? 'selected-correct' : 'selected-alt');
    }
  });

  const feedbackEl = document.getElementById('hero-mpf-feedback');
  if (!feedbackEl) return;

  const labelMeaning = currentLang === 'ru' ? '1. Meaning (Смысл)' : '1. Meaning';
  const labelPronun = currentLang === 'ru' ? '2. Pronunciation (Звучание)' : '2. Pronunciation';
  const labelForm = currentLang === 'ru' ? '3. Form (Форма)' : '3. Form';

  feedbackEl.innerHTML = `
    <div class="mpf-title">✓ CELTA Task Feedback · Meaning → Pronunciation → Form</div>
    <div>${item.feedback[currentLang]}</div>
    <div class="mpf-grid">
      <div class="mpf-chip">
        <strong>${labelMeaning}</strong>
        ${item.meaning[currentLang]}
      </div>
      <div class="mpf-chip">
        <strong>${labelPronun}</strong>
        ${item.pronun[currentLang]}
      </div>
      <div class="mpf-chip">
        <strong>${labelForm}</strong>
        ${item.form[currentLang]}
      </div>
    </div>
  `;
}

// Render CEFR Level Panel
function selectCefrLevel(levelCode) {
  currentLevel = levelCode;
  const data = cefrLevelsData[levelCode];
  if (!data) return;

  document.querySelectorAll('.level-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.level === levelCode);
  });

  const sysLabels = {
    pronunciation: { ru: '1. Pronunciation · Произношение', en: '1. Pronunciation · Phonology & Sandhi' },
    vocabulary: { ru: '2. Vocabulary · Лексика и Dhātu', en: '2. Vocabulary · Lexis & Dhātu' },
    functions: { ru: '3. Functions · Функции речи (Can-Do)', en: '3. Functions · Can-Do Exponents' },
    grammar: { ru: '4. Grammar · Грамматика', en: '4. Grammar · Vibhakti, Lakāra, Samāsa' },
    discourse: { ru: '5. Discourse · Дискурс и связность', en: '5. Discourse · Cohesion & Chandas' }
  };

  const panel = document.getElementById('cefr-level-panel');
  if (!panel) return;

  panel.innerHTML = `
    <div class="level-panel-top">
      <div class="level-panel-title">
        <h3>${data.title[currentLang]}</h3>
      </div>
      <div class="level-meta-badges">
        <span class="badge badge-cambridge">${data.vocabBadge[currentLang]}</span>
        <span class="badge badge-gold">${data.shastraBadge[currentLang]}</span>
      </div>
    </div>
    <div class="level-cando-grid">
      <div class="cando-box">
        <div class="cando-sys-label">${sysLabels.pronunciation[currentLang]}</div>
        <p>${data.systems.pronunciation[currentLang]}</p>
      </div>
      <div class="cando-box">
        <div class="cando-sys-label">${sysLabels.vocabulary[currentLang]}</div>
        <p>${data.systems.vocabulary[currentLang]}</p>
      </div>
      <div class="cando-box">
        <div class="cando-sys-label">${sysLabels.functions[currentLang]}</div>
        <p>${data.systems.functions[currentLang]}</p>
      </div>
      <div class="cando-box">
        <div class="cando-sys-label">${sysLabels.grammar[currentLang]}</div>
        <p>${data.systems.grammar[currentLang]}</p>
      </div>
      <div class="cando-box">
        <div class="cando-sys-label">${sysLabels.discourse[currentLang]}</div>
        <p>${data.systems.discourse[currentLang]}</p>
      </div>
    </div>
    <div class="level-sample-box">
      <div>
        <div class="eyebrow gold" style="margin-bottom:0.45rem;">
          ${currentLang === 'ru' ? 'Живой образец речи уровня ' + data.code : 'Authentic Level ' + data.code + ' Speech Sample'}
        </div>
        <div class="level-sample-deva">${data.sample.deva}</div>
        <div class="level-sample-iast">${data.sample.iast}</div>
        <div class="level-sample-trans">${data.sample.trans[currentLang]}</div>
      </div>
    </div>
  `;
}

// Render Game 1: Sandhi Builder
function selectSandhiPreset(index) {
  currentSandhiIndex = index;
  const item = sandhiPresets[index];
  const stage = document.getElementById('sandhi-game-stage');
  if (!stage) return;

  const buttonsHtml = sandhiPresets.map((p, idx) => `
    <button type="button" class="chip-btn ${idx === index ? 'active' : ''}" onclick="selectSandhiPreset(${idx})">
      ${p.left} + ${p.right}
    </button>
  `).join('');

  stage.innerHTML = `
    <div class="preset-buttons">${buttonsHtml}</div>
    <div class="sandhi-equation">
      <span>${item.left} <small style="font-size:0.75rem;color:#64748b;font-family:var(--font-mono);">(${item.leftIast})</small></span>
      <span style="color:var(--accent-saffron);">+</span>
      <span>${item.right} <small style="font-size:0.75rem;color:#64748b;font-family:var(--font-mono);">(${item.rightIast})</small></span>
      <span>→</span>
      <span class="sandhi-result">${item.result} <small style="font-size:0.78rem;font-family:var(--font-mono);">(${item.resultIast})</small></span>
    </div>
    <div class="game-explanation">
      <div style="font-weight:700;color:var(--text-primary);margin-bottom:0.25rem;">
        ${item.ruleName[currentLang]} · <span class="iast-inline">${item.sutra}</span>
      </div>
      <div>${item.explanation[currentLang]}</div>
    </div>
  `;
}

// Render Game 2: Samvada Dialogue Simulator
function renderDialogueGame(selectedOptionIdx = null) {
  const step = dialogueSteps[currentDialogueStep];
  const stage = document.getElementById('dialogue-game-stage');
  if (!stage) return;

  const optionsHtml = step.options.map((opt, idx) => {
    let stateClass = '';
    if (selectedOptionIdx === idx) {
      stateClass = opt.isBest ? 'selected-correct' : 'selected-alt';
    }
    return `
      <button type="button" class="hero-option-btn ${stateClass}" onclick="chooseDialogueOption(${idx})">
        <span class="hero-option-deva">${opt.deva}</span>
        <span class="iast-inline">${opt.iast}</span>
        <span class="hero-option-sub">${opt.trans[currentLang]}</span>
      </button>
    `;
  }).join('');

  let feedbackHtml = '';
  if (selectedOptionIdx !== null) {
    const chosen = step.options[selectedOptionIdx];
    const nextBtnLabel = currentDialogueStep < dialogueSteps.length - 1
      ? (currentLang === 'ru' ? 'Следующая реплика →' : 'Next Turn →')
      : (currentLang === 'ru' ? 'Начать диалог заново ↺' : 'Restart Dialogue ↺');
    const nextStepIdx = currentDialogueStep < dialogueSteps.length - 1 ? currentDialogueStep + 1 : 0;

    const feedbackHeader = chosen.isBest
      ? (currentLang === 'ru' ? '✓ Коммуникативная задача решена!' : '✓ Communicative Success!')
      : (currentLang === 'ru' ? '💡 Методическая подсказка (CELTA Feedback):' : '💡 CELTA Pedagogical Feedback:');

    feedbackHtml = `
      <div class="game-explanation" style="margin-top:0.65rem;border-left:3px solid ${chosen.isBest ? 'var(--accent-cambridge)' : 'var(--accent-gold)'};">
        <div style="font-weight:700;color:var(--text-primary);margin-bottom:0.25rem;">
          ${feedbackHeader}
        </div>
        <div style="margin-bottom:0.55rem;">${chosen.feedback[currentLang]}</div>
        <button type="button" class="chip-btn active" onclick="setDialogueStep(${nextStepIdx})">${nextBtnLabel}</button>
      </div>
    `;
  }

  stage.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.55rem;">
      <span style="font-size:0.75rem;font-weight:700;color:var(--accent-cambridge);">${step.stepBadge[currentLang]}</span>
      <div style="display:flex;gap:0.3rem;">
        ${dialogueSteps.map((_, i) => `<button type="button" class="chip-btn ${i === currentDialogueStep ? 'active' : ''}" style="padding:0.15rem 0.45rem;font-size:0.72rem;" onclick="setDialogueStep(${i})">${i + 1}</button>`).join('')}
      </div>
    </div>
    <div class="dialogue-bubble" style="margin-bottom:0.75rem;padding:0.75rem 0.9rem;">
      <div class="speaker-tag">${step.npcSpeaker[currentLang]}</div>
      <div class="sanskrit-line" style="font-size:1.1rem;">${step.npcDeva}</div>
      <div class="translit-line" style="font-size:0.78rem;">${step.npcIast}</div>
      <div class="meaning-line" style="font-size:0.82rem;">${step.npcTrans[currentLang]}</div>
    </div>
    <div class="hero-options" style="margin-bottom:0;">
      ${optionsHtml}
    </div>
    ${feedbackHtml}
  `;
}

function chooseDialogueOption(idx) {
  renderDialogueGame(idx);
}

function setDialogueStep(stepIdx) {
  currentDialogueStep = stepIdx;
  renderDialogueGame(null);
}

// Render Game 3: Panini's Dhatu Forge
function renderDhatuForge() {
  const stage = document.getElementById('dhatu-game-stage');
  if (!stage) return;

  const rootObj = dhatuForgeData[selectedDhatu];
  const formObj = rootObj.forms[selectedPratyaya];

  const rootsButtons = Object.keys(dhatuForgeData).map(key => {
    const r = dhatuForgeData[key];
    return `
      <button type="button" class="chip-btn ${key === selectedDhatu ? 'active' : ''}" onclick="setDhatu('${key}')">
        ${r.rootDeva} · ${r.rootIast}
      </button>
    `;
  }).join('');

  const pratyayaList = [
    { key: 'lat', label: currentLang === 'ru' ? '-ति (laṭ · действие)' : '-ति · laṭ · present action' },
    { key: 'ktva', label: currentLang === 'ru' ? '-त्वा (ktvā · сделав)' : '-त्वा · ktvā · having done' },
    { key: 'tavya', label: currentLang === 'ru' ? '-तव्य (tavya · долг)' : '-तव्य · tavya · must be done' },
    { key: 'tr', label: currentLang === 'ru' ? '-तृ (tṛc · деятель)' : '-तृ · tṛc · agent noun' }
  ];

  const pratyayaButtons = pratyayaList.map(p => `
    <button type="button" class="chip-btn ${p.key === selectedPratyaya ? 'active' : ''}" onclick="setPratyaya('${p.key}')">
      ${p.label}
    </button>
  `).join('');

  stage.innerHTML = `
    <div style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.3rem;">
      ${currentLang === 'ru' ? '1. Выберите корень (Dhātu):' : '1. Choose a Root · Dhātu:'}
      <span style="color:var(--accent-saffron);">${rootObj.meaning[currentLang]}</span>
    </div>
    <div class="preset-buttons" style="margin-bottom:0.65rem;">${rootsButtons}</div>

    <div style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.3rem;">
      ${currentLang === 'ru' ? '2. Добавьте суффикс (Pratyaya):' : '2. Apply a Suffix · Pratyaya:'}
    </div>
    <div class="preset-buttons" style="margin-bottom:0.75rem;">${pratyayaButtons}</div>

    <div class="sandhi-equation" style="margin-bottom:0.65rem;">
      <span>${rootObj.rootDeva}</span>
      <span style="color:var(--accent-saffron);">→</span>
      <span class="sandhi-result">${formObj.wordDeva} <small style="font-size:0.8rem;font-family:var(--font-mono);">(${formObj.wordIast})</small></span>
    </div>

    <div class="game-explanation">
      <div style="font-weight:700;color:var(--text-primary);margin-bottom:0.2rem;">
        ${formObj.wordMeaning[currentLang]} · <span class="iast-inline">${formObj.type[currentLang]}</span>
      </div>
      <div style="font-family:var(--font-deva);font-weight:600;color:var(--text-primary);margin-top:0.25rem;">
        ${formObj.sentenceDeva}
      </div>
      <div>${formObj.sentenceTrans[currentLang]}</div>
    </div>
  `;
}

function setDhatu(dhatuKey) {
  selectedDhatu = dhatuKey;
  renderDhatuForge();
}

function setPratyaya(pratyayaKey) {
  selectedPratyaya = pratyayaKey;
  renderDhatuForge();
}

// Switch between "home" (Главная), "lesson1"/"lesson2"/"lesson3" (PPP lesson slots 1-3) and "details" (Подробнее) tabs
/* =========================================================================
   URL-маршруты: у каждого урока свой адрес, у языка — свой префикс
   -------------------------------------------------------------------------
   #/ru/lesson5   — урок 5 по-русски
   #/en/lesson5   — урок 5 по-английски
   #/ru/home      — главная, #/en/details — раздел «о методе»

   Ссылку можно отправить ученику: он откроет её и попадёт сразу в нужный
   урок на нужном языке. Кнопки «назад/вперёд» браузера работают: адрес
   меняется через history, страница не перезагружается.
   ========================================================================= */
const ROUTE_VIEWS = ['home', 'details', 'lesson1', 'lesson2', 'lesson3', 'lesson4',
                     'lesson5', 'lesson6', 'lesson7', 'lesson8', 'lesson9'];
let activeView = 'home';
let routeLock = false;          // URL применяется — обратно не пишем

function parseRoute(hash) {
  const m = /^#\/(ru|en)\/([a-z0-9]+)\/?$/.exec(String(hash || ''));
  if (!m || ROUTE_VIEWS.indexOf(m[2]) < 0) return null;
  return { lang: m[1], view: m[2] };
}

function writeRoute(lang, view, replace) {
  if (routeLock) return;
  const hash = '#/' + lang + '/' + view;
  if (location.hash === hash) return;
  /* первый заход и «якорные» ссылки (#top, #playground) не плодят историю */
  const doReplace = replace || !parseRoute(location.hash);
  try {
    if (doReplace) history.replaceState(null, '', hash);
    else history.pushState(null, '', hash);
  } catch (e) {
    location.hash = hash;
  }
}

/* какому уроку движка соответствует адрес: view-lesson5 → L5.
   Урок 3 — отдельная страница из 12 слов, у неё своего ключа нет. */
function lessonKeyForView(view) {
  const m = /^lesson(\d+)$/.exec(String(view || ''));
  if (!m || !window.SAL || !window.SAL.lessons) return null;
  const num = parseInt(m[1], 10);
  const keys = Object.keys(window.SAL.lessons);
  for (let i = 0; i < keys.length; i++) {
    if (window.SAL.lessons[keys[i]].num === num) return keys[i];
  }
  return null;
}

/* открыть урок по адресу: через движок, чтобы панель была собрана и отрисована */
function showRouteView(view) {
  const key = lessonKeyForView(view);
  if (key && window.SAL && typeof window.SAL.openLesson === 'function') {
    window.SAL.openLesson(key);
    return;
  }
  switchView(view);
}

/* применить адрес из строки браузера */
function applyRoute(hash) {
  const r = parseRoute(hash);
  if (!r) return false;
  routeLock = true;
  try {
    if (currentLang !== r.lang) setLanguage(r.lang);
    if (activeView !== r.view || lessonKeyForView(r.view)) showRouteView(r.view);
  } finally {
    routeLock = false;
  }
  return true;
}

function switchView(viewName, targetSectionId = null) {
  if (ROUTE_VIEWS.indexOf(viewName) >= 0) activeView = viewName;
  writeRoute(currentLang, activeView);
  const panes = {
    home: document.getElementById('view-home'),
    lesson1: document.getElementById('view-lesson1'),
    lesson2: document.getElementById('view-lesson2'),
    lesson3: document.getElementById('view-lesson3'),
    lesson4: document.getElementById('view-lesson4'),
    lesson5: document.getElementById('view-lesson5'),
    lesson6: document.getElementById('view-lesson6'),
    lesson7: document.getElementById('view-lesson7'),
    lesson8: document.getElementById('view-lesson8'),
    lesson9: document.getElementById('view-lesson9'),
    details: document.getElementById('view-details')
  };
  const buttons = {
    home: document.getElementById('tab-btn-home'),
    lesson1: document.getElementById('tab-btn-lesson1'),
    lesson2: document.getElementById('tab-btn-lesson2'),
    lesson3: document.getElementById('tab-btn-lesson3'),
    details: document.getElementById('tab-btn-details')
  };

  Object.keys(panes).forEach(key => {
    const pane = panes[key];
    const btn = buttons[key];
    const isActive = key === viewName;
    if (pane) {
      pane.classList.toggle('active', isActive);
      pane.style.display = isActive ? 'block' : 'none';
      pane.hidden = !isActive;
    }
    if (btn) {
      btn.classList.toggle('active', isActive);
    }
  });

  if (targetSectionId) {
    const targetEl = document.getElementById(targetSectionId);
    if (targetEl) {
      setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
      return;
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Language Switcher (RU / EN)
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.title = lang === 'ru'
    ? 'Sanskrit in Action с Алексом Виджая — Санскрит по-кембриджски (CEFR A1–C2)'
    : 'Sanskrit in Action with Alex Vijaya — Communicative Sanskrit (CEFR A1–C2)';

  const emblem = document.getElementById('brand-emblem');
  if (emblem) {
    emblem.title = lang === 'ru' ? emblem.getAttribute('data-title-ru') : emblem.getAttribute('data-title-en');
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('[data-i18n-ru]').forEach(el => {
    const text = lang === 'ru' ? el.getAttribute('data-i18n-ru') : el.getAttribute('data-i18n-en');
    if (text !== null) {
      el.innerHTML = text;
    }
  });

  // Refresh dynamic widgets in selected language
  selectHeroOption(0);
  selectCefrLevel(currentLevel);
  selectSandhiPreset(currentSandhiIndex);
  renderDialogueGame(null);
  renderDhatuForge();
  if (typeof refreshLesson1 === 'function') {
    refreshLesson1();
  }
  if (window.SAL && typeof window.SAL.refresh === 'function') {
    window.SAL.refresh();
  }
  writeRoute(lang, activeView);
}

// Copy helper for GitHub Description snippets
// navigator.clipboard is unavailable in some in-app browsers / non-HTTPS
// contexts — without a fallback the "Copy" button silently does nothing.
function copyTextFallback(text, done) {
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    document.body.appendChild(area);
    area.select();
    const ok = typeof document.execCommand === 'function' && document.execCommand('copy');
    document.body.removeChild(area);
    done(!!ok);
  } catch (e) {
    done(false);
  }
}

function copyTextById(elementId, btnEl) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = (el.innerText || el.textContent || '').trim();

  const showResult = (ok) => {
    if (!btnEl) return;
    if (!btnEl.dataset.originalLabel) btnEl.dataset.originalLabel = btnEl.textContent;
    btnEl.textContent = ok
      ? (currentLang === 'ru' ? 'Скопировано ✓' : 'Copied ✓')
      : (currentLang === 'ru' ? 'Не удалось скопировать' : 'Copy failed');
    setTimeout(() => {
      btnEl.textContent = btnEl.dataset.originalLabel;
    }, 1800);
  };

  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text)
      .then(() => showResult(true))
      .catch(() => copyTextFallback(text, showResult));
  } else {
    copyTextFallback(text, showResult);
  }
}

/* открыть то, что написано в адресе; без адреса — русская главная */
function initRouteFromLocation() {
  const r = parseRoute(location.hash);
  if (r) {
    routeLock = true;
    try {
      setLanguage(r.lang);
      showRouteView(r.view);
    } finally {
      routeLock = false;
    }
    return;
  }
  setLanguage('ru');
  switchView('home');
}

/* скрипт подключён в конце страницы, но порядок загрузки бывает разным:
   если DOM уже готов — применяем адрес сразу, иначе ждём DOMContentLoaded */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRouteFromLocation);
} else {
  initRouteFromLocation();
}

/* «назад/вперёд» браузера и ручная правка адреса */
window.addEventListener('popstate', () => { applyRoute(location.hash); });
window.addEventListener('hashchange', () => {
  if (applyRoute(location.hash)) return;
  /* якорь внутри страницы (#playground) или мусор в адресе:
     возвращаем канонический адрес урока, сам переход по якорю не трогаем */
  const hash = String(location.hash || '');
  if (hash && hash !== '#' && ROUTE_VIEWS.length) {
    try { history.replaceState(null, '', '#/' + currentLang + '/' + activeView); } catch (e) {}
  }
});
