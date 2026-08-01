import { rounded, type CurriculumStatistics, type ValidatorModule } from "./domain";

export const statisticsGenerator: ValidatorModule = {
  name: "Statistics Generator",
  run({ pack, records }) {
    const vocabularyByLevel: Record<string, number> = {};
    const vocabularyByUnit: Record<string, number> = {};
    const lessonsByLevel: Record<string, number> = {};
    const unitsByLevel: Record<string, number> = {};
    for (const level of pack.levels) {
      unitsByLevel[level.cefr] = level.units.length;
      lessonsByLevel[level.cefr] = level.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
      vocabularyByLevel[level.cefr] = 0;
    }
    for (const record of records) {
      vocabularyByLevel[record.level] = (vocabularyByLevel[record.level] ?? 0) + 1;
      const unitKey = `${record.level}/${record.unitId}`;
      vocabularyByUnit[unitKey] = (vocabularyByUnit[unitKey] ?? 0) + 1;
    }
    const units = Object.values(unitsByLevel).reduce((sum, count) => sum + count, 0);
    const lessons = Object.values(lessonsByLevel).reduce((sum, count) => sum + count, 0);
    const levels = pack.levels.map((level) => level.cefr);
    const growth = levels.slice(1).map((level, index) => (vocabularyByLevel[level] ?? 0) - (vocabularyByLevel[levels[index]!] ?? 0));
    const data: CurriculumStatistics = {
      vocabularyRecords: records.length,
      uniqueVocabulary: new Set(records.map((record) => record.normalizedWord)).size,
      duplicateRatio: rounded(records.length === 0 ? 0 : (records.length - new Set(records.map((record) => record.normalizedWord)).size) / records.length * 100),
      levels: pack.levels.length,
      units,
      lessons,
      averageLessonSize: rounded(lessons === 0 ? 0 : records.length / lessons),
      averageUnitSize: rounded(units === 0 ? 0 : records.length / units),
      averageVocabularyGrowth: rounded(growth.length === 0 ? 0 : growth.reduce((sum, value) => sum + value, 0) / growth.length),
      vocabularyByLevel,
      vocabularyByUnit,
      lessonsByLevel,
      unitsByLevel,
    };
    return { module: "Statistics Generator", issues: [], metrics: { records: data.vocabularyRecords, unique: data.uniqueVocabulary, units: data.units, lessons: data.lessons, averageLessonSize: data.averageLessonSize, averageUnitSize: data.averageUnitSize, averageVocabularyGrowth: data.averageVocabularyGrowth }, data };
  },
};
