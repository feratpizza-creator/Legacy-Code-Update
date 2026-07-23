// Lingolali curriculum data – complete CEFR A0-C2 content for English.
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
import { ADDITIONAL_EN_UNITS } from "./curriculum-en-more";

// ------------------------------------------------------------------------
// Helpers (mirrors curriculum-data.ts helpers to avoid circular imports)
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

function buildLevel(seed: LevelSeed, levelIndex: number, additionalUnits: UnitSeed[] = []): Level {
  const builtUnits = seed.units.map((u, i) => buildUnit(u, seed, levelIndex, i));
  const extraUnits = additionalUnits.map((u, i) => buildUnit(u, seed, levelIndex, seed.units.length + i));
  return {
    id: seed.cefr,
    cefr: seed.cefr,
    title: seed.title,
    description: seed.description,
    units: [...builtUnits, ...extraUnits],
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
  additionalUnits: Record<string, UnitSeed[]> = {},
  manualA0U1?: Unit
): LanguagePack {
  const builtLevels = levels.map((l, i) => buildLevel(l, i, additionalUnits[l.cefr]));
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
// English curriculum
// ------------------------------------------------------------------------

const ENGLISH_PRONUNCIATION: Record<string, string[]> = {
  A0: [
    "English vowels can be long or short; listen to the difference between 'ship' and 'sheep'.",
    "The letter 'r' is pronounced differently across accents; choose one and stay consistent.",
    "Final -e is usually silent, as in 'made' or 'hope'.",
    "The 'th' sound requires the tongue between the teeth.",
    "Stress the first syllable in most short words.",
    "Practice linking words in short phrases."
  ],
  A1: [
    "Question intonation rises at the end of yes/no questions.",
    "Past tense -ed has three pronunciations: /t/, /d/, and /d/.",
    "The 'a' in 'cat' is short and open.",
    "Weak forms like 'a' and 'the' are reduced in connected speech.",
    "Focus on word stress in two-syllable nouns.",
    "Link consonants to following vowels across word boundaries."
  ],
  A2: [
    "Learn to hear reduced forms like 'gonna' and 'wanna' in informal speech.",
    "Contrast similar vowels: 'look' vs 'Luke'.",
    "Sentence stress highlights important information.",
    "The letter combination 'gh' is silent in many words.",
    "Practice rhythm by clapping on stressed syllables.",
    "Intonation can change a statement into a question."
  ],
  B1: [
    "Use stress and intonation to express attitude.",
    "Connected speech deletes and links sounds in fast conversation.",
    "Modal verbs are often reduced: 'could've', 'should've'.",
    "Pitch falls at the end of statements and rises for questions.",
    "Emphatic stress can contrast old and new information.",
    "Regional accents vary vowel quality significantly."
  ],
  B2: [
    "Master both formal and informal registers through intonation.",
    "Longer sentences need clear stress groups.",
    "Idioms often have fixed stress patterns.",
    "Hesitation sounds like 'um' and 'uh' are natural.",
    "Reported speech keeps original rhythm in English.",
    "Academic words often have Latinate stress."
  ],
  C1: [
    "Academic lectures use frequent pausing and signposting stress.",
    "Subtle tone conveys irony, certainty, or doubt.",
    "Fast native speech includes assimilation and elision.",
    "Pronunciation clarity matters more than accent.",
    "Presentations benefit from deliberate pacing.",
    "Poetic texts may break normal stress for effect."
  ],
  C2: [
    "Near-native fluency includes natural prosody and rhythm.",
    "Dialect variation in vowels and consonants is recognizable.",
    "Rhetorical emphasis shifts stress for persuasion.",
    "Translation performance requires precise sound control.",
    "Subtle intonation carries social meaning.",
    "Mastery means adapting pronunciation to context."
  ],
};

const ENGLISH_GRAMMAR: Record<string, GrammarItem[]> = {
  A0: [
    { title: "The verb 'be'", explanation: "Use 'am', 'is', or 'are' to describe identity, state, or location.", examples: [{ target: "I am a student.", meaning: "identificación" }, { target: "She is here.", meaning: "estado/ubicación" }] },
    { title: "Articles a/an", explanation: "Use 'a' before consonant sounds and 'an' before vowel sounds.", examples: [{ target: "a book, an apple", meaning: "indefinite articles" }, { target: "I have an umbrella.", meaning: "vowel sound" }] },
    { title: "Word order", explanation: "Basic English word order is Subject + Verb + Object.", examples: [{ target: "I eat bread.", meaning: "SVO" }, { target: "She reads books.", meaning: "SVO" }] },
    { title: "Plural nouns", explanation: "Add -s or -es to make most nouns plural.", examples: [{ target: "one book, two books", meaning: "regular plural" }, { target: "a box, two boxes", meaning: "-es plural" }] },
    { title: "Demonstratives", explanation: "Use 'this' and 'that' for singular nouns; 'these' and 'those' for plural.", examples: [{ target: "This is my pen.", meaning: "cerca" }, { target: "Those are her friends.", meaning: "lejos, plural" }] },
    { title: "Numbers", explanation: "Numbers function as determiners before nouns.", examples: [{ target: "I have three sisters.", meaning: "cantidad" }, { target: "There are ten students.", meaning: "cantidad" }] },
  ],
  A1: [
    { title: "Simple present", explanation: "Use the simple present for habits and routines. Add -s for he/she/it.", examples: [{ target: "I work every day.", meaning: "rutina" }, { target: "She works in a hospital.", meaning: "tercera persona" }] },
    { title: "Present continuous", explanation: "Use am/is/are + verb-ing for actions happening now.", examples: [{ target: "I am reading.", meaning: "ahora" }, { target: "They are playing football.", meaning: "ahora" }] },
    { title: "Possessive adjectives", explanation: "Use my, your, his, her, its, our, their before nouns.", examples: [{ target: "This is my car.", meaning: "posesión" }, { target: "Their house is big.", meaning: "posesión" }] },
    { title: "Can/can't", explanation: "Use can for ability and can't for inability.", examples: [{ target: "I can swim.", meaning: "habilidad" }, { target: "He can't drive.", meaning: "incapacidad" }] },
    { title: "Questions with do/does", explanation: "Use do/does to form questions in the simple present.", examples: [{ target: "Do you like coffee?", meaning: "pregunta general" }, { target: "Does she live here?", meaning: "tercera persona" }] },
    { title: "There is / There are", explanation: "Use there is for singular and there are for plural.", examples: [{ target: "There is a book on the table.", meaning: "singular" }, { target: "There are many people.", meaning: "plural" }] },
  ],
  A2: [
    { title: "Past simple: regular verbs", explanation: "Add -ed to regular verbs for the past simple.", examples: [{ target: "I walked to school.", meaning: "pasado regular" }, { target: "She played tennis.", meaning: "pasado regular" }] },
    { title: "Past simple: irregular verbs", explanation: "Many common verbs have irregular past forms.", examples: [{ target: "I went to Rome.", meaning: "go -> went" }, { target: "He bought a new phone.", meaning: "buy -> bought" }] },
    { title: "Going to", explanation: "Use going to for plans and predictions.", examples: [{ target: "I am going to visit my grandmother.", meaning: "plan" }, { target: "It is going to rain.", meaning: "predicción" }] },
    { title: "Comparatives", explanation: "Add -er or use more to compare two things.", examples: [{ target: "She is taller than me.", meaning: "comparativo corto" }, { target: "This book is more interesting.", meaning: "comparativo largo" }] },
    { title: "Adverbs of frequency", explanation: "Adverbs like always, usually, sometimes, never describe how often.", examples: [{ target: "I usually drink tea.", meaning: "habitual" }, { target: "He never eats meat.", meaning: "nunca" }] },
    { title: "Countable/uncountable nouns", explanation: "Countable nouns can be plural; uncountable nouns usually cannot.", examples: [{ target: "two apples / some water", meaning: "contable/incontable" }, { target: "I need some advice.", meaning: "incontable" }] },
  ],
  B1: [
    { title: "Present perfect", explanation: "Use present perfect for experiences or unfinished time.", examples: [{ target: "I have visited Paris.", meaning: "experiencia" }, { target: "She has lived here since 2010.", meaning: "desde" }] },
    { title: "Past continuous", explanation: "Use was/were + verb-ing for actions in progress at a past moment.", examples: [{ target: "I was reading when he called.", meaning: "acción en progreso" }, { target: "They were walking home.", meaning: "progreso en el pasado" }] },
    { title: "First conditional", explanation: "Use if + present, will + verb for real possibilities.", examples: [{ target: "If it rains, I will stay home.", meaning: "condicional real" }, { target: "If you study, you will pass.", meaning: "posibilidad real" }] },
    { title: "Passive voice", explanation: "Use passive when the focus is on the action, not the agent.", examples: [{ target: "The cake was baked by Mary.", meaning: "pasiva" }, { target: "English is spoken worldwide.", meaning: "pasiva general" }] },
    { title: "Reported speech", explanation: "Shift tenses back when reporting what someone said.", examples: [{ target: "She said she was tired.", meaning: "estilo indirecto" }, { target: "He asked if I knew him.", meaning: "pregunta indirecta" }] },
    { title: "Phrasal verbs", explanation: "Phrasal verbs combine a verb and particle; meaning is often idiomatic.", examples: [{ target: "Please take off your shoes.", meaning: "remove" }, { target: "I look forward to meeting you.", meaning: "anticipate" }] },
  ],
  B2: [
    { title: "Second conditional", explanation: "Use if + past, would + verb for unreal or hypothetical situations.", examples: [{ target: "If I won the lottery, I would travel.", meaning: "hipotético" }, { target: "If she were here, she would help.", meaning: "irreal presente" }] },
    { title: "Third conditional", explanation: "Use if + past perfect, would have + past participle for past hypotheticals.", examples: [{ target: "If I had known, I would have called.", meaning: "pasado hipotético" }, { target: "She would have come if she had had time.", meaning: "arrepentimiento pasado" }] },
    { title: "Modal verbs of speculation", explanation: "Use must, might, can't for deduction and speculation.", examples: [{ target: "He must be tired.", meaning: "deducción" }, { target: "They might be late.", meaning: "posibilidad" }] },
    { title: "Inversion", explanation: "Invert subject and verb after negative adverbials for emphasis.", examples: [{ target: "Never have I seen such beauty.", meaning: "énfasis negativo" }, { target: "Rarely do we eat out.", meaning: "inversión" }] },
    { title: "Gerunds and infinitives", explanation: "Some verbs take gerunds, others take infinitives; some take both with different meanings.", examples: [{ target: "I stopped smoking.", meaning: "gerund" }, { target: "I stopped to smoke.", meaning: "infinitive purpose" }] },
    { title: "Cohesion", explanation: "Use linking words and reference to connect ideas across paragraphs.", examples: [{ target: "However, many disagree.", meaning: "contraste" }, { target: "This is due to several factors.", meaning: "causa" }] },
  ],
  C1: [
    { title: "Subtle modality", explanation: "Use modal-like expressions to soften or strengthen statements.", examples: [{ target: "It could be argued that...", meaning: "distancia" }, { target: "There is a tendency to...", meaning: "suavizado" }] },
    { title: "Nominalisation", explanation: "Turn verbs into nouns to create a more formal, academic style.", examples: [{ target: "The implementation of the policy", meaning: "sustantivización" }, { target: "There is a need for discussion.", meaning: "formal" }] },
    { title: "Complex conditionals", explanation: "Mix conditionals and use alternatives to if for nuanced meaning.", examples: [{ target: "Were I in your position, I would agree.", meaning: "inversión condicional" }, { target: "Should you need help, call us.", meaning: "condicional formal" }] },
    { title: "Discourse markers", explanation: "Use markers to guide the listener through complex arguments.", examples: [{ target: "On the one hand... on the other hand...", meaning: "balance" }, { target: "That said, the data is limited.", meaning: "concesión" }] },
    { title: "Hedging", explanation: "Hedge claims to sound academic and avoid overgeneralisation.", examples: [{ target: "It seems likely that...", meaning: "distancia epistémica" }, { target: "This may suggest...", meaning: "tentativa" }] },
    { title: "Cleft sentences", explanation: "Use clefts to foreground particular information.", examples: [{ target: "What I need is more time.", meaning: "énfasis" }, { target: "It was John who called.", meaning: "identificación" }] },
  ],
  C2: [
    { title: "Register shifts", explanation: "Move confidently between informal, professional, and literary registers.", examples: [{ target: "Yeah, sure / Certainly, I shall attend.", meaning: "registro" }, { target: "The dude was stoked.", meaning: "coloquial" }] },
    { title: "Archaisms and literary forms", explanation: "Recognise older or poetic forms used for effect.", examples: [{ target: "Thou shalt not pass.", meaning: "arcaísmo" }, { target: "Hither came the hero.", meaning: "poético" }] },
    { title: "Nuance and implication", explanation: "Convey layered meaning through choice of words and structure.", examples: [{ target: "I wouldn't mind a cup of tea.", meaning: "indirecta" }, { target: "If you say so.", meaning: "implicación" }] },
    { title: "Idiomatic mastery", explanation: "Use idioms naturally without sounding forced.", examples: [{ target: "Let's cut to the chase.", meaning: "ir al grano" }, { target: "It's a piece of cake.", meaning: "muy fácil" }] },
    { title: "Academic precision", explanation: "Choose exact terms and avoid redundancy in formal writing.", examples: [{ target: "The research indicates...", meaning: "precisión" }, { target: "A significant correlation was observed.", meaning: "formal" }] },
    { title: "Translation competence", explanation: "Preserve tone, register, and cultural references across languages.", examples: [{ target: "Lost in translation", meaning: "problema de traducción" }, { target: "Keep the spirit of the text.", meaning: "fidelidad" }] },
  ],
};

const ENGLISH_LEVELS: LevelSeed[] = [
  {
    cefr: "A0",
    title: "A0: Foundations",
    description: "Start with greetings, numbers, and simple phrases.",
    pronunciationTips: ENGLISH_PRONUNCIATION.A0,
    grammar: ENGLISH_GRAMMAR.A0,
    units: [
      {
        id: "u1",
        title: 'Greetings',
        description: 'Learn how to greet people and introduce yourself in English.',
        words: [
          { word: 'hello', translation: 'hola', pos: 'interjection', example: 'Hello, how are you?', exampleTranslation: 'Hello, how are you?' },
          { word: 'goodbye', translation: 'adiós', pos: 'interjection', example: 'Goodbye, see you tomorrow!', exampleTranslation: 'Goodbye, see you tomorrow!' },
          { word: 'please', translation: 'por favor', pos: 'adverb', example: 'Please sit down.', exampleTranslation: 'Please sit down.' },
          { word: 'thank you', translation: 'gracias', pos: 'phrase', example: 'Thank you very much.', exampleTranslation: 'Thank you very much.' },
          { word: 'yes', translation: 'sí', pos: 'adverb', example: 'Yes, I understand.', exampleTranslation: 'Yes, I understand.' },
          { word: 'no', translation: 'no', pos: 'adverb', example: 'No, thank you.', exampleTranslation: 'No, thank you.' },
          { word: 'name', translation: 'nombre', pos: 'noun', example: 'My name is Alex.', exampleTranslation: 'My name is Alex.' },
          { word: 'friend', translation: 'amigo', pos: 'noun', example: 'She is my friend.', exampleTranslation: 'She is my friend.' },
        ],
        phrases: [
          { phrase: 'Hello, my name is...', translation: 'Hola, mi nombre es...' },
          { phrase: 'Nice to meet you.', translation: 'Encantado de conocerte.' },
          { phrase: 'How are you?', translation: '¿Cómo estás?' },
        ],
        dialogue: [
          { speaker: 'A', text: 'Hello!', translation: '¡Hola!' },
          { speaker: 'B', text: 'Hi! My name is Sam.', translation: '¡Hola! Mi nombre es Sam.' },
          { speaker: 'A', text: 'Nice to meet you, Sam.', translation: 'Encantado de conocerte, Sam.' },
          { speaker: 'B', text: 'Nice to meet you too.', translation: 'Encantado de conocerte también.' },
        ],
        reading: { title: 'A New Friend', text: 'Hello! My name is Alex. I am from Canada. I am a student. I like music and books. I have one sister. She is a teacher. Nice to meet you!', translation: '¡Hola! Mi nombre es Alex. Soy de Canadá. Soy estudiante. Me gustan la música y los libros. Tengo una hermana. Ella es maestra. ¡Encantado de conocerte!' },
      },
      {
        id: "u2",
        title: 'Numbers',
        description: 'Count from zero to twenty and use numbers in everyday contexts.',
        words: [
          { word: 'one', translation: 'uno', pos: 'numeral', example: 'I have one brother.', exampleTranslation: 'I have one brother.' },
          { word: 'two', translation: 'dos', pos: 'numeral', example: 'She has two cats.', exampleTranslation: 'She has two cats.' },
          { word: 'three', translation: 'tres', pos: 'numeral', example: 'We need three apples.', exampleTranslation: 'We need three apples.' },
          { word: 'four', translation: 'cuatro', pos: 'numeral', example: 'There are four chairs.', exampleTranslation: 'There are four chairs.' },
          { word: 'five', translation: 'cinco', pos: 'numeral', example: 'I am five years old.', exampleTranslation: 'I am five years old.' },
          { word: 'six', translation: 'seis', pos: 'numeral', example: 'Six students are here.', exampleTranslation: 'Six students are here.' },
          { word: 'seven', translation: 'siete', pos: 'numeral', example: "It is seven o'clock.", exampleTranslation: "It is seven o'clock." },
          { word: 'eight', translation: 'ocho', pos: 'numeral', example: 'I slept eight hours.', exampleTranslation: 'I slept eight hours.' },
        ],
        phrases: [
          { phrase: 'How old are you?', translation: '¿Cuántos años tienes?' },
          { phrase: 'I am twenty years old.', translation: 'Tengo veinte años.' },
          { phrase: 'What time is it?', translation: '¿Qué hora es?' },
        ],
        dialogue: [
          { speaker: 'A', text: 'How many books do you have?', translation: '¿Cuántos libros tienes?' },
          { speaker: 'B', text: 'I have three books.', translation: 'Tengo tres libros.' },
          { speaker: 'A', text: 'How old are you?', translation: '¿Cuántos años tienes?' },
          { speaker: 'B', text: 'I am ten years old.', translation: 'Tengo diez años.' },
        ],
        reading: { title: 'At the Shop', text: 'I go to the shop. I buy one apple, two bananas, and three oranges. The total is five dollars. I say please and thank you. The shopkeeper smiles.', translation: 'Voy a la tienda. Compro una manzana, dos plátanos y tres naranjas. El total es cinco dólares. Digo por favor y gracias. El dependiente sonríe.' },
      },
      {
        id: "u3",
        title: 'Family',
        description: 'Talk about family members and describe simple relationships.',
        words: [
          { word: 'mother', translation: 'madre', pos: 'noun', example: 'My mother is kind.', exampleTranslation: 'My mother is kind.' },
          { word: 'father', translation: 'padre', pos: 'noun', example: 'His father works in a hospital.', exampleTranslation: 'His father works in a hospital.' },
          { word: 'sister', translation: 'hermana', pos: 'noun', example: 'My sister likes cats.', exampleTranslation: 'My sister likes cats.' },
          { word: 'brother', translation: 'hermano', pos: 'noun', example: 'Her brother is tall.', exampleTranslation: 'Her brother is tall.' },
          { word: 'family', translation: 'familia', pos: 'noun', example: 'My family is small.', exampleTranslation: 'My family is small.' },
          { word: 'baby', translation: 'bebé', pos: 'noun', example: 'The baby is sleeping.', exampleTranslation: 'The baby is sleeping.' },
        ],
        phrases: [
          { phrase: 'This is my mother.', translation: 'Esta es mi madre.' },
          { phrase: 'I have two brothers.', translation: 'Tengo dos hermanos.' },
          { phrase: 'My family is big.', translation: 'Mi familia es grande.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'Who is he?', translation: '¿Quién es él?' },
          { speaker: 'B', text: 'He is my brother.', translation: 'Él es mi hermano.' },
          { speaker: 'A', text: 'How old is he?', translation: '¿Cuántos años tiene él?' },
          { speaker: 'B', text: 'He is twelve.', translation: 'Él tiene doce.' },
        ],
        reading: { title: 'My Family', text: 'I have a mother, a father, one sister, and two brothers. We live in a small house. My mother is a cook. My father is a driver. We eat dinner together.', translation: 'Tengo una madre, un padre, una hermana y dos hermanos. Vivimos en una casa pequeña. Mi madre es cocinera. Mi padre es conductor. Cenamos juntos.' },
      },
    ],
  },
  {
    cefr: "A1",
    title: "A1: Everyday Life",
    description: "Describe daily life, home, food, and routines.",
    pronunciationTips: ENGLISH_PRONUNCIATION.A1,
    grammar: ENGLISH_GRAMMAR.A1,
    units: [
      {
        id: "u1",
        title: 'Daily Routine',
        description: 'Describe your typical day using simple present tense.',
        words: [
          { word: 'wake up', translation: 'despertarse', pos: 'verb', example: 'I wake up at seven.', exampleTranslation: 'I wake up at seven.' },
          { word: 'breakfast', translation: 'desayuno', pos: 'noun', example: 'I eat breakfast at eight.', exampleTranslation: 'I eat breakfast at eight.' },
          { word: 'work', translation: 'trabajo', pos: 'noun', example: 'I go to work by bus.', exampleTranslation: 'I go to work by bus.' },
          { word: 'school', translation: 'escuela', pos: 'noun', example: 'My school is near.', exampleTranslation: 'My school is near.' },
          { word: 'lunch', translation: 'almuerzo', pos: 'noun', example: 'Lunch is at noon.', exampleTranslation: 'Lunch is at noon.' },
          { word: 'dinner', translation: 'cena', pos: 'noun', example: 'We have dinner at seven.', exampleTranslation: 'We have dinner at seven.' },
          { word: 'sleep', translation: 'dormir', pos: 'verb', example: 'I sleep eight hours.', exampleTranslation: 'I sleep eight hours.' },
        ],
        phrases: [
          { phrase: 'I wake up early.', translation: 'Me despierto temprano.' },
          { phrase: 'I go to work.', translation: 'Voy al trabajo.' },
          { phrase: 'I go to bed late.', translation: 'Me acuesto tarde.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'What time do you wake up?', translation: '¿A qué hora te despiertas?' },
          { speaker: 'B', text: 'I wake up at six thirty.', translation: 'Me despierto a las seis y media.' },
          { speaker: 'A', text: 'Do you eat breakfast?', translation: '¿Desayunas?' },
          { speaker: 'B', text: 'Yes, I eat toast and drink tea.', translation: 'Sí, como tostadas y tomo té.' },
        ],
        reading: { title: 'A Day in My Life', text: 'Every morning I wake up at seven. I take a shower and eat breakfast. Then I go to work. I work from nine to five. In the evening, I cook dinner and read a book. I go to bed at eleven.', translation: 'Cada mañana me despierto a las siete. Me ducho y desayuno. Luego voy al trabajo. Trabajo de nueve a cinco. Por la tarde, cocino la cena y leo un libro. Me acuesto a las once.' },
      },
      {
        id: "u2",
        title: 'Home and Rooms',
        description: 'Talk about rooms, furniture, and where things are.',
        words: [
          { word: 'house', translation: 'casa', pos: 'noun', example: 'My house is small.', exampleTranslation: 'My house is small.' },
          { word: 'kitchen', translation: 'cocina', pos: 'noun', example: 'The kitchen is clean.', exampleTranslation: 'The kitchen is clean.' },
          { word: 'bathroom', translation: 'baño', pos: 'noun', example: 'The bathroom is upstairs.', exampleTranslation: 'The bathroom is upstairs.' },
          { word: 'bedroom', translation: 'dormitorio', pos: 'noun', example: 'My bedroom is blue.', exampleTranslation: 'My bedroom is blue.' },
          { word: 'table', translation: 'mesa', pos: 'noun', example: 'The table is in the kitchen.', exampleTranslation: 'The table is in the kitchen.' },
          { word: 'chair', translation: 'silla', pos: 'noun', example: 'This chair is old.', exampleTranslation: 'This chair is old.' },
          { word: 'garden', translation: 'jardín', pos: 'noun', example: 'The garden is beautiful.', exampleTranslation: 'The garden is beautiful.' },
        ],
        phrases: [
          { phrase: 'Where is the bathroom?', translation: '¿Dónde está el baño?' },
          { phrase: 'The kitchen is downstairs.', translation: 'La cocina está abajo.' },
          { phrase: 'My room is upstairs.', translation: 'Mi cuarto está arriba.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'Where is the table?', translation: '¿Dónde está la mesa?' },
          { speaker: 'B', text: 'It is in the kitchen.', translation: 'Está en la cocina.' },
          { speaker: 'A', text: 'Is the garden big?', translation: '¿El jardín es grande?' },
          { speaker: 'B', text: 'Yes, it is very big.', translation: 'Sí, es muy grande.' },
        ],
        reading: { title: 'Our New House', text: 'We live in a small house. It has two bedrooms, one bathroom, a kitchen, and a living room. There is a garden behind the house. My bedroom is upstairs, next to the bathroom.', translation: 'Vivimos en una casa pequeña. Tiene dos dormitorios, un baño, una cocina y una sala de estar. Hay un jardín detrás de la casa. Mi dormitorio está arriba, al lado del baño.' },
      },
      {
        id: "u3",
        title: 'Food and Drink',
        description: 'Order food, talk about meals, and express preferences.',
        words: [
          { word: 'water', translation: 'agua', pos: 'noun', example: 'I drink water.', exampleTranslation: 'I drink water.' },
          { word: 'coffee', translation: 'café', pos: 'noun', example: 'She likes coffee.', exampleTranslation: 'She likes coffee.' },
          { word: 'bread', translation: 'pan', pos: 'noun', example: 'I buy fresh bread.', exampleTranslation: 'I buy fresh bread.' },
          { word: 'fruit', translation: 'fruta', pos: 'noun', example: 'Fruit is healthy.', exampleTranslation: 'Fruit is healthy.' },
          { word: 'vegetable', translation: 'verdura', pos: 'noun', example: 'I eat vegetables every day.', exampleTranslation: 'I eat vegetables every day.' },
          { word: 'chicken', translation: 'pollo', pos: 'noun', example: 'The chicken is tasty.', exampleTranslation: 'The chicken is tasty.' },
          { word: 'rice', translation: 'arroz', pos: 'noun', example: 'We eat rice with fish.', exampleTranslation: 'We eat rice with fish.' },
        ],
        phrases: [
          { phrase: 'I would like some water.', translation: 'Me gustaría un poco de agua.' },
          { phrase: 'Do you like vegetables?', translation: '¿Te gustan las verduras?' },
          { phrase: 'The coffee is hot.', translation: 'El café está caliente.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'What would you like to drink?', translation: '¿Qué te gustaría beber?' },
          { speaker: 'B', text: 'I would like some tea, please.', translation: 'Me gustaría un poco de té, por favor.' },
          { speaker: 'A', text: 'Do you want sugar?', translation: '¿Quieres azúcar?' },
          { speaker: 'B', text: 'No, thank you.', translation: 'No, gracias.' },
        ],
        reading: { title: 'A Healthy Meal', text: 'For lunch, I eat rice, chicken, and vegetables. I drink water. I do not drink soda. My favourite fruit is an apple. I think healthy food gives me energy.', translation: 'Para el almuerzo, como arroz, pollo y verduras. Bebo agua. No bebo refrescos. Mi fruta favorita es la manzana. Creo que la comida saludable me da energía.' },
      },
    ],
  },
  {
    cefr: "A2",
    title: "A2: Practical Communication",
    description: "Talk about travel, health, shopping, and past events.",
    pronunciationTips: ENGLISH_PRONUNCIATION.A2,
    grammar: ENGLISH_GRAMMAR.A2,
    units: [
      {
        id: "u1",
        title: 'Travel Plans',
        description: 'Talk about past trips and future travel plans.',
        words: [
          { word: 'airport', translation: 'aeropuerto', pos: 'noun', example: 'The airport is far from the city.', exampleTranslation: 'The airport is far from the city.' },
          { word: 'ticket', translation: 'billete', pos: 'noun', example: 'I bought a train ticket.', exampleTranslation: 'I bought a train ticket.' },
          { word: 'hotel', translation: 'hotel', pos: 'noun', example: 'The hotel was comfortable.', exampleTranslation: 'The hotel was comfortable.' },
          { word: 'passport', translation: 'pasaporte', pos: 'noun', example: "Don't forget your passport.", exampleTranslation: "Don't forget your passport." },
          { word: 'suitcase', translation: 'maleta', pos: 'noun', example: 'My suitcase is heavy.', exampleTranslation: 'My suitcase is heavy.' },
          { word: 'flight', translation: 'vuelo', pos: 'noun', example: 'Our flight leaves at noon.', exampleTranslation: 'Our flight leaves at noon.' },
          { word: 'reservation', translation: 'reserva', pos: 'noun', example: 'I made a reservation online.', exampleTranslation: 'I made a reservation online.' },
        ],
        phrases: [
          { phrase: 'I travelled to Spain last year.', translation: 'Viajé a España el año pasado.' },
          { phrase: 'I am going to visit Italy.', translation: 'Voy a visitar Italia.' },
          { phrase: 'Did you book a hotel?', translation: '¿Reservaste hotel?' },
        ],
        dialogue: [
          { speaker: 'A', text: 'Where did you go last summer?', translation: '¿Adónde fuiste el verano pasado?' },
          { speaker: 'B', text: 'I went to Japan. It was amazing!', translation: 'Fui a Japón. ¡Fue increíble!' },
          { speaker: 'A', text: 'Did you take a plane?', translation: '¿Tomaste un avión?' },
          { speaker: 'B', text: 'Yes, the flight was long but comfortable.', translation: 'Sí, el vuelo fue largo pero cómodo.' },
        ],
        reading: { title: 'Planning a Trip', text: 'Next month, I am going to travel to Italy. I already bought my ticket and made a hotel reservation. I will visit Rome and Florence. I am going to take my camera and a small suitcase.', translation: 'El próximo mes, voy a viajar a Italia. Ya compré mi billete e hice una reserva de hotel. Visitaré Roma y Florencia. Voy a llevar mi cámara y una maleta pequeña.' },
      },
      {
        id: "u2",
        title: 'Health and Body',
        description: 'Describe symptoms, ask for help, and talk about health.',
        words: [
          { word: 'headache', translation: 'dolor de cabeza', pos: 'noun', example: 'I have a headache.', exampleTranslation: 'I have a headache.' },
          { word: 'stomach', translation: 'estómago', pos: 'noun', example: 'My stomach hurts.', exampleTranslation: 'My stomach hurts.' },
          { word: 'fever', translation: 'fiebre', pos: 'noun', example: 'She has a fever.', exampleTranslation: 'She has a fever.' },
          { word: 'doctor', translation: 'médico', pos: 'noun', example: 'The doctor is kind.', exampleTranslation: 'The doctor is kind.' },
          { word: 'medicine', translation: 'medicina', pos: 'noun', example: 'Take this medicine.', exampleTranslation: 'Take this medicine.' },
          { word: 'rest', translation: 'descanso', pos: 'noun', example: 'You need rest.', exampleTranslation: 'You need rest.' },
          { word: 'appointment', translation: 'cita', pos: 'noun', example: 'I have an appointment at three.', exampleTranslation: 'I have an appointment at three.' },
        ],
        phrases: [
          { phrase: "I don't feel well.", translation: 'No me siento bien.' },
          { phrase: 'You should see a doctor.', translation: 'Deberías ver a un médico.' },
          { phrase: 'Get well soon!', translation: '¡Que te mejores pronto!' },
        ],
        dialogue: [
          { speaker: 'A', text: "What's wrong?", translation: '¿Qué te pasa?' },
          { speaker: 'B', text: 'I have a sore throat and a fever.', translation: 'Tengo dolor de garganta y fiebre.' },
          { speaker: 'A', text: 'Did you take any medicine?', translation: '¿Tomaste alguna medicina?' },
          { speaker: 'B', text: 'Yes, but I still feel tired.', translation: 'Sí, pero todavía me siento cansado.' },
        ],
        reading: { title: 'Staying Healthy', text: 'Last week, I caught a cold. I had a headache and a sore throat. I drank a lot of water and rested for two days. Now I feel much better. I think sleep and water are the best medicine.', translation: 'La semana pasada, me resfrié. Tenía dolor de cabeza y de garganta. Bebí mucha agua y descansé durante dos días. Ahora me siento mucho mejor. Creo que el sueño y el agua son la mejor medicina.' },
      },
      {
        id: "u3",
        title: 'Shopping and Money',
        description: 'Ask about prices, compare products, and shop confidently.',
        words: [
          { word: 'price', translation: 'precio', pos: 'noun', example: 'The price is too high.', exampleTranslation: 'The price is too high.' },
          { word: 'cheap', translation: 'barato', pos: 'adjective', example: 'This bag is cheap.', exampleTranslation: 'This bag is cheap.' },
          { word: 'expensive', translation: 'caro', pos: 'adjective', example: 'That coat is expensive.', exampleTranslation: 'That coat is expensive.' },
          { word: 'discount', translation: 'descuento', pos: 'noun', example: 'Is there a discount?', exampleTranslation: 'Is there a discount?' },
          { word: 'cash', translation: 'efectivo', pos: 'noun', example: 'I pay with cash.', exampleTranslation: 'I pay with cash.' },
          { word: 'card', translation: 'tarjeta', pos: 'noun', example: 'Can I pay by card?', exampleTranslation: 'Can I pay by card?' },
          { word: 'receipt', translation: 'recibo', pos: 'noun', example: 'Please give me the receipt.', exampleTranslation: 'Please give me the receipt.' },
        ],
        phrases: [
          { phrase: 'How much is this?', translation: '¿Cuánto cuesta esto?' },
          { phrase: 'Can I try it on?', translation: '¿Puedo probármelo?' },
          { phrase: "It's too expensive.", translation: 'Es demasiado caro.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'How much are these shoes?', translation: '¿Cuánto cuestan estos zapatos?' },
          { speaker: 'B', text: 'They are forty dollars.', translation: 'Cuestan cuarenta dólares.' },
          { speaker: 'A', text: 'That is too expensive. Do you have a cheaper pair?', translation: 'Es demasiado caro. ¿Tienen un par más barato?' },
          { speaker: 'B', text: 'Yes, these are on sale.', translation: 'Sí, estos están en oferta.' },
        ],
        reading: { title: 'At the Market', text: 'I went to the market to buy some fruit. The apples were cheap, but the strawberries were expensive. I bought three kilos of oranges and paid in cash. The seller gave me a receipt.', translation: 'Fui al mercado a comprar algo de fruta. Las manzanas estaban baratas, pero las fresas estaban caras. Compré tres kilos de naranjas y pagué en efectivo. El vendedor me dio el recibo.' },
      },
    ],
  },
  {
    cefr: "B1",
    title: "B1: Society",
    description: "Discuss news, the environment, work, and opinions.",
    pronunciationTips: ENGLISH_PRONUNCIATION.B1,
    grammar: ENGLISH_GRAMMAR.B1,
    units: [
      {
        id: "u1",
        title: 'News and Media',
        description: 'Read and discuss news articles and media topics.',
        words: [
          { word: 'journalist', translation: 'periodista', pos: 'noun', example: 'The journalist wrote an article.', exampleTranslation: 'The journalist wrote an article.' },
          { word: 'audience', translation: 'audiencia', pos: 'noun', example: 'The audience was large.', exampleTranslation: 'The audience was large.' },
          { word: 'headline', translation: 'titular', pos: 'noun', example: 'The headline caught my attention.', exampleTranslation: 'The headline caught my attention.' },
          { word: 'government', translation: 'gobierno', pos: 'noun', example: 'The government announced new rules.', exampleTranslation: 'The government announced new rules.' },
          { word: 'opinion', translation: 'opinión', pos: 'noun', example: 'In my opinion, the plan is good.', exampleTranslation: 'In my opinion, the plan is good.' },
          { word: 'source', translation: 'fuente', pos: 'noun', example: 'Check the source of the news.', exampleTranslation: 'Check the source of the news.' },
          { word: 'broadcast', translation: 'transmisión', pos: 'noun', example: 'The broadcast started at six.', exampleTranslation: 'The broadcast started at six.' },
        ],
        phrases: [
          { phrase: 'According to the news...', translation: 'Según las noticias...' },
          { phrase: 'In my opinion...', translation: 'En mi opinión...' },
          { phrase: 'The article claims that...', translation: 'El artículo afirma que...' },
        ],
        dialogue: [
          { speaker: 'A', text: 'Did you read the news today?', translation: '¿Leíste las noticias hoy?' },
          { speaker: 'B', text: 'Yes, there was an article about climate change.', translation: 'Sí, había un artículo sobre el cambio climático.' },
          { speaker: 'A', text: 'What is your opinion?', translation: '¿Cuál es tu opinión?' },
          { speaker: 'B', text: 'I think we need stronger laws.', translation: 'Creo que necesitamos leyes más fuertes.' },
        ],
        reading: { title: 'The Power of Media', text: 'The media plays an important role in society. It informs people, but it can also influence opinions. It is important to check sources and read different viewpoints before forming an opinion.', translation: 'Los medios juegan un papel importante en la sociedad. Informan a la gente, pero también pueden influir en las opiniones. Es importante verificar fuentes y leer diferentes puntos de vista antes de formar una opinión.' },
      },
      {
        id: "u2",
        title: 'Environment',
        description: 'Discuss environmental issues and sustainable living.',
        words: [
          { word: 'climate', translation: 'clima', pos: 'noun', example: 'Climate change is a serious problem.', exampleTranslation: 'Climate change is a serious problem.' },
          { word: 'pollution', translation: 'contaminación', pos: 'noun', example: 'Air pollution affects our health.', exampleTranslation: 'Air pollution affects our health.' },
          { word: 'recycling', translation: 'reciclaje', pos: 'noun', example: 'Recycling helps the planet.', exampleTranslation: 'Recycling helps the planet.' },
          { word: 'energy', translation: 'energía', pos: 'noun', example: 'Solar energy is clean.', exampleTranslation: 'Solar energy is clean.' },
          { word: 'waste', translation: 'residuo', pos: 'noun', example: 'We should reduce waste.', exampleTranslation: 'We should reduce waste.' },
          { word: 'nature', translation: 'naturaleza', pos: 'noun', example: 'Nature needs protection.', exampleTranslation: 'Nature needs protection.' },
          { word: 'future', translation: 'futuro', pos: 'noun', example: 'We must think about the future.', exampleTranslation: 'We must think about the future.' },
        ],
        phrases: [
          { phrase: 'We should protect the environment.', translation: 'Deberíamos proteger el medio ambiente.' },
          { phrase: "Recycling is everyone's responsibility.", translation: 'El reciclaje es responsabilidad de todos.' },
          { phrase: 'Small actions can make a difference.', translation: 'Las pequeñas acciones pueden marcar la diferencia.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'What do you do to help the environment?', translation: '¿Qué haces para ayudar al medio ambiente?' },
          { speaker: 'B', text: 'I recycle plastic and use public transport.', translation: 'Reciclo plástico y uso transporte público.' },
          { speaker: 'A', text: 'Do you think that is enough?', translation: '¿Crees que es suficiente?' },
          { speaker: 'B', text: 'No, but it is a good start.', translation: 'No, pero es un buen comienzo.' },
        ],
        reading: { title: 'A Greener Future', text: 'Many cities are trying to reduce pollution and protect nature. People are using less plastic, recycling more, and choosing clean energy. Governments and individuals must work together for a greener future.', translation: 'Muchas ciudades están intentando reducir la contaminación y proteger la naturaleza. La gente usa menos plástico, recicla más y elige energía limpia. Los gobiernos y los individuos deben trabajar juntos para un futuro más verde.' },
      },
      {
        id: "u3",
        title: 'Work and Career',
        description: 'Discuss jobs, career paths, and workplace issues.',
        words: [
          { word: 'career', translation: 'carrera', pos: 'noun', example: 'She has a successful career.', exampleTranslation: 'She has a successful career.' },
          { word: 'interview', translation: 'entrevista', pos: 'noun', example: 'The interview went well.', exampleTranslation: 'The interview went well.' },
          { word: 'experience', translation: 'experiencia', pos: 'noun', example: 'He has five years of experience.', exampleTranslation: 'He has five years of experience.' },
          { word: 'skills', translation: 'habilidades', pos: 'noun', example: 'Communication skills are important.', exampleTranslation: 'Communication skills are important.' },
          { word: 'colleague', translation: 'colega', pos: 'noun', example: 'My colleague is helpful.', exampleTranslation: 'My colleague is helpful.' },
          { word: 'salary', translation: 'salario', pos: 'noun', example: 'The salary is competitive.', exampleTranslation: 'The salary is competitive.' },
          { word: 'promotion', translation: 'ascenso', pos: 'noun', example: 'She got a promotion.', exampleTranslation: 'She got a promotion.' },
        ],
        phrases: [
          { phrase: 'I am looking for a new job.', translation: 'Estoy buscando un nuevo trabajo.' },
          { phrase: 'What are your strengths?', translation: '¿Cuáles son tus fortalezas?' },
          { phrase: 'I would like to apply for this position.', translation: 'Me gustaría aplicar a este puesto.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'How long have you worked here?', translation: '¿Cuánto tiempo has trabajado aquí?' },
          { speaker: 'B', text: 'I have worked here for three years.', translation: 'He trabajado aquí durante tres años.' },
          { speaker: 'A', text: 'Do you enjoy your job?', translation: '¿Disfrutas tu trabajo?' },
          { speaker: 'B', text: 'Yes, but I would like more responsibility.', translation: 'Sí, pero me gustaría más responsabilidad.' },
        ],
        reading: { title: 'Changing Careers', text: 'After ten years in sales, Mark decided to change his career. He took a course in programming and applied for a junior developer position. Although the salary was lower at first, he gained valuable skills and eventually received a promotion.', translation: 'Después de diez años en ventas, Mark decidió cambiar de carrera. Tomó un curso de programación y solicitó un puesto de desarrollador junior. Aunque el salario era menor al principio, adquirió habilidades valiosas y finalmente recibió un ascenso.' },
      },
    ],
  },
  {
    cefr: "B2",
    title: "B2: Complex Topics",
    description: "Analyse literature, economy, technology, and ethics.",
    pronunciationTips: ENGLISH_PRONUNCIATION.B2,
    grammar: ENGLISH_GRAMMAR.B2,
    units: [
      {
        id: "u1",
        title: 'Literature and Art',
        description: 'Analyse books, films, and artistic works.',
        words: [
          { word: 'novel', translation: 'novela', pos: 'noun', example: 'The novel was published in 1950.', exampleTranslation: 'The novel was published in 1950.' },
          { word: 'character', translation: 'personaje', pos: 'noun', example: 'The main character is complex.', exampleTranslation: 'The main character is complex.' },
          { word: 'plot', translation: 'trama', pos: 'noun', example: 'The plot was surprising.', exampleTranslation: 'The plot was surprising.' },
          { word: 'theme', translation: 'tema', pos: 'noun', example: 'The theme of love appears often.', exampleTranslation: 'The theme of love appears often.' },
          { word: 'critique', translation: 'crítica', pos: 'noun', example: 'The film received good critiques.', exampleTranslation: 'The film received good critiques.' },
          { word: 'exhibition', translation: 'exposición', pos: 'noun', example: 'The art exhibition opens tomorrow.', exampleTranslation: 'The art exhibition opens tomorrow.' },
          { word: 'masterpiece', translation: 'obra maestra', pos: 'noun', example: 'It is considered a masterpiece.', exampleTranslation: 'It is considered a masterpiece.' },
        ],
        phrases: [
          { phrase: 'The novel explores themes of identity.', translation: 'La novela explora temas de identidad.' },
          { phrase: 'The character develops throughout the story.', translation: 'El personaje se desarrolla a lo largo de la historia.' },
          { phrase: 'The exhibition was thought-provoking.', translation: 'La exposición fue estimulante.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'Have you read the new novel by Lee?', translation: '¿Has leído la nueva novela de Lee?' },
          { speaker: 'B', text: 'Yes, the characters felt very real.', translation: 'Sí, los personajes se sentían muy reales.' },
          { speaker: 'A', text: 'What about the plot?', translation: '¿Y la trama?' },
          { speaker: 'B', text: 'It was gripping until the very end.', translation: 'Fue absorbente hasta el final.' },
        ],
        reading: { title: 'Art and Society', text: 'Literature and art often reflect the values and problems of their time. A good novel does not only tell a story; it also invites readers to question their own beliefs. Similarly, visual art can challenge how we see the world.', translation: 'La literatura y el arte a menudo reflejan los valores y problemas de su época. Una buena novela no solo cuenta una historia; también invita a los lectores a cuestionar sus propias creencias. De manera similar, el arte visual puede desafiar cómo vemos el mundo.' },
      },
      {
        id: "u2",
        title: 'Economy and Society',
        description: 'Discuss economic trends, social issues, and policy debates.',
        words: [
          { word: 'economy', translation: 'economía', pos: 'noun', example: 'The economy is growing slowly.', exampleTranslation: 'The economy is growing slowly.' },
          { word: 'inflation', translation: 'inflación', pos: 'noun', example: 'Inflation affects prices.', exampleTranslation: 'Inflation affects prices.' },
          { word: 'unemployment', translation: 'desempleo', pos: 'noun', example: 'Unemployment is a serious issue.', exampleTranslation: 'Unemployment is a serious issue.' },
          { word: 'investment', translation: 'inversión', pos: 'noun', example: 'Investment in education is essential.', exampleTranslation: 'Investment in education is essential.' },
          { word: 'policy', translation: 'política', pos: 'noun', example: 'The new policy helps families.', exampleTranslation: 'The new policy helps families.' },
          { word: 'inequality', translation: 'desigualdad', pos: 'noun', example: 'We must address inequality.', exampleTranslation: 'We must address inequality.' },
          { word: 'globalisation', translation: 'globalización', pos: 'noun', example: 'Globalisation has both benefits and costs.', exampleTranslation: 'Globalisation has both benefits and costs.' },
        ],
        phrases: [
          { phrase: 'The economy depends on many factors.', translation: 'La economía depende de muchos factores.' },
          { phrase: 'Investment in education pays off.', translation: 'La inversión en educación da frutos.' },
          { phrase: 'We need policies that reduce inequality.', translation: 'Necesitamos políticas que reduzcan la desigualdad.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'What is the biggest challenge for the economy?', translation: '¿Cuál es el mayor desafío para la economía?' },
          { speaker: 'B', text: 'I think unemployment and inequality are the biggest issues.', translation: 'Creo que el desempleo y la desigualdad son los mayores problemas.' },
          { speaker: 'A', text: 'What policies could help?', translation: '¿Qué políticas podrían ayudar?' },
          { speaker: 'B', text: 'Investment in education and healthcare, in my view.', translation: 'La inversión en educación y salud, en mi opinión.' },
        ],
        reading: { title: 'The Cost of Living', text: 'In many countries, the cost of living has risen faster than wages. Housing, healthcare, and education have become increasingly expensive. Experts argue that governments must balance economic growth with social support to create a fairer society.', translation: 'En muchos países, el costo de vida ha aumentado más rápido que los salarios. La vivienda, la atención médica y la educación se han vuelto cada vez más caras. Los expertos sostienen que los gobiernos deben equilibrar el crecimiento económico con el apoyo social para crear una sociedad más justa.' },
      },
      {
        id: "u3",
        title: 'Technology and Ethics',
        description: 'Debate the impact of technology on privacy, work, and society.',
        words: [
          { word: 'privacy', translation: 'privacidad', pos: 'noun', example: 'Online privacy is important.', exampleTranslation: 'Online privacy is important.' },
          { word: 'data', translation: 'datos', pos: 'noun', example: 'Companies collect a lot of data.', exampleTranslation: 'Companies collect a lot of data.' },
          { word: 'artificial intelligence', translation: 'inteligencia artificial', pos: 'noun', example: 'Artificial intelligence is changing work.', exampleTranslation: 'Artificial intelligence is changing work.' },
          { word: 'algorithm', translation: 'algoritmo', pos: 'noun', example: 'The algorithm decides what we see.', exampleTranslation: 'The algorithm decides what we see.' },
          { word: 'regulation', translation: 'regulación', pos: 'noun', example: 'We need clear regulations.', exampleTranslation: 'We need clear regulations.' },
          { word: 'automation', translation: 'automatización', pos: 'noun', example: 'Automation may replace some jobs.', exampleTranslation: 'Automation may replace some jobs.' },
          { word: 'cybersecurity', translation: 'ciberseguridad', pos: 'noun', example: 'Cybersecurity is essential for businesses.', exampleTranslation: 'Cybersecurity is essential for businesses.' },
        ],
        phrases: [
          { phrase: 'Technology should serve people, not control them.', translation: 'La tecnología debe servir a las personas, no controlarlas.' },
          { phrase: 'We need better data protection laws.', translation: 'Necesitamos mejores leyes de protección de datos.' },
          { phrase: 'Automation can create new opportunities.', translation: 'La automatización puede crear nuevas oportunidades.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'Do you think AI will replace teachers?', translation: '¿Crees que la IA reemplazará a los maestros?' },
          { speaker: 'B', text: 'Not completely, but it will change their roles.', translation: 'No completamente, pero cambiará sus roles.' },
          { speaker: 'A', text: 'What about privacy concerns?', translation: '¿Y las preocupaciones de privacidad?' },
          { speaker: 'B', text: 'We need strong regulations to protect users.', translation: 'Necesitamos regulaciones fuertes para proteger a los usuarios.' },
        ],
        reading: { title: 'Living with Technology', text: 'Technology has transformed almost every part of life. While it brings convenience, it also raises questions about privacy, fairness, and the future of work. Society must decide how to use technology responsibly.', translation: 'La tecnología ha transformado casi cada parte de la vida. Si bien trae conveniencia, también plantea preguntas sobre privacidad, equidad y el futuro del trabajo. La sociedad debe decidir cómo usar la tecnología de manera responsable.' },
      },
    ],
  },
  {
    cefr: "C1",
    title: "C1: Academic and Professional",
    description: "Engage with academic writing, politics, and science.",
    pronunciationTips: ENGLISH_PRONUNCIATION.C1,
    grammar: ENGLISH_GRAMMAR.C1,
    units: [
      {
        id: "u1",
        title: 'Academic Writing',
        description: 'Write and analyse academic texts with precision and clarity.',
        words: [
          { word: 'hypothesis', translation: 'hipótesis', pos: 'noun', example: 'The hypothesis was tested in the study.', exampleTranslation: 'The hypothesis was tested in the study.' },
          { word: 'methodology', translation: 'metodología', pos: 'noun', example: 'The methodology was clearly explained.', exampleTranslation: 'The methodology was clearly explained.' },
          { word: 'analysis', translation: 'análisis', pos: 'noun', example: 'The analysis showed clear trends.', exampleTranslation: 'The analysis showed clear trends.' },
          { word: 'evidence', translation: 'evidencia', pos: 'noun', example: 'There is little evidence for this claim.', exampleTranslation: 'There is little evidence for this claim.' },
          { word: 'interpretation', translation: 'interpretación', pos: 'noun', example: 'The interpretation of the data is debated.', exampleTranslation: 'The interpretation of the data is debated.' },
          { word: 'implication', translation: 'implicación', pos: 'noun', example: 'The implications are significant.', exampleTranslation: 'The implications are significant.' },
          { word: 'conclusion', translation: 'conclusión', pos: 'noun', example: 'The conclusion summarises the findings.', exampleTranslation: 'The conclusion summarises the findings.' },
        ],
        phrases: [
          { phrase: 'The evidence suggests that...', translation: 'La evidencia sugiere que...' },
          { phrase: 'This raises questions about...', translation: 'Esto plantea preguntas sobre...' },
          { phrase: 'It can be concluded that...', translation: 'Se puede concluir que...' },
        ],
        dialogue: [
          { speaker: 'A', text: 'What is the main finding of the study?', translation: '¿Cuál es el hallazgo principal del estudio?' },
          { speaker: 'B', text: 'The evidence suggests a strong link between sleep and memory.', translation: 'La evidencia sugiere una fuerte conexión entre el sueño y la memoria.' },
          { speaker: 'A', text: 'Are there any limitations?', translation: '¿Hay alguna limitación?' },
          { speaker: 'B', text: 'Yes, the sample size was relatively small.', translation: 'Sí, el tamaño de la muestra fue relativamente pequeño.' },
        ],
        reading: { title: 'The Structure of Academic Arguments', text: "Academic writing requires a clear thesis, supporting evidence, and logical organisation. Writers must avoid unsupported claims and acknowledge counterarguments. Hedging language, such as 'it is likely that', helps present findings with appropriate caution.", translation: "La escritura académica requiere una tesis clara, evidencia de apoyo y organización lógica. Los escritores deben evitar afirmaciones sin fundamento y reconocer las contraargumentaciones. El lenguaje de distanciamiento, como 'es probable que', ayuda a presentar los hallazgos con la cautela adecuada." },
      },
      {
        id: "u2",
        title: 'Global Politics',
        description: 'Analyse international relations, diplomacy, and policy decisions.',
        words: [
          { word: 'diplomacy', translation: 'diplomacia', pos: 'noun', example: 'Diplomacy is essential for peace.', exampleTranslation: 'Diplomacy is essential for peace.' },
          { word: 'sanctions', translation: 'sanciones', pos: 'noun', example: 'The country faced international sanctions.', exampleTranslation: 'The country faced international sanctions.' },
          { word: 'sovereignty', translation: 'soberanía', pos: 'noun', example: 'Sovereignty is a sensitive issue.', exampleTranslation: 'Sovereignty is a sensitive issue.' },
          { word: 'negotiation', translation: 'negociación', pos: 'noun', example: 'The negotiation lasted months.', exampleTranslation: 'The negotiation lasted months.' },
          { word: 'treaty', translation: 'tratado', pos: 'noun', example: 'Both nations signed the treaty.', exampleTranslation: 'Both nations signed the treaty.' },
          { word: 'conflict', translation: 'conflicto', pos: 'noun', example: 'The conflict has deep roots.', exampleTranslation: 'The conflict has deep roots.' },
          { word: 'alliance', translation: 'alianza', pos: 'noun', example: 'The alliance strengthened both countries.', exampleTranslation: 'The alliance strengthened both countries.' },
        ],
        phrases: [
          { phrase: 'The international community must respond.', translation: 'La comunidad internacional debe responder.' },
          { phrase: 'Diplomacy requires patience and compromise.', translation: 'La diplomacia requiere paciencia y compromiso.' },
          { phrase: 'The treaty has far-reaching consequences.', translation: 'El tratado tiene consecuencias de gran alcance.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'What is the best way to resolve the conflict?', translation: '¿Cuál es la mejor manera de resolver el conflicto?' },
          { speaker: 'B', text: 'I believe dialogue and diplomacy are the only sustainable solutions.', translation: 'Creo que el diálogo y la diplomacia son las únicas soluciones sostenibles.' },
          { speaker: 'A', text: 'But what if one side refuses to negotiate?', translation: 'Pero, ¿y si un lado se niega a negociar?' },
          { speaker: 'B', text: 'Then international pressure may become necessary.', translation: 'Entonces la presión internacional puede ser necesaria.' },
        ],
        reading: { title: 'The Role of Diplomacy', text: 'In an interconnected world, diplomacy remains the most effective tool for preventing conflict. While sanctions and military force sometimes appear necessary, long-term peace usually depends on negotiation, mutual understanding, and compromise.', translation: 'En un mundo interconectado, la diplomacia sigue siendo la herramienta más efectiva para prevenir conflictos. Aunque las sanciones y la fuerza militar a veces parecen necesarias, la paz a largo plazo generalmente depende de la negociación, la comprensión mutua y el compromiso.' },
      },
      {
        id: "u3",
        title: 'Science and Society',
        description: 'Evaluate scientific progress and its social consequences.',
        words: [
          { word: 'breakthrough', translation: 'avance', pos: 'noun', example: 'The discovery was a major breakthrough.', exampleTranslation: 'The discovery was a major breakthrough.' },
          { word: 'experiment', translation: 'experimento', pos: 'noun', example: 'The experiment was repeated.', exampleTranslation: 'The experiment was repeated.' },
          { word: 'peer review', translation: 'revisión por pares', pos: 'noun', example: 'Peer review ensures quality.', exampleTranslation: 'Peer review ensures quality.' },
          { word: 'ethics', translation: 'ética', pos: 'noun', example: 'Ethics must guide research.', exampleTranslation: 'Ethics must guide research.' },
          { word: 'funding', translation: 'financiamiento', pos: 'noun', example: 'Funding for science is limited.', exampleTranslation: 'Funding for science is limited.' },
          { word: 'innovation', translation: 'innovación', pos: 'noun', example: 'Innovation drives economic growth.', exampleTranslation: 'Innovation drives economic growth.' },
          { word: 'public trust', translation: 'confianza pública', pos: 'noun', example: 'Public trust in science is important.', exampleTranslation: 'Public trust in science is important.' },
        ],
        phrases: [
          { phrase: 'The study was published after peer review.', translation: 'El estudio se publicó tras revisión por pares.' },
          { phrase: 'Ethical considerations cannot be ignored.', translation: 'Las consideraciones éticas no pueden ignorarse.' },
          { phrase: 'Science must be accessible to the public.', translation: 'La ciencia debe ser accesible al público.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'Should there be limits on scientific research?', translation: '¿Debería haber límites en la investigación científica?' },
          { speaker: 'B', text: 'Yes, especially when it involves human subjects.', translation: 'Sí, especialmente cuando involucra seres humanos.' },
          { speaker: 'A', text: 'How can we maintain public trust?', translation: '¿Cómo podemos mantener la confianza pública?' },
          { speaker: 'B', text: 'Through transparency and clear communication.', translation: 'A través de la transparencia y la comunicación clara.' },
        ],
        reading: { title: 'Balancing Progress and Ethics', text: 'Scientific progress offers incredible possibilities, but it also raises ethical questions. From genetic research to artificial intelligence, society must decide how far science should go. Public trust depends on transparent research and responsible regulation.', translation: 'El progreso científico ofrece posibilidades increíbles, pero también plantea preguntas éticas. Desde la investigación genética hasta la inteligencia artificial, la sociedad debe decidir hasta dónde debe llegar la ciencia. La confianza pública depende de una investigación transparente y una regulación responsable.' },
      },
    ],
  },
  {
    cefr: "C2",
    title: "C2: Mastery",
    description: "Master nuance, translation, philosophy, and register.",
    pronunciationTips: ENGLISH_PRONUNCIATION.C2,
    grammar: ENGLISH_GRAMMAR.C2,
    units: [
      {
        id: "u1",
        title: 'Linguistic Mastery',
        description: 'Analyse language at a near-native level, including dialect and register.',
        words: [
          { word: 'register', translation: 'registro', pos: 'noun', example: 'The register of the text is formal.', exampleTranslation: 'The register of the text is formal.' },
          { word: 'dialect', translation: 'dialecto', pos: 'noun', example: 'The dialect has unique vowels.', exampleTranslation: 'The dialect has unique vowels.' },
          { word: 'pragmatics', translation: 'pragmática', pos: 'noun', example: 'Pragmatics studies context and meaning.', exampleTranslation: 'Pragmatics studies context and meaning.' },
          { word: 'semantics', translation: 'semántica', pos: 'noun', example: 'Semantics studies word meaning.', exampleTranslation: 'Semantics studies word meaning.' },
          { word: 'discourse', translation: 'discurso', pos: 'noun', example: 'Discourse analysis examines longer texts.', exampleTranslation: 'Discourse analysis examines longer texts.' },
          { word: 'idiolect', translation: 'idiolecto', pos: 'noun', example: 'Each speaker has an idiolect.', exampleTranslation: 'Each speaker has an idiolect.' },
          { word: 'code-switching', translation: 'cambio de código', pos: 'noun', example: 'Code-switching is common in bilingual communities.', exampleTranslation: 'Code-switching is common in bilingual communities.' },
        ],
        phrases: [
          { phrase: 'The choice of register signals social context.', translation: 'La elección del registro señala el contexto social.' },
          { phrase: 'Dialect is part of cultural identity.', translation: 'El dialecto es parte de la identidad cultural.' },
          { phrase: 'Meaning depends on more than literal words.', translation: 'El significado depende de más que las palabras literales.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'How do dialects preserve cultural identity?', translation: '¿Cómo preservan los dialectos la identidad cultural?' },
          { speaker: 'B', text: 'They carry history, values, and social bonds.', translation: 'Portan historia, valores y lazos sociales.' },
          { speaker: 'A', text: 'Is code-switching a sign of deficiency?', translation: '¿El cambio de código es señal de deficiencia?' },
          { speaker: 'B', text: 'No, it is a sophisticated linguistic skill.', translation: 'No, es una habilidad lingüística sofisticada.' },
        ],
        reading: { title: 'Language and Identity', text: 'Language is not merely a tool for communication; it is also a marker of identity. Dialects, accents, and registers signal social background, education, and group membership. Near-native competence includes the ability to navigate these layers with sensitivity.', translation: 'El lenguaje no es simplemente una herramienta para la comunicación; también es un marcador de identidad. Los dialectos, acentos y registros señalan trasfondo social, educación y pertenencia grupal. La competencia cercana al nativo incluye la capacidad de navegar estas capas con sensibilidad.' },
      },
      {
        id: "u2",
        title: 'Philosophy and Culture',
        description: 'Engage with abstract ideas, philosophy, and cultural critique.',
        words: [
          { word: 'existentialism', translation: 'existencialismo', pos: 'noun', example: 'Existentialism explores individual freedom.', exampleTranslation: 'Existentialism explores individual freedom.' },
          { word: 'empiricism', translation: 'empirismo', pos: 'noun', example: 'Empiricism values experience as knowledge.', exampleTranslation: 'Empiricism values experience as knowledge.' },
          { word: 'postmodernism', translation: 'postmodernismo', pos: 'noun', example: 'Postmodernism questions grand narratives.', exampleTranslation: 'Postmodernism questions grand narratives.' },
          { word: 'paradigm', translation: 'paradigma', pos: 'noun', example: 'The new paradigm changed the field.', exampleTranslation: 'The new paradigm changed the field.' },
          { word: 'critique', translation: 'crítica', pos: 'noun', example: 'The critique challenged traditional views.', exampleTranslation: 'The critique challenged traditional views.' },
          { word: 'ideology', translation: 'ideología', pos: 'noun', example: 'Ideology shapes how we see the world.', exampleTranslation: 'Ideology shapes how we see the world.' },
          { word: 'cultural norms', translation: 'normas culturales', pos: 'noun', example: 'Cultural norms vary across societies.', exampleTranslation: 'Cultural norms vary across societies.' },
        ],
        phrases: [
          { phrase: 'The concept challenges conventional thinking.', translation: 'El concepto desafía el pensamiento convencional.' },
          { phrase: 'Culture shapes our understanding of truth.', translation: 'La cultura moldea nuestra comprensión de la verdad.' },
          { phrase: 'Philosophy asks difficult questions.', translation: 'La filosofía hace preguntas difíciles.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'Can we ever be free from ideology?', translation: '¿Podemos alguna vez estar libres de la ideología?' },
          { speaker: 'B', text: 'Probably not entirely, but we can become more aware of it.', translation: 'Probablemente no del todo, pero podemos ser más conscientes de ella.' },
          { speaker: 'A', text: 'What role does culture play?', translation: '¿Qué papel juega la cultura?' },
          { speaker: 'B', text: 'It provides the lens through which we interpret experience.', translation: 'Proporciona la lente a través de la cual interpretamos la experiencia.' },
        ],
        reading: { title: 'The Limits of Knowledge', text: 'Human knowledge is shaped by language, culture, and history. What we consider obvious may appear strange from another perspective. True intellectual maturity involves recognising these limits and remaining open to revision.', translation: 'El conocimiento humano está moldeado por el lenguaje, la cultura y la historia. Lo que consideramos obvio puede parecer extraño desde otra perspectiva. La verdadera madurez intelectual implica reconocer estos límites y mantenerse abierto a la revisión.' },
      },
      {
        id: "u3",
        title: 'Translation and Interpretation',
        description: 'Master the art of translation across languages and cultures.',
        words: [
          { word: 'equivalence', translation: 'equivalencia', pos: 'noun', example: 'Equivalence is rarely perfect.', exampleTranslation: 'Equivalence is rarely perfect.' },
          { word: 'literal translation', translation: 'traducción literal', pos: 'noun', example: 'Literal translation can be misleading.', exampleTranslation: 'Literal translation can be misleading.' },
          { word: 'cultural reference', translation: 'referencia cultural', pos: 'noun', example: 'Cultural references often need adaptation.', exampleTranslation: 'Cultural references often need adaptation.' },
          { word: 'subtext', translation: 'subtexto', pos: 'noun', example: 'The subtext was lost in translation.', exampleTranslation: 'The subtext was lost in translation.' },
          { word: 'nuance', translation: 'matiz', pos: 'noun', example: 'Every language has untranslatable nuances.', exampleTranslation: 'Every language has untranslatable nuances.' },
          { word: 'tone', translation: 'tono', pos: 'noun', example: 'The tone must be preserved.', exampleTranslation: 'The tone must be preserved.' },
          { word: 'fidelity', translation: 'fidelidad', pos: 'noun', example: 'Fidelity to the source is important.', exampleTranslation: 'Fidelity to the source is important.' },
        ],
        phrases: [
          { phrase: 'Translation is interpretation, not just conversion.', translation: 'La traducción es interpretación, no solo conversión.' },
          { phrase: 'Some meanings are deeply cultural.', translation: 'Algunos significados son profundamente culturales.' },
          { phrase: 'A good translator reads between the lines.', translation: 'Un buen traductor lee entre líneas.' },
        ],
        dialogue: [
          { speaker: 'A', text: 'Should jokes be translated literally?', translation: '¿Los chistes deben traducirse literalmente?' },
          { speaker: 'B', text: 'No, humour rarely survives literal translation.', translation: 'No, el humor rara vez sobrevive a la traducción literal.' },
          { speaker: 'A', text: 'How do you preserve tone?', translation: '¿Cómo se preserva el tono?' },
          { speaker: 'B', text: 'By understanding the audience and adapting appropriately.', translation: 'Entendiendo a la audiencia y adaptándose apropiadamente.' },
        ],
        reading: { title: "The Translator's Dilemma", text: 'Every translation involves choices. The translator must balance fidelity to the original with the need to produce natural, meaningful text in the target language. Culture, tone, and audience all influence these decisions.', translation: 'Cada traducción implica elecciones. El traductor debe equilibrar la fidelidad al original con la necesidad de producir un texto natural y significativo en el idioma de destino. La cultura, el tono y la audiencia influyen en estas decisiones.' },
      },
    ],
  },
];

import { ENGLISH_MANUAL_A0 } from "./curriculum-manual-a0";

export const ENGLISH_PACK: LanguagePack = buildLanguagePack(
  "English",
  "en",
  ["ar", "es", "fr", "fi"],
  "🇬🇧",
  "Learn English from scratch with original lessons built for translation-first reading.",
  ENGLISH_LEVELS,
  ADDITIONAL_EN_UNITS,
  ENGLISH_MANUAL_A0
);
