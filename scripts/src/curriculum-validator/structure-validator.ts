import { CEFR_LEVELS, type ValidatorModule } from "./domain";

export const structureValidator: ValidatorModule = {
  name: "Structure Validator",
  run({ pack }) {
    const issues = [];
    const seenLevels = new Set<string>();
    const seenUnitsByLevel = new Map<string, Set<string>>();
    let lessonCount = 0;
    let unitCount = 0;

    if (!pack.id) issues.push({ module: "Structure", severity: "error" as const, code: "PACK_ID_MISSING", path: "pack.id", message: "The language pack has no id." });
    if (!pack.targetLang) issues.push({ module: "Structure", severity: "error" as const, code: "TARGET_LANGUAGE_MISSING", path: "pack.targetLang", message: "The language pack has no target language." });
    if (pack.levels.length === 0) issues.push({ module: "Structure", severity: "error" as const, code: "LEVELS_MISSING", path: "pack.levels", message: "The language pack contains no CEFR levels." });

    for (const [levelIndex, level] of pack.levels.entries()) {
      const levelPath = `levels[${levelIndex}]`;
      if (!CEFR_LEVELS.includes(level.cefr as (typeof CEFR_LEVELS)[number])) {
        issues.push({ module: "Structure", severity: "error" as const, code: "INVALID_CEFR", path: `${levelPath}.cefr`, message: `Invalid CEFR level '${level.cefr}'.` });
      }
      if (!level.id) issues.push({ module: "Structure", severity: "error" as const, code: "LEVEL_ID_MISSING", path: `${levelPath}.id`, message: "Level id is missing." });
      if (seenLevels.has(level.cefr)) issues.push({ module: "Structure", severity: "error" as const, code: "DUPLICATE_LEVEL", path: levelPath, message: `CEFR level '${level.cefr}' appears more than once.` });
      seenLevels.add(level.cefr);
      const seenUnits = new Set<string>();
      seenUnitsByLevel.set(level.cefr, seenUnits);
      if (level.units.length === 0) issues.push({ module: "Structure", severity: "error" as const, code: "UNITS_MISSING", path: `${levelPath}.units`, message: `Level ${level.cefr} has no units.` });

      for (const [unitIndex, unit] of level.units.entries()) {
        unitCount += 1;
        const unitPath = `${levelPath}.units[${unitIndex}]`;
        if (!unit.id) issues.push({ module: "Structure", severity: "error" as const, code: "UNIT_ID_MISSING", path: `${unitPath}.id`, message: "Unit id is missing." });
        if (seenUnits.has(unit.id)) issues.push({ module: "Structure", severity: "error" as const, code: "DUPLICATE_UNIT_ID_IN_LEVEL", path: unitPath, message: `Unit id '${unit.id}' is duplicated inside ${level.cefr}.` });
        seenUnits.add(unit.id);
        if (unit.lessons.length === 0) issues.push({ module: "Structure", severity: "error" as const, code: "LESSONS_MISSING", path: `${unitPath}.lessons`, message: `Unit ${unit.id || "(unnamed)"} has no lessons.` });
        const seenLessons = new Set<string>();
        for (const [lessonIndex, lesson] of unit.lessons.entries()) {
          lessonCount += 1;
          const lessonPath = `${unitPath}.lessons[${lessonIndex}]`;
          if (!lesson.id) issues.push({ module: "Structure", severity: "error" as const, code: "LESSON_ID_MISSING", path: `${lessonPath}.id`, message: "Lesson id is missing." });
          if (seenLessons.has(lesson.id)) issues.push({ module: "Structure", severity: "error" as const, code: "DUPLICATE_LESSON_ID_IN_UNIT", path: lessonPath, message: `Lesson id '${lesson.id}' is duplicated inside unit ${unit.id}.` });
          seenLessons.add(lesson.id);
          if (lesson.vocabulary.length === 0) issues.push({ module: "Structure", severity: "warning" as const, code: "VOCABULARY_MISSING", path: `${lessonPath}.vocabulary`, message: "Lesson has no vocabulary records." });
          if (lesson.grammar.length === 0) issues.push({ module: "Structure", severity: "warning" as const, code: "GRAMMAR_MISSING", path: `${lessonPath}.grammar`, message: "Lesson has no grammar records." });
          if (!lesson.reading || typeof lesson.reading.text !== "string" || !lesson.reading.text.trim()) issues.push({ module: "Structure", severity: "warning" as const, code: "READING_MISSING", path: `${lessonPath}.reading`, message: "Lesson has no reading text." });
          if (lesson.exercises.length === 0) issues.push({ module: "Structure", severity: "warning" as const, code: "EXERCISES_MISSING", path: `${lessonPath}.exercises`, message: "Lesson has no exercises." });
          if (lesson.quiz.length === 0) issues.push({ module: "Structure", severity: "warning" as const, code: "QUIZ_MISSING", path: `${lessonPath}.quiz`, message: "Lesson has no quiz questions." });
          const words = new Set(lesson.vocabulary.map((item) => item.normalizedWord));
          for (const review of lesson.reviewItems) {
            if (!words.has(review.toLocaleLowerCase().replace(/\s+/g, " "))) issues.push({ module: "Structure", severity: "warning" as const, code: "BROKEN_REVIEW_REFERENCE", path: `${lessonPath}.reviewItems`, message: `Review item '${review}' is not present in lesson vocabulary.` });
          }
        }
      }
    }

    for (const expected of CEFR_LEVELS) {
      if (!seenLevels.has(expected)) issues.push({ module: "Structure", severity: "warning" as const, code: "EXPECTED_LEVEL_MISSING", path: "pack.levels", message: `Expected CEFR level ${expected} is missing.` });
    }

    return { module: "Structure Validator", issues, metrics: { levels: pack.levels.length, units: unitCount, lessons: lessonCount, duplicateLevelIds: pack.levels.length - seenLevels.size, levelsWithUnits: seenUnitsByLevel.size } };
  },
};
