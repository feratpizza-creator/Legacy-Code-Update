import type { LanguagePack, VocabularyItem } from "./learn-data";

export type VocabularyState = "new" | "learning" | "learned";

export type VocabularyReview = {
  state: VocabularyState;
  dueAt: number;
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  lapses: number;
  lastReviewedAt?: number;
};

export type CurriculumVocabularyWord = {
  id: string;
  word: string;
  language: string;
  level: "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  unitId: string;
  unitTitle: string;
  lessonId: string;
  lessonTitle: string;
  category: string;
  ipa: string;
  audioUrl: string;
  pos: string;
  nativeMeaning: string;
  definition: string;
  example: string;
  exampleTranslation: string;
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
  wordFamily: string[];
  cefr: "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  tags: string[];
};

export type VocabularyProgress = Record<string, VocabularyReview>;

const PROGRESS_KEY = "lengoali_vocabulary_progress_v1";
const DEFAULT_REVIEW: VocabularyReview = {
  state: "new",
  dueAt: 0,
  intervalDays: 0,
  easeFactor: 2.5,
  repetitions: 0,
  lapses: 0,
};

function cleanList(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  if (typeof value === "string") return value.split(/[,;|]/).map((item) => item.trim()).filter(Boolean);
  return [];
}

function slug(value: string): string {
  return value.toLocaleLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "word";
}

function unitTags(title: string): string[] {
  return title.split(/\s*(?:&|\/|,|·|-)\s*/).map((tag) => tag.trim()).filter(Boolean).slice(0, 4);
}

function normalizeWord(
  pack: LanguagePack,
  level: CurriculumVocabularyWord["level"],
  unit: { id: string; title: string },
  lesson: { id: string; title: string },
  item: VocabularyItem,
): CurriculumVocabularyWord {
  const category = item.category || unit.title;
  const tags = cleanList(item.tags);
  return {
    id: `${pack.targetLang}:${level}:${unit.id}:${slug(item.word)}`,
    word: item.word,
    language: pack.targetLang,
    level,
    unitId: unit.id,
    unitTitle: unit.title,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    category,
    ipa: item.ipa || "",
    audioUrl: item.audioUrl || "",
    pos: item.pos || "word",
    nativeMeaning: item.translation || "",
    definition: item.definition || "",
    example: item.example || "",
    exampleTranslation: item.exampleTranslation || "",
    synonyms: cleanList(item.synonyms),
    antonyms: cleanList(item.antonyms),
    collocations: cleanList(item.collocations),
    wordFamily: cleanList(item.wordFamily),
    cefr: level,
    tags: tags.length ? tags : unitTags(unit.title),
  };
}

/**
 * Flattens the existing language-pack hierarchy into a stable local catalog.
 * It deliberately has no maximum size: adding units/words to a pack expands it
 * without changing this code, including catalogs well beyond 5,000 entries.
 */
export function buildVocabularyCatalog(pack: LanguagePack): CurriculumVocabularyWord[] {
  const seen = new Set<string>();
  const result: CurriculumVocabularyWord[] = [];
  for (const level of pack.levels) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        for (const item of lesson.vocabulary) {
          // Preserve the same word when it is intentionally taught in another
          // unit, while still removing duplicate entries within one unit.
          const key = `${level.cefr}:${unit.id}:${slug(item.word)}`;
          if (seen.has(key)) continue;
          seen.add(key);
          result.push(normalizeWord(pack, level.cefr, unit, lesson, item));
        }
      }
    }
  }
  return result;
}

export function getVocabularyReview(progress: VocabularyProgress, id: string): VocabularyReview {
  return { ...DEFAULT_REVIEW, ...(progress[id] || {}) };
}

export function loadVocabularyProgress(): VocabularyProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as VocabularyProgress;
  } catch {
    return {};
  }
}

export function saveVocabularyProgress(progress: VocabularyProgress): void {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch { /* storage can be unavailable */ }
}

export function reviewVocabularyWord(
  progress: VocabularyProgress,
  id: string,
  result: "again" | "good" | "easy",
): VocabularyProgress {
  const current = getVocabularyReview(progress, id);
  const now = Date.now();
  if (result === "again") {
    return {
      ...progress,
      [id]: {
        ...current,
        state: "learning",
        dueAt: now + 10 * 60 * 1000,
        intervalDays: 0,
        easeFactor: Math.max(1.3, current.easeFactor - 0.2),
        repetitions: 0,
        lapses: current.lapses + 1,
        lastReviewedAt: now,
      },
    };
  }
  const multiplier = result === "easy" ? current.easeFactor + 0.15 : current.easeFactor;
  const nextInterval = current.intervalDays <= 0
    ? (result === "easy" ? 4 : 1)
    : Math.max(1, Math.round(current.intervalDays * multiplier));
  return {
    ...progress,
    [id]: {
      ...current,
      state: result === "easy" || current.repetitions >= 2 ? "learned" : "learning",
      dueAt: now + nextInterval * 86400000,
      intervalDays: nextInterval,
      easeFactor: Math.min(3.2, multiplier),
      repetitions: current.repetitions + 1,
      lastReviewedAt: now,
    },
  };
}

export function countVocabularyStates(words: CurriculumVocabularyWord[], progress: VocabularyProgress) {
  return words.reduce((counts, word) => {
    counts[getVocabularyReview(progress, word.id).state] += 1;
    return counts;
  }, { new: 0, learning: 0, learned: 0 });
}
