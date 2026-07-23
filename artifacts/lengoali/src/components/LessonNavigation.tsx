import { useState, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, BookOpen, RotateCcw, Layers, GraduationCap } from "lucide-react";
import type { LanguagePack, Level, Unit, Lesson, VocabularyItem } from "../learn-data";

type Theme = {
  bg: string;
  card: string;
  card2: string;
  border: string;
  text: string;
  textMuted: string;
  textDim: string;
  textFaint: string;
};

type LessonLocation = {
  packId: string;
  levelId: string;
  unitId: string;
  lessonId: string;
  completedLessonIds: string[];
  timestamp: number;
};

type ProgressStore = Record<string, LessonLocation>;

const PROGRESS_KEY = "lengoali_learn_progress_v2";

function loadProgress(): ProgressStore | null {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ProgressStore;
  } catch {
    return null;
  }
}

function saveProgress(store: ProgressStore) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
}

export function markLessonCompleted(
  pack: LanguagePack,
  level: Level,
  unit: Unit,
  lesson: Lesson,
  next?: { level: Level; unit: Unit; lesson: Lesson } | null
) {
  const store = loadProgress() || {};
  const completed = new Set(store[pack.id]?.completedLessonIds || []);
  completed.add(lesson.id);
  store[pack.id] = {
    packId: pack.id,
    levelId: next?.level.id ?? level.id,
    unitId: next?.unit.id ?? unit.id,
    lessonId: next?.lesson.id ?? lesson.id,
    completedLessonIds: Array.from(completed),
    timestamp: Date.now(),
  };
  saveProgress(store);
}

export function getResumeLocation(packId: string): LessonLocation | null {
  return loadProgress()?.[packId] || null;
}

export function loadProgressStore(): ProgressStore | null {
  return loadProgress();
}

type LessonNavigationProps = {
  pack: LanguagePack;
  level: Level;
  unit: Unit;
  lesson: Lesson;
  t: Theme;
  s: Record<string, string>;
  onNavigate: (next: { level: Level; unit: Unit; lesson: Lesson }) => void;
  onReviewVocabulary: () => void;
  onPracticeQuiz: () => void;
  onReadAgain: () => void;
};

function findIndices(pack: LanguagePack, level: Level, unit: Unit, lesson: Lesson) {
  const levelIndex = pack.levels.findIndex((l) => l.id === level.id);
  const unitIndex = level.units.findIndex((u) => u.id === unit.id);
  const lessonIndex = unit.lessons.findIndex((ls) => ls.id === lesson.id);
  return { levelIndex, unitIndex, lessonIndex };
}

function totalLessonsInLevel(level: Level) {
  return level.units.reduce((sum, u) => sum + u.lessons.length, 0);
}

function lessonIndexInLevel(level: Level, unit: Unit, lesson: Lesson) {
  const unitIdx = level.units.findIndex((u) => u.id === unit.id);
  let lessonsBefore = 0;
  for (let i = 0; i < unitIdx; i++) {
    lessonsBefore += level.units[i].lessons.length;
  }
  const lessonIdx = unit.lessons.findIndex((ls) => ls.id === lesson.id);
  return lessonsBefore + lessonIdx;
}

function getNextTarget(
  pack: LanguagePack,
  level: Level,
  unit: Unit,
  lesson: Lesson
):
  | { type: "lesson"; level: Level; unit: Unit; lesson: Lesson }
  | { type: "unit"; level: Level; unit: Unit; lesson: Lesson }
  | { type: "level"; level: Level; unit: Unit; lesson: Lesson }
  | { type: "complete"; level: Level; unit: Unit; lesson: Lesson }
  | null {
  const { levelIndex, unitIndex, lessonIndex } = findIndices(pack, level, unit, lesson);
  if (levelIndex < 0 || unitIndex < 0 || lessonIndex < 0) return null;

  // Next lesson in same unit
  if (lessonIndex < unit.lessons.length - 1) {
    return { type: "lesson", level, unit, lesson: unit.lessons[lessonIndex + 1] };
  }

  // Next unit in same level
  if (unitIndex < level.units.length - 1) {
    const nextUnit = level.units[unitIndex + 1];
    return { type: "unit", level, unit: nextUnit, lesson: nextUnit.lessons[0] };
  }

  // Next level in pack
  if (levelIndex < pack.levels.length - 1) {
    const nextLevel = pack.levels[levelIndex + 1];
    const nextUnit = nextLevel.units[0];
    return { type: "level", level: nextLevel, unit: nextUnit, lesson: nextUnit.lessons[0] };
  }

  return { type: "complete", level, unit, lesson };
}

function getPrevTarget(
  pack: LanguagePack,
  level: Level,
  unit: Unit,
  lesson: Lesson
):
  | { level: Level; unit: Unit; lesson: Lesson }
  | null {
  const { levelIndex, unitIndex, lessonIndex } = findIndices(pack, level, unit, lesson);
  if (levelIndex < 0 || unitIndex < 0 || lessonIndex < 0) return null;

  if (lessonIndex > 0) {
    return { level, unit, lesson: unit.lessons[lessonIndex - 1] };
  }

  if (unitIndex > 0) {
    const prevUnit = level.units[unitIndex - 1];
    return { level, unit: prevUnit, lesson: prevUnit.lessons[prevUnit.lessons.length - 1] };
  }

  if (levelIndex > 0) {
    const prevLevel = pack.levels[levelIndex - 1];
    const prevUnit = prevLevel.units[prevLevel.units.length - 1];
    return { level: prevLevel, unit: prevUnit, lesson: prevUnit.lessons[prevUnit.lessons.length - 1] };
  }

  return null;
}

function ProgressBar({ value, t }: { value: number; t: Theme }) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  return (
    <div style={{ height: 6, background: t.card2, borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: "#60a5fa", transition: "width .3s" }} />
    </div>
  );
}

function FlashcardReview({ items, t }: { items: VocabularyItem[]; t: Theme }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  if (!items.length) return null;
  const item = items[idx % items.length];

  const next = () => {
    setFlipped(false);
    setIdx((i) => (i + 1) % items.length);
  };
  const prev = () => {
    setFlipped(false);
    setIdx((i) => (i - 1 + items.length) % items.length);
  };

  return (
    <div
      style={{
        marginTop: 14,
        padding: 14,
        borderRadius: 14,
        background: t.card,
        border: `1px solid ${t.border}`,
      }}
    >
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{
          minHeight: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: 12,
          background: t.card2,
          cursor: "pointer",
          padding: 16,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 700, color: t.text }}>
          {flipped ? item.translation : item.word}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
        <button onClick={prev} style={iconButtonStyle(t)}>
          <ChevronLeft size={18} />
        </button>
        <span style={{ fontSize: 12, color: t.textDim }}>
          {idx + 1}/{items.length}
        </span>
        <button onClick={next} style={iconButtonStyle(t)}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function iconButtonStyle(t: Theme): React.CSSProperties {
  return {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: `1px solid ${t.border}`,
    background: t.card,
    color: t.textMuted,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

export default function LessonNavigation({
  pack,
  level,
  unit,
  lesson,
  t,
  s,
  onNavigate,
  onReviewVocabulary,
  onPracticeQuiz,
  onReadAgain,
}: LessonNavigationProps) {
  const nextTarget = useMemo(() => getNextTarget(pack, level, unit, lesson), [pack, level, unit, lesson]);
  const prevTarget = useMemo(() => getPrevTarget(pack, level, unit, lesson), [pack, level, unit, lesson]);
  const [showFlashcards, setShowFlashcards] = useState(false);

  const unitLessonIdx = unit.lessons.findIndex((ls) => ls.id === lesson.id) + 1;
  const unitTotal = unit.lessons.length;
  const levelLessonIdx = lessonIndexInLevel(level, unit, lesson) + 1;
  const levelTotal = totalLessonsInLevel(level);

  const unitProgress = unitTotal ? unitLessonIdx / unitTotal : 0;
  const levelProgress = levelTotal ? levelLessonIdx / levelTotal : 0;

  const handleNext = () => {
    if (!nextTarget) return;
    markLessonCompleted(pack, level, unit, lesson, nextTarget);
    onNavigate({ level: nextTarget.level, unit: nextTarget.unit, lesson: nextTarget.lesson });
  };

  const handlePrev = () => {
    if (!prevTarget) return;
    onNavigate(prevTarget);
  };

  const isLastUnitLesson = nextTarget?.type === "unit" || nextTarget?.type === "level" || nextTarget?.type === "complete";
  const isLastLevelLesson = nextTarget?.type === "level" || nextTarget?.type === "complete";
  const isCurriculumComplete = nextTarget?.type === "complete";

  return (
    <div
      style={{
        marginTop: 24,
        padding: 16,
        borderRadius: 16,
        background: t.card,
        border: `1px solid ${t.border}`,
      }}
    >
      <h3 style={{ fontSize: 14, fontWeight: 700, color: t.textMuted, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 0.5 }}>
        {s.lessonProgress || "Lesson"} {unitLessonIdx} / {unitTotal}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: t.textDim, marginBottom: 4 }}>
            <span>{s.unitProgress || "Unit Progress"}</span>
            <span>{Math.round(unitProgress * 100)}%</span>
          </div>
          <ProgressBar value={unitProgress} t={t} />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: t.textDim, marginBottom: 4 }}>
            <span>{s.levelProgress || "Level Progress"}</span>
            <span>{Math.round(levelProgress * 100)}%</span>
          </div>
          <ProgressBar value={levelProgress} t={t} />
        </div>
      </div>

      {isCurriculumComplete ? (
        <div style={{ textAlign: "center", padding: "18px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎓</div>
          <h4 style={{ color: t.text, margin: "0 0 6px", fontSize: 18 }}>{s.curriculumCompletedTitle || "Congratulations!"}</h4>
          <p style={{ color: t.textDim, fontSize: 14, margin: "0 0 14px" }}>
            {s.curriculumCompletedBody || "You have completed the entire Lengoali curriculum. Keep learning by reviewing vocabulary, reading texts, flashcards, and quizzes."}
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: 14,
            borderRadius: 14,
            background: t.card2,
          }}
        >
          {isLastLevelLesson && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>🎉</div>
              <div style={{ color: t.text, fontWeight: 700 }}>
                {(s.levelCompleted || "You completed Level {{level}}").replace("{{level}}", level.cefr)}
              </div>
            </div>
          )}
          {isLastUnitLesson && !isLastLevelLesson && (
            <div style={{ textAlign: "center", color: t.text, fontWeight: 700 }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>✅</div>
              {s.unitCompleted || "Unit Completed"}
            </div>
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handlePrev}
              disabled={!prevTarget}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: 12,
                borderRadius: 10,
                border: `1px solid ${t.border}`,
                background: "transparent",
                color: prevTarget ? t.textMuted : t.textFaint,
                cursor: prevTarget ? "pointer" : "default",
                opacity: prevTarget ? 1 : 0.5,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <ChevronLeft size={16} /> {s.previousLesson || "Previous Lesson"}
            </button>
            <button
              onClick={handleNext}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: 12,
                borderRadius: 10,
                border: "none",
                background: "#2563eb",
                color: "#fff",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {isLastLevelLesson
                ? s.continueToNextLevel || "Continue to Next Level"
                : isLastUnitLesson
                ? s.continueToNextUnit || "Continue to Next Unit"
                : s.nextLesson || "Next Lesson"}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        <button onClick={onReviewVocabulary} style={quickButtonStyle(t)}>
          <Layers size={16} /> {s.reviewVocabulary || "Review Vocabulary"}
        </button>
        <button onClick={onPracticeQuiz} style={quickButtonStyle(t)}>
          <RotateCcw size={16} /> {s.practiceQuiz || "Practice Quiz"}
        </button>
        <button onClick={() => setShowFlashcards((v) => !v)} style={quickButtonStyle(t)}>
          <Star size={16} /> {s.openFlashcards || "Open Flashcards"}
        </button>
        <button onClick={onReadAgain} style={quickButtonStyle(t)}>
          <BookOpen size={16} /> {s.readAgain || "Read Again"}
        </button>
      </div>

      {showFlashcards && <FlashcardReview items={lesson.vocabulary} t={t} />}
    </div>
  );
}

function quickButtonStyle(t: Theme): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "10px 8px",
    borderRadius: 10,
    border: `1px solid ${t.border}`,
    background: t.card2,
    color: t.textMuted,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
  };
}
