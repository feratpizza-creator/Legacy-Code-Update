import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Check, Search, Star, Volume2, RotateCcw, Zap } from "lucide-react";
import type { LanguagePack } from "../learn-data";
import {
  buildVocabularyCatalog,
  countVocabularyStates,
  getVocabularyReview,
  loadVocabularyProgress,
  reviewVocabularyWord,
  saveVocabularyProgress,
  type CurriculumVocabularyWord,
  type VocabularyProgress,
  type VocabularyState,
} from "../vocabulary-data";

type Theme = {
  card: string;
  card2: string;
  border: string;
  text: string;
  textMuted: string;
  textDim: string;
  textFaint: string;
  inputBg: string;
  inputBorder: string;
};

export type WordSaveDetails = {
  /** Language of the saved translation, not the word being learned. */
  translationLang: string;
  pos?: string;
  synonym?: string;
  antonym?: string;
  collocation?: string;
  wordFamily?: string;
  example?: string;
  exampleTranslation?: string;
  ipa?: string;
  definition?: string;
  cefr?: string;
  tags?: string;
};

type WordVocabProps = {
  t: Theme;
  s: Record<string, string>;
  languagePacks: LanguagePack[];
  defaultTargetLang: string;
  defaultNativeLang: string;
  onTranslateText: (text: string, sourceLang: string, targetLang: string) => Promise<string | null>;
  onSaveWord: (word: string, sourceLang: string, translation: string, details?: WordSaveDetails) => void;
};

type VocabPrefs = { targetLang: string; nativeLang: string };
type LevelFilter = "all" | "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
type StateFilter = "all" | VocabularyState | "due";

const PREFS_KEY = "lengoali_word_vocab_v3";
const LEVELS: LevelFilter[] = ["all", "A0", "A1", "A2", "B1", "B2", "C1", "C2"];

function loadPrefs(): VocabPrefs | null {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? JSON.parse(raw) as VocabPrefs : null;
  } catch {
    return null;
  }
}

function savePrefs(prefs: VocabPrefs) {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch { /* storage can be unavailable */ }
}

function speak(text: string, lang: string) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "en" ? "en-US" : lang === "fi" ? "fi-FI" : lang === "ar" ? "ar-SA" : lang;
    utterance.rate = 0.9;
    synth.speak(utterance);
  } catch { /* ignore unavailable TTS */ }
}

function SpeakButton({ text, lang, t, label = "Listen" }: { text: string; lang: string; t: Theme; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => speak(text, lang)}
      title={label}
      aria-label={`${label}: ${text}`}
      style={{ width: 34, height: 34, borderRadius: "50%", border: `1px solid ${t.border}`, background: t.card2, color: "#60a5fa", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
    >
      <Volume2 size={15} />
    </button>
  );
}

function labelForState(state: VocabularyState, s: Record<string, string>): string {
  if (state === "learned") return s.learned || "Learned";
  if (state === "learning") return s.learning || "Learning";
  return s.new || "New";
}

function statusColor(state: VocabularyState): string {
  return state === "learned" ? "#22c55e" : state === "learning" ? "#f59e0b" : "#60a5fa";
}

function pillStyle(color: string, t: Theme): CSSProperties {
  return { border: `1px solid ${color}55`, background: `${color}18`, color, borderRadius: 20, padding: "4px 9px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" };
}

export default function LearnWordVocab({ t, s, languagePacks, defaultTargetLang, defaultNativeLang, onTranslateText, onSaveWord }: WordVocabProps) {
  const stored = loadPrefs();
  const initialTarget = languagePacks.some((pack) => pack.targetLang === stored?.targetLang)
    ? stored!.targetLang
    : languagePacks.some((pack) => pack.targetLang === defaultTargetLang)
      ? defaultTargetLang
      : languagePacks[0]?.targetLang || "en";
  const initialNative = stored?.nativeLang || defaultNativeLang || "ar";
  const [targetLang, setTargetLang] = useState(initialTarget);
  const [nativeLang, setNativeLang] = useState(initialNative);
  const [level, setLevel] = useState<LevelFilter>("all");
  const [unitId, setUnitId] = useState("all");
  const [stateFilter, setStateFilter] = useState<StateFilter>("all");
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState<VocabularyProgress>(() => loadVocabularyProgress());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [enriched, setEnriched] = useState<Partial<CurriculumVocabularyWord>>({});
  const requestId = useRef(0);

  const pack = languagePacks.find((candidate) => candidate.targetLang === targetLang) || languagePacks[0];
  const catalog = useMemo(() => pack ? buildVocabularyCatalog(pack) : [], [pack]);
  const counts = useMemo(() => countVocabularyStates(catalog, progress), [catalog, progress]);
  const units = useMemo(() => {
    const byId = new Map<string, { id: string; title: string }>();
    for (const word of catalog) byId.set(word.unitId, { id: word.unitId, title: word.unitTitle });
    return Array.from(byId.values());
  }, [catalog]);

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return catalog.filter((word) => {
      const review = getVocabularyReview(progress, word.id);
      if (level !== "all" && word.level !== level) return false;
      if (unitId !== "all" && word.unitId !== unitId) return false;
      if (stateFilter === "due" && !(review.dueAt <= Date.now() && review.state !== "new")) return false;
      if (stateFilter !== "all" && stateFilter !== "due" && review.state !== stateFilter) return false;
      if (!query) return true;
      return [word.word, word.nativeMeaning, word.unitTitle, word.category, ...word.tags].some((value) => value.toLocaleLowerCase().includes(query));
    });
  }, [catalog, level, progress, search, stateFilter, unitId]);

  useEffect(() => {
    if (!filtered.length) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !filtered.some((word) => word.id === selectedId)) setSelectedId(filtered[0]!.id);
  }, [filtered, selectedId]);

  const current = filtered.find((word) => word.id === selectedId) || filtered[0] || null;
  const display = current ? { ...current, ...enriched } : null;
  const currentReview = current ? getVocabularyReview(progress, current.id) : null;

  useEffect(() => {
    setEnriched({});
    setSaved(false);
    const currentRequest = ++requestId.current;
    if (!current || !pack) return;
    const curriculumMeaningLang = current.nativeMeaningLang || pack.explanationLangs[0] || "en";
    if (nativeLang === curriculumMeaningLang || nativeLang === current.language) return;
    let active = true;
    void Promise.all([
      onTranslateText(current.word, current.language, nativeLang),
      current.example ? onTranslateText(current.example, current.language, nativeLang) : Promise.resolve(null),
    ]).then(([translation, exampleTranslation]) => {
      if (!active || currentRequest !== requestId.current) return;
      setEnriched({
        nativeMeaning: translation || current.nativeMeaning,
        exampleTranslation: exampleTranslation || current.exampleTranslation,
      });
    }).catch(() => { /* local curriculum remains the source of truth */ });
    return () => { active = false; };
  }, [current, nativeLang, onTranslateText, pack]);

  function chooseLanguage(code: string) {
    setTargetLang(code);
    setLevel("all");
    setUnitId("all");
    savePrefs({ targetLang: code, nativeLang });
  }

  function chooseNative(code: string) {
    setNativeLang(code);
    savePrefs({ targetLang, nativeLang: code });
  }

  function review(result: "again" | "good" | "easy") {
    if (!current) return;
    const nextProgress = reviewVocabularyWord(progress, current.id, result);
    setProgress(nextProgress);
    saveVocabularyProgress(nextProgress);
    setSaved(false);
    const index = filtered.findIndex((word) => word.id === current.id);
    setSelectedId(filtered[(index + 1) % Math.max(filtered.length, 1)]?.id || null);
  }

  function saveCurrent() {
    if (!display) return;
    onSaveWord(display.word, display.language, display.nativeMeaning, {
      translationLang: nativeLang,
      pos: display.pos,
      synonym: display.synonyms.join(", "),
      antonym: display.antonyms.join(", "),
      collocation: display.collocations.join(", "),
      wordFamily: display.wordFamily.join(", "),
      example: display.example,
      exampleTranslation: display.exampleTranslation,
      ipa: display.ipa,
      definition: display.definition,
      cefr: display.cefr,
      tags: display.tags.join(", "),
    });
    setSaved(true);
  }

  if (!pack) {
    return <div style={{ color: t.textDim, padding: 24, textAlign: "center" }}>{s.wordLoading || "Loading the local vocabulary curriculum…"}</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <header style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <h2 style={{ color: t.text, margin: 0, fontSize: 22 }}>{s.learnWords || "New words"}</h2>
        <p style={{ color: t.textDim, margin: 0, fontSize: 13, lineHeight: 1.6 }}>{s.vocabCurriculumHint || "Study a structured CEFR vocabulary curriculum — not random words."}</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 7 }}>
        {(["new", "learning", "learned"] as const).map((state) => (
          <button key={state} type="button" onClick={() => setStateFilter(state)} style={{ ...pillStyle(statusColor(state), t), cursor: "pointer", opacity: stateFilter === state ? 1 : 0.7, textAlign: "left" }}>
            {counts[state]} <span style={{ fontWeight: 500 }}>{labelForState(state, s)}</span>
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {languagePacks.map((candidate) => (
          <button key={candidate.targetLang} type="button" onClick={() => chooseLanguage(candidate.targetLang)} style={{ ...pillStyle(candidate.targetLang === targetLang ? "#60a5fa" : t.textMuted, t), cursor: "pointer", opacity: candidate.targetLang === targetLang ? 1 : 0.7 }}>
            {candidate.flag} {candidate.name}
          </button>
        ))}
        <select aria-label={s.selectNativeLang || "Explanation language"} value={nativeLang} onChange={(event) => chooseNative(event.target.value)} style={{ marginLeft: "auto", minWidth: 130, padding: "5px 8px", borderRadius: 20, border: `1px solid ${t.border}`, background: t.card2, color: t.text, fontSize: 11 }}>
          {Array.from(new Set(["ar", "en", "fi", "es", "fr", "de", ...pack.explanationLangs])).map((code) => <option key={code} value={code}>{code.toUpperCase()}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 8 }}>
        <select aria-label={s.levels || "CEFR level"} value={level} onChange={(event) => { setLevel(event.target.value as LevelFilter); setUnitId("all"); }} style={filterStyle(t)}>
          <option value="all">{s.levels || "All levels"}</option>
          {LEVELS.slice(1).map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <select aria-label={s.units || "Unit"} value={unitId} onChange={(event) => setUnitId(event.target.value)} style={filterStyle(t)}>
          <option value="all">{s.units || "All units"}</option>
          {units.map((unit) => <option key={unit.id} value={unit.id}>{unit.id} · {unit.title}</option>)}
        </select>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: t.textFaint }} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={s.searchVocabulary || "Search this curriculum…"} style={{ ...filterStyle(t), width: "100%", paddingLeft: 32 }} />
        </div>
        <button type="button" onClick={() => setStateFilter(stateFilter === "due" ? "all" : "due")} style={{ ...filterStyle(t), color: stateFilter === "due" ? "#f59e0b" : t.textMuted, cursor: "pointer", width: "auto" }} title={s.reviewDue || "Due for review"}>🔁</button>
      </div>

      {!current ? <div style={{ color: t.textDim, textAlign: "center", padding: 28 }}>{s.noVocabularyMatches || "No words match these filters."}</div> : (
        <>
          <div style={{ color: t.textDim, fontSize: 12 }}>{filtered.length} {s.words || "words"} · {current.unitTitle} · {current.lessonTitle}</div>
          <article style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <strong style={{ color: t.text, fontSize: 30, lineHeight: 1.1 }}>{display?.word}</strong>
                  <span style={pillStyle(statusColor(currentReview!.state), t)}>{labelForState(currentReview!.state, s)}</span>
                </div>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 10 }}>
                  <span style={pillStyle("#a78bfa", t)}>{display?.cefr}</span>
                  <span style={pillStyle("#38bdf8", t)}>{display?.pos}</span>
                  {display?.tags.map((tag) => <span key={tag} style={pillStyle(t.textMuted, t)}>{tag}</span>)}
                </div>
              </div>
              <SpeakButton text={display?.word || ""} lang={display?.language || targetLang} t={t} />
            </div>

            {display?.ipa && <div style={{ color: t.textDim, fontFamily: "monospace", fontSize: 14 }}>/{display.ipa}/</div>}
            {display?.definition && <InfoBlock title={s.wordDefinition || "Definition"} value={display.definition} t={t} />}
            <InfoBlock title={`${s.wordTranslation || "Meaning"} · ${nativeLang.toUpperCase()}`} value={display?.nativeMeaning || "—"} t={t} direction={nativeLang === "ar" ? "rtl" : "ltr"} />

            {display?.example && <div style={{ background: t.card2, borderRadius: 11, padding: 13 }}>
              <div style={{ color: t.textFaint, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>{s.wordExample || "Example"}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}><span style={{ color: t.text, fontStyle: "italic", flex: 1 }}>{display.example}</span><SpeakButton text={display.example} lang={display.language} t={t} /></div>
              {display.exampleTranslation && <div style={{ color: t.textDim, marginTop: 8, direction: nativeLang === "ar" ? "rtl" : "ltr" }}>{display.exampleTranslation}</div>}
            </div>}

            <DetailList title={s.wordSynonym || "Synonyms"} values={display?.synonyms || []} t={t} lang={display?.language || targetLang} />
            <DetailList title={s.wordAntonym || "Antonyms"} values={display?.antonyms || []} t={t} lang={display?.language || targetLang} />
            <DetailList title={s.wordCollocation || "Common collocations"} values={display?.collocations || []} t={t} lang={display?.language || targetLang} />
            <DetailList title={s.wordFamily || "Word family"} values={display?.wordFamily || []} t={t} lang={display?.language || targetLang} />

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button type="button" onClick={saveCurrent} disabled={saved} style={{ ...primaryButtonStyle(), flex: "1 1 160px", opacity: saved ? 0.65 : 1 }}><Star size={16} fill={saved ? "currentColor" : "none"} /> {saved ? (s.saved || "Saved") : (s.saveWord || "Save word")}</button>
              <button type="button" onClick={() => review("again")} style={{ ...reviewButtonStyle("#f97316", t), flex: "1 1 100px" }}><RotateCcw size={14} /> {s.reviewAgain || "Again"}</button>
              <button type="button" onClick={() => review("good")} style={{ ...reviewButtonStyle("#22c55e", t), flex: "1 1 100px" }}><Check size={14} /> {s.reviewGood || "Good"}</button>
              <button type="button" onClick={() => review("easy")} style={{ ...reviewButtonStyle("#a78bfa", t), flex: "1 1 100px" }}><Zap size={14} /> {s.reviewEasy || "Easy"}</button>
            </div>
          </article>
          <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 2 }}>
            {filtered.slice(0, 20).map((word) => <button type="button" key={word.id} onClick={() => setSelectedId(word.id)} aria-label={word.word} style={{ minWidth: 9, width: 9, height: 9, padding: 0, borderRadius: "50%", border: 0, background: word.id === current.id ? "#60a5fa" : statusColor(getVocabularyReview(progress, word.id).state), opacity: word.id === current.id ? 1 : 0.55, cursor: "pointer" }} />)}
          </div>
        </>
      )}
    </div>
  );
}

function InfoBlock({ title, value, t, direction }: { title: string; value: string; t: Theme; direction?: "ltr" | "rtl" }) {
  return <div style={{ background: t.card2, borderRadius: 11, padding: 13, color: t.text, lineHeight: 1.65, direction }}><div style={{ color: t.textFaint, fontSize: 11, fontWeight: 700, marginBottom: 3 }}>{title}</div>{value}</div>;
}

function DetailList({ title, values, t, lang }: { title: string; values: string[]; t: Theme; lang: string }) {
  if (!values.length) return null;
  return <div><div style={{ color: t.textFaint, fontSize: 11, fontWeight: 700, marginBottom: 7 }}>{title}</div><div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{values.map((value) => <span key={value} style={{ display: "inline-flex", gap: 5, alignItems: "center", border: `1px solid ${t.border}`, background: t.card2, color: t.textMuted, borderRadius: 18, padding: "5px 8px", fontSize: 12 }}>{value}<SpeakButton text={value} lang={lang} t={t} /></span>)}</div></div>;
}

function filterStyle(t: Theme): CSSProperties {
  return { padding: "9px 10px", borderRadius: 10, border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: 12, minWidth: 0 };
}

function primaryButtonStyle(): CSSProperties {
  return { padding: 12, borderRadius: 10, border: "none", background: "#2563eb", color: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, fontWeight: 700 };
}

function reviewButtonStyle(color: string, t: Theme): CSSProperties {
  return { padding: 10, borderRadius: 10, border: `1px solid ${color}66`, background: `${color}18`, color, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, fontSize: 12, fontWeight: 700 };
}
