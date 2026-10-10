// Lesson 1 (PPP: Presentation -> Practice -> Production)
// Topic: Vocabulary — शरीरसम्बन्धि-शब्दाः (Parts of the Body / Части тела)

const bodyPartsVocab = [
  {
    id: 'nayanam',
    deva: 'नयनम्',
    iast: 'nayanam',
    ru: 'глаз',
    en: 'eye',
    genderRu: 'ср. р. (-म्)',
    genderEn: 'neuter (-am)',
    pronounceHintRu: 'на́-я-нам (все гласные краткие)',
    pronounceHintEn: 'ná-ya-nam (all short vowels)',
    sentenceDeva: 'एतत् मम नयनम् अस्ति।',
    sentenceIast: 'Etat mama nayanam asti.',
    sentenceRu: 'Это мой глаз.',
    sentenceEn: 'This is my eye.',
    gapDeva: 'अहं नेत्रेण पश्यामि — एतत् मम ___ अस्ति।',
    gapHintRu: 'Я вижу им — это мой [глаз].',
    gapHintEn: 'I see with it — this is my [eye].',
    missingDisplay: 'न _ नम्',
    missingAnswer: 'य',
    missingChoices: ['य', 'ग', 'प', 'त'],
    category: 'face',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M12 52C24 32 76 32 88 52C76 72 24 72 12 52Z" fill="#FFFFFF" stroke="#14213D" stroke-width="3.5"/>
      <circle cx="50" cy="52" r="16" fill="#2563EB" stroke="#14213D" stroke-width="2.5"/>
      <circle cx="50" cy="52" r="7.5" fill="#0F172A"/>
      <circle cx="44" cy="46" r="3.5" fill="#FFFFFF"/>
      <path d="M22 36L27 42M38 30L40 37M50 29L50 36M62 30L60 37M78 36L73 42" stroke="#14213D" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'nasika',
    deva: 'नासिका',
    iast: 'nāsikā',
    ru: 'нос',
    en: 'nose',
    genderRu: 'ж. р. (-आ)',
    genderEn: 'feminine (-ā)',
    pronounceHintRu: 'на̄́-си-ка̄ (долгие «а̄» в 1-м и 3-м слогах)',
    pronounceHintEn: 'nā́-si-kā (long ā in first and last syllables)',
    sentenceDeva: 'एषा मम नासिका अस्ति।',
    sentenceIast: 'Eṣā mama nāsikā asti.',
    sentenceRu: 'Это мой нос.',
    sentenceEn: 'This is my nose.',
    gapDeva: 'अहं पुष्पस्य गन्धं जिघ्रामि — एषा मम ___ अस्ति।',
    gapHintRu: 'Я вдыхаю аромат цветка — это мой [нос].',
    gapHintEn: 'I smell the flower — this is my [nose].',
    missingDisplay: 'ना _ का',
    missingAnswer: 'सि',
    missingChoices: ['सि', 'मि', 'लि', 'रि'],
    category: 'face',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M45 18C45 35 36 56 28 66C24 71 28 79 37 78C43 77 46 81 50 81C54 81 57 77 63 78C72 79 76 71 72 66C64 56 55 35 55 18" fill="#F3C6A8" stroke="#14213D" stroke-width="3.2" stroke-linecap="round"/>
      <ellipse cx="38" cy="73" rx="5" ry="3" fill="#14213D"/>
      <ellipse cx="62" cy="73" rx="5" ry="3" fill="#14213D"/>
    </svg>`
  },
  {
    id: 'jihva',
    deva: 'जिह्वा',
    iast: 'jihvā',
    ru: 'язык',
    en: 'tongue',
    genderRu: 'ж. р. (-आ)',
    genderEn: 'feminine (-ā)',
    pronounceHintRu: 'джи́х-ва̄ (сочетание хв + долгое а̄)',
    pronounceHintEn: 'jíh-vā (aspirated hv cluster + long ā)',
    sentenceDeva: 'जिह्वा रसम् जानाति संस्कृतं च वदति।',
    sentenceIast: 'Jihvā rasam jānāti saṃskṛtaṃ ca vadati.',
    sentenceRu: 'Язык чувствует вкус и говорит на санскрите.',
    sentenceEn: 'The tongue tastes flavor and speaks Sanskrit.',
    gapDeva: 'मुखस्य अन्तः ___ अस्ति, तया अहं वदामि।',
    gapHintRu: 'Внутри рта находится [язык], им я говорю.',
    gapHintEn: 'Inside the mouth is the [tongue], with which I speak.',
    missingDisplay: 'जि _',
    missingAnswer: 'ह्वा',
    missingChoices: ['ह्वा', 'त्वा', 'न्ना', 'म्मा'],
    category: 'face',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M20 34C35 26 65 26 80 34C76 52 68 58 50 58C32 58 24 52 20 34Z" fill="#7F1D1D" stroke="#14213D" stroke-width="3"/>
      <path d="M30 38C30 38 30 82 50 82C70 82 70 38 70 38Z" fill="#F43F5E" stroke="#14213D" stroke-width="3.2"/>
      <path d="M50 42V72" stroke="#BE123C" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'karnam',
    deva: 'कर्णम्',
    iast: 'karṇam',
    ru: 'ухо',
    en: 'ear',
    genderRu: 'ср. р. (-म्) / м. р.',
    genderEn: 'neuter (-am) / m.',
    pronounceHintRu: 'ка́р-нам (ретрофлексное ṇ после r)',
    pronounceHintEn: 'kár-ṇam (retroflex ṇ after r)',
    sentenceDeva: 'एतत् मम कर्णम् अस्ति।',
    sentenceIast: 'Etat mama karṇam asti.',
    sentenceRu: 'Это моё ухо.',
    sentenceEn: 'This is my ear.',
    gapDeva: 'अहं श्लोकं शृणोमि — एतत् मम ___ अस्ति।',
    gapHintRu: 'Я слушаю шлоку — это моё [ухо].',
    gapHintEn: 'I hear the verse — this is my [ear].',
    missingDisplay: 'क _ म्',
    missingAnswer: 'र्ण',
    missingChoices: ['र्ण', 'र्म', 'र्थ', 'र्क'],
    category: 'face',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M35 28C38 15 68 14 72 36C75 53 64 62 60 72C56 82 40 85 36 74C34 68 38 64 38 64" fill="#F3C6A8" stroke="#14213D" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M44 34C54 26 62 36 58 48C55 56 46 56 46 64" stroke="#14213D" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="45" cy="52" r="4" fill="#14213D"/>
    </svg>`
  },
  {
    id: 'shirsam',
    deva: 'शीर्षम्',
    iast: 'śīrṣam',
    ru: 'голова',
    en: 'head',
    genderRu: 'ср. р. (-म्)',
    genderEn: 'neuter (-am)',
    pronounceHintRu: 'шӣ́р-шам (долгое ӣ + ретрофлексное ṣ)',
    pronounceHintEn: 'śī́r-ṣam (long ī + retroflex ṣ)',
    sentenceDeva: 'एतत् मम शीर्षम् अस्ति।',
    sentenceIast: 'Etat mama śīrṣam asti.',
    sentenceRu: 'Это моя голова.',
    sentenceEn: 'This is my head.',
    gapDeva: 'शरीरस्य उपरि ___ अस्ति।',
    gapHintRu: 'В верхней части тела находится [голова].',
    gapHintEn: 'At the top of the body is the [head].',
    missingDisplay: 'शी _ म्',
    missingAnswer: 'र्ष',
    missingChoices: ['र्ष', 'र्ण', 'र्म', 'र्व'],
    category: 'head',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <ellipse cx="50" cy="48" rx="24" ry="30" fill="#F3C6A8" stroke="#14213D" stroke-width="3.2"/>
      <path d="M38 76V88H62V76" fill="#E5B293" stroke="#14213D" stroke-width="3"/>
      <path d="M38 45H44M56 45H62" stroke="#14213D" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M50 46V56" stroke="#14213D" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M43 64C47 67 53 67 57 64" stroke="#14213D" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="50" cy="48" r="35" stroke="#C84B31" stroke-width="2" stroke-dasharray="4 4"/>
    </svg>`
  },
  {
    id: 'lalatah',
    deva: 'ललाटः',
    iast: 'lalāṭaḥ',
    ru: 'лоб',
    en: 'forehead',
    genderRu: 'м. р. (-ः)',
    genderEn: 'masculine (-aḥ)',
    pronounceHintRu: 'ла-ла̄́-тах (долгое а̄ + ретрофлексное ṭ)',
    pronounceHintEn: 'la-lā́-ṭaḥ (long ā + retroflex ṭ)',
    sentenceDeva: 'अयं मम ललाटः अस्ति।',
    sentenceIast: 'Ayaṃ mama lalāṭaḥ asti.',
    sentenceRu: 'Это мой лоб.',
    sentenceEn: 'This is my forehead.',
    gapDeva: 'भ्रुवोः उपरि विस्तृतः ___ अस्ति।',
    gapHintRu: 'Над бровями расположен широкий [лоб].',
    gapHintEn: 'Above the eyebrows is the broad [forehead].',
    missingDisplay: 'ल _ टः',
    missingAnswer: 'ला',
    missingChoices: ['ला', 'ली', 'लू', 'ले'],
    category: 'head',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M24 78C24 40 30 20 50 20C70 20 76 40 76 78" fill="#F3C6A8" stroke="#14213D" stroke-width="3.2"/>
      <rect x="31" y="28" width="38" height="22" rx="6" fill="#FDE68A" stroke="#D97706" stroke-width="2.5"/>
      <path d="M32 62C37 58 43 58 46 62M54 62C57 58 63 58 68 62" stroke="#14213D" stroke-width="3" stroke-linecap="round"/>
      <circle cx="39" cy="70" r="3" fill="#14213D"/>
      <circle cx="61" cy="70" r="3" fill="#14213D"/>
    </svg>`
  },
  {
    id: 'bhruh',
    deva: 'भ्रूः',
    iast: 'bhrūḥ',
    ru: 'бровь',
    en: 'eyebrow',
    genderRu: 'ж. р. (-ऊः)',
    genderEn: 'feminine (-ūḥ)',
    pronounceHintRu: 'бхрӯх (придыхательное bh + долгое ӯ + висарга)',
    pronounceHintEn: 'bhrūḥ (aspirated bh + long ū + visarga)',
    sentenceDeva: 'इयं मम भ्रूः अस्ति।',
    sentenceIast: 'Iyaṃ mama bhrūḥ asti.',
    sentenceRu: 'Это моя бровь.',
    sentenceEn: 'This is my eyebrow.',
    gapDeva: 'नयनस्य उपरि धनुः इव ___ अस्ति।',
    gapHintRu: 'Над глазом, словно дуга лука, находится [бровь].',
    gapHintEn: 'Above the eye, arched like a bow, is the [eyebrow].',
    missingDisplay: '_ ः',
    missingAnswer: 'भ्रू',
    missingChoices: ['भ्रू', 'भू', 'भ्र', 'ध्रू'],
    category: 'face',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#FFFFFF"/>
      <path d="M22 40C38 28 64 28 78 38" stroke="#14213D" stroke-width="6" stroke-linecap="round"/>
      <path d="M14 26L28 31M28 31L22 23M28 31L20 34" stroke="#DC2626" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M26 64C36 52 64 52 74 64C64 76 36 76 26 64Z" fill="#FFFFFF" stroke="#14213D" stroke-width="3"/>
      <circle cx="50" cy="64" r="9" fill="#0F172A"/>
      <circle cx="47" cy="61" r="2.5" fill="#FFFFFF"/>
    </svg>`
  },
  {
    id: 'osthau',
    deva: 'ओष्ठौ',
    iast: 'oṣṭhau',
    ru: 'губы (две губы)',
    en: 'lips (dual)',
    genderRu: 'м. р. дв. ч. (-औ)',
    genderEn: 'masculine dual (-au)',
    pronounceHintRu: 'о́штхау (окончание -au означает парный предмет!)',
    pronounceHintEn: 'óṣṭhau (-au ending marks a natural pair!)',
    sentenceDeva: 'एतौ मम ओष्ठौ स्तः।',
    sentenceIast: 'Etau mama oṣṭhau staḥ.',
    sentenceRu: 'Это мои (две) губы.',
    sentenceEn: 'These are my (two) lips.',
    gapDeva: 'मम मुखे द्वौ ___ स्तः।',
    gapHintRu: 'У меня на лице две [губы] (двойственное число на -ौ).',
    gapHintEn: 'On my mouth are two [lips] (dual ending -au).',
    missingDisplay: 'ओ _',
    missingAnswer: 'ष्ठौ',
    missingChoices: ['ष्ठौ', 'ष्टौ', 'ष्णौ', 'स्मौ'],
    category: 'face',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M16 50C26 36 42 36 50 43C58 36 74 36 84 50C68 53 32 53 16 50Z" fill="#E11D48" stroke="#14213D" stroke-width="3"/>
      <path d="M16 50C30 70 70 70 84 50C66 53 34 53 16 50Z" fill="#FB7185" stroke="#14213D" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'karah',
    deva: 'करः',
    iast: 'karaḥ',
    ru: 'рука (кисть)',
    en: 'hand / arm',
    genderRu: 'м. р. (-ः)',
    genderEn: 'masculine (-aḥ)',
    pronounceHintRu: 'ка́-рах (от корня √kṛ «делать» — то, чем делают!)',
    pronounceHintEn: 'ká-raḥ (from √kṛ “to do” — the instrument of action!)',
    sentenceDeva: 'अयं मम करः अस्ति। करेण अहं लिखामि।',
    sentenceIast: 'Ayaṃ mama karaḥ asti. Kareṇa ahaṃ likhāmi.',
    sentenceRu: 'Это моя рука. Рукой я пишу.',
    sentenceEn: 'This is my hand. With my hand I write.',
    gapDeva: 'अहं कार्यं करोमि — अयं मम ___ अस्ति।',
    gapHintRu: 'Я делаю работу — это моя [рука] (от корня √kṛ).',
    gapHintEn: 'I do work — this is my [hand] (from √kṛ).',
    missingDisplay: 'क _',
    missingAnswer: 'रः',
    missingChoices: ['रः', 'लः', 'नः', 'मः'],
    category: 'limbs',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#FFFFFF"/>
      <path d="M42 88V54L30 42C27 39 31 35 35 38L42 45V22C42 18 47 18 47 22V40V16C47 12 53 12 53 16V40V19C53 15 58 15 58 19V42V26C58 22 63 22 63 26V56L58 88H42Z" fill="#F3C6A8" stroke="#14213D" stroke-width="2.8" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 'padah',
    deva: 'पादः',
    iast: 'pādaḥ',
    ru: 'нога (стопа)',
    en: 'foot / leg',
    genderRu: 'м. р. (-ः)',
    genderEn: 'masculine (-aḥ)',
    pronounceHintRu: 'па̄́-дах (долгое а̄; родственно русскому «пеший», лат. ped-)',
    pronounceHintEn: 'pā́-daḥ (long ā; cognate with Latin ped- / English foot)',
    sentenceDeva: 'अयं मम पादः अस्ति। पादाभ्यां अहं चलामि।',
    sentenceIast: 'Ayaṃ mama pādaḥ asti. Pādābhyāṃ ahaṃ calāmi.',
    sentenceRu: 'Это моя нога. Ногами я хожу.',
    sentenceEn: 'This is my foot. With my feet I walk.',
    gapDeva: 'अहं मार्गे चलामि — अयं मम ___ अस्ति।',
    gapHintRu: 'Я иду по дороге — это моя [нога / стопа].',
    gapHintEn: 'I walk along the path — this is my [foot / leg].',
    missingDisplay: 'पा _',
    missingAnswer: 'दः',
    missingChoices: ['दः', 'तः', 'पः', 'बः'],
    category: 'limbs',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#FFFFFF"/>
      <path d="M44 16H62L58 64C58 72 64 78 56 82C46 86 26 84 26 77C26 72 38 69 42 62L44 16Z" fill="#F3C6A8" stroke="#14213D" stroke-width="3" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 'dantah',
    deva: 'दन्तः',
    iast: 'dantaḥ',
    ru: 'зуб',
    en: 'tooth',
    genderRu: 'м. р. (-ः)',
    genderEn: 'masculine (-aḥ)',
    pronounceHintRu: 'да́н-тах (родственно русскому «десна» и англ. dental!)',
    pronounceHintEn: 'dán-taḥ (cognate with Latin dent- / English dental!)',
    sentenceDeva: 'अयं श्वेतः दन्तः अस्ति।',
    sentenceIast: 'Ayaṃ śvetaḥ dantaḥ asti.',
    sentenceRu: 'Это белый зуб.',
    sentenceEn: 'This is a white tooth.',
    gapDeva: 'अहं फलम् खादामि — मुखे श्वेतः ___ अस्ति।',
    gapHintRu: 'Я ем яблоко — во рту белый [зуб] (ср. dental).',
    gapHintEn: 'I chew fruit — in the mouth is a white [tooth] (cf. dental).',
    missingDisplay: 'द _ तः',
    missingAnswer: 'न्',
    missingChoices: ['न्', 'म्', 'र्', 'ल्'],
    category: 'face',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#1E293B"/>
      <path d="M28 32C28 20 42 18 50 24C58 18 72 20 72 32C72 48 66 56 64 76C63 83 56 83 54 72C52 63 48 63 46 72C44 83 37 83 36 76C34 56 28 48 28 32Z" fill="#FFFBEB" stroke="#14213D" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'anguli',
    deva: 'अङ्गुली',
    iast: 'aṅgulī',
    ru: 'палец',
    en: 'finger',
    genderRu: 'ж. р. (-ई)',
    genderEn: 'feminine (-ī)',
    pronounceHintRu: 'а́н-гу-лӣ (носовой ṅ перед g + долгое ӣ на конце)',
    pronounceHintEn: 'áṅ-gu-lī (velar nasal ṅ before g + final long ī)',
    sentenceDeva: 'इयं मम अङ्गुली अस्ति।',
    sentenceIast: 'Iyaṃ mama aṅgulī asti.',
    sentenceRu: 'Это мой палец.',
    sentenceEn: 'This is my finger.',
    gapDeva: 'मम करे पञ्च अङ्गुल्यः सन्ति — इयं एका ___ अस्ति।',
    gapHintRu: 'На моей руке пять пальцев — это один [палец].',
    gapHintEn: 'On my hand are five fingers — this is one [finger].',
    missingDisplay: 'अ _ ली',
    missingAnswer: 'ङ्गु',
    missingChoices: ['ङ्गु', 'म्बु', 'न्दु', 'ञ्जु'],
    category: 'limbs',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#F8EFE6"/>
      <path d="M18 76L58 26C64 19 76 26 70 36L38 84Z" fill="#F3C6A8" stroke="#14213D" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="64" cy="29" rx="5" ry="6" transform="rotate(-38 64 29)" fill="#FDE2E4" stroke="#14213D" stroke-width="2"/>
    </svg>`
  }
];

// Lesson 1 State
let labelsHidden = false;
let currentPracticeGame = 'flashcards'; // 'flashcards' | 'gaps' | 'picquiz' | 'wordquiz' | 'match' | 'spelling' | 'truefalse'
let fcIndex = 0;
let fcFlipped = false;
let gapIndex = 0;
let gapScore = 0;
let gapAnswered = false;
let pqIndex = 0;
let pqScore = 0;
let pqAnswered = false;
let wqIndex = 0;
let wqScore = 0;
let wqAnswered = false;
let spIndex = 0;
let spScore = 0;
let spAnswered = false;
let tfIndex = 0;
let tfScore = 0;
let tfIsTrue = true;
let tfDisplayedWordIdx = 0;
let tfAnswered = false;

// Match game state
let matchTiles = [];
let matchFirstIdx = null;
let matchMatchedCount = 0;

// Production state: track which of the 12 words the student has spoken/built
let producedWordsSet = new Set(['nayanam']);
let activeProdWordId = 'nayanam';

// Audio Speech Helper (Web Speech API)
function speakSanskritWord(devaText, iastText) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(devaText);
    utter.lang = 'hi-IN';
    utter.rate = 0.85;
    window.speechSynthesis.speak(utter);
  }
}

// 1. Render Stage 1: PRESENTATION (3x4 Chart + MPF Breakdown)
function renderPresentationStage() {
  const gridEl = document.getElementById('lesson1-vocab-grid');
  if (!gridEl) return;

  gridEl.classList.toggle('labels-hidden', labelsHidden);

  gridEl.innerHTML = bodyPartsVocab.map((item, idx) => {
    const meaning = currentLang === 'ru' ? item.ru : item.en;
    const gender = currentLang === 'ru' ? item.genderRu : item.genderEn;
    return `
      <div class="vocab-item-card" onclick="speakSanskritWord('${item.deva}', '${item.iast}')">
        <button type="button" class="vocab-audio-btn" title="Listen" onclick="event.stopPropagation(); speakSanskritWord('${item.deva}', '${item.iast}')">🔊</button>
        <div class="vocab-svg-box">${item.svg}</div>
        <div class="vocab-deva">${item.deva}</div>
        <div class="vocab-iast">${item.iast}</div>
        <div class="vocab-meaning">${meaning}</div>
        <span class="vocab-grammar-tag">${gender}</span>
      </div>
    `;
  }).join('');

  const toggleBtn = document.getElementById('toggle-labels-btn');
  if (toggleBtn) {
    if (labelsHidden) {
      toggleBtn.innerText = currentLang === 'ru' ? '👁 Показать подписи' : '👁 Show Labels';
      toggleBtn.classList.add('active');
    } else {
      toggleBtn.innerText = currentLang === 'ru' ? '🙈 Скрыть подписи (проверь себя)' : '🙈 Hide Labels (Test Yourself)';
      toggleBtn.classList.remove('active');
    }
  }
}

function toggleVocabLabels() {
  labelsHidden = !labelsHidden;
  renderPresentationStage();
}

// 2. Render Stage 2: PRACTICE (7 Simple ELT Games)
function selectPracticeGame(gameKey) {
  currentPracticeGame = gameKey;
  document.querySelectorAll('.practice-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.game === gameKey);
  });

  if (gameKey === 'match') {
    initMatchGame();
  } else if (gameKey === 'truefalse') {
    prepareTrueFalseRound();
  }
  renderPracticeArena();
}

function renderPracticeArena() {
  const arena = document.getElementById('lesson1-practice-arena');
  if (!arena) return;

  if (currentPracticeGame === 'flashcards') {
    renderFlashcardsGame(arena);
  } else if (currentPracticeGame === 'gaps') {
    renderFillGapsGame(arena);
  } else if (currentPracticeGame === 'picquiz') {
    renderPictureQuizGame(arena);
  } else if (currentPracticeGame === 'wordquiz') {
    renderWordToPicQuizGame(arena);
  } else if (currentPracticeGame === 'match') {
    renderMatchPairsGame(arena);
  } else if (currentPracticeGame === 'spelling') {
    renderSpellingGame(arena);
  } else if (currentPracticeGame === 'truefalse') {
    renderTrueFalseGame(arena);
  }
}

// GAME 1: Flashcards
function renderFlashcardsGame(arena) {
  const item = bodyPartsVocab[fcIndex];
  const meaning = currentLang === 'ru' ? item.ru : item.en;
  const gender = currentLang === 'ru' ? item.genderRu : item.genderEn;
  const hint = currentLang === 'ru' ? item.pronounceHintRu : item.pronounceHintEn;

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 1: Flashcards (Флэш-карточки)' : 'Game 1: Flashcards'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Нажмите на карточку, чтобы перевернуть её и услышать произношение' : 'Click the card to flip it and hear the pronunciation'}
        </div>
      </div>
      <span class="game-score-pill">${fcIndex + 1} / ${bodyPartsVocab.length}</span>
    </div>

    <div class="flashcard-box" onclick="flipFlashcard()">
      ${!fcFlipped ? `
        <div class="vocab-svg-box" style="width:130px;height:130px;margin-bottom:0.9rem;">${item.svg}</div>
        <div style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin-bottom:0.35rem;">${meaning.toUpperCase()}</div>
        <div style="font-size:0.8rem;color:var(--accent-cambridge);font-weight:600;">
          ${currentLang === 'ru' ? '👆 Нажмите, чтобы увидеть слово на санскрите' : '👆 Click to reveal the Sanskrit word'}
        </div>
      ` : `
        <div class="vocab-deva" style="font-size:2.4rem;margin-bottom:0.25rem;">${item.deva}</div>
        <div class="vocab-iast" style="font-size:1.15rem;margin-bottom:0.4rem;">${item.iast}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.4rem;">${meaning} · <span style="font-family:var(--font-mono);font-size:0.82rem;">${gender}</span></div>
        <div style="font-size:0.82rem;background:var(--bg-secondary);padding:0.45rem 0.85rem;border-radius:8px;color:var(--text-primary);">
          🗣 ${hint}
        </div>
      `}
    </div>

    <div style="display:flex;justify-content:center;gap:0.65rem;flex-wrap:wrap;">
      <button type="button" class="chip-btn" onclick="prevFlashcard()">← ${currentLang === 'ru' ? 'Назад' : 'Prev'}</button>
      <button type="button" class="chip-btn active" onclick="flipFlashcard()">↺ ${currentLang === 'ru' ? 'Перевернуть' : 'Flip Card'}</button>
      <button type="button" class="chip-btn" onclick="speakSanskritWord('${item.deva}', '${item.iast}')">🔊 ${currentLang === 'ru' ? 'Озвучить' : 'Listen'}</button>
      <button type="button" class="chip-btn" onclick="nextFlashcard()">${currentLang === 'ru' ? 'Дальше' : 'Next'} →</button>
    </div>
  `;
}

function flipFlashcard() {
  fcFlipped = !fcFlipped;
  if (fcFlipped) {
    const item = bodyPartsVocab[fcIndex];
    speakSanskritWord(item.deva, item.iast);
  }
  renderPracticeArena();
}

function nextFlashcard() {
  fcIndex = (fcIndex + 1) % bodyPartsVocab.length;
  fcFlipped = false;
  renderPracticeArena();
}

function prevFlashcard() {
  fcIndex = (fcIndex - 1 + bodyPartsVocab.length) % bodyPartsVocab.length;
  fcFlipped = false;
  renderPracticeArena();
}

// GAME 2: Fill in the Gaps (Cloze Sentence Drill)
function renderFillGapsGame(arena) {
  const item = bodyPartsVocab[gapIndex];
  const hint = currentLang === 'ru' ? item.gapHintRu : item.gapHintEn;

  // Build 4 deterministic options around gapIndex
  const distractors = [
    bodyPartsVocab[(gapIndex + 3) % bodyPartsVocab.length],
    bodyPartsVocab[(gapIndex + 6) % bodyPartsVocab.length],
    bodyPartsVocab[(gapIndex + 9) % bodyPartsVocab.length]
  ];
  const options = [item, ...distractors].sort((a, b) => a.id.localeCompare(b.id));

  const optionsHtml = options.map(opt => {
    const optMeaning = currentLang === 'ru' ? opt.ru : opt.en;
    return `
      <button type="button" class="quiz-opt-btn" id="gap-opt-${opt.id}" onclick="checkGapAnswer('${opt.id}')">
        <div style="font-family:var(--font-deva);font-size:1.35rem;font-weight:700;">${opt.deva}</div>
        <div style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-saffron);">${opt.iast}</div>
        <div style="font-size:0.78rem;color:var(--text-secondary);">${optMeaning}</div>
      </button>
    `;
  }).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 2: Fill in the Gaps (Вставь пропущенное слово)' : 'Game 2: Fill in the Gaps'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Выберите подходящее по смыслу и роду слово, чтобы заполнить пропуск' : 'Choose the correct Sanskrit word to complete the sentence'}
        </div>
      </div>
      <span class="game-score-pill">${currentLang === 'ru' ? 'Счёт:' : 'Score:'} ${gapScore} · (${gapIndex + 1}/${bodyPartsVocab.length})</span>
    </div>

    <div style="display:flex;align-items:center;gap:1.25rem;background:var(--bg-primary);padding:1.25rem;border-radius:12px;border:1px solid var(--border-color);flex-wrap:wrap;justify-content:center;">
      <div class="vocab-svg-box" style="margin:0;width:95px;height:95px;">${item.svg}</div>
      <div style="flex:1;min-width:220px;">
        <div style="font-family:var(--font-deva);font-size:1.5rem;font-weight:700;color:var(--text-primary);margin-bottom:0.3rem;" id="gap-sentence-display">
          ${item.gapDeva}
        </div>
        <div style="font-size:0.9rem;color:var(--text-secondary);">${hint}</div>
      </div>
    </div>

    <div class="quiz-options-grid">${optionsHtml}</div>
    <div id="gap-feedback-msg" style="margin-top:1rem;text-align:center;"></div>
  `;
}

function checkGapAnswer(chosenId) {
  if (gapAnswered) return;
  const item = bodyPartsVocab[gapIndex];
  const btn = document.getElementById('gap-opt-' + chosenId);
  const feedbackEl = document.getElementById('gap-feedback-msg');

  if (chosenId === item.id) {
    gapAnswered = true;
    gapScore++;
    if (btn) btn.classList.add('correct');
    const sentenceEl = document.getElementById('gap-sentence-display');
    if (sentenceEl) {
      sentenceEl.innerHTML = item.gapDeva.replace('___', `<span style="color:var(--accent-cambridge);text-decoration:underline;">${item.deva}</span>`);
    }
    speakSanskritWord(item.deva, item.iast);
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div style="color:#15803d;font-weight:700;margin-bottom:0.5rem;">
          ✓ ${currentLang === 'ru' ? 'Верно!' : 'Correct!'} ${item.deva} (${item.iast})
        </div>
        <button type="button" class="chip-btn active" onclick="nextGapRound()">
          ${currentLang === 'ru' ? 'Следующее предложение →' : 'Next Sentence →'}
        </button>
      `;
    }
  } else {
    if (btn) btn.classList.add('wrong');
    if (feedbackEl) {
      feedbackEl.innerHTML = `<div style="color:#dc2626;font-weight:600;">${currentLang === 'ru' ? 'Попробуйте другое слово!' : 'Try another word!'}</div>`;
    }
  }
}

function nextGapRound() {
  gapIndex = (gapIndex + 1) % bodyPartsVocab.length;
  gapAnswered = false;
  renderPracticeArena();
}

// GAME 3: Picture Quiz (See Picture -> Pick Word)
function renderPictureQuizGame(arena) {
  const item = bodyPartsVocab[pqIndex];
  const distractors = [
    bodyPartsVocab[(pqIndex + 2) % bodyPartsVocab.length],
    bodyPartsVocab[(pqIndex + 5) % bodyPartsVocab.length],
    bodyPartsVocab[(pqIndex + 8) % bodyPartsVocab.length]
  ];
  const options = [item, ...distractors].sort((a, b) => a.id.localeCompare(b.id));

  const optionsHtml = options.map(opt => `
    <button type="button" class="quiz-opt-btn" id="pq-opt-${opt.id}" onclick="checkPicQuizAnswer('${opt.id}')">
      <div style="font-family:var(--font-deva);font-size:1.45rem;font-weight:700;">${opt.deva}</div>
      <div style="font-family:var(--font-mono);font-size:0.82rem;color:var(--accent-saffron);">${opt.iast}</div>
    </button>
  `).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 3: Picture Quiz (Угадай слово по картинке)' : 'Game 3: Picture Quiz'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'किम् एतत्? (Что это?) Выберите правильное санскритское название для картинки' : 'Kim etat? (What is this?) Pick the Sanskrit word matching the illustration'}
        </div>
      </div>
      <span class="game-score-pill">${currentLang === 'ru' ? 'Счёт:' : 'Score:'} ${pqScore} · (${pqIndex + 1}/${bodyPartsVocab.length})</span>
    </div>

    <div style="text-align:center;">
      <div class="vocab-svg-box" style="width:130px;height:130px;margin:0 auto 0.5rem;">${item.svg}</div>
      <div style="font-family:var(--font-deva);font-size:1.2rem;color:var(--text-secondary);">किम् एतत्? (Kim etat?)</div>
    </div>

    <div class="quiz-options-grid">${optionsHtml}</div>
    <div id="pq-feedback-msg" style="margin-top:1rem;text-align:center;"></div>
  `;
}

function checkPicQuizAnswer(chosenId) {
  if (pqAnswered) return;
  const item = bodyPartsVocab[pqIndex];
  const btn = document.getElementById('pq-opt-' + chosenId);
  const feedbackEl = document.getElementById('pq-feedback-msg');

  if (chosenId === item.id) {
    pqAnswered = true;
    pqScore++;
    if (btn) btn.classList.add('correct');
    speakSanskritWord(item.deva, item.iast);
    const meaning = currentLang === 'ru' ? item.ru : item.en;
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div style="color:#15803d;font-weight:700;margin-bottom:0.5rem;">
          ✓ ${currentLang === 'ru' ? 'Отлично!' : 'Spot on!'} ${item.deva} (${item.iast}) — ${meaning}
        </div>
        <button type="button" class="chip-btn active" onclick="nextPicQuizRound()">
          ${currentLang === 'ru' ? 'Дальше →' : 'Next →'}
        </button>
      `;
    }
  } else {
    if (btn) btn.classList.add('wrong');
  }
}

function nextPicQuizRound() {
  pqIndex = (pqIndex + 1) % bodyPartsVocab.length;
  pqAnswered = false;
  renderPracticeArena();
}

// GAME 4: Word -> Picture Quiz (Read Sanskrit Word -> Click Picture)
function renderWordToPicQuizGame(arena) {
  const item = bodyPartsVocab[wqIndex];
  const distractors = [
    bodyPartsVocab[(wqIndex + 1) % bodyPartsVocab.length],
    bodyPartsVocab[(wqIndex + 4) % bodyPartsVocab.length],
    bodyPartsVocab[(wqIndex + 7) % bodyPartsVocab.length]
  ];
  const options = [item, ...distractors].sort((a, b) => a.id.localeCompare(b.id));

  const optionsHtml = options.map(opt => `
    <button type="button" class="quiz-opt-btn" id="wq-opt-${opt.id}" onclick="checkWordQuizAnswer('${opt.id}')" style="display:flex;flex-direction:column;align-items:center;">
      <div class="vocab-svg-box" style="margin:0;width:95px;height:95px;">${opt.svg}</div>
    </button>
  `).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 4: Найди картинку по слову (Read & Match)' : 'Game 4: Read & Pick the Picture'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Прочитайте слово на деванагари и нажмите на соответствующую картинку' : 'Read the Sanskrit word and click the matching picture'}
        </div>
      </div>
      <span class="game-score-pill">${currentLang === 'ru' ? 'Счёт:' : 'Score:'} ${wqScore} · (${wqIndex + 1}/${bodyPartsVocab.length})</span>
    </div>

    <div style="text-align:center;padding:0.75rem;background:var(--bg-primary);border-radius:12px;border:1px solid var(--border-color);">
      <div class="vocab-deva" style="font-size:2.2rem;">${item.deva}</div>
      <div class="vocab-iast" style="font-size:1rem;">${item.iast}</div>
      <button type="button" class="chip-btn" style="margin-top:0.35rem;" onclick="speakSanskritWord('${item.deva}', '${item.iast}')">🔊 ${currentLang === 'ru' ? 'Прослушать' : 'Listen'}</button>
    </div>

    <div class="quiz-options-grid">${optionsHtml}</div>
    <div id="wq-feedback-msg" style="margin-top:1rem;text-align:center;"></div>
  `;
}

function checkWordQuizAnswer(chosenId) {
  if (wqAnswered) return;
  const item = bodyPartsVocab[wqIndex];
  const btn = document.getElementById('wq-opt-' + chosenId);
  const feedbackEl = document.getElementById('wq-feedback-msg');

  if (chosenId === item.id) {
    wqAnswered = true;
    wqScore++;
    if (btn) btn.classList.add('correct');
    speakSanskritWord(item.deva, item.iast);
    const meaning = currentLang === 'ru' ? item.ru : item.en;
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div style="color:#15803d;font-weight:700;margin-bottom:0.5rem;">
          ✓ ${currentLang === 'ru' ? 'Верно!' : 'Correct!'} ${item.deva} — ${meaning}
        </div>
        <button type="button" class="chip-btn active" onclick="nextWordQuizRound()">
          ${currentLang === 'ru' ? 'Следующее слово →' : 'Next Word →'}
        </button>
      `;
    }
  } else {
    if (btn) btn.classList.add('wrong');
  }
}

function nextWordQuizRound() {
  wqIndex = (wqIndex + 1) % bodyPartsVocab.length;
  wqAnswered = false;
  renderPracticeArena();
}

// GAME 5: Match Pairs (Pelmanism — 4 Pictures + 4 Words = 8 tiles)
function initMatchGame() {
  const subset = [...bodyPartsVocab].sort(() => Math.random() - 0.5).slice(0, 4);
  const tiles = [];
  subset.forEach(item => {
    tiles.push({ uid: 'pic-' + item.id, pairId: item.id, type: 'pic', item, matched: false });
    tiles.push({ uid: 'word-' + item.id, pairId: item.id, type: 'word', item, matched: false });
  });
  matchTiles = tiles.sort(() => Math.random() - 0.5);
  matchFirstIdx = null;
  matchMatchedCount = 0;
}

function renderMatchPairsGame(arena) {
  if (matchTiles.length === 0) initMatchGame();

  const tilesHtml = matchTiles.map((t, idx) => {
    const isSelected = matchFirstIdx === idx;
    const classes = ['match-tile'];
    if (isSelected) classes.push('selected');
    if (t.matched) classes.push('matched');

    const content = t.type === 'pic'
      ? `<div class="vocab-svg-box" style="margin:0;width:68px;height:68px;">${t.item.svg}</div>`
      : `<div style="font-family:var(--font-deva);font-size:1.35rem;font-weight:700;">${t.item.deva}</div>
         <div style="font-family:var(--font-mono);font-size:0.76rem;color:var(--accent-saffron);">${t.item.iast}</div>`;

    return `
      <div class="${classes.join(' ')}" onclick="clickMatchTile(${idx})">
        ${content}
      </div>
    `;
  }).join('');

  const allDone = matchMatchedCount === 4;

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 5: Match Pairs (Соедини картинку и слово)' : 'Game 5: Match Pairs (Picture + Word)'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Нажмите на картинку, а затем на соответствующее ей санскритское слово' : 'Click a picture tile and then its matching Sanskrit word tile'}
        </div>
      </div>
      <span class="game-score-pill">${matchMatchedCount} / 4 ${currentLang === 'ru' ? 'пар' : 'pairs'}</span>
    </div>

    <div class="match-grid">${tilesHtml}</div>

    ${allDone ? `
      <div style="margin-top:1.25rem;text-align:center;">
        <div style="color:#15803d;font-weight:700;margin-bottom:0.5rem;">
          🎉 ${currentLang === 'ru' ? 'Все пары найдены!' : 'All pairs matched!'}
        </div>
        <button type="button" class="chip-btn active" onclick="initMatchGame(); renderPracticeArena();">
          ${currentLang === 'ru' ? 'Сыграть ещё раз с новыми словами ↺' : 'Play Again with New Words ↺'}
        </button>
      </div>
    ` : ''}
  `;
}

function clickMatchTile(idx) {
  const tile = matchTiles[idx];
  if (!tile || tile.matched) return;
  if (matchFirstIdx === idx) {
    matchFirstIdx = null;
    renderPracticeArena();
    return;
  }

  if (matchFirstIdx === null) {
    matchFirstIdx = idx;
    if (tile.type === 'word') speakSanskritWord(tile.item.deva, tile.item.iast);
    renderPracticeArena();
  } else {
    const firstTile = matchTiles[matchFirstIdx];
    if (firstTile.pairId === tile.pairId && firstTile.type !== tile.type) {
      firstTile.matched = true;
      tile.matched = true;
      matchMatchedCount++;
      speakSanskritWord(tile.item.deva, tile.item.iast);
    }
    matchFirstIdx = null;
    renderPracticeArena();
  }
}

// GAME 6: Missing Syllable / Devanagari Spelling Drill
function renderSpellingGame(arena) {
  const item = bodyPartsVocab[spIndex];
  const meaning = currentLang === 'ru' ? item.ru : item.en;

  const choicesHtml = item.missingChoices.map((ch, i) => `
    <button type="button" class="quiz-opt-btn" id="sp-opt-${i}" onclick="checkSpellingAnswer('${ch}', ${i})">
      <div style="font-family:var(--font-deva);font-size:1.65rem;font-weight:700;">${ch}</div>
    </button>
  `).join('');

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 6: Собери слово по слогам (Spelling Drill)' : 'Game 6: Complete the Devanāgarī Word'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Выберите пропущенный слог деванагари, чтобы получилось правильное слово' : 'Choose the missing Devanāgarī syllable to complete the word'}
        </div>
      </div>
      <span class="game-score-pill">${currentLang === 'ru' ? 'Счёт:' : 'Score:'} ${spScore} · (${spIndex + 1}/${bodyPartsVocab.length})</span>
    </div>

    <div style="text-align:center;background:var(--bg-primary);padding:1.25rem;border-radius:12px;border:1px solid var(--border-color);">
      <div class="vocab-svg-box" style="width:95px;height:95px;margin:0 auto 0.5rem;">${item.svg}</div>
      <div style="font-family:var(--font-deva);font-size:2.3rem;font-weight:700;letter-spacing:0.06em;" id="sp-word-display">
        ${item.missingDisplay}
      </div>
      <div style="font-size:0.9rem;color:var(--text-secondary);">${item.iast} — <strong>${meaning}</strong></div>
    </div>

    <div class="quiz-options-grid">${choicesHtml}</div>
    <div id="sp-feedback-msg" style="margin-top:1rem;text-align:center;"></div>
  `;
}

function checkSpellingAnswer(chosenSyllable, btnIdx) {
  if (spAnswered) return;
  const item = bodyPartsVocab[spIndex];
  const btn = document.getElementById('sp-opt-' + btnIdx);
  const feedbackEl = document.getElementById('sp-feedback-msg');

  if (chosenSyllable === item.missingAnswer) {
    spAnswered = true;
    spScore++;
    if (btn) btn.classList.add('correct');
    const wordDisp = document.getElementById('sp-word-display');
    if (wordDisp) wordDisp.innerHTML = `<span style="color:var(--accent-cambridge);">${item.deva}</span>`;
    speakSanskritWord(item.deva, item.iast);
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div style="color:#15803d;font-weight:700;margin-bottom:0.5rem;">
          ✓ ${item.deva} (${item.iast})
        </div>
        <button type="button" class="chip-btn active" onclick="nextSpellingRound()">
          ${currentLang === 'ru' ? 'Следующее слово →' : 'Next Word →'}
        </button>
      `;
    }
  } else {
    if (btn) btn.classList.add('wrong');
  }
}

function nextSpellingRound() {
  spIndex = (spIndex + 1) % bodyPartsVocab.length;
  spAnswered = false;
  renderPracticeArena();
}

// GAME 7: True or False ("Kim etat ... asti? — Ām / Na")
function prepareTrueFalseRound() {
  tfAnswered = false;
  tfIsTrue = Math.random() >= 0.45;
  if (tfIsTrue) {
    tfDisplayedWordIdx = tfIndex;
  } else {
    tfDisplayedWordIdx = (tfIndex + 3) % bodyPartsVocab.length;
  }
}

function renderTrueFalseGame(arena) {
  const picItem = bodyPartsVocab[tfIndex];
  const wordItem = bodyPartsVocab[tfDisplayedWordIdx];

  arena.innerHTML = `
    <div class="game-top-bar">
      <div>
        <strong style="font-size:1.05rem;">${currentLang === 'ru' ? 'Игра 7: Правда или Ложь (आम् / न — True or False)' : 'Game 7: True or False (Ām / Na)'}</strong>
        <div style="font-size:0.82rem;color:var(--text-secondary);">
          ${currentLang === 'ru' ? 'Совпадает ли подпись на санскрите с картинкой?' : 'Does the Sanskrit word match the picture shown?'}
        </div>
      </div>
      <span class="game-score-pill">${currentLang === 'ru' ? 'Счёт:' : 'Score:'} ${tfScore}</span>
    </div>

    <div style="text-align:center;background:var(--bg-primary);padding:1.35rem;border-radius:12px;border:1px solid var(--border-color);">
      <div class="vocab-svg-box" style="width:115px;height:115px;margin:0 auto 0.65rem;">${picItem.svg}</div>
      <div style="font-family:var(--font-deva);font-size:1.65rem;font-weight:700;color:var(--text-primary);">
        किम् एतत् <span style="color:var(--accent-saffron);">${wordItem.deva}</span> (${wordItem.iast})?
      </div>
    </div>

    <div class="quiz-options-grid">
      <button type="button" class="quiz-opt-btn" id="tf-btn-true" onclick="checkTrueFalse(true)">
        <div style="font-family:var(--font-deva);font-size:1.45rem;font-weight:700;color:#15803d;">आम् (Ām)</div>
        <div style="font-size:0.85rem;font-weight:700;">${currentLang === 'ru' ? 'Да, верно' : 'Yes, True'}</div>
      </button>
      <button type="button" class="quiz-opt-btn" id="tf-btn-false" onclick="checkTrueFalse(false)">
        <div style="font-family:var(--font-deva);font-size:1.45rem;font-weight:700;color:#dc2626;">न (Na)</div>
        <div style="font-size:0.85rem;font-weight:700;">${currentLang === 'ru' ? 'Нет, неверно' : 'No, False'}</div>
      </button>
    </div>

    <div id="tf-feedback-msg" style="margin-top:1rem;text-align:center;"></div>
  `;
}

function checkTrueFalse(userSaidTrue) {
  if (tfAnswered) return;
  tfAnswered = true;
  const picItem = bodyPartsVocab[tfIndex];
  const isCorrect = userSaidTrue === tfIsTrue;
  const btn = document.getElementById(userSaidTrue ? 'tf-btn-true' : 'tf-btn-false');
  const feedbackEl = document.getElementById('tf-feedback-msg');

  if (isCorrect) {
    tfScore++;
    if (btn) btn.classList.add('correct');
  } else {
    if (btn) btn.classList.add('wrong');
  }

  speakSanskritWord(picItem.deva, picItem.iast);
  const meaning = currentLang === 'ru' ? picItem.ru : picItem.en;

  if (feedbackEl) {
    feedbackEl.innerHTML = `
      <div style="font-weight:700;color:${isCorrect ? '#15803d' : '#dc2626'};margin-bottom:0.5rem;">
        ${isCorrect ? (currentLang === 'ru' ? '✓ Правильно!' : '✓ Correct!') : (currentLang === 'ru' ? '✕ Ошибка!' : '✕ Not quite!')}
        ${currentLang === 'ru' ? 'На картинке:' : 'Shown in picture:'} <strong>${picItem.deva} (${picItem.iast}) — ${meaning}</strong>
      </div>
      <button type="button" class="chip-btn active" onclick="nextTrueFalseRound()">
        ${currentLang === 'ru' ? 'Следующий вопрос →' : 'Next Question →'}
      </button>
    `;
  }
}

function nextTrueFalseRound() {
  tfIndex = (tfIndex + 1) % bodyPartsVocab.length;
  prepareTrueFalseRound();
  renderPracticeArena();
}

// 3. Render Stage 3: PRODUCTION ("Point & Speak" Sentence Builder)
function selectProductionWord(wordId) {
  activeProdWordId = wordId;
  producedWordsSet.add(wordId);
  const item = bodyPartsVocab.find(w => w.id === wordId);
  if (item) {
    speakSanskritWord(item.sentenceDeva, item.sentenceIast);
  }
  renderProductionStage();
}

function renderProductionStage() {
  const container = document.getElementById('lesson1-production-stage');
  if (!container) return;

  const activeItem = bodyPartsVocab.find(w => w.id === activeProdWordId) || bodyPartsVocab[0];
  const chipsHtml = bodyPartsVocab.map(w => {
    const done = producedWordsSet.has(w.id);
    const isCurrent = w.id === activeProdWordId;
    return `
      <button type="button" class="chip-btn ${isCurrent ? 'active' : ''}" onclick="selectProductionWord('${w.id}')"
              style="${done && !isCurrent ? 'border-color:#16a34a;background:#f0fdf4;color:#15803d;' : ''}">
        ${done ? '✓ ' : ''}${w.deva} (${w.iast})
      </button>
    `;
  }).join('');

  const sentenceMeaning = currentLang === 'ru' ? activeItem.sentenceRu : activeItem.sentenceEn;
  const wordMeaning = currentLang === 'ru' ? activeItem.ru : activeItem.en;

  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:1rem;">
      <div style="font-weight:700;color:var(--text-primary);">
        ${currentLang === 'ru'
          ? 'Выберите любую часть тела, произнесите полную фразу вслух и соберите все 12 слов:'
          : 'Click any body part, speak the full Sanskrit sentence aloud, and complete all 12 words:'}
      </div>
      <span class="game-score-pill">${producedWordsSet.size} / 12 ${currentLang === 'ru' ? 'фраз освоено' : 'sentences spoken'}</span>
    </div>

    <div class="preset-buttons" style="margin-bottom:1.25rem;">${chipsHtml}</div>

    <div style="display:flex;align-items:center;gap:1.5rem;background:var(--bg-primary);padding:1.5rem;border-radius:16px;border:1.5px solid var(--border-strong);flex-wrap:wrap;">
      <div class="vocab-svg-box" style="margin:0;width:120px;height:120px;">${activeItem.svg}</div>
      <div style="flex:1;min-width:240px;">
        <div class="badge badge-cambridge" style="margin-bottom:0.5rem;">
          ${activeItem.deva} · ${activeItem.iast} (${wordMeaning})
        </div>
        <div style="font-family:var(--font-deva);font-size:1.75rem;font-weight:700;color:var(--text-primary);margin-bottom:0.2rem;">
          ${activeItem.sentenceDeva}
        </div>
        <div style="font-family:var(--font-mono);font-size:0.95rem;color:var(--accent-saffron);margin-bottom:0.35rem;">
          ${activeItem.sentenceIast}
        </div>
        <div style="font-size:1rem;color:var(--text-secondary);margin-bottom:0.75rem;">
          «${sentenceMeaning}»
        </div>
        <button type="button" class="btn btn-primary" style="padding:0.55rem 1.1rem;font-size:0.86rem;"
                onclick="speakSanskritWord('${activeItem.sentenceDeva}', '${activeItem.sentenceIast}')">
          🔊 ${currentLang === 'ru' ? 'Прослушать и повторить вслух' : 'Listen & Repeat Aloud'}
        </button>
      </div>
    </div>
  `;
}

// Initialize / Refresh all Lesson 1 views when language changes
function refreshLesson1() {
  renderPresentationStage();
  renderPracticeArena();
  renderProductionStage();
}

document.addEventListener('DOMContentLoaded', () => {
  initMatchGame();
  prepareTrueFalseRound();
  refreshLesson1();
});
