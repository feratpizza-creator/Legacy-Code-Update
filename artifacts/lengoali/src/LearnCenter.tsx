import { useState, useMemo, useEffect, useRef } from "react";
import {
  type LanguagePack,
  type Level,
  type Unit,
  type Lesson,
  type VocabularyItem,
  type QuizQuestion,
  type Exercise,
} from "./learn-data";
import LessonNavigation, { loadProgressStore } from "./components/LessonNavigation";
import {
  BookOpen,
  ChevronLeft,
  GraduationCap,
  Volume2,
  Star,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

type Theme = {
  bg: string;
  card: string;
  card2: string;
  border: string;
  text: string;
  textMuted: string;
  textDim: string;
  textFaint: string;
  navBg: string;
  inputBg: string;
  inputBorder: string;
  pillBg: string;
  overlay: string;
  sheetBg: string;
};

type NativeLanguage = {
  code: string;
  name: string;
  flag: string;
};

const NATIVE_LANGUAGES: NativeLanguage[] = [
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "ku", name: "Kurdî", flag: "🇮🇶" },
  { code: "fa", name: "فارسی", flag: "🇮🇷" },
];

const ONBOARDING_KEY = "lengoali-learn-onboarding";

function speak(text: string, lang: string) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    const synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "fi" ? "fi-FI" : lang === "ar" ? "ar-SA" : lang === "en" ? "en-US" : lang;
    u.rate = 0.9;
    synth.speak(u);
  } catch { /* ignore */ }
}

function SpeakBtn({ text, lang, t }: { text: string; lang: string; t: Theme }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        speak(text, lang);
      }}
      title="Listen"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: `1px solid ${t.border}`,
        background: t.card,
        color: "#60a5fa",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
      }}
    >
      <Volume2 size={14} />
    </button>
  );
}

function SectionTitle({ children, t }: { children: React.ReactNode; t: Theme }) {
  return (
    <h3 style={{ fontSize: 14, fontWeight: 700, color: t.textMuted, margin: "16px 0 8px", textTransform: "uppercase", letterSpacing: 0.5 }}>
      {children}
    </h3>
  );
}

function Card({ children, onClick, t, active = false }: { children: React.ReactNode; onClick?: () => void; t: Theme; active?: boolean }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: t.card,
        border: `1px solid ${active ? "#60a5fa" : t.border}`,
        borderRadius: 14,
        padding: 14,
        cursor: onClick ? "pointer" : "default",
        transition: "all .15s ease",
        boxShadow: active ? "0 0 0 2px #60a5fa33" : "none",
      }}
    >
      {children}
    </div>
  );
}

function ProgressBar({ value, t }: { value: number; t: Theme }) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  return (
    <div style={{ height: 6, background: t.card2, borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: "#60a5fa", transition: "width .3s" }} />
    </div>
  );
}

type LearnCenterProps = {
  t: Theme;
  s: Record<string, string>;
  languagePacks: LanguagePack[];
  onReadText: (text: string, srcLang: string) => void;
  onSaveWord: (word: string, srcLang: string, translation: string) => void;
};

function loadOnboarding() {
  try {
    const raw = localStorage.getItem(ONBOARDING_KEY);
    if (raw) return JSON.parse(raw) as { targetLang: string; nativeLang: string } | null;
  } catch { /* ignore */ }
  return null;
}

function saveOnboarding(targetLang: string, nativeLang: string) {
  try {
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ targetLang, nativeLang }));
  } catch { /* ignore */ }
}

export default function LearnCenter({ t, s, languagePacks, onReadText, onSaveWord }: LearnCenterProps) {
  const saved = loadOnboarding();
  const [selectedPack, setSelectedPack] = useState<LanguagePack | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [explanationLang, setExplanationLang] = useState<string>(saved?.nativeLang || "en");
  const [savedVocab, setSavedVocab] = useState<Set<string>>(new Set());
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!saved);
  const [targetLang, setTargetLang] = useState<string | null>(saved?.targetLang || null);
  const [nativeLang, setNativeLang] = useState<string | null>(saved?.nativeLang || null);
  const [hasResumed, setHasResumed] = useState<boolean>(false);

  const targetLanguages = useMemo(() => {
    return languagePacks.map((pack) => ({ code: pack.targetLang, name: pack.name, flag: pack.flag }));
  }, [languagePacks]);

  const filteredPacks = useMemo(() => {
    if (!targetLang) return languagePacks;
    return languagePacks.filter((pack) => pack.targetLang === targetLang);
  }, [languagePacks, targetLang]);

  const allLevels = useMemo(() => {
    return languagePacks.flatMap((p) => p.levels.map((lvl) => ({ pack: p, level: lvl })));
  }, [languagePacks]);

  // Auto-resume saved progress on mount
  useEffect(() => {
    if (hasResumed || selectedPack || languagePacks.length === 0) return;
    const store = loadProgressStore();
    if (!store) return;
    for (const pack of languagePacks) {
      const loc = store[pack.id];
      if (!loc) continue;
      const level = pack.levels.find((l) => l.id === loc.levelId);
      const unit = level?.units.find((u) => u.id === loc.unitId);
      const lesson = unit?.lessons.find((ls) => ls.id === loc.lessonId);
      if (level && unit && lesson) {
        setSelectedPack(pack);
        setSelectedLevel(level);
        setSelectedUnit(unit);
        setActiveLesson(lesson);
        setShowOnboarding(false);
        setHasResumed(true);
        break;
      }
    }
  }, [hasResumed, languagePacks, selectedPack]);

  const handleSelectTarget = (code: string) => {
    setTargetLang(code);
  };

  const handleSelectNative = (code: string) => {
    setNativeLang(code);
    setExplanationLang(code);
  };

  const handleStart = () => {
    if (!targetLang || !nativeLang) return;
    saveOnboarding(targetLang, nativeLang);
    setShowOnboarding(false);
  };

  const handleResetOnboarding = () => {
    setShowOnboarding(true);
    setTargetLang(null);
    setNativeLang(null);
    setSelectedPack(null);
    setSelectedLevel(null);
    setSelectedUnit(null);
    setActiveLesson(null);
    try {
      localStorage.removeItem(ONBOARDING_KEY);
    } catch { /* ignore */ }
  };

  // ─── Lesson view ───────────────────────────────────────────────────────────
  if (activeLesson && selectedPack && selectedLevel && selectedUnit) {
    return (
      <LessonView
        lesson={activeLesson}
        pack={selectedPack}
        level={selectedLevel}
        unit={selectedUnit}
        explanationLang={explanationLang}
        onBack={() => setActiveLesson(null)}
        onReadText={onReadText}
        onSaveWord={(word, translation) => {
          const key = `${selectedPack.targetLang}:${word}`;
          if (savedVocab.has(key)) return;
          setSavedVocab((prev) => new Set([...Array.from(prev), key]));
          onSaveWord(word, selectedPack.targetLang, translation);
        }}
        onNavigate={(next) => {
          setSelectedLevel(next.level);
          setSelectedUnit(next.unit);
          setActiveLesson(next.lesson);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        t={t}
        s={s}
      />
    );
  }

  // ─── Unit view ─────────────────────────────────────────────────────────────
  if (selectedUnit && selectedLevel && selectedPack) {
    return (
      <div style={{ padding: "16px 16px 100px" }}>
        <button
          onClick={() => setSelectedUnit(null)}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: t.textDim, cursor: "pointer", padding: "4px 0", marginBottom: 12 }}
        >
          <ChevronLeft size={16} /> {s.back || "Back"}
        </button>
        <h2 style={{ color: t.text, margin: "0 0 4px" }}>{selectedUnit.title}</h2>
        <p style={{ color: t.textDim, margin: "0 0 16px", fontSize: 14 }}>{selectedUnit.description}</p>
        <SectionTitle t={t}>{s.lessons || "Lessons"}</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {selectedUnit.lessons.map((lesson, idx) => (
            <Card key={lesson.id} t={t} onClick={() => setActiveLesson(lesson)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#60a5fa22", color: "#60a5fa", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: t.text, fontWeight: 600 }}>{lesson.title}</div>
                  <div style={{ color: t.textDim, fontSize: 12 }}>{lesson.vocabulary.length} {s.words || "words"}</div>
                </div>
                <ArrowRight size={18} color={t.textDim} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // ─── Level view ────────────────────────────────────────────────────────────
  if (selectedLevel && selectedPack) {
    return (
      <div style={{ padding: "16px 16px 100px" }}>
        <button
          onClick={() => setSelectedLevel(null)}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: t.textDim, cursor: "pointer", padding: "4px 0", marginBottom: 12 }}
        >
          <ChevronLeft size={16} /> {s.back || "Back"}
        </button>
        <h2 style={{ color: t.text, margin: "0 0 4px" }}>{selectedLevel.title}</h2>
        <p style={{ color: t.textDim, margin: "0 0 16px", fontSize: 14 }}>{selectedLevel.description}</p>
        <SectionTitle t={t}>{s.units || "Units"}</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {selectedLevel.units.map((unit) => (
            <Card key={unit.id} t={t} onClick={() => setSelectedUnit(unit)}>
              <div style={{ color: t.text, fontWeight: 600, marginBottom: 4 }}>{unit.title}</div>
              <div style={{ color: t.textDim, fontSize: 13 }}>{unit.description}</div>
              <div style={{ color: t.textFaint, fontSize: 12, marginTop: 6 }}>{unit.lessons.length} {s.lessons || "lessons"}</div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // ─── Onboarding flow ─────────────────────────────────────────────────────────
  if (showOnboarding) {
    return (
      <div style={{ padding: "16px 16px 100px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#60a5fa22", display: "flex", alignItems: "center", justifyContent: "center", color: "#60a5fa" }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 style={{ color: t.text, margin: "0 0 2px", fontSize: 22 }}>{s.learn || "Learn"}</h1>
            <p style={{ color: t.textDim, margin: 0, fontSize: 13 }}>{s.chooseLanguagePack || "Choose a language pack and start learning."}</p>
          </div>
        </div>

        {!targetLang ? (
          <>
            <h2 style={{ color: t.text, margin: "0 0 16px", fontSize: 18 }}>{s.whatToLearn || "What language do you want to learn?"}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {targetLanguages.map((lang) => (
                <Card key={lang.code} t={t} onClick={() => handleSelectTarget(lang.code)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 32 }}>{lang.flag}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: t.text, fontWeight: 700, fontSize: 16 }}>{lang.name}</div>
                    </div>
                    <ArrowRight size={18} color={t.textDim} />
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : !nativeLang ? (
          <>
            <button
              onClick={() => { setTargetLang(null); }}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: t.textDim, cursor: "pointer", padding: "4px 0", marginBottom: 12 }}
            >
              <ChevronLeft size={16} /> {s.back || "Back"}
            </button>
            <h2 style={{ color: t.text, margin: "0 0 16px", fontSize: 18 }}>{s.whatIsYourNativeLanguage || "What is your native language?"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
              {NATIVE_LANGUAGES.map((lang) => (
                <Card key={lang.code} t={t} onClick={() => handleSelectNative(lang.code)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{lang.flag}</span>
                    <div style={{ color: t.text, fontWeight: 700, fontSize: 14 }}>{lang.name}</div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => { setNativeLang(null); }}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: t.textDim, cursor: "pointer", padding: "4px 0", marginBottom: 12 }}
            >
              <ChevronLeft size={16} /> {s.back || "Back"}
            </button>
            <Card t={t}>
              <div style={{ color: t.text, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
                {s.youChose || "You chose"}:
              </div>
              <div style={{ color: t.textDim, marginBottom: 16 }}>
                {s.iWantToLearn || "I want to learn"}: <strong style={{ color: t.text }}>{targetLanguages.find((l) => l.code === targetLang)?.name}</strong>
                <br />
                {s.myNativeLanguageIs || "My native language is"}: <strong style={{ color: t.text }}>{NATIVE_LANGUAGES.find((l) => l.code === nativeLang)?.name}</strong>
              </div>
              <button
                onClick={handleStart}
                style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "#2563eb", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                {s.startLearning || "Start learning"}
              </button>
            </Card>
          </>
        )}
      </div>
    );
  }

  // ─── Pack / landing view ───────────────────────────────────────────────────
  return (
    <div style={{ padding: "16px 16px 100px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h1 style={{ color: t.text, margin: "0 0 4px", fontSize: 22 }}>{s.learn || "Learn"}</h1>
          <p style={{ color: t.textDim, margin: 0, fontSize: 13 }}>{s.chooseLanguagePack || "Choose a language pack and start learning."}</p>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#60a5fa22", display: "flex", alignItems: "center", justifyContent: "center", color: "#60a5fa" }}>
          <GraduationCap size={22} />
        </div>
      </div>

      {selectedPack ? (
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => { setSelectedPack(null); setSelectedLevel(null); setSelectedUnit(null); setActiveLesson(null); }}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: t.textDim, cursor: "pointer", padding: "4px 0" }}
          >
            <ChevronLeft size={16} /> {s.back || "Back"}
          </button>
          <label style={{ display: "flex", alignItems: "center", gap: 8, color: t.textDim, fontSize: 13 }}>
            {s.explanationLanguage || "Explanation language"}:
            <select
              value={explanationLang}
              onChange={(e) => setExplanationLang(e.target.value)}
              style={{ background: t.inputBg, color: t.text, border: `1px solid ${t.inputBorder}`, borderRadius: 8, padding: "4px 8px" }}
            >
              {selectedPack.explanationLangs.map((lng) => (
                <option key={lng} value={lng}>{lng.toUpperCase()}</option>
              ))}
            </select>
          </label>
        </div>
      ) : (
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
          <div style={{ color: t.textDim, fontSize: 13 }}>
            {s.iWantToLearn || "I want to learn"}: <strong style={{ color: t.text }}>{targetLanguages.find((l) => l.code === targetLang)?.name}</strong>
            {' · '}
            {s.myNativeLanguageIs || "My native language is"}: <strong style={{ color: t.text }}>{NATIVE_LANGUAGES.find((l) => l.code === nativeLang)?.name}</strong>
          </div>
          <button
            onClick={handleResetOnboarding}
            style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${t.border}`, background: t.card, color: t.textDim, cursor: "pointer", fontSize: 13 }}
          >
            {s.changeLanguage || "Change language"}
          </button>
        </div>
      )}

      {!selectedPack && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredPacks.map((pack) => (
            <Card key={pack.id} t={t} onClick={() => setSelectedPack(pack)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 32 }}>{pack.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: t.text, fontWeight: 700, fontSize: 16 }}>{pack.name}</div>
                  <div style={{ color: t.textDim, fontSize: 13 }}>{pack.description}</div>
                </div>
                <ArrowRight size={18} color={t.textDim} />
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedPack && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <SectionTitle t={t}>{s.levels || "Levels"}</SectionTitle>
          {selectedPack.levels.map((level) => (
            <Card key={level.id} t={t} onClick={() => setSelectedLevel(level)}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ color: t.text, fontWeight: 700 }}>{level.title}</div>
                  <div style={{ color: t.textDim, fontSize: 13 }}>{level.description}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#60a5fa" }}>{level.units.length}</div>
                  <div style={{ fontSize: 11, color: t.textFaint }}>{s.units || "units"}</div>
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <ProgressBar value={0} t={t} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function LessonView({
  lesson,
  pack,
  level,
  unit,
  explanationLang,
  onBack,
  onReadText,
  onSaveWord,
  onNavigate,
  t,
  s,
}: {
  lesson: Lesson;
  pack: LanguagePack;
  level: Level;
  unit: Unit;
  explanationLang: string;
  onBack: () => void;
  onReadText: (text: string, srcLang: string) => void;
  onSaveWord: (word: string, translation: string) => void;
  onNavigate: (next: { level: Level; unit: Unit; lesson: Lesson }) => void;
  t: Theme;
  s: Record<string, string>;
}) {
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizChecked, setQuizChecked] = useState(false);

  const vocabRef = useRef<HTMLDivElement>(null);
  const readingRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleReviewVocabulary = () => scrollTo(vocabRef);
  const handleReadAgain = () => {
    scrollTo(readingRef);
    onReadText(lesson.reading.text, pack.targetLang);
  };
  const handlePracticeQuiz = () => {
    setQuizAnswers({});
    setQuizChecked(false);
    scrollTo(quizRef);
  };

  const handleQuizSelect = (qid: string, option: string) => {
    if (quizChecked) return;
    setQuizAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const correctCount = lesson.quiz.filter((q) => quizAnswers[q.id] === q.answer).length;

  return (
    <div style={{ padding: "16px 16px 100px" }}>
      <button
        onClick={onBack}
        style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: t.textDim, cursor: "pointer", padding: "4px 0", marginBottom: 12 }}
      >
        <ChevronLeft size={16} /> {s.back || "Back"}
      </button>

      <h2 style={{ color: t.text, margin: "0 0 6px" }}>{lesson.title}</h2>
      <p style={{ color: t.textDim, margin: "0 0 16px", fontSize: 14 }}>{lesson.objective}</p>

      <div ref={vocabRef}>
        <SectionTitle t={t}>{s.vocabulary || "Vocabulary"}</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {lesson.vocabulary.map((v) => (
            <VocabCard key={v.word} v={v} pack={pack} t={t} s={s} onSaveWord={onSaveWord} />
          ))}
        </div>
      </div>

      {lesson.grammar.length > 0 && (
        <>
          <SectionTitle t={t}>{s.grammar || "Grammar"}</SectionTitle>
          {lesson.grammar.map((g) => (
            <Card key={g.title} t={t}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Lightbulb size={16} color="#fbbf24" />
                <span style={{ color: t.text, fontWeight: 700 }}>{g.title}</span>
              </div>
              <p style={{ color: t.textDim, fontSize: 13, margin: "0 0 10px" }}>{g.explanation}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {g.examples.map((ex, idx) => (
                  <div key={idx} style={{ background: t.card2, borderRadius: 8, padding: 10 }}>
                    <div style={{ color: t.text, fontWeight: 600 }}>{ex.target}</div>
                    <div style={{ color: t.textDim, fontSize: 12 }}>{ex.meaning}</div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </>
      )}

      <div ref={readingRef}>
        <SectionTitle t={t}>{s.reading || "Reading"}</SectionTitle>
        <Card t={t}>
          {lesson.reading.title && <div style={{ color: t.text, fontWeight: 700, marginBottom: 8 }}>{lesson.reading.title}</div>}
          <p style={{ color: t.text, margin: "0 0 10px", fontSize: 15, lineHeight: 1.6 }}>{lesson.reading.text}</p>
          {lesson.reading.translation && <p style={{ color: t.textDim, margin: 0, fontSize: 13 }}>{lesson.reading.translation}</p>}
          <button
            onClick={() => onReadText(lesson.reading.text, pack.targetLang)}
            style={{ marginTop: 12, width: "100%", padding: 12, borderRadius: 10, border: "none", background: "#2563eb", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <BookOpen size={16} /> {s.openInReader || "Open in Reader"}
          </button>
        </Card>
      </div>

      {lesson.exercises.length > 0 && (
        <>
          <SectionTitle t={t}>{s.exercise || "Exercise"}</SectionTitle>
          {lesson.exercises.map((ex, idx) => (
            <ExerciseCard key={idx} ex={ex} t={t} s={s} pack={pack} />
          ))}
        </>
      )}

      <div ref={quizRef}>
        <SectionTitle t={t}>{s.quiz || "Quiz"}</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {lesson.quiz.map((q) => (
            <QuizCard key={q.id} q={q} t={t} s={s} selected={quizAnswers[q.id]} checked={quizChecked} onSelect={(option) => handleQuizSelect(q.id, option)} />
          ))}
        </div>
      </div>
      {!quizChecked ? (
        <button
          onClick={() => setQuizChecked(true)}
          disabled={lesson.quiz.some((q) => !quizAnswers[q.id])}
          style={{ width: "100%", marginTop: 14, padding: 12, borderRadius: 10, border: "none", background: "#2563eb", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", opacity: lesson.quiz.some((q) => !quizAnswers[q.id]) ? 0.5 : 1 }}
        >
          {s.checkAnswers || "Check answers"}
        </button>
      ) : (
        <Card t={t}>
          <div style={{ textAlign: "center", color: t.text, fontWeight: 700, fontSize: 18 }}>
            {correctCount}/{lesson.quiz.length} {s.correct || "correct"}
          </div>
          <button
            onClick={() => { setQuizAnswers({}); setQuizChecked(false); }}
            style={{ width: "100%", marginTop: 10, padding: 10, borderRadius: 10, border: `1px solid ${t.border}`, background: "transparent", color: t.textMuted, cursor: "pointer" }}
          >
            {s.tryAgain || "Try again"}
          </button>
        </Card>
      )}

      <LessonNavigation
        pack={pack}
        level={level}
        unit={unit}
        lesson={lesson}
        t={t}
        s={s}
        onNavigate={onNavigate}
        onReviewVocabulary={handleReviewVocabulary}
        onPracticeQuiz={handlePracticeQuiz}
        onReadAgain={handleReadAgain}
      />
    </div>
  );
}

function VocabCard({ v, pack, t, s, onSaveWord }: { v: VocabularyItem; pack: LanguagePack; t: Theme; s: Record<string, string>; onSaveWord: (word: string, translation: string) => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <Card t={t}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: t.text, fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{v.word}</div>
          <div style={{ color: t.textDim, fontSize: 13 }}>{v.translation}{v.pos ? ` · ${v.pos}` : ""}</div>
          {v.example && <div style={{ color: t.textFaint, fontSize: 12, marginTop: 4 }}>{v.example}</div>}
        </div>
        <SpeakBtn text={v.word} lang={pack.targetLang} t={t} />
        <button
          onClick={() => { if (!saved) { onSaveWord(v.word, v.translation); setSaved(true); } }}
          title={saved ? s.saved || "Saved" : s.saveWord || "Save word"}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: "none", background: saved ? "#fbbf2422" : t.card2, color: saved ? "#fbbf24" : t.textMuted, cursor: saved ? "default" : "pointer" }}
        >
          <Star size={16} fill={saved ? "#fbbf24" : "none"} />
        </button>
      </div>
    </Card>
  );
}

function ExerciseCard({ ex, t, s, pack }: { ex: Exercise; t: Theme; s: Record<string, string>; pack: LanguagePack }) {
  if (ex.type === "match") {
    const entries = Object.entries(ex.pairs);
    return (
      <Card t={t}>
        <div style={{ color: t.text, fontWeight: 600, marginBottom: 10 }}>{ex.prompt}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {entries.map(([k, v]) => (
            <div key={k} style={{ background: t.card2, borderRadius: 8, padding: 10 }}>
              <div style={{ color: t.text, fontWeight: 700 }}>{k}</div>
              <div style={{ color: t.textDim, fontSize: 13 }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  if (ex.type === "fill") {
    return (
      <Card t={t}>
        <div style={{ color: t.text, fontWeight: 600, marginBottom: 10 }}>{ex.prompt}</div>
        {ex.blanks.map((b, idx) => (
          <div key={idx} style={{ color: t.textDim, fontSize: 13, marginBottom: 6 }}>{b.sentence}</div>
        ))}
      </Card>
    );
  }
  return (
    <Card t={t}>
      <div style={{ color: t.text, fontWeight: 600, marginBottom: 10 }}>{ex.prompt}</div>
      <div style={{ color: t.textDim, fontSize: 14 }}>{ex.question}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
        {ex.options.map((opt) => (
          <div key={opt} style={{ padding: 8, borderRadius: 8, background: t.card2, color: t.text, fontSize: 13 }}>{opt}</div>
        ))}
      </div>
    </Card>
  );
}

function QuizCard({ q, t, s, selected, checked, onSelect }: { q: QuizQuestion; t: Theme; s: Record<string, string>; selected?: string; checked: boolean; onSelect: (option: string) => void }) {
  return (
    <Card t={t}>
      <div style={{ color: t.text, fontWeight: 600, marginBottom: 10 }}>{q.question}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = option === q.answer;
          let bg = t.card2;
          let color = t.text;
          if (checked) {
            if (isCorrect) { bg = "#22c55e22"; color = "#22c55e"; }
            else if (isSelected) { bg = "#ef444422"; color = "#ef4444"; }
          } else if (isSelected) {
            bg = "#60a5fa22"; color = "#60a5fa";
          }
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              disabled={checked}
              style={{ textAlign: "left", padding: 12, borderRadius: 10, border: "none", background: bg, color, cursor: checked ? "default" : "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              {option}
              {checked && isCorrect && <CheckCircle2 size={16} color="#22c55e" />}
              {checked && isSelected && !isCorrect && <XCircle size={16} color="#ef4444" />}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
