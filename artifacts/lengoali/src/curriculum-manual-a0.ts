// Lingolali manual A0 units – preserves the original Welcome (Greetings) and Numbers
// lessons that existed before the full CEFR curriculum expansion.

import type { Unit } from "./learn-data";

export const FINNISH_MANUAL_A0: Unit = {
  id: "u1",
  title: "Tervehdykset ja numerot",
  description: "Original welcome and numbers lessons for Finnish.",
  lessons: [
    {
      id: "l1",
      title: "Tervehdykset ja esittelyt",
      objective: "Opi tervehtimään ja esittäytymään suomeksi.",
      learningObjectives: [
        "Greet someone in Finnish.",
        "Introduce yourself.",
        "Use basic pronouns.",
      ],
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
          explanation: "Finnish words use either back vowels (a, o, u) or front vowels (ä, ö, y). A single word normally keeps to one group.",
          examples: [
            { target: "talo – talossa", meaning: "house – in the house (back vowels)" },
            { target: "pöytä – pöydässä", meaning: "table – at the table (front vowels)" },
          ],
        },
      ],
      pronunciation: ["Stress is always on the first syllable in Finnish."],
      usefulPhrases: [
        { phrase: "Hei!", translation: "Hello!" },
        { phrase: "Hauska tutustua!", translation: "Nice to meet you!" },
        { phrase: "Kiitos!", translation: "Thank you!" },
      ],
      dialogue: [
        { speaker: "A", text: "Hei! Minä olen Anna.", translation: "Hello! I am Anna." },
        { speaker: "B", text: "Hauska tutustua! Minä olen Matti.", translation: "Nice to meet you! I am Matti." },
      ],
      reading: {
        title: "Pieni dialogi",
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
            sinä: "you",
            "hauska tutustua": "nice to meet you",
          },
        },
      ],
      quiz: [
        { id: "q1", question: "How do you say 'hello' in Finnish?", options: ["hei", "kiitos", "minä"], answer: "hei" },
        { id: "q2", question: "What does 'kiitos' mean?", options: ["yes", "thank you", "goodbye"], answer: "thank you" },
        { id: "q3", question: "Choose the pronoun for 'I':", options: ["sinä", "hän", "minä"], answer: "minä" },
      ],
      reviewItems: ["hei", "kiitos", "minä", "sinä", "hauska tutustua"],
      flashcards: [
        { front: "hei", back: "hello" },
        { front: "kiitos", back: "thank you" },
        { front: "minä", back: "I" },
      ],
      estimatedDuration: "10 min",
    },
    {
      id: "l2",
      title: "Numerot ja laskeminen",
      objective: "Count from one to ten and ask about quantities in Finnish.",
      learningObjectives: [
        "Count from one to ten in Finnish.",
        "Recognise common nouns.",
        "Understand that Finnish has no articles.",
      ],
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
      pronunciation: ["Numbers are pronounced clearly, with stress on the first syllable."],
      usefulPhrases: [
        { phrase: "Yksi, kaksi, kolme...", translation: "One, two, three..." },
        { phrase: "Minulla on...", translation: "I have..." },
      ],
      dialogue: [
        { speaker: "A", text: "Monta kirjaa sinulla on?", translation: "How many books do you have?" },
        { speaker: "B", text: "Minulla on kolme kirjaa.", translation: "I have three books." },
      ],
      reading: {
        title: "Kahvilassa",
        text: "Yksi kahvi, kiitos. Kahvi on kuuma. Minä luen kirjaa. Kirja on hyvä. Kiitos!",
        translation: "One coffee, please. The coffee is hot. I am reading a book. The book is good. Thanks!",
      },
      exercises: [
        {
          type: "match",
          prompt: "Match the Finnish word with its English meaning.",
          pairs: { yksi: "one", kaksi: "two", kolme: "three", kahvi: "coffee", kirja: "book" },
        },
      ],
      quiz: [
        { id: "q1", question: "What does 'kaksi' mean?", options: ["one", "two", "three"], answer: "two" },
        { id: "q2", question: "Translate 'book':", options: ["kirja", "kahvi", "kynä"], answer: "kirja" },
        { id: "q3", question: "What is 'yksi'?", options: ["one", "zero", "ten"], answer: "one" },
      ],
      reviewItems: ["yksi", "kaksi", "kolme", "kahvi", "kirja"],
      flashcards: [
        { front: "yksi", back: "one" },
        { front: "kaksi", back: "two" },
        { front: "kolme", back: "three" },
      ],
      estimatedDuration: "10 min",
    },
  ],
};

export const ENGLISH_MANUAL_A0: Unit = {
  id: "u1",
  title: "Welcome and Numbers",
  description: "Original welcome and numbers lessons for English.",
  lessons: [
    {
      id: "l1",
      title: "Hello and Goodbye",
      objective: "Use basic greetings and introductions in English.",
      learningObjectives: [
        "Greet people in English.",
        "Introduce yourself.",
        "Use please and thank you.",
      ],
      vocabulary: [
        { word: "hello", translation: "مرحباً", pos: "interjection", example: "Hello, I am Sam.", exampleTranslation: "مرحباً، أنا سام." },
        { word: "goodbye", translation: "وداعاً", pos: "interjection", example: "Goodbye! See you tomorrow.", exampleTranslation: "وداعاً! أراك غداً." },
        { word: "please", translation: "من فضلك", pos: "adverb", example: "A coffee, please.", exampleTranslation: "قهوة، من فضلك." },
        { word: "thank you", translation: "شكراً لك", pos: "phrase", example: "Thank you very much.", exampleTranslation: "شكراً جزيلاً." },
        { word: "nice to meet you", translation: "تشرفت بلقائك", pos: "phrase", example: "Nice to meet you!", exampleTranslation: "تشرفت بلقائك!" },
        { word: "my name is", translation: "اسمي", pos: "phrase", example: "My name is Sara.", exampleTranslation: "اسمي سارة." },
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
      pronunciation: ["Hello has a clear 'h' sound at the beginning."],
      usefulPhrases: [
        { phrase: "Hello!", translation: "مرحباً!" },
        { phrase: "Nice to meet you!", translation: "تشرفت بلقائك!" },
        { phrase: "Thank you very much.", translation: "شكراً جزيلاً." },
      ],
      dialogue: [
        { speaker: "A", text: "Hello! I am Sam. Nice to meet you.", translation: "مرحباً! أنا سام. تشرفت بلقائك." },
        { speaker: "B", text: "Nice to meet you too. Goodbye!", translation: "تشرفت بلقائك أيضاً. وداعاً!" },
      ],
      reading: {
        title: "A Short Talk",
        text: "Hello! I am Sam. Nice to meet you. Goodbye!",
        translation: "مرحباً! أنا سام. تشرفت بلقائك. وداعاً!",
      },
      exercises: [
        {
          type: "match",
          prompt: "Match the English word with its Arabic meaning.",
          pairs: { hello: "مرحباً", goodbye: "وداعاً", please: "من فضلك", "thank you": "شكراً لك" },
        },
      ],
      quiz: [
        { id: "q1", question: "How do you greet someone?", options: ["hello", "goodbye", "please"], answer: "hello" },
        { id: "q2", question: "What does 'thank you' mean?", options: ["please", "thank you", "sorry"], answer: "thank you" },
        { id: "q3", question: "Choose the word for leaving:", options: ["hello", "goodbye", "please"], answer: "goodbye" },
      ],
      reviewItems: ["hello", "goodbye", "please", "thank you", "nice to meet you"],
      flashcards: [
        { front: "hello", back: "مرحباً" },
        { front: "goodbye", back: "وداعاً" },
        { front: "thank you", back: "شكراً لك" },
      ],
      estimatedDuration: "10 min",
    },
    {
      id: "l2",
      title: "Numbers and Counting",
      objective: "Count from one to ten and ask about quantities in English.",
      learningObjectives: [
        "Count from one to ten in English.",
        "Ask and answer simple quantity questions.",
        "Use numbers in daily contexts.",
      ],
      vocabulary: [
        { word: "one", translation: "واحد", pos: "numeral", example: "I have one brother.", exampleTranslation: "لديّ أخ واحد." },
        { word: "two", translation: "اثنان", pos: "numeral", example: "She has two sisters.", exampleTranslation: "لديها أختان." },
        { word: "three", translation: "ثلاثة", pos: "numeral", example: "Three apples, please.", exampleTranslation: "ثلاث تفاحات، من فضلك." },
        { word: "four", translation: "أربعة", pos: "numeral", example: "There are four chairs.", exampleTranslation: "هناك أربع كراسٍ." },
        { word: "five", translation: "خمسة", pos: "numeral", example: "I am five years old.", exampleTranslation: "عمري خمس سنوات." },
        { word: "ten", translation: "عشرة", pos: "numeral", example: "There are ten students.", exampleTranslation: "هناك عشرة طلاب." },
      ],
      grammar: [
        {
          title: "Numbers as adjectives",
          explanation: "Numbers come before the noun they describe. They do not change form.",
          examples: [
            { target: "two books", meaning: "dos libros" },
            { target: "five apples", meaning: "cinco manzanas" },
          ],
        },
      ],
      pronunciation: ["Pay attention to the difference between 'thirteen' and 'thirty' later."],
      usefulPhrases: [
        { phrase: "How many?", translation: "كم؟" },
        { phrase: "I have ...", translation: "لديّ ..." },
      ],
      dialogue: [
        { speaker: "A", text: "How many books do you have?", translation: "كم كتاباً لديك؟" },
        { speaker: "B", text: "I have three books.", translation: "لديّ ثلاثة كتب." },
      ],
      reading: {
        title: "At the Café",
        text: "One coffee, please. Two teas, please. The coffee is hot. The tea is good. Thank you!",
        translation: "قهوة واحدة، من فضلك. شايان، من فضلك. القهوة ساخنة. الشاي جيد. شكراً لك!",
      },
      exercises: [
        {
          type: "match",
          prompt: "Match the English number with its Arabic meaning.",
          pairs: { one: "واحد", two: "اثنان", three: "ثلاثة", four: "أربعة", five: "خمسة" },
        },
      ],
      quiz: [
        { id: "q1", question: "What is 'two' in Arabic?", options: ["واحد", "اثنان", "ثلاثة"], answer: "اثنان" },
        { id: "q2", question: "Choose the number for 'five':", options: ["three", "four", "five"], answer: "five" },
        { id: "q3", question: "Translate 'ten':", options: ["خمسة", "عشرة", "سبعة"], answer: "عشرة" },
      ],
      reviewItems: ["one", "two", "three", "four", "five", "ten"],
      flashcards: [
        { front: "one", back: "واحد" },
        { front: "two", back: "اثنان" },
        { front: "three", back: "ثلاثة" },
      ],
      estimatedDuration: "10 min",
    },
  ],
};
