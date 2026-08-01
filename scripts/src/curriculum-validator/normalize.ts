import type {
  CefrLevel,
  CurriculumLesson,
  CurriculumLevel,
  CurriculumPack,
  CurriculumUnit,
  VocabularyRecord,
} from "./domain";
import { CEFR_LEVELS } from "./domain";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function textList(value: unknown): string[] | string | undefined {
  if (typeof value === "string") return value.trim() || undefined;
  if (!Array.isArray(value)) return undefined;
  const items = value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  return items.length > 0 ? items : undefined;
}

function levelValue(value: unknown): string {
  return text(value).toUpperCase();
}

function normalizeVocabulary(
  value: unknown,
  level: CefrLevel,
  unit: UnknownRecord,
  unitId: string,
  unitTitle: string,
  lesson: UnknownRecord,
  lessonId: string,
  lessonTitle: string,
  path: string,
): VocabularyRecord[] {
  return asArray(value).map((item, index) => {
    const record = isRecord(item) ? item : {};
    const word = text(record.word);
    return {
      word,
      normalizedWord: word.toLocaleLowerCase().replace(/\s+/g, " "),
      translation: text(record.translation),
      translationLang: text(record.translationLang) || undefined,
      pos: text(record.pos) || undefined,
      definition: text(record.definition) || undefined,
      ipa: text(record.ipa) || undefined,
      audioUrl: text(record.audioUrl) || undefined,
      example: text(record.example) || undefined,
      exampleTranslation: text(record.exampleTranslation) || undefined,
      synonyms: textList(record.synonyms),
      antonyms: textList(record.antonyms),
      collocations: textList(record.collocations),
      wordFamily: textList(record.wordFamily),
      tags: textList(record.tags),
      category: text(record.category) || undefined,
      level,
      unitId,
      unitTitle,
      lessonId,
      lessonTitle,
      path: `${path}.vocabulary[${index}]`,
    };
  });
}

function normalizeLesson(
  value: unknown,
  level: CefrLevel,
  unit: UnknownRecord,
  unitId: string,
  unitTitle: string,
  path: string,
): CurriculumLesson {
  const lesson = isRecord(value) ? value : {};
  const id = text(lesson.id);
  const title = text(lesson.title);
  return {
    id,
    title,
    vocabulary: normalizeVocabulary(lesson.vocabulary, level, unit, unitId, unitTitle, lesson, id, title, path),
    grammar: asArray(lesson.grammar),
    reading: isRecord(lesson.reading) ? lesson.reading : undefined,
    exercises: asArray(lesson.exercises),
    quiz: asArray(lesson.quiz),
    reviewItems: asArray(lesson.reviewItems).filter((item): item is string => typeof item === "string"),
    flashcards: asArray(lesson.flashcards),
    raw: lesson,
  };
}

function normalizeUnit(value: unknown, level: CefrLevel, path: string): CurriculumUnit {
  const unit = isRecord(value) ? value : {};
  const id = text(unit.id);
  const title = text(unit.title);
  return {
    id,
    title,
    description: text(unit.description),
    lessons: asArray(unit.lessons).map((lesson, index) => normalizeLesson(lesson, level, unit, id, title, `${path}.lessons[${index}]`)),
    raw: unit,
  };
}

function normalizeLevel(value: unknown, path: string): CurriculumLevel {
  const level = isRecord(value) ? value : {};
  const cefr = levelValue(level.cefr || level.id);
  const normalizedCefr = (CEFR_LEVELS.includes(cefr as CefrLevel) ? cefr : "A0") as CefrLevel;
  return {
    id: text(level.id),
    cefr,
    title: text(level.title),
    description: text(level.description),
    units: asArray(level.units).map((unit, index) => normalizeUnit(unit, normalizedCefr, `${path}.units[${index}]`)),
    raw: level,
  };
}

export function normalizePack(value: unknown): CurriculumPack {
  const pack = isRecord(value) ? value : {};
  return {
    id: text(pack.id),
    name: text(pack.name),
    targetLang: text(pack.targetLang),
    explanationLangs: asArray(pack.explanationLangs).filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean),
    levels: asArray(pack.levels).map((level, index) => normalizeLevel(level, `levels[${index}]`)),
  };
}
