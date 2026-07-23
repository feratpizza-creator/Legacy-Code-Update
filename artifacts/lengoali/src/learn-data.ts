// Lingolali Learn – data model and language packs
// Content lives in curriculum-data.ts; this file exports the public types and packs.

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
  learningObjectives?: string[];
  vocabulary: VocabularyItem[];
  grammar: GrammarItem[];
  pronunciation?: string[];
  usefulPhrases?: { phrase: string; translation: string }[];
  dialogue?: { speaker: string; text: string; translation: string }[];
  reading: ReadingText;
  exercises: Exercise[];
  quiz: QuizQuestion[];
  reviewItems?: string[];
  flashcards?: { front: string; back: string }[];
  estimatedDuration?: string;
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

// ------------------------------------------------------------------------
// Import populated language packs
// ------------------------------------------------------------------------

import { FINNISH_PACK } from "./curriculum-data";
import { ENGLISH_PACK } from "./curriculum-en";

export const LANGUAGE_PACKS: LanguagePack[] = [FINNISH_PACK, ENGLISH_PACK];
