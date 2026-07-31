import { useEffect, useRef, useState, type CSSProperties } from "react";
import { RefreshCw, Star, Volume2 } from "lucide-react";

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
  example?: string;
  exampleTranslation?: string;
};

type WordVocabProps = {
  t: Theme;
  s: Record<string, string>;
  defaultTargetLang: string;
  defaultNativeLang: string;
  onTranslateText: (text: string, sourceLang: string, targetLang: string) => Promise<string | null>;
  onSaveWord: (word: string, sourceLang: string, translation: string, details?: WordSaveDetails) => void;
};

type WordEntry = {
  word: string;
  sourceLang: "en" | "fi";
  pos: string;
  definition: string;
  example: string;
  synonyms: string[];
  translation: string;
  exampleTranslation: string;
};

type VocabPrefs = { targetLang: string; nativeLang: string };

type LanguageOption = { code: string; label: string; flag: string; tts: string };

const PREFS_KEY = "lengoali_word_vocab_v2";
const ENGLISH_WORDS = [
  "adapt", "bright", "curious", "discover", "gentle", "journey", "notice",
  "patient", "prepare", "reliable", "share", "steady", "support", "wonder",
];

const FINNISH_WORDS: Array<Omit<WordEntry, "translation" | "exampleTranslation">> = [
  { word: "ystävä", sourceLang: "fi", pos: "substantiivi", definition: "ihminen, josta pidät ja johon luotat", example: "Uusi ystäväni asuu lähellä.", synonyms: ["kaveri", "toveri"] },
  { word: "oppia", sourceLang: "fi", pos: "verbi", definition: "saada uusia tietoja tai taitoja", example: "Haluan oppia uuden sanan joka päivä.", synonyms: ["omaksua", "harjoitella"] },
  { word: "kaunis", sourceLang: "fi", pos: "adjektiivi", definition: "miellyttävä nähdä tai kokea", example: "Tänään on kaunis aamu.", synonyms: ["ihana", "viehättävä"] },
  { word: "matka", sourceLang: "fi", pos: "substantiivi", definition: "siirtyminen paikasta toiseen yleensä vapaa-ajalla", example: "Matka alkaa aikaisin aamulla.", synonyms: ["retki", "reissu"] },
  { word: "tarvita", sourceLang: "fi", pos: "verbi", definition: "olla jonkin tarpeessa", example: "Tarvitsen apua tämän tehtävän kanssa.", synonyms: ["kaivata", "vaatia"] },
  { word: "tärkeä", sourceLang: "fi", pos: "adjektiivi", definition: "sellainen, jolla on suuri merkitys", example: "Harjoittelu on tärkeä osa oppimista.", synonyms: ["merkittävä", "olennainen"] },
  { word: "ympäristö", sourceLang: "fi", pos: "substantiivi", definition: "ihmistä tai asiaa ympäröivä kokonaisuus", example: "Pidämme yhdessä huolta ympäristöstä.", synonyms: ["luonto", "elinpiiri"] },
  { word: "rohkea", sourceLang: "fi", pos: "adjektiivi", definition: "joka toimii pelosta huolimatta", example: "Hän oli rohkea ja kysyi neuvoa.", synonyms: ["urhea", "peloton"] },
];

const TARGET_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", flag: "🇬🇧", tts: "en-US" },
  { code: "fi", label: "Suomi", flag: "🇫🇮", tts: "fi-FI" },
];

const NATIVE_LANGUAGES: LanguageOption[] = [
  { code: "ar", label: "العربية", flag: "🇸🇦", tts: "ar-SA" },
  { code: "en", label: "English", flag: "🇬🇧", tts: "en-US" },
  { code: "fi", label: "Suomi", flag: "🇫🇮", tts: "fi-FI" },
  { code: "es", label: "Español", flag: "🇪🇸", tts: "es-ES" },
  { code: "fr", label: "Français", flag: "🇫🇷", tts: "fr-FR" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", tts: "de-DE" },
];

function loadPrefs(): VocabPrefs | null {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? JSON.parse(raw) as VocabPrefs : null;
  } catch {
    return null;
  }
}

function savePrefs(prefs: VocabPrefs) {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch { /* ignore */ }
}

function languageInfo(code: string): LanguageOption {
  return [...TARGET_LANGUAGES, ...NATIVE_LANGUAGES].find((language) => language.code === code)
    || { code, label: code.toUpperCase(), flag: "🌐", tts: code };
}

function speak(text: string, lang: string) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageInfo(lang).tts;
    utterance.rate = 0.9;
    synth.speak(utterance);
  } catch { /* ignore */ }
}

function SpeakButton({ text, lang, t }: { text: string; lang: string; t: Theme }) {
  return (
    <button
      type="button"
      onClick={() => speak(text, lang)}
      title="Listen"
      style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${t.border}`, background: t.card2, color: "#60a5fa", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
    >
      <Volume2 size={15} />
    </button>
  );
}

function firstText(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && typeof (value as { text?: unknown }).text === "string") {
    return (value as { text: string }).text;
  }
  return "";
}

async function fetchJsonWithTimeout(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;
    return await response.json() as unknown;
  } finally {
    window.clearTimeout(timeout);
  }
}

function buildEnglishEntry(word: string, record: Record<string, unknown>): WordEntry | null {
  const definitions = Array.isArray(record.definition)
    ? record.definition.filter((item): item is string => typeof item === "string")
    : [];
  const examples = Array.isArray(record.example) ? record.example.map(firstText).filter(Boolean) : [];
  const members = Array.isArray(record.members) ? record.members : [];
  const synonyms = members
    .map((member) => member && typeof member === "object" ? (member as { lemma?: unknown }).lemma : "")
    .filter((lemma): lemma is string => typeof lemma === "string" && lemma.toLowerCase() !== word.toLowerCase())
    .filter((lemma, index, values) => values.indexOf(lemma) === index)
    .slice(0, 6);

  if (!definitions.length && !examples.length) return null;
  return {
    word,
    sourceLang: "en",
    pos: typeof record.partOfSpeech === "string" ? record.partOfSpeech : "word",
    definition: definitions[0] || `A useful English word to explore: ${word}.`,
    example: examples[0] || `I used the word ${word} in a sentence today.`,
    synonyms,
    translation: "",
    exampleTranslation: "",
  };
}

function buildDictionaryApiEntry(word: string, data: unknown): WordEntry | null {
  if (!Array.isArray(data)) return null;
  const record = data[0];
  if (!record || typeof record !== "object") return null;
  const meanings = Array.isArray((record as { meanings?: unknown }).meanings)
    ? (record as { meanings: unknown[] }).meanings
    : [];
  const definitions: string[] = [];
  const examples: string[] = [];
  const synonyms: string[] = [];
  let pos = "word";
  for (const meaning of meanings) {
    if (!meaning || typeof meaning !== "object") continue;
    const item = meaning as { partOfSpeech?: unknown; definitions?: unknown; synonyms?: unknown };
    if (typeof item.partOfSpeech === "string" && pos === "word") pos = item.partOfSpeech;
    if (Array.isArray(item.synonyms)) synonyms.push(...item.synonyms.filter((value): value is string => typeof value === "string"));
    if (!Array.isArray(item.definitions)) continue;
    for (const definition of item.definitions) {
      if (!definition || typeof definition !== "object") continue;
      const itemDefinition = definition as { definition?: unknown; example?: unknown; synonyms?: unknown };
      if (typeof itemDefinition.definition === "string") definitions.push(itemDefinition.definition);
      if (typeof itemDefinition.example === "string") examples.push(itemDefinition.example);
      if (Array.isArray(itemDefinition.synonyms)) synonyms.push(...itemDefinition.synonyms.filter((value): value is string => typeof value === "string"));
    }
  }
  if (!definitions.length && !examples.length) return null;
  return {
    word,
    sourceLang: "en",
    pos,
    definition: definitions[0] || `A useful English word to explore: ${word}.`,
    example: examples[0] || `I used the word ${word} in a sentence today.`,
    synonyms: synonyms.filter((value, index, values) => value.toLowerCase() !== word.toLowerCase() && values.indexOf(value) === index).slice(0, 6),
    translation: "",
    exampleTranslation: "",
  };
}

function fallbackEnglishEntry(word: string): WordEntry {
  return {
    word,
    sourceLang: "en",
    pos: "word",
    definition: `An English word to practise: ${word}.`,
    example: `I am learning how to use ${word} in English.`,
    synonyms: [],
    translation: "",
    exampleTranslation: "",
  };
}

async function fetchEnglishWord(word: string): Promise<WordEntry | null> {
  try {
    const data = await fetchJsonWithTimeout(`https://en-word.net/api/lemma/${encodeURIComponent(word)}`);
    if (Array.isArray(data)) {
      const record = data.find((item): item is Record<string, unknown> => Boolean(item && typeof item === "object" && Array.isArray((item as Record<string, unknown>).definition)));
      const entry = record ? buildEnglishEntry(word, record) : null;
      if (entry) return entry;
    }
  } catch { /* try the second browser-safe source */ }

  try {
    const data = await fetchJsonWithTimeout(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    const entry = buildDictionaryApiEntry(word, data);
    if (entry) return entry;
  } catch { /* use the bundled graceful fallback */ }

  return fallbackEnglishEntry(word);
}

async function fetchFinnishWord(word: Omit<WordEntry, "translation" | "exampleTranslation">): Promise<WordEntry> {
  try {
    const url = `https://fi.wiktionary.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&titles=${encodeURIComponent(word.word)}&format=json&origin=*`;
    const data = await fetchJsonWithTimeout(url) as { query?: { pages?: Record<string, { extract?: string }> } } | null;
    const page = data?.query?.pages ? Object.values(data.query.pages)[0] : undefined;
    const extract = page?.extract?.trim();
    if (extract) return { ...word, definition: extract.split(/\n+/)[0].slice(0, 280), translation: "", exampleTranslation: "" };
  } catch { /* static Finnish fallback remains available */ }
  return { ...word, translation: "", exampleTranslation: "" };
}

export default function LearnWordVocab({ t, s, defaultTargetLang, defaultNativeLang, onTranslateText, onSaveWord }: WordVocabProps) {
  const stored = loadPrefs();
  const initialTarget = stored?.targetLang || defaultTargetLang || "en";
  const initialNative = stored?.nativeLang || defaultNativeLang || "en";
  const [targetLang, setTargetLang] = useState(initialTarget);
  const [nativeLang, setNativeLang] = useState(initialNative);
  const [configured, setConfigured] = useState(Boolean(stored));
  const [draftTarget, setDraftTarget] = useState(initialTarget);
  const [draftNative, setDraftNative] = useState(initialNative);
  const [entry, setEntry] = useState<WordEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const requestId = useRef(0);

  useEffect(() => {
    return () => {
      requestId.current += 1;
    };
  }, []);

  useEffect(() => {
    if (!stored && defaultNativeLang) {
      setNativeLang(defaultNativeLang);
      setDraftNative(defaultNativeLang);
    }
  }, [defaultNativeLang, stored]);

  const loadNextWord = async (lang = targetLang, native = nativeLang) => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    setError("");
    setSaved(false);
    try {
      let next: WordEntry | null;
      if (lang === "en") {
        const start = Math.floor(Math.random() * ENGLISH_WORDS.length);
        next = null;
        for (let i = 0; i < ENGLISH_WORDS.length && !next; i += 1) {
          next = await fetchEnglishWord(ENGLISH_WORDS[(start + i) % ENGLISH_WORDS.length]);
        }
      } else {
        const word = FINNISH_WORDS[Math.floor(Math.random() * FINNISH_WORDS.length)];
        next = await fetchFinnishWord(word);
      }
      if (!next) throw new Error("word-not-found");
      if (currentRequest !== requestId.current) return;

      const translation = native === lang ? next.definition : await onTranslateText(next.definition, lang, native);
      if (currentRequest !== requestId.current) return;
      const exampleTranslation = native === lang ? next.example : await onTranslateText(next.example, lang, native);
      if (currentRequest !== requestId.current) return;
      setEntry({ ...next, translation: translation || next.definition, exampleTranslation: exampleTranslation || next.example });
    } catch {
      if (currentRequest !== requestId.current) return;
      setError(s.wordApiError || "The word service is unavailable right now. Try again.");
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  };

  const confirmSetup = () => {
    const nextPrefs = { targetLang: draftTarget, nativeLang: draftNative };
    setTargetLang(nextPrefs.targetLang);
    setNativeLang(nextPrefs.nativeLang);
    savePrefs(nextPrefs);
    setConfigured(true);
    void loadNextWord(nextPrefs.targetLang, nextPrefs.nativeLang);
  };

  if (!configured) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <h2 style={{ color: t.text, margin: "0 0 5px", fontSize: 18 }}>{s.learnWords || "New words"}</h2>
          <p style={{ color: t.textDim, margin: 0, fontSize: 13 }}>{s.wordSetupHint || "Choose the language you want to learn and the language for explanations."}</p>
        </div>
        <LanguageChoice title={s.selectLangLearn || "Language to learn"} options={TARGET_LANGUAGES} value={draftTarget} onChange={setDraftTarget} t={t} />
        <LanguageChoice title={s.selectNativeLang || "Explanation language"} options={NATIVE_LANGUAGES} value={draftNative} onChange={setDraftNative} t={t} />
        <button type="button" onClick={confirmSetup} style={primaryButtonStyle()}>{s.fetchWord || "Get a new word"} →</button>
      </div>
    );
  }

  const sourceInfo = languageInfo(targetLang);
  const nativeInfo = languageInfo(nativeLang);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <div style={{ color: t.textDim, fontSize: 13 }}>{sourceInfo.flag} {sourceInfo.label} → {nativeInfo.flag} {nativeInfo.label}</div>
        <button type="button" onClick={() => { requestId.current += 1; setConfigured(false); }} style={secondaryButtonStyle(t)}>{s.changeLanguage || "Change language"}</button>
      </div>
      {loading && <div style={{ color: t.textDim, textAlign: "center", padding: 36 }}>{s.wordLoading || "Finding a new word…"}</div>}
      {error && !loading && <div style={{ color: "#fca5a5", background: "#450a0a", border: "1px solid #7f1d1d", borderRadius: 12, padding: 14, textAlign: "center" }}>{error}</div>}
      {entry && !loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <strong style={{ color: t.text, fontSize: 28 }}>{entry.word}</strong>
                  <span style={{ color: "#60a5fa", background: "#60a5fa22", borderRadius: 6, padding: "3px 8px", fontSize: 11 }}>{entry.pos}</span>
                </div>
                <div style={{ color: t.textDim, marginTop: 8, fontSize: 14 }}>{entry.definition}</div>
              </div>
              <SpeakButton text={entry.word} lang={targetLang} t={t} />
            </div>
            <div style={{ background: t.card2, borderRadius: 10, padding: "11px 13px", marginTop: 14, direction: nativeLang === "ar" ? "rtl" : "ltr" }}>
              <div style={{ color: t.textFaint, fontSize: 11, marginBottom: 4 }}>{nativeInfo.flag} {s.wordTranslation || "Translation"}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
                <strong style={{ color: t.text, fontSize: 17 }}>{entry.translation}</strong>
                <SpeakButton text={entry.translation} lang={nativeLang} t={t} />
              </div>
            </div>
          </div>
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: 14 }}>
            <div style={{ color: t.textFaint, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>{s.wordExample || "Example"}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ color: t.text, fontStyle: "italic", flex: 1 }}>{entry.example}</span>
              <SpeakButton text={entry.example} lang={targetLang} t={t} />
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 8, direction: nativeLang === "ar" ? "rtl" : "ltr" }}>
              <span style={{ color: t.textDim, flex: 1 }}>{entry.exampleTranslation}</span>
              <SpeakButton text={entry.exampleTranslation} lang={nativeLang} t={t} />
            </div>
          </div>
          {entry.synonyms.length > 0 && <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: 14 }}>
            <div style={{ color: t.textFaint, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>{s.wordSynonym || "Synonyms"}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{entry.synonyms.map((synonym) => <span key={synonym} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: t.card2, border: `1px solid ${t.border}`, color: t.textMuted, borderRadius: 18, padding: "5px 9px", fontSize: 13 }}>{synonym}<SpeakButton text={synonym} lang={targetLang} t={t} /></span>)}</div>
          </div>}
          <button type="button" onClick={() => { onSaveWord(entry.word, targetLang, entry.translation, {
              translationLang: nativeLang,
              pos: entry.pos,
              synonym: entry.synonyms.join(", "),
              example: entry.example,
              exampleTranslation: entry.exampleTranslation,
            }); setSaved(true); }} disabled={saved} style={{ ...primaryButtonStyle(), opacity: saved ? 0.65 : 1 }}><Star size={16} fill={saved ? "currentColor" : "none"} /> {saved ? (s.saved || "Saved") : (s.saveWord || "Save word")}</button>
        </div>
      )}
      {!loading && <button type="button" onClick={() => void loadNextWord()} style={secondaryButtonStyle(t)}><RefreshCw size={15} /> {s.fetchWord || "Get a new word"}</button>}
    </div>
  );
}

function LanguageChoice({ title, options, value, onChange, t }: { title: string; options: LanguageOption[]; value: string; onChange: (value: string) => void; t: Theme }) {
  return (
    <div>
      <div style={{ color: t.text, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
        {options.map((option) => <button type="button" key={option.code} onClick={() => onChange(option.code)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 11px", borderRadius: 10, border: `1px solid ${value === option.code ? "#60a5fa" : t.border}`, background: value === option.code ? "#60a5fa22" : t.card, color: t.text, cursor: "pointer", textAlign: "left" }}><span>{option.flag}</span><span>{option.label}</span>{value === option.code && <span style={{ marginLeft: "auto", color: "#60a5fa" }}>✓</span>}</button>)}
      </div>
    </div>
  );
}

function primaryButtonStyle(): CSSProperties {
  return { width: "100%", padding: 12, borderRadius: 10, border: "none", background: "#2563eb", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontWeight: 700 };
}

function secondaryButtonStyle(t: Theme): CSSProperties {
  return { padding: "8px 11px", borderRadius: 9, border: `1px solid ${t.border}`, background: t.card2, color: t.textMuted, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12 };
}
