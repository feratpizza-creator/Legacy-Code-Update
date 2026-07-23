// ─── Curriculum types ─────────────────────────────────────────────────────────

export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type ExType = "choose" | "fill" | "tr" | "reorder";

export interface VocabItem {
  w: string;       // word in target language
  en: string;      // English translation
  ar: string;      // Arabic translation
  pos: string;     // part of speech
  pron?: string;   // pronunciation guide / IPA
  ex: string;      // example sentence in target language
  note?: string;   // usage note (English)
}

export interface DialogueLine {
  s: "A" | "B";
  t: string;       // utterance in target language
  en?: string;     // English gloss
  ar?: string;     // Arabic gloss
}

export interface Exercise {
  type: ExType;
  q: string;
  opts?: string[];
  ans: string;
  hint?: string;
}

export interface LessonData {
  id: string;
  lang: string;          // fi, es, ar, fr, de …
  level: Level;
  unitId: string;
  unitNum: number;
  unitTitle: string;     // title in target language
  unitTitleEn: string;
  lessonNum: number;
  title: string;         // in target language
  titleEn: string;
  titleAr: string;
  topic: string;
  text: string;          // reading passage (target language)
  vocabulary: VocabItem[];
  grammar: {
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
    examples: string[];
    tipEn: string;
  };
  dialogue: DialogueLine[];
  exercises: Exercise[];
}

export interface LanguagePackData {
  code: string;
  name: string;
  nameNative: string;
  flag: string;
  levels: Level[];
  color: string;   // accent color
}

export interface LearnProgress {
  visited: string[];   // lesson IDs visited
  completed: string[]; // lesson IDs where all exercises passed
}
