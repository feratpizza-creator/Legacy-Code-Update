import { rounded, type CefrLevel, type ValidatorModule } from "./domain";

const LEVEL_INDEX: Record<CefrLevel, number> = { A0: 0, A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };

function estimate(word: string): { level: CefrLevel; reason: string } {
  const normalized = word.trim();
  const length = normalized.replace(/\s+/g, "").length;
  const tokens = normalized.split(/\s+/).length;
  if (length <= 3 && tokens === 1) return { level: "A0", reason: "Short single-token form; heuristic only." };
  if (length <= 6 && tokens === 1) return { level: "A1", reason: "Short common-looking form; heuristic only." };
  if (length <= 9 && tokens <= 2) return { level: "A2", reason: "Moderate word length; heuristic only." };
  if (length <= 13 && tokens <= 2) return { level: "B1", reason: "Longer or multiword form; heuristic only." };
  if (length <= 17) return { level: "B2", reason: "Complex-looking form; heuristic only." };
  return { level: "C1", reason: "Very long form; heuristic only, not an official CEFR decision." };
}

export const cefrValidator: ValidatorModule = {
  name: "CEFR Validator",
  run({ records }) {
    const issues = [];
    const distribution: Record<string, number> = {};
    let flagged = 0;
    for (const record of records) {
      const estimateResult = estimate(record.word);
      distribution[estimateResult.level] = (distribution[estimateResult.level] ?? 0) + 1;
      const distance = LEVEL_INDEX[estimateResult.level] - LEVEL_INDEX[record.level];
      if (Math.abs(distance) >= 3) {
        flagged += 1;
        issues.push({ module: "CEFR", severity: "info" as const, code: "CEFR_MANUAL_REVIEW", path: record.path, message: `'${record.word}' is estimated as ${estimateResult.level}, while placed at ${record.level}.`, details: `${estimateResult.reason} Connect an official frequency/CEFR dataset before treating this as a decision.` });
      }
    }
    return { module: "CEFR Validator", issues, metrics: { records: records.length, flaggedForReview: flagged, heuristicAgreement: rounded(records.length === 0 ? 0 : ((records.length - flagged) / records.length) * 100) }, data: { method: "transparent word-length heuristic; not an official CEFR classification", estimatedDistribution: distribution } };
  },
};
