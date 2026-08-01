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

// Learn Words supports exactly three explanation languages. Spanish, French,
// and other legacy curriculum languages are intentionally excluded so a
// Spanish translation can never be selected or displayed in this section.
const EXPLANATION_LANGS = ["ar", "en", "fi"] as const;

type ExplanationLanguage = (typeof EXPLANATION_LANGS)[number];

const WORD_UI: Record<ExplanationLanguage, Record<string, string>> = {
  ar: {
    learnWords: "تعلّم كلمات جديدة",
    vocabCurriculumHint: "ادرس مفردات منظمة وفق مستويات CEFR، وليس كلمات عشوائية.",
    learned: "تم التعلم",
    learning: "قيد التعلم",
    new: "جديدة",
    selectNativeLang: "لغة الشرح",
    levels: "المستويات",
    units: "الوحدات",
    words: "كلمات",
    searchVocabulary: "ابحث في هذا المنهج…",
    reviewDue: "حان وقت المراجعة",
    noVocabularyMatches: "لا توجد كلمات تطابق هذه المرشحات.",
    wordLoading: "جارٍ تحميل منهج المفردات…",
    wordDefinition: "التعريف",
    wordTranslation: "المعنى",
    wordExample: "مثال",
    wordSynonym: "المرادفات",
    wordAntonym: "المتضادات",
    wordCollocation: "المصاحبات الشائعة",
    wordFamily: "عائلة الكلمة",
    saved: "محفوظة",
    saveWord: "حفظ الكلمة",
    reviewAgain: "مرة أخرى",
    reviewGood: "جيد",
    reviewEasy: "سهل",
  },
  en: {
    learnWords: "Learn new words",
    vocabCurriculumHint: "Study a structured CEFR vocabulary curriculum — not random words.",
    learned: "Learned",
    learning: "Learning",
    new: "New",
    selectNativeLang: "Explanation language",
    levels: "Levels",
    units: "Units",
    words: "words",
    searchVocabulary: "Search this curriculum…",
    reviewDue: "Due for review",
    noVocabularyMatches: "No words match these filters.",
    wordLoading: "Loading the vocabulary curriculum…",
    wordDefinition: "Definition",
    wordTranslation: "Meaning",
    wordExample: "Example",
    wordSynonym: "Synonyms",
    wordAntonym: "Antonyms",
    wordCollocation: "Common collocations",
    wordFamily: "Word family",
    saved: "Saved",
    saveWord: "Save word",
    reviewAgain: "Again",
    reviewGood: "Good",
    reviewEasy: "Easy",
  },
  fi: {
    learnWords: "Uudet sanat",
    vocabCurriculumHint: "Opiskele jäsenneltyä CEFR-sanastoa — älä satunnaisia sanoja.",
    learned: "Opittu",
    learning: "Oppimassa",
    new: "Uusi",
    selectNativeLang: "Selityskieli",
    levels: "Tasot",
    units: "Yksiköt",
    words: "sanaa",
    searchVocabulary: "Hae tästä opetussuunnitelmasta…",
    reviewDue: "Kertaus on ajankohtainen",
    noVocabularyMatches: "Mikään sana ei vastaa näitä suodattimia.",
    wordLoading: "Ladataan sanastoa…",
    wordDefinition: "Määritelmä",
    wordTranslation: "Merkitys",
    wordExample: "Esimerkki",
    wordSynonym: "Synonyymit",
    wordAntonym: "Vastakohdat",
    wordCollocation: "Yleiset sanaparit",
    wordFamily: "Sanaperhe",
    saved: "Tallennettu",
    saveWord: "Tallenna sana",
    reviewAgain: "Uudelleen",
    reviewGood: "Hyvä",
    reviewEasy: "Helppo",
  },
};

function nativeLanguageName(code: ExplanationLanguage): string {
  return code === "ar" ? "العربية" : code === "fi" ? "Suomi" : "English";
}

function getWordUi(code: string): Record<string, string> {
  return WORD_UI[EXPLANATION_LANGS.includes(code as ExplanationLanguage) ? code as ExplanationLanguage : "ar"];
}

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

function labelForState(state: VocabularyState, ui: Record<string, string>): string {
  if (state === "learned") return ui.learned;
  if (state === "learning") return ui.learning;
  return ui.new;
}

function statusColor(state: VocabularyState): string {
  return state === "learned" ? "#22c55e" : state === "learning" ? "#f59e0b" : "#60a5fa";
}

function pillStyle(color: string, t: Theme): CSSProperties {
  return { border: `1px solid ${color}55`, background: `${color}18`, color, borderRadius: 20, padding: "4px 9px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" };
}

export default function LearnWordVocab({ t, languagePacks, defaultTargetLang, defaultNativeLang: _defaultNativeLang, onTranslateText, onSaveWord }: WordVocabProps) {
  const stored = loadPrefs();
  const initialTarget = languagePacks.some((pack) => pack.targetLang === stored?.targetLang)
    ? stored!.targetLang
    : languagePacks.some((pack) => pack.targetLang === "en")
      ? "en"
      : languagePacks.some((pack) => pack.targetLang === defaultTargetLang)
        ? defaultTargetLang
        : languagePacks[0]?.targetLang || "en";
  // Arabic is always the default explanation language in Learn Words. Stored
  // legacy values such as "es", and values inherited from the wider app, are
  // intentionally ignored unless the user has explicitly selected ar/en/fi.
  const initialNative: ExplanationLanguage = EXPLANATION_LANGS.includes(stored?.nativeLang as ExplanationLanguage)
    ? stored!.nativeLang as ExplanationLanguage
    : "ar";
  const [targetLang, setTargetLang] = useState(initialTarget);
  const [nativeLang, setNativeLang] = useState<ExplanationLanguage>(initialNative);
  const currentUi = getWordUi(nativeLang);
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
  const display = current ? {
    ...current,
    ...enriched,
    // The selected native language is the single source of truth. A legacy
    // curriculum translation is only shown when its declared language matches
    // that selection; otherwise the runtime result is used, or the field stays
    // blank while the request is unavailable.
    nativeMeaning: enriched.nativeMeaning ?? (
      current.nativeMeaningLang === nativeLang
        ? current.definition || current.nativeMeaning
        : nativeLang === current.language
          ? current.definition || current.word
          : ""
    ),
    exampleTranslation: enriched.exampleTranslation ?? (
      current.nativeMeaningLang === nativeLang
        ? current.exampleTranslation
        : nativeLang === current.language
          ? current.example
          : ""
    ),
    // A definition is authored in the target language and is therefore only
    // safe to display directly when the learner explains in that same language.
    definition: enriched.definition ?? (nativeLang === current.language ? current.definition : ""),
  } : null;
  const currentReview = current ? getVocabularyReview(progress, current.id) : null;

  useEffect(() => {
    setEnriched({});
    setSaved(false);
    const currentRequest = ++requestId.current;
    if (!current || !pack) return;

    const sameLanguage = nativeLang === current.language;
    const curriculumMeaningLang = current.nativeMeaningLang || pack.explanationLangs[0] || "en";
    const needsMeaning = !sameLanguage && nativeLang !== curriculumMeaningLang;
    const needsExampleTranslation = Boolean(current.example) && !sameLanguage && nativeLang !== curriculumMeaningLang;
    // Finnish curriculum entries commonly use an English gloss and do not
    // always have a target-language definition. Translate that gloss into
    // Finnish so Finnish + Finnish still receives a Finnish explanation.
    const definitionSource = current.definition || current.nativeMeaning;
    const definitionSourceLang = current.definition ? current.language : curriculumMeaningLang;
    const needsDefinition = Boolean(definitionSource) && (
      sameLanguage
        ? !current.definition && definitionSourceLang !== nativeLang
        : Boolean(current.definition)
    );

    if (!needsMeaning && !needsExampleTranslation && !needsDefinition) {
      if (sameLanguage) {
        setEnriched({
          nativeMeaning: current.definition || (current.nativeMeaningLang === nativeLang ? current.nativeMeaning : current.word),
          exampleTranslation: current.example || "",
          definition: current.definition || "",
        });
      }
      return;
    }

    let active = true;
    void Promise.all([
      needsMeaning ? onTranslateText(current.word, current.language, nativeLang) : Promise.resolve(null),
      needsExampleTranslation ? onTranslateText(current.example, current.language, nativeLang) : Promise.resolve(null),
      needsDefinition ? onTranslateText(definitionSource, definitionSourceLang, nativeLang) : Promise.resolve(null),
    ]).then(([translation, exampleTranslation, definition]) => {
      if (!active || currentRequest !== requestId.current) return;
      setEnriched({
        // Never show a curriculum value in the wrong language when the runtime
        // translation request fails. A blank value is safer than leaking a
        // Finnish/Spanish explanation into an Arabic vocabulary view.
        nativeMeaning: sameLanguage
          ? current.definition || definition || (current.nativeMeaningLang === nativeLang ? current.nativeMeaning : "")
          : translation ?? (current.nativeMeaningLang === nativeLang ? current.nativeMeaning : ""),
        exampleTranslation: sameLanguage
          ? current.example
          : exampleTranslation ?? (current.nativeMeaningLang === nativeLang ? current.exampleTranslation : ""),
        definition: sameLanguage ? current.definition || definition || "" : definition ?? "",
      });
    }).catch(() => { /* leave non-matching translated fields blank */ });
    return () => { active = false; };
  }, [current, nativeLang, onTranslateText, pack]);

  function chooseLanguage(code: string) {
    setTargetLang(code);
    setLevel("all");
    setUnitId("all");
    savePrefs({ targetLang: code, nativeLang });
  }

  function chooseNative(code: string) {
    const normalized: ExplanationLanguage = EXPLANATION_LANGS.includes(code as ExplanationLanguage) ? code as ExplanationLanguage : "ar";
    setNativeLang(normalized);
    savePrefs({ targetLang, nativeLang: normalized });
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
    // Never persist a card whose explanation is missing: a failed runtime
    // translation leaves the meaning blank rather than leaking Spanish, and a
    // blank card must not be saved to the learner's library.
    if (!display || !display.nativeMeaning) return;
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
    return <div style={{ color: t.textDim, padding: 24, textAlign: "center" }}>{currentUi.wordLoading}</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <header style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <h2 style={{ color: t.text, margin: 0, fontSize: 22 }}>{currentUi.learnWords}</h2>
        <p style={{ color: t.textDim, margin: 0, fontSize: 13, lineHeight: 1.6 }}>{currentUi.vocabCurriculumHint}</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 7 }}>
        {(["new", "learning", "learned"] as const).map((state) => (
          <button key={state} type="button" onClick={() => setStateFilter(state)} style={{ ...pillStyle(statusColor(state), t), cursor: "pointer", opacity: stateFilter === state ? 1 : 0.7, textAlign: "left" }}>
            {counts[state]} <span style={{ fontWeight: 500 }}>{labelForState(state, currentUi)}</span>
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {languagePacks.map((candidate) => (
          <button key={candidate.targetLang} type="button" onClick={() => chooseLanguage(candidate.targetLang)} style={{ ...pillStyle(candidate.targetLang === targetLang ? "#60a5fa" : t.textMuted, t), cursor: "pointer", opacity: candidate.targetLang === targetLang ? 1 : 0.7 }}>
            {candidate.flag} {candidate.name}
          </button>
        ))}
        <select aria-label={currentUi.selectNativeLang} value={nativeLang} onChange={(event) => chooseNative(event.target.value)} style={{ marginLeft: "auto", minWidth: 130, padding: "5px 8px", borderRadius: 20, border: `1px solid ${t.border}`, background: t.card2, color: t.text, fontSize: 11 }}>
          {EXPLANATION_LANGS.map((code) => <option key={code} value={code}>{nativeLanguageName(code)}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 8 }}>
        <select aria-label={currentUi.levels} value={level} onChange={(event) => { setLevel(event.target.value as LevelFilter); setUnitId("all"); }} style={filterStyle(t)}>
          <option value="all">{currentUi.levels}</option>
          {LEVELS.slice(1).map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <select aria-label={currentUi.units} value={unitId} onChange={(event) => setUnitId(event.target.value)} style={filterStyle(t)}>
          <option value="all">{currentUi.units}</option>
          {units.map((unit) => <option key={unit.id} value={unit.id}>{unit.id} · {unit.title}</option>)}
        </select>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: t.textFaint }} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={currentUi.searchVocabulary} style={{ ...filterStyle(t), width: "100%", paddingLeft: 32 }} />
        </div>
        <button type="button" onClick={() => setStateFilter(stateFilter === "due" ? "all" : "due")} style={{ ...filterStyle(t), color: stateFilter === "due" ? "#f59e0b" : t.textMuted, cursor: "pointer", width: "auto" }} title={currentUi.reviewDue}>🔁</button>
      </div>

      {!current ? <div style={{ color: t.textDim, textAlign: "center", padding: 28 }}>{currentUi.noVocabularyMatches}</div> : (
        <>
          <div style={{ color: t.textDim, fontSize: 12 }}>{filtered.length} {currentUi.words} · {current.unitTitle} · {current.lessonTitle}</div>
          <article style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <strong style={{ color: t.text, fontSize: 30, lineHeight: 1.1 }}>{display?.word}</strong>
                  <span style={pillStyle(statusColor(currentReview!.state), t)}>{labelForState(currentReview!.state, currentUi)}</span>
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
            {display?.definition && display.definition !== display.nativeMeaning && <InfoBlock title={currentUi.wordDefinition} value={display.definition} t={t} />}
            <InfoBlock title={`${currentUi.wordTranslation} · ${nativeLang.toUpperCase()}`} value={display?.nativeMeaning || "—"} t={t} direction={nativeLang === "ar" ? "rtl" : "ltr"} />

            {display?.example && <div style={{ background: t.card2, borderRadius: 11, padding: 13 }}>
              <div style={{ color: t.textFaint, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>{currentUi.wordExample}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}><span style={{ color: t.text, fontStyle: "italic", flex: 1 }}>{display.example}</span><SpeakButton text={display.example} lang={display.language} t={t} /></div>
              {display.exampleTranslation && <div style={{ color: t.textDim, marginTop: 8, direction: nativeLang === "ar" ? "rtl" : "ltr" }}>{display.exampleTranslation}</div>}
            </div>}

            <DetailList title={currentUi.wordSynonym} values={display?.synonyms || []} t={t} lang={display?.language || targetLang} />
            <DetailList title={currentUi.wordAntonym} values={display?.antonyms || []} t={t} lang={display?.language || targetLang} />
            <DetailList title={currentUi.wordCollocation} values={display?.collocations || []} t={t} lang={display?.language || targetLang} />
            <DetailList title={currentUi.wordFamily} values={display?.wordFamily || []} t={t} lang={display?.language || targetLang} />

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button type="button" onClick={saveCurrent} disabled={saved || !display?.nativeMeaning} style={{ ...primaryButtonStyle(), flex: "1 1 160px", opacity: saved || !display?.nativeMeaning ? 0.65 : 1 }}><Star size={16} fill={saved ? "currentColor" : "none"} /> {saved ? currentUi.saved : currentUi.saveWord}</button>
              <button type="button" onClick={() => review("again")} style={{ ...reviewButtonStyle("#f97316", t), flex: "1 1 100px" }}><RotateCcw size={14} /> {currentUi.reviewAgain}</button>
              <button type="button" onClick={() => review("good")} style={{ ...reviewButtonStyle("#22c55e", t), flex: "1 1 100px" }}><Check size={14} /> {currentUi.reviewGood}</button>
              <button type="button" onClick={() => review("easy")} style={{ ...reviewButtonStyle("#a78bfa", t), flex: "1 1 100px" }}><Zap size={14} /> {currentUi.reviewEasy}</button>
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
