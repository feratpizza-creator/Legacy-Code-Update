import { percentage, rounded, type ValidatorModule } from "./domain";

export const TOPIC_DOMAINS = [
  "Family", "Food", "Travel", "Health", "Education", "Shopping", "Business", "Work", "Technology", "Science", "Nature", "Government", "Society", "Culture", "Media", "Communication", "Environment",
] as const;

const KEYWORDS: Record<string, string[]> = {
  Family: ["family", "mother", "father", "sister", "brother", "perhe", "äiti", "isä"],
  Food: ["food", "drink", "restaurant", "meal", "coffee", "bread", "ruoka", "ravintola"],
  Travel: ["travel", "trip", "hotel", "airport", "ticket", "matka", "hotelli", "lentokenttä"],
  Health: ["health", "doctor", "hospital", "body", "medicine", "terveys", "lääkäri", "sairaala"],
  Education: ["school", "student", "teacher", "university", "education", "koulu", "opiskelija", "yliopisto"],
  Shopping: ["shop", "shopping", "buy", "price", "money", "kauppa", "ostaa", "hinta"],
  Business: ["business", "company", "market", "entrepreneur", "yritys", "liiketoiminta"],
  Work: ["work", "career", "office", "job", "colleague", "työ", "ura", "toimisto"],
  Technology: ["technology", "digital", "computer", "internet", "phone", "teknologia", "tietokone"],
  Science: ["science", "research", "theory", "experiment", "tiede", "tutkimus"],
  Nature: ["nature", "animal", "forest", "plant", "luonto", "eläin", "metsä"],
  Government: ["government", "law", "politics", "election", "hallitus", "laki", "politiikka"],
  Society: ["society", "community", "social", "justice", "yhteiskunta", "yhteisö"],
  Culture: ["culture", "art", "literature", "music", "culture", "kulttuuri", "taide", "kirjallisuus"],
  Media: ["media", "news", "journalist", "newspaper", "uutiset", "lehti"],
  Communication: ["communication", "conversation", "language", "message", "viestintä", "kieli", "viesti"],
  Environment: ["environment", "climate", "recycling", "energy", "ilmasto", "kierrätys", "energia"],
};

export const topicValidator: ValidatorModule = {
  name: "Topic Coverage Validator",
  run({ pack }) {
    const issues = [];
    const domainCounts: Record<string, number> = {};
    const levelCoverage: Record<string, Record<string, number>> = {};
    for (const domain of TOPIC_DOMAINS) domainCounts[domain] = 0;
    for (const level of pack.levels) {
      levelCoverage[level.cefr] = Object.fromEntries(TOPIC_DOMAINS.map((domain) => [domain, 0]));
      for (const unit of level.units) {
        const text = `${unit.title} ${unit.description} ${unit.lessons.map((lesson) => lesson.vocabulary.map((word) => `${word.word} ${word.category ?? ""} ${(word.tags ?? "")}`).join(" ")).join(" ")}`.toLocaleLowerCase();
        for (const domain of TOPIC_DOMAINS) {
          const hit = KEYWORDS[domain]!.some((keyword) => text.includes(keyword.toLocaleLowerCase()));
          if (hit) {
            domainCounts[domain] = (domainCounts[domain] ?? 0) + 1;
            levelCoverage[level.cefr]![domain] = (levelCoverage[level.cefr]![domain] ?? 0) + 1;
          }
        }
      }
    }
    const totalUnits = pack.levels.reduce((sum, level) => sum + level.units.length, 0);
    const coverage: Record<string, number> = Object.fromEntries(TOPIC_DOMAINS.map((domain) => [domain, rounded(percentage(domainCounts[domain] ?? 0, totalUnits))]));
    for (const domain of TOPIC_DOMAINS) {
      const percent = coverage[domain] ?? 0;
      if (percent === 0) issues.push({ module: "Topics", severity: "warning" as const, code: "TOPIC_MISSING", path: "pack.levels", message: `No unit was classified under ${domain}.` });
      else if (percent < 5) issues.push({ module: "Topics", severity: "info" as const, code: "TOPIC_WEAK", path: "pack.levels", message: `${domain} appears in only ${percent}% of units.` });
    }
    return { module: "Topic Coverage Validator", issues, metrics: { domains: TOPIC_DOMAINS.length, coveredDomains: TOPIC_DOMAINS.filter((domain) => (domainCounts[domain] ?? 0) > 0).length, totalUnits }, data: { coverage, counts: domainCounts, byLevel: levelCoverage, domains: TOPIC_DOMAINS } };
  },
};
