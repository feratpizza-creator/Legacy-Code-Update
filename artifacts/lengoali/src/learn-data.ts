// Lingolali Learn – data model and seed language packs
// Keep this frontend-only; future phases can sync to a backend.

export type ExplanationLang = "en" | "ar" | "fi" | "es" | "fr";

export type LanguagePack = {
  id: string;
  name: string;
  targetLang: string;   // language the user wants to learn
  explanationLangs: ExplanationLang[];
  flag: string;
  description: string;
  levels: Level[];
};

export type Level = {
  id: string;
  cefr: "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  title: string;
  description: string;
  units: Unit[];
};

export type Unit = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  objective: string;
  vocabulary: VocabularyItem[];
  grammar: GrammarItem[];
  reading: ReadingText;
  exercises: Exercise[];
  quiz: QuizQuestion[];
};

export type VocabularyItem = {
  word: string;
  translation: string;
  pos?: string;
  example?: string;
  exampleTranslation?: string;
};

export type GrammarItem = {
  title: string;
  explanation: string;
  examples: { target: string; meaning: string }[];
};

export type ReadingText = {
  text: string;
  translation?: string;
  title?: string;
};

export type Exercise =
  | {
      type: "match";
      prompt: string;
      pairs: Record<string, string>;
    }
  | {
      type: "fill";
      prompt: string;
      blanks: { sentence: string; answer: string }[];
    }
  | {
      type: "choice";
      prompt: string;
      question: string;
      options: string[];
      answer: string;
    };

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

// ─── Seed: Finnish for English speakers ───────────────────────────────────────

export const FINNISH_PACK: LanguagePack = {
  id: "fi-en",
  name: "Finnish",
  targetLang: "fi",
  explanationLangs: ["en", "ar", "fi"],
  flag: "🇫🇮",
  description: "Learn Finnish from scratch with original lessons built for translation-first reading.",
  levels: [
    {
      id: "A0",
      cefr: "A0",
      title: "A0: Absolute Beginner",
      description: "Start with greetings, introductions, and the most basic building blocks of Finnish.",
      units: [
        {
          id: "u1",
          title: "Unit 1: Greetings",
          description: "Say hello, goodbye, and introduce yourself.",
          lessons: [
            {
              id: "l1",
              title: "Greetings and introductions",
              objective: "Learn how to greet someone and introduce yourself in Finnish.",
              vocabulary: [
                { word: "hei", translation: "hello", pos: "interjection", example: "Hei! Minä olen Anna.", exampleTranslation: "Hello! I am Anna." },
                { word: "kiitos", translation: "thank you", pos: "interjection", example: "Kiitos paljon!", exampleTranslation: "Thank you very much!" },
                { word: "minä", translation: "I", pos: "pronoun", example: "Minä olen opiskelija.", exampleTranslation: "I am a student." },
                { word: "olen", translation: "am", pos: "verb", example: "Minä olen iloinen.", exampleTranslation: "I am happy." },
                { word: "sinä", translation: "you", pos: "pronoun", example: "Sinä olet ystäväni.", exampleTranslation: "You are my friend." },
                { word: "hauska tutustua", translation: "nice to meet you", pos: "phrase", example: "Hauska tutustua! Minä olen Matti.", exampleTranslation: "Nice to meet you! I am Matti." },
              ],
              grammar: [
                {
                  title: "Vowel harmony",
                  explanation: "Finnish words use either back vowels (a, o, u) or front vowels (ä, ö, y). A single word normally keeps to one group. This affects endings, so noticing the vowels helps you predict grammar.",
                  examples: [
                    { target: "talo – talossa", meaning: "house – in the house (back vowels)" },
                    { target: "pöytä – pöydässä", meaning: "table – at the table (front vowels)" },
                  ],
                },
              ],
              reading: {
                title: "A small dialogue",
                text: "Hei! Minä olen Anna. Kuka sinä olet? Hauska tutustua. Kiitos paljon. Nähdään!",
                translation: "Hello! I am Anna. Who are you? Nice to meet you. Thank you very much. See you!",
              },
              exercises: [
                {
                  type: "match",
                  prompt: "Match the Finnish word with its English meaning.",
                  pairs: {
                    hei: "hello",
                    kiitos: "thank you",
                    minä: "I",
                    olet: "are",
                    "hauska tutustua": "nice to meet you",
                  },
                },
              ],
              quiz: [
                { id: "q1", question: "How do you say 'hello' in Finnish?", options: ["hei", "kiitos", "minä"], answer: "hei" },
                { id: "q2", question: "What does 'kiitos' mean?", options: ["yes", "thank you", "goodbye"], answer: "thank you" },
                { id: "q3", question: "Choose the pronoun for 'I':", options: ["sinä", "hän", "minä"], answer: "minä" },
              ],
            },
          ],
        },
        {
          id: "u2",
          title: "Unit 2: Everyday words",
          description: "Names of common things around you.",
          lessons: [
            {
              id: "l2",
              title: "Numbers and counting",
              objective: "Count from one to ten and ask about quantities.",
              vocabulary: [
                { word: "yksi", translation: "one", pos: "numeral", example: "Yksi kahvi, kiitos.", exampleTranslation: "One coffee, please." },
                { word: "kaksi", translation: "two", pos: "numeral", example: "Kaksi ystävää.", exampleTranslation: "Two friends." },
                { word: "kolme", translation: "three", pos: "numeral", example: "Minulla on kolme kirjaa.", exampleTranslation: "I have three books." },
                { word: "kahvi", translation: "coffee", pos: "noun", example: "Kahvi on kuuma.", exampleTranslation: "The coffee is hot." },
                { word: "kirja", translation: "book", pos: "noun", example: "Tämä kirja on hyvä.", exampleTranslation: "This book is good." },
              ],
              grammar: [
                {
                  title: "No articles",
                  explanation: "Finnish does not use 'a', 'an', or 'the' before nouns. Context tells you whether a noun is definite or indefinite.",
                  examples: [
                    { target: "kirja", meaning: "a book / the book" },
                    { target: "kahvi", meaning: "coffee / the coffee" },
                  ],
                },
              ],
              reading: {
                title: "At the café",
                text: "Yksi kahvi, kiitos. Kahvi on kuuma. Minä luen kirjaa. Kirja on hyvä. Kiitos!",
                translation: "One coffee, please. The coffee is hot. I am reading a book. The book is good. Thanks!",
              },
              exercises: [
                {
                  type: "match",
                  prompt: "Match.",
                  pairs: { yksi: "one", kaksi: "two", kolme: "three", kahvi: "coffee", kirja: "book" },
                },
              ],
              quiz: [
                { id: "q1", question: "What does 'kaksi' mean?", options: ["one", "two", "three"], answer: "two" },
                { id: "q2", question: "Translate 'book':", options: ["kirja", "kahvi", "kynä"], answer: "kirja" },
                { id: "q3", question: "What is 'yksi'?", options: ["one", "zero", "ten"], answer: "one" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ─── Seed: English for Arabic speakers ────────────────────────────────────────

export const ENGLISH_PACK: LanguagePack = {
  id: "en-ar",
  name: "English",
  targetLang: "en",
  explanationLangs: ["ar", "en", "fi"],
  flag: "🇬🇧",
  description: "Learn English starting from everyday greetings, with explanations in Arabic.",
  levels: [
    {
      id: "A0",
      cefr: "A0",
      title: "A0: Absolute Beginner",
      description: "Learn the alphabet, greetings, and simple phrases.",
      units: [
        {
          id: "u1",
          title: "Unit 1: Greetings",
          description: "Hello, goodbye, and introducing yourself.",
          lessons: [
            {
              id: "l1",
              title: "Hello and goodbye",
              objective: "Use basic greetings in English.",
              vocabulary: [
                { word: "hello", translation: "مرحباً", pos: "interjection", example: "Hello, I am Sam.", exampleTranslation: "مرحباً، أنا سام." },
                { word: "goodbye", translation: "وداعاً", pos: "interjection", example: "Goodbye! See you tomorrow.", exampleTranslation: "وداعاً! أراك غداً." },
                { word: "please", translation: "من فضلك", pos: "adverb", example: "A coffee, please.", exampleTranslation: "قهوة، من فضلك." },
                { word: "thank you", translation: "شكراً لك", pos: "phrase", example: "Thank you very much.", exampleTranslation: "شكراً جزيلاً." },
              ],
              grammar: [
                {
                  title: "Word order",
                  explanation: "English usually follows a Subject-Verb-Object order. Keep this order when you build simple sentences.",
                  examples: [
                    { target: "I am Sam.", meaning: "subject + verb + complement" },
                    { target: "You are kind.", meaning: "subject + verb + adjective" },
                  ],
                },
              ],
              reading: {
                title: "A short talk",
                text: "Hello! I am Sam. Nice to meet you. Goodbye!",
                translation: "مرحباً! أنا سام. تشرفت بلقائك. وداعاً!",
              },
              exercises: [
                {
                  type: "match",
                  prompt: "Match.",
                  pairs: { hello: "مرحباً", goodbye: "وداعاً", please: "من فضلك", "thank you": "شكراً لك" },
                },
              ],
              quiz: [
                { id: "q1", question: "How do you greet someone?", options: ["hello", "goodbye", "please"], answer: "hello" },
                { id: "q2", question: "What does 'thank you' mean?", options: ["please", "thank you", "sorry"], answer: "thank you" },
                { id: "q3", question: "Choose the word for leaving:", options: ["hello", "goodbye", "please"], answer: "goodbye" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const LANGUAGE_PACKS: LanguagePack[] = [FINNISH_PACK, ENGLISH_PACK];
