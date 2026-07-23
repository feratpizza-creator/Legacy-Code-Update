// Lingolali curriculum data – complete CEFR A0-C2 content for Finnish and English.
// All content is original and written for the Lingolali platform only.

import type {
  LanguagePack,
  Level,
  Unit,
  Lesson,
  VocabularyItem,
  GrammarItem,
  Exercise,
  QuizQuestion,
  ReadingText,
} from "./learn-data";

// ------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------

type PhraseSpec = { phrase: string; translation: string };
type LineSpec = { speaker: string; text: string; translation: string };

type UnitSeed = {
  id: string;
  title: string;
  description: string;
  words: VocabularyItem[];
  phrases: PhraseSpec[];
  dialogue: LineSpec[];
  reading: ReadingText & { title: string };
};

type LevelSeed = {
  cefr: Level["cefr"];
  title: string;
  description: string;
  pronunciationTips: string[];
  grammar: GrammarItem[];
  units: UnitSeed[];
};

function chunk<T>(arr: T[], parts: number): T[][] {
  const size = Math.ceil(arr.length / parts);
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

function splitReading(
  reading: ReadingText & { title: string },
  lessonIndex: number,
  parts: number = 2
): ReadingText & { title: string } {
  const sentences = reading.text.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length <= 1) {
    return reading;
  }
  const size = Math.max(1, Math.ceil(sentences.length / parts));
  const start = lessonIndex * size;
  const text = sentences.slice(start, start + size).join(" ");
  const translation = reading.translation
    ? reading.translation.split(/(?<=[.!?])\s+/).filter(Boolean).slice(start, start + size).join(" ")
    : undefined;
  return { ...reading, text, translation };
}

function buildLesson(
  seed: UnitSeed,
  levelSeed: LevelSeed,
  levelIndex: number,
  unitIndex: number,
  lessonIndex: number
): Lesson {
  const allWords = seed.words;
  const wordChunks = chunk(allWords, 2);
  const words = wordChunks[lessonIndex] ?? allWords.slice(0, 4);
  const grammarIndex = ((unitIndex * 2 + lessonIndex) % levelSeed.grammar.length) || 0;
  const grammar = levelSeed.grammar[grammarIndex]!;
  const pronunciation = levelSeed.pronunciationTips[(unitIndex * 2 + lessonIndex) % levelSeed.pronunciationTips.length] ?? "";

  // Split unit-level content into Part 1 and Part 2 so each lesson feels distinct.
  const reading = splitReading(seed.reading, lessonIndex);
  const phraseChunks = chunk(seed.phrases, 2);
  const phrases = phraseChunks[lessonIndex] ?? seed.phrases;
  const dialogueChunks = chunk(seed.dialogue, 2);
  const dialogueLines = dialogueChunks[lessonIndex] ?? seed.dialogue;

  // Exercises
  const exercises: Exercise[] = [];
  if (words.length >= 2) {
    const pairs: Record<string, string> = {};
    for (const w of words) {
      pairs[w.word] = w.translation;
    }
    exercises.push({ type: "match", prompt: "Match the words with their meanings.", pairs });
  }
  const blanks = words.filter((w) => w.example).slice(0, 3).map((w) => {
    const sentence = w.example ?? "";
    return { sentence: sentence.replace(w.word, "_____"), answer: w.word };
  });
  if (blanks.length > 0 && lessonIndex === 1) {
    exercises.push({ type: "fill", prompt: "Fill in the missing word.", blanks });
  }
  if (phrases.length > 0 && lessonIndex === 1) {
    const phrasePairs: Record<string, string> = {};
    for (const p of phrases.slice(0, 4)) {
      phrasePairs[p.phrase] = p.translation;
    }
    exercises.push({ type: "match", prompt: "Match the phrases with their meanings.", pairs: phrasePairs });
  }
  if (reading.text) {
    const question = lessonIndex === 0
      ? `In the reading, what is one key word introduced?`
      : `According to the reading, which word fits the context best?`;
    exercises.push({
      type: "choice",
      prompt: "Reading comprehension",
      question,
      options: [words[0]?.word ?? "", words[1]?.word ?? "", words[2]?.word ?? ""].filter(Boolean),
      answer: words[0]?.word ?? "",
    });
  }

  // Quiz
  const quiz: QuizQuestion[] = [];
  const quizWords = words.slice(0, 4);
  quizWords.forEach((w, i) => {
    const options = [w.translation, ...words.filter((_, idx) => idx !== i).slice(0, 2).map((x) => x.translation)];
    while (options.length < 3) options.push("—");
    quiz.push({
      id: `q${lessonIndex}-${i}`,
      question: `What does "${w.word}" mean?`,
      options: shuffle(options),
      answer: w.translation,
    });
  });
  if (grammar) {
    quiz.push({
      id: `qg-${lessonIndex}`,
      question: `Grammar focus: ${grammar.title}`,
      options: shuffle([grammar.explanation.slice(0, 40), "No rule", "Old words"]),
      answer: grammar.explanation.slice(0, 40),
    });
  }

  const reviewItems = words.map((w) => w.word);
  const flashcards = words.map((w) => ({ front: w.word, back: w.translation }));

  return {
    id: `${seed.id}-l${lessonIndex + 1}`,
    title: `${seed.title} – ${lessonIndex === 0 ? "Part 1" : "Part 2"}`,
    objective: lessonIndex === 0
      ? `Learn and recognize ${seed.title.toLowerCase()} vocabulary and grammar in natural ${levelSeed.cefr} contexts.`
      : `Apply ${seed.title.toLowerCase()} vocabulary and grammar in phrases and sentences at the ${levelSeed.cefr} level.`,
    vocabulary: words,
    grammar: [grammar],
    reading,
    exercises,
    quiz,
    learningObjectives: lessonIndex === 0
      ? [`Recognize ${seed.title.toLowerCase()} words.`, `Hear and read the key grammar point: ${grammar.title}.`, `Understand a short reading text.`]
      : [`Use ${seed.title.toLowerCase()} words in phrases.`, `Apply the grammar point: ${grammar.title}.`, `Answer questions about the reading.`],
    pronunciation: [pronunciation],
    usefulPhrases: phrases,
    dialogue: dialogueLines,
    reviewItems,
    flashcards,
    estimatedDuration: `${10 + words.length * 2} min`,
  };
}

function buildUnit(seed: UnitSeed, levelSeed: LevelSeed, levelIndex: number, unitIndex: number): Unit {
  return {
    id: seed.id,
    title: seed.title,
    description: seed.description,
    lessons: [0, 1].map((i) => buildLesson(seed, levelSeed, levelIndex, unitIndex, i)),
  };
}

function buildLevel(seed: LevelSeed, levelIndex: number): Level {
  return {
    id: seed.cefr,
    cefr: seed.cefr,
    title: seed.title,
    description: seed.description,
    units: seed.units.map((u, i) => buildUnit(u, seed, levelIndex, i)),
  };
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildLanguagePack(
  name: string,
  targetLang: string,
  explanationLangs: string[],
  flag: string,
  description: string,
  levels: LevelSeed[],
  manualA0U1?: Unit
): LanguagePack {
  const builtLevels = levels.map((l, i) => buildLevel(l, i));
  if (manualA0U1) {
    builtLevels[0]!.units[0] = manualA0U1;
  }
  return {
    id: `${targetLang}-${explanationLangs[0]}`,
    name,
    targetLang,
    explanationLangs: explanationLangs as any,
    flag,
    description,
    levels: builtLevels,
  };
}

// ------------------------------------------------------------------------
// Finnish curriculum
// ------------------------------------------------------------------------

const FINNISH_PRONUNCIATION: Record<string, string[]> = {
  A0: [
    "Finnish vowels are pure: keep your lips rounded for o and u.",
    "Stress is always on the first syllable.",
    "The 'ä' sound is like the 'a' in 'cat'.",
    "Double letters are long: say 'talo' and 'taalo' differently.",
    "The 'y' sound is close to French 'u'.",
    "'g' is always hard, like in 'get'."
  ],
  A1: [
    "Practice the rolling 'r' lightly.",
    "Long vowels matter: 'tuli' (fire) vs 'tuuli' (wind).",
    "'ä' and 'ö' are front vowels; don't mix them with back vowels.",
    "'nk' is pronounced like 'ŋk'.",
    "Final consonants are usually clear.",
    "Keep the rhythm steady and syllable-timed."
  ],
  A2: [
    "Listen to native podcasts for intonation.",
    "The partitive ending can change the vowel.",
    "Stress does not shift in longer words.",
    "'ts' is pronounced as a single affricate.",
    "Diphthongs stay within one syllable.",
    "Hear the difference between 't' and 'tt'."
  ],
  B1: [
    "Focus on sentence melody in questions.",
    "Passive forms often shorten in speech.",
    "Conditional 'isi' has a soft rhythm.",
    "Reported speech keeps the original tense.",
    "Connected speech may drop weak vowels.",
    "Intonation adds politeness."
  ],
  B2: [
    "Master register shifts between formal and colloquial Finnish.",
    "Abstract nouns often carry suffix stress.",
    "Idioms rely on melody as well as words.",
    "Long compound words keep first-syllable stress.",
    "Colloquial 'mä' vs standard 'minä'.",
    "Pauses mark clause boundaries."
  ],
  C1: [
    "Academic Finnish uses passive constructions often.",
    "Subtle modality changes the speaker's stance.",
    "Rhetorical questions use falling intonation.",
    "Hedging is common in research writing.",
    "Cultural references require native-like rhythm.",
    "Stress remains on the first element in compounds."
  ],
  C2: [
    "Near-native speech uses regional prosody.",
    "Poetic register may break normal stress rules.",
    "Dialect vowels color meaning and identity.",
    "Rhetorical emphasis shifts stress for effect.",
    "Academic discourse is concise and dense.",
    "Translation requires hearing the unsaid."
  ],
};

const FINNISH_GRAMMAR: Record<string, GrammarItem[]> = {
  A0: [
    { title: "Vokaalisointu", explanation: "Suomen kielessä sana käyttää takaisia (a, o, u) tai eteviä (ä, ö, y) vokaaleja. Tämä vaikuttaa päätteisiin.", examples: [{ target: "talo – talossa", meaning: "house – in the house" }, { target: "pöytä – pöydässä", meaning: "table – at the table" }] },
    { title: "Ei artikkeleita", explanation: "Suomessa ei ole sanoja 'a', 'an' tai 'the'. Asiayhteys kertoo, puhutaanko yleisesti vai tarkasti.", examples: [{ target: "Minä olen opiskelija.", meaning: "I am a student." }, { target: "Kirja on pöydällä.", meaning: "The book is on the table." }] },
    { title: "Verbien 'olla' preesens", explanation: "Verb 'olla' (to be) on tärkeä. Sen muodot ovat minä olen, sinä olet, hän on.", examples: [{ target: "Minä olen iloinen.", meaning: "I am happy." }, { target: "Sinä olet ystäväni.", meaning: "You are my friend." }] },
    { title: "Sanajärjestys", explanation: "Suomen perusjärjestys on subjekti-verbi-objekti.", examples: [{ target: "Minä juon kahvia.", meaning: "I drink coffee." }, { target: "Hän lukee kirjaa.", meaning: "He reads a book." }] },
    { title: "Kysymyssanat", explanation: "Kysymyssanat ovat esimerkiksi mikä, kuka, missä, milloin.", examples: [{ target: "Kuka sinä olet?", meaning: "Who are you?" }, { target: "Missä kirjasto on?", meaning: "Where is the library?" }] },
    { title: "Numerot ja monikko", explanation: "Monikon tunnistaa päätteistä -t tai -jA. Numeroita käytetään ilman erityisiä taivutusmuotoja.", examples: [{ target: "yksi kirja – kaksi kirjaa", meaning: "one book – two books" }, { target: "kolme ystävää", meaning: "three friends" }] },
  ],
  A1: [
    { title: "Preesens", explanation: "Suomen preesens on säännöllinen. Verbit voidaan jakaa viiteen päätyyppiin.", examples: [{ target: "Minä puhun suomea.", meaning: "I speak Finnish." }, { target: "Hän kirjoittaa viestiä.", meaning: "He writes a message." }] },
    { title: "Omistus", explanation: "Omistusta ilmaistaan pronomineilla minun, sinun, hänen ennen omistettua sanaa.", examples: [{ target: "Tämä on minun kirja.", meaning: "This is my book." }, { target: "Sinun talo on iso.", meaning: "Your house is big." }] },
    { title: "Inessiivi", explanation: "Inessiivi tarkoittaa 'jossakin' ja päättyy -ssa tai -ssä.", examples: [{ target: "Olen koulussa.", meaning: "I am at school." }, { target: "Kirja on pöydässä.", meaning: "The book is on the table." }] },
    { title: "Kysymyssufiksi -ko/-kö", explanation: "Kysymykseen voidaan lisätä -ko tai -kö päätteeksi.", examples: [{ target: "Puhutko suomea?", meaning: "Do you speak Finnish?" }, { target: "Onko hän kotona?", meaning: "Is he at home?" }] },
    { title: "Kieltäminen preesensissä", explanation: "Kielteinen muoto tehdään en-, et-, ei- + verbin passiivin 1. partisiippi.", examples: [{ target: "Minä en ymmärrä.", meaning: "I don't understand." }, { target: "Hän ei ole täällä.", meaning: "He is not here." }] },
    { title: "Adjektiivien yksimielisyys", explanation: "Adjektiivi ei taipu substantiivin mukaan suomessa.", examples: [{ target: "iso talo", meaning: "big house" }, { target: "kaunis päivä", meaning: "beautiful day" }] },
  ],
  A2: [
    { title: "Imperfekti", explanation: "Imperfekti kertoo menneestä. Verbin vartalo saa -i- ja pääte.", examples: [{ target: "Minä ostin kirjan.", meaning: "I bought a book." }, { target: "Hän käveli puistossa.", meaning: "She walked in the park." }] },
    { title: "Tulevaisuus", explanation: "Tulevaisuutta voi ilmaista aikoa-verbillä tai yksinkertaisesti preesensissä.", examples: [{ target: "Aion matkustaa huomenna.", meaning: "I intend to travel tomorrow." }, { target: "Me menemme kauppaan.", meaning: "We will go to the shop." }] },
    { title: "Partitiivi", explanation: "Partitiivia käytetään esimerkiksi objektista, jota ei kokonaan suoriteta.", examples: [{ target: "Minä juon kahvia.", meaning: "I drink (some) coffee." }, { target: "Hän ostaa leipää.", meaning: "He buys (some) bread." }] },
    { title: "Vertailu", explanation: "Comparative ja superlative muodostetaan -mpi ja -in päätteillä.", examples: [{ target: "iso – isompi – isoin", meaning: "big – bigger – biggest" }, { target: "hyvä – parempi – paras", meaning: "good – better – best" }] },
    { title: "Modaaliverbit", explanation: "Verbit täytyä, pitää ja voida ilmaisevat velvollisuutta, tarvetta ja kykyä.", examples: [{ target: "Minun täytyy opiskella.", meaning: "I must study." }, { target: "Hän voi auttaa.", meaning: "He can help." }] },
    { title: "Objektin sijamuodot", explanation: "Objekti voi olla partitiivissa tai nominatiivissa riippuen lauseen täydellisyydestä.", examples: [{ target: "Luen kirjaa.", meaning: "I am reading a book." }, { target: "Luin kirjan.", meaning: "I read the (whole) book." }] },
  ],
  B1: [
    { title: "Konditionaali", explanation: "Konditionaalissa verbi saa -isi- päätteen ja ilmaisee mahdollisuutta tai kohteliaisuutta.", examples: [{ target: "Haluaisin kahvia.", meaning: "I would like coffee." }, { target: "Jos voisin, tulisin.", meaning: "If I could, I would come." }] },
    { title: "Passiivi", explanation: "Passiivilla ilmaistaan tuntematonta tekijää tai yleispätevyyttä.", examples: [{ target: "Tässä puhutaan suomea.", meaning: "Finnish is spoken here." }, { target: "Rakennetaan uutta siltaa.", meaning: "A new bridge is being built." }] },
    { title: "Virallinen ja puhekielinen", explanation: "Suomessa on eroa virallisessa ja arkisessa tyylissä.", examples: [{ target: "Ole hyvä / No okei.", meaning: "formal vs informal okay" }, { target: "Haluaisin / Haluun", meaning: "I would like / I want (colloquial)" }] },
    { title: "Sivulauseet", explanation: "Sivulauseissa verbi voi olla lopussa.", examples: [{ target: "Tiedän, että hän tulee.", meaning: "I know that he is coming." }, { target: "Kun sataa, jään kotiin.", meaning: "When it rains, I stay home." }] },
    { title: "Partitiivi ja akkusatiivi", explanation: "Täydellinen objekti on akkusatiivissa, epätäydellinen partitiivissa.", examples: [{ target: "Luen kirjan.", meaning: "I read the (whole) book." }, { target: "Luen kirjaa.", meaning: "I am reading a book." }] },
    { title: "Kerronta", explanation: "Kerronnassa alkuperäinen aikamuoto säilyy suomessa suoraan kerrontaan.", examples: [{ target: "Hän sanoi, että hän tulee.", meaning: "He said that he is coming." }, { target: "Kysyin, missä hän oli.", meaning: "I asked where he was." }] },
  ],
  B2: [
    { title: "Verbirektiot", explanation: "Jotkut verbit vaativat tietyn sijamuodon.", examples: [{ target: "Olen kiinnostunut musiikista.", meaning: "I am interested in music." }, { target: "Hän on riippuvainen kahvista.", meaning: "He is dependent on coffee." }] },
    { title: "Tyyli ja rekisteri", explanation: "Tekstin tyyli vaihtelee arkisesta akateemiseen.", examples: [{ target: "Moi! / Hyvä lukija,", meaning: "informal vs formal greeting" }, { target: "Mä tykkään / pidän", meaning: "I like (colloquial vs formal)" }] },
    { title: "Abstrektit substantiivilausekkeet", explanation: "Abstrakteja käsitteitä muodostetaan nominien avulla.", examples: [{ target: "tiedon käsittely", meaning: "processing of information" }, { target: "yhteiskunnallinen kehitys", meaning: "social development" }] },
    { title: "Idiomit", explanation: "Idiomit ovat kiinteitä ilmaisuja, joita ei ymmärrä sanasta sanaan.", examples: [{ target: "Olla hukassa", meaning: "to be lost" }, { target: "Pannaan nokat yhteen.", meaning: "Let's put our heads together." }] },
    { title: "Lauseenjäsenyys", explanation: "Lauseosien järjestystä voidaan vaihtaa korostukseen.", examples: [{ target: "Eilen näin hänet.", meaning: "Yesterday I saw him." }, { target: "Hänet näin eilen.", meaning: "Him I saw yesterday." }] },
    { title: "Hienovarainen kieltäminen", explanation: "Kohteliaassa kielessä kieltäminen voi olla epäsuoraa.", examples: [{ target: "Ehkä parempi niin.", meaning: "Maybe it's better that way." }, { target: "En ihan tiedä.", meaning: "I'm not quite sure (polite no)." }] },
  ],
  C1: [
    { title: "Akateeminen tyyli", explanation: "Akateemisessa tekstissä käytetään passiivia ja nominalisointeja.", examples: [{ target: "Tutkimuksessa tarkastellaan ilmiötä.", meaning: "The study examines the phenomenon." }, { target: "Voidaan todeta, että...", meaning: "It can be stated that..." }] },
    { title: "Modaalisuus", explanation: "Puhujan asennetta ilmaistaan modaalisilla apuverbeillä ja partikkeleilla.", examples: [{ target: "Se voisi olla mahdollista.", meaning: "That could be possible." }, { target: "Täytyy myöntää, että...", meaning: "One must admit that..." }] },
    { title: "Monimutkaiset sivulauseet", explanation: "Eri sivulauseita yhdistellään tarkkaan.", examples: [{ target: "Vaikka satoi, lähdimme ulos.", meaning: "Although it was raining, we went out." }, { target: "Mikäli mahdollista, tulen.", meaning: "If possible, I will come." }] },
    { title: "Implikaatio", explanation: "Suomen kielessäkin voi merkitys olla pinnan alla.", examples: [{ target: "Onhan siellä lämmin?", meaning: "Is it warm there? (implies concern)" }, { target: "Se oli mielenkiintoinen esitys.", meaning: "That was an interesting presentation. (possibly ironic)" }] },
    { title: "Retoriikka", explanation: "Retoriikassa käytetään kysymyksiä ja toistoa vaikuttavuuteen.", examples: [{ target: "Entä jos emme tekisi niin?", meaning: "What if we didn't do that?" }, { target: "Tärkeintä on ymmärtää, tärkeintä on toimia.", meaning: "The most important thing is to understand, the most important thing is to act." }] },
    { title: "Lähes natiivi sujuvuus", explanation: "Sujuva käyttö vaatii idiomaattisia valintoja ja rytmiä.", examples: [{ target: "Joo-o, kai se niin on.", meaning: "Yeah, I guess so." }, { target: "Ei se mitään.", meaning: "No problem / it's nothing." }] },
  ],
  C2: [
    { title: "Tarkkuus", explanation: "C2-käyttäjä valitsee sanoja äärimmäisen tarkasti.", examples: [{ target: "Ei vain hyvä, vaan erinomainen.", meaning: "Not just good, but excellent." }, { target: "Hänen analyysinsa oli läpitunkeva.", meaning: "His analysis was penetrating." }] },
    { title: "Murre", explanation: "Murretuntemus auttaa ymmärtämään identiteettiä ja kulttuuria.", examples: [{ target: "mä oon / minä olen", meaning: "colloquial I am / standard I am" }, { target: "miten sie voit?", meaning: "regional 'how are you?'" }] },
    { title: "Tyylinvaihtelu", explanation: "Sama asia voidaan sanoa monella tyylillä.", examples: [{ target: "Mitkä ongelmat? / Kerro tarkemmin.", meaning: "formal vs informal" }, { target: "Asia on niin, että...", meaning: "The thing is that..." }] },
    { title: "Käännösvivahteet", explanation: "Kääntäminen vaatii kulttuurien välistä hienotuntoisuutta.", examples: [{ target: "suora käännös vs. vapaampi tulkinta", meaning: "literal translation vs. freer interpretation" }, { target: "kielenparsi", meaning: "the feel of the language" }] },
    { title: "Akateeminen diskurssi", explanation: "Akateemisessa keskustelussa argumentoidaan ja viitataan.", examples: [{ target: "Edellä mainittu viittaa siihen, että...", meaning: "The above-mentioned suggests that..." }, { target: "Tämä tukee näkemystä, jonka mukaan...", meaning: "This supports the view that..." }] },
    { title: "Mestaruus", explanation: "Kielen hallinta tarkoittaa myös kulttuurisen kontekstin hallintaa.", examples: [{ target: "Hän puhuu suomea kuin runoilija.", meaning: "He speaks Finnish like a poet." }, { target: "Sanat eivät riitä kuvaamaan.", meaning: "Words are not enough to describe." }] },
  ],
};

function fiUnit(seed: Omit<UnitSeed, "id"> & { id: string }): UnitSeed {
  return seed;
}

const FINNISH_LEVELS: LevelSeed[] = [
  {
    cefr: "A0",
    title: "A0: Perusteet",
    description: "Opi tervehtimään, esittäytymään ja kertomaan perustiedot.",
    pronunciationTips: FINNISH_PRONUNCIATION.A0,
    grammar: FINNISH_GRAMMAR.A0,
    units: [
      // manual first unit, replaced later
      {
        id: "u1",
        title: "Tervehdykset ja esittelyt",
        description: "Sano hei ja esittäydy.",
        words: [],
        phrases: [],
        dialogue: [],
        reading: { title: "", text: "" },
      },
      {
        id: "u2",
        title: "Numerot ja aika",
        description: "Laske numeroita ja kerro aikaa.",
        words: [
          { word: "neljä", translation: "four", pos: "numeral", example: "Minulla on neljä omenaa.", exampleTranslation: "I have four apples." },
          { word: "viisi", translation: "five", pos: "numeral", example: "Viisi kissaa nukkuu.", exampleTranslation: "Five cats are sleeping." },
          { word: "kuusi", translation: "six", pos: "numeral", example: "Kello on kuusi.", exampleTranslation: "It is six o'clock." },
          { word: "aamu", translation: "morning", pos: "noun", example: "Aamu on kaunis.", exampleTranslation: "The morning is beautiful." },
          { word: "päivä", translation: "day", pos: "noun", example: "Tämä on hyvä päivä.", exampleTranslation: "This is a good day." },
          { word: "ilta", translation: "evening", pos: "noun", example: "Ilta on rauhallinen.", exampleTranslation: "The evening is peaceful." },
          { word: "nyt", translation: "now", pos: "adverb", example: "Tule nyt!", exampleTranslation: "Come now!" },
        ],
        phrases: [
          { phrase: "Mitä kello on?", translation: "What time is it?" },
          { phrase: "Kello on viisi.", translation: "It is five o'clock." },
          { phrase: "Minulla on kiire.", translation: "I am in a hurry." },
        ],
        dialogue: [
          { speaker: "A", text: "Mitä kello on?", translation: "What time is it?" },
          { speaker: "B", text: "Kello on kuusi.", translation: "It is six o'clock." },
          { speaker: "A", text: "Kiitos! Minulla on kiire.", translation: "Thanks! I am in a hurry." },
          { speaker: "B", text: "Nähdään illalla!", translation: "See you in the evening!" },
        ],
        reading: {
          title: "Päiväni",
          text: "Aamu alkaa seitsemältä. Syön aamiaista ja juon kahvia. Kello on kahdeksan. Menen kouluun. Illalla rentoudun kotona.",
          translation: "My day starts at seven. I eat breakfast and drink coffee. It is eight o'clock. I go to school. In the evening I relax at home.",
        },
      },
      {
        id: "u3",
        title: "Perhe ja ihmiset",
        description: "Opi perhesanoja ja kuvailemaan ihmisiä.",
        words: [
          { word: "perhe", translation: "family", pos: "noun", example: "Minun perheeni on suuri.", exampleTranslation: "My family is big." },
          { word: "äiti", translation: "mother", pos: "noun", example: "Äiti laittaa ruokaa.", exampleTranslation: "Mother cooks food." },
          { word: "isä", translation: "father", pos: "noun", example: "Isä lukee kirjaa.", exampleTranslation: "Father reads a book." },
          { word: "sisko", translation: "sister", pos: "noun", example: "Sisko laulaa kauniisti.", exampleTranslation: "Sister sings beautifully." },
          { word: "veli", translation: "brother", pos: "noun", example: "Veli pelaa jalkapalloa.", exampleTranslation: "Brother plays football." },
          { word: "ystävä", translation: "friend", pos: "noun", example: "Hän on paras ystäväni.", exampleTranslation: "He is my best friend." },
          { word: "lapsi", translation: "child", pos: "noun", example: "Lapsi leikkii puistossa.", exampleTranslation: "The child plays in the park." },
        ],
        phrases: [
          { phrase: "Tämä on minun perheeni.", translation: "This is my family." },
          { phrase: "Hän on minun ystäväni.", translation: "He is my friend." },
          { phrase: "Perhe on tärkeä.", translation: "Family is important." },
        ],
        dialogue: [
          { speaker: "A", text: "Kuka tämä on?", translation: "Who is this?" },
          { speaker: "B", text: "Tämä on minun siskoni.", translation: "This is my sister." },
          { speaker: "A", text: "Hän on iloinen.", translation: "She is cheerful." },
          { speaker: "B", text: "Kyllä, hän on paras ystäväni.", translation: "Yes, she is my best friend." },
        ],
        reading: {
          title: "Minun perhe",
          text: "Minun perheessä on viisi ihmistä: äiti, isä, kaksi veljeä ja minä. Me asumme isossa talossa. Viikonloppuna pelaamme yhdessä lautapelejä.",
          translation: "There are five people in my family: mother, father, two brothers and me. We live in a big house. On the weekend we play board games together.",
        },
      },
    ],
  },
  {
    cefr: "A1",
    title: "A1: Arkipäivä",
    description: "Kuvaile päivääsi, kotiasi ja vapaa-aikaasi.",
    pronunciationTips: FINNISH_PRONUNCIATION.A1,
    grammar: FINNISH_GRAMMAR.A1,
    units: [
      {
        id: "u1",
        title: "Päivärytmi ja koti",
        description: "Puhu päivittäisistä toiminnoista ja kodista.",
        words: [
          { word: "herätä", translation: "wake up", pos: "verb", example: "Herään aikaisin.", exampleTranslation: "I wake up early." },
          { word: "syödä", translation: "eat", pos: "verb", example: "Syön aamiaista.", exampleTranslation: "I eat breakfast." },
          { word: "juoda", translation: "drink", pos: "verb", example: "Juon maitoa.", exampleTranslation: "I drink milk." },
          { word: "talo", translation: "house", pos: "noun", example: "Meidän talo on vanha.", exampleTranslation: "Our house is old." },
          { word: "huone", translation: "room", pos: "noun", example: "Olohuone on iso.", exampleTranslation: "The living room is big." },
          { word: "keittiö", translation: "kitchen", pos: "noun", example: "Keittiössä on valoisaa.", exampleTranslation: "The kitchen is bright." },
          { word: "sänky", translation: "bed", pos: "noun", example: "Sänky on mukava.", exampleTranslation: "The bed is comfortable." },
          { word: "peili", translation: "mirror", pos: "noun", example: "Peili on kylpyhuoneessa.", exampleTranslation: "The mirror is in the bathroom." },
        ],
        phrases: [
          { phrase: "Herään seitsemältä.", translation: "I wake up at seven." },
          { phrase: "Olohuone on tässä.", translation: "The living room is here." },
          { phrase: "Keittiö on puhdas.", translation: "The kitchen is clean." },
        ],
        dialogue: [
          { speaker: "A", text: "Milloin heräät?", translation: "When do you wake up?" },
          { speaker: "B", text: "Herään seitsemältä ja syön aamiaista.", translation: "I wake up at seven and eat breakfast." },
          { speaker: "A", text: "Minkälainen kotisi on?", translation: "What is your home like?" },
          { speaker: "B", text: "Se on pieni mutta kodikas.", translation: "It is small but cozy." },
        ],
        reading: {
          title: "Aamupäivä",
          text: "Joka aamu herään kuudelta. Keitän kahvia ja syön leipää. Sen jälkeen pesen kasvot ja lähden töihin. Illalla pidän olohuoneessa ja luen kirjaa.",
          translation: "Every morning I wake up at six. I make coffee and eat bread. After that I wash my face and leave for work. In the evening I relax in the living room and read a book.",
        },
      },
      {
        id: "u2",
        title: "Liikenne ja paikat",
        description: "Opi liikennevälineitä ja paikkoja.",
        words: [
          { word: "bussi", translation: "bus", pos: "noun", example: "Bussi tulee viiden minuutin kuluttua.", exampleTranslation: "The bus comes in five minutes." },
          { word: "juna", translation: "train", pos: "noun", example: "Juna lähtee asemalta.", exampleTranslation: "The train leaves from the station." },
          { word: "auto", translation: "car", pos: "noun", example: "Auto on punainen.", exampleTranslation: "The car is red." },
          { word: "tie", translation: "road", pos: "noun", example: "Tie on pitkä.", exampleTranslation: "The road is long." },
          { word: "koulu", translation: "school", pos: "noun", example: "Koulu on lähellä.", exampleTranslation: "The school is nearby." },
          { word: "kauppa", translation: "shop", pos: "noun", example: "Kauppa on auki.", exampleTranslation: "The shop is open." },
          { word: "sairaala", translation: "hospital", pos: "noun", example: "Sairaala on keskustassa.", exampleTranslation: "The hospital is in the city centre." },
          { word: "pankki", translation: "bank", pos: "noun", example: "Pankki on suuri rakennus.", exampleTranslation: "The bank is a big building." },
        ],
        phrases: [
          { phrase: "Missä on bussipysäkki?", translation: "Where is the bus stop?" },
          { phrase: "Menen bussilla töihin.", translation: "I go to work by bus." },
          { phrase: "Koulu on tuolla.", translation: "The school is over there." },
        ],
        dialogue: [
          { speaker: "A", text: "Anteeksi, missä on pankki?", translation: "Excuse me, where is the bank?" },
          { speaker: "B", text: "Pankki on tuolla, koulun vieressä.", translation: "The bank is over there, next to the school." },
          { speaker: "A", text: "Kiitos! Menenkö bussilla?", translation: "Thanks! Do I go by bus?" },
          { speaker: "B", text: "Ei, se on lähellä. Voit kävellä.", translation: "No, it is nearby. You can walk." },
        ],
        reading: {
          title: "Kaupungissa",
          text: "Minä asun pienessä kaupungissa. Kouluni on keskustassa. Aamulla menen bussilla kouluun. Matka kestää kymmenen minuuttia. Iltapäivällä käyn kaupassa.",
          translation: "I live in a small town. My school is in the city centre. In the morning I take the bus to school. The journey takes ten minutes. In the afternoon I go to the shop.",
        },
      },
      {
        id: "u3",
        title: "Koulu ja työ",
        description: "Opiskele ja keskustele työstä ja koulusta.",
        words: [
          { word: "opettaja", translation: "teacher", pos: "noun", example: "Opettaja selittää läksyt.", exampleTranslation: "The teacher explains the homework." },
          { word: "opiskelija", translation: "student", pos: "noun", example: "Opiskelija lukee kirjastossa.", exampleTranslation: "The student reads in the library." },
          { word: "lääkäri", translation: "doctor", pos: "noun", example: "Lääkäri auttaa potilasta.", exampleTranslation: "The doctor helps the patient." },
          { word: "kokki", translation: "cook", pos: "noun", example: "Kokki valmistaa päivällistä.", exampleTranslation: "The cook prepares dinner." },
          { word: "kirjasto", translation: "library", pos: "noun", example: "Kirjasto on hiljainen.", exampleTranslation: "The library is quiet." },
          { word: "toimisto", translation: "office", pos: "noun", example: "Toimisto on kolmannessa kerroksessa.", exampleTranslation: "The office is on the third floor." },
          { word: "yliopisto", translation: "university", pos: "noun", example: "Yliopisto on suuri.", exampleTranslation: "The university is big." },
          { word: "työkaveri", translation: "colleague", pos: "noun", example: "Työkaveri on ystävällinen.", exampleTranslation: "The colleague is friendly." },
        ],
        phrases: [
          { phrase: "Mitä teet?", translation: "What do you do?" },
          { phrase: "Olen opiskelija.", translation: "I am a student." },
          { phrase: "Työkaverini on mukava.", translation: "My colleague is nice." },
        ],
        dialogue: [
          { speaker: "A", text: "Mitä sinä teet?", translation: "What do you do?" },
          { speaker: "B", text: "Olen opettaja. Työskentelen yliopistolla.", translation: "I am a teacher. I work at the university." },
          { speaker: "A", text: "Onko työsi vaikea?", translation: "Is your work difficult?" },
          { speaker: "B", text: "Joskus, mutta työkaverit ovat hyviä.", translation: "Sometimes, but the colleagues are good." },
        ],
        reading: {
          title: "Koulussa",
          text: "Minä olen opiskelija. Käyn koulua joka arkipäivä. Kirjasto on suosikkipaikkani. Siellä voi lukea ja opiskella rauhassa. Tulevaisuudessa haluan olla lääkäri.",
          translation: "I am a student. I go to school every weekday. The library is my favourite place. There you can read and study in peace. In the future I want to be a doctor.",
        },
      },
    ],
  },
  {
    cefr: "A2",
    title: "A2: Käytännön viestintä",
    description: "Selviydy arkipäivän tilanteista ja kerro kokemuksista.",
    pronunciationTips: FINNISH_PRONUNCIATION.A2,
    grammar: FINNISH_GRAMMAR.A2,
    units: [
      {
        id: "u1",
        title: "Matkustaminen ja hotellit",
        description: "Varaa huone ja kysy tieohjeita.",
        words: [
          { word: "hotelli", translation: "hotel", pos: "noun", example: "Hotelli on kallis.", exampleTranslation: "The hotel is expensive." },
          { word: "huone", translation: "room", pos: "noun", example: "Haluan yhden hengen huoneen.", exampleTranslation: "I want a single room." },
          { word: "varaus", translation: "reservation", pos: "noun", example: "Varaus on tehty.", exampleTranslation: "The reservation is made." },
          { word: "lentokenttä", translation: "airport", pos: "noun", example: "Lentokenttä on kaukana.", exampleTranslation: "The airport is far away." },
          { word: "passi", translation: "passport", pos: "noun", example: "Passi on laukussa.", exampleTranslation: "The passport is in the bag." },
          { word: "lippu", translation: "ticket", pos: "noun", example: "Lippu oli halpa.", exampleTranslation: "The ticket was cheap." },
          { word: "matkustaa", translation: "travel", pos: "verb", example: "Haluan matkustaa pohjoiseen.", exampleTranslation: "I want to travel north." },
        ],
        phrases: [
          { phrase: "Minulla on varaus.", translation: "I have a reservation." },
          { phrase: "Onko teitä huoneita vapaa?", translation: "Do you have rooms available?" },
          { phrase: "Missä on lentokenttä?", translation: "Where is the airport?" },
        ],
        dialogue: [
          { speaker: "A", text: "Haluaisin huoneen kahdelle yöksi.", translation: "I would like a room for two nights." },
          { speaker: "B", text: "Onko teillä varaus?", translation: "Do you have a reservation?" },
          { speaker: "A", text: "Ei, onko teillä huoneita vapaa?", translation: "No, do you have rooms available?" },
          { speaker: "B", text: "Kyllä, kolmannessa kerroksessa on vapaa huone.", translation: "Yes, there is a free room on the third floor." },
        ],
        reading: {
          title: "Matkasuunnitelma",
          text: "Kesällä aion matkustaa Suomeen. Lentolippu on jo ostettu. Aion yöpyä hotellissa Helsingin keskustassa. Toivottavasti sää on aurinkoinen.",
          translation: "In the summer I intend to travel to Finland. The flight ticket is already bought. I plan to stay at a hotel in the centre of Helsinki. Hopefully the weather is sunny.",
        },
      },
      {
        id: "u2",
        title: "Terveys ja hyvinvointi",
        description: "Kuvaile vaivoja ja kysy apua.",
        words: [
          { word: "päänsärky", translation: "headache", pos: "noun", example: "Minulla on päänsärky.", exampleTranslation: "I have a headache." },
          { word: "lääkäri", translation: "doctor", pos: "noun", example: "Lääkäri kuuntelee potilasta.", exampleTranslation: "The doctor listens to the patient." },
          { word: "apteekki", translation: "pharmacy", pos: "noun", example: "Apteekki on auki.", exampleTranslation: "The pharmacy is open." },
          { word: "flunssa", translation: "flu", pos: "noun", example: "Flunssa on ikävä.", exampleTranslation: "Flu is unpleasant." },
          { word: "yskä", translation: "cough", pos: "noun", example: "Minulla on kova yskä.", exampleTranslation: "I have a bad cough." },
          { word: "lämpö", translation: "temperature", pos: "noun", example: "Lämpö on korkea.", exampleTranslation: "The temperature is high." },
          { word: "resepti", translation: "prescription", pos: "noun", example: "Tarvitsen uuden reseptin.", exampleTranslation: "I need a new prescription." },
        ],
        phrases: [
          { phrase: "Minulla on kuumetta.", translation: "I have a fever." },
          { phrase: "Voitteko auttaa minua?", translation: "Can you help me?" },
          { phrase: "Minulla on päänsärky.", translation: "I have a headache." },
        ],
        dialogue: [
          { speaker: "A", text: "Minulla on päänsärky ja kuumetta.", translation: "I have a headache and a fever." },
          { speaker: "B", text: "Kuinka kauan olet ollut kipeänä?", translation: "How long have you been sick?" },
          { speaker: "A", text: "Kolme päivää. Tarvitsen lääkärin.", translation: "Three days. I need a doctor." },
          { speaker: "B", text: "Lääkäri kirjoittaa sinulle reseptin.", translation: "The doctor will write you a prescription." },
        ],
        reading: {
          title: "Terveyttä",
          text: "Talvella monet sairastavat flunssaa. Hyvä uni ja terveellinen ruoka auttavat. Jos lämpö nousee, kannattaa käydä lääkärissä. Apteekista saa lääkkeitä reseptillä.",
          translation: "In winter many people catch the flu. Good sleep and healthy food help. If the temperature rises, you should see a doctor. You can get medicines on prescription at the pharmacy.",
        },
      },
      {
        id: "u3",
        title: "Menneisyys ja tulevaisuus",
        description: "Kerro menneistä ja tulevista tapahtumista.",
        words: [
          { word: "eilen", translation: "yesterday", pos: "adverb", example: "Eilen oli kaunis ilma.", exampleTranslation: "Yesterday the weather was beautiful." },
          { word: "viime viikolla", translation: "last week", pos: "adverb", example: "Näin hänet viime viikolla.", exampleTranslation: "I saw him last week." },
          { word: "huomenna", translation: "tomorrow", pos: "adverb", example: "Lähden huomenna.", exampleTranslation: "I leave tomorrow." },
          { word: "ensi vuonna", translation: "next year", pos: "adverb", example: "Aloitan opinnot ensi vuonna.", exampleTranslation: "I start my studies next year." },
          { word: "ostaa", translation: "buy", pos: "verb", example: "Aion ostaa uuden takin.", exampleTranslation: "I intend to buy a new coat." },
          { word: "myydä", translation: "sell", pos: "verb", example: "Hän myy vanhaa pyöräänsä.", exampleTranslation: "He is selling his old bicycle." },
          { word: "matkustaa", translation: "travel", pos: "verb", example: "Haluan matkustaa Euroopassa.", exampleTranslation: "I want to travel in Europe." },
        ],
        phrases: [
          { phrase: "Mitä teit eilen?", translation: "What did you do yesterday?" },
          { phrase: "Aion lähteä huomenna.", translation: "I plan to leave tomorrow." },
          { phrase: "Viime viikolla oli hauskaa.", translation: "Last week was fun." },
        ],
        dialogue: [
          { speaker: "A", text: "Mitä teit eilen?", translation: "What did you do yesterday?" },
          { speaker: "B", text: "Kävin kaupassa ja ostin hedelmiä.", translation: "I went to the shop and bought fruit." },
          { speaker: "A", text: "Mitä aiot tehdä huomenna?", translation: "What do you plan to do tomorrow?" },
          { speaker: "B", text: "Aion matkustaa äitini luo.", translation: "I plan to travel to my mother's place." },
        ],
        reading: {
          title: "Viikonloppu",
          text: "Viime viikolla oli syntymäpäiväjuhlat. Ostin lahjan ja menin juhliin. Siellä näin vanhoja ystäviä. Ensi vuonna aion järjestää omat juhlat.",
          translation: "Last week there was a birthday party. I bought a gift and went to the party. There I saw old friends. Next year I plan to organise my own party.",
        },
      },
    ],
  },
  {
    cefr: "B1",
    title: "B1: Yhteiskunta",
    description: "Keskustele uutisista, teknologiasta ja ihmissuhteista.",
    pronunciationTips: FINNISH_PRONUNCIATION.B1,
    grammar: FINNISH_GRAMMAR.B1,
    units: [
      {
        id: "u1",
        title: "Media ja uutiset",
        description: "Lue ja kommentoi uutisia.",
        words: [
          { word: "uutiset", translation: "news", pos: "noun", example: "Uutiset alkoivat juuri.", exampleTranslation: "The news just started." },
          { word: "lehti", translation: "newspaper", pos: "noun", example: "Luen lehteä aamuisin.", exampleTranslation: "I read the newspaper in the mornings." },
          { word: "artikkeli", translation: "article", pos: "noun", example: "Artikkeli käsitteli ilmastoa.", exampleTranslation: "The article dealt with climate." },
          { word: "toimittaja", translation: "journalist", pos: "noun", example: "Toimittaja haastatteli ministereitä.", exampleTranslation: "The journalist interviewed ministers." },
          { word: "tapahtuma", translation: "event", pos: "noun", example: "Tapahtuma keräsi paljon ihmisiä.", exampleTranslation: "The event gathered many people." },
          { word: "hallitus", translation: "government", pos: "noun", example: "Hallitus esitti uuden lain.", exampleTranslation: "The government proposed a new law." },
          { word: "kansa", translation: "people", pos: "noun", example: "Kansa äänesti vaaleissa.", exampleTranslation: "The people voted in the election." },
        ],
        phrases: [
          { phrase: "Uutisissa sanottiin, että...", translation: "The news said that..." },
          { phrase: "Mielestäni tämä on tärkeä aihe.", translation: "I think this is an important topic." },
          { phrase: "Hallitus suunnittelee uudistusta.", translation: "The government is planning a reform." },
        ],
        dialogue: [
          { speaker: "A", text: "Oletko lukenut tämän artikkelin?", translation: "Have you read this article?" },
          { speaker: "B", text: "Joo, se käsitteli uusia lakeja.", translation: "Yes, it dealt with new laws." },
          { speaker: "A", text: "Mielestäni toimittaja oli hyvin objektiivinen.", translation: "I think the journalist was very objective." },
          { speaker: "B", text: "Olen samaa mieltä.", translation: "I agree." },
        ],
        reading: {
          title: "Aamun uutiset",
          text: "Eilen hallitus julkaisi suunnitelmansa terveysuudistuksesta. Lehden mukaan kansa on jakautunut mielipiteiltään. Monet asiantuntijat kannattavat muutosta, mutta jotkut pelkäävät kustannuksia. Tulevaisuus näyttää, miten uudistus toteutuu.",
          translation: "Yesterday the government published its plan for a health reform. According to the newspaper, the people are divided in their opinions. Many experts support the change, but some fear the costs. The future will show how the reform is implemented.",
        },
      },
      {
        id: "u2",
        title: "Ympäristö ja teknologia",
        description: "Keskustele kestävästä kehityksestä ja teknologiasta.",
        words: [
          { word: "ilmasto", translation: "climate", pos: "noun", example: "Ilmasto muuttuu nopeasti.", exampleTranslation: "The climate is changing rapidly." },
          { word: "luonto", translation: "nature", pos: "noun", example: "Luonto on tärkeä kaikille.", exampleTranslation: "Nature is important for everyone." },
          { word: "sähköauto", translation: "electric car", pos: "noun", example: "Sähköauto on hiljainen.", exampleTranslation: "An electric car is quiet." },
          { word: "aurinkoenergia", translation: "solar energy", pos: "noun", example: "Aurinkoenergia on puhdasta.", exampleTranslation: "Solar energy is clean." },
          { word: "jätteet", translation: "waste", pos: "noun", example: "Jätteet pitää kierrättää.", exampleTranslation: "Waste must be recycled." },
          { word: "kierrätys", translation: "recycling", pos: "noun", example: "Kierrätys auttaa ympäristöä.", exampleTranslation: "Recycling helps the environment." },
          { word: "teknologia", translation: "technology", pos: "noun", example: "Teknologia kehittyy jatkuvasti.", exampleTranslation: "Technology is constantly developing." },
        ],
        phrases: [
          { phrase: "Meidän täytyy suojella luontoa.", translation: "We must protect nature." },
          { phrase: "Aurinkoenergia on hyvä vaihtoehto.", translation: "Solar energy is a good alternative." },
          { phrase: "Kierrätys on tärkeää.", translation: "Recycling is important." },
        ],
        dialogue: [
          { speaker: "A", text: "Mitä mieltä olet sähköautoista?", translation: "What do you think about electric cars?" },
          { speaker: "B", text: "Ne ovat hyvä askel kohti puhtaampaa ilmastoa.", translation: "They are a good step towards a cleaner climate." },
          { speaker: "A", text: "Entä kierrätys?", translation: "What about recycling?" },
          { speaker: "B", text: "Jokainen meistä voi tehdä jotain ympäristön vuoksi.", translation: "Each of us can do something for the environment." },
        ],
        reading: {
          title: "Vihreä tulevaisuus",
          text: "Monet kaupungit panostavat nyt aurinkoenergiaan ja kierrätykseen. Sähköautot ovat yleistyneet teillä. Asiantuntijat sanovat, että pienet teot, kuten jätteiden lajittelu, auttavat ilmastoa. Teknologia voi olla osa ratkaisua.",
          translation: "Many cities are now investing in solar energy and recycling. Electric cars have become common on the roads. Experts say that small acts, like sorting waste, help the climate. Technology can be part of the solution.",
        },
      },
      {
        id: "u3",
        title: "Ihmissuhteet ja ura",
        description: "Keskustele työelämästä ja ihmissuhteista.",
        words: [
          { word: "suhde", translation: "relationship", pos: "noun", example: "Heidän suhde on vahva.", exampleTranslation: "Their relationship is strong." },
          { word: "ura", translation: "career", pos: "noun", example: "Hän rakentaa uraansa.", exampleTranslation: "She is building her career." },
          { word: "työhaastattelu", translation: "job interview", pos: "noun", example: "Työhaastattelu meni hyvin.", exampleTranslation: "The job interview went well." },
          { word: "pomo", translation: "boss", pos: "noun", example: "Pomo antoi uusia tehtäviä.", exampleTranslation: "The boss gave new tasks." },
          { word: "työkaveri", translation: "colleague", pos: "noun", example: "Työkaveri auttoi minua.", exampleTranslation: "The colleague helped me." },
          { word: "palkka", translation: "salary", pos: "noun", example: "Palkka maksetaan kerran kuussa.", exampleTranslation: "The salary is paid once a month." },
          { word: "etätyö", translation: "remote work", pos: "noun", example: "Etätyö on joustavaa.", exampleTranslation: "Remote work is flexible." },
        ],
        phrases: [
          { phrase: "Haen uutta työpaikkaa.", translation: "I am applying for a new job." },
          { phrase: "Työhaastattelu on huomenna.", translation: "The job interview is tomorrow." },
          { phrase: "Etätyö sopii minulle.", translation: "Remote work suits me." },
        ],
        dialogue: [
          { speaker: "A", text: "Miten työhaastattelusi meni?", translation: "How did your job interview go?" },
          { speaker: "B", text: "Mielestäni ihan hyvin. Pomo vaikutti ystävälliseltä.", translation: "I think quite well. The boss seemed friendly." },
          { speaker: "A", text: "Toivotko etätyötä?", translation: "Do you hope for remote work?" },
          { speaker: "B", text: "Kyllä, se sopii perheelleni paremmin.", translation: "Yes, it fits my family better." },
        ],
        reading: {
          title: "Ura ja perhe",
          text: "Monet ihmiset haluavat uran, jossa on myös joustavuutta. Etätyö on yleistynyt. Työhaastattelussa kannattaa kysyä työehdoista ja kulttuurista. Hyvä työkaveri voi tehdä työstä mielekkäämpää.",
          translation: "Many people want a career that also has flexibility. Remote work has become more common. In a job interview you should ask about working conditions and culture. A good colleague can make work more meaningful.",
        },
      },
    ],
  },
  {
    cefr: "B2",
    title: "B2: Monimutkaiset aiheet",
    description: "Käsittele kirjallisuutta, taloutta ja yhteiskuntaa.",
    pronunciationTips: FINNISH_PRONUNCIATION.B2,
    grammar: FINNISH_GRAMMAR.B2,
    units: [
      {
        id: "u1",
        title: "Kirjallisuus ja taide",
        description: "Analyseeraa kirjoja ja taideteoksia.",
        words: [
          { word: "romaani", translation: "novel", pos: "noun", example: "Romaani kertoi sodasta.", exampleTranslation: "The novel told about war." },
          { word: "runo", translation: "poem", pos: "noun", example: "Runo oli lyhyt mutta voimakas.", exampleTranslation: "The poem was short but powerful." },
          { word: "näytelmä", translation: "play", pos: "noun", example: "Näytelmä sai suosionosoituksia.", exampleTranslation: "The play received applause." },
          { word: "näyttely", translation: "exhibition", pos: "noun", example: "Näyttely oli museossa.", exampleTranslation: "The exhibition was at the museum." },
          { word: "kritiikki", translation: "critique", pos: "noun", example: "Kritiikki jakoi mielipiteitä.", exampleTranslation: "The critique divided opinions." },
          { word: "klassikko", translation: "classic", pos: "noun", example: "Tämä kirja on klassikko.", exampleTranslation: "This book is a classic." },
          { word: "sävellys", translation: "composition", pos: "noun", example: "Sävellys oli kaunis.", exampleTranslation: "The composition was beautiful." },
        ],
        phrases: [
          { phrase: "Teos kuvaa ihmisyyttä.", translation: "The work depicts humanity." },
          { phrase: "Kirjailija käyttää voimakasta kuvakieltä.", translation: "The author uses strong imagery." },
          { phrase: "Näytelmä herätti keskustelua.", translation: "The play sparked discussion." },
        ],
        dialogue: [
          { speaker: "A", text: "Oletko käynyt uudessa näyttelyssä?", translation: "Have you been to the new exhibition?" },
          { speaker: "B", text: "Kyllä, se yhdisti runoja ja maalauksia.", translation: "Yes, it combined poems and paintings." },
          { speaker: "A", text: "Mistä teos kertoi?", translation: "What was the work about?" },
          { speaker: "B", text: "Se käsitteli luonnon ja ihmisen suhdetta.", translation: "It dealt with the relationship between nature and humans." },
        ],
        reading: {
          title: "Klassikon uusi tulkinta",
          text: "Uusi näytelmä perustuu vanhaan romaaniin, mutta sen asetelma on nykyaikainen. Kritiikki kehui sen rohkeaa kuvakieltä ja vahvoja näyttelijäsuorituksia. Monet pitivät siitä, että teos herätti keskustelua perheestä ja menetyksestä.",
          translation: "A new play is based on an old novel, but its setting is modern. Critics praised its bold imagery and strong performances. Many liked that the work sparked discussion about family and loss.",
        },
      },
      {
        id: "u2",
        title: "Talous ja tiede",
        description: "Keskustele taloudesta ja tieteellisistä aiheista.",
        words: [
          { word: "markkinat", translation: "market", pos: "noun", example: "Markkinat ovat epävakaat.", exampleTranslation: "The markets are unstable." },
          { word: "inflaatio", translation: "inflation", pos: "noun", example: "Inflaatio vaikuttaa hintoihin.", exampleTranslation: "Inflation affects prices." },
          { word: "tutkimus", translation: "research", pos: "noun", example: "Tutkimus osoitti uuden löydön.", exampleTranslation: "The research showed a new finding." },
          { word: "teoria", translation: "theory", pos: "noun", example: "Teoria tarvitsee lisänäyttöä.", exampleTranslation: "The theory needs more evidence." },
          { word: "koe", translation: "experiment", pos: "noun", example: "Koe toistettiin kolme kertaa.", exampleTranslation: "The experiment was repeated three times." },
          { word: "hypoteesi", translation: "hypothesis", pos: "noun", example: "Hypoteesi osoittautui oikeaksi.", exampleTranslation: "The hypothesis turned out to be correct." },
          { word: "analyysi", translation: "analysis", pos: "noun", example: "Analyysi paljasti trendin.", exampleTranslation: "The analysis revealed a trend." },
        ],
        phrases: [
          { phrase: "Tutkimuksen mukaan...", translation: "According to the research..." },
          { phrase: "Inflaatio nousi viime kuussa.", translation: "Inflation rose last month." },
          { phrase: "Tämä vaatii lisätutkimusta.", translation: "This requires further research." },
        ],
        dialogue: [
          { speaker: "A", text: "Oletko nähnyt viimeisintä talousanalyysiä?", translation: "Have you seen the latest economic analysis?" },
          { speaker: "B", text: "Joo, inflaatio nousi taas.", translation: "Yes, inflation rose again." },
          { speaker: "A", text: "Mitä tiede sanoo ilmastonmuutoksesta?", translation: "What does science say about climate change?" },
          { speaker: "B", text: "Tutkimus on selvä: meidän täytyy vähentää päästöjä.", translation: "The research is clear: we must reduce emissions." },
        ],
        reading: {
          title: "Talous ja ympäristö",
          text: "Talouden ja ympäristön välillä on jännite. Markkinat kasvavat, mutta ilmasto lämpenee. Monet ekonomit uskovat, että kestävä kehitys voi olla myös kannattavaa. Tutkimus uusista energiamuodoista lisääntyy.",
          translation: "There is tension between the economy and the environment. Markets grow, but the climate is warming. Many economists believe that sustainable development can also be profitable. Research into new forms of energy is increasing.",
        },
      },
      {
        id: "u3",
        title: "Yhteiskunta ja etiikka",
        description: "Käsittele eettisiä ja yhteiskunnallisia kysymyksiä.",
        words: [
          { word: "oikeus", translation: "justice/right", pos: "noun", example: "Oikeus koskee kaikkia.", exampleTranslation: "Justice concerns everyone." },
          { word: "vapaus", translation: "freedom", pos: "noun", example: "Vapaus on tärkeä arvo.", exampleTranslation: "Freedom is an important value." },
          { word: "vastuu", translation: "responsibility", pos: "noun", example: "Vastuu kuuluu meille kaikille.", exampleTranslation: "Responsibility belongs to all of us." },
          { word: "demokratia", translation: "democracy", pos: "noun", example: "Demokratia vaatii osallistumista.", exampleTranslation: "Democracy requires participation." },
          { word: "tasa-arvo", translation: "equality", pos: "noun", example: "Tasa-arvo on yhteiskunnan perusta.", exampleTranslation: "Equality is the foundation of society." },
          { word: "ennakkoluulo", translation: "prejudice", pos: "noun", example: "Ennakkoluulo estää ymmärrystä.", exampleTranslation: "Prejudice prevents understanding." },
          { word: "arvot", translation: "values", pos: "noun", example: "Meidän arvot ohjaavat valintoja.", exampleTranslation: "Our values guide choices." },
        ],
        phrases: [
          { phrase: "Tasa-arvo on kaikkien etu.", translation: "Equality is in everyone's interest." },
          { phrase: "Meillä on vastuu tuleville sukupolville.", translation: "We have a responsibility to future generations." },
          { phrase: "Demokratia vaatii aktiivisia kansalaisia.", translation: "Democracy requires active citizens." },
        ],
        dialogue: [
          { speaker: "A", text: "Mikä on sinulle tärkein arvo?", translation: "What is the most important value to you?" },
          { speaker: "B", text: "Minulle tärkeintä on tasa-arvo.", translation: "For me the most important is equality." },
          { speaker: "A", text: "Miten voimme vähentää ennakkoluuloja?", translation: "How can we reduce prejudice?" },
          { speaker: "B", text: "Kuuntelemalla toisiamme ja jakamalla kokemuksia.", translation: "By listening to each other and sharing experiences." },
        ],
        reading: {
          title: "Eettiset kysymykset",
          text: "Yhteiskunnassa joudumme usein pohtimaan, mikä on oikein. Vapaus ja vastuu kulkevat käsi kädessä. Kun yksi saa enemmän vapautta, toinen voi kokea sen vastuun lisääntymisenä. Demokratia auttaa ratkaisemaan näitä jännitteitä rauhanomaisesti.",
          translation: "In society we often have to consider what is right. Freedom and responsibility go hand in hand. When one person gets more freedom, another may experience it as increased responsibility. Democracy helps resolve these tensions peacefully.",
        },
      },
    ],
  },
  {
    cefr: "C1",
    title: "C1: Edistynyt sujuvuus",
    description: "Käytä kieltä akateemisissa ja ammatillisissa konteksteissa.",
    pronunciationTips: FINNISH_PRONUNCIATION.C1,
    grammar: FINNISH_GRAMMAR.C1,
    units: [
      {
        id: "u1",
        title: "Akateeminen kirjoittaminen",
        description: "Opiskele akateemisen tekstin rakennetta.",
        words: [
          { word: "väitöskirja", translation: "doctoral dissertation", pos: "noun", example: "Väitöskirja käsitteli kielitiedettä.", exampleTranslation: "The dissertation dealt with linguistics." },
          { word: "julkaisu", translation: "publication", pos: "noun", example: "Julkaisu sai paljon huomiota.", exampleTranslation: "The publication received a lot of attention." },
          { word: "lähteet", translation: "sources", pos: "noun", example: "Lähteet on mainittu lopussa.", exampleTranslation: "Sources are listed at the end." },
          { word: "metodologia", translation: "methodology", pos: "noun", example: "Metodologia oli kokeellinen.", exampleTranslation: "The methodology was experimental." },
          { word: "teesi", translation: "thesis", pos: "noun", example: "Teorian teesi oli kiinnostava.", exampleTranslation: "The theory's thesis was interesting." },
          { word: "argumentti", translation: "argument", pos: "noun", example: "Argumentti perustui tutkimukseen.", exampleTranslation: "The argument was based on research." },
          { word: "viite", translation: "reference", pos: "noun", example: "Viite löytyy listasta.", exampleTranslation: "The reference is found in the list." },
        ],
        phrases: [
          { phrase: "Tämä tutkimus osoittaa, että...", translation: "This research shows that..." },
          { phrase: "On tärkeää huomata, että...", translation: "It is important to note that..." },
          { phrase: "Lähdeaineisto viittaa siihen, että...", translation: "The source material suggests that..." },
        ],
        dialogue: [
          { speaker: "A", text: "Milloin väitöskirjasi valmistuu?", translation: "When will your dissertation be finished?" },
          { speaker: "B", text: "Luulen, että ensi vuonna. Viimeistelen metodologiaa.", translation: "I think next year. I am finalising the methodology." },
          { speaker: "A", text: "Onko argumentti kunnossa?", translation: "Is the argument in order?" },
          { speaker: "B", text: "Kyllä, mutta tarvitsen vielä lisälähteitä.", translation: "Yes, but I still need additional sources." },
        ],
        reading: {
          title: "Tieteellinen teksti",
          text: "Akateeminen kirjoittaminen vaatii tarkkuutta ja läpinäkyvyyttä. Jokainen väite tarvitsee perusteen, ja lähteet on merkittävä huolellisesti. Hyvä teesi kiteyttää tutkimuskysymyksen ja ohjaa lukijaa eteenpäin.",
          translation: "Academic writing requires precision and transparency. Every claim needs a basis, and sources must be marked carefully. A good thesis summarises the research question and guides the reader forward.",
        },
      },
      {
        id: "u2",
        title: "Ammatillinen viestintä",
        description: "Kehitä neuvottelu- ja raportointitaitoja.",
        words: [
          { word: "neuvottelu", translation: "negotiation", pos: "noun", example: "Neuvottelu kesti kaksi tuntia.", exampleTranslation: "The negotiation lasted two hours." },
          { word: "sopimus", translation: "agreement", pos: "noun", example: "Sopimus allekirjoitettiin.", exampleTranslation: "The agreement was signed." },
          { word: "raportti", translation: "report", pos: "noun", example: "Raportti julkaistiin tänään.", exampleTranslation: "The report was published today." },
          { word: "strategia", translation: "strategy", pos: "noun", example: "Strategia uudistettiin.", exampleTranslation: "The strategy was renewed." },
          { word: "johtaja", translation: "manager", pos: "noun", example: "Johtaja esitti uuden vision.", exampleTranslation: "The manager presented the new vision." },
          { word: "osakas", translation: "partner", pos: "noun", example: "Osakas hyväksyi suunnitelman.", exampleTranslation: "The partner approved the plan." },
          { word: "etabloitua", translation: "establish oneself", pos: "verb", example: "Yritys etabloitui markkinoille.", exampleTranslation: "The company established itself on the market." },
        ],
        phrases: [
          { phrase: "Haluaisin ehdottaa kompromissia.", translation: "I would like to propose a compromise." },
          { phrase: "Raportin mukaan...", translation: "According to the report..." },
          { phrase: "Sopimus hyväksyttiin yksimielisesti.", translation: "The agreement was approved unanimously." },
        ],
        dialogue: [
          { speaker: "A", text: "Haluaisin ehdottaa uutta strategiaa.", translation: "I would like to propose a new strategy." },
          { speaker: "B", text: "Kuulen mielelläni perustelut.", translation: "I would gladly hear the reasoning." },
          { speaker: "A", text: "Raportin mukaan markkinat kasvavat nopeasti.", translation: "According to the report, the markets are growing rapidly." },
          { speaker: "B", text: "Olemme valmiita allekirjoittamaan sopimuksen.", translation: "We are ready to sign the agreement." },
        ],
        reading: {
          title: "Johtajuus",
          text: "Hyvä johtaja yhdistää vision ja kuuntelemisen. Neuvotteluissa täytyy löytää ratkaisu, jossa molemmat osapuolet voittavat. Raportit ja strategiat ovat vain työkaluja: lopulta ihmiset tekevät organisaatiosta menestyneen.",
          translation: "A good manager combines vision and listening. In negotiations one must find a solution where both parties win. Reports and strategies are only tools: ultimately people make an organisation successful.",
        },
      },
      {
        id: "u3",
        title: "Sävy ja kulttuuri",
        description: "Tunnista ironia, sarkasmi ja kulttuurisia vivahteita.",
        words: [
          { word: "ironia", translation: "irony", pos: "noun", example: "Hänen äänensä oli täynnä ironiaa.", exampleTranslation: "His voice was full of irony." },
          { word: "sarkasmi", translation: "sarcasm", pos: "noun", example: "Sarkasmi voi olla terävää.", exampleTranslation: "Sarcasm can be sharp." },
          { word: "idioomi", translation: "idiom", pos: "noun", example: "Tämä idioomi on vaikea kääntää.", exampleTranslation: "This idiom is difficult to translate." },
          { word: "vivahteikas", translation: "nuanced", pos: "adjective", example: "Teksti oli vivahteikas.", exampleTranslation: "The text was nuanced." },
          { word: "metafora", translation: "metaphor", pos: "noun", example: "Metafora teki tekstistä elävän.", exampleTranslation: "The metaphor made the text vivid." },
          { word: "alateksti", translation: "subtext", pos: "noun", example: "Alateksti oli tärkeämpi kuin sanat.", exampleTranslation: "The subtext was more important than the words." },
          { word: "sävy", translation: "tone", pos: "noun", example: "Sävy muutti viestin merkitystä.", exampleTranslation: "The tone changed the meaning of the message." },
        ],
        phrases: [
          { phrase: "Hänen sanojensa takana oli toinen merkitys.", translation: "There was another meaning behind his words." },
          { phrase: "Tekstin sävy oli leikkisä.", translation: "The tone of the text was playful." },
          { phrase: "Tämä metafora kuvaa elämää.", translation: "This metaphor depicts life." },
        ],
        dialogue: [
          { speaker: "A", text: "Mikä tämän runon sävy on?", translation: "What is the tone of this poem?" },
          { speaker: "B", text: "Se on haikea ja melankolinen.", translation: "It is wistful and melancholic." },
          { speaker: "A", text: "Onko siinä ironiaa?", translation: "Is there irony in it?" },
          { speaker: "B", text: "Hieman, mutta pääasiassa se on vilpitön.", translation: "A little, but mainly it is sincere." },
        ],
        reading: {
          title: "Kulttuurinen sävy",
          text: "Kielessä on aina enemmän kuin sanat. Sävy, alateksti ja metaforat kuljettavat kulttuurista tietoa. C1-tason oppijan täytyy oppia kuulemaan myös sen, mitä ei sanota suoraan.",
          translation: "In language there is always more than words. Tone, subtext and metaphors carry cultural knowledge. A C1-level learner must learn to hear also what is not said directly.",
        },
      },
    ],
  },
  {
    cefr: "C2",
    title: "C2: Mestaritaso",
    description: "Hallitse kieli natiivien tasoisesti.",
    pronunciationTips: FINNISH_PRONUNCIATION.C2,
    grammar: FINNISH_GRAMMAR.C2,
    units: [
      {
        id: "u1",
        title: "Kielen hienostuneisuus",
        description: "Käytä täsmällistä ja monikerroksista kieltä.",
        words: [
          { word: "monikerroksinen", translation: "multi-layered", pos: "adjective", example: "Hänen tarinansa oli monikerroksinen.", exampleTranslation: "His story was multi-layered." },
          { word: "konnotaatio", translation: "connotation", pos: "noun", example: "Sanalla on voimakas konnotaatio.", exampleTranslation: "The word has a strong connotation." },
          { word: "parafraasi", translation: "paraphrase", pos: "noun", example: "Parafraasi auttoi ymmärtämään tekstiä.", exampleTranslation: "The paraphrase helped understand the text." },
          { word: "pragmatiikka", translation: "pragmatics", pos: "noun", example: "Pragmatiikka selittää kontekstin vaikutusta.", exampleTranslation: "Pragmatics explains the effect of context." },
          { word: "tarkkuus", translation: "precision", pos: "noun", example: "Tarkkuus on tärkeää akateemisessa tekstissä.", exampleTranslation: "Precision is important in academic text." },
          { word: "sävyero", translation: "nuance", pos: "noun", example: "Sävyero oli vain natiivikuulijalle selvä.", exampleTranslation: "The nuance was clear only to a native listener." },
        ],
        phrases: [
          { phrase: "Sanan konnotaatio muuttaa koko lausetta.", translation: "The connotation of a word changes the whole sentence." },
          { phrase: "Tekstissä oli monikerroksinen merkitys.", translation: "The text had a multi-layered meaning." },
          { phrase: "Tarkkuus on hyve tässä asiayhteydessä.", translation: "Precision is a virtue in this context." },
        ],
        dialogue: [
          { speaker: "A", text: "Mikä tekee tästä tekstistä monikerroksisen?", translation: "What makes this text multi-layered?" },
          { speaker: "B", text: "Se käyttää metaforia ja avoimia kysymyksiä.", translation: "It uses metaphors and open questions." },
          { speaker: "A", text: "Mitä sävyeroja kuulet?", translation: "What nuances do you hear?" },
          { speaker: "B", text: "Melankoliaa ja pieni toivo sekaisin.", translation: "Melancholy and a little hope mixed together." },
        ],
        reading: {
          title: "Tarkkuus ja tunteet",
          text: "C2-tason kielenkäyttäjä hallitsee paitsi rakenteen myös tunteen. Yksikin sananvalinta voi muuttaa tekstin konnotaatiota. Siksi kirjoittaminen vaatii lukemista, kuuntelemista ja syvää kulttuurista ymmärrystä.",
          translation: "A C2-level user commands not only structure but also emotion. A single word choice can change the connotation of a text. That is why writing requires reading, listening and deep cultural understanding.",
        },
      },
      {
        id: "u2",
        title: "Erikoisalojen diskurssit",
        description: "Hallitse oikeudellista, lääketieteellistä ja teknistä kieltä.",
        words: [
          { word: "oikeudellinen", translation: "legal", pos: "adjective", example: "Oikeudellinen asiantuntija auttoi.", exampleTranslation: "A legal expert helped." },
          { word: "lääketieteellinen", translation: "medical", pos: "adjective", example: "Lääketieteellinen tutkimus edistyi.", exampleTranslation: "Medical research progressed." },
          { word: "tekninen", translation: "technical", pos: "adjective", example: "Tekninen virhe aiheutti ongelman.", exampleTranslation: "A technical error caused a problem." },
          { word: "terminologia", translation: "terminology", pos: "noun", example: "Terminologia on alakohtaista.", exampleTranslation: "Terminology is field-specific." },
          { word: "asiateksti", translation: "factual text", pos: "noun", example: "Asiateksti oli tiivis.", exampleTranslation: "The factual text was concise." },
          { word: "akateeminen", translation: "academic", pos: "adjective", example: "Akateeminen kieli on tiukkaa.", exampleTranslation: "Academic language is strict." },
        ],
        phrases: [
          { phrase: "Oikeudellisesti tilanne on monimutkainen.", translation: "Legally the situation is complex." },
          { phrase: "Lääketieteellinen diagnoosi vaatii lisätutkimuksia.", translation: "A medical diagnosis requires further examinations." },
          { phrase: "Tekninen termi täytyy määritellä.", translation: "The technical term must be defined." },
        ],
        dialogue: [
          { speaker: "A", text: "Voitko selittää tämän oikeudellisen termin?", translation: "Can you explain this legal term?" },
          { speaker: "B", text: "Se tarkoittaa sopimusvelvoitetta, joka koskee molempia osapuolia.", translation: "It means a contractual obligation that concerns both parties." },
          { speaker: "A", text: "Entä lääketieteellinen merkitys?", translation: "And the medical meaning?" },
          { speaker: "B", text: "Siinä yhteydessä sillä on eri käyttö.", translation: "In that context it has a different use." },
        ],
        reading: {
          title: "Asiatekstin haaste",
          text: "Asiateksti ei kerro tarinaa tunteilla vaan faktoilla. Tekninen terminologia, oikeudelliset kaavat ja lääketieteellinen sanasto vaativat tarkkaa lukemista. C2-tason osaaja ymmärtää, miten tekstiä tulkitaan eri aloilla.",
          translation: "Factual text does not tell a story with emotions but with facts. Technical terminology, legal formulas and medical vocabulary require careful reading. A C2-level expert understands how the text is interpreted in different fields.",
        },
      },
      {
        id: "u3",
        title: "Kulttuurinen sulautuminen",
        description: "Käsittele identiteettiä ja monikulttuurisuutta.",
        words: [
          { word: "identiteetti", translation: "identity", pos: "noun", example: "Identiteetti muodostuu monista osista.", exampleTranslation: "Identity is formed from many parts." },
          { word: "monikulttuurinen", translation: "multicultural", pos: "adjective", example: "Kaupunki on monikulttuurinen.", exampleTranslation: "The city is multicultural." },
          { word: "kotoutuminen", translation: "integration", pos: "noun", example: "Kotoutuminen vaatii aikaa.", exampleTranslation: "Integration requires time." },
          { word: "suvaitsevaisuus", translation: "tolerance", pos: "noun", example: "Suvaitsevaisuus on tärkeää yhteiskunnassa.", exampleTranslation: "Tolerance is important in society." },
          { word: "maahanmuutto", translation: "immigration", pos: "noun", example: "Maahanmuutto rikastuttaa kulttuuria.", exampleTranslation: "Immigration enriches culture." },
          { word: "kotimaa", translation: "home country", pos: "noun", example: "Kotimaa on aina osa minua.", exampleTranslation: "My home country is always part of me." },
          { word: "juuret", translation: "roots", pos: "noun", example: "Juuret voivat olla monessa maassa.", exampleTranslation: "Roots can be in many countries." },
        ],
        phrases: [
          { phrase: "Minulla on juuret kahdessa kulttuurissa.", translation: "I have roots in two cultures." },
          { phrase: "Monikulttuurisuus on voimavara.", translation: "Multiculturalism is a strength." },
          { phrase: "Identiteetti voi muuttua elämän aikana.", translation: "Identity can change during life." },
        ],
        dialogue: [
          { speaker: "A", text: "Miten kotoutuminen on sujunut?", translation: "How has integration gone?" },
          { speaker: "B", text: "Hyvin, vaikka välillä kaipaan kotimaatani.", translation: "Well, although sometimes I miss my home country." },
          { speaker: "A", text: "Koetko, että identiteettisi on muuttunut?", translation: "Do you feel that your identity has changed?" },
          { speaker: "B", text: "Kyllä, mutta juuret pysyvät minussa.", translation: "Yes, but the roots stay in me." },
        ],
        reading: {
          title: "Kulttuurien välissä",
          text: "Monikulttuurisessa yhteiskunnassa monet kantavat mukanaan useita identiteettejä. Maahanmuutto, kieli ja perhe muokkaavat sitä, keitä me olemme. Suvaitsevaisuus ei tarkoita, että kaikki ovat samanlaisia, vaan että erilaisuus on hyväksytty.",
          translation: "In a multicultural society many people carry multiple identities. Immigration, language and family shape who we are. Tolerance does not mean that everyone is the same, but that difference is accepted.",
        },
      },
    ],
  },
];

import { FINNISH_MANUAL_A0 } from "./curriculum-manual-a0";

export const FINNISH_PACK: LanguagePack = buildLanguagePack(
  "Finnish",
  "fi",
  ["en", "ar", "fi"],
  "🇫🇮",
  "Learn Finnish from scratch with original lessons built for translation-first reading.",
  FINNISH_LEVELS,
  FINNISH_MANUAL_A0
);
