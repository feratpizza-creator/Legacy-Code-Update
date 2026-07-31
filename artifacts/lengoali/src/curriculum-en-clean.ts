import type { VocabularyItem } from "./learn-data";
import { ADDITIONAL_FI_UNITS } from "./curriculum-data-more";
import { ADDITIONAL_EN_UNITS as LEGACY_EN_UNITS } from "./curriculum-en-more";

type CurriculumPhrase = { phrase: string; translation: string };
type CurriculumLine = { speaker: string; text: string; translation: string };
type CurriculumUnit = {
  id: string;
  title: string;
  description: string;
  words: VocabularyItem[];
  phrases: CurriculumPhrase[];
  dialogue: CurriculumLine[];
  reading: { title: string; text: string; translation: string };
};

type CurriculumByLevel = Record<string, CurriculumUnit[]>;

const FINNISH_UNITS = ADDITIONAL_FI_UNITS as CurriculumByLevel;
const LEGACY_ENGLISH_UNITS = LEGACY_EN_UNITS as CurriculumByLevel;

/**
 * Additional English units were generated in more than one pass. Some older
 * records are complete English lessons with Arabic explanations, while later
 * records accidentally put Finnish target text into the English pack. Keep the
 * complete records and repair only the contaminated ones from the bilingual
 * Finnish source. The source stays local and future unit additions remain
 * automatically supported.
 */
export const ADDITIONAL_EN_UNITS: CurriculumByLevel = Object.fromEntries(
  Object.entries(FINNISH_UNITS).map(([level, finnishUnits]) => {
    const legacyById = new Map((LEGACY_ENGLISH_UNITS[level] ?? []).map((unit) => [unit.id, unit]));
    return [level, finnishUnits.map((finnishUnit) => normalizeUnit(finnishUnit, legacyById.get(finnishUnit.id)))];
  }),
);

function normalizeUnit(finnishUnit: CurriculumUnit, legacyUnit?: CurriculumUnit): CurriculumUnit {
  const legacyWords = legacyUnit?.words ?? [];
  const words = finnishUnit.words.map((finnishWord, index) => {
    const legacyWord = legacyWords[index];
    return legacyWord && !isContaminatedWord(legacyWord, finnishWord)
      ? { ...legacyWord, translationLang: inferTranslationLang(legacyWord) }
      : invertFinnishWord(finnishWord);
  });
  const hasContaminatedWord = finnishUnit.words.some((finnishWord, index) => {
    const legacyWord = legacyWords[index];
    return !legacyWord || isContaminatedWord(legacyWord, finnishWord);
  });
  const useFinnishFallback = hasContaminatedWord || !legacyUnit;

  const title = useFinnishFallback ? englishTitle(finnishUnit, words) : legacyUnit.title;
  return {
    id: finnishUnit.id,
    title,
    description: useFinnishFallback
      ? englishDescription(title, words)
      : legacyUnit.description,
    words,
    phrases: useFinnishFallback ? invertPhrases(finnishUnit.phrases) : legacyUnit.phrases,
    dialogue: useFinnishFallback ? invertDialogue(finnishUnit.dialogue) : legacyUnit.dialogue,
    reading: useFinnishFallback ? invertReading(finnishUnit.reading, title) : legacyUnit.reading,
  };
}

function isContaminatedWord(legacyWord: VocabularyItem, finnishWord: VocabularyItem): boolean {
  return legacyWord.word === finnishWord.word
    || legacyWord.translation === finnishWord.word
    || legacyWord.example === finnishWord.example
    || legacyWord.exampleTranslation === finnishWord.example
    || hasFinnishCharacters(legacyWord.word)
    || hasFinnishCharacters(legacyWord.translation)
    || hasFinnishCharacters(legacyWord.example)
    || hasFinnishCharacters(legacyWord.exampleTranslation);
}

function inferTranslationLang(word: VocabularyItem): string {
  const values = [word.translation, word.exampleTranslation].filter((value): value is string => Boolean(value));
  if (values.some(hasArabicCharacters)) return "ar";
  if (values.some(hasFinnishCharacters)) return "fi";
  return "es";
}

function hasArabicCharacters(value: string | undefined): boolean {
  return typeof value === "string" && /[\u0600-\u06ff]/u.test(value);
}

function invertFinnishWord(word: VocabularyItem): VocabularyItem {
  return {
    ...word,
    word: word.translation,
    translation: word.word,
    translationLang: "fi",
    example: word.exampleTranslation,
    exampleTranslation: word.example,
  };
}

function invertPhrases(phrases: CurriculumPhrase[]): CurriculumPhrase[] {
  return phrases.map((phrase) => ({ phrase: phrase.translation, translation: phrase.phrase }));
}

function invertDialogue(lines: CurriculumLine[]): CurriculumLine[] {
  return lines.map((line) => ({ ...line, text: line.translation, translation: line.text }));
}

function invertReading(reading: CurriculumUnit["reading"], title: string): CurriculumUnit["reading"] {
  return { title, text: reading.translation, translation: reading.text };
}

function englishTitle(unit: CurriculumUnit, words: VocabularyItem[]): string {
  const labels = words.slice(0, 2).map((word) => word.word.trim()).filter(Boolean);
  return labels.length > 1
    ? labels.map(capitalize).join(" & ")
    : labels[0] ? capitalize(labels[0]) : "English vocabulary";
}

function englishDescription(title: string, words: VocabularyItem[]): string {
  const examples = words.slice(0, 3).map((word) => word.word).filter(Boolean).join(", ");
  return `Learn ${title.toLowerCase()} vocabulary${examples ? `, including ${examples}` : ""}.`;
}

function hasFinnishCharacters(value: string | undefined): boolean {
  return typeof value === "string" && /[äöåÄÖÅ]/u.test(value);
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
