import { percentage, rounded, type ValidatorModule } from "./domain";

export const vocabularyValidator: ValidatorModule = {
  name: "Vocabulary Validator",
  run({ records }) {
    const issues = [];
    const emptyWords = records.filter((record) => !record.word);
    const emptyTranslations = records.filter((record) => !record.translation);
    for (const record of emptyWords) issues.push({ module: "Vocabulary", severity: "error" as const, code: "WORD_MISSING", path: record.path, message: "Vocabulary word is empty." });
    for (const record of emptyTranslations) issues.push({ module: "Vocabulary", severity: "error" as const, code: "TRANSLATION_MISSING", path: record.path, message: `Translation is missing for '${record.word || "(empty)"}'.` });
    const byLevel: Record<string, number> = {};
    const byUnit: Record<string, number> = {};
    for (const record of records) {
      byLevel[record.level] = (byLevel[record.level] ?? 0) + 1;
      const unitKey = `${record.level}/${record.unitId}`;
      byUnit[unitKey] = (byUnit[unitKey] ?? 0) + 1;
    }
    return {
      module: "Vocabulary Validator",
      issues,
      metrics: { records: records.length, unique: new Set(records.map((record) => record.normalizedWord)).size, emptyWords: emptyWords.length, emptyTranslations: emptyTranslations.length, translationCompletion: rounded(percentage(records.length - emptyTranslations.length, records.length)) },
      data: { byLevel, byUnit },
    };
  },
};
