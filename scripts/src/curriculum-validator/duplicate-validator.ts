import type { DuplicateAnalysis, DuplicateOccurrence } from "./duplicate-types";
import type { ValidatorModule } from "./domain";

export const duplicateValidator: ValidatorModule = {
  name: "Duplicate Validator",
  run({ records }) {
    const groups = new Map<string, typeof records>();
    for (const record of records) {
      if (!record.normalizedWord) continue;
      groups.set(record.normalizedWord, [...(groups.get(record.normalizedWord) ?? []), record]);
    }
    const duplicates: DuplicateOccurrence[] = [];
    for (const [word, occurrences] of groups) {
      if (occurrences.length < 2) continue;
      const levels = new Set(occurrences.map((item) => item.level));
      const lessons = new Set(occurrences.map((item) => `${item.level}/${item.unitId}/${item.lessonId}`));
      const partsOfSpeech = new Set(occurrences.map((item) => item.pos).filter(Boolean));
      let category: DuplicateOccurrence["category"] = "Contextual Reuse";
      let severity: DuplicateOccurrence["severity"] = "info";
      let reason = "The word is reused in more than one curriculum context.";
      if (occurrences.some((item) => item.level && item.unitId && item.lessonId) && lessons.size === 1) {
        category = partsOfSpeech.size > 1 ? "Different Part of Speech" : "Suspicious Duplicate";
        severity = partsOfSpeech.size > 1 ? "info" : "warning";
        reason = partsOfSpeech.size > 1 ? "The same spelling is used with different parts of speech in one lesson." : "The same normalized word appears more than once in one lesson.";
      } else if (levels.size > 1) {
        category = "Intentional Review";
        reason = "The word reappears across CEFR levels, which may support spaced review or progression.";
      } else if (new Set(occurrences.map((item) => item.unitId)).size > 1) {
        category = "Contextual Reuse";
      }
      duplicates.push({ word, count: occurrences.length, category, severity, reason, occurrences: occurrences.map((item) => ({ level: item.level, unitId: item.unitId, lessonId: item.lessonId, path: item.path, pos: item.pos })) });
    }
    const issues = duplicates.filter((item) => item.severity !== "info").map((item) => ({ module: "Duplicates", severity: item.severity, code: "DUPLICATE_VOCABULARY", path: item.occurrences[0]?.path ?? "", message: `'${item.word}' appears ${item.count} times (${item.category}).`, details: item.reason }));
    const duplicateRecords = duplicates.reduce((sum, item) => sum + item.count - 1, 0);
    return { module: "Duplicate Validator", issues, metrics: { duplicateWords: duplicates.length, duplicateRecords, intentionalReview: duplicates.filter((item) => item.category === "Intentional Review").length, contextualReuse: duplicates.filter((item) => item.category === "Contextual Reuse").length, suspicious: duplicates.filter((item) => item.category === "Suspicious Duplicate").length }, data: { duplicates } satisfies DuplicateAnalysis };
  },
};
